import { raidTrinketData } from "./TrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../EffectUtilities";

const trinketCategories = {
    RAIDDROPS: "Raid Drops",
    DUNGEONDROPS: "Dungeon Drops",
    OTHER: "Other",
    DPS: "DPS Trinkets",
}

export const getTrinketDescription = (trinketName, player, additionalData) => {
    const trinketData = getTrinketData(trinketName);
    const itemLevel = 441;
    if (trinketData === null) return null;
    switch (trinketName) {
        case "Echoing Tyrstone":
            return echoingTyrstone(trinketData, itemLevel, player, additionalData);
        case "Paracausal Fragment of Val'anyr":
            return paracausalFragmentOfValanyr(trinketData, 424, player, additionalData);
        case "Mirror of Fractured Tomorrows":
            return mirrorOfFracturedTomorrows(trinketData, itemLevel, player, additionalData);
        case "Time-Thief's Gambit":
            return timeThiefsGambit(trinketData, itemLevel, player, additionalData);
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
        category: trinketCategories.RAIDDROPS,
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
        category: trinketCategories.RAIDDROPS,
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
        category: trinketCategories.RAIDDROPS,
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
        category: trinketCategories.RAIDDROPS,
        metrics: ["Mana / Min: " + Math.round(bonus_stats.mana * 60), 
                "HPS: " + Math.round(bonus_stats.hps),
                "Equiv Vers: " + Math.round(bonus_stats.allyStats)],
        description:
          "A massive package of mana, healing and versatility given out to your party. Capped at 10 buffs out per proc. Procs off an almost random assortment of spells for each spec with no real logic.",
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
          "Expect nerfs. Currently hits all allies in a very large range and charging it to full is trivial. Very limited testing was possible on the PTR.",
      };
}

const paracausalFragmentOfValanyr = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.OTHER,
        metrics: ["HPS: " + Math.round(bonus_stats.hps),
                "Expected Wastage: " + Math.round((1 - effect.efficiency)*10000)/100 + "%", 
                "Shields / Min: " + Math.round(effect.ppm * effect.ticks * player.getStatPerc('haste'))],
        description:
          "10 shield charges per proc and you can expect a little more than 1 proc per minute depending on your haste. A decent option but appears capped at 424 item level. \
          Basically all heal events use one of your shield charges.",
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
          "The clone isn't functional on the PTR making this quite a weak option but check back soon after launch since they're likely to fix it. Underwhelming as a stat trinket alone. It's \
          also difficult to leverage a three minute on-use effect as a " + player.spec + ".",
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
          "More information to come on what mobs 'reset the timeline'. Unlikely to be worth the risk in raid.",
      };
}

const magmaclawLure = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    

    return {
        category: trinketCategories.OTHER,
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
        category: trinketCategories.RAIDDROPS,
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
        category: trinketCategories.RAIDDROPS,
        metrics: ["Chosen Stat: " + Math.round(primary + secondary * 0.25),
                    "Other Secondaries: " + Math.round(secondary * 1.25)],
        description:
          "Great passive stat trinket. If your raid needs a specific buff it's ok to use it even if it's slightly worse for you. If you get to choose, then " + playerBestStat + " is likely to be your best option. You can toggle whether you are getting buffs from allies in the settings panel.",
      };
}

const rainsong = (data, itemLevel, player, additionalData) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    return {
        category: trinketCategories.DUNGEONDROPS,
        metrics: ["Uptime: " + convertExpectedUptime(effect, player, false),
                    "Self Haste: " + Math.round(bonus_stats.haste), 
                    "Gifted Haste: " + Math.round(bonus_stats.allyStats)],
        description:
          "A solid but unexceptional haste trinket, though it leans support heavy so you'll only find it to be a competitive choice if you value giving buffs to allies.",
      };


}

