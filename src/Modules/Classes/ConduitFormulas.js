

export default function getConduitInfo(conduit, rank, spec, pl)  {
 
    // Druid
    if (spec === "Restoration Druid") {
        getDruidconduit(conduit, pl);
    }

    // TODO: Other specs.
    else {
        return 0;
    }


}

const getDruidconduit = (conduit, rank, pl) => {
    let result = 0.0;
    let name = conduit.name;

    if (name === "ConduitName1") {       
        // Do Math
        conduit.expectedHPS = 5;

    }
    else if (name === "ConduitName2") {
        // Do Math
        conduit.expectedHPS = 11;
    }

    else if (name === "ConduitName3") {
        // Do Math
        conduit.expectedHPS = 7;
    }




    return result;


}