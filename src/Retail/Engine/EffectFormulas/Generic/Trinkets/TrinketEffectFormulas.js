import { convertPPMToUptime, processedValue, getProcessedValue, getDiminishedValue, getHighestStat } from "../../EffectUtilities";
import { trinket_data } from "../ShadowlandsTrinketData";
import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import { timewalkingTrinketData } from "./TimewalkingTrinketData";
import { useSelector } from "react-redux";
import { getAdjustedHolyShock } from "../../Paladin/PaladinMiscFormulas"
import { getMasteryAddition } from "../../Monk/MistweaverMiscFormulas"
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { allRampsHealing } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampUtilities";
import { buildRamp } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampGen";

// import { STAT } from "../../../../General/Engine/STAT";
import SPEC from "../../../../../General/Engine/SPECS";



// Returns the value of a trinket effect while active. This is different to its average value which is typically what we'll use.
export function getTrinketValue(trinketName, itemLevel) {
  const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData, timewalkingTrinketData)
  let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

  const effect = activeTrinket.effects[0];
  const trinketValue = processedValue(effect, itemLevel);
  return trinketValue;
}

export function getTrinketParam(trinketName, parameter) {
  const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData, timewalkingTrinketData)
  let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

  const effect = activeTrinket.effects[0];
  if (parameter in effect) return effect[parameter];
  else return 0;
}


// Return the effect of running a trinkets runFunc function. This will return a bonus_stats object if the trinket exists and an empty one if it does not.
export function getTrinketEffect(effectName, itemLevel, additionalData) {
  let bonus_stats = {};
  
  //let additionalData = {contentType: contentType, settings: playerSettings, setStats: setStats, castModel: castModel, player: player, setVariables: setVariables};

  /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
  const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData, timewalkingTrinketData)
  let activeTrinket = trinketData.find((trinket) => trinket.name === effectName);


  if (activeTrinket !== undefined) {
    return activeTrinket.runFunc(activeTrinket.effects, additionalData.player, itemLevel, additionalData);
  }
  else {
    return {};
  }

  if (activeTrinket === undefined) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Error Handling                                         */
    /* ---------------------------------------------------------------------------------------------- */
    //console.log("no trinket found");
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

    bonus_stats.hps = (((base_heal + mana_heal) * base_heal_effect.efficiency[contentType]) / base_heal_effect.cooldown) * player.getStatMultiplier("CRITVERS");
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
    const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
    const trinketValue = getDiminishedValue(playerBestSecondary, trinketRaw, setStats[playerBestSecondary])
    bonus_stats[playerBestSecondary] = trinketValue * convertPPMToUptime(effect.ppm, effect.duration);
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
    const critValue = getProcessedValue(crit_effect.coefficient, crit_effect.table, itemLevel, crit_effect.efficiency) * crit_effect.multiplier;
    bonus_stats.hps = (getProcessedValue(heal_effect.coefficient, heal_effect.table, itemLevel, heal_effect.efficiency) / heal_effect.cooldown) * player.getStatMultiplier("CRITVERS");
    
    if (player.getSpec() === "Discipline Priest" && contentType === "Raid") {
      // 
      const boonSeq = buildRamp('Boon', 10, ["Soulletting Ruby"], setStats.haste, castModel.modelName, ['Rapture']);
      const fiendSeq = buildRamp('Fiend', 10, [], setStats.haste, castModel.modelName, ['Rapture']);
      const rubyRamps = allRampsHealing(boonSeq, fiendSeq, setStats, {"playstyle": castModel.modelName, "DefaultLoadout": true, "Soulletting Ruby": critValue}, {});
      
      bonus_stats.hps = bonus_stats.hps + (rubyRamps - player.getRampID('baselineAdj', contentType)) / 180 * (1 - crit_effect.discOverhealing);

    }
    else {
      const trinketRaw = getProcessedValue(crit_effect.coefficient, crit_effect.table, itemLevel, crit_effect.efficiency) * crit_effect.multiplier
      const trinketValue = getDiminishedValue('Crit', trinketRaw, setStats.crit)

      bonus_stats.crit = (trinketValue * crit_effect.duration) / 120;
      bonus_stats.crit *= castModel.getSpecialQuery("twoMinutes", "cooldownMult");
    }
    
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
    const manaPotionReturn = 10000 * .4; // sit down potion is 10k. Alch stone gives 40% of that
    const potionsUsed = Math.ceil(player.getFightLength(contentType) / 360); // One potion every 6 minutes
    bonus_stats.hps = manaPotionReturn * potionsUsed * player.getSpecialQuery("OneManaHealing", contentType) / player.getFightLength(contentType) * 0.8;

    /* ------------------------------------- Health Potion Bonus ------------------------------------ */
    bonus_stats.hps += ((10000 * 0.4) / player.getFightLength(contentType)) * 0.9; // 0.9 represents overhealing. We'll capture this better later.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                             Sinful Gladiator's Insignia of Alacrity                            */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Gladiator's Insignia of Alacrity"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                              Sinful Gladiator's Badge of Ferocity                              */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Gladiator's Badge of Ferocity"
  ) {
    // Test
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    bonus_stats.intellect *= castModel.getSpecialQuery("oneMinute", "cooldownMult");
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
    bonus_stats.intellect *= castModel.getSpecialQuery("threeMinutes", "cooldownMult");
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Inscrutable Quantum Device                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Inscrutable Quantum Device"
  ) {
    const effect = activeTrinket.effects[0];

    const playerBestSecondary = player.getHighestStatWeight(contentType, ["versatility"]); // Exclude Vers since there isn't a Vers version.
    const failureChance = (contentType === "Raid" ? 0.26 : 0.12);

    const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
    const trinketValue = getDiminishedValue(playerBestSecondary, trinketRaw, setStats[playerBestSecondary])

    bonus_stats[playerBestSecondary] = ((trinketValue * effect.duration) / effect.cooldown) * (1 - failureChance);
    bonus_stats[playerBestSecondary] *= castModel.getSpecialQuery("threeMinutes", "cooldownMult");
    // TODO: power reduced because of the chance something interferes. This needs to be much much better and I'll fix it up this week.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Flame of Battle                                        */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Flame of Battle"
  ) {
    let effect = activeTrinket.effects[0];
    const trinketValue = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    if (player.getSpec() === "Discipline Priest" && contentType === "Raid") {
      const boonSeq = buildRamp('Boon', 10, ["Flame of Battle"], setStats.haste, castModel.modelName, ['Rapture']);
      const fiendSeq = buildRamp('Fiend', 10, ["Flame of Battle"], setStats.haste, castModel.modelName, ['Rapture']);
      const flameRamps = allRampsHealing(boonSeq, fiendSeq, setStats, {"playstyle": castModel.modelName, "DefaultLoadout": true, "Flame of Battle": trinketValue}, {});

      bonus_stats.hps = (flameRamps - player.getRampID('baselineAdj', contentType)) / 180 * (1 - effect.discOverhealing);
    }
    else {
      bonus_stats.versatility = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration) / effect.cooldown;
    }

    
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
    /*                                 Gemstone of Prismatic Brilliance                                 */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Gemstone of Prismatic Brilliance"
  ) {
    let effect = activeTrinket.effects[0];

    const totalBonusStat = getProcessedValue(effect.coefficient, effect.table, 265) * effect.duration * effect.ppm / 60;
    // Proc munching is a rarity here since procs can both be up at once. For that reason we'll instead use a more standard duration x ppm / 60 formula.
    // TODO: Apply DR to each proc.

    bonus_stats.haste = totalBonusStat / 4;
    bonus_stats.crit = totalBonusStat / 4;
    bonus_stats.mastery = totalBonusStat / 4;
    bonus_stats.versatility = totalBonusStat / 4;
    //
  } 
  else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Scars of Fraternal Strife                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Scars of Fraternal Strife"
  ) {
    let effect = activeTrinket.effects[0];

    const runeStats = getProcessedValue(effect.coefficient, effect.table, itemLevel);

    bonus_stats.haste = runeStats;
    bonus_stats.crit = runeStats;
    bonus_stats.versatility = runeStats;
    //bonus_stats.mastery = runeStats; // Fourth Rune.
    //
  } 
  else if (
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
    const effect = activeTrinket.effects[0];
    const trinketValue = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    if (player.getSpec() === "Discipline Priest" && contentType === "Raid") {
      const boonSeq = buildRamp('Boon', 10, ["Instructor's Divine Bell"], setStats.haste, castModel.modelName, ['Rapture']);
      const fiendSeq = buildRamp('Fiend', 10, ["Instructor's Divine Bell"], setStats.haste, castModel.modelName, ['Rapture']);
      const bellRamps = allRampsHealing(boonSeq, fiendSeq, setStats, {"playstyle": castModel.modelName, "DefaultLoadout": true, "Instructor's Divine Bell": trinketValue}, {});
      bonus_stats.hps = (bellRamps - player.getRampID('baselineAdj', contentType)) / 180 * (1 - effect.discOverhealing);
    }
    else {
      bonus_stats.mastery = (trinketValue * effect.duration) / effect.cooldown;
      bonus_stats.mastery *= castModel.getSpecialQuery("ninetySeconds", "cooldownMult");
    } 
    



    // We need a better way to model interaction with spec cooldowns.
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Instructor's Divine Bell                                    */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Instructor's Divine Bell (new)"
    
  ) {
    const effect = activeTrinket.effects[0];
    const trinketValue = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    if (player.getSpec() === "Discipline Priest" && contentType === "Raid") {
      const boonSeq = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], setStats.haste, castModel.modelName, ['Rapture']);
      const fiendSeq = buildRamp('Fiend', 10, ["Instructor's Divine Bell (new)"], setStats.haste, castModel.modelName, ['Rapture']);
      const bellRamps = allRampsHealing(boonSeq, fiendSeq, setStats, {"playstyle": castModel.modelName, "DefaultLoadout": true, "Instructor's Divine Bell (new)": trinketValue}, {});
      bonus_stats.hps = (bellRamps - player.getRampID('baselineAdj', contentType)) / 180 * (1 - effect.discOverhealing);

    }
    else {
      bonus_stats.mastery = (trinketValue * effect.duration) / effect.cooldown;
      bonus_stats.mastery *= castModel.getSpecialQuery("ninetySeconds", "cooldownMult");
    }
  
  
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
  else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Show of Faith                                         */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Price of Progress"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.mana = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.ppm) / 60;
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
      bonus_stats.haste *= castModel.getSpecialQuery("twoMinutes", "cooldownMult");
    }
    //
  }else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Soul Cage Fragment                                      */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Soul Cage Fragment"
  ) {
    let effect = activeTrinket.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    //
  }
  else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Titanic Ocular Gland                                    */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Titanic Ocular Gland"
  ) {
    // Titanic Ocular Gland increases your highest secondary by X. 
    let effect = activeTrinket.effects[0];

    const itemSetHighestSecondary = getHighestStat(setStats);
    const statRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    const statValue = getDiminishedValue(itemSetHighestSecondary, statRaw, setStats[itemSetHighestSecondary])
    const uptime = effect.uptime;
    bonus_stats[itemSetHighestSecondary] = statValue * uptime - statRaw * (1 - uptime);
    //
  }   
  else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   So'leah's Secret Technique                                   */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "So'leah's Secret Technique"
  ) {
    let effect = activeTrinket.effects[0];
    const allyEffect = activeTrinket.effects[1];

    const playerBestSecondary = player.getHighestStatWeight(contentType);
    const statRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    const statValue = getDiminishedValue(playerBestSecondary, statRaw, setStats[playerBestSecondary])


    bonus_stats[playerBestSecondary] = statValue //+ getProcessedValue(allyEffect.coefficient, allyEffect.table, itemLevel);
    //
  } else if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Carved Ivory Keepsake                                     */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Carved Ivory Keepsake"
  ) {
    let effect = activeTrinket.effects[0];

    /* ------- Hastes impact on the trinket PPM is included in the secondary multiplier below. ------ */
    bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / 60) * effect.ppm * player.getStatMultiplier("NOMAST");
    //
  }
 else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Resonant Silver Bell                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Resonant Silver Bell"
) {
  let effect = activeTrinket.effects[0];

  bonus_stats.hps = (getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) / 60) * effect.ppm * player.getStatMultiplier("CRITVERS");
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Shadowed Orb of Torment                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Shadowed Orb of Torment"
) {
  const effect = activeTrinket.effects[0];
  const trinketValue = getProcessedValue(effect.coefficient, effect.table, itemLevel);

  if (player.getSpec() === "Mistweaver Monk") {
    // Average mastery value is a poor approximation for Mistweaver who are likely to combine the trinket with a higher than normal stream of mastery events.
    const mastery = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    const gusts = (contentType === "Raid") ? 41 : 22;
    bonus_stats.hps = getMasteryAddition(player.getInt(), mastery, player.getStatPerc("Crit"), player.getStatPerc("Vers")) * gusts / effect.cooldown;
  }
  else if (player.getSpec() === "Discipline Priest" && contentType === "Raid") {
    const boonSeq = buildRamp('Boon', 10, ["Shadowed Orb of Torment"], setStats.haste, castModel.modelName, ['Rapture']);
    const fiendSeq = buildRamp('Fiend', 10, [], setStats.haste, castModel.modelName, ['Rapture']);
    const orbRamps = allRampsHealing(boonSeq, fiendSeq, setStats, {"playstyle": castModel.modelName, "DefaultLoadout": true, "Shadowed Orb": trinketValue}, {});

    bonus_stats.hps = (orbRamps - player.getRampID('baselineAdj', contentType)) / 180 * (1 - effect.discOverhealing);
  }
  else {
    const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
    const trinketValue = getDiminishedValue('Mastery', trinketRaw, setStats.mastery)

    const expectedEfficiency = 0.89; // Shadowed Orb is easy to mess up, but full value should be guaranteed in most cases.
    bonus_stats.mastery = (trinketValue * effect.duration) / effect.cooldown * expectedEfficiency;
    bonus_stats.mastery *= castModel.getSpecialQuery("twoMinutesOrb", "cooldownMult");;
  }


}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                            First Class Healing Distributor                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "First Class Healing Distributor"
) {
  const healEffect = activeTrinket.effects[0];
  const hasteEffect = activeTrinket.effects[1];
  const meteor = 1 + healEffect.targets[contentType] * healEffect.meteor;

  const hasteRaw = getProcessedValue(hasteEffect.coefficient, hasteEffect.table, itemLevel)
  const hasteValue = getDiminishedValue('Haste', hasteRaw, setStats.haste)

  /* ------- Hastes impact on the trinket PPM is included in the secondary multiplier below. ------ */
  bonus_stats.hps = (getProcessedValue(healEffect.coefficient, healEffect.table, itemLevel, healEffect.efficiency) / 60) * meteor * healEffect.ppm * player.getStatMultiplier("CRITVERS");
  bonus_stats.haste = hasteValue * convertPPMToUptime(hasteEffect.ppm, hasteEffect.duration);

} else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Scrawled Word of Recall                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Scrawled Word of Recall"
) {
  const effect = activeTrinket.effects[0];
  const expectedCDR = Math.round(10*getProcessedValue(effect.coefficient, effect.table, itemLevel, 1, false)*effect.specMod[player.getSpec()])/10;

  if (player.getSpec() === "Holy Paladin") {
    bonus_stats.hps = ((getAdjustedHolyShock(player, contentType) * (expectedCDR / 7.5)) - player.getSpecialQuery("OneManaHealing", contentType) * 1600) / 60 * 0.8
  }

}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Tome of Insight                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Tome of Insight"
) {
  let effect = activeTrinket.effects[0];

  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
  const trinketValue = getDiminishedValue('Crit', trinketRaw, setStats.crit)

  bonus_stats.crit = trinketValue * convertPPMToUptime(effect.ppm, effect.duration);
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Symbol of the Raptora                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Symbol of the Raptora"
) {
  let effect = activeTrinket.effects[0];

  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)

  bonus_stats.intellect = trinketRaw * convertPPMToUptime(effect.ppm, effect.duration);
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Forbidden Necromantic Tome                                   */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Forbidden Necromantic Tome"
) {
  let effect = activeTrinket.effects[0];

  bonus_stats.crit = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.averageStacks[player.getSpec()];
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                Flask of the Solemn Night                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Flask of the Solemn Night"
) {
  /*
  */
  let effect = activeTrinket.effects[0];

  // trinketRaw represents a single stack of the buff.
  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
  let trinketSum = 0
  // Add raw values for stacks 10 through 19.
  for (var i = 10; i <= 19; i++) {
    // We're going to adjust each stack individually for diminishing returns. 
    // The more stacks we have, the harder we'll be hit.
    let adjVal = getDiminishedValue('Haste', trinketRaw * i, setStats.haste)
    trinketSum += adjVal
  }

  // Take an average of our stacks. Note that the trinket decreases from 19 to 10, NOT to 0.
  //bonus_stats.haste = (trinketSum / 10) * convertPPMToUptime(effect.ppm, effect.duration) * effect.efficiency[player.spec];
  bonus_stats.haste = 0;
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Bottled Hurricane                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Bottled Hurricane"
) {
  let effect = activeTrinket.effects[0];
  const oneCloud = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType]) * effect.ticks

  bonus_stats.hps = (oneCloud * effect.ppm * effect.targets * player.getStatMultiplier("CRITVERS") / 60);
  //
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Concave Reflecting Lens                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Concave Reflecting Lens"
) {
  let effect = activeTrinket.effects[0];
  const oneHeal = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType])
  const expectedPPM = effect.ppm * player.getStatPerc("Haste");

  bonus_stats.hps = (oneHeal * expectedPPM * effect.targets * player.getStatMultiplier("CRITVERS") / 60);
  //
} else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                Amalgam's Seventh Spine                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Amalgam's Seventh Spine"
) {
  let effect = activeTrinket.effects[0];

  bonus_stats.mana = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.ppm[player.getSpec()]) / 60;

  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Moonlit Prism                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Moonlit Prism"
) {
  let effect = activeTrinket.effects[0];

  bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * (effect.averageStacks * player.getStatPerc("Haste")) * effect.duration / effect.cooldown;
  bonus_stats.intellect *= castModel.getSpecialQuery("ninetySeconds", "cooldownMult");
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Infernal Writ                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Infernal Writ"
) {
  let effect = activeTrinket.effects[0];

  bonus_stats.crit = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm[player.getSpec()], effect.duration) * effect.averageStacks;
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Infernal Writ                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "The Lion's Roar"
) {
  let effect = activeTrinket.effects[0];

  const expectedUsesMin = 1 / effect.baseCooldown * 60 + (effect.ppm * effect.cdrPerProc / effect.baseCooldown);

  bonus_stats.hps = getProcessedValue(effect.coefficient, effect.table, itemLevel) * expectedUsesMin / 60 * effect.efficiency;
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Elegy of the Eternals                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Elegy of the Eternals"
) {
  let effect = activeTrinket.effects[0];

    // Titanic Ocular Gland increases your highest secondary by X. 
    const itemSetHighestSecondary = getHighestStat(setStats);
    const statRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    const statValue = getDiminishedValue(itemSetHighestSecondary, statRaw, setStats[itemSetHighestSecondary])
    
    bonus_stats[itemSetHighestSecondary] = statValue;

  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Storm Hunter's Insignia                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Storm Hunter's Insignia"
) {
  let effect = activeTrinket.effects[0];

    // Titanic Ocular Gland increases your highest secondary by X. 
    const itemSetHighestSecondary = getHighestStat(setStats);
    const statRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel);
    const statValue = getDiminishedValue(itemSetHighestSecondary, statRaw, setStats[itemSetHighestSecondary])
    
    bonus_stats[itemSetHighestSecondary] = statValue * convertPPMToUptime(effect.ppm, effect.duration);

  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Auxillary Attendant Chime                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Auxillary Attendant Chime"
) {
  let effect = activeTrinket.effects[0];
  const oneProc = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * (effect.duration / effect.tickRate) //* player.getStatPerc("Haste"))

  bonus_stats.hps = (oneProc * effect.ppm * player.getStatPerc("Versatility") / 60);
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                          The First Sigil                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "The First Sigil"
) {
  let effect = activeTrinket.effects[0];

  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
  const trinketValue = getDiminishedValue('Versatility', trinketRaw, setStats.versatility)

  bonus_stats.versatility = (trinketValue * effect.duration) / effect.cooldown;
  //bonus_stats.versatility *= castModel.getSpecialQuery("twoMinutes", "cooldownMult");

  
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Enforcer's Stun Grenade                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Enforcer's Stun Grenade"
) {
  let effect = activeTrinket.effects[0];

  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
  const trinketValue = getDiminishedValue('Versatility', trinketRaw, setStats.versatility)

  bonus_stats.versatility = (trinketValue * effect.duration) / effect.cooldown;
  bonus_stats.versatility *= castModel.getSpecialQuery("twoMinutes", "cooldownMult");


  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Fleshrender's Meathook                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Fleshrender's Meathook"
) {
  let effect = activeTrinket.effects[0];

  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
  const trinketValue = getDiminishedValue('Haste', trinketRaw, setStats.haste)

  bonus_stats.haste = (trinketValue * effect.duration) / effect.cooldown;
  bonus_stats.haste *= castModel.getSpecialQuery("twoMinutes", "cooldownMult");

  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Grim Eclipse                                       */
  /* ---------------------------------------------------------------------------------------------- */
  // The damage portion is not currently evaluated
  effectName === "Grim Eclipse"
) {
  let effect = activeTrinket.effects[0];

  const trinketRaw = getProcessedValue(effect.coefficient, effect.table, itemLevel)
  const trinketValue = getDiminishedValue('Haste', trinketRaw, setStats.haste)

  bonus_stats.haste = (trinketValue * effect.duration) * effect.runeEfficiency / effect.cooldown;
  //bonus_stats.versatility *= castModel.getSpecialQuery("twoMinutes", "cooldownMult");

  
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                Reclaimer's Intensity Core                                      */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Reclaimer's Intensity Core"
) {
  const manaEffect = activeTrinket.effects[0];
  const healEffect = activeTrinket.effects[1];
  let oneHeal = 0;
  if ([239, 252, 265, 278].includes(itemLevel)) oneHeal = healEffect.fixedValues[itemLevel] * healEffect.ticks * player.getStatMultiplier("CRITVERS") * healEffect.targets * healEffect.efficiency[contentType];
  // This else should never be called, but is a failsafe.
  else oneHeal = healEffect.fixedValues[252] * healEffect.ticks * player.getStatMultiplier("CRITVERS") * healEffect.targets * healEffect.efficiency[contentType];

  bonus_stats.mana = (Math.round(getProcessedValue(manaEffect.coefficient, manaEffect.table, itemLevel) * manaEffect.ticks) / manaEffect.cooldown);
  bonus_stats.hps = oneHeal * healEffect.ppm / 60;


  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Extract of Prodigious Sands                                  */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Extract of Prodigious Sands"
) {
  let effect = activeTrinket.effects[0];
  const oneHeal = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType])
  const expectedPPM = effect.ppm; //* player.getStatPerc("Haste");
  bonus_stats.hps = (oneHeal * expectedPPM * player.getStatMultiplier("CRITVERS") / 60);
  //
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Versatile Storm Lure                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Versatile Storm Lure"
) {
  let effect = activeTrinket.effects[0];
  const oneHeal = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType])
  const expectedPPM = effect.ppm; //* player.getStatPerc("Haste");
  bonus_stats.hps = (oneHeal * expectedPPM * player.getStatMultiplier("CRITVERS") / 60);
  //
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Ekrazathal's Colored Fang                                     */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ekrazathal's Colored Fang"
) {
  let effect = activeTrinket.effects[0];
  const oneHeal = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType])
  const expectedPPM = effect.ppm; //* player.getStatPerc("Haste");
  bonus_stats.hps = (oneHeal * expectedPPM * player.getStatMultiplier("CRITVERS") / 60);
  //
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Faith's Crucible                                    */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Faith's Crucible"
) {
  let effect = activeTrinket.effects[0];
  const oneHeal = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency[contentType])
  
  bonus_stats.hps = (oneHeal * effect.hits * player.getStatMultiplier("CRITVERS") / effect.cooldown);
  //
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Fluctuating Energy                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Fluctuating Energy"
) {
  let effect = activeTrinket.effects[0];

  bonus_stats.mana = (getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.ppm * effect.efficiency * player.getStatPerc("Haste")) / 60;
  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Ingenious Mana Battery                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ingenious Mana Battery"
) {
  const manaEffect = activeTrinket.effects[0];
  const versEffect = activeTrinket.effects[1];

  //bonus_stats.mana = getProcessedValue(manaEffect.coefficient, manaEffect.table, itemLevel) / player.getFightLength(contentType);
  bonus_stats.mana = 1738 / player.getFightLength(contentType);
  bonus_stats.versatility = getProcessedValue(versEffect.coefficient, versEffect.table, itemLevel) * versEffect.uptime;

  //
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Resonant Reservoir                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Resonant Reservoir"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("Haste") * player.getStatMultiplier("CRITVERS");

    // Due to a quirk in being a ground effect that adds a DoT, the trinket gains slightly more value than doubling up every stack. That's represented here.
    bonus_stats.dps = effectValue * effect.avgTargets * effect.avgStacks * effect.ticks * 1.22 / effect.cooldown;
  
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                           Miniscule Mailemental in an Envelope                                 */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Miniscule Mailemental in an Envelope"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("Haste") * player.getStatMultiplier("CRITVERS");

    bonus_stats.dps = effectValue  * effect.ppm * effect.classMult[player.getSpec()] / 60;
  
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Infinitely Divisible Ooze                                   */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Infinitely Divisible Ooze"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("Haste") * player.getStatMultiplier("CRITVERS");

    bonus_stats.dps = effectValue  * effect.ppm * effect.hits  / 60;
  
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Oakheart's Gnarled Root                                   */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Oakheart's Gnarled Root"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("Haste") * player.getStatMultiplier("CRITVERS");

    bonus_stats.dps = effectValue  * effect.ppm * effect.hits  / 60;
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Deteriorated Construct Core                                   */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Deteriorated Construct Core"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("Haste") * player.getStatMultiplier("CRITVERS");
    let ppm = effect.ppm
    if (player.getSpec() === "Holy Paladin") ppm *= 0.2; // TODO: Test with live data.
    else if (player.getSpec() === "Mistweaver Monk") ppm = 0; // TODO: Test with live data.
    bonus_stats.dps = effectValue  * ppm * effect.targets / 60;
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Aran's Relaxing Ruby                                   */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Aran's Relaxing Ruby"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("Haste") * player.getStatMultiplier("CRITVERS");

    bonus_stats.dps = effectValue  * effect.ppm * effect.targets / 60;
} 
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Dreadfire Vessel                                   */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Dreadfire Vessel"
) {

    const effect = activeTrinket.effects[0];
    const effectValue = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatMultiplier("CRITVERS");

    bonus_stats.dps = effectValue * effect.targets / effect.cooldown;
} 

  else {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        No Trinkets Found                                       */
    /* ---------------------------------------------------------------------------------------------- */
    console.log("No Trinket Found");
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


