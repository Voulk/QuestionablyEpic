
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

  if (effectName === "Monk S2-2") {
    bonus_stats.hps = 15000;
  }
  else if (effectName === "Monk S2-4") {
    bonus_stats.hps = 15000;
  }
  else if (effectName === "Monk S1-2") {
    // +10% EnV, ReM
    const percentEffected = 0.21; 
    bonus_stats.hps = percentEffected * 0.1 * player.getHPS();
  }
  else if (effectName === "Monk S1-4") {
    //const renewingMistTick = 0.19665 * player.getStatMults(["intellect", "haste", "versatility", "crit"]);
    //const envMistTick = 0.52 * player.getStatMults(["intellect", "haste", "versatility", "crit"]);
    //const percBuffed = 0.8;

    //const HPSExtension = (renewingMistTick / 2 * 3 * percBuffed) / 60; // 18 seconds of extra HoT uptime per Essence Font cast.
    
    bonus_stats.hps = player.getHPS() * 0.0405;
  }
  // Tier Sets
  else if (effectName === "Mistweaver T29-2") {
    const uptime = 0.55; // TODO: Auto-calc this.
    const spellsHit = 0.35;
    bonus_stats.hps = uptime * spellsHit * 0.1 * player.getHPS(contentType);

  }
  else if (effectName === "Mistweaver T29-4") {

    // TODO: Dancing Mist
    // Upwelling, Misty Peaks included.
    const percVivify = 0.09; // TODO: Auto-calc this.
    const percEssenceFont = 0.21; // TODO: Auto-calc this.
    const essenceFontCPM = 3;
    const faelineStompCPM = 1.5;
    const boltsPerMin = essenceFontCPM * (18 + 24 / 6) + faelineStompCPM * 5;
    const renewingMistTick = 0.19665 * player.getStatMults(["intellect", "haste", "versatility", "crit"]);
    const envMistTick = 0.43605 * player.getStatMults(["intellect", "haste", "versatility", "crit"]) * 1.3;
    const mistyPeaks = boltsPerMin * 0.1 * envMistTick; // Every tick has a 10% chance to proc 2s of Env Mists (1 tick);

    const HPSHealingIncrease = percEssenceFont + percVivify * 0.1 * player.getHPS(contentType);
    const HPSExtension = (renewingMistTick / 2 * boltsPerMin + mistyPeaks) / 60; // 18 seconds of extra HoT uptime per Essence Font cast.
    
    bonus_stats.hps = HPSHealingIncrease + HPSExtension;

  }
  else if (effectName === "Mistweaver T28-2") {
    // Mistweaver Monk Sepulcher tier set 2pc
    // -- This is a draft formula and it can be improved upon. --

    // NOTE: The extra hot duration afforded by the 2pc will be buffed by the 4pc. That should be included in the 4pc formula, NOT the 2pc formula. That way we can
    // avoid double dipping.
    const essenceFontCPM = player.getSpellCPM(191840, contentType) // EF Casts per minute.
    const extraHoT = 0.042 * 2 * 1.05 * player.getStatMultiplier("CRITVERS") * player.getStatPerc("Haste") * player.getInt();  
    const hotIncrease = 0.042 * 4 * 0.05 * player.getStatMultiplier("CRITVERS") * player.getStatPerc("Haste") * player.getInt();
    // Coefficient x num Ticks x 5% multi x avgHots per EF 
    // We automatically include the Rising Mist extension in the calculation
    const expectedOverhealing = 0.24;

    const oneRisingMist = 0.28 * player.getStatMultiplier("CRITVERS") * player.getInt() * 0.7; // 30% expected overhealing. Reasonably conservative.
    const risingMistDirect = oneRisingMist * essenceFontCPM * (1); // The additional healing from Rising Mist. We model this as 1 extra RM hit per Essence Font cast.
    const additionalGusts = 0; // The additional Gust of Mists afforded by the extra 2/4s of HoT uptime. This is of low value.    
    
    //bonus_stats.hps = (((hotIncrease + extraHoT) * essenceFontCPM * 14 * (1 - expectedOverhealing))+risingMistDirect+additionalGusts) / 60;
    bonus_stats.hps = 0;
  }
  else if (effectName === "Mistweaver T28-4") {
    // Mistweaver Monk Sepulcher tier set 2pc
    // -- This is a draft formula. --
    // We can also sequence this directly if necessary, but the numbers here are already heavily based around that model.
    const singleEvent = 450 * player.getStatMultiplier("CRITVERS"); // The amount of healing from a single 4pc proc.
    const avgEvents = 90 * player.getStatPerc("Haste"); // Average number of healing events in a 4pc window.
    const covMulti = {"night_fae": 1, "venthyr": 1, "necrolord": 1, "kyrian": 1}; // The average multiplier to the 4pc window for the chosen covenant. This is a combination of logs and spell sequencing. 

    //bonus_stats.hps = singleEvent * avgEvents * covMulti[player.getCovenant()] / 60
    bonus_stats.hps = 0;
  }

  else if (effectName === "Ancient Teachings of the Monastery") {
    const essenceFontCPM = player.getSpellCPM(ID_ESSENCE_FONT, contentType);
    const dpsDuringDuration = 1450; // this is a 75% parse
    const multiplier = 2.5;
    const buffUptime = Math.min(1, (12 * essenceFontCPM) / 60); // While the buff lasts 15s, the Essence Font channel lasts 3.
    const expectedOverhealing = 0.3;
    
    bonus_stats.hps = buffUptime * multiplier * dpsDuringDuration * (1 - expectedOverhealing);
  } 
else {
    bonus_stats.hps = -1;
  }

  return bonus_stats;
};
