export const raidDB = [
  {
    ID: 2657,
    raidID: 1273,
    name: {
      en: "Nerub-ar Palace",
      fr: "Palais des Nérub’ar",
      de: "Palast der Nerub'ar",
      ru: "Неруб'арский дворец",
      ch: "尼鲁巴尔王宫",
    },
    expansion: 10,
    icon: require("Images/inv_achievement_raid_nerubar.jpg"),
  },
];

export const bossList = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Vault of the Incarnates                                    */
  /* ---------------------------------------------------------------------------------------------- */

  {
    DungeonEncounterID: 2902,
    ID: 2607,
    name: {
      en: "Ulgrax the Devourer",
      fr: "Ulgrax le Dévoreur",
      de: "Ulgrax der Verschlinger",
      ru: "Улгракс Пожиратель",
      ch: "噬灭者乌格拉克斯",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_nerubianhulk.jpg"),
  },
  {
    DungeonEncounterID: 2898,
    ID: 2599,
    name: {
      en: "Sikran, Captain of the Sureki",
      fr: "Sikran, capitaine des Surekis",
      de: "Sikran, Hauptmann der Sureki",
      ru: "Капитан суреки Сик'ран",
      ch: "苏雷吉队长席克兰",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_nerubianevolved.jpg"),
  },
  {
    DungeonEncounterID: 2917,
    ID: 2611,
    name: {
      en: "The Bloodbound Horror",
      fr: "L’horreur liée par le sang",
      de: "Der blutgebundene Schrecken",
      ru: "Скованный кровью ужас",
      ch: "血缚恐魔",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_blackblood.jpg"),
  },
  {
    DungeonEncounterID: 2918,
    ID: 2609,
    name: {
      en: "Rasha'nan",
      fr: "Rasha’nan",
      de: "Rasha'nan",
      ru: "Раша'нан",
      ch: "拉夏南",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_flyingnerubianevolved.jpg"),
  },
  {
    DungeonEncounterID: 2919,
    ID: 2612,
    name: {
      en: "Broodtwister Ovi'nax",
      fr: "Toressaim Ovi’nax",
      de: "Brutverderber Ovi'nax",
      ru: "Исказитель яиц Ови'накс",
      ch: "虫巢扭曲者欧维纳克斯",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_swarmmother.jpg"),
  },
  {
    DungeonEncounterID: 2920,
    ID: 2601,
    name: {
      en: "Nexus-Princess Ky'veza",
      fr: "Princesse-nexus Ky’veza",
      de: "Nexusprinzessin Ky'veza",
      ru: "Принцесса Нексуса Ки'веза",
      ch: "节点女亲王凯威扎",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_etherealassasin.jpg"),
  },
  {
    DungeonEncounterID: 2921,
    ID: 2608,
    name: {
      en: "The Silken Court",
      fr: "La cour Soyeuse",
      de: "Der Seidenhof",
      ru: "Шелковый двор",
      ch: "流丝之庭",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_council.jpg"),
  },
  {
    DungeonEncounterID: 2922,
    ID: 2602,
    name: {
      en: "Queen Ansurek",
      fr: "Reine Ansurek",
      de: "Königin Ansurek",
      ru: "Королева Ансурек",
      ch: "安苏雷克女王",
    },
    zoneID: 2657,
    icon: require("Images/Bosses/NerubarPalace/inv_achievement_raidnerubian_queenansurek.jpg"),
  },
];

export const getBossName = (encounterID, lang) => {
  const boss = bossList.find((boss) => boss.DungeonEncounterID === encounterID);
  if (boss) {
    return boss.name[lang];
  }
  return null;
};
