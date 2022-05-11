// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.

export default function createEvents(bossID, damageTakenData) {
  if (
    // Jailer
    bossID === 123
  ) {
    damageTakenData.map((key) => key.guid);
  }
}
