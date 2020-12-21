
import { createModifiersFromModifierFlags } from 'typescript';
import SPEC from '../Engine/SPECS';
import {druidDefaultSpecialQueries, druidDefaultSpellData} from "./ClassDefaults/DruidDefaults";
import {paladinDefaultSpecialQueries, paladinDefaultSpellData} from "./ClassDefaults/PaladinDefaults";

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

    setFightInfo = (info) => {
        this.fightInfo = info;
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
                spellList = druidDefaultSpellData(contentType);
                specialQueries = druidDefaultSpecialQueries(contentType);
            }
        else if (spec === SPEC.HOLYPALADIN) {
            console.log("Setting Paladin defaults");
            spellList = paladinDefaultSpellData(contentType);
            specialQueries = paladinDefaultSpecialQueries(contentType);
        }

        else {
            spellList = {};
            specialQueries = {};
        }


        this.setSpellList(spellList);
        this.specialQueries = specialQueries;
        
        
    }
}

export default CastModel;