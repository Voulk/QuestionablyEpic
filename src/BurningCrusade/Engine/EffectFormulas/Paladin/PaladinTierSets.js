
export const getPaladinTierSet = (effectName, player) => {
    // These are going to be moved to a proper file soon.
  
    let bonus_stats = {};
    let name = effectName;

    if (effectName === 37182) {
        // Justicar Raiment
        bonus_stats.intellect = 980321;
    }

    return bonus_stats;
  
}