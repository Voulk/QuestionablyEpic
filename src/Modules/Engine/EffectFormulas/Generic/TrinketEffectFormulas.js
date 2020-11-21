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
    else if (effectName === "Lingering Sunmote") {
        // We don't multiply our healing by number of targets because the heal is split among them.
        // The meteor effect is accounted for in the meteor_multiplier variable.
        let effect = activeTrinket.effects[0];
        let meteor_multiplier = (1+ effect.targets * effect.meteor)

        bonus_stats.hps =  getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * 
                effect.ticks * meteor_multiplier / effect.cooldown * player.getStatPerc('Vers');

    }
    else if (effectName === "Manabound Mirror") {
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

        //console.log(JSON.stringify(dam_effect) + JSON.stringify(int_effect));

        bonus_stats.dps =  getProcessedValue(dam_effect.coefficient, dam_effect.table, itemLevel) / dam_effect.cooldown * player.getStatMultiplier('CRITVERS');
        bonus_stats.intellect = getProcessedValue(int_effect.coefficient, int_effect.table, itemLevel, int_effect.efficiency) * int_effect.duration / int_effect.cooldown;
    }
    else if (effectName === "Unbound Changeling") {
        // Unbound Changeling is a challenge because it comes in four different flavors.
        // Given the player can "force" change their Changeling to their preferred secondary stat, this formula will for now take a "best case scenario" approach and ignore
        // the rare possibility of a Tri-proc (which is only ~10% more stats anyway). When an advanced settings menu is added we can revisit this and maybe add some detail.
        let effect = activeTrinket.effects[0];
        let playerBestSecondary = player.getHighestStatWeight(contentType, ['vers']) // Exclude Vers since there isn't a Vers version.

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
    }
    else if (effectName === "Soulletting Ruby") {
        let heal_effect = activeTrinket.effects[1];
        let crit_effect = activeTrinket.effects[0];

        bonus_stats.hps =  getProcessedValue(heal_effect.coefficient, heal_effect.table, itemLevel, heal_effect.efficiency) / heal_effect.cooldown * player.getStatMultiplier('CRITVERS');
        bonus_stats.crit = getProcessedValue(crit_effect.coefficient, crit_effect.table, itemLevel) * crit_effect.duration * crit_effect.multiplier / crit_effect.cooldown;
    }
    else if (effectName === "Wakener's Frond") {
        let effect = activeTrinket.effects[0];

        bonus_stats.haste = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration / effect.cooldown;
    }
    else if (effectName === "Soulsifter Root") {

    }
    else if (effectName === "Boon of the Archon") {

    }


    /*
    for (const effect of activeTrinket.effects) {
        let netValue = getNetValue(effect, player, itemLevel);
        bonus_stats[effect.benefit] = Math.round(netValue);
    } */

    console.log("Effect Name: " + effectName + " at level: " + itemLevel + " {" + JSON.stringify(bonus_stats))
    return bonus_stats;
}


function getProcessedValue(coefficient, table, itemLevel, efficiency = 1) {
    return coefficient * getScalarValue(table, itemLevel) * efficiency;
}

function getNetValue(effect, player, itemLevel) {
    const efficiency = ('expectedEfficiency' in effect ? effect.expectedEfficiency : 1);
    let netValue = Math.round(effect.coefficient * getScalarValue(effect.table, itemLevel) * efficiency * effect.targets);
    
    // Effect boosters
    if (effect.tags.includes(TAGS.TICKS)) {
        netValue *= effect.ticks;
    }
    if (effect.tags.includes(TAGS.METEOR)) {
        netValue = netValue * (1+effect.targets * effect.meteor);
    }

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

    if (effect.tags.includes(TAGS.SPECIAL)) {
        // Tags that don't fit any other category.
        if (effect.name === "Manabound Mirror") {
            let expected_mana_spend_min = 9000;
            return netValue * (expected_mana_spend_min / 3240) / effect.cooldown;
        }

    }
}