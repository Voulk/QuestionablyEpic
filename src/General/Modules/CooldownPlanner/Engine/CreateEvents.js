// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.

export default function createEvents(bossID, difficulty, damageTakenData) {
  console.log(damageTakenData);
  console.log(difficulty);

  const logGuids = damageTakenData.map((key) => key.ability.guid);
  if (
    // Jailer
    bossID === 2537
  ) {
    if (difficulty === "Heroic") {
      // Surging Azerite
      damageTakenData.filter((filter) => key.guid === 366408).map((key) => key.guid);
    }
    if (difficulty === "Mythic") {
      // Surging Azerite
      if (logGuids.includes(366408)) {
        console.log(damageTakenData.filter((filter) => filter.ability.guid === 366408).map((key) => key.ability.guid));
      }
    }
  }
}
