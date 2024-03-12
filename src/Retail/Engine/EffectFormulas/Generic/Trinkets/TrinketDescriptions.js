import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../../EffectUtilities";
import { correctCasing } from "General/Engine/ItemUtilities";
import { convertExpectedUptime, buildGenericHealProc, buildGenericStatStick } from "Retail/Engine/EffectFormulas/Generic/DescriptionsShared";

const trinketCategories = {
    RAIDDROPS: "Raid Drops",
    DUNGEONDROPS: "Dungeon Drops",
    OTHER: "Other",
    DPS: "DPS Trinkets",
    LASTTIER: "Last Season Trinkets"
}

export const getTrinketDescription = (trinketName, player, additionalData) => {
    const trinketData = getTrinketData(trinketName);
    const itemLevel = 522;
    if (trinketData === null) return null;
    switch (trinketName) {

        // -- Season 3 Raid --
        case "Blossom of Amirdrassil":
            return blossomOfAmirdrassil(trinketData, itemLevel, player, additionalData);
        case "Smoldering Seedling":
            return smolderingSeedling(trinketData, itemLevel, player, additionalData);
        case "Pip's Emerald Friendship Badge":
            return pipsEmeraldFriendshipBadge(trinketData, itemLevel, player, additionalData);   

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

        // == Season 2 Trinkets ==
        case "Neltharion's Call to Suffering":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.LASTTIER, 
                                            "Fixed to proc off healing spells including HoTs. Downside IS deducted from its expected throughput, but shouldn't feel too dangerous in practice. Priest / Druid only.");
        case "Neltharion's Call to Chaos":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.LASTTIER, 
                                            "Fixed to proc off healing spells. Very high variance. Damage taken increase not included in formula. Evoker / Paladin only.")
        case "Screaming Black Dragonscale":
            return buildGenericStatStick(trinketData, itemLevel, player, additionalData, trinketCategories.LASTTIER, 
                                            "A very high uptime stat stick that is solid for every healing spec - regardless of precisely where crit falls for you. Very Rare drop.")
           
        case "Rashok's Molten Heart":
            return rashoksMoltenHeart(trinketData, itemLevel, player, additionalData);
        case "Ominous Chromatic Essence":
            return ominousChromaticEssence(trinketData, itemLevel, player, additionalData);
        case "Ward of Faceless Ire":
            return wardOfFacelessIre(trinketData, itemLevel, player, additionalData);
        default:
            return null;
    }

}

const getTrinketData = (trinketName) => {
    const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData/*, timewalkTrinketData*/)
    let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

    return activeTrinket;
}




const neltharionsCallToSuffering = (data, itemLevel, player) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, {})

    return {
        category: trinketCategories.LASTTIER,
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
        category: trinketCategories.RAIDDROPS,
        metrics: [ "HPS: " + Math.round(bonus_stats.hps)],
        description:
          "Expect Blossom to look quite good on your healing meter but the lack of intellect hurts it overall and prevents it from being better than top 5 - and that's if your spec likes haste. Falls off further as you approach late mythic.",
      };
}


const smolderingSeedling = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.RAIDDROPS,
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
        category: trinketCategories.RAIDDROPS,
        metrics: [ "Mastery: " + Math.round(bonus_stats.mastery),
                "Crit: " + Math.round(bonus_stats.crit),
                "Versatility: " + Math.round(bonus_stats.versatility)],
        description:
          "Pip's competes well with the top stat sticks this tier while also being much more consistent. A fantastic choice for all healing specs.",
      };
}

const rashoksMoltenHeart = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.LASTTIER,
        metrics: ["Mana / Min: " + Math.round(bonus_stats.mana * 60), 
                "HPS: " + Math.round(bonus_stats.hps),
                "Equiv Vers: " + Math.round(bonus_stats.allyStats)],
        description:
          "A massive package of mana, healing and versatility. Holds up ok in season 3 but it's become mostly useful for its vers buff and you'll replace it when you have ~470+ alternatives.",
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
        category: trinketCategories.LASTTIER,
        metrics: ["HPS: " + Math.round(bonus_stats.hps),
                "Expected Efficiency: " + (effect.efficiency[additionalData.contentType]) * 100 + "%"],
        description:
          "A niche, but situationally powerful single target shield. The DPS portion is abysmal but having access to a big two minute defensive is quite powerful to have in your back pocket. Overall HPS is middling to poor.",
      };
}

const ominousChromaticEssence = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    const primary = processedValue(data.effects[0], itemLevel);
    const secondary = processedValue(data.effects[1], itemLevel);
    const playerBestStat = player.getHighestStatWeight(additionalData.contentType);

    return {
        category: trinketCategories.LASTTIER,
        metrics: ["Chosen Stat: " + Math.round(primary + secondary * 0.25),
                    "Other Secondaries: " + Math.round(secondary * 1.25)],
        description:
          "Great passive stat trinket. If your raid needs a specific buff it's ok to use it even if it's slightly worse for you. If you get to choose, then " + playerBestStat + " is likely to be your best option. You can toggle whether you are getting buffs from allies in the settings panel.",
      };
}



