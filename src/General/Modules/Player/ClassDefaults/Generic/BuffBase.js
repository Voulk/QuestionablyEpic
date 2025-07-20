
import { addReport, getHaste, getCurrentStats, getCrit } from "./RampBase"


export const runBuffs = (state, stats, spellDB, runHeal, runDamage) => {
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
            tickBuff(state, buff, spellDB, runHeal, runDamage);

            if (buff.hasted || buff.hasted === undefined) buff.next = buff.next + getNextTick(state, buff.tickRate);
            else buff.next = buff.next + (buff.tickRate);
        });  
    }

    // -- Partial Ticks --
    // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
    // If your Shadow Word: Pain ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
    // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
    const expiringHots = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType == "function" || buff.runEndFunc) && state.t >= buff.expiration && buff.canPartialTick})
    expiringHots.forEach(buff => {
        if (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType === "function") {
            
            const tickRate = buff.tickRate / getHaste(state.currentStats)
            const partialTickPercentage = 1-((buff.next - state.t) / tickRate);
            const spell = buff.attSpell;
            spell.coeff = spell.coeff * partialTickPercentage;
            if (partialTickPercentage > 0.01) { // We don't need to trigger a partial tick if it happens at the same time stamp.
                if (buff.buffType === "damage") runDamage(state, spell, buff.name);
                else if (buff.buffType === "heal") runHeal(state, spell, buff.name/* + "(hot)"*/, buff.target || 0);
                else if (buff.buffType === "function") buff.attFunction(state, spell, buff, partialTickPercentage);
            }

        }
        else if (buff.runEndFunc) buff.runFunc(state, buff);
    })

    state.activeBuffs = state.activeBuffs.filter(function (buff) {return buff.expiration > state.t});
}

const tickBuff = (state, buff, spellDB, runHeal, runDamage) => {
    if (buff.buffType === "heal") {
        const spell = buff.attSpell;
        runHeal(state, spell, buff.name/* + " (HoT)"*/, buff.target || 0)
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

    if (buff.onTick) buff.onTick(state, buff, runSpell, spellDB);
    if (buff.critExtension) {
        // If the heal / damage crits, we'll extend the buff by the crit extension. These are often capped so we'll support that too.
        // Examples: Reversion.
        const roll = Math.random();
        const didCrit = roll <= (getCrit(state.currentStats) - 1);
        //console.log("Roll: " + roll + " Crit: " + getCrit(state.currentStats));
        if (didCrit) {
            if ('extensionCount' in buff) {
                if (buff.extensionCount < buff.critExtension.maxExtension) {
                    buff.extensionCount += 1;
                    buff.expiration += buff.critExtension.extension;
                    //console.log("Extending HoT again");
                }
                else {
                    //console.log("Tried to extend but already at cap");
                }
            }
            else {
                buff.extensionCount = 1;
                //console.log("Extending HoT");
                buff.expiration += buff.critExtension.extension;
            }
        }
    }
}

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
export const extendBuff = (activeBuffs, timer, spellNames, extension) => {
    activeBuffs.forEach((buff) => {
        if (spellNames.includes(buff.name)) {
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
        //if ('flags' in spell && spell.flags.targeted) newBuff.target = generateBuffTarget(state, spell);
        newBuff.target = state.currentTarget || [];

        // Check if any buffs affect the spell. If they do we'll have to adjust the coefficient.
        // Examples: Dream Breath (Call of Ysera).
        if (state.activeBuffs.filter(buff => buff.buffType === "spellAmp" && buff.buffedSpellName === spellName).length > 0) {
            const spellAmp = state.activeBuffs.filter(buff => buff.buffType === "spellAmp" && buff.buffedSpellName === spellName)[0];
            spell.coeff = spell.coeff * spellAmp.value;
        }
        else if (state.activeBuffs.filter(buff => buff.buffType === "spellAmpMulti" && spellName in buff.buffedSpellName).length > 0) { 
            const spellAmp = state.activeBuffs.filter(buff => buff.buffType === "spellAmpMulti" && spellName in buff.buffedSpellName)[0];
            spell.coeff = spell.coeff * spellAmp.buffedSpellName[spellName];
            
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
        if (spell.critExtension) newBuff.critExtension = spell.critExtension;
        // The spell does something on application. Note that standard "heals on application" shouldn't be applied here. This is for special effects.
        if (spell.onApplication) spell.onApplication(state, spell, newBuff);
        
        state.activeBuffs.push(newBuff)

    }
    // Spell amps are buffs that increase the amount of healing the next spell that meets the criteria. The criteria is defined in the buff itself by a function.
    // Examples might include Call of Ysera or Soul of the Forest.
    // Buffs that increase the healing of all spells could be handled here in future, but aren't currently. Those are generally much easier.

    // Buffs here support stacking and maxStacks properties.
    else if (spell.buffType === "spellAmp" || spell.buffType === "spellAmpMulti") {
        
        // Check if buff already exists, if it does add a stack.
        const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;
        addReport(state, "Adding Buff: " + spell.name + " for " + spell.buffDuration + " seconds.");

        // Buff doesn't exist already. We'll add the buff new.
        if (buffStacks === 0) {
            newBuff = {...newBuff, value: spell.value || 1, stacks: spell.stacks || 1, canStack: spell.canStack, buffedSpellName: spell.buffedSpellName || spell.buffedSpells}
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
    
        // If unique, add if don't have it, extend otherwise.
        // If can stack, add if don't have it, add a stack otherwise.
        // If can't stack but not unique, add it regardless.

        // If we don't have the buff already, or if they don't stack, then add it.
        if ((buffStacks === 0 || (!spell.canStack && !spell.unique))) {
            newBuff = {...newBuff, value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack}
            state.activeBuffs.push(newBuff);
            //console.log(newBuff);
        }
        // If we do have the buff already, then add a stack and extend duration.
        else {
            const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

            if (spell.name === "Awakening") {
                if ((buff.stacks + 1) >= buff.maxStacks) {
                    // At awakening cap. Remove buff, then add new buff.
                    state.activeBuffs = removeBuff(state.activeBuffs, "Awakening")
                    const awakeningFinal = {name: "Awakening - Final", expiration: (state.t  + 99), buffType: "special", 
                        value: 1.3, stacks: 1, canStack: false};
                    state.activeBuffs.push(awakeningFinal);
                    addReport(state, `Adding Awakening - Final`)
                }
                else {
                    // Not at awakening cap yet. Increase buff stack by 1.
                    buff.stacks += 1;
                }
            }
            if (spell.name === "Blessing of Dawn Stacker") {
                if ((buff.stacks + 1) >= buff.maxStacks) {
                    // At Blessing of Dawn cap. Remove buff, then add new buff.
                    state.activeBuffs = removeBuff(state.activeBuffs, "Blessing of Dawn Stacker")
                    if (checkBuffActive(state.activeBuffs, "Blessing of Dawn")) {
                        const dawnBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Blessing of Dawn"})[0]
                        if ((dawnBuff.stacks) < dawnBuff.maxStacks) dawnBuff.stacks += 1;
                        addReport(state, `Adding Blessing of Dawn Stack`)
                    }
                    else {
                        const dawnFinal = {name: "Blessing of Dawn", expiration: (state.t  + 99), buffType: "special", 
                            value: 1.2, stacks: 1, maxStacks: 2, canStack: true};
                        state.activeBuffs.push(dawnFinal);
                        addReport(state, `Adding Blessing of Dawn`)
                    }
                }
                else {
                    // Not at Blessing of Dawn cap yet. Increase buff stack by 1.
                    buff.stacks += 1;
                }
            }

            else if (spell.name === "Avenging Crusader") {
                

                //const buffDuration = buff[0].expiration - state.t;
                //buff.expiration = Math.max(buffDuration, spell.buffDuration) + state.t;
                buff.expiration = buff.expiration + spell.buffDuration;
            }
            else {
                if (buff.canStack) buff.stacks += 1;
                buff.expiration = newBuff.expiration;
            }


        }

        if (spell.special) newBuff.special = spell.special;

    }
    // This category is for buffs that increase the cast speed of our next cast of X spell. 
    // Example: Ancient Flame, Classic Infusion of Light
    else if (spell.buffType === "spellSpeed" || spell.buffType === "spellSpeedFlat") {
        newBuff.buffSpell = spell.buffSpell;
        newBuff.buffSpeed = spell.buffSpeed;

        const buffExists = state.activeBuffs.filter(function (buff) {return buff.name === spell.name});
        if (buffExists.length > 0) buffExists[0].expiration = state.t + spell.buffDuration;
        else state.activeBuffs.push(newBuff);
        //console.log(buffExists.length);
    }
    else {
        addReport(state, "Adding Buff with INVALID category: " + spellName + " " + spell.buffType);
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

