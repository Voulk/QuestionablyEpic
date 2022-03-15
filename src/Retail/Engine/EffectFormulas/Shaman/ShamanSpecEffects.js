import { consoleSandbox } from "@sentry/utils";
import { HEALING_WAVE_COPY_SP } from "./constants";
import { convertPPMToUptime } from "Retail/Engine/EffectFormulas/EffectUtilities"

const PRIMAL_TIDE_CORE = "Primal Tide Core";
const SPIRITWALKERS_TIDAL_TOTEM = "Spiritwalker's Tidal Totem";
const EARTHEN_HARMONY = "Earthen Harmony";
const JONATS = "Jonat's Natural Focus";

const debug = false;

const IDCHAINHEAL = 1064;
const IDHEALINGWAVE = 77472;
const IDHEALINGSURGE = 8004;
const IDPRIMORDIALWAVE = 327163;

export const getShamanSpecEffect = (effectName, player, contentType) => {
  const bonusStats = {};

  // Tier Sets
  if (effectName === "Shaman T28-2") {
    // Crit heals give a stacking +2% crit buff to your next Chain Heal cast. 

    // Model Method #1
    // This can be modelled as a percentage increase to Chain Heal HPS in general (avg stacks on cast x avg value of the crit inc) which is effective but
    // has the weakness of showing little to no increase on pre-2pc logs or on poorly played logs in general.

    // Model Method #2
    // An alternative is to just grab the raw increase of including a new chain heal a few times a minute. This has less reliance on the inserted log being good.
    // We will assume here that very little (sub 10%) of our Chain Heal stacks go to waste.

    const oneChainHeal = 5.3193 * player.getInt() * player.getStatMultiplier("CRITVERS") * 0.96 * 0.8;
    // 5.3193 is the final coefficient including bounces. 
    // 0.96 includes the Chain Heal aura nerf. 
    // 0.8 includes an expected 20% overheal on all chain heal healing. This is a conservative estimate in most cases.

    const avgHealingPerStack = oneChainHeal * 0.02; 
    // Note that this should be independent of our crit chance, so long as we spend before we would otherwise cap.
    // Remember that 99->100% crit on a spell should be of equal absolute value as 5-6%.
    
    const stacksPerMin = 260 * (player.getStatPerc("Crit") - 1); 
    // This is equal to the raw quantity of crits per minute.
    // We can refine this more with bulk log data or from using a players log data directly.

    const wastage = 0.15 // It's very easy to waste stacks here and we should account for that.

    bonusStats.hps = avgHealingPerStack * stacksPerMin * (1 - wastage) / 60;
  }
  else if (effectName === "Shaman T28-4") {
    // Free chain heals
    // We'll include chain heals at a standard crit rate since stacks are already accounted for in the 2pc formula.
    const freeChainHealsPerMinute = 2 + 0.5 + 0.33 + 0.33; // Stream / Cloudburst + HTT + MTT + SLT. Includes average CDR on HTT.
    const oneChainHeal =  player.getStatMultiplier("ALL") * 5.3193 * 0.75; // 25% expected overhealing. Fine tune with logs.
    const classPassive = 0.96; // Class aura
    oneChainHeal *= classPassive;
    const hpsFreeChainHeal = oneChainHeal * freeChainHealsPerMinute;

    // Cooldown reduction portion
    // It might take a little bit of time to see how players best use this since there's a little bit of flexibility.
    // We'll focus our formula mostly on Healing Tide Totem CDR but this formula could easily be updated or even split via the
    // breakdown of how often each totem benefits.
    const oneHealingTide = player.getStatMultiplier("ALL") * 0.35 * 5 * 20 * 0.75; // With HTT large range it should be no issue hitting all 20 people.
    const cooldownRedPerMin = (player.getSpellCPM(IDCHAINHEAL, contentType) + freeChainHealsPerMinute) * 4 * player.getStatPerc("Crit");// chain heal CPM x targets x modifiedCritChance
    const hpsFreeTotems = oneHealingTide * (2 / 180 * cooldownRedPerMin) / 60;

    bonusStats.hps = hpsFreeChainHeal / 60 + hpsFreeTotems;
  }
  else if (effectName === PRIMAL_TIDE_CORE) {
    /**
     * every x riptides apply a new riptide to someone
     * if somebody already has ptc
     * (casts / hits) * healing
     */
    // const rtHPS = player.getSpellHPS("Riptide", contentType);
    // bonusStats.hps = rtHPS * 0.25;
    const oneRiptide = 1.7 * player.getStatMultiplier("NOHASTE") + (18 / 3) * 0.22 * player.getStatMultiplier("ALL"); // todo torrent
    const rtPerMinute = 60 / 7; // todo echo
    const rtOverheal = 0.75;

    bonusStats.hps = (oneRiptide * 0.96 * rtPerMinute * 0.25 * rtOverheal) / 60; // Added spec aura -4%

    // Calculate number of bonus riptides and healing wave heal from Primordial Wave
    if (player.getCovenant() === "necrolord"){
      const pwavePerMinute = (60 / 45) * 1.34; // TODO: Implement conduit properly, currently this is just 278
      const bonusHealingWaveValue = HEALING_WAVE_COPY_SP * pwavePerMinute * 0.25 * 0.6; // 40% overheal on extra healing waves
      bonusStats.hps = (oneRiptide * 0.96 * (rtPerMinute + pwavePerMinute) * 0.25 + bonusHealingWaveValue) / 60; // Added spec aura -4%
    }
  } else if (effectName === SPIRITWALKERS_TIDAL_TOTEM) {
    /**
     * every mtt use gain 10 seconds of quicker chhw casts
     */
    const buffDuration = 10 - 1.5 / player.getStatPerc("Haste");
    const castDuration = 1.5 / player.getStatPerc("Haste");
    const possibleCasts = Math.ceil(buffDuration / castDuration);
    const chHeal = 5.3193 * player.getStatMultiplier("NOHASTE");
    const classPassive = 0.96;
    // Scale window throughput by the increased mana efficiency to factor that you wouldn't be casting these CH originally
    const manaEfficency = 0.6; 

    bonusStats.hps = (possibleCasts * chHeal * manaEfficency * classPassive) / 180;
  } else if (effectName === EARTHEN_HARMONY) {
    /**
     * if earth shield target is below 75%, earth shield heals 150% more
     */
    const oneEarthenHarmonyProc = 0.438 * 1.5;
    const assumedEfficiency = contentType == "Raid" ? 0.1 : 0.3; // Percentage of activations that are below HP threshold
    bonusStats.hps = oneEarthenHarmonyProc * player.getStatMultiplier("NOHASTE") * assumedEfficiency / 3;
  } else if (effectName === JONATS) {
    /**
     * hw hs buff the heal of your next ch by x%, stacking up to 5
     */

    // TODO: Implement an expected casts
    const chHPS = player.getSpellHPS(IDCHAINHEAL, contentType);
    let triggerCasts = 0;
    if (player.getSpellCasts(IDHEALINGWAVE, contentType)) triggerCasts += player.getSpellCasts(IDHEALINGWAVE, contentType);
    if (player.getSpellCasts(IDHEALINGSURGE, contentType)) triggerCasts += player.getSpellCasts(IDHEALINGSURGE, contentType);
    
    // Calculate number of bonus riptides and healing wave casts from Primordial Wave
    if (player.getCovenant() === "necrolord"){
      const pwavePerMinute = (60 / 45) * 1.34; // TODO: Implement conduit properly, currently this is just 278
      const avgRiptides = 4;
      let waveCasts = 0; 
      
      if (player.getSpellCasts(IDPRIMORDIALWAVE, contentType)) waveCasts = player.getSpellCasts(IDPRIMORDIALWAVE, contentType);
        
      if (pwavePerMinute > waveCasts) {
        triggerCasts += pwavePerMinute * avgRiptides;
      } else {
        triggerCasts += player.getSpellCasts(IDPRIMORDIALWAVE, contentType) * avgRiptides;
      }
    }
    

    const chCasts = player.getSpellCasts(IDCHAINHEAL, contentType);
    const ratio = Math.min(Math.max(triggerCasts / chCasts, 0.01), 5);
    
    // If neither are true return 0;
    bonusStats.hps = 0;

    // TODO: Support Deluge, assuming unleash life.
    const chainMultiplier = 1 + 0.7 + 0.49 + 0.343; // TODO: Support High Tide
    const unleashLifeMulti = 1.35; 
    const oneChainHeal = 2.1 * player.getStatMultiplier("NOHASTE") * chainMultiplier * unleashLifeMulti; 
    // Assume all stacks are used
    bonusStats.hps = (triggerCasts * 0.1 * oneChainHeal) / player.getFightLength(contentType);

    // If somehow this is bigger than the above, show it.
    if (bonusStats.hps < chHPS * (ratio / 10)) {
      bonusStats.hps = chHPS * (ratio / 10); 
    } 
  } else if (effectName === "Elemental Conduit") {
    // Up to 5 friendly targets healed by Chain Harvest will have Riptide cast on them. Up to 5 enemy targets damaged by Chain Harvest will have Flame Shock cast on them. 
    // Flame Shock critical strikes reduce the cooldown of Chain Harvest by 1.0 sec.
    const targets = contentType == "Raid" ? 6 : 8;
    const chCooldown = 90 - (targets * 5 * (player.getStatPerc("Crit") + 0.15 - 1)); // TODO: Implement conduit properly, currently this is just 278

    const flameshockUptime = contentType == "Raid" ? 0.7 : 0.95; // TODO: Get better log data
    const flameshockCDR = 2 / player.getStatPerc("Haste") * (player.getStatPerc("Crit") - 1) * flameshockUptime; // CDR per second
    const fsDungeonAppliedCHCDR = contentType == "Raid" ? 0 : flameshockCDR * 18 * 5;
    const flameshockTargets = contentType == "Raid" ? 1 : 2; // Can apply up to 3 normally, but typically will be less

    // Get effective CD
    let effectiveCD = chCooldown - fsDungeonAppliedCHCDR;
    for (var i = 0; i < flameshockTargets; i += 1)
    {
      effectiveCD -= flameshockCDR * effectiveCD;
    }
    effectiveCD = (effectiveCD + chCooldown) / 2;

    // One cast, includes core passive
    const shamanCorePassive = 0.96; // Same multi for both Riptide and Chain Harvest
    const chOverheal = 0.65;
    const oneChainHarvest = 3.15 * player.getStatMultiplier("NOHASTE") * 5 * shamanCorePassive * chOverheal; // todo Unleash life
    const hpsDueToCDR = oneChainHarvest / effectiveCD - oneChainHarvest / chCooldown;
    
    const rtOverheal = 0.75;
    const oneRiptide = 1.7 * player.getStatMultiplier("NOHASTE") * chOverheal * shamanCorePassive + (18 / 3) * 0.22 * player.getStatMultiplier("ALL") * shamanCorePassive * rtOverheal; // todo torrent
    // Dungeons overridden hots. 
    const activeRiptideHeal = (((18 + 12 + 6) - 5.4 * 3) / 3) * 0.22 * player.getStatMultiplier("ALL") * shamanCorePassive;
    const rtLostHeal = contentType == "Raid" ? 3 / 20 * activeRiptideHeal : activeRiptideHeal; 
    bonusStats.hps = (oneRiptide * 5 / effectiveCD) + hpsDueToCDR - rtLostHeal / effectiveCD; 
  } else if (effectName === "Raging Vesper Vortex") {
    // Heal when 3 charges used, healing is spread between targets so shouldn't be wasted.
    const vtPerMinute = 60 / 60;
    const classPassive = 0.96;
    const healing = 1.1 * player.getStatMultiplier("NOHASTE") * 2 * classPassive; // Assume you use both damage and healing charges

    bonusStats.hps = (healing * vtPerMinute) / 60
  } else if (effectName === "Deeply Rooted Elements") {
    // Casting Riptide has a 7% chance to activate Ascendance for 6 seconds.
    const rtPerMinute = 60 / 6; // Echo default talent
    const expectedOverheal = 0.7; // 30% overheal/wastage factor

    bonusStats.hps = player.getHPS() * convertPPMToUptime(rtPerMinute * 0.07, 6) * expectedOverheal;
  } else if (effectName === "Splintered Elements") {
    // Each additional Healing Wave generated by Primordial Wave increases your Haste by 5% for 12 sec.
    const pwavePerMinute = (60 / 45) * 1.34; // TODO: Implement conduit properly, currently this is just 278
    const expectedRiptides = 4.4;
    const hasteEffectiveness = 5 / 6; // Based on stat weights

    bonusStats.hps = player.getHPS() * convertPPMToUptime(pwavePerMinute, 12) * 0.05  * expectedRiptides * hasteEffectiveness;
  } else if (effectName === "Seeds of Rampant Growth") {
    const targets = contentType == "Raid" ? 20 : 5;
    const httHealing = 0.35 * player.getStatMultiplier("ALL") * 5; // Ticks every 2 seconds, scaled by haste
    // Heavy Rainfall in raid
    // Assume not quite perfect casts / a bit of overhealing
    // SP * targets * hits * casts * multi * conduitbonus
    const rainAvgTargets = contentType == "Raid" ? 6 : 4;
    const rainHealing = 0.265 * rainAvgTargets * 5 * 2 * player.getStatMultiplier("ALL") * 1.25; 

    const baseCooldown = 144; // Factoring conduit - 36 seconds
    const effectiveCD = 144 - (7 * 5);

    const hpsDueToCDR = ((httHealing * targets) + rainHealing) / effectiveCD - ((httHealing * targets) + rainHealing) / baseCooldown;
    const hpsDueToCrit = player.getHPS() * convertPPMToUptime(60 / effectiveCD, 15) * 7 * 0.04;

    bonusStats.hps = hpsDueToCDR * 0.6 + hpsDueToCrit; // Overhealing factor
  } else if (effectName === "Ancestral Reminder") {
    // Heroism / Bloodlust lasts an extra 20s on you, and you gain an extra 10% haste from it's effect. 
    const increasedLustHealing = player.getHPS() * (1.4/1.3 - 1);
    const increasedLustDurationHealing = player.getHPS() * 0.4;
    const hasteEffectiveness = 5 / 6; // Based on stat weights

    bonusStats.hps = (increasedLustHealing + increasedLustDurationHealing / 2) * 60 / player.getFightLength() * hasteEffectiveness;
  }
  return bonusStats;
};
