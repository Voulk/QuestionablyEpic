
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
        let infusionsPerMinute = pl.getSpellCastsPerMin('Holy Shock', contentType) * pl.getStatPerc('Crit') + 0.3;
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

    // Consider building in support for the conduit via SimC grab or something similar.

    else {
        bonus_stats.HPS = -1;
        bonus_stats.HPS = -1;
    }

    return bonus_stats;
    


}