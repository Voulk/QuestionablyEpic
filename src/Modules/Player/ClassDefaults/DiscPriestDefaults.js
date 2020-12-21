

export const discPriestDefaultSpellData = (contentType) => {
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

export const discPriestDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
        specialQueries = 
        {   
            
        };
    }
    else if (contentType === "Dungeon") {
        specialQueries = 
        {   
            
        };
    }
    else {
        console.error("Unknown Content Type");
    }

    return specialQueries;

}