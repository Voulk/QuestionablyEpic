

export const holyPriestDefaultSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
        spellList = {


        };

    }
    else if (contentType === "Dungeon") {
        spellList = {


        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return spellList;
}

export const holyPriestDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
        specialQueries = 
        {   
            "OneManaHealing": 3.5,
            "CastsPerMinute": 28,
        };
    }
    else if (contentType === "Dungeon") {
        specialQueries = 
        {   
            "OneManaHealing": 0.4,
            "CastsPerMinute": 30,
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return specialQueries;

}