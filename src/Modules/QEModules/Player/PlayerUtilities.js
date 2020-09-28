import { itemDB } from './ItemDB'

/*

This file contains utility functions that center around the player or players class / spec. 


*/


// This is a pretty straightfoward function right now but could be altered in future to allow Paladins to wear all armor types, to allow druids to wear cloth and so on.
// We'll try and leave them out when we can since it keeps the dropdown boxes much much cleaner and the 5% int bonus is only worth giving up on ultra rare occasions. 
export function getValidArmorTypes(spec) {
    switch(spec) {
        case "Restoration Druid":
        case "Mistweaver Monk":
            return [0, 2];  // Misc + Leather
        case "Holy Paladin":
            return [0, 4, 6]; // Misc + Plate + Shields
        case "Restoration Shaman":
            return [0, 3, 6]; // Misc + Mail + Shields
        case "Holy Priest":
        case "Discipline Priest":
            return [0, 1]; // Misc + Cloth
        default:
            return [-1];            
    }
}

// Returns an array of valid weapon types.
// TODO
export function getValidWeaponTypes(spec) {
    return [0];

}

// Returns a translated item name based on an ID.
export function getTranslatedItemName(id, lang) {
    let temp = itemDB.filter(function(item) {
        return item.id === id;
    })

    if (temp.length > 0) return temp[0].names[lang];
    else return "Unknown Item";
}

// Returns a translated item name based on an ID.
// Add some support for missing icons.
export function getItemIcon(id) {
    let temp = itemDB.filter(function(item) {
        return item.id === id;
    })

    //console.log(JSON.stringify(temp) + temp.length)
    //console.log(temp[0].icon)
    if (temp.length > 0) return (window.location.origin + "/Images/Icons/" + temp[0].icon + '.jpg')
    else return (window.location.origin + "/Images/Items/missing.jpg")

}

// Calculates the given secondary stats an item should have at any given item level.
// For now this also calculates int and returns an array.
// TODO
export function calcSecondaryStatAtLevel(itemLevel, slot, stats) {
    stats = {
        "intellect": 5259,
        "stamina": 7889,
        "haste": 0,
        "crit": 3000,
        "mastery": 4000,
        "vers": 0
    }

    for (var key in stats) {
        console.log(key + stats[key])
    }

    console.log('Hello there');
    let rand_prop = 81;
    let combat_mult = 1.510671929;
    let allocation = 2800;

    return (Math.floor(Math.floor(rand_prop * allocation * 0.0001 + 0.5) * combat_mult))

}

// Calculates the given primary stats an item should have at any given item level.
// TODO
export function calcPrimaryStatAtLevel(itemLevel, slot) {

}

// Builds a stat string out of an items given stats and effect. 
// TODO
export function buildStatString(stats, effect) {
    return "Haste / Crit" // Default for UI design purposes.
}