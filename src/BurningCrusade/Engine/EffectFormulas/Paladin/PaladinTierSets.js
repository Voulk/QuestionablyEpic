
export const getPaladinTierSet = (effectName, player) => {
    // These are going to be moved to a proper file soon.
  
    let bonus_stats = {};
    let name = effectName;

    if (effectName === 37182) {
        // Justicar Raiment
        bonus_stats.intellect = 0; // PH TODO
    }

    return bonus_stats;
  
}