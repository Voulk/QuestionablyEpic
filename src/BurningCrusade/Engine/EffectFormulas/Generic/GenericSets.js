
export const getGenericSet = (effectName, player, setStats) => {
    // These are going to be moved to a proper file soon.

  
    let result = 0.0;
    let bonus_stats = {};
    let name = effectName;

    if (effectName === 32200) {
        // Whitemend Set
        bonus_stats.bonushealing = (setStats.intellect * 0.1)
    }

    return bonus_stats;
  
}