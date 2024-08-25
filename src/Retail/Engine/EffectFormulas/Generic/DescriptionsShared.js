import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket } from "../EffectUtilities";
import { correctCasing } from "General/Engine/ItemUtilities";

export const buildGenericStatStick = (data, itemLevel, player, additionalData, cat, trinketDescr) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)

    const metrics = ["Uptime: " + (effect.expectedUptime ? (effect.expectedUptime * 100) + "%" : convertExpectedUptime(effect, player, false))]

    Object.keys(bonus_stats).forEach((stat) => {
        metrics.push(correctCasing(stat) + ": " + Math.round(bonus_stats[stat]))
    })

    return {
        category: cat,
        metrics: metrics,
        description: trinketDescr
      };
}

export const buildGenericHealProc = (data, itemLevel, player, additionalData, cat, trinketDescr) => {
    const effect = data.effects[0];
    const bonus_stats = data.runFunc(data.effects, player, itemLevel, additionalData)
    let efficiency = 0;
    
    if ('efficiency' in effect) {
        if (effect.efficiency[additionalData.contentType]) efficiency = effect.efficiency[additionalData.contentType];
        else efficiency = effect.efficiency;
      }

    let metrics = [];
    // Likely to just be hps but we'll just grab all.
    Object.keys(bonus_stats).forEach((stat) => {
        metrics.push(correctCasing(stat) + ": " + Math.round(bonus_stats[stat]))
    })

    metrics.push(["Exp Overhealing: " + Math.round((1 - efficiency)*100) + "%"])

    return {
        category: cat,
        metrics: metrics,
        description: trinketDescr
      };
}

export const convertExpectedUptime = (effect, player, hasted) => {
    let ppm = effect.ppm;
    if (hasted) ppm = ppm * player.getStatPerc('haste');
    const realUptime = Math.min(Math.round(convertPPMToUptime(ppm, effect.duration) * 100), 99);
    return realUptime + "%"; //data.effects[0].duration * data.effects[0].ppm / 60;
}