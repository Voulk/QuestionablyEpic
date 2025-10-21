

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
    id: [1929],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Shaman S3-2", // 
      4: "Shaman S3-4"  // 
    },
  },
  {
    id: [1927],
    class: "Holy Priest",
    setBonuses: {
      2: "HPriest S3-2", // 
      4: "HPriest S3-4"  // 
    },
  },
  {
    id: [1927],
    class: "Discipline Priest",
    setBonuses: {
      2: "DPriest S3-2", // 
      4: "DPriest S3-4"  // 
    },
  },
  {
    id: [1925],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Monk S3-2", // 
      4: "Monk S3-4"  // 
    },
  },
  {
    id: [1922],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Evoker S3-2", // 
      4: "Evoker S3-4"  // 
    },
  },
  {
    id: [1921],
    class: "Restoration Druid",
    setBonuses: {
      2: "Druid S3-2", // 
      4: "Druid S3-4"  // 
    },
  },
  {
    id: [1926],
    class: "Holy Paladin",
    setBonuses: {
      2: "Paladin S3-2", // 
      4: "Paladin S3-4"  // 
    },
  },

  // Season 2
  {
    id: [1877],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Shaman S2-2", // 
      4: "Shaman S2-4"  // 
    },
  },
  {
    id: [1875],
    class: "Holy Priest",
    setBonuses: {
      2: "HPriest S2-2", // 
      4: "HPriest S2-4"  // 
    },
  },
  {
    id: [1875],
    class: "Discipline Priest",
    setBonuses: {
      2: "DPriest S2-2", // 
      4: "DPriest S2-4"  // 
    },
  },
  {
    id: [1873],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Monk S2-2", // 
      4: "Monk S2-4"  // 
    },
  },
  {
    id: [1870],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Evoker S2-2", // 
      4: "Evoker S2-4"  // 
    },
  },
  {
    id: [1869],
    class: "Restoration Druid",
    setBonuses: {
      2: "Druid S2-2", // 
      4: "Druid S2-4"  // 
    },
  },
  {
    id: [1874],
    class: "Holy Paladin",
    setBonuses: {
      2: "Paladin S2-2", // 
      4: "Paladin S2-4"  // 
    },
  },
  {
    // Blackrock Depths Healing Set.
    id: [1834],
    class: "All",
    setBonuses: {
      2: "Lingering Grace", // 
    },
  },
  {
    // The War within Season 1
    id: [1694],
    class: "Restoration Druid",
    setBonuses: {
      2: "Druid S1-2", // 
      4: "Druid S1-4"  // 
    },
  },
  {
    id: [1688],
    class: "Holy Priest",
    setBonuses: {
      2: "HPriest S1-2", // 
      4: "HPriest S1-4"  // 
    },
  },
  {
    id: [1688],
    class: "Discipline Priest",
    setBonuses: {
      2: "DPriest S1-2", // 
      4: "DPriest S1-4"  // 
    },
  },
  {
    id: [1686],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Shaman S1-2", // 
      4: "Shaman S1-4"  // 
    },
  },
  {
    id: [1690],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Monk S1-2", // 
      4: "Monk S1-4"  // 
    },
  },
  {
    id: [1689],
    class: "Holy Paladin",
    setBonuses: {
      2: "Paladin S1-2", // 
      4: "Paladin S1-4"  // 
    },
  },
  {
    id: [1693],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Evoker S1-2", // 
      4: "Evoker S1-4"  // 
    },
  },

  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                (Druid T31)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1559, 1597],
    class: "Restoration Druid",
    setBonuses: {
      2: "Druid T31-2", // 
      4: "Druid T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Shaman T31                                               */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1567],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Shaman T31-2", // 
      4: "Shaman T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Mistweaver T31                                               */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1563, 1596],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Monk T31-2", // 
      4: "Monk T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Evoker T31                                               */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1560],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Evoker T31-2", // 
      4: "Evoker T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Priest T31                                               */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1565, 1599],
    class: "Holy Priest",
    setBonuses: {
      2: "HPriest T31-2", // 
      4: "HPriest T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Priest T31                                               */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1565, 1599],
    class: "Discipline Priest",
    setBonuses: {
      2: "DPriest T31-2", // 
      4: "DPriest T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Paladin T31                                               */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1564],
    class: "Holy Paladin",
    setBonuses: {
      2: "Paladin T31-2", // 
      4: "Paladin T31-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Druid T30)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1542],
    class: "Restoration Druid",
    setBonuses: {
      2: "Druid T30-2", // 
      4: "Druid T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Cinderwolf - Shaman T30                                          */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1550],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Shaman T30-2", // 
      4: "Shaman T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Priest T30)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1548],
    class: "Discipline Priest",
    setBonuses: {
      2: "DPriest T30-2", // 
      4: "DPriest T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Priest T30)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1543],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Evoker T30-2", // 
      4: "Evoker T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Priest T30)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1547, 1598],
    class: "Holy Paladin",
    setBonuses: {
      2: "Paladin T30-2", // 
      4: "Paladin T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Priest T30)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1546],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Monk T30-2", // 
      4: "Monk T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Priest T30)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1548],
    class: "Holy Priest",
    setBonuses: {
      2: "HPriest T30-2", // 
      4: "HPriest T30-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Draconic Hierophant's                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1534],
    class: "Holy Priest",
    setBonuses: {
      2: "HPriest T29-2", // 
      4: "HPriest T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Draconic Hierophant's                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1534],
    class: "Discipline Priest",
    setBonuses: {
      2: "DPriest T29-2", // 
      4: "DPriest T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lost Landcaller's (Druid T29)                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1528],
    class: "Restoration Druid",
    setBonuses: {
      2: "Druid T29-2", // 
      4: "Druid T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                              Virtuous Silver Paladin T29                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1533],
    class: "Holy Paladin",
    setBonuses: {
      2: "Paladin T29-2", // 
      4: "Paladin T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Waking Fist - Monk T29                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1532],
    class: "Mistweaver Monk",
    setBonuses: {
      2: "Mistweaver T29-2", // 
      4: "Mistweaver T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 The Awakened - Evoker T29                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1530, 1594],
    class: "Preservation Evoker",
    setBonuses: {
      2: "Evoker T29-2", // 
      4: "Evoker T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Infused Earth - Shaman T29                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1536, 1606],
    class: "Restoration Shaman",
    setBonuses: {
      2: "Shaman T29-2", // 
      4: "Shaman T29-4"  // 
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Drakebreaker's Vestments                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1511, 1512, 1513, 1514], // 1513 (Leather), 1514 (Plate), 1512 (Mail), 1511 (Cloth)
    class: "All",
    setBonuses: {
      2: "Drakebreaker's Versatility", // +5% Essence Font Healing, +2s HoT duration
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Shroud of Raging Tempests                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    id: [1523, 1521, 1524, 1525], // 1523 (Leather), 1525 (Plate), 1524 (Mail), 1521 (Cloth)
    class: "All",
    setBonuses: {
      2: "Primal Storms 2pc", // +5% Essence Font Healing, +2s HoT duration
    },
  },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                 Grand Upwelling (Monk T28)                                     */
      /* ---------------------------------------------------------------------------------------------- */
      // 
      id: [1504],
      class: "Mistweaver Monk",
      setBonuses: {
        2: "Mistweaver T28-2", // +5% Essence Font Healing, +2s HoT duration
        4: "Mistweaver T28-4"  // TFT creates a rune that adds flat healing to all healing events while inside. Lasts 10s.
      },
    },
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                    Fixed Stars (Druid T28)                                     */
        /* ---------------------------------------------------------------------------------------------- */
        // 
        id: [1502],
        class: "Restoration Druid",
        setBonuses: {
          2: "Druid T28-2", // 
          4: "Druid T28-4"  // 
        },
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                           Luminous Chevalier (Paladin T28)                                     */
        /* ---------------------------------------------------------------------------------------------- */
        // 
        id: [1498],
        class: "Holy Paladin",
        setBonuses: {
          2: "Paladin T28-2", // 
          4: "Paladin T28-4"  // 
        },
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                     Empyrean (Priest T28)                                      */
        /* ---------------------------------------------------------------------------------------------- */
        // 
        id: [1505],
        class: "Holy Priest",
        setBonuses: {
          2: "HPriest T28-2", // 
          4: "HPriest T28-4"  // 
        },
      },
      {
        id: [1505],
        class: "Discipline Priest",
        setBonuses: {
          2: "DPriest T28-2", // 
          4: "DPriest T28-4"  // 
        },
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                            Theurgic Starspeaker (Shaman T28)                                   */
        /* ---------------------------------------------------------------------------------------------- */
        // 
        id: [1499],
        class: "Restoration Shaman",
        setBonuses: {
          2: "Shaman T28-2", // 
          4: "Shaman T28-4"  // 
        },
      },


]