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
    constructor(playerName, specName, charID, region, realm, race, statWeights="default") {
        this.spec = specName;
        this.charName = playerName;
        this.charID = charID;
        this.setupDefaults(specName);
        this.activeItems = [];
        this.activeConduits = [];
        this.renown = 0;

        this.region = region;
        this.realm = realm;
        this.race = race;

        if (statWeights !== "default" && statWeights.DefaultWeights === false) this.statWeights = statWeights;
        this.activeConduits = getAvailableClassConduits(specName);
        //this.getStatPerc = getStatPerc;
    }


    spec = "";
    charID = 0;
    activeItems = [];
    activeConduits = [];
    renown = 0;

    region = "";
    realm = "";
    race = "";

    // A players spell casting patterns. These are averaged from entered logs and a default is provided too. 
    // CASTS, HEALING, HEALINGPERC, HPS,
    castPattern =
        {
            Raid: {},
            Dungeon: {},
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
    }

    fightInfo = {
        hps: 6000,
        rawhps: 9420,
        fightLength: 180,
    }
   
    // Stat weights are normalized around intellect.
    // Players who don't insert their own stat weights can use the QE defaults.
    // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
    // - If they manually enter weights on the other hand, then this automatic-update won't occur.
    statWeights = {
        Raid: {
            intellect: 1,
            haste: 0.4,
            crit: 0.5,
            mastery: 0.45,
            versatility: 0.4,
            leech: 0.7,
        },
        Dungeon: {
            intellect: 1,
            haste: 0.8,
            crit: 0.5,
            mastery: 0.4,
            versatility: 0.45,
            leech: 0.7,
        },
        DefaultWeights: true

    }


    editChar = (contentType, name, realm, region, race, weights) => {  
        this.charName = name;
        this.realm = realm;
        this.region = region;
        this.race = race;
        this.statWeights[contentType] = weights;
        this.statWeights.DefaultWeights = false;

    }

    getRace = () => {
        return this.race;
    }

    getStatWeight = (contentType, stat) => {
        const lcStat = stat.toLowerCase();
        if (!this.statWeights[contentType]) {
            return 0;
        }
        
        if (lcStat in this.statWeights[contentType]) {
            return this.statWeights[contentType][lcStat];
        }

        return 0;
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
    getHighestStatWeight = (contentType, ignore = []) => {
        let max = "";
        let maxValue = 0;
        let weights = this.statWeights[contentType]

        for (var stat in weights) {
            if (weights[stat] > maxValue && !ignore.includes(stat) && ['crit', 'haste', 'mastery', 'versatility'].includes(stat)) { max = stat; maxValue = weights[stat] };
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
            if (slot === "Offhands") {
                return item.slot === "Holdable" || item.slot === "Offhand" || item.slot === "Shield"
            }
            else {
                return item.slot === slot;
            }
            
        })
        return this.sortItems(temp);

    }

    // TODO: Right now this just returns all items for testing. Remove the comment to return to it's intended functionality.
    getSelectedItems = () => {
        let temp = this.activeItems.filter(function(item) {

            //return item.active === true;
            return item;
      
        });
        return this.sortItems(temp);
    }

    deleteActiveItem = (unique) => {
        let tempArray =  this.activeItems.filter(function(item) {
            return item.uniqueHash !== unique;
        });
        this.activeItems = tempArray;
    }
    activateItem = (unique) => {
        let tempArray =  this.activeItems.filter(function(item) {
            if (item.uniqueHash === unique) item.active = !item.active;
            return item;
        });
        this.activeItems = tempArray;
    }

    sortItems = (container) => {
        // Current default sorting is by HPS but we could get creative here in future.
        container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));

        return container;
      };

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
                if (this.spec === SPEC.HOLYPALADIN) {
                    statPerc = (0.12 + (this.activeStats.mastery / 23.3 / 100)) * 0.7 + 1;
                } else if (this.spec === SPEC.RESTOSHAMAN) {
                    statPerc = 1 + ((0.25 * 8 * 35 + this.activeStats.mastery) / (35 / 3)) / 100; // .25 is placeholder for mastery effectiveness
                }
                else if (this.spec === SPEC.RESTODRUID) {
                    statPerc = 1 + (0.04 + (this.activeStats.mastery / 70 / 100)) * 1.8; // 1.8 is the average HoT multiplier.
                }
                else if (this.spec === SPEC.HOLYPRIEST) {
                    statPerc = 1 + (0.1 + (this.activeStats.mastery / 27.95 / 100)) * 0.9; // Assumes 10% echo of light overhealing. TODO: revisit.
                }
                else if (this.spec === SPEC.DISCPRIEST) {
                    statPerc = 1 + (0.108 + (this.activeStats.mastery / 25.9 / 100)); 
                }
                else if (this.spec === SPEC.MISTWEAVERMONK) {
                    statPerc = 1; // TODO
                }
                break;
            case "Versatility":
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
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery") * this.activeStats.intellect;
        }
        else if (flag === "NOHASTE") {
            // Returns a multiplier that includes raw intellect. 
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery") * this.activeStats.intellect;
        }
        else if (flag === "ALLSEC") {
            // Returns a multiplier that includes all secondaries but NOT intellect.
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery");
        }
        else if (flag === "NOMAST") {
            // Returns a multiplier of Haste / Vers / Crit.
            mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility");
        }
        else if (flag === "CRITVERS") {
            // Returns a multiplier that includes raw intellect. 
            mult = this.getStatPerc("Crit") * this.getStatPerc("Versatility");
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

    getRealmString = () => {
        if (this.realm !== undefined && this.region !== undefined) {
            return this.region + " - " + this.realm
        }
        else {
            return "Unknown Realm";
        }

    }

    getSpec = () => {
        return this.spec;
    }

    getHPS = () => {
        return this.fightInfo.hps;
    }
    // HPS including overhealing.
    getRawHPS = () => {
        return this.fightInfo.rawhps;
    }

    getFightLength = () => {
        return this.fightInfo.fightLength;
    }

    getInt = () => {
        return this.activeStats.intellect;
    }

    getSpellCasts = (spellName, contentType) => {
        if (spellName in this.castPattern[contentType]) {
            return this.castPattern[contentType][spellName][SPELL_CASTS_LOC];
        }
        else {
            return 0;
        }
        
    }

    getSpellCPM = (spellName, contentType) => {
        if (spellName in this.castPattern[contentType]) {
            return this.castPattern[contentType][spellName][SPELL_CASTS_LOC] / this.getFightLength() * 60;
        }
        else {
            return 0;
        }
        
    }

    getSpellHealingPerc = (spellName, contentType) => {
        if (spellName in this.castPattern[contentType]) {
            return this.castPattern[contentType][spellName][SPELL_HEALING_PERC]
        }
        else {
            return 0;
        }

    }

    getSingleCast = (spellName, contentType) => {
        if (spellName in this.castPattern[contentType]) {
            return this.castPattern[contentType][spellName][SPELL_HEALING_LOC] / this.castPattern[contentType][spellName][SPELL_CASTS_LOC]
        }
        else {
            return 0;
        }
    }

    getSpellHPS = (spellName, contentType) => {
        if (spellName in this.castPattern[contentType]) {
            return this.castPattern[contentType][spellName][SPELL_HPS]
        }
        else {
            return 0;
        }
        
    }

    setSpellPattern = (contentType, casts) => {
        this.castPattern[contentType] = casts;
    }

    setActiveStats = (stats) => {
       
        this.activeStats = stats;
    }

    setFightInfo = (info) => {
        this.fightInfo = info;
    }


    // Consider replacing this with an external table for cleanliness and ease of editing. 
    setupDefaults = (spec) => {
        if (spec === SPEC.RESTODRUID) {
            this.fightInfo = {
                hps: 6000,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1500,
                haste: 650,
                crit: 590,
                mastery: 400,
                versatility: 320,
                stamina: 1490,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.6,
                    crit: 0.58,
                    mastery: 0.52,
                    versatility: 0.51,
                    leech: 0.68,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.6,
                    crit: 0.52,
                    mastery: 0.59,
                    versatility: 0.51,
                    leech: 0.4,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    "Rejuvenation": [46, 329400, 0.2909, 1706],
                    "Wild Growth": [7, 346400, 0.2472, 1794],
                    "Regrowth": [11, 105200, 0.000, 545],
                    "Lifebloom": [7, 50400, 0.000, 256],
  
            },
                "Dungeon": {
                    "Rejuvenation": [17, 181000, 0.2909, 400],
                    "Wild Growth": [5, 154400, 0.2472, 1402],
                }
            }

        }
        else if (spec === SPEC.HOLYPALADIN) {
            
            this.fightInfo = {
                hps: 6000,
                rawhps: 9420,
                fightLength: 180,
            }
            
            this.activeStats = {
                intellect: 1500,
                haste: 600,
                crit: 420,
                mastery: 400,
                versatility: 400,
                stamina: 1490,
                
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.61,
                    crit: 0.5,
                    mastery: 0.54,
                    versatility: 0.51,
                    leech: 0.68,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.62,
                    crit: 0.58,
                    mastery: 0.4,
                    versatility: 0.52,
                    leech: 0.4,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS, OVERHEALING
            {   "Raid": {
                    "Light of Dawn": [20, 238400, 0.2082, 1316, 0.2],
                    "Word of Glory": [4, 40800, 0.0357, 225, 0.2],
                    "Holy Shock": [27, 221400, 0.1934, 1222, 0.2],
                    "Holy Light": [29, 311600, 0.293, 620, 0.2],
                    "Shock Barrier": [0, 98300, 0.0858, 542, 0.2],
            },
                "Dungeon": {
                    "Light of Dawn": [20, 238400, 0.2082, 120],
                    "Word of Glory": [4, 40800, 0.0357, 900],
                    "Holy Shock": [27, 221400, 0.1934, 1280],
                    "Holy Light": [29, 311600, 0.293, 10],
                    "Shock Barrier": [0, 98300, 0.0858, 542],
                }
            }
        } else if (spec === SPEC.RESTOSHAMAN) { // all of this needs a proper input once
            this.fightInfo = {
                hps: 6500,
                rawhps: 7000,
                fightLength: 465,
            }
            this.statWeights = {
                Raid: {
                    intellect: 1,
                    haste: 0.42,
                    crit: 0.6,
                    mastery: 0.48,
                    versatility: 0.52,
                    leech: 0.68,
                },
                Dungeon: {
                    intellect: 1,
                    haste: 0.54,
                    crit: 0.6,
                    mastery: 0.47,
                    versatility: 0.52,
                    leech: 0.6,
                },
                DefaultWeights: true
            };
            this.castPattern = {
                Raid: {
                    "Riptide": [66, 693600, 23, 1491],
                    "Cloudburst Totem": [14, 0, 0, 0],
                    "Healing Rain": [18, 450000, 15, 967],
                    "Healing Tide Totem": [2, 0, 0, 0],
                    "Chain Heal": [20, 368000, 12, 791],
                    "Healing on Earth Shield": [0, 212000, 0, 456],
                    "Mana Tide Totem": [2, 0, 0, 0],
                    "Healing Surge": [20, 0, 0, 0],
                },
                Dungeon: {
                    "Riptide": [66, 693600, 23, 1491],
                    "Cloudburst Totem": [14, 0, 0, 0],
                    "Healing Rain": [18, 450000, 15, 967],
                    "Healing Tide Totem": [2, 0, 0, 0],
                    "Chain Heal": [20, 368000, 12, 791],
                    "Healing on Earth Shield": [0, 212000, 0, 456],
                    "Mana Tide Totem": [2, 0, 0, 0],
                    "Healing Surge": [40, 0, 0, 0],
                }
            };
        }
        else if (spec === SPEC.DISCPRIEST) {
            this.fightInfo = {
                hps: 6000,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1500,
                haste: 650,
                crit: 590,
                mastery: 400,
                versatility: 320,
                stamina: 1490,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.6,
                    crit: 0.56,
                    mastery: 0.52,
                    versatility: 0.51,
                    leech: 0.68,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.6,
                    crit: 0.56,
                    mastery: 0.52,
                    versatility: 0.5,
                    leech: 0.4,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    
  
            },
                "Dungeon": {
    
                }
            }

        }
        else if (spec === SPEC.HOLYPRIEST) {
            this.fightInfo = {
                hps: 6000,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1500,
                haste: 650,
                crit: 540,
                mastery: 550,
                versatility: 320,
                stamina: 1490,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.45,
                    crit: 0.55,
                    mastery: 0.55,
                    versatility: 0.45,
                    leech: 0.68,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.5,
                    crit: 0.55,
                    mastery: 0.5,
                    versatility: 0.45,
                    leech: 0.4,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    
  
            },
                "Dungeon": {
    
                }
            }

        }
        else if (spec === SPEC.MISTWEAVERMONK) {
            this.fightInfo = {
                hps: 6000,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1500,
                haste: 450,
                crit: 590,
                mastery: 350,
                versatility: 320,
                stamina: 1490,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.45,
                    crit: 0.56,
                    mastery: 0.44,
                    versatility: 0.55,
                    leech: 0.68,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.5,
                    crit: 0.55,
                    mastery: 0.5,
                    versatility: 0.45,
                    leech: 0.4,
                },
                "DefaultWeights": true
            }

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    
  
            },
                "Dungeon": {
    
                }
            }

        }

    }
}

export default Player;