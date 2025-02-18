
import { getAllTrinketDataClassic } from "Classic/Engine/EffectFormulas/Generic/TrinketDataClassic"

const convertSpiritToMP5 = (spiritAmount, intellect, spec) => {
    const regen = 0.001 + spiritAmount * Math.sqrt(intellect) * 0.016725;

    if (spec.includes("Holy Paladin") || spec.includes("Holy Priest")) return Math.round(regen * 0.8);
    else return Math.round(regen * 0.5);
    
}

const getTrinketData = (trinketName) => {
    const trinketData = getAllTrinketDataClassic();
    let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

    return activeTrinket;
}

export const buildClassicEffectTooltip = (trinketName, player, itemLevel) => {
    const trinketDescription = [trinketName + " (" + itemLevel + ")"];
    trinketDescription.push("")
    const trinketData = getTrinketData(trinketName);
    const additionalData = { setStats: player.activeStats }
    if (trinketData === undefined) return [];
    const trinketStats = trinketData.runFunc(trinketData.effects, player, itemLevel, additionalData)
    
    Object.keys(trinketStats).forEach((statName) => {    
        trinketDescription.push(statName.charAt(0).toUpperCase() + statName.slice(1) + ": " + Math.round(trinketStats[statName]))
    });

    if (trinketStats.spirit) {
        trinketDescription.push("Effective MP5 at 5k int: " + convertSpiritToMP5(trinketStats.spirit, 5000, player.spec));
        trinketDescription.push("Effective MP5 at 6k int: " + convertSpiritToMP5(trinketStats.spirit, 6000, player.spec));
        trinketDescription.push("Effective MP5 at 7k int: " + convertSpiritToMP5(trinketStats.spirit, 7000, player.spec));
        trinketDescription.push("Effective MP5 at 8k int: " + convertSpiritToMP5(trinketStats.spirit, 8000, player.spec));
    }
    

    const trinketOpinion = getTrinketOpinion(trinketName, player.spec);
    if (trinketOpinion) {
        trinketDescription.push("");
        trinketDescription.push(getTrinketOpinion(trinketName, player.spec));
    }
    if (trinketData.description) {
        trinketDescription.push("");
        trinketDescription.push(trinketData.description);
    }

    return trinketDescription;
}

const getTrinketOpinion = (trinketName, spec) => {

    if (trinketName === "Tyrande's Favorite Doll") return "An extremely powerful pre-raid trinket that you'll use for a very long time. Worth the farm."
    else if (trinketName === "Shard of Woe") return "This is the POST NERF version of Shard of Woe. Sadly it doesn't look like we're getting the proper version."
    else if (trinketName === "Vibrant Alchemist Stone") {
        if (spec === "Restoration Druid Classic") return "Alch Stone is a solid pre-raid option, but note a lot of its value comes from helping you hit a haste breakpoint which isn't fully reflected in the score";
    }
    else if (trinketName === "Tear of Blood") return "Doesn't keep up with the more expensive trinkets above it, but is incredibly accessible and your best dungeon drop."
}