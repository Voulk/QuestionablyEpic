import {randPropPoints} from '../RandPropPointsBylevel'
// This file contains utility formulas that might be useful for calculating Effect values. 


export function convertPPMToUptime(PPM, duration) {
    return 1.13 * (1 - (Math.E ** (-(PPM * duration / 60))))
}

export function getScalarValue(table, itemLevel) {
    if (table === -8) {
        return randPropPoints[itemLevel]['p8'];
    }
    else if (table === -1) {
        return randPropPoints[itemLevel]['slotValues'][0];
    }
    else {
        // return error
        return -1;
    }
}


export function getBestEnchant(player, contentType) {
    let bonus_stats = {};

    // Celestial Guidance ~140 HPS.
    let expected_uptime = convertPPMToUptime(3, 10)

    bonus_stats.Intellect = player.activeStats.intellect * 0.05 * expected_uptime;

    // Eternal Grace ~90 HPS. Can implement later but this should be a comfortably weaker choice.


    return bonus_stats.Intellect;
}