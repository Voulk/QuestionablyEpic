var SPELL_CASTS_LOC = 1;
var SPELL_HEALING_LOC = 2;
var SPELL_OVERHEALING_LOC = 5;


class Player {
    constructor(playerName, specName) {
        this.spec = specName;
        this.setupDefaults();
    }
    
    spec = "";

    // A players spell casting patterns. These are averaged from entered logs and a default is provided too. 
    // 
    castPattern = {
        "Rejuv": [35, 40213, 75],
        "Wild Growth": 40,
        "Overall": [0, 90132, 43]

    };
   
    // The players active stats from their character page. These are raw rather than being percentages. 
    // They can either be pulled automatically from the entered log, or calculated from an entered SimC string.
    // These are used for items like trinkets or conduits, where a flat healing portion might scale with various secondary stats. 
    activeStats = {
        intellect: 0,
        haste: 1,
        crit: 0,
        mastery: 0,
        vers: 0,
    }
   
    // Stat weights are normalized around intellect. 
    // Players who don't insert their own stat weights can use the QE defaults.
    // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
    // - If they manually enter weights on the other hand, then this automatic-update won't occur. 
    statWeights = {
        intellect: 1, 
        haste: 0.4,
        crit: 0.6,
        mastery: 0.5,
        vers: 0.3,
        leech: 0.8,
        default: true, 
    }

    // Convert the players given stats into a percentage. 
    // TODO: Implement Mastery
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

    // Consider replacing this with an external table for cleanliness and ease of editing. 
    setupDefaults = (spec) => {
        if (spec === "Druid") {
            this.activeStats = {
                intellect: 0,
                haste: 1,
                crit: 0,
                mastery: 0,
                vers: 0,
            }
           
            this.statWeights = {
                intellect: 1, // Fixed.
                haste: 0.4,
                crit: 0.6,
                mastery: 0.5,
                vers: 0.3,
                leech: 0.8
            }

        }

    }
}

export default Player;