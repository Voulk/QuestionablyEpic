

export const paladinDefaultSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
        spellList = {
            85222: {casts: 20, healing: 238400, hps: 1316, overhealing: 0.2}, // LoD
            85673: {casts: 4, healing: 40800, hps: 225, overhealing: 0.2}, // WoG
            20473: {casts: 27, healing: 221400, hps: 1222, overhealing: 0.2}, // Holy Shock
            82326: {casts: 29, healing: 311600, hps: 620, overhealing: 0.2}, // Holy Light
            337824: {casts: 0, healing: 98300, hps: 542, overhealing: 0.2}, // Shock Barrier

        };

    }
    else if (contentType === "Dungeon") {
        spellList = {
            85222: {casts: 20, healing: 238400, hps: 120, overhealing: 0},
            85673: {casts: 4, healing: 40800, hps: 900, overhealing: 0},
            20473: {casts: 27, healing: 221400, hps: 1280, overhealing: 0},
            82326: {casts: 29, healing: 311600, hps: 10, overhealing: 0},
            337824: {casts: 0, healing: 98300, hps: 542, overhealing: 0},
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return spellList;
}

export const paladinDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
        specialQueries = 
        {   
            "OneManaHPS": 0,
        };
    }
    else if (contentType === "Dungeon") {
        specialQueries = 
        {   
            "OneManaHPS": 0,
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return specialQueries;

}