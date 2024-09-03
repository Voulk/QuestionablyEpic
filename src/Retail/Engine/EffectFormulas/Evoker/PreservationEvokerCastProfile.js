
import { getCurrentStats, getCrit, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, EVOKERCONSTANTS } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps";
import { applyLoadoutEffects } from "./PresEvokerTalents";
import { STATCONVERSION } from "General/Engine/STAT";

const getCPM = (profile, spellName) => {
    const filterSpell = profile.filter(spell => spell.spell === spellName)
    let cpm = 0;
    for (let i = 0; i < filterSpell.length; i++) cpm += filterSpell[i].cpm || 0;

    return cpm;
}

const getSpellEntry = (profile, spellName, index = 0) => {
    return profile.filter(spell => spell.spell === spellName)[index]
}

export const runPreservationEvokerCastProfile = (playerData) => {
    const fightLength = 300;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: playerData.talents, reporting: true, heroTree: "chronowarden", currentTarget: 0, currentStats: getCurrentStats(playerData.stats, [])};
    
    const talents = {};
    for (const [key, value] of Object.entries(state.talents)) {
        talents[key] = value.points;
    }
    // Run Talents
    const evokerSpells = applyLoadoutEffects(deepCopyFunction(playerData.spells), state.settings, talents, state, state.currentStats, EVOKERCONSTANTS);
    //applyTalents(state, evokerSpells, state.currentStats)
    state.spellDB = evokerSpells;
    state.talents = talents;

    let currentStats = {...playerData.stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1;
    let genericCritIncrease = 1;
    console.log(evokerSpells["Spiritbloom"]);
    const castProfile = [
        //{spell: "Echo", cpm: 0},
        //{spell: "Dream Breath", cpm: 2},       
        {spell: "Spiritbloom", cpm: 2},      
        //{spell: "Dream Flight", cpm: 0},
        //{spell: "Temporal Anomaly", cpm: 0},    
        //{spell: "Chrono Flame", cpm: 0},     
      ]
    
    // Echo Breakdown


    // Tier Set

    const healingBreakdown = {}
    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = evokerSpells[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm// * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;
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
                const tickCount = spell.buffDuration / (spell.tickData.tickRate / getHaste(state.currentStats))

                spellThroughput += oneTickHealing * tickCount * spellCPM;

            }
            else if (spell.type === "function") {
                //const value = spell.runFunc(state, spell) * spellCPM;
            }

            if (spellName === "Judgment" && spell.name === "Greater Judgment") {
                // Double Judgment healing for each Infusion we collected.
                const percInfused = Math.min(1, totalInfusions / getCPM(castProfile, "Judgment"));

                spellThroughput *= (1 + percInfused)
            }

            // Spell Slice complete
            if (spellProfile.mult) spellThroughput *= spellProfile.mult;

            // Blessing of Anshe
            if (spellName === "Holy Shock") spellThroughput *= 1 + (2 * getHaste(state.currentStats) / spellCPM * 3);

            spellThroughput *= genericHealingIncrease;
            healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));

        });


    })
    //console.log("HPS: " + totalHealing / 60);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);
    const spellBreakdown = {}
    Object.keys(healingBreakdown).forEach(spellName => {
        spellBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) / 60) + " (" + Math.round(healingBreakdown[spellName] / totalHealing * 10000) / 100 + "%)";
    })
    
    console.log(spellBreakdown);
    console.log(totalHealing / 60);
    return { hps: totalHealing / 60, hpm: 0 }
}