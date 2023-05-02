import ItemSet from "../ItemSet";
import TopGearResult from "./TopGearResult";
import { STATPERONEPERCENT, BASESTAT } from "../../../Engine/STAT";
import { CONSTRAINTS } from "../../../Engine/CONSTRAINTS";
import { convertPPMToUptime } from "../../../../Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "../../Player/Player";
import CastModel from "../../Player/CastModel";
import { getEffectValue } from "../../../../Retail/Engine/EffectFormulas/EffectEngine";
import { applyDiminishingReturns, getGems } from "General/Engine/ItemUtilities";
import { getTrinketValue } from "Retail/Engine/EffectFormulas/Generic/TrinketEffectFormulas";
import { allRamps, allRampsHealing, getDefaultDiscTalents } from "General/Modules/Player/DiscPriest/DiscRampUtilities";
import { buildRamp } from "General/Modules/Player/DiscPriest/DiscRampGen";
import { getItemSet } from "Classic/Databases/ItemSetsDBRetail.js";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import { getBestCombo, getOnyxAnnuletEffect } from "Retail/Engine/EffectFormulas/Generic/OnyxAnnuletData"

/**
 * == Top Gear Engine ==
 * The functions within have two primary functions.
 * - To build viable sets of gear. A viable set of gear will have one item in each slot (two for rings and trinkets). Any sets with multiple legendaries, or unique items that clash
 *   are auto-discarded.
 * - To evaluate each viable set to see which is best. Sets similar in strength will be listed as competitive alternatives.
 */

const softSlice = 3000;
const DR_CONST = 0.00497669230769231;
const DR_CONSTLEECH = 0.04922569230769231;

// This is just a timer function. We might eventually just move it to a timeUtility file for better re-use.
export function expensive(time) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  return count;
}

// Top Gear sets are run on their own thread. This can make passing full objects with functions tricky. This function recreates our player object since we'll need it
// for effect formulas. Think of it as creating a clone of our player by creating a new one and giving it the attributes that the last one had.
// We put false as the "getImages" prop for player so that the API call to get the players images do not run during Top Gear.
function setupPlayer(player, contentType, castModel) {
  let newPlayer = new Player(player.charName, player.spec, player.charID, player.region, player.realm, player.race, player.statWeights, "Retail");
  newPlayer.castModel[contentType] = new CastModel(newPlayer.getSpec(), contentType);
  newPlayer.castModel[contentType] = Object.assign(newPlayer.castModel[contentType], castModel);
  //newPlayer.dominationGemRanks = player.dominationGemRanks;
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
function autoSocketItems(itemList) {
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    if (["Finger", "Head", "Wrist", "Waist"].includes(item.slot) && item.id !== 203460) {
      item.socket = 1;
    }
    else if (item.slot === "Neck") {
      item.socket = 3;
    }
  }

  return itemList;
}

// TODO: Add blocklist. It can be fairly basic.
const generateReportCode = () => {
  let result = "";
  const stringLength = 12;
  const possChars ='abcdefhijklmnopqrstuvwxyz';

  const charLength = possChars.length;
  for ( let i = 0; i < stringLength; i++ ) {
      result += possChars.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
}

/**
 * This is our core Top Gear function. It puts together valid sets, then calls for them to be scored.
 *
 * @param {*} rawItemList A raw list of items. This is usually all of the items a player has selected.
 * @param {*} wepCombos Weapon combos are just a list of all possible weapon combinations (so staves are listed alone, and 1H + OHs are paired).
 * @param {*} player An object that represents the player
 * @param {*} contentType Raid or Dungeon
 * @param {*} baseHPS The models expected HPS. This is also stored in the CastModel but it's included separately for a faster reference. Could probably be rewritten out in future.
 * @param {*} currentLanguage TODO: We can remove this in future. It's no longer used in this module.
 * @param {*} userSettings The players settings. This represents the small settings panel near the top of Top Gear / Upgrade Finder.
 * @param {*} castModel
 * @returns A Top Gear result which includes the best set, and how close various alternatives are.
 */
export function runTopGear(rawItemList, wepCombos, player, contentType, baseHPS, currentLanguage, userSettings, castModel, reporting = true) {
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
  itemSets.sort((a, b) => (a.sumSoftScore < b.sumSoftScore ? 1 : -1));

  // == Evaluate Sets ==
  // We'll explain this more in the evalSet function header but we assign each set a score that includes stats, effects and more.
  for (var i = 0; i < itemSets.length; i++) {
    itemSets[i] = evalSet(itemSets[i], newPlayer, contentType, baseHPS, userSettings, newCastModel, reporting);
  }

  // == Sort and Prune sets ==
  // Prune sets (discard weak sets) outside of our top X sets (usually around 3000 but you can find the variable at the top of this file). This just makes anything further we do faster while not having
  // an impact on results.
  itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));

  itemSets = pruneItems(itemSets, userSettings);

  // == Build Differentials (sets similar in strength) ==
  // A differential is a set that wasn't our best but was close. We'll display these beneath our top gear so that a player could choose a higher stamina option, or a trinket they prefer
  // and so on if they are already close in strength.
  let differentials = [];
  let primeSet = itemSets[0];
  for (var k = 1; k < Math.min(CONSTRAINTS.Shared.topGearDifferentials + 1, itemSets.length); k++) {
    differentials.push(buildDifferential(itemSets[k], primeSet, newPlayer, contentType));
  }

  // == Return sets ==
  // If we were able to make a set then create a Top Gear result and return it.
  // If not we'll send back an empty set which will show an error to the player. That's pretty rare nowadays but can happen if their SimC has empty slots in it and so on.
  if (itemSets.length === 0) {
    let result = new TopGearResult([], [], "");
    result.itemsCompared = itemSets.length;
    return result;
  } else {
    let result = new TopGearResult(itemSets[0], differentials, contentType);
    result.itemsCompared = itemSets.length;
    result.new = true;
    result.id = generateReportCode();
    return result;
  }
}

/**
 * Create valid sets of items based on the items selected. This function isn't particularly pretty, but does the job.
 * @param {*} itemList A raw list of items. This is usually all of the items a player has selected.
 * @param {*} rawWepCombos Weapon combos are just a list of all possible weapon combinations (so staves are listed alone, and 1H + OHs are paired).
 * @returns
 */
function createSets(itemList, rawWepCombos, spec) {
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

                            // Auto-delete sets that have matching ring IDs, unless one of the IDs is Shadowghast Ring in which case we'll allow it.
                            if (finger < finger2 && 
                                ((splitItems.Finger[finger].id !== splitItems.Finger[finger2].id) ||
                                (splitItems.Finger[finger].id === 178926 || splitItems.Finger[finger2].id === 178926))) {

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
                                      wepCombos[weapon],
                                    ];
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

function buildDifferential(itemSet, primeSet, player, contentType) {
  let doubleSlot = {};
  const primeList = primeSet.itemList;
  const diffList = itemSet.itemList;
  let differentials = {
    items: [],
    scoreDifference: (Math.round(primeSet.hardScore - itemSet.hardScore) / primeSet.hardScore) * 100,
    rawDifference: Math.round(((itemSet.hardScore - primeSet.hardScore) / primeSet.hardScore) * player.getHPS(contentType)),
  };

  for (var x = 0; x < primeList.length; x++) {
    if (primeList[x].uniqueHash !== diffList[x].uniqueHash) {
      differentials.items.push(diffList[x]);
      doubleSlot[diffList[x].slot] = (doubleSlot[diffList[x].slot] || 0) + 1;

      if ((x === 13 || x === 11) && doubleSlot[diffList[x].slot] <= 1) {
        differentials.items.push(diffList[x - 1]);
      }
    }
  }
  return differentials;
}

/**
 * Make sure a set is viable, and then prune sets that aren't close to best.
 * @param {*} itemSets A sorted list of scored sets.
 * @returns A slimmer version of our set list.
 */
function pruneItems(itemSets, userSettings) {
  let temp = itemSets.filter(function (set) {
    return set.verifySet(userSettings);
  });

  return temp.slice(0, softSlice);
}

function sumScore(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) { // eslint-disable-line
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

function enchantItems(bonus_stats, setInt, castModel) {
  let enchants = {};
  // Rings - Best secondary.
  // We use the players highest stat weight here. Using an adjusted weight could be more accurate, but the difference is likely to be the smallest fraction of a
  // single percentage. The stress this could cause a player is likely not worth the optimization.
  let highestWeight = getHighestWeight(castModel);
  bonus_stats[highestWeight] += 128; // 64 x 2.
  enchants["Finger"] = "+82 " + highestWeight;

  // Chest
  // There is a mana option too that we might include later.
  bonus_stats.intellect += 150; 
  enchants["Chest"] = "Waking Stats";

  // Cape
  bonus_stats.leech += 125;
  enchants["Back"] = "Regenerative Leech";

  // Wrists
  bonus_stats.leech += 200;
  enchants["Wrist"] = "Devotion of Leech";

  // Belt
  enchants["Waist"] = "Shadowed Belt Clasp";

  // Legs - Also gives 3/4/5% mana.
  bonus_stats.intellect += 177;
  enchants["Legs"] = "Temporal Spellthread";

  // Weapon - Sophic Devotion
  // Eternal Grace is so poor that it isn't even compared.
  let expected_uptime = convertPPMToUptime(1, 15);
  //bonus_stats.intellect += 932 * expected_uptime;
  enchants["CombinedWeapon"] = "Spore Tender"; //"Sophic Devotion";
  enchants["2H Weapon"] = "Spore Tender"; //"Sophic Devotion";
  enchants["1H Weapon"] = "Spore Tender"; //"Sophic Devotion";
  return enchants;
}

function dupObject(set) {
  return JSON.parse(JSON.stringify(set));
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
function evalSet(itemSet, player, contentType, baseHPS, userSettings, castModel, reporting = false) {
  // == Setup ==
  let builtSet = itemSet.compileStats("Retail", userSettings);
  let report = {};
  let setStats = builtSet.setStats;
  let gearStats = dupObject(setStats);
  const setBonuses = builtSet.sets;

  let enchantStats = {};
  let evalStats = {};
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



  // == Enchants and gems ==
  const enchants = userSettings.enchantItems ? enchantItems(bonus_stats, setStats.intellect, castModel) : {};

  // Sockets
  //const highestWeight = getHighestWeight(castModel);
  //bonus_stats[highestWeight] += 88 * builtSet.setSockets;
  //enchants["Gems"] = highestWeight;
  enchants["Gems"] = getGems(player.spec, Math.max(0, builtSet.setSockets), bonus_stats, contentType);
  enchants["GemCount"] = builtSet.setSockets;
  // Add together the sets base stats & any enchants or gems we've added.
  compileStats(setStats, bonus_stats);
  compileStats(gearStats, bonus_stats);
  builtSet.baseStats = gearStats;

  // == Effects ==
  // Effects include stuff like trinkets, legendaries, tier sets and so on.
  // Each effect returns an object containing which stats it offers. Specific details on each effect can be found in the TrinketData, EffectData and EffectEngine files.
  // -- Disc note: On use trinkets and legendaries and handled further down in the ramps section. --





  // ------------------

  let effectStats = [];
  let effectList = [...itemSet.effectList];
  // == Set Bonuses ==
  // --- Item Set Bonuses ---
  for (const set in setBonuses) {
    if (setBonuses[set] > 1) {
      effectList = effectList.concat(getItemSet(set, setBonuses[set], player.getSpec()));
    }
  }

  // Special fire multiplier to make sure we're including sources of fire damage toward fire specific rings.
  let fireMult = 0;
  // Frostfire Belt, Flaring Cowl, Flame Licked
  if (builtSet.checkHasItem(191623)) fireMult = convertPPMToUptime(3, 10);
  else if (builtSet.checkHasItem(193494)) fireMult = 1;
  else if ('primGems' in userSettings && userSettings.primGems.value.includes("Flame Licked")) fireMult = convertPPMToUptime(2.5, 7);

  userSettings.fireMult = fireMult || 0;
  //effectStats.push(bonus_stats);
  for (var x = 0; x < effectList.length; x++) {
    const effect = effectList[x];
    if (player.spec !== "Discipline Priest" || (player.spec === "Discipline Priest" && !effect.onUse && effect.type !== "spec legendary") || contentType === "Dungeon") {
      effectStats.push(getEffectValue(effect, player, castModel, contentType, effect.level, userSettings, "Retail", setStats));
    }
  }

  // Special 10.0.7 Ring
  // Check if ring in set.
  if (builtSet.checkHasItem(203460)) {
    // Auto gen best gems.
    const itemLevel = builtSet.itemList.filter(item => item.id === 203460)[0].level || 411;

    const combo = player.getBestPrimordialIDs(userSettings, contentType, itemLevel);
    //const combo = getBestCombo(player, contentType, itemLevel, player.activeStats, userSettings)

    // Handle Annulet
    const annuletStats = getOnyxAnnuletEffect(combo, player, contentType, itemLevel, player.activeStats, userSettings);
    //console.log(annuletStats);
    builtSet.primGems = combo; 
    effectStats.push(annuletStats);
 }

  const mergedEffectStats = mergeBonusStats(effectStats);



  // == Disc Specific Ramps ==
  // Further documentation is included in the DiscPriestRamps files.
  if (player.spec === "Discipline Priest" && contentType === "Raid") {
    setStats.intellect *= 1.05;
    const setRamp = evalDiscRamp(itemSet, setStats, castModel, effectList, reporting)
    if (reporting) report.ramp = setRamp;
    setStats.hps += setRamp.totalHealing / 180;

    evalStats = JSON.parse(JSON.stringify(mergedEffectStats));
    evalStats.leech = (setStats.leech || 0) + (mergedEffectStats.leech || 0);
    evalStats.hps = (setStats.hps || 0) + (mergedEffectStats.hps || 0);
  }

  // == Diminishing Returns ==
  // Here we'll apply diminishing returns. If we're a Disc Priest then we already took care of this during the ramp phase.
  // DR on trinket procs and such are calculated in their effect formulas, so that we can DR them at their proc value, rather than their average value.
  // Disc Note: Disc DR on base stats is already included in the ramp modules and doesn't need to be reapplied here.
  if (!(player.spec === "Discipline Priest" && contentType === "Raid")) {
    setStats = applyDiminishingReturns(setStats); // Apply Diminishing returns to our haul.

    // Apply soft DR formula to stats, as the more we get of any stat the weaker it becomes relative to our other stats.
    adjusted_weights.haste = (adjusted_weights.haste + adjusted_weights.haste * (1 - (DR_CONST * setStats.haste) / STATPERONEPERCENT.Retail.HASTE)) / 2;
    adjusted_weights.crit = (adjusted_weights.crit + adjusted_weights.crit * (1 - (DR_CONST * setStats.crit) / STATPERONEPERCENT.Retail.CRIT)) / 2;
    adjusted_weights.versatility = (adjusted_weights.versatility + adjusted_weights.versatility * (1 - (DR_CONST * setStats.versatility) / STATPERONEPERCENT.Retail.VERSATILITY)) / 2;
    adjusted_weights.mastery = (adjusted_weights.mastery + adjusted_weights.mastery * (1 - (DR_CONST * setStats.mastery) / (STATPERONEPERCENT.Retail.MASTERY / STATPERONEPERCENT.Retail.MASTERYMULT[player.spec]))) / 2;
    adjusted_weights.leech = (adjusted_weights.leech + adjusted_weights.leech * (1 - (DR_CONSTLEECH * setStats.leech) / STATPERONEPERCENT.Retail.LEECH)) / 2;

    //addBaseStats(setStats, player.spec); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.
    setStats = compileStats(setStats, mergedEffectStats); // DR for effects are handled separately.

    // == Apply same set int bonus ==
    // 5% int boost for wearing the same items.
    // The system doesn't actually allow you to add items of different armor types so this is always on.
    setStats.intellect *= 1.05;

    evalStats = setStats;
  }

  // == Scoring ==
  for (var stat in evalStats) {
    if (stat === "hps") {
      hardScore += (evalStats[stat] / baseHPS) * player.activeStats.intellect;
    } else if (stat === "dps") {
      if (contentType === "Dungeon") hardScore += (evalStats[stat] * CONSTANTS.dpsValue / baseHPS) * player.activeStats.intellect;
      else continue;
    } 
    else if (stat === "mana") {
      hardScore += evalStats[stat] * player.getSpecialQuery("OneManaHealing", contentType) / player.getHPS(contentType) * player.activeStats.intellect
    }
    else {
      hardScore += evalStats[stat] * adjusted_weights[stat];
    }
  }

  addBaseStats(setStats, player.spec); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.

  if (player.spec === "Discipline Priest" && contentType === "Raid") setStats = compileStats(setStats, mergedEffectStats);

  // Double on-use adjustment
  // This is not a perfect representation of the cost of wearing two on-use trinkets as Paladin and Disc,
  // but from a practical viewpoint it achieves the objective. It could be replaced with something more
  // mathematically comprehensive in future. Disc Priest will be swapped to the new tech very soon.
  if ((player.spec === "Holy Paladin" || player.spec === "Restoration Shaman" || player.spec === "Holy Priest") && "onUseTrinkets" in builtSet && builtSet.onUseTrinkets.length == 2) {
    hardScore -= 500;
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

function mergeStat(stats, statName) {
  return stats.reduce(function (a, b) {
    if (!isNaN(b[statName])) return a + b[statName];
    else return a;
  }, 0);
}

// Merges together an array of bonus_stats.
export function mergeBonusStats(stats) {
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
  };

  return val;
}

//
function getHighestWeight(castModel) {
  let max = "";
  let maxValue = 0;
  let weights = castModel.getBaseStatWeights();

  for (var stat in weights) {
    if (weights[stat] > maxValue && ["crit", "haste", "mastery", "versatility"].includes(stat)) {
      max = stat;
      maxValue = weights[stat];
    }
  }

  return max;
}

// Compiles stats & bonus stats into one array to which we can then apply DR etc.
function compileStats(stats, bonus_stats) {
  for (var stat in stats) {
    stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
  }

  return stats;
}

function addBaseStats(stats, spec) {
  stats.crit += STATPERONEPERCENT.Retail.CRIT * 5;
  stats.mastery += STATPERONEPERCENT.Retail.MASTERY * 8;

  return stats;
}

const deepCopyFunction = (inObject) => {
  let outObject, value, key;

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

export function evalDiscRamp(itemSet, setStats, castModel, effectList, reporting = false) {
      // Setup any ramp settings or special effects that need to be taken into account.
      let rampSettings = { playstyle: castModel.modelName, trinkets: {} };
      let specialSpells = ["Rapture"];
      // Setup ramp cast sequences
      const onUseTrinkets = itemSet.onUseTrinkets.map((trinket) => trinket.name);

      let trinketInfo = {};
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