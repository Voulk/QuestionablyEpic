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
        return randPropPoints[itemLevel]['slotvalues'][0];
    }
    else {
        // return error
        return -1;
    }
}