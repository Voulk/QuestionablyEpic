import {getGenericEffect} from './Generic/GenericEffectFormulas'

// Effect is a small "dictionary" with two key : value pairs. 
// The EffectEngine is basically a routing device. It will take your effect and effect type and grab the right formula from the right place.
// This allows each spec to work on spec-specific calculations without a need to interact with the other specs. 
export function getEffectValue(effect, player, contentType) {
    let bonus_stats = {};
    const effectName = effect.name;
    const effectType = effect.type;

    console.log("ITEM EFFECT" + effectName + effectType);

    if (effect.type === 'special') {
        bonus_stats = getGenericEffect(effectName, player, contentType);

    }

    return bonus_stats;
}