
import { CLASSICMONKSPELLDB as monkSpells, monkTalents } from "General/Modules/Player/ClassDefaults/Classic/Monk/ClassicMonkSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdown, getSpellEntry, getTimeUsed, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT";
import { buildCPM } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";

// Proper Classic Settings
// Fight Timer, Enemy Targets, Include Overheal, Reporting, Haste Buff
// Spec Specific: 


const getMasteryChance = (statProfile, spell) => {
  const mastery = getMastery(statProfile, "Mistweaver Monk") - 1; // Chance of proccing a mastery orb.

  return (mastery * spell.masteryScalar) || 0;

}

export const mistweaverMonkDefaults = {
    spec: "Mistweaer Monk Classic",
    name: "Mistweaver Monk Classic",
    scoreSet: scoreMonkSet,
    initializeSet: initializeMonkSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.

    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        spellpower: 1,
        intellect: 1.1,
        crit: 0.45,
        mastery: 0.2,
        haste: 0.3,
        mp5: 0.37 * 1.8,
        spirit: 0.32,
        hit: 0,
        hps: 0.7, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["crit", "spirit", "mastery", "haste", "hit"],
}

// --------------- Monk --------------
export function initializeMonkSet(talents = monkTalents, ignoreOverhealing = false) {
    const testSettings = {spec: "Mistweaver Monk Classic", masteryEfficiency: 1, includeOverheal: ignoreOverhealing ? "No" : "Yes", testMode: "No", reporting: true, alwaysMastery: true, fightTimer: 300};
  
    let castProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Surging Mist", cpm: 1},
      {spell: "Renewing Mist", efficiency: 0.95 },
      {spell: "Chi Burst", efficiency: 0.8 },
      {spell: "Revival", efficiency: 0.8 },
      {spell: "Expel Harm", efficiency: 0.75 },

      {spell: "Melee", cpm: 0 }, // TODO
      {spell: "Jab", cpm: 1 }, // TODO
      {spell: "Tiger Palm", cpm: 0, bonus: 2.5 }, // TODO

      {spell: "Uplift", cpm: 0 }, // TODO
      {spell: "Blackout Kick", cpm: 2, bonus: 2.5}, // Tiger Power
    ]

    const adjSpells = getTalentedSpellDB("Mistweaver Monk", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: talents, spec: "Mistweaver Monk"});
    
    if (talents.rushingJadeWind.points === 1) {
      castProfile.push({spell: "Rushing Jade Wind", efficiency: 0.6});
    }
    else if (talents.invokeXuen.points === 1) {
      castProfile.push({spell: "Invoke Xuen, the White Tiger", bonus: 1.2, cpm: Math.ceil(testSettings.fightTimer / 180) / (testSettings.fightTimer / 60)});
    }

    castProfile.forEach(spell => {
      if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
      spell.castTime = monkSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
      spell.healing = 0;
      spell.chiGenerated = monkSpells[spell.spell][0].chiGenerated ? monkSpells[spell.spell][0].chiGenerated : 0;
    })

    const costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

    //console.log(JSON.stringify(adjSpells));
    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute, talents: talents };
  }


  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreMonkSet(specBaseline, statProfile, userSettings, tierSets = []) {
  const castProfile = JSON.parse(JSON.stringify(specBaseline.castProfile));
  const reporting = false;
  const spec = "Mistweaver Monk";
    let totalHealing = 0;
    let totalDamage = 0;
    const reportingData = {}
    const healingBreakdown = {};
    const damageBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;
    const talents = specBaseline.talents || monkTalents;
    const eminenceOverheal = 0.35;
    const isTwoHander = statProfile.weaponSwingSpeed > 2.8;

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    const statPercentages = convertStatPercentages(statProfile, hasteBuff, spec);

    reportingData.statPercentages = statPercentages;

    // Calculate filler CPM
    const manaPool = getManaPool(statProfile, spec);
    const regen = (getManaRegen(statProfile, spec) + 
                  getAdditionalManaEffects(statProfile, spec).additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;

    const totalManaPool = manaPool + regen;
    const manaTeaReturn = manaPool * 0.05;
    const manaTeaEffectiveStacks = statPercentages.crit;
    const manaTeaEffectiveReturn = manaTeaReturn * manaTeaEffectiveStacks; 
    const muscleMemoryReturn = manaPool * 0.04;

    let fillerCost = 0 //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    const fillerWastage = 0.9;

    // Our profile defined our base casts, now we'll use our actual stat line to determine how to spend our filler. This is quite a significant amount of time as MW.
    let timeAvailable = 60 - getTimeUsed(castProfile, specBaseline.spellDB, statPercentages.haste);
    

    let costPerMinute = specBaseline.costPerMinute;

    const fillerCPM = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;
    const chiGenerated = castProfile.reduce((acc, spell) => acc + (spell.chiGenerated ? spell.chiGenerated * spell.cpm : 0), 0);
    let masteryOrbsGenerated = 0;
    const renewingMistDuration = 18;
    const averageRemCount = castProfile.filter(spell => spell.spell === "Renewing Mist")[0]['cpm'] * renewingMistDuration * 3 / 60;

    // Melee swings (proc Eminence)
    
    const meleeWastage = 0.8;
    getSpellEntry(castProfile, "Melee").cpm = (60 / (isTwoHander ? statProfile.weaponSwingSpeed / 1.4 : statProfile.weaponSwingSpeed)) * meleeWastage * statPercentages.haste; 
    if (!isTwoHander) getSpellEntry(castProfile, "Melee").bonus = 1.7;

    // Add Rem extensions
    // 9 Rems out at an average remaining duration of 9 = 81 seconds of Renewing Mist gained.
    const freeRenewingMistSeconds = averageRemCount * renewingMistDuration / 2 * 0.9; // Slightly lossy
    getSpellEntry(castProfile, "Renewing Mist").cpm += freeRenewingMistSeconds / renewingMistDuration / 3;

    specBaseline.spellDB["Uplift"][0].targets = averageRemCount + freeRenewingMistSeconds / renewingMistDuration; // Set our Uplift target count based on our average Renewing Mist count.
    //getSpellEntry(castProfile, "Uplift").bonus = averageRemCount; // This effectively acts as our Uplift target count.
    reportingData.upliftTargets = specBaseline.spellDB["Uplift"][0].targets;

    let manaRemaining = (totalManaPool - (costPerMinute * fightLength)) / fightLength; // How much mana we have left after our casts to spend per minute.
    manaRemaining += (chiGenerated / 4 * manaTeaEffectiveReturn); // Include Mana tea returns from our base profile.
    reportingData.manaRemaining = manaRemaining;
    reportingData.manaPool = totalManaPool;

    // Spend existing Chi on Uplift
    getSpellEntry(castProfile, "Uplift").cpm += chiGenerated / 2; // First, allocate any Chi we already generate to Uplift.
    timeAvailable -= chiGenerated / 2;
    
    // Spend all available time on our efficient Jab -> TP rotation. There's no way to go oom so we won't check our mana.
    // It's not mana positive but it basically is. 
    const tigerPalmPackageCost = getSpellEntry(castProfile, "Jab")['cost'] - (manaTeaEffectiveReturn / 4) - muscleMemoryReturn; // Cost of Jab -> Tiger Palm
    let tigerPalmPackagesAvailable = timeAvailable / 2; // Each combo takes 2s.

    // Next, replace casts with Jab -> Jab -> Uplift packages as mana allows.
    // This lets us spend all available GCDs while still maximizing healing. Note that there are multiple good strategies for Monk
    // and you could add others here that instead try and maximize DPS or pure HPS. The default model is a bit of a hybrid.
    

    const upliftPackageCost = getSpellEntry(castProfile, "Jab")['cost'] * 2 - (manaTeaEffectiveReturn / 2); // Cost of Jab -> Jab -> Uplift
    const manaDifference = upliftPackageCost - tigerPalmPackageCost; // 

    reportingData.upliftPackageCost = upliftPackageCost;
    const packagesAvailable = manaRemaining / manaDifference; 
    reportingData.packagesAvailable = packagesAvailable;
    getSpellEntry(castProfile, "Uplift").cpm += packagesAvailable; // Spend 80% of our mana on Uplift packages.
    getSpellEntry(castProfile, "Jab").cpm += packagesAvailable + tigerPalmPackagesAvailable; // Spend 80% of our mana on Uplift packages.
    getSpellEntry(castProfile, "Tiger Palm").cpm += tigerPalmPackagesAvailable - packagesAvailable;
    
    timeAvailable -= packagesAvailable * 3.025;

    reportingData.upliftRatio = packagesAvailable / (tigerPalmPackagesAvailable - packagesAvailable)

    // Spend the rest of our available mana on Jab -> Tiger Palm.


    // Get cost of Jab -> Tiger Palm

    reportingData.averageRemCount = averageRemCount;
    reportingData.chiGenerated = chiGenerated;
    reportingData.masteryOrbsGenerated = masteryOrbsGenerated;

    // TODO: Uplift refreshes ReM count.

    castProfile.forEach(spellProfile => {
        const fullSpell = specBaseline.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {

        // Exception Cases
        
        // Regular cases
        if (spell.type === "buff" && spell.buffType === "special") return;
        let spellOutput = runClassicSpell(spellName, spell, statPercentages, spec, userSettings);

        if (spellProfile.bonus) {
          spellOutput *= spellProfile.bonus; // Any bonuses we've ascribed in our profile.
          
        }
        
        const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;

        castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
        if (spell.type === "damage" || spell.buffType === "damage") {
          damageBreakdown[spellProfile.spell] = (damageBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
          totalDamage += (spellOutput * effectiveCPM);

          if (spell.damageToHeal) {

            const heal = spellOutput * spell.damageToHeal * effectiveCPM * (1 - eminenceOverheal);
            masteryOrbsGenerated += (0.3 * (spell.targets || 1) * effectiveCPM);
            healingBreakdown["Eminence_" + spellName] = (healingBreakdown["Eminence_" + spellName] || 0) + heal;
            totalHealing += heal;

            //reportingData['Eminence_' + spellName] = (reportingData['Eminence_' + spellName] || 0) + heal;
          }
        }
        else {
          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
          totalHealing += (spellOutput * effectiveCPM);

          if (spellName === "Renewing Mist") {
            const adjTickRate = Math.ceil((spell.tickData.tickRate / statPercentages.haste - 0.0005) * 1000)/1000;
            let tickCount = Math.round(spell.buffDuration / (adjTickRate));
            masteryOrbsGenerated += (getMasteryChance(statProfile, spell) * spell.targets * tickCount * effectiveCPM);

          }
          else masteryOrbsGenerated += (getMasteryChance(statProfile, spell) * (spell.targets || 1) * effectiveCPM);
          
        }
        })

        // Filler mana

    })

    // Mastery healing
    reportingData.masteryOrbsGenerated = masteryOrbsGenerated;
    const masteryHealing = runClassicSpell("Mastery: Gift of the Serpent", specBaseline.spellDB["Mastery: Gift of the Serpent"][0], statPercentages, spec, userSettings);
    healingBreakdown["Mastery: Gift of the Serpent"] = masteryHealing * masteryOrbsGenerated;
    totalHealing += masteryHealing * masteryOrbsGenerated;

    // Add any natural HPS we have on the set.
    totalHealing += (60 * statProfile.hps || 0)

    // Print stuff.
    if (reporting) {
      printHealingBreakdown(healingBreakdown, totalHealing);
      printHealingBreakdown(damageBreakdown, totalDamage);
      console.log("DPS: " + totalDamage / 60);
      reportingData.timeAvailable = timeAvailable;
    }

    //console.log(reportingData);
    //console.log(castProfile);

    return {damage: totalDamage, healing: totalHealing};
}