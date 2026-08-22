
import { hasTalent } from "../Generic/RampBase";
import { runSpellScript } from "../Generic/SpellScripts";
import specSpellDB from "./RestoDruidSpellDB.json";
import { defaultTalents, druidTalents } from "./RestoDruidTalents";
import { printHealingBreakdownWithCPM, convertStatPercentages, getSpellEntry, updateSpellCPM, buildCPM, getSpellThroughput, applyTalents, completeCastProfile, getTimeUsed, compileProfileReportingData, getCPM, applyRaidBuffs } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";


export const restoDruidProfile = {
    spec: "Restoration Druid",
    name: "Restoration Druid",
    scoreSet: scoreDruidSet,
    defaultStatProfile: { 
        // Our stats we want to run through the profile. 
        // You can change and play with these as much as you want.
        // All user-facing operations will set their own anyway like in Top Gear.
        intellect: 2500,
        haste: 550,
        crit: 550,
        mastery: 550,
        versatility: 550,
        stamina: 19000,
        critMult: 2,
    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        intellect: 1,
        crit: 0.452,
        mastery: 0.2,
        versatility: 0.35,
        haste: 0.3,
        hps: 0.304, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
}

const getMasteryMult = (count: number): number => {
  const masteryDR = [1, 1.7, 2.3, 2.8, 3.2];

  // Clamp values outside the defined stack range [1, masteryDR.length]
  if (count <= 1) return count;
  if (count >= masteryDR.length) return masteryDR[masteryDR.length - 1];

  // Convert 1-based count to 0-based array index space
  const index = count - 1;
  const lowerIndex = Math.floor(index);
  const fraction = index - lowerIndex;

  const lowerVal = masteryDR[lowerIndex];
  const upperVal = masteryDR[lowerIndex + 1];

  // Interpolate between the lower and upper bounds
  return lowerVal + fraction * (upperVal - lowerVal);
};


const convokeCastTable = {
    "Wild Growth": 1.5,
    "Swiftmend": 1.5,
    "Rejuvenation": 2.2,
    "Regrowth": 2.1,
    "Wrath": 4.4, // Split with Moonfire
}

// Mixed Profile
// Convoke Ramp every 1 minute
// Mini-ramps 
// Swiftmend + Wild Growth on CD


// Thoughts on a profile ramp:
// -- Rejuv --
// Get rejuv count. 
// Healing is rejuv x (rejuv mastery stack + % of duration wild growth might be active / wild growth coverage)
// If Reforestation is active, consider that

// -- Wild Growth -- 
// Can just check mastery stacks by rejuv coverage. Consider any that might fall off.

// -- Regrowth --
// Think about whether they should be on Rejuv targets or not.



// Time Spent
// Wild Growth on CD - 17% of the time baseline. 9500 mana per cast, 47.5k per minute @ 5 cpm
// Swiftmend on CD - 12.5% of the time baseline. 3500 mana per cast, 15.7k per minute @ 4.5 cpm
// Convoke on CD - 4 / 60 = 6.6% of the time baseline.
// Maintain Lifebloom. If no swiftmend then cpm = 4. If Swiftmend then cpm = ~1.4. 3% of the time baseline.
// Leaves ~70% of the time for rejuv / regrowth and mana.

// Full ramp takes 2 Swiftmends + 8 rejuv casts. 15s - haste. Rejuv 5250 mana per cast, 42000 per ramp.
// Buys time for 4-5 regrowths. Low cost.
// Total time cost: 22.5 / haste (37.5%)

// Mana regen per minute = 120,000. If one ramp per minute = 105k. If two ramps per minute = 147k

// Wrath regen = 1687 effective mana per cast.

export function scoreDruidSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting = false) {
    const fightLength = 6;
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    spellDB["Lifebloom (Bloom)"][0].expectedOverheal = 0.4; // Careful here because the cleaves don't overheal much.
    let initialState = {statBonuses: applyRaidBuffs(settings), talents: druidTalents, heroTree: playerData.heroTree, specSettings: {"Renewing Surge Health": 0.85}};
    const reportingData: any = {};

    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    // Druid specific variables
    let soulOfTheForestProcs = 0;

    
    // Apply Talents
    defaultTalents(initialState.talents, "default", playerData.heroTree);
    applyTalents(initialState, spellDB);

    // Apply Stats
    const state = { fightLength: 6, spec: "Restoration Druid", statPercentages: convertStatPercentages(stats, initialState.statBonuses, "Restoration Druid", 1), settings: settings, talents: druidTalents};

    // Cast Profile
    // Maybe use manaOverride instead of freeCast
    let castProfile: CastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      
      {spell: "Swiftmend", efficiency: 0.98 }, // We have two charges
      {spell: "Wild Growth", efficiency: 0.5 },
      {spell: "Efflorescence", cpm: 2, autoSpell: true }, // If Lifetreading, remove mana & cast time cost. Maybe via flag?
      {spell: "Lifebloom", cpm: 4 }, // Does not include blooms.
      {spell: "Lifebloom (Bloom)", cpm: 4 }, // Consider possible Overgrowth usage.

      {spell: "Grove Guardians", cpm: 0, autoSpell: true },
      {spell: "Dream Bloom", cpm: 0, autoSpell: true },
      {spell: "Rejuvenation", cpm: 0 },
      {spell: "Regrowth", cpm: 0 },
      {spell: "Innervate", efficiency: 0.95, autoSpell: true },
    ]

    completeCastProfile(castProfile, spellDB);
    

    const manaPool = 250000;
    const regen = manaPool * 0.04 * 12;

    const manaAvailable = manaPool / fightLength + regen + getSpellEntry(castProfile, "Innervate").cpm * (manaPool * 0.25);
    reportingData.manaAvailable = manaAvailable;


    // Handle Apex & HoTs on the target

    // Everbloom 4 blooms
    const selfMasteryCount = 4;
    castProfile.push({spell: "Lifebloom (Bloom)", label: "Everbloom4", cpm: getSpellEntry(castProfile, "Swiftmend").cpm * 3, autoSpell: true, flags: {masteryMult: selfMasteryCount}});

    if (hasTalent(state.talents, "Photosynthesis")) {
        const photosynthesisCPM = 0.08 * state.statPercentages.haste * (60 / spellDB["Lifebloom"][0]['tickData']['tickRate'] + (60 / spellDB["Rejuvenation"][0]['tickData']['tickRate'] * 2) + (60 / spellDB["Regrowth"][1]['tickData']['tickRate']));
        castProfile.push({spell: "Lifebloom (Bloom)", label: "Everbloom - Photosynthesis", cpm: photosynthesisCPM, autoSpell: true, flags: {masteryMult: selfMasteryCount}});

        reportingData.photosynthesisCPM = photosynthesisCPM;
    }

    // Calculate Rejuvs needed to maintain 5.
    // Soul of the Forest Rejuvs
    const procs = getCPM(castProfile, "Swiftmend");
    castProfile.push({spell: "Rejuvenation", cpm: procs, mult: 1.6});
    castProfile.push({spell: "Rejuvenation", cpm: procs * 2, autoSpell: true, mult: 1.6});

    // Check how many more rejuvs we need
    const currentRejuvAverage = getCPM(castProfile, "Rejuvenation") * (spellDB["Rejuvenation"][0].buffDuration! / 60)
    getSpellEntry(castProfile, "Rejuvenation").cpm = (5 - currentRejuvAverage) * (60 / spellDB["Rejuvenation"][0].buffDuration!);


    // Insert Grove Guardians
    const groveGuardiansCPM = 0//getSpellEntry(castProfile, "Wild Growth").cpm + (getSpellEntry(castProfile, "Swiftmend").cpm)
    getSpellEntry(castProfile, "Grove Guardians").cpm = groveGuardiansCPM;                                
    getSpellEntry(castProfile, "Dream Bloom").cpm = groveGuardiansCPM;                                                          


    // Calculate initial filler via mana costs
    const spellCosts = Object.fromEntries(Object.keys(spellDB).map((s: string) => [s, (spellDB[s][0].cost || 0) * 250000 / 100]));
    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.autoSpell ? 0 : ((spellCosts[spell.spell] || 0) * spell.cpm! * (spell.manaOverride ?? 1))), 0);

    reportingData.baselineManaPerMinute = baselineCostPerMinute;
    reportingData.spellCosts = spellCosts;

    const fillerMana = manaAvailable - baselineCostPerMinute;
    const manaFillerCasts = fillerMana / (spellCosts["Regrowth"]);

    reportingData.fillerManaPerMinute = fillerMana;
    reportingData.manaFiller = manaFillerCasts;

    // Calculate *time* left, fill it with packages.
    let timeAvailable = 60 - getTimeUsed(castProfile, spellDB, state.statPercentages.haste);
    reportingData.totalTimeAvailable = timeAvailable;
    const timeFiller = timeAvailable / (spellDB["Regrowth"][0].castTime / state.statPercentages.haste);
    reportingData.timeFiller = timeFiller;

    const netFiller = Math.min(manaFillerCasts, timeFiller);
    
    getSpellEntry(castProfile, "Regrowth").cpm = netFiller;

    if (timeFiller > manaFillerCasts) {
        // We had more time left than mana, spend the mana.
    }

    let masterySeconds = 0; // The average number of mastery seconds we've added through the raid.

    if (hasTalent(state.talents, "Nature's Bounty")) {
        // Natures Bounty cleaves Regrowth.
        // We will use an average here, though in most cases we will exceed this average by bunching regrowths.
        const averageRegrowths = getSpellEntry(castProfile, "Regrowth").cpm * 12 / 60;
        castProfile.push({spell: "Regrowth", label: "Nature's Bounty", cpm: getSpellEntry(castProfile, "Regrowth").cpm * averageRegrowths, autoSpell: true, mult: 0.2, customIndex: 0, flags: {overrideOverhealing: 0.45}});
    }

    let averageRegrowthActive = 0;
    // Calculate average mastery stacks globally.
    ["Regrowth", "Rejuvenation", "Wild Growth"].forEach((s: string) => {

        const hotLength = s === "Regrowth" ? spellDB[s][1].buffDuration! : spellDB[s][0].buffDuration!;
        const count = getSpellEntry(castProfile, s).cpm;
        const targets = s === "Wild Growth" ? spellDB[s][0].targets : 1;
        
        masterySeconds += (count * hotLength * targets) / 60 / 20;
        if (s === "Regrowth") averageRegrowthActive = (count * hotLength / 60);
        
        reportingData[`mastery_${s}`] = (count * hotLength * targets) / 60 / 20;
    })
    reportingData.masterySeconds = masterySeconds;

    // Symbiotic Blooms
    if (playerData.heroTree === "Wildstalker") {
        let growths = 0;
        const inverseGrowthCoefficient = 75 / 100;
        const accumulatorReq = 1000;
        const bloomCoefficients = {
            // TODO: We can pull these from spell data. We always have Green thumb so we won't talent check.
            "Wild Growth": 85 * 1.2,
            "Regrowth": 85 * 1.2,
            "Efflorescence": 155 * 1.2, // Divided by number of targets healed
        }
        // Aura Accumulator Initial Value / (Number of Active Auras) ^ (Inverse Coefficient)

        // Wild Growth
        const wildGrowthTickCount = getCPM(castProfile, "Wild Growth") * (spellDB["Wild Growth"][0].buffDuration! / spellDB["Wild Growth"][0].tickData.tickRate) * spellDB["Wild Growth"][0].targets  * state.statPercentages.haste;
        const wildGrowthAcc = wildGrowthTickCount * (bloomCoefficients["Wild Growth"] / (spellDB["Wild Growth"][0].targets ^  inverseGrowthCoefficient));
        reportingData.symbiotic = {}
        reportingData.symbiotic.wildGrowthAcc = wildGrowthAcc;

        // Efflorescence
        const efflorescenceTickCount = 60 / spellDB["Efflorescence"][0].tickData.tickRate * spellDB["Efflorescence"][0].targets * state.statPercentages.haste;
        const efflorescenceAcc = efflorescenceTickCount * (bloomCoefficients["Efflorescence"] / (spellDB["Efflorescence"][0].targets));
        reportingData.symbiotic.efflorescenceAcc = efflorescenceAcc;
        reportingData.efflorescenceTickCount = efflorescenceTickCount;

        // Regrowth 
        const regrowthTickCount = getSpellEntry(castProfile, "Regrowth").cpm * (spellDB["Regrowth"][1].buffDuration! / spellDB["Regrowth"][1].tickData.tickRate)  * state.statPercentages.haste;
        const regrowthAcc = regrowthTickCount * (bloomCoefficients["Regrowth"] / (averageRegrowthActive ^ inverseGrowthCoefficient));
        reportingData.symbiotic.regrowthAcc = regrowthAcc;
        reportingData.regrowthTickCount = regrowthTickCount;
        reportingData.averageRegrowthActive = averageRegrowthActive;

        let symbioticCPM = (regrowthAcc + wildGrowthAcc + efflorescenceAcc) / accumulatorReq;

        // Implant
        if (hasTalent(state.talents, "Implant")) {
            // Implant logic here
            const implantCPM = getCPM(castProfile, "Wild Growth") + getCPM(castProfile, "Swiftmend");
            symbioticCPM += implantCPM;
        }

        castProfile.push({spell: "Symbiotic Blooms", cpm: symbioticCPM, autoSpell: true});
        // Add mastery

        // Add Bursting Growths
        // We get one bursting growth every time a Symbiotic bloom expires, and then a 20% chance of one every 2s one is active.
        const burstingGrowthCPM = symbioticCPM + (symbioticCPM * 0.2 * (spellDB["Symbiotic Blooms"][0].buffDuration! / 2));
        castProfile.push({spell: "Bursting Growth", cpm: burstingGrowthCPM, autoSpell: true});

        // Root Network
        const symbioticAvgStacks = symbioticCPM * spellDB["Symbiotic Blooms"][0].buffDuration! / 60;
        reportingData.rootNetworkAvgStacks = symbioticAvgStacks;

        if (hasTalent(state.talents, "Root Network")) {
            state.statPercentages.genericHealingMult *= (1 + symbioticAvgStacks * 0.02);
        }

        // Vig Creepers
        state.statPercentages.genericHealingMult *= (1 + symbioticAvgStacks * 0.2 / 20);
        

    }


    // Cast triggers
    castProfile.push({spell: "Verdancy", cpm: getCPM(castProfile, "Lifebloom (Bloom)"), autoSpell: true});


    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData, index: number) => {
            let spellOutput = 0;

            if (slice.customScript) {
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else {
                
                if ((spellProfile.customIndex === index) || spellProfile.customIndex === undefined) {
                    spellOutput = getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, spellFlags);
                }
            }


            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            // Handle mastery
            let hotCount = 0;
            if (spellName.includes("Lifebloom")) {
                hotCount = 4; // Our hot stack on ourselves.
            }
            else {
                if (slice.spellType === "buff" && slice.secondaries.includes("mastery")) {
                    // The spell is a hot, it at least scales with its own mastery.
                    // The downside here is that we end up double counting HoTs. This mostly only matters for WG since the 
                    // others are small enough.
                    hotCount = 1;
                }
                hotCount += masterySeconds; // Add the average mastery seconds we've calculated from other spells.
            }

            spellOutput *= 1 + (getMasteryMult(hotCount) * (state.statPercentages.mastery || 0));
            //

            const totalOutput = (spellOutput * effectiveCPM) * (spellProfile.mult ?? 1);

            if (totalOutput > 0) {
                const label = slice.specialLabel ? slice.specialLabel : (spellProfile.label || spellName);

                castBreakdown[label] = (castBreakdown[label] ?? 0) + (effectiveCPM);
                healingBreakdown[label] = (healingBreakdown[label] ?? 0) + (totalOutput);
            }

        })

    })

    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    const totalDamage = 0;

    const result = { damage: totalDamage / 60, healing: totalHealing / 60 }

    if (reporting) {
        console.log(reportingData);
        result.spellBreakdowns = compileProfileReportingData(healingBreakdown, damageBreakdown, castProfile, spellDB, totalHealing, totalDamage)
    }


    return result //{ damage: 0 / 60, healing: totalHealing / 60 }
}