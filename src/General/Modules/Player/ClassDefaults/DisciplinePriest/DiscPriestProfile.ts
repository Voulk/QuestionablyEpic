
import { runSpellScript } from "../Generic/SpellScripts";
import specSpellDB from "./DiscSpellDB.json";
import { defaultTalents, discPriestTalents } from "./DiscPriestTalents";
import { printHealingBreakdownWithCPM, convertStatPercentages, getSpellEntry, updateSpellCPM, buildCPM, getSpellThroughput, applyTalents, completeCastProfile } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";


export const discPriestProfile = {
    spec: "Discipline Priest",
    name: "Discipline Priest",
    scoreSet: scoreDiscPriestSet,
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



export function scoreDiscPriestSet(stats: Stats, playerData: any, settings: PlayerSettings = {}) {

    const fightLength = 6;
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    let initialState = {statBonuses: {}, talents: discPriestTalents, heroTree: playerData.heroTree};
    const reportingData: any = {};

    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    
    // Apply Talents
    defaultTalents(initialState.talents, "default", playerData.heroTree);
    applyTalents(initialState, spellDB, initialState.statBonuses);

    // Apply Stats
    const state = { fightLength: 6, spec: "Discipline Priest", statPercentages: convertStatPercentages(stats, initialState.statBonuses, "Discipline Priest"), settings: settings, talents: discPriestTalents};

    // Cast Profile
    // Maybe use manaOverride instead of freeCast
    let castProfile: CastProfile = [

    ]

    completeCastProfile(castProfile, spellDB);

    const evangSeq = [];
    

    const manaPool = 250000;
    const regen = manaPool * 0.04 * 12;

    const manaAvailable = manaPool / fightLength + regen;
    reportingData.manaAvailable = manaAvailable;

    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost! * spell.cpm!)), 0);
    reportingData.baselineManaPerMinute = baselineCostPerMinute;

    const fillerMana = manaAvailable - baselineCostPerMinute;
    reportingData.fillerManaPerMinute = fillerMana;


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