// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.

export default function createEvents(bossID, difficulty, damageTakenData, debuffs) {
  console.log(damageTakenData);
  console.log(difficulty);
  let returnedEvents = [];

  const logGuids = damageTakenData.map((key) => key.ability.guid);

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */

  if (
    /* ------------------------------------------- Rygelon ------------------------------------------- */
    bossID === 2549
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Abilities                                           */
    /* ---------------------------------------------------------------------------------------------- */
    const stellarDecay = 364381;
    if (difficulty === "Heroic") {
      // Stellar Decay

      if (logGuids.includes(stellarDecay)) {
        console.log(damageTakenData.filter((filter) => filter.ability.guid === stellarDecay).map((key) => key.ability.guid));
      }
    }

    if (difficulty === "Mythic") {
      // Stellar Decay
      if (logGuids.includes(stellarDecay)) {
        console.log(damageTakenData.filter((filter) => filter.ability.guid === stellarDecay).map((key) => key.ability.guid));
      }
    }
  }

  if (
    /* ------------------------------------------- Jailer ------------------------------------------- */
    bossID === 2537
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Abilities                                           */
    /* ---------------------------------------------------------------------------------------------- */
    const surgingAzerite = 366408;
    if (difficulty === "Heroic") {
      // Surging Azerite
      if (logGuids.includes(surgingAzerite)) {
        console.log(damageTakenData.filter((filter) => filter.ability.guid === surgingAzerite).map((key) => key.ability.guid));
      }
    }

    if (difficulty === "Mythic") {
      // Surging Azerite
      if (logGuids.includes(surgingAzerite)) {
        console.log(damageTakenData.filter((filter) => filter.ability.guid === surgingAzerite).map((key) => key.ability.guid));
      }
    }
  }

  return returnedEvents;
}
