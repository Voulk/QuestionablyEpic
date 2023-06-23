// Returns Array of Healer Information replaces importHealerLogData in functions
async function convertHealers(data) {
  console.log(data);
  let healers = [];
  const monkData = Object.keys(data.monkData.data.entries)
    .filter((key) => data.monkData.data.entries[key].icon === "Monk-Mistweaver")
    .map((key) => data.monkData.data.entries[key]);
  const paladinData = Object.keys(data.paladinData.data.entries)
    .filter((key) => data.paladinData.data.entries[key].icon === "Paladin-Holy")
    .map((key) => data.paladinData.data.entries[key]);
  const druidData = Object.keys(data.druidData.data.entries)
    .filter((key) => data.druidData.data.entries[key].icon === "Druid-Restoration")
    .map((key) => data.druidData.data.entries[key]);
  const priestData = Object.keys(data.priestData.data.entries).map((key) => data.priestData.data.entries[key]);
  const shamanData = Object.keys(data.shamanData.data.entries)
    .filter((key) => data.shamanData.data.entries[key].icon === "Shaman-Restoration")
    .map((key) => data.shamanData.data.entries[key]);
  const warriorData = Object.keys(data.warriorData.data.entries).map((key) => data.warriorData.data.entries[key]);
  const demonHunterData = Object.keys(data.demonHunterData.data.entries).map((key) => data.demonHunterData.data.entries[key]);
  const deathKnightData = Object.keys(data.deathKnightData.data.entries).map((key) => data.deathKnightData.data.entries[key]);
  const evokerData = Object.keys(data.evokerData.data.entries).map((key) => data.evokerData.data.entries[key]);

  healers = healers.concat(monkData, paladinData, druidData, priestData, shamanData, warriorData, demonHunterData, deathKnightData, evokerData);

  return healers;
}

export default convertHealers;
