

const getMonkLegendary = (effectName, pl, contentType) => {
    let result = 0.0;
    let name = effectName;
    let bonus_stats = {};

    /*

    */
    if (name === "Ancient Teachings of the Monastery") {

    }

    else if (name === "Clouded Focus") {
        // Do Math
        bonus_stats.HPS = 0;
    }

    else if (name === "Tear of the Morning") {
        // Do Math
        bonus_stats.HPS = 0;
    }

    // Consider building in support for the conduit via SimC grab or something similar.
    
    else if (name === "Yu'lon's Whisper") {
        
    }
    else if (name === "Invoker's Delight") {
        
    }

    else {
        bonus_stats.HPS = -1;
    }

    return bonus_stats;
    
}
