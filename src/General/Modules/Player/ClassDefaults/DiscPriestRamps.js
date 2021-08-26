// 

import Player from "../Player";

const getAtonementMult = () => {

}

const extendActiveAtonements = (atoneApp, timer, extension) => {
    console.log("Pre: " + atoneApp + ". Extension: " + extension + ". T: " + timer);
    atoneApp.forEach(application => {
        if (application >= timer) {
            application = application + extension;
        };
    });
    console.log("Post: " + atoneApp);
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

export const runCastSequence = (seq, player) => {
    const atonementApp = [];
    let purgeTicks = [];
    let fiendTicks = [];
    let healing = {};
    let totalHealing = 0;
    let totalDamage = 0;
    let timer = 0;
    let nextSpell = 0;
    const sequenceLength = 25;

    for (var t = 0; t < sequenceLength; t += 0.1) {
        if (t > purgeTicks[0]) {
            // Purge tick
            purgeTicks.shift();

            const damageVal = DISCSPELLS['Purge the Wicked'].dot.coeff * player.getInt();
            totalDamage += damageVal;
            healing['atonement'] = (healing['atonement'] || 0) + getActiveAtone(atonementApp, timer) * damageVal;
        }

        if (t > nextSpell && seq.length > 0) {
            const spellName = seq.shift();
            const spell = DISCSPELLS[spellName];
            
            // The spell is an atonement applicator. Add atonement expiry time to our array.
            if (spell.atonement) {
                for (var i = 0; i < spell.targets; i++) {
                    console.log("Adding atone for spell: " + spellName);
                    if (spell.atonementPos === "start") atonementApp.push(t + spell.atonement);
                    else if (spell.atonementPos === "end") atonementApp.push(t + spell.castTime + spell.atonement);
                }
            }
    
            // The spell has a healing component. Add it's effective healing.
            if (spell.type === 'heal') {
                const healingVal = spell.coeff * player.getInt();
                totalHealing += healingVal
                healing[spellName] = (healing[spellName] || 0) + healingVal;
            }
    
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'damage') {
                const damageVal = spell.coeff * player.getInt();
                totalDamage += damageVal;
                healing['atonement'] = (healing['atonement'] || 0) + getActiveAtone(atonementApp, t) * damageVal;
            }
            else if (spell.type === "atonementExtension") {
                extendActiveAtonements(atonementApp, t, spell.extension);
            }

            if (spellName === "Purge the Wicked") {
                const ticks = spell.dot.duration / spell.dot.tickRate; // Add Haste.
                for (var k = 1; k <= ticks; k++ ) {
                    purgeTicks.push(t + spell.dot.tickRate * k);
                }  
            }


            nextSpell += spell.castTime;

        }
    }
    /*
    for (var x = 0; x < seq.length; x++) {



        // Increment our timer.
        
    } */

    console.log("H:" + JSON.stringify(healing));
    console.log("D:" + totalDamage);
    //console.log("T:" + timer);
    console.log("At:" + atonementApp);
    //console.log("Purge: " + purgeTicks);

}

const DISCSPELLS = {
    "Smite": {
        type: "damage",
        castTime: 1.5,
        cost: 200,
        coeff: 0.5,
        cooldown: 0,
        secondaries: ['crit', 'vers', 'haste']
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
        secondaries: ['crit', 'vers', 'haste']
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
        secondaries: ['crit', 'vers', 'haste']
    },
    "Purge the Wicked": {
        type: "damage",
        castTime: 1.5,
        cost: 900,
        coeff: 0.13,
        dot: {
            tickRate: 2,
            coeff: 0.1,
            duration: 16,
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



