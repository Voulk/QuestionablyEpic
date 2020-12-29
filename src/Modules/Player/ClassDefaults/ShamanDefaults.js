

export const shamanDefaultSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
        spellList = {
            61295: {casts: 66, healing: 693600, hps: 1491}, // Riptide
            157153: {casts: 14, healing: 0, hps: 0}, // Cloudburst
            73920: {casts: 18, healing: 450000, hps: 967}, // Healing Rain
            108280: {casts: 2, healing: 0, hps: 0}, // Healing Tide Totem
            85222: {casts: 20, healing: 368000, hps: 791}, // Chain Heal
            16191: {casts: 2, healing: 0, hps: 0}, // Mana Tide Totem
            20473: {casts: 20, healing: 0, hps: 0}, // Healing Surge

        };

    }
    else if (contentType === "Dungeon") {
        spellList = {
            61295: {casts: 66, healing: 693600, hps: 1491},
            157153: {casts:14, healing: 0, hps: 0},
            73920: {casts:18, healing: 450000, hps: 967},
            108280: {casts:2, healing: 0, hps: 0},
            85222: {casts:20, healing: 368000, hps: 791},
            16191: {casts:2, healing: 0, hps: 0},
            20473: {casts:40, healing: 0, hps: 0}, // Healing Surge
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return spellList;
}

export const shamanDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
        specialQueries = 
        {   
            "HPSOnEarthShield": 456,
            "OneManaHealing": 2.9,
            "CastsPerMinute": 24,
        };
    }
    else if (contentType === "Dungeon") {
        specialQueries = 
        {   
            "HPSOnEarthShield": 456,
            "OneManaHealing": 0.4,
            "CastsPerMinute": 30,
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return specialQueries;

}