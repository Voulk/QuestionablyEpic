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

const getDamMult = (buffs, activeAtones, t) => {
    const sins = {0: 1.12, 1: 1.12, 2: 1.1, 3: 1.08, 4: 1.07, 5: 1.06, 6: 1.05, 7: 1.05, 8: 1.04, 9: 1.04, 10: 1.03}
    const schism = buffs.filter(function (buff) {return buff.name === "Schism"}).length > 0 ? 1.25 : 1; // TODO check buff. 5112
    const mult = (activeAtones > 10 ? 1.03 : sins[activeAtones]) * schism
    return mult; 
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
    return mult;
}

const getHaste = (stats) => {
    return 1 + stats.haste / 32 / 100;
}

export const runCastSequence = (seq, player) => {
    const atonementApp = [];
    const stats = player.activeStats; //
    let purgeTicks = [];
    let fiendTicks = [];
    let activeBuffs = [];
    let damageBreakdown = {};
    let healing = {};
    let totalHealing = 0;
    let totalDamage = 0;
    let timer = 0;
    let nextSpell = 0;
    const sequenceLength = 45;

    for (var t = 0; t < sequenceLength; t += 0.1) {
        // Check for a Purge tick at this timestamp.
        if (purgeTicks.length > 0 && t > purgeTicks[0]) {
            // Purge tick
            purgeTicks.shift();
            const activeAtonements = getActiveAtone(atonementApp, timer)
            const damageVal = DISCSPELLS['Purge the Wicked'].dot.coeff * player.getInt() * stats.versatility / 40;
            const damMultiplier = getDamMult(activeBuffs, activeAtonements, t)
            damageBreakdown['Purge the Wicked'] = (damageBreakdown['Purge the Wicked'] || 0) + damageVal * damMultiplier;
            totalDamage += damageVal;
            healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal;
        }

        // Check for Fiend ticks at this timestamp.
        if (fiendTicks.length > 0 && t > fiendTicks[0]) {
            fiendTicks.shift();
            const activeAtonements = getActiveAtone(atonementApp, timer)
            const damageVal = DISCSPELLS['Shadowfiend'].dot.coeff * player.getInt() * stats.versatility / 40;
            const damMultiplier = getDamMult(activeBuffs, activeAtonements, t)
            damageBreakdown['Shadowfiend'] = (damageBreakdown['Shadowfiend'] || 0) + damageVal * damMultiplier;
            totalDamage += damageVal;
            healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal;
        }

        if (t > nextSpell && seq.length > 0) {
            const spellName = seq.shift();
            const spell = DISCSPELLS[spellName];
            
            // The spell is an atonement applicator. Add atonement expiry time to our array.
            if (spell.atonement) {
                for (var i = 0; i < spell.targets; i++) {
                    if (spell.atonementPos === "start") atonementApp.push(t + spell.atonement);
                    else if (spell.atonementPos === "end") atonementApp.push(t + spell.castTime + spell.atonement);
                }
            }
    
            // The spell has a healing component. Add it's effective healing.
            if (spell.type === 'heal') {
                const healingVal = spell.coeff * player.getInt() * getStatMult(stats, spell.secondaries);
                totalHealing += healingVal
                healing[spellName] = (healing[spellName] || 0) + healingVal;
            }
    
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'damage') {
                const activeAtonements = getActiveAtone(atonementApp, t); // Get number of active atonements.
                const damMultiplier = getDamMult(activeBuffs, activeAtonements, t); // Get our damage multiplier (Schism, Sins etc);
                const damageVal = spell.coeff * player.getInt() * getStatMult(stats, spell.secondaries); // Multiply our spell coefficient by int and secondaries.

                damageBreakdown[spellName] = (damageBreakdown[spellName] || 0) + damageVal * damMultiplier; // Stats. Non-essential.
                totalDamage += damageVal * damMultiplier; // Stats.

                healing['atonement'] = (healing['atonement'] || 0) + activeAtonements * damageVal * damMultiplier;
            }
            else if (spell.type === "atonementExtension") {
                extendActiveAtonements(atonementApp, t, spell.extension);
            }

            // Specific cases.
            if (spellName === "Purge the Wicked") {
                const ticks = spell.dot.duration / spell.dot.tickRate; // TODO: Add Haste.
                for (var k = 1; k <= ticks; k++ ) {
                    purgeTicks.push(t + spell.dot.tickRate * k);
                }  
            }
            else if (spellName === "Shadowfiend") {
                const ticks = spell.dot.duration / spell.dot.tickRate; // Add Haste.
                for (var k = 1; k <= ticks; k++ ) {
                    fiendTicks.push(t + spell.dot.tickRate * k);
                }  
            }
            else if (spellName === "Schism") {
                // Add the Schism buff. 
                activeBuffs.push({name: "Schism", expiration: t + spell.buffDuration});
            }


            nextSpell += (spell.castTime);

            // Tidy up buffs and atonements.

        }
    }

    console.log("H:" + JSON.stringify(healing));
    console.log("D:" + JSON.stringify(damageBreakdown));
    //console.log("T:" + timer);
    console.log("At:" + atonementApp);
    //console.log("Purge: " + purgeTicks);

}

const DISCSPELLS = {
    "Mind Blast": {
        type: "damage",
        castTime: 1.5,
        cost: 1250,
        coeff: 0.74,
        cooldown: 15,
        secondaries: ['crit', 'vers']
    },
    "Smite": {
        type: "damage",
        castTime: 1.5,
        cost: 200,
        coeff: 0.5,
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    },
    "Schism": {
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.41,
        buffDuration: 7,
        secondaries: ['crit', 'vers'],
    },
    "Penance": {
        type: "damage",
        castTime: 2,
        cost: 800,
        coeff: 1.128,
        secondaries: ['crit', 'vers'],
    },
    "Power Word: Shield": {
        type: "heal",
        castTime: 1.5,
        cost: 1550,
        coeff: 1.65,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'start',
        targets: 1,
        secondaries: ['crit', 'vers']
    },
    "Power Word: Radiance": {
        type: "heal",
        castTime: 2,
        cost: 3250,
        coeff: 1.05,
        targets: 5,
        cooldown: 20,
        atonement: 9,
        atonementPos: 'end',
        secondaries: ['crit', 'vers']
    },
    "Purge the Wicked": {
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
    },
    "Shadowfiend": {
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
    },
    "Evangelism": {
        type: "atonementExtension",
        castTime: 1.5,
        cost: 0,
        coeff: 0,
        extension: 6,
    }

}



