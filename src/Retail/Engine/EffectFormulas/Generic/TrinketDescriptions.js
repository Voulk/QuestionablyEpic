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
        case "Screaming Black Dragonscale":
            return screamingBlackDragonscale(trinketData, itemLevel, player, additionalData);
        case "Rashok's Molten Heart":
            return rashoksMoltenHeart(trinketData, itemLevel, player, additionalData);
        case "Rainsong":
            return rainsong(trinketData, itemLevel, player, additionalData);
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
          "Fixed to proc off healing spells including HoTs. Downside not included in formula but it isn't too dangerous.",
      };

}

const screamingBlackDragonscale = (data, itemLevel, player) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, {})

    return {
        metrics: ["Uptime: " + convertExpectedUptime(effect, player, false), 
                "Average Crit: " + Math.round(bonus_stats.crit),
                "Average Leech: " + Math.round(bonus_stats.leech)],
        description:
          "A very high uptime stat stick that is good for every healing spec - regardless of precisely where crit falls for you. Very Rare drop.",
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
          "A massive package of mana, healing and versatility given out to your party. Track the mana effect, and direct heal as many allies as possible while it's active \
          to get as many HoTs and thus vers buffs out as possible. AoE direct heals are ideal. Won't proc off HoT ticks. Capped at 10.",
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
          "A solid haste trinket, though it leans support heavy so you'll only find it to be a competitive choice if you value giving buffs to allies.",
      };

}