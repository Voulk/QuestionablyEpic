// 

import Player from "../Player";
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { DISCSPELLS } from "./DiscSpellDB";

const discSettings = {
    chaosBrand: true
}

export const allRamps = (boonSeq, fiendSeq, stats, settings = {}, conduits) => {
    
    const boonRamp = runCastSequence(boonSeq, stats, settings, conduits);
    const fiendRamp = runCastSequence(fiendSeq, stats, settings, conduits);

    return boonRamp + fiendRamp;
}

export const buildRamp = (type, applicators, trinkets, haste, specialSpells = []) => {
    
    let sequence = ['Purge the Wicked']
    
    if (trinkets.includes("Shadowed Orb")) sequence.push("Shadowed Orb");
    if (specialSpells.includes("Rapture")) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    if (trinkets.includes("Soulletting Ruby")) sequence.push("Soulletting Ruby");
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    sequence.push('Evangelism');

    if (type === "Boon") {
        sequence.push('Boon of the Ascended');
        sequence.push('Ascended Blast');
        sequence.push('Schism');
        const hastePerc = 1 + haste / 32 / 100;
        let boonDuration = 10 - (1.5 * 2 / hastePerc);
        const boonPackage = (1.5 + 1 + 1) / hastePerc;

        for (var i = 0; i < Math.floor(boonDuration / boonPackage); i++) {
            sequence.push('Ascended Blast');
            if (trinkets.includes("Divine Bell") && i === 0) sequence.push("Divine Bell");
            sequence.push('Ascended Nova');
            sequence.push('Ascended Nova');
        }

        if (boonDuration % boonPackage > (2.5 / hastePerc)) {
            sequence.push('Ascended Blast');
            sequence.push('Ascended Nova');
        }
        else if (boonDuration % boonPackage > (1.5 / hastePerc)) {
            sequence.push('Ascended Blast');
        }

        // These are low value post-ramp smites but should still be included.
        for (var i = 0; i < 6; i++) {
            sequence.push('Smite');
        }
       
    }
    else if (type === "Fiend") {
        sequence.push('Shadowfiend');
        if (trinkets.includes("Divine Bell")) sequence.push("Divine Bell");
        sequence.push('Schism');
        sequence.push('Mind Blast');
        sequence.push('Power Word: Solace');
        sequence.push('Penance');

        for (var i = 0; i < 10; i++) {
            sequence.push('Smite');
        }
        
    }

    //console.log(sequence);
    return sequence;
    
};

const extendActiveAtonements = (atoneApp, timer, extension) => {
    atoneApp.forEach((application, i, array) => {
        if (application >= timer) {
            array[i] = application + extension;
        };
    });
}

const getDamMult = (buffs, activeAtones, t, spellName, boonStacks, conduits) => {
    const sins = {0: 1.12, 1: 1.12, 2: 1.1, 3: 1.08, 4: 1.07, 5: 1.06, 6: 1.05, 7: 1.05, 8: 1.04, 9: 1.04, 10: 1.03}
    const schism = buffs.filter(function (buff) {return buff.name === "Schism"}).length > 0 ? 1.25 : 1; // TODO check buff. 5112
    let mult = (activeAtones > 10 ? 1.03 : sins[activeAtones]) * schism
    if (discSettings.chaosBrand) mult = mult * 1.05;
    if (spellName === "Ascended Eruption") {
        //mult = mult * (1 + boonStacks * 0.04);
        if (conduits['Courageous Ascension']) mult = mult * (1 + boonStacks * 0.04);
        else mult = mult * (1 + boonStacks * 0.03);
    }
    return mult; 
}

const checkBuffActive = (buffs, buffName) => {
    return buffs.filter(function (buff) {return buff.name === buffName}).length > 0;
}

let PWSTest = 0;

const getHealingMult = (buffs, t, spellName, boonStacks, conduits) => {
    if (spellName === "Power Word: Shield" && checkBuffActive(buffs, "Rapture")) {
        if (conduits['Exaltation']) return 1 + 2 * 1.135;
        else return 3;
    }
    else if (spellName === "Ascended Eruption") {
        if (conduits['Courageous Ascension']) return 1 + boonStacks * 0.04;
        else return 1 + boonStacks * 0.03;
    }
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
    if (stats.includes("crit")) mult *= (1.05 + statArray['crit'] / 35 / 100); // TODO: Re-enable
    if (stats.includes("mastery")) mult *= (1.108 + statArray['mastery'] / 25.9259 / 100);
    return mult;
}

const getCurrentStats = (statArray, buffs) => {
    const statBuffs = buffs.filter(function (buff) {return buff.buffType === "stats"});

    statBuffs.forEach(buff => {
        //console.log("Buff: " + JSON.stringify(buff));
        statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });
    //statArray.mastery = statArray.mastery += masteryBuff;
    return applyDiminishingReturns(statArray);
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


export const getSpellRaw = (spell, currentStats) => {
    return spell.coeff * currentStats.intellect * getStatMult(currentStats, spell.secondaries); // Multiply our spell coefficient by int and secondaries.
}

// This function is for time reporting. It just rounds the number to something easier to process.
const getTime = (t) => {
    return Math.round(t*1000)/1000
}

export const runCastSequence = (sequence, stats, settings = {}, conduits) => {
    //console.log("Running cast sequence");
    let atonementApp = [];
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
    const reporting = false;

    PWSTest = 0;
    // Add anything that alters the spell dictionary

    // Default Loadout
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    if (settings['DefaultLoadout']) {
        settings['Clarity of Mind'] = true;
        settings['Pelagos'] = true;
        conduits['Shining Radiance'] = 239;
        conduits['Rabid Shadows'] = 239;
        conduits['Courageous Ascension'] = 239;
        
    }
    
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
    if (settings['Penitent One']) discSpells['Penance'][0].coeff = discSpells['Penance'][0].coeff * (0.84 * 2); // This is an estimate, and would be made more accurate by adding Penance ticks instead.

    // Trinkets
    if (settings['Divine Bell']) discSpells['Divine Bell'][0].value = settings['Divine Bell'];
    if (settings['Shadowed Orb']) discSpells['Shadowed Orb'][0].value = settings['Shadowed Orb'];
    if (settings['Soulletting Ruby']) discSpells['Soulletting Ruby'][0].value = settings['Soulletting Ruby'];

    if (conduits['Courageous Ascension']) discSpells['Ascended Blast'][0].coeff *= 1.45; // Blast +40%, Eruption +1% per stack (to 4%)
    if (conduits['Shining Radiance']) discSpells['Power Word: Radiance'][0].coeff *= 1.64; // +64% radiance healing
    if (conduits['Rabid Shadows']) discSpells['Shadowfiend'][0].dot.tickRate = discSpells['Shadowfiend'][0].dot.tickRate / 1.342; // Faster tick rate.
    if (conduits['Exaltation']) {
        discSpells['Rapture'][1].buffDuration = 9;
        discSpells['Rapture'][0].coeff = 1.65 * (1 + 2 * 1.135);
    }
    // --

    for (var t = 0; t < sequenceLength; t += 0.01) {
        // Tidy up buffs and atonements.
        let ascendedEruption = activeBuffs.filter(function (buff) {return buff.expiration < t && buff.name === "Boon of the Ascended"}).length > 0;
        activeBuffs = activeBuffs.filter(function (buff) {return buff.expiration > t});
        atonementApp = atonementApp.filter(function (buff) {return buff > t});

        let currentStats = {...stats};
        currentStats = getCurrentStats(currentStats, activeBuffs);

        // Check for a Purge tick at this timestamp.
        if (purgeTicks.length > 0 && t > purgeTicks[0]) {
            purgeTicks.shift();
            const activeAtonements = getActiveAtone(atonementApp, timer)
            const damageVal = DISCSPELLS['Purge the Wicked'][0].dot.coeff * currentStats.intellect * getStatMult(currentStats, ['crit', 'vers']);
            const damMultiplier = getDamMult(activeBuffs, activeAtonements, t, conduits)

            if (purgeTicks.length === 0) {
                // If this is the last Purge tick, add a partial tick.
                const partialTickPercentage = ((getHaste(currentStats) - 1) % 0.1) * 10;

                damageBreakdown['Purge the Wicked'] = (damageBreakdown['Purge the Wicked'] || 0) + damageVal * damMultiplier * partialTickPercentage;
                totalDamage += damageVal;
                healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * damMultiplier * getAtoneTrans(currentStats.mastery) * partialTickPercentage;
            }
            else {         
                damageBreakdown['Purge the Wicked'] = (damageBreakdown['Purge the Wicked'] || 0) + damageVal * damMultiplier;
                totalDamage += damageVal;
                healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * getAtoneTrans(currentStats.mastery);
            }

            if (reporting) console.log(getTime(t) + " " + " Purge Tick: " + damageVal * damMultiplier);

        }

        // Check for Fiend ticks at this timestamp.
        if (fiendTicks.length > 0 && t > fiendTicks[0]) {
            fiendTicks.shift();
            const activeAtonements = getActiveAtone(atonementApp, timer)
            const damageVal = DISCSPELLS['Shadowfiend'][0].dot.coeff * currentStats.intellect * getStatMult(currentStats, ['crit', 'vers']);
            const damMultiplier = getDamMult(activeBuffs, activeAtonements, t, conduits)
            damageBreakdown['Shadowfiend'] = (damageBreakdown['Shadowfiend'] || 0) + damageVal * damMultiplier;
            totalDamage += damageVal;
            healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * getAtoneTrans(currentStats.mastery);
            PWSTest++;
        }

        if ((t > nextSpell && seq.length > 0) || ascendedEruption)  {
            const spellName = ascendedEruption ? "Ascended Eruption" : seq.shift();
            const fullSpell = discSpells[spellName];

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
                    //const healingVal = spell.coeff * currentStats.intellect * getStatMult(currentStats, spell.secondaries) * (1 - spell.overheal); 
                    const healingMult = getHealingMult(activeBuffs, t, spellName, boonOfTheAscended, conduits); 
                    const targetMult = ('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets) : spell.targets;
                    const healingVal = getSpellRaw(spell, currentStats) * (1 - spell.overheal) * healingMult * targetMult;
                    
                    healing[spellName] = (healing[spellName] || 0) + healingVal;

                }
                
                // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
                else if (spell.type === 'damage') {
                    const activeAtonements = getActiveAtone(atonementApp, t); // Get number of active atonements.
                    const damMultiplier = getDamMult(activeBuffs, activeAtonements, t, spellName, boonOfTheAscended, conduits); // Get our damage multiplier (Schism, Sins etc);
                    const damageVal = getSpellRaw(spell, currentStats) * damMultiplier;
                    const atonementHealing = activeAtonements * damageVal * getAtoneTrans(currentStats.mastery) * (1 - spell.atoneOverheal)

                    // This is stat tracking, though the atonement healing *will* be returned as a result.
                    totalDamage += damageVal * damMultiplier; // Stats.
                    damageBreakdown[spellName] = (damageBreakdown[spellName] || 0) + damageVal; // This is just for stat tracking.
                    healing['atonement'] = (healing['atonement'] || 0) + atonementHealing;

                    if (reporting) console.log(getTime(t) + " " + spellName + ": " + damageVal + ". Buffs: " + JSON.stringify(activeBuffs));
                }
                else if (spell.type === "atonementExtension") {
                    extendActiveAtonements(atonementApp, t, spell.extension);
                }
                else if (spell.type === "buff") {
                    if (spell.buffType === "stats") {
                        activeBuffs.push({name: spellName, expiration: t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat});
                    }
                    else {
                        activeBuffs.push({name: spellName, expiration: t + spell.castTime + spell.buffDuration});
                    }
                    
                }

                // Specific cases.
                if (spellName === "Purge the Wicked") {
                    const adjustedTickRate = spell.dot.tickRate / getHaste(currentStats);
                    const ticks = spell.dot.duration / adjustedTickRate;
                    for (var k = 1; k <= ticks; k++ ) {
                        purgeTicks.push(t + adjustedTickRate * k);
                    }  
                    purgeTicks.push(t + spell.dot.duration); // Partial tick.
                }
                else if (spellName === "Shadowfiend") {
                    const adjustedTickRate = spell.dot.tickRate / getHaste(currentStats);
                    const ticks = spell.dot.duration / adjustedTickRate; // Add Haste.
                    for (var k = 1; k <= ticks; k++ ) {
                        fiendTicks.push(t + adjustedTickRate * k);
                    } 

                }
                else if (spellName === "Schism") {
                    // Add the Schism buff. 
                    activeBuffs.push({name: "Schism", expiration: t + spell.castTime + spell.buffDuration});
                }
                else if (spellName === "Ascended Blast") {
                    boonOfTheAscended += 5 / 2;
                }
                else if (spellName === "Ascended Nova") {
                    boonOfTheAscended += 1 / 2;
                }
                //console.log(spellName + " " + t)
                nextSpell += (spell.castTime / getHaste(currentStats));
            });   
        }
    }

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    
    //console.log("D:" + JSON.stringify(damageBreakdown));
    //console.log("At:" + atonementApp);
    //console.log("H:" + JSON.stringify(healing));
    //console.log("Fiend Test:" + PWSTest);
    //console.log("Total healing: " + sumValues(healing));

    return sumValues(healing)

}

