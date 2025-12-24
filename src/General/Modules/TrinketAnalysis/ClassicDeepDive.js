
import { getAllTrinketDataClassic } from "Classic/Engine/EffectFormulas/Generic/TrinketDataClassic"
import { instanceDB } from "Databases/InstanceDB";
import { getItemProp } from "General/Engine/ItemUtilities";

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

const getTrinketDropLoc = (trinketID) => {
    let dropLoc = "";
    // Get Trinket
    const sources = getItemProp(trinketID, "sources", "Classic");
    if (!sources || sources.length === 0) return "";

    const instanceName = instanceDB[sources[0].instanceId.toString()];

    if (instanceName) {


        dropLoc = instanceName;
        //const instanceId = sources[0].instanceId;
        //if (instanceId === 1273) dropLoc = " Nerub-ar Palace (Raid) - " + encounterDB[1273].bosses[sources[0].encounterId];
        //else if (instanceId === 1296) dropLoc = " Undermine (Raid) - " + encounterDB[1296].bosses[sources[0].encounterId];
        //else if (instanceId === -1) dropLoc = encounterDB[-1]["Retail"][sources[0].encounterId] + " (Dungeon)";
        //else if (instanceId === -4) dropLoc = " Crafted";
        //else if (instanceId === -69) dropLoc = " Delves";
        //dropLoc = instanceDB[sources[0].instanceId.toString()]
    }

    // Translate Drop Location to readable text
    return dropLoc
}

export const buildClassicEffectTooltip = (trinketName, player, itemLevel, trinketID) => {
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
        //trinketDescription.push("Effective MP5 at 5k int: " + convertSpiritToMP5(trinketStats.spirit, 5000, player.spec));
        trinketDescription.push("Mana Per Minute: " + Math.round(trinketStats.spirit * 1.128 * 0.5 * 12));

        if (player.spec.includes("Restoration Druid")) {
            // Handle Innervate
            trinketDescription.push("Innervate Mana Per Minute: " + Math.round(trinketStats.spirit * 0.5 * 10 / 3));
        }
    }
    if (trinketStats.mp5) {
        trinketDescription.push("Mana Per Minute: " + Math.round(trinketStats.mp5 * 12));
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

    if (getTrinketDropLoc(trinketID)) {
        trinketDescription.push("Item Source: " + getTrinketDropLoc(trinketID));
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