// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { HOLYPRIESTSPELLDB as SPELLDB } from "./HolyPriestSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { addReport, checkBuffActive, removeBuffStack, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, getBuffStacks, getHealth, getCrit, addBuff } from "../Generic/RampGeneric/RampBase";



// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.
const discSettings = {
    chaosBrand: true
}


const EVOKERCONSTANTS = {
    
    masteryMod: 1.8, 
    masteryEfficiency: 0.88, 
    baseMana: 250000,

    defaultEmpower: 1,
    auraHealingBuff: 0.6, 
    auraDamageBuff: 1.15, 
    goldenHourHealing: 18000,
    enemyTargets: 1, 
    echoExceptionSpells: ['Echo', 'Blessing of the Bronze', 'Fire Breath', 'Living Flame D', "Temporal Anomaly", 'Disintegrate'], // These are spells that do not consume or otherwise interact with our Echo buff.
    essenceBuff: {
        name: "EssenceGen",
        expiration: 5,
        buffDuration: 5,
        buffType: 'function',
        stacks: false,
        tickRate: 5,
        hastedDuration: true,
        function: function (state, buff) {
            
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
        stacks: true,
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
        value: 0.15
    },
    renewingBreathBuff: {
        type: "buff",
        buffType: "heal",
        name: "Renewing Breath",
        tickRate: 2,
        targets: 5,
        coeff: 0, // Renewing Breath uses a flat heal system instead of a coefficient since the scaling is based on the healing the Dream Breath did.
        flatHeal: 0, 
        hasted: false,
        buffDuration: 10, // Note that this is contrary to the tooltip.
        expectedOverheal: 0.45, // 0.45
        secondaries: [], // It technically scales with secondaries but these influence the base heal, not the HoT.
        mult: 0.15, // This is multiplied by our talent points.
    },

    // Grace Period can be seen as a healing multiplier on the raid since we don't have a good way of knowing which spells are hitting Grace Period targets.
    // We'll notably override this for Reversion and Echo Reversion since they will always get full value.
    // Overall this trades pinpoint accuracy for a fair average performance of the talent.
    gracePeriodMult: 1, 
    

}

// Remove Temporal and add Essence Burst if necessary.
const triggerTemporal = (state) => {
    if (state.talents.sacralEmpowerment) triggerEssenceBurst(state);
    state.activeBuffs = state.activeBuffs.filter(buff => buff.name !== "Temporal Compression")
}

const triggerEssenceBurst = (state) => {
    if (state.talents.exhilaratingBurst) {
        // If we're talented into Exhil Burst then also add that buff.
        // If we already have an Exhilarating Burst active then we'll just refresh it's duration instead.
        // If not, we'll create a new buff.
        const activeBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Exhilarating Burst"});
        const exhilBurst = EVOKERCONSTANTS.exhilBurstBuff;
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

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} holySpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 const applyLoadoutEffects = (holySpells, settings, talents, state, stats) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    if (settings['DefaultLoadout']) {

    }

    // ==== Talents ====
    // Not all talents just make base modifications to spells, but those that do can be handled here.
    // Prayer Circle

    // Healing Chorus

    // Orison: +1 target, -3s cooldown

    // Cosmic Ripple

    // Renewed Faith: +6% healing on Renew targets

    // Enlightenment: +10% mana regen

    // Trail of Light: 18% of Heal / Flash Heal healing is duplicated.

    // Everlasting Light: +15% increase to heal based on missing mana.

    // Divine Service: PoM heals for +4% for each bounce remaining.

    // Crisis Management: +8/15% crit chance on Heal / Flash Heal.

    // Prismatic Echoes: +6/12% healing via Mastery.

    // Prayers of the Virtuous: Prayer of Mending drops 1/2 additional times.

    // Pontifex: Critical heals from Flash Heal / Heal increase the healing done by your next Holy Word by 10% - stacking up to 2.

    // Empowered Renew: Renew instantly heals for 10% of its effect.

    // Rapid Recovery: +35% Renew healing, but -3s duration

    // Say your prayers: Prayer of Mending has a 15% chance to not consume a charge when it jumps to a new target.

    // Resonant Words: Holy Word spell -> +25/50% healing on next Flash Heal / Heal.

    // Desperate Times: Increase healing by 10/20% on friendly targets below 50% health.

    // Light of the Naaru: Cooldowns of holy word spells are reduced by an additional 10/20% when cast with relevant spells.

    // Harmonious Apparatus: CoH -> reduces CD of Sanc by 2s; PoM reduces CD of HW: Serenity by 2.

    // Searing Light: Smite and Holy Nova deal +25% damage to targets afflicted by Holy Fire.

    // Answered Prayers: After PoM heals 100 times, gain apotheosis for 10s.

    // Lightweaver: Flash Heal reduces the CD of your next Heal within 20s by 30% and increases its healing by 15%. Stacks to 2.





    // Setup mana costs & cooldowns.

    for (const [key, value] of Object.entries(holySpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];

        if ('school' in spellInfo && spellInfo.school === "green" && talents.lushGrowth) spellInfo.coeff *= (1 + 0.05 * talents.lushGrowth);

        if (!spellInfo.targets) spellInfo.targets = 1;
        if (spellInfo.cooldown) spellInfo.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * EVOKERCONSTANTS.baseMana / 100;
    }
    
    // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.


    // ==== Tier Sets ====

    return holySpells;
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    let mult = EVOKERCONSTANTS.auraDamageBuff;

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




const getSqrt = (targets) => {
    return Math.sqrt(targets);
}


export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, EVOKERCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    

    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)


    return healingVal;
}

export const runDamage = (state, spell, spellName, atonementApp, compile = true) => {

    //const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, 0, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, EVOKERCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage`)
    return damageVal;
}

const canCastSpell = (state, spellDB, spellName) => {
    
    const spell = spellDB[spellName][0];
    let miscReq = true;
    const essenceReq = (state.essence >= spell.essence ) || !spell.essence;
    const cooldownReq = (state.t > spell.activeCooldown) || !spell.cooldown;
    
    if (spellName === "Hammer of Wrath") {
        if (!checkBuffActive(state.activeBuffs, "Avenging Wrath")) miscReq = false;
    } 

    return cooldownReq && essenceReq && miscReq;
}

const getSpellHPM = (state, spellDB, spellName) => {
    const spell = spellDB[spellName][0];
    const spellHealing = runHeal(state, spell, spellName, false)

    return spellHealing / spell.cost || 0;
}



export const genSpell = (state, spells) => {
    let spellName = ""

    const usableSpells = [...apl].filter(spell => canCastSpell(state, spells, spell));

    return usableSpells[0];

}


const apl = ["Emerald Blossom", "Verdant Embrace", "Living Flame D", "Rest"]

const runSpell = (fullSpell, state, spellName, holySpells) => {

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
                const newSpell = holySpells[spell.storedSpell];
                runSpell(newSpell, state, spell.storedSpell, holySpells);
            }
            // The spell has a healing component. Add it's effective healing.
            // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
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

                addReport(state, `Adding buff: ${spell.name}`);
                if (spell.buffType === "stats") {
                    state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat});
                }
                else if (spell.buffType === "statsMult") {
                    state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "statsMult", value: spell.value, stat: spell.stat});
                }
                else if (spell.buffType === "damage" || spell.buffType === "heal") {     
                    const newBuff = {name: spell.name, buffType: spell.buffType, attSpell: spell,
                        tickRate: spell.tickRate, canPartialTick: spell.canPartialTick, next: state.t + (spell.tickRate / getHaste(state.currentStats))}

                    newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(currentStats)) : state.t + spell.buffDuration    
                    state.activeBuffs.push(newBuff)

                }
                else if (spell.buffType === "function") {
                    const newBuff = {name: spell.name, buffType: spell.buffType, attSpell: spell,
                        tickRate: spell.tickRate, canPartialTick: spell.canPartialTick || false, 
                        next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                    newBuff.attFunction = spell.function;

                    if (spellName.includes("Reversion")) newBuff.expiration = (state.t + spell.castTime + (spell.buffDuration / (1 - (getCrit(state.currentStats) + spell.statMods.crit - 1)))); // TODO; Replace 0.25 with crit.
                    else newBuff.expiration = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(state.currentStats)) : state.t + spell.buffDuration
                    
                    state.activeBuffs.push(newBuff);

                }
                else if (spell.buffType === "special") {
                    // Check if buff already exists, if it does add a stack.
                    const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;

                    if (spell.canStack === false || buffStacks === 0) {
                        const buff = {name: spell.name, expiration: (state.t  + spell.buffDuration) + (spell.castTime || 0), buffType: spell.buffType, 
                            value: spell.value, stacks: 1, canStack: spell.canStack, maxStacks: spell.maxStacks};
                    
                        if (spell.name === "Cycle of Life") {

                            buff.runEndFunc = true;
                            buff.runFunc = spell.runFunc;
                            buff.canPartialTick = true;

                        }
                        //if (spell.name === "Temporal Compression") console.log(buff);
                        state.activeBuffs.push(buff);
                    }
                    else {
    
                        const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

                        
                        if (buff.canStack) {
                            buff.stacks += 1;
                            if (buff.maxStacks) buff.stacks = Math.min(buff.stacks, buff.maxStacks);
                        }
                        addReport(state, `${spell.name} stacks: ${buff.stacks}`)
                    }

                    if (spell.name === "Essence Burst") {
                        triggerEssenceBurst(state);
                    }

                    

                }     
                else {
                    state.activeBuffs.push({name: spellName, expiration: state.t + spell.castTime + spell.buffDuration});
                }
            }

            // These are special exceptions where we need to write something special that can't be as easily generalized.

            if (spell.holyPower) state.holyPower += spell.holyPower;
            if (spell.cooldown) spell.activeCooldown = state.t + (spell.cooldown / getHaste(state.currentStats));
        
            }


 
        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
    }); 
}

const spendSpellCost = (spell, state) => {
    if ('essence' in spell[0]) {
        if (checkBuffActive(state.activeBuffs, "Essence Burst")) {
            removeBuffStack(state.activeBuffs, "Essence Burst");
            addReport(state, `Essence Burst consumed!`);
            state.manaSpent += 0;
        }
        else {
            // Essence buff is not active. Spend Essence and mana.
            state.manaSpent += spell[0].cost;
            state.essence -= spell[0].essence;

            // Check if we need to begin Essence Recharge. We don't actually need to check if we're below
            // 6 Essence, since we'll never be able to cast a spell that costs Essence if we're at 6.
            if (checkBuffActive(state.activeBuffs, "EssenceGen") === false) {
                addBuff(state, EVOKERCONSTANTS.essenceBuff, "EssenceGen");
            }
        }
    } 
        
    else if ('cost' in spell[0]) state.manaSpent += spell[0].cost;
    else {
        // No cost. Do nothing.
    };    
}

const getSpellCastTime = (spell, state, currentStats) => {
    if ('castTime' in spell) {
        let castTime = spell.castTime;

        if (spell.empowered) {
            // Empowered spells don't currently scale with haste.
            if (checkBuffActive(state.activeBuffs, "Temporal Compression")) {
                const buffStacks = getBuffStacks(state.activeBuffs, "Temporal Compression")
                castTime *= (1 - 0.05 * buffStacks)
                if (buffStacks === 4) triggerTemporal(state);
            }

            castTime = castTime / getHaste(currentStats); // Empowered spells do scale with haste.
        } 

        else if (castTime === 0 && spell.onGCD === true) castTime = 0; //return 1.5 / getHaste(currentStats);
        else castTime = castTime / getHaste(currentStats);

        return castTime;
    }
    else console.log("CAST TIME ERROR. Spell: " + spellName);
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
export const runCastSequence = (sequence, stats, settings = {}, incTalents = {}) => {
    //console.log("Running cast sequence");

    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, essence: 5};

    let currentStats = {...stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)


    const sequenceLength = 30; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = "Manual" // Auto / Manual.
    let atonementApp = []; // We'll hold our atonement timers in here. We keep them seperate from buffs for speed purposes.
    let nextSpell = 0; // The time when the next spell cast can begin.
    let spellFinish = 0; // The time when the cast will finish. HoTs / DoTs can continue while this charges.
    let queuedSpell = "";
    const startTime = performance.now();
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.

    const holySpells = applyLoadoutEffects(deepCopyFunction(SPELLDB), settings, talents, state, stats);



    const seq = [...sequence];

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // Check for any expired atonements. 
        
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
                    func(state, spell);

                } 
                if (buff.hasted || buff.hasted === undefined) buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
                else buff.next = buff.next + (buff.tickRate);
            });  
        }

        // -- Partial Ticks --
        // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
        // If your Shadow Word: Pain ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
        // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
        const expiringHots = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage" || buff.runEndFunc) && state.t >= buff.expiration && buff.canPartialTick})
        expiringHots.forEach(buff => {

            if (buff.buffType === "heal" || buff.buffType === "damage") {
                const tickRate = buff.tickRate / getHaste(state.currentStats)
                const partialTickPercentage = (buff.next - state.t) / tickRate;
                const spell = buff.attSpell;
                spell.coeff = spell.coeff * partialTickPercentage;

                if (buff.buffType === "damage") runDamage(state, spell, buff.name);
                else if (buff.buffType === "healing") runHeal(state, spell, buff.name + "(hot)");
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

        if (seq.length > 0 && (state.t > nextSpell)) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            if (seqType === "Manual") queuedSpell = seq.shift();
            else queuedSpell = genSpell(state, holySpells);
    
            const fullSpell = holySpells[queuedSpell];
            const castTime = getSpellCastTime(fullSpell[0], state, currentStats);
            spellFinish = state.t + castTime - 0.01;
            if (fullSpell[0].castTime === 0) nextSpell = state.t + 1.5 / getHaste(currentStats);
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
            const fullSpell = holySpells[queuedSpell];

            spendSpellCost(fullSpell, state);

            runSpell(fullSpell, state, spellName, holySpells);

            // Check if Echo
            // If we have the Echo buff active, and our current cast is Echo compatible (this will probably change through Alpha) then:
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
                    
                    const echoSpell = JSON.parse(JSON.stringify(holySpells[spellName + "(Echo)"]));

                    echoSpell.forEach(effect => {
                        if ('coeff' in effect) effect.coeff = effect.coeff * echoBuff.value;
                    })

                    // Unfortunately functions are not copied over when we do our deep clone, so we'll have to manually copy them over.
                    if (spellName === "Reversion") echoSpell[0].function = holySpells["Reversion"][0].function;
                    runSpell(echoSpell, state, spellName + "(Echo)", holySpells)
  
                }

                // Remove all of our Echo buffs.
                state.activeBuffs =  state.activeBuffs.filter(function (buff) {return buff.name !== "Echo"})

            }

            // Cleanup
            queuedSpell = "";
            spellFinish = 0;
        }

        if (seq.length === 0 && queuedSpell === "" && healBuffs.length === 0) {
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

