export const raidDB = [
  {
    ID: 2522,
    raidID: 1200,
    name: {
      en: "Vault of the Incarnates",
      fr: "Caveau des Incarnations",
      de: "Gewölbe der Inkarnationen",
      ru: "Хранилище Воплощений",
      ch: "化身巨龙牢窟",
    },
    expansion: 9,
    icon: require("Images/achievement_raidprimalist_raid.jpg"),
  },
  {
    ID: 2569,
    raidID: 1208,
    name: {
      en: "Aberrus, the Shadowed Crucible",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    expansion: 9,
    icon: require("Images/inv_achievement_raidemeralddream_raid.jpg"),
  },
  {
    ID: 2549,
    raidID: 1207,
    name: {
      en: "Amirdrassil, the Dream's Hope",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    expansion: 9,
    icon: require("Images/inv_achievement_raidemeralddream_raid.jpg"),
  },
];

export const bossList = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Vault of the Incarnates                                    */
  /* ---------------------------------------------------------------------------------------------- */

  {
    DungeonEncounterID: 2587,
    ID: 2480,
    name: {
      en: "Eranog",
      fr: "Éranog",
      de: "Eranog",
      ru: "Эраног",
      ch: "艾拉诺格",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_eranog.jpg"),
  },

  {
    DungeonEncounterID: 2639,
    ID: 2500,
    name: {
      en: "Terros",
      fr: "Terros",
      de: "Terros",
      ru: "Террос",
      ch: "泰洛斯",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_terros.jpg"),
  },

  {
    DungeonEncounterID: 2590,
    ID: 2486,
    name: {
      en: "The Primalist Council",
      fr: "Le Conseil primaliste",
      de: "Der Primalistenrat",
      ru: "Совет воинов стихий",
      ch: "拜荒者议会",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_council.jpg"),
  },

  {
    DungeonEncounterID: 2592,
    ID: 2482,
    name: {
      en: "Sennarth, The Cold Breath",
      fr: "Sennarth, la Glaciale",
      de: "Sennarth, der kalte Atem",
      ru: "Сеннарт Дыхание Льда",
      ch: "瑟娜尔丝，冰冷之息",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_sennarth.jpg"),
  },

  {
    DungeonEncounterID: 2635,
    ID: 2502,
    name: {
      en: "Dathea, Ascended",
      fr: "Dathéa, transcendée",
      de: "Dathea, die Aufgestiegene",
      ru: "Дафия Перерожденная",
      ch: "晋升者达瑟雅",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_windelemental.jpg"),
  },

  {
    DungeonEncounterID: 2605,
    ID: 2491,
    name: {
      en: "Kurog Grimtotem",
      fr: "Kurog Totem-Sinistre",
      de: "Kurog Grimmtotem",
      ru: "Курог Зловещий Тотем",
      ch: "库洛格·恐怖图腾",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_kurog.jpg"),
  },

  {
    DungeonEncounterID: 2614,
    ID: 2493,
    name: {
      en: "Broodkeeper Diurna",
      fr: "Garde-couvée Diurna",
      de: "Bruthüterin Diurna",
      ru: "Хранительница стаи Денна",
      ch: "巢穴守护者迪乌尔娜",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_diurna.jpg"),
  },

  {
    DungeonEncounterID: 2607,
    ID: 2499,
    name: {
      en: "Raszageth the Storm-Eater",
      fr: "Raszageth la Mange-tempêtes",
      de: "Raszageth die Sturmfresserin",
      ru: "Рашагет Пожирательница Бурь",
      ch: "莱萨杰丝，噬雷之龙",
    },
    zoneID: 2522,
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_raszageth.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Aberrus, the Shadowed Crucible                                 */
  /* ---------------------------------------------------------------------------------------------- */
  {
    DungeonEncounterID: 2688,
    ID: 2522,
    name: {
      en: "Kazzara, the Hellforged",
      cn: "狱铸者卡扎拉",
      de: "Kazzara, die Höllengeschmiedete",
      fr: "Kazzara, née des enfers",
      ru: "Каззара из Преисподней",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_kazzara.jpg"),
  },
  {
    DungeonEncounterID: 2687,
    ID: 2529,
    name: {
      en: "The Amalgamation Chamber",
      cn: "融合体密室",
      de: "Die Verschmelzungskammer",
      fr: "Chambre de fusion",
      ru: "Чертог слияния",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_amalgamationchamber.jpg"),
  },
  {
    DungeonEncounterID: 2693,
    ID: 2530,
    name: {
      en: "The Forgotten Experiments",
      cn: "被遗忘的实验体",
      de: "Die vergessenen Experimente",
      fr: "Les expériences oubliées",
      ru: "Забытые эксперименты",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_forgottenexperiments.jpg"),
  },
  {
    DungeonEncounterID: 2682,
    ID: 2524,
    name: {
      en: "Assault of the Zaqali",
      cn: "扎卡利突袭",
      de: "Angriff der Zaqali",
      fr: "Assaut des Zaqalis",
      ru: "Нападение закали",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_zaqaliassault.jpg"),
  },
  {
    DungeonEncounterID: 2680,
    ID: 2525,
    name: {
      en: "Rashok, the Elder",
      cn: "莱修克，长老",
      de: "Ältester Rashok",
      fr: "Rashok, l’Ancien",
      ru: "Рашок Древний",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_rashok.jpg"),
  },
  {
    DungeonEncounterID: 2689,
    ID: 2532,
    name: {
      en: "The Vigilant Steward, Zskarn",
      cn: "警戒管事兹斯卡恩",
      de: "Der aufmerksame Verwalter, Zskarn",
      fr: "Zskarn, l’Intendant vigilant",
      ru: "Бдительный распорядитель Шкарн",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_zskarn.jpg"),
  },
  {
    DungeonEncounterID: 2683,
    ID: 2527,
    name: {
      en: "Magmorax",
      cn: "玛格莫莱克斯",
      de: "Magmorax",
      fr: "Magmorax",
      ru: "Магморакс",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_magmorax.jpg"),
  },
  {
    DungeonEncounterID: 2684,
    ID: 2523,
    name: {
      en: "Echo of Neltharion",
      cn: "奈萨里奥的回响",
      de: "Echo von Neltharion",
      fr: "Écho de Neltharion",
      ru: "Эхо Нелтариона",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_neltharion.jpg"),
  },
  {
    DungeonEncounterID: 2685,
    ID: 2520,
    name: {
      en: "Scalecommander Sarkareth",
      cn: "鳞长萨卡雷斯",
      de: "Schuppenkommandant Sarkareth",
      fr: "Squammandant Sarkareth",
      ru: "Дракомандир Саркарет",
    },
    zoneID: 2569,
    icon: require("Images/Bosses/Aberrus/inv_achievement_raiddragon_sarkareth.jpg"),
  },
  /* -------------------------------------------------------------------------- */
  /*                        Amirdrassil, the Dream's Hope                       */
  /* -------------------------------------------------------------------------- */

  {
    DungeonEncounterID: 2820,
    ID: 2564,
    name: {
      en: "Gnarlroot",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_fieryancient.jpg"),
  },
  {
    DungeonEncounterID: 2709,
    ID: 2554,
    name: {
      en: "Igira the Cruel",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_igira-the-cruel.jpg"),
  },
  {
    DungeonEncounterID: 2737,
    ID: 2557,
    name: {
      en: "Volcoross",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_lavaserpent.jpg"),
  },
  {
    DungeonEncounterID: 2728,
    ID: 2555,
    name: {
      en: "Council of Dreams",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_dreamcouncil.jpg"),
  },
  {
    DungeonEncounterID: 2731,
    ID: 2553,
    name: {
      en: "Larodar, Keeper of the Flame",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_keeperoftheflames.jpg"),
  },
  {
    DungeonEncounterID: 2708,
    ID: 2556,
    name: {
      en: "Nymue, Weaver of the Cycle",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_dreamweaver.jpg"),
  },
  {
    DungeonEncounterID: 2824,
    ID: 2563,
    name: {
      en: "Smolderon",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_smolderon.jpg"),
  },
  {
    DungeonEncounterID: 2786,
    ID: 2565,
    name: {
      en: "Tindral Sageswift, Seer of the Flame",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_druidoftheflame.jpg"),
  },
  {
    DungeonEncounterID: 2677,
    ID: 2519,
    name: {
      en: "Fyrakk the Blazing",
      cn: "",
      de: "",
      fr: "",
      ru: "",
    },
    zoneID: 2549,
    icon: require("Images/Bosses/Amirdrassil/inv_achievement_raidemeralddream_fyrakk.jpg"),
  },
];

export const getBossName = (encounterID, lang) => {
  const boss = bossList.find((boss) => boss.DungeonEncounterID === encounterID);
  if (boss) {
    return boss.name[lang];
  }
  return null;
};
