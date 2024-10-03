
import { getCurrentStats, getSpellRaw, getCrit, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
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

const buildCPM = (spells, spell) => {
    return 60 / getSpellAttribute(spells[spell], "cooldown");
}

const getEmpowerCPM = (profile) => {
    return getCPM(profile, "Spiritbloom") + getCPM(profile, "Dream Breath") + getCPM(profile, "Fire Breath");
}

export const runPreservationEvokerCastProfileEchoshaper = (playerData) => {
    const fightLength = 300;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: playerData.talents, reporting: true, heroTree: "flameshaper", currentTarget: 0, currentStats: getCurrentStats(playerData.stats, [])};
    
    const talents = {};
    for (const [key, value] of Object.entries(state.talents)) {
        talents[key] = value.points;
    }
    // Run Talents
    const evokerSpells = applyLoadoutEffects(deepCopyFunction(playerData.spells), state.settings, talents, state, state.currentStats, EVOKERCONSTANTS);
    //applyTalents(state, evokerSpells, state.currentStats)
    state.spellDB = evokerSpells;
    state.talents = talents;
    const healingBreakdown = {}
    let currentStats = {...playerData.stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1;
    let genericCritIncrease = 1;

    const castProfile = [
        //{spell: "Echo", cpm: 0},
        {spell: "Living Flame O", cpm: 0},
        {spell: "Living Flame", cpm: 0},
        {spell: "Echo", cpm: 60 / 5 / 2, hastedCPM: true},
        {spell: "Dream Breath", cpm: 2},       
        {spell: "Spiritbloom", cpm: 2},      
        {spell: "Dream Flight", cpm: buildCPM(evokerSpells, "Dream Flight")},
        {spell: "Temporal Anomaly", cpm: buildCPM(evokerSpells, "Temporal Anomaly")},    

        {spell: "Engulf", cpm: buildCPM(evokerSpells, "Engulf")}, 
        //{spell: "Chrono Flame", cpm: 0},     
      ]
    
    // Echo Breakdown
    // Haste our CPMs
    castProfile.forEach(spellProfile => {
        if (spellProfile.hastedCPM) spellProfile.cpm = spellProfile.cpm * getHaste(state.currentStats);
        }
    );

    // Assign echo usage
    const echoUsage = {
        "Spiritbloom": 0,
        "Verdant Embrace": 0,
        "Dream Breath": 0.2, 
        "Reversion": 0.8,
    }

    // Stasis
    // As Flameshaper we'll stasis Dream Breath -> Engulf -> Engulf
    getSpellEntry(castProfile, "Dream Breath").cpm += 1 / 1.5;
    getSpellEntry(castProfile, "Engulf").cpm += 1 / 1.5;

    // Essence Bursts generated
    const essenceBurst = (getCPM(castProfile, "Living Flame O") + getCPM(castProfile, "Living Flame")) * 0.2;

    // Total Echo CPM
    const totalEchoPower = getCPM(castProfile, "Echo") * 1.05 + getCPM(castProfile, "Temporal Anomaly") * 0.45 * 5;

    // Handle Echo'd Spell Healing
    // Note that we only take care of our ramp healing here. Regular spiritbloom healing is handled further below.
    // Echo Spiritbloom
    const spiritbloomHealing = runHeal(state, evokerSpells["Spiritbloom"][0], "Spiritbloom");
    const spiritbloomHoT = evokerSpells["Spiritbloom"][1];
    const spiritbloomHoTHealing = runHeal(state, spiritbloomHoT, "Spiritbloom (HoT)") * spiritbloomHoT.buffDuration / (spiritbloomHoT.tickData.tickRate)
    const totalSpiritbloom = (spiritbloomHealing + spiritbloomHoTHealing) / evokerSpells["Spiritbloom"][0].targets;

    healingBreakdown["Echo - Spiritbloom"] = totalSpiritbloom * echoUsage["Spiritbloom"] * totalEchoPower;

    // Lifebind
    // First, let's work out how much healing we'll include in our Lifebind. Remember this comes at a 40% penalty.
    // We'll need to include the 4pc too if we're running tier.
    const lifebindIncoming = spiritbloomHealing / evokerSpells["Spiritbloom"][0].targets * 2.05 + runHeal(state, evokerSpells["Echo"][0], "Dream Breath");
    console.log(lifebindIncoming);

    const verdantEmbraceHealing = runHeal(state, evokerSpells["Verdant Embrace"][0], "Verdant Embrace");
    healingBreakdown["Echo - Verdant Embrace"] = verdantEmbraceHealing * echoUsage["Verdant Embrace"] * totalEchoPower;
    healingBreakdown["Lifebind"] = lifebindIncoming * 0.4 * echoUsage["Verdant Embrace"] * totalEchoPower;

    // TODO Double Time
    const dreamBreathHealing = runHeal(state, evokerSpells["Dream Breath"][0], "Dream Breath") + runHeal(state, evokerSpells["Dream Breath"][1], "Dream Breath");
    const dreamHoT = evokerSpells["Dream Breath"][2];
    const dreamBreathHoTHealing = runHeal(state, dreamHoT, "Dream Breath (HoT)") * dreamHoT.buffDuration / (dreamHoT.tickData.tickRate * getHaste(state.currentStats));
    const totalDream = (dreamBreathHealing + dreamBreathHoTHealing) / evokerSpells["Dream Breath"][0].targets;
    healingBreakdown["Echo - Dream Breath"] = totalDream * echoUsage["Dream Breath"] * totalEchoPower;
    //spellThroughput += oneTickHealing * tickCount * spellCPM;


    // Tier Set


    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = evokerSpells[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm// * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;

            // Special Cases
            if (spellName === "Engulf") {
                // Engulf itself

                // Consume Flame
                const dreamBreathHoT = evokerSpells["Dream Breath"][2];
                const tickCount = 4 / (dreamBreathHoT.tickData.tickRate / getHaste(state.currentStats));
                const expectedTargets = 20;
                const sqrtMod = Math.sqrt(5 / expectedTargets);
                const consumeMult = 3 * 1.4 * 1.4;

                
                let consumeHealing = getSpellRaw(dreamBreathHoT, state.currentStats, EVOKERCONSTANTS) * sqrtMod * tickCount * spellCPM * expectedTargets * consumeMult;
                consumeHealing *= 1.06;
                console.log("DREAM BREATH TICK: " + getSpellRaw(dreamBreathHoT, state.currentStats, EVOKERCONSTANTS))
                console.log("CONSUME HEALING: " + consumeHealing / 60, sqrtMod, tickCount, spellCPM, expectedTargets, consumeMult);
                healingBreakdown['Consume Flame'] = Math.round((healingBreakdown['Consume Flame'] || 0) + (consumeHealing));
            }
            // Regular spells
            else if (spell.type === "heal" && spellProfile.cpm > 0) {
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