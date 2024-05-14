
const softSlice = 3000;
import { gemDB } from "Databases/GemDB";

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

  export function buildDifferential(itemSet, primeSet, player, contentType) {
    let doubleSlot = {};
    const primeList = primeSet.itemList;
    const diffList = itemSet.itemList;
    let differentials = {
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

export const setupGems = (itemList, adjusted_weights) => {

      // Handle sockets
    // This is a naiive implementation that checks a socket bonus, and grabs it if its worth it. 
    
    // First, let's see how far off the next haste breakpoint we are. This is particularly relevant for Druid.
    // Add to "Mandatory yellows" for the next step.
    let mandatoryYellows = 2;
    const gemIDS = {
      52208: 'yellow',
      52207: 'red',
      52236: 'blue'

    }
    const yellowGemID = 52208; // TODO: Autocalc this based on which would be best. 
    const metaGemID = 52296;
    const redGemID = 52207;
    const blueGemID = 52236;
    const socketScores = {red: adjusted_weights.intellect * 40, 
                          blue: adjusted_weights.intellect * 20 + adjusted_weights.spirit * 20, 
                          yellow: adjusted_weights.intellect * 20 + adjusted_weights.haste * 20}

    // If running Ember: Next, cycle through socket bonuses and maximize value from two yellow gems.
    // If running either: cycle through any mandatory yellows from Haste breakpoints.


      // We will optimize yellow gems in three steps:
      // - Cycle through gear and check if there are red / yellow, yellow / yellow or pure yellow sockets. If we've found enough to fulfill our quota, stop. Else:
      // - Place them in red sockets. If we've found enough to fulfill our quota, stop. Else:
      // - Place them anywhere. Your gear sucks, unlucky.
      const gemResults = [];
      const redGemItemIndex = [];
      const gemScores = [];

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
          let gemsToSocket = item.classicSockets.sockets.filter(gem => (gem !== "meta" && gem !== "cogwheel")).length; // Check for any already socketed gems.
          item.socketedGems = [];
          if (item.slot === "Head") item.socketedGems.push(metaGemID);

          // TODO: Scoring function is working, but it won't check for gems we placed earlier.
          const socketBonus = item.classicSockets.bonus ? scoreSocketBonus(item.classicSockets.bonus) : 0;
          

          const pureReds = gemsToSocket * socketScores.red;
          const pairedStrat = item.classicSockets.sockets.reduce((accumulator, socket) => accumulator + socketScores[socket] || 0, 0) + socketBonus;

          if (pureReds >= pairedStrat) {
            item.socketedGems.push(...Array(gemsToSocket).fill(redGemID));
            gemScores.push(pureReds);
          } 
          else {
            
            item.classicSockets.sockets.forEach(socket => {
              //if (socket === "meta") item.socketedGems.push(metaGemID);
              if (socket === "red") item.socketedGems.push(redGemID);
              else if (socket === "yellow") { 
                item.socketedGems.push(yellowGemID);
                mandatoryYellows -= 1;
              }
              else if (socket === "blue") item.socketedGems.push(blueGemID); // Blue gem
            })
            gemScores.push(pairedStrat);
          }
        }
      });

      // == Check yellow replacements ==
      itemList.forEach((item, index) => {
        const sockets = item.classicSockets.sockets;
        let itemIndex = 0;
        sockets.forEach((socket, socketIndex) => {
          if (/*sockets[socketIndex] === "yellow" ||*/ sockets[socketIndex] === "meta"|| sockets[socketIndex] === "cogwheel") {}// do nothing
          else {
            let score = 0;
            // The socket isn't yellow, try and make it orange.
            const originalScore = gemScores[itemIndex];
            const newSockets = [...item.socketedGems];
            newSockets[socketIndex] = yellowGemID;
            
            // We've made the socket yellow. Let's score it.
            let newScore = newSockets.reduce((accumulator, socket) => accumulator + socketScores[gemIDS[socket]] || 0, 0);

            // Check if adding the yellow socket gives us a bonus.
            const socketBonus = newSockets.map(i => gemIDS[i]).every((element, index) => element === sockets[index]);

            if (socketBonus && item.classicSockets.bonus) {
              newScore += scoreSocketBonus(item.classicSockets.bonus);
              console.log("Bonus" + scoreSocketBonus(item.classicSockets.bonus))
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
      } 

    // Lastly, we need to actually add the stats from socketed gems.
    const socketedGemStats = [];
    itemList.forEach(item => {
      item.socketedGems.forEach(gemID => {
        socketedGemStats.push(gemDB.filter(gem => gem.id === gemID)[0].stats);
      });
      if (item.classicSockets.sockets.includes("cogwheel")) {
        // Eng gems
        socketedGemStats.push({haste: 208});
        socketedGemStats.push({spirit: 208});
      }

      // Check bonus. We can maybe do this doing the prior step and just flag it.
    });
    const compiledGems = socketedGemStats.reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
          acc[key] = (acc[key] || 0) + value;
      }
      return acc;
    }, {});

    return compiledGems
}