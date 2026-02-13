
import { applyTalents, getSpellEntry, getCPM, applyRaidBuffs, convertStatPercentages, buildCPM, completeCastProfile, printHealingBreakdown, printHealingBreakdownWithCPM, getSpellThroughput, getTimeUsed } from "../Generic/ProfileUtilities";
import { runHeal } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRamps";
import specSpellDB from "./PreservationEvokerSpellDB.json";
import { defaultTalents, evokerTalents } from "./PresEvokerTalents";
import { runSpellScript } from "../Generic/SpellScripts";
import { hasTalent } from "../Generic/RampBase";
import reversionSimData from "./ReversionSimulationData";

export const preservationEvokerProfile = {
    spec: "Preservation Evoker",
    name: "Preservation Evoker",
    scoreSet: scoreEvokerSet,
    defaultStatProfile: { 
        // Our stats we want to run through the profile. 
        // You can change and play with these as much as you want.
        // All user-facing operations will set their own anyway like in Top Gear.
        intellect: 2000,
        haste: 550,
        crit: 550,
        mastery: 550,
        versatility: 550,
        stamina: 19000,
        critMult: 2,
    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        intellect: 1,
        crit: 0.452,
        mastery: 0.2,
        versatility: 0.35,
        haste: 0.3,
        hps: 0.304, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
}


const getReversionAdjDuration = (critChance: number) => {
    // Make sure our crit chance is within bounds.
    const effectiveCritChance = (critChance - 1) * 100;
    if (effectiveCritChance <= 0) return reversionSimData[0];
    if (effectiveCritChance >= reversionSimData.length - 1) return reversionSimData[reversionSimData.length - 1];

    // Split index into the integer part and the decimal part
    const i = Math.floor(effectiveCritChance);
    const fraction = effectiveCritChance - i;

    // Interpolate between array[i] and array[i + 1]
    return reversionSimData[i] + (reversionSimData[i + 1] - reversionSimData[i]) * fraction;

}

const spendEchoes = (castProfile: CastProfile, echoBreakdown: any, echoPower : number) => {
    Object.keys(echoBreakdown).forEach(spell => {
        if (spell === "Merithra's Blessing") {
            // If we echo Merithra's Blessing then we get both Reversion and Merithra's Blessing. 
            castProfile.push({spell: "Reversion", cpm: echoPower * echoBreakdown["Merithra's Blessing"], autoSpell: true, label: "Echo - Reversion"});
        }
        castProfile.push({spell: spell, cpm: echoPower * echoBreakdown[spell], autoSpell: true, label: "Echo - " + spell});
    });
}

const getEmpowerCPM = (castProfile: CastProfile) => {
    return getCPM(castProfile, "Dream Breath") + getCPM(castProfile, "Fire Breath");
}

export function scoreEvokerSet(stats: Stats, playerData: any, settings: PlayerSettings = {}) {
    const spec = "Preservation Evoker"; // We'll pass this to a few functions so it's easier to just define it.
    const fightLength = 6;
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    let initialState = {statBonuses: applyRaidBuffs(settings), talents: evokerTalents, heroTree: playerData.heroTree, settings: settings};
    const reportingData: any = {};

    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    // Apply Talents
    const talents = initialState.talents;
    defaultTalents(initialState.talents, "default", playerData.heroTree);
    applyTalents(initialState, spellDB, initialState.statBonuses);

    const state = { fightLength: 6, spec: spec, statPercentages: convertStatPercentages(stats, initialState.statBonuses, spec, 
                    playerData.masteryEffectiveness), settings: settings, talents: evokerTalents};

    let genericHealingIncrease = 1;
    let genericCritIncrease = 1;
    const incomingDTPS = 20000;

    const castProfile: CastProfile = [
        //{spell: "Living Flame O", cpm: 5},
        //{spell: "Living Flame", cpm: 0},
        {spell: "Echo", cpm: 60 / 5 / 2, hastedCPM: true}, // Do essence stuff separately
        {spell: "Dream Breath", efficiency: 0.9 },         
        {spell: "Fire Breath", efficiency: 0.9 },     
        //{spell: "Dream Flight", efficiency: 0.95 },
        {spell: "Temporal Anomaly", efficiency: 0.95, hastedCPM: true },
        {spell: "Reversion", efficiency: 0.6, hastedCPM: false},
        {spell: "Merithra's Blessing", cpm: 2, autoSpell: true }
    ]

    // Assign echo usage
    const echoUsage: Record<string, number> = {
        "Verdant Embrace": 0.1,
        "Dream Breath": 0, 
        "Reversion": 0,
        "Merithra's Blessing": 0.9, // This also includes Reversion
    }
    

    completeCastProfile(castProfile, spellDB, state.statPercentages);
    const spellCosts = Object.fromEntries(Object.keys(spellDB).map((s: string) => [s, spellDB[s][0].cost * 250000 / 100]));

    const adjReversionDuration = getReversionAdjDuration(state.statPercentages.crit);
    reportingData.adjReversionDuration = adjReversionDuration;
    reportingData.critChance = state.statPercentages.crit;
    spellDB["Reversion"][0].buffDuration = adjReversionDuration;

    // Afterimage
    if (playerData.heroTree.includes("Chronowarden")) {
        //getSpellEntry(castProfile, "Living Flame").cpm = getEmpowerCPM(castProfile) * 3;
    }

    let essenceAvailable = 60 / 5 / 2 * state.statPercentages.haste; // Base Essence Gen
    
    // Leaping Flames
    if (hasTalent(talents, "Leaping Flames")) {
        // We will cast Fire Breath at rank 3 and get 3 free Living Flames.
        const freeFlames = 3;
        castProfile.push({spell: "Living Flame", cpm: getCPM(castProfile, "Fire Breath") * freeFlames, autoSpell: true});
    }

    // Natty bursts from LF / Reversion
    let essenceBurstCount = (getCPM(castProfile, "Living Flame O") + getCPM(castProfile, "Living Flame")) * 0.2;

    // Talented bursts

    // Extra bursts from Echo -> Reversion casts

    


    // Total Echo CPM
    const echoMult = 1 + (hasTalent(talents, "Time Lord") ? 0.5 : 0) + (playerData.heroTree.includes("Chronowarden") ? 0.1 : 0);   
    let totalEchoEvents = getCPM(castProfile, "Echo") + getCPM(castProfile, "Temporal Anomaly") * 5;
    let totalEchoPower = (getCPM(castProfile, "Echo") * 0.7 + getCPM(castProfile, "Temporal Anomaly") * 0.3 * 5) * echoMult;
    reportingData.totalEchoPower = totalEchoPower; 
    reportingData.totalEchoEvents = totalEchoEvents;

    // Handle reversions own burst chance
    const reversionBursts = totalEchoEvents * 0.225 * (echoUsage["Reversion"] + echoUsage["Merithra's Blessing"]);
    essenceBurstCount += reversionBursts;
    castProfile.push({spell: "Echo", cpm: reversionBursts, autoSpell: true});
    totalEchoEvents += reversionBursts;
    totalEchoPower += reversionBursts * 0.7 * echoMult;

    reportingData.essenceBurstCount = essenceBurstCount;

    spendEchoes(castProfile, echoUsage, totalEchoPower);


    // Fillers
    const manaPool = 250000;
    const regen = manaPool * 0.04 * 12;

    const manaAvailable = manaPool / fightLength + regen;
    reportingData.manaAvailable = manaAvailable;

    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.autoSpell ? 0 : (spellCosts[spell.spell] * spell.cpm! * (spell.manaOverride || 1))), 0);
    reportingData.baselineCostPerMinute = baselineCostPerMinute;

    /*castProfile.forEach(spellEntry => {
        console.log(`${spellEntry.spell}: CPM ${spellEntry.cpm}, Cost per cast: ${spellCosts[spellEntry.spell] * (spellEntry.manaOverride || 1)}
        Total Cost per minute: ${spellEntry.autoSpell? 0 : spellCosts[spellEntry.spell] * spellEntry.cpm! * (spellEntry.manaOverride || 1)}
        at a discount of ${((1 - (spellEntry.manaOverride || 1)) * 100)}%`);
    })*/

    const fillerMana = manaAvailable - baselineCostPerMinute;
    reportingData.fillerManaPerMinute = fillerMana;


    // If Energy Loop is taken then you can't actually run out of mana, we can therefore value mana at the number of Echo casts (or Blossom / Echo packages) that
    // you need to convert into Disintegrate casts.
    const disintCasts = Math.max(0,(-fillerMana / 9000));
    reportingData.fillerManaPerMinute += disintCasts * 9000;
    const blossomCasts = (essenceBurstCount - disintCasts) * 0.8;
    const bonusEchoCasts = (essenceBurstCount - disintCasts) * 0.2;
    castProfile.push({spell: "Emerald Blossom", cpm: blossomCasts});
    castProfile.push({spell: "Disintegrate", cpm: disintCasts});
    castProfile.push({spell: "Echo", cpm: bonusEchoCasts});

    // Calculate Time Available
    const timeAvailable = 60 - getTimeUsed(castProfile, spellDB, state.statPercentages.haste);
    reportingData.timeAvailable = timeAvailable;

    // Use remaining time on Living Flame
    const fillerPackage = spellDB["Living Flame O"][0].castTime * 5 + spellDB["Emerald Blossom"][0].castTime; // 5 Living Flames & an Emerald Blossom
    const fillerCPM = timeAvailable / fillerPackage;
    castProfile.push({spell: "Living Flame O", cpm: fillerCPM * 5});
    castProfile.push({spell: "Emerald Blossom", cpm: fillerCPM });


    // However, if you are NOT running Energy Loop, then we need to start cutting casts if mana runs out. Assess which order to cut spells.

    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData) => {
            let spellOutput = 0;

            if (slice.customScript) {
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else if (slice.spellType === "heal" || (slice.spellType === "buff" && slice.buffType === "heal")) {
                spellOutput = getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, spellFlags)
            }


            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            const totalOutput = (spellOutput * effectiveCPM * (spellProfile.mult || 1));
            if (totalOutput > 0) {
                const label = spellProfile.label || spellName;

                castBreakdown[label] = (castBreakdown[label] ?? 0) + (effectiveCPM);
                healingBreakdown[label] = (healingBreakdown[label] ?? 0) + (totalOutput);

            }

        })

    })

    // Handle special spells
    const reversionApexHealing = getCPM(castProfile, "Reversion") * adjReversionDuration * incomingDTPS * 0.04;
    healingBreakdown["Reversion (DR)"] = reversionApexHealing;

    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    printHealingBreakdown(healingBreakdown, totalHealing);

    console.log(reportingData)
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { healing: totalHealing / 60, damage: 0 }
}