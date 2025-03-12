import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { timewalkingTrinketData } from "./TimewalkingTrinketData";
import { embellishmentData } from "Retail/Engine/EffectFormulas/Generic/EmbellishmentData";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../../EffectUtilities";
import { correctCasing, getItemProp } from "General/Engine/ItemUtilities";
import { convertExpectedUptime, buildGenericHealProc, buildGenericStatStick } from "Retail/Engine/EffectFormulas/Generic/DescriptionsShared";

import { encounterDB } from "Databases/InstanceDB"

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
        else if (instanceId === -1) dropLoc = encounterDB[-1]["Retail"][sources[0].encounterId] + " (Dungeon)";
        else if (instanceId === -4) dropLoc = " Crafted";
        else if (instanceId === -69) dropLoc = " Delves";
        //dropLoc = instanceDB[sources[0].instanceId.toString()]
    }

    // Translate Drop Location to readable text
    return dropLoc
}


export const buildRetailEffectTooltip = (trinketName, player, itemLevel, playerSettings, trinketID) => {
    const trinketDescription = [trinketName + " (" + itemLevel + ")"];
    

    const trinketData = getTrinketData(trinketName);
    if (trinketData === undefined) return [];
    const trinketEffects = trinketData.effects;

    const additionalData = {contentType: "Raid", settings: playerSettings, setStats: {}, castModel: player.getActiveModel("Raid"), player: player, setVariables: {}};
    const trinketStats = trinketData.runFunc(trinketData.effects, player, itemLevel, additionalData)
    if (trinketData.description) trinketDescription.push(trinketData.description);
    trinketDescription.push("")

    trinketDescription.push("Effect Breakdown")
    if (trinketEffects[0].ppm && trinketEffects[0].stat) {
        // We're dealing with a stat proc trinket.
        trinketDescription.push("Expected Uptime: " + convertExpectedUptime(trinketEffects[0], player, false));
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


export const getTrinketDescription = (trinketName, player, additionalData) => {
    const trinketData = getTrinketData(trinketName);
    const itemLevel = 528;
    if (trinketData === null) return null;
    switch (trinketName) {

        // -- Season 3 Raid --
        case "Blossom of Amirdrassil":
            return blossomOfAmirdrassil(trinketData, itemLevel, player, additionalData);
        case "Smoldering Seedling":
            return smolderingSeedling(trinketData, itemLevel, player, additionalData);
        case "Pip's Emerald Friendship Badge":
            return pipsEmeraldFriendshipBadge(trinketData, itemLevel, player, additionalData);   


        // == Season 2 Trinkets ==
        case "Neltharion's Call to Suffering":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.ABERRUS, 
                                            "1ppm. Very high variance. Downside IS deducted from its expected throughput, but shouldn't feel too dangerous in practice. Priest / Druid only.");
        case "Neltharion's Call to Chaos":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.ABERRUS, 
                                            "Very high variance. Damage taken increase not included in formula. Evoker / Paladin only.")
        case "Screaming Black Dragonscale":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.ABERRUS, 
                                            "A very high uptime stat stick that is solid for every healing spec - regardless of precisely where crit falls for you. Very Rare drop.")
           
        case "Rashok's Molten Heart":
            return rashoksMoltenHeart(trinketData, itemLevel, player, additionalData);
        case "Ominous Chromatic Essence":
            return ominousChromaticEssence(trinketData, itemLevel, player, additionalData);
        case "Ward of Faceless Ire":
            return wardOfFacelessIre(trinketData, itemLevel, player, additionalData);

        case "Whispering Incarnate Icon":
            return whisperingIncarnateIcon(trinketData, itemLevel, player, additionalData);
        case "Broodkeeper's Promise":
            return broodkeepersPromise(trinketData, itemLevel, player, additionalData);

        // -- Season 3 Dungeons --
        case "Echoing Tyrstone":
            return echoingTyrstone(trinketData, itemLevel, player, additionalData);
        case "Mirror of Fractured Tomorrows":
            return mirrorOfFracturedTomorrows(trinketData, itemLevel, player, additionalData);
        case "Time-Thief's Gambit":
            return timeThiefsGambit(trinketData, itemLevel, player, additionalData);
        case "Lady Waycrest's Music Box":
            return buildGenericHealProc(trinketData, itemLevel, player, additionalData, trinketCategories.DUNGEONDROPS, 
                                            "If you're DPSing a lot then this is a decent mix of damage and healing, but you're likely to find it still doesn't offer enough \
                                            overall to be a top tier choice.")
        case "Revitalizing Voodoo Totem":
            return buildGenericHealProc(trinketData, itemLevel, player, additionalData, trinketCategories.DUNGEONDROPS, 
                                            "Decently large healing on a single target, but very prone to overhealing. Useful to have a healer run one on Larodar.")
        case "Leaf of the Ancient Protectors":
            return leafOfTheAncientProtectors(trinketData, itemLevel, player, additionalData);
        case "Sea Star":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.DUNGEONDROPS, 
                                            "A medium uptime stat stick. A reasonable choice for all healing specs.");
        case "Coagulated Genesaur Blood":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.DUNGEONDROPS, 
                                            "A low uptime stat stick with moderate average performance.");


        default:
            return null;
    }

}

const getTrinketData = (trinketName) => {
    const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData, embellishmentData, timewalkingTrinketData)
    let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

    return activeTrinket;
}

/*
const getEmbellishmentData = (effectName) => {
    const data = embellishmentData.find((effect) => effect.name === effectName);
    let activeTrinket = 

    return activeTrinket;
} */




const neltharionsCallToSuffering = (data, itemLevel, player) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, {})

    return {
        category: trinketCategories.ABERRUS,
        metrics: ["Expected Uptime: " + convertExpectedUptime(effect, player, false), 
                "Average Int: " + Math.round(bonus_stats.intellect)],
        description:
          "Fixed to proc off healing spells including HoTs. Downside IS deducted from its expected throughput, but shouldn't feel too dangerous in practice. Priest / Druid only.",
      };

}

const leafOfTheAncientProtectors = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.DUNGEONDROPS,
        metrics: [ "HPS: " + Math.round(bonus_stats.hps),
                "Gifted Vers: " + Math.round(bonus_stats.allyStats)],
        description:
          "Can be extremely good for preventing one shots or single target burst damage in Mythic+. Poor for general throughput.",
      };
}


const blossomOfAmirdrassil = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.AMIRDRASSIL,
        metrics: [ "HPS: " + Math.round(bonus_stats.hps)],
        description:
          "Expect Blossom to look quite good on your healing meter but the lack of intellect hurts it overall and prevents it from being better than top 5 - and that's if your spec likes haste. Falls off further as you approach late mythic.",
      };
}


const smolderingSeedling = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.AMIRDRASSIL,
        metrics: [ "HPS: " + Math.round(bonus_stats.hps),
                "Mastery: " + Math.round(bonus_stats.mastery)],
        description:
          "Seedling duplicates healing it receives to 5 nearby allies. Once the pool of bonus healing is used up it transfers at a 1:1 ratio. This is a very good trinket if you have efficient single target healing, though its log percentage isn't a good reflection of healing added.",
      };
}

const pipsEmeraldFriendshipBadge = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.AMIRDRASSIL,
        metrics: [ "Mastery: " + Math.round(bonus_stats.mastery),
                "Crit: " + Math.round(bonus_stats.crit),
                "Versatility: " + Math.round(bonus_stats.versatility)],
        description:
          "A solid choice, though sees tougher competition from the other stat sticks in Season 4. Not worth a bullion but not a bad drop to get.",
      };
}

const rashoksMoltenHeart = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.ABERRUS,
        metrics: ["Mana / Min: " + Math.round(bonus_stats.mana * 60), 
                "HPS: " + Math.round(bonus_stats.hps),
                "Ally Vers: " + Math.round(bonus_stats.allyStats)],
        description:
          "A massive package of mana, healing and versatility. Most of Rashoks power now comes from the versatility buff it provides to allies. Pick it up if you're interested in that, or pick something else if you'd rather personal throughput.",
      };

}

const echoingTyrstone = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.DUNGEONDROPS,
        metrics: ["Effective HPS: " + Math.round(bonus_stats.hps),
                "Expected Overhealing: " + Math.round((1 - effect.efficiency)*100) + "%", 
                "Equiv Haste: " + Math.round(bonus_stats.allyStats)],
        description:
          "Heal splits between targets, haste is uncapped. You can also pre-charge it before combat (not included in score). Note that the haste buff makes up about half the trinkets value. Expect 2-3% healing out of it.",
      };
}

const mirrorOfFracturedTomorrows = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    const stat = Object.keys(bonus_stats)[0]
    return {
        category: trinketCategories.DUNGEONDROPS,
        metrics: ["Uptime: " + Math.round(effect.duration / effect.cooldown * 100) + "%", 
                "Average Stat Gain: " + Math.round(bonus_stats[stat]),
                "Stat while active: " + Math.round(processedValue(effect, itemLevel))],
        description:
          "Underwhelming as a stat trinket alone. It's \
          also difficult to leverage a three minute on-use effect as a " + player.spec + ". Mostly just a fill in while you search for better.",
      };
}

const timeThiefsGambit = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.DUNGEONDROPS,
        metrics: ["Uptime: " + Math.round(effect.duration / effect.cooldown * 100) + "%", 
                "Average Haste Gain: " + Math.round(bonus_stats.haste),
                "Stat while active: " + Math.round(processedValue(effect, itemLevel))],
        description:
          "Just not worth the risk if you have any competitive alternatives.",
      };
}


const wardOfFacelessIre = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.ABERRUS,
        metrics: ["HPS: " + Math.round(bonus_stats.hps),
                "Expected Efficiency: " + (effect.efficiency[additionalData.contentType]) * 100 + "%"],
        description:
          "A situationally powerful single target shield. While its overall HPS isn't very good, you could bring this to Mythic+ in the role of an extra defensive for you or a DPS.",
      };
}

const ominousChromaticEssence = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    const primary = processedValue(data.effects[0], itemLevel);
    const secondary = processedValue(data.effects[1], itemLevel);
    const playerBestStat = player.getHighestStatWeight(additionalData.contentType);

    return {
        category: trinketCategories.ABERRUS,
        metrics: ["Chosen Stat: " + Math.round(primary + secondary * 0.25),
                    "Other Secondaries: " + Math.round(secondary * 1.25)],
        description:
          "Great passive stat trinket. If your raid needs a specific buff it's ok to use it even if it's slightly worse for you. If you get to choose, then " + playerBestStat + " is likely to be your best option. You can toggle whether you are getting buffs from allies in the settings panel.",
      };
}

const whisperingIncarnateIcon = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    const primary = processedValue(data.effects[0], itemLevel);
    const secondary = data.runFunc(data.effects, player, itemLevel, additionalData).crit

    return {
        category: trinketCategories.VAULT,
        metrics: ["Haste: " + Math.round(primary),
                    "Crit / Vers: " + Math.round(secondary)],
        description:
          "Strong stat trinket if your spec likes haste. You might wear it either way if your group has a few and needs a healer running it to buff them.",
      };
}

const broodkeepersPromise = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];

    const healValue = processedValue(data.effects[1], itemLevel);

    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    const hps = bonus_stats.hps;
    const vers = bonus_stats.versatility;

    return {
        category: trinketCategories.VAULT,
        metrics: ["HPS: " + Math.round(hps),
                    "Vers: " + Math.round(vers),
                    "Ally Vers: " + Math.round(vers)],
        description:
          "Broodkeeper's Promise competes well on HPS while allowing you to heal a priority target for a lot. The heal is 2.33x stronger (and the vers 1.5x stronger) when you are close to your bonded ally so make sure you pick someone that will be in a similar position.",
      };
}



