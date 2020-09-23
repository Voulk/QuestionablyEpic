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

    return temp[0].names[lang];
}

// Returns a translated item name based on an ID.
export function getItemIcon(id) {
    let temp = itemDB.filter(function(item) {
        return item.id === id;
    })

    return temp[0].icon;
}

// Calculates the given secondary stats an item should have at any given item level.
// TODO
export function calcSecondaryStatAtLevel(itemLevel, baseStat, baseLevel) {

}

// Calculates the given primary stats an item should have at any given item level.
// TODO
export function calcPrimaryStatAtLevel(itemLevel, baseStat, baseLevel) {

}

// Builds a stat string out of an items given stats and effect. 
// TODO
export function buildStatString(stats, effect) {
    return "Haste / Crit / Effect" // Default for UI design purposes.
}