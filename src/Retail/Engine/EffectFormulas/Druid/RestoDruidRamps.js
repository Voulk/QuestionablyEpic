// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { DRUIDSPELLDB } from "./RestoDruidSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { runRampTidyUp, getSqrt, addReport, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, 
    getHealth, getCrit, getMastery, advanceTime, spendSpellCost, getSpellCastTime, queueSpell, deepCopyFunction, runSpell, applyTalents } from "../Generic/RampGeneric/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff, runBuffs } from "../Generic/RampGeneric/BuffBase";

const DRUIDCONSTANTS = {
    
    masteryMod: 0.5, 
    masteryEfficiency: 0.80, 
    baseMana: 2500000, // 2.5m

    auraHealingBuff: 1,
    auraDamageBuff: 1,
    enemyTargets: 1, 
    echoExceptionSpells: [], // These are spells that do not consume or otherwise interact with our Echo buff.

    yserasGift: {
        // Regrowth HoT portion
        name: "Ysera's Gift",
        buffType: "heal",
        buffDuration: 9999,
        coeff: 0, // The coefficient for a single regrowth tick.
        flatHeal: 0,
        tickData: {tickRate: 5, canPartialTick: false, tickOnCast: false, hasted: false}, 
        expectedOverheal: 0.4,
        secondaries: []
    }
}


/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} druidSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 const applyLoadoutEffects = (druidSpells, settings, talents, state, stats) => {

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



    // ==== Talents ====
    // Not all talents just make base modifications to spells, but those that do can be handled here.


    // Setup mana costs & cooldowns.

    for (const [key, value] of Object.entries(druidSpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];


        if ('school' in spellInfo && spellInfo.school === "bronze" && talents.temporalCompression) {
            druidSpells[key].push({
                name: "Temporal Compression",
                type: "buff",
                canStack: true,
                stacks: 1,
                maxStacks: 4,
                value: 0.05 * talents.temporalCompression,
                buffDuration: 999,
                buffType: 'special',
            })
        }
        if ('school' in spellInfo && spellInfo.school === "green" && talents.lushGrowth) {
            value.forEach(spellSlice => {
                if ('name' in spellSlice && (spellSlice.name === "Panacea" || spellSlice.name === "Fluttering Seedlings")) return; // Exception case.
                spellSlice.coeff *= (1 + 0.05 * talents.lushGrowth);
            });
        }

        if (spellInfo.targets && 'maxAllyTargets' in settings) Math.max(spellInfo.targets, settings.maxAllyTargets);
        if (!spellInfo.targets) spellInfo.targets = 1;
        if (spellInfo.cooldown) spellInfo.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * DRUIDCONSTANTS.baseMana / 100;
       
        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
    }

    if (settings.t31_2) {}
    if (settings.t31_4) {}


    // ==== Tier Sets ====

    return druidSpells;
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    let mult = DRUIDCONSTANTS.auraDamageBuff;

    mult *= (buffs.filter(function (buff) {return buff.name === "Energy Loop"}).length > 0 ? 1.2 : 1);

    return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = DRUIDCONSTANTS.auraHealingBuff *= 1.06; // Not taking Nurt is trolling so we won't even check for it. 
    const treeActive = state.activeBuffs.filter(buff => buff.name === "Incarnation: Tree of Life").length > 0;

    if (treeActive) mult *= 1.15; // Not affected by tree: External healing sources (not included anyway), Ysera's Gift
    if (spellName.includes("Rejuvenation")) mult *= treeActive ? 1.5 : 1;
    

    return mult;
}


export const runHeal = (state, spell, spellName, targetNum = 0) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, DRUIDCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    // Calculate Mastery
    // Druid mastery is based on the number of mastery stacks on the target.
    // For this reason we will track specific targets on our spells.
    // For direct spells like Regrowth, it might be fairer to use an average instead. 
    let masteryStacks = 0;
    if (spellName === "Wild Growth") {
        // Check avg stack counts. Could also just take a mastery average across the raid.
        
        // This calculates an average stack count. We know it'll always benefit from itself, and then we'll take an average of other HoTs across the raid.
        masteryStacks = state.activeBuffs.filter(buff => ["Wild Growth"].includes(buff.name)).length +
                                state.activeBuffs.filter(buff => ["Rejuvenation"].includes(buff.name)).length / 20;

    }
    if (["Rejuvenation (HoT)"].includes(spellName)) {
        // Check stacks on target.
        masteryStacks = state.activeBuffs.filter(buff => buff.target.includes(targetNum)).length;
        
    } // TODO: Generate target at start of cast so that direct and HoT portions don't end up on different people etc.

    healingVal *= (1+getMastery(currentStats, DRUIDCONSTANTS) * masteryStacks);
    
    // Special cases
    if ('specialMult' in spell) healingVal *= spell.specialMult;

    // Abundance
    if (spellName.includes("Regrowth" && state.talents.abundance.points > 0)) {
        // Reduce price of Regrowth by 8% per active Rejuv, to a maximum of 12 stacks (96% reduction).
        const abundanceStacks = state.activeBuffs.filter(buff => buff.name === "Rejuvenation").length;
        const crit = getCrit(currentStats);
        healingVal *= Math.max(abundanceStacks * 0.08 + crit, 2) / crit;
    }

    // Compile healing and add report if necessary.
    state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)

    return healingVal;
}

export const runDamage = (state, spell, spellName, atonementApp, compile = true) => {

    //const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, 0, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, DRUIDCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage`)
    return damageVal;
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
export const runCastSequence = (sequence, stats, settings = {}, talents = {}, apl = []) => {
    //console.log("Running cast sequence");

    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    /*
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    } */


    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, casts: {}, manaSpent: 0, settings: settings, 
        talents: talents, reporting: true, heroSpec: "Keeper of the Grove", currentTarget: 0};

    let currentStats = {...stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)


    const sequenceLength = 45; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = "Manual" // Auto / Manual.

    let castState = {
        nextSpell: 0, // The time when the next spell cast can begin.
        spellFinish: 0, // The time when the cast will finish. HoTs / DoTs can continue while this charges.
        queuedSpell: "",
    }

    const startTime = performance.now();
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.

    const druidSpells = applyLoadoutEffects(deepCopyFunction(DRUIDSPELLDB), settings, talents, state, stats);
    applyTalents(state, druidSpells, stats)

    const yserasGift = {...DRUIDCONSTANTS.yserasGift};
    yserasGift.flatHeal = getHealth(state.currentStats, talents) * 0.05;
    //addBuff(state, yserasGift, "Ysera's Gift");

    // Extra Settings
    if (settings.masteryEfficiency) DRUIDCONSTANTS.masteryEfficiency = settings.masteryEfficiency;

    const seq = [...sequence];

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        runBuffs(state, stats, druidSpells, runHeal, runDamage);



        // If instant and on GCD: spellFinish = state.t, nextSpell = gcd / haste
        // If instant and off GCD: spellFinish = state.t, nextSpell = state.t + 0.01
        // If casted: spellFinish = state.t + castTime, nextSpell = state.t + 0.01


        if ((state.t > castState.nextSpell)) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list
            queueSpell(castState, seq, state, druidSpells, seqType, apl)

        }
        if (castState.queuedSpell !== "" && state.t >= castState.spellFinish) {
            // We have a queued spell, check if it's finished.
            // Instant spells should proc this immediately.


            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = castState.queuedSpell;
            const fullSpell = druidSpells[castState.queuedSpell];
            state.casts[spellName] = (state.casts[spellName] || 0) + 1;
            addReport(state, `Casting ${spellName}`);
            spendSpellCost(fullSpell, state, spellName);
 
            runSpell(fullSpell, state, spellName, druidSpells, null, runHeal, runDamage);


            // Cleanup
            castState.queuedSpell = "";
            castState.spellFinish = 0;
        }

        if (seq.length === 0 && castState.queuedSpell === ""/* && healBuffs.length === 0 */) {
            // We have no spells queued, no DoTs / HoTs and no spells to queue. We're done.
            //state.t = 999;
        }
    }


    // Add up our healing values (including atonement) and return it.
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    //state.activeBuffs = [];
    state.totalDamage = Object.keys(state.damageDone).length > 0 ? Math.round(sumValues(state.damageDone)) : 0;
    state.totalHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
    state.talents = {};
    state.hps = (state.totalHealing / sequenceLength);
    state.dps = (state.totalDamage / sequenceLength);
    state.hpm = (state.totalHealing / state.manaSpent) || 0;

    const endTime = performance.now();
    //console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return state;

}


