// 
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";
import { buildRamp } from "./DiscRampGen";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { getSqrt, addReport, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, 
            getHealth, getCrit, getSpellCastTime, spendSpellCost } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff, runBuffs, extendBuff, getBuffValue } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/BuffBase";
import { applyLoadoutEffects } from "./DiscPriestTalents";
import { genSpell } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/APLBase";
import { STATCONVERSION } from "General/Engine/STAT"
import { printHealingBreakdown, getTrinketData } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ProfileShared"; 

// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.
const discSettings = {
    chaosBrand: true,
    critMult: 2,

    aegisOfWrathWastage: 0.06 // Consumed within 2 seconds on average.
}

export const DISCCONSTANTS = {
    baseMana: 500000, // Note that this is multiplied by 5 to get our actual mana pool.
    masteryMod: 1.35,
    masteryEfficiency: 1,

    atonementBaseTransfer: 0.28,
    auraHealingBuff: 0.97, 
    auraDamageBuff: {
        periodic: 1,
        direct: 1,
        pet: 1.17,
    },
    
    atonementMults: {"shadow": 1, "holy": 1},
    shadowCovenantSpells: ["Halo", "Divine Star", "DefPenance", "DefPenanceTick"],
    enemyTargets: 1, 
    sins: {0: 1.2, 1: 1.2, 2: 1.2, 3: 1.2, 4: 1.2, 5: 1.2, 
            6: 1.175, 7: 1.15, 8: 1.125, 9: 1.1, 10: 1.075,
            11: 1.055, 12: 1.04, 13: 1.025, 14: 1.02, 15: 1.015, 
            16: 1.0125, 17: 1.01, 18: 1.0075, 19: 1.006, 20: 1.005},
    shieldDisciplineEfficiency: 0.8,
}   


/**  Extend all active atonements by @extension seconds. This is triggered by Evanglism. */
const extendActiveAtonements = (atoneApp, timer, extension) => {
    atoneApp.forEach((application, i, array) => {
        if (application >= timer) {
            array[i] = application + extension;
        };
    });
}

/**  Extend the atonement closest to expiry. */
const extendLowestAtonement = (atoneApp, timer, extension) => {
  // Extend the lowest value since this is the Atonement application closest to expiry.
  const minIndex = atoneApp.indexOf(Math.min(...atoneApp));

  // Extend that atonement by X seconds where X = extension
  atoneApp[minIndex] += extension;

  return minIndex;

}



/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 1-40% damage buff depending on number of active atonements. (See the sins array in DISCCONSTANTS for specific values).
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents, spell) => {
    let sinMult = 1;
    let schism = 1;
    let mult = 1;

    // Some of our buffs don't apply to our pet attacks. We'll include those here.
    if (spellName !== "Mindbender" && spellName !== "Shadowfiend") {
        schism = buffs.filter(function (buff) {return buff.name === "Schism"}).length > 0 ? 1.1 : 1; 
        sinMult = DISCCONSTANTS.sins[activeAtones];
        mult = schism * sinMult;
    }
    else if (spellName === "Inescapable Torment") {
        // IT is a special baby that uses both player and pet auras.
        mult *= DISCCONSTANTS.auraDamageBuff.direct * DISCCONSTANTS.auraDamageBuff.pet;
    }
    else {
        // Pet special cases.
        mult *= DISCCONSTANTS.auraDamageBuff.pet;
    }
    
    
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

    if (checkBuffActive(buffs, "Twilight Equilibrium - Shadow") && "school" in spell && spell.school === "shadow" && !spellName.includes("dot")) {
        mult *= 1.15;
        state.activeBuffs = removeBuffStack(state.activeBuffs, "Twilight Equilibrium - Shadow");
    }
    if (checkBuffActive(buffs, "Twilight Equilibrium - Holy") && "school" in spell && spell.school === "holy" && !spellName.includes("dot")) {
        mult *= 1.15;
        if (!spellName.includes("PenanceTick")) state.activeBuffs = removeBuffStack(state.activeBuffs, "Twilight Equilibrium - Holy");
    }
    if (checkBuffActive(buffs, "Shadow Covenant") && getSpellSchool(state, spellName, spell) === "shadow") {
        mult *= getBuffValue(state.activeBuffs, "Shadow Covenant") || 1; // Should realistically never return undefined.;
        //addReport(state, `Shadow Covenant buffed ${spellName} by ${getBuffValue(state.activeBuffs, "Shadow Covenant") * 100}%`)
    }

    if (checkBuffActive(buffs, "Weal & Woe") && (spellName === "Smite")) {
        mult *= (1 + getBuffStacks(buffs, "Weal & Woe") * 0.2);
        state.activeBuffs = removeBuff(state.activeBuffs, "Weal & Woe");
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
const getHealingMult = (state, buffs, spellName, spell) => {
    let mult = DISCCONSTANTS.auraHealingBuff;
    if (spellName === "DefPenanceTick") {

        if (checkBuffActive(buffs, "Power of the Dark Side")) {
            const potdsMult = buffs.filter(function (buff) {return buff.name === "Power of the Dark Side"})[0].value;
            mult = mult * potdsMult;
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Power of the Dark Side")
        }
    }
    if (checkBuffActive(buffs, "Weal & Woe") && spellName === "Power Word: Shield") {
        mult *= (1 + getBuffStacks(buffs, "Weal & Woe") * 0.05);
        state.activeBuffs = removeBuff(state.activeBuffs, "Weal & Woe");
    }
    if (checkBuffActive(buffs, "Shadow Covenant") && getSpellSchool(state, spellName, spell) === "shadow") {
        mult *= getBuffValue(state.activeBuffs, "Shadow Covenant") || 1; // Should realistically never return undefined.;
    }
    if (checkBuffActive(buffs, "Premonition of Piety")) {
        console.log(spellName + " getting " + getBuffValue(state.activeBuffs, "Premonition of Piety") + " buff from Piety")
        mult *= (1 + getBuffValue(state.activeBuffs, "Premonition of Piety")) || 1; // Should realistically never return undefined.;
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
    const atonementBaseTransfer = DISCCONSTANTS.atonementBaseTransfer;;
    return atonementBaseTransfer * (1.108 + mastery / STATCONVERSION.MASTERY * DISCCONSTANTS.masteryMod / 100);
}


// Some spells do more than the usual amount of atonement healing. An example might be through Abssal Reverie.
// We'll handle those here.
const getAtonementBonus = (state, spellName, spell) => {

    return (DISCCONSTANTS.atonementMults[getSpellSchool(state, spellName, spell)] || 1) * getHealingMult(state, state.activeBuffs, "Atonement", {});
}

// Get a spells school.
// Generally this is just set in the SpellDB but Disc has an override too in Shadow Covenant that temporarily converts
// some spells to Shadow so we'll handle all of that in this function here.
const getSpellSchool = (state, spellName, spell) => {
    let spellSchool = "";
    if (DISCCONSTANTS.shadowCovenantSpells.includes(spellName) && checkBuffActive(state.activeBuffs, "Shadow Covenant")) spellSchool = "shadow";
    else spellSchool = spell.school || "";
    //console.log(spellName + " " + spellSchool)
    return spellSchool;

}

export const runHeal = (state, spell, spellName, specialMult = 1) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.activeBuffs, spellName, spell); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const flatHealBonus = (spellName === "Power Word: Shield" && checkBuffActive(state.activeBuffs, "T29_4")) ? state.activeBuffs.filter(function (buff) {return buff.name === "T29_4"})[0].value : 0

    const healingVal = getSpellRaw(spell, currentStats, DISCCONSTANTS, flatHealBonus) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    //console.log("Healing value: " + getSpellRaw(spell, currentStats, DISCCONSTANTS));
    state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;

    if (spell.healType === "direct" && state.talents.divineAegis) {
        // If the spell crits, DA absorbs 30% of the value.
        const aegisHeal = healingVal * 0.3 * getCrit(state.currentStats);

        state.healingDone["Divine Aegis"] = (state.healingDone["Divine Aegis"] || 0) + aegisHeal;
    }

    if (!spellName.includes("hot")) {
        let base = `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%`;
        if (targetMult > 1) base += `, ${spell.targets} targets`;
        if (spell.atonement) base += `, +${spell.atonement}s atone`;
        base += ")";
        //if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.overheal * 100}%)`)
        addReport(state, base);
    }

    if ((spell.name === "Power Word: Shield") && state.talents.crystallineReflection) {
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
    const atonementHealing = Math.round(activeAtonements * damageVal * getAtoneTrans(state.currentStats.mastery) * getAtonementBonus(state, spellName, spell));
    const atonementOverhealing = atonementHealing * spell.atoneOverheal;
    // This is stat tracking, the atonement healing will be returned as part of our result.
    state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    state.healingDone['atonement'] = (state.healingDone['atonement'] || 0) + (atonementHealing - atonementOverhealing);

    if (!spellName.includes("dot")) addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage (${atonementHealing} atone)`)

    if (checkBuffActive(state.activeBuffs, "Premonition of Piety")) {
        // Piety active. Transfer a portion of overhealing.
        const pietyPercentage = 0.98;
        state.healingDone['premonition of piety'] = (state.healingDone['premonition of piety'] || 0) + atonementOverhealing * pietyPercentage;
        if (!spellName.includes("dot")) addReport(state, `Premonition of Piety transferred ${Math.round(atonementOverhealing * pietyPercentage)} atonement overhealing`);

    }
    
    //if (state.reporting) console.log(getTime(state.t) + " " + spellName + ": " + damageVal + ". Buffs: " + JSON.stringify(state.activeBuffs) + " to " + activeAtonements);

}

const runSpell = (fullSpell, state, spellName, specSpells, atonementApp, seq, canRepeat = false) => {

    fullSpell.forEach(spell => {

        // Spell slices can have conditions applied to them.
        // These won't fire unless x is true.
        // Avoid using these to check for talents. 
        // You can also use these to manage spells that only proc sometimes via roll.
        let canProceed = false
        if (spell.condition) {
            if (spell.condition.type === "chance") {
                const roll = Math.random();
                canProceed = roll <= spell.chance;
            }
            else if (spell.condition.type === "buff") {
                canProceed = checkBuffActive(state.activeBuffs, spell.condition.buffName);
            }
        }
        else canProceed = true;

        if (canProceed) {
            // The spell casts a different spell. 
            if (spell.type === 'castSpell' && canRepeat) {
                addReport(state, `Spell Proc: ${spellName}`)
                const newSpell = deepCopyFunction(specSpells[spell.storedSpell]); // This might fail on function-based spells.
                if (spell.powerMod) {
                    newSpell[0].coeff = newSpell[0].coeff * spell.powerMod; // Increases or reduces the power of the free spell.
                    newSpell[0].flatHeal = (newSpell[0].flatHeal * spell.powerMod) || 0;
                    newSpell[0].flatDamage = (newSpell[0].flatDamage * spell.powerMod) || 0;
                }
                if (spell.targetMod) {
                    for (let i = 0; i < spell.targetMod; i++) {
                        runSpell(newSpell, state, spell.storedSpell, specSpells, atonementApp, spell.canRepeat || true);
                    }
                }
                else {
                    runSpell(newSpell, state, spell.storedSpell, specSpells, atonementApp, spell.canRepeat || true);
                }

                
            }
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
                    // This should be refactored into a more generic conditional on spells.
                    if (spell.name === "Inescapable Torment") {
                        if (state.activeBuffs.filter(buff => buff.name === "Shadowfiend" || buff.name === "Mindbender").length > 0) runDamage(state, spell, spellName, atonementApp)
                    }
                    else {
                        runDamage(state, spell, spellName, atonementApp)
                    }
                }

                // The spell extends atonements already active. This is specific to Evanglism. 
                else if (spell.type === "atonementExtension") {
                    if (spell.extensionType === "all") {
                        extendActiveAtonements(atonementApp, state.t, spell.extension);
                    }
                    else if (spell.extensionType === "lowestDuration") {
                        // Extend the atonement that is closest to expiry.
                        const extended = extendLowestAtonement(atonementApp, state.t, spell.extension);
                        addReport(state, `Extending Atonement #${extended} by ${spell.extension}s`)
                    }
                    
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
                // Penance will queue anywhere from 4 to 8 ticks.
                // These ticks are queued at the front of our array and will take place immediately. 
                // This can be remade to work with any given number of ticks.
                else if (spellName === "Penance" || spellName === "DefPenance") {
                    
                    let penanceBolts = specSpells[spellName][0].bolts;
                    let penanceCoeff = specSpells[spellName][0].coeff;
                    let penTickName = spellName === "Penance" ? "PenanceTick" : "DefPenanceTick";

                    // Harsh Discipline adds 1-4 bolts depending on stacks and talent points.
                    if (checkBuffActive(state.activeBuffs, "Harsh Discipline")) {
                        penanceBolts += getBuffValue(state.activeBuffs, "Harsh Discipline") * getBuffStacks(state.activeBuffs, "Harsh Discipline");
                        removeBuff(state.activeBuffs, "Harsh Discipline");
                    } 

                    // Twinsight
                    if (state.heroTree === "oracle" && spellName === "Penance") {
                        for (var i = 0; i < 3; i++) {
                            //seq.unshift("DefPenanceTick")
                            runSpell(specSpells["DefPenanceTick"], state, "DefPenanceTick", specSpells, atonementApp, seq, false)
                        }
                    }

                    specSpells[penTickName][0].castTime = 2 / penanceBolts;
                    specSpells[penTickName][0].coeff = penanceCoeff;
                    for (var i = 0; i < penanceBolts; i++) {
                        seq.unshift(penTickName);
                    }
                }

                else if (spellName === "Ultimate Penitence" || spellName === "DefUltimate Penitence") {
                    
                    let bolts = specSpells[spellName][0].bolts;

                    for (var i = 0; i < bolts; i++) {
                        seq.unshift("Ultimate Penitence Tick");
                    }
                }

                if (state.talents.twilightEquilibrium && spell.type === 'damage' && !spellName.includes("Tick")) {
                    // If we cast a damage spell and have Twilight Equilibrium then we'll add a 6s buff that 
                    // increases the power of our next cast of the opposite school by 15%.
                    //const spellSchool = spell.school;

                    if (getSpellSchool(state, spellName, spell) === "holy") {
                        // Check if buff already exists, if it does add a stack.
                        addReport(state, `Adding Twilight Equilibrium - Shadow Buff (next Shadow spell buffed)`)
                        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === "Twilight Equilibrium - Shadow"}).length;
                        if (buffStacks === 0) state.activeBuffs.push({name: "Twilight Equilibrium - Shadow", expiration: (state.t + spell.castTime + 6) || 999, buffType: "special", value: 1.15, stacks: 1, canStack: false});
                        else {
                            const buff = state.activeBuffs.filter(buff => buff.name === "Twilight Equilibrium - Shadow")[0]
                            buff.expiration = state.t + spell.castTime + 6;
                        }
                    }
                    else if (getSpellSchool(state, spellName, spell) === "shadow") {
                        // Check if buff already exists, if it does add a stack.
                        addReport(state, `Adding Twilight Equilibrium - Holy Buff (next Holy spell buffed)`)
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
                 

            // These are special exceptions where we need to write something special that can't be as easily generalized.
            if ('cooldownData' in spell && spell.cooldownData.cooldown) spell.cooldownData.activeCooldown = state.t + (spell.cooldownData.cooldown / getHaste(state.currentStats));
        
            }
 
        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
    }); 

    // Any post-spell code.
    //if (spellName === "Dream Breath") state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");

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
export const runCastSequence = (sequence, incStats, settings = {}, incTalents = {}, apl = []) => {
    //console.log("Running cast sequence");
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    let state = {t: 0, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, heroTree: "oracle"}
    let stats = JSON.parse(JSON.stringify(incStats));
    stats.critMult = 2;

    state.settings.reporting = true;
    state.settings.advancedReporting = true;
    let atonementApp = []; // We'll hold our atonement timers in here. We keep them seperate from buffs for speed purposes.
    let nextSpell = 0; // The time when the next spell cast can begin.
    let spellFinish = 0; // The time when the cast will finish. HoTs / DoTs can continue while this charges.
    let queuedSpell = "";
    const seqType = apl.length > 0 ? "Auto" : "Manual"; // Auto / Manual.

    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.
    const discSpells = applyLoadoutEffects(deepCopyFunction(DISCSPELLS), settings, talents, state, stats);

    let seq = [...sequence];
    const sequenceLength = 55; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.

    // Setup Trinkets
    if (settings.trinkets) {
        if (settings.trinkets.filter(effect => effect.name === "House of Cards").length > 0) {
            const onUseData = getTrinketData("House of Cards", settings.trinkets.filter(effect => effect.name === "House of Cards")[0].level);
            const spell = discSpells["House of Cards"][0];
            spell.value = onUseData.value;
            spell.buffDuration = onUseData.duration;
        }

        
        Object.keys(settings.trinkets).forEach((key) => {
            if (key in discSpells) {
                const spell = discSpells[key][0];
                spell.value = settings.trinkets[key];
                
            }
        })
    }

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // Advanced reporting
        if (state.settings.advancedReporting && (Math.floor(state.t * 100) % 100 === 0)) {
            const healing = (Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0);
            if ('advancedReport' in state === false) state.advancedReport = [];
            state.advancedReport.push({t: Math.floor(state.t*100)/100, totalHealing: healing, hps: healing / state.t, manaSpent: state.manaSpent, buffs: state.activeBuffs.map(obj => obj.name)});
        }

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
        if (seq.length > 0 && (state.t > nextSpell)) {

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list
            if (seqType === "Manual") queuedSpell = seq.shift();
            
            else {
                // If we're creating our sequence via APL then we'll 

                if (seq.length > 0) queuedSpell = seq.shift();
                else {
                    seq = genSpell(state, discSpells, apl);
                    queuedSpell = seq.shift();
                    
                }
                
            }
            const fullSpell = discSpells[queuedSpell];
            const castTime = getSpellCastTime(fullSpell[0], state, currentStats);
            spellFinish = state.t + castTime - 0.01;
            if (fullSpell[0].castTime === 0 && fullSpell[0].onGCD === false) nextSpell = state.t + 0.01;
            else if (fullSpell[0].castTime === 0 && fullSpell[0].onGCD) nextSpell = state.t + 1.5 / getHaste(currentStats);
            else if (fullSpell[0].channel) { nextSpell = state.t + castTime; spellFinish = state.t }
            else nextSpell = state.t + castTime;

        }
        // We'll iterate through the different effects the spell has.
        // Smite for example would just trigger damage (and resulting atonement healing), whereas something like Mind Blast would trigger two effects (damage,
        // and the absorb effect).
        if (queuedSpell !== "" && state.t >= spellFinish) {
            

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = queuedSpell;
            const fullSpell = discSpells[queuedSpell];
            //state.manaSpent += 'cost' in fullSpell ? fullSpell[0].cost : 0;
            spendSpellCost(fullSpell, state);
            //state.casts[spellName] = (state.casts[spellName] || 0) + 1;

            runSpell(fullSpell, state, spellName, discSpells, atonementApp, seq)


            // Cleanup
            queuedSpell = "";
            spellFinish = 0;

        }


            /*
            if (fullSpell[0].castTime === 0 && fullSpell[0].offGCD) nextSpell += 0;
            else if (fullSpell[0].castTime === 0 && !(fullSpell[0].offGCD)) nextSpell += (1.5 / getHaste(currentStats));
            else nextSpell += (fullSpell[0].castTime / getHaste(currentStats));
            */
    }


    // Add up our healing values (including atonement) and return it.
    state.totalDamage = Object.keys(state.damageDone).length > 0 ? Math.round(sumValues(state.damageDone)) : 0;
    state.totalHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
    state.hps = (state.totalHealing / sequenceLength);
    state.dps = (state.totalDamage / sequenceLength);
    state.hpm = (state.totalHealing / state.manaSpent) || 0;

    //const totalHealingValues = state.advancedReport.map(item => item.totalHealing);
    // Print the result as a comma-separated list
    //console.log(JSON.stringify(totalHealingValues));
    //console.log(state.report);
    //printHealingBreakdown(state.healingDone, state.totalHealing);

    return state;

}

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

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

