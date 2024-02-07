// 
import { checkBuffActive } from "./BuffBase";

const GLOBALCONST = {
    rollRNG: true, // Model RNG through chance. Increases the number of iterations required for accuracy but more accurate than other solutions.
    statPoints: {
        crit: 180,
        mastery: 180,
        vers: 205,
        haste: 170,
        leech: 110,
    }

}






export const runBuffs = (state, tickBuff, stats, spellDB) => {
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
                tickBuff(state, buff, spellDB);

                if (buff.hasted || buff.hasted === undefined) buff.next = buff.next + getNextTick(state, buff.tickRate);
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
}

export const applyTalents = (state, spellDB, stats) => {
    Object.keys(state.talents).forEach(talentName => {
        
        const talent = state.talents[talentName];

        if (talent.points > 0) {
            talent.runFunc(state, spellDB, talent.points, stats)
        }
    });

}

// Cleanup is called after every hard spell cast. 
export const spellCleanup = (spell, state) => {

    // Check for any buffs that buffed the spell and remove them.
}

// TODO: Generalize secondary spell costs and then flatten this function. 
export const spendSpellCost = (spell, state) => {
    if ('essence' in spell[0]) {
        if (checkBuffActive(state.activeBuffs, "Essence Burst")) {
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Essence Burst");
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




// It can save time to skip dead time in a sequence. If my next HoT ticks in 0.5s, my next cast finishes in 1s then I don't need to loop through 0-0.4. Instead I can skip
// them and everything will run faster. 
export const advanceTime = (t, nextSpell, spellFinish, buffs) => {
    let newTime = t;
    if (buffs.length > 0) {
        const nextBuff = Math.min(...buffs.filter(obj => obj.next !== undefined).map(obj => obj.next));
        if (nextBuff !== undefined && nextBuff !== 0) newTime = Math.min(nextSpell > 0 ? nextSpell : 9999, spellFinish > 0? spellFinish : 9999, nextBuff);
        else newTime = Math.min(nextSpell > 0 ? nextSpell : 9999, spellFinish > 0? spellFinish : 9999);
    }
    else {
        newTime = Math.min(nextSpell > 0 ? nextSpell : 9999, spellFinish > 0? spellFinish : 9999);
    }

    return newTime;
}



// When our sequence finishes we run a bit of code to tidy up HPS values and so on.
// All specs do this so we'll do it in a tidyup function here.
export const runRampTidyUp = (state, settings, sequenceLength, startTime) => {
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    // Add up our healing values and return them.
    state.activeBuffs = [];
    state.totalDamage = Object.keys(state.damageDone).length > 0 ? Math.round(sumValues(state.damageDone)) : 0;
    state.totalHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
    state.talents = {};

    // Tidy up and offer percentages. Could be culled for run time if reporting is off.
    if (settings.advancedReporting) {
        state.healingDoneReport = {};
        
        Object.keys(state.healingDone).forEach(spellName => {
            state.healingDoneReport[spellName] = Math.round(state.healingDone[spellName] / state.totalHealing * 10000) / 100 + "% (" + Math.round(state.healingDone[spellName] / sequenceLength) + " hps)";
        })

        Object.keys(state.casts).forEach(spellName => {
            state.casts[spellName] = Math.round(state.casts[spellName] / (sequenceLength / 60) * 100) / 100;
        });
    }


    state.hps = Math.round(state.totalHealing / sequenceLength);
    state.dps = Math.round(state.totalDamage / sequenceLength);
    state.hpm = (state.totalHealing / state.manaSpent) || 0;


    const end = performance.now();
    const elapsedTime = end - startTime;
    state.elapsedTime = elapsedTime;
}



// Currently checks cooldown. Does not check for other availability but could be expanded to include. 
export const isSpellAvailable = (state, spellDB, spellName) => {
    const spell = spellDB[spellName][0]
    if (!spell || !('cooldownData' in spell)) return false;
    return (state.t >= spell.cooldownData.activeCooldown - ((spell.charges > 1 ? (spell.cooldownData.cooldown / (spell.cooldownData.hasted ? getHaste(state.currentStats) : 1)) * (spell.charges - 1) : 0))) || !spell.cooldownData.cooldown;
}

export const getSpellCooldown = (state, spellDB, spellName) => {
    const spell = spellDB[spellName][0]
    if (!spell || !('cooldownData' in spell)) return false;
    return spell.cooldownData.activeCooldown - state.t;

}

export const getSpellCastTime = (spell, state, currentStats) => {
    if ('castTime' in spell) {
        let castTime = spell.castTime;

        if (castTime === 0 && spell.onGCD === true) castTime = 0; //return 1.5 / getHaste(currentStats);
        // Replace with generic cast time decreases.
        else if ('name' in spell && spell.name.includes("Living Flame") && checkBuffActive(state.activeBuffs, "Ancient Flame")) castTime = castTime / getHaste(currentStats) / 1.4;
        else castTime = castTime / getHaste(currentStats);

        return castTime;
    }
    else console.log("CAST TIME ERROR. Spell: " + spellName);
}

/**
 * Returns a spells stat multiplier based on which stats it scales with.
 * Haste is included in calculations but isn't usually a raw multiplier since it changes cooldown instead. 
 * @param {*} statArray A characters current stats including any active buffs.
 * @param {*} stats The secondary stats a spell scales with. Pulled from it's SpellDB entry.
 * @returns An effective multiplier. For a spell that scales with both crit and vers this would just be crit x vers.
 */
export const getStatMult = (currentStats, stats, statMods, specConstants) => {
    let mult = 1;
    const baseMastery = specConstants.masteryMod / 100 * 8; // Every spec owns 8 mastery points baseline

    const critChance = 0.05 + currentStats['crit'] / GLOBALCONST.statPoints.crit / 100 + (statMods['crit'] || 0 );
    const critMult = (currentStats['critMult'] || 2) + (statMods['critEffect'] || 0);

    
    if (stats.includes("vers")) mult *= (1 + currentStats['versatility'] / GLOBALCONST.statPoints.vers / 100);
    if (stats.includes("haste")) mult *= (1 + currentStats['haste'] / GLOBALCONST.statPoints.haste / 100);
    if (stats.includes("crit")) mult *= ((1-critChance) + critChance * critMult);
    if (stats.includes("mastery")) mult *= (1+(baseMastery + currentStats['mastery'] / GLOBALCONST.statPoints.mastery * specConstants.masteryMod / 100) * specConstants.masteryEfficiency);

    return mult;
}

/**
 * Get our players active stats. This is made up of our base stats + any buffs. 
 * Diminishing returns is not in play in this function.
 * @param {} statArray Our active stats.
 * @param {*} buffs Our active buffs.
 * @returns 
 */
export const getCurrentStats = (statArray, buffs) => {
    const statBuffs = buffs.filter(function (buff) {return buff.buffType === "stats"});
    statBuffs.forEach(buff => {
        statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });

    //statArray = applyDiminishingReturns(statArray); // TODO: Update Diminishing Returns

    // Check for percentage stat increases which are applied post-DR.
    // Examples include Power Infusion and the crit portion of Shadow Word: Manipulation.
    const multBuffs = buffs.filter(function (buff) {return buff.buffType === "statsMult"});
    multBuffs.forEach(buff => {
        // Multiplicative Haste buffs need some extra code as they are increased by the amount of haste you already have.
        if (buff.stat === "haste") statArray["haste"] = (((statArray[buff.stat] / 170 / 100 + 1) * buff.value)-1) * 170 * 100;
        else statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });

    return statArray;
}

// Returns the players current haste percentage. 
export const getHaste = (stats) => {
    return 1 + stats.haste / 170 / 100;
}

export const getCrit = (stats) => {
    return 1.05 + stats.crit / 180 / 100;
}

export const addReport = (state, entry) => {
    if (state.settings.reporting) {
        state.report.push(Math.round(100*state.t)/100 + " " + entry);
            
        //state.report.push(Math.round(100*state.t)/100 + " " + entry);
    }
}

export const getHealth = (stats, talents) => {
    return stats.stamina * 20 * (1 + (talents.draconicLegacy ? talents.draconicLegacy : 0) * 0.02);
}


// The formula for sqrt abilties is a bit of a pain.
// They often do full healing up to the first X targets hit, and then are reduced via a square root formula after that.
// The formula after you reach your sqrt cap is 1/TargetNumber. So the first target hit after the minimum gets sqrt(1/1), the second gets sqrt(1/2) and so on.
export const getSqrt = (targets, sqrtMin) => {
    const effectiveSqrtTargets = targets - sqrtMin;
    let totalMult = sqrtMin;
    for (let i = 1; i <= effectiveSqrtTargets; i++) { totalMult += Math.sqrt(1 / i) }

    return totalMult;
    //return Math.min(Math.sqrt(effectiveSqrtTargets), 1) * effectiveSqrtTargets + sqrtMin;
}

const getSpellFlat = (spell, flatBonus = 0) => {
    return ((spell.flatHeal) || 0 + (spell.flatDamage || 0) + flatBonus)
}

/**
 * Get a spells raw damage or healing. This is made up of it's coefficient, our intellect, and any secondary stats it scales with.
 * We'll take care of multipliers like Schism and Sins in another function.
 * @param {object} spell The spell being cast. Spell data is pulled from DiscSpellDB. 
 * @param {object} currentStats A players current stats, including any buffs.
 * @returns The raw damage or healing of the spell.
 */
export const getSpellRaw = (spell, currentStats, specConstants, flatBonus = 0) => {
    return (getSpellFlat(spell, flatBonus) + spell.coeff * currentStats.intellect) * getStatMult(currentStats, spell.secondaries, spell.statMods || {}, specConstants); // Multiply our spell coefficient by int and secondaries.
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


