import {convertPPMToUptime, getScalarValue} from '../EffectUtilities';
import {trinket_data, TAGS} from './TrinketData';
import {STAT} from '../../STAT';

export function getTrinketEffect(effectName, player, contentType, itemLevel) {
    let bonus_stats = {}

    let activeTrinket = trinket_data.find(trinket => trinket.name === effectName);

    if (activeTrinket === undefined) {
        console.error('no trinket found');
        return null; // handle error shit on the calling side, or here i guess
    }

    for (const effect of activeTrinket.effects) {
        let netValue = getNetValue(effect, player, itemLevel);
        bonus_stats[effect.benefit] = Math.round(netValue);
    }

    console.log("Effect Name: " + effectName + " at level: " + itemLevel + " {" + JSON.stringify(bonus_stats))
    return bonus_stats;
}

function getNetValue(effect, player, itemLevel) {
    const efficiency = ('expectedEfficiency' in effect ? effect.expectedEfficiency : 1);
    let netValue = Math.round(effect.coefficient * getScalarValue(effect.table, itemLevel) * efficiency * effect.targets);

    let ppm = 0;
    if (effect.tags.includes(TAGS.PPM)) {
        ppm = effect.ppm;
    }
    if (effect.tags.includes(TAGS.HASTED_PPM)) {
        ppm *= effect.ppm * player.getStatPerc(STAT.HASTE);
    }
    if (ppm > 0) {
        if (effect.tags.includes(TAGS.DURATION_BASED)) {
            return netValue *= convertPPMToUptime(ppm, effect.duration);
        }
        return netValue *= ppm;
    }

    if (effect.tags.includes(TAGS.DURATION) && effect.tags.includes(TAGS.ON_USE)) {
        return netValue *= (effect.duration / effect.cooldown);
    }
    if (effect.tags.includes(TAGS.ON_USE)) {
        return netValue /= effect.cooldown;
    }
}