// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { EVOKERSPELLDB } from "./PresEvokerSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { runRampTidyUp, getSqrt, addReport, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, 
            getHealth, getCrit, advanceTime, spendSpellCost, getSpellCastTime, deepCopyFunction } from "../Generic/RampGeneric/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff } from "../Generic/RampGeneric/BuffBase";
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
    echoExceptionSpells: ['Echo', 'Dream Flight', 'Emerald Communion', 'Blessing of the Bronze', 'Fire Breath', 'Living Flame O', "Temporal Anomaly", 'Disintegrate', 'Rewind'], // These are spells that do not consume or otherwise interact with our Echo buff.
    stasisExceptionSpells: ['Dream Flight', 'Emerald Communion', 'Blessing of the Bronze', 'Fire Breath', 'Living Flame O', "Temporal Anomaly", "Rewind"], // Spells that can't be stored in Stasis. Mostly long cooldowns and offensive spells.
    lifebindSpells: ['Spiritbloom', 'Living Flame', 'Dream Breath', 'Dream Breath (HoT)', 'Emerald Communion', 'Emerald Communion (HoT)'],
    essenceBuff: {
        name: "EssenceGen",
        expiration: 5,
        buffDuration: 5,
        buffType: 'function',
        stacks: false,
        tickRate: 5,
        tickData: {tickRate: 5, canPartialTick: false, hasted: false},
        hastedDuration: true,
        runFunc: function (state, buff) {
            
            state.essence += 1;

            if (state.essence < 6) {
                const essenceGenBuff = state.activeBuffs.filter(buff => buff.name === "EssenceGen")[0];
                essenceGenBuff.expiration = state.t + 5 / getHaste(state.currentStats) + 0.1;

            }
        }
    },
    essenceBurstBuff: {
        name: "Essence Burst",
        type: "buff",
        stacks: 1,
        canStack: true,
        maxStacks: 2,
        expiration: 999,
        buffDuration: 15,
        buffType: 'special',
    },
    exhilBurstBuff: {
        name: "Exhilarating Burst",
        type: "buff",
        stacks: false,
        buffDuration: 10,
        buffType: 'stats',
        stat: 'critMult',
        value: 0.3
    },
    temporalCompressionBuff: {
        name: "Temporal Compression",
        type: "buff",
        canStack: true,
        stacks: 1,
        maxStacks: 4,
        value: 0.05,
        buffDuration: 999,
        buffType: 'special',
    },

    // Grace Period can be seen as a healing multiplier on the raid since we don't have a good way of knowing which spells are hitting Grace Period targets.
    // We'll notably override this for Reversion and Echo Reversion since they will always get full value.
    // Overall this trades pinpoint accuracy for a fair average performance of the talent.
    gracePeriodMult: 1, 
    

}

// We should find a nicer way to do this.
export const getEssenceBuff = () => {
    return EVOKERCONSTANTS.essenceBuff;
}

// Remove Temporal and add Essence Burst if necessary.
export const triggerTemporal = (state) => {
    if (state.talents.sacralEmpowerment) triggerEssenceBurst(state);
    state.activeBuffs = state.activeBuffs.filter(buff => buff.name !== "Temporal Compression")
}

const triggerEssenceBurst = (state) => {
    if (state.talents.exhilaratingBurst) {
        // If we're talented into Exhil Burst then also add that buff.
        // If we already have an Exhilarating Burst active then we'll just refresh it's duration instead.
        // If not, we'll create a new buff.
        const activeBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Exhilarating Burst"});
        const exhilBurst = JSON.parse(JSON.stringify(EVOKERCONSTANTS.exhilBurstBuff));
        if (activeBuff.length > 0) activeBuff.expiration = (state.t + exhilBurst.buffDuration);
        else {
            exhilBurst.expiration = (state.t + exhilBurst.buffDuration);
            addBuff(state, EVOKERCONSTANTS.essenceBurstBuff, "Essence Burst")
            addReport(state, `Adding buff: Exhilirating Burst`);
            state.activeBuffs.push(exhilBurst);
        }
    }
    else {
        addBuff(state, EVOKERCONSTANTS.essenceBurstBuff, "Essence Burst")
    }
}

const triggerCycleOfLife = (state, rawHealing) => {
    // For each flower, add 5% of raw healing to the flower value.
    const cycleBuffs = state.activeBuffs.filter(buff => buff.name === "Cycle of Life");

    cycleBuffs.forEach(buff => {
        buff.value += rawHealing * 0.1; 
    })

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

    
    // Grace Period
    if (talents.gracePeriod) {
        if (spellName.includes("Reversion")) mult *= (1 + talents.gracePeriod * 0.075);
        else {
            const buffsActive = state.activeBuffs.filter(buff => buff.name.includes("Reversion")).length;
            mult *= (1 + talents.gracePeriod * 0.075 * buffsActive / 20);

        }
    }   

    if ((spellName.includes("Dream Breath") || spellName === "Living Flame") && checkBuffActive(state.activeBuffs, "Call of Ysera")) {
        if (spellName.includes("Dream Breath")) mult *= 1.4;
        if (spellName === "Living Flame" || spellName === "Living Flame O") mult *= 2;
        //state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");

    } 
    //else if (spellName.includes("Renewing Breath") || spellName.includes("Fire Breath")) return 1; // Renewing Breath should strictly benefit from no multipliers.
    if (state.talents.attunedToTheDream) mult *= (1 + state.talents.attunedToTheDream * 0.02)
    
    return mult;
}


export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, EVOKERCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    // Special cases
    if (checkBuffActive(state.activeBuffs, "Cycle of Life")) triggerCycleOfLife(state, healingVal / (1 - spell.expectedOverheal));
    if ('specialMult' in spell) healingVal *= spell.specialMult;


    // Compile healing and add report if necessary.
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + Math.round(healingVal);
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)

    if (checkBuffActive(state.activeBuffs, "Lifebind") && EVOKERCONSTANTS.lifebindSpells.includes(spellName)) {
        const lifebindBuffs = state.activeBuffs.filter(buff => buff.name === "Lifebind");
        const lifebindMult = lifebindBuffs.map(b => b.value).reduce((a, b) => a+b, 0);

        const lifebindSpell = {name: "Lifebind", flatHeal: healingVal * lifebindMult / targetMult, targets: 1, coeff: 0, secondaries: [], expectedOverheal: 0.2};
        runHeal(state, lifebindSpell, "Lifebind", true);

    }

    /* Defunct with the in-game Dream Breath rework.
    if (spellName === "Dream Breath" && state.talents.renewingBreath) {
        // Handle Renewing Breath.
        // These could possibly be pushed into a "Spell Cleanup" section.
        const renewingHoT = EVOKERCONSTANTS.renewingBreathBuff;
        renewingHoT.flatHeal = getSpellRaw(spell, currentStats, EVOKERCONSTANTS) * healingMult / 5 * renewingHoT.mult;
        const buff = {name: "Renewing Breath", buffType: "heal", attSpell: renewingHoT,
            tickRate: renewingHoT.tickRate, hasted: false, canPartialTick: renewingHoT.canPartialTick, next: state.t + renewingHoT.tickRate}
        buff['expiration'] = state.t + renewingHoT.buffDuration;
        state.activeBuffs.push(buff);

    } */

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


const runSpell = (fullSpell, state, spellName, evokerSpells) => {

    fullSpell.forEach(spell => {

        let canProceed = false

        if (spell.chance) {
            const roll = Math.random();
            canProceed = roll <= spell.chance;
        }
        else canProceed = true;

        if (canProceed) {
            // The spell casts a different spell. 
            if (spell.type === 'castSpell') {
                addReport(state, `Spell Proc: ${spellName}`)
                const newSpell = deepCopyFunction(evokerSpells[spell.storedSpell]); // This might fail on function-based spells.
                if (spell.powerMod) {
                    newSpell[0].coeff = newSpell[0].coeff * spell.powerMod; // Increases or reduces the power of the free spell.
                    newSpell[0].flatHeal = (newSpell[0].flatHeal * spell.powerMod) || 0;
                    newSpell[0].flatDamage = (newSpell[0].flatDamage * spell.powerMod) || 0;
                }
                if (spell.targetMod) {
                    for (let i = 0; i < spell.targetMod; i++) {
                        runSpell(newSpell, state, spell.storedSpell, evokerSpells);
                    }
                }
                else {
                    runSpell(newSpell, state, spell.storedSpell, evokerSpells);
                }

                
            }
            // The spell has a healing component. Add it's effective healing.
            // Absorbs are also treated as heals.
            else if (spell.type === 'heal') {
                runHeal(state, spell, spellName)
            }
            
            
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'damage') {
                runDamage(state, spell, spellName)
            }
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'function') {
                spell.runFunc(state, spell);
            }

            // The spell adds a buff to our player.
            // We'll track what kind of buff, and when it expires.
            else if (spell.type === "buff") {
                if (spell.name === "Essence Burst") {
                    // Special code for essence burst.
                    triggerEssenceBurst(state);
                }
                else {
                    addBuff(state, spell, spellName);
                }
                
            } 

            // These are special exceptions where we need to write something special that can't be as easily generalized.
            if ('cooldownData' in spell && spell.cooldownData.cooldown) spell.cooldownData.activeCooldown = state.t + (spell.cooldownData.cooldown / getHaste(state.currentStats));
        
            }


 
        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
    }); 

    // Any post-spell code.
    if (spellName === "Dream Breath") state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");
    //if (spellName === "Verdant Embrace" && state.talents.callofYsera) addBuff(state, EVOKERCONSTANTS.callOfYsera, "Call of Ysera");

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

    // Add base Mastery bonus.
    // We'd like to convert this to a % buff at some point since it will be incorrectly reduced by DR as-is.
    stats.mastery += 180;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, casts: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, essence: 5};

    let currentStats = {...stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const sequenceLength = ('seqLength' in settings ? settings.seqLength : 120) * (1 + (Math.random() - 0.5) * 0.2); // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = apl.length > 0 ? "Auto" : "Manual"; // Auto / Manual.
    let nextSpell = 0; // The time when the next spell cast can begin.
    let spellFinish = 0; // The time when the cast will finish. HoTs / DoTs can continue while this charges.
    let queuedSpell = "";
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.

    const evokerSpells = applyLoadoutEffects(deepCopyFunction(EVOKERSPELLDB), settings, talents, state, stats, EVOKERCONSTANTS);

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
        //addBuff(state, EVOKERCONSTANTS.exhilBurstBuff, "Exhilarating Burst");
    }

    // Create Echo clones of each valid spell that can be Echo'd.
    // and add them to the valid spell list
    for (const [spellName, spellData] of Object.entries(evokerSpells)) {
        
        // Make sure spell can be copied by Echo.
        // Right now this is almost anything but we'll expect them to make changes later in Alpha.

        if (!(EVOKERCONSTANTS.echoExceptionSpells.includes(spellName))) {
            //let echoSpell = [...spellData];
            let echoSpell = JSON.parse(JSON.stringify(spellData));

            // Make any Echo changes necessary.

            if (spellName === "Spiritbloom") echoSpell[0].targets = 1; // An Echo'd Spiritbloom just adds one target.
            if (spellName === "Emerald Blossom") {
                echoSpell[0].targets = 1; // An Echo'd Emerald Blossom just adds one target.
                echoSpell = echoSpell.slice(0, 1); // Remove any Emerald Blossom ties outside of the base spell.
                /*echoSpell.forEach(slice => {
                    if (slice.name === "Fluttering Seedlings") slice.coeff = 0; // Fluttering Seedlings no longer procs from Echo.
                }) */
            }
            if (spellName === "Dream Breath") {
                echoSpell[0].targets = 1; // An Echo'd Dream Breath just adds one target.
                echoSpell[1].targets = 1;
                echoSpell[2].targets = 1;
                echoSpell[2].name = "Dream Breath (Echo)";

            }
            if (spellName === "Reversion") {
                echoSpell[0].name = "Reversion (HoT - Echo)";
                echoSpell[0].runFunc = spellData[0].runFunc;
            }
            if (spellName === "Verdant Embrace") {
                if ('name' in echoSpell[echoSpell.length-1] && echoSpell[echoSpell.length-1].name === "Call of Ysera") echoSpell.pop();
            }
            //echoSpell[0].coeff *= evokerSpells['Echo'][1].value;
            // Save the new spell.
            evokerSpells[spellName+"(Echo)"] = echoSpell;

        }
    }

    // Extra Settings
    if (settings.masteryEfficiency) EVOKERCONSTANTS.masteryEfficiency = settings.masteryEfficiency;

    let seq = [...sequence];

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
        const healBuffs = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType === "function") && state.t >= buff.next})
        if (healBuffs.length > 0) {
            healBuffs.forEach((buff) => {
               
                let currentStats = {...stats};
                state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

                if (buff.buffType === "heal") {
                    const spell = buff.attSpell;
                    runHeal(state, spell, buff.name + " (HoT)")
                }
                else if (buff.buffType === "damage") {
                    const spell = buff.attSpell;
                    runDamage(state, spell, buff.name)
                }
                else if (buff.buffType === "function") {
                    const func = buff.attFunction;
                    const spell = buff.attSpell;
                    func(state, spell, buff);
                }

                if (buff.hasted || buff.hasted === undefined) buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
                else buff.next = buff.next + (buff.tickRate);
            });  
        }

        // -- Partial Ticks --
        // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
        // If your Shadow Word: Pain ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
        // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
        const expiringHots = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "function" || buff.buffType === "damage" || buff.runEndFunc) && state.t >= buff.expiration && buff.canPartialTick})
        expiringHots.forEach(buff => {

            if (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType === "function") {
                const tickRate = buff.tickRate / getHaste(state.currentStats)
                const partialTickPercentage = (buff.next - state.t) / tickRate;
                const spell = buff.attSpell;
                spell.coeff = spell.coeff * partialTickPercentage;

                if (buff.buffType === "damage") runDamage(state, spell, buff.name);
                else if (buff.buffType === "healing") runHeal(state, spell, buff.name + "(hot)");
                else if (buff.buffType === "function") {
                    const func = buff.attFunction;
                    const spell = buff.attSpell;
                    func(state, spell, buff);
                }
            }
            else if (buff.runEndFunc) buff.runFunc(state, buff);
        })

        // Remove any buffs that have expired. Note that we call this after we handle partial ticks. 
        state.activeBuffs = state.activeBuffs.filter(function (buff) {return buff.expiration > state.t});

        // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
        // It'll also auto-cast Ascended Eruption if Boon expired.


        // Check if there is an ongoing cast and if there is, check if it's ended.
        // Check if the next spell is able to be cast, and if so, queue it.

        // If instant and on GCD: spellFinish = state.t, nextSpell = gcd / haste
        // If instant and off GCD: spellFinish = state.t, nextSpell = state.t + 0.01
        // If casted: spellFinish = state.t + castTime, nextSpell = state.t + 0.01

        if ((state.t > nextSpell)) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list

            if (seqType === "Manual") queuedSpell = seq.shift();
            // if its is "Auto", use genSpell to auto generate a cast sequence
            else {
                // If we're creating our sequence via APL then we'll 
                if (seq.length > 0) queuedSpell = seq.shift();
                else {
                    seq = genSpell(state, evokerSpells, apl);
                    queuedSpell = seq.shift();
                    
                }
                
            }

            const fullSpell = evokerSpells[queuedSpell];
            if (queuedSpell === undefined) console.error("Can't find spell: " + queuedSpell);
            const castTime = getSpellCastTime(fullSpell[0], state, currentStats);
            spellFinish = state.t + castTime - 0.01;
            if (fullSpell[0].castTime === 0) nextSpell = state.t + 1.5 / getHaste(currentStats);
            else if (fullSpell[0].channel) { nextSpell = state.t + castTime; spellFinish = state.t }
            else nextSpell = state.t + castTime;


        }
        if (queuedSpell !== "" && state.t >= spellFinish) {
            // We have a queued spell, check if it's finished.
            // Instant spells should proc this immediately.


            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = queuedSpell;
            const fullSpell = evokerSpells[queuedSpell];
            state.casts[spellName] = (state.casts[spellName] || 0) + 1;
            addReport(state, `Casting ${spellName}`);
            spendSpellCost(fullSpell, state);

            runSpell(fullSpell, state, spellName, evokerSpells);

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
                    runSpell(echoSpell, state, spellName + "(Echo)", evokerSpells)

                }

                // Remove all of our Echo buffs.

                state.activeBuffs = removeBuff(state.activeBuffs, "Echo"); // state.activeBuffs.filter(function (buff) {return buff.name !== "Echo"})

            }

            // Cleanup
            queuedSpell = "";
            spellFinish = 0;
        }

        if (seq.length === 0 && queuedSpell === "" && healBuffs.length === 0) {
            // We have no spells queued, no DoTs / HoTs and no spells to queue. We're done.
            //state.t = 999;
        }

        // Time optimization
        state.t = advanceTime(state.t, nextSpell, spellFinish, state.activeBuffs);

    }

    runRampTidyUp(state, settings, sequenceLength, startTime)

    return state;

}



