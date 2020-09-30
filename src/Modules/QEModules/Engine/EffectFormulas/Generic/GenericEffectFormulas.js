import {convertPPMToUptime} from '../EffectUtilities'

export function getGenericEffect(effectName, player, contentType) {
    let bonus_stats = {}

    if (effectName === "Ashjrakamas") {
        bonus_stats.intellect = Math.round(359 * convertPPMToUptime(1.25, 15));
        
    }
    else if (effectName === "Effect2") {

    }

    return bonus_stats;
}