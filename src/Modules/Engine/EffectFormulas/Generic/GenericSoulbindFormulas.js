import Player from '../../../Player/Player'
import { STAT, STATPERONEPERCENT } from '../../STAT'
import {convertPPMToUptime, getBestEnchant} from '../EffectUtilities'


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
        // Left as 0 for now. While you might occasionally get some value from being able to vial slightly earlier, this is honestly 
        // just going to be 0 throughput in most cases.
        bonus_stats.HPS = 0 
        
        
    }
    // Phial of Patience
    // Your Phial heals for 35% additional health, but over 10 seconds.
    else if (effectID === 329777) {
        let expected_overhealing = 0.55
        let healing_bonus = pl.activeStats.stamina * 20 * 0.35;
        let uses_per_combat = 1.5;

        bonus_stats.HPS = healing_bonus * uses_per_combat * (1 - expected_overhealing) / pl.activeStats.fightLength;  // Placeholder.
        
    }
    // Let go of the Past
    else if (effectID === 328257) {
        // This was changed to a small magic damage DR and is given no value currently.
        // Will likely be included when the stats panel expands to offer more specific detail.
        bonus_stats.HPS = 0; 
       
    }

    // -- Kleia --
    // Valiant Strikes
    else if (effectID === 329791) {
        let average_health_pool = pl.activeStats.stamina * 20; // The players health is an acceptable average for an average target.
        let ppm = 0.7 // POSTLIVE: Check against logs.

        bonus_stats.HPS = average_health_pool * 0.2 * ppm / 60;

    }
    // Cleansing Rites
    else if (effectID === 329784) {
        let health_pool = pl.activeStats.stamina * 20;

        bonus_stats.HPS = health_pool * 0.1 / pl.activeStats.fightLength;

    }
    // Pointed Courage
    else if (effectID === 329778) {
        let expected_allies = 7.8;

        bonus_stats.Crit = 7.8 * STATPERONEPERCENT.CRIT;

    }
    // Resonant Accolades
    else if (effectID === 329781) {
        // This one needs a check against log. It can obviously never exceed 4% total healing but is likely to be much less.
        let percent_healing_above_70 = 0.8;
        let expected_overhealing = 0.5;
        let effect_power = 0.04;

        bonus_stats.HPS = pl.activeStats.hps * percent_healing_above_70 * (1 - expected_overhealing) * effect_power;

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
        let average_uptime = 10 / 80;

        bonus_stats.Haste = average_uptime * 20 * STATPERONEPERCENT.HASTE;

    }

    // Exacting Preparation
    else if (effectID === 331580) {
        let flask_int = 70;
        let feast_int = 18; // Should add something to offer an option of non-int food, but they are very close.
        let enchant_int = getBestEnchant(pl, contentType);

        bonus_stats.Intellect = (flask_int + feast_int + enchant_int) * 0.2;

    }
    // Dauntless Duelist
    else if (effectID === 331584) {
        // 3% damage to one target + 1.5% DR. No value currently assigned to DR and it's unlikely you would take this as a healer.

    }

    // -- Theotar the Mad Duke
    // Soothing Shade
    else if (effectID === 336239) {
        let chance_of_movement = 0.1
        let uptime = convertPPMToUptime(1, 12) * (1 - chance_of_movement);

        bonus_stats.Mastery = uptime * 525;
        

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
        let total_bonus = 0.05 + 0.02 * 4;
        let uptime = 1/6;

        bonus_stats.Intellect = pl.activeStats.intellect * total_bonus * uptime;

    }

    // Gnashing Chompers
    else if (effectID === 323919) {
        // This will need to be implemented for Mythic+ primarily. It's raid value will really only play up on 1-2 fights.
        // Probably needs to be a fight specific formula.

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