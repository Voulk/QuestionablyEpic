import { getEffectValue } from "../../../../Retail/Engine/EffectFormulas/EffectEngine" ;
import { getDomGemEffect, applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { dominationGemDB } from "Databases/DominationGemDB";

export function buildDomEffectList(domGems, player, gemList, setPieces) {
    const effects = []
    domGems.forEach(gem => {
      const gemRank = player.getDominationSingleRank(gem)
      const effect = {
        type: "domination gem",
        name: gem,
        rank: gemRank,
      };
      effects.push(effect);
      const gemData = dominationGemDB.filter(gemDB => {
        return gemDB.effect.name === gem && gemDB.effect.rank == gemRank;
      });
      if (gemData.length > 0) gemList.push(gemData[0].gemID);
    });
    if (setPieces.blood && domGems.includes("Shard of Jas") && domGems.includes("Shard of Bek") && domGems.includes("Shard of Rev")) {
      const effect = {
        type: "domination gem",
        name: "Blood Link",
        rank: player.getDominationSetRank("Blood"),
      };
      effects.push(effect);
    }
    else if (setPieces.frost && domGems.includes("Shard of Kyr") && domGems.includes("Shard of Cor") && domGems.includes("Shard of Tel")) {
      const effect = {
        type: "domination gem",
        name: "Winds of Winter",
        rank: player.getDominationSetRank("Frost"),
      };
      effects.push(effect);
    }
    else if (setPieces.unholy && domGems.includes("Shard of Zed") && domGems.includes("Shard of Dyz") && domGems.includes("Shard of Oth")) {
      const effect = {
        type: "domination gem",
        name: "Chaos Bane",
        rank: player.getDominationSetRank("Unholy"),
      };
      effects.push(effect);
    }
    return effects;
  }

export function buildBestDomSet(itemSet, player, castModel, contentType, slots) {

    let results = []
    let scores = []


    //const domGems = ['Shard of Bek', 'Shard of Jas', 'Shard of Rev', 'Shard of Cor', 'Shard of Tel', 'Shard of Kyr', 'Shard of Dyz', 'Shard of Zed', 'Shard of Oth' ];
    const domGems = player.getOwnedDominationShards();
    //let effectList = [];
    const setPieces = checkSetPieces(itemSet.itemList, player.spec);
    const shardScores = scoreShards(player, castModel, contentType);
    const setScores = scoreSets(player, castModel, contentType);

    let result = []
    result.length = Math.min(domGems.length, slots);
    generateSet( domGems, result.length, 0);
    function generateSet(input, len, start) {
        if(len === 0) {
        results.push(result.join(","));
        return;
        }
        for (let i = start; i <= input.length - len; i++) {
        result[result.length - len] = input[i];
        generateSet(input, len-1, i+1 );
        }
    }

    for (var x = 0; x < results.length; x++) {
        // One result. 
        let score = 0;
        results[x].split(",").forEach(shard => {
        score += shardScores[shard];
        })
        
        // Check for sets
        if (setPieces.blood && results[x].includes("Shard of Jas") && results[x].includes("Shard of Bek") && results[x].includes("Shard of Rev")) {
        // Blood Set
        score += setScores['Blood']
        }
        else if (setPieces.frost &&results[x].includes("Shard of Kyr") && results[x].includes("Shard of Cor") && results[x].includes("Shard of Tel")) {
        // Frost Set
        score += setScores['Frost']
        }
        else if (setPieces.unholy &&results[x].includes("Shard of Zed") && results[x].includes("Shard of Dyz") && results[x].includes("Shard of Oth")) {
        // Unholy Set
        score += setScores['Unholy']
        }
        
        scores.push({"set": results[x], "score": score});
    }
    let gemList = []
    scores = scores.sort((a, b) => (a.score < b.score ? 1 : -1));
    const gemEffects = buildDomEffectList(scores[0].set.split(","), player, gemList, setPieces);
    itemSet.effectList = itemSet.effectList.concat(gemEffects)
    itemSet.domGemList = gemList;

    return 0;

    }

export function checkSetPieces(itemList, playerClass) {
let setPieces = {"unholy": false, "blood": false, "frost": false};
let setSlots = {"Restoration Druid": {unholy: ["Head", "Hands"], blood: ["Chest", "Feet"], frost: ["Shoulder", "Legs"]},
                "Mistweaver Monk": {unholy: ["Head", "Hands"], blood: ["Chest", "Feet"], frost: ["Shoulder", "Legs"]},
                "Holy Priest": {unholy: ["Head", "Waist"], blood: ["Chest", "Legs"], frost: ["Shoulder", "Wrist"]},
                "Discipline Priest": {unholy: ["Head", "Waist"], blood: ["Chest", "Legs"], frost: ["Shoulder", "Wrist"]},
                "Restoration Shaman": {unholy: ["Head", "Waist"], blood: ["Chest", "Legs"], frost: ["Shoulder", "Feet"]},
                "Holy Paladin": {unholy: ["Head", "Wrist"], blood: ["Chest", "Hands"], frost: ["Shoulder", "Legs"]},
};

for (const set in setPieces) {
    setPieces[set] = itemList.filter(item => 
    {return (setSlots[playerClass][set].includes(item.slot) && item.hasDomSet)}).length > 0
}
return setPieces;

}

function scoreSets(player, castModel, contentType) {
    const setScores = {'Blood': getEstimatedHPS(getEffectValue({"type": "domination gem", "name": "Blood Link", "rank": player.getDominationSetRank("Blood"),}, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType), 
    'Frost': getEstimatedHPS(getEffectValue({"type": "domination gem", "name": "Winds of Winter", "rank": player.getDominationSetRank("Frost"),}, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType), 
    'Unholy': getEstimatedHPS(getEffectValue({"type": "domination gem", "name": "Chaos Bane", "rank": player.getDominationSetRank("Unholy"),}, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType)};
  
    return setScores;
  }

function scoreShards(player, castModel, contentType) {
    let shardScores = {};
    const domGems = ['Shard of Bek', 'Shard of Jas', 'Shard of Rev', 'Shard of Cor', 'Shard of Tel', 'Shard of Kyr', 'Shard of Dyz', 'Shard of Zed', 'Shard of Oth' ];
    for (var i = 0; i < domGems.length; i++) {
        const shard = domGems[i];
        const effect = {type: "domination gem", name: shard, rank: player.getDominationSingleRank(shard)};
        shardScores[shard] = getEstimatedHPS(getEffectValue(effect, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType);
    }

    return shardScores;
}

// Converts a bonus_stats dictionary to a singular estimated HPS number.
export function getEstimatedHPS(bonus_stats, player, contentType) {
    let estHPS = 0;
    for (const [key, value] of Object.entries(bonus_stats)) {
      if (["haste", "mastery", "crit", "versatility", "leech"].includes(key)) {
        estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
      } else if (key === "intellect") {
        estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
      } else if (key === "hps") {
        estHPS += value;
      }
      else if (key === "dps" && contentType === "Dungeon") {
        estHPS += value;
      }
    }
  
    return Math.round(estHPS);
  }