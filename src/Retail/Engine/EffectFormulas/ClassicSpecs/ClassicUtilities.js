

import { getHealth } from "../Generic/RampGeneric/RampBase";
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "./ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents } from "./ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPriestSpellDB";
import { applyTalents, deepCopyFunction } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} classicSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
export const applyLoadoutEffects = (classicSpells, settings, state) => {
    const auraHealingBuff = { // THIS IS ADDITIVE WITH OTHER INCREASES
        "Restoration Druid": 0.25,
        "Discipline Priest": 0, // Gets 15% intellect instead.
        "Holy Paladin": 0.1,
        "Holy Priest": 0.25,
        "Restoration Shaman": 0.1, // Also gets 0.5s off Healing Wave / Greater Healing Wave
        "Mistweaver Monk": 0, // Soon :)
    };

    const baseMana = {
        "Restoration Druid": 18635,
        "Discipline Priest": 20590, 
        "Holy Paladin": 23422,
        "Holy Priest": 20590,
        "Restoration Shaman": 23430, 
        "Mistweaver Monk": 0, 
    };

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
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * baseMana[state.spec] / 100;

        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
        // Per Slice scaling
        value.forEach(slice => {
            if (spellInfo.additiveScaling) {
                slice.coeff *= (1 + spellInfo.additiveScaling + (slice.additiveSlice || 0) + auraHealingBuff[state.spec]);
                slice.flat *= (1 + spellInfo.additiveScaling + (slice.additiveSlice || 0) + auraHealingBuff[state.spec]);
            }
        });
    }

    if (state.spec === "Holy Paladin") state.holyPower = 1;


    return classicSpells;
}

export const getTalentedSpellDB = (spec, state) => {
    let spellDB = null;
    let talents = null;

    if (spec.includes("Holy Paladin")) {
        spellDB = paladinSpells;
        talents = paladinTalents;
    }
    else if (spec.includes("Restoration Druid")) {
        spellDB = druidSpells;
        talents = druidTalents;
    }
    else if (spec.includes("Discipline Priest")) {
        spellDB = discSpells;
        talents = discTalents;
    }

    const playerSpells = deepCopyFunction(spellDB);

    applyTalents(state, playerSpells, {intellect: 0, crit: 0})

    applyLoadoutEffects(playerSpells, state.settings, {spec: spec, genericBonus: {healing: 1, damage: 1}});

    console.log("Loadout effects applied");
    return playerSpells;
}

