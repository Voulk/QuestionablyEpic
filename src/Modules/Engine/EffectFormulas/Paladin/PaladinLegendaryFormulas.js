import Player from '../../../Player/Player';
import { getOneHolyPower, getAwakeningWingsUptime, getWingsHealingInc } from './PaladinMiscFormulas'

export const getPaladinLegendary = (effectName, pl, contentType) => {
    let result = 0.0;
    let bonus_stats = {};
    let name = effectName;

    /*
    The rejuv spreading legendary can best be expressed as a percentage increase to our rejuv healing. 
    TODO: When accepting log input we will eventually have to take into account those already wearing it since it changes our formula slightly.
    */
    if (name === "Maraads Dying Breath") {
        /*
        let rejuvHealingPerc = pl.getSpellHealingPerc("Rejuvenation", contentType);
        let baseTicks = 1 + (5 * pl.getStatPerc("Haste"));
        let expectedTicksWithLegendary = (baseTicks / (1 - 0.02 * Math.ceil(baseTicks)));
        let rejuvHealingInc = (expectedTicksWithLegendary / baseTicks) - 1;
        let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingPerc * pl.getHPS());

        // Return result.
        */
       bonus_stats.HPS = 5

    }

    /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but players aren't perfect. 

    */
    else if (name === "Shock Barrier") {
        // Do Math
       
        let holyShockIncrease = 0.2;
        let wastedShield = 0.12;
        //console.log("HSI: " + holyShockIncrease);

        bonus_stats.HPS = Math.round(holyShockIncrease * 3 * (1 - wastedShield) * pl.getSpellHPS('Holy Shock', contentType));
    }

    else if (name === "Inflorescence of the Sunwell") {
        // Do Math
        let infusionsPerMinute = pl.getSpellCPM('Holy Shock', contentType) * pl.getStatPerc('Crit') + 0.3;
        let wastedInfusionPercentage = 0.2;
        let oneHolyLight = pl.getSingleCast('Holy Light', contentType);
        
        // Resplendent tests
        /*
        let trait_bonus =  0.036 + 5 * 0.004;
        let targets = 4.8;
        let expectedOverhealing = 0.3;

        oneHolyLight = oneHolyLight + oneHolyLight * (trait_bonus * targets * (1 - expectedOverhealing))
        */
        //

        bonus_stats.HPS = Math.round(infusionsPerMinute * wastedInfusionPercentage * (oneHolyLight * (0.3 + 0.5)) / 60)
    }
    else if (name === "Shadowbreaker, Dawn of the Sun") {
        let lightOfDawnCPM = pl.getSpellCPM("Light of Dawn", contentType);
        let lightOfDawnUptime = Math.min(1, lightOfDawnCPM * 6 / 60); // Technically doesn't account for the slight possible loss from casting LoD twice in a short period.
        let averageMasteryEff = (pl.getStatPerc('Mastery')); // TODO: Improve with logs data.
        let maxMasteryEff = ((pl.getStatPerc('Mastery')-1) / 0.7)+1 ;
        let mastDiff = ((maxMasteryEff / averageMasteryEff)-1);
        let percentHealingToHitTargets = 0.95;

        //console.log("MastDiff: " + mastDiff + ". LoDUptime: " + lightOfDawnUptime + "Max: " + maxMasteryEff + ". Avg: " + averageMasteryEff);
    
        bonus_stats.HPS = Math.round(pl.getHPS() * mastDiff * lightOfDawnUptime * percentHealingToHitTargets);

    }
    else if (name === "Of Dusk and Dawn") {

        bonus_stats.HPS = -1;
    }
    else if (name === "Vanguards Momentum") {

        bonus_stats.HPS = -1;
    }
    else if (name === "The Magistrates Judgment") {

        bonus_stats.HPS = -1;
    }
    else if (name === "Maraads Dying Breath") {

        bonus_stats.HPS = -1;
    }
    else if (name === "The Mad Paragon") {
        // Considerations
        // - Mad Paragon also itself expands the number of hammer CPM you can expect which isn't considered in the formula, which is based off our wings uptime without the legendary.
        //    - This can and will be added to the formula, but might take place after the expansion is live.
        // - Mad Paragon is incredibly GCD thirsty with added time to wings actually being less than the GCD you spend to get there. This is ok when you're cooldown capped, but is
        //   a penalty when you are not. 
        let isAwakening = false;

        let wingsEffHealingIncrease = getWingsHealingInc(pl.getStatPerc('Crit')) 
        let wingsBaseUptime = (20 + isAwakening ? 25 : 0) / 120; 
        let hammerOfWrathCPM = 60 / (7.5 / pl.getStatPerc('Haste')) * wingsBaseUptime;
        let healingIncUptime = hammerOfWrathCPM / 60;

        let healingMult = (wingsEffHealingIncrease * healingIncUptime + 1 * (1 - healingIncUptime)) - 1;    
        bonus_stats.HPS = Math.round(pl.getHPS() * healingMult);

        //console.log("FWS: " + wingsEffHealingIncrease);
        // This technically needs to be increased based on the wings duration increase, but that is of minimal benefit.
        bonus_stats.DPS = 1.2 * 0.3 * pl.getStatMultiplier("ALL") * hammerOfWrathCPM / 60;

        
        //let akn = 2.5 / 60; //getAwakeningWingsUptime(pl, contentType);
        //let awakening_hps = (akn * wingsEffHealingIncrease + 1 * (1 - akn) );
        //console.log("Wings Uptime: " + akn + ". Awakening healing increase:" + awakening_hps);
    }

    // Consider building in support for the conduit via SimC grab or something similar.

    else {
        bonus_stats.HPS = -2;
        bonus_stats.HPS = -2;
    }

    return bonus_stats;
    


}