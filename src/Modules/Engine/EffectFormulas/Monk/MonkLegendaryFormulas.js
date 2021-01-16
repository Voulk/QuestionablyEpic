

export const getMonkLegendary = (effectName, player, contentType) => {
    let result = 0.0;
    let name = effectName;
    let bonus_stats = {};

    /*

    */
    if (name === "Ancient Teachings of the Monastery") {
        const EssenceFontCPM = 2.9;
        const dpsDuringDuration = 650;
        const multiplier = 2.5;
        const buffUptime = 15 * EssenceFontCPM / 60;
        const expectedOverhealing = 0.5;

        bonus_stats.hps = buffUptime * multiplier * dpsDuringDuration * (1 - expectedOverhealing)

    }

    else if (name === "Clouded Focus") {
        // Do Math
        bonus_stats.hps = 0;
    }

    else if (name === "Tear of Morning") {
        // Do Math
        const vivify = {cpm: 4.5, hps: 350, percentOnRemTargets: 0.15};
        const envelopingMist = {cpm: 1.8, singleCast: 14000}
        const renewingMist = {avgStacks: 2.9, // Can be closely modelled as VivifyHits / VivifyCasts - 1
                              oneSpread: 8600 / 2} // ReMs spread at their current duration, which means we only get half of a ReM per spread on average.

        const HPSRem = vivify.percentOnRemTargets * renewingMist.oneSpread * vivify.cpm / 60;
        
        const vivifyCleaveRatio = (0.738 * renewingMist.avgStacks) / (0.738 * renewingMist.avgStacks + 1) 
        const HPSViv = vivifyCleaveRatio * vivify.hps * 0.2;

        const HPSEnv = envelopingMist.singleCast * renewingMist.avgStacks * envelopingMist.cpm * 0.2 / 60;

        bonus_stats.hps = HPSRem + HPSViv + HPSEnv;
    }

    
    else if (name === "Yu'lon's Whisper") {
        const thunderFocusTeaCPM = 1.5;
        const yulonSP = 1.8;
        const yulonExpectedOverhealing = 0.22;
        const yulonTargets = 6;
        const yulonOneHeal = yulonSP * player.getStatMultiplier("CRITVERS") * player.activeStats.intellect * (1 - yulonExpectedOverhealing);

        bonus_stats.hps =  yulonOneHeal * yulonTargets * thunderFocusTeaCPM / 60;
        
    }
    else if (name === "Invoker's Delight") {
        // This is an attempt to model the extra casts you get in the Celestial window against it's mana cost. 
        // It is an imperfect, but solid formula for a legendary that really only should be used in niche situations. 
        
        const celestialUptime = 0.3 * 25 / 60; // 
        const celestialHPS = 9800;
        const celestialManaCostPerSecond = 1100;
        
        bonus_stats.hps = (celestialHPS - celestialManaCostPerSecond * player.getSpecialQuery("OneManaHealing", contentType)) * celestialUptime * 0.33;
        
        
    }
    else if (name === "Roll Out") {
        bonus_stats.hps = 0;
    }

    else {
        bonus_stats.hps = -1;
    }

    return bonus_stats;
    
}
