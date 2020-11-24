const PRIMAL_TIDE_CORE = "Primal Tide Core";
const SPIRITWALKERS_TIDAL_TOTEM = "Spiritwalkers Tidal Totem";
const EARTHEN_HARMONY = "Earthen Harmony";
const JONATS = "Jonat's Natural Focus";

const debug = false;

export const getShamanLegendary = (effectName, player, contentType) => {
  const bonusStats = {};
  bonusStats.HPS = -1;

  if (effectName === PRIMAL_TIDE_CORE) {
    /**
     * every x riptides apply a new riptide to someone
     * if somebody already has ptc
     * (casts / hits) * healing
     */
    const rtHPS = player.getSpellHPS("Riptide", contentType);
    bonusStats.HPS = rtHPS * 0.25;
  } else if (effectName === SPIRITWALKERS_TIDAL_TOTEM) {
    /**
     * every mtt use gain 10 seconds of quicker chhw casts
     */
    const mttCasts = player.getSpellCasts("Mana Tide Totem", contentType);
    const chHPS = player.getSingleCast("Chain Heal", contentType) / player.getFightLength();
    const gain = (2.5 / 1.5) - 1; // tooltip says double but you hit the GCD wall
    const buffDuration = 9;
    const castDuration = 2.5 / player.getStatPerc("Haste");
    const possibleCasts = Math.ceil(buffDuration / castDuration);
    debug && console.log(SPIRITWALKERS_TIDAL_TOTEM, mttCasts, gain, possibleCasts);
    bonusStats.HPS = mttCasts * (possibleCasts * (chHPS * gain));
  } else if (effectName === EARTHEN_HARMONY) {
    /**
     * if earth shield target is below 75%, earth shield heals 150% more
     */
    const thisSpellpower = .438 * 1.5;
    const assumedEfficiency = 0.3;
    bonusStats.HPS = (thisSpellpower * player.getStatMultiplier("NOHASTE") * (player.getFightLength() / 3) * assumedEfficiency) / player.getFightLength();
  } else if (effectName === JONATS) {
    /**
     * hw hs buff the heal of your next ch by x%, stacking up to 5
     */
    const chHPS = player.getSpellHPS("Chain Heal", contentType);
    const triggerCasts = player.getSpellCasts("Healing Wave", contentType) + player.getSpellCasts("Healing Surge", contentType);
    const chCasts = player.getSpellCasts("Chain Heal", contentType);
    const ratio = Math.min(Math.max(triggerCasts / chCasts, 0.01), 5);
    debug && console.log(JONATS, chHPS, triggerCasts, chCasts, ratio);
    bonusStats.HPS = chHPS * (ratio / 10);
  }
  return bonusStats;
};
