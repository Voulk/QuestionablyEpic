
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "General/Modules/Player/ClassDefaults/Classic/Druid/ClassicDruidSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getHasteClassic } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT";
import { buildCPM } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";

export const restoDruidDefaults = {
    spec: "Restoration Druid Classic",
    name: "Restoration Druid Classic",
    scoreSet: scoreDruidSet,
    initializeSet: initializeDruidSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.
      intellect: 21000,
      spirit: 9000,
      spellpower: 7907,
      averageDamage: 5585,
      weaponSwingSpeed: 3.4,
      haste: 3043,
      crit: 8000,
      mastery: 9000,
      stamina: 5000,
      mp5: 0,
      critMult: 2,
      hps: 0,

    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        spellpower: 1,
        intellect: 1.11,
        crit: 0.348,
        mastery: 0.427,
        haste: 0.25,
        mp5: 0.614,
        spirit: 0.431,
        hit: 0,
        hps: 0.458, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["mastery", "spirit", "crit", "haste", "hit"],
}

// --------------- Druid --------------
export function initializeDruidSet(talents = druidTalents) {
    const testSettings = {spec: "Restoration Druid Classic", masteryEfficiency: 1, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};
  
    let castProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Swiftmend", cpm: 3.5, bonus: 1.2},
      {spell: "Wild Growth", cpm: 3.8},
      {spell: "Rejuvenation", cpm: 4, fillerSpell: true, castOverride: 1.0},
      {spell: "Regrowth", cpm: 0.8}, // Paid Regrowth casts
      {spell: "Regrowth", cpm: 2.4, freeCast: true}, // OOC regrowth casts
      {spell: "Rolling Lifebloom", cpm: 4, freeCast: true, castOverride: 0}, // Our rolling lifebloom. Kept active by Nourish.
      {spell: "Efflorescence", cpm: 2, freeCast: true, castOverride: 0}, // Rolling Efflorescence.
      {spell: "Wild Mushroom: Bloom", cpm: 2}, 
      {spell: "Tranquility", efficiency: 0.9}, 

    ]

    if (talents.incarnation.points === 1) {
      getSpellEntry(castProfile, "Wild Growth").cpm *= (144 / 180);
      getSpellEntry(castProfile, "Rejuvenation").cpm *= (144 / 180);

      castProfile = castProfile.concat([
        // Tree of Life casts
        {spell: "Lifebloom", cpm: 13 * (36 / 180), bonus: 1.15}, // Tree of Life - Single stacks
        {spell: "Regrowth", cpm: (6.5 * 36 / 180), freeCast: true, bonus: 1.15}, // Tree of Life OOC Regrowths
        {spell: "Wild Growth", cpm: 3.8 * (36 / 180), bonus: (1.15 * (8/6))}, // Tree of Life Wild Growth
      ])
    }

    if (talents.yserasGift.points === 1) {
      castProfile.push({spell: "Ysera's Gift", cpm: 12, freeCast: true, castOverride: 0}); // Ysera's Gift
    }

    const adjSpells = getTalentedSpellDB("Restoration Druid", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: talents, spec: "Restoration Druid"});
  
    castProfile.forEach(spell => {
      if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
      spell.castTime = druidSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
      spell.healing = 0;
    })

    const costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

    //console.log(JSON.stringify(adjSpells));
    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute, talents: talents };
  }
  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDruidSet(druidBaseline, statProfile, userSettings, tierSets = []) {
    let score = 0;
    const healingBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;
    const talents = druidBaseline.talents || druidTalents;
    const castProfile = JSON.parse(JSON.stringify(druidBaseline.castProfile));

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    const statPercentages = {
      spellpower: statProfile.intellect + statProfile.spellpower,
      crit: 1 + getCritPercentage(statProfile, "Restoration Druid"),
      haste: getHasteClassic(statProfile, hasteBuff),
      mastery: (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 1.25, // 1.25 is Resto Druids mastery coefficient.
    }

    // Take care of any extras.
    if (tierSets.includes("Druid T14-2")) {
      getSpellEntry(castProfile, "Rejuvenation").cost *= 0.9; // T14-2 - Rejuv cost reduction
    }
    if (tierSets.includes("Druid T14-4")) {
      // The CDR on Swiftmend is also a big deal for SotF. We should probably just move SotF code here. 
      getSpellEntry(castProfile, "Swiftmend").cpm = 3.5 * 1.2; 
    }


    // Soul of the Forest
    if (talents.soulOfTheForest.points === 1) {
      const wildGrowthPercentage = 1;
      getSpellEntry(druidBaseline.castProfile, "Wild Growth").hasteBonus = 1;
    }

    // Calculate filler CPM
    const manaPool = getManaPool(statProfile, "Restoration Druid");
    const regen = (getManaRegen(statProfile, "Restoration Druid") + 
                  getAdditionalManaEffects(statProfile, "Restoration Druid").additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;

    const totalManaPool = manaPool + regen;

    let fillerCost = druidBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    const fillerWastage = 0.9;
    let costPerMinute = druidBaseline.costPerMinute;

    const fillerCPM = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;


    getSpellEntry(castProfile, "Rejuvenation").cpm += fillerCPM;

    castProfile.forEach(spellProfile => {
        const fullSpell = druidBaseline.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {

        // Exception Cases
        
        // Regular cases
        let spellOutput = runClassicSpell(spellName, spell, statPercentages, "Restoration Druid", userSettings);


        if (spellProfile.bonus) {
          spellOutput *= spellProfile.bonus; // Any bonuses we've ascribed in our profile.
        }
        
        const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;


        castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
        healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);

        score += (spellOutput * effectiveCPM);

        })

        // Filler mana

        
    })

    // Handle HPS
    score += (60 * statProfile.hps || 0)
    //printHealingBreakdownWithCPM(healingBreakdown, score, druidBaseline.castProfile);

    return {damage: 0, healing: score};
}