
import { createModifiersFromModifierFlags } from 'typescript';
import SPEC from '../Engine/SPECS';
import {druidDefaultSpecialQueries, druidDefaultSpellData} from "./ClassDefaults/DruidDefaults";
import {paladinDefaultSpecialQueries, paladinDefaultSpellData} from "./ClassDefaults/PaladinDefaults";
import {shamanDefaultSpecialQueries, shamanDefaultSpellData} from "./ClassDefaults/ShamanDefaults";
import {monkDefaultSpecialQueries, monkDefaultSpellData} from "./ClassDefaults/MonkDefaults";
import {holyPriestDefaultSpecialQueries, holyPriestDefaultSpellData} from "./ClassDefaults/HolyPriestDefaults";
import {discPriestDefaultSpecialQueries, discPriestDefaultSpellData} from "./ClassDefaults/DiscPriestDefaults";

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
            
            spellList = paladinDefaultSpellData(contentType);
            specialQueries = paladinDefaultSpecialQueries(contentType);
        }
        else if (spec === SPEC.RESTOSHAMAN) {
            
            spellList = shamanDefaultSpellData(contentType);
            specialQueries = shamanDefaultSpecialQueries(contentType);
        }
        else if (spec === SPEC.MISTWEAVERMONK) {
            spellList = monkDefaultSpellData(contentType);
            specialQueries = monkDefaultSpecialQueries(contentType);
        }
        else if (spec === SPEC.DISCPRIEST) {
            spellList = discPriestDefaultSpellData(contentType);
            specialQueries = discPriestDefaultSpecialQueries(contentType);
        }
        else if (spec === SPEC.HOLYPRIEST) {
            spellList = holyPriestDefaultSpellData(contentType);
            specialQueries = holyPriestDefaultSpecialQueries(contentType);
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