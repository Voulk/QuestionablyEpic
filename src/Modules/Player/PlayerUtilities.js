/*
This file contains utility functions that center around the player or players class / spec. 
*/

export function getUnique() {
  return (Math.floor(Math.random() * 3000000) + 1).toString();
}

// This function converts raw log output to a form that's easier to use around the app.
// If you need an extra field that you can easily add it here.
export function convertLogSpellOutput(player, logOutput, fightLength, reportID, bossName) {
  let data = {};
  let totalHealing = 0;
  let totalOverhealing = 0;
  let duration = Math.round((100 * fightLength) / 1000) / 100;
  let fightInfo = {
    hps: 0,
    rawhps: 0,
    fightLength: duration,
    reportID: "",
    bossName: "",
  };

  for (let i = 0; i < logOutput.length; i++) {
    let spell = logOutput[i];
    console.log(logOutput[i]);
    let spellName = spell.name;
    let spellID = spell.guid;
    let casts = "uses" in spell ? spell.uses : 0;
    let hits = "hitCount" in spell ? spell.hitCount : 0;
    let spellHPS = Math.round((spell.total / duration) * 100) / 100;
    let overHealingPerc = "overheal" in spell ? Math.round((100 * spell.overheal) / (spell.overheal + spell.total)) / 100 : 0;

    data[spellID] = { casts: casts, healing: spell.total, hps: spellHPS, overhealing: overHealingPerc, hits: hits };
    totalHealing += logOutput[i].total;
    totalOverhealing += "overheal" in spell ? spell.overheal : 0;
  }

  fightInfo.hps = Math.round(totalHealing / duration);
  fightInfo.rawhps = Math.round((totalHealing + totalOverhealing) / duration);
  fightInfo.reportID = reportID;
  fightInfo.bossName = bossName;

  player.setSpellPattern(data);
  player.setFightInfo(fightInfo);
}

// We could also extract talent information if it was desired.
export function convertLogStatOutput(player, logOutput, id) {
  let data = {};
  let output = logOutput.filter((entry) => entry.id === id[0]);

  if (output.length > 0) {
    let info = output[0].combatantInfo.stats;

    data.intellect = info.Intellect.min;
    data.stamina = info.Stamina.min;
    data.crit = info.Crit.min;
    data.haste = info.Haste.min;
    data.mastery = info.Mastery.min;
    data.versatility = info.Versatility.min;
    data.leech = info.Leech.min;
  }

  player.setActiveStats(data);
}
