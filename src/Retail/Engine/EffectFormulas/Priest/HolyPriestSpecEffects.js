import { HOLYPRIESTSPELLDB } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellDB";


export const getHolyPriestSpecEffect = (effectName, player, contentType) => {
  let result = 0.0;
  let bonus_stats = {};



  if (effectName === "HPriest S2-2") {
    const insuranceRPPM = 4 * player.getStatPerc('haste');
    const expectedOverheal = 0.2;
    const insuranceHealing = 2.04736 * 5 * player.getStatMults(['haste', 'crit', 'versatility', 'intellect']) * (1 - expectedOverheal)
    bonus_stats.hps = insuranceHealing * insuranceRPPM / 60;

  }
  else if (effectName === "HPriest S2-4") {
    // TODO
    const apothUptime = 0.4;

    bonus_stats.hps = player.getHPS() * 0.0842;
  }

  else if (effectName === "HPriest S1-2") {

    bonus_stats.hps = player.getHPS() * 0.0265;

  }
  else if (effectName === "HPriest S1-4") {
    bonus_stats.hps = player.getHPS() * 0.0442;
  }
  else if (effectName === "HPriest T31-2") {
    // Placeholder pulled from sheet. Replace very soon.
    const renewData = HOLYPRIESTSPELLDB["Renew"][0];
    const renewHPS = 0;
    const serenityCPM = 0;
    const sancCPM = 0;
    
    const serenityHPS = serenityCPM * renewHPS * 14;
    const sancHPS = sancCPM * renewHPS * 4 * 5; // Refactor to use Sanc target count instead of a magic number. 

    bonus_stats.hps = 15000;
  }
  else if (effectName === "HPriest T31-4") {
    // Placeholder from sheet. Replace very soon.

    const effectivePPM = 3.2;
    const sancData = HOLYPRIESTSPELLDB["Holy Word: Sanctify"][0];
    const oneSanc = sancData.coeff * player.getInt() * player.getStatMults(sancData.secondaries);
    
    const oneSalv = 0;
    const effectiveSalvCD = 0;

    //bonus_stats.hps = oneSanc * effectivePPM;
    bonus_stats.hps = 17600;
  }

  else if (effectName === "HPriest T30-2") {
    // Placeholder pulled from sheet. Replace very soon.
    bonus_stats.hps = 6750;
  }
  else if (effectName === "HPriest T30-4") {
    // Placeholder from sheet. Replace very soon.
    bonus_stats.hps = 8750;
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
  // Tier Sets
  else if (effectName === "HPriest T28-2") {
    // The Holy Priest 2pc averages to about ~160-180% more Serenity casts over a fight if procs are used primarily on Heal.
    // Using procs on Salv itself through Sanc can often be an even stronger choice, however the calculation becomes increasingly fuzzy.
    // It should be added to be comprehensive, but modelling it through Heal alone will still provide a sufficiently high value.

    // In reality there is also likely to be some wastage - procs used on Smites, serenity & sanc casts held for damage (or held incorrectly).
    // There might also be some Chastise casts for additional procs but this is rarely taken advantage of.
    const serenityBaseCPM = 1;
    const serenityAdjCPM = 2.8;

    //bonus_stats.hps = getSpellHealing('serenity', player, contentType) * (serenityAdjCPM - serenityBaseCPM) / 60;
    bonus_stats.hps = 0; // Old tier sets are disabled.
    
  }
  else if (effectName === "HPriest T28-4") {
    // Following on from the 2pc, we can expect ~3.8-4.2 DC procs per minute in most cases. More with good play, less if you're sitting on Holy words a lot.
    // We're going to use these on Heal too to be consistent though Sanc is more HPS when you have enough damaged allies nearby.
    const convPPM = 3.8;
    const convPercentage = 0.6; // The buffed spell is 60% stronger.

    //bonus_stats.hps = getSpellHealing('heal', player, contentType) * convPPM * convPercentage / 60;
    bonus_stats.hps = 0;
  }
  else if (effectName === "Flash Concentration") {
    // Flash Concentration is a significant change to our playstyle. The formula below doesn't even begin to capture how and why it is so strong. 
    // QE Live will have stronger tech to handle legendaries like this as we approach Dragonflight, similar to the tech that other specs already have access to.

    const healCPM = 12.1;
    const healCost = 1200;
    const healFiller = healCost * healCPM;
    const poHFiller = (healFiller / 2500) * getSpellHealing('prayerOfHealing', player, contentType)

    bonus_stats.hps = 0; //(healCPM * getSpellHealing('heal', player, contentType) - poHFiller) / 60; // TODO: 

  }
  else if (effectName === "Shadow Word: Manipulation") {
    // Shadow Word: Manipulation is often used to pump up our major cooldowns. In this case though we will treat it as bonus crit alone. This legendary would be included
    // in a Holy Priest spec revamp so that we could better analyze it. 
    const expectedCrit = 35;
    const duration = 10;

    bonus_stats.crit = expectedCrit * 35 * duration / 45; // This is still an advanced placeholder.
  }
  else if (effectName === "Bwonsamdi's Pact") {
    // Assumptions:
    // - Mask is always used on mana Faeries (though sometimes a better play is to use it on cooldown reduction to hit better hymn timings).
    // - Faeries proc roughly on cooldown.
    const faerieProcs = 20 / 0.75;
    const manaPerProc = 0.5 / 100 * 50000;

    bonus_stats.mana = faerieProcs * manaPerProc / 90; // 
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