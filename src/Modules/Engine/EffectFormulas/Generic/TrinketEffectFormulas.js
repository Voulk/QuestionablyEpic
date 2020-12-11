import {convertPPMToUptime, getScalarValue} from '../EffectUtilities';
import {trinket_data, TAGS} from './TrinketData';
import {STAT} from '../../STAT';
import SPEC from '../../SPECS';

// TODO: Write proper comments. See Lingering Sunmote for an example.
export function getTrinketEffect(effectName, player, contentType, itemLevel) {
    let bonus_stats = {}

    // Trinket Data holds a trinkets actual power values. Formulas here, data there.
    let activeTrinket = trinket_data.find(trinket => trinket.name === effectName);

    if (activeTrinket === undefined) {
        //console.error('no trinket found');
        return bonus_stats; // handle error shit on the calling side, or here i guess
    }
    else if (effectName === "Lingering Sunmote") {
        // Trinket Effect: Creates a patch of light at target location for 12s. Allies within it split an absorb for X every 4 seconds.
        // Absorbtion is increased by 15% per ally in the light, up to 60%.

        // Notes:
        // We don't multiply our healing by number of targets because the heal is split among them.
        // The meteor effect is accounted for in the meteor_multiplier variable.

        // Assumption: 
        // No unique assumptions. Efficiency combines wasted shield and people running out of it.
        let effect = activeTrinket.effects[0];
        let meteor_multiplier = (1+ effect.targets * effect.meteor)

        bonus_stats.hps =  getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * 
                effect.ticks * meteor_multiplier / effect.cooldown * player.getStatPerc('Vers');

    }
    else if (effectName === "Manabound Mirror") {
        // We can make this more accurate by writing a function to calculate expected_mana_spend based on the players log.
        let mana_heal_effect = activeTrinket.effects[0];
        let base_heal_effect = activeTrinket.effects[1];
        

        let expected_mana_spend = 9000; // Per minute.
        let base_heal = getProcessedValue(base_heal_effect.coefficient, base_heal_effect.table, itemLevel)
        let mana_heal = getProcessedValue(mana_heal_effect.coefficient, mana_heal_effect.table, itemLevel) * (expected_mana_spend / 3240)

        bonus_stats.hps = (base_heal + mana_heal) * base_heal_effect.efficiency / base_heal_effect.cooldown * player.getStatMultiplier('CRITVERS');
 
    }
    else if (effectName === "Darkmoon Deck: Repose") {
        let effect = activeTrinket.effects[0];

        bonus_stats.hps =  getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / effect.cooldown * player.getStatMultiplier('CRITVERS');

    }
    else if (effectName === "Sunblood Amethyst") {
        let dam_effect = activeTrinket.effects[0];
        let int_effect = activeTrinket.effects[1];

        
        bonus_stats.dps =  getProcessedValue(dam_effect.coefficient, dam_effect.table, itemLevel) / dam_effect.cooldown * player.getStatMultiplier('CRITVERS');
        bonus_stats.intellect = getProcessedValue(int_effect.coefficient, int_effect.table, itemLevel, int_effect.efficiency) * int_effect.duration / int_effect.cooldown;
    }
    else if (effectName === "Unbound Changeling") {
        // Unbound Changeling is a challenge because it comes in four different flavors.
        // Given the player can "force" change their Changeling to their preferred secondary stat, this formula will for now take a "best case scenario" approach and ignore
        // the rare possibility of a Tri-proc (which is only ~10% more stats anyway). When an advanced settings menu is added we can revisit this and maybe add some detail.
        let effect = activeTrinket.effects[0];
        let playerBestSecondary = player.getHighestStatWeight(contentType, ['versatility']) // Exclude Vers since there isn't a Vers version.
        
        bonus_stats[playerBestSecondary] = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    }
    else if (effectName === "Cabalist's Hymnal") {
        // Test
        let effect = activeTrinket.effects[0];

        bonus_stats.crit = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration * effect.stacks / 60

    }
    else if (effectName === "Macabre Sheet Music") {
        // Test
        let effect = activeTrinket.effects[0];

        bonus_stats.haste = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration * effect.stacks / effect.cooldown;
    }
    else if (effectName === "Consumptive Infusion") {
        // I don't really know what to do with this yet. It has some value, but probably not much of it.

    }
    else if (effectName === "Incrutable Quantum Device") {
        // TODO.

    }
    else if (effectName === "Siphoning Phylactery Shard") {
        // Test
        let effect = activeTrinket.effects[0];

        bonus_stats.hps =  getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / effect.cooldown * player.getStatMultiplier('CRITVERS');

    }
    else if (effectName === "Overflowing Anima Cage") {
        let effect = activeTrinket.effects[0];

        bonus_stats.crit = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration * effect.multiplier / effect.cooldown;
    }
    else if (effectName === "Vial of Spectral Essence") {
        let effect = activeTrinket.effects[0];
        bonus_stats.hps =  getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / effect.cooldown * player.getStatMultiplier('CRITVERS');
        console.log("Vial: " + bonus_stats.hps);
    }
    else if (effectName === "Soulletting Ruby") {
        let heal_effect = activeTrinket.effects[1];
        let crit_effect = activeTrinket.effects[0];

        bonus_stats.hps =  getProcessedValue(heal_effect.coefficient, heal_effect.table, itemLevel, heal_effect.efficiency) / heal_effect.cooldown * player.getStatMultiplier('CRITVERS');
        bonus_stats.crit = getProcessedValue(crit_effect.coefficient, crit_effect.table, itemLevel) * crit_effect.duration * crit_effect.multiplier / crit_effect.cooldown;

        //console.log("Effect Name: " + effectName + " at level: " + itemLevel + " {" + JSON.stringify(bonus_stats))
    }
    else if (effectName === "Wakener's Frond") {
        let effect = activeTrinket.effects[0];

        bonus_stats.haste = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration / effect.cooldown;
    }
    else if (effectName === "Soulsifter Root") {
        let effect = activeTrinket.effects[0];
        // Hastes impact on the trinket PPM is included in the secondary multiplier below.
        bonus_stats.hps =  getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / 60 * effect.ppm * player.getStatMultiplier('NOMAST');
    }
    else if (effectName === "Boon of the Archon") {
        let heal_effect = activeTrinket.effects[1];
        let vers_effect = activeTrinket.effects[0];

        bonus_stats.hps =  getProcessedValue(heal_effect.coefficient, heal_effect.table, itemLevel, heal_effect.efficiency) 
                            * heal_effect.ppm * 4 * player.getStatMultiplier('CRITVERS') / 60;
        bonus_stats.versatility = getProcessedValue(vers_effect.coefficient, vers_effect.table, itemLevel) * 
            convertPPMToUptime(vers_effect.ppm * player.getStatPerc('Haste'), vers_effect.duration);

    }
    else if (effectName === "Spiritual Alchemy Stone") {
        let effect = activeTrinket.effects[0];

        bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);

        // Mana Potion Bonus
        // Eventually we'll include mana in bonus_stats and calculate it at the end. Until then, we'll auto-convert to HPS.
       

        // Health Potion Bonus
        bonus_stats.hps = 10000 * 0.4 / player.getFightLength() * 0.9; // 0.9 represents overhealing. We'll capture this better later.

        //console.log("Int:" + bonus_stats.intellect + ". HPS: " + bonus_stats.hps)
    }
    else if (effectName === "Sinful Gladiator's Insignia of Alacrity") {
        let effect = activeTrinket.effects[0];

        bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
        //console.log("INSIGNIA Int:" + bonus_stats.intellect + ". Proc: " + getProcessedValue(effect.coefficient, effect.table, itemLevel) + ". Uptime: " + convertPPMToUptime(effect.ppm, effect.duration))

    }
    else if (effectName === "Sinful Gladiator's Badge of Ferocity") {
        // Test
        let effect = activeTrinket.effects[0];

        bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration / effect.cooldown;
        

        if (player.getSpec() === SPEC.HOLYPALADIN) bonus_stats.intellect *= 1.47; // This needs to be refined, but represents the power increase from combining with Divine Toll.
        if (player.getSpec() === SPEC.DISCPRIEST) bonus_stats.intellect *= 1.32; // This needs to be refined, but represents the power increase from combining with Spirit Shell.
        // We need a better way to model interaction with spec cooldowns. 
        
        //console.log("BADGE Int:" + bonus_stats.intellect + ". Flat: " + getProcessedValue(effect.coefficient, effect.table, itemLevel) + ". Uptime: 25%")
    }
    else if (effectName === "Inscrutable Quantum Device") {

        let effect = activeTrinket.effects[0];
        let playerBestSecondary = player.getHighestStatWeight(contentType, ['versatility']) // Exclude Vers since there isn't a Vers version.

        bonus_stats[playerBestSecondary] = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration / effect.cooldown;

    }
    else if (effectName === "Flame of Battle") {
        
        let effect = activeTrinket.effects[0];

        bonus_stats.versatility = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration / effect.cooldown;
    }
    else if (effectName === "Misfiring Centurion Controller") {
        let effect = activeTrinket.effects[0];

        bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
        //console.log("INSIGNIA Int:" + bonus_stats.intellect + ". Proc: " + getProcessedValue(effect.coefficient, effect.table, itemLevel) + ". Uptime: " + convertPPMToUptime(effect.ppm, effect.duration))

    }
    else if (effectName === "Book-Borrower Identification") {
        let effect = activeTrinket.effects[0];

        bonus_stats.mastery = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
        //console.log("INSIGNIA Int:" + bonus_stats.intellect + ". Proc: " + getProcessedValue(effect.coefficient, effect.table, itemLevel) + ". Uptime: " + convertPPMToUptime(effect.ppm, effect.duration))

    }
    else if (effectName === "Glimmerdust's Grand Design") {
        // Test
        let hotEffect = activeTrinket.effects[0];
        let absorbEffect = activeTrinket.effects[1];
        
        let hotHPS = getProcessedValue(hotEffect.coefficient, hotEffect.table, itemLevel, hotEffect.efficiency) * (hotEffect.totalTicks * player.getStatPerc('Haste')) 
                        * player.getStatMultiplier('CRITVERS') / 120;
        let absorbHPS = getProcessedValue(absorbEffect.coefficient, absorbEffect.table, itemLevel, absorbEffect.efficiency) * player.getStatPerc('Versatility') / 120;

        console.log("Hot: " + hotHPS + " AbsorbHPS: " + absorbHPS);
        console.log("Raw HoT: " + getProcessedValue(hotEffect.coefficient, hotEffect.table, itemLevel, hotEffect.efficiency) + ". RawAbsorb: " + 
                        getProcessedValue(absorbEffect.coefficient, absorbEffect.table, itemLevel, absorbEffect.efficiency));

        bonus_stats.hps = hotHPS + absorbHPS;
      

    }


    /*
    for (const effect of activeTrinket.effects) {
        let netValue = getNetValue(effect, player, itemLevel);
        bonus_stats[effect.benefit] = Math.round(netValue);
    } */

    //console.log("Effect Name: " + effectName + " at level: " + itemLevel + " {" + JSON.stringify(bonus_stats))
    return bonus_stats;
}

export function testTrinkets(player, contentType, itemLevel = 226) {
    let trinketList = trinket_data;

    trinketList.forEach(trinket => {
        if (trinket.name === "Darkmoon Deck: Repose") {
            console.log(trinket.name + " (i200): " + getEstimatedHPS(getTrinketEffect(trinket.name, player, contentType, 200), player, contentType));
        }
        else {
            //console.log(trinket.name + ": " + getEstimatedHPS(getTrinketEffect(trinket.name, player, contentType, itemLevel), player, contentType));
            let trinketEffect = getTrinketEffect(trinket.name, player, contentType, itemLevel);
            console.log(trinket.name + ": " + JSON.stringify(trinketEffect) + ". Est HPS: " + getEstimatedHPS(trinketEffect, player, contentType));
        }
        
    })

}

// Converts a bonus_stats dictionary to a singular estimated HPS number. 
// TODO: Remove this. It's just for testing.
function getEstimatedHPS(bonus_stats, player, contentType) {
    let estHPS = 0;
    for (const [key, value] of Object.entries(bonus_stats)) {
        if (['haste', 'mastery', 'crit', 'versatility'].includes(key)) {
            estHPS += value * player.getStatWeight(contentType, key) / player.activeStats.intellect * player.getHPS();
        }
        else if (key === 'intellect') {
            estHPS += value / player.activeStats.intellect * player.getHPS();
        }
        else if (key === 'hps') {
            estHPS += value;
        }
    }
 
    return Math.round(estHPS);
}

function getProcessedValue(coefficient, table, itemLevel, efficiency = 1) {
    return coefficient * getScalarValue(table, itemLevel) * efficiency;
}