import {convertPPMToUptime, getScalarValue} from '../EffectUtilities'


export function getTrinketEffect(effectName, player, contentType, itemLevel) {
    let bonus_stats = {}

    if (effectName === "Lingering Sunmote") {
        const coefficient = 45.58441;
        const expectedEfficiency = 0.4;

        bonus_stats.hps = Math.round(coefficient * getScalarValue('-8', itemLevel))

        bonus_stats.intellect = Math.round(359 * convertPPMToUptime(1.25, 15));
        
    }
    else if (effectName === "Effect2") {

    }

    return bonus_stats;
}