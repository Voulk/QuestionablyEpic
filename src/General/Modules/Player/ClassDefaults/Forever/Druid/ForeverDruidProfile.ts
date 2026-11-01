import { CastProfile, PlayerSettings, SpellData, Stats } from "globalTypes";
import ForeverDruidTalentData from "./ForeverDruidTalentData.json";  
import { applyRaidBuffs, runForeverSpell, runProfileSpellForever } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilitiesForever";
import { convertStatPercentagesForever } from "../../Generic/ProfileUtilitiesForever";
import druidRawTalents from "./ForeverDruidTalentData.json";
import { compileProfileReportingData, completeCastProfile } from "../../Generic/ProfileUtilities";
import specSpellDB from "./ForeverDruidSpellDB.json";

export const foreverDruidProfile = {
    spec: "Restoration Druid Forever",
    name: "Restoration Druid Forever",
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
    defaultTalents: "dBX1BZeyW4fs0AAEHP", // ForeverDruidTalentData
}

export function scoreDruidSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting = false) {
    const fightLength = 3;
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));

    let initialState = {statBonuses: applyRaidBuffs(settings), talents: null, specSettings: {}};
    const reportingData: any = {};

    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    // Apply Talents
    let druidTalents = JSON.parse(JSON.stringify(druidRawTalents));


    // Apply Stats
    const state = { fightLength: 6, spec: "Restoration Druid Forever", statPercentages: convertStatPercentagesForever(stats, initialState.statBonuses, "Restoration Druid Forever"), settings: settings, talents: druidTalents};

    // Cast Profile
    // Maybe use manaOverride instead of freeCast
    let castProfile: CastProfile = [
        //{spell: "Tranquility", cpm: 0.3},
        
        {spell: "Regrowth Rank 9", cpm: 1 }, // We have two charges
    ]

    completeCastProfile(castProfile, spellDB, state.statPercentages);

    const manaPool = 250000;
    const regen = manaPool * 0.04 * 12;

    // Run Spells
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData, index: number) => {
            let spellOutput = 0;

            if (slice.customScript) {
                // Custom script handling
                //spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else {
                // (spellName, fullSpell, statPercentages, spec, settings, flags = {})
                if ((spellProfile.customIndex === index) || spellProfile.customIndex === undefined) {
                    spellOutput = runForeverSpell(spellName, slice, state.statPercentages, state.spec, state.settings, spellFlags);
                }
            }


            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;


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