import { buildRamp } from "./DiscRampGen";
import { runCastSequence } from "./DiscPriestRamps";
import { baseTalents } from "./DiscSpellDB";

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

export const getDefaultDiscTalents = (playstyle) => {
    return baseTalents;
}


export const allRampsHealing = (boonSeq, stats, settings, talents, trinkets, reporting = false) => {

    if (talents == undefined || Object.keys(talents).length === 0) talents = getDefaultDiscTalents(settings.playstyle);

    const rampResult = allRamps(boonSeq, stats, settings, talents, trinkets, reporting);

    if (rampResult.totalHealing > 0) return rampResult.totalHealing;
    else {
        //reportError("", "DiscRamp", "Total Healing is 0", rampResult.totalHealing || 0)
        return 0;
    }
}

// This function automatically casts a full set of ramps. It's easier than having functions call ramps individually and then sum them.
// We can probably have it take an array of ramps rather than pre-defined sets.
export const allRamps = (fiendSeq, stats, settings = {}, talents, trinkets, reporting = false) => {

    let rampResult = {totalHealing: 0, ramps: [], rampSettings: settings}
    // Setup Sequences
    const miniSeq = []//buildRamp('Mini', 6, trinkets, stats.haste || 0, settings.playstyle || "", talents)
    const evangSeq = buildRamp('Evangelism', 10, trinkets, stats.haste || 0, settings.playstyle || "", talents);
    const newFiendSeq = []//buildRamp('Primary', 10, trinkets, stats.haste || 0, settings.playstyle || "", talents);
    const raptureSeq = []//buildRamp('RaptureLW', 8, trinkets, stats.haste || 0, settings.playstyle || "", talents)
    const microSeq = []//buildRamp('Micro', 5, [], stats.haste || 0, settings.playstyle || "", talents)

    // Run Sequences
    settings.trinkets = trinkets;
    //const miniRamp = runCastSequence(miniSeq, stats, settings, talents);
    const evangRamp = runCastSequence(evangSeq, stats, {...settings, harshDiscipline: true}, talents);
    //const fiendRamp = runCastSequence(newFiendSeq, stats, {...settings, harshDiscipline: true}, talents);
    //const raptureRamp = runCastSequence(raptureSeq, stats, settings, talents);
    //const microRamp = runCastSequence(microSeq, stats, settings, talents);


    rampResult.totalHealing = evangRamp.totalHealing; //fiendRamp.totalHealing + evangRamp.totalHealing + miniRamp.totalHealing * 2 + raptureRamp.totalHealing * 2 + microRamp.totalHealing * 7;
    
    if (reporting) {
        rampResult.ramps.push({"tag": "Secondary Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": (evangSeq), "totalHealing": Math.round(evangRamp.totalHealing)});
        rampResult.ramps.push({"tag": "Fiend Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": newFiendSeq, "totalHealing": Math.round(fiendRamp.totalHealing)});
        rampResult.ramps.push({"tag": "Mini Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": miniSeq, "totalHealing": Math.round(miniRamp.totalHealing)});
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

export const buildDiscChartData = (stats, incTalents) => {
    let results = [];
    
    const activeStats = {
        intellect: 12000,
        haste: 2000,
        crit: 2000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }

    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: false, t31_2: false};
    const talents = {...incTalents};

    const sequences = [
        /*
        {tag: "Ramp + DoT only", seq: []},
        {tag: "Ramp -> Pen, Mind Blast, Smite / Pen", seq: ["Penance", "Mind Blast", "Smite", "Mind Blast", "Smite", "Penance"]},
        {tag: "Sfiend Ramp -> Pen, Mind Blast, Smite, Mind Blast, Pen / Smite", seq: ["Shadowfiend", "Penance", "Mind Blast", "Smite", "Mind Blast", "Penance"]},
        {tag: "Bender Ramp -> Pen, Mind Blast, Smite, Mind Blast, Pen / Smite", seq: ["Mindbender", "Penance", "Mind Blast", "Smite", "Mind Blast", "Penance"]},
        */
    ]

    const atoneRamp = ["Purge the Wicked"]

    for (var x = 0; x < 9; x++) {
        if (talents.trainOfThought && x % 4 === 0) atoneRamp.push('Power Word: Shield');
        else if (!talents.trainOfThought && x % 5 === 0) atoneRamp.push('Power Word: Shield');
        else atoneRamp.push('Renew');
    }
    atoneRamp.push("Evangelism")


    sequences.forEach(sequence => {
        const newSeq = atoneRamp.concat(sequence.seq);
        const result = runCastSequence(newSeq, JSON.parse(JSON.stringify(activeStats)), testSettings, talents);
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        console.log(result);
        results.push({tag: tag, hps: result.totalHealing, hpm: Math.round(100*result.hpm)/100, dps: Math.round(result.totalDamage) || "-"})
    });    

    return results;

}