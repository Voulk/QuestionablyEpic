// This file contains utility formulas that might be useful for calculating Effect values. 


export function convertPPMToUptime(PPM, duration) {
    const rawUptime = (PPM * duration / 60);
    console.log("Raw:" + rawUptime);
    console.log("Processed:" + (1.13 * (1 - (Math.E ** (-rawUptime)))))
    return 1.13 * (1 - (Math.E ** (-rawUptime)))
}