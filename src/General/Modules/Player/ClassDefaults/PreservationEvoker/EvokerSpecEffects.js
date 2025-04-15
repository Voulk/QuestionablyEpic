import { EVOKERSPELLDB } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerSpellDB";

const valueEssenceBurst = (player, contentType) => {
  const blossomData = EVOKERSPELLDB["Emerald Blossom"][0];

  const emeraldBlossomHealing = blossomData.coeff * player.getInt() * player.getStatMults(blossomData.secondaries) * 1.1 * 1.04; // Lush Growth
  const fieldOfDreams = 1/(1-0.3);
  const seedlings = 0.777 * 2 * player.getStatMults(["intellect", "versatility", "crit", "mastery"]) * 1.1 * 1.04; // Lush Growth 

  return emeraldBlossomHealing * fieldOfDreams + seedlings;

}

export const getEvokerSpecEffect = (effectName, player, contentType) => {
  // These are going to be moved to a proper file soon.

  const healingBonus = 1.04;
  const empowersCPM = 2 + 2 + 2.5; 
  const essenceBurst = valueEssenceBurst(player, contentType);
  const insuranceRPPM = 4 * player.getStatPerc('haste');
  const insuranceHealing = 0.80664 * 5 * player.getStatMults(['haste', 'crit', 'versatility', 'intellect', 'mastery'])
  let bonus_stats = {};

  if (effectName === "Evoker S2-2") {
    bonus_stats.hps = insuranceHealing * insuranceRPPM / 60;
  }
  else if (effectName === "Evoker S2-4") {
    const verdantEmbraceCPM = 3;
    const verdantEmbraceEchoCPM = 8 + (3.2 * 5); // 10 hard cast Echo + 3.2 Temporal Anomaly casts. Note there is no Echo multiplier currently.

    bonus_stats.hps = (insuranceHealing * 6 / 15) * (verdantEmbraceCPM + verdantEmbraceEchoCPM) / 60;
  }
  else if (effectName === "Evoker S1-2") {
    // This bonus is just awful
    if (contentType === "Raid") bonus_stats.hps = 0;
    else {
      const percentEffected = 0.25;
      bonus_stats.hps = percentEffected * 0.1 * player.getHPS();
    }
  }
  else if (effectName === "Evoker S1-4") {
    // +40% to spiritbloom, dream breath baseline + possible extras like Lifebind
    const spiritbloomCPM = 2.4;
    const spiritbloomData = EVOKERSPELLDB["Spiritbloom"][0];
    const oneSpiritbloom = spiritbloomData.coeff * 4 * 1.4 * player.getInt() * player.getStatMults(spiritbloomData.secondaries) * 1.1 * healingBonus; // Lush Growth

    bonus_stats.hps = oneSpiritbloom * spiritbloomCPM * 0.4 / 60;

    const dreamBreathCPM = 1.9;
    const dreamBreathData = EVOKERSPELLDB["Dream Breath"];
    const dreamBreathTicks = dreamBreathData[2].buffDuration[0] / dreamBreathData[2].tickData.tickRate * player.getStatPerc("haste") + 3.5;
    const dreamBreathCoeff = dreamBreathData[0].coeff + dreamBreathData[1].coeff[0] + dreamBreathData[2].coeff * dreamBreathTicks;
    const specialBonuses = 1.4; // Call of Ysera
    const oneDreamBreath = dreamBreathCoeff * 5 * player.getInt() * player.getStatMults(dreamBreathData[0].secondaries) * 1.1 * healingBonus * specialBonuses; // Lush Growth

    bonus_stats.hps += oneDreamBreath * dreamBreathCPM * 0.4 / 60;
  }
  else if (effectName === "Evoker T31-2") {
    // 
    
    
    const livingFlamesPerEmpower = 3;
    const averageEssenceBursts = livingFlamesPerEmpower * 0.2;
    const livingFlameData = EVOKERSPELLDB["Living Flame"][0];
    const oneLivingFlame = (livingFlameData.coeff * player.getInt() * player.getStatMults(livingFlameData.secondaries))* 0.5;

    bonus_stats.hps = ((empowersCPM * averageEssenceBursts * essenceBurst) + (empowersCPM * oneLivingFlame * 3)) / 60 * healingBonus;

  }
  else if (effectName === "Evoker T31-4") {
    
    
    // We can consume our 4pc echoes in a number of ways but it'll chiefly be Living Flame and Emerald Blossom.
    const consumptionRatios = {"Living Flame": 1, "Emerald Blossom": 0} // TODO
    
    const livingFlameData = EVOKERSPELLDB["Living Flame"][0];
    const oneLivingFlame = (livingFlameData.coeff * player.getInt() * player.getStatMults(livingFlameData.secondaries) + player.getHealth() * 0.02)* 0.5;
    const oneEcho = oneLivingFlame * 0.7 * consumptionRatios["Living Flame"];



    const livingFlameCPM = 11 + (5 * 2) + empowersCPM * 3; // Leaping Flames gives us a ton of extra value here. We're also including 2pc
    
    const echoesGenerated = livingFlameCPM * 0.33;

    const averageEssenceBursts = echoesGenerated * 0.2 * consumptionRatios["Living Flame"];
    const essenceBurstHPS = averageEssenceBursts * essenceBurst;

    bonus_stats.hps = (essenceBurstHPS + oneEcho * echoesGenerated * healingBonus) / 60;

  }

  else if (effectName === "Evoker T30-2") {
    // Placeholder pulled from sheet. Replace very soon.
    const spiritbloomCPM = 2.4;
    const spiritbloomData = EVOKERSPELLDB["Spiritbloom"][0];
    const oneSpiritbloom = spiritbloomData.coeff * 4 * player.getInt() * player.getStatMults(spiritbloomData.secondaries) * 0.4 * 1.1 * healingBonus; // Lush Growth

    bonus_stats.hps = oneSpiritbloom * spiritbloomCPM / 60;

  }
  else if (effectName === "Evoker T30-4") {
    // Placeholder pulled from sheet. Replace very soon.
    const essenceBurstsGenerated = empowersCPM / 4 * 2; // Every 4 empowers we get two free essence bursts.
    bonus_stats.hps = essenceBurstsGenerated * essenceBurst / 60;

  }
  else if (effectName === "Evoker T29-2") {
    // This needs a much more comprehensive formula.
    const reversionPercent = contentType === "Raid" ? 0.3 : 0.2;
    const healingIncrease = 0.5;
    const uptime = 0.65;
    const extraOverheal = 0.9;
    bonus_stats.hps = reversionPercent * healingIncrease * uptime * player.getHPS() * extraOverheal;


  }
  else if (effectName === "Evoker T29-4") {
    // The Evoker 4pc increases our Living Flame damage by 50% per stack, and also makes it instant.
    // It procs frequently and we can rely on it being active for most of our Living Flame casts.
    // The damage advantage is obvious, but the healing is a little more difficult.

    // Number of Essence Burst procs per minute.
    // Some of these would just be regular Living Flame casts. These could be excluded.
    const livingFlameCPM = 4.5;
    const essenceBurstsPerMinute = livingFlameCPM * 0.2;

    const reversionTicks = 6 * 1.3 / (1 - (player.getStatPerc("crit") - 1))
    const oneReversion = 0.342 * reversionTicks * player.getStatMults(["intellect", "haste", "versatility", "crit", "mastery"]) * 1.15; // The extra healing from 2 additional WG targets a minute.
    const oneEcho = 1 * player.getStatMults(["intellect", "haste", "versatility", "crit", "mastery"])

    const essenceBurstHealing = oneEcho + oneReversion;
    bonus_stats.hps = essenceBurstHealing * essenceBurstsPerMinute / 60;

    // Extra Lifebind healing
    const lifebindAvgMult = (0.18 * 10 + 0.42 * 6) / 16;
    const livingFlameSize = 2.76 * 1.5 * player.getStatMults(["intellect", "versatility", "crit", "mastery"]);

    const lifebindHealing = lifebindAvgMult * livingFlameSize * 16 * 0.7; // 

    bonus_stats.hps = bonus_stats.hps + lifebindHealing / 60;

  }

  else {
    bonus_stats.hps = 0;
    bonus_stats.dps = 0;
  }

  return bonus_stats;
};
