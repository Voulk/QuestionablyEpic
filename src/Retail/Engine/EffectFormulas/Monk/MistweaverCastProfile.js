
import { getCurrentStats, getSpellRaw, getCrit, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, EVOKERCONSTANTS } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps";
import { applyLoadoutEffects, baseTalents } from "./MistweaverTalents";
import { STATCONVERSION } from "General/Engine/STAT";

import { spellDB } from "./MistweaverSpellDB";
import { printHealingBreakdown, hasTier, getCPM, getSpellEntry, buildCPM } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ProfileShared"; 


const setupTalents = () => {

}

export const runPreservationEvokerCastProfileEchoshaper = (playerData) => {
    const fightLength = 300;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: {...evokerTalents}, reporting: true, heroTree: "conduitOfTheCelestials", currentTarget: 0, currentStats: getCurrentStats(JSON.parse(JSON.stringify(playerData.stats)), [])};
    const localSettings = {gracePeriodOverheal: 0.8};

    state.currentStats.crit += (15 * 700);

    const talents = {};
    for (const [key, value] of Object.entries(state.talents)) {
        talents[key] = value.points;
    }
    // Run Talents
    const playerSpells = applyLoadoutEffects(deepCopyFunction(spellDB), state.settings, talents, state, state.currentStats, EVOKERCONSTANTS);
    //applyTalents(state, playerSpells, state.currentStats)
    state.spellDB = spellDB;
    state.talents = talents;
    const healingBreakdown = {}
    //let currentStats = {...playerData.stats};
    //state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const reportingData = {};
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1; // Should be handled in runHeal
    let genericCritIncrease = 1;



    const castProfile = [
        //{spell: "Echo", cpm: 0},
        {spell: "Renewing Mist", cpm: 0},
        {spell: "Living Flame", cpm: 0},
        {spell: "Echo", cpm: 60 / 5 / 2, hastedCPM: true},
        {spell: "Dream Breath", cpm: 2},       
        {spell: "Spiritbloom", cpm: buildCPM(playerSpells, "Spiritbloom")},      
        {spell: "Reversion", cpm: 5},
        {spell: "Verdant Embrace", cpm: 2}, // Combine with Dream Breath
        {spell: "Emerald Communion", cpm: buildCPM(playerSpells, "Emerald Communion")},
        {spell: "Dream Flight", cpm: buildCPM(playerSpells, "Dream Flight")},
        {spell: "Temporal Anomaly", cpm: buildCPM(playerSpells, "Temporal Anomaly") * 0.9, hastedCPM: true},    
        {spell: "Rewind", cpm: buildCPM(playerSpells, "Rewind")},
        {spell: "Engulf", cpm: Math.floor(90 / (getSpellAttribute(playerSpells["Engulf"], "cooldown") / getHaste(state.currentStats)))/1.5 }, 
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
                
                spellThroughput += (value * spellCPM);
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
            healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));

        });
    })

    // Grace Period
    Object.keys(healingBreakdown).forEach(key => {
        healingBreakdown[key] *= (0.1 * localSettings.gracePeriodOverheal + 1);
    })

    //console.log("HPS: " + totalHealing / 60);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);

    printHealingBreakdown(healingBreakdown, totalHealing);
    console.log(reportingData);
    console.log("HPS: " + Math.round(totalHealing / 60));
    return { hps: totalHealing / 60, hpm: 0 }
}