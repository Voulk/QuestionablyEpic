
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "General/Modules/Player/ClassDefaults/Classic/Druid/ClassicDruidSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdown, getSpellEntry, } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";

export const restoDruidDefaults = {
    spec: "Restoration Druid Classic",
    name: "Restoration Druid Classic",
    scoreSet: scoreDruidSet,
    initializeSet: initializeDruidSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.

    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        spellpower: 1,
        intellect: 3,
        crit: 0.98,
        mastery: 1.1,
        haste: 0.3,
        mp5: 1.7,
        spirit: 1.3,
        hit: 0,
        hps: 0.7, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: [],
}

// --------------- Druid --------------
export function initializeDruidSet(talents) {
    const testSettings = {spec: "Restoration Druid Classic", masteryEfficiency: 1, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};
  
    let castProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Swiftmend", cpm: 3.8},
      {spell: "Wild Growth", cpm: 3.8},
      {spell: "Rejuvenation", cpm: 12, fillerSpell: true, castOverride: 1.0},
      {spell: "Nourish", cpm: 5},
      {spell: "Regrowth", cpm: 0.8}, // Paid Regrowth casts
      {spell: "Regrowth", cpm: 2.4, freeCast: true}, // OOC regrowth casts
      {spell: "Rolling Lifebloom", cpm: 4, freeCast: true, castOverride: 0}, // Our rolling lifebloom. Kept active by Nourish.
  
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

    const adjSpells = getTalentedSpellDB("Restoration Druid", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: talents, spec: "Restoration Druid"});
  
    castProfile.forEach(spell => {
      spell.castTime = druidSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
      spell.healing = 0;
    })

    const costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

    //console.log(JSON.stringify(adjSpells));
    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDruidSet(druidBaseline, statProfile, userSettings, tierSets = [], talents) {
    let score = 0;
    const healingBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    const spellpower = statProfile.intellect + statProfile.spellpower;
    const critPercentage = 1 + getCritPercentage(statProfile, "Restoration Druid"); // +4% crit

    const statPercentages = {
      crit: 1 + getCritPercentage(statProfile, "Restoration Druid"),
      haste: getHaste(statProfile, "Classic") * hasteBuff,
      mastery: (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 1.25
    }

    // Take care of any extras.
    if (tierSets.includes("Druid T13-2")) {
      // Left in as templates but old tier sets now removed.
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
    //const manaSpendEdit = tierSets.includes("Druid T13-2") ? 1 - (0.25 * 15 / 180) : 1;
    // Here we can include anything that edits the cost of our spells. Note that it does cause an average but while the buff is active you are likely to spam.
    // This could be rectified by simulating the entire buff window 

    let fillerCost = druidBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    console.log(fillerCost);
    const fillerWastage = 0.9;
    let costPerMinute = druidBaseline.costPerMinute;

    const fillerCPM = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;

    druidBaseline.castProfile.forEach(spellProfile => {
        const fullSpell = druidBaseline.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {

        // Exception Cases
        
        // Regular cases
        let spellOutput = runClassicSpell(spellName, spell, statProfile, "Restoration Druid", userSettings);


        if (spellProfile.bonus) {
          spellOutput *= spellProfile.bonus; // Any bonuses we've ascribed in our profile.
          console.log("Spell: " + spellProfile.spell + " Bonus: " + spellProfile.bonus);
        }
        

        const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;

        castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
        healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);

        score += (spellOutput * effectiveCPM);

        //console.log("Spell: " + spellProfile.spell + " Healing: " + spellHealing + " (C: " + critMult + ". M: " + masteryMult + ". AS: " + additiveScaling + ")");
        })

        // Filler mana

        
    })
    
    /*Object.keys(healingBreakdown).forEach(spell => {
      healingBreakdown[spell] = Math.round(healingBreakdown[spell]) + " (" + Math.round(healingBreakdown[spell] / score * 10000)/100 + "%)";
    })
    console.log(healingBreakdown); */

    // Handle HPS
    score += (60 * statProfile.hps || 0)
    console.log(castBreakdown);
    printHealingBreakdown(healingBreakdown, score);

    return score;
}