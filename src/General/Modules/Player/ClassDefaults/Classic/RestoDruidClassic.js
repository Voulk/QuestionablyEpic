
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicDruidSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

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
        hps: 0.7, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: [],
}

// --------------- Druid --------------
export function initializeDruidSet() {
    const testSettings = {spec: "Restoration Druid Classic", masteryEfficiency: 1, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};
  
    const activeStats = {
      intellect: 100,
      spirit: 1,
      spellpower: 100,
      haste: 1,
      crit: 1,
      mastery: 1,
      stamina: 5000,
      critMult: 2,
  }
    const druidCastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Swiftmend", cpm: 3.8},
      {spell: "Wild Growth", cpm: 3.8 * (144 / 180)},
      {spell: "Rejuvenation", cpm: 12 * (144 / 180), fillerSpell: true, castOverride: 1.0},
      {spell: "Nourish", cpm: 5},
      {spell: "Regrowth", cpm: 0.8}, // Paid Regrowth casts
      {spell: "Regrowth", cpm: 2.4, freeCast: true}, // OOC regrowth casts
      {spell: "Rolling Lifebloom", cpm: 6, freeCast: true, castOverride: 0}, // Our rolling lifebloom. Kept active by Nourish.
  
      // Tree of Life casts
      {spell: "Lifebloom", cpm: 13 * (36 / 180), bonus: 1.15}, // Tree of Life - Single stacks
      {spell: "Regrowth", cpm: (6.5 * 36 / 180), freeCast: true, bonus: 1.15}, // Tree of Life OOC Regrowths
      {spell: "Wild Growth", cpm: 3.8 * (36 / 180), bonus: (1.15 * (8/6))}, // Tree of Life Wild Growth
    ]

    const adjSpells = getTalentedSpellDB("Restoration Druid", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: druidTalents, spec: "Restoration Druid"});
  
    druidCastProfile.forEach(spell => {
      spell.castTime = druidSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
      spell.healing = 0;
    })
    const costPerMinute = druidCastProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);
    const playerData = { spec: "Restoration Druid", spells: druidSpells, settings: testSettings, talents: {...druidTalents}, stats: activeStats }
    //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");

    //console.log(JSON.stringify(adjSpells));
    return { castProfile: druidCastProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDruidSet(druidBaseline, statProfile, player, userSettings, tierSets = [], shardOfWoe) {
    let score = 0;
    const healingBreakdown = {};
    const fightLength = 6;

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1) * (hasteSetting.includes("Dark Intent") ? 1.03 : 1)

    const spellpower = statProfile.intellect + statProfile.spellpower;
    const critPercentage = 1.04 + getCritPercentage(statProfile, "Restoration Druid"); // +4% crit
    // Evaluate Stats
    // Spellpower

    // Take care of any extras.
    if (tierSets.includes("Druid T11-4")) {
      statProfile.spirit += 540;
    }
    if (tierSets.includes("Druid T12-2")) {
      // 40% chance on Lifebloom tick to restore 184 mana.
      // Ignoring ToL for now. We know it has some form of reduced proc rate but not how much.
      statProfile.mp5 = (statProfile.mp5 || 0) + (60 * getHaste(statProfile, "Classic") * hasteBuff * 0.4 * 184) / 12;
    }
    if (tierSets.includes("Druid T13-2")) {
        // 25% cost reduction for 15s after pressing Innervate
        const spellsCast = {
            "Wild Growth": 2,
            "Nourish": 2,
            "Swiftmend": 1,
            "Rejuvenation": Math.floor(15-5*1.5/getHaste(statProfile, "Classic")) * 0.8
        }

        const manaSaved = Object.keys(spellsCast).reduce((total, spellName) => {
            const spell = druidBaseline.castProfile.find(spell => spell.spell === spellName);
            
            if (!spell) return total; // Spell can't be found, ignore.

            const spellCost = spell.cost;
            const manaSavedForSpell = spellCost * spellsCast[spellName] * 0.25;


            return total + manaSavedForSpell;
        }, 0); // Start accumulating from 0

        statProfile.mp5 = (statProfile.mp5 || 0) + (manaSaved / 180 * 5);
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
    const fillerWastage = 0.9
    let costPerMinute = druidBaseline.costPerMinute;

    //console.log(totalManaPool);
    //console.log("Rejuv cost: " + fillerCost);
    //console.log("Rejuvs Per Min: " + ((totalManaPool / fightLength) - druidBaseline.costPerMinute) / fillerCost);
    const fillerCPM = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;

    druidBaseline.castProfile.forEach(spellProfile => {
        const fullSpell = druidBaseline.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {
          const genericMult = 1.04 * (spellProfile.bonus ? spellProfile.bonus : 1);
          let critBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0;
          if (tierSets.includes("Druid T11-2") && spellProfile.spell === "Lifebloom") critBonus += 0.05;
          const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (critPercentage + critBonus) : 1;
          const additiveScaling = (spell.additiveScaling || 0) + 1
          const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling : 1;
          let spellHealing = (spell.flat + spell.coeff * spellpower) *
                              (critMult) * // Add base crit
                              (masteryMult) *
                              genericMult;
          
          // Handle HoT
          if (spell.type === "classic periodic") {
            const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (getHaste(statProfile, "Classic") * hasteBuff);
            const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
            const targetCount = spell.targets ? spell.targets : 1;
            let tickCount = Math.round(spell.buffDuration / (adjTickRate));

            if (tierSets.includes("Druid T13-4") && (spellName === "Rejuvenation" || spellName === "Regrowth")) {
                // 10% chance to double the duration of Rejuv / Regrowth HoT
                tickCount *= 1.1;
            }

            if (spellProfile.spell === "Rolling Lifebloom") spellHealing = spellHealing * (spell.buffDuration / spell.tickData.tickRate * haste);
            else spellHealing = spellHealing * tickCount * targetCount;
          }


          // These are functional on the high end, but may run into issues for players with sub 2k haste. This isn't impactful since the trinket is much worse there.
          if (spellProfile.spell === "Rejuvenation" && shardOfWoe && statProfile.haste >= 2032) {
            spellHealing *= (1.2 * 1 / 6 + 5 / 6); // 20% more healing 1/6th of the time.
          }
          if ((spellProfile.spell === "Wild Growth" || spellProfile.spell === "Efflorescence") && statProfile.haste >= 2005) {
            spellHealing *= (1.11 * 1 / 6 + 5 / 6) // 11% more healing 1/6th of the time.
          }

          if (tierSets.includes("Druid T12-4") && spellProfile.spell === "Swiftmend" && spell.type === "heal") {
            // Heal for a portion of the Swiftmend only. No Efflo, effective healing only.
            healingBreakdown["T12-4"] = spellHealing * spellProfile.cpm * 0.9;
            score += spellHealing * spellProfile.cpm * 0.9;
          }
          
          //if (isNaN(spellHealing)) console.log(JSON.stringify(spell));
          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellHealing * spellProfile.cpm);
          score += spellProfile.fillerSpell ? (spellHealing * fillerCPM) : (spellHealing * spellProfile.cpm);

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

    return score;
}