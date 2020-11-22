

export const getDruidLegendary = (effectName, player, contentType) => {
    let result = 0.0;
    let bonus_stats = {};
    let name = effectName;

    console.log("Looking at effect:" + name);

    /*
    The rejuv spreading legendary can best be expressed as a percentage increase to our rejuv healing. 
    TODO: When accepting log input we will eventually have to take into account those already wearing it since it changes our formula slightly.
    */
    if (name === "Vision of Unending Growth") {
        let rejuvHealingHPS = player.getSpellHPS("Rejuvenation", contentType);
        let baseTicks = 1 + (5 * player.getStatPerc("Haste"));
        let expectedTicksWithLegendary = (baseTicks / (1 - 0.025 * baseTicks));
        let rejuvHealingInc = (expectedTicksWithLegendary / baseTicks) - 1;
        let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingHPS);


        console.log("Expected Increase: " + rejuvHealingInc);
        // Return result.
        bonus_stats.HPS = expectedHPS;

    }

    else if (name === "Memory of the Mother Tree") {
        let wildGrowthCPM = player.getSpellCPM("Wild Growth", contentType);
        let procChance = 0.4;
        let oneRejuv = player.getSingleCast("Rejuvenation", contentType);

        let freeRejuvsPerMinute = wildGrowthCPM * procChance * 3;

        bonus_stats.HPS = Math.round(freeRejuvsPerMinute * oneRejuv / 60);

    }

    /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but playerayers aren't perfect. 

    */
    else if (name === "Verdant Infusion") {
        // Do Math
        let durationIncrease = 8;
        let expectedOverhealing = 0.6;
        let swiftmendCPM = 3.8;
        let power = 0;

        let spellExtensions = [
            {sp: 1.56, duration: 15, extensionsPerMin: swiftmendCPM * 0.95}, // Rejuv
            {sp: 1.94, duration: 15, extensionsPerMin: swiftmendCPM * 0.95}, // Lifebloom
            {sp: 0.43, duration: 12, extensionsPerMin: swiftmendCPM * 0.96}, // Regrowth
            {sp: 3.17, duration: 8, extensionsPerMin: swiftmendCPM * 0.48}, // Cenarion Ward
        ]

        spellExtensions.forEach((spell) => 
            power += spell.sp * durationIncrease / spell.duration * ( 1 - expectedOverhealing) * spell.extensionsPerMin);

        bonus_stats.HPS = Math.round(power / 60 * player.getStatMultiplier("ALL"));
    }

    else if (name === "The Dark Titans Lesson") {
        // Do Math
        
        let percentClearcastsUsed = 0.75;
        let secondLifebloomUptime = 0.8;
        let freeClearcasts = 60 * secondLifebloomUptime * player.getStatPerc("Haste") * 0.04;
        let oneRegrowth = player.getSingleCast("Regrowth", contentType);
        let hps_clearcasting = oneRegrowth * freeClearcasts * percentClearcastsUsed / 60;
        // --

        console.log("saew" + hps_clearcasting + ". " + oneRegrowth + '. ' + freeClearcasts);

        // Lifebloom is a more efficient spell than Rejuv so we can factor in the increased healing we get from the cast.
        let oneRejuv = player.getSingleCast("Rejuvenation", contentType);
        let oneLifebloom = player.getSingleCast("Lifebloom", contentType);
        let hps_betterCast = (oneLifebloom - oneRejuv) / 15;

        // Photosynthesis... (TODO)

        // 10% Lifebloom Penalty
        let lifebloomHPS = player.getSpellHPS("Lifebloom", contentType);
        let deduction = lifebloomHPS * 0.1;

        bonus_stats.HPS = Math.round(hps_betterCast + hps_clearcasting - deduction);
    }

    // Consider building in support for the conduit via SimC grab or something similar.
    
    else if (name === "Lycaras Fleeting Glimpse") {
        let expectedOverhealing = 0.2; // TODO: placeholder. 
        let oneWildGrowth =  0.91 * 6 * player.getInt() * player.getStatMultiplier("ALLSEC") * (1 - expectedOverhealing);

        bonus_stats.HPS = Math.round(oneWildGrowth * (60 / 45) / 60);
    }
    else if (name === "Oath of the Elder Druid") {
        let legendaryIncrease = 0.75;
        let playerHealth = player.activeStats.stamina * 20;
        let yseras = playerHealth * 0.03 * legendaryIncrease;

        bonus_stats.HPS = Math.round(yseras / 5);
    }
    else if (name === "Circle of Life and Death") {
        bonus_stats.HPS = -1;
    }

    else {
        bonus_stats.HPS = 0;
        bonus_stats.DPS = 0;
    }
    
    return bonus_stats;

}

/*
const getPaladinLegendary = (legendary, player, contentType) => {
    let result = 0.0;
    let name = legendary.name;

 
    if (name === "Maraads Dying Breath") {
        
        let rejuvHealingPerc = player.getSpellHealingPerc("Rejuvenation", contentType);
        let baseTicks = 1 + (5 * player.getStatPerc("Haste"));
        let expectedTicksWithLegendary = (baseTicks / (1 - 0.02 * Math.ceil(baseTicks)));
        let rejuvHealingInc = (expectedTicksWithLegendary / baseTicks) - 1;
        let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingPerc * player.getHPS());

        // Return result.
     
       bonus_stats.HPS = 9999;

    }

    /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but playerayers aren't perfect. 

  
    else if (name === "Shock Barrier") {
        // Do Math
        bonus_stats.HPS = -1;
    }

    else if (name === "The Dark Titans Lesson") {
        // Do Math
        bonus_stats.HPS = 7;
    }

    // Consider building in support for the conduit via SimC grab or something similar.
    
    else if (name === "Lycaras Fleeting Glimpse") {
        let expectedOverhealing = 0.2; // TODO: playeraceholder. 
        let oneWildGrowth =  0.91 * 6 * player.getInt() * player.getStatMultiplayerier("ALLSEC") * (1 - expectedOverhealing);


        bonus_stats.HPS = Math.round(oneWildGrowth * (60 / 45) / 60);
    }

    else {
        bonus_stats.HPS = 0;
        bonus_stats.DPS = 0;
    }
    

    return bonus_stats;
} */