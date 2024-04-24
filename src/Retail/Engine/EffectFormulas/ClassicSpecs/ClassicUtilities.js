

import { getHealth } from "../Generic/RampGeneric/RampBase";

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} classicSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
export const applyLoadoutEffects = (classicSpells, settings, talents, state, stats, CONSTANTS) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    settings['DefaultLoadout'] = true;
    if (settings['DefaultLoadout']) {
        settings.t31_2 = true;
        settings.t31_4 = true;
    }


    // Setup mana costs & cooldowns.
    for (const [key, value] of Object.entries(classicSpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];
        
        if ('cooldownData' in spellInfo && spellInfo.cooldownData.cooldown) spellInfo.cooldownData.activeCooldown = 0;

        if (spellInfo.targets && 'maxAllyTargets' in settings) Math.max(spellInfo.targets, settings.maxAllyTargets);
        if (!spellInfo.targets) spellInfo.targets = 1;
        if ('cooldownData' in spellInfo && spellInfo.cooldownData.cooldown) spellInfo.cooldownData.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * CONSTANTS.baseMana[state.spec] / 100;

        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
    }


    return classicSpells;
}

