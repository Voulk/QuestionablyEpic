

export const getEvokerSpecEffect = (effectName, player, contentType) => {
  // These are going to be moved to a proper file soon.


  let bonus_stats = {};

  if (effectName === "Evoker T29-2") {
    // This needs a much more comprehensive formula.
    const reversionPercent = 0.25;
    const critIncrease = 25;
    const uptime = 0.55;
    bonus_stats.crit = reversionPercent * critIncrease * 170 * uptime;


  }
  if (effectName === "Evoker T29-4") {


  }

  else {
    bonus_stats.hps = 0;
    bonus_stats.dps = 0;
  }

  return bonus_stats;
};
