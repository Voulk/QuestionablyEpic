

// The Item class represents an active item in the app at a specific item level. 
// We'll create them when we import a SimC string, or when an item is added manually.
// Items are stored in the players character. They are not currently stored in local storage but that is a likely addition soon after release.
class Item {
    constructor(id, name, slot, socket, tertiary, softScore = 0, level) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.slot = slot;
        this.socket = socket;
        this.tertiary = tertiary;
        this.softScore = softScore;

    }

    id = 0; // The items ID
    level = 200; // The items ilvl
    name = ""; // Consider how to store this in a localised form. 
    slot = "";
    softScore = 0;
    socket = false;
    tertiary = "";
    effect = "";
    
    // The stats on the item. These should already be adjusted for item level.
    stats = {
        intellect: 0,
        stamina: 0,
        haste: 0,
        mastery: 0,
        vers: 0,
        crit: 0,
        leech: 0,
    }





}

export default Item;