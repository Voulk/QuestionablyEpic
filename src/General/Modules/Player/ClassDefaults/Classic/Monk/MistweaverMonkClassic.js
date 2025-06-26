
import { CLASSICMONKSPELLDB as monkSpells, monkTalents } from "General/Modules/Player/ClassDefaults/Classic/Monk/ClassicMonkSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdown, getSpellEntry, } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT";
import { buildCPM } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";

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
        crit: 0.4,
        mastery: 0.2,
        haste: 0.3,
        mp5: 0.37 * 1.8,
        spirit: 0.37,
        hit: 0,
        hps: 0.7, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: [],
}

// --------------- Monk --------------
export function initializeMonkSet(talents = monkTalents) {
    const testSettings = {spec: "Mistweaver Monk Classic", masteryEfficiency: 1, includeOverheal: "Yes", testMode: "No", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};
  
    let castProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Surging Mist", cpm: 1},
      {spell: "Renewing Mist", efficiency: 0.95 },
      {spell: "Chi Burst", efficiency: 0.8 },
      {spell: "Revival", efficiency: 0.8 },

      {spell: "Uplift", cpm: 3 }, // TODO

      {spell: "Jab", cpm: 5 },
    ]

    const adjSpells = getTalentedSpellDB("Mistweaver Monk", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: talents, spec: "Mistweaver Monk"});
  
    castProfile.forEach(spell => {
      if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
      spell.castTime = monkSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
      spell.healing = 0;
      spell.chiGenerated = monkSpells[spell.spell][0].chiGenerated ? monkSpells[spell.spell][0].chiGenerated : 0;
    })


    const costPerMinute = 0// castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

    //console.log(JSON.stringify(adjSpells));
    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute, talents: talents };
  }
  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreMonkSet(specBaseline, statProfile, userSettings, tierSets = []) {
  const castProfile = specBaseline.castProfile;
  const spec = "Mistweaver Monk";
    let totalHealing = 0;
    let totalDamage = 0;
    const healingBreakdown = {};
    const damageBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;
    const talents = specBaseline.talents || monkTalents;
    const eminenceOverheal = 0.35;

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    const statPercentages = {
      spellpower: statProfile.intellect + statProfile.spellpower,
      crit: 1 + getCritPercentage(statProfile, spec),
      haste: getHaste(statProfile, "Classic") * hasteBuff,
      mastery: (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 1.25, // 1.25 is Monks mastery coefficient.
      weaponDamage: statProfile.weaponDamage,
      attackpower: (statProfile.intellect + statProfile.spellpower) * 2,
      armorReduction: 0.7,
    }

    // Calculate filler CPM
    const manaPool = getManaPool(statProfile, spec);
    const regen = (getManaRegen(statProfile, spec) + 
                  getAdditionalManaEffects(statProfile, spec).additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;

    const totalManaPool = manaPool + regen;

    let fillerCost = 0 //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    const fillerWastage = 0.9;
    let costPerMinute = specBaseline.costPerMinute;

    const fillerCPM = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;
    const chiGenerated = castProfile.reduce((acc, spell) => acc + (spell.chiGenerated ? spell.chiGenerated * spell.cpm : 0), 0);
    const masteryOrbsGenerated = 0;
    const averageRemCount = castProfile.filter(spell => spell.spell === "Renewing Mist")[0]['cpm'] * 18 * 3 / 60;
    getSpellEntry(castProfile, "Uplift").bonus = averageRemCount; // This effectively acts as our Uplift target count.

    // TODO: Uplift refreshes ReM count.
    console.log("REM COUNT: " + averageRemCount)
    console.log("CHI GENERATED: " + chiGenerated)

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
            healingBreakdown["Eminence"] = (healingBreakdown["Eminence"] || 0) + heal;
          }
        }
        else {
          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
          totalHealing += (spellOutput * effectiveCPM);
        }

        })

        // Filler mana

    })

    // Mastery healing

    // Add any natural HPS we have on the set.
    totalHealing += (60 * statProfile.hps || 0)

    // Print stuff.
    printHealingBreakdown(healingBreakdown, totalHealing);
    printHealingBreakdown(damageBreakdown, totalDamage);
    console.log("DPS: " + totalDamage / 60);

    return totalHealing;
}