// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";



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

// Returns any increased tick rate the spell might currently have.
// Examples include Flourish, Photosynthesis.
// Note that tick rate increases are multiplicative with each other. 
export const getIncreasedTickRate = (state, tickRate) => {
    let adjTick = tickRate;
    state.activeBuffs.filter(buff => buff.buffType === "periodicSpeed").forEach(buff => {
        adjTick /= buff.value;
    });
    return adjTick;
}

const getNextTick = (state, tickRate) => {
    return getIncreasedTickRate(state, tickRate / getHaste(state.currentStats));
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


export const addBuff = (state, spell, spellName) => {
    let newBuff = {name: spellName, expiration: state.t + spell.buffDuration, buffType: spell.buffType, startTime: state.t};
    // (state.t + spell.castTime + spell.buffDuration)

    if (spell.buffType === "stats") {
        addReport(state, "Adding Buff: " + spellName + " for " + spell.buffDuration + " seconds (" + spell.value + " " + spell.stat + ")");
        newBuff = {...newBuff, value: spell.value, stat: spell.stat}
        state.activeBuffs.push(newBuff);
    }
    else if (spell.buffType === "statsMult") {
        addReport(state, "Adding Buff: " + spellName + " for " + spell.buffDuration + " seconds (" + spell.value + " " + spell.stat + " - Mult)");
        newBuff = {...newBuff, value: spell.value, stat: spell.stat}
        state.activeBuffs.push(newBuff);
    }
    else if (spell.buffType === "damage" || spell.buffType === "heal" || spell.buffType === "function") {     
        newBuff = {...newBuff, tickRate: spell.tickData.tickRate, canPartialTick: spell.tickData.canPartialTick, 
                    next: state.t + getNextTick(state, spell.tickData.tickRate)}
        
        // If our spell has a hasted duration we'll reduce the expiration. These are at least fairly rare nowadays.
        if (spell.tickData.hastedDuration) newBuff.expiration = state.t + (spell.buffDuration / getHaste(state.currentStats));
        
        // The target of the buff is relevant to its functionality. Generate one.
        if ('flags' in spell && spell.flags.targeted) newBuff.target = generateBuffTarget(state, spell);

        // The spell will run a function on tick.
        if (spell.buffType === "function") {
            newBuff.attFunction = spell.runFunc;
            newBuff.attSpell = spell;
        }
        // The spell will cast a spell on tick. Examples: Any standard HoT or DoT.
        else {
            newBuff.attSpell = spell;
        }
        // Run a function when the spell ticks. Examples: Lux Soil, Reversion.
        if (spell.tickData.onTick) newBuff.onTick = spell.tickData.onTick;
        
        state.activeBuffs.push(newBuff)

    }
    // Spell amps are buffs that increase the amount of healing the next spell that meets the criteria. The criteria is defined in the buff itself by a function.
    // Examples might include Call of Ysera or Soul of the Forest.
    // Buffs that increase the healing of all spells could be handled here in future, but aren't currently. Those are generally much easier.

    // Buffs here support stacking and maxStacks properties.
    else if (spell.buffType === "spellAmp") {
        
        // Check if buff already exists, if it does add a stack.
        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;
        addReport(state, "Adding Buff: " + spell.name + " for " + spell.buffDuration + " seconds.");

        // Buff doesn't exist already. We'll add the buff new.
        if (buffStacks === 0) {
            newBuff = {...newBuff, value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack, buffedSpellName: spell.buffedSpellName}
            state.activeBuffs.push(newBuff);
        }
        // The buff does already exist. We can just add a stack.
        // Note that the duration usually refreshes here too.
        // We could add a flag to not refresh if it's ever necessary.

        // If a buff is unable to stack, we'll just refresh the duration instead.
        else {
            const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

            if (buff.canStack) buff.stacks += 1;
            buff.expiration = newBuff.expiration;
        }
    }

    // This category could possibly be folded into others. Currently a bit of a messy catch all.
    else if (spell.buffType === "special" || spell.buffType === "periodicSpeed") {
        
        // Check if buff already exists, if it does add a stack.
        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;
        addReport(state, "Adding Buff: " + spell.name + " for " + spell.buffDuration + " seconds.");

        if (buffStacks === 0) {
            newBuff = {...newBuff, value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack}
            state.activeBuffs.push(newBuff);
        }
        else {
            const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

            if (buff.canStack) buff.stacks += 1;
            buff.expiration = newBuff.expiration;
        }
    }
    else {
        addReport(state, "Adding Buff with INVALID category: " + spellName);
        state.activeBuffs.push({name: spellName, expiration: state.t + spell.castTime + spell.buffDuration});
    }
    return newBuff; // Note that we are adding to our state directly. This can just be useful for other functions like TickOnCast.
    
}

export const removeBuff = (buffs, buffName) => {
    return buffs.filter((buff) => buff.name !== buffName);
}

// Removes a stack of a buff, and removes the buff entirely if it's down to 0 or doesn't have a stack mechanic.
export const removeBuffStack = (buffs, buffName) => {
    const buff = buffs.filter(buff => buff.name === buffName)[0]
    
    if (buff === undefined) return buffs;
    const buffStacks = buff.stacks || 0;

    if (buffStacks === 1) {
        // Remove the buff
        buffs = removeBuff(buffs, buffName);
    }
    else if (buffStacks >= 1) {
        // The player has more than 1 stack of the buff. Remove one and leave the buff.
        const activeBuff = buffs.filter(buff => buff.name === buffName)[0];
        activeBuff.stacks = activeBuff.stacks - 1;
    }
    else {
        // The player doesn't have the buff at all.
        // This is not necessarily an error.
    }
    return buffs;
}


/** Check if a specific buff is active. Buffs are removed when they expire so this is active buffs only.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
export const checkBuffActive = (buffs, buffName) => {
    return buffs.filter(function (buff) {return buff.name === buffName}).length > 0;
}


export const generateBuffTarget = (state, spell) => {
    // Attempt to find unique target for HoT.
    const filteredBuffs = state.activeBuffs.filter(buff => buff.name === spell.name)

    // Create an array of possible targets from 1 to 20. We could add better support for M+ by capping this at 5.
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

    // Get all the 'target' values from the input array
    const targets = new Set(filteredBuffs.map(obj => obj.target));

    // Find the smallest number that isn't in the 'targets'
    for (let num of numbers) {
        if (!targets.has(num)) {
            addReport(state, "Adding Buff: " + spell.name + " to target " + num);
            return num;
        }
    }
    // If all buffs are taken, return 0 instead. The technically correct answer here would be to check for the shortest buff while we're finding the smallest
    // number and return that but we'll leave that for another time. Note that it's a very minor optimization. 
    return 0;

}

/** Check if a specific buff is active and returns how many stacks of it we have.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
 export const getBuffStacks = (buffs, buffName) => {
    const buff = buffs.filter(function (buff) {return buff.name === buffName})[0]
    return buff.stacks || 0;
}

/**  Extend any buffs named @spellName by @extension seconds. */
export const extendBuff = (activeBuffs, timer, spellName, extension) => {
    activeBuffs.forEach((buff) => {
        if (buff.name === spellName) {
            buff.expiration += extension;
        }
    });
}

/** Check if a specific buff is active and returns the value of it.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
export const getBuffValue = (buffs, buffName) => {
    const buff = buffs.filter(function (buff) {return buff.name === buffName})[0]
    return buff.value || 0;
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
    return 1 + stats.crit / 180 / 100;
}

export const addReport = (state, entry) => {
    if (state.settings.reporting) {
        state.report.push(Math.round(100*state.t)/100 + " " + entry);
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

