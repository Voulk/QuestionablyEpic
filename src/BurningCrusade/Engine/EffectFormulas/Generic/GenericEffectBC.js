
export const getGenericEffectBC = (effectName, player) => {
    // These are going to be moved to a proper file soon.

  
    let result = 0.0;
    let bonus_stats = {};

    if (effectName === 25901) {
        // Insightful Earthstorm Diamond
        bonus_stats.intellect = 9999; // PH TODO
    }
    else if (effectName === "Gladiator's Ornamented Gloves") {
        // Insightful Earthstorm Diamond
        console.log("Paladin Gloves");
        bonus_stats.spellcrit = 66; // PH TODO
    }
    

    return bonus_stats;
  
}