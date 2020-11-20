import { getAvailableClassConduits } from '../Covenants/CovenantUtilities';
import SPEC from '../Engine/SPECS';
import STAT from '../Engine/STAT'

var SPELL_CASTS_LOC = 0;
var SPELL_HEALING_LOC = 1;
var SPELL_HEALING_PERC = 2;
var SPELL_HPS = 3;
var SPELL_OVERHEALING_LOC = 5;

var averageHoTCount = 1.4; // TODO: Build this in correctly and pull it from logs where applicable.


class Player {
    constructor(playerName, specName, charID, statWeights="default") {
        this.spec = specName;
        this.charName = playerName;
        this.charID = charID;
        this.setupDefaults(specName);
        this.activeItems = [];
        this.activeConduits = [];
        this.renown = 0;

        if (statWeights !== "default") this.statWeights = statWeights;
        this.activeConduits = getAvailableClassConduits(specName);
        //this.getStatPerc = getStatPerc;
    }


    spec = "";
    charID = 0;
    activeItems = [];
    activeConduits = [];
    renown = 0;
    

    // A players spell casting patterns. These are averaged from entered logs and a default is provided too. 
    // CASTS, HEALING, HEALINGPERC, HPS, 
    castPattern =
    {   "Raid": {
            "Rejuvenation": [17, 181000, 0.2909, 1566],
            "Wild Growth": [5, 154400, 0.2472, 1478],
            "Overall": [0, 90132, 1],
            "Light of Dawn": [20, 238400, 0.2082, 1316],
            "Word of Glory": [4, 40800, 0.0357, 225],
            "Holy Shock": [27, 221400, 0.1934, 1222],
            "Holy Light": [29, 311600, 0.293, 1683],
            "Shock Barrier": [0, 98300, 0.0858, 542],
    },
        "Dungeon": {
            "Rejuvenation": [17, 181000, 0.2909, 1566],
            "Wild Growth": [5, 154400, 0.2472, 1478],
            "Overall": [0, 90132, 1],
            "Light of Dawn": [20, 238400, 0.2082, 1316],
            "Word of Glory": [4, 40800, 0.0357, 225],
            "Holy Shock": [27, 221400, 0.1934, 1222],
            "Holy Light": [29, 311600, 0.293, 1683],
            "Shock Barrier": [0, 98300, 0.0858, 542],
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
        versatility: 200,
        stamina: 1490,
        hps: 6000,
        rawhps: 9420,
        fightLength: 180,
        
    }
   
    // Stat weights are normalized around intellect. 
    // Players who don't insert their own stat weights can use the QE defaults.
    // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
    // - If they manually enter weights on the other hand, then this automatic-update won't occur. 
    statWeights = {
        "Raid": {
            intellect: 1, 
            haste: 0.4,
            crit: 0.5,
            mastery: 0.45,
            versatility: 0.4,
            leech: 0.7,
        },
        "Dungeon": {
            intellect: 1, 
            haste: 0.8,
            crit: 0.5,
            mastery: 0.4,
            versatility: 0.45,
            leech: 0.7,
        },
        "DefaultWeights": true

    }

    getStatWeight = (contentType, stat) => {
        stat = stat.toLowerCase();
        
        if (stat in this.statWeights[contentType]) {
            return this.statWeights[contentType][stat]
        }
        else {
            return 0;
        }
            
    }

    calculateConduits = (contentType) => {
        //console.log("Calculating Conduits")
        this.activeConduits.forEach(conduit => {
            conduit.setHPS(this, contentType)
            
            //return conduit;
        })
    }

    getActiveConduits = (type) => {
        return this.activeConduits.filter(function(conduits) {
            return conduits.type == type;
        });
    }

    getConduitLevel = (id) => {
        let tempDict =  this.activeConduits.filter(function(conduits) {
            return conduits.id === id;
        });

        if (tempDict.length > 0) return tempDict[0].itemLevel;
        else return 142;
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
                statPerc = 1; // TODO
                break;
            case "Vers":
                statPerc = 1 + this.activeStats.versatility / 40 / 100;
                break;
            default:
                break;
        }
   
        // Round to four decimal places. I'd heavily caution against ever rounding more heavily than this. 
        //console.log("Stat: " + stat + ". Perc: " + statPerc);
        return Math.round(statPerc*10000) / 10000;

    }

    // Returns a stat multiplier. 
    getStatMultiplier = (flag, statList = []) => {
        let mult = 1;
        if (flag === "ALL") {
            // Returns a multiplier that includes raw intellect. 
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Vers") * this.getStatPerc("Mastery") * this.activeStats.intellect;
        }
        else if (flag === "NOHASTE") {
            // Returns a multiplier that includes raw intellect. 
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Vers") * this.getStatPerc("Mastery") * this.activeStats.intellect;
        }
        else if (flag === "ALLSEC") {
            // Returns a multiplier that includes all secondaries but NOT intellect.
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Vers") * this.getStatPerc("Mastery");
        }
        else if (flag === "NOMAST") {
            // Returns a multiplier of Haste / Vers / Crit.
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Vers") 
        }
        else {
            // Our multiplier consists of whatever is in the stat list array.
            statList.forEach(stat => {
                mult *= this.getStatPerc(stat);
            })
        }
 
        return mult;

    }

    updateConduitLevel = (id, newLevel) => {
        for (let i = 0; i < this.activeConduits.length; i++) {
            if (this.activeConduits[i].id === id) {
                this.activeConduits[i].itemLevel = Math.max(145, Math.min(newLevel, 213));
            }
        }
    
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

    getSpellCastsPerMin = (spellName, contentType) => {
        
        return this.castPattern[contentType][spellName][SPELL_CASTS_LOC] / this.activeStats.fightLength * 60;
    }

    getSpellHealingPerc = (spellName, contentType) => {
        
        return this.castPattern[contentType][spellName][SPELL_HEALING_PERC]
    }

    getSingleCast = (spellName, contentType) => {

        return this.castPattern[contentType][spellName][SPELL_HEALING_LOC] / this.castPattern[contentType][spellName][SPELL_CASTS_LOC]
    }

    getSpellHPS = (spellName, contentType) => {
        
        return this.castPattern[contentType][spellName][SPELL_HPS]
    }


    // Consider replacing this with an external table for cleanliness and ease of editing. 
    setupDefaults = (spec) => {
        if (spec === "Restoration Druid") {
            this.activeStats = {
                intellect: 1500,
                haste: 400,
                crit: 350,
                mastery: 0,
                versatility: 200,
                stamina: 1490,
                hps: 6000,
                rawhps: 9420,
                fightLength: 180,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.6,
                    mastery: 0.5,
                    versatility: 0.3,
                    leech: 0.8,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.6,
                    mastery: 0.5,
                    versatility: 0.3,
                    leech: 0.8,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    "Rejuvenation": [17, 181000, 0.2909, 1566],
                    "Wild Growth": [5, 154400, 0.2472, 1478],
                    "Overall": [0, 90132, 1],
  
            },
                "Dungeon": {
                    "Rejuvenation": [17, 181000, 0.2909, 1566],
                    "Wild Growth": [5, 154400, 0.2472, 1478],
                    "Overall": [0, 90132, 1],
                }
            }

        }
        else if (spec === "Holy Paladin") {
            this.activeStats = {
                intellect: 1500,
                haste: 400,
                crit: 350,
                mastery: 0,
                versatility: 200,
                stamina: 1490,
                hps: 6000,
                rawhps: 9420,
                fightLength: 180,
                
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.6,
                    mastery: 0.5,
                    versatility: 0.3,
                    leech: 0.8,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.6,
                    mastery: 0.5,
                    versatility: 0.3,
                    leech: 0.8,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    "Light of Dawn": [20, 238400, 0.2082, 1316],
                    "Word of Glory": [4, 40800, 0.0357, 225],
                    "Holy Shock": [27, 221400, 0.1934, 1222],
                    "Holy Light": [29, 311600, 0.293, 1683],
                    "Shock Barrier": [0, 98300, 0.0858, 542],
            },
                "Dungeon": {
                    "Light of Dawn": [20, 238400, 0.2082, 1316],
                    "Word of Glory": [4, 40800, 0.0357, 225],
                    "Holy Shock": [27, 221400, 0.1934, 1222],
                    "Holy Light": [29, 311600, 0.293, 1683],
                    "Shock Barrier": [0, 98300, 0.0858, 542],
                }
            }

        }

    }
}

export default Player;