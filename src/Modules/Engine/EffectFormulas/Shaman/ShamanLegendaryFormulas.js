const PRIMAL_TIDE_CORE = "Primal Tide Core";
const SPIRITWALKERS_TIDAL_TOTEM = "Spiritwalker's Tidal Totem";
const EARTHEN_HARMONY = "Earthen Harmony";
const JONATS = "Jonat's Natural Focus";

const debug = false;

const IDCHAINHEAL = 85222;
const IDHEALINGWAVE = 82326;
const IDHEALINGSURGE = 20473;

export const getShamanLegendary = (effectName, player, contentType) => {
  const bonusStats = {};
  bonusStats.hps = -1;

  if (effectName === PRIMAL_TIDE_CORE) {
    /**
     * every x riptides apply a new riptide to someone
     * if somebody already has ptc
     * (casts / hits) * healing
     */
    // const rtHPS = player.getSpellHPS("Riptide", contentType);
    // bonusStats.hps = rtHPS * 0.25;
    const oneRiptide = 1.7 * player.getStatMultiplier("NOHASTE") + (18 / 3) * .22 * player.getStatMultiplier("ALL"); // todo torrent
    const rtPerMinute = 60 / 7; // todo echo
    bonusStats.hps = (oneRiptide * rtPerMinute * .25) / 60;
  } else if (effectName === SPIRITWALKERS_TIDAL_TOTEM) {
    /**
     * every mtt use gain 10 seconds of quicker chhw casts
     * missing: mana saved
     */
    // const mttCasts = player.getSpellCasts("Mana Tide Totem", contentType);
    //const chHPS = player.getSingleCast("Chain Heal", contentType) / player.getFightLength();
    //console.log(SPIRITWALKERS_TIDAL_TOTEM, mttCasts, gain, possibleCasts);
    const gain = (2.5 / 1.5) - 1; // tooltip says double but you hit the GCD wall
    const buffDuration = 9;
    const castDuration = 2.5 / player.getStatPerc("Haste");
    const possibleCasts = Math.ceil(buffDuration / castDuration);
    const chHeal = 5.3 * player.getStatMultiplier("NOHASTE");
    bonusStats.hps = (possibleCasts * (chHeal * gain)) / 180;
  } else if (effectName === EARTHEN_HARMONY) {
    /**
     * if earth shield target is below 75%, earth shield heals 150% more
     */
    const thisSpellpower = .438 * 1.5;
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
    bonusStats.hps = chHPS * (ratio / 10);
  }
  return bonusStats;
};
