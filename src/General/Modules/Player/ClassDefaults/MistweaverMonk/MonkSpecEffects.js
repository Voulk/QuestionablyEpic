
import { convertPPMToUptime } from "Retail/Engine/EffectFormulas/EffectUtilities"

const ID_VIVIFY = 116670;
const ID_RENEWING_MIST = 119611;
const ID_ENVELOPING_MIST = 124682;
const ID_ESSENCE_FONT = 191840;
const ID_CHI_JI_GOM = 343819;
const ID_SOOTHING_BREATH = 343737;
const ID_ENVELOPING_BREATH_ID = 325209;

export const getMonkSpecEffect = (effectName, player, contentType) => {
  let bonus_stats = {};

  if (effectName === "Mistweaver Monk S1-2") {
    bonus_stats.bonusHPS = 0.031;
  } 
    else if (effectName === "Mistweaver Monk S1-4") {
    bonus_stats.bonusHPS = 0.0312;
  } 
else {
    bonus_stats.hps = -1;
  }

  return bonus_stats;
};
