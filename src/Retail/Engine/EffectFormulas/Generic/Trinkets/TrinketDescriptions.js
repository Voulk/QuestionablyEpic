import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { timewalkingTrinketData } from "./TimewalkingTrinketData";
import { embellishmentData } from "Retail/Engine/EffectFormulas/Generic/Embellishments/EmbellishmentData";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../../EffectUtilities";
import { correctCasing, getItemProp, getItemAllocations, calcStatsAtLevel } from "General/Engine/ItemUtilities";
import { convertExpectedUptime, buildGenericHealProc, buildGenericStatStick } from "Retail/Engine/EffectFormulas/Generic/DescriptionsShared";

import { encounterDB, timewalkingDB } from "Databases/InstanceDB"

const trinketCategories = {
    //RAIDDROPS: "Raid Drops",
    VAULT: "Vault Drops",
    ABERRUS: "Aberrus Drops",
    AMIRDRASSIL: "Amirdrassil Drops",
    DUNGEONDROPS: "Dungeon Drops",
    OTHER: "Other",
    DPS: "DPS Trinkets",
    LASTTIER: "Last Season Trinkets",


}

const getTrinketDropLoc = (trinketID) => {
    let dropLoc = "";
    // Get Trinket
    const sources = getItemProp(trinketID, "sources", "Retail");
    if (sources) {

        const instanceId = sources[0].instanceId;
        if (instanceId === 1273) dropLoc = " Nerub-ar Palace (Raid) - " + encounterDB[1273].bosses[sources[0].encounterId];
        else if (instanceId === 1296) dropLoc = " Undermine (Raid) - " + encounterDB[1296].bosses[sources[0].encounterId];
        else if (instanceId === 1302) dropLoc = " Manaforge Omega (Raid) - " + encounterDB[1302].bosses[sources[0].encounterId];
        else if (instanceId === -1) dropLoc = encounterDB[-1]["Retail"][sources[0].encounterId] + " (Dungeon)";
        else if (instanceId === -4) dropLoc = " Crafted";
        else if (instanceId === -12) dropLoc = timewalkingDB[sources[0].encounterId] + " Timewalking";
        else if (instanceId === -69) dropLoc = " Delves";
        //dropLoc = instanceDB[sources[0].instanceId.toString()]
    }

    // Translate Drop Location to readable text
    return dropLoc
}

export const getTrinketData = (trinketName) => {
    const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData, embellishmentData, timewalkingTrinketData)
    let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

    return activeTrinket;
}


export const buildRetailEffectTooltip = (trinketName, player, itemLevel, playerSettings, trinketID) => {
    const trinketDescription = [trinketName + " (" + itemLevel + ")"];
    
    // Handle Passive Stats
    let itemAllocations = getItemAllocations(trinketID);
    
    const trinketBaseStats = calcStatsAtLevel(itemLevel, "Trinket", itemAllocations, "");
    trinketDescription.push("Passive Stats")

    Object.keys(trinketBaseStats).forEach((statName) => {    
        if (trinketBaseStats[statName] > 0) trinketDescription.push(statName.charAt(0).toUpperCase() + statName.slice(1) + ": " + Math.round(trinketBaseStats[statName]))
        
    });

    // Effect Stats

    const trinketData = getTrinketData(trinketName);
    if (trinketData === undefined) return [];
    const trinketEffects = trinketData.effects;

    const additionalData = {contentType: "Raid", settings: playerSettings, setStats: {}, castModel: player.getActiveModel("Raid"), player: player, setVariables: {}};
    const trinketStats = trinketData.runFunc(trinketData.effects, player, itemLevel, additionalData)
    if (trinketData.description) trinketDescription.push(trinketData.description);
    trinketDescription.push("")

    trinketDescription.push("Effect Breakdown")
    if (trinketEffects[0].canOverlap) {
        // Overlapping stack trinkets.
        const avgStacks = Math.round(100*trinketStats[trinketEffects[0].stat] / processedValue(trinketEffects[0], itemLevel))/100;
        trinketDescription.push("Average Stacks: " + avgStacks);
    }
    else if (trinketEffects[0].ppm && trinketEffects[0].stat) {
        // We're dealing with a stat proc trinket.
        if (trinketName === "Locus-Walker's Ribbon" || trinketName === "Gaze of the Alnseer") {
            trinketDescription.push("Expected Uptime: " + convertExpectedUptime(trinketEffects[0], player, false, true));
        }
        else {
            trinketDescription.push("Expected Uptime: " + convertExpectedUptime(trinketEffects[0], player, false));
        }  
    }

    Object.keys(trinketStats).forEach((statName) => {    
        trinketDescription.push(statName.charAt(0).toUpperCase() + statName.slice(1) + ": " + Math.round(trinketStats[statName]))
    });

    
    if (trinketData.setting) {
        trinketDescription.push("")

        trinketDescription.push("Setting Available")
    }
    if (trinketEffects[0].holyMasteryFlag && player.spec === "Holy Priest") trinketDescription.push("Procs Echo of Light")


    if (getTrinketDropLoc(trinketID)) {
        trinketDescription.push("Drops from: " + getTrinketDropLoc(trinketID));
    }

    return trinketDescription;

}




