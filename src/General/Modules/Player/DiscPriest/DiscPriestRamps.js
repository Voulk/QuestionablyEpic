// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";
import { buildRamp } from "./DiscRampGen";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { addReport, checkBuffActive, removeBuffStack, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, removeBuff, getBuffStacks, getHealth, extendBuff, addBuff, getBuffValue } from "Retail/Engine/EffectFormulas/Generic/RampBase";

// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.
const discSettings = {
    chaosBrand: true,
    critMult: 2,

    aegisOfWrathWastage: 0.06 // Consumed within 2 seconds on average.
}

const DISCCONSTANTS = {
    baseMana: 50000,
    masteryMod: 1.35,
    masteryEfficiency: 1,

    auraHealingBuff: 1, 
    auraDamageBuff: 0.94,
    
    atonementMults: {"shadow": 1, "holy": 1},
    shadowCovenantSpells: ["Halo", "Divine Star", "Penance", "PenanceTick"],
    enemyTargets: 1, 
    sins: {0: 1.3, 1: 1.3, 2: 1.3, 3: 1.3, 4: 1.3, 5: 1.3, 6: 1.26, 7: 1.22, 8: 1.18, 9: 1.15, 10: 1.12,
            11: 1.09, 12: 1.07, 13: 1.05, 14: 1.04, 15: 1.03, 16: 1.025, 17: 1.02, 18: 1.015, 19: 1.0125, 20: 1.01}, // TODO: Change when Sins buff goes live.
    shieldDisciplineEfficiency: 0.8,
}   

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} discSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 const applyLoadoutEffects = (discSpells, settings, talents, state, stats) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    if (settings['DefaultLoadout']) {
        settings['T29_2'] = true;
        settings['T29_4'] = true;

    }

    // ==== Talents ====
    // Not all talents just make base modifications to spells, but those that do can be handled here.

    if (talents.throesOfPain) {
        // ASSUMPTION: Throes of Pain should work on both DoTs but let's double check anyway.
        discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.03 * talents.throesOfPain);
        discSpells['Purge the Wicked'][0].coeff *= (1 + 0.03 * talents.throesOfPain);

        discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.03 * talents.throesOfPain);
        discSpells['Purge the Wicked'][1].coeff *= (1 + 0.03 * talents.throesOfPain);
    }

    // Disc specific talents.
    // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.

    // Tier 1 talents

    if (talents.painfulPunishment) {
        // Add a DoT extension to PenanceTick
        discSpells['PenanceTick'].push({
            type: "buffExtension",
            buffName: "Shadow Word: Pain",

            extension: 1.5,
        })
        discSpells['PenanceTick'].push(
        {
            type: "buffExtension",
            buffName: "Purge the Wicked",
            extension: 1.5,
    })
    }
    if (talents.maliciousIntent) discSpells['Schism'][1].buffDuration += 6;
    if (talents.enduringLuminescence) discSpells['Power Word: Radiance'][0].atonement *= 1.1;
    if (talents.shieldDiscipline) discSpells['Power Word: Shield'][0].cost -= (0.5 * DISCCONSTANTS.shieldDisciplineEfficiency);

    // Tier 2 talents
    if (talents.revelInPurity) {
        discSpells['Purge the Wicked'][0].coeff *= (1 + 0.05 * talents.revelInPurity);
        discSpells['Purge the Wicked'][1].coeff *= (1 + 0.05 * talents.revelInPurity);
    }
    if (talents.exaltation) {
        discSpells['Rapture'][1].buffDuration += 5;
    }
    if (talents.painAndSuffering) {
        // ASSUMPTION: Throes of Pain should work on both DoTs but let's double check anyway.
        discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.075 * talents.painAndSuffering);
        discSpells['Purge the Wicked'][0].coeff *= (1 + 0.075 * talents.painAndSuffering);
        discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.075 * talents.painAndSuffering);
        discSpells['Purge the Wicked'][1].coeff *= (1 + 0.075 * talents.painAndSuffering);
    }
    if (talents.borrowedTime) {
        discSpells['Power Word: Shield'].push({
            type: "buff",
            buffType: 'statsMult',
            stat: 'haste',
            value: (1 + 0.04 * talents.borrowedTime), // This is equal to 4% haste.
            buffDuration: 4,
        })

    }
    if (talents.indemnity) discSpells['Power Word: Shield'][0].atonement += 2;
    if (talents.castigation) {
        discSpells['Penance'][0].bolts += 1;
        discSpells['DefPenance'][0].bolts += 1;
    }
    if (talents.contrition) {
        discSpells['DefPenanceTick'].push({
            type: "function",
            runFunc: function (state, atonementApp) {
                const atonementCount = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
                const spell = {type: "heal", coeff: 0.0936 * talents.contrition, overheal: 0.2, secondaries: ['crit', 'vers', 'mastery'], targets: atonementCount}
                runHeal(state, spell, "Contrition");
            }
        })
    }
    if (talents.stolenPsyche) discSpells['Mind Blast'][0].atonementBonus = (1 + 0.2 * talents.stolenPsyche);

    // Tier 3 talents
    if (talents.trainOfThought) {
        // Can be mostly handled in RampGen.
    }
    if (talents.blazeOfLight) {
        //+7.5% to Penance / Smite.
        discSpells['Penance'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
        discSpells['Smite'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
        discSpells['Power Word: Solace'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
    }
    if (talents.divineAegis) {
        // Can either just increase crit mod, or have it proc on all healing events as a separate line (too messy?).
        // Note that we increase our crit modifier by twice the amount of Divine Aegis since it's a wrapper around the entire crit.
        stats.critMult *= (1 + 0.03 * talents.divineAegis);

    }
    if (talents.wrathUnleashed) {
        discSpells["Light's Wrath"][0].castTime -= 1;
        discSpells["Light's Wrath"][0].critMod = 0.15;
        discSpells["Light's Wrath"].push({
            type: "buff",
            name: "Wrath Unleashed",
            buffType: 'special',
            value: 1.4, //
            buffDuration: 15,
        })
        // TODO: Add Smite buff
    }
    if (talents.harshDiscipline && settings.harshDiscipline) {
        // Can probably just add a buff on sequence start for the first Penance.
        state.activeBuffs.push({name: "Harsh Discipline", expiration: 999, buffType: "special", value: 3, stacks: 1, canStack: false})
    }
    if (talents.expiation) {
        discSpells["Mind Blast"][0].coeff *= 1.1;
        discSpells["Shadow Word: Death"][0].coeff *= 1.1;
        // TODO: Add special function to Mindblast / SWD spell that consumes SWP
        discSpells["Mind Blast"].push(
        {
            type: "function",
            runFunc: function (state, atonementApp) {
                const temp = state.activeBuffs.filter(buff => buff.name === "Purge the Wicked" || buff.name === "Shadow Word: Pain");
                if (temp.length > 0) {
                    const expiationDuration = 3 * talents.expiation;
                    const buff = temp[0];

                    const ticks = Math.min(expiationDuration, (buff.expiration - state.t)) / buff.tickRate; // TODO: Add Haste
                    const attSpell = {...buff.attSpell};
                    attSpell.coeff *= ticks;

                    runDamage(state, attSpell, "Expiation", atonementApp);

                    buff.expiration -= expiationDuration;
                    if (state.t > buff.expiration) {
                        removeBuffStack(state.activeBuffs, "Purge the Wicked");
                        removeBuffStack(state.activeBuffs, "Shadow Word: Pain");
                    }
                }

            }

        })
    }
    if (talents.darkIndulgence) {
        discSpells["Mind Blast"][0].cost *= 0.6; // 40% cost reduction.
        discSpells["Mind Blast"][0].charges = 2;
    }
    if (talents.twilightEquilibrium) {
        // This is not required to be implemented here, and is done elsewhere.

    }
    if (talents.inescapableTorment) {
        // TODO: Add two spell components, an AoE damage spell and a Shadowfiend / Mindbender duration increase function spell component.
    }
    if (talents.embraceShadow) {
        discSpells["Shadow Covenant"][1].buffDuration += 8;
    }
    if (talents.twilightCorruption) {
        // Shadow Covenant increases damage / healing by an extra 10%.
        discSpells["Shadow Covenant"][1].value += 0.1;
    }
    if (talents.crystallineReflection) {
        discSpells["Power Word: Shield"].push({
            name: "Crystalline Reflection",
            type: "heal",
            coeff: 0.42,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.6,
        })
        discSpells["Rapture"].push({
            name: "Crystalline Reflection",
            type: "heal",
            coeff: 0.42,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.6,
        })
    }
    if (talents.aegisOfWrath) {
        discSpells["Power Word: Shield"][0].coeff *= 1.3 * (1 - discSettings.aegisOfWrathWastage);
    }
    if (talents.makeAmends) {
        // We can kind of model this, but benefit isn't really going to be concentrated on ramps.
    }
    if (talents.shatteredPerceptions) {
        discSpells['Mindgames'][0].coeff *= 1.25;
        discSpells['Mindgames'][1].coeff *= 1.25;
    }
    if (talents.wealAndWoe) {
        // Penance bolts increase the damage of Smite by 8% per stack, or Power Word: Shield by 3% per stack.
        discSpells["PenanceTick"].push({
            type: "buff",
            name: "Weal & Woe",
            buffType: 'special',
            value: 1.12, // This is equal to 45% crit, though the stats are applied post DR. 
            buffDuration: 15,
            canStack: true,
            stacks: 1,
            maxStacks: 7,
        })
    }

    // Tier 4 talents
    if (talents.improvedFlashHeal) discSpells["Flash Heal"][0].coeff *= 1.15;
    if (talents.bindingHeals) {
        discSpells["Flash Heal"].push({
            type: "heal",
            coeff: discSpells["Flash Heal"][0].coeff * 0.2,
            atonement: 15,
            atonementPos: 'end',
            targets: 1,
            secondaries: ['crit', 'vers'],
            overheal: 0.5,
        })
    }

    // Settings
    if (settings.execute === "Always") discSpells["Shadow Word: Death"][0].coeff *= 2.5
    else if (settings.execute === "20% of the time") discSpells["Shadow Word: Death"][0].coeff *= (2.5 * 0.2 + 0.8);
        
    if (settings.T29_2) {
        // Power Word: Shield increases the damage of the next cast by 10%.
        discSpells["Power Word: Shield"].push({
            type: "buff",
            name: "Light Weaving",
            buffType: 'special',
            value: 1.1, // This is a 10% damage buff that's consumed on our next damage spell.
            buffDuration: 15,
            canStack: false,
            stacks: 1,
            maxStacks: 1,
        })
    }
    if (settings.T29_4) {
        // Power Word: Shield increases the damage of the next cast by 10%.
        discSpells["Penance"].push({
            type: "buff",
            name: "T29_4",
            buffType: 'special',
            value: 0, // This is a 10% damage buff that's consumed on our next damage spell.
            buffDuration: 15,
            canStack: false,
            stacks: 1,
            maxStacks: 1,
        })
    }


    // ==== Legendaries ====
    // Note: Some legendaries do not need to be added to a ramp and can be compared with an easy formula instead like Cauterizing Shadows.
    // Unity Note: Unity is automatically converted to the legendary it represents and should not have an entry here.


    // -- Shadow Word: Manipulation --
    // SWM has two effects. 
    // -> First, it buffs the healing / absorb portion of the spell by 10%.
    // -> Secondly, it adds a large crit buff when the absorb is used. This can technically vary from 0->50% but we'll use an average of 45%.
    if (settings['Shadow Word: Manipulation']) {
        discSpells['Mindgames'][1].coeff *= 1.1; 

        discSpells['Mindgames'].push({
            type: "buff",
            castTime: 0,
            cost: 0,
            cooldown: 0,
            buffType: 'statsMult',
            stat: 'crit',
            value: 45 * 35, // This is equal to 45% crit, though the stats are applied post DR. 
            buffDuration: 10,
    })
    }; 

    // -- Penitent One --
    // Power Word: Radiance has a chance to make your next Penance free, and fire 3 extra bolts.
    // This is a close estimate, and could be made more accurate by tracking the buff and adding ticks instead of power.
    if (talents.evenfall2) { // TODO
        // Penitent One is a bit odd in that it is technically a percentage chance rather than a guarantee.
        // We could roll for the probability on Radiance cast but this is problematic because a weaker set could beat a stronger one
        // based on stronger rolls during Top Gear.
        // To get around this, we'll add the ticks always, but lower their strength according to the percentage chance to proc.
        // On a double radiance then we have an 84% chance to get a proc so we'll multiply our 3 extra Penance ticks by that number.

        // To recap:
        // Penance without proc: 3 ticks at 100% strength.
        // Penance with proc: 6 ticks at 100% strength.
        // Including probability: Penance with proc is 6 ticks at 92% strength (3 + 3 * 0.84)
        discSpells['Power Word: Radiance'].push({
            name: "Penitent One",
            type: "buff",
            buffType: "special",
            value: 6,
            buffDuration: 20,
            castTime: 0,
            stacks: 1,
            canStack: false, 
        });

    }

    // ==== Tier & Other Effects ====
    // Remember that anything that isn't wired into a ramp can just be calculated normally (like Genesis Lathe for example).

    

    // If player doesn't have 4T28, then we might still opt to start them with a PotDS proc on major ramps since the chance of it being active is extremely high.
    // This is unnecessary with 4pc since we'll always have a PotDS proc during our sequences due to Radiance always coming before Penance.
    if (settings['Power of the Dark Side']) {
        state.activeBuffs.push({name: "Power of the Dark Side", expiration: 999, buffType: "special", value: 1.5, stacks: 1, canStack: true})
    }  
    
    // ==== Trinkets ====
    // These settings change the stat value prescribed to a given trinket. We call these when adding trinkets so that we can grab their value at a specific item level.
    // When adding a trinket to this section, make sure it has an entry in DiscSpellDB first prescribing the buff duration, cooldown and type of stat.
    //if (settings["Instructor's Divine Bell"]) discSpells["Instructor's Divine Bell"][0].value = settings["Instructor's Divine Bell"];
    if (settings["Instructor's Divine Bell (new)"]) discSpells["Instructor's Divine Bell (new)"][0].value = settings["Instructor's Divine Bell (new)"];
    if (settings["Flame of Battle"]) discSpells["Flame of Battle"][0].value = settings["Flame of Battle"];
    if (settings['Shadowed Orb']) discSpells['Shadowed Orb'][0].value = settings['Shadowed Orb'];
    if (settings['Soulletting Ruby']) discSpells['Soulletting Ruby'][0].value = settings['Soulletting Ruby'];
    if (settings["Voidmender's Shadowgem"]) discSpells["Voidmender's Shadowgem"][0].value = settings["Voidmender's Shadowgem"];
    //

    // Setup mana costs & cooldowns.
    for (const [key, value] of Object.entries(discSpells)) {
        let spell = value[0];

        if (!spell.targets) spell.targets = 1;
        if (spell.cooldown) spell.activeCooldown = 0;
        if (spell.cost) spell.cost = spell.cost * DISCCONSTANTS.baseMana / 100;

        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('overheal' in spellSlice) spellSlice.overheal = 0;
                if ('atoneOverheal' in spellSlice) spellSlice.atoneOverheal = 0;
            })

        }
    }

    // Set Rapture to Power Word: Shield.
    // That way anything that buffs PW:S will also buff Rapture.
    discSpells['Rapture'][0] = {...discSpells['Power Word: Shield'][0]};

    return discSpells;
}

/**  Extend all active atonements by @extension seconds. This is triggered by Evanglism / Spirit Shell. */
const extendActiveAtonements = (atoneApp, timer, extension) => {
    atoneApp.forEach((application, i, array) => {
        if (application >= timer) {
            array[i] = application + extension;
        };
    });
}



/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents, spell) => {
    const sins = DISCCONSTANTS.sins;
    let schism = 1;

    if (spellName !== "Mindbender" && spellName !== "Shadowfiend") {
        schism = buffs.filter(function (buff) {return buff.name === "Schism"}).length > 0 ? 1.15 : 1; 
    }
    
    let mult = schism //* sins[activeAtones];
    //console.log("Spell: " + spellName + ". Mult: " + mult);
    if (discSettings.chaosBrand) mult = mult * 1.05;
    if (spellName === "PenanceTick") {

        if (checkBuffActive(buffs, "Power of the Dark Side")) {
            const potdsMult = buffs.filter(function (buff) {return buff.name === "Power of the Dark Side"})[0].value;
            mult = mult * potdsMult;
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Power of the Dark Side")
        }
        if (checkBuffActive(buffs, "Swift Penitence")) {

            const spMult = buffs.filter(function (buff) {return buff.name === "Swift Penitence"})[0].value
            mult = mult * spMult;
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Swift Penitence")
        }
    }
    else if (spellName === "Light's Wrath") mult *= (1 + (0.06 + talents.resplendentLight * 0.02) * activeAtones);

    if (checkBuffActive(buffs, "Twilight Equilibrium - Shadow") && "school" in spell && spell.school === "shadow" && !spellName.includes("dot")) {
        mult *= 1.15;
        state.activeBuffs = removeBuffStack(state.activeBuffs, "Twilight Equilibrium - Shadow");
    }
    if (checkBuffActive(buffs, "Twilight Equilibrium - Holy") && "school" in spell && spell.school === "holy" && !spellName.includes("dot")) {
        mult *= 1.15;
        if (!spellName.includes("PenanceTick")) state.activeBuffs = removeBuffStack(state.activeBuffs, "Twilight Equilibrium - Holy");
    }
    if (checkBuffActive(buffs, "Shadow Covenant") && "school" in spell && spell.school === "shadow") {
        mult *= getBuffValue(state.activeBuffs, "Shadow Covenant") || 1; // Should realistically never return undefined.;
    }
    if (checkBuffActive(buffs, "Wrath Unleashed") && spellName === "Smite") mult *= 1.4;

    if (checkBuffActive(buffs, "Weal & Woe") && spellName === "Smite") {
        mult *= (1 + getBuffStacks(buffs, "Weal & Woe") * 0.08);
        state.activeBuffs = removeBuff(state.activeBuffs, "Weal & Woe");
    }
    if (checkBuffActive(buffs, "Light Weaving")) {
        mult *= 1.1;
        state.activeBuffs = removeBuff(state.activeBuffs, "Light Weaving");
    }
    return mult; 
}

/**
 * This acts as a Penance cleanup function since we'll often want buffs to last the duration of the Penance cast instead of just the tick.
 * @param {*} state 
 */
const penanceCleanup = (state) => {
    removeBuffStack(state.activeBuffs, "Twilight Equilibrium - Holy");
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, buffs, t, spellName, talents) => {
    let mult = DISCCONSTANTS.auraHealingBuff;
    if (spellName === "Power Word: Shield" && checkBuffActive(buffs, "Rapture")) {
        mult *= 1.4;
    }
    if (spellName === "DefPenanceTick") {

        if (checkBuffActive(buffs, "Power of the Dark Side")) {
            const potdsMult = buffs.filter(function (buff) {return buff.name === "Power of the Dark Side"})[0].value;
            mult = mult * potdsMult;
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Power of the Dark Side")
        }
        if (checkBuffActive(buffs, "Swift Penitence")) {

            const spMult = buffs.filter(function (buff) {return buff.name === "Swift Penitence"})[0].value
            mult = mult * spMult;
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Swift Penitence")
        }
    }
    if (checkBuffActive(buffs, "Weal & Woe") && spellName === "Power Word: Shield") {
        mult *= (1 + getBuffStacks(buffs, "Weal & Woe") * 0.03);
        state.activeBuffs = removeBuff(state.activeBuffs, "Weal & Woe");
    }
    if (checkBuffActive(buffs, "Light Weaving")) {
        mult *= 1.1;
        state.activeBuffs = removeBuff(state.activeBuffs, "Light Weaving");
    }
    return mult;
}


/**
 * The number of atonements currently active. These are stored separately from regular buffs for speed and to separate them from buffs on the active player.
 * @param atoneApp An array storing our atonement expiry times.
 * @param timer The current time
 * @returns Number of active atonements.
 */
const getActiveAtone = (atoneApp, timer) => {
    let count = 0;
    atoneApp.forEach(application => {
        if (application >= timer) {
            count++;
        };
    });
    return count;
}


// Current atonement transfer rate.
// Diminishing returns are taken care of in the getCurrentStats function and so the number passed 
// to this function can be considered post-DR.
const getAtoneTrans = (mastery) => {
    const atonementBaseTransfer = 0.4;
    return atonementBaseTransfer * (1.108 + mastery / 180 * DISCCONSTANTS.masteryMod / 100);
}

const getSqrt = (targets, sqrtMin) => {
    return Math.min(Math.sqrt(sqrtMin / targets), 1) * targets;
}

// This function is for time reporting. It just rounds the number to something easier to read. It's not a factor in any results.
const getTime = (t) => {
    return Math.round(t*1000)/1000
}

// Some spells do more than the usual amount of atonement healing. An example might be through Abssal Reverie.
// We'll handle those here.
const getAtonementBonus = (state, spell) => {
    return DISCCONSTANTS.atonementMults[getSpellSchool(state, spell)] || 1
}

// Get a spells school.
// Generally this is just set in the SpellDB but Disc has an override too in Shadow Covenant that temporarily converts
// some spells to Shadow so we'll handle all of that in this function here.
const getSpellSchool = (state, spell) => {
    if (DISCCONSTANTS.shadowCovenantSpells.includes(spell.name) && checkBuffActive(state.activeBuffs, "Shadow Covenant")) return "shadow";
    else return spell.school || "";

}

export const runHeal = (state, spell, spellName, specialMult = 1) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.activeBuffs, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const flatHealBonus = (spellName === "Power Word: Shield" && checkBuffActive(state.activeBuffs, "T29_4")) ? state.activeBuffs.filter(function (buff) {return buff.name === "T29_4"})[0].value : 0

    const healingVal = getSpellRaw(spell, currentStats, DISCCONSTANTS, flatHealBonus) * (1 - spell.overheal) * healingMult * targetMult;
    //console.log("Healing value: " + getSpellRaw(spell, currentStats, DISCCONSTANTS));
    state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;

    if (!spellName.includes("hot") || true) {
        let base = `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.overheal * 100}%`;
        if (targetMult > 1) base += `, ${spell.targets} targets`;
        if (spell.atonement) base += `, +${spell.atonement}s atone`;
        base += ")";
        //if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.overheal * 100}%)`)
        addReport(state, base);
    }

    if ((spell.name === "Power Word: Shield" || spell.name === "Rapture") && state.talents.crystallineReflection) {
        const reflection = {
            type: "damage",
            coeff: 0,
            atoneOverheal: 0,
            school: "holy",
            secondaries: ['crit', 'vers'],
            flatDamage: getSpellRaw(spell, currentStats, DISCCONSTANTS) * healingMult * 0.1 * state.talents.crystallineReflection
        };
        runDamage(state, reflection, "Crystalline Reflection", []);
    }
}

export const runDamage = (state, spell, spellName, atonementApp) => {

    const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, activeAtonements, state.t, spellName, state.talents, spell); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, DISCCONSTANTS) * damMultiplier;
    const atonementHealing = Math.round(activeAtonements * damageVal * getAtoneTrans(state.currentStats.mastery) * (1 - spell.atoneOverheal) * getAtonementBonus(state, spell));
    // This is stat tracking, the atonement healing will be returned as part of our result.
    state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    state.healingDone['atonement'] = (state.healingDone['atonement'] || 0) + atonementHealing;

    if (!spellName.includes("dot")) addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage (${atonementHealing} atone)`)
    //if (state.reporting) console.log(getTime(state.t) + " " + spellName + ": " + damageVal + ". Buffs: " + JSON.stringify(state.activeBuffs) + " to " + activeAtonements);
    if (spellName === "PenanceTick" && checkBuffActive(state.activeBuffs, "T29_4")) {
        addReport(state, `Penance added ${Math.round(damageVal * 0.6)} healing to 4T29 buff)`)
        const buff = state.activeBuffs.filter(function (buff) {return buff.name === "T29_4"})[0]
        buff.value += damageVal * 0.6;
    }
}

/**
 * Run a full cast sequence. This is where most of the work happens. It runs through a short ramp cycle in order to compare the impact of different trinkets, soulbinds, stat loadouts,
 * talent configurations and more. Any effects missing can be easily included where necessary or desired.
 * @param {} sequence A sequence of spells representing a ramp. Note that in two ramp cycles like alternating Fiend / Boon this function will cover one of the two (and can be run a second
 * time for the other).
 * @param {*} stats A players base stats that are found on their gear. This doesn't include any effects which we'll apply in this function.
 * @param {*} settings Any special settings. We can include soulbinds, legendaries and more here. Trinkets should be included in the cast sequence itself and conduits are handled below.
 * @param {object} conduits Any conduits we want to include. The conduits object is made up of {ConduitName: ConduitLevel} pairs where the conduit level is an item level rather than a rank.
 * @returns The expected healing of the full ramp.
 */
export const runCastSequence = (sequence, incStats, settings = {}, incTalents = {}) => {
    //console.log("Running cast sequence");
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    let state = {t: 0, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true}
    let stats = JSON.parse(JSON.stringify(incStats));
    stats.critMult = 2;
    stats.versatility += 720 // Phial.

    let atonementApp = []; // We'll hold our atonement timers in here. We keep them seperate from buffs for speed purposes.
    let nextSpell = 0;

    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.
    const discSpells = applyLoadoutEffects(deepCopyFunction(DISCSPELLS), settings, talents, state, stats);

    const seq = [...sequence];
    const sequenceLength = 55; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.

    // Setup Trinkets
    if (settings.trinkets) {
        Object.keys(settings.trinkets).forEach((key) => {
            if (key in discSpells) {
                const spell = discSpells[key][0];
                spell.value = settings.trinkets[key];
                
            }
        })
    }

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // Check for any expired atonements. 
        atonementApp = atonementApp.filter(function (buff) {return buff > state.t});
        
        // ---- Heal over time and Damage over time effects ----
        // When we add buffs, we'll also attach a spell to them. The spell should have coefficient information, secondary scaling and so on. 
        // When it's time for a HoT or DoT to tick (state.t > buff.nextTick) we'll run the attached spell.
        // Note that while we refer to DoTs and HoTs, this can be used to map any spell that's effect happens over a period of time. 
        // This includes stuff like Shadow Fiend which effectively *acts* like a DoT even though it is technically not one.
        // You can also call a function from the buff if you'd like to do something particularly special. You can define the function in the specs SpellDB.
        const healBuffs = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType === "function") && state.t >= buff.next})
        if (healBuffs.length > 0) {
            healBuffs.forEach((buff) => {
                let currentStats = {...stats};
                state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

                if (buff.buffType === "heal") {
                    const spell = buff.attSpell;
                    runHeal(state, spell, buff.name + " (hot)")
                }
                else if (buff.buffType === "damage") {
                    const spell = buff.attSpell;
                    runDamage(state, spell, buff.name + " (dot)", atonementApp)
                }
                else if (buff.buffType === "function") {
                    const func = buff.attFunction;
                    func(state);
                } 
                buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
            });  
        }

        // -- Partial Ticks --
        // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
        // If your Shadow Word: Pain ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
        // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
        const expiringHots = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage") && state.t >= buff.expiration && buff.canPartialTick})
        expiringHots.forEach(buff => {
            const tickRate = buff.tickRate / getHaste(state.currentStats)
            const partialTickPercentage = 1 - ((buff.next - state.t) / tickRate);
            const spell = buff.attSpell;
            spell.coeff = spell.coeff * partialTickPercentage;
            
            if (buff.buffType === "damage") runDamage(state, spell, buff.name + " (dot)", atonementApp);
            else if (buff.buffType === "heal") runHeal(state, spell, buff.name + " (hot)")
        })

        // Remove any buffs that have expired. Note that we call this after we handle partial ticks. 
        state.activeBuffs = state.activeBuffs.filter(function (buff) {return buff.expiration > state.t});

        // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
        // It'll also auto-cast Ascended Eruption if Boon expired.
        if ((state.t > nextSpell && seq.length > 0))  {
            const spellName = seq.shift();
            const fullSpell = discSpells[spellName];

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // We'll iterate through the different effects the spell has.
            // Smite for example would just trigger damage (and resulting atonement healing), whereas something like Mind Blast would trigger two effects (damage,
            // and the absorb effect).
            state.manaSpent += fullSpell[0].cost;
            fullSpell.forEach(spell => {

                // The spell is an atonement applicator. Add atonement expiry time to our array.
                // The spell data will tell us whether to apply atonement at the start or end of the cast.
                if (spell.atonement) {
                    for (var i = 0; i < spell.targets; i++) {
                        let atoneDuration = spell.atonement;
                        //if (settings['Clarity of Mind'] && (spellName === "Power Word: Shield") && checkBuffActive(state.activeBuffs, "Rapture")) atoneDuration += 6;
                        if (spell.atonementPos === "start") atonementApp.push(state.t + atoneDuration);
                        else if (spell.atonementPos === "end") atonementApp.push(state.t + spell.castTime + atoneDuration);

                    }
                }
        
                // The spell has a healing component. Add it's effective healing.
                // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
                if (spell.type === 'heal') {
                    runHeal(state, spell, spellName)
                }
                
                // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
                else if (spell.type === 'damage') {
                    runDamage(state, spell, spellName, atonementApp)
                }

                // The spell extends atonements already active. This is specific to Evanglism. 
                else if (spell.type === "atonementExtension") {
                    extendActiveAtonements(atonementApp, state.t, spell.extension);
                }
                // The spell extends atonements already active. This is specific to Evanglism. 
                else if (spell.type === "buffExtension") {
                    extendBuff(state.activeBuffs, state.t, spell.buffName, spell.extension);
                }
                // The spell extends atonements already active. This is specific to Evanglism. 
                else if (spell.type === "function") {
                    spell.runFunc(state, atonementApp);
                }

                // The spell adds a buff to our player.
                // We'll track what kind of buff, and when it expires.
                else if (spell.type === "buff") {
                    addBuff(state, spell, spellName);
                }

                // These are special exceptions where we need to write something special that can't be as easily generalized.
                // Penance will queue either 3 or 6 ticks depending on if we have a Penitent One proc or not. 
                // These ticks are queued at the front of our array and will take place immediately. 
                // This can be remade to work with any given number of ticks.
                else if (spellName === "Penance" || spellName === "DefPenance") {
                    
                    let penanceBolts = discSpells[spellName][0].bolts;
                    let penanceCoeff = discSpells[spellName][0].coeff;
                    let penTickName = spellName === "Penance" ? "PenanceTick" : "DefPenanceTick";

                    if (checkBuffActive(state.activeBuffs, "Penitent One")) {
                        penanceBolts += 3;
                        removeBuffStack(state.activeBuffs, "Penitent One"); 
                    }
                    else if (checkBuffActive(state.activeBuffs, "Harsh Discipline")) {
                        penanceBolts += 3;
                        removeBuffStack(state.activeBuffs, "Harsh Discipline");
                    }

                    discSpells[penTickName][0].castTime = 2 / penanceBolts;
                    discSpells[penTickName][0].coeff = penanceCoeff;
                    for (var i = 0; i < penanceBolts; i++) {
                        seq.unshift(penTickName);
                    }
                }

                if (state.talents.twilightEquilibrium && spell.type === 'damage') {
                    // If we cast a damage spell and have Twilight Equilibrium then we'll add a 6s buff that 
                    // increases the power of our next cast of the opposite school by 15%.
                    //const spellSchool = spell.school;
                    const spellSchool = getSpellSchool(state, spell);

                    if ('school' in spell && spellSchool === "holy") {
                        // Check if buff already exists, if it does add a stack.
                        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === "Twilight Equilibrium - Shadow"}).length;
                        if (buffStacks === 0) state.activeBuffs.push({name: "Twilight Equilibrium - Shadow", expiration: (state.t + spell.castTime + 6) || 999, buffType: "special", value: 1.15, stacks: 1, canStack: false});
                        else {
                            const buff = state.activeBuffs.filter(buff => buff.name === "Twilight Equilibrium - Shadow")[0]
                            buff.expiration = state.t + spell.castTime + 6;
                        }
                    }
                    else if ('school' in spell && spellSchool === "shadow") {
                        // Check if buff already exists, if it does add a stack.
                        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === "Twilight Equilibrium - Holy"}).length;
                        if (buffStacks === 0) state.activeBuffs.push({name: "Twilight Equilibrium - Holy", expiration: (state.t + spell.castTime + 6) || 999, buffType: "special", value: 1.15, stacks: 1, canStack: false});
                        else {
                            const buff = state.activeBuffs.filter(buff => buff.name === "Twilight Equilibrium - Holy")[0]
                            buff.expiration = state.t + spell.castTime + 6;
                        }
                    }
                    // If Spell doesn't have a school, or if it does and it's not Holy / Shadow, then ignore.
                }

                // Penance ticks are a bit weird and need to be cleaned up when we're done with them. 
                if (spellName === "PenanceTick" && seq[0] !== "PenanceTick") penanceCleanup(state);
                
                // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
                
            });   
            nextSpell += (fullSpell[0].castTime / getHaste(currentStats));
        }
    }


    // Add up our healing values (including atonement) and return it.
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    state.totalDamage = Object.keys(state.damageDone).length > 0 ? Math.round(sumValues(state.damageDone)) : 0;
    state.totalHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
    state.hps = (state.totalHealing / sequenceLength);
    state.dps = (state.totalDamage / sequenceLength);
    state.hpm = (state.totalHealing / state.manaSpent) || 0;

    return state;

}

// This is a boilerplate function that'll let us clone our spell database to avoid making permanent changes.
// We need this to ensure we're always running a clean DB, free from any changes made on previous runs.
const deepCopyFunction = (inObject) => {
    let outObject, value, key;
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
  
    for (key in inObject) {
      value = inObject[key];
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value);
    }
  
    return outObject;
  };

