
const softSlice = 3000;

// Compiles stats & bonus stats into one array to which we can then apply DR etc. 
export function compileStats(stats, bonus_stats) {

    for (var stat in stats) {
      stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
    }
  
    return stats
    
  }

export function buildDifferential(itemSet, primeSet, player, contentType) {
    let doubleSlot = {};
    const primeList = primeSet.itemList;
    const diffList = itemSet.itemList;
    let differentials = {
        items: [],
        scoreDifference: (Math.round(primeSet.hardScore - itemSet.hardScore) / primeSet.hardScore) * 100,
        rawDifference: Math.round((itemSet.hardScore - primeSet.hardScore) / player.getInt(contentType) * player.getHPS(contentType)),
    };

    for (var x = 0; x < primeList.length; x++) {
        if (primeList[x].uniqueHash !== diffList[x].uniqueHash) {    
        differentials.items.push(diffList[x]);
        doubleSlot[diffList[x].slot] = (doubleSlot[diffList[x].slot] || 0) + 1;

        if ((x === 13 || x === 11) && doubleSlot[diffList[x].slot] <= 1) {
            differentials.items.push(diffList[x-1]);
        }
        
        }
    }
    //console.log("D:" + JSON.stringify(differentials));
    return differentials;
}
  
export function pruneItems(itemSets) {
let temp = itemSets.filter(function (set) {
    return set.verifySet();
});

return temp.slice(0, softSlice);
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