
import SPECS from '../Engine/SPECS'
import ActiveConduit from './ActiveConduit'
import {conduits} from '../CooldownPlanner/Data/Data'
import {getConduitFormula} from '../Engine/EffectFormulas/EffectEngine'

// Returns a full list of all class conduits in the form of an ActiveSoulbind array.
// Sets the item levels to the default. This is pulled on character creation so any SimC import can correct the item levels where necessary.
// Should be stored on the Player character. 
export function getAvailableClassConduits(spec) {
    let conduits = []
    const defaultItemLevel = 145;

    if (spec === SPECS.RESTODRUID) {
        conduits.push(new ActiveConduit(340616, defaultItemLevel, "Flash of Clarity", "Potency"));
        conduits.push(new ActiveConduit(340621, defaultItemLevel, "Floral Recycling", "Potency"));
        conduits.push(new ActiveConduit(340550, defaultItemLevel, "Ready for Anything", "Potency"));
        conduits.push(new ActiveConduit(340549, defaultItemLevel, "Unstoppable Growth", "Potency"));
        conduits.push(new ActiveConduit(341446, defaultItemLevel, "Conflux of Elements", "Potency"));
        // TODO: Add the full set.

        conduits.push(new ActiveConduit(340529, defaultItemLevel, "Tough as Bark", "Endurance"));
        conduits.push(new ActiveConduit(340540, defaultItemLevel, "Ursine Vigor", "Endurance"));
        conduits.push(new ActiveConduit(340543, defaultItemLevel, "Innate Resolve", "Endurance"));
    }
    else if (spec === SPECS.HOLYPALADIN) {
        conduits.push(new ActiveConduit(339570, defaultItemLevel, "Enkindled Spirit", "Potency"));
        conduits.push(new ActiveConduit(339984, defaultItemLevel, "Focused Light", "Potency"));
        conduits.push(new ActiveConduit(339712, defaultItemLevel, "Resplendent Light", "Potency"));
        conduits.push(new ActiveConduit(339987, defaultItemLevel, "Untempered Dedication", "Potency"));
        conduits.push(new ActiveConduit(340218, defaultItemLevel, "Ringing Clarity", "Potency"));

        // Endurance
        conduits.push(new ActiveConduit(338741, defaultItemLevel, "Divine Call", "Endurance"));
        conduits.push(new ActiveConduit(339114, defaultItemLevel, "Golden Path", "Endurance"));
        conduits.push(new ActiveConduit(338787, defaultItemLevel, "Shielding Words", "Endurance"));

    }


    return conduits;

}

// Build Conduit Stats
export function buildConduitStats(soulbindDict, player, contentType) {

    let tempDict = soulbindDict;

    for (let i = 0; i < tempDict.length; i++) {
        let trait = tempDict[i];

        if ('type' in trait && 'slotted_id' in trait && trait.type.includes('Conduit')) {
            let itemLevel =  player.getConduitLevel(trait.slotted_id);
            trait.bonus_stats = getConduitFormula(trait.slotted_id, player, contentType, itemLevel); // TODO: Pass item level.

        }

    }

    return tempDict;
    

}

// Returns a bonus_stats dictionary that sums all active soulbind traits for your selected soulbind.
export function sumSelectedStats(soulbindName, soulbindDict) {
    
    let bonus_stats = {
        'HPS': 0,
        'Intellect': 0,
        'Haste': 0,
        'Versatility': 0,
        'Crit': 0,
        'Mastery': 0,
    };

    let filteredDict = soulbindDict.filter(trait => trait.soulbind === soulbindName && trait.active === true);
 
    for (let i = 0; i < filteredDict.length; i++) {

        for (const [key, value] of Object.entries(bonus_stats)) {
            if (key in filteredDict[i].bonus_stats) bonus_stats[key] += filteredDict[i].bonus_stats[key];
        }
    }


    return bonus_stats;

}


// Converts a bonus_stats dictionary to a singular estimated HPS number. 
export function getEstimatedHPS(bonus_stats, player, contentType) {
    let estHPS = 0;
    for (const [key, value] of Object.entries(bonus_stats)) {
        if (['Haste', 'Mastery', 'Crit', 'Versatility'].includes(key)) {
            estHPS += value * player.getStatWeight(contentType, key) / player.activeStats.intellect * player.activeStats.hps;
        }
        else if (key === 'Intellect') {
            estHPS += value / player.activeStats.intellect * player.activeStats.hps;
        }
        else if (key === 'HPS') {
            estHPS += value;
        }
    }
 
    return Math.round(estHPS);
}

export function getConduitName(id, language = "en") {
    //console.log("Console here: " + id)
    let filteredDict = conduits.filter(trait => trait.guid === id);
    if (filteredDict.length > 0) return filteredDict[0].name;
    else return 'Invalid Name';

}

export function getConduitIcon(id) {
    let filteredDict = conduits.filter(trait => trait.guid === id);
    if (filteredDict.length > 0) return filteredDict[0].abilityIcon;
    else return "missing.jpg"
}

