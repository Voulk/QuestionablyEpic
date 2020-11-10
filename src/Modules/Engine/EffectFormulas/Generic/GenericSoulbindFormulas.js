import {convertPPMToUptime} from '../EffectUtilities'

/* 
== Generic Soulbind Effects ==
    All specs use the same set of Soulbinds and so the formulas contained
    are for all six. You can refer to a players spec if the formula should
    differ between them, for example an interrupt specific Soulbind might
    represent some gain for Shaman while being useless for the other five.

*/
export function getSoulbindFormula(effectID, player, contentType) {
    let bonus_stats = {}

    if (effectID === 328266) {
        bonus_stats.hps = 99 // Placeholder.
        
    }
    else if (effectID === -1) {

    }

    return bonus_stats;
}