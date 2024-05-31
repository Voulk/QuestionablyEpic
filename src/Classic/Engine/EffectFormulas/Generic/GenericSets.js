
export const getGenericSet = (effectName, player, setStats) => {
    // These are going to be moved to a proper file soon.

  
    let result = 0.0;
    let bonus_stats = {};
    let name = effectName;

    if (effectName === "PVP 2pc") {
        console.log("READING PVP BONUS FINE");
        bonus_stats.intellect = 70;
    }

    return bonus_stats;
  
}