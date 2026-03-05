import { runCastSequence } from "./HolyPaladinRamps";
import { PALADINSPELLDB } from "./Archive/HolyPaladinSpellDBTWW";

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

        {cat: "Combos", tag: "Divine Favor -> Flash of Light (raw)", seq: ["Divine Favor", "Flash of Light"], preBuffs: []},
        {cat: "Combos", tag: "Divine Favor -> Holy Light", seq: ["Divine Favor", "Holy Light"], preBuffs: []},
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