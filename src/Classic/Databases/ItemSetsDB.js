
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
    id: 935,
    class: "Priest",
    setBonuses: {
      2: "Priest T11-2", 
      4: "Priest T11-4", 
    },
  },
  {
    id: 1009,
    class: "Priest",
    setBonuses: {
      2: "Priest T12-2", 
      4: "Priest T12-4", 
    },
  },
  {
    id: 1066,
    class: "Priest",
    setBonuses: {
      2: "Priest T13-2", 
      4: "Priest T13-4", 
    },
  },
  // Druid
  {
    id: 928,
    class: "Druid",
    setBonuses: {
      2: "Druid T11-2", 
      4: "Druid T11-4", 
    },
  },
  {
    id: 1004,
    class: "Druid",
    setBonuses: {
      2: "Druid T12-2", 
      4: "Druid T12-4", 
    },
  },
  {
    id: 1060,
    class: "Druid",
    setBonuses: {
      2: "Druid T13-2", 
      4: "Druid T13-4", 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Paladin                                                */
    /* ---------------------------------------------------------------------------------------------- */

    id: 933,
    class: "Paladin",
    setBonuses: {
      2: "Paladin T11-2", 
      4: "Paladin T11-4", 
    },
  },
  {
    id: 1011,
    class: "Paladin",
    setBonuses: {
      2: "Paladin T12-2", 
      4: "Paladin T12-4", 
    },
  },
  {
    id: 1063,
    class: "Paladin",
    setBonuses: {
      2: "Paladin T13-2", 
      4: "Paladin T13-4", 
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
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Generic PVP                                        */
    /* ---------------------------------------------------------------------------------------------- */

    id: 918, // PVP
    class: "Paladin",
    setBonuses: {
      2: "PVP 2pc", 
 
    },
  },
];
