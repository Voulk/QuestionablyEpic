import {convertPPMToUptime} from '../EffectUtilities'

/* 
== Generic Soulbind Effects ==
    All specs use the same set of Soulbinds and so the formulas contained
    are for all six. You can refer to a players spec if the formula should
    differ between them, for example an interrupt specific Soulbind might
    represent some gain for Shaman while being useless for the other five.
    
    Durations of buffs can also change between specs, especially if the
    soulbind is procced by using your Covenant ability.

*/
export function getSoulbindFormula(effectID, player, contentType) {
    let bonus_stats = {}


    // === KYRIAN ===

    // -- Pelagos --
    // Combat Meditation
    // Activating your Kyrian class ability increases your mastery by X for Y seconds.
    // You occasionally expel sorrowful memories which can be walked through to extend the effect by 3 seconds.
    if (effectID === 328266) {
        let expectedUptime = (30 + (9 * 2)) / 180 // TODO. Demonstration only.
        bonus_stats.Mastery = 350 * expectedUptime // Placeholder.
        
    }
    // Focusing Mantra
    else if (effectID === 328261) {
        bonus_stats.HPS = -99 // Placeholder.
        
    }
    // Phial of Patience
    else if (effectID === 329777) {
        bonus_stats.HPS = -99 // Placeholder.
        
    }
    // Let go of the Past
    else if (effectID === 328257) {
        let averageStacks = 2.4 // Placeholder
        bonus_stats.Versatility = averageStacks * 40; // Placeholder.
        
    }

    // -- Kleia --

    else if (effectID === -1) {

    }

    // -- Mikanikos --


    // === Night Fae ===

    return bonus_stats;
}