
import { getCurrentStats, getSpellRaw, getCrit, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, EVOKERCONSTANTS } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps";
import { applyLoadoutEffects } from "./PresEvokerTalents";
import { STATCONVERSION } from "General/Engine/STAT";

import { printHealingBreakdown, hasTier } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ProfileShared"; 

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
    return 60 / getSpellAttribute(spells[spell], "cooldown") * 0.9;
}

const getTotalEmpowerCPM = (profile) => {
    return getCPM(profile, "Spiritbloom") + getCPM(profile, "Dream Breath") + getCPM(profile, "Fire Breath");
}

export const runPreservationEvokerCastProfileEchoshaper = (playerData) => {
    const fightLength = 300;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: playerData.talents, reporting: true, heroTree: "flameshaper", currentTarget: 0, currentStats: getCurrentStats(JSON.parse(JSON.stringify(playerData.stats)), [])};
    const profileSettings = {gracePeriodOverheal: 0.8};

    state.currentStats.crit += (15 * 700);

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
    //let currentStats = {...playerData.stats};
    //state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const reportingData = {};
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1; // Should be handled in runHeal
    let genericCritIncrease = 1;

    const castProfile = [
        //{spell: "Echo", cpm: 0},
        {spell: "Living Flame O", cpm: 0},
        {spell: "Living Flame", cpm: 0},
        {spell: "Echo", cpm: 60 / 5 / 2, hastedCPM: true},
        {spell: "Dream Breath", cpm: 2},       
        {spell: "Spiritbloom", cpm: buildCPM(evokerSpells, "Spiritbloom")},      
        {spell: "Reversion", cpm: 5},
        {spell: "Verdant Embrace", cpm: 2}, // Combine with Dream Breath
        {spell: "Emerald Communion", cpm: buildCPM(evokerSpells, "Emerald Communion")},
        {spell: "Dream Flight", cpm: buildCPM(evokerSpells, "Dream Flight")},
        {spell: "Temporal Anomaly", cpm: buildCPM(evokerSpells, "Temporal Anomaly") * 0.9, hastedCPM: true},    
        {spell: "Rewind", cpm: buildCPM(evokerSpells, "Rewind")},
        {spell: "Engulf", cpm: buildCPM(evokerSpells, "Engulf")}, 
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

    

    // Assign echo usage
    const echoUsage = {
        "Spiritbloom": 0,
        "Verdant Embrace": 0.1,
        "Dream Breath": 0.2, 
        "Reversion": 0.7,
    }


    // Stasis
    // As Flameshaper we'll stasis Dream Breath -> Engulf -> Engulf
    getSpellEntry(castProfile, "Dream Breath").cpm += 1 / 1.5;
    getSpellEntry(castProfile, "Engulf").cpm += 1 / 1.5;

    // Essence Bursts generated
    // TODO: Turn these into Echo casts with some wastage.
    let essenceBurst = (getCPM(castProfile, "Living Flame O") + getCPM(castProfile, "Living Flame")) * 0.2;
    const echoReversionCasts = (getCPM(castProfile, "Echo") + getCPM(castProfile, "Temporal Anomaly") * 5) * echoUsage['Reversion'];
    essenceBurst += (getCPM(castProfile, "Reversion") + echoReversionCasts) * 0.15;

    getSpellEntry(castProfile, "Echo").cpm += essenceBurst;
    reportingData.essenceBurst = essenceBurst;

    // Total Echo CPM
    // Echo Power is most relevant, but Echo casts are also stored since spells like Reversion have a standard chance to proc Essence Burst per Echo.
    const totalEchoPower = getCPM(castProfile, "Echo") * 1.05 + getCPM(castProfile, "Temporal Anomaly") * 0.45 * 5;
    const totalEchoCasts = getCPM(castProfile, "Echo") + getCPM(castProfile, "Temporal Anomaly") * 5;

    reportingData.totalEchoPower = totalEchoPower;
    reportingData.totalEchoCasts = totalEchoCasts;
    // Handle Echo'd Spell Healing
    // Note that we only take care of our ramp healing here. Regular spiritbloom healing is handled further below.
    // Echo Spiritbloom
    const spiritbloomHealing = runHeal(state, evokerSpells["Spiritbloom"][0], "Spiritbloom");
    const totalSpiritbloom = (spiritbloomHealing) / evokerSpells["Spiritbloom"][0].targets;

    healingBreakdown["Echo - Spiritbloom"] = totalSpiritbloom * echoUsage["Spiritbloom"] * totalEchoPower;

    // Lifebind
    // First, let's work out how much healing we'll include in our Lifebind. Remember this comes at a 40% penalty.
    // We'll need to include the 4pc too if we're running tier.
    const lifebindIncoming = spiritbloomHealing / evokerSpells["Spiritbloom"][0].targets * 2.05 + runHeal(state, evokerSpells["Echo"][0], "Dream Breath");

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

    // Reversion
    /// Calculate Reversion HoT healing
    const reversion = evokerSpells["Reversion"][0]
    const reversionBaseHealing = runHeal(state, reversion, "Reversion");
    const reversionDuration = (reversion.buffDuration)// / (1 - (getCrit(state.currentStats)-1))
    const reversionTickCount = reversionDuration / (reversion.tickData.tickRate / getHaste(state.currentStats));
    const reversionHealing = reversionBaseHealing * reversionTickCount;
    healingBreakdown["Echo - Reversion"] = reversionHealing * echoUsage["Reversion"] * totalEchoPower;
    console.log("Reversion Duration - " + reversionDuration + " - " + reversionTickCount);
    const reversionCoverage = reversionDuration * (getCPM(castProfile, "Reversion") + echoReversionCasts) / 20 / 60; // TODO
    reportingData.reversionCoverage = reversionCoverage;
    /// Calculate Golden Hour Healing
    const avgGoldenHour = evokerSpells["Reversion"][1].flatHeal || 0;

    healingBreakdown["Echo - Reversion (Golden Hour)"] = avgGoldenHour * echoUsage["Reversion"] * totalEchoPower;

    // Tier Set

    console.log(castProfile);

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
                const consumeMult = 1.5; 
                const dbMods = 1.4 * 1.4; // Call of Ysera & Tier Set

                const dreamBreathHealing = getSpellRaw(dreamBreathHoT, state.currentStats, EVOKERCONSTANTS) * dbMods;
                let consumeHealing = dreamBreathHealing * sqrtMod * tickCount * spellCPM * expectedTargets * consumeMult;
                consumeHealing *= 1.06;

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
        healingBreakdown[key] *= (0.1 * profileSettings.gracePeriodOverheal + 1);
    })

    //console.log("HPS: " + totalHealing / 60);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);

    printHealingBreakdown(healingBreakdown, totalHealing);
    console.log(reportingData);
    console.log("HPS: " + Math.round(totalHealing / 60));
    return { hps: totalHealing / 60, hpm: 0 }
}