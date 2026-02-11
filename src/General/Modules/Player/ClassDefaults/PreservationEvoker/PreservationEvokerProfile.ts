
import { applyTalents, getSpellEntry, getCPM, applyRaidBuffs, convertStatPercentages, buildCPM, completeCastProfile, printHealingBreakdown, printHealingBreakdownWithCPM, getSpellThroughput, getTimeUsed } from "../Generic/ProfileUtilities";
import { runHeal } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRamps";
import specSpellDB from "./PreservationEvokerSpellDB.json";
import { defaultTalents, evokerTalents } from "./PresEvokerTalents";
import { runSpellScript } from "../Generic/SpellScripts";

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

    const castProfile: CastProfile = [
        //{spell: "Echo", cpm: 0},
        //{spell: "Living Flame O", cpm: 0},
        //{spell: "Living Flame", cpm: 0},
        //{spell: "Echo", cpm: 60 / 5 / 2, hastedCPM: true},
        //{spell: "Dream Breath", cpm: 2},           
        //{spell: "Dream Flight", efficiency: 0.95 },
        {spell: "Temporal Anomaly", efficiency: 0.95, hastedCPM: true },
        //{spell: "Chrono Flame", cpm: 0},     
    ]

    // Assign echo usage
    const echoUsage = {
        "Verdant Embrace": 0.4,
        "Dream Breath": 0.2, 
        "Reversion": 0,
    }
    

    completeCastProfile(castProfile, spellDB, state.statPercentages);
    const spellCosts = Object.fromEntries(Object.keys(spellDB).map((s: string) => [s, spellDB[s][0].cost * 250000 / 100]));


    // Afterimage
    if (playerData.heroTree.includes("Chronowarden")) {
        //getSpellEntry(castProfile, "Living Flame").cpm = getEmpowerCPM(castProfile) * 3;
    }
    

    // Essence Bursts generated
    const essenceBurst = (getCPM(castProfile, "Living Flame O") + getCPM(castProfile, "Living Flame")) * 0.2;

    // Total Echo CPM
    const totalEchoPower = getCPM(castProfile, "Echo") * 1.05 + getCPM(castProfile, "Temporal Anomaly") * 0.45 * 5;

    // Lifebind
    // First, let's work out how much healing we'll include in our Lifebind. Remember this comes at a 40% penalty.
    // We'll need to include the 4pc too if we're running tier.
    const lifebindIncoming = 0;

    //const verdantEmbraceHealing = runHeal(state, spellDB["Verdant Embrace"][0], "Verdant Embrace");
    //healingBreakdown["Echo - Verdant Embrace"] = verdantEmbraceHealing * echoUsage["Verdant Embrace"] * totalEchoPower;
    //healingBreakdown["Lifebind"] = lifebindIncoming * 0.4 * echoUsage["Verdant Embrace"] * totalEchoPower;


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

    // Calculate Time Available
    const timeAvailable = 60 - getTimeUsed(castProfile, spellDB, state.statPercentages.haste);
    reportingData.timeAvailable = timeAvailable;

    // If Energy Loop is taken then you can't actually run out of mana, we can therefore value mana at the number of Echo casts (or Blossom / Echo packages) that
    // you need to convert into Disintegrate casts.

    // However, if you are NOT running Energy Loop, then we need to start cutting casts if mana runs out. Assess which order to cut spells.
    console.log(castProfile);
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

    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    printHealingBreakdown(healingBreakdown, totalHealing);

    console.log(reportingData)
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { healing: totalHealing / 60, damage: 0 }
}