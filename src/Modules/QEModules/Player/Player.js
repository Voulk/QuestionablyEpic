var SPELL_CASTS_LOC = 0;
var SPELL_HEALING_LOC = 1;
var SPELL_HEALING_PERC = 2;
var SPELL_OVERHEALING_LOC = 5;

var averageHoTCount = 1.4; // TODO: Build this in correctly and pull it from logs where applicable.


class Player {
    constructor(playerName, specName, charID, statWeights="default") {
        this.spec = specName;
        this.charName = playerName;
        this.charID = charID;
        this.setupDefaults();
        this.activeItems = [];

        if (statWeights !== "default") this.statWeights = statWeights;
        //this.getStatPerc = getStatPerc;
    }


    spec = "";
    charID = 0;
    activeItems = [];
    

    // A players spell casting patterns. These are averaged from entered logs and a default is provided too. 
    // 
    castPattern =
    {   "Raid": {
            "Rejuvenation": [35, 40213, 0.22],
            "Wild Growth": 40,
            "Overall": [0, 90132, 1]
    },
        "Dungeon": {
            "Rejuvenation": [35, 40213, 0.11],
            "Wild Growth": 40,
            "Overall": [0, 90132, 1]
        }
    }

   
    // The players active stats from their character page. These are raw rather than being percentages. 
    // They can either be pulled automatically from the entered log, or calculated from an entered SimC string.
    // These are used for items like trinkets or conduits, where a flat healing portion might scale with various secondary stats. 
    activeStats = {
        intellect: 1500,
        haste: 400,
        crit: 350,
        mastery: 0,
        vers: 200,
        hps: 6000,
    }
   
    // Stat weights are normalized around intellect. 
    // Players who don't insert their own stat weights can use the QE defaults.
    // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
    // - If they manually enter weights on the other hand, then this automatic-update won't occur. 
    statWeights = {
        "Raid": {
            intellect: 1, 
            haste: 0.5,
            crit: 0.6,
            mastery: 0.5,
            vers: 0.45,
            leech: 0.7,
        },
        "Dungeon": {
            intellect: 1, 
            haste: 0.8,
            crit: 0.5,
            mastery: 0.4,
            vers: 0.45,
            leech: 0.7,
        },
        "DefaultWeights": true

    }

    getStatWeight = (contentType, stat) => {
        if (stat in this.statWeights[contentType]) {
            return this.statWeights[contentType][stat]
        }
        else {
            return 0;
        }
            
    }

    // Used for the purpose of maximising stuff like ring enchants and gems. 
    // Returns the players stat that has the highest weight. We should consider how to handle tie breaks.
    getHighestStatWeight = (contentType) => {
        let max = "";
        let maxValue = 0;
        let weights = this.statWeights[contentType]

        for (var stat in weights) {
            if (weights[stat] > maxValue && ['crit', 'haste', 'mastery', 'vers'].includes(stat)) { max = stat; maxValue = weights[stat] };
        }

        return max;

    }

    addActiveItem = (item) => {
        this.activeItems.push(item);
    }

    clearActiveItems = () => {
        this.activeItems = [];
    }

    getActiveItems = (slot) => {
        let temp = this.activeItems.filter(function(item) {
            return item.slot === slot;
        })
        return temp;

    }

    // Convert the players given stats into a percentage. 
    // TODO: Implement Mastery
    getStatPerc = (stat) => {       
        var statPerc = 1.0;
        switch(stat) {
            case "Haste":
                statPerc = 1 + this.activeStats.haste / 33 / 100;
                break;
            case "Crit":
                statPerc = 1.05 + this.activeStats.crit / 35 / 100;
                break;
            case "Mastery":
                break;
            case "Vers":
                statPerc = 1 + this.activeStats.vers / 40 / 100;
                break;
            default:
                break;
        }
   
        // Round to four decimal places. I'd heavily caution against ever rounding more heavily than this. 
        return Math.round(statPerc*10000) / 10000;

    }

    // This multiplies three-four secondary stats together to improve code efficiency. 
    // includeMastery: Boolean: Indicates whether Mastery should be included. 
    // TODO: Add Mastery
    getSecondaryMultiplier = (includeMastery) => {
        let mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Vers");
        if (includeMastery) { 
            switch(this.getSpec()) {
                case "Restoration Druid":
                    break;
                default:
                    break;
            }
        }

        return mult;
    }

    getSpec = () => {
        return this.spec;
    }

    getHPS = () => {
        return this.activeStats.hps;
    }

    getInt = () => {
        return this.activeStats.intellect;
    }

    getSpellCasts = (spellName, contentType) => {
        
        return this.castPattern[contentType][spellName][SPELL_CASTS_LOC];
    }

    getSpellHealingPerc = (spellName, contentType) => {
        
        return this.castPattern[contentType][spellName][SPELL_HEALING_PERC]
    }

    // Consider replacing this with an external table for cleanliness and ease of editing. 
    setupDefaults = (spec) => {
        if (spec === "Restoration Druid") {
            this.activeStats = {
                intellect: 0,
                haste: 1,
                crit: 0,
                mastery: 0,
                vers: 0,
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.6,
                    mastery: 0.5,
                    vers: 0.3,
                    leech: 0.8,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.6,
                    mastery: 0.5,
                    vers: 0.3,
                    leech: 0.8,
                },
                "DefaultWeights": true
            }

        }

    }
}

export default Player;