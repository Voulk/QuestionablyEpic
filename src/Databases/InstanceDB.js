export const instanceDB = {
  "0": "Test Instance",
  "-17": "PVP Season 1 (Conquest)",
  "-16": "PVP Season 1 (Honor)",
  "-1": "Dungeons",
  "1190": "Castle Nathria",
  "1192": "World Bosses",
  "1193": "Sanctum of Domination",
};

export const encounterDB = {
  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Burning Crusade                                        */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------ Karazhan ------------------------------------------ */
  745: {
    name: {
      en: "Karazhan",
      fr: "Karazhan",
      de: "Karazhan",
      ru: "Каражан",
      ch: "卡拉赞",
    },
    bossOrder: [652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 999],

    bosses: {
      // {
      //   name: {
      //     en: "Servant's Quarters",
      //     fr: "Quartiers des serviteurs",
      //     de: "Bedienstetenunterkünfte",
      //     ru: "Комнаты слуг",
      //     ch: "仆役宿舍",
      //   },
      //   id: 1552,
      //   expansion: "Classic",
      // },
      652: {
        name: {
          en: "Attumen the Huntsman",
          fr: "Attumen le Veneur",
          de: "Attumen der Jäger",
          ru: "Ловчий Аттумен",
          ch: "猎手阿图门",
        },
      },
      653: {
        name: {
          en: "Moroes",
          fr: "Moroes",
          de: "Moroes",
          ru: "Мороуз",
          ch: "莫罗斯",
        },
      },
      654: {
        name: {
          en: "Maiden of Virtue",
          fr: "Damoiselle de vertu",
          de: "Tugendhafte Maid",
          ru: "Благочестивая дева",
          ch: "贞节圣女",
        },
      },
      655: {
        name: {
          en: "Opera Hall",
          fr: "L’Opéra",
          de: "Opernsaal",
          ru: "Оперный зал",
          ch: "歌剧院",
        },
      },
      656: {
        name: {
          en: "The Curator",
          fr: "Le Conservateur",
          de: "Der Kurator",
          ru: "Смотритель",
          ch: "馆长",
        },
      },
      657: {
        name: {
          en: "Shade of Aran",
          fr: "Ombre d’Aran",
          de: "Arans Schemen",
          ru: "Тень Арана",
          ch: "埃兰之影",
        },
      },
      658: {
        name: {
          en: "Terestian Illhoof",
          fr: "Terestian Malsabot",
          de: "Terestian Siechhuf",
          ru: "Терестиан Больное Копыто",
          ch: "特雷斯坦·邪蹄",
        },
      },
      659: {
        name: {
          en: "Netherspite",
          fr: "Dédain-du-Néant",
          de: "Nethergroll",
          ru: "Гнев Пустоты",
          ch: "虚空幽龙",
        },
      },
      660: {
        name: {
          en: "Chess Event",
          fr: "Évènement de l’échiquier",
          de: "Das Schachspiel",
          ru: "Шахматы",
          ch: "国际象棋",
        },
      },
      661: {
        name: {
          en: "Prince Malchezaar",
          fr: "Prince Malchezaar",
          de: "Prinz Malchezaar",
          ru: "Принц Малчезар",
          ch: "玛克扎尔王子",
        },
      },
      662: {
        name: {
          en: "Nightbane",
          fr: "",
          de: "",
          ru: "",
          ch: "",
        },
      },
      999: {
        name: {
          en: "BoE Trash Drops",
          fr: "BoE Trash Drops",
          de: "BoE Trash Drops",
          ru: "BoE Trash Drops",
          ch: "BoE Trash Drops",
        },
      },
    },
  },

  /* ---------------------------------------- Gruul's Lair ---------------------------------------- */
  746: {
    name: {
      en: "Gruul & Mag",
      fr: "Repaire de Gruul",
      de: "Gruuls Unterschlupf",
      ru: "Логово Груула",
      ch: "格鲁尔的巢穴",
    },
    bossOrder: [649, 650, 651],
    bosses: {
      649: {
        name: {
          en: "High King Maulgar",
          fr: "Haut Roi Maulgar",
          de: "Hochkönig Maulgar",
          ru: "Король Молгар",
          ch: "莫加尔大王",
        },
      },
      650: {
        name: {
          en: "Gruul the Dragonkiller",
          fr: "Gruul le Tue-Dragon",
          de: "Gruul der Drachenschlächter",
          ru: "Груул Драконобой",
          ch: "屠龙者格鲁尔",
        },
      },
      651: {
        name: {
          en: "Magtheridon",
          fr: "Magtheridon",
          de: "Magtheridon",
          ru: "Магтеридон",
          ch: "玛瑟里顿",
        },
      },
    },
  },

  /* ------------------------------------ Serpentshrine Cavern ------------------------------------ */
  748: {
    name: {
      en: "Serpentshrine",
      fr: "Caverne du sanctuaire du Serpent",
      de: "Höhle des Schlangenschreins",
      ru: "Змеиное святилище",
      ch: "毒蛇神殿",
    },
    bossOrder: [623, 624, 625, 626, 627, 628],
    bosses: {
      623: {
        name: {
          en: "Hydross the Unstable",
          fr: "Hydross l’Instable",
          de: "Hydross der Unstete",
          ru: "Гидросс Нестабильный",
          ch: "不稳定的海度斯",
        },
      },
      624: {
        name: {
          en: "The Lurker Below",
          fr: "Le Rôdeur d’En bas",
          de: "Das Grauen aus der Tiefe",
          ru: "Скрытень из глубин",
          ch: "鱼斯拉",
        },
      },
      625: {
        name: {
          en: "Leotheras the Blind",
          fr: "Leotheras l’Aveugle",
          de: "Leotheras der Blinde",
          ru: "Леотерас Слепец",
          ch: "盲眼者莱欧瑟拉斯",
        },
      },
      626: {
        name: {
          en: "Fathom-Lord Karathress",
          fr: "Seigneur des fonds Karathress",
          de: "Tiefenlord Karathress",
          ru: "Повелитель глубин Каратресс",
          ch: "深水领主卡拉瑟雷斯",
        },
      },
      627: {
        name: {
          en: "Morogrim Tidewalker",
          fr: "Morogrim Marcheur-des-flots",
          de: "Morogrim Gezeitenwandler",
          ru: "Морогрим Волноступ",
          ch: "莫洛格里·踏潮者",
        },
      },
      628: {
        name: {
          en: "Lady Vashj",
          fr: "Dame Vashj",
          de: "Lady Vashj",
          ru: "Леди Вайш",
          ch: "瓦丝琪",
        },
      },
    },
  },

  /* ---------------------------------------- Tempest Keep ---------------------------------------- */
  749: {
    name: {
      en: "Tempest Keep",
      fr: "L’Œil",
      de: "Das Auge",
      ru: "Око",
      ch: "风暴要塞",
    },
    bossOrder: [730, 731, 732, 733],
    bosses: {
      730: {
        name: {
          en: "Al'ar",
          fr: "Al'ar",
          de: "Al'ar",
          ru: "Ал'ар",
          ch: "奥",
        },
      },
      731: {
        name: {
          en: "Void Reaver",
          fr: "Saccageur du Vide",
          de: "Leerhäscher",
          ru: "Страж Бездны",
          ch: "空灵机甲",
        },
      },
      732: {
        name: {
          en: "High Astromancer Solarian",
          fr: "Grande astromancienne Solarian",
          de: "Hochastromantin Solarian",
          ru: "Верховный звездочет Солариан",
          ch: "大星术师索兰莉安",
        },
      },
      733: {
        name: {
          en: "Kael'thas Sunstrider",
          fr: "Kael’thas Haut-Soleil",
          de: "Kael'thas Sonnenwanderer",
          ru: "Кель'тас Солнечный Скиталец",
          ch: "凯尔萨斯·逐日者",
        },
      },
    },
  },

  /* --------------------------------- The Battle for Mount Hyjal --------------------------------- */
  750: {
    name: {
      en: "Mount Hyjal",
      fr: "La bataille du mont Hyjal",
      de: "Die Schlacht um den Hyjal",
      ru: "Битва за гору Хиджал",
      ch: "海加尔山之战",
    },
    bossOrder: [618, 619, 620, 621, 622],
    bosses: {
      618: {
        name: {
          en: "Rage Winterchill",
          fr: "Rage Froidhiver",
          de: "Furor Winterfrost",
          ru: "Лютый Хлад",
          ch: "雷基·冬寒",
        },
      },
      619: {
        name: {
          en: "Anetheron",
          fr: "Anetheron",
          de: "Anetheron",
          ru: "Анетерон",
          ch: "安纳塞隆",
        },
      },
      620: {
        name: {
          en: "Kaz'rogal",
          fr: "Kaz’rogal",
          de: "Kaz'rogal",
          ru: "Каз'рогал",
          ch: "卡兹洛加",
        },
      },
      621: {
        name: {
          en: "Azgalor",
          fr: "Azgalor",
          de: "Azgalor",
          ru: "Азгалор",
          ch: "阿兹加洛",
        },
      },
      622: {
        name: {
          en: "Archimonde",
          fr: "Archimonde",
          de: "Archimonde",
          ru: "Архимонд",
          ch: "阿克蒙德",
        },
      },
    },
  },

  /* ---------------------------------------- Black Temple ---------------------------------------- */
  751: {
    name: {
      en: "Black Temple",
      fr: "Le Temple noir",
      de: "Der Schwarze Tempel",
      ru: "Черный храм",
      ch: "黑暗神殿",
    },
    bossOrder: [601, 602, 603, 604, 605, 606, 607, 608, 609],
    bosses: {
      601: {
        name: {
          en: "High Warlord Naj'entus",
          fr: "Grand seigneur de guerre Naj’entus",
          de: "Oberster Kriegsfürst Naj'entus",
          ru: "Верховный полководец Надж'ентус",
          ch: "高阶督军纳因图斯",
        },
      },
      602: {
        name: {
          en: "Supremus",
          fr: "Supremus",
          de: "Supremus",
          ru: "Супремус",
          ch: "苏普雷姆斯",
        },
      },
      603: {
        name: {
          en: "Shade of Akama",
          fr: "Ombre d’Akama",
          de: "Akamas Schemen",
          ru: "Тень Акамы",
          ch: "阿卡玛之影",
        },
      },
      604: {
        name: {
          en: "Teron Gorefiend",
          fr: "Teron Fielsang",
          de: "Teron Blutschatten",
          ru: "Терон Кровожад",
          ch: "塔隆·血魔",
        },
      },
      605: {
        name: {
          en: "Gurtogg Bloodboil",
          fr: "Gurtogg Fièvresang",
          de: "Gurtogg Siedeblut",
          ru: "Гуртогг Кипящая Кровь",
          ch: "古尔图格·血沸",
        },
      },
      606: {
        name: {
          en: "Reliquary of Souls",
          fr: "Reliquaire des âmes",
          de: "Reliquiar der Seelen",
          ru: "Реликварий душ",
          ch: "灵魂之匣",
        },
      },
      607: {
        name: {
          en: "Mother Shahraz",
          fr: "Mère Shahraz",
          de: "Mutter Shahraz",
          ru: "Матушка Шахраз",
          ch: "莎赫拉丝主母",
        },
      },
      608: {
        name: {
          en: "The Illidari Council",
          fr: "Le conseil illidari",
          de: "Der Rat der Illidari",
          ru: "Совет иллидари",
          ch: "伊利达雷议会",
        },
      },
      609: {
        name: {
          en: "Illidan Stormrage",
          fr: "Illidan Hurlorage",
          de: "Illidan Sturmgrimm",
          ru: "Иллидан Ярость Бури",
          ch: "伊利丹·怒风",
        },
      },
    },
  },
  321: {
    name: {
      en: "Zul'Aman",
      fr: "Zul'Aman",
      de: "Zul'Aman",
      ru: "Zul'Aman",
      ch: "Zul'Aman",
    },
    bossOrder: [1189, 1190, 1191, 1192, 1193, 1194],
    bosses: {
      1189: {
        name: {
          en: "Akil'zon",
          fr: "Akil'zon",
          de: "Akil'zon",
          ru: "Акил'зон",
          ch: "埃基尔松",
        },
      },
      1190: {
        name: {
          en: "Nalorakk",
          fr: "Nalorakk",
          de: "Nalorakk",
          ru: "Налоракк",
          ch: "纳洛拉克",
        },
      },
      1191: {
        name: {
          en: "Jan'alai",
          fr: "Jan'alai",
          de: "Jan'alai",
          ru: "Джан'алай",
          ch: "加亚莱",
        },
      },
      1192: {
        name: {
          en: "Halazzi",
          fr: "Halazzi",
          de: "Halazzi",
          ru: "Халаззи",
          ch: "哈尔拉兹",
        },
      },
      1193: {
        name: {
          en: "Hex Lord Malacrass",
          fr: "Seigneur des maléfices Malacrass",
          de: "Hex Lord Malacrass",
          ru: "Повелитель проклятий Малакрасс",
          ch: "妖术领主玛拉卡斯",
        },
      },
      1194: {
        name: {
          en: "Zul'jin",
          fr: "Zul'jin",
          de: "Zul'jin",
          ru: "Зул'джин",
          ch: "祖尔金",
        },
      },
    },
  },

  /* --------------------------------------- Sunwell Plateau -------------------------------------- */
  752: {
    name: {
      en: "Sunwell Plateau",
      fr: "Plateau du Puits de soleil",
      de: "Sonnenbrunnenplateau",
      ru: "Плато Солнечного Колодца",
      ch: "太阳之井高地",
    },
    bossOrder: [724, 725, 726, 727, 728, 729],
    bosses: {
      724: {
        name: {
          en: "Kalecgos",
          fr: "Kalecgos",
          de: "Kalecgos",
          ru: "Калесгос",
          ch: "卡雷苟斯",
        },
      },
      725: {
        name: {
          en: "Brutallus",
          fr: "Brutallus",
          de: "Brutallus",
          ru: "Бруталл",
          ch: "布鲁塔卢斯",
        },
      },
      726: {
        name: {
          en: "Felmyst",
          fr: "Gangrebrume",
          de: "Teufelsruch",
          ru: "Пророк Скверны",
          ch: "菲米丝",
        },
      },
      727: {
        name: {
          en: "The Eredar Twins",
          fr: "Les jumelles érédars",
          de: "Die Eredarzwillinge",
          ru: "Эредарские близнецы",
          ch: "艾瑞达双子",
        },
      },
      728: {
        name: {
          en: "M'uru",
          fr: "M'uru",
          de: "M'uru",
          ru: "М'ууру",
          ch: "穆鲁",
        },
      },
      729: {
        name: {
          en: "Kil'jaeden",
          fr: "Kil'jaeden",
          de: "Kil'jaeden",
          ru: "Кил'джеден",
          ch: "基尔加丹",
        },
      },
    },
  },

  /* ------------------------------------------ Dungeons ------------------------------------------ */
  123: {
    bossOrder: [248, 256, 259, 260, 261, 262, 250, 247, 252, 253, 258, 257, 254, 251, 255, 249],
    248: {
      name: {
        en: "Hellfire Ramparts",
        fr: "Remparts des Flammes infernales",
        de: "Höllenfeuerbollwerk",
        ru: "Бастионы Адского Пламени",
        ch: "地狱火城墙",
      },
    },
    256: {
      name: {
        en: "The Blood Furnace",
        fr: "La Fournaise du sang",
        de: "Der Blutkessel",
        ru: "Кузня Крови",
        ch: "鲜血熔炉",
      },
    },
    259: {
      name: {
        en: "The Shattered Halls",
        fr: "Les salles Brisées",
        de: "Die Zerschmetterten Hallen",
        ru: "Разрушенные залы",
        ch: "破碎大厅",
      },
    },

    260: {
      name: {
        en: "The Slave Pens",
        fr: "Les enclos aux esclaves",
        de: "Die Sklavenunterkünfte",
        ru: "Узилище",
        ch: "奴隶围栏",
      },
    },
    261: {
      name: {
        en: "The Steamvault",
        fr: "Le caveau de la Vapeur",
        de: "Die Dampfkammer",
        ru: "Паровое подземелье",
        ch: "蒸汽地窟",
      },
    },
    262: {
      name: {
        en: "The Underbog",
        fr: "La Basse-tourbière",
        de: "Der Tiefensumpf",
        ru: "Нижетопь",
        ch: "幽暗沼泽",
      },
    },

    250: {
      name: {
        en: "Mana-Tombs",
        fr: "Tombes-mana",
        de: "Managruft",
        ru: "Гробницы маны",
        ch: "法力陵墓",
      },
    },
    247: {
      name: {
        en: "Auchenai Crypts",
        fr: "Cryptes Auchenaï",
        de: "Auchenaikrypta",
        ru: "Аукенайские гробницы",
        ch: "奥金尼地穴",
      },
    },
    252: {
      name: {
        en: "Sethekk Halls",
        fr: "Les salles des Sethekk",
        de: "Sethekkhallen",
        ru: "Сетеккские залы",
        ch: "塞泰克大厅",
      },
    },
    253: {
      name: {
        en: "Shadow Labyrinth",
        fr: "Labyrinthe des Ombres",
        de: "Schattenlabyrinth",
        ru: "Темный лабиринт",
        ch: "暗影迷宫",
      },
    },

    258: {
      name: {
        en: "The Mechanar",
        fr: "Le Méchanar",
        de: "Die Mechanar",
        ru: "Механар",
        ch: "能源舰",
      },
    },
    257: {
      name: {
        en: "The Botanica",
        fr: "La Botanica",
        de: "Die Botanika",
        ru: "Ботаника",
        ch: "生态船",
      },
    },
    254: {
      name: {
        en: "The Arcatraz",
        fr: "L’Arcatraz",
        de: "Die Arkatraz",
        ru: "Аркатрац",
        ch: "禁魔监狱",
      },
    },

    251: {
      name: {
        en: "Old Hillsbrad Foothills",
        fr: "Contreforts de Hautebrande d’antan",
        de: "Vorgebirge des Alten Hügellands",
        ru: "Старые предгорья Хилсбрада",
        ch: "旧希尔斯布莱德丘陵",
      },
    },
    255: {
      name: {
        en: "The Black Morass",
        fr: "Le Noir marécage",
        de: "Der Schwarze Morast",
        ru: "Черные топи",
        ch: "黑色沼泽",
      },
    },
    249: {
      name: {
        en: "Magister's Terrace",
        fr: "Terrasse des Magistères",
        de: "Terrasse der Magister",
        ru: "Терраса Магистров",
        ch: "魔导师平台",
      },
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Shadowlands                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* --------------------------------------- Castle Nathria --------------------------------------- */
  1190: {
    name: {
      en: "",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    bossOrder: [2393, 2429, 2422, 2418, 2428, 2420, 2426, 2394, 2425, 2424, 999],
    bosses: {
      2393: {
        name: {
          en: "Shriekwing",
          fr: "Hurlaile",
          de: "Schrillschwinge",
          ru: "Визгунья",
          ch: "啸翼",
        },
      },
      2429: {
        name: {
          en: "Huntsman Altimor",
          fr: "Altimor le Veneur",
          de: "Jäger Altimor",
          ru: "Ловчий Альтимор",
          ch: "猎手阿尔迪莫",
        },
      },
      2422: {
        name: {
          en: "Sun King's Salvation",
          fr: "Salut du roi-soleil",
          de: "Rettung des Sonnenkönigs",
          ru: "Спасение Солнечного короля",
          ch: "太阳之王的救赎",
        },
      },
      2418: {
        name: {
          en: "Artificer Xy'mox",
          fr: "Artificier Xy’mox",
          de: "Konstrukteur Xy'mox",
          ru: "Изобретатель Зи'Мокс",
          ch: "圣物匠赛·墨克斯",
        },
      },
      2428: {
        name: {
          en: "Hungering Destroyer",
          fr: "Destructeur affamé",
          de: "Hungernder Zerstörer",
          ru: "Алчущий разрушитель",
          ch: "饥饿的毁灭者",
        },
      },
      2420: {
        name: {
          en: "Lady Inerva Darkvein",
          fr: "Dame Inerva Sombreveine",
          de: "Lady Inerva Dunkelader",
          ru: "Леди Инерва Дарквейн",
          ch: "伊涅瓦·暗脉女勋爵",
        },
      },
      2426: {
        name: {
          en: "The Council of Blood",
          fr: "Le conseil du Sang",
          de: "Der Rat des Blutes",
          ru: "Совет Крови",
          ch: "猩红议会",
        },
      },
      2394: {
        name: {
          en: "Sludgefist",
          fr: "Fangepoing",
          de: "Schlickfaust",
          ru: "Грязешмяк",
          ch: "泥拳",
        },
      },
      2425: {
        name: {
          en: "Stone Legion Generals",
          fr: "Généraux de la Légion de pierre",
          de: "Generäle der Steinlegion",
          ru: "Генералы Каменного легиона",
          ch: "顽石军团干将",
        },
      },
      2424: {
        name: {
          en: "Sire Denathrius",
          fr: "Sire Denathrius",
          de: "Graf Denathrius",
          ru: "Сир Денатрий",
          ch: "德纳修斯大帝",
        },
      },
      999: {
        name: {
          en: "BoE Trash Drops",
          fr: "BoE Trash Drops",
          de: "BoE Trash Drops",
          ru: "BoE Trash Drops",
          ch: "BoE Trash Drops",
        },
      },
    },
  },

  /* ---------------------------------------- World Bosses ---------------------------------------- */
  1192: {
    bossOrder: [2468, 2456, 2430, 2431, 2432, 2433],
    2468: {
      name: {
        en: "Antros",
        fr: "Antros",
        de: "Antros",
        ru: "Антрос",
        ch: "安特洛斯",
      },
    },
    2456: {
      name: {
        en: "Mor'geth",
        fr: "Mor'geth",
        de: "Mor'geth",
        ru: "Мор'гет",
        ch: "Mor'geth",
      },
    },
    2430: {
      name: {
        en: "Valinor",
        fr: "Valinor",
        de: "Valinor",
        ru: "Валинор",
        ch: "Valinor",
      },
    },
    2431: {
      name: {
        en: "Mortanis",
        fr: "Mortanis",
        de: "Mortanis",
        ru: "Мортанис",
        ch: "Mortanis",
      },
    },
    2432: {
      name: {
        en: "Oranomonos",
        fr: "Oranomonos",
        de: "Oranomonos",
        ru: "Ораномонос",
        ch: "长青之枝",
      },
    },
    2433: {
      name: {
        en: "Nurgash",
        fr: "Nurgash",
        de: "Nurgash",
        ru: "Нургаш",
        ch: "诺尔伽什",
      },
    },
  },

  /* ------------------------------------ Sanctum of Domination ----------------------------------- */
  1193: {
    name: {
      en: "",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    bossOrder: [2435, 2442, 2439, 2444, 2445, 2443, 2446, 2447, 2440, 2441, 998],
    bosses: {
      2435: {
        name: {
          en: "The Tarragrue",
          fr: "Le Naphtrémens",
          de: "Der Tarragrue",
          ru: "Таррагр",
          ch: "希尔瓦娜斯·风行者",
        },
      },
      2442: {
        name: {
          en: "The Eye of the Jailer",
          fr: "L’œil du Geôlier",
          de: "Das Auge des Kerkermeisters",
          ru: "Око Тюремщика",
          ch: "典狱长之眼",
        },
      },
      2439: {
        name: {
          en: "The Nine",
          fr: "Les Neuf",
          de: "Die Neun",
          ru: "Девять",
          ch: "九武神",
        },
      },
      2444: {
        name: {
          en: "Remnant of Ner'zhul",
          fr: "Vestige de Ner'zhul",
          de: "Überrest von Ner'zhul",
          ru: "Останки Нер'зула",
          ch: "耐奥祖的残迹",
        },
      },
      2445: {
        name: {
          en: "Soulrender Dormazain",
          fr: "Étripeur d’âme Dormazain",
          de: "Seelenfetzer Dormazain",
          ru: "Раздиратель душ Дормацайн",
          ch: "裂魂者多尔玛赞",
        },
      },
      2443: {
        name: {
          en: "Painsmith Raznal",
          fr: "Mal-ferrant Raznal",
          de: "Leidensschmied Raznal",
          ru: "Кузнец боли Разнал",
          ch: "痛楚工匠莱兹纳尔",
        },
      },
      2446: {
        name: {
          en: "Guardian of the First Ones",
          fr: "Gardien des Fondateurs",
          de: "Wächter der Ersten",
          ru: "Стражница Предвечных",
          ch: "初诞者的卫士",
        },
      },
      2447: {
        name: {
          en: "Fatescribe Roh-Kalo",
          fr: "Fatescribe Roh-Kalo",
          de: "Fatescribe Roh-Kalo",
          ru: "Fatescribe Roh-Kalo",
          ch: "Fatescribe Roh-Kalo",
        },
      },
      2440: {
        name: {
          en: "Kel'Thuzad",
          fr: "Kel'Thuzad",
          de: "Kel'Thuzad",
          ru: "Кел'Тузад",
          ch: "克尔苏加德",
        },
      },
      2441: {
        name: {
          en: "Sylvanas Windrunner",
          fr: "Sylvanas Coursevent",
          de: "Sylvanas Windläufer",
          ru: "Сильвана Ветрокрылая",
          ch: "希尔瓦娜斯·风行者",
        },
      },
      998: {
        name: {
          en: "BoE Trash Drops",
          fr: "BoE Trash Drops",
          de: "BoE Trash Drops",
          ru: "BoE Trash Drops",
          ch: "BoE Trash Drops",
        },
      },
    },
  },
  /* --------------------------------- Sepulcher of the First Ones -------------------------------- */
  1195: {
    name: {
      en: "Sepulcher of the First Ones",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    bossOrder: [2458, 2465, 2470, 2460, 2459, 2461, 2463, 2469, 2457, 2467, 2464, 999],
    bosses: {
      2458: {
        name: {
          en: "Vigilant Guardian",
          fr: "Gardien vigilant",
          de: "Aufmerksamer Wächter",
          ru: "Бдительный страж",
          ch: "警戒卫士",
        },
      },
      2465: {
        name: {
          en: "Skolex, the Insatiable Ravener",
          fr: "Skolex, l’Insatiable vorace",
          de: "Skolex, der unersättliche Räuber",
          ru: "Сколекс, Ненасытный разоритель",
          ch: "司垢莱克斯，无穷噬灭者",
        },
      },
      2470: {
        name: {
          en: "Artificer Xy'mox",
          fr: "Artificier Xy’mox",
          de: "Konstrukteur Xy'mox",
          ru: "Изобретатель Зи'мокс",
          ch: "圣物匠赛·墨克斯",
        },
      },
      2460: {
        name: {
          en: "Prototype Pantheon",
          fr: "Panthéon des prototypes",
          de: "Prototypenpantheon",
          ru: "Прототип пантеона",
          ch: "死亡万神殿原型体",
        },
      },
      2459: {
        name: {
          en: "Dausegne, the Fallen Oracle",
          fr: "Dausegne, l’Oracle déchu",
          de: "Dausegne, das gefallene Orakel",
          ru: "Падший оракул Даусинь",
          ch: "道茜歌妮，堕落先知",
        },
      },
      2461: {
        name: {
          en: "Lihuvim, Principle Architect",
          fr: "Lihuvim, architecte principal",
          de: "Lihuvim, der oberste Architekt",
          ru: "Главный архитектор Лихувим",
          ch: "首席造物师利许威姆",
        },
      },
      2463: {
        name: {
          en: "Halondrus the Reclaimer",
          fr: "Halondrus le Récupérateur",
          de: "Halondrus der Rückgewinner",
          ru: "Галондрий Возвращающий",
          ch: "回收者黑伦度斯",
        },
      },
      2469: {
        name: {
          en: "Anduin Wrynn",
          fr: "Anduin Wrynn",
          de: "Anduin Wrynn",
          ru: "Андуин Ринн",
          ch: "安度因·乌瑞恩",
        },
      },
      2457: {
        name: {
          en: "Lords of Dread",
          fr: "Seigneurs de l’effroi",
          de: "Lords des Schreckens",
          ru: "Властители Ужаса",
          ch: "恐惧双王",
        },
      },
      2467: {
        name: {
          en: "Rygelon",
          fr: "Rygelon",
          de: "Rygelon",
          ru: "Ригелон",
          ch: "莱葛隆",
        },
      },
      2464: {
        name: {
          en: "The Jailer",
          fr: "Zovaal, le Geôlier",
          de: "Zovaal, der Kerkermeister",
          ru: "Тюремщик Зоваал",
          ch: "典狱长佐瓦尔",
        },
      },
      999: {
        name: {
          en: "BoE Trash Drops",
          fr: "BoE Trash Drops",
          de: "BoE Trash Drops",
          ru: "BoE Trash Drops",
          ch: "BoE Trash Drops",
        },
      },
    },
  },
  /* ------------------------------------------ Dungeons ------------------------------------------ */
  "-1": {
    bossOrder: [
      // 1182, // "Necrotic Wake"
      // 1183, // "Plaguefall"
      // 1184, // "Mists of Tirna Scithe"
      // 1185, // "Halls of Atonement"
      // 1186, // "Spires of Ascension"
      // 1187, // "Theater of Pain"
      // 1188, // "De Other Side"
      // 1189, // "Sanguine Depths"
      // 1194, // Tazavesh
      -20, // Tazavesh
      -21, // Tazavesh 2

      -14, // Mechagon Junkyard
      -15, // Mechagon Workshop

      -26, // Karazhan Lower
      -27, // Karazhan Upper


      536, // Grimrail Depot
      558, // Iron Docks
    ],
    1182: {
      name: {
        en: "Necrotic Wake",
        fr: "Sillage nécrotique",
        de: "Die Nekrotische Schneise",
        ru: "Смертельная тризна",
        ch: "",
      },
    },
    1183: {
      name: {
        en: "Plaguefall",
        fr: "Malepeste",
        de: "Seuchensturz",
        ru: "Чумные каскады",
        ch: "",
      },
    },
    1184: {
      name: {
        en: "Mists of Tirna Scithe",
        fr: "Die Nebel von Tirna Scithe",
        de: "Die Nebel von Tirna Scithe",
        ru: "Туманы Тирна Скитта",
        ch: "",
      },
    },
    1185: {
      name: {
        en: "Halls of Atonement",
        fr: "Salles de l’Expiation",
        de: "Hallen der Sühne",
        ru: "Чертоги Покаяния",
        ch: "",
      },
    },
    1186: {
      name: {
        en: "Spires of Ascension",
        fr: "Flèches de l’Ascension",
        de: "Spitzen des Aufstiegs",
        ru: "Шпили Перерождения",
        ch: "",
      },
    },
    1187: {
      name: {
        en: "Theater of Pain",
        fr: "Théâtre de la Souffrance",
        de: "Theater der Schmerzen",
        ru: "Театр Боли",
        ch: "",
      },
    },
    1188: {
      name: {
        en: "De Other Side",
        fr: "L’Autre côté",
        de: "Die Andre Seite",
        ru: "Та Сторона",
        ch: "",
      },
    },
    1189: {
      name: {
        en: "Sanguine Depths",
        fr: "Profondeurs Sanguines",
        de: "Die Blutigen Tiefen",
        ru: "Кровавые катакомбы",
        ch: "",
      },
    },
    1194: {
      name: {
        en: "Tazavesh",
        fr: "Tazavesh",
        de: "Tazavesh",
        ru: "Tazavesh",
        ch: "Tazavesh",
      },
    },
    "-20": {
      name: {
        en: "Tazavesh",
        fr: "Tazavesh",
        de: "Tazavesh",
        ru: "Tazavesh",
        ch: "Tazavesh",
      },
    },
    "-21": {
      name: {
        en: "Tazavesh 2",
        fr: "Tazavesh 2",
        de: "Tazavesh 2",
        ru: "Tazavesh 2",
        ch: "Tazavesh 2",
      },
    },
    "-14": {
      name: {
        en: "Mechagon Lower",
        fr: "Mechagon Lower",
        de: "Mechagon Lower",
        ru: "Mechagon Lower",
        ch: "Mechagon Lower",
      },
    },
    "-15": {
      name: {
        en: "Mechagon Upper",
        fr: "Mechagon Upper",
        de: "Mechagon Upper",
        ru: "Mechagon Upper",
        ch: "Mechagon Upper",
      },
    },
    "-26": {
      name: {
        en: "Return to Karazahn Lower",
        fr: "Return to Karazahn Lower",
        de: "Return to Karazahn Lower",
        ru: "Return to Karazahn Lower",
        ch: "Return to Karazahn Lower",
      },
    },
    "-27": {
      name: {
        en: "Return to Karazahn Upper",
        fr: "Return to Karazahn Upper",
        de: "Return to Karazahn Upper",
        ru: "Return to Karazahn Upper",
        ch: "Return to Karazahn Upper",
      },
    },
    536: {
      name: {
        en: "Grimrail Depot",
        fr: "Grimrail Depot",
        de: "Grimrail Depot",
        ru: "Grimrail Depot",
        ch: "Grimrail Depot",
      },
    },
    558: {
      name: {
        en: "Iron Docks",
        fr: "Iron Docks",
        de: "Iron Docks",
        ru: "Iron Docks",
        ch: "Iron Docks",
      },
    },
  },
  /* ---------------------------------- Tazavesh, The Vieled City --------------------------------- */
  1194: {
    bossOrder: [2437, 2454, 2436, 2452, 2451, 2448, 2449, 2455],
    2437: {
      name: {
        en: "Zo'phex the Sentinel",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2454: {
      name: {
        en: "The Grand Menagerie",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2436: {
      name: {
        en: "Mailroom Mayhem",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2452: {
      name: {
        en: "Myza's Oasis",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2451: {
      name: {
        en: "So'azmi",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2448: {
      name: {
        en: "Hylbrande",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2449: {
      name: {
        en: "Timecap'n Hooktail",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
    2455: {
      name: {
        en: "So'leah",
        fr: "",
        de: "",
        ru: "",
        ch: "",
      },
    },
  },

  /* --------------------------------------------- PVP -------------------------------------------- */
  2: [-17, -16],
  /* ------------------------------------- Legion Timewalking ------------------------------------- */
  3: {
    bossOrder: [707, 716, 740, 762, 767, 800],
    707: {
      name: {
        en: "Vault of the Wardens",
        fr: "Caveau des Gardiennes",
        de: "Das Verlies der Wächterinnen",
        ru: "Казематы Стражей",
        ch: "守望者地窟",
      },
    },
    716: {
      name: {
        en: "Eye of Azshara",
        fr: "L’Œil d’Azshara",
        de: "Das Auge Azsharas",
        ru: "Око Азшары",
        ch: "艾萨拉之眼",
      },
    },
    740: {
      name: {
        en: "Black Rook Hold",
        fr: "Bastion du Freux",
        de: "Die Rabenwehr",
        ru: "Крепость Черной Ладьи",
        ch: "黑鸦堡垒",
      },
    },
    762: {
      name: {
        en: "Darkheart Thicket",
        fr: "Fourré Sombrecœur",
        de: "Das Finsterherzdickicht",
        ru: "Чаща Темного Сердца",
        ch: "黑心林地",
      },
    },
    767: {
      name: {
        en: "Neltharion's Lair",
        fr: "Repaire de Neltharion",
        de: "Neltharions Hort",
        ru: "Логово Нелтариона",
        ch: "奈萨里奥的巢穴",
      },
    },
    800: {
      name: {
        en: "Court of Stars",
        fr: "our des Étoiles",
        de: "Der Hof der Sterne",
        ru: "Квартал Звезд",
        ch: "群星庭院",
      },
    },
  },
};
