import ItemSet from "../ItemSet";
import TopGearResult from "./TopGearResult";
import { CONSTRAINTS } from "../../../Engine/CONSTRAINTS";

import { getEnchants } from "General/Engine/ItemUtilitiesClassic"
import { getSetting } from "../../../../Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "../../Player/Player";
import { getEffectValue } from "../../../../Retail/Engine/EffectFormulas/EffectEngine"
import { compileStats, buildDifferential, sumScore, deepCopyFunction, setupGems, generateReportCode } from "./TopGearEngineShared"
import { getItemSet } from "Classic/Databases/ClassicItemSetDB"

import { initializeDiscSet, scoreDiscSet } from "General/Modules/Player/ClassDefaults/Classic/Priest/DisciplinePriestClassic"
import { initializeDruidSet, scoreDruidSet } from "General/Modules/Player/ClassDefaults/Classic/Druid/RestoDruidClassic"
import { initializePaladinSet, scorePaladinSet } from "General/Modules/Player/ClassDefaults/Classic/Paladin/HolyPaladinClassic"
import { initializeHPriestSet, scoreHPriestSet } from "General/Modules/Player/ClassDefaults/Classic/Priest/HolyPriestClassic"
import { applyRaidBuffs } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";

// Most of our sets will fall into a bucket where totalling the individual stats is enough to tell us they aren't viable. By slicing these out in a preliminary phase,
// we can run our full algorithm on far fewer items. The net benefit to the player is being able to include more items, with a quicker return.
// This does run into some problems when it comes to set bonuses and could be re-evaluated at the time. The likely strat is to auto-include anything with a bonus, or to run
// our set bonus algorithm before we sort and slice. There are no current set bonuses that are relevant to raid / dungeon so left as a thought experiment for now.
const softSlice = 1500;


// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  return count;
}

// This is a new version of WepCombos that simply stores them in an array instead of in a weird 
// composite "fake item". Top Gear can then separate them after combinations have been built.
export function buildDistinctWepCombos(itemList) {
  let wep_list = [];
  let main_hands = itemList.filter(item => item.slot.includes("1H"));
  let off_hands = itemList.filter(item => item.slot === "Offhand" || item.slot === "Shield");
  let two_handers = itemList.filter(item => item.slot.includes("2H"));
  let combos = []

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      if (main_hand.vaultItem && off_hand.vaultItem) {
        // If both main hand and off hand are vault items, then we can't make a combination out of them.
        continue;
      } else {
        const combo = [main_hand, off_hand];
        combos.push(combo);
      }
    }
  }

  for (let j = 0; j < two_handers.length; j++) {
    combos.push([two_handers[j]]);
  }

  return combos
}

// Unfortunately we aren't able to pass objects through to our worker. This recreates our player object since we'll need it for effect formulas. 
function setupPlayer(player, contentType, castModel) {

  let newPlayer = new Player(player.charName, player.spec, player.charID, player.region, player.realm, player.race, player.statWeights, "Classic");
  //newPlayer = Object.assign(newPlayer, player);

  //newPlayer.castModel[contentType] = new CastModel(newPlayer.getSpec(), contentType);
  //newPlayer.castModel[contentType] = Object.assign(newPlayer.castModel[contentType], castModel);
  return newPlayer;
}

// This function will build our sets for us. 
export function prepareTopGear(rawItemList, player, playerSettings, reforgingOn, reforgeFromOptions, reforgeToOptions) {
  let itemList = deepCopyFunction(rawItemList); // Here we duplicate the users items so that nothing is changed during the process. 
   
  // == Handle Reforging ==
  // The comprehensive way to Reforge is to test every variation. There are five for each item, ignoring DPS-centric stats.
  // You can't reforge to a stat already on an item. So your combinations are:
  // - Stat A -> Stat C or Stat D
  // - Stat B -> Stat C or stat D
  // - No reforge at all.
  let reforgedItems = []; // We'll merge this with our ItemList at the end but we don't want to iterate over any reforged items.
  const reforgeSetting = getSetting(playerSettings, "reforgeSetting");
  //const reforgeFromOptions = ["crit", "mastery", ];
  //const reforgeOptions = ["haste", "spirit"];

  if (reforgingOn) {
    itemList.forEach(item => {
      const itemStats = Object.keys(item.stats).filter(key => ["spirit", "mastery", "crit", "haste"].includes(key));
      const itemReforgeOptions = reforgeToOptions.filter(stat => !itemStats.includes(stat));

      //console.log("Item has stats: " + itemStats + " and reforge options: " + itemReforgeOptions);
      if (reforgeSetting === "Manual") {
        itemStats.forEach(fromStat => {
          // for each stat, add one version that trades a portion of it for another.
          if (reforgeFromOptions.includes(fromStat)) {
            itemReforgeOptions.forEach(targetStat => {

              const newItem = JSON.parse(JSON.stringify(item));
             // console.log("Reforge: " + item.stats[fromStat] * 0.4 + " " +  fromStat + " -> " + targetStat)
              newItem.stats[targetStat] = Math.round(item.stats[fromStat] * 0.4);
              newItem.stats[fromStat] = Math.round(item.stats[fromStat] * 0.6);
              //newItem.uniqueHash = Math.random().toString(36).substring(7);
              //console.log("Reforged " + item.name + " from " + fromStat + " to " + targetStat);
              newItem.flags.push("Reforged: " +  fromStat + " -> " + targetStat)
              newItem.flags.push("ItemReforged");

              reforgedItems.push(newItem);
            })
          }

        });
      }

      // V2 of smart reforge. This will more aggressively pursue haste breakpoints. 
      else if (reforgeSetting === "Smart" && player.spec === "Restoration Druid Classic") {

        const secondaryRank = ["spirit", "mastery", "crit", "hit"]
        // Convert non-haste stats to haste, and haste to crit/mastery/spirit.
        if (itemStats.includes("haste")) {
          
          const targetStat = secondaryRank.find(value => !itemStats.includes(value));
          const newItem = JSON.parse(JSON.stringify(item));
          // console.log("Reforge: " + item.stats[fromStat] * 0.4 + " " +  fromStat + " -> " + targetStat)
          const reforgeAmount = Math.floor(item.stats['haste'] * 0.4);
          newItem.stats[targetStat] = Math.round(reforgeAmount);
          newItem.stats['haste'] = Math.round(item.stats['haste'] - reforgeAmount);
          //newItem.uniqueHash = Math.random().toString(36).substring(7);
          //console.log("Reforged " + item.name + " from " + fromStat + " to " + targetStat);
          newItem.flags.push("Reforged: " +  'haste' + " -> " + targetStat)
          newItem.flags.push("ItemReforged");
          reforgedItems.push(newItem);
          //console.log("reforged item with stats: " + JSON.stringify(itemStats) + " from haste to " + targetStat)
          
        }
        else if (["hit", "crit", "spirit", "mastery"].some(value => itemStats.includes(value))) {
          // Sort first by the secondary with the most stats on the piece. If they are tied, then prio by stat list.
          // Check for tie
          const values = Object.values(item.stats);
          let fromStat = "";
          if (itemStats.includes("hit")) fromStat = "hit";
          else if (values.every(value => value === values[0])) {
            // We have a tie. Just go by the stat list.
            fromStat = secondaryRank.slice().reverse().find(value => itemStats.includes(value));

          }
          else {
            // We do not have a tie, pick the secondary with the highest value to maximize Haste.
            // While hit is included here, a hit reforge should be taken care of in the initial if statement.
            fromStat = Object.keys(item.stats)
                        .filter(key => ['hit', 'crit', 'mastery', 'spirit'].includes(key))
                        .reduce((a, b) => (item.stats[a] > item.stats[b]) ? a : b);
          }
          
          const newItem = JSON.parse(JSON.stringify(item));
          const reforgeAmount = Math.floor(item.stats[fromStat] * 0.4);
          // console.log("Reforge: " + item.stats[fromStat] * 0.4 + " " +  fromStat + " -> " + targetStat)
          newItem.stats['haste'] = Math.round(reforgeAmount);
          newItem.stats[fromStat] = Math.round(item.stats[fromStat] - reforgeAmount);
          //newItem.uniqueHash = Math.random().toString(36).substring(7);
          //console.log("Reforged " + item.name + " from " + fromStat + " to " + targetStat);
          newItem.flags.push("Reforged: " +  fromStat + " -> " + 'haste')
          newItem.flags.push("ItemReforged");
          reforgedItems.push(newItem);
          //console.log("reforged item with stats: " + JSON.stringify(itemStats) + " from " + fromStat + " to haste")
        }
      }

      
  });

  itemList = itemList.concat(reforgedItems);
  //console.log("Total item count: " + itemList.length);
  
  }
  let wepCombosNew = buildDistinctWepCombos(itemList);
  let itemSets = createSets(itemList, wepCombosNew, true);

  return itemSets;
}

export function runTopGearClassic(itemSets, player, contentType, baseHPS, currentLanguage, playerSettings, castModel) {
    console.log("TOP GEAR Classic");
    //console.log("WEP COMBOS: " + JSON.stringify(wepCombos));
    //console.log("CL::::" + currentLanguage);
    var t0 = performance.now();
    let count = 0;


    const newPlayer = setupPlayer(player, contentType, castModel);
    const newModel = newPlayer.getActiveModel("Raid").profile;

    //console.log("Item Count: " + itemList.length);
    //console.log("Sets (Post-Reforge): " + itemSets.length);
    const professions = [getSetting(playerSettings, "professionOne"), getSetting(playerSettings, "professionTwo")];
    const baseline = newModel.initializeSet();

    count = itemSets.length;

    for (var i = 0; i < count; i++) {
      itemSets[i] = evalSet(itemSets[i], newPlayer, contentType, baseHPS, playerSettings, newModel, baseline, professions);
    }

    itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));
    itemSets = pruneItems(itemSets);

    return itemSets;
    
    // Build Differentials
    let differentials = [];
    let primeSet = itemSets[0];
    for (var i = 1; i < Math.min(CONSTRAINTS.Shared.topGearDifferentials+1, itemSets.length); i++) {
      const differential = buildDifferential(itemSets[i], primeSet, newPlayer, contentType);
      if (differential.items.length > 0 || differential.gems.length > 0) differentials.push(differential);

    }
    //itemSets[0].printSet()

    var t1 = performance.now();
    console.log("Total execution time: " + (t1 - t0) + " milliseconds for " + count + " sets. Per set: " + (t1 - t0) / count + " ms.");

    if (itemSets.length === 0) {
      let result = new TopGearResult([], []);
      result.itemsCompared = count;
      return result;
    } else {
      let result = new TopGearResult(itemSets[0], differentials);
      result.itemsCompared = count;
      result.id = generateReportCode();
      return result;
    }
}


function compileSetStats(itemSet) {
  let setStats = {spellpower: 0,
    intellect: 156, // Technically changes per race.
    spirit: 173, // Technically changes per race.
    mp5: 0,
    hps: 0,
    crit: 0,
    mastery: 0,
    haste: 0,
  }

    for (let i = 0; i < itemSet.itemList.length; i++) {
      let item = itemSet.itemList[i];

      for (const [stat, value] of Object.entries(item.stats)) {

        //if (stat in setStats) {
          //setStats[stat as keyof Stats] += value || 0;
          setStats[stat] = (setStats[stat] || 0) + value;
        //}

      }
      
      
      if (item.uniqueEquip) itemSet.uniques[item.uniqueEquip] = (itemSet.uniques[item.uniqueEquip] || 0) + 1;

      if (item.setID) {
        itemSet.sets[item.setID] = (item.setID in itemSet.sets) ? itemSet.sets[item.setID] + 1 : 1;
      }
  
      if (item.effect) {
        let effect = item.effect;
        effect.level = item.level;
        itemSet.effectList.push(effect);
      }
    }


    itemSet.setStats = setStats;

    return itemSet;

}


export function pruneItems(itemSets) {
  return itemSets.slice(0, softSlice);
  }


function verifySet(itemSet) {
  return true;
}


// A true evaluation function on a set.
// THIS IS CLASSIC CODE AND IS NOT COMPATIBLE WITH RETAIL.
function evalSet(itemSet, player, contentType, baseHPS, playerSettings, castModel, baseline, professions) {
    // Get Base Stats
    console.log("Evaluating set: ");
    
    let builtSet = compileSetStats(itemSet);// itemSet.compileStats("Classic");
    let setStats = builtSet.setStats;

    let hardScore = 0;
    const setBonuses = builtSet.sets;
    let effectList = [...itemSet.effectList]
    let tierList = [];
    
    /*if (player.spec === "Restoration Druid Classic") { // && setStats.haste < 1800 && setStats.haste > 1400) {
      // Override test to stop evaluation on a set if it's not looking good.
      builtSet.hardScore = 0;
      builtSet.setStats = setStats;
      builtSet.enchantBreakdown = {};
  
      return builtSet; // Temp
    } */

    // --- Item Set Bonuses ---
    for (const set in setBonuses) {
      if (setBonuses[set] > 1) {
        tierList = tierList.concat(getItemSet(set, setBonuses[set]));
      }
    }

    let enchants = {};
    const reforges = {};
  
    let bonus_stats = {
        intellect: 0,
        spellpower: 0,
        mastery: 0,
        spirit: 0,
        crit: 0,
        stamina: 0,
        mp5: 0,
        haste: 0,
    };

    let enchant_stats = {
      intellect: 0,
      spellpower: 0,
      spirit: 0,
      crit: 0,
      stamina: 0,
      mastery: 0,
      mp5: 0,
      haste: 0,
    };


    /*
    let adjusted_weights = {
      intellect: 1,
      haste: player.statWeights[contentType]["haste"],
      crit: player.statWeights[contentType]["crit"],
      mastery: player.statWeights[contentType]["mastery"],
      versatility: player.statWeights[contentType]["versatility"],
      leech: player.statWeights[contentType]["leech"],
    };
    */

    // Auto reforger
    // Check if we can reach haste breakpoints. If we can, reforge those, then optimize what's left.
    if (player.spec === "Restoration Druid Classic") {
      /*
      const baseStats = itemSet.setStats;
      const baseHaste = itemSet.setStats.haste;
      const secondaryRank = ["spirit", "mastery", "crit"]
      const hasteRanges = [];
      // Loop through each item, if no haste, add haste.
      itemSet.itemList.forEach((item, index) => {

        //const possibleReforges = []
        console.log(JSON.stringify(item.stats));
        if (item.stats.haste === undefined) {
          const fromStat = secondaryRank.slice().reverse().find(value => Object.keys(item.stats).includes(value));
          if (item.stats[fromStat]) hasteRanges.push({id: index, from: fromStat, value: Math.round(item.stats[fromStat] * 0.4)})
        }

      });
      console.log("HASTE");
      console.log(baseStats.haste);
      console.log(JSON.stringify(hasteRanges));
      // Check if we can make it to 2005
      if ((baseHaste + hasteRanges.reduce((a, b) => a + b.value, 0)) >= 1930) {
        // It is possible to form a high haste set. We can now make permanent changes to the item set since we'll go with this.

        hasteRanges.sort((a, b) => (a.value < b.value ? 1 : -1));
        // Greedy reforge crit pieces. Stop if > 1950. We're making changes to the set itself here.
        hasteRanges.forEach(reforge => {
          console.log("Checking crit");
          if (reforge.from === "crit" && setStats.haste < 1930) {
            setStats.haste += reforge.value;
            setStats.crit -= reforge.value;
            itemSet.itemList[reforge.id].flags.push("Reforged: Crit -> Haste")
          }
        });
        // Next greedy reforge mastery pieces
        hasteRanges.forEach(reforge => {
          if (reforge.from === "mastery" && setStats.haste < 1930) {
            setStats.haste += reforge.value;
            setStats.mastery -= reforge.value;
            itemSet.itemList[reforge.id].flags.push("Reforged: Mastery -> Haste")
          }
        });
        hasteRanges.forEach(reforge => {
          if (reforge.from === "spirit" && setStats.haste < 1930) {
            setStats.haste += reforge.value;
            setStats.mastery -= reforge.value;
            itemSet.itemList[reforge.id].flags.push("Reforged: Spirit -> Haste")
          }
        });

        // Check how far over the set is. See if we can make minor changes to fix it. 
      }
      else {
        // We can't make a set with enough haste. Instead we'll just reforge normally while staying above 950 haste. 
        console.log("CANT MAKE SET");
      }



      */
      
    }
    //console.log(JSON.stringify(castModel));
    // If we can't, optimize all pieces.
    if (getSetting(playerSettings, "reforgeSetting") === "Smart") {
      itemSet.itemList.forEach((item, index) => {
        if (item.flags.includes("ItemReforged")) {
          // Do nothing
        }
        else {
          let secondaryRank = castModel.profile.autoReforgeOrder;// player.spec === "Restoration Druid Classic" ? ["spirit", "mastery", "crit", "hit"] : ["haste", "spirit", "crit", "mastery", "hit"];
          const itemStats = Object.keys(item.stats).filter(key => ["spirit", "mastery", "crit", "haste", "hit"].includes(key));
          const fromStat = secondaryRank.slice().reverse().find(value => itemStats.includes(value));
          const toStat = secondaryRank.find(value => !itemStats.includes(value));

          if (fromStat && toStat && secondaryRank.indexOf(fromStat) > secondaryRank.indexOf(toStat)) {
            const reforgeValue = Math.floor(item.stats[fromStat] * 0.4);
            setStats[fromStat] -= reforgeValue;
            setStats[toStat] += reforgeValue;
            reforges[item.id] = "Reforged: " + fromStat + " -> " + toStat;

          }
        }
      });
  }

   let adjusted_weights = {...castModel.baseStatWeights}

    // -- GEMS & ENCHANTS --
    // We could precalculate enchants and auto-fill them each time to save time. Make an exception for like gloves enchant. 
    const compiledGems = setupGems(builtSet.itemList, adjusted_weights, playerSettings)
    builtSet.gems = compiledGems.gems;
    compileStats(setStats, compiledGems.stats);

    if (true) {
      const enchantInfo = getEnchants(playerSettings, professions, (itemSet.itemList.filter(item => item.slot === "Offhand" || item.slot === "Shield").length > 0));
      enchant_stats = enchantInfo.enchantStats;
      enchants = enchantInfo.enchants;
    }

    compileStats(setStats, bonus_stats); // Add the base stats on our gear together with enchants & gems.
    compileStats(setStats, enchant_stats);
    

    // -- Effects --
    let effectStats = [];
    effectStats.push(bonus_stats);
    for (var x = 0; x < effectList.length; x++) {
      effectStats.push(getEffectValue(effectList[x], player, "", contentType, effectList[x].level, playerSettings, "Classic", setStats));
    }
    const compiledEffects = effectStats.reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
          acc[key] = (acc[key] || 0) + value;
      }
      return acc;
    }, {});

    // Any final adjustments.
    if (player.spec === "Restoration Druid Classic") compiledEffects.haste = 0; // Proc based haste needs to be handled in the core profile.
    compileStats(setStats, compiledEffects);
    applyRaidBuffs({}, setStats);
    if (player.spec === "Restoration Druid Classic") {
      setStats.intellect *= 1.06;

      // Set cleanup
      // If Haste < 2005 but > 916 + 208 and we're wearing Eng goggles, then swap the haste gem to mastery.
      if (itemSet.itemList.filter(item => item.id === 59453).length > 0 && setStats.haste < 2005 && setStats.haste > (916 + 208)) {
        setStats.haste -= 208;
        setStats.mastery += 208;
        builtSet.gems[59453] = [52296, 59496, 59480];
      }

    }
    else if (player.spec === "Discipline Priest Classic") {
      setStats.intellect *= 1.15; // Spec passive.
    }

    if (castModel.scoreSet) {
      hardScore = castModel.scoreSet(baseline, setStats, playerSettings, tierList);
    }
    
    else {
      console.error("Invalid Scoring Detected. No scoring function.");
    }
    builtSet.reforges = reforges;
    builtSet.hardScore = Math.round(1000 * hardScore) / 1000;
    builtSet.setStats = setStats;
    builtSet.enchantBreakdown = enchants;

    return builtSet; // Temp
  }

  function mergeStat(stats, statName) {
    return stats.reduce(function(a, b) {
      if (!isNaN(b[statName])) return a + b[statName]
      else return a
    }, 0)
  }
  
  // Merges together an array of bonus_stats.
  export function mergeBonusStats(stats) {
    const val = {
        intellect: mergeStat(stats, 'intellect'),
        spellpower: mergeStat(stats, 'spellpower'),
        spirit: mergeStat(stats, 'spirit'),
        crit: mergeStat(stats, 'crit'),
        mastery: mergeStat(stats, 'mastery'),
        stamina: mergeStat(stats, 'stamina'),
        mp5: mergeStat(stats, 'mp5'),
        haste: mergeStat(stats, 'haste'),
      }
  
    return val;
  
  }

function getSlotLengths(itemList, wepCombos) {
  let slotLengths = {
    Head: 0,
    Neck: 0,
    Shoulder: 0,
    Back: 0,
    Chest: 0,
    Wrist: 0,
    Hands: 0,
    Waist: 0,
    Legs: 0,
    Feet: 0,
    Finger: 0,
    Trinket: 0,
    Weapon: 0,
  };

  for (var i = 0; i < itemList.length; i++) {
    let slot = itemList[i].slot;
    if (slot in slotLengths) {
      slotLengths[slot] += 1;
      splitItems[slot].push(itemList[i]);
    }
  }
  slotLengths.Weapon = Object.keys(wepCombos).length;

  return slotLengths;
}


function createSets(itemList, rawWepCombos, filter) {
  const t0 = performance.now();
  const wepCombos = deepCopyFunction(rawWepCombos);
  let setCount = 0;
  let itemSets = [];
  let slotLengths = {
    Head: 0,
    Neck: 0,
    Shoulder: 0,
    Back: 0,
    Chest: 0,
    Wrist: 0,
    Hands: 0,
    Waist: 0,
    Legs: 0,
    Feet: 0,
    Finger: 0,
    Trinket: 0,
    Weapon: 0,
  };

  let splitItems = {
    Head: [],
    Neck: [],
    Shoulder: [],
    Back: [],
    Chest: [],
    Wrist: [],
    Hands: [],
    Waist: [],
    Legs: [],
    Feet: [],
    Finger: [],
    Trinket: [],
    WeaponSet: [],
  };

  // Test

  for (var i = 0; i < itemList.length; i++) {
    let slot = itemList[i].slot;
    if (slot in slotLengths) {
      slotLengths[slot] += 1;
      splitItems[slot].push(itemList[i]);
    }
  }
  slotLengths.Weapon = Object.keys(wepCombos).length;

  for (var head = 0; head < slotLengths.Head; head++) {
    let softScore = { head: splitItems.Head[head].softScore };
    for (var shoulder = 0; shoulder < slotLengths.Shoulder; shoulder++) {
      softScore.shoulder = splitItems.Shoulder[shoulder].softScore;

      for (var neck = 0; neck < slotLengths.Neck; neck++) {
        softScore.neck = splitItems.Neck[neck].softScore;

        for (var back = 0; back < slotLengths.Back; back++) {
          softScore.back = splitItems.Back[back].softScore;

          for (var chest = 0; chest < slotLengths.Chest; chest++) {
            softScore.chest = splitItems.Chest[chest].softScore;

            for (var wrist = 0; wrist < slotLengths.Wrist; wrist++) {
              softScore.wrist = splitItems.Wrist[wrist].softScore;

              for (var hands = 0; hands < slotLengths.Hands; hands++) {
                softScore.hands = splitItems.Hands[hands].softScore;

                for (var waist = 0; waist < slotLengths.Waist; waist++) {
                  softScore.waist = splitItems.Waist[waist].softScore;

                  for (var legs = 0; legs < slotLengths.Legs; legs++) {
                    softScore.legs = splitItems.Legs[legs].softScore;

                    for (var feet = 0; feet < slotLengths.Feet; feet++) {
                      softScore.feet = splitItems.Feet[feet].softScore;

                      for (var weapon = 0; weapon < slotLengths.Weapon; weapon++) {
                        //softScore.weapon = splitItems.Feet[feet].softScore; //
                        softScore.weapon = wepCombos[weapon].softScore;
                        wepCombos[weapon].slot = "CombinedWeapon";

                        for (var finger = 0; finger < slotLengths.Finger - 1; finger++) {
                          softScore.finger = splitItems.Finger[finger].softScore;

                          for (var finger2 = 1; finger2 < slotLengths.Finger; finger2++) {
                            softScore.finger2 = splitItems.Finger[finger2].softScore;

                            if (splitItems.Finger[finger].id !== splitItems.Finger[finger2].id &&
                                finger < finger2 &&
                                (!splitItems.Finger[finger].name.includes("Planetary Band") || !splitItems.Finger[finger2].name.includes("Planetary Band"))) {
                              for (var trinket = 0; trinket < slotLengths.Trinket - 1; trinket++) {
                                softScore.trinket = splitItems.Trinket[trinket].softScore;

                                for (var trinket2 = 1; trinket2 < slotLengths.Trinket; trinket2++) {
                                  softScore.trinket2 = splitItems.Trinket[trinket2].softScore;

                                  if (splitItems.Trinket[trinket].id !== splitItems.Trinket[trinket2].id
                                    && trinket < trinket2) {

                                        let includedItems = [
                                          splitItems.Head[head],
                                          splitItems.Neck[neck],
                                          splitItems.Shoulder[shoulder],
                                          splitItems.Back[back],
                                          splitItems.Chest[chest],
                                          splitItems.Wrist[wrist],
                                          splitItems.Hands[hands],
                                          splitItems.Waist[waist],
                                          splitItems.Legs[legs],
                                          splitItems.Feet[feet],
                                          splitItems.Finger[finger],
                                          splitItems.Finger[finger2],
                                          splitItems.Trinket[trinket],
                                          splitItems.Trinket[trinket2],
                                          wepCombos[weapon][0],
                                        ];
                                        if (wepCombos[weapon].length > 1) includedItems.push(wepCombos[weapon][1])
                                        let sumSoft = sumScore(softScore);
                                        itemSets.push(new ItemSet(setCount, includedItems, sumSoft, "Classic"));
                                        setCount++;
                                        /*set.compileStats("Classic");
                                        if (set.setStats.haste > 1940) {
                                          itemSets.push(new ItemSet(setCount, includedItems, sumSoft, "Classic"));
                                          setCount++;
                                        }*/

                                    }
                                  }
                                }
                              }
                            }
                          }

                          //console.log("Incl Items: " + JSON.stringify(includedItems) + " " + finger + " " + feet + " " + legs + " " + waist + " " + hands);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
  }

  // console.log("Created " + itemSets.length + " item sets.");
  console.log("Item Set Creation took " + (performance.now() - t0) + " milliseconds.");
  return itemSets;
}


