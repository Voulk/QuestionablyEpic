
export function getItemSet(id, pieces) {
  let effects = [];
  let temp = itemSets.filter(function (set) {
    return set.id === parseInt(id);
  });
  if (temp.length > 0) {
    for (const [bonus, effectid] of Object.entries(temp[0].setBonuses)) {
      //console.log("Getting bonuss" + bonus + ". ID: " + effectid + ". Pieces: " + pieces);
      if (pieces >= bonus) effects.push(effectid);//{type: 'set bonus', name: effectid, class: temp[0].class});
    }
    return effects;
  }
  else return "";
}

export const itemSets = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Druid T11                                        */
    /* ---------------------------------------------------------------------------------------------- */

    id: 928,
    class: "Druid",
    setBonuses: {
      2: "Druid T11-2", 
      4: "Druid T11-4", 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Generic PVP                                        */
    /* ---------------------------------------------------------------------------------------------- */

    id: 923, // PVP
    class: "Druid",
    setBonuses: {
      2: "PVP 2pc", 
      4: "PVP 2pc", 
    },
  },
];
