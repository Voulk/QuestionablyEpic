
import { getAllTrinketDataClassic } from "Classic/Engine/EffectFormulas/Generic/TrinketDataClassic"

const convertSpiritToMP5 = (spiritAmount, intellect) => {
    const regen = 0.001 + spiritAmount * Math.sqrt(intellect) * 0.016725 * 0.5;
    return Math.round(regen);
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
    if (trinketData === undefined) return [];
    const trinketStats = trinketData.runFunc(trinketData.effects, player, itemLevel, {})
    trinketDescription.push("");
    Object.keys(trinketStats).forEach((statName) => {    
        trinketDescription.push(statName.charAt(0).toUpperCase() + statName.slice(1) + ": " + Math.round(trinketStats[statName]))
    });

    if (trinketStats.spirit) {
        trinketDescription.push("Effective MP5 at 4k int: " + convertSpiritToMP5(trinketStats.spirit, 4000));
        trinketDescription.push("Effective MP5 at 5k int: " + convertSpiritToMP5(trinketStats.spirit, 5000));
        trinketDescription.push("Effective MP5 at 6k int: " + convertSpiritToMP5(trinketStats.spirit, 6000));
    }

    return trinketDescription;
}