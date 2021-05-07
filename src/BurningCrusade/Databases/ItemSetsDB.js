export const itemSets = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Battlecast Garb                                        */
  /* ---------------------------------------------------------------------------------------------- */

  {
    name: "Battlecast Garb",
    wowheadLink: "https://tbc.wowhead.com/item-set=572/battlecast-garb",
    type: "Cloth",
    class: -1,
    slots: {
      head: { id: 24267, name: "Battlecast Hood", icon: "inv_helmet_70" },
      shoulder: { id: -1, icon: -1 },
      chest: { id: -1, icon: -1 },
      wrist: { id: -1, icon: -1 },
      hands: { id: -1, icon: -1 },
      waist: { id: -1, icon: -1 },
      legs: { id: 24263, name: "Battlecast Pants", icon: "inv_pants_cloth_12" },
      boots: { id: -1, icon: -1 },
    },
    twoSet: "Increases the chance spell pushback and spell interrupt will be resisted by 5%.",
    fourSet: -1,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Mooncloth Battlegear                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: "Mooncloth Battlegear",
    wowheadLink: "https://tbc.wowhead.com/item-set=739/mooncloth-battlegear",
    type: "Cloth",
    class: "Priest",
    slots: {
      head: { id: 35333, name: "Mooncloth Cowl", icon: "inv_helmet_30" },
      shoulder: { id: 35336, name: "Mooncloth Shoulderpads", icon: "inv_shoulder_02" },
      chest: { id: 35337, name: "Mooncloth Vestments", icon: "inv_chest_cloth_43" },
      wrist: { id: -1, icon: -1 },
      hands: { id: 35335, name: "Mooncloth Mitts", icon: "inv_gauntlets_15" },
      waist: { id: -1, icon: -1 },
      legs: { id: 35334, name: "Mooncloth Legguards", icon: "inv_pants_cloth_05" },
      boots: { id: -1, icon: -1 },
    },
    twoSet: "+35 Resilience Rating.",
    fourSet: "Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   High Warlord's Investiture                                   */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: "High Warlord's Investiture",
    wowheadLink: "https://tbc.wowhead.com/item-set=692/high-warlords-investiture",
    type: "Cloth",
    class: "Priest",
    slots: {
      head: { id: 31626, name: "High Warlord's Mooncloth Cowl", icon: "inv_helmet_30" },
      shoulder: { id: 31628, name: "High Warlord's Mooncloth Shoulderpads", icon: "inv_shoulder_02" },
      chest: { id: 31629, name: "High Warlord's Mooncloth Vestments", icon: "inv_chest_cloth_43" },
      wrist: { id: -1, icon: -1 },
      hands: { id: 31621, name: "High Warlord's Mooncloth Mitts", icon: "inv_gauntlets_15" },
      waist: { id: -1, icon: -1 },
      legs: { id: 31627, name: "High Warlord's Mooncloth Legguards", icon: "inv_pants_cloth_05" },
      boots: { id: -1, icon: -1 },
    },
    twoSet: "+35 Resilience Rating.",
    fourSet: "Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Hallowed Raiment                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: "Hallowed Raiment",
    wowheadLink: "https://tbc.wowhead.com/item-set=662/hallowed-raiment",
    type: "Cloth",
    class: "Priest", // ???
    slots: {
      head: { id: 28413, name: "Hallowed Crown", icon: "inv_jewelry_ring_62" },
      shoulder: { id: 27775, name: "Hallowed Pauldrons", icon: "inv_shoulder_22" },
      chest: { id: 28230, name: "Hallowed Garments", icon: "inv_chest_cloth_39" },
      wrist: { id: -1, icon: -1 },
      hands: { id: 27536, name: "Hallowed Handwraps", icon: "inv_gauntlets_27" },
      waist: { id: -1, icon: -1 },
      legs: { id: 27875, name: "Hallowed Trousers", icon: "inv_pants_cloth_18" },
      boots: { id: -1, icon: -1 },
    },
    twoSet: "Gives you a 30% chance to avoid interruption caused by damage while casting Binding Heal.",
    fourSet: "Your Prayer of Mending heals an additional 100 health.",
  },
];
