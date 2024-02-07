
import { addReport, getHaste } from "./RampBase"


/** Check if a specific buff is active and returns the value of it.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
export const getBuffValue = (buffs, buffName) => {
    const buff = buffs.filter(function (buff) {return buff.name === buffName})[0]
    return buff.value || 0;
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

/** Check if a specific buff is active. Buffs are removed when they expire so this is active buffs only.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
export const checkBuffActive = (buffs, buffName) => {
    return buffs.filter(function (buff) {return buff.name === buffName}).length > 0;
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

export const addBuff = (state, spell, spellName) => {
    let newBuff = {name: spell.name || spellName, expiration: state.t + spell.buffDuration, buffType: spell.buffType, startTime: state.t};
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
        addReport(state, "Adding Buff: " + spellName + " for " + spell.buffDuration + " seconds.");
        newBuff = {...newBuff, tickRate: spell.tickData.tickRate, canPartialTick: spell.tickData.canPartialTick}
        
        // If our spell has a hasted duration we'll reduce the expiration. These are at least fairly rare nowadays.
        if (spell.tickData.hastedDuration) newBuff.expiration = state.t + (spell.buffDuration / getHaste(state.currentStats));
        
        // Most HoTs and DoTs will scale with haste via a faster tick rate. There are some exceptions though like Yseras Gift and
        // so we'll check for a hasted flag so we can handle those too. If a flag doesn't exist at all then we'll assume it's hasted.
        if (spell.tickData.hasted || spell.tickData.hasted === undefined) {
            newBuff.next = state.t + getNextTick(state, spell.tickData.tickRate);
            newBuff.hasted = true;
        }
        else {
            newBuff.next = state.t + (spell.tickData.tickRate);
            newBuff.hasted = false;
        }

        // If the target of the buff is relevant to its functionality. Generate one.
        if ('flags' in spell && spell.flags.targeted) newBuff.target = generateBuffTarget(state, spell);

        // Check if any buffs affect the spell. If they do we'll have to adjust the coefficient.
        // Examples: Dream Breath (Call of Ysera).
        if (state.activeBuffs.filter(buff => buff.buffType === "spellAmp" && buff.buffedSpellName === spellName).length > 0) {
            const spellAmp = state.activeBuffs.filter(buff => buff.buffType === "spellAmp" && buff.buffedSpellName === spellName)[0];
            spell.coeff = spell.coeff * spellAmp.value;
        }

        // The spell will run a function on tick.
        if (spell.buffType === "function") {
            newBuff.attFunction = spell.runFunc;
            newBuff.attSpell = spell;
        }
        // The spell will cast a spell on tick. Examples: Any standard HoT or DoT.
        else {
            newBuff.attSpell = spell;
        }
        // Run a function when the spell ticks. Examples: Lux Soil, Reversion. NYI.
        if (spell.tickData.onTick) newBuff.onTick = spell.tickData.onTick;
        // The spell does something on application. Note that standard "heals on application" shouldn't be applied here. This is for special effects.
        if (spell.onApplication) spell.onApplication(state, spell, newBuff);
        

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
        

        if (buffStacks === 0 || !spell.canStack) {
            newBuff = {...newBuff, value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack}
            state.activeBuffs.push(newBuff);
            //console.log(newBuff);
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

const getNextTick = (state, tickRate) => {
    return getIncreasedTickRate(state, tickRate / getHaste(state.currentStats));
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

