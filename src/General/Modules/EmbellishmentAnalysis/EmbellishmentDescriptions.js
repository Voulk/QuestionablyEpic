
import { embellishmentData } from "Retail/Engine/EffectFormulas/Generic/EmbellishmentData";
import { convertExpectedUptime, buildGenericHealProc, buildGenericStatStick } from "Retail/Engine/EffectFormulas/Generic/DescriptionsShared";
import { getSetting, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";

export const getEmbellishmentDescription = (embellishmentName, player, additionalData) => {
    let embData = embellishmentData.filter(emb => emb.name === embellishmentName)[0];
    const itemLevel = 486;
    //if (trinketData === null) return null;
    switch (embellishmentName) {

        // -- Season 3 Raid --
        case "Elemental Lariat":
            return getElementalLariat(embData, itemLevel, player, additionalData);
        case "Undulating Sporecloak":
            return getSporecloak(embData, itemLevel, player, additionalData);
        case "Verdant Tether":
            return getVerdantTether(embData, itemLevel, player, additionalData);
        case "Verdant Conduit":
            return getVerdantConduit(embData, itemLevel, player, additionalData);
        case "Magazine of Healing Darts":
            return getHealingDarts(embData, itemLevel, player, additionalData);
        case "Allied Heartwarming Fur Coat":
        case "Allied Wristguards of Time Dilation":
        case "Allied Legguards of Sansok Khan":
        case "Allied Chestplate of Generosity":
            embData = embellishmentData.filter(emb => emb.name === "Rallied to Victory")[0];
            return getRalliedToVictory(embData, itemLevel, player, additionalData);
        default:
            return null;
    }

}

const getElementalLariat = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    const gems = Math.min(8, getSetting(additionalData.settings, "lariatGems") || 3);
    const duration = 5 + parseInt(gems);

    const newData = {...effect, duration: duration};
    const description = "Lariat is a safe, high uptime embellishment which generally contributes around ~0.7% healing with a decent gem count. It's solid in all content types. At max level you'll get " + processedValue(effect, itemLevel) + " secondaries while the buff is active.";

    const metrics = ["Gems: " + gems,
                    "Uptime: " + (convertExpectedUptime(newData, player, false))]
    Object.keys(bonus_stats).forEach((stat) => {
        metrics.push("Avg Stat" + ": " + Math.round(bonus_stats[stat]))
    })

    return {
        category: "Items",
        metrics: metrics,
        description: description,
      };
}

// Would be nice to split this into shield / ticking heal but not easy.
const getSporecloak = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: "Items",
        metrics: ["Time >70%: " + (data.effects[2].expectedUptime * 100) + "%",
                "HPS: " + Math.round(bonus_stats.hps),
                "Versatility: " + Math.round(bonus_stats.versatility)],
        description:
          "Sporecloak is a leviathan of an item offering one of the best secondary stat packages in the game alongside a powerful shield and mostly decent ticking heal effect.",
      };
}

const getRalliedToVictory = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    let description = "Gives you and 4 nearby allies " + processedValue(effect, itemLevel) + " versatility while active.";
    if (player.spec.includes("Priest")) description += " This is a particularly strong effect for Priest specs since Wrists are a convenient slot to store an Embellishment."
    else description += " While this is an extremely strong effect, it can be difficult to fit its slot into your gear as a " + player.spec + ".";
    
    return {
        category: "Items",
        metrics: ["Uptime: " + (data.effects[0].ppm * 100) + "%",
                "Personal Vers: " + Math.round(bonus_stats.versatility),
                "Shared Vers: " + Math.round(bonus_stats.allyStats)],
        description:
          description,
      };
}

const getVerdantTether = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    const maxValue = processedValue(effect, itemLevel);
    let description = Math.round(maxValue/2) + " to " + maxValue + " versatility for you and a friend. Minimum value is at 30 yards, maximum is pixel stacked on top. The green trail will show you where your ally is. 2.2 procs per minute.";

    return {
        category: "Item Attachments",
        metrics: ["Uptime: " + convertExpectedUptime(effect, player, false),
                "Personal Vers: " + Math.round(bonus_stats.versatility),
                "Shared Vers: " + Math.round(bonus_stats.allyStats)],
        description: description,
      };
}

const getVerdantConduit = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    let description = processedValue(effect, itemLevel) + " of a random secondary stat with high uptime. Very flexible but ends up being a bit of a worse Elemental Lariat usually.";

    return {
        category: "Item Attachments",
        metrics: ["Uptime: " + Math.round(10000 * effect.uptime) / 100 + "%",
                "Total Avg Secondaries: " + Math.round(bonus_stats.versatility + bonus_stats.mastery + bonus_stats.haste + bonus_stats.crit),
                ],
        description: description,
      };
}

const getHealingDarts = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    let description = "Healing Darts don't scale that well and also got nerfed going into 10.2. You'll find them a mid range embellishment with very high pull to pull variance.";

    return {
        category: "Item Attachments",
        metrics: ["Avg Procs per Minute: " + effect.ppm,
                "Expected Overhealing: " + getSetting(additionalData.settings, "healingDartsOverheal") + "%",
                "Average HPS: " + Math.round(bonus_stats.hps),
                ],
        description: description,
      };
}