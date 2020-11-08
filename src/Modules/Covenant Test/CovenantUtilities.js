
import SPECS from '../Engine/SPECS'
import ActiveConduit from './ActiveConduit'

// Returns a full list of all class conduits in the form of an ActiveSoulbind array.
// Sets the item levels to the default. This is pulled on character creation so any SimC import can correct the item levels where necessary.
// Should be stored on the Player character. 
export function getAvailableClassConduits(spec) {
    let conduits = []
    const defaultItemLevel = 156;

    if (spec === SPECS.RESTODRUID) {
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Flash of Clarity", "Potency"));
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Floral Recycling", "Potency"));
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Ready for Anything", "Potency"));
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Unstoppable Growth", "Potency"));
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Conflux of Elements", "Potency"));
        // TODO: Add the full set.

        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Tough as Bark", "Endurance"));
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Ursine Vigor", "Endurance"));
        conduits.push(new ActiveConduit(-1, defaultItemLevel, "Innate Resolve", "Endurance"));
    }
    else if (spec === SPECS.HOLYPALADIN) {

    }


    return conduits;

    
}