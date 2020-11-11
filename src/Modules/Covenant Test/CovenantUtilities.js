
import SPECS from '../Engine/SPECS'
import ActiveConduit from './ActiveConduit'

// Returns a full list of all class conduits in the form of an ActiveSoulbind array.
// Sets the item levels to the default. This is pulled on character creation so any SimC import can correct the item levels where necessary.
// Should be stored on the Player character. 
export function getAvailableClassConduits(spec) {
    let conduits = []
    const defaultItemLevel = 156;

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
        conduits.push(new ActiveConduit(340616, defaultItemLevel, "Enkindled Spirit", "Potency"));
        conduits.push(new ActiveConduit(339984, defaultItemLevel, "Focused Light", "Potency"));
        conduits.push(new ActiveConduit(339712, defaultItemLevel, "Resplendent Light", "Potency"));
        conduits.push(new ActiveConduit(339987, defaultItemLevel, "Untempered Dedication", "Potency"));
        conduits.push(new ActiveConduit(340218, defaultItemLevel, "Ringing Clarity", "Potency"));
    }


    return conduits;

    
}