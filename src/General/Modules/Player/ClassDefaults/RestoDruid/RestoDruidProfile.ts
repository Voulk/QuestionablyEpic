
import { runSpellScript } from "../Generic/SpellScripts";
import specSpellDB from "./RestoDruidSpellDB.json";
import { defaultTalents, druidTalents } from "./RestoDruidTalents";
import { printHealingBreakdownWithCPM, convertStatPercentages, getSpellEntry, updateSpellCPM, buildCPM, getSpellThroughput, applyTalents, completeCastProfile } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";


export const restoDruidProfile = {
    spec: "Restoration Druid",
    name: "Restoration Druid Classic",
    scoreSet: scoreDruidSet,
    defaultStatProfile: { 
        // Our stats we want to run through the profile. 
        // You can change and play with these as much as you want.
        // All user-facing operations will set their own anyway like in Top Gear.
        intellect: 2000,
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

export function scoreDruidSet(stats: Stats, playerData: any, settings: PlayerSettings = {}) {

    const fightLength = 6;
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    let initialState = {statBonuses: {}, talents: druidTalents, heroTree: playerData.heroTree};
    const reportingData: any = {};

    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    
    // Apply Talents
    defaultTalents(initialState.talents, "default", playerData.heroTree);
    applyTalents(initialState, spellDB, initialState.statBonuses);

    // Apply Stats
    const state = { fightLength: 6, spec: "Restoration Druid", statPercentages: convertStatPercentages(stats, initialState.statBonuses, "Restoration Druid"), settings: settings, talents: druidTalents};

    // Cast Profile
    // Maybe use manaOverride instead of freeCast
    let castProfile: CastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      
      {spell: "Swiftmend", efficiency: 0.9 },
      {spell: "Wild Growth", efficiency: 0.8 },
      {spell: "Efflorescence", cpm: 2 }, // If Lifetreading, remove mana & cast time cost. Maybe via flag?
      {spell: "Lifebloom", cpm: 4 }, // Does not include blooms.
      {spell: "Lifebloom (Bloom)", cpm: 4 }, // Does not proc if we extend Lifebloom with Verdant Infusion so adjust down in that case.

      {spell: "Grove Guardians", cpm: 0 },
      {spell: "Dream Bloom", cpm: 0 },
      {spell: "Rejuvenation", cpm: 0 },
      //{spell: "Regrowth", efficiency: 0 },
    ]

    completeCastProfile(castProfile, spellDB);
    

    const manaPool = 250000;
    const regen = manaPool * 0.04 * 12;

    const manaAvailable = manaPool / fightLength + regen;
    reportingData.manaAvailable = manaAvailable;

    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost! * spell.cpm!)), 0);
    reportingData.baselineManaPerMinute = baselineCostPerMinute;

    const fillerMana = manaAvailable - baselineCostPerMinute;
    reportingData.fillerManaPerMinute = fillerMana;



    // Insert Grove Guardians
    const groveGuardiansCPM = 0//getSpellEntry(castProfile, "Wild Growth").cpm + (getSpellEntry(castProfile, "Swiftmend").cpm)
    getSpellEntry(castProfile, "Grove Guardians").cpm = groveGuardiansCPM;                                
    getSpellEntry(castProfile, "Dream Bloom").cpm = groveGuardiansCPM;                                                          


    // Calculate initial filler via mana costs
    getSpellEntry(castProfile, "Rejuvenation").cpm = fillerMana / getSpellEntry(castProfile, "Rejuvenation").cost!;

    // Calculate *time* left, fill it with packages.

    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData) => {
            let spellOutput = 0;

            if (slice.customScript) {
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else {
                spellOutput = getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, spellFlags)
            }


            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            const totalOutput = (spellOutput * effectiveCPM);
            if (totalOutput > 0) {
                castBreakdown[spellName] = (castBreakdown[spellName] ?? 0) + (effectiveCPM);
                healingBreakdown[spellName] = (healingBreakdown[spellName] ?? 0) + (totalOutput);
            }

        })

    })
    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);

    console.log(reportingData)
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { damage: 0 / 60, healing: totalHealing / 60 }
}