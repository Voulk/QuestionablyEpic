import { convertPPMToUptime, getScalarValue } from "../EffectUtilities";
import { trinket_data, TAGS } from "./TrinketData";
import { STAT } from "../../../../General/Engine/STAT";
import SPEC from "../../../../General/Engine/SPECS";

// TODO: Write proper comments. See Lingering Sunmote for an example.
export function getTrinketEffect(effectName, player, contentType, itemLevel, userSettings = {}) {
  let bonus_stats = {};

  /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
  let activeTrinket = trinket_data.find((trinket) => trinket.name === effectName);

  if (activeTrinket === undefined) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Error Handling                                         */
    /* ---------------------------------------------------------------------------------------------- */
    debug && console.log("no trinket found");
    return bonus_stats;
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Lingering Sunmote                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Lingering Sunmote"
  ) {
    /*
    Trinket Effect: Creates a patch of light at target location for 12s. Allies within it split an absorb for X every 4 seconds.
    Absorbtion is increased by 15% per ally in the light, up to 60%.

    Notes:
    We don't multiply our healing by number of targets because the heal is split among them.
    The meteor effect is accounted for in the meteor_multiplier variable.

    Assumption:
    No unique assumptions. Efficiency combines wasted shield and people running out of it.
    */
    let effect = activeTrinket.effects[0];
    let meteor_multiplier = 1 + effect.targets[contentType] * effect.meteor;

    bonus_stats.hps = ((getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * effect.ticks * meteor_multiplier) / effect.cooldown) * player.getStatPerc("Vers");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Manabound Mirror                                        */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Manabound Mirror"
  ) {
    /*
    We can make this more accurate by writing a function to calculate expected_mana_spend based on the players log.
    */
    let mana_heal_effect = activeTrinket.effects[0];
    let base_heal_effect = activeTrinket.effects[1];
    let expected_mana_spend = player.getSpec() === "Holy Paladin" ? 15500 : 18000; // Per minute.
    let base_heal = getProcessedValue(base_heal_effect.coefficient, base_heal_effect.table, itemLevel);
    let mana_heal = getProcessedValue(mana_heal_effect.coefficient, mana_heal_effect.table, itemLevel) * (expected_mana_spend / 3240);

    bonus_stats.hps = (((base_heal + mana_heal) * base_heal_effect.efficiency) / base_heal_effect.cooldown) * player.getStatMultiplier("CRITVERS");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Darkmoon Deck: Repose                                     */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Darkmoon Deck: Repose"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType]) / effect.cooldown) * player.getStatMultiplier("CRITVERS");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Sunblood Amethyst                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Sunblood Amethyst"
  ) {
    let dam_effect = activeTrinket.effects[0];
    let int_effect = activeTrinket.effects[1];

    bonus_stats.dps = (getProcessedValue(dam_effect.coefficient, dam_effect.table, itemLevel) / dam_effect.cooldown) * player.getStatMultiplier("CRITVERS");
    bonus_stats.intellect = (getProcessedValue(int_effect.coefficient, int_effect.table, itemLevel, int_effect.efficiency) * int_effect.duration) / int_effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Unbound Changeling                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Unbound Changeling"
  ) {
    /*
    Unbound Changeling is a challenge because it comes in four different flavors.
    Given the player can "force" change their Changeling to their preferred secondary stat, this formula will for now take a "best case scenario" approach and ignore
    the rare possibility of a Tri-proc (which is only ~10% more stats anyway). When an advanced settings menu is added we can revisit this and maybe add some detail.
    */
    let effect = activeTrinket.effects[0];
    let playerBestSecondary = player.getHighestStatWeight(contentType, ["versatility"]); // Exclude Vers since there isn't a Vers version.

    bonus_stats[playerBestSecondary] = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Cabalist's Hymnal                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Cabalist's Hymnal"
  ) {
    // Test
    let effect = activeTrinket.effects[0];
    const multiplier = 1 + effect.multiplier * (userSettings.hymnalAllies || 0);

    bonus_stats.crit = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration * effect.stacks * multiplier) / 60;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Macabre Sheet Music                                      */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Macabre Sheet Music"
  ) {
    // Test
    let effect = activeTrinket.effects[0];

    bonus_stats.haste = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration * effect.stacks) / effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Siphoning Phylactery Shard                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Siphoning Phylactery Shard"
  ) {
    // Test
    let effect = activeTrinket.effects[0];

    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / effect.cooldown) * player.getStatMultiplier("CRITVERS");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Overflowing Anima Cage                                     */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Overflowing Anima Cage"
  ) {
    let effect = activeTrinket.effects[0];
    const groupMultiplier = userSettings.includeGroupBenefits ? effect.targets[contentType] : 1;

    bonus_stats.crit = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * groupMultiplier * effect.duration) / effect.cooldown;
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Vial of Spectral Essence                                    */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Vial of Spectral Essence"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / effect.cooldown) * player.getStatPerc("Versatility");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Soulletting Ruby                                        */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Soulletting Ruby"
  ) {
    let heal_effect = activeTrinket.effects[1];
    let crit_effect = activeTrinket.effects[0];

    bonus_stats.hps = (getProcessedValue(heal_effect.coefficient, heal_effect.table, itemLevel, heal_effect.efficiency) / heal_effect.cooldown) * player.getStatMultiplier("CRITVERS");
    bonus_stats.crit = (getProcessedValue(crit_effect.coefficient, crit_effect.table, itemLevel, crit_effect.efficiency) * crit_effect.duration * crit_effect.multiplier) / crit_effect.cooldown;
    bonus_stats.crit *= player.getCooldownMult("twoMinutes", contentType);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Wakener's Frond                                        */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Wakener's Frond"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.haste = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Soulsifter Root                                        */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Soulsifter Root"
  ) {
    let effect = activeTrinket.effects[0];

    /* ------- Hastes impact on the trinket PPM is included in the secondary multiplier below. ------ */
    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / 60) * effect.ppm * player.getStatMultiplier("NOMAST");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Boon of the Archon                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Boon of the Archon"
  ) {
    let heal_effect = activeTrinket.effects[1];
    let vers_effect = activeTrinket.effects[0];
    const groupMultiplier = userSettings.includeGroupBenefits ? vers_effect.targets : 1;

    bonus_stats.hps = (getProcessedValue(heal_effect.coefficient, heal_effect.table, itemLevel, heal_effect.efficiency) * heal_effect.ppm * 4 * player.getStatMultiplier("CRITVERS")) / 60;
    bonus_stats.versatility =
      Math.round(getProcessedValue(vers_effect.coefficient, vers_effect.table, itemLevel)) *
      vers_effect.efficiency *
      groupMultiplier *
      convertPPMToUptime(vers_effect.ppm * player.getStatPerc("Haste"), vers_effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Spiritual Alchemy Stone                                    */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Spiritual Alchemy Stone"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    /* -------------------------------------- Mana Potion Bonus ------------------------------------- */
    /*
    Eventually we'll include mana in bonus_stats and calculate it at the end. Until then, we'll auto-convert to HPS.
    */

    /* ------------------------------------- Health Potion Bonus ------------------------------------ */
    bonus_stats.hps = ((10000 * 0.4) / player.getFightLength(contentType)) * 0.9; // 0.9 represents overhealing. We'll capture this better later.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                             Sinful Gladiator's Insignia of Alacrity                            */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Sinful Gladiator's Insignia of Alacrity"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                              Sinful Gladiator's Badge of Ferocity                              */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Sinful Gladiator's Badge of Ferocity"
  ) {
    // Test
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;

    /* ------------------- This is horribly messy and will be replaced very soon. ------------------- */
    // TODO: replace
    if (player.getSpec() === "Mistweaver Monk" && player.getCovenant() === "necrolord") bonus_stats.intellect *= player.getCooldownMult("oneMinute", contentType);
    else if (player.getSpec() === "Holy Paladin" && player.getCovenant() === "kyrian") bonus_stats.intellect *= player.getCooldownMult("oneMinute", contentType);
    else if (player.getSpec() === "Holy Paladin" && player.getCovenant() !== "kyrian") bonus_stats.intellect *= player.getCooldownMult("oneMinute", contentType) - 0.34;
    else if (player.getSpec() !== "Mistweaver Monk") bonus_stats.intellect *= player.getCooldownMult("oneMinute", contentType);

    //if (player.getSpec() === SPEC.HOLYPALADIN) bonus_stats.intellect *= 1.42; // This needs to be refined, but represents the power increase from combining with Divine Toll.
    //if (player.getSpec() === SPEC.DISCPRIEST) bonus_stats.intellect *= 1.68; // This needs to be refined, but represents the power increase from combining with Spirit Shell.
    // We need a better way to model interaction with spec cooldowns.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Empyreal Ordnance                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Empyreal Ordnance"
  ) {
    // Test
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.stacks * effect.duration) / effect.cooldown;
    bonus_stats.intellect *= player.getCooldownMult("threeMinutes", contentType);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Inscrutable Quantum Device                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Inscrutable Quantum Device"
  ) {
    let effect = activeTrinket.effects[0];
    let playerBestSecondary = player.getHighestStatWeight(contentType, ["versatility"]); // Exclude Vers since there isn't a Vers version.

    bonus_stats[playerBestSecondary] = ((getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown) * 0.87;
    // TODO: power reduced by 5% because of the chance something interferes. This needs to be much much better and I'll fix it up this week.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Flame of Battle                                        */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Flame of Battle"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.versatility = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Misfiring Centurion Controller                                 */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Misfiring Centurion Controller"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Book-Borrower Identification                                  */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Book-Borrower Identification"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.mastery = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Glimmerdust's Grand Design                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Glimmerdust's Grand Design"
  ) {
    // Test
    let hotEffect = activeTrinket.effects[0];
    let absorbEffect = activeTrinket.effects[1];
    let hotHPS =
      (getProcessedValue(hotEffect.coefficient, hotEffect.table, itemLevel, hotEffect.efficiency) * (hotEffect.totalTicks * player.getStatPerc("Haste")) * player.getStatMultiplier("CRITVERS")) / 120;
    let absorbHPS = (getProcessedValue(absorbEffect.coefficient, absorbEffect.table, itemLevel, absorbEffect.efficiency) * player.getStatPerc("Versatility")) / 120;

    bonus_stats.hps = hotHPS + absorbHPS;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Instructor's Divine Bell                                    */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Instructor's Divine Bell"
  ) {
    // Test
    let effect = activeTrinket.effects[0];

    bonus_stats.mastery = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;

    if (player.getSpec() === SPEC.RESTODRUID) bonus_stats.mastery *= 1.2; // Bell is combined with Flourish.
    // We need a better way to model interaction with spec cooldowns.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Consumptive Infusion                                      */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Consumptive Infusion"
  ) {
    let effect = activeTrinket.effects[0];
    let expectedThroughput = effect.expectedTargetThroughput;
    let leechPerOnePercent = 21;
    let uptime = effect.duration / effect.cooldown;
    let leechPercentage = getProcessedValue(effect.coefficient, effect.table, itemLevel) / leechPerOnePercent / 100;

    bonus_stats.hps = leechPercentage * expectedThroughput * effect.efficiency[player.getSpec()] * uptime;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Tuft of Smoldering Plumage                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Tuft of Smoldering Plumage"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType]) / effect.cooldown) * player.getStatMultiplier("CRITVERS");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Show of Faith                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Show of Faith"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.mana = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.ppm) / 60;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Spark of Hope                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Spark of Hope"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.mana = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getSpecialQuery("CastsPerMinute", contentType)) / 60;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Elemental Focus Stone                                     */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Elemental Focus Stone"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.haste = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm[player.getSpec()], effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Flare of the Heavens                                      */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Flare of the Heavens"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm[player.getSpec()], effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Pandora's Plea                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Pandora's Plea"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Sif's Remembrance                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Sif's Remembrance"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Eye of the Broodmother                                     */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Eye of the Broodmother"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.stacks;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Energy Siphon                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Energy Siphon"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.crit = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Living Flame                                          */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Living Flame"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Scale of Fates                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Scale of Fates"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.haste = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    //
  }

  /* ------------------------------------- Firelands Trinkets ------------------------------------- */
  //prettier-ignore
  else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Eye of Blazing Power                                      */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Eye of Blazing Power"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / 60) * effect.ppm * player.getStatMultiplier("CRITVERS");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Jaws of Defeat                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Jaws of Defeat"
  ) {
    let effect = activeTrinket.effects[0];
    let manaPerStack = effect.coefficient;
    let playerHaste = player.getStatPerc("Haste");
    let castsInDuration = effect.efficiency * (20 / (1.5 / playerHaste));
    let manaSaved = manaPerStack * 5 * 10 + (castsInDuration - 10) * manaPerStack * 10;

    bonus_stats.mana = manaSaved / effect.cooldown;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Necromantic Focus                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Necromantic Focus"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.mastery = effect.coefficient * effect.stacks[player.getSpec()];
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Memento of Tyrande                                       */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Memento of Tyrande"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.mana = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.ppm * player.getStatPerc("Haste")) / 60;
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      The Skull of Gul'dan                                      */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "The Skull of Gul'dan"
  ) {
    const effect = activeTrinket.effects[0];

    bonus_stats.haste = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    if (player.getSpec() === "Holy Paladin") {
      bonus_stats.haste *= player.getCooldownMult("twoMinutes", contentType);
    }
    //
  } else {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        No Trinkets Found                                       */
    /* ---------------------------------------------------------------------------------------------- */
    debug && console.log("No Trinket Found");
  }

  return bonus_stats;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                        Testing Functions                                       */
/* ---------------------------------------------------------------------------------------------- */

export function testTrinkets(player, contentType, itemLevel = 226) {
  let trinketList = trinket_data;

  trinketList.forEach((trinket) => {
    if (trinket.name === "Darkmoon Deck: Repose") {
      console.log(trinket.name + " (i200): " + getEstimatedHPS(getTrinketEffect(trinket.name, player, contentType, 200), player, contentType));
    } else {
      //console.log(trinket.name + ": " + getEstimatedHPS(getTrinketEffect(trinket.name, player, contentType, itemLevel), player, contentType));
      let trinketEffect = getTrinketEffect(trinket.name, player, contentType, itemLevel);
      console.log(trinket.name + ": " + JSON.stringify(trinketEffect) + ". Est HPS: " + getEstimatedHPS(trinketEffect, player, contentType));
    }
  });
}

/* ------------ Converts a bonus_stats dictionary to a singular estimated HPS number. ----------- */
// TODO: Remove this. It's just for testing.
function getEstimatedHPS(bonus_stats, player, contentType) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "mastery", "crit", "versatility"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "hps") {
      estHPS += value;
    }
  }

  return Math.round(estHPS);
}

export function getProcessedValue(coefficient, table, itemLevel, efficiency = 1) {
  return Math.round(coefficient * getScalarValue(table, itemLevel) * efficiency);
}
