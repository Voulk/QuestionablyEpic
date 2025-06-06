// This array is a list of gem objects that represent different types of gems.
// Each gem object has the following properties:

// id: a unique identifier for the gem
// quality: the quality level of the gem (1, 2, or 3
// rarity: the rarity of the gem ("normal", "rare", or "epic"
// ilvl: the item level of the gem
// name: an object containing the gem's name in various languages
// icon: an image file representing the gem
// stats: an object containing the gem's stat bonuses

export const gemDB = [
  {
    id: 71850,
    rarity: "epic",
    name: {
      en: "Reckless Lava Coral",
    },
    icon: "inv_misc_epicgem_04",
    stats: { intellect: 25, haste: 25 },
  },
  {
    id: 71868,
    rarity: "epic",
    name: {
      en: "Purified Shadow Spinel",
    },
    icon: "inv_misc_epicgem_05",
    stats: { intellect: 25, spirit: 25 },
  },
  {
    id: 71881,
    rarity: "epic",
    name: {
      en: "Brilliant Queen's Garnet",
    },
    icon: "inv_misc_epicgem_01",
    stats: { intellect: 50 },
  },
  {
    id: 59480,
    rarity: "epic",
    name: {
      en: "Fractured Cogwheel",
    },
    icon: "inv_misc_enggizmos_30",
    stats: { mastery: 208 },
  },
  {
    id: 59479,
    rarity: "epic",
    name: {
      en: "Quick Cogwheel",
    },
    icon: "inv_misc_enggizmos_30",
    stats: { haste: 208 },
  },
  {
    id: 59496,
    rarity: "epic",
    name: {
      en: "Sparkling Cogwheel",
    },
    icon: "inv_misc_enggizmos_30",
    stats: { spirit: 208 },
  },
  {
    id: 52236,
    rarity: "rare",
    name: {
      en: "Purified Demonseye",
    },
    icon: "inv_misc_cutgemsuperior3",
    stats: { intellect: 20, spirit: 20 },
  },
  {
    id: 52296,
    rarity: "rare",
    name: {
      en: "Ember Shadowspirit Diamond",
    },
    icon: "inv_misc_metagem_b",
    stats: { intellect: 54 },
  },
  {
    id: 52207,
    rarity: "rare",
    name: {
      en: "Brilliant Inferno Ruby",
    },
    icon: "inv_misc_cutgemsuperior6",
    stats: { intellect: 40 },
  },
  {
    id: 52208,
    rarity: "rare",
    name: {
      en: "Reckless Ember Topaz",
    },
    icon: "inv_misc_cutgemsuperior4",
    stats: { intellect: 20, haste: 20 },
  },
  {
    id: 192932,
    element: "Fire",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Radiant Malygite",
      de: "Strahlender Malygit",
      fr: "Malygite étincelante",
      ru: "Светозарный малигит",
      cn: "辐光玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_blue",
    stats: { crit: 33, versatility: 70 },
  },

  // The War Within Gems
  {
    id: 213488,
    element: "Emerald",
    name: "Quick Emerald",
    icon: "inv_jewelcrafting_cut-standart-gem_color2",
    stats: { haste: 176 },
  },
  {
    id: 213482,
    element: "Emerald",
    name: "Masterful Emerald",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color1_3",
    stats: { haste: 147, mastery: 49 },
  },
  {
    id: 213479,
    element: "Emerald",
    name: "Deadly Emerald",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color1_2",
    stats: { haste: 147, crit: 49 },
  },
  {
    id: 213485,
    element: "Emerald",
    name: "Versatile Emerald",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color1_1",
    stats: { haste: 147, versatility: 49 },
  },
  {
    id: 213494,
    element: "Onyx",
    name: "Quick Onyx",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color2_3",
    stats: { mastery: 147, haste: 49 },
  },
  {
    id: 213491,
    element: "Onyx",
    name: "Deadly Onyx",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color2_2",
    stats: { mastery: 147, crit: 49 },
  },
  {
    id: 213497,
    element: "Onyx",
    name: "Versatile Onyx",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color2_1",
    stats: { mastery: 147, versatility: 49 },
  },
  {
    id: 213500,
    element: "Onyx",
    name: "Masterful Onyx",
    icon: "inv_jewelcrafting_cut-standart-gem_color1",
    stats: { mastery: 176 },
  },
  {
    id: 213458,
    element: "Ruby",
    name: "Masterful Ruby",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color4_1",
    stats: { crit: 147, mastery: 49 },
  },
  {
    id: 213455,
    element: "Ruby",
    name: "Quick Ruby",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color4_3",
    stats: { crit: 147, haste: 49 },
  },
  {
    id: 213461,
    element: "Ruby",
    name: "Versatile Ruby",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color4_2",
    stats: { crit: 147, versatility: 49 },
  },
  {
    id: 213464,
    element: "Ruby",
    name: "Deadly Ruby",
    icon: "inv_jewelcrafting_cut-standart-gem_color5",
    stats: { crit: 176 },
  },
  {
    id: 213470,
    element: "Sapphire",
    name: "Quick Sapphire",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color5_3",
    stats: { versatility: 147, haste: 49 },
  },
  {
    id: 213473,
    element: "Sapphire",
    name: "Masterful Sapphire",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color5_1",
    stats: { versatility: 147, mastery: 49 },
  },
  {
    id: 213467,
    element: "Sapphire",
    name: "Deadly Sapphire",
    icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color5_2",
    stats: { versatility: 147, crit: 49 },
  },
  {
    id: 213476,
    element: "Sapphire",
    name: "Versatile Sapphire",
    icon: "inv_jewelcrafting_cut-standart-gem_color3",
    stats: { versatility: 176 },
  },
  {
    id: 213743,
    element: "Meta",
    name: "Culminating Blasphemite",
    icon: "item_cutmetagemb",
    stats: { intellect: 181 },
  },
  {
    id: 213746,
    element: "Meta",
    name: "Elusive Blasphemite",
    icon: "inv_misc_gem_x4_metagem_cut",
    stats: { intellect: 181 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Energized Malygite                                       */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192935,
    element: "Air",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Energized Malygite",
      de: "Geladener Malygit",
      fr: "Malygite énergisée",
      ru: "Усиленный малигит",
      cn: "活跃玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_blue",
    stats: { haste: 33, versatility: 70 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Zen Malygite                                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192938,
    element: "Earth",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Zen Malygite",
      de: "Meditativer Malygit",
      fr: "Malygite zen",
      ru: "Дзен-малигит",
      cn: "禅悟之玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_blue",
    stats: { mastery: 33, versatility: 70 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Stormy Malygite                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192942,
    element: "Frost",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Stormy Malygite",
      de: "Stürmischer Malygit",
      fr: "Malygite orageuse",
      ru: "Грозовой малигит",
      cn: "风暴玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_blue",
    stats: { versatility: 88 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Sensei's Neltharite                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192958,
    element: "Fire",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Sensei's Neltharite",
      de: "Neltharit des Mentors",
      fr: "Neltharite de sensei",
      ru: "Нелтарит сенсея",
      cn: "导师的奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_black",
    stats: { mastery: 70, crit: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Keen Neltharite                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192961,
    element: "Air",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Keen Neltharite",
      de: "Schneidender Neltharit",
      fr: "Neltharite effilée",
      ru: "Острый нелтарит",
      cn: "狂热奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_black",
    stats: { mastery: 70, haste: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Zen Neltharite                                         */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192964,
    element: "Frost",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Zen Neltharite",
      de: "Meditativer Neltharit",
      fr: "Neltharite zen",
      ru: "Дзен-нелтарит",
      cn: "禅悟之奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_black",
    stats: { mastery: 70, versatility: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Fractured Neltharite                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192967,
    element: "Earth",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Fractured Neltharite",
      de: "Rissiger Neltharit",
      fr: "Neltharite fracturée",
      ru: "Растрескавшийся нелтарит",
      cn: "断裂奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_black",
    stats: { mastery: 88 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Crafty Ysemerald                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192945,
    element: "Fire",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Crafty Ysemerald",
      de: "Listiger Ysmaragd",
      fr: "Ysémeraude ingénieuse",
      ru: "Коварный изерилл",
      cn: "诡诈伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_green",
    stats: { haste: 70, crit: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Keen Ysemerald                                         */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192948,
    element: "Earth",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Keen Ysemerald",
      de: "Schneidender Ysmaragd",
      fr: "Ysémeraude effilée",
      ru: "Острый изерилл",
      cn: "狂热伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_green",
    stats: { haste: 70, mastery: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Energized Ysemerald                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192952,
    element: "Frost",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Energized Ysemerald",
      de: "Geladener Ysmaragd",
      fr: "Ysémeraude énergisée",
      ru: "Усиленный изерилл",
      cn: "活跃伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_green",
    stats: { haste: 70, versatility: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Quick Ysemerald                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192955,
    element: "Air",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Quick Ysemerald",
      de: "Spiegelnder Ysmaragd",
      fr: "Ysémeraude véloce",
      ru: "Мягкий изерилл",
      cn: "迅捷伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_green",
    stats: { haste: 88 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Crafty Alexstraszite                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192919,
    element: "Air",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Crafty Alexstraszite",
      de: "Listiger Alexstraszit",
      fr: "Alexstraszite ingénieuse",
      ru: "Коварный алекстразит",
      cn: "诡诈阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_red",
    stats: { crit: 70, haste: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Sensei's Alexstraszite                                     */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192922,
    element: "Earth",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Sensei's Alexstraszite",
      de: "Alexstraszit des Mentors",
      fr: "Alexstraszite de sensei",
      ru: "Алекстразит сенсея",
      cn: "导师的阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_red",
    stats: { crit: 70, mastery: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Radiant Alexstraszite                                     */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192923,
    element: "Frost",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Radiant Alexstraszite",
      de: "Strahlender Alexstraszit",
      fr: "Alexstraszite étincelante",
      ru: "Светозарный алекстразит",
      cn: "辐光阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_red",
    stats: { crit: 70, versatility: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Deadly Alexstraszite                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192928,
    element: "Fire",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Deadly Alexstraszite",
      de: "Tödlicher Alexstraszit",
      fr: "Alexstraszite mortelle",
      ru: "Смертоносный алекстразит",
      cn: "致命的阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_red",
    stats: { crit: 88 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Resplendent Illimited Diamond                                 */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192991,
    element: "Primalist Gem",
    quality: 3,
    rarity: "epic",
    ilvl: 415,
    name: {
      en: "Resplendent Illimited Diamond",
      de: "Prunkvoller Endlosdiamant",
      fr: "Diamant insondable resplendissant",
      ru: "Глянцевый бесконечный алмаз",
      cn: "灿烂无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_blue",
    stats: { intellect: 75, versatility: 66 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Skillful Illimited Diamond                                   */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192986,
    element: "Primalist Gem",
    quality: 1,
    rarity: "epic",
    ilvl: 385,
    name: {
      en: "Skillful Illimited Diamond",
      de: "Fachkundiger Endlosdiamant",
      fr: "Diamant insondable habile",
      ru: "Мастерский бесконечный алмаз",
      cn: "娴熟之无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_black",
    stats: { intellect: 53, mastery: 46 },
  },
  {
    id: 192987,
    element: "Primalist Gem",
    quality: 2,
    rarity: "epic",
    ilvl: 400,
    name: {
      en: "Skillful Illimited Diamond",
      de: "Fachkundiger Endlosdiamant",
      fr: "Diamant insondable habile",
      ru: "Мастерский бесконечный алмаз",
      cn: "娴熟之无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_black",
    stats: { intellect: 64, mastery: 56 },
  },
  {
    id: 192988,
    element: "Primalist Gem",
    quality: 3,
    rarity: "epic",
    ilvl: 415,
    name: {
      en: "Skillful Illimited Diamond",
      de: "Fachkundiger Endlosdiamant",
      fr: "Diamant insondable habile",
      ru: "Мастерский бесконечный алмаз",
      cn: "娴熟之无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_black",
    stats: { intellect: 75, mastery: 66 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Fierce Illimited Diamond                                    */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192983,
    element: "Primalist Gem",
    quality: 1,
    rarity: "epic",
    ilvl: 385,
    name: {
      en: "Fierce Illimited Diamond",
      de: "Wilder Endlosdiamant",
      fr: "Diamant insondable féroce",
      ru: "Броский бесконечный алмаз",
      cn: "凶猛无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_green",
    stats: { intellect: 53, haste: 46 },
  },
  {
    id: 192984,
    element: "Primalist Gem",
    quality: 2,
    rarity: "epic",
    ilvl: 400,
    name: {
      en: "Fierce Illimited Diamond",
      de: "Wilder Endlosdiamant",
      fr: "Diamant insondable féroce",
      ru: "Броский бесконечный алмаз",
      cn: "凶猛无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_green",
    stats: { intellect: 64, haste: 56 },
  },
  {
    id: 192985,
    element: "Primalist Gem",
    quality: 3,
    rarity: "epic",
    ilvl: 415,
    name: {
      en: "Fierce Illimited Diamond",
      de: "Wilder Endlosdiamant",
      fr: "Diamant insondable féroce",
      ru: "Броский бесконечный алмаз",
      cn: "凶猛无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_green",
    stats: { intellect: 75, haste: 66 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Inscribed Illimited Diamond                                  */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192980,
    element: "Primalist Gem",
    quality: 1,
    rarity: "epic",
    ilvl: 385,
    name: {
      en: "Inscribed Illimited Diamond",
      de: "Gravierter Endlosdiamant",
      fr: "Diamant insondable gravé",
      ru: "Покрытый письменами бесконечный алмаз",
      cn: "铭文无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_red",
    stats: { intellect: 53, crit: 46 },
  },
  {
    id: 192981,
    element: "Primalist Gem",
    quality: 2,
    rarity: "epic",
    ilvl: 400,
    name: {
      en: "Inscribed Illimited Diamond",
      de: "Gravierter Endlosdiamant",
      fr: "Diamant insondable gravé",
      ru: "Покрытый письменами бесконечный алмаз",
      cn: "铭文无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_red",
    stats: { intellect: 64, crit: 56 },
  },
  {
    id: 192982,
    element: "Primalist Gem",
    quality: 3,
    rarity: "epic",
    ilvl: 415,
    name: {
      en: "Inscribed Illimited Diamond",
      de: "Gravierter Endlosdiamant",
      fr: "Diamant insondable gravé",
      ru: "Покрытый письменами бесконечный алмаз",
      cn: "铭文无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_red",
    stats: { intellect: 75, crit: 66 },
  },
];
