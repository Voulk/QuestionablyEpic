
import { runSpellScript } from "../Generic/SpellScripts";
import specSpellDB from "./RestoShamanSpellDB.json";
import { shamanTalents } from "./RestoShamanTalents";
import { printHealingBreakdownWithCPM, convertStatPercentages, getSpellEntry, updateSpellCPM, buildCPM, getSpellThroughput, applyTalents, completeCastProfile } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";

export const restoShamanProfile = {
    spec: "Restoration Shaman",
    name: "Restoration Shaman Classic",
    scoreSet: scoreShamanSet,
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

// PlayerData needs some work to be a fully formed idea still. I'll fix its typing later.
export function scoreShamanSet(stats: Stats, playerData: any, settings: PlayerSettings = {}) {
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));

    // This will be sent to applyTalents and then we'll turn it into a proper state variable afterwards.
    let initialState = {statBonuses: {}, talents: shamanTalents, heroTree: playerData.heroTree};
    const reportingData: any = {};
    
    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    // Apply Talents
    applyTalents(initialState, spellDB, initialState.statBonuses);
    
    // The state variable that will be passed into each spell calculation. 
    const state = { fightLength: 6, spec: "Restoration Shaman", statPercentages: convertStatPercentages(stats, initialState.statBonuses, "Restoration Shaman"), settings: settings, talents: shamanTalents};

    let castProfile: CastProfile = [
        {spell: "Riptide", efficiency: 0.9}
        // Add Spells here
    ]

    // Convert efficiencies to effect CPMs. Handle any special overrides.
    completeCastProfile(castProfile, spellDB);

    // Handle mana and begin to construct filler spells.
    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost! * spell.cpm!)), 0);
    reportingData.baselineManaPerMinute = baselineCostPerMinute;

    // Sum the healing of each spell. Some of this can be shared between specs, others might need spec-specific implementations.
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData) => {
            let spellOutput = 0;

            if (slice.customScript) {
                // Spells that do things that are too complex for generic throughput calculations.
                // These are often scripted in-game too, like Wild Growth.
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else {
                // Get how much healing or damage we expect the spell to do.
                // We'll need to make a damage vs healing determination at some point but I'm still thinking about it.
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
    const totalDamage = Object.values(damageBreakdown).reduce((sum: number, val: number) => sum + val, 0);

    console.log(reportingData);
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { damage: totalDamage / 60, healing: totalHealing / 60 }
}