
import { embellishmentData } from "Retail/Engine/EffectFormulas/Generic/EmbellishmentData";
import { convertExpectedUptime, buildGenericHealProc, buildGenericStatStick } from "Retail/Engine/EffectFormulas/Generic/DescriptionsShared";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

export const getEmbellishmentDescription = (embellishmentName, player, additionalData) => {
    const embData = embellishmentData.filter(emb => emb.name === embellishmentName)[0];
    const itemLevel = 486;
    //if (trinketData === null) return null;
    switch (embellishmentName) {

        // -- Season 3 Raid --
        case "Elemental Lariat":
            console.log("Lariat");
            return getElementalLariat(embData, itemLevel, player, additionalData);
        case "Undulating Sporecloak":
            console.log("Lariat");
            return getSporecloak(embData, itemLevel, player, additionalData);
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


    const metrics = ["Gems: " + gems,
                    "Uptime: " + (convertExpectedUptime(newData, player, false))]
    Object.keys(bonus_stats).forEach((stat) => {
        metrics.push("Avg Stat" + ": " + Math.round(bonus_stats[stat]))
    })

    return {
        category: "N/A",
        metrics: metrics,
        description: "Lariat is a safe, high uptime embellishment which generally contributes around ~0.7% healing with a decent gem count. It's solid in all content types.",
      };
}

// Would be nice to split this into shield / ticking heal but not easy.
const getSporecloak = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: "N/A",
        metrics: ["Time >70%: " + (data.effects[2].expectedUptime * 100) + "%",
                "HPS: " + Math.round(bonus_stats.hps),
                "Versatility: " + Math.round(bonus_stats.versatility)],
        description:
          "",
      };
}