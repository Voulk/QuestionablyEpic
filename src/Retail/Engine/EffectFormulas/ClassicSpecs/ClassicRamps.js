// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { CLASSICDRUIDSPELLDB } from "./PresEvokerSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { runRampTidyUp, getSqrt, addReport, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, 
            getHealth, getCrit, advanceTime, spendSpellCost, getSpellCastTime, queueSpell, deepCopyFunction, runSpell } from "../Generic/RampGeneric/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff, runBuffs } from "../Generic/RampGeneric/BuffBase";
import { genSpell } from "../Generic/RampGeneric/APLBase";
import { applyLoadoutEffects } from "./PresEvokerTalents";

const EVOKERCONSTANTS = {
    
    masteryMod: 1.8, 
    masteryEfficiency: 0.82, 
    baseMana: 250000,

    defaultEmpower: {"Dream Breath": 0, "Spiritbloom": 2, "Fire Breath": 0}, // Note that this is 0 indexed so 3 = a rank4 cast.
    auraHealingBuff: 1.05,
    auraDamageBuff: 1.15,
    goldenHourHealing: 50000,
    enemyTargets: 1, 
    echoExceptionSpells: ['Echo', 'Dream Flight', 'Emerald Communion', 'Blessing of the Bronze', 'Fire Breath', 'Living Flame O', "Temporal Anomaly", 
                            'Disintegrate', 'Rewind', "Stasis", "StasisRelease"], // These are spells that do not consume or otherwise interact with our Echo buff.
    stasisExceptionSpells: ['Dream Flight', 'Emerald Communion', 'Blessing of the Bronze', 'Fire Breath', 'Living Flame O', "Rewind", "Stasis", "StasisRelease"], // Spells that can't be stored in Stasis. Mostly long cooldowns and offensive spells.
    lifebindSpells: ['Spiritbloom', 'Living Flame', /*'Dream Breath', 'Dream Breath (HoT)',*/ 'Emerald Communion', 'Emerald Communion (HoT)'], // re-add dream breath when it uses dynamic targeting.
    

}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, t, spellName, talents) => {
    let mult = EVOKERCONSTANTS.auraDamageBuff;

    mult *= (buffs.filter(function (buff) {return buff.name === "Energy Loop"}).length > 0 ? 1.2 : 1);

    return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = EVOKERCONSTANTS.auraHealingBuff;
    
    return mult;
}


export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, EVOKERCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    // Special cases
    if ('specialMult' in spell) healingVal *= spell.specialMult;

    // Compile healing and add report if necessary.
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + Math.round(healingVal);
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)

    return healingVal;
}

export const runDamage = (state, spell, spellName, compile = true) => {

    const damMultiplier = getDamMult(state, state.activeBuffs, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, EVOKERCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
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
export const runCastSequence = (sequence, stats, settings = {}, incTalents = {}, apl = []) => {
    //console.log("Running cast sequence");
    const startTime = performance.now();
    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, casts: {}, manaSpent: 0, settings: settings, 
                    talents: talents, reporting: true, spec: ""};

    let currentStats = {...stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const sequenceLength = ('seqLength' in settings ? settings.seqLength : 120) * (1 + (Math.random() - 0.5) * 0.2); // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = apl.length > 0 ? "Auto" : "Manual"; // Auto / Manual.

    let castState = {
        nextSpell: 0, // The time when the next spell cast can begin.
        spellFinish: 0, // The time when the cast will finish. HoTs / DoTs can continue while this charges.
        queuedSpell: "",
    }

    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.
    const evokerSpells = applyLoadoutEffects(deepCopyFunction(EVOKERSPELLDB), settings, talents, state, stats, EVOKERCONSTANTS);
    setupEchoSpells(evokerSpells); // Create Echo spells.


    if (settings.preBuffs) {
        // Apply buffs before combat starts. Very useful for comparing individual spells with different buffs active.
        settings.preBuffs.forEach(buffName => {
            if (buffName === "Echo") addBuff(state, evokerSpells["Echo"][1], "Echo");
            else if (buffName === "Temporal Compression") {
                for (let i = 0; i < 4; i++) addBuff(state, EVOKERCONSTANTS.temporalCompressionBuff, "Temporal Compression")
            }
            else if (buffName === "Echo 8") {
                for (let i = 0; i < 10; i++) addBuff(state, evokerSpells["Echo"][1], "Echo");
            }
        })

    }

    // Extra Settings
    if (settings.masteryEfficiency) EVOKERCONSTANTS.masteryEfficiency = settings.masteryEfficiency;

    let seq = [...sequence];

    // Note that while we'll run in 10ms batches here, we also have some optimization to remove dead space.
    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // Advanced reporting
        if (state.settings.advancedReporting && (Math.floor(state.t * 100) % 100 === 0)) {
            const hps = (Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0) / state.t;
            if ('advancedReport' in state === false) state.advancedReport = [];
            state.advancedReport.push({t: Math.floor(state.t*100)/100, hps: hps, manaSpent: state.manaSpent});
        }

        // ---- Heal over time and Damage over time effects ----
        // When we add buffs, we'll also attach a spell to them. The spell should have coefficient information, secondary scaling and so on. 
        // When it's time for a HoT or DoT to tick (state.t > buff.nextTick) we'll run the attached spell.
        // Note that while we refer to DoTs and HoTs, this can be used to map any spell that's effect happens over a period of time. 
        // This includes stuff like Shadow Fiend which effectively *acts* like a DoT even though it is technically not one.
        // You can also call a function from the buff if you'd like to do something particularly special. You can define the function in the specs SpellDB.
        runBuffs(state, stats, evokerSpells, runHeal, runDamage);

        // Check if there is an ongoing cast and if there is, check if it's ended.
        // Check if the next spell is able to be cast, and if so, queue it.
        if ((state.t > castState.nextSpell)) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list

            queueSpell(castState, seq, state, evokerSpells, seqType, apl)

        }
        if (castState.queuedSpell !== "" && state.t >= castState.spellFinish) {
            // We have a queued spell, check if it's finished.
            // Instant spells should proc this immediately.


            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = castState.queuedSpell;
            const fullSpell = evokerSpells[castState.queuedSpell];
            state.casts[spellName] = (state.casts[spellName] || 0) + 1;
            addReport(state, `Casting ${spellName}`);
            spendSpellCost(fullSpell, state);
 

            runSpell(fullSpell, state, spellName, evokerSpells, triggerEssenceBurst, runHeal, runDamage);
            if (checkBuffActive(state.activeBuffs, "Stasis") && !(EVOKERCONSTANTS.stasisExceptionSpells.includes(spellName) && !spellName.includes("Echo"))) { 
                const buff = state.activeBuffs.filter(buff => buff.name === "Stasis")[0];
                if (buff.special.storedSpells.length <= 3) buff.special.storedSpells.push(spellName); buff.stacks += 1;
            }

            

            // Check if Echo
            // If we have the Echo buff active, and our current cast is Echo compatible then:
            // - Recast the echo version of the spell (created at the start of runtime).
            // - The echo versions of spells are a weird mix of exception cases.
            if (checkBuffActive(state.activeBuffs, "Echo") &&  !(EVOKERCONSTANTS.echoExceptionSpells.includes(spellName))) {
                // We have at least one Echo.

                // Check Echo number.
                const echoBuffs = state.activeBuffs.filter(function (buff) {return buff.name === "Echo"});

                // Our Echo buffs can be of different strengths (say, one comes from TA and one from a hard casted Echo).
                // Because of this we'll iterate through our buffs 1 by 1 so we can use the correct Echo value.
                for (let j = 0; j < echoBuffs.length; j++) {
                    
                    const echoBuff = echoBuffs[j];
                    

                    const echoSpell = JSON.parse(JSON.stringify(evokerSpells[spellName + "(Echo)"]));

                    echoSpell.forEach(effect => {
                        if ('coeff' in effect) effect.coeff = effect.coeff * echoBuff.value;
                        if ('value' in effect) effect.value = effect.value * echoBuff.value;
                    })

                    // Unfortunately functions are not copied over when we do our deep clone, so we'll have to manually copy them over.
                    // Possibly just use Lodash or something here. 
                    if (spellName === "Reversion") {
                        echoSpell[0].onApplication = evokerSpells["Reversion"][0].onApplication;
                        echoSpell[0].runFunc= evokerSpells["Reversion"][0].runFunc;
                    }
                    runSpell(echoSpell, state, spellName + "(Echo)", evokerSpells, triggerEssenceBurst, runHeal, runDamage)

                }

                // Remove all of our Echo buffs.

                state.activeBuffs = removeBuff(state.activeBuffs, "Echo"); // state.activeBuffs.filter(function (buff) {return buff.name !== "Echo"})

            }

            // Cleanup
            castState.queuedSpell = "";
            castState.spellFinish = 0;
        }

        if (seq.length === 0 && castState.queuedSpell === "") {
            // We have no spells queued, no DoTs / HoTs and no spells to queue. We're done.
            //state.t = 999;
        }

        // Time optimization
        state.t = advanceTime(state.t, castState.nextSpell, castState.spellFinish, state.activeBuffs);

    }

    runRampTidyUp(state, settings, sequenceLength, startTime)

    return state;

}