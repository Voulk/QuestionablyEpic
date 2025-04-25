// 
import { checkBuffActive, removeBuffStack, removeBuff, addBuff, getBuffStacks, extendBuff } from "./BuffBase";
import { getEssenceBuff, triggerTemporal } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRamps" // TODO: Handle this differently.
import { genSpell } from "./APLBase";
import { STATCONVERSION } from "General/Engine/STAT"

const GLOBALCONST = {
    rollRNG: true, // Model RNG through chance. Increases the number of iterations required for accuracy but more accurate than other solutions.
    statPoints: {
        crit: STATCONVERSION.CRIT,
        mastery: STATCONVERSION.MASTERY,
        vers: STATCONVERSION.VERSATILITY,
        haste: STATCONVERSION.HASTE,
        leech: STATCONVERSION.LEECH,
    }

}

// Returns true if the player has at least one point in a talent.
export const hasTalent = (talents, talentName) => {
    return talents[talentName] ? talents[talentName].points > 0 : 0;
}

export const getTalentPoints = (talents, talentName) => {
    return talents[talentName] ? talents[talentName].points : 0;
}

export const getTalentData = (state, talentName, attribute) => {
    if (state.talents[talentName].data[attribute]) return state.talents[talentName].data[attribute];
    else {
        console.error("Looking for missing talent data: " + talentName + " " + attribute);
        return "";
    }
}

export const getTalentValue = (talents, talentName) => {
    if (talents[talentName].value) return talents[talentName].value * talents[talentName].points;
    else {
        console.error("Looking for missing talent value: " + talentName);
        return "";
    }
}

export const applyTalents = (state, spellDB, stats) => {
    Object.keys(state.talents).forEach(talentName => {
        const talent = state.talents[talentName];
        if (talent.points > 0 && (!talent.heroTree || state.heroTree === talent.heroTree)) {
            talent.runFunc(state, spellDB, talent.points, stats)
        }
    });

}

// Cleanup is called after every hard spell cast. 
export const spellCleanup = (spell, state) => {

    // Check for any buffs that buffed the spell and remove them.
}

// TODO: Generalize secondary spell costs and then flatten this function. 
export const spendSpellCost = (spell, state, spellName = "") => {
    if ('essence' in spell[0]) {
        if (checkBuffActive(state.activeBuffs, "Essence Burst")) {
            state.activeBuffs = removeBuffStack(state.activeBuffs, "Essence Burst");
            addReport(state, `Essence Burst consumed!`);
            state.manaSpent += 0;
            
        }
        else {
            // Essence buff is not active. Spend Essence and mana.
            let cost = spell[0].cost || 0;

            // Special mana mods
            if (spellName.includes("Rejuvenation") && checkBuffActive(state.activeBuffs, "Incarnation: Tree of Life")) cost *= 0.7;
            if (spellName.includes("Regrowth" && state.talents.abundance && state.talents.abundance.points > 0)) {
                // Reduce price of Regrowth by 8% per active Rejuv, to a maximum of 12 stacks (96% reduction).
                const abundanceStacks = state.activeBuffs.filter(buff => buff.name === "Rejuvenation").length;
                cost *= 1 - Math.min(abundanceStacks * 0.08, 0.96);
            }

            state.manaSpent += spell[0].cost;
            state.manaPool = (state.manaPool || 0) - spell[0].cost;
            state.essence -= spell[0].essence;
            

            // Check if we need to begin Essence Recharge. We don't actually need to check if we're below
            // 6 Essence, since we'll never be able to cast a spell that costs Essence if we're at 6.
            if (checkBuffActive(state.activeBuffs, "EssenceGen") === false) {
                addBuff(state, getEssenceBuff(), "EssenceGen");
            }
        }
    } 
        
    else if ('cost' in spell[0]) {
        if (spellName === "Flash of Light" && checkBuffActive(state.activeBuffs, "Infusion of Light")) {
            state.manaSpent += spell[0].cost * (1 - PALADINCONSTANTS.infusion.flashOfLightReduction); }
        if ((spellName === "Flash of Light" || spellName === "Holy Light") && checkBuffActive(state.activeBuffs, "Divine Favor")) {
            state.manaSpent += spell[0].cost * 0.5; }
        else if (spellName == "Holy Shock" && state.talents.reclamation.points == 1) {
            state.manaSpent += spell[0].cost * (1 - ((1 - PALADINCONSTANTS.reclamation.avgHealHealth) * (PALADINCONSTANTS.reclamation.manaReduction))); }
        else if (spellName == "Crusader Strike" && state.talents.reclamation.points == 1) {
            state.manaSpent += spell[0].cost * (1 - ((1 - PALADINCONSTANTS.reclamation.avgDamHealth) * (PALADINCONSTANTS.reclamation.manaReduction))); }
        else state.manaSpent += spell[0].cost;
        state.manaPool = (state.manaPool || 0) - spell[0].cost;
    }
    else {
        // No cost. Do nothing.
    };    

    // TODO: Add cost discounts here like Infusion of Light.
}

// Runs a classic era periodic spell.
const runPeriodic = (state, spell, spellName, runHeal, runDamage) => {
    // Calculate tick count
    let tickCount = 0;
    const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : getHaste(state.currentStats, "Classic");
    const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
    
    tickCount = Math.round(spell.buffDuration / (adjTickRate));

    // Run heal
    for (let i = 0; i < tickCount; i++) {
        if (spell.buffType === "heal") runHeal(state, spell, spellName + " (HoT)");
        else if (spell.buffType === "damage") runDamage(state, spell, spellName + " (DoT)");
    }
}

// Ideally remove triggerSpecial eventually.
// flags: "ignoreCD"
export const runSpell = (fullSpell, state, spellName, evokerSpells, triggerSpecial, runHeal, runDamage, flags = {}) => {
    fullSpell.forEach(spell => {
        let canProceed = false

        if (spell.chance) {
            const roll = Math.random();
            canProceed = roll <= spell.chance;
        }
        else if (spell.onCrit) {
            // Spell does something unique on crit.
            const roll = Math.random();
            canProceed = roll <= (getCrit(state.currentStats) - 1 + ('statMods' in fullSpell[0] ? fullSpell[0].statMods.crit : 0));
        }
        else canProceed = true;

        if (canProceed) {
            // The spell casts a different spell. 
            const target = fullSpell[0].targeting ? generateSpellTarget(state, fullSpell[0], spellName) : [];
            if (target) state.currentTarget = target;
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
                        runSpell(newSpell, state, spell.storedSpell, evokerSpells, triggerSpecial, runHeal, runDamage);
                    }
                }
                else {
                    runSpell(newSpell, state, spell.storedSpell, evokerSpells, triggerSpecial, runHeal, runDamage);
                }

                
            }
            // The spell has a healing component. Add it's effective healing.
            // Absorbs are also treated as heals.
            else if (spell.type === 'heal') {
                runHeal(state, spell, spellName)
            }

            // In classic we don't need to worry about hots and dots changing 
            else if (spell.type === "classic periodic") {
                runPeriodic(state, spell, spellName, runHeal, runDamage);
            }
            
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'damage') {
                runDamage(state, spell, spellName)
            }
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'function') {
                spell.runFunc(state, spell, evokerSpells, triggerSpecial, runHeal, runDamage);
            }

            // The spell adds a buff to our player.
            // We'll track what kind of buff, and when it expires.
            else if (spell.type === "buff") {
                if (spell.name === "Essence Burst") {
                    // Special code for essence burst.
                    triggerSpecial(state);
                }
                else {
                    addBuff(state, spell, spellName);
                }
                
            }
            else if (spell.type === "buffExtension") {
                extendBuff(state.activeBuffs, 0, spell.extensionList, spell.extensionDuration)
            }
            // The spell reduces the cooldown of another spell. 
            else if (spell.type === "cooldownReduction") {
                const targetSpell = evokerSpells[spell.targetSpell];
                targetSpell[0].cooldownData.activeCooldown -= spell.cooldownReduction;
            }
             // The spell reduces the cooldown of multiple spells. 
            else if (spell.type === "cooldownReductions") {
                spell.targetSpells.forEach(target => {
                    const targetSpell = evokerSpells[target];
                    if (targetSpell[0].cooldownData.activeCooldown) targetSpell[0].cooldownData.activeCooldown -= spell.cooldownReduction;
                    //(target + ": " + targetSpell[0].cooldownData.activeCooldown + " - " + (targetSpell[0].cooldownData.activeCooldown - spell.cooldownReduction));
                    
                })
                
            }
            else if (spellName !== "Rest") {
                console.error("Spell Type Error: " + spellName);
            }

            // These are special exceptions where we need to write something special that can't be as easily generalized.
            if (state.spec.includes("Holy Paladin") && 'cooldownData' in spell && spell.cooldownData.cooldown && !flags.bonus/*&& !bonusSpell*/) {
                // Handle charges by changing the base cooldown value
                const newCooldownBase = ((spell.cooldownData.charges > 1 && spell.cooldownData.activeCooldown > state.t) ? spell.cooldownData.activeCooldown : state.t)
                //const newCooldownBase = state.t;

                if (spell.cooldownData.hasted) spell.cooldownData.activeCooldown = state.t + spell.cooldownData.cooldown / getHaste(state.currentStats);
                else spell.cooldownData.activeCooldown = state.t + spell.cooldownData.cooldown;


                /*
                if (spellName === "Holy Shock" && state.talents.sanctifiedWrath.points && checkBuffActive(state.activeBuffs, "Avenging Wrath")) spell.cooldownData.activeCooldown = newCooldownBase + (spell.cooldowndata.cooldown / getHaste(state.currentStats) / 1.2);
                else if ((spellName === "Crusader Strike" || spellName === "Judgment") && checkBuffActive(state.activeBuffs, "Avenging Crusader")) spell.cooldownData.activeCooldown = newCooldownBase + (spell.cooldowndata.cooldown / getHaste(state.currentStats) / 1.3);
                else if (spell.hastedCooldown) spell.cooldownData.activeCooldown = newCooldownBase + (spell.cooldowndata.cooldown / getHaste(state.currentStats));
                else spell.cooldownData.activeCooldown = newCooldownBase + spell.cooldown; */
            }
            else if ('cooldownData' in spell && spell.cooldownData.cooldown && !('ignoreCD' in flags)) spell.cooldownData.activeCooldown = state.t + (spell.cooldownData.cooldown / getHaste(state.currentStats));
    
            if (spell.holyPower) state.holyPower = Math.min(state.holyPower + spell.holyPower, 5);

        }

    }); 

    // Any post-spell code.
    if (fullSpell[0].onCastEnd) {
        fullSpell[0].onCastEnd.forEach(effect => {
            if (effect.type === "Remove Buff") state.activeBuffs = removeBuff(state.activeBuffs, effect.buffName);
        })
    }

    // TODO: make this an onCastEnd effect.
    if (spellName === "Dream Breath") state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");
    if (["Rejuvenation", "Regrowth", "Wild Growth"].includes(spellName)) state.activeBuffs = removeBuffStack(state.activeBuffs, "Soul of the Forest");

    //if (spellName === "Verdant Embrace" && state.talents.callofYsera) addBuff(state, EVOKERCONSTANTS.callOfYsera, "Call of Ysera");
    state.currentTarget = [];

}


// Options:
// - avoidSame - Used for buff spells to avoid re-casting them on the same target.
// - random - A purely random selection. Multi-target spells will avoid hitting the same target.
// Note that most spells won't need explicit targeting to begin with. It is only relevant in cases like Resto Druid where who the buff is on is of particular importance.
export const generateSpellTarget = (state, spell, spellName) => {
    // Attempt to find unique target for HoT.
    const filteredBuffs = state.activeBuffs.filter(buff => buff.name === spellName)

    // Create an array of possible targets from 1 to 20. We could add better support for M+ by capping this at 5.
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

    // Get all the 'target' values from the input array
    // These are all targets that already have the buff we're looking to apply.
    const targets = new Set(filteredBuffs.flatMap(obj => obj.target));

    if (spell.targeting.behavior === "random") {
        shuffleArray(numbers);
        //console.log("Applying buff to " + JSON.stringify(numbers.slice(0, spell.targeting.count)));
        return numbers.slice(0, spell.targeting.count);
    }

    // Find the smallest number that isn't in the 'targets'
    for (let num of numbers) {
        if (!targets.has(num)) {
            addReport(state, "Adding Buff: " + spellName + " to target " + num);
            //console.log(targets);
            //console.log("Adding Buff: " + spellName + " to target " + num);
            return [num];
        }
    }
    // If all buffs are taken, return 0 instead. The technically correct answer here would be to check for the shortest buff while we're finding the smallest
    // number and return that but we'll leave that for another time. Note that it's a very minor optimization. 
    return [];

}

export function checkRoll(chance) {
    const roll = Math.random();
    return roll <= chance;     
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

export const queueSpell = (castState, seq, state, spellDB, seqType, apl) => {
    if (seqType === "Manual") castState.queuedSpell = seq.shift();
    // if its is "Auto", use genSpell to auto generate a cast sequence
    else {
        // If we're creating our sequence via APL then we'll 
        if (seq.length > 0) castState.queuedSpell = seq.shift();
        else {
            seq = genSpell(state, spellDB, apl);
            castState.queuedSpell = seq.shift();
        }
    }

    if (seqType === "Manual" && !castState.queuedSpell) {
        castState.queuedSpell = "";
        castState.nextSpell = 999;
        return;
    }

    if (!castState.queuedSpell && seqType === "Auto") {
        
        //console.error("Can't find spell: " + castState.queuedSpell);
        castState.queuedSpell = "Rest";
        castState.spellFinish = state + 1.5;
        castState.nextSpell = state + 1.5;
    }
    
    const fullSpell = spellDB[castState.queuedSpell];

    // Check if the spell has a custom GCD. 
    const GCDCap = state.gameType === "Classic" ? 1 : 0.75;
    console.log(castState.queuedSpell);
    console.log(spellDB);
    const GCD = fullSpell[0].customGCD || 1.5;
    const castTime = getSpellCastTime(fullSpell[0], state, state.currentStats, castState.queuedSpell);
    const effectiveCastTime = castTime === 0 ? Math.max(GCD / getHaste(state.currentStats, state.gameType), GCDCap) : castTime;

    state.execTime += effectiveCastTime;
    castState.spellFinish = state.t + castTime - 0.01;

    // These could be semi-replaced by effectiveCastTime. TODO.
    if (fullSpell[0].castTime === 0 && fullSpell[0].offGCD) castState.nextSpell = state.t + 0.01;
    else if (fullSpell[0].castTime === 0) castState.nextSpell = state.t + effectiveCastTime;
    else if (fullSpell[0].channel) { castState.nextSpell = state.t + castTime; castState.spellFinish = state.t }
    else castState.nextSpell = state.t + castTime;


    //console.log("Queued: " + castState.queuedSpell + " | Next: " + castState.nextSpell + " | Finish: " + castState.spellFinish);
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


// TODO: Add support to have more than one effect a spell.
const hasCastTimeBuff = (buffs, spellName, castTime) => {
    const buff = buffs.filter( buff => (buff.buffType === "spellSpeed" || buff.buffType === "spellSpeedFlat") && (buff.buffSpell.includes(spellName) || buff.buffSpell.includes("All")));
    if (buff.length > 0) {
        if (buff[0].buffType === "spellSpeed") return castTime / buff[0].spellSpeed;
        else if (buff[0].buffType === "spellSpeedFlat") return castTime - buff[0].spellSpeed
        
    }
    else return 0
}


// TODO: Remove empowered section and turn Temporal Compression into a type of cast speed buff.
export const getSpellCastTime = (spell, state, currentStats, spellName) => {
    if ('castTime' in spell) {
        let castTime = spell.castTime;
    
        if (spell.empowered) {
            if (checkBuffActive(state.activeBuffs, "Temporal Compression")) {
                const buffStacks = getBuffStacks(state.activeBuffs, "Temporal Compression")
                castTime *= (1 - 0.1 * buffStacks)
                if (buffStacks === 4) triggerTemporal(state);
            }
            castTime = castTime / getHaste(currentStats, "Retail"); // Empowered spells do scale with haste.
        } 

        // Special cases
        else if (spellName === "Regrowth" && checkBuffActive(state.activeBuffs, "Incarnation: Tree of Life")) castTime = 0;

        else if (castTime === 0 && spell.onGCD === true) castTime = 0; //return 1.5 / getHaste(currentStats);
        else if (hasCastTimeBuff(state.activeBuffs, spell.name)) castTime = hasCastTimeBuff(state.activeBuffs, spell.name, castTime) / getHaste(currentStats, state.gameType);
        //else if ('name' in spell && spell.name.includes("Living Flame") && checkBuffActive(state.activeBuffs, "Ancient Flame")) castTime = castTime / getHaste(currentStats) / 1.4;
        else castTime = castTime / getHaste(currentStats, state.gameType);

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
    
    if (stats.includes("vers") || stats.includes("versatility")) mult *= (1.03 + currentStats['versatility'] / GLOBALCONST.statPoints.vers / 100); // Mark of the Wild built in.
    if (stats.includes("haste")) mult *= (1 + currentStats['haste'] / GLOBALCONST.statPoints.haste / 100);
    if (stats.includes("crit")) mult *= ((1-critChance) + critChance * critMult);
    if (stats.includes("mastery")) mult *= (1+(baseMastery + currentStats['mastery'] / GLOBALCONST.statPoints.mastery * specConstants.masteryMod / 100) * specConstants.masteryEfficiency);

    return mult;
}

export const getMastery = (stats, specConstants) => {
    return (specConstants.masteryMod / 100 * 8 + stats.mastery / STATCONVERSION.MASTERY * specConstants.masteryMod / 100);
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
        if (buff.stat === "haste") statArray["haste"] = (((statArray[buff.stat] / STATCONVERSION.HASTE / 100 + 1) * buff.value)-1) * STATCONVERSION.HASTE * 100;
        else statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });

    return statArray;
}

// Returns the players current haste percentage. 
export const getHaste = (stats, gameType = "Retail") => {
    if (gameType === "Retail") return 1 + stats.haste / STATCONVERSION.HASTE / 100;
    else {
        return (1 + stats.haste / 128.057006835937500 / 100); // Haste buff. TODO: Add setting for the 5% buff but it's very common.
        
    }
}

export const getCrit = (stats) => {
    return 1.05 + stats.crit / STATCONVERSION.CRIT / 100;
}

export const addReport = (state, entry) => {
    if (state.settings.reporting /*&& entry.includes("Casting")*/) {
        state.report.push(Math.round(100*state.t)/100 + " " + entry);
            
        //state.report.push(Math.round(100*state.t)/100 + " " + entry);
    }
}

export const getHealth = (stats, talents = {}) => {
    return stats.stamina * 20 * (1 + (talents.draconicLegacy ? talents.draconicLegacy : 0) * 0.03);
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

// Use flat if possible from now on. flatHeal and flatDamage are an old standard.
const getSpellFlat = (spell, flatBonus = 0) => {
    return ((spell.flatHeal) || 0 + (spell.flatDamage || 0) + (spell.flat || 0) + flatBonus)
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

export const getSpellAttribute = (spell, attribute, index = 0) => {
    if (attribute === "cooldown") return spell[index].cooldownData.cooldown;
    else return spell[index][attribute];
    
}


// This is a boilerplate function that'll let us clone our spell database to avoid making permanent changes.
// We need this to ensure we're always running a clean DB, free from any changes made on previous runs.
export const deepCopyFunction = (inObject) => {
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

