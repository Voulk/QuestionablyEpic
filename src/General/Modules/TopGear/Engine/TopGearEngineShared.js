
const softSlice = 25;
import { classicGemDB } from "Databases/ClassicGemDB";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import { getTranslatedSlotName } from "locale/slotsLocale";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

export function createTopGearWorker() {
  return new Worker(new URL('./TopGearWorker.js', import.meta.url), { type: 'module' });
}

// Compiles stats & bonus stats into one array to which we can then apply DR etc. 
export function compileStats(stats, bonus_stats) {

    for (var stat in stats) {
      stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
    }
  
    return stats
    
  }


// TODO: Add blocklist. It can be fairly basic.
export const generateReportCode = () => {
    let result = "";
    const stringLength = 12;
    const possChars ='abcdefhijklmnopqrstuvwxyz';
  
    const charLength = possChars.length;
    for ( let i = 0; i < stringLength; i++ ) {
        result += possChars.charAt(Math.floor(Math.random() * charLength));
    }
  
    return result;
  }

  export function buildDifferentialClassic(itemSet, primeSet, player, contentType) {


  }

  export function buildDifferential(itemSet, primeSet, player, contentType) {
    let doubleSlot = {};
    const primeList = primeSet.itemList;
    const diffList = itemSet.itemList;
    let differentials = {
      items: [],
      gems: [],
      scoreDifference: (Math.round(primeSet.hardScore - itemSet.hardScore) / primeSet.hardScore) * 100,
      rawDifference: Math.round(((itemSet.hardScore - primeSet.hardScore)))/* * player.getHPS(contentType))*/,
    };
  
    for (var x = 0; x < diffList.length; x++) {
      // Check if the other set has the corresponding slot.
      //console.log(primeList[x])
      if ((primeList[x] && primeList[x].slot === "Offhand" && !diffList[x])) {
        // The prime list has an offhand but the diffList has ended already. There's nothing to add to differentials so skip.
        continue;
      }

      /*
      if (diffList[x] && primeList[x].uniqueHash !== diffList[x].uniqueHash) {
        differentials.items.push(diffList[x]);
        doubleSlot[diffList[x].slot] = (doubleSlot[diffList[x].slot] || 0) + 1;
  
        // Trinkets and Rings
        if ((x === 13 || x === 11) && doubleSlot[diffList[x].slot] <= 1) {
          differentials.items.push(diffList[x - 1]);
        }
      } */
      if (!(primeList.some(item => item.uniqueHash === diffList[x].uniqueHash))) {
        differentials.items.push(diffList[x]);
        // The item is in both sets.
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
  
export function pruneItems(itemSets) {
let temp = itemSets.filter(function (set) {
    return set.verifySet();
});

return temp.slice(0, softSlice);
}

/*
{"ramp":{"totalHealing":2679285.3742785756,
"ramps":[{"tag":"Primary Ramp","pre-ramp conditions":["Power of the Dark Side","Active DoT"],
"sequence":["Purge the Wicked","Rapture","Power Word: Shield x9","Power Word: Radiance x2","Instructor's Divine Bell (new)","Evangelism","Boon of the Ascended","Ascended Blast","Schism","Ascended Blast","PenanceTick x3","Ascended Blast","Ascended Nova x2","Ascended Blast","Ascended Nova x3","Smite x10"],"totalHealing":1095608},{"tag":"Fiend Ramp","pre-ramp conditions":["Power of the Dark Side","Active DoT"],"sequence":["Purge the Wicked","Rapture","Power Word: Shield x9","Instructor's Divine Bell (new)","Shadowfiend","Power Word: Radiance x2","Evangelism","Schism","PenanceTick x3","Mind Blast","Power Word: Solace","Smite x3","PenanceTick x3","Smite x8"],"totalHealing":922791},{"tag":"Mini Ramp","pre-ramp conditions":["Power of the Dark Side","Active DoT"],"sequence":["Purge the Wicked","Power Word: Shield x6","Power Word: Radiance x2","Schism","Mind Blast","Power Word: Solace","PenanceTick x3","Smite x4","PenanceTick x3","Smite x6"],"totalHealing":330443}],"rampSettings":{"playstyle":"Kyrian Evangelism","4T28":true,"Instructor's Divine Bell (new)":448,"Pelagos":true,"Sphere's Harmony":true,"Penitent One":true},"stats":{"intellect":2346.315679178794,"haste":1071,"crit":826,"mastery":657.044,"versatility":352,"leech":132,"hps":14884.918745992087,"dps":0,"mana":40.425}}}
*/

// Takes a raw report and prints it in a nicer format.

export function formatReport(report) {
    const rampData = report.ramp;
    const statData = rampData.stats;
    console.log("This is a developer / TC focused preview of the upcoming report functionality. If there's anything you'd like to see on it please DM me. The mini-ramp is run twice per cycle.")
    console.log("== Set Ramp Information == ")
    console.log("Total Healing Done: " + Math.round(rampData.totalHealing) + " (" + Math.round(rampData.totalHealing / rampData.manaSpent * 100) / 100 +"hpm)");
    console.log("Settings: " + JSON.stringify(rampData.rampSettings))
    
    
    for (const [stat, value] of Object.entries(statData)) {
        statData[stat] = Math.round(value);
      }

    console.log("Stats (may include proc averages): " + JSON.stringify(statData));
    console.log("--------------------------")
    rampData.ramps.forEach(ramp => {
        console.log("=> Ramp Name: " + ramp.tag + " (" + Math.round(ramp.totalHealing) + " healing)");
        console.log("Pre-ramp conditions: " + ramp.prerampConditions);
        console.log(JSON.stringify(ramp.sequence));

    })

    console.log("--------------------------")
    console.log("= Total Damage Breakdown =")
    console.log(JSON.stringify(rampData.damageBreakdown));
    console.log("= Total Healing Breakdown =")
    console.log(JSON.stringify(rampData.healingBreakdown));
    console.log("===============================================")

    //console.log("Note: Penitent One is currently coded as an increase to each Penance tick instead of adding ticks. This is -slightly- less accurate and will be corrected.");
    
    /*
    console.log("Total Healing: " + Math.round(rampResult.totalHealing));
    console.log("Legendaries used: Clarity of Mind");
    console.log("Conduits used: " + JSON.stringify(conduits));
    console.log("On use Trinkets used: " + " Instructor's Divine Bell (213 ilvl, ~20% expected overhealing)")
    console.log("Post-DR passive stat breakdown: " + JSON.stringify(stats));   
})*/

}


  
export function sumScore(obj) {
    var sum = 0;
    for (var el in obj) {
        if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
        }
    }
    return sum;
}
  
  
  
export const deepCopyFunction = (inObject) => {
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

export const setupGems = (itemList, adjusted_weights, playerSettings, statOrder, hasteNeeded = 0) => {

    //const useEpicGems = getSetting(playerSettings, "classicGemSettings") === "Epic";
    const gemBudget = 160;
    // Handle sockets
    // This is a naiive implementation that checks a socket bonus, and grabs it if its worth it. 
    
    // First, let's see how far off the next haste breakpoint we are. This is particularly relevant for Druid.
    // Add to "Mandatory yellows" for the next step.
    let mandatoryYellows = 0;
    /*const gemIDS = {
      52208: 'yellow',
      52207: 'red',
      52236: 'blue',

      71881: 'red',
      71850: 'yellow', // int / haste
      71868: 'blue',
    }*/
    const yellowOptions = {
      haste: 76668,
      crit: 76660,
      mastery: 76672
    }

    const gemIDS = Object.fromEntries(classicGemDB.map(gem => [gem.id, gem.color]));
    const gemSetting = getSetting(playerSettings, "classicGems");
    const bestSecondary = statOrder.find(stat => ['haste', 'crit', 'mastery'].includes(stat));
    const yellowGemID = yellowOptions[bestSecondary]; // Int / haste but options available. Haste = 76668. Crit = 76660, Mast = 76672
    const hasteGemID = 76668;
    const metaGemID = 76885; // Meta choice is basically between 432 spirit & 216 intellect.
    const redGemID = 76694; // Pure int but look into hybrids
    const blueGemID = 76686;
    const shaGemID = 89882; // Sha gem, 500 intellect
    //let hasteGemsNeeded = hasteNeeded > 0 ? Math.ceil(hasteNeeded / 160) : 0; // 160 haste per gem
    const orangeGemCount = itemList.filter(item => item.classicSockets.sockets.includes("yellow")).length;
    const hasteSocketBonuses = 0;
    const cogwheelCount = Math.min(1, itemList.filter(item => item.classicSockets.sockets.includes("cogwheel")).length);
    let hasteGemsNeeded = 0;
    if (hasteNeeded > 0 && (orangeGemCount * 160 + cogwheelCount * 600) >= hasteNeeded) {
      if (cogwheelCount > 0) {
        // This is only tricky if we have cogwheels.
        if ((orangeGemCount * 160) >= hasteNeeded) {
          hasteGemsNeeded = Math.ceil((hasteNeeded) / 160); // 160 haste per gem
        }
        else {
          // Orange gems aren't enough, flip a cogwheel and then re-run.
          hasteGemsNeeded = Math.max(0, Math.ceil((hasteNeeded - cogwheelCount * 600) / 160)); // 160 haste per gem
        }
      }
      else {
        hasteGemsNeeded = Math.ceil(hasteNeeded / 160); // 160 haste per gem
      }
    }
    
   // (hasteNeeded > 0 && (orangeGemCount * 160 + cogwheelCount * 600) >= hasteNeeded) ? Math.ceil((hasteNeeded - cogwheelCount * 600) / 160) : 0; // 160 haste per gem
  // Maybe do at the end so we can include socket bonuses?
    // Add a check to see if it can get there with the oranges available.

    const socketScores = {red: adjusted_weights.intellect * gemBudget, 
                          prismatic: adjusted_weights.intellect * gemBudget,
                          blue: adjusted_weights.intellect * gemBudget / 2 + adjusted_weights.spirit * gemBudget, 
                          yellow: adjusted_weights.intellect * gemBudget / 2 + adjusted_weights[bestSecondary] * gemBudget,
                        sha: adjusted_weights.intellect * 500 }
    //console.log("Haste gems needed: " + hasteGemsNeeded);
    // If running Ember: Next, cycle through socket bonuses and maximize value from two yellow gems.
    // If running either: cycle through any mandatory yellows from Haste breakpoints.
    const topGearGems = {};  // {itemID: [gems]}


    const gemResults = [];
    const gemScores = {};

    const scoreSocketBonus = (bonus) => {
      let score = 0;
      Object.entries(bonus).forEach(([key, value]) => {
        score = adjusted_weights[key] * value
      });
      return score;
    }

      // First, optimize gems in general. Afterwards we will look at lowest cost of replacing them with oranges.
      itemList.forEach((item, index) => {
        // { score: 0, itemIDs: []}
        if (item.classicSockets.sockets.length > 0) {
          let gemsToSocket = item.classicSockets.sockets.filter(gem => (gem !== "meta" && gem !== "cogwheel" && gem !== "sha")).length; // Check for any already socketed gems.
          item.socketedGems = [];
          if (item.slot === "Head") item.socketedGems.push(metaGemID);
          if (item.classicSockets.sockets[0] === "sha") item.socketedGems.push(shaGemID);

          // TODO: Scoring function is working, but it won't check for gems we placed earlier.
          const socketBonus = item.classicSockets.bonus ? scoreSocketBonus(item.classicSockets.bonus) : 0;
          
          const pureReds = gemsToSocket * socketScores.red;
          const pairedStrat = item.classicSockets.sockets.reduce((accumulator, socket) => accumulator + socketScores[socket] || 0, 0) + socketBonus;
          //if (item.id === 87019) console.log("Item: " + JSON.stringify(item.classicSockets) + " | Pure Reds: " + pureReds + " | Paired Strategy: " + pairedStrat + " | Gems to socket: " + socketBonus + " " + JSON.stringify(socketScores));
          
          if (pairedStrat >= pureReds || (gemSetting === "Prefer Match" && socketBonus)) {
            item.classicSockets.sockets.forEach(socket => {
              //if (socket === "meta") item.socketedGems.push(metaGemID);
              if (socket === "red") item.socketedGems.push(redGemID);
              else if (socket === "yellow") { 
                if (hasteGemsNeeded > 0) {
                  item.socketedGems.push(hasteGemID);
                  hasteGemsNeeded -= 1;
                  hasteNeeded -= 160;
                } else item.socketedGems.push(yellowGemID);
              }
              else if (socket === "blue") item.socketedGems.push(blueGemID); // Blue gem
            })
            gemScores[index] = pairedStrat;
          }
          else {
            item.socketedGems.push(...Array(gemsToSocket).fill(redGemID));
            gemScores[index] = pureReds;
          } 
        }
      });
      // == Check yellow replacements ==
      // Potentially can kill this entirely in MoP.

      /*itemList.forEach((item, index) => {
        const sockets = item.classicSockets.sockets;
        let itemIndex = 0;
        sockets.forEach((socket, socketIndex) => {
          if (gemIDS[item.socketedGems[socketIndex]] === "yellow" || sockets[socketIndex] === "meta"|| sockets[socketIndex] === "cogwheel") {}// do nothing
          else {
            let score = 0;
            // The socket isn't yellow, try and make it orange.
            const originalScore = gemScores[index];
            const newSockets = [...item.socketedGems];
            newSockets[socketIndex] = yellowGemID;
            
            // We've made the socket yellow. Let's score it.
            let newScore = newSockets.reduce((accumulator, socket) => accumulator + socketScores[gemIDS[socket]] || 0, 0);

            // Check if adding the yellow socket gives us a bonus.
            const socketBonus = newSockets.map(i => gemIDS[i]).every((element, index) => element === sockets[index] || sockets[index] === "prismatic");

            if (socketBonus && item.classicSockets.bonus) {
              newScore += scoreSocketBonus(item.classicSockets.bonus);
            }

            score = originalScore - newScore;

            gemResults.push({itemIndex: index, socketIndex: socketIndex, score: score, itemName: item.name, originalScore: originalScore, newScore: newScore});
            itemIndex++;
          }
        })
        
      });
      gemResults.sort((a, b) => (a.score > b.score ? 1 : -1));
      for (let i = 0; i < mandatoryYellows; i++) {
        //console.log("Replacing " + itemList[gemResults[i].itemIndex].name + " socket " + gemResults[i].socketIndex + " with a yellow gem.")
        itemList[gemResults[i].itemIndex].socketedGems[gemResults[i].socketIndex] = yellowGemID;
      } */

    // Lastly, we need to actually add the stats from socketed gems.
    const socketedGemStats = [];
    itemList.forEach(item => {
      item.socketedGems.forEach(gemID => {
        socketedGemStats.push(classicGemDB.filter(gem => gem.id === gemID)[0].stats);
      });

      if (item.socketedGems.map(i => gemIDS[i]).every((element, index) => (element === item.classicSockets.sockets[index] || item.classicSockets.sockets[index] === "prismatic"))) {
        // Socket bonus
        if (item.classicSockets.bonus) socketedGemStats.push(item.classicSockets.bonus);
      }

      if (item.classicSockets.sockets.includes("cogwheel")) {
        // Eng gems
        // Get best two secondaries. 
        const engSockets = {
          haste: 77542,
          crit: 77541,
          mastery: 77547,
          spirit: 77546
        }
        //socketedGemStats.push({mastery: 600});
        socketedGemStats.push({[statOrder[0]]: 600});
        item.socketedGems.push(engSockets[statOrder[0]]);

        if (hasteNeeded < 600 && hasteNeeded > 0) {
          socketedGemStats.push({haste: 600});
          item.socketedGems.push(engSockets.haste);
        }
        else {
          socketedGemStats.push({[statOrder[1]]: 600});
          item.socketedGems.push(engSockets[statOrder[1]]);
        }


      }

      topGearGems[item.id] = item.socketedGems;
      item.socketedGems = [];
    });
    const compiledGems = socketedGemStats.reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
          acc[key] = (acc[key] || 0) + value;
      }
      return acc;
    }, {});

    // Remove gems from items and add to dictionary instead.
    

    return {stats: compiledGems, gems: topGearGems};
}

export const getRaceBonus = (race, bonus_stats) => {
  switch (race) {
    case "Blood Elf":
      return bonus_stats;
  }
}

/*
export function addOptimizedDruidSets(itemSets) {
  for (let i = 0; i < itemSets.length; i++) {
    const itemSet = itemSets[i];

    // For each set, run smart reforging. 

  }


  const baseStats = itemSet.setStats;
  const secondaryRank = ["spirit", "mastery", "crit"]
  const hasteRanges = [];
  const hasteSlots = {};
  // Loop through each item, if no haste, add haste.
  itemSet.itemList.forEach(item => {
    //const possibleReforges = []
    console.log(JSON.stringify(item.stats));
    if (item.stats.haste === undefined) {
      const fromStat = secondaryRank.slice().reverse().find(value => Object.keys(item.stats).includes(value));
      if (item.stats[fromStat]) hasteRanges.push(Math.round(item.stats[fromStat] * 0.4));
    }

    /*if (item.stats.haste === 0) {
      Object.keys(item.stats).forEach(statName => {
        if (["spirit", "crit", "mastery"].includes(statName)) {
          possibleReforges.push(Math.round(item.stats[statName] * 0.4));
        }
      })
    }
    //hasteRanges.push(possibleReforges);

  });
  console.log("HASTE");
  console.log(baseStats.haste);
  console.log(JSON.stringify(hasteRanges));
}*/
