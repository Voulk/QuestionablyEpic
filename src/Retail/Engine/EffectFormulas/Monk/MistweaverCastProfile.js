
import { getCurrentStats, getMastery, getSpellRaw, getStatMult, getCrit, getHaste, applyTalents, deepCopyFunction, hasTalent, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, runDamage, MONKCONSTANTS } from "Retail/Engine/EffectFormulas/Monk/MonkSpellSequence";
import { applyLoadoutEffects, baseTalents } from "./MistweaverTalents";
import { STAT, STATCONVERSION } from "General/Engine/STAT";

import { MONKSPELLS as spellDB } from "./MistweaverSpellDB";
import { getTrinketData, printHealingBreakdown, hasTier, getCPM, getSpellEntry, buildCPM } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ProfileShared"; 


const getKickCPM = (playerSpells) => {
    const filteredSpells = playerSpells.filter(spell => ["Tiger Palm", "Blackout Kick", "Rising Sun Kick"].includes(spell.spell))
    return filteredSpells.reduce((a, b) => a + b.cpm, 0);
}

const getMasteryHeal = (currentStats, mult = 1) => {
    return (0.1 + getMastery(currentStats, MONKCONSTANTS)) * currentStats.intellect * getStatMult(currentStats, ["crit", "versatility"], {}, MONKCONSTANTS)
}

const getTimeUsed = (castProfile, spellDB, averageHaste) => {
    let timeUsed = 0;
    castProfile.forEach(spellProfile => {
        const spell = spellDB[spellProfile.spell][0];
        let castTime = (spell.castTime / averageHaste) || 0;

        if (castTime === 0 && !spell.offGCD) castTime = 1.5 / averageHaste;
        timeUsed += castTime * spellProfile.cpm;
    }
    )

    return timeUsed;
}

export const runMistweaverMonkCastProfile = (playerData) => {
    const fightLength = 300;
    playerData.talents = { ...baseTalents };
    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: {...playerData.talents}, reporting: true, heroTree: "conduitOfTheCelestials", tierSets: [], currentTarget: 0, setStats: JSON.parse(JSON.stringify(playerData.stats)), currentStats: getCurrentStats(JSON.parse(JSON.stringify(playerData.stats)), [])};
    const localSettings = {downtime: 0.15, risingMist: {remStandard: 1, remRapidDiffusion: 0.7, envStandard: 0.9}, gustsOverhealing: 0.4, chijiGustsOverhealing: 0.4, ancientTeachingsOverhealing: 0.14};
    
    state.tierSets = playerData.effects.filter(effect => effect.type === "set bonus").map(effect => effect.name);
    //console.log(JSON.stringify(state.tierSets));

    const talents = {};
    /*for (const [key, value] of Object.entries(state.talents)) {
        talents[key] = value.points;
    }*/

    // Run Talents
    const playerSpells = applyLoadoutEffects(deepCopyFunction(spellDB), state.settings, state, MONKCONSTANTS);
    //applyTalents(state, playerSpells, state.currentStats)
    state.spellDB = spellDB;
    //state.talents = talents;
    const healingBreakdown = {}
    const damageBreakdown = {}
    //let currentStats = {...playerData.stats};
    //state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const reportingData = {};
    let genericHealingIncrease = 1.04;
    let freeRenewingMistSec = 0;
    let freeInsuranceProcs = 0;
    let averageTeachingsStacks = 0;

    // Prio: House of Cards > Signet. Only matters if someone is wearing double on-use. Poor thing.
    let onUseData = {};

    if (playerData.effects.filter(effect => effect.name === "Signet of the Priory").length > 0) {
        onUseData = getTrinketData("Signet of the Priory", playerData.effects.filter(effect => effect.name === "Signet of the Priory")[0].level);
        onUseData.name = "Signet of the Priory";
        state.currentStats.haste += (onUseData.value * onUseData.duration / 120);
    }
    else if (playerData.effects.filter(effect => effect.name === "House of Cards").length > 0) {
        onUseData = getTrinketData("House of Cards", playerData.effects.filter(effect => effect.name === "House of Cards")[0].level);
        onUseData.name = "House of Cards";
        state.currentStats.mastery += (onUseData.value * onUseData.duration / 120);
    }

    let averageHaste = getHaste(state.currentStats)
                            * (1 + 0.15 * 10 * hasTalent(playerData.talents, "secretInfusion") / 30) //Potential TODO: SI toward crit for chiji?
                            * (1 + 0.2 * 20 * hasTalent(playerData.talents, "invokersDelight") / 120)
                            * (1 + 0.35 * 40 / 420) // Bloodlust

    if (hasTalent(playerData.talents, "innerCompass")) {
        // A rotating 2% of each stat.
        state.currentStats.crit += (STATCONVERSION.CRIT * 2 / 4);
        averageHaste *= (1.005); // Multiplicative
        state.currentStats.versatility += (STATCONVERSION.VERSATILITY * 2 / 4);
        state.currentStats.mastery += (STATCONVERSION.MASTERY * 2 / 4);
    }                        

    const castProfile = [
        //{spell: "Echo", cpm: 0},
        {spell: "Renewing Mist", cpm: buildCPM(playerSpells, "Renewing Mist")},
        {spell: "Enveloping Mist", cpm: 4 * averageHaste + 0.5}, // This needs to be at a minimum the same as the number of box procs
        {spell: "Vivify", cpm: 4, hastedCPM: true},
        {spell: "Tiger Palm", cpm: 7.5, hastedCPM: true},
        {spell: "Blackout Kick", cpm: 6.7, hastedCPM: true},
        {spell: "Rising Sun Kick", cpm: 6.4, hastedCPM: true}, // Adjust CPM dynamically and then lower.
        {spell: "Revival", cpm: buildCPM(playerSpells, "Revival")},
        {spell: "Celestial Conduit", cpm: buildCPM(playerSpells, "Celestial Conduit")},
        {spell: "Crackling Jade Lightning", cpm: 2},
        {spell: "Jadefire Stomp", cpm: buildCPM(playerSpells, "Jadefire Stomp")},
        {spell: "Sheilun's Gift", cpm: 1}, // TODO
        {spell: "Life Cocoon", cpm: buildCPM(playerSpells, "Life Cocoon")}, // 

        // "Spells"
        // Here we'll put any procs that we'd like to calculate as if they were spells, even if they aren't buttons we'll press.
        // Note that these should be tagged offGcd in spellDB so we don't calculate cast times for them.
        {spell: "Courage of the White Tiger", cpm: 4 * averageHaste + 0.5},
        {spell: "Strength of the Black Ox", cpm: 4 * averageHaste + 0.5}, // Identical to White Tiger
        {spell: "Insurance", cpm: 0, hastedCPM: true}, // Only active with tier set

        // Restore balance gives you a RJW for the entire duration of Chi-Ji / Yulon.
        {spell: "Refreshing Jade Wind", cpm: buildCPM(playerSpells, "Thunder Focus Tea") + hasTalent(playerData.talents, "restoreBalance") * (25 / 6 * 0.5)},
        {spell: "Crane Style", cpm: 10, hastedCPM: true}, // This is RPPM. Technically the procs would drop if you don't kick much but this build does.
      ]

    // Insurance
    if (state.tierSets.includes("Monk S2-2")) {
        getSpellEntry(castProfile, "Insurance").cpm = 5;
    }

    // Haste our CPMs
    castProfile.forEach(spellProfile => {
        if (spellProfile.hastedCPM) {
            spellProfile.cpm = spellProfile.cpm * averageHaste;
        }

        // Ultimately players are not robots and fights have natural downtime. We can't model that ultra precisely but it's better to try than not,
        // since with no downtime flat healing effects get hit harder than they would in a real fight. 
        spellProfile.cpm *= (1 - localSettings.downtime); 
        
    }
    );

    

    // Flight of the Red Crane
    // This is 3x haste rppm but realistically you will get less due to having fewer events of RJW.
    castProfile.push({spell: "Flight of the Red Crane", cpm: 3 * averageHaste * 0.5}); // TODO: Adjust for actual RJW uptime.
    castProfile.push({spell: "Rising Mist", cpm: getSpellEntry(castProfile, "Rising Sun Kick").cpm}); 

    // Sheilun's Gift
    localSettings.sheilunsClouds = Math.min(10, (60 / 8 / getSpellEntry(castProfile, "Sheilun's Gift").cpm))
    reportingData.sheilunsClouds = localSettings.sheilunsClouds;

    // Expected Downtime
    const timeUsed = getTimeUsed(castProfile, playerSpells, averageHaste);
    reportingData.timeUsed = timeUsed;

    // Insurance
    if (state.tierSets.includes("Monk S2-4")) {
        freeInsuranceProcs += getSpellEntry(castProfile, "Renewing Mist").cpm;
    }

    // TotM
    averageTeachingsStacks = (getSpellEntry(castProfile, "Tiger Palm").cpm * (hasTalent(playerData.talents, "awakenedJadefire") ? 2 : 1)) / getSpellEntry(castProfile, "Blackout Kick").cpm;
    if (hasTalent(playerData.talents, "xuensGuidance")) averageTeachingsStacks *= 1.15; // Doesn't apply to our base BoK.
    reportingData.averageTeachingsStacks = averageTeachingsStacks;

    // Adjust CPMs
    getSpellEntry(castProfile, "Jadefire Stomp").cpm += (getKickCPM(castProfile) * 0.12 * 0.6); // High wastage
    reportingData.extraStomps = getKickCPM(castProfile) * 0.12 * 0.5;

    // Rising Mist
    // This section in particular could use more analysis. It's important that Rising Mist scales with haste since it's a key factor in our resets,
    // however modelling getting 5 in a ReM duration is trickier. We also don't want to introduce "fake" breakpoints.
    localSettings.risingMist.remStandard = Math.min(1, (getSpellEntry(castProfile, "Rising Sun Kick").cpm * (40 / 60) / 5 * 0.9));
    localSettings.risingMist.envStandard = Math.min(1, (getSpellEntry(castProfile, "Enveloping Mist").cpm * (hasTalent(playerData.talents, "mistWrap") ? 14 : 12 / 60) / 2 * 0.9));


    // Get free Renewing Mists
    // Rapid Diffusion
    if (hasTalent(playerData.talents, "rapidDiffusion")) {
        // 6s of Renewing Mist for each RSK / EnV cast. These HoTs do benefit from Chi Harmony.
        const casts = getSpellEntry(castProfile, "Enveloping Mist").cpm + getSpellEntry(castProfile, "Rising Sun Kick").cpm;
        freeInsuranceProcs += casts;
        freeRenewingMistSec = casts * 6;
        freeRenewingMistSec *= (1 + localSettings.risingMist.remRapidDiffusion);
    }

    // Calculate average ReM count
    const averageRemCount = (getSpellEntry(castProfile, "Renewing Mist").cpm * 20 * (1 + localSettings.risingMist.remStandard) 
                                + freeRenewingMistSec) / 60;
    reportingData.averageRemCount = averageRemCount;
    const zenPulsePPM = 1.2 + hasTalent(playerData.talents, "deepClarity") ? 2 : 0; // TODO
    genericHealingIncrease *= (0.5 * averageRemCount / 20 * (8 / 20) + 1) // TODO: Only applies for 8s so don't count all 20.

    // Uplifted Spirits
    if (hasTalent(playerData.talents, "upliftedSpirits")) {
        const adjustedCooldown = 180 - getSpellEntry(castProfile, "Rising Sun Kick").cpm
        getSpellEntry(castProfile, "Revival").cpm = 60 / adjustedCooldown;
        //getSpellEntry(castProfile, "Revival").cpm *= getSpellEntry(castProfile, "Rising Sun Kick").cpm / 180;
    }

    if (true) {
        // Sequence Chi-ji
        // Store 4x TotM stacks before pressing Chi-ji
        const tempStats = {...state.setStats};
        const chijiDuration = 25; // todo

        // We'll always combine trinkets with Chi-ji. One weakness of the model here is it doesn't consider that Chi-Ji is front loaded.
        // This could be added later.
        if (onUseData.name === "Signet of the Priory") tempStats.haste += (onUseData.value * onUseData.duration / chijiDuration);
        if (onUseData.name === "House of Cards") tempStats.mastery += (onUseData.value * onUseData.duration / chijiDuration);

        let hastePercentage = getHaste(tempStats);
        if (hasTalent(playerData.talents, "invokersDelight")) hastePercentage *= (1 + 0.2 * 0.8);
        if (hasTalent(playerData.talents, "secretInfusion")) hastePercentage *= (1 + 0.15 * 0.4);
        reportingData.chijiHaste = hastePercentage;
        
        const chijiCasts = (chijiDuration / (1.5 / hastePercentage) - 1) * (1 - localSettings.downtime);  ; // Casting Chiji itself takes away from the # of casts in the window
        const chijiCooldown = 120;

        // Chi Cocoons & Jade Bond
        const chiCocoon = runHeal(state, spellDB["Chi Cocoon"][0], "Chi Cocoon");

        healingBreakdown["Chi Cocoon"] = chiCocoon * (60 / chijiCooldown);

        // Enveloping Breath
        const envelopingCasts = 4; // TODO: make dynamic
        const envelopingHeal = runHeal(state, spellDB["Enveloping Breath"][0], "Enveloping Breath") * envelopingCasts * spellDB["Enveloping Breath"][0].buffDuration * averageHaste;
        healingBreakdown["Enveloping Breath"] = envelopingHeal * (60 / chijiCooldown);

        // Chi-ji Gusts
        // Each damage spell procs 6 total Gusts
        const chijiKicks = chijiCasts - envelopingCasts;
        const castBreakdown = {
            "Tiger Palm": 0.25 * chijiKicks,
            "Rising Sun Kick": 0.25 * chijiKicks,
            "Blackout Kick": 0.5 * chijiKicks,
            "Enveloping Mist": envelopingCasts,
        }

        const chijiProcs = 6 * (4 + castBreakdown["Tiger Palm"] * (hasTalent(playerData.talents, "awakenedJadefire") ? 2 : 1) + castBreakdown["Rising Sun Kick"] + castBreakdown["Blackout Kick"]);
        let chijiMult = 1
        reportingData.chijiGusts = chijiProcs;
        if (hasTalent(playerData.talents, "jadeBond")) chijiMult *= 1.2;

        healingBreakdown["Gust of Mists (Chi-ji)"] = chijiProcs * getMasteryHeal(tempStats) * chijiMult * (60 / chijiCooldown) * (1 - localSettings.chijiGustsOverhealing);
        
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
                spellThroughput += (value * spellCPM);

                if (spell.mastery) {
                    // Spell procs Gust of Mists.
                    const masteryHeal = ((0.1 + getMastery(state.currentStats, MONKCONSTANTS)) * state.currentStats.intellect * getStatMult(state.currentStats, ["crit", "versatility"], {}, MONKCONSTANTS)) * (1 - localSettings.gustsOverhealing);

                    healingBreakdown["Gust of Mists"] = Math.round((healingBreakdown["Gust of Mists"] || 0) + (masteryHeal * spell.mastery * spellCPM));

                }
                // Spell specifics
                if (spellName === "Vivify") {
                    const invig = runHeal(state, playerSpells["Invigorating Mist"][0], "Invigorating Mist");

                    healingBreakdown["Invigorating Mist"] = (healingBreakdown["Invigorating Mist"] || 0) + invig * averageRemCount * spellCPM;

                    const zenPulse = runHeal(state, playerSpells["Zen Pulse"][0], "Zen Pulse");
                    healingBreakdown["Zen Pulse"] = (healingBreakdown["Zen Pulse"] || 0) + zenPulse * averageRemCount * Math.min(zenPulsePPM, spellCPM);
                }
                else if (spellName === "Rising Mist") {
                    spellThroughput *= averageRemCount;
                }
                else if (spellName === "Sheilun's Gift") {
                    spellThroughput *= localSettings.sheilunsClouds;
                }
            }
            else if (spell.type === "damage") {
                // Damage spells
                let value = runDamage(state, spell, spellName);

                if (spellName === "Blackout Kick") {
                    value *= 1 + averageTeachingsStacks;
                }

                if (spell.damageToHeal) {
                    if (spellName === "Courage of the White Tiger") {
                        healingBreakdown["Courage of the White Tiger"] = (healingBreakdown["Courage of the White Tiger"] || 0) + value * spell.damageToHeal * spellCPM;
                    }
                    else healingBreakdown["Ancient Teachings"] = (healingBreakdown["Ancient Teachings"] || 0) + value * spell.damageToHeal * spellCPM  * (1 - localSettings.ancientTeachingsOverhealing);
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
                let oneTickHealing = runHeal(state, oneTick, spellName);
                
                let tickCount = spell.ignoreHaste ? 
                    (spell.buffDuration / (spell.tickData.tickRate))
                        :
                    (spell.buffDuration / (spell.tickData.tickRate / averageHaste));
                let bonusTickCount = 0;
                
                if (spellName === "Renewing Mist") {
                    tickCount *= (localSettings.risingMist.remStandard + 1);
                    tickCount += (freeRenewingMistSec / (spell.tickData.tickRate / averageHaste));
                }
                else if (spellName === "Insurance") {
                    // Get bonus ticks from Renewing Mist casts
                    bonusTickCount += (freeInsuranceProcs * 6 / (spell.tickData.tickRate / averageHaste));
                    oneTickHealing *= (0.5 * Math.min((averageRemCount / 10), 10) + 1);
                }

                spellThroughput += oneTickHealing * (tickCount * spellCPM + bonusTickCount);

            }
            else if (spell.type === "function") {
                //const value = spell.runFunc(state, spell) * spellCPM;
            }

            // Spell Slice complete
            if (spellProfile.mult) spellThroughput *= spellProfile.mult;

            //spellThroughput *= genericHealingIncrease;

            if (spellThroughput > 0)  healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));
           

        });
    })

    // Grace Period
    Object.keys(healingBreakdown).forEach(key => {
        //healingBreakdown[key] *= (1);
        healingBreakdown[key] *= genericHealingIncrease;

        // Chi Harmony
        // This is a fairly rudimentary way to calculate Chi Harmony. Ideally you'd count ReM events instead and use the uptime from those. TODO.
        const chiHarmony = 1 + (0.5 * averageRemCount / 20 * (8/20));
        healingBreakdown[key] *= chiHarmony;
    })

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);
    const totalDamage = sumValues(damageBreakdown);

    // printHealingBreakdown(damageBreakdown, totalDamage);
    // printHealingBreakdown(healingBreakdown, totalHealing);
    //console.log(reportingData);
    // console.log("HPS: " + Math.round(totalHealing / 60));

    return { hps: totalHealing / 60, hpm: 0 }
}