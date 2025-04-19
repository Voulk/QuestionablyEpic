import { getSiTHPS, applyConduit } from "./FallenOrderFormulas";

//potency
const NOURISHING_CHI = 0.1875;
const JADE_BOND = 0.0625;
const RISING_SUN_REVIVAL = 0.125;
const RESPLENDENT_MIST = 0.5;
const RESPLENDENT_MIST_HIT_CHANCE = .3;

//covenant specific
const STIKE_WITH_CLARITY = 1;
//const WAY_OF_THE_FAE = .105;
const BONE_MARROW_HOPS = 0.4;
const BONE_DUST_BREW_HIT_CHANCE = .5;
const BONE_DUST_BREW_DEFAULT_MULTISTRIKE_PERCENT = .35;
const IMBUED_REFLECTIONS = 0.3625;

//endurance
const FORTIFYING_INGREDIENTS = 0.12;
const HARM_DEINAL = 0.25;
//const GROUND_BREATH = .15;

const ID_VIVIFY = 116670;
const ID_SOOTHING_BREATH = 322118;
const OTHER_ID_SOOTHING_BREATH = 343737;
const ID_REVIVAL = 115310;
const ID_FORTIFYING_BREW = 115203;
const ID_GUST_OF_MISTS = 191894;
const CHI_JI_GUST_OF_MIST = 343819;
const EXPEL_HARM_SELF = 322101;
const EXPEL_HARM_TARGET = 344939;

function conduitScaling(rankOne, requiredRank) {
  const scalingFactor = rankOne * 0.1;
  const rankZero = rankOne - scalingFactor;
  const rankRequested = rankZero + scalingFactor * requiredRank;
  return rankRequested;
}

export const getMonkConduit = (conduitID, player, contentType, conduitLevel) => {
  let bonus_stats = {};

  // === Potency Conduits ===
  // Jade Bond
  if (conduitID === 336773) {
    const conduitPower = conduitScaling(JADE_BOND, conduitLevel);
    // You can only have one of the two so its gonna be 0 + real or real + 0 so we can cheat and be lazy
    // this is just easier to read and debug HAHAHAHAHA
    const yulonHealing = player.getSpellHPS(ID_SOOTHING_BREATH, contentType);
    const yulonOtherSpellID = player.getSpellHPS(OTHER_ID_SOOTHING_BREATH, contentType);
    const chijiHealing = player.getSpellHPS(CHI_JI_GUST_OF_MIST, contentType);
    // so this might seem strange but yu'lon healing and yu'lon other spell id should be the same
    // but the report might be weird where one gets the value and the other doesn't
    // so to fight this we just pick the highest of the two by default
    const chijiAndYulonHelaing = Math.max(yulonHealing, yulonOtherSpellID) + chijiHealing;
    const directHealingIncrease = chijiAndYulonHelaing * conduitPower;

    // TODO cdr stuffs ???

    bonus_stats.HPS = directHealingIncrease;
  }
  // Nourishing Chi
  else if (conduitID === 337241) {
    //TODO Do we care about other healers hps or just ours?
    const conduitPower = conduitScaling(NOURISHING_CHI, conduitLevel);
    const hotsDuringLC = player.getSpecialQuery("HPSHotHealingDuringLC", contentType);
    const hotHealingBeforeBoosts = hotsDuringLC / 1.5;
    const healingIncreaseDuringLC = hotHealingBeforeBoosts * conduitPower;

    const hotsAfterLC = player.getSpecialQuery("HPSHotHealingAfterLC", contentType);
    const healingIncreaseAfterLC = hotsAfterLC * conduitPower;

    bonus_stats.HPS = healingIncreaseDuringLC + healingIncreaseAfterLC;
  }
  // Resplendent Mist
  else if (conduitID === 336812) {
    const conduitPower = conduitScaling(RESPLENDENT_MIST, conduitLevel);
    const gomHPS = player.getSpellHPS(ID_GUST_OF_MISTS, contentType);
    const chijiHPS = player.getSpellHPS(CHI_JI_GUST_OF_MIST, contentType);
    const effectedGoMHPS = gomHPS + chijiHPS;
    const directHealingIncrease = effectedGoMHPS * conduitPower * RESPLENDENT_MIST_HIT_CHANCE;

    bonus_stats.HPS = directHealingIncrease;
  }
  // Rising Sun Revival
  else if (conduitID === 337099) {
    const conduitPower = conduitScaling(RISING_SUN_REVIVAL, conduitLevel);
    const hrHPS = player.getSpellHPS(ID_REVIVAL, contentType);
    const directHealingIncrease = hrHPS * conduitPower;

    // TODO cdr stuff

    bonus_stats.HPS = directHealingIncrease;
  }

  // === Covenent specific ===

  // Strike with Clarity (Kyrian)
  else if (conduitID === 337286) {
    const conduitPower = conduitScaling(STIKE_WITH_CLARITY, conduitLevel);

    //uptime stuffs
    const normalUptime = 30 / 120;
    const uptimeWithConduit = 35 / 120;
    const deltaUptime = uptimeWithConduit - normalUptime;

    //how much healing does the extra mastery give us for normal useage
    const masteryFromPower = conduitPower * 35;
    const masteryStatWeight = player.getStatWeight(contentType, "mastery");
    const healingFromExtraMasteryDuringNormalTime = masteryStatWeight * masteryFromPower * normalUptime;

    const masteryFromCovenantItself = 42 * 35 + masteryFromPower;
    const healingFromExtraTime = masteryStatWeight * masteryFromCovenantItself * deltaUptime;

    bonus_stats.HPS = healingFromExtraMasteryDuringNormalTime + healingFromExtraTime;
  }
  // Imbued Reflections (Venthyr)
  else if (conduitID === 337301) {

    // Since SiT is the standard playstyle and conduit power is also tied to it
    // SiT math has been moved to a different file in order to keep the code DRY
    const baseHPS = getSiTHPS(player, contentType);
    const buffedHPS = applyConduit(baseHPS, conduitLevel);

    bonus_stats.HPS = buffedHPS - baseHPS;
  }
  // Bone Marrow Hops (Necrolord)
  else if (conduitID === 337295) {
    const uptimeWithBMH = 10 / 57.5;
    const normalUptime = 10 / 60;
    const netUptimeFromBMH = uptimeWithBMH - normalUptime;
    const boneDustBrewHitRate = BONE_DUST_BREW_HIT_CHANCE;

    const conduitPower = conduitScaling(BONE_MARROW_HOPS, conduitLevel);
    const actualIncreaseForBDB = (1 + conduitPower) * BONE_DUST_BREW_DEFAULT_MULTISTRIKE_PERCENT;
    const actualIncreaseFromBMH = actualIncreaseForBDB - BONE_DUST_BREW_DEFAULT_MULTISTRIKE_PERCENT;

    const totalHPS = player.getHPS(contentType);

    const directHealingIncrease = totalHPS * actualIncreaseFromBMH * normalUptime * boneDustBrewHitRate;
    const extraUptimeHPS = totalHPS * actualIncreaseForBDB * netUptimeFromBMH * boneDustBrewHitRate;

    bonus_stats.HPS = directHealingIncrease + extraUptimeHPS;
  }
  // Way of the Fae (Night Fae) NO HPS BOOST
  // 9.1 update. Still doesn't impact healing. We love this conduit
  else if (conduitID === 337303) {
    bonus_stats.HPS = 0;
  }

  // === Endurance Conduits ===
  // Fortifying Ingredients
  else if (conduitID === 336853) {
    const conduitPower = conduitScaling(FORTIFYING_INGREDIENTS, conduitLevel);
    const maxHP = player.getHealth(contentType);
    const versPercent = 1 + player.activeStats.versatility / 40 / 100;

    const shield = maxHP * versPercent * conduitPower;

    const cpm = 0.25;      // player.getSpellCPM(ID_FORTIFYING_BREW, contentType);

    const hps = (shield * cpm) / 60;

    bonus_stats.HPS = hps;
  }
  // Grounding Breath
  else if (conduitID === 336632) {
    const healingPerVivify = player.getSingleCast(ID_VIVIFY, contentType);

    const durationOfFight = player.getFightLength(contentType);
    const numberOfExtraVivifies = Math.ceil(durationOfFight / 60);

    const bonusHPS = (healingPerVivify * numberOfExtraVivifies) / durationOfFight;

    // TODO healing only on yourself?

    bonus_stats.HPS = bonusHPS;
  }
  // Harm Denial
  else if (conduitID === 336379) {
    //TODO damage factor?
    //Bugged right now so like it only boosts the one on yourself and not the other one`

    const conduitPower = conduitScaling(HARM_DEINAL, conduitLevel);
    const yourExpelHarm = player.getSpellHPS(EXPEL_HARM_SELF, contentType);
    //const otherExpelHarm = player.getSpellHPS(EXPEL_HARM_TARGET, contentType);
    const directHealingIncrease = yourExpelHarm * conduitPower; //+ otherExpelHarm * conduitPower;

    bonus_stats.HPS = directHealingIncrease;
  }

  return bonus_stats;
};
