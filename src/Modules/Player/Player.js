import { getAvailableClassConduits } from '../Covenants/CovenantUtilities';
import SPEC from '../Engine/SPECS';
import STAT from '../Engine/STAT';
import {scoreItem} from "../Engine/ItemUtilities";
import {getUnique} from "./PlayerUtilities";

var SPELL_CASTS_LOC = 0;
var SPELL_HEALING_LOC = 1;
var SPELL_HEALING_PERC = 2;
var SPELL_HPS = 3;
var SPELL_OVERHEALING_LOC = 5;

// These are going to be moved!



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
        this.uniqueHash = getUnique();

        if (statWeights !== "default" && statWeights.DefaultWeights === false) this.statWeights = statWeights;
        this.activeConduits = getAvailableClassConduits(specName);
        //this.getStatPerc = getStatPerc;
    }

    uniqueHash = ""; // used for deletion purposes.
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
    
    // Consider special queries a sister dictionary to CastPattern. CastPattern includes *raw* spell data pulled from logs but sometimes
    // we need something more particular. Healing done while channeling Convoke or healing done to a specific target for example.
    // We'll store these here instead for easy access. 
    specialQueries = 
    {
        Raid: {},
        Dungeon: {},
    }
    // The players active stats from their character page. These are raw rather than being percentages. 
    // They can either be pulled automatically from the entered log, or calculated from an entered SimC string.
    // These are used for items like trinkets or conduits, where a flat healing portion might scale with various secondary stats. 
    activeStats = {
        intellect: 1420,
        haste: 400,
        crit: 350,
        mastery: 0,
        versatility: 200,
        stamina: 1490,  
    }

    fightInfo = {
        hps: 6000,
        rawhps: 9420,
        fightLength: 139,
    }
   
    // Stat weights are normalized around intellect.
    // Players who don't insert their own stat weights can use the QE defaults.
    // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
    // - If they manually enter weights on the other hand, then this automatic-update won't occur.
    statWeights = {
        Raid: {
            intellect: 1,
            haste: 0.4,
            crit: 0.4,
            mastery: 0.45,
            versatility: 0.4,
            leech: 0.7,
        },
        Dungeon: {
            intellect: 1,
            haste: 0.4,
            crit: 0.4,
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

    getActiveItems = (slot, active = false) => {
        let temp = this.activeItems.filter(function(item) {
            if (slot === "AllMainhands") {
                return (item.slot === "1H Weapon" || item.slot === "2H Weapon") && (!active || item.active);
            }
            else if (slot === "Offhands" ) {
                return (item.slot === "Holdable" || item.slot === "Offhand" || item.slot === "Shield") && (!active || item.active);
            }
            else {
                return item.slot === slot && (!active || item.active);
            }
            
        })
        return this.sortItems(temp);

    }

    scoreActiveItems = (contentType) => {
        for (var i = 0; i < this.activeItems.length; i++) {
            let item = this.activeItems[i];
            //console.log(item);
            item.softScore = scoreItem(item, this, contentType)
            //console.log("Updating Score");
        }

    }



    // TODO: Right now this just returns all items for testing. Remove the comment to return to it's intended functionality.
    getSelectedItems = () => {
        let temp = this.activeItems.filter(function(item) {

            return item.active === true;
            //return item;
      
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

    getSpecialQuery = (spellIdentifier, contentType) => {
        if (spellIdentifier in this.specialQueries[contentType]) {
            //console.log("Found: " + spellIdentifier + ". " + JSON.stringify(this.specialQueries[contentType]));
            return this.specialQueries[contentType][spellIdentifier];
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
            console.log("Getting data for: " + spellName + ". HPS: " + this.castPattern[contentType][spellName][SPELL_HPS]);
            return this.castPattern[contentType][spellName][SPELL_HPS]
        }
        else {
            return 0;
        }
        
    }

    setSpellPattern = (castPat) => {
        console.log(castPat);
        if (castPat !== {}) this.castPattern["Raid"] = castPat;
        
    }

    setActiveStats = (stats) => {
       
        if (Object.keys(stats).length > 0) this.activeStats = stats;
    }

    setFightInfo = (info) => {
        if (Object.keys(info).length > 0) this.fightInfo = info;
    }


    // Consider replacing this with an external table for cleanliness and ease of editing. 
    setupDefaults = (spec) => {
        if (spec === SPEC.RESTODRUID) {
            this.fightInfo = {
                hps: 5500,
                rawhps: 9420,
                fightLength: 340,
            }
            this.activeStats = {
                intellect: 1420,
                haste: 690,
                crit: 280,
                mastery: 230,
                versatility: 220,
                stamina: 1400,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.38,
                    crit: 0.34,
                    mastery: 0.31,
                    versatility: 0.32,
                    leech: 0.55,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.38,
                    crit: 0.33,
                    mastery: 0.37,
                    versatility: 0.34,
                    leech: 0.23,
                },
                "DefaultWeights": true
            }
            


            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    774: [100, 455000, 0.0, 1433], // Rejuv
                    48438: [19, 449400, 0.0, 1323], // Wild Growth
                    8936: [29, 194225, 0.000, 571], // Regrowth
                    33763: [17, 89150, 0.000, 262], // Lifebloom
  
            },
                "Dungeon": {
                    774: [25, 113750, 0.0, 324],
                    48438: [17, 395000, 0.2472, 1402],
                    8936: [11, 105200, 0.000, 545],
                    33763: [17, 89150, 0.000, 262],
                }
            }
            this.specialQueries = 
            {   "Raid": {
                    "ConvokeChannelHPS": 480,
            },
                "Dungeon": {
                    "ConvokeChannelHPS": 480, 
                }

            }

        }
        else if (spec === SPEC.HOLYPALADIN) {
            
            this.fightInfo = {
                hps: 5500,
                rawhps: 9420,
                fightLength: 180,
            }
            
            this.activeStats = {
                intellect: 1420,
                haste: 500,
                crit: 200,
                mastery: 210,
                versatility: 240,
                stamina: 1490,
                
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.39,
                    crit: 0.27,
                    mastery: 0.33,
                    versatility: 0.32,
                    leech: 0.51,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.4,
                    crit: 0.36,
                    mastery: 0.21,
                    versatility: 0.33,
                    leech: 0.2,
                },
                "DefaultWeights": true
            }

            const IDLIGHTOFDAWN = 85222;
            const IDHOLYLIGHT = 82326;
            const IDHOLYSHOCK = 20473;
            const IDSHOCKBARRIER = 337824;
            const IDWORDOFGLORY = 85673;

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS, OVERHEALING
            {   "Raid": {
                    85222: [20, 238400, 0.2082, 1316, 0.2], // LoD
                    85673: [4, 40800, 0.0357, 225, 0.2], // WoG
                    20473: [27, 221400, 0.1934, 1222, 0.2], // Holy Shock
                    82326: [29, 311600, 0.293, 620, 0.2], // Holy Light
                    337824: [0, 98300, 0.0858, 542, 0.2], // Shock Barrier
            },
                "Dungeon": {
                    85222: [20, 238400, 0.2082, 120],
                    85673: [4, 40800, 0.0357, 900],
                    20473: [27, 221400, 0.1934, 1280],
                    82326: [29, 311600, 0.293, 10],
                    337824: [0, 98300, 0.0858, 542],
                }
            }
        } else if (spec === SPEC.RESTOSHAMAN) { // all of this needs a proper input once
            this.fightInfo = {
                hps: 5500,
                rawhps: 7000,
                fightLength: 465,
            }
            this.activeStats = {
                intellect: 1420,
                haste: 125,
                crit: 590,
                mastery: 200,
                versatility: 370,
                stamina: 1490,
            }
            this.statWeights = {
                Raid: {
                    intellect: 1,
                    haste: 0.31,
                    crit: 0.36,
                    mastery: 0.29,
                    versatility: 0.36,
                    leech: 0.45,
                },
                Dungeon: {
                    intellect: 1,
                    haste: 0.34,
                    crit: 0.33,
                    mastery: 0.29,
                    versatility: 0.34,
                    leech: 0.19,
                },
                DefaultWeights: true
            };


            this.castPattern = {
                Raid: {
                    61295: [66, 693600, 23, 1491], // Riptide
                    157153: [14, 0, 0, 0], // Cloudburst
                    73920: [18, 450000, 15, 967], // Healing Rain
                    108280: [2, 0, 0, 0], // Healing Tide Totem
                    85222: [20, 368000, 12, 791], // Chain Heal
                    16191: [2, 0, 0, 0], // Mana Tide Totem
                    20473: [20, 0, 0, 0], // Healing Surge
                },
                Dungeon: {
                    61295: [66, 693600, 23, 1491],
                    157153: [14, 0, 0, 0],
                    73920: [18, 450000, 15, 967],
                    108280: [2, 0, 0, 0],
                    85222: [20, 368000, 12, 791],
                    16191: [2, 0, 0, 0],
                    20473: [40, 0, 0, 0], // Healing Surge
                }
            };
            this.specialQueries = 
            {   "Raid": {
                    "HPSOnEarthShield": 456,
            },
                "Dungeon": {
                    "HPSOnEarthShield": 456, 
                }

            }
        }
        else if (spec === SPEC.DISCPRIEST) {
            this.fightInfo = {
                hps: 5500,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1420,
                haste: 500,
                crit: 280,
                mastery: 270,
                versatility: 220,
                stamina: 1400,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.36,
                    crit: 0.34,
                    mastery: 0.32,
                    versatility: 0.33,
                    leech: 0.56,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.35,
                    crit: 0.34,
                    mastery: 0.31,
                    versatility: 0.33,
                    leech: 0.23,
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
                hps: 5500,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1420,
                haste: 125,
                crit: 475,
                mastery: 470,
                versatility: 400,
                stamina: 1400,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.28,
                    crit: 0.35,
                    mastery: 0.35,
                    versatility: 0.34,
                    leech: 0.56,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.32,
                    crit: 0.35,
                    mastery: 0.28,
                    versatility: 0.35,
                    leech: 0.25,
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
                hps: 5500,
                rawhps: 9420,
                fightLength: 193,
            }
            this.activeStats = {
                intellect: 1420,
                haste: 125,
                crit: 590,
                mastery: 200,
                versatility: 370,
                stamina: 1490,
    
            }
           
            this.statWeights = {
                "Raid": {
                    intellect: 1, 
                    haste: 0.29,
                    crit: 0.35,
                    mastery: 0.28,
                    versatility: 0.34,
                    leech: 0.54,
                },
                "Dungeon": {
                    intellect: 1, 
                    haste: 0.34,
                    crit: 0.35,
                    mastery: 0.29,
                    versatility: 0.35,
                    leech: 0.25,
                },
                "DefaultWeights": true
            }

            const IDVIVIFY = 116670;
            const IDSOOTHINGBREATH = 343737;
            const IDREVIVAL = 115310;
            const IDFORTIFYINGBREW = 115203;
            const IDGUSTOFMISTS = 117907;

            this.castPattern =
            // CASTS, HEALING, HEALINGPERC, HPS
            {   "Raid": {
                    124682: [	9,	165317,	14.33,	1183.8], // EnV
                    116670: [	13,	143871,	12.47,	1030.2], // Vivify
                    115310: [	1,	123536,	10.71,	884.6], // Revival
                    117907: [	0,	123408,	10.7,	883.7], // Gust of Mists
                    343655: [	0,	116780,	10.12,	836.2], // Enveloping Breath
                    191837: [	5,	109532,	9.5,	784.3], // Essence Font
                    115151: [	14,	106834,	9.26,	765], // Renewing Mist
                    143924: [	0,	56104,	4.86,	401.8], // Leech
                    274909: [	0,	26087,	2.26,	186.8], // Rising Mist
                    116849: [	1,	25454,	2.21,	182.3], // Life Cocoon
                    0: [	1,	13857,	1.2,	99.2], // Weapons of Order
                    115175: [	4,	11977,	1.04,	85.8],
            },
                "Dungeon": {
    
                }
            };
            this.specialQueries = 
            {   "Raid": {
                    "HPSChijiGusts": 674,
                    "HPSHotHealingDuringLC" : 98,
                    "HPSHotHealingAfterLC": 0,
                    "HPSExpelHarmOnSelf": 0,
            },
                "Dungeon": {
                    "HPSChijiGusts": 674,
                    "HPSHotHealingDuringLC" : 98,
                    "HPSHotHealingAfterLC": 0,
                    "HPSExpelHarmOnSelf": 0,
                }

            }

        }

    }
}

export default Player;