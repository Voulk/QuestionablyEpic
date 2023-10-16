import { buildRamp } from "./HolyPaladinRampGen";
import { runCastSequence } from "./HolyPaladinRamps2";
import { PALADINSPELLDB } from "./HolyPaladinSpellDB";

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


export const allRampsHealing = (boonSeq, fiendSeq, stats, settings = {}, conduits, reporting = false) => {
    const rampResult = allRamps(boonSeq, fiendSeq, stats, settings, conduits, reporting);

    if (rampResult.totalHealing > 0) return rampResult.totalHealing;
    else {
        reportError("", "DiscRamp", "Total Healing is 0", rampResult.totalHealing || 0)
        return 0;
    }
}

// This function automatically casts a full set of ramps. It's easier than having functions call ramps individually and then sum them.
// We can probably have it take an array of ramps rather than pre-defined sets.
export const allRamps = (fiendSeq, stats, settings = {}, talents, reporting = false) => {

    let rampResult = {totalHealing: 0, ramps: [], rampSettings: settings}
    const miniSeq = buildRamp('Mini', 6, [], stats.haste, settings.playstyle || "", [], talents)
    const miniRamp = runCastSequence(miniSeq, stats, settings, talents);
    //const boonRamp = runCastSequence(boonSeq, stats, settings, conduits);
    const fiendRamp = runCastSequence(fiendSeq, stats, settings, talents);

    rampResult.totalHealing = fiendRamp.totalHealing + miniRamp.totalHealing;

    if (reporting) {
        //rampResult.ramps.push({"tag": "Primary Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": rampShortener(boonSeq), "totalHealing": Math.round(boonRamp.totalHealing)});
        rampResult.ramps.push({"tag": "Fiend Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": rampShortener(fiendSeq), "totalHealing": Math.round(fiendRamp.totalHealing)});
        rampResult.ramps.push({"tag": "Mini Ramp", "prerampConditions": ["Power of the Dark Side", "Active DoT"], "sequence": rampShortener(miniSeq), "totalHealing": Math.round(miniRamp.totalHealing)});
        rampResult.stats = stats;

        rampResult.damageBreakdown = addBreakdowns({}, fiendRamp.damageDone, miniRamp.damageDone);
        rampResult.healingBreakdown = addBreakdowns({}, fiendRamp.healingDone, miniRamp.healingDone);
        rampResult.manaSpent = fiendRamp.manaSpent + miniRamp.manaSpent * 2;
        //rampResult.conduits = conduits;
        
     
        /*
        console.log("== Set Ramp Information == ")
        console.log("Total Healing: " + Math.round(rampResult.totalHealing));
        console.log("Legendaries used: Clarity of Mind");
        console.log("Conduits used: " + JSON.stringify(conduits));
        console.log("On use Trinkets used: " + " Instructor's Divine Bell (213 ilvl, ~20% expected overhealing)")
        console.log("Post-DR passive stat breakdown: " + JSON.stringify(stats));
        rampResult.ramps.forEach(ramp => {
            console.log("Ramp Name: " + ramp.tag + " (" + Math.round(ramp.totalHealing) + " healing)");
            console.log("Pre-ramp conditions: " + "[Power of the Dark Side, Purge the Wicked, Pelagos]");
            console.log(rampShortener(ramp.sequence));
            
    })*/}


    //console.log(JSON.stringify(rampResult));

    return rampResult; //boonRamp + fiendRamp + miniRamp * 2;
}

export const buildPaladinChartData = (stats, incTalents) => {
    let results = [];
    
    const activeStats = {
        intellect: 12000,
        haste: 3400,
        crit: 5200,
        mastery: 5000,
        versatility: 2400,
        stamina: 29000,
        critMult: 2,
    }

    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: false, t31_2: false, preBuffs: []};
    const talents = {...incTalents};
    talents.divinePurpose.points = 0; // TODO: Fix DP attribution

    const sequences = [

        {cat: "Holy Shock", tag: "Holy Shock Raw", seq: ["Holy Shock"], preBuffs: []},
        {cat: "Holy Shock", tag: "Holy Shock + 8 Glimmer", seq: ["Holy Shock"], preBuffs: ["Glimmer of Light 8"]},

        {cat: "Hard Casts", tag: "Flash of Light", seq: ["Flash of Light"], preBuffs: []},
        {cat: "Hard Casts", tag: "Flash of Light (IoL)", seq: ["Flash of Light"], preBuffs: ["Infusion of Light"]},
        {cat: "Hard Casts", tag: "Flash of Light (Barr)", seq: ["Flash of Light"], preBuffs: ["Barrier of Faith"]},
        {cat: "Hard Casts", tag: "Flash of Light (Barr, IoL)", seq: ["Flash of Light"], preBuffs: ["Barrier of Faith", "Infusion of Light"]},
        {cat: "Hard Casts", tag: "Flash of Light (Barr, IoL, Tyrs)", seq: ["Flash of Light"], preBuffs: ["Barrier of Faith", "Infusion of Light", "Tyr's Deliverance"]},
        {cat: "Hard Casts", tag: "Holy Light", seq: ["Holy Light"], preBuffs: []},

        {cat: "Spenders (8x glimmer)", tag: "Word of Glory", seq: ["Word of Glory"], preBuffs: ["Glimmer of Light 8"]},
        {cat: "Spenders (8x glimmer)", tag: "Word of Glory (1x BoD)", seq: ["Word of Glory"], preBuffs: ["Glimmer of Light 8", "Blessing of Dawn"]},
        {cat: "Spenders (8x glimmer)", tag: "Word of Glory (2x BoD)", seq: ["Word of Glory"], preBuffs: ["Glimmer of Light 8", "Blessing of Dawn", "Blessing of Dawn"]},
        {cat: "Spenders (8x glimmer)", tag: "Light of Dawn", seq: ["Light of Dawn"], preBuffs: ["Glimmer of Light 8"]},
        {cat: "Spenders (8x glimmer)", tag: "Light of Dawn (1x BoD)", seq: ["Light of Dawn"], preBuffs: ["Glimmer of Light 8", "Blessing of Dawn"]},
        {cat: "Spenders (8x glimmer)", tag: "Light of Dawn (2x BoD)", seq: ["Light of Dawn"], preBuffs: ["Glimmer of Light 8", "Blessing of Dawn", "Blessing of Dawn"]},

        
    ]


    sequences.forEach(sequence => {
        const newSeq = sequence.seq;
        
        const result = runCastSequence(newSeq, JSON.parse(JSON.stringify(activeStats)), {...testSettings, preBuffs: sequence.preBuffs}, talents);
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const spellData = {id: 0, icon: PALADINSPELLDB[newSeq[0]][0].spellData.icon || ""};
        results.push({cat: sequence.cat, tag: tag, hps: result.totalHealing, hpm: Math.round(100*result.hpm)/100, dps: Math.round(result.totalDamage) || "-", spell: spellData})
    });    

    return results;

}