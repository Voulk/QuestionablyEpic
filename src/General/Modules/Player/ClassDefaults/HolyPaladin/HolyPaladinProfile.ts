
import { getHaste, hasTalent } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { applyTalents, completeCastProfile, convertStatPercentages, getSpellCritChance, getSpellThroughput, printHealingBreakdownWithCPM } from "../Generic/ProfileUtilities";
import { PALADINCONSTANTS } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinRamps";

import { printHealingBreakdown, getSpellEntry } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";
import { defaultTalents, paladinTalents } from "./HolyPaladinTalents";
import specSpellDB from "./HolyPaladinSpellDB.json";
import { runSpellScript } from "../Generic/SpellScripts";

export const holyPaladinProfile = {
    spec: "Holy Paladin",
    name: "Holy Paladin",
    scoreSet: scorePaladinSet,
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

const getCPM = (profile, spellName: string) => {
    const filterSpell = profile.filter(spell => spell.spell === spellName)
    let cpm = 0;
    for (let i = 0; i < filterSpell.length; i++) cpm += filterSpell[i].cpm || 0;

    return cpm;
}



const getBeaconHealing = (beacon: string, healingVal: number, spellName: string) => {
        let beaconHealing = 0;
        let beaconMult = 1;
        if (PALADINCONSTANTS.beaconAoEList.includes(spellName)) beaconMult = 0.5;
        else if (PALADINCONSTANTS.beaconExclusionList.includes(spellName)) beaconMult = 0;
    
        // Beacons
        if (beacon === "Beacon of Light") beaconHealing = healingVal * 0.15 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
        else if (beacon === "Beacon of Faith") beaconHealing = healingVal * 0.105 * 2 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
        else if (beacon === "Beacon of the Savior") beaconHealing = healingVal * 0.25 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
        //else if (state.beacon === "Beacon of Virtue") beaconHealing = (checkBuffActive(state.activeBuffs, "Beacon of Virtue") ? healingVal * 0.1 * 5 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult : 0);
        
        return beaconHealing;
}


export function scorePaladinSet(stats: Stats, playerData: any, settings: PlayerSettings = {}) {
    const spec = "Holy Paladin"; // We'll pass this to a few functions so it's easier to just define it.
    const fightLength = 6;
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    let initialState = {statBonuses: {}, talents: paladinTalents, heroTree: playerData.heroTree, settings: settings};
    const reportingData: any = {};

    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};
    const beaconChoice: string = "Beacon of Faith";

    
    // Apply Talents
    const talents = initialState.talents;
    defaultTalents(initialState.talents, "default", playerData.heroTree);
    applyTalents(initialState, spellDB, initialState.statBonuses);

    // Apply Stats
    const state = { fightLength: 6, spec: spec, statPercentages: convertStatPercentages(stats, initialState.statBonuses, spec, 
                    playerData.masteryEffectiveness), settings: settings, talents: paladinTalents};

    // Handle wings
    const wingsUptime = spellDB["Avenging Wrath"][0].buffDuration / spellDB["Avenging Wrath"][0].cooldownData!.cooldown;
    state.statPercentages.genericHealingMult *= (1 + wingsUptime * 0.15)
    state.statPercentages.crit += (wingsUptime * 0.15)
    

    let castProfile: CastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
        {spell: "Holy Shock", efficiency: 0.9, hastedCPM: true },
        {spell: "Judgment", efficiency: 0.9, hastedCPM: true  },
        {spell: "Divine Toll", efficiency: 0.95 },
        {spell: "Beacon of the Savior", cpm: 60 / 8 + 5, autoSpell: true, label: "Beacon of the Savior (Absorb)" }, // Ticks every 8 seconds.
        {spell: "Avenging Wrath", efficiency: 1 },

        {spell: "Eternal Flame", cpm: 0 }, // Filled later
        {spell: "Light of Dawn", cpm: 0 }, // Filled later

      
    ]

    const spenderUsage = {
        "Light of Dawn": 0.9,
        "Eternal Flame": 0.1,
        "Word of Glory": 0,
    };

    completeCastProfile(castProfile, spellDB, state.statPercentages);
    const spellCosts = Object.fromEntries(Object.keys(spellDB).map((s: string) => [s, spellDB[s][0].cost * 250000 / 100]));
    reportingData.spellCosts = spellCosts;


    // Dawnlight
    if (playerData.heroTree === "Herald of the Sun") {
        const dawnlightCPM = getCPM(castProfile, "Divine Toll") * 2;
        castProfile.push({spell: "Dawnlight", cpm: dawnlightCPM, castTimeOverride: 0})

        // Suns Avatar
        // Every 0.5s it ticks on X allies.
        const sunsAvatarAlliesPerTick = 4;
        const sunsAvatarUptime = dawnlightCPM * 8; // TODO: use spell data.

        castProfile.push({spell: "Sun's Avatar", cpm: sunsAvatarAlliesPerTick * sunsAvatarUptime, autoSpell: true})
    }


    // Hand of Divinity
    if (hasTalent(talents, "Hand of Divinity")) {
        castProfile.push({spell: "Holy Light", cpm: getCPM(castProfile, "Avenging Wrath") * 2, manaOverride: 0.5 })
    }


    // Second Sunrise - Holy Shock
    if (hasTalent(talents, "Second Sunrise")) {
        castProfile.push({spell: "Holy Shock", cpm: getCPM(castProfile, "Holy Shock"), mult: 0.15, autoSpell: true});
    }

    // Handle Divine Toll
    // Could potentially be re-organized.
    if (hasTalent(talents, "Divine Toll")) {
        castProfile.push({spell: "Holy Shock", cpm: getCPM(castProfile, "Divine Toll") * spellDB["Divine Toll"][0].targets, mult: 0.6, autoSpell: true, label: "Holy Shock (Divine Toll)" })
    }
    

    // Free Holy shocks from Glorious Dawn
    getSpellEntry(castProfile, "Holy Shock", 0).cpm *= 1.12;

    // Infusions
    const infusionsPerMinute = getCPM(castProfile, "Holy Shock") * 0.1;
    reportingData.infusionsPerMinute = infusionsPerMinute * (hasTalent(talents, "Inflorescence of the Sunwell") ? 2 : 1);
    castProfile.push({spell: "Flash of Light", cpm: infusionsPerMinute, mult: 3})


    // == Holy Power Spenders ==
    const holyPowerPerMinute = getCPM(castProfile, "Holy Shock") + getCPM(castProfile, "Flash of Light")+ getCPM(castProfile, "Holy Light")  + getCPM(castProfile, "Judgment");
    const averageSpenderCPM = holyPowerPerMinute / 3 * 1.1725; // DP
    
    // Handle Empyrean Legacy
    // Judgment crits per minute + 10% spenders if Awakening is talented
    // Consider Lightsmith too.
    if (hasTalent(talents, "Empyrean Legacy")) {
        let judgmentCritsPerMin = getSpellCritChance(spellDB["Judgment"][0], state.statPercentages) * getCPM(castProfile, "Judgment");

        if (hasTalent(talents, "Awakening")) {
            judgmentCritsPerMin += (averageSpenderCPM * 0.1) + getCPM(castProfile, "Avenging Wrath");
        }

        castProfile.push({spell: "Eternal Flame", cpm: judgmentCritsPerMin, autoSpell: true, label: "Eternal Flame (Empyrean Legacy)" })
        reportingData.empyreanLegacyProcsPerMinute = judgmentCritsPerMin;
    }
    
    
    
    getSpellEntry(castProfile, "Eternal Flame").cpm = averageSpenderCPM * spenderUsage["Eternal Flame"];
    getSpellEntry(castProfile, "Light of Dawn").cpm = averageSpenderCPM * spenderUsage["Light of Dawn"];

    if (hasTalent(talents, "Second Sunrise")) {
        castProfile.push({spell: "Light of Dawn", cpm: getCPM(castProfile, "Light of Dawn"), mult: 0.15, autoSpell: true});
    }

    reportingData.holyPowerPerMinute = holyPowerPerMinute;




    // Handle CDR on Holy Shock and free casts
    // Note that we get some free HS casts here that won't be run for Infusions. Have a think about this. Minor.
    let totalHolyShockCDR = 0;
    /*if (getTalentPoints(state.talents, "crusadersMight")) totalHolyShockCDR += getCPM(castProfile, "Crusader Strike") * 2;
    if (getTalentPoints(state.talents, "imbuedInfusions")) totalHolyShockCDR += totalInfusions * 1;
    const extraHolyShockCPM = totalHolyShockCDR / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown");
    getSpellEntry(castProfile, "Holy Shock").cpm += extraHolyShockCPM;*/

    // Sunsear
    if (hasTalent(talents, "Sun Sear")) {
        const holyShockCritChance =  getSpellCritChance(spellDB["Holy Shock"][0], state.statPercentages);
        const lightOfDawnCritChance = getSpellCritChance(spellDB["Light of Dawn"][0], state.statPercentages);
        
        castProfile.push({spell: "Sun Sear",
                            cpm: getCPM(castProfile, "Holy Shock") * holyShockCritChance +
                                 getCPM(castProfile, "Light of Dawn") * lightOfDawnCritChance,
                                 autoSpell: true
        })

    }

    reportingData.hastePerc = state.statPercentages.haste
    reportingData.statBon = initialState.statBonuses

    // Fillers
    const manaPool = 250000;
    const regen = manaPool * 0.04 * 12;

    const manaAvailable = manaPool / fightLength + regen;
    reportingData.manaAvailable = manaAvailable;

    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.autoSpell ? 0 : (spellCosts[spell.spell] * spell.cpm! * (spell.manaOverride || 1))), 0);
    reportingData.baselineCostPerMinute = baselineCostPerMinute;

    castProfile.forEach(spellEntry => {
        console.log(`${spellEntry.spell}: CPM ${spellEntry.cpm}, Cost per cast: ${spellCosts[spellEntry.spell] * (spellEntry.manaOverride || 1)}
        Total Cost per minute: ${spellEntry.autoSpell? 0 : spellCosts[spellEntry.spell] * spellEntry.cpm! * (spellEntry.manaOverride || 1)}
        at a discount of ${((1 - (spellEntry.manaOverride || 1)) * 100)}%`);
    })

    const fillerMana = manaAvailable - baselineCostPerMinute;
    reportingData.fillerManaPerMinute = fillerMana;

    // Calculate Time Available
    


    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData) => {
            let spellOutput = 0;

            if (slice.customScript) {
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else if (slice.spellType === "heal" || (slice.spellType === "buff" && slice.buffType === "heal")) {
                spellOutput = getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, spellFlags)
            }


            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            const totalOutput = (spellOutput * effectiveCPM * (spellProfile.mult || 1));
            if (totalOutput > 0) {
                const label = spellProfile.label || spellName;

                castBreakdown[label] = (castBreakdown[label] ?? 0) + (effectiveCPM);
                healingBreakdown[label] = (healingBreakdown[label] ?? 0) + (totalOutput);


                // Handle Beacons including any bonus multipliers.
                const beaconHealing = getBeaconHealing(beaconChoice, totalOutput, spellName);
                healingBreakdown["Beacon of Light"] = (healingBreakdown["Beacon of Light"] ?? 0) + (beaconHealing);

                const saviorHealing = getBeaconHealing("Beacon of the Savior", totalOutput, spellName);
                healingBreakdown["Beacon of the Savior"] = (healingBreakdown["Beacon of the Savior"] ?? 0) + (saviorHealing);
            }

        })

    })
    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    printHealingBreakdown(healingBreakdown, totalHealing);

    console.log(reportingData)
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { damage: 0 / 60, healing: totalHealing / 60 }
}