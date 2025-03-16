
import { getCurrentStats, getMastery, getSpellRaw, getStatMult, getCrit, getHaste, applyTalents, deepCopyFunction, hasTalent, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, runDamage, MONKCONSTANTS } from "Retail/Engine/EffectFormulas/Monk/MonkSpellSequence";
import { applyLoadoutEffects, baseTalents } from "./MistweaverTalents";
import { STATCONVERSION } from "General/Engine/STAT";

import { MONKSPELLS as spellDB } from "./MistweaverSpellDB";
import { printHealingBreakdown, hasTier, getCPM, getSpellEntry, buildCPM } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ProfileShared"; 


const setupTalents = () => {

}

const getMasteryHeal = (currentStats, mult = 1) => {
    return (0.1 + getMastery(currentStats, MONKCONSTANTS)) * currentStats.intellect * getStatMult(currentStats, ["crit", "versatility"], {}, MONKCONSTANTS)
}

export const runMistweaverMonkCastProfile = (playerData) => {
    const fightLength = 300;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: {...playerData.talents}, reporting: true, heroTree: "conduitOfTheCelestials", currentTarget: 0, currentStats: getCurrentStats(JSON.parse(JSON.stringify(playerData.stats)), [])};
    const localSettings = {gracePeriodOverheal: 0.8};


    const talents = {};
    for (const [key, value] of Object.entries(state.talents)) {
        talents[key] = value.points;
    }
    // Run Talents
    const playerSpells = applyLoadoutEffects(deepCopyFunction(spellDB), state.settings, talents, state, state.currentStats, MONKCONSTANTS);
    //applyTalents(state, playerSpells, state.currentStats)
    state.spellDB = spellDB;
    state.talents = talents;
    const healingBreakdown = {}
    const damageBreakdown = {}
    //let currentStats = {...playerData.stats};
    //state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const reportingData = {};
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1; // Should be handled in runHeal
    let genericCritIncrease = 1;

    const averageHaste = getHaste(state.currentStats);

    const castProfile = [
        //{spell: "Echo", cpm: 0},
        {spell: "Renewing Mist", cpm: buildCPM(playerSpells, "Renewing Mist")},
        {spell: "Vivify", cpm: 5},
        {spell: "Tiger Palm", cpm: 6.7},
        {spell: "Rising Sun Kick", cpm: 7.7}, // Adjust CPM dynamically and then lower.
        {spell: "Revival", cpm: buildCPM(playerSpells, "Revival")},
        {spell: "Celestial Conduit", cpm: buildCPM(playerSpells, "Celestial Conduit")},


        // "Spells"
        {spell: "Courage of the White Tiger", cpm: 4 * averageHaste},
        /*
        {spell: "Emerald Communion", cpm: buildCPM(playerSpells, "Emerald Communion")},
        {spell: "Dream Flight", cpm: buildCPM(playerSpells, "Dream Flight")},
        {spell: "Temporal Anomaly", cpm: buildCPM(playerSpells, "Temporal Anomaly") * 0.9, hastedCPM: true},    
        {spell: "Rewind", cpm: buildCPM(playerSpells, "Rewind")},
        {spell: "Engulf", cpm: Math.floor(90 / (getSpellAttribute(playerSpells["Engulf"], "cooldown") / getHaste(state.currentStats)))/1.5 }, 
        */
        //{spell: "Chrono Flame", cpm: 0},     
      ]
    // Echo Breakdown
    // Haste our CPMs
    castProfile.forEach(spellProfile => {
        if (spellProfile.hastedCPM) {
            spellProfile.cpm = spellProfile.cpm * getHaste(state.currentStats);
        }
    }
    );

    if (true) {
        // Sequence Chi-ji
        // Store triple TotM stacks before pressing Chi-ji
        const tempStats = {...state.currentStats};
        let hastePercentage = getHaste(tempStats);
        if (hasTalent(playerData.talents, "invokersDelight")) hastePercentage *= (1 + 0.2 * 0.8);
        if (hasTalent(playerData.talents, "secretInfusion")) hastePercentage *= (1 + 0.15 * 0.4);

        const chijiDuration = 25; // todo
        const chijiCasts = chijiDuration / (1.5 / hastePercentage);
        const chijiCooldown = 120;

        // Chi Cocoons & Jade Bond
        const chiCocoon = runHeal(state, spellDB["Chi Cocoon"][0], "Chi Cocoon");
        console.log(chiCocoon);
        healingBreakdown["Chi Cocoon"] = chiCocoon * (60 / chijiCooldown);

        // Enveloping Breath
        const envelopingCasts = 6; // TODO: make dynamic
        const envelopingHeal = runHeal(state, spellDB["Enveloping Breath"][0], "Enveloping Breath") * envelopingCasts * spellDB["Enveloping Breath"][0].buffDuration * getHaste(state.currentStats);
        healingBreakdown["Enveloping Breath"] = envelopingHeal * (60 / chijiCooldown);

        // Chi-ji Gusts
        // Each damage spell procs 6 total Gusts
        const castBreakdown = {
            "Tiger Palm": 0.25 * chijiCasts,
            "Rising Sun Kick": 0.25 * chijiCasts,
            "Blackout Kick": 0.5 * chijiCasts,
            "Enveloping Mist": 3,
        }

        const chijiProcs = 6 * (4 + castBreakdown["Tiger Palm"] + castBreakdown["Rising Sun Kick"] + castBreakdown["Blackout Kick"] * 2);
        let chijiMult = 1
        reportingData.chijiGusts = chijiProcs;
        if (hasTalent(playerData.talents, "jadeBond")) chijiMult *= 1.2;

        healingBreakdown["Gust of Mists (Chi-ji)"] = chijiProcs * getMasteryHeal(state.currentStats) * chijiMult * (60 / chijiCooldown) * 0.7;
        
    }


    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = playerSpells[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm// * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;

            // Regular spells
            if (spell.type === "heal" && spellProfile.cpm > 0) {
                const value = runHeal(state, spell, spellName) ;
                if (spellName === "Vivify") console.log("VIVIFY", value);
                spellThroughput += (value * spellCPM);

                if (spell.mastery) {
                    // Spell procs Gust of Mists.
                    const masteryHeal = (0.1 + getMastery(state.currentStats, MONKCONSTANTS)) * state.currentStats.intellect * getStatMult(state.currentStats, ["crit", "versatility"], {}, MONKCONSTANTS);

                    healingBreakdown["Gust of Mists"] = Math.round((healingBreakdown["Gust of Mists"] || 0) + (masteryHeal * spell.mastery * spellCPM));

                }
                if (spellName === "Vivify") {
                    const invig = runHeal(state, playerSpells["Invigorating Mist"][0], "Invigorating Mist");

                    healingBreakdown["Invigorating Mist"] = (healingBreakdown["Invigorating Mist"] || 0) + invig * 1 * spellCPM;
                }
            }
            else if (spell.type === "damage") {
                // Damage spells
                const value = runDamage(state, spell, spellName);

                if (spell.damageToHeal) {
                    if (spellName === "Courage of the White Tiger") healingBreakdown["Courage of the White Tiger"] = (healingBreakdown["Courage of the White Tiger"] || 0) + value * spell.damageToHeal * spellCPM;
                    else healingBreakdown["Ancient Teachings"] = (healingBreakdown["Ancient Teachings"] || 0) + value * spell.damageToHeal * spellCPM;
                }
                damageBreakdown[spellName] = (damageBreakdown[spellName] || 0) + value * spellCPM;
            }
            else if (spell.type === "buff" && spell.buffType === "heal") {
                // HoT
                const oneTick = {
                    name: spellName,
                    type: "heal",
                    coeff: spell.coeff,
                    expectedOverheal: spell.expectedOverheal,
                    targets: spell.targets || 1,
                    secondaries: spell.secondaries,
                }
                const oneTickHealing = runHeal(state, oneTick, spellName);
                const tickCount = spell.ignoreHaste ? 
                    (spell.buffDuration / (spell.tickData.tickRate))
                        :
                    (spell.buffDuration / (spell.tickData.tickRate / getHaste(state.currentStats)));

                spellThroughput += oneTickHealing * tickCount * spellCPM;

            }
            else if (spell.type === "function") {
                //const value = spell.runFunc(state, spell) * spellCPM;
            }

            if (spellName === "Dream Breath") if (state.talents.callOfYsera) spellThroughput *= 1.4;
            if ((spellName === "Dream Breath" || spellName === "Spiritbloom") && hasTier(playerData, "S1-2")) spellThroughput *= 1.4; // Tier Set
            if (spellName === "Judgment" && spell.name === "Greater Judgment") {
                // Double Judgment healing for each Infusion we collected.
                const percInfused = Math.min(1, totalInfusions / getCPM(castProfile, "Judgment"));

                spellThroughput *= (1 + percInfused)
            }

            // Spell Slice complete
            if (spellProfile.mult) spellThroughput *= spellProfile.mult;

            spellThroughput *= genericHealingIncrease;

            if (spellThroughput > 0)  healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));
           

        });
    })

    // Grace Period
    Object.keys(healingBreakdown).forEach(key => {
        healingBreakdown[key] *= (0.1 * localSettings.gracePeriodOverheal + 1);
    })

    //console.log("HPS: " + totalHealing / 60);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);
    const totalDamage = sumValues(damageBreakdown);

    printHealingBreakdown(damageBreakdown, totalDamage);
    printHealingBreakdown(healingBreakdown, totalHealing);
    console.log(reportingData);
    console.log("HPS: " + Math.round(totalHealing / 60));
    return { hps: totalHealing / 60, hpm: 0 }
}