// This file contains utility formulas that might be useful for calculating Effect values. 


export function convertPPMToUptime(PPM, duration) {
    return 1.13 * (1 - (Math.E ** (-(PPM * duration / 60))))
}