
// THIS FILE COULD BE MERGED WITH CLASSICBASE.


import { getHealth } from "../Generic/RampBase";
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "./Druid/ClassicDruidSpellDB";
import { CLASSICMONKSPELLDB as monkSpells, monkTalents } from "./Monk/ClassicMonkSpellDB";

import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents } from "./Paladin/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB as priestSpells, compiledDiscTalents as discTalents, compiledHolyTalents as holyPriestTalents } from "General/Modules/Player/ClassDefaults/Classic/Priest/ClassicPriestSpellDB";
import { applyTalents, deepCopyFunction } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { getCritPercentage } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";

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
    const auraHealingBuff = { // 
        "Restoration Druid": 0.15,
        "Discipline Priest": 0, // 
        "Holy Paladin": 0.05, // Holy Insight needs to be handled per-spell because it differs for spenders.
        "Holy Priest": 0,
        "Restoration Shaman": 0, // Also gets 0.5s off Healing Wave / Greater Healing Wave
        "Mistweaver Monk": 0.2, // Serpent Stance
    };

    const baseMana = {
        "Restoration Druid": 60000,
        "Discipline Priest": 300000, 
        "Holy Paladin": 60000,
        "Holy Priest": 300000,
        "Restoration Shaman": 60000, 
        "Mistweaver Monk": 300000, // PLACEHOLDER. NOT A REAL VALUE.
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
        if (settings.testMode === "Yes") {
            // We use Test Mode for testing that spells line up. So it removes stuff that'll get in the way of that.
            value.forEach(spellSlice => {
                if ('secondaries' in spellSlice) spellSlice.secondaries = [];
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;
            })
        }
        // Per Slice scaling
        value.forEach(slice => {
            if (spellInfo.additiveScaling) {
                slice.coeff *= (1 + spellInfo.additiveScaling + (slice.additiveSlice || 0));
                slice.flat *= (1 + spellInfo.additiveScaling + (slice.additiveSlice || 0));
            }
            if (slice.type === "heal" || slice.buffType === "heal") {
                slice.coeff *= (1 + auraHealingBuff[state.spec]);
                slice.flat *= (1 + auraHealingBuff[state.spec]);
                
                if (slice.weaponScaling) slice.weaponScaling *= (1 + auraHealingBuff[state.spec]);
            }

        });
    }

    if (state.spec === "Holy Paladin") state.holyPower = 1;

    return classicSpells;
}

export const getTickCount = (spell, haste) => {
    const hastePerc = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : haste;
    const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
    
    const tickCount = Math.round(spell.buffDuration / (adjTickRate));

    return tickCount;
}

export const getSpellThroughput = (spell, spellProfile, statProfile, fillerCPM, baseHastePerc, specialMult) => {

    let genericMult = 1 * (spellProfile.bonus ? spellProfile.bonus : 1);

    const critPercentage = getCritPercentage(statProfile, "Holy Priest"); // +4% crit
    const spellCritPercentage = critPercentage + ((spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0);
    const critEffect = ('statMods' in spell && spell.statMods.critEffect) ? spell.statMods.critEffect : 2;
    const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (spellCritPercentage * critEffect + (1 - critPercentage)) : 1;
    
    const additiveScaling = (spell.additiveScaling || 0) + 1;
    const cpm = (spellProfile.cpm + ( spellProfile.fillerSpell ? (fillerCPM * spellProfile.fillerRatio) : 0)) * (spellProfile.hastedCPM ? baseHastePerc : 1);

    const targetCount = spell.targets ? spell.targets : 1;

    if (specialMult) genericMult *= specialMult;

    const spellThroughput = (spell.flat + spell.coeff * statProfile.spellpower) 
                        * critMult 
                        * targetCount  
                        * genericMult 
                        * ((1 - spell.expectedOverheal) || 1);

    return spellThroughput;
}

export const logHeal = (breakdown, spellName, value, spell = {}) => {
    const adjName = spell.name ? spell.name : spellName;
    breakdown[adjName] = (breakdown[adjName] || 0) + value;
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
        talents = state.talents;
    }
    else if (spec.includes("Discipline Priest")) {
        spellDB = priestSpells;
        talents = discTalents;
    }
    else if (spec.includes("Holy Priest")) {
        spellDB = priestSpells;
        talents = holyPriestTalents;
    }
    else if (spec.includes("Mistweaver Monk")) {
        spellDB = monkSpells;
        talents = monkTalents;
    }

    const playerSpells = deepCopyFunction(spellDB);

    applyTalents(state, playerSpells, {intellect: 0, crit: 0})

    applyLoadoutEffects(playerSpells, state.settings, {spec: spec, genericBonus: {healing: 1, damage: 1}});

    return playerSpells;
}

