

export default function getLegendaryInfo(legendary, spec, pl)  {
 
    // Druid
    if (spec === "Restoration Druid") {
        getDruidLegendary(legendary, pl);
    }

    // TODO: Other specs.
    else {
        return 0;
    }


}

const getDruidLegendary = (legendary, pl) => {
    let result = 0.0;
    let name = legendary.name;

    if (name === "Rejuv Spreader") {       
        // Do Math
        legendary.expectedHPS = 5;

    }
    else if (name === "Swiftmend Extension") {
        // Do Math
        legendary.expectedHPS = 11;
    }

    else if (name === "The Dark Titans Lesson") {
        // Do Math
        legendary.expectedHPS = 7;
    }




    return result;


}