
import { createModifiersFromModifierFlags } from 'typescript';
import SPEC from '../Engine/SPECS';

const SPELL_CASTS_LOC = 0;
const SPELL_HEALING_LOC = 1;
const SPELL_HEALING_PERC = 2;
const SPELL_HPS = 3;
const SPELL_OVERHEALING_LOC = 5;

// THIS IS NOT YET IN USE BUT WILL BE VERY SHORTLY.
class CastModel {
    constructor(spec, contentType) {
        this.contentType = contentType;
        this.setDefaults(spec, contentType);
    }

    spellList = {};
    specialQueries = {};
    fightInfo = {};
    contentType = "";

    setSpellList = (spellListing) => {
        this.spellList = spellListing;
    }

    getSpellData = (spellName, tag) => {
        if (spellName in this.spellList && tag in this.spellList[spellName]) {
            return this.spellList[spellName][tag]
        }
        else {
            return 0;
        } 
    }

    getFightInfo = (tag) => {
        if (tag in this.fightInfo) {
            return this.fightInfo[tag];
        }
        else {
            return 0;
        }
    }

    getSpecialQuery = (tag) => {
        if (tag in this.specialQueries) return this.specialQueries[tag];
        else return 0;
    }


    setDefaults = (spec, contentType) => {
        this.fightInfo = {
            hps: 5500,
            rawhps: 9420,
            fightLength: 340,
        }

        let spellList = {}
        let specialQueries = {}
        if (spec === SPEC.RESTODRUID) {
            if (contentType === "Raid") {
                spellList = {
                    774: {casts: 100, healing: 455000, hps: 1433, overhealing: 0}, // Rejuv
                    48438: {casts: 19, healing: 449400, hps: 1323, overhealing: 0}, // Wild Growth
                    8936: {casts: 29, healing: 194225, hps: 571, overhealing: 0}, // Regrowth
                    33763: {casts: 17, healing: 89150, hps: 262, overhealing: 0}, // Lifebloom

                };
                specialQueries = 
                {   
                    "ConvokeChannelHPS": 480,          
                };
            }
            else if (contentType === "Dungeon") {
                spellList = {
                    774: {casts: 25, healing: 113750, hps: 324, overhealing: 0},
                    48438: {casts: 17, healing: 395000, hps: 1402, overhealing: 0},
                    8936: {casts: 11, healing: 105200, hps: 545, overhealing: 0},
                    33763: {casts: 17, healing: 89150, hps: 262, overhealing: 0},

                };
                specialQueries = 
                {   
                    "ConvokeChannelHPS": 480,   
                };
            }

            }


        this.setSpellList(spellList);
        this.specialQueries = specialQueries;
        
        
    }
}

export default CastModel;