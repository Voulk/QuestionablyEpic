
import { getHaste, hasTalent } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { applyTalents, completeCastProfile, convertStatPercentages, getSpellThroughput, printHealingBreakdownWithCPM } from "../Generic/ProfileUtilities";
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
    let genericHealingIncrease = 1;
    let genericCritIncrease = 1;
    

    let castProfile: CastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
        {spell: "Holy Shock", efficiency: 0.9, hastedCPM: true },
        {spell: "Judgment", efficiency: 0.9, hastedCPM: true  },
        {spell: "Divine Toll", efficiency: 0.95 },

        {spell: "Eternal Flame", cpm: 0 }, // Filled later
        {spell: "Light of Dawn", cpm: 0 }, // Filled later

      
      //{spell: "Regrowth", efficiency: 0 },
    ]

    const spenderUsage = {
        "Light of Dawn": 1,
        "Eternal Flame": 0,
        "Word of Glory": 0,
    };

    completeCastProfile(castProfile, spellDB);


    // Second Sunrise
    if (hasTalent(talents, "Second Sunrise")) castProfile.push({spell: "Holy Shock", cpm: getCPM(castProfile, "Holy Shock") * 0.15, mult: 0.3});
   

    // Dawnlight
    if (playerData.heroTree === "heraldOfTheSun") {
        const dawnlightCPM = getCPM(castProfile, "Avenging Wrath") * 4 + getCPM(castProfile, "Holy Prism") * 2;
        getSpellEntry(castProfile, "Dawnlight").cpm = dawnlightCPM;
    
    }

    // Haste our CPMs
    castProfile.forEach(spellProfile => {
        if (spellProfile.hastedCPM) spellProfile.cpm = spellProfile.cpm * state.statPercentages.haste;
    })


    // Handle Divine Toll
    // Could potentially be re-organized.
    castProfile.push({spell: "Holy Shock", cpm: getCPM(castProfile, "Divine Toll") * spellDB["Divine Toll"][0].targets, mult: 0.6, label: "Holy Shock (Divine Toll)" })

    // Free Holy shocks from Glorious Dawn
    getSpellEntry(castProfile, "Holy Shock", 0).cpm *= 1.12;
    //getSpellEntry(castProfile, "Holy Shock", 1).cpm *= 1.12;


    // Fill in missing casts like Holy Words. Adjust any others that are impacted.
    const holyPowerPerMinute = getCPM(castProfile, "Holy Shock") + getCPM(castProfile, "Crusader Strike") + getCPM(castProfile, "Flash of Light")+ getCPM(castProfile, "Holy Light")  + getCPM(castProfile, "Judgment");
    const averageSpenderCPM = holyPowerPerMinute / 3 * 1.1725; // DP
    getSpellEntry(castProfile, "Eternal Flame").cpm = averageSpenderCPM * spenderUsage["Eternal Flame"];
    getSpellEntry(castProfile, "Light of Dawn").cpm = averageSpenderCPM * spenderUsage["Light of Dawn"];

    reportingData.holyPowerPerMinute = holyPowerPerMinute;

    // Infusion Count
    const totalInfusions = getCPM(castProfile, "Holy Shock") * 0.1;




    // Handle CDR on Holy Shock and free casts
    // Note that we get some free HS casts here that won't be run for Infusions. Have a think about this. Minor.
    let totalHolyShockCDR = 0;
    /*if (getTalentPoints(state.talents, "crusadersMight")) totalHolyShockCDR += getCPM(castProfile, "Crusader Strike") * 2;
    if (getTalentPoints(state.talents, "imbuedInfusions")) totalHolyShockCDR += totalInfusions * 1;
    const extraHolyShockCPM = totalHolyShockCDR / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown");
    getSpellEntry(castProfile, "Holy Shock").cpm += extraHolyShockCPM;*/

        // Sunsear
    if (hasTalent(talents, "Sun Sear")) {
        const holyShockCritChance = state.statPercentages.crit + (spellDB["Holy Shock"][0].statMods?.crit || 0) - 1;
        const lightOfDawnCritChance = state.statPercentages.crit + (spellDB["Light of Dawn"][0].statMods?.crit || 0) - 1;
        
        castProfile.push({spell: "Sun Sear",
                            cpm: getCPM(castProfile, "Holy Shock") * holyShockCritChance +
                                 getCPM(castProfile, "Light of Dawn") * lightOfDawnCritChance,
        })

    }

    reportingData.hastePerc = state.statPercentages.haste
    reportingData.statBon = initialState.statBonuses


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