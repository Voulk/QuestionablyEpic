
export function getItemSet(id: number, pieces: number) {
  let effects = [];
  let temp = itemSets.filter(function (set) {
    return set.id === id;
  });
  if (temp.length > 0) {
    for (const [bonus, effectid] of Object.entries(temp[0].setBonuses)) {
      //console.log("Getting bonuss" + bonus + ". ID: " + effectid + ". Pieces: " + pieces);
      if (pieces >= Number(bonus)) effects.push(effectid);//{type: 'set bonus', name: effectid, class: temp[0].class});
    }
    return effects;
  }
  else return "";
}

type ItemSetData = {
  id: number;
  class: string;
  setBonuses: { [key: number]: string };
} 

export const itemSets: ItemSetData[] = [

  {
    id: 1125,
    class: "Druid",
    setBonuses: {
      2: "Druid T14-2", 
      4: "Druid T14-4", 
    },
  },
  {
    id: 1131,
    class: "Monk",
    setBonuses: {
      2: "Monk T14-2", 
      4: "Monk T14-4", 
    },
  },
  {
    id: 1134,
    class: "Paladin",
    setBonuses: {
      2: "Paladin T14-2", 
      4: "Paladin T14-4", 
    },
  },
  {
    id: 1137,
    class: "Priest",
    setBonuses: {
      2: "Priest T14-2", 
      4: "Priest T14-4", 
    },
  },
  {
    id: 1140,
    class: "Shaman",
    setBonuses: {
      2: "Shaman T14-2", 
      4: "Shaman T14-4", 
    },
  },

  // Cataclysm
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
    /*                                               All PVP                                          */
    /* ---------------------------------------------------------------------------------------------- */

    id: 923, // PVP
    class: "Druid",
    setBonuses: {
      2: "PVP 2pc", 
    },
  },
  {
    id: 918, // PVP
    class: "Paladin",
    setBonuses: {
      2: "PVP 2pc", 

    },
  },
];
