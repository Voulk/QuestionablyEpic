
import SPEC from '../Engine/SPECS';

const SPELL_CASTS_LOC = 0;
const SPELL_HEALING_LOC = 1;
const SPELL_HEALING_PERC = 2;
const SPELL_HPS = 3;
const SPELL_OVERHEALING_LOC = 5;

// THIS IS NOT YET IN USE BUT WILL BE VERY SHORTLY.
class FightModel {
    constructor(spec, contentType) {
        this.contentType = contentType;
        this.setDefaults(spec);
    }

    spellList = {};
    specialQueries = {};
    fightInfo = {};
    contentType = "";

    setSpellList = (spellListing) => {
        this.spellList = spellListing;
    }


    setDefaults = (spec, contentType) => {
        this.fightInfo = {
            hps: 5500,
            rawhps: 9420,
            fightLength: 193,
        }


        let spellList = {}
        if (spec === SPEC.RESTODRUID) {
            if (contentType === "Raid") {
                spellList = {
                    "Rejuvenation": [46, 329400, 0.2909, 1706],
                    "Wild Growth": [7, 346400, 0.2472, 1794],
                    "Regrowth": [11, 105200, 0.000, 545],
                    "Lifebloom": [7, 50400, 0.000, 256],
                }
            }
            else if (contentType === "Dungeon") {

            }

        }

        this.setSpellList(spellList);
        
        
    }
}