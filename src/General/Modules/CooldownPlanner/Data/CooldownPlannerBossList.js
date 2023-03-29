export const raidDB = [
  {
    ID: 2296,
    raidID: 1190,
    name: {
      en: "Castle Nathria",
      cn: "纳斯利亚堡",
      fr: "Château Nathria",
      ru: "Замок Нафрия",
      de: "Schloss Nathria",
    },
    icon: require("Images/achievement_raid_revendrethraid_castlenathria.jpg").default,
    expansion: 8,
  },
  {
    ID: 2450,
    raidID: 1193,
    name: {
      en: "Sanctum of Domination",
      cn: "统御圣所",
      fr: "Sanctum de Domination",
      ru: "Святилище Господства",
      de: "Sanktum der Herrschaft",
    },
    expansion: 8,
    icon: require("Images/achievement_raid_torghastraid.jpg").default,
  },
  {
    ID: 2481,
    raidID: 1195,
    name: {
      en: "Sepulcher of the First Ones",
      cn: "初诞者圣墓",
      fr: "Sépulcre des Fondateurs",
      ru: "Гробница Предвечных",
      de: "Mausoleum der Ersten",
    },
    expansion: 8,
    icon: require("Images/inv_achievement_raid_progenitorraid.jpg").default,
  },
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
    icon: require("Images/achievement_raidprimalist_raid.jpg").default,
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
    icon: require("Images/achievement_raidprimalist_raid.jpg").default,
  },
];

export const bossList = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Castle Nathria                                         */
  /* ---------------------------------------------------------------------------------------------- */

  {
    DungeonEncounterID: 2398,
    ID: 2393,
    name: "",
    name: {
      en: "Shriekwing",
      cn: "[Shriekwing]",
      fr: "Hurlaile",
      ru: "Визгунья",
      de: "Schrillschwinge",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/ShriekwingIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2418,
    ID: 2429,
    name: {
      en: "Huntsman Altimor",
      cn: "猎手阿尔迪莫",
      fr: "Altimor le Veneur",
      ru: "Ловчий Альтимор",
      de: "Jäger Altimor",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/HuntsmanAltimorIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2402,
    ID: 2422,
    name: {
      en: "Sun King's Salvation",
      cn: "太阳之王的救赎",
      fr: "Salut du roi-soleil",
      ru: "Спасение Солнечного короля",
      de: "Rettung des Sonnenkönigs",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/KaelthasSunstriderIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2405,
    ID: 2418,
    name: {
      en: "Artificer Xy'mox",
      cn: "圣物匠赛·墨克斯",
      fr: "Artificier Xy'mox",
      ru: "Изобретатель Зи'Мокс",
      de: "Konstrukteur Xy'mox",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/ArtificerIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2383,
    ID: 2428,
    name: {
      en: "Hungering Destroyer",
      cn: "饥饿的毁灭者",
      fr: "Destructeur affamé",
      ru: "Алчущий разрушитель",
      de: "Hungernder Zerstörer",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/HungeringDestroyerIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2406,
    ID: 2420,
    name: {
      en: "Lady Inerva Darkvein",
      cn: "伊涅瓦·暗脉女勋爵",
      fr: "Dame Inerva Sombreveine",
      ru: "Леди Инерва Дарквейн",
      de: "Lady Inerva Dunkelader",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/LadyInervaDarkveinIcons.jpg").default,
  },
  {
    DungeonEncounterID: 2412,
    ID: 2426,
    name: {
      en: "The Council of Blood",
      cn: "猩红议会",
      fr: "Le conseil du Sang",
      ru: "Совет Крови",
      de: "Der Rat des Blutes",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/TheCouncilOfBloodIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2399,
    ID: 2394,
    name: {
      en: "Sludgefist",
      cn: "泥拳",
      fr: "Fangepoing",
      ru: "Грязешмяк",
      de: "Schlickfaust",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/SludgefistIcon.jpg").default,
  },
  {
    DungeonEncounterID: 2417,
    ID: 2425,
    name: {
      en: "Stone Legion Generals",
      cn: "顽石军团干将",
      fr: "Généraux de la Légion de pierre",
      ru: "Генералы Каменного легиона",
      de: "Generäle der Steinlegion",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/StonebornGeneralsIcons.jpg").default,
  },
  {
    DungeonEncounterID: 2407,
    ID: 2424,
    name: {
      en: "Sire Denathrius",
      cn: "德纳修斯大帝",
      fr: "Sire Denathrius",
      ru: "Сир Денатрий",
      de: "Graf Denathrius",
    },
    zoneID: 2296,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/SireDenathriusIcon.jpg").default,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Sanctum of Domination                                     */
  /* ---------------------------------------------------------------------------------------------- */

  {
    DungeonEncounterID: 2423,
    ID: 2435,
    name: {
      en: "The Tarragrue",
      cn: "希尔瓦娜斯·风行者",
      fr: "Le Naphtrémens",
      ru: "Таррагр",
      de: "Der Tarragrue",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/achievement_raid_torghast_tarragrue.jpg").default,
  },
  {
    DungeonEncounterID: 2433,
    ID: 2442,
    name: {
      en: "The Eye of the Jailer",
      cn: "典狱长之眼",
      fr: "L’œil du Geôlier",
      ru: "Око Тюремщика",
      de: "Das Auge des Kerkermeisters",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/achievement_raid_torghast_theeyeofthejailer.jpg").default,
  },
  {
    DungeonEncounterID: 2429,
    ID: 2439,
    name: {
      en: "The Nine",
      cn: "九武神",
      fr: "Les Neuf",
      ru: "Девять",
      de: "Die Neun",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/achievement_raid_torghast_thenine.jpg").default,
  },
  {
    DungeonEncounterID: 2432,
    ID: 2444,
    name: {
      en: "Remnant of Ner'zhul",
      cn: "耐奥祖的残迹",
      fr: "Vestige de Ner'zhul",
      ru: "Останки Нер'зула",
      de: "Überrest von Ner'zhul",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/Icons/achievement_raid_torghast_shadowscourge_prisonofnerzhul.jpg").default,
  },
  {
    DungeonEncounterID: 2434,
    ID: 2445,
    name: {
      en: "Soulrender Dormazain",
      cn: "裂魂者多尔玛赞",
      fr: "Étripeur d’âme Dormazain",
      ru: "Раздиратель душ Дормацайн",
      de: "Seelenfetzer Dormazain",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/SoulrenderDormazain/Icons/achievement_raid_torghast_soulrenderdormazain.jpg").default,
  },
  {
    DungeonEncounterID: 2430,
    ID: 2443,
    name: {
      en: "Painsmith Raznal",
      cn: "痛楚工匠莱兹纳尔",
      fr: "Mal-ferrant Raznal",
      ru: "Кузнец боли Разнал",
      de: "Leidensschmied Raznal",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/PainsmithRaznal/Icons/achievement_raid_torghast_painsmithraznal.jpg").default,
  },
  {
    DungeonEncounterID: 2436,
    ID: 2446,
    name: {
      en: "Guardian of the First Ones",
      cn: "初诞者的卫士",
      fr: "Gardien des Fondateurs",
      ru: "Стражница Предвечных",
      de: "Wächter der Ersten",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/Icons/achievement_raid_torghast_guardianofthefirstones.jpg").default,
  },
  {
    DungeonEncounterID: 2431,
    ID: 2447,
    name: {
      en: "Fatescribe Roh-Kalo",
      cn: "Fatescribe Roh-Kalo",
      fr: "Fatescribe Roh-Kalo",
      ru: "Fatescribe Roh-Kalo",
      de: "Fatescribe Roh-Kalo",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/FatescribeRohKalo/Icons/achievement_raid_torghast_fatescriberoh-talo.jpg").default,
  },
  {
    DungeonEncounterID: 2422,
    ID: 2440,
    name: {
      en: "Kel'Thuzad",
      cn: "克尔苏加德",
      fr: "Kel'Thuzad",
      ru: "Кел'Тузад",
      de: "Kel'Thuzad",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/Kelthuzad/Icons/achievement_raid_torghast_kel-thuzad.jpg").default,
  },
  {
    DungeonEncounterID: 2435,
    ID: 2441,
    name: {
      en: "Sylvanas Windrunner",
      cn: "希尔瓦娜斯·风行者",
      fr: "Sylvanas Coursevent",
      ru: "Сильвана Ветрокрылая",
      de: "Sylvanas Windläufer",
    },
    zoneID: 2450,
    icon: require("Images/Bosses/SanctumOfDomination/SylvanusWindrunner/Icons/achievement_raid_torghast_sylvanaswindrunner.jpg").default,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */

  {
    DungeonEncounterID: 2512,
    ID: 2458,
    name: {
      en: "Vigilant Guardian",
      cn: "警戒卫士",
      fr: "Gardien vigilant",
      ru: "Бдительный страж",
      de: "Aufmerksamer Wächter",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_progenitor_defensewall_boss.jpg").default,
  },
  {
    DungeonEncounterID: 2542,
    ID: 2465,
    name: {
      en: "Skolex, the Insatiable Ravener",
      cn: "司垢莱克斯，无穷噬灭者",
      fr: "Skolex, l’Insatiable vorace",
      ru: "Сколекс, Ненасытный разоритель",
      de: "Skolex, der unersättliche Räuber",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_progenium_devourer_worm.jpg").default,
  },
  {
    DungeonEncounterID: 2553,
    ID: 2470,
    name: {
      en: "Artificer Xy'mox",
      cn: "圣物匠赛·墨克斯",
      fr: "Artificier Xy’mox",
      ru: "Изобретатель Зи'мокс",
      de: "Konstrukteur Xy'mox",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_broker_incursion.jpg").default,
  },
  {
    DungeonEncounterID: 2540,
    ID: 2459,
    name: {
      en: "Dausegne, the Fallen Oracle",
      cn: "道茜歌妮，堕落先知",
      fr: "Dausegne, l’Oracle déchu",
      ru: "Падший оракул Даусинь",
      de: "Dausegne, das gefallene Orakel",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_dominated_progenitor_bot.jpg").default,
  },
  {
    DungeonEncounterID: 2544,
    ID: 2460,
    name: {
      en: "Prototype Pantheon",
      cn: "死亡万神殿原型体",
      fr: "Panthéon des prototypes",
      ru: "Прототип пантеона",
      de: "Prototypenpantheon",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_proto_primus.jpg").default,
  },
  {
    DungeonEncounterID: 2539,
    ID: 2461,
    name: {
      en: "Lihuvim, Principal Architect",
      cn: "首席造物师利许威姆",
      fr: "Lihuvim, architecte principal",
      ru: "Главный архитектор Лихувим",
      de: "Lihuvim, der oberste Architekt",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_terrestrial_keeper.jpg").default,
  },
  {
    DungeonEncounterID: 2529,
    ID: 2463,
    name: {
      en: "Halondrus the Reclaimer",
      cn: "回收者黑伦度斯",
      fr: "Halondrus le Récupérateur",
      ru: "Галондрий Возвращающий",
      de: "Halondrus der Rückgewinner",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_progenium_keeper.jpg").default,
  },
  {
    DungeonEncounterID: 2546,
    ID: 2469,
    name: {
      en: "Anduin Wrynn",
      cn: "安度因·乌瑞恩",
      fr: "Anduin Wrynn",
      ru: "Андуин Ринн",
      de: "Anduin Wrynn",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_anduin.jpg").default,
  },
  {
    DungeonEncounterID: 2543,
    ID: 2457,
    name: {
      en: "Lords of Dread",
      cn: "恐惧双王",
      fr: "Seigneurs de l’effroi",
      ru: "Властители Ужаса",
      de: "Lords des Schreckens",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_dreadlord_duo.jpg").default,
  },
  {
    DungeonEncounterID: 2549,
    ID: 2467,
    name: {
      en: "Rygelon",
      cn: "莱葛隆",
      fr: "Rygelon",
      ru: "Ригелон",
      de: "Rygelon",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_dominated_constellar.jpg").default,
  },
  {
    DungeonEncounterID: 2537,
    ID: 2464,
    name: {
      en: "The Jailer, Zovaal",
      cn: "典狱长佐瓦尔",
      fr: "Zovaal, le Geôlier",
      ru: "Тюремщик Зоваал",
      de: "Zovaal, der Kerkermeister",
    },
    zoneID: 2481,
    icon: require("Images/Bosses/SepulcherOfTheFirstOnes/Icons/inv_achievement_raid_progenitorraid_jailer.jpg").default,
  },

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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_eranog.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_terros.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_council.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_sennarth.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_windelemental.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_kurog.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_diurna.jpg").default,
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
    icon: require("Images/Bosses/VaultOfTheIncarnates/achievement_raidprimalist_raszageth.jpg").default,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Aberrus, the Shadowed Crucible                                 */
  /* ---------------------------------------------------------------------------------------------- */
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
    icon: require("").default,
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
    icon: require("").default,
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
    icon: require("").default,
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
    icon: require("").default,
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
    icon: require("").default,
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
    icon: require("").default,
  },
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
    icon: require("").default,
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
    icon: require("").default,
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
    icon: require("").default,
  },
  {
    DungeonEncounterID: 2696,
    ID: 2531,
    name: {
      en: "The Zaqali Elders",
      cn: "扎卡利长老",
      de: "Die Ältesten der Zaqali",
      fr: "Les Anciens zaqalis",
      ru: "Старейшины закали",
    },
    zoneID: 2569,
    icon: require("").default,
  },
];

export const getBossName = (encounterID, lang) => {
  const boss = bossList.find((boss) => boss.DungeonEncounterID === encounterID);
  if (boss) {
    return boss.name[lang];
  }
  return null;
};
