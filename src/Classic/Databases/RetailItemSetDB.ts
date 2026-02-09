

export function getItemSet(id: number, pieces: number, spec: string) {
    let effects: ItemEffect[] = [];
    let temp = itemSets.filter(function (set) {
      return set.id.includes(parseInt(id)) && (set.class === spec || set.class === "All");
    });

    if (temp.length > 0) {
      for (const [bonus, effectID] of Object.entries(temp[0].setBonuses)) {
        //console.log("Getting bonus " + bonus + ". ID: " + effectID + ". Pieces: " + pieces);
        if (pieces >= Number(bonus)) effects.push({type: 'set bonus', name: effectID, class: temp[0].class});
      }
      return effects;
    }
    else return effects;
  }

type ItemSetData = {
  id: number[];
  class: string;
  setBonuses: { [key: number]: string };
} 

export const itemSets: ItemSetData[] = [

  // Season 3
    {
    id: [1988],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Restoration Shaman S1-2", // 
      4: "Restoration Shaman S1-4"  // 
    },
  },
  {
    id: [1986],
    class: "Holy Priest",
    setBonuses: {
      2: "Holy Priest S1-2", // 
      4: "Holy Priest S1-4"  // 
    },
  },
  {
    id: [1986],
    class: "Discipline Priest",
    setBonuses: {
      2: "Discipline Priest S1-2", // 
      4: "Discipline Priest S1-4"  // 
    },
  },
  {
    id: [1984],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Mistweaver Monk S1-2", // 
      4: "Mistweaver Monk S1-4"  // 
    },
  },
  {
    id: [1981],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Preservation Evoker S1-2", // 
      4: "Preservation Evoker S1-4"  // 
    },
  },
  {
    id: [1980],
    class: "Restoration Druid",
    setBonuses: {
      2: "Restoration Druid S1-2", // 
      4: "Restoration Druid S1-4"  // 
    },
  },
  {
    id: [1985],
    class: "Holy Paladin",
    setBonuses: {
      2: "Holy Paladin S1-2", // 
      4: "Holy Paladin S1-4"  // 
    },
  },

]