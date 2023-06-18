import { raidTrinketData } from "./TrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../EffectUtilities";


export const getTrinketDescription = (trinketName, player, additionalData) => {
    const trinketData = getTrinketData(trinketName);
    const itemLevel = 441;
    if (trinketData === null) return null;
    switch (trinketName) {
        case "Neltharion's Call to Suffering":
            return neltharionsCallToSuffering(trinketData, itemLevel, player, additionalData);
        case "Neltharion's Call to Chaos":
            return neltharionsCallToChaos(trinketData, itemLevel, player, additionalData);
        case "Screaming Black Dragonscale":
            return screamingBlackDragonscale(trinketData, itemLevel, player, additionalData);
        case "Rashok's Molten Heart":
            return rashoksMoltenHeart(trinketData, itemLevel, player, additionalData);
        case "Rainsong":
            return rainsong(trinketData, itemLevel, player, additionalData);
        case "Magmaclaw Lure":
            return magmaclawLure(trinketData, 411, player, additionalData);
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

const convertExpectedUptime = (effect, player, hasted) => {
    let ppm = effect.ppm;
    if (hasted) ppm = ppm * player.getStatPerc('haste');
    const realUptime = Math.round(convertPPMToUptime(ppm, effect.duration) * 100);
    return realUptime + "%"; //data.effects[0].duration * data.effects[0].ppm / 60;
}

const neltharionsCallToSuffering = (data, itemLevel, player) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, {})

    return {
        metrics: ["Expected Uptime: " + convertExpectedUptime(effect, player, false), 
                "Average Int: " + Math.round(bonus_stats.intellect)],
        description:
          "Fixed to proc off healing spells including HoTs. Downside IS deducted from its expected throughput, but shouldn't feel too dangerous in practice. Priest / Druid only.",
      };

}

const neltharionsCallToChaos = (data, itemLevel, player) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, {})

    return {
        metrics: ["Expected Uptime: " + convertExpectedUptime(effect, player, false), 
                "Average Int: " + Math.round(bonus_stats.intellect)],
        description:
          "Fixed to proc off healing spells. Very high variance. Damage taken increase not included in formula. Evoker / Paladin only.",
      };

}

const screamingBlackDragonscale = (data, itemLevel, player) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, {})

    return {
        metrics: ["Uptime: " + effect.expectedUptime * 100 + "%", 
                "Average Crit: " + Math.round(bonus_stats.crit),
                "Average Leech: " + Math.round(bonus_stats.leech)],
        description:
          "A very high uptime stat stick that is solid for every healing spec - regardless of precisely where crit falls for you. Very Rare drop.",
      };

}

const rashoksMoltenHeart = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        metrics: ["Mana / Min: " + Math.round(bonus_stats.mana * 60), 
                "HPS: " + Math.round(bonus_stats.hps),
                "Equiv Vers: " + Math.round(bonus_stats.allyStats)],
        description:
          "A massive package of mana, healing and versatility given out to your party. Capped at 10 buffs out per proc. Procs off an almost random assortment of spells for each spec with no real logic.",
      };

}

const magmaclawLure = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    

    return {
        metrics: ["HPS: " + Math.round(bonus_stats.hps),
                "Expected Efficiency: " + (effect.efficiency[additionalData.contentType]) * 100 + "%"],
        description:
          "A previously overtuned AoE shield effect that has been nerfed. This is no longer worth wearing if you have access to higher item level alternatives.",
      };
}

const wardOfFacelessIre = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
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
        metrics: ["Chosen Stat: " + Math.round(primary + secondary * 0.25),
                    "Other Secondaries: " + Math.round(secondary * 1.25)],
        description:
          "Great passive stat trinket. If your raid needs a specific buff it's ok to use it even if it's slightly worse for you. If you get to choose, then " + playerBestStat + " is likely to be your best option.",
      };
}

const rainsong = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        metrics: ["Uptime: " + convertExpectedUptime(effect, player, false),
                    "Self Haste: " + Math.round(bonus_stats.haste), 
                    "Gifted Haste: " + Math.round(bonus_stats.allyStats)],
        description:
          "A solid but unexceptional haste trinket, though it leans support heavy so you'll only find it to be a competitive choice if you value giving buffs to allies.",
      };


}

