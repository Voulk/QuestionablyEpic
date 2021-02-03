const IDLIGHTOFDAWN = 85222;
const IDHOLYLIGHT = 82326;
const IDHOLYSHOCK = 20473;
const IDSHOCKBARRIER = 337824;
const IDWORDOFGLORY = 85673;

// Returns the expected HPS of the player getting one Holy Power.
export function getOneHolyPower(player, contentType) {
  return Math.round(player.getSingleCast(IDLIGHTOFDAWN, contentType) / 3);
}

export function getWingsHealingInc(critPerc) {
  return ((critPerc + 0.3) / critPerc) * 1.3;
}

// Credit: Betsujin
export function getAwakeningWingsUptime(player, contentType) {
  let _cpm = 29; // Holy power generated / min

  let basewings = 10.0;
  let awakeningseconds = 10.0;
  let spenders = _cpm / 3.0;
  let dpprocs = spenders * 0.15;
  dpprocs += dpprocs * 0.15;
  spenders += dpprocs;
  basewings += spenders * 0.15 * awakeningseconds;

  return basewings / 60.0;
}

export function getPaladinCovAbility(soulbindName, player, contentType) {
  let bonus_stats = {};

  if (["Kleia", "Pelagos", "Mikanikos"].includes(soulbindName)) {
    // Kyrian

    // Add Beacon. Consider what to do with Shock Barrier.
    let holy_shock_sp = 1.55;
    let glimmer_sp = 0.38;
    let expected_glimmer_active = 7;
    let shock_barrier = 0;

    bonus_stats.HPS = ((holy_shock_sp + glimmer_sp * expected_glimmer_active) * 5 * player.getStatMultiplier("NOHASTE")) / 60;
  } else if (["Nadjia", "Theotar", "Draven"].includes(soulbindName)) {
    // Ashen Hallow (Venthyr)

    // The healing portion
    let expected_uptime = 0.95;
    let average_allies = 18;
    let sqrt_mult = Math.min(Math.sqrt(5 / average_allies), 1); // Check how it scales first.
    let ashen_tick_sp = 0.42;
    let ashen_ticks = 15 * player.getStatPerc("Haste");
    let ashen_healing_portion = ashen_ticks * ashen_tick_sp * sqrt_mult * average_allies * expected_uptime * player.getStatMultiplier("NOHASTE");

    // The extra Holy Power
    let one_holy_power = getOneHolyPower(player, contentType);
    let expected_holy_power = (30 / 7.5) * expected_uptime;
    let ashen_hammer_portion = expected_holy_power * one_holy_power;

    bonus_stats.HPS = (ashen_hammer_portion + ashen_healing_portion) / 240;
  } else if (["Marileth", "Emeni", "Heirmir"].includes(soulbindName)) {
    // Vanquishers Hammer (Necrolord)

    bonus_stats.HPS = player.getSingleCast(IDWORDOFGLORY, contentType) / 30;
  }

  return bonus_stats;
}
