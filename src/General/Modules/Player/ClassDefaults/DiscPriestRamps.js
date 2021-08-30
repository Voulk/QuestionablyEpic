// 

import Player from "../Player";

const getAtonementMult = () => {

}

const extendActiveAtonements = (atoneApp, timer, extension) => {
    atoneApp.forEach((application, i, array) => {
        if (application >= timer) {
            array[i] = application + extension;
        };
    });
}

const getDamMult = (buffs, activeAtones, t, spellName, boonStacks) => {
    const sins = {0: 1.12, 1: 1.12, 2: 1.1, 3: 1.08, 4: 1.07, 5: 1.06, 6: 1.05, 7: 1.05, 8: 1.04, 9: 1.04, 10: 1.03}
    const schism = buffs.filter(function (buff) {return buff.name === "Schism"}).length > 0 ? 1.25 : 1; // TODO check buff. 5112
    let mult = (activeAtones > 10 ? 1.03 : sins[activeAtones]) * schism
    if (spellName === "Ascended Eruption") mult = mult * (1 + boonStacks * 0.04);
    return mult; 
}

const checkBuffActive = (buffs, buffName) => {
    return buffs.filter(function (buff) {return buff.name === buffName}).length > 0;
}

const getHealingMult = (buffs, t, spellName, boonStacks) => {
    if (spellName === "Power Word: Shield" && checkBuffActive(buffs, "Rapture")) return 3;
    else if (spellName === "Ascended Eruption") return 1 + boonStacks * 0.04;
    else return 1;
}

const getActiveAtone = (atoneApp, timer) => {
    let count = 0;
    atoneApp.forEach(application => {
        if (application >= timer) {
            count++;
        };
    });
    return count;
}

const getStatMult = (statArray, stats) => {
    let mult = 1;
    if (stats.includes("vers")) mult *= (1 + statArray['versatility'] / 40 / 100);
    if (stats.includes("crit")) mult *= (1.05 + statArray['crit'] / 35 / 100);
    if (stats.includes("mastery")) mult *= (1.108 + statArray['mastery'] / 25.9259 / 100);
    return mult;
}

const getCurrentStats = (statArray, buffs) => {
    const masteryBuff = (buffs.filter(function (buff) {return buff.type === "stats"}).length > 0 ? 668 : 0);
    const statBuffs = buffs.filter(function (buff) {return buff.buffType === "stats"});

    statBuffs.forEach(buff => {
        //console.log("Buff: " + JSON.stringify(buff));
        statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });
    //statArray.mastery = statArray.mastery += masteryBuff;
    //console.log(statArray);
    return statArray;
}

const getHaste = (stats) => {
    return 1 + stats.haste / 32 / 100;
}

// Current atonement transfer rate.
const getAtoneTrans = (mastery) => {
    const atonementBaseTransfer = 0.5;
    return atonementBaseTransfer * (1.108 + mastery / 25.9259 / 100);
}

const getSqrt = (targets) => {
    return Math.sqrt(targets);
}

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

export const runCastSequence = (sequence, player, settings = {}, conduits) => {
    let atonementApp = [];
    const stats = player.activeStats; //
    let purgeTicks = [];
    let fiendTicks = [];
    let activeBuffs = [];
    let damageBreakdown = {};
    let healing = {};
    let totalDamage = 0;
    let timer = 0;
    let nextSpell = 0;
    let boonOfTheAscended = 0;
    const discSpells = deepCopyFunction(DISCSPELLS);
    const seq = [...sequence];
    const sequenceLength = 45;

    // Add anything that alters the spell dictionary
    
    if (settings['Clarity of Mind']) discSpells['Rapture'][0].atonement = 21;
    if (settings['Pelagos']) discSpells['Boon of the Ascended'].push({
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 0,
        buffType: 'stats',
        stat: 'mastery',
        value: 315,
        buffDuration: 30,
    });
    if (settings['Kleia']) activeBuffs.push({name: "Kleia", expiration: 999, buffType: "stats", value: 330, stat: 'crit'})
    if (conduits['Courageous Ascension']) discSpells['Ascended Blast'][0].coeff *= 1.4; // Blast +40%, Eruption +1% per stack (to 4%)
    // --

    for (var t = 0; t < sequenceLength; t += 0.01) {
        // Tidy up buffs and atonements.
        activeBuffs = activeBuffs.filter(function (buff) {return buff.expiration > t});
        atonementApp = atonementApp.filter(function (buff) {return buff > t});

        let currentStats = {...stats};
        currentStats = getCurrentStats(currentStats, activeBuffs);

        // Check for a Purge tick at this timestamp.
        if (purgeTicks.length > 0 && t > purgeTicks[0]) {
            // Purge tick
            purgeTicks.shift();
            const activeAtonements = getActiveAtone(atonementApp, timer)
            const damageVal = DISCSPELLS['Purge the Wicked'][0].dot.coeff * player.getInt() * stats.versatility / 40;
            const damMultiplier = getDamMult(activeBuffs, activeAtonements, t)
            damageBreakdown['Purge the Wicked'] = (damageBreakdown['Purge the Wicked'] || 0) + damageVal * damMultiplier;
            totalDamage += damageVal;
            healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * getAtoneTrans(currentStats.mastery);
        }

        // Check for Fiend ticks at this timestamp.
        if (fiendTicks.length > 0 && t > fiendTicks[0]) {
            fiendTicks.shift();
            const activeAtonements = getActiveAtone(atonementApp, timer)
            const damageVal = DISCSPELLS['Shadowfiend'][0].dot.coeff * player.getInt() * stats.versatility / 40;
            const damMultiplier = getDamMult(activeBuffs, activeAtonements, t)
            damageBreakdown['Shadowfiend'] = (damageBreakdown['Shadowfiend'] || 0) + damageVal * damMultiplier;
            totalDamage += damageVal;
            healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * getAtoneTrans(currentStats.mastery);
        }

        if (t > nextSpell && seq.length > 0) {
            const spellName = seq.shift();
            const fullSpell = discSpells[spellName];
            //console.log(Math.round(t*100)/100 + ": " + spellName);

            fullSpell.forEach(spell => {
                // The spell is an atonement applicator. Add atonement expiry time to our array.
                if (spell.atonement) {
                    for (var i = 0; i < spell.targets; i++) {
                        let atoneDuration = spell.atonement;
                        if (settings['Clarity of Mind'] && (spellName === "Power Word: Shield") && checkBuffActive(activeBuffs, "Rapture")) atoneDuration += 6;
                        if (spell.atonementPos === "start") atonementApp.push(t + atoneDuration);
                        else if (spell.atonementPos === "end") atonementApp.push(t + spell.castTime + atoneDuration);
                    }
                }
        
                // The spell has a healing component. Add it's effective healing.
                if (spell.type === 'heal') {
                    const healingVal = spell.coeff * player.getInt() * getStatMult(stats, spell.secondaries) * (1 - spell.overheal);
                    const healingMult = getHealingMult(activeBuffs, t, spellName, boonOfTheAscended); 
                    const targetMult = ('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets) : spell.targets;
                    healing[spellName] = (healing[spellName] || 0) + healingVal * healingMult * targetMult;
                }
        
                // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
                else if (spell.type === 'damage') {
                    const activeAtonements = getActiveAtone(atonementApp, t); // Get number of active atonements.
                    const damMultiplier = getDamMult(activeBuffs, activeAtonements, t, spellName, boonOfTheAscended); // Get our damage multiplier (Schism, Sins etc);
                    const damageVal = spell.coeff * player.getInt() * getStatMult(stats, spell.secondaries); // Multiply our spell coefficient by int and secondaries.
                    //console.log("Hitting spell " + spellName + " with " + activeAtonements + " active atonements");
                    damageBreakdown[spellName] = (damageBreakdown[spellName] || 0) + damageVal * damMultiplier; // Stats. Non-essential.
                    totalDamage += damageVal * damMultiplier; // Stats.

                    healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * damMultiplier * getAtoneTrans(currentStats.mastery);
                }
                else if (spell.type === "atonementExtension") {
                    extendActiveAtonements(atonementApp, t, spell.extension);
                }
                else if (spell.type === "buff") {
                    if (spell.buffType === "stats") {
                        activeBuffs.push({name: spellName, expiration: t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat});
                    }
                    else {
                        activeBuffs.push({name: spellName, expiration: t + spell.buffDuration});
                    }
                    
                }

                // Specific cases.
                if (spellName === "Purge the Wicked") {
                    const ticks = spell.dot.duration / (spell.dot.tickRate / getHaste(currentStats));
                    for (var k = 1; k <= ticks; k++ ) {
                        purgeTicks.push(t + spell.dot.tickRate * k);
                    }  
                }
                else if (spellName === "Shadowfiend") {
                    const ticks = spell.dot.duration / (spell.dot.tickRate / getHaste(currentStats)); // Add Haste.
                    for (var k = 1; k <= ticks; k++ ) {
                        fiendTicks.push(t + spell.dot.tickRate * k);
                    }  
                }
                else if (spellName === "Schism") {
                    // Add the Schism buff. 
                    activeBuffs.push({name: "Schism", expiration: t + spell.buffDuration});
                }
                else if (spellName === "Ascended Blast") {
                    boonOfTheAscended += 5;
                }
                else if (spellName === "Ascended Nova") {
                    boonOfTheAscended += 1;
                }

                nextSpell += (spell.castTime / getHaste(currentStats));
            });   
        }
    }

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    
    //console.log("D:" + JSON.stringify(damageBreakdown));
    //console.log("At:" + atonementApp);
    //console.log("H:" + JSON.stringify(healing));
    //console.log("Total healing: " + sumValues(healing));

    return sumValues(healing)

}

const DISCSPELLS = {
    "Mind Blast": [{
        type: "damage",
        castTime: 1.5,
        cost: 1250,
        coeff: 0.74,
        cooldown: 15,
        secondaries: ['crit', 'vers']
    }],
    "Smite": [{
        type: "damage",
        castTime: 1.5,
        cost: 200,
        coeff: 0.5,
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    }],
    "Schism": [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.41,
        buffDuration: 7,
        secondaries: ['crit', 'vers'],
    }],
    "Penance": [{
        type: "damage",
        castTime: 2,
        cost: 800,
        coeff: 1.128,
        secondaries: ['crit', 'vers'],
    }],
    "Ascended Blast": 
        [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.68,
        secondaries: ['crit', 'vers'],
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 2.15,
            targets: 1,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.6,
        }],
    "Ascended Nova": 
        [{
        type: "damage",
        castTime: 1,
        cost: 0,
        coeff: 0.7,
        secondaries: ['crit', 'vers'],
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 0.24,
            targets: 6,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.3,
        }],
    "Ascended Eruption": 
        [{
        type: "damage",
        castTime: 0,
        cost: 0,
        coeff: 1.68,
        secondaries: ['crit', 'vers'],
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 2.15,
            targets: 20,
            secondaries: ['crit', 'vers'],
            tags: ['sqrt'],
            overheal: 0.6,
        }],
    "Power Word: Shield": [{
        type: "heal",
        castTime: 1.5,
        cost: 1550,
        coeff: 1.65,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'start',
        targets: 1,
        secondaries: ['crit', 'vers'],
        overheal: 0,
    }],
    "Rapture": [{
        type: "heal",
        castTime: 1.5,
        cost: 1550,
        coeff: 1.65 * 3,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'start',
        targets: 1,
        secondaries: ['crit', 'vers'],
        overheal: 0,
    },
    {
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 8,
    }],
    "Power Word: Radiance": [{
        type: "heal",
        castTime: 2,
        cost: 3250,
        coeff: 1.05,
        targets: 5,
        cooldown: 20,
        atonement: 9,
        atonementPos: 'end',
        secondaries: ['crit', 'vers'],
        overheal: 0.35,
    }],
    "Purge the Wicked": [{
        type: "damage",
        castTime: 1.5,
        cost: 900,
        coeff: 0.21,
        secondaries: ['crit', 'vers'],
        dot: {
            tickRate: 2,
            coeff: 0.12,
            duration: 20,
        }
    }],
    "Shadowfiend": [{
        type: "",
        castTime: 1.5,
        cost: 900,
        coeff: 0.13,
        secondaries: ['crit', 'vers'],
        dot: {
            tickRate: 1.5,
            coeff: 0.46,
            duration: 15,
        }
    }],
    "Evangelism": [{
        type: "atonementExtension",
        castTime: 1.5,
        cost: 0,
        coeff: 0,
        extension: 6,
    }],
    "Divine Bell": [{
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 9,
        buffType: 'stats',
        stat: "mastery",
        value: 668,
    }],
    "Boon of the Ascended": [{
        type: "buff",
        castTime: 1.5,
        cost: 0,
        cooldown: 180,
        buffType: "spec",
        buffDuration: 10,
    }],
}