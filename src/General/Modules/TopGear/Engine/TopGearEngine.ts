import ItemSet from "../ItemSet";
import TopGearResult from "./TopGearResult";
import { STATCONVERSION } from "../../../Engine/STAT";
import { CONSTRAINTS } from "../../../Engine/CONSTRAINTS";
import { convertPPMToUptime, getSetting } from "../../../../Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "../../Player/Player";
import CastModel from "../../Player/CastModel";
import { getEffectValue } from "../../../../Retail/Engine/EffectFormulas/EffectEngine";
import { applyDiminishingReturns, getAllyStatsValue, getGemElement, getGems } from "General/Engine/ItemUtilities";
import { getTrinketValue } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketEffectFormulas";
import { allRamps, allRampsHealing, getDefaultDiscTalents } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampUtilities";
import { buildRamp } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampGen";
import { getItemSet } from "Classic/Databases/RetailItemSetDB";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import { getCircletEffect } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/CyrcesCircletData"
import { generateReportCode } from "General/Modules/TopGear/Engine/TopGearEngineShared"
import Item from "General/Items/Item";
import { gemDB } from "Databases/GemDB";
import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";

/**
 * == Top Gear Engine ==
 * The functions within have two primary functions.
 * - To build viable sets of gear. A viable set of gear will have one item in each slot (two for rings and trinkets). Any sets with multiple legendaries, or unique items that clash
 *   are auto-discarded.
 * - To evaluate each viable set to see which is best. Sets similar in strength will be listed as competitive alternatives.
 */

const softSlice = 3000;
const DR_CONST = 0.00327669230769231; // 0.00497669230769231;
const DR_CONSTLEECH = 0.04922569230769231;

// This is just a timer function. We might eventually just move it to a timeUtility file for better re-use.
export function expensive(time: number) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  return count;
}

// Top Gear sets are run on their own thread. This can make passing full objects with functions tricky. This function recreates our player object since we'll need it
// for effect formulas. Think of it as creating a clone of our player by creating a new one and giving it the attributes that the last one had.
// We put false as the "getImages" prop for player so that the API call to get the players images do not run during Top Gear.
// TODO: investigate how it handles imported logs compared to live branch.
function setupPlayer(player: Player, contentType: contentTypes, castModel: any) {
  let newPlayer = new Player(player.charName, player.spec, player.charID, player.region, player.realm, player.race, "", "Retail");
  //newPlayer.castModel[contentType] = new CastModel(newPlayer.getSpec(), contentType);
  //newPlayer.castModel[contentType] = Object.assign(newPlayer.castModel[contentType], castModel);

  newPlayer.activeModelID = player.activeModelID;

  return newPlayer;
}

/**
 * This is an optional setting to automatically add sockets to items that are in compatible slots, but don't have one already.
 * It's a useful way for players to see if something is an upgrade should they have spare sockets.
 * Dom slots excluded.
 * @param itemList
 * @returns A modified itemList with sockets on compatible slots.
 */
function autoSocketItems(itemList: Item[]) {
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    if (item.id === 228411) item.socket = 0;
    else if (["Head", "Wrist", "Waist"].includes(item.slot) && item.id !== 203460) {
      item.socket = 1;
    }
    else if (item.slot === "Neck" || item.slot === "Finger") {
      item.socket = 2;
    }
  }

  return itemList;
}

// This just grab the ID for us so that we're less likely to make errors.
function getGemID(bigStat: string, littleStat: string): number {
  const foundGem = gemDB.filter(gem => bigStat in gem.stats && littleStat in gem.stats
                                        && gem.stats[bigStat] === 147 && gem.stats[littleStat] === 49);
  if (foundGem.length > 0) {
    return foundGem[0].id;
  }
  else return 192945; // Default fallback. Report error.                               
}

// Return an array of gem IDs based on the spec and content type. 
function getTWWGemOptions(spec: string, contentType: contentTypes, settings: PlayerSettings) {
  const metaGem = 213746; // Elusive Meta Gem
  if (spec === "Holy Paladin") {
    // Crit / haste, crit / mastery
    if (contentType === "Raid") {
      return [metaGem, getGemID('haste', 'mastery'), getGemID('mastery', 'haste'), getGemID('crit', 'haste'), getGemID('versatility', 'haste'),
        getGemID('haste', 'mastery'), getGemID('haste', 'mastery'), getGemID('haste', 'mastery'), getGemID('haste', 'mastery')];
    }
    else {
      return [metaGem, getGemID('haste', 'crit'), getGemID('crit', 'haste'), getGemID('versatility', 'haste'), getGemID('haste', 'crit'),
        getGemID('haste', 'crit'), getGemID('haste', 'crit'), getGemID('haste', 'crit'), getGemID('haste', 'crit')];
    }

  }
  else if (spec === "Discipline Priest") {
    // Haste / Crit, Crit / Haste
    return [metaGem, getGemID('haste', 'mastery'), getGemID('mastery', 'haste'), getGemID('crit', 'haste'), getGemID('versatility', 'haste'),
      getGemID('haste', 'mastery'), getGemID('haste', 'mastery'), getGemID('haste', 'mastery'), getGemID('haste', 'mastery')];
  }
  else if (spec === "Holy Priest") {
    // Crit / Mastery, Mastery / Crit
    return [metaGem, getGemID('crit', 'mastery'), getGemID('mastery', 'crit'), getGemID('versatility', 'crit'), getGemID('haste', 'crit'),
                getGemID('crit', 'mastery'), getGemID('crit', 'mastery'), getGemID('crit', 'mastery'), getGemID('crit', 'mastery')];
  }
  else if (spec === "Restoration Druid") {
    // Haste / Mastery
    return [metaGem, getGemID('haste', 'mastery'), getGemID('mastery', 'haste'), getGemID('versatility', 'haste'), getGemID('crit', 'haste'),
      getGemID('haste', 'mastery'), getGemID('haste', 'mastery'), getGemID('haste', 'mastery'), getGemID('haste', 'mastery')];
  }
  else if (spec === "Preservation Evoker") {
    // Mastery / Crit, Mastery / Vers
    return [metaGem, getGemID('mastery', 'crit'), getGemID('crit', 'mastery'), getGemID('versatility', 'mastery'), getGemID('haste', 'mastery'),
      getGemID('mastery', 'crit'), getGemID('mastery', 'crit'), getGemID('mastery', 'crit'), getGemID('mastery', 'crit')];
  }
  else if (spec === "Mistweaver Monk") {
    // Haste / Crit
    return [metaGem, getGemID('haste', 'crit'), getGemID('crit', 'haste'), getGemID('versatility', 'haste'), getGemID('haste', 'crit'),
      getGemID('haste', 'crit'), getGemID('haste', 'crit'), getGemID('haste', 'crit'), getGemID('haste', 'crit')];
  }
  else if (spec === "Restoration Shaman") {
    // Crit / Vers
    return [metaGem, getGemID('crit', 'versatility'), getGemID('versatility', 'crit'), getGemID('haste', 'crit'), getGemID('mastery', 'crit'),
      getGemID('crit', 'versatility'), getGemID('crit', 'versatility'), getGemID('crit', 'versatility'), getGemID('crit', 'versatility')];

  }
  else {
    // Error
    return [getGemID('haste', 'crit')]
  }

}

function getGemStats(gemArray: number[]) {
  const gem_stats: Stats = {};
  gemArray.forEach(gem => {
    const gemStats = gemDB.filter(g => g.id === gem)[0].stats;
    Object.keys(gemStats).forEach(stat => {
      gem_stats[stat] = (gem_stats[stat] || 0) + gemStats[stat];
    });
  });
  return gem_stats;
}

function getGemOptions(spec: string, contentType: contentTypes) {
  if (spec === "Holy Paladin") {
    // Crit / haste, crit / mastery
    return [getGemID('crit', 'haste'), getGemID('crit', 'mastery'), getGemID('crit', 'versatility')];
  }
  else if (spec === "Discipline Priest") {
    // Haste / Crit, Crit / Haste
    return [getGemID('haste', 'crit')];
  }
  else if (spec === "Holy Priest") {
    // Crit / Mastery, Mastery / Crit
    return [getGemID('mastery', 'crit'), getGemID('crit', 'mastery')]
  }
  else if (spec === "Restoration Druid") {
    // Haste / Mastery
    return [getGemID('haste', 'mastery'), getGemID('haste', 'versatility')];
  }
  else if (spec === "Preservation Evoker") {
    // Mastery / Crit, Mastery / Vers
    return [getGemID('mastery', 'crit'), getGemID('mastery', 'versatility'), getGemID('crit', 'mastery')] //192958, 192964, 192945];
  }
  else if (spec === "Mistweaver Monk") {
    // Haste / Crit
    return [getGemID('haste', 'crit'), getGemID('haste', 'versatility'), getGemID('crit', 'versatility')];
  }
  else if (spec === "Restoration Shaman") {
    // Crit / Vers
    return [getGemID('versatility', 'crit'), getGemID('crit', 'versatility')];

  }
  else {
    // Error
    return [getGemID('haste', 'crit')]
  }

}

/**
 * This is our core Top Gear function. It puts together valid sets, then calls for them to be scored.
 *
 * @param {*} rawItemList A raw list of items. This is usually all of the items a player has selected.
 * @param {*} wepCombos Weapon combos are just a list of all possible weapon combinations (so staves are listed alone, and 1H + OHs are paired).
 * @param {*} player An object that represents the player
 * @param {*} contentType Raid or Dungeon
 * @param {*} baseHPS The models expected HPS. This is also stored in the CastModel but it's included separately for a faster reference. Could probably be rewritten out in future.
 * @param {*} userSettings The players settings. This represents the small settings panel near the top of Top Gear / Upgrade Finder.
 * @param {*} castModel
 * @returns A Top Gear result which includes the best set, and how close various alternatives are.
 */
export function runTopGear(rawItemList: Item[], wepCombos: Item[], player: Player, contentType: contentTypes, 
                            baseHPS: number, userSettings: any, castModel: any, reporting: boolean = true) {
  //console.log("Running Top Gear")
  // == Setup Player & Cast Model ==
  // Create player / cast model objects in this thread based on data from the player character & player model.
  const newPlayer = setupPlayer(player, contentType, castModel);
  let newCastModel = new CastModel(newPlayer.getSpec(), contentType, castModel.modelName, 0);
  newCastModel = Object.assign(newCastModel, castModel);

  // == Setup our list of items ==
  // We duplicate the users items so that nothing is changed during the Top Gear process.
  // If a player has the auto-socket setting on then we'll add sockets to their items.
  let itemList = deepCopyFunction(rawItemList);
  itemList = (userSettings.topGearAutoGem && userSettings.topGearAutoGem.value === true) ? autoSocketItems(itemList) : itemList;
  //itemList = userSettings.vaultDomGem !== "none" ? autoGemVault(itemList, userSettings) : itemList; // Deprecated

  // Duplicate Settings
  userSettings = JSON.parse(JSON.stringify(userSettings));

  // == Create Valid Item Sets ==
  // This just builds a set and adds it to our array so that we can score it later.
  // A valid set is just any combination of items that is wearable in-game. Item limits like on legendaries, unique items and so on are all adhered to.
  let itemSets = createSets(itemList, wepCombos, player.spec);
  let resultSets = [];

  itemSets.sort((a, b) => (a.sumSoftScore < b.sumSoftScore ? 1 : -1));
  
  // == Evaluate Sets ==
  // We'll explain this more in the evalSet function header but we assign each set a score that includes stats, effects and more.
  for (var i = 0; i < itemSets.length; i++) {
    // Create sets for each gem type.
    const gemPoss = getGemOptions(player.spec, contentType) // TODO: Turn this into a function

    if (getSetting(userSettings, 'gemSettings') === ("Precise")) { // Add setting here.
      if (gemPoss.length > 0) {
        gemPoss.forEach(gem => {
          resultSets.push(evalSet(itemSets[i], newPlayer, contentType, baseHPS, userSettings, newCastModel, reporting, gem));
        });
      }
    }
    else { // Advanced Gems not turned on. 
      resultSets.push(evalSet(itemSets[i], newPlayer, contentType, baseHPS, userSettings, newCastModel, reporting, 0));
    }
  }


  // == Sort and Prune sets ==
  // Prune sets (discard weak sets) outside of our top X sets (usually around 3000 but you can find the variable at the top of this file). This just makes anything further we do faster while not having
  // an impact on results.
  //itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));
  resultSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));
  //itemSets = pruneItems(itemSets, userSettings);
  resultSets = pruneSets(resultSets, userSettings);
  
  // == Build Differentials (sets similar in strength) ==
  // A differential is a set that wasn't our best but was close. We'll display these beneath our top gear so that a player could choose a higher stamina option, or a trinket they prefer
  // and so on if they are already close in strength.
  let differentials = [];
  let primeSet = resultSets[0];
  for (var k = 1; k < Math.min(CONSTRAINTS.Shared.topGearDifferentials + 1, resultSets.length); k++) {
    //differentials.push(buildDifferential(itemSets[k], primeSet, newPlayer, contentType));
    differentials.push(buildDifferential(resultSets[k], primeSet, newPlayer, contentType));
  }

  // == Return sets ==
  // If we were able to make a set then create a Top Gear result and return it.
  // If not we'll send back an empty set which will show an error to the player. That's pretty rare nowadays but can happen if their SimC has empty slots in it and so on.
  if (resultSets.length === 0) {
    return null;
  } else {
    let result: TopGearResult = new TopGearResult(resultSets[0], differentials, contentType);
    result.itemsCompared = resultSets.length;
    result.new = true;
    result.id = generateReportCode();
    return result;
  }
}

/**
 * Create valid sets of items based on the items selected. This function isn't particularly pretty, but does the job.
 * It could probably be rewritten quite easily nowadays.
 * @param {*} itemList A raw list of items. This is usually all of the items a player has selected.
 * @param {*} rawWepCombos Weapon combos are just a list of all possible weapon combinations (so staves are listed alone, and 1H + OHs are paired).
 * @returns
 */
function createSets(itemList: Item[], rawWepCombos: Item[], spec: string) {
  const wepCombos = deepCopyFunction(rawWepCombos);
 
  let setCount = 0;
  let itemSets = [];
  let slotLengths: {[key: string]: number} = {
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

  let splitItems: {[key: string]: Item[]} = {
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

  for (var i = 0; i < itemList.length; i++) {
    let slot = itemList[i].slot;
    if (slot in slotLengths) {
      slotLengths[slot] += 1;
      splitItems[slot].push(itemList[i]);
    }
  }
  slotLengths.Weapon = wepCombos.length;
  for (var head = 0; head < slotLengths.Head; head++) {
    let softScore = { head: splitItems.Head[head].softScore,
                      shoulder: 0,
                      neck: 0,
                      back: 0,
                      chest: 0,
                      wrist: 0,
                      hands: 0,
                      waist: 0,
                      legs: 0,
                      feet: 0,
                      weapon: 0,
                      finger: 0,
                      finger2: 0, 
                      trinket: 0,
                      trinket2: 0,};
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

                            // Auto-delete sets that have matching ring IDs, unless one of the IDs is Shadowghast Ring in which case we'll allow it.
                            if (finger < finger2 && 
                                ((splitItems.Finger[finger].id !== splitItems.Finger[finger2].id) ||
                                (splitItems.Finger[finger].id === 215130 || splitItems.Finger[finger2].id === 215130) ||
                                (splitItems.Finger[finger].id === 215137 || splitItems.Finger[finger2].id === 215137) ||
                                splitItems.Finger[finger].id === 215135)) {

                              for (var trinket = 0; trinket < slotLengths.Trinket - 1; trinket++) {
                                softScore.trinket = splitItems.Trinket[trinket].softScore;

                                for (var trinket2 = 1; trinket2 < slotLengths.Trinket; trinket2++) {
                                  softScore.trinket2 = splitItems.Trinket[trinket2].softScore;

                                  if (splitItems.Trinket[trinket].id !== splitItems.Trinket[trinket2].id && trinket < trinket2) {
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
                                      wepCombos[weapon][0]
                                    ];
                                    if (wepCombos[weapon].length > 1) includedItems.push(wepCombos[weapon][1])
                                    //console.log(JSON.stringify(wepCombos[weapon]));
                                    let sumSoft = sumScore(softScore);
                                    itemSets.push(new ItemSet(setCount, includedItems, sumSoft, spec));
                                    setCount++;
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
            }
          }
        }
      }
    }
  }

  return itemSets;
}

function buildDifferential(itemSet: ItemSet, primeSet: ItemSet, player: Player, contentType: contentTypes) {
  let doubleSlot: {[key: string]: number} = {};
  const primeList = primeSet.itemList;
  const diffList = itemSet.itemList;
  let differentials: {
    items: Item[]; //
    gems: number[]; //
    scoreDifference: number; 
    rawDifference: number; 
  } = {
    items: [],
    gems: [],
    scoreDifference: (Math.round(primeSet.hardScore - itemSet.hardScore) / primeSet.hardScore) * 100,
    rawDifference: Math.round(((itemSet.hardScore - primeSet.hardScore) / primeSet.hardScore) * player.getHPS(contentType)),
  };

  for (var x = 0; x < primeList.length; x++) {
    // Check if the other set has the corresponding slot.
    if ((primeList[x].slot === "Offhand" && !diffList[x])) {
      // The prime list has an offhand but the diffList has ended already. There's nothing to add to differentials so skip.
      continue;
    }
    if (diffList[x] && primeList[x].uniqueHash !== diffList[x].uniqueHash) {
      differentials.items.push(diffList[x]);
      doubleSlot[diffList[x].slot] = (doubleSlot[diffList[x].slot] || 0) + 1;

      // Trinkets and Rings
      if ((x === 13 || x === 11) && doubleSlot[diffList[x].slot] <= 1) {
        differentials.items.push(diffList[x - 1]);
      }
    }
  }

  // Check for gem differences
  if (primeSet.enchantBreakdown["Gems"] !== itemSet.enchantBreakdown["Gems"]) {
    itemSet.enchantBreakdown["Gems"].forEach(gem => {
      if (!(primeSet.enchantBreakdown["Gems"].includes(gem))) {
        differentials.gems.push(gem);
      }
    });
  }

  if (diffList.length > primeList.length) {
    differentials.items.push(diffList[diffList.length - 1]);
  }

  return differentials;
}

/**
 * Make sure a set is viable, and then prune sets that aren't close to best.
 * @param {*} itemSets A sorted list of scored sets.
 * @returns A slimmer version of our set list.
 */
function pruneItems(itemSets: ItemSet[], userSettings: any) {
  let temp = itemSets.filter(function (set) {
    return set.verifySet(userSettings);
  });

  return temp.slice(0, softSlice);
}

function pruneSets(resultSets: any[], userSettings: any) {
  
  let temp = resultSets.filter(function (result) {
    return result.verifySet(userSettings);
  });

  return temp.slice(0, softSlice);
}


function sumScore(obj: any) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) { // eslint-disable-line
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

function enchantItems(bonus_stats: Stats, setInt: number, castModel: any, contentType: contentTypes) {
  let enchants: {[key: string]: string | number | number[]} = {}; // TODO: Cleanup
  // Rings - Best secondary.
  // We use the players highest stat weight here. Using an adjusted weight could be more accurate, but the difference is likely to be the smallest fraction of a
  // single percentage. The stress this could cause a player is likely not worth the optimization.
  let highestWeight = getHighestWeight(castModel);
  bonus_stats[highestWeight as keyof typeof bonus_stats] = (bonus_stats[highestWeight as keyof typeof bonus_stats] || 0) +  315; // 64 x 2.
  enchants["Finger"] = "+315 " + highestWeight;

  // Chest
  // There is a mana option too that we might include later.
  bonus_stats.intellect = (bonus_stats.intellect || 0) + 745; 
  enchants["Chest"] = "Crystalline Radiance";

  // Cape
  bonus_stats.leech = (bonus_stats.leech || 0) + 1020;
  enchants["Back"] = "Leeching Fangs";

  // Wrists
  bonus_stats.leech += 2040;
  enchants["Wrist"] = "Armored Leech";

  // Belt
  //enchants["Waist"] = "Shadowed Belt Clasp";

  // Legs - Also gives 3/4/5% mana.
  bonus_stats.intellect += 747;
  enchants["Legs"] = "Sunset Spellthread";



  if (contentType === "Raid") {
    const dreamingData =  { // Mastery benefit. This is short and not all that useful.
      coefficient: 40.32042, 
      table: -8,
      ppm: 4,
      targets: 5,
      expectedOverheal: 0.3,
    };
    bonus_stats.hps! = (bonus_stats.hps! || 0) + (processedValue(dreamingData, 342) * dreamingData.ppm * dreamingData.targets * (1 - dreamingData.expectedOverheal) / 60);

    enchants["CombinedWeapon"] = "Authority of Fiery Resolve"; 
    enchants["2H Weapon"] = "Authority of Fiery Resolve"; 
    enchants["1H Weapon"] = "Authority of Fiery Resolve"; 
  }
  else {
    // Weapon - Sophic Devotion
    let expected_uptime = convertPPMToUptime(2, 12);
    bonus_stats[highestWeight  as keyof typeof bonus_stats] += 3910 * expected_uptime;

    let wepEnchantName = "";
    if (highestWeight === "mastery") wepEnchantName = "Stonebound Artistry";
    else if (highestWeight === "haste") wepEnchantName = "Stormrider's Fury";
    else if (highestWeight === "crit") wepEnchantName = "Council's Guile";
    else if (highestWeight === "versatility") wepEnchantName = "Oathsworn's Tenacity";


    enchants["CombinedWeapon"] = wepEnchantName; 
    enchants["2H Weapon"] = wepEnchantName; 
    enchants["1H Weapon"] = wepEnchantName; 
  }

  // Algari Mana Oil
  bonus_stats.haste = (bonus_stats.haste || 0) + 232;
  bonus_stats.crit = (bonus_stats.crit || 0) + 232;

  return enchants;
}

// TODO: I think these are ItemSets. Confirm. 
function dupObject(set : any) {
  return JSON.parse(JSON.stringify(set));
}

export function getTopGearGems(gemID: number, gemCount: number, bonus_stats: Stats) {
  
  let gemArray = [];
  const primaryGems = {
    'haste':  192985,
    'crit': 192982,
    'mastery': 192988,
    'versatility': 192990
  }
  if (gemCount === 0) return [];

  
  const adjGemCount = gemCount - 1;
  const gemStats = gemDB.filter(gem => gem.id === gemID)[0].stats;

  Object.keys(gemStats).forEach(stat => {
    bonus_stats[stat] = (bonus_stats[stat] || 0) + (gemStats[stat] * adjGemCount);

    if (gemStats[stat] === 70) {
      // Do primary gem
      gemArray.push(primaryGems[stat]);
      bonus_stats['intellect'] = (bonus_stats['intellect'] || 0) + 75;
      bonus_stats[stat] = (bonus_stats[stat] || 0) + 66;
      
    }
  })
  gemArray.push(gemID);
  
  return gemArray;


}

/**
 * This is our evaluation function. It takes a complete set of gear and assigns it a score based on the sets stats, effects, legendaries and more.
 * @param {*} itemSet
 * @param {*} player
 * @param {*} contentType
 * @param {*} baseHPS
 * @param {*} userSettings
 * @param {*} castModel
 * @returns 
 */
function evalSet(rawItemSet: ItemSet, player: Player, contentType: contentTypes, baseHPS: number, userSettings: any, castModel: any, reporting: boolean = false, gemID?: number) {
  // == Setup ==
  let itemSet = rawItemSet.clone();
  let builtSet = itemSet.compileStats("Retail", userSettings);
  let report = {ramp: {}};
  let setStats = builtSet.setStats;
  let gearStats = dupObject(setStats);
  const setBonuses = builtSet.sets;
  const useSeq = false;
  let enchantStats = {};
  let evalStats: Stats = {};
  let hardScore = 0;

  let bonus_stats = {
    intellect: 0,
    haste: 0,
    crit: 0,
    versatility: 0,
    mastery: 0,
    leech: 0,
    hps: 0,
    dps: 0,
    mana: 0,
    allyStats: 0,
  };


  // Our adjusted_weights will be compiled later by dynamically altering our base weights.
  // The more we get of any one stat, the more the others are worth comparatively. Our adjusted weights will let us include that in our set score.
  let adjusted_weights: {[key: string]: number} = {
    intellect: 1,
    haste: castModel.baseStatWeights["haste"],
    crit: castModel.baseStatWeights["crit"],
    mastery: castModel.baseStatWeights["mastery"],
    versatility: castModel.baseStatWeights["versatility"],
    leech: castModel.baseStatWeights["leech"],
  };

  // These are special variables the set includes. They are passed to effect formulas etc. This is a very flexible object.
  let setVariables: {[key: string]: number | string | number[]} = {
    setSockets: 0,
    socketElement: "",
    socketList: [],
    fireMult: 0,
    nerubianArmorPatch: 0,
  };


  // == Enchants and gems ==
  const enchants = enchantItems(bonus_stats, setStats.intellect!, castModel, contentType);

  // == Flask / Phials ==
  let selectedChoice = "";
  if (getSetting(userSettings, "flaskChoice") === "Automatic") {
    const bestStat = getHighestWeight(castModel);
    bonus_stats[bestStat] = (bonus_stats[bestStat] || 0) + 2825;
    selectedChoice = bestStat;
  }
  else {
    selectedChoice = getSetting(userSettings, "flaskChoice").toLowerCase();
    bonus_stats[selectedChoice]  = (bonus_stats[selectedChoice] || 0) + 2825;
  }

  if (selectedChoice === "haste") enchants.flask = "Flask of Tempered Swiftness";
  else if (selectedChoice === "mastery") enchants.flask = "Flask of Tempered Mastery";
  else if (selectedChoice === "crit") enchants.flask = "Flask of Tempered Aggression";
  else if (selectedChoice === "versatility") enchants.flask = "Flask of Tempered Versatility";

  // == Runes == 
  // If the user has specified a rune then we'll use that, otherwise we'll just default to a dynamic best stat.
  
  
  /*if (getSetting(userSettings, "runeChoice") !== "Automatic") {
    bonus_stats[getSetting(userSettings, "runeChoice")] = (bonus_stats[getSetting(userSettings, "runeChoice")] || 0) + 310;
  }
  else {
    // Defaults to best stat that isn't versatility (as no rune exists for it).
    const highestWeight = getHighestWeight(castModel, "versatility")
    bonus_stats[highestWeight] = (bonus_stats[highestWeight] || 0) + 310;
  }*/

  // Sockets
  // Check for Advanced gem setting and then run this instead of the above.
  if (getSetting(userSettings, "gemSettings") === ("Precise")) {
    enchants["Gems"] = getTopGearGems(gemID, Math.max(0, builtSet.setSockets), bonus_stats );
  }
  else {
    enchants["Gems"] = getTWWGemOptions(player.spec, contentType, userSettings).slice(0, Math.max(0, builtSet.setSockets));
    const gemStats = getGemStats(enchants["Gems"]);
    //enchants["Gems"] = getGems(player.spec, Math.max(0, builtSet.setSockets), bonus_stats, contentType, castModel.modelName, true);
    compileStats(bonus_stats, gemStats);
  }
  if (enchants["Gems"].length > 1) {
    // At least two gems, grab element of second. If we don't, then we have no elemental gems and can ignore it. 
    setVariables.socketElement = getGemElement(enchants["Gems"][1]);
  }

  enchants["GemCount"] = builtSet.setSockets;
  setVariables.setSockets = builtSet.setSockets;

  // Add together the sets base stats & any enchants or gems we've added.
  compileStats(setStats, bonus_stats);
  compileStats(gearStats, bonus_stats);



  //builtSet.baseStats = gearStats;

  // == Effects ==
  // Effects include stuff like trinkets, legendaries, tier sets and so on.
  // Each effect returns an object containing which stats it offers. Specific details on each effect can be found in the TrinketData, EffectData and EffectEngine files.
  // -- Disc note: On use trinkets and legendaries and handled further down in the ramps section. --

  // ------------------

  let effectStats = [];
  let effectList = [...itemSet.effectList];
  // == Set Bonuses ==
  // --- Item Set Bonuses ---
  
  const usedSets: any[] = []
  for (const set in setBonuses) {
    if (setBonuses[set] > 1) {

      const itemSet: ItemEffect[] = getItemSet(set, setBonuses[set], player.getSpec())
      itemSet.forEach(setBonus => {
        if (!usedSets.includes(setBonus.name)) {
          effectList = effectList.concat(setBonus);
          usedSets.push(setBonus.name);
        }
      })
    }
  }

  // Armor Banding
  if (effectList.filter(effect => effect.name === "Writhing Armor Banding").length > 0) {
    // The set has a Writhing Armor Banding so we'll double our other embellishment slot so long as it's Nerubian.
    setVariables.nerubianArmorPatch = 1;
  }

  // Special fire multiplier to make sure we're including sources of fire damage toward fire specific rings.
  // Fire rings are no longer viable, but we're going to leave them in the code since there's a 100% chance they return in some Fated form.
  let fireMult = 0;
  // Frostfire Belt, Flaring Cowl, Flame Licked
  //if (builtSet.checkHasItem(191623)) fireMult = convertPPMToUptime(3, 10);
  //else if (builtSet.checkHasItem(193494)) fireMult = 1;

  //setVariables.fireMult = fireMult || 0;


  for (var x = 0; x < effectList.length; x++) {
    const effect = effectList[x];
    if (!useSeq || (castModel.modelType[contentType] === "Sequences" && !effect.onUse)) {
      effectStats.push(getEffectValue(effect, player, castModel, contentType, effect.level, userSettings, "Retail", setStats, setVariables));
    }
  }

  // Special 10.0.7 Ring
  // No longer necessary in season 4.
  /*
  if (builtSet.checkHasItem(203460)) {
    // Auto gen best gems.
    
    const itemLevel = builtSet.itemList.filter(item => item.id === 203460)[0].level || 424;

    const combo = player.getBestPrimordialIDs(userSettings, contentType, itemLevel);
    // 10.2 note - We'll actually just use the default best healing set now. Options have long since been removed and generating every possible set is no longer useful.

    // Handle Annulet
    const annuletStats = getOnyxAnnuletEffect(combo, player, contentType, itemLevel, player.activeStats, userSettings);

    builtSet.primGems = combo; 
    effectStats.push(annuletStats);
 } */

  // == Cyrce's Circlet ==
  if (builtSet.checkHasItem(228411)) {
    const itemLevel = builtSet.itemList.filter(item => item.id === 228411)[0].level || 658;

    //const comboSetting = getSetting(userSettings, "circletOptions");
    let combo = [];

    /*if (comboSetting === "Thunderlords / Mariners / Windsingers") combo = [228634, 228644, 228640];
    else if (comboSetting === "Skippers / Fathomdwellers / Stormbringers") combo = [228646, 228639, 228638];
    else if (comboSetting === "Skippers / Mariners / Stormbringers") combo = [228646, 228644, 228638];*/
    combo = builtSet.itemList.filter(item => item.id === 228411)[0].selectedOptions || [];

    // 10.2 note - We'll actually just use the default best healing set now. Options have long since been removed and generating every possible set is no longer useful.

    // Handle Annulet
    const additionalData = {contentType: contentType, settings: userSettings, setStats: setStats, castModel: castModel, player: player, setVariables: setVariables};
    const annuletStats = getCircletEffect(combo, itemLevel, additionalData)

    //builtSet.primGems = combo; 
    effectStats.push(annuletStats);

  }

  const mergedEffectStats = mergeBonusStats(effectStats);

  // Post-effect overrides. Use these very sparingly.
  if (player.spec === "Preservation Evoker" && castModel.modelName === "Flameshaper") {
    // Try and swap ring enchants and / or flask to hit breakpoint. 
    const totalHaste = (setStats.haste || 0) + (mergedEffectStats.haste || 0);
    if (totalHaste < 9834 && totalHaste > (9834 - 315 * 2)) {
      // Haste enchants are enough to hit our breakpoint. Swap over. 
      enchants["Finger"] = "+315 Haste";
      setStats.haste = (setStats.haste || 0) + 315 * 2;
      setStats.mastery = (setStats.mastery || 0) - 315 * 2;
    }
    else if (totalHaste < 9834 && totalHaste > (9834 - 2825)) {
      // Haste Flask is enough to hit our breakpoint. Swap over. 
      enchants.flask = "Flask of Tempered Swiftness";
      setStats.haste = (setStats.haste || 0) + 2825;
      setStats.mastery = (setStats.mastery || 0) - 2825;
    }
    else if (totalHaste < 9834 && totalHaste > (9834 - 2825 - 315 * 2)) {
      // We need both flask and ring to hit our breakpoint.
      enchants.flask = "Flask of Tempered Swiftness";
      enchants["Finger"] = "+315 Haste";
      setStats.haste = (setStats.haste || 0) + 2825 + 315 * 2;
      setStats.mastery = (setStats.mastery || 0) - 2825 - 315 * 2;
    }
  }

  // == Disc Specific Ramps ==
  // Further documentation is included in the DiscPriestRamps files.
  if (castModel.modelType[contentType] === "Sequences") {
    setStats.intellect = (setStats.intellect || 0) * 1.05;
    const setRamp = evalDiscRamp(itemSet, setStats, castModel, effectList)
    if (reporting) report.ramp = setRamp;
    setStats.hps = (setStats.hps || 0) + setRamp.totalHealing / 180;

    evalStats = JSON.parse(JSON.stringify(mergedEffectStats));
    evalStats.leech = (setStats.leech || 0) + (mergedEffectStats.leech || 0);
    evalStats.hps = (setStats.hps || 0) + (mergedEffectStats.hps || 0);
  }
  else if (castModel.modelType[contentType] === "CastModel") {
    // Prep the set for a cast model.
    setStats = applyDiminishingReturns(setStats);
    setStats = compileStats(setStats, mergedEffectStats); // DR for effects are handled separately. Do we need to separate out on-use trinkets?
    setStats.intellect = (setStats.intellect || 0) * 1.05;

    // Raid Buffs
    setStats.intellect = (setStats.intellect || 0) * 1.05;
    setStats.mastery = (setStats.mastery || 0) + STATCONVERSION.MASTERY * 2;
    setStats.versatility = (setStats.versatility || 0) + STATCONVERSION.VERSATILITY * 3;

    const castModelResult = castModel.runCastModel(itemSet, setStats, castModel, effectList)

    setStats.hps = (setStats.hps || 0) + castModelResult.hps;
    
    //evalStats = JSON.parse(JSON.stringify(mergedEffectStats));
    evalStats.leech = (setStats.leech || 0);
    //hardScore = setStats.hps || 0;

    evalStats.hps = (setStats.hps || 0);
  }
  // == Diminishing Returns ==
  // Here we'll apply diminishing returns. If we're using CastModels of sequence based evaluation then we already took care of this during the ramp phase.
  // DR on trinket procs and such are calculated in their effect formulas, so that we can DR them at their proc value, rather than their average value.
  // Disc Note: Disc DR on base stats is already included in the ramp modules and doesn't need to be reapplied here.
  else {
    setStats = applyDiminishingReturns(setStats); // Apply Diminishing returns to our haul.

    // Talents (DR does not apply)
    if (player.spec === "Holy Paladin") {
      setStats.crit = (setStats.crit || 0) + STATCONVERSION.CRIT * 4;
      setStats.mastery = (setStats.mastery || 0) + STATCONVERSION.MASTERY * 4;
      setStats.intellect = (setStats.intellect || 0) * 1.04;

      mergedEffectStats.haste = (mergedEffectStats.haste || 0) * 1.04;
      mergedEffectStats.crit = (mergedEffectStats.crit || 0) + STATCONVERSION.CRIT * 4;
      mergedEffectStats.mastery = (mergedEffectStats.mastery || 0) + STATCONVERSION.MASTERY * 4;
      mergedEffectStats.intellect = (mergedEffectStats.intellect || 0) * 1.04;
    }
    else if (player.spec === "Restoration Druid") {
      setStats.haste = (((setStats.haste || 0) / STATCONVERSION.HASTE / 100 + 1) * 1.06 - 1) * STATCONVERSION.HASTE * 100;
      mergedEffectStats.haste = (mergedEffectStats.haste || 0) * 1.06;
    }

    // Extra raid buffs
    setStats.versatility = (setStats.versatility || 0) + STATCONVERSION.VERSATILITY * 3;

    // Apply soft DR formula to stats, as the more we get of any stat the weaker it becomes relative to our other stats.
    adjusted_weights.haste = (adjusted_weights.haste + adjusted_weights.haste * (1 - (DR_CONST * setStats.haste!) / STATCONVERSION.HASTE)) / 2;
    adjusted_weights.crit = (adjusted_weights.crit + adjusted_weights.crit * (1 - (DR_CONST * setStats.crit!) / STATCONVERSION.CRIT)) / 2;
    adjusted_weights.versatility = (adjusted_weights.versatility + adjusted_weights.versatility * (1 - (DR_CONST * setStats.versatility!) / STATCONVERSION.VERSATILITY)) / 2;
    adjusted_weights.mastery = (adjusted_weights.mastery + adjusted_weights.mastery * (1 - (DR_CONST * setStats.mastery!) / (STATCONVERSION.MASTERY / STATCONVERSION.MASTERYMULT[player.spec]))) / 2;
    adjusted_weights.leech = (adjusted_weights.leech + adjusted_weights.leech * (1 - (DR_CONSTLEECH * setStats.leech!) / STATCONVERSION.LEECH)) / 2;
    //addBaseStats(setStats, player.spec); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.
    setStats = compileStats(setStats, mergedEffectStats); // DR for effects are handled separately.

    // == Apply same set int bonus ==
    // 5% int boost for wearing the same items.
    // The system doesn't actually allow you to add items of different armor types so this is always on.
    setStats.intellect = (setStats.intellect || 0) * 1.05;

    evalStats = setStats;
  }
  // == Scoring ==
  for (var stat in evalStats) {
    // Handle flat HPS increases like most tier sets, some trinkets, Annulet and more.
    if (stat === "hps" && evalStats.hps) {
      hardScore += (evalStats.hps / baseHPS) * player.activeStats.intellect;
    } 
    // Handle flat DPS increases like DPS trinkets. Note that additional DPS value isn't currently evaluated.
    else if (stat === "dps" && evalStats.dps) {
      if (contentType === "Dungeon") hardScore += (evalStats.dps * CONSTANTS.dpsValue / baseHPS) * player.activeStats.intellect;
      else continue;
    } 
    // Handle mana increases. 
    // Currently we don't apply any form of diminishing returns to extra mana, though its value definitely decreases as you get more of it.
    // Somewhat saved by the fact that getting even a single source of extra mana on gear is rare but could be an exercise in future.
    else if (stat === "mana" && evalStats.mana) {
      hardScore += evalStats.mana * player.getSpecialQuery("OneManaHealing", contentType) / player.getHPS(contentType) * player.activeStats.intellect
    }
    // Handle stats we give to allies.
    // This is somewhat of an estimate but it's more reasonable than leaving it out entirely.
    // Note that this is actually a setting and players can opt out if they'd like the score to be personal benefit only.
    else if (stat === "allyStats" && evalStats.allyStats) {
      if (userSettings && 'includeGroupBenefits' in userSettings && userSettings.includeGroupBenefits.value === true) {
        //hardScore += evalStats.allyStats * CONSTANTS.allyStatWeight;
        hardScore += getAllyStatsValue(contentType, evalStats.allyStats, player, userSettings) || 0
      }
    }
    // This covers all other stats, which are invariably our secondaries + leech.
    else {
      if (stat in evalStats && stat !== "dps" && stat !== "allyStats") {
        hardScore += (evalStats[stat] * adjusted_weights[stat]) || 0;
        //console.log(stat + " " + evalStats[stat] + " " + adjusted_weights[stat] + " . Score Added: " + (evalStats[stat] * adjusted_weights[stat]));
      }
    }
  }

  addBaseStats(setStats); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.

  if (player.spec === "Discipline Priest" && contentType === "Raid") setStats = compileStats(setStats, mergedEffectStats);

  // Double on-use adjustment
  // Wearing two on-use trinkets is generally a bad idea since they're underbudget compared to procs, only one can be combined with cooldowns, and 
  // player usage is likely to be managed poorly.
  if ( "onUseTrinkets" in builtSet && builtSet.onUseTrinkets.length == 2) {
    hardScore -= 1800;
  }

  builtSet.hardScore = Math.round(1000 * hardScore) / 1000;
  builtSet.setStats = setStats;
  builtSet.enchantBreakdown = enchants;
  builtSet.report = report;
  
  //
  //if (player.spec() === "Discipline Priest" && contentType === "Raid") formatReport(report);
  //console.log(JSON.stringify(effectList));
  itemSet.effectList = effectList;
  
  return builtSet;
}

function mergeStat(stats: any, statName: any) {
  return stats.reduce(function (a: any, b: any) {
    if (!isNaN(b[statName])) return a + b[statName];
    else return a;
  }, 0);
}

// Merges together an array of bonus_stats.
export function mergeBonusStats(stats: any) {
  const val = {
    intellect: mergeStat(stats, "intellect"),
    haste: mergeStat(stats, "haste"),
    crit: mergeStat(stats, "crit"),
    mastery: mergeStat(stats, "mastery"),
    versatility: mergeStat(stats, "versatility"),
    leech: mergeStat(stats, "leech"),
    hps: mergeStat(stats, "hps") + mergeStat(stats, "HPS"),
    dps: mergeStat(stats, "dps"),
    mana: mergeStat(stats, "mana"),
    allyStats: mergeStat(stats, "allyStats")
  };

  return val;
}

//
function getHighestWeight(castModel : any, exclusion?: string): "crit" | "haste" | "mastery" | "versatility" {
  let max = "";
  let maxValue = 0;
  let weights = castModel.getBaseStatWeights();

  for (var stat in weights) {
    if (weights[stat] > maxValue && ["crit", "haste", "mastery", "versatility"].includes(stat) && stat !== exclusion) {
      max = stat;
      maxValue = weights[stat];
    }
  }

  return max;
}

// Compiles stats & bonus stats into one array to which we can then apply DR etc.
function compileStats(stats: Stats, bonus_stats: Stats) {
  for (var stat in stats) {
    stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
  }

  return stats;
}

// Add the amount of base stats each character has. 
function addBaseStats(stats: Stats) {
  stats.crit = (stats.crit || 0) + STATCONVERSION.CRIT * 5;
  stats.mastery = (stats.mastery || 0) + STATCONVERSION.MASTERY * 8;

  return stats;
}

const deepCopyFunction = (inObject: any): any => {
  let outObject: any, value: any, key: string;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

export function evalDiscRamp(itemSet: ItemSet, setStats: Stats, castModel: any, effectList: ItemEffect[]) {
      // Setup any ramp settings or special effects that need to be taken into account.
      let rampSettings: {playstyle: string; trinkets: any, [key: string]: any} = { playstyle: castModel.modelName, trinkets: {}};
      // TODO: rampSettings here can be moved to a proper interface. Extra effects like tier sets can be moved to an array instead of individual booleans.
      let specialSpells = ["Rapture"];
      // Setup ramp cast sequences
      const onUseTrinkets = itemSet.onUseTrinkets.map((trinket) => trinket.name);

      let trinketInfo: {[key: string]: any} = {};
      if (effectList.filter(effect => effect.name === "DPriest T29-4").length > 0) {
        // We are wearing 4pc and should add it to both Ramp Settings (to include the PotDS buff) and specialSpells (to alter our cast sequences).
        rampSettings["T29_4"] = true; 
        specialSpells.push("T29_4");
      }
      if (effectList.filter(effect => effect.name === "DPriest T29-2").length > 0) {
        // We are wearing 4pc and should add it to both Ramp Settings (to include the PotDS buff) and specialSpells (to alter our cast sequences).
        rampSettings["T29_2"] = true; 
      }
  

      if (onUseTrinkets !== null && onUseTrinkets.length > 0) {
        itemSet.onUseTrinkets.forEach((trinket) => {
          rampSettings[trinket.name] = getTrinketValue(trinket.name, trinket.level);
          trinketInfo[trinket.name] = getTrinketValue(trinket.name, trinket.level);
          rampSettings.trinkets[trinket.name] = getTrinketValue(trinket.name, trinket.level);

        });
      }

      const boonSeq = buildRamp("Primary", 10, onUseTrinkets, setStats.haste, castModel.modelName, specialSpells);
      const fiendSeq = buildRamp("Secondary", 10, onUseTrinkets, setStats.haste, castModel.modelName, specialSpells);
      // Perform our ramp, and then add it to our sets expected HPS. Our set's stats are included here which means we don't need to score them later in the function.
      // The ramp sequence also includes any diminishing returns.
      const setRamp = allRamps([], setStats, rampSettings, getDefaultDiscTalents("Default"), trinketInfo, false);

      return setRamp;
  

}

/**
 * This is our evaluation function. It takes a complete set of gear and assigns it a score based on the sets stats, effects, legendaries and more.
 * @param {*} itemSet
 * @param {*} player
 * @param {*} contentType
 * @param {*} baseHPS
 * @param {*} userSettings
 * @param {*} castModel
 * @returns
 */
/*
function evalSetOld(itemSet, player, contentType, baseHPS, userSettings, castModel) {
  let builtSet = itemSet.compileStats("Retail", userSettings); // This adds together the stats of each item in the set.
  let setStats = builtSet.setStats;
  let hardScore = 0;

  let enchants = {};

  let bonus_stats = {
    intellect: 0,
    haste: 0,
    crit: 0,
    versatility: 0,
    mastery: 0,
    leech: 0,
    hps: 0,
    dps: 0,
  };

  // Our adjusted_weights will be compiled later by dynamically altering our base weights.
  // The more we get of any one stat, the more the others are worth comparatively. Our adjusted weights will let us include that in our set score.
  let adjusted_weights = {
    intellect: 1,
    haste: castModel.baseStatWeights["haste"],
    crit: castModel.baseStatWeights["crit"],
    mastery: castModel.baseStatWeights["mastery"],
    versatility: castModel.baseStatWeights["versatility"],
    leech: castModel.baseStatWeights["leech"],
  };

  // == Enchants & Gems ==
  enchants = enchantItems(bonus_stats, setStats.intellect, castModel);

  // 5% int boost for wearing the same items.
  // QE Live doesn't actually allow you to add items of different armor types so this is always on.
  // If the game ever encourages wearing other armor types (like with Corruption) then this can be extended.
  bonus_stats.intellect += (builtSet.setStats.intellect + bonus_stats.intellect) * 0.05;

  // Sockets
  const highestWeight = getHighestWeight(castModel);
  bonus_stats[highestWeight] += 16 * builtSet.setSockets;
  enchants["Gems"] = highestWeight;

  //compileStats(setStats, bonus_stats); // Add the base stats on our gear together with enchants & gems.


  // === Handle Effects ===
  // Each effect will return an object of stats. Ruby for example would return it's crit value.
  // We'll add all of these objects into an array and then sum them all together.
  // To learn how QE Live handles each effect you're best exploring the EffectEngine page but a few quick things should be mentioned:
  // - On-use stat effects are combined with major cooldowns wherever possible.
  // - All effects are based around average use cases, NOT perfect usage.
  let effectStats = [];

  effectStats.push(bonus_stats);
  for (var x = 0; x < itemSet.effectList.length; x++) {
    effectStats.push(getEffectValue(itemSet.effectList[x], player, castModel, contentType, itemSet.effectList[x].level, userSettings, "Retail", setStats));
  }

  const mergedEffectStats = mergeBonusStats(effectStats);

  // == Hard Diminishing Returns ==
  // Note: Effects and base stats are added after this step. Effects are DR'd in a separate function, as we want to DR them at the value they proc at, instead of
  // basing it on their average return.

  // Diminishing Returns applies to all stat rating (including procs), but not to percentage ratings or base stats.
  applyDiminishingReturns(setStats);

  setStats = compileStats(setStats, mergedEffectStats); // DR for effects are handled separately.

  // This is where we apply soft DR to stats, as the more we get of any stat the weaker it becomes relative to our other stats.
  adjusted_weights.haste = (adjusted_weights.haste + adjusted_weights.haste * (1 - (DR_CONST * setStats.haste) / STATPERONEPERCENT.Retail.HASTE)) / 2;
  adjusted_weights.crit = (adjusted_weights.crit + adjusted_weights.crit * (1 - (DR_CONST * setStats.crit) / STATPERONEPERCENT.Retail.CRIT)) / 2;
  adjusted_weights.versatility = (adjusted_weights.versatility + adjusted_weights.versatility * (1 - (DR_CONST * setStats.versatility) / STATPERONEPERCENT.Retail.VERSATILITY)) / 2;
  adjusted_weights.mastery = (adjusted_weights.mastery + adjusted_weights.mastery * (1 - (DR_CONST * setStats.mastery) / STATPERONEPERCENT.Retail.MASTERYA[player.spec])) / 2;
  adjusted_weights.leech = (adjusted_weights.leech + adjusted_weights.leech * (1 - (DR_CONSTLEECH * setStats.leech) / STATPERONEPERCENT.Retail.LEECH)) / 2;

  // Finally, add base stats, which don't DR. This includes our base 5% crit, and whatever base mastery our spec has.
  addBaseStats(setStats, player.spec);

  // == Score Calculation ==
  // Most of the hard work is done above so this portion is rather straightforward.
  // We multiply out each stat by it's adjusted stat weight and then convert it to effective intellect value.
  // Anything intricate should probably be included in one of the above functions rather than here.
  for (var stat in setStats) {
    if (stat === "hps") {
      hardScore += (setStats[stat] / baseHPS) * player.activeStats.intellect;
    } else if (stat === "dps") {
      // Dungeons use a very straightforward 1 DPS = 1 HPS calculation. This can be expanded on in future.
      if (contentType === "Dungeon") hardScore += (setStats[stat] / baseHPS) * player.activeStats.intellect;
      else continue;
    } else {
      hardScore += setStats[stat] * adjusted_weights[stat];
    }
  }

  // Double on-use adjustment
  // This is not a perfect representation of the cost of wearing two on-use trinkets as Paladin and Disc,
  // but from a practical viewpoint it achieves the objective. It could be replaced with something more
  // mathematically comprehensive in future. Disc Priest will be swapped to the new tech very soon.
  if ((player.spec === "Holy Paladin" || player.spec === "Discipline Priest") && "onUseTrinkets" in builtSet && builtSet.onUseTrinkets.length == 2) {
    hardScore -= 37;
  }

  builtSet.hardScore = Math.round(1000 * hardScore) / 1000;
  builtSet.setStats = setStats;
  builtSet.enchantBreakdown = enchants;
  return builtSet; // Temp
}
 */