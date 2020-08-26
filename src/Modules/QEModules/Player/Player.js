var SPELL_CASTS_LOC = 1;
var SPELL_HEALING_LOC = 2;
var SPELL_OVERHEALING_LOC = 5;


class Player {
    constructor(playerName, specName) {
        this.spec = specName;
        
    }
    spec = "";
    castPattern = {
        "Rejuv": [35, 40, 75],
        "Wild Growth": 40,

    };
   
    activeStats = {
        intellect: 0,
        haste: 1,
        crit: 0,
        mastery: 0,
        vers: 0,
    }
   
    statWeights = {
        intellect: 1, // Fixed.
        haste: 0.4,
        crit: 0.6,
        mastery: 0.5,
        vers: 0.3,
        leech: 0.8
    }

    // Convert the players given stats into a percentage. 
    getStatPerc = (stat) => {       
        var statPerc = 1.0;
        switch(stat) {
            case "Haste":
                statPerc = 1 + this.activeStats.haste / 68;
                break;
            case "Crit":
                statPerc = 1.05 + this.activeStats.crit / 72;
                break;
            case "Mastery":
                break;
            case "Vers":
                statPerc = 1 + this.activeStats.vers / 85;
                break;
            default:
                break;
        }
   
        // Round to four decimal places. I'd heavily caution against ever rounding more heavily than this. 
        return Math.round(statPerc*10000) / 10000;

    }

    getSpec = () => {
        return this.spec;
    }

    getSpellCasts = (spellName) => {
        return this.castPattern[spellName][SPELL_CASTS_LOC];
    }
}

export default Player;