
import { GEMS } from "General/Engine/GEMS";


export function filterClassicItemListBySource(itemList, sourceInstance, sourceBoss) {
    let temp = itemList.filter(function (item) {
      return (item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0);
    });
  
    return temp;
  } 

  export function getBestGem(player, color, rarity = "rare") {
    let colors = [];
    let gems = [...GEMS];
  
    if (color === "red") colors = ["red", "orange", "purple"];
    else if (color === "blue") colors = ["blue", "purple", "green"];
    else if (color === "yellow") colors = ["yellow", "orange", "green"];
    else if (color === "all") colors = ["yellow", "blue", "red", "purple", "orange", "green"];
  
    let gemList = gems.filter((filter) => colors.includes(filter.color) && filter.jewelcrafting === false && filter.rarity === rarity);
    gemList = scoreGemColor(gemList, player);
    return gemList[0];
  }
  
  // Get highest value of each gem color.
  // Compare value of socketing highest matching colors + socket bonus, to just socketing highest colors.
  export function socketItem(item, player) {
    const socketList = item.sockets;
    const bestGems = {
      overall: getBestGem(player, "all"),
      red: getBestGem(player, "red"),
      blue: getBestGem(player, "blue"),
      yellow: getBestGem(player, "yellow"),
    };
  
    let socketBonus = 0;
    if (socketList.bonus) {
      for (const [stat, value] of Object.entries(socketList.bonus)) {
        socketBonus += value * player[stat];
      }
    }
  
    let colorMatch = { gems: [], score: socketBonus };
    let socketBest = { gems: [], score: 0 };
    for (const socNum in socketList.gems) {
      const socket = socketList.gems[socNum];
      // Match colors
      if (["red", "blue", "yellow"].includes(socket)) {
        colorMatch["score"] += bestGems[socket].score;
        colorMatch["gems"].push(bestGems[socket].name);
  
        socketBest["score"] += bestGems["overall"].score;
        socketBest["gems"].push(bestGems["overall"].name);
      }
    }
    if (colorMatch.score >= socketBest.score) item.socketedGems = colorMatch;
    else item.socketedGems = item.socketedGems = socketBest;
  }

  function scoreGemColor(gemList, player) {
    for (var ind in gemList) {
      const gem = gemList[ind];
      let gemScore = 0;
      for (const [stat, value] of Object.entries(gem.stats)) {
        if (player[stat] && stat in player) gemScore += value * player[stat];
      }
      gem["score"] = gemScore;
    }
  
    gemList = gemList.sort(function (a, b) {
      return b.score - a.score;
    });
  
    return gemList;
  }

  function applyClassicStatMods(spec, setStats) {
    // This can be properly formalized.
    if (spec === "Holy Paladin Classic") {
      setStats.intellect = (setStats.intellect || 0) + (setStats.intellect || 0) * 0.1;
      setStats.spelldamage = (setStats.spelldamage || 0) + (setStats.intellect || 0) * 0.35;
    } else if (spec === "Restoration Shaman Classic") {
      setStats.bonushealing = (setStats.bonushealing || 0) + (setStats.intellect || 0) * 0.3;
      setStats.spelldamage = (setStats.spelldamage || 0) + (setStats.intellect || 0) * 0.3;
    } else if (spec === "Restoration Druid Classic") {
      // Also gets 30% of spirit MP5 as MP5
      setStats.spirit = (setStats.spirit || 0) * 1.15;
    } else if (spec === "Holy Priest Classic") {
      // Also gets 30% of spirit MP5 as MP5
      setStats.spirit = setStats.spirit * 1.05 || 0;
      //talent_stats.bonushealing = (setStats.spirit + talent_stats.spirit) * 0.25;
      setStats.spelldamage = (setStats.spelldamage || 0) + (setStats.spirit || 0) * 0.25;
    }
  
    return setStats;
  }