import { buildRamp } from "./DiscRampGen";
import { runCastSequence } from "./DiscPriestRamps";

// This is a very simple function that just condenses our ramp sequence down to make it more human readable in reports. 
const rampShortener = (seq) => {
    let shortRamp = [];
    let lastValue = "";
    let lastCount = 1;

    for (var i = 0; i < seq.length; i++) {
        const currentValue = seq[i];
        if (currentValue === lastValue) {
            lastCount += 1;
        }
        else {
            if (lastValue !== "") {
                if (lastCount === 1) shortRamp.push(lastValue);
                else shortRamp.push(lastValue + " x" + lastCount);
            }
            
            lastCount = 1;
        }
        lastValue = currentValue;
    }
    shortRamp.push(lastValue + " x" + lastCount);
    return shortRamp
}

// This is a reporting function that adds our ramps into one object.
const addBreakdowns = (obj, newObj, miniRamp) => {
    for (const [key, value] of Object.entries(newObj)) {
        if (key in obj) {
            obj[key] = Math.round(value + newObj[key]);
        }
        else {
            obj[key] = Math.round(newObj[key])
        }
    }

    for (const [key, value] of Object.entries(miniRamp)) {
        if (key in obj) {
            obj[key] = Math.round(value + newObj[key] * 2);
        }
        else {
            obj[key] = Math.round(newObj[key] * 2)
        }
    }

    return obj;
}


export const allRampsHealing = (boonSeq, stats, settings = {}, conduits, reporting = false) => {
    const rampResult = allRamps(boonSeq, stats, settings, conduits, reporting);

    if (rampResult.totalHealing > 0) return rampResult.totalHealing;
    else {
        //reportError("", "DiscRamp", "Total Healing is 0", rampResult.totalHealing || 0)
        return 0;
    }
}

// This function automatically casts a full set of ramps. It's easier than having functions call ramps individually and then sum them.
// We can probably have it take an array of ramps rather than pre-defined sets.
export const allRamps = (fiendSeq, stats, settings = {}, talents, reporting = false) => {

    let rampResult = {totalHealing: 0, ramps: [], rampSettings: settings}
    // Setup Sequences
    const miniSeq = buildRamp('Mini', 6, [], stats.haste || 0, settings.playstyle || "", talents)
    const evangSeq = buildRamp('Secondary', 10, [], stats.haste || 0, settings.playstyle || "", talents);
    const newFiendSeq = buildRamp('Primary', 10, [], stats.haste || 0, settings.playstyle || "", talents);
    const raptureSeq = buildRamp('RaptureLW', 8, [], stats.haste || 0, settings.playstyle || "", talents)
    const microSeq = buildRamp('Micro', 5, [], stats.haste || 0, settings.playstyle || "", talents)

    const miniRamp = runCastSequence(miniSeq, stats, settings, talents);
    //const boonRamp = runCastSequence(boonSeq, stats, settings, conduits);
    const evangRamp = runCastSequence(evangSeq, stats, {...settings, harshDiscipline: true}, talents);
    const fiendRamp = runCastSequence(newFiendSeq, stats, {...settings, harshDiscipline: true}, talents);
    const raptureRamp = runCastSequence(raptureSeq, stats, settings, talents);
    const microRamp = runCastSequence(microSeq, stats, settings, talents);


    rampResult.totalHealing = fiendRamp.totalHealing + evangRamp.totalHealing + miniRamp.totalHealing * 2 + raptureRamp.totalHealing * 2 + microRamp.totalHealing * 7;

    if (reporting) {
        //rampResult.ramps.push({"tag": "Primary Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": rampShortener(boonSeq), "totalHealing": Math.round(boonRamp.totalHealing)});
        rampResult.ramps.push({"tag": "Fiend Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": rampShortener(fiendSeq), "totalHealing": Math.round(fiendRamp.totalHealing)});
        rampResult.ramps.push({"tag": "Mini Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": rampShortener(miniSeq), "totalHealing": Math.round(miniRamp.totalHealing)});
        rampResult.stats = stats;

        rampResult.damageBreakdown = addBreakdowns({}, fiendRamp.damageDone, miniRamp.damageDone);
        rampResult.healingBreakdown = addBreakdowns({}, fiendRamp.healingDone, miniRamp.healingDone);
        rampResult.manaSpent = fiendRamp.manaSpent + miniRamp.manaSpent * 2;
        //rampResult.conduits = conduits;
        
        rampResult.ramps.forEach(ramp => {
            console.log("Ramp Name: " + ramp.tag + " (" + Math.round(ramp.totalHealing) + " healing)");
            console.log("Pre-ramp conditions: " + "[Power of the Dark Side, Purge the Wicked]");
            console.log(rampShortener(ramp.sequence));
            console.log(JSON.stringify(rampResult));
        })
    }
     
        /*
        console.log("== Set Ramp Information == ")
        console.log("Total Healing: " + Math.round(rampResult.totalHealing));
        console.log("Legendaries used: Clarity of Mind");
        console.log("Conduits used: " + JSON.stringify(conduits));
        console.log("On use Trinkets used: " + " Instructor's Divine Bell (213 ilvl, ~20% expected overhealing)")
        console.log("Post-DR passive stat breakdown: " + JSON.stringify(stats));

            
    })*/


    //console.log(JSON.stringify(rampResult));

    return rampResult; //boonRamp + fiendRamp + miniRamp * 2;
}