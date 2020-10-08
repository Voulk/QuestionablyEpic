

const getShamanLegendary = (legendary, pl, contentType) => {
    let result = 0.0;
    let name = legendary.name;

    /*
    The rejuv spreading legendary can best be expressed as a percentage increase to our rejuv healing. 
    TODO: When accepting log input we will eventually have to take into account those already wearing it since it changes our formula slightly.
    */
    if (name === "Vision of Unending Growth") {
        let rejuvHealingPerc = pl.getSpellHealingPerc("Rejuvenation", contentType);
        let baseTicks = 1 + (5 * pl.getStatPerc("Haste"));
        let expectedTicksWithLegendary = (baseTicks / (1 - 0.02 * Math.ceil(baseTicks)));
        let rejuvHealingInc = (expectedTicksWithLegendary / baseTicks) - 1;
        let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingPerc * pl.getHPS());

        // Return result.
        legendary.expectedHPS = expectedHPS;

    }

    /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but players aren't perfect. 

    */
    else if (name === "Verdant Infusion") {
        // Do Math
        legendary.expectedHPS = 11;
    }

    else if (name === "The Dark Titans Lesson") {
        // Do Math
        legendary.expectedHPS = 7;
    }

    // Consider building in support for the conduit via SimC grab or something similar.
    
    else if (name === "Lycaras Fleeting Glimpse") {
        let expectedOverhealing = 0.2; // TODO: Placeholder. 
        let oneWildGrowth =  0.91 * 6 * pl.getInt() * pl.getSecondaryMultiplier(true) * (1 - expectedOverhealing);


        legendary.expectedHPS = Math.round(oneWildGrowth * (60 / 45) / 60);
    }

    else {
        legendary.expectedHPS = 0;
        legendary.expectedDPS = 0;
    }
    


}

const getPaladinLegendary = (legendary, pl, contentType) => {
    let result = 0.0;
    let name = legendary.name;

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
        legendary.expectedHPS = 9999;

    }

    /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but players aren't perfect. 

    */
    else if (name === "Shock Barrier") {
        // Do Math
        legendary.expectedHPS = -1;
    }

    else if (name === "The Dark Titans Lesson") {
        // Do Math
        legendary.expectedHPS = 7;
    }

    // Consider building in support for the conduit via SimC grab or something similar.
    
    else if (name === "Lycaras Fleeting Glimpse") {
        let expectedOverhealing = 0.2; // TODO: Placeholder. 
        let oneWildGrowth =  0.91 * 6 * pl.getInt() * pl.getSecondaryMultiplier(true) * (1 - expectedOverhealing);


        legendary.expectedHPS = Math.round(oneWildGrowth * (60 / 45) / 60);
    }

    else {
        legendary.expectedHPS = 0;
        legendary.expectedDPS = 0;
    }
    


}