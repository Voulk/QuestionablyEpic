// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";
import { buildRamp } from "./DiscRampGen";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { addReport, checkBuffActive, removeBuffStack, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, getBuffStacks, getHealth, extendBuff } from "Retail/Engine/EffectFormulas/Generic/RampBase";

// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.
const discSettings = {
    chaosBrand: true,
    critMult: 2,

    aegisOfWrathWastage: 0.06 // Consumed within 2 seconds on average.
}

const DISCCONSTANTS = {
    masteryMod: 1.35,
    masteryEfficiency: 1,

    auraHealingBuff: 1, 
    auraDamageBuff: 0.94,
    
    enemyTargets: 1, 
    sins: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1}

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
        if (settings.playstyle === "Kyrian Evangelism") {
            settings['Clarity of Mind'] = true;
            settings['Pelagos'] = true;
            settings['4T28'] = true;
        }
        else if (settings.playstyle === "Venthyr Evangelism") {
            settings['Penitent One'] = true;
            settings['Shadow Word: Manipulation'] = true;
            settings['Theotar'] = true;
            settings['4T28'] = true;
        }
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

            extension: 0.7,
        })
        discSpells['PenanceTick'].push(
        {
            type: "buffExtension",
            buffName: "Purge the Wicked",
            extension: 0.7,
    })
    }
    if (talents.maliciousIntent) discSpells['Schism'][1].buffDuration += 3;



    // Tier 2 talents
    if (talents.revelInPurity) {
        discSpells['Purge the Wicked'][0].coeff *= (1 + 0.05 * talents.revelInPurity);
        discSpells['Purge the Wicked'][1].coeff *= (1 + 0.05 * talents.revelInPurity);
    }
    if (talents.exaltation) {
        discSpells['Rapture'][1].buffDuration += 3;
    }
    if (talents.painAndSuffering) {
        // ASSUMPTION: Throes of Pain should work on both DoTs but let's double check anyway.
        discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.075 * talents.painAndSuffering);
        discSpells['Purge the Wicked'][0].coeff *= (1 + 0.075 * talents.painAndSuffering);
        discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.075 * talents.painAndSuffering);
        discSpells['Purge the Wicked'][1].coeff *= (1 + 0.075 * talents.painAndSuffering);
    }
    if (talents.borrowedTime) {

    }
    if (talents.indemnity) discSpells['Power Word: Shield'][0].atonement += 3;
    if (talents.castigation) {
        discSpells['Penance'][0].bolts += 1;
        discSpells['DefPenance'][0].bolts += 1;
    }
    if (talents.contrition) {
        discSpells['DefPenanceTick'].push({
            type: "function",
            runFunc: function (state, atonementApp) {
                const atonementCount = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
                const spell = {type: "heal", coeff: 0.144 * talents.contrition, overheal: 0.15, secondaries: ['crit', 'vers', 'mastery'], targets: atonementCount}
                console.log("RUNNING CONTRITION");
                runHeal(state, spell, "Contrition");
            }
        })
    }
    if (talents.stolenPsyche) discSpells['Mind Blast'][0].atonementBonus = (1 + 0.2 * talents.stolenPsyche);

    // Tier 3 talents
    if (talents.trainOfThought) {
        // Can be mostly handled in RampGen.
    }
    if (talents.divineAegis) {
        // Can either just increase crit mod, or have it proc on all healing events as a separate line (too messy?).
        stats.critMult *= (1 + 0.15 * talents.divineAegis);

    }
    if (talents.sinsOfTheMany) {
        DISCCONSTANTS.sins = {0: 1.12, 1: 1.12, 2: 1.1, 3: 1.08, 4: 1.07, 5: 1.06, 6: 1.05, 7: 1.05, 8: 1.04, 9: 1.04, 10: 1.03};
        // TODO: add 1 point
    }
    if (talents.wrathUnleashed) {
        discSpells["Light's Wrath"][0].castTime -= 1;
        discSpells["Light's Wrath"][0].critMod = 0.15;
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
            runFunc: function (state) {
                const buff = state.activeBuffs.filter(buff => buff.name === "Purge the Wicked" || buff.name === "Shadow Word: Pain");
                console.log(buff);
                console.log("====");
                let flatDamageInc = 0;
                //extendBuff("")
            }

        })
    }
    if (talents.twilightEquilibrium) {

    }
    if (talents.inescapableTorment) {
        // TODO: Add two spell components, an AoE damage spell and a Shadowfiend / Mindbender duration increase function spell component.
    }
    if (talents.aegisOfWrath) {
        discSpells["Power Word: Shield"][0].coeff *= 1.5 * (1 - discSettings.aegisOfWrathWastage);
    }
    if (talents.makeAmends) {
        // We can kind of model this, but benefit isn't really going to be concentrated on ramps.
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
    if (settings['4T28']) {
        // If player has 4T28, then hook Power of the Dark Side into Power Word Radiance.
        discSpells['Power Word: Radiance'].push({
            name: "Power of the Dark Side",
            type: "buff",
            buffType: "special",
            value: 1.95,
            buffDuration: 20,
            castTime: 0,
            stacks: 1,
            canStack: true,
        });

    }
    else {
        // If player doesn't have 4T28, then we might still opt to start them with a PotDS proc on major ramps since the chance of it being active is extremely high.
        // This is unnecessary with 4pc since we'll always have a PotDS proc during our sequences due to Radiance always coming before Penance.
        if (settings['Power of the Dark Side']) {
            state.activeBuffs.push({name: "Power of the Dark Side", expiration: 999, buffType: "special", value: (1.5 + 0.1 * talents.darkIndulgence), stacks: 1, canStack: true})
        }   
    }
    
    // ==== Trinkets ====
    // These settings change the stat value prescribed to a given trinket. We call these when adding trinkets so that we can grab their value at a specific item level.
    // When adding a trinket to this section, make sure it has an entry in DiscSpellDB first prescribing the buff duration, cooldown and type of stat.
    //if (settings["Instructor's Divine Bell"]) discSpells["Instructor's Divine Bell"][0].value = settings["Instructor's Divine Bell"];
    if (settings["Instructor's Divine Bell (new)"]) discSpells["Instructor's Divine Bell (new)"][0].value = settings["Instructor's Divine Bell (new)"];
    if (settings["Flame of Battle"]) discSpells["Flame of Battle"][0].value = settings["Flame of Battle"];
    if (settings['Shadowed Orb']) discSpells['Shadowed Orb'][0].value = settings['Shadowed Orb'];
    if (settings['Soulletting Ruby']) discSpells['Soulletting Ruby'][0].value = settings['Soulletting Ruby'];
    //

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
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    const sins = DISCCONSTANTS.sins;
    let schism = 1;

    if (spellName !== "Mindbender" && spellName !== "Shadowfiend") {
        schism = buffs.filter(function (buff) {return buff.name === "Schism"}).length > 0 ? 1.25 : 1; 
    }
    
    let mult = (activeAtones > 10 ? sins['10'] : sins[activeAtones]) * schism
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
    else if (spellName === "Light's Wrath") mult *= (1 + (0.1 + talents.resplendentLight * 0.02) * activeAtones);
    return mult; 
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, buffs, t, spellName, talents) => {
    let mult = DISCCONSTANTS.auraHealingBuff;
    if (spellName === "Power Word: Shield" && checkBuffActive(buffs, "Rapture")) {
        mult *= 1.3;
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
    const atonementBaseTransfer = 0.5;
    return atonementBaseTransfer * (1.108 + mastery / 25.9259 / 100);
}

const getSqrt = (targets) => {
    return Math.sqrt(targets);
}

// This function is for time reporting. It just rounds the number to something easier to read. It's not a factor in any results.
const getTime = (t) => {
    return Math.round(t*1000)/1000
}

export const runHeal = (state, spell, spellName, specialMult = 1) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.activeBuffs, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, DISCCONSTANTS) * (1 - spell.overheal) * healingMult * targetMult;
    
    state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;

    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.overheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.overheal * 100}%)`)

}

export const runDamage = (state, spell, spellName, atonementApp) => {

    const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, activeAtonements, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, DISCCONSTANTS) * damMultiplier;
    const atonementHealing = Math.round(activeAtonements * damageVal * getAtoneTrans(state.currentStats.mastery) * (1 - spell.atoneOverheal) * (spell.atonementBonus || 1))
    // This is stat tracking, the atonement healing will be returned as part of our result.
    state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    state.healingDone['atonement'] = (state.healingDone['atonement'] || 0) + atonementHealing;

    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage (${atonementHealing} atone)`)
    //if (state.reporting) console.log(getTime(state.t) + " " + spellName + ": " + damageVal + ". Buffs: " + JSON.stringify(state.activeBuffs) + " to " + activeAtonements);

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
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    let state = {t: 0, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true}



    let atonementApp = []; // We'll hold our atonement timers in here. We keep them seperate from buffs for speed purposes.
    let nextSpell = 0;

    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.
    const discSpells = applyLoadoutEffects(deepCopyFunction(DISCSPELLS), settings, talents, state, stats);

    const seq = [...sequence];
    const sequenceLength = 45; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.

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
            const partialTickPercentage = (buff.next - state.t) / tickRate;
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
                    console.log(spell);
                    spell.runFunc(state, atonementApp);
                }

                // The spell adds a buff to our player.
                // We'll track what kind of buff, and when it expires.
                else if (spell.type === "buff") {
                    if (spell.buffType === "stats") {
                        state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat});
                    }
                    else if (spell.buffType === "statsMult") {
                        state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "statsMult", value: spell.value, stat: spell.stat});
                    }
                    else if (spell.buffType === "damage" || spell.buffType === "heal") {     
                        const newBuff = {name: spellName, buffType: spell.buffType, attSpell: spell,
                            tickRate: spell.tickRate, canPartialTick: spell.canPartialTick, next: state.t + (spell.tickRate / getHaste(state.currentStats))}

                        newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(currentStats)) : state.t + spell.buffDuration
                        state.activeBuffs.push(newBuff)

                    }
                    else if (spell.buffType === "special") {
                        
                        // Check if buff already exists, if it does add a stack.
                        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;
                        if (buffStacks === 0) state.activeBuffs.push({name: spell.name, expiration: (state.t + spell.castTime + spell.buffDuration) || 999, buffType: "special", value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack});
                        else {
                            const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]
                            
                            if (buff.canStack) buff.stacks += 1;
                        }
                    }     
                    else {
                        state.activeBuffs.push({name: spellName, expiration: state.t + spell.castTime + spell.buffDuration});
                    }
                }

                // These are special exceptions where we need to write something special that can't be as easily generalized.
                // Penance will queue either 3 or 6 ticks depending on if we have a Penitent One proc or not. 
                // These ticks are queued at the front of our array and will take place immediately. 
                // This can be remade to work with any given number of ticks.

                // This mini-section is a bit TODO in general.
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

