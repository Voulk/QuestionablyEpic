
const PRIMAL_TIDE_CORE = "Primal Tide Core";
const SPIRITWALKERS_TIDAL_TOTEM = "Spiritwalker's Tidal Totem";
const EARTHEN_HARMONY = "Earthen Harmony";
const JONATS = "Jonat's Natural Focus";

const debug = false;

const IDCHAINHEAL = 85222;
const IDHEALINGWAVE = 82326;
const IDHEALINGSURGE = 20473;

export const getShamanSpecEffect = (effectName, player, contentType) => {
  const bonusStats = {};
  const healingRainCPM = 3.4;
  const riptidesActive = 4.9;
  // Tier Sets
  if (effectName === "Shaman T31-2") {
    // 

    bonusStats.hps = 9000;

  }
  else if (effectName === "Shaman T31-4") {
    // 

    bonusStats.hps = 8500;

  }


  else if (effectName === "Shaman T30-2") {
    // 
    const oneTidewatersHeal = 2.3 * 1.4 * player.getStatMults(["intellect", "crit", "versatility", "mastery"]);

    bonusStats.hps = healingRainCPM * riptidesActive * oneTidewatersHeal * 0.42 / 60;

  }
  else if (effectName === "Shaman T30-4") {
    const healingBuffUptime = healingRainCPM * 8 / 60;
    const healingBuffStrength = riptidesActive * 0.01;

    const chainHealCast = 6.405 * player.getStatMults(["intellect", "crit", "versatility", "mastery"]) * 1.08 * 1.02 * 1.18 * 1.15;
    const chainHealBuff = riptidesActive * 0.02;

    bonusStats.hps = healingBuffUptime * healingBuffStrength * player.getHPS(contentType) + chainHealCast * chainHealBuff * healingRainCPM / 60;

  }
  if (effectName === "Shaman T29-2") {
    // +8% crit to almost everything that matters.
    const uptime = 0.45; // The percentage of your healing while the bonus is active.
    bonusStats.crit = 15 * uptime * 170;

  }
  if (effectName === "Shaman T29-4") {
    const effectIncrease = 2.2;
    const crit = player.getStatPerc("crit") - 1;
    const healingInc = ((effectIncrease * crit + (1-crit)) / (2 * crit + (1-crit))) - 1;

    bonusStats.hps = healingInc * player.getHPS(contentType);

  }


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

    //bonusStats.hps = avgHealingPerStack * stacksPerMin * (1 - wastage) / 60;
    bonusStats.hps = 0;
  }
  else if (effectName === "Shaman T28-4") {
    // Free chain heals
    // We'll include chain heals at a standard crit rate since stacks are already accounted for in the 2pc formula.
    const freeChainHealsPerMinute = 2 + 0.5 + 0.33 + 0.33; // Stream / Cloudburst + HTT + MTT + SLT. Includes average CDR on HTT.
    const oneChainHeal =  player.getStatMultiplier("ALL") * 5.3193 * 0.75; // 25% expected overhealing. Fine tune with logs.
    const hpsFreeChainHeal = oneChainHeal * freeChainHealsPerMinute;

    // Cooldown reduction portion
    // It might take a little bit of time to see how players best use this since there's a little bit of flexibility.
    // We'll focus our formula mostly on Healing Tide Totem CDR but this formula could easily be updated or even split via the
    // breakdown of how often each totem benefits.
    const oneHealingTide = player.getStatMultiplier("ALL") * 0.35 * 5 * 20 * 0.75; // With HTT large range it should be no issue hitting all 20 people.
    const cooldownRedPerMin = (player.getSpellCPM(1064, contentType) + freeChainHealsPerMinute) * 4 * player.getStatPerc("Crit");// chain heal CPM x targets x modifiedCritChance
    const hpsFreeTotems = oneHealingTide * (2 / 180 * cooldownRedPerMin) / 60;

    //bonusStats.hps = hpsFreeChainHeal / 60 + hpsFreeTotems;
    bonusStats.hps = 0;
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
    bonusStats.hps = (oneRiptide * rtPerMinute * 0.25) / 60;
  } else if (effectName === SPIRITWALKERS_TIDAL_TOTEM) {
    /**
     * every mtt use gain 10 seconds of quicker chhw casts
     * missing: mana saved
     */
    // const mttCasts = player.getSpellCasts("Mana Tide Totem", contentType);
    //const chHPS = player.getSingleCast("Chain Heal", contentType) / player.getFightLength();
    //console.log(SPIRITWALKERS_TIDAL_TOTEM, mttCasts, gain, possibleCasts);
    const gain = 2.5 / 1.5 - 1; // tooltip says double but you hit the GCD wall
    const buffDuration = 9;
    const castDuration = 2.5 / player.getStatPerc("Haste");
    const possibleCasts = Math.ceil(buffDuration / castDuration);
    const chHeal = 5.3 * player.getStatMultiplier("NOHASTE");
    bonusStats.hps = (possibleCasts * (chHeal * gain)) / 180;
  } else if (effectName === EARTHEN_HARMONY) {
    /**
     * if earth shield target is below 75%, earth shield heals 150% more
     */
    const thisSpellpower = 0.438 * 1.5;
    const assumedEfficiency = 0.4;
    bonusStats.hps = (thisSpellpower * player.getStatMultiplier("NOHASTE") * (player.getFightLength(contentType) / 3) * assumedEfficiency) / player.getFightLength(contentType);
  } else if (effectName === JONATS) {
    /**
     * hw hs buff the heal of your next ch by x%, stacking up to 5
     */
    const chHPS = player.getSpellHPS(IDCHAINHEAL, contentType);
    const triggerCasts = player.getSpellCasts(IDHEALINGWAVE, contentType) + player.getSpellCasts(IDHEALINGSURGE, contentType);
    const chCasts = player.getSpellCasts(IDCHAINHEAL, contentType);
    const ratio = Math.min(Math.max(triggerCasts / chCasts, 0.01), 5);
    debug && console.log(JONATS, chHPS, triggerCasts, chCasts, ratio);
    bonusStats.hps = chHPS * (ratio / 5); // Was 10.
  }

  else if (effectName === "Elemental Conduit") {
    // Up to 5 friendly targets healed by Chain Harvest will have Riptide cast on them. Up to 5 enemy targets damaged by Chain Harvest will have Flame Shock cast on them. 
    // Flame Shock critical strikes reduce the cooldown of Chain Harvest by 1.0 sec.
    const targets = contentType == "Raid" ? 6 : 8;
    const chCooldown = 90 - (targets * 5 * (player.getStatPerc("Crit") + 0.15 - 1)); // TODO: Implement conduit properly, currently this is just 278

    const flameshockUptime = contentType == "Raid" ? 0.7 : 0.95; // TODO: Get better log data
    const flameshockCDR = 0.5 * player.getStatPerc("Haste") * (player.getStatPerc("Crit") - 1) * flameshockUptime; // CDR per second
    const fsDungeonAppliedCHCDR = contentType == "Raid" ? 0 : flameshockCDR * 18 * 5;
    const flameshockTargets = contentType == "Raid" ? 1 : 2; // Can apply up to 3 normally, but typically will be less

    // Get effective CD
    let effectiveCD = chCooldown - fsDungeonAppliedCHCDR;
    effectiveCD = effectiveCD / (1 + flameshockCDR * flameshockTargets);

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
  }

  return bonusStats;
};
