import { getCurrentStats, getMastery, getSpellRaw, getStatMult, getCrit, getHaste, deepCopyFunction, hasTalent, getSpellAttribute, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { applyRaidBuffs, applyTalents, completeCastProfile, convertStatPercentages } from "../Generic/ProfileUtilities";
import { runHeal, runDamage, MONKCONSTANTS } from "General/Modules/Player/ClassDefaults/MistweaverMonk/MistweaverMonkRamps";
import { defaultTalents, monkTalents } from "./MistweaverMonkTalents";
import { STATCONVERSION } from "General/Engine/STAT";

import specSpellDB from "./MistweaverMonkSpellDB.json";
import { MONKSPELLS as spellDB } from "./Archive/MistweaverSpellDBTWW";
import { getTrinketData, getSpellEntry, updateSpellCPM, buildCPM } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";

interface SpellProfile {
    spell: string;
    cpm: number;
    hastedCPM?: boolean;
    mult?: number;
}


export const mistweaverMonkProfile = {
    spec: "Mistweaver Monk",
    name: "Mistweaver Monk Classic",
    scoreSet: scoreMonkSet,
    defaultStatProfile: {
        // Our stats we want to run through the profile.
        // You can change and play with these as much as you want.
        // All user-facing operations will set their own anyway like in Top Gear.
        intellect: 2800,
        haste: 1050,
        crit: 650,
        mastery: 1000,
        versatility: 100,
        stamina: 19000,
        critMult: 2,
    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        intellect: 1,
        crit: 0.5,
        mastery: 0.4,
        versatility: 0.431,
        haste: 0.65,
        hps: 0.304, //
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    defaultTalents: "CgQAAAAAAAAAAAAAAAAAAAAAAAAAAgBAAAAzMzMLLbDzwYmZmZGzYB2gZsox2AyMwGjhZsNGz0stMzwMmFWMzMjZYWGAAYAzMDmZAgBD",
}

const getKickCPM = (spellDB: CastProfile): number => {
    const filteredSpells = spellDB.filter(spell => ["Tiger Palm", "Blackout Kick", "Rising Sun Kick"].includes(spell.spell))
    return filteredSpells.reduce((a, b) => a + b.cpm, 0);
}

const getMasteryHeal = (currentStats: Stats, mult: number = 1): number => {
    return (0.1 + getMastery(currentStats, MONKCONSTANTS)) * currentStats.intellect! * getStatMult(currentStats, ["crit", "versatility"], {}, MONKCONSTANTS)
}

const getTimeUsed = (castProfile: CastProfile, spellDB: Record<string, any[]>, averageHaste: number): number => {
    let timeUsed = 0;
    castProfile.forEach(spellProfile => {
        if (spellDB[spellProfile.spell]) {
            const spell = spellDB[spellProfile.spell][0];
            let castTime = (spell.castTime / averageHaste) || 0;

            if (castTime === 0 && !spell.offGCD) castTime = 1.5 / averageHaste;
            timeUsed += castTime * spellProfile.cpm;
        }
        else console.error("Missing Spell: " + spellProfile.spell)

    }
    )

    return timeUsed;
}

export function scoreMonkSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    console.log("Running Monk Set");
    const fightLength = 300;

    let initialState = {statBonuses: applyRaidBuffs(settings), talents: deepCopyFunction(defaultTalents), heroTree: playerData.heroTree};

    // The state variable that will be passed into each spell calculation.
    const state = { fightLength: fightLength, spec: "Mistweaver Monk", statPercentages: convertStatPercentages(stats, initialState.statBonuses, "Mistweaver Monk",
        playerData.masteryEffectiveness), settings: settings, talents: monkTalents};

    const localSettings: any = { downtime: 0.15, risingMist: { remStandard: 1, remRapidDiffusion: 0.7, envStandard: 0.9 }, gustsOverhealing: 0.4, chijiGustsOverhealing: 0.4, ancientTeachingsOverhealing: 0.14 };

    state.tierSets = playerData.tierSets.filter(effect => effect.type === "set bonus").map(effect => effect.name);

    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    state.spellDB = spellDB;

    const healingBreakdown: Record<string, number> = {}
    const damageBreakdown: Record<string, number> = {}
    const castBreakdown: Record<string, number> = {};

    // Apply Talents
    const talents = initialState.talents;
    defaultTalents(initialState.talents, playerData.profileName ?? "default");
    applyTalents(initialState, spellDB, initialState.statBonuses);

    const reportingData: Record<string, any> = {};
    let genericHealingIncrease = 1.04;
    let freeRenewingMistSec = 0;
    let freeInsuranceProcs = 0;
    let averageTeachingsStacks = 0;

    // Prio: House of Cards > Signet. Only matters if someone is wearing double on-use. Poor thing.
    let onUseData: any = {};

    if (playerData.effects && playerData.effects.filter(effect => effect.name === "Freightrunner's Flask").length > 0) {
        onUseData = getTrinketData("Freightrunner's Flask", playerData.effects.filter(effect => effect.name === "Freightrunner's Flask")[0].level);
        onUseData.name = "Freightrunner's Flask";
        state.currentStats.crit += (onUseData.value * onUseData.duration / 120);
    }


    /*let averageHaste = getHaste(state.currentStats)
        * (1 + 0.15 * 10 * hasTalent(talents, "secretInfusion") / 30) //Potential TODO: SI toward crit for chiji?
        * (1 + 0.2 * 20 * hasTalent(talents, "invokersDelight") / 120)
        * (1 + 0.35 * 40 / 420) // Bloodlust*/
    let averageHaste = state.statPercentages.haste; // TODO

    const castProfile: CastProfile = [
        { spell: "Renewing Mist", cpm: buildCPM(spellDB, "Renewing Mist") },
        { spell: "Enveloping Mist", cpm: 4 }, // This needs to be at a minimum the same as the number of box procs
        //{ spell: "Vivify", cpm: 4, hastedCPM: true },
        { spell: "Tiger Palm", cpm: 7.5, hastedCPM: true },
        { spell: "Blackout Kick", cpm: 6.7, hastedCPM: true },
        { spell: "Rising Sun Kick", cpm: 6.4, hastedCPM: true }, // Adjust CPM dynamically and then lower.
        //{ spell: "Revival", cpm: buildCPM(spellDB, "Revival") },
        //{ spell: "Celestial Conduit", cpm: buildCPM(spellDB, "Celestial Conduit") },
        //{ spell: "Life Cocoon", efficiency: buildCPM(spellDB, "Life Cocoon") }, //

        // "Spells"
        // Here we'll put any procs that we'd like to calculate as if they were spells, even if they aren't buttons we'll press.
        // Note that these should be tagged offGcd in spellDB so we don't calculate cast times for them.
        
        /*{ spell: "Courage of the White Tiger", cpm: 4 * averageHaste + 0.5 },
        { spell: "Strength of the Black Ox", cpm: 4 * averageHaste + 0.5 }, // Identical to White Tiger
        { spell: "Crane Style", cpm: 10, hastedCPM: true }, // This is RPPM. Technically the procs would drop if you don't kick much but this build does.
         */
    ]

    
    // Convert efficiencies to effect CPMs. Handle any special overrides.
    completeCastProfile(castProfile, spellDB, state.statPercentages);


    // Flight of the Red Crane
    // This is 3x haste rppm but realistically you will get less due to having fewer events of RJW.

    //castProfile.push({ spell: "Rising Mist", cpm: getSpellEntry(castProfile, "Rising Sun Kick").cpm });

    // Sheilun's Gift
    localSettings.sheilunsClouds = 0 //Math.min(10, (60 / 8 / getSpellEntry(castProfile, "Sheilun's Gift").cpm))
    reportingData.sheilunsClouds = localSettings.sheilunsClouds;

    // Expected Downtime
    const timeUsed = getTimeUsed(castProfile, spellDB, averageHaste);
    reportingData.timeUsed = timeUsed;

    // TotM
    averageTeachingsStacks = 0// (getSpellEntry(castProfile, "Tiger Palm").cpm * (hasTalent(talents, "awakenedJadefire") ? 2 : 1)) / getSpellEntry(castProfile, "Blackout Kick").cpm;
    if (hasTalent(talents, "xuensGuidance")) averageTeachingsStacks *= 1.15; // Doesn't apply to our base BoK.
    reportingData.averageTeachingsStacks = averageTeachingsStacks;

    // Adjust CPMs
    //getSpellEntry(castProfile, "Jadefire Stomp").cpm += (getKickCPM(castProfile) * 0.12 * 0.6); // High wastage
    reportingData.extraStomps = getKickCPM(castProfile) * 0.12 * 0.5;

    // Rising Mist
    // This section in particular could use more analysis. It's important that Rising Mist scales with haste since it's a key factor in our resets,
    // however modelling getting 5 in a ReM duration is trickier. We also don't want to introduce "fake" breakpoints.
    localSettings.risingMist.remStandard = Math.min(1, (getSpellEntry(castProfile, "Rising Sun Kick").cpm * (40 / 60) / 5 * 0.9));
    localSettings.risingMist.envStandard = Math.min(1, (getSpellEntry(castProfile, "Enveloping Mist").cpm * (hasTalent(talents, "mistWrap") ? 14 : 12 / 60) / 2 * 0.9));


    // Get free Renewing Mists
    // Rapid Diffusion
    if (hasTalent(talents, "rapidDiffusion")) {
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
    const zenPulsePPM = 0// 1.2 + hasTalent(talents, "deepClarity") ? 2 : 0; // TODO
    genericHealingIncrease *= (0.5 * averageRemCount / 20 * (8 / 20) + 1) // TODO: Only applies for 8s so don't count all 20.

    // Uplifted Spirits
    if (hasTalent(talents, "upliftedSpirits")) {
        const adjustedCooldown = 180 - getSpellEntry(castProfile, "Rising Sun Kick").cpm
        getSpellEntry(castProfile, "Revival").cpm = 60 / adjustedCooldown;
        //getSpellEntry(castProfile, "Revival").cpm *= getSpellEntry(castProfile, "Rising Sun Kick").cpm / 180;
    }

    if (true) {
        // Sequence Chi-ji
        // Store 4x TotM stacks before pressing Chi-ji
        const tempStats: any = { ...state.statPercentages };
        const chijiDuration = 25; // todo

        // We'll always combine trinkets with Chi-ji. One weakness of the model here is it doesn't consider that Chi-Ji is front loaded.
        // This could be added later.
        if (onUseData.name === "Freightrunner's Flask") tempStats.haste += (onUseData.value * onUseData.duration / chijiDuration);

        let hastePercentage = tempStats.haste;
        //if (hasTalent(talents, "invokersDelight")) hastePercentage *= (1 + 0.2 * 0.8);
        //if (hasTalent(talents, "secretInfusion")) hastePercentage *= (1 + 0.15 * 0.4);
        reportingData.chijiHaste = hastePercentage;

        const chijiCasts = (chijiDuration / (1.5 / hastePercentage) - 1) * (1 - localSettings.downtime);; // Casting Chiji itself takes away from the # of casts in the window
        const chijiCooldown = 120;

        // Chi Cocoons & Jade Bond
        //const chiCocoon = runHeal(state, spellDB["Chi Cocoon"][0], "Chi Cocoon");

        //healingBreakdown["Chi Cocoon"] = chiCocoon * (60 / chijiCooldown);

        // Enveloping Breath
        const envelopingCasts = 4; // TODO: make dynamic
        //const envelopingHeal = runHeal(state, spellDB["Enveloping Breath"][0], "Enveloping Breath") * envelopingCasts * spellDB["Enveloping Breath"][0].buffDuration * averageHaste;
        //healingBreakdown["Enveloping Breath"] = envelopingHeal * (60 / chijiCooldown);

        // Chi-ji Gusts
        // Each damage spell procs 6 total Gusts
        const chijiKicks = chijiCasts - envelopingCasts;
        const castBreakdown: Record<string, number> = {
            "Tiger Palm": 0.25 * chijiKicks,
            "Rising Sun Kick": 0.25 * chijiKicks,
            "Blackout Kick": 0.5 * chijiKicks,
            "Enveloping Mist": envelopingCasts,
        }

        const chijiProcs = 6 * (4 + castBreakdown["Tiger Palm"] * (hasTalent(talents, "awakenedJadefire") ? 2 : 1) + castBreakdown["Rising Sun Kick"] + castBreakdown["Blackout Kick"]);
        let chijiMult = 1
        reportingData.chijiGusts = chijiProcs;
        if (hasTalent(talents, "jadeBond")) chijiMult *= 1.2;

        healingBreakdown["Gust of Mists (Chi-ji)"] = chijiProcs * getMasteryHeal(tempStats) * chijiMult * (60 / chijiCooldown) * (1 - localSettings.chijiGustsOverhealing);

    }


    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm// * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach((spell: any) => {
            let spellThroughput = 0;

            // Regular spells
            if (spell.type === "heal" && spellProfile.cpm > 0) {
                const value = runHeal(state, spell, spellName);
                spellThroughput += (value * spellCPM);

                if (spell.mastery) {
                    // Spell procs Gust of Mists.
                    const masteryHeal = ((0.1 + getMastery(state.currentStats, MONKCONSTANTS)) * state.currentStats.intellect * getStatMult(state.currentStats, ["crit", "versatility"], {}, MONKCONSTANTS)) * (1 - localSettings.gustsOverhealing);

                    healingBreakdown["Gust of Mists"] = Math.round((healingBreakdown["Gust of Mists"] || 0) + (masteryHeal * spell.mastery * spellCPM));

                }
                // Spell specifics
                if (spellName === "Vivify") {
                    const invig = runHeal(state, spellDB["Invigorating Mist"][0], "Invigorating Mist");

                    healingBreakdown["Invigorating Mist"] = (healingBreakdown["Invigorating Mist"] || 0) + invig * averageRemCount * spellCPM;

                    const zenPulse = runHeal(state, spellDB["Zen Pulse"][0], "Zen Pulse");
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
                    else healingBreakdown["Ancient Teachings"] = (healingBreakdown["Ancient Teachings"] || 0) + value * spell.damageToHeal * spellCPM * (1 - localSettings.ancientTeachingsOverhealing);
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

            if (spellThroughput > 0) healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));


        });
    })

    // Grace Period
    Object.keys(healingBreakdown).forEach(key => {
        //healingBreakdown[key] *= (1);
        healingBreakdown[key] *= genericHealingIncrease;

        // Chi Harmony
        // This is a fairly rudimentary way to calculate Chi Harmony. Ideally you'd count ReM events instead and use the uptime from those. TODO.
        const chiHarmony = 1 + (0.5 * averageRemCount / 20 * (8 / 20));
        healingBreakdown[key] *= chiHarmony;
    })

    let totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    const totalDamage = Object.values(damageBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    if (state.statPercentages.leech) {
        healingBreakdown["Leech"] = state.statPercentages.leech * (totalDamage + totalHealing) * 0.35;
        totalHealing += healingBreakdown["Leech"];
    }

    const result = { damage: totalDamage / 60, healing: totalHealing / 60 }

        if (reporting) {
        const sortedEntries = Object.entries(healingBreakdown)
                            .sort((a, b) => b[1] - a[1])
                           // .map(([key, value]) => `${key}: ${Math.round(value / 60).toLocaleString()} (${((value / totalHealing * 10000) / 100).toFixed(2)}%) - CPM: ${Math.round(100*castProfile.reduce((acc, spell) => acc + ((spell.cpm && (spell.label ? spell.label === key : spell.spell === key)) ? spell.cpm : 0), 0))/100}`);
        const spellBreakdown = []
        sortedEntries.forEach(entry => {
            const realSpellName = castProfile.find(spell => spell.label === entry[0] || spell.spell === entry[0])?.spell || entry[0]
            console.log(realSpellName + " " + entry[0]);
            spellBreakdown.push({
                spellName: entry[0], 
                hps: Math.round(entry[1] / 60), 
                percentHealing: ((entry[1] / totalHealing * 10000) / 100).toFixed(2), 
                overhealing: 0.25,
                cpm: Math.round(100*castProfile.reduce((acc, spell) => acc + ((spell.cpm && (spell.label ? spell.label === entry[0] : spell.spell === entry[0])) ? spell.cpm : 0), 0))/100,
                icon: spellDB[realSpellName] ? spellDB[realSpellName][0].displayInfo.icon : null


            });
        })
        
        console.log(spellBreakdown);
        result.spellBreakdown = spellBreakdown;
    }

    return result;
}