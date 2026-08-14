
export const getHolyPriestSpecEffect = (effectName, player, contentType) => {
  let bonus_stats = {};
  const tierEfficiency = 0.8;

  if (effectName === "Holy Priest S3-2") {

  }
  else if (effectName === "Holy Priest S3-4") {


  }
  else if (effectName === "Holy Priest S2-2") {
    bonus_stats.bonusHPS = 0.02;

  }
  else if (effectName === "Holy Priest S2-4") {
    // TODO

     bonus_stats.bonusHPS = 0.06;
  }

  else if (effectName === "Holy Priest S1-2") {

     bonus_stats.bonusHPS = 0.02;

  }
  else if (effectName === "Holy Priest S1-4") {
    bonus_stats.bonusHPS = 0.0302;
  }
  else if (effectName === "Holy Priest T31-2") { 

    bonus_stats.bonusHPS = 0.02;
  }

  /*
    Vastly improved Holy Priest formulas coming soon.
  */
  else if (effectName === "HPriest T29-2") {
    const pomCPM = player.getSpellCPM(33076, contentType) || 1;
    const healCPM = player.getSpellCPM(2060, contentType) || 1;

    const pohCPM = player.getSpellCPM(596, contentType) || 1;

    const seren = player.getSpellHPS(2050, player, contentType);
    const serenIncrease = 2 / 60 * Math.min(pomCPM, healCPM);

    const sanc = player.getSpellHPS(34861, player, contentType);
    const sancIncrease = 2 / 60 * Math.min(pomCPM, pohCPM);

    bonus_stats.hps = Math.max(serenIncrease * seren, sancIncrease * sanc) ;

  }
  else if (effectName === "HPriest T29-4") {
    const expectedUptime = 0.424;
    const effectValue = 10;

    bonus_stats.crit = expectedUptime * effectValue  * 180;
  }

  return bonus_stats;
};

const getSpellHealing = (spellName, player, contentType) => {
  const spellCoeff = {heal: 2.95, serenity: 7, sanc: 0, prayerOfHealing: 0.875 * 5 * 0.8}


  let spellHealing = spellCoeff[spellName] * player.getStatMultiplier("NOHASTE") * 1.16 * 0.85; 
  // 1.16 is the current Holy Priest aura buff. 0.85 represents what is usually quite low overhealing though keep in mind our heals include a mastery portion
  // which overheals much more frequently.

  if (spellName === "heal") {
    // Add Trail of Light & other Heal specific stuff.
    spellHealing *= 1.15 // Flash Concentration
    spellHealing *= 1.35 // Trail of Light
  }
  return spellHealing;


}