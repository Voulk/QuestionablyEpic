
export const getGenericSet = (effectName, player, setStats) => {
    // These are going to be moved to a proper file soon.

  
    let result = 0.0;
    let bonus_stats = {};
    let name = effectName;

    if (effectName === 32200) {
        // Whitemend Set
        bonus_stats.bonushealing = (setStats.intellect * 0.1);
    }
    else if (effectName === 41591) {
        // Windhawk armor 3pc. 8mp5
        bonus_stats.mp5 = 8; 
    }
    else if (effectName === 41828) {
        // Netherstrike Armor 3pc.
        bonus_stats.spelldamage = 23;
    }
    else if (effectName === 556) {
        // Imbued Netherweave
        bonus_stats.spellcrit = 28;
    }
    else if (effectName === 576) {
        // Fury of the Nether 3pc.
        bonus_stats.intellect = 20;
    }
    else if (effectName === 565) {
        // Khorium Ward blacksmithing set 3pc.
        bonus_stats.bonushealing = 55;
    }
    else if (effectName === 667) {
        // The Twin Stars BoE set.
        bonus_stats.spelldamage = 15;
    }
    else if (effectName === 41890) {
        // Wild Draenish Armor 2pc.
        bonus_stats.bonushealing = 33;
    }
    else if (effectName === 41833) {
        // Scaled Draenic Armor 2pc.
        bonus_stats.spellcrit = 15;
    }
    else if (effectName === 41834) {
        // Scaled Draenic Armor 4pc.
        bonus_stats.spelldamage = 18;
    }

    return bonus_stats;
  
}