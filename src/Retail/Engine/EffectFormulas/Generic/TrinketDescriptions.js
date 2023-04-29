import { raidTrinketData } from "./TrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../EffectUtilities";


export const getTrinketDescription = (trinketName, contentType, spec) => {
    const trinketData = getTrinketData(trinketName);
    const itemLevel = 441;
    if (trinketData === null) return null;
    switch (trinketName) {
        case "Neltharion's Call to Suffering":
            return neltharionsCallToSuffering(trinketData, itemLevel, contentType, spec);
        case "Screaming Black Dragonscale":
            return screamingBlackDragonscale(trinketData, itemLevel, contentType, spec);
        case "Rashok's Molten Heart":
            return rashoksMoltenHeart(trinketData, itemLevel, contentType, spec);
        default:
            return null;
    }

}

const getTrinketData = (trinketName) => {
    const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData/*, timewalkTrinketData*/)
    let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

    return activeTrinket;
}

const convertExpectedUptime = (effect) => {
    const realUptime = Math.round(convertPPMToUptime(effect.ppm, effect.duration) * 100);
    return realUptime + "%"; //data.effects[0].duration * data.effects[0].ppm / 60;
}

const neltharionsCallToSuffering = (data, itemLevel, contentType, spec) => {
    console.log(data)
    const effect = data.effects[0];

    return {
        metrics: ["Expected Uptime: " + convertExpectedUptime(effect), 
                "Average Int: " + 700],
        description:
          "Does not proc off healing spells including HoTs. Downside not included in formula but it isn't too dangerous. Trinket is unusuably poor for Resto Druid and Holy Priest until fixed.",
      };

}

const screamingBlackDragonscale = (data, itemLevel, contentType, spec) => {
    console.log(data)
    const effect = data.effects[0];

    return {
        metrics: ["Expected Uptime: " + convertExpectedUptime(effect), 
                "Average Crit: " + 700,
                "Average Leech: " + 700],
        description:
          "A very high uptime stat stick that is good for every healing spec - regardless of precisely where crit falls for you. Very Rare drop.",
      };

}

const rashoksMoltenHeart = (data, itemLevel, contentType, spec) => {
    console.log(data)
    const effect = data.effects[0];

    return {
        metrics: ["Mana / Min: " + convertExpectedUptime(effect), 
                "HPS: " + 700,
                "Equiv Vers: " + 700],
        description:
          "A massive package of mana, healing and versatility given out to your party. Track the mana effect, and direct heal as many allies as possible while it's active \
          to get as many HoTs and thus vers buffs out as possible. AoE direct heals as ideal. Won't proc off HoT ticks.",
      };

}