
import SPECS from '../Engine/SPECS'
import ActiveConduit from './ActiveConduit'
import {conduits} from '../CooldownPlanner/Data/Data'
import {getConduitFormula} from '../Engine/EffectFormulas/EffectEngine'

// Returns a full list of all class conduits in the form of an ActiveSoulbind array.
// Sets the item levels to the default. This is pulled on character creation so any SimC import can correct the item levels where necessary.
// Should be stored on the Player character. 
export function getAvailableClassConduits(spec) {
    let conduits = []
    const defaultItemLevel = 184;

    const conduitInfo = [{ id: 340616, name: { en: "Flash of Clarity", cn: "", de: "", fr: "", ru: "" }, type: "Potency", class: "Restoration Druid" }];


    if (spec === SPECS.RESTODRUID) {
        conduits.push(new ActiveConduit(340616, defaultItemLevel, "Flash of Clarity", "Potency"));
        conduits.push(new ActiveConduit(340621, defaultItemLevel, "Floral Recycling", "Potency"));
        conduits.push(new ActiveConduit(340550, defaultItemLevel, "Ready for Anything", "Potency"));
        conduits.push(new ActiveConduit(340549, defaultItemLevel, "Unstoppable Growth", "Potency"));
        conduits.push(new ActiveConduit(341446, defaultItemLevel, "Conflux of Elements", "Potency", "Night Fae"));
        conduits.push(new ActiveConduit(341378, defaultItemLevel, "Deep Allegiance", "Potency", "Kyrian"));
        conduits.push(new ActiveConduit(341383, defaultItemLevel, "Endless Thirst", "Potency", "Venthyr"));
        conduits.push(new ActiveConduit(341447, defaultItemLevel, "Evolved Swarm", "Potency", "Necrolord"));

        // TODO: Add the full set.

        conduits.push(new ActiveConduit(340553, defaultItemLevel, "Well-Honed Instincts", "Endurance"));
        conduits.push(new ActiveConduit(340529, defaultItemLevel, "Tough as Bark", "Endurance"));
        conduits.push(new ActiveConduit(340540, defaultItemLevel, "Ursine Vigor", "Endurance"));
        conduits.push(new ActiveConduit(340543, defaultItemLevel, "Innate Resolve", "Endurance"));
    }
    else if (spec === SPECS.HOLYPALADIN) {
        conduits.push(new ActiveConduit(339570, defaultItemLevel, "Enkindled Spirit", "Potency"));
        conduits.push(new ActiveConduit(339984, defaultItemLevel, "Focused Light", "Potency"));
        conduits.push(new ActiveConduit(339712, defaultItemLevel, "Resplendent Light", "Potency"));
        conduits.push(new ActiveConduit(339987, defaultItemLevel, "Untempered Dedication", "Potency"));
        conduits.push(new ActiveConduit(340218, defaultItemLevel, "Ringing Clarity", "Potency", "Kyrian"));
        conduits.push(new ActiveConduit(340212, defaultItemLevel, "Hallowed Discernment", "Potency", "Venthyr"));
        conduits.push(new ActiveConduit(340192, defaultItemLevel, "Righteous Might", "Potency", "Necrolord"));
        conduits.push(new ActiveConduit(340185, defaultItemLevel, "The Long Summer", "Potency", "Night Fae"));

        // Endurance
        conduits.push(new ActiveConduit(338741, defaultItemLevel, "Divine Call", "Endurance"));
        conduits.push(new ActiveConduit(339114, defaultItemLevel, "Golden Path", "Endurance"));
        conduits.push(new ActiveConduit(338787, defaultItemLevel, "Shielding Words", "Endurance"));

    }
    else if (spec === SPECS.MISTWEAVERMONK) {
        conduits.push(new ActiveConduit(336773, defaultItemLevel, "Jade Bond", "Potency"));
        conduits.push(new ActiveConduit(337241, defaultItemLevel, "Nourishing Chi", "Potency"));
        conduits.push(new ActiveConduit(336812, defaultItemLevel, "Resplendent Mist", "Potency"));
        conduits.push(new ActiveConduit(337099, defaultItemLevel, "Rising Sun Revival", "Potency"));
        conduits.push(new ActiveConduit(337286, defaultItemLevel, "Strike with Clarity", "Potency", "Kyrian"));
        conduits.push(new ActiveConduit(337301, defaultItemLevel, "Imbued Reflections", "Potency", "Venthyr"));
        conduits.push(new ActiveConduit(337295, defaultItemLevel, "Bone Marrow Hops", "Potency", "Necrolord"));
        conduits.push(new ActiveConduit(337303, defaultItemLevel, "Way of the Fae", "Potency", "Night Fae"));

        // Endurance
        conduits.push(new ActiveConduit(336853, defaultItemLevel, "Fortified Ingredients", "Endurance"));
        conduits.push(new ActiveConduit(336632, defaultItemLevel, "Grounding Breath", "Endurance"));
        conduits.push(new ActiveConduit(336379, defaultItemLevel, "Harm Denial", "Endurance"));
    }
    else if (spec === SPECS.DISCPRIEST) {
        conduits.push(new ActiveConduit(337790, defaultItemLevel, "Exaltation", "Potency"));
        conduits.push(new ActiveConduit(337786, defaultItemLevel, "Pain Transformation", "Potency"));
        conduits.push(new ActiveConduit(337778, defaultItemLevel, "Shining Radiance", "Potency"));
        conduits.push(new ActiveConduit(337891, defaultItemLevel, "Swift Penitence", "Potency"));

        conduits.push(new ActiveConduit(337966, defaultItemLevel, "Courageous Ascension", "Potency", "Kyrian"));
        conduits.push(new ActiveConduit(338315, defaultItemLevel, "Shattered Perceptions", "Potency", "Venthyr"));
        conduits.push(new ActiveConduit(337979, defaultItemLevel, "Festering Transfusion", "Potency", "Necrolord"));
        conduits.push(new ActiveConduit(338305, defaultItemLevel, "Fae Fermata", "Potency", "Night Fae"));

        // Endurance
        conduits.push(new ActiveConduit(337715, defaultItemLevel, "Charitable Soul", "Endurance"));
        conduits.push(new ActiveConduit(337748, defaultItemLevel, "Light's Inspiration", "Endurance"));
        conduits.push(new ActiveConduit(337662, defaultItemLevel, "Translucent Image", "Endurance"));
    }
    else if (spec === SPECS.RESTOSHAMAN) {
        conduits.push(new ActiveConduit(338329, defaultItemLevel, "Embrace of Earth", "Potency"));
        conduits.push(new ActiveConduit(338343, defaultItemLevel, "Heavy Rainfall", "Potency"));
        conduits.push(new ActiveConduit(338346, defaultItemLevel, "Nature's Focus", "Potency"));
        conduits.push(new ActiveConduit(338339, defaultItemLevel, "Swirling Currents", "Potency"));

        conduits.push(new ActiveConduit(339182, defaultItemLevel, "Elysian Dirge", "Potency", "Kyrian"));
        conduits.push(new ActiveConduit(339185, defaultItemLevel, "Lavish Harvest", "Potency", "Venthyr"));
        conduits.push(new ActiveConduit(339186, defaultItemLevel, "Tumbling Waves", "Potency", "Necrolord"));
        conduits.push(new ActiveConduit(339183, defaultItemLevel, "Essential Extraction", "Potency", "Night Fae"));

        // Endurance
        conduits.push(new ActiveConduit(337964, defaultItemLevel, "Astral Protection", "Endurance"));
        conduits.push(new ActiveConduit(337974, defaultItemLevel, "Refreshing Waters", "Endurance"));
        conduits.push(new ActiveConduit(337981, defaultItemLevel, "Vital Accretion", "Endurance"));
    }
    else if (spec === SPECS.HOLYPRIEST) {
        conduits.push(new ActiveConduit(337914, defaultItemLevel, "Focused Mending", "Potency"));
        conduits.push(new ActiveConduit(338345, defaultItemLevel, "Holy Oration", "Potency"));
        conduits.push(new ActiveConduit(337811, defaultItemLevel, "Lasting Spirit", "Potency"));
        conduits.push(new ActiveConduit(337947, defaultItemLevel, "Resonant Words", "Potency"));

        conduits.push(new ActiveConduit(337966, defaultItemLevel, "Courageous Ascension", "Potency", "Kyrian"));
        conduits.push(new ActiveConduit(338315, defaultItemLevel, "Shattered Perceptions", "Potency", "Venthyr"));
        conduits.push(new ActiveConduit(337979, defaultItemLevel, "Festering Transfusion", "Potency", "Necrolord"));
        conduits.push(new ActiveConduit(338305, defaultItemLevel, "Fae Fermata", "Potency", "Night Fae"));

        // Endurance
        conduits.push(new ActiveConduit(337715, defaultItemLevel, "Charitable Soul", "Endurance"));
        conduits.push(new ActiveConduit(337748, defaultItemLevel, "Light's Inspiration", "Endurance"));
        conduits.push(new ActiveConduit(337662, defaultItemLevel, "Translucent Image", "Endurance"));
    }


    return conduits;

}

export function filterConduits(conduitList, covenantName) {
    return conduitList.filter(function(conduits) {
        return conduits.covenant === covenantName || conduits.covenant === "ALL";

    });
}

export function getCovenant(soulbindName) {
    if (['Kleia', 'Pelagos', 'Mikanikos'].includes(soulbindName)) return "Kyrian";
    else if (['Nadjia', 'Theotar', 'Draven'].includes(soulbindName)) return "Venthyr";
    else if (['Niya', 'Dreamweaver', 'Korayn'].includes(soulbindName)) return "Night Fae";
    else if (['Marileth', 'Emeni', 'Heirmir'].includes(soulbindName)) return "Necrolord";

}


// Build Conduit Stats
export function buildConduitStats(soulbindDict, player, contentType) {

    let tempDict = soulbindDict;

    for (let i = 0; i < tempDict.length; i++) {
        let trait = tempDict[i];

        if ('type' in trait && 'slotted_id' in trait && trait.type.includes('Conduit')) {
            let itemLevel =  player.getConduitLevel(trait.slotted_id);
            trait.bonus_stats = getConduitFormula(trait.slotted_id, player, contentType, itemLevel);
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
            estHPS += value * player.getStatWeight(contentType, key) / player.activeStats.intellect * player.getHPS(contentType);
        }
        else if (key === 'Intellect') {
            estHPS += value / player.activeStats.intellect * player.getHPS(contentType);
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
    if (id === -1) {
        return "EmptyConduit.jpg"
    }
    else {
        let filteredDict = conduits.filter(trait => trait.guid === id);
        if (filteredDict.length > 0) return filteredDict[0].abilityIcon;
        else return "missing.jpg"
    }

}

