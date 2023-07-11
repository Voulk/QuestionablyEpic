
import { getBestGem } from "../../../Engine/ItemUtilitiesClassic";
import { deepCopyFunction } from "../Engine/TopGearEngineShared";
import { GEMS } from "General/Engine/GEMS";

// This holds all of our gemCollection objects, so that we can sort them later and pick the best.
const gemSets = []
let performanceTrack = 0 // Temporary variable to time loops for performance optimization.

// Converts an array of gems & colors to a set of bonus_stats. 
// It represents one item.
export function getGemStatLoadout(socketsAvailable, socketedPieces, socketedColors) {
    let bonus_stats = {}

    for (var i = 0; i < socketedPieces.length; i++) {
        for (var j = 0; j < socketedPieces[i].length; j++) {
            for (const [stat, value] of Object.entries(socketedPieces[i][j].stats)) {
                bonus_stats[stat] = stat in bonus_stats ? bonus_stats[stat] + value : value;    
            }
        }   
        if ('bonus' in socketsAvailable[i] && checkSocketBonus(socketsAvailable[i].gems, socketedColors[i])) {
          for (const [stat, value] of Object.entries(socketsAvailable[i].bonus)) {
              //console.log("Adding socket bonus" + stat + ". " + value);
              bonus_stats[stat] = stat in bonus_stats ? bonus_stats[stat] + value : value;
          }
      }
    }
    return bonus_stats;
}

// Check if a set of gems color matches a set of sockets.
export function checkSocketBonus(socketsAvailable, socketedGems) {
  let match = true;
  for (var i = 0; i < socketsAvailable.length; i++) {
    if (socketsAvailable[i] === "blue" && (socketedGems[i] !== "blue" && socketedGems[i] !== "purple" && socketedGems[i] !== "green")) match = false;
    else if (socketsAvailable[i] === "red" && (socketedGems[i] !== "red" && socketedGems[i] !== "purple" && socketedGems[i] !== "orange")) match = false;
    else if (socketsAvailable[i] === "yellow" && (socketedGems[i] !== "yellow" && socketedGems[i] !== "green" && socketedGems[i] !== "orange")) match = false;
  }
  return match;

}

// Get highest value of each gem color. 
// Compare value of socketing highest matching colors + socket bonus, to just socketing highest colors.
export function socketItem(sockets, player, socketList, bestGems, forcedGems = {}) {
  var r0 = performance.now(); // Temp performance variable.
  let numSocketed = socketList.numSocketed;
  const socketsAvailable = sockets.gems;

  if (!socketsAvailable) {
    // If the piece has no socket, move on. 
    socketList.socketedPieces.push([]);
    socketList.socketedColors.push([]);
    return socketList;
  }

  let socketBonus = 0 // The value of the socket bonus in score.
  if (sockets.bonus) {
    for (const [stat, value] of Object.entries(sockets.bonus)) {
      // Iterate the bonus stats object and add together any stat bonuses.
      socketBonus += value * player[stat];
    }
  }

  // colorMatch attempts to match the correct colors to each gem slot.
  // socketBest will just raw slot the best gem (usually red).
  let colorMatch = {gems: [], colors: [], score: 0};
  let socketBest = {gems: [], colors: [], score: 0};
  
  for (var i = 0; i < socketsAvailable.length; i++) {
    const socket = socketsAvailable[i];
    if (['red', 'blue', 'yellow'].includes(socket)) {
      if (Object.keys(forcedGems).includes(numSocketed.toString())) {
        const color = forcedGems[numSocketed];
        //console.log("Forcing color on key: " + numSocketed + ". " + forcedGems[numSocketed])

        colorMatch['score'] += bestGems[color].score;
        colorMatch['gems'].push(bestGems[color]);
        colorMatch['colors'].push(bestGems[color].color);
  
        socketBest['score'] += bestGems[color].score;
        socketBest['gems'].push(bestGems[color]);
        socketBest['colors'].push(bestGems[color].color);

      }
      else {
        colorMatch['score'] += bestGems[socket].score;
        colorMatch['gems'].push(bestGems[socket]);
        colorMatch['colors'].push(bestGems[socket].color);

        socketBest['score'] += bestGems['overall'].score;
        socketBest['gems'].push(bestGems['overall']);
        socketBest['colors'].push(bestGems['overall'].color);
      }
      numSocketed += 1;
    }
    else if (socket === "meta") {
      colorMatch['gems'].push(bestGems['meta'])
      socketBest['gems'].push(bestGems['meta'])
    }
  }
  
  // Add socket bonus if the set matches.
  colorMatch.score += checkSocketBonus(socketsAvailable, colorMatch.colors) ? socketBonus : 0;
  socketBest.score += checkSocketBonus(socketsAvailable, socketBest.colors) ? socketBonus : 0;

  socketList.numSocketed = numSocketed;
  var r1 = performance.now();
  performanceTrack += (r1 - r0)
 

  if (colorMatch.score >= socketBest.score) {
    // Matching the colors is ideal.
    socketList.score = socketList.score + colorMatch.score;
    socketList.socketedPieces.push(colorMatch.gems);
    socketList.socketedColors.push(colorMatch.colors);

    return socketList;
  }
  else  {
    socketList.score = socketList.score + socketBest.score;
    socketList.socketedPieces.push(socketBest.gems);
    socketList.socketedColors.push(socketBest.colors);

    return socketList;
  }

}

/**
 * Check if the meta socket is fulfillfed by the socketed colors. 
 */
function checkMeta(socketedColors, metaGem = "Bracing Earthstorm Diamond") {
    // Check if meta gem fulfilled.
    const flatColors = socketedColors.flat();
    const colorCount = {
      blue: flatColors.filter(function(x){ return x === "blue" || x === "purple" || x === "green"; }).length,
      red: flatColors.filter(function(x){ return x === "red" || x === "orange" || x === "purple"; }).length,
      yellow: flatColors.filter(function(x){ return x === "yellow" || x === "orange" || x === "green"; }).length,
    }
  

  if (metaGem === "Insightful Earthstorm Diamond" && colorCount.red >= 2 && colorCount.yellow >= 2 && colorCount.blue >= 2) {
    return true;
  }
  else if (metaGem === "Bracing Earthstorm Diamond" && colorCount.red > colorCount.blue) {
    return true;
  }
  else {
    return false;
  }

}

let bigCount = 0;

function recursivelyGenerateGemSet(maxIndices, func, gc, player, bestGems) {
  doRecursivelyGenerateGemSet(maxIndices, func, gc,player, bestGems, [], 0);
}

function doRecursivelyGenerateGemSet(maxIndices, func, gc, player, bestGems, args, index) {
  if (maxIndices.length == 0) {
    if (new Set(args).size === args.length && args[1] > args[0] && args[3] > args[2]) {
      func(args, gc, player, bestGems);
    }
      
  } else {
      var rest = maxIndices.slice(1);
      for (args[index] = 0; args[index] < maxIndices[0]; ++args[index]) {
          doRecursivelyGenerateGemSet(rest, func, gc, player, bestGems, args, index + 1);
      }
  }
}

function mathGemSet(args, gc, player, bestGems) {
  const metaBonus = 26;
    //console.log(args[0] + " " + args[1] + " " + args[2]);
    let forcedGems = {}
    forcedGems[args[0]] = 'blue';
    forcedGems[args[1]] = 'blue';
    forcedGems[args[2]] = 'yellow';
    forcedGems[args[3]] = 'yellow';
    //console.log(JSON.stringify(forcedGems));
    let localgc = deepCopyFunction(gc);
    for (const i in localgc.socketsAvailable) {
      localgc = socketItem(localgc.socketsAvailable[i], player, localgc, bestGems, forcedGems);
    }
    // Check socket bonus
    localgc.score += checkMeta(localgc.socketedColors) ? metaBonus : 0;

    gemSets.push(localgc);
    bigCount += 1;
  
}

export function gemGear(itemSet, player, userSettings) {
  //const locallyOptimal = 0;
  const metaSocketed = 0;
  const metaGem = userSettings.metaGem;

  // Create a GemCollection.
  const gemCollection = {
    score: 0,
    socketedPieces: [],
    socketedColors: [],
    socketsAvailable: [],
    colorCount: {},
    metaGem: false,
    numSocketed: 0,
  }

  itemSet.forEach(item => {
    const socketsOnItem = item.sockets !== "" && item.sockets ? item.sockets : {};
    socketsOnItem['slot'] = item.slot;
    gemCollection.socketsAvailable.push(socketsOnItem);
    if ("sockets" in item && item.sockets.gems !== undefined && item.sockets.gems.includes("meta")) gemCollection.metaGem = true;
  });

  const bestGems = {
    overall: getBestGem(player, "all", userSettings.gemRarity),
    red: getBestGem(player, "red", userSettings.gemRarity),
    blue: getBestGem(player, "blue", userSettings.gemRarity),
    yellow: getBestGem(player, "yellow", userSettings.gemRarity),
    meta: getMetaGem(metaGem),
  }


  // Gem locally optimal
  let locallyOptimal = {...gemCollection};
  for (const i in locallyOptimal.socketsAvailable) {
    locallyOptimal = socketItem(locallyOptimal.socketsAvailable[i], player, locallyOptimal, bestGems);
  }


  // Check if meta gem fulfilled.
  const flatColors = locallyOptimal.socketedColors.flat();
  locallyOptimal.colorCount = {
    blue: flatColors.filter(function(x){ return x === "blue" || x === "purple" || x === "green"; }).length,
    red: flatColors.filter(function(x){ return x === "red" || x === "orange" || x === "purple"; }).length,
    yellow: flatColors.filter(function(x){ return x === "yellow" || x === "orange" || x === "green"; }).length,
  }
  gemSets.push(locallyOptimal);
  // Check if player even has enough sockets for the meta gem.
  //console.log(locallyOptimal);
  if (gemCollection.metaGem === false || metaGem === "Bracing Earthstorm Diamond" 
      || checkMeta(locallyOptimal.socketedColors, metaGem) || (metaGem === "Insightful Earthstorm Diamond" && locallyOptimal.numSocketed < 6)) {
    // The optimal set of gems also activates the meta gem which means we don't have to worry about running anything complex.
    // Alternatively, we don't have 6 gems, so can't activate it in any case.
    // Our gear might also just not have a meta gem to begin with, in which case there is no need to run anything complex.
    return locallyOptimal;
  }
  else {
      // If not meta gem fulfilled, try the missing gems in each socket trying to find the slots that minimize the score loss.
      // Pick the highest set out of locally optimal and meta gem.
      let gc = deepCopyFunction(locallyOptimal);
      gc.socketedPieces = [];
      gc.socketedColors = [];
      gc.colorCount = {};
      gc.numSocketed = 0;
      const socketCount = locallyOptimal.numSocketed;
      recursivelyGenerateGemSet([socketCount, socketCount, socketCount, socketCount], mathGemSet, gc, player, bestGems)
      
      gemSets.sort((a, b) => (a.score < b.score ? 1 : -1));
      
      //console.log("Average loop cost: " + Math.round(performanceTrack / bigCount*10000)/10000 + "ms");

      return gemSets[0];

  }
}

function getMetaGem(name) {
  let gems = [...GEMS];
  const gem = gems.filter((filter) => (filter.name === name));
  return gem[0];
}