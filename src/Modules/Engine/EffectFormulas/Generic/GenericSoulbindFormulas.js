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
export function getSoulbindFormula(effectID, pl, contentType) {
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
    // Valiant Strikes
    else if (effectID === 329791) {

    }
    // Cleansing Rites
    else if (effectID === 329784) {

    }
    // Pointed Courage
    else if (effectID === 329778) {

    }
    // Resonant Accolades
    else if (effectID === 329781) {

    }

    // -- Mikanikos --
    // Why does Mikanikos have so few throughput traits =( Poor Mikanikos.
    // Bron's Call to Action
    else if (effectID === 333950) {

    }
    // Hammer of Genesis
    else if (effectID === 333935) {

    }


    // === Night Fae ===
    // -- Niya --
    // Grove Invigoration
    else if (effectID === 333950) {

    }
    // Run without Tiring
    else if (effectID === 342270) {

    }
    // Niya's Tools: Burrs
    else if (effectID === 320659) {

    }
    // Niya's Tools: Herbs
    else if (effectID === 320662) {

    }

    // -- Dreamwalker --
    // Podtender
    else if (effectID === 333950) {

    }
    // Social Butterfly
    else if (effectID === 319210) {
        let expectedUptime = 1;
        bonus_stats.Versatility = 1.5 * 40 * expectedUptime; // Placeholder.

    }
    // Empowered Chrysalis
    // TODO: Expand to include overhealing on yourself. 
    // Double check the shield_consumed is a fair approximation when the expansion goes live. 
    else if (effectID === 319213) {
        console.log(JSON.stringify(pl));
        let trait_bonus = 0.1
        let shield_consumed = 0.95 // The percentage of our overhealing shield that gets consumed. Likely to be very high.
        let overhealing = (pl.activeStats.rawhps - pl.activeStats.hps)

        
        bonus_stats.HPS = trait_bonus * shield_consumed * overhealing;

    }

    // Field of Blossoms
    else if (effectID === 319191) {

    }

    // -- Korayn --
    // (Mikanikos V2)
    // Wild Hunt Tactics
    else if (effectID === 325066) {

    }
    // First Strike
    else if (effectID === 325069) {

    }

    // === Venthyr ===
    // -- Nadjia --
    // Thrill Seeker
    else if (effectID === 331586) {

    }

    // Exacting Preparation
    else if (effectID === 331580) {

    }
    // Dauntless Duelist
    else if (effectID === 331584) {

    }

    // -- Theotar the Mad Duke
    // Soothing Shade
    else if (effectID === 336239) {

    }
    // Token of Appreciation
    else if (effectID === 336245) {

    }
    // Refined Palate
    else if (effectID === 336243) {

    }
    // Wasteland Propriety
    else if (effectID === 319983) {

    }

    // -- General Draven --
    // Service in Stone
    else if (effectID === 340159) {

    }
    // Enduring Gloom
    else if (effectID === 319978) {

    }
    // Hold Your Ground
    else if (effectID === 332754) {

    }
    // Superior Tactics
    else if (effectID === 332753) {

    }
    // Built for War
    else if (effectID === 319973) {

    }

    // === Necrolord ===
    // -- Marileth --
    // Volatile Solvent
    else if (effectID === 323074) {

    }
    // Ooz's Frictionless Coating
    else if (effectID === 323091) {

    }
    // Plague'ys Preemptive Strike
    else if (effectID === 323090) {

    }

    // Ultimate Form
    else if (effectID === 323095) {

    }


    // -- Emeni --
    // Lead by Example
    else if (effectID === 342156) {

    }

    // Gnashing Chompers
    else if (effectID === 323919) {

    }

    // -- Bonesmith Heirmir --
    // Forgeborne Reveries
    else if (effectID === 326514) {

    }
    // Heirmir's Arsenal: Marrowed Gemstone
    else if (effectID === 326572) {

    }

    

    
    

    return bonus_stats;
}