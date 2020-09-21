

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