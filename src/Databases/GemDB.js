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
  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Solid Eternity Amber                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192913,
    quality: 1,
    rarity: "normal",
    ilvl: 385,
    name: {
      en: "Solid Eternity Amber",
      de: "Gediegener Ewigkeitsbernstein",
      fr: "Ambre d’éternité solide",
      ru: "Цельный янтарь вечности",
      cn: "致密永恒琥珀",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_bronze",
    stats: { stamina: 53 },
  },
  {
    id: 192914,
    quality: 2,
    rarity: "normal",
    ilvl: 400,
    name: {
      en: "Solid Eternity Amber",
      de: "Gediegener Ewigkeitsbernstein",
      fr: "Ambre d’éternité solide",
      ru: "Цельный янтарь вечности",
      cn: "致密永恒琥珀",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_bronze",
    stats: { stamina: 64 },
  },
  {
    id: 192916,
    element: "",
    quality: 3,
    rarity: "normal",
    ilvl: 415,
    name: {
      en: "Solid Eternity Amber",
      de: "Gediegener Ewigkeitsbernstein",
      fr: "Ambre d’éternité solide",
      ru: "Цельный янтарь вечности",
      cn: "致密永恒琥珀",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_bronze",
    stats: { stamina: 75 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Zen Mystic Sapphire                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192903,
    element: "",
    quality: 1,
    rarity: "normal",
    ilvl: 385,
    name: {
      en: "Zen Mystic Sapphire",
      de: "Meditativer mystischer Saphir",
      fr: "Saphir zen mystique",
      ru: "Мистический дзен-сапфир",
      cn: "禅悟之秘术青玉",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_blue",
    stats: { versatility: 18, mastery: 18 },
  },
  {
    id: 192904,
    element: "",
    quality: 2,
    rarity: "normal",
    ilvl: 400,
    name: {
      en: "Zen Mystic Sapphire",
      de: "Meditativer mystischer Saphir",
      fr: "Saphir zen mystique",
      ru: "Мистический дзен-сапфир",
      cn: "禅悟之秘术青玉",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_blue",
    stats: { versatility: 22, mastery: 22 },
  },
  {
    id: 192905,
    element: "",
    quality: 3,
    rarity: "normal",
    ilvl: 415,
    name: {
      en: "Zen Mystic Sapphire",
      de: "Meditativer mystischer Saphir",
      fr: "Saphir zen mystique",
      ru: "Мистический дзен-сапфир",
      cn: "禅悟之秘术青玉",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_blue",
    stats: { versatility: 26, mastery: 26 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Sensei's Sundered Onyx                                     */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192910,
    element: "",
    quality: 1,
    rarity: "normal",
    ilvl: 385,
    name: {
      en: "Sensei's Sundered Onyx",
      de: "Gesplitterter Onyx des Mentors",
      fr: "Onyx fracturé de sensei",
      ru: "Расколотый оникс сенсея",
      cn: "导师的裂痕玛瑙",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_black",
    stats: { crit: 18, mastery: 18 },
  },
  {
    id: 192911,
    element: "",
    quality: 2,
    rarity: "normal",
    ilvl: 400,
    name: {
      en: "Sensei's Sundered Onyx",
      de: "Gesplitterter Onyx des Mentors",
      fr: "Onyx fracturé de sensei",
      ru: "Расколотый оникс сенсея",
      cn: "导师的裂痕玛瑙",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_black",
    stats: { crit: 22, mastery: 22 },
  },
  {
    id: 192912,
    element: "",
    quality: 3,
    rarity: "normal",
    ilvl: 415,
    name: {
      en: "Sensei's Sundered Onyx",
      de: "Gesplitterter Onyx des Mentors",
      fr: "Onyx fracturé de sensei",
      ru: "Расколотый оникс сенсея",
      cn: "导师的裂痕玛瑙",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_black",
    stats: { crit: 26, mastery: 26 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Crafty Queen's Ruby                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192900,
    element: "",
    quality: 1,
    rarity: "normal",
    ilvl: 385,
    name: {
      en: "Crafty Queen's Ruby",
      de: "Listiger Rubin der Königin",
      fr: "Rubis régalien ingénieux",
      ru: "Коварный рубин королевы",
      cn: "诡诈女王红玉",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_red",
    stats: { crit: 18, haste: 18 },
  },
  {
    id: 192901,
    element: "",
    quality: 2,
    rarity: "normal",
    ilvl: 400,
    name: {
      en: "Crafty Queen's Ruby",
      de: "Listiger Rubin der Königin",
      fr: "Rubis régalien ingénieux",
      ru: "Коварный рубин королевы",
      cn: "诡诈女王红玉",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_red",
    stats: { crit: 22, haste: 22 },
  },
  {
    id: 192902,
    element: "",
    quality: 3,
    rarity: "normal",
    ilvl: 415,
    name: {
      en: "Crafty Queen's Ruby",
      de: "Listiger Rubin der Königin",
      fr: "Rubis régalien ingénieux",
      ru: "Коварный рубин королевы",
      cn: "诡诈女王红玉",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_red",
    stats: { crit: 26, haste: 26 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Energized Vibrant Emerald                                   */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192906,
    element: "",
    quality: 1,
    rarity: "normal",
    ilvl: 385,
    name: {
      en: "Energized Vibrant Emerald",
      de: "Geladener schillernder Smaragd",
      fr: "Émeraude énergisée chatoyante",
      ru: "Усиленный сияющий изумруд",
      cn: "活跃生机翡翠",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_green",
    stats: { crit: 18, haste: 18 },
  },

  {
    id: 192907,
    element: "",
    quality: 2,
    rarity: "normal",
    ilvl: 400,
    name: {
      en: "Energized Vibrant Emerald",
      de: "Geladener schillernder Smaragd",
      fr: "Émeraude énergisée chatoyante",
      ru: "Усиленный сияющий изумруд",
      cn: "活跃生机翡翠",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_green",
    stats: { crit: 22, haste: 22 },
  },

  {
    id: 192908,
    element: "",
    quality: 3,
    rarity: "normal",
    ilvl: 415,
    name: {
      en: "Energized Vibrant Emerald",
      de: "Geladener schillernder Smaragd",
      fr: "Émeraude énergisée chatoyante",
      ru: "Усиленный сияющий изумруд",
      cn: "活跃生机翡翠",
    },
    icon: "inv_10_jewelcrafting_gem1leveling_cut_green",
    stats: { crit: 26, haste: 26 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Jagged Nozdorite                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192968,
    element: "Fire Amber",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Jagged Nozdorite",
      de: "Gezackter Nozdorit",
      fr: "Nozdorite dentelée",
      ru: "Зазубренный ноздорит",
      cn: "裂纹诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_bronze",
    stats: { stamina: 75, crit: 23 },
  },

  {
    id: 192969,
    element: "Fire Amber",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Jagged Nozdorite",
      de: "Gezackter Nozdorit",
      fr: "Nozdorite dentelée",
      ru: "Зазубренный ноздорит",
      cn: "裂纹诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_bronze",
    stats: { stamina: 87, crit: 28 },
  },

  {
    id: 192970,
    element: "Fire Amber",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Jagged Nozdorite",
      de: "Gezackter Nozdorit",
      fr: "Nozdorite dentelée",
      ru: "Зазубренный ноздорит",
      cn: "裂纹诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_bronze",
    stats: { stamina: 102, crit: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Forceful Nozdorite                                       */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192971,
    element: "Air Amber",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Forceful Nozdorite",
      de: "Kraftvoller Nozdorit",
      fr: "Nozdorite puissante",
      ru: "Мощный ноздорит",
      cn: "坚强诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_bronze",
    stats: { stamina: 71, haste: 23 },
  },

  {
    id: 192972,
    element: "Air Amber",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Forceful Nozdorite",
      de: "Kraftvoller Nozdorit",
      fr: "Nozdorite puissante",
      ru: "Мощный ноздорит",
      cn: "坚强诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_bronze",
    stats: { stamina: 87, haste: 28 },
  },

  {
    id: 192973,
    element: "Air Amber",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Forceful Nozdorite",
      de: "Kraftvoller Nozdorit",
      fr: "Nozdorite puissante",
      ru: "Мощный ноздорит",
      cn: "坚强诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_bronze",
    stats: { stamina: 102, haste: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Puissant Nozdorite                                       */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192974,
    element: "Earth Amber",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Puissant Nozdorite",
      de: "Imposanter Nozdorit",
      fr: "Nozdorite surpuissante",
      ru: "Всевластный ноздорит",
      cn: "强攻诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_bronze",
    stats: { stamina: 71, mastery: 23 },
  },

  {
    id: 192975,
    element: "Earth Amber",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Puissant Nozdorite",
      de: "Imposanter Nozdorit",
      fr: "Nozdorite surpuissante",
      ru: "Всевластный ноздорит",
      cn: "强攻诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_bronze",
    stats: { stamina: 87, mastery: 28 },
  },

  {
    id: 192976,
    element: "Earth Amber",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Puissant Nozdorite",
      de: "Imposanter Nozdorit",
      fr: "Nozdorite surpuissante",
      ru: "Всевластный ноздорит",
      cn: "强攻诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_bronze",
    stats: { stamina: 102, mastery: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Steady Nozdorite                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192977,
    element: "Frost Amber",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Steady Nozdorite",
      de: "Beständiger Nozdorit",
      fr: "Nozdorite stable",
      ru: "Неизменный ноздорит",
      cn: "稳固诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_bronze",
    stats: { stamina: 71, versatility: 23 },
  },

  {
    id: 192978,
    element: "Frost Amber",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Steady Nozdorite",
      de: "Beständiger Nozdorit",
      fr: "Nozdorite stable",
      ru: "Неизменный ноздорит",
      cn: "稳固诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_bronze",
    stats: { stamina: 87, versatility: 28 },
  },

  {
    id: 192979,
    element: "Frost Amber",
    quality: 3,
    rarity: "rare",
    ilvl: 415,
    name: {
      en: "Steady Nozdorite",
      de: "Beständiger Nozdorit",
      fr: "Nozdorite stable",
      ru: "Неизменный ноздорит",
      cn: "稳固诺兹多石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_bronze",
    stats: { stamina: 102, versatility: 33 },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Radiant Malygite                                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192929,
    element: "Fire Sapphire",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Radiant Malygite",
      de: "Strahlender Malygit",
      fr: "Malygite étincelante",
      ru: "Светозарный малигит",
      cn: "辐光玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_blue",
    stats: { crit: 23, versatility: 49 },
  },
  {
    id: 192931,
    element: "Fire Sapphire",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Radiant Malygite",
      de: "Strahlender Malygit",
      fr: "Malygite étincelante",
      ru: "Светозарный малигит",
      cn: "辐光玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_blue",
    stats: { crit: 28, versatility: 60 },
  },
  {
    id: 192932,
    element: "Fire Sapphire",
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

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Energized Malygite                                       */
  /* ---------------------------------------------------------------------------------------------- */
  {
    id: 192933,
    element: "Air Sapphire",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Energized Malygite",
      de: "Geladener Malygit",
      fr: "Malygite énergisée",
      ru: "Усиленный малигит",
      cn: "活跃玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_blue",
    stats: { haste: 23, versatility: 49 },
  },
  {
    id: 192934,
    element: "Air Sapphire",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Energized Malygite",
      de: "Geladener Malygit",
      fr: "Malygite énergisée",
      ru: "Усиленный малигит",
      cn: "活跃玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_blue",
    stats: { haste: 28, versatility: 60 },
  },
  {
    id: 192935,
    element: "Air Sapphire",
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
    id: 192936,
    element: "Earth Sapphire",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Zen Malygite",
      de: "Meditativer Malygit",
      fr: "Malygite zen",
      ru: "Дзен-малигит",
      cn: "禅悟之玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_blue",
    stats: { mastery: 23, versatility: 49 },
  },
  {
    id: 192937,
    element: "Earth Sapphire",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Zen Malygite",
      de: "Meditativer Malygit",
      fr: "Malygite zen",
      ru: "Дзен-малигит",
      cn: "禅悟之玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_blue",
    stats: { mastery: 28, versatility: 60 },
  },
  {
    id: 192938,
    element: "Earth Sapphire",
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
    id: 192940,
    element: "Frost Sapphire",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Stormy Malygite",
      de: "Stürmischer Malygit",
      fr: "Malygite orageuse",
      ru: "Грозовой малигит",
      cn: "风暴玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_blue",
    stats: { versatility: 62 },
  },
  {
    id: 192941,
    element: "Frost Sapphire",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Stormy Malygite",
      de: "Stürmischer Malygit",
      fr: "Malygite orageuse",
      ru: "Грозовой малигит",
      cn: "风暴玛里苟石",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_blue",
    stats: { versatility: 75 },
  },
  {
    id: 192942,
    element: "Frost Sapphire",
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
    id: 192956,
    element: "Fire Onyx",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Sensei's Neltharite",
      de: "Neltharit des Mentors",
      fr: "Neltharite de sensei",
      ru: "Нелтарит сенсея",
      cn: "导师的奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_black",
    stats: { mastery: 49, crit: 23 },
  },
  {
    id: 192957,
    element: "Fire Onyx",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Sensei's Neltharite",
      de: "Neltharit des Mentors",
      fr: "Neltharite de sensei",
      ru: "Нелтарит сенсея",
      cn: "导师的奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_black",
    stats: { mastery: 60, crit: 28 },
  },
  {
    id: 192958,
    element: "Fire Onyx",
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
    id: 192959,
    element: "Air Onyx",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Keen Neltharite",
      de: "Schneidender Neltharit",
      fr: "Neltharite effilée",
      ru: "Острый нелтарит",
      cn: "狂热奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_black",
    stats: { mastery: 49, haste: 23 },
  },
  {
    id: 192960,
    element: "Air Onyx",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Keen Neltharite",
      de: "Schneidender Neltharit",
      fr: "Neltharite effilée",
      ru: "Острый нелтарит",
      cn: "狂热奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_black",
    stats: { mastery: 60, haste: 28 },
  },
  {
    id: 192961,
    element: "Air Onyx",
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
    id: 192962,
    element: "Frost Onyx",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Zen Neltharite",
      de: "Meditativer Neltharit",
      fr: "Neltharite zen",
      ru: "Дзен-нелтарит",
      cn: "禅悟之奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_black",
    stats: { mastery: 49, versatility: 23 },
  },
  {
    id: 192963,
    element: "Frost Onyx",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Zen Neltharite",
      de: "Meditativer Neltharit",
      fr: "Neltharite zen",
      ru: "Дзен-нелтарит",
      cn: "禅悟之奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_black",
    stats: { mastery: 60, versatility: 28 },
  },
  {
    id: 192964,
    element: "Frost Onyx",
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
    id: 192965,
    element: "Earth Onyx",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Fractured Neltharite",
      de: "Rissiger Neltharit",
      fr: "Neltharite fracturée",
      ru: "Растрескавшийся нелтарит",
      cn: "断裂奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_black",
    stats: { mastery: 62 },
  },
  {
    id: 192966,
    element: "Earth Onyx",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Fractured Neltharite",
      de: "Rissiger Neltharit",
      fr: "Neltharite fracturée",
      ru: "Растрескавшийся нелтарит",
      cn: "断裂奈萨晶",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_black",
    stats: { mastery: 70 },
  },
  {
    id: 192967,
    element: "Earth Onyx",
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
    id: 192943,
    element: "Fire Emerald",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Crafty Ysemerald",
      de: "Listiger Ysmaragd",
      fr: "Ysémeraude ingénieuse",
      ru: "Коварный изерилл",
      cn: "诡诈伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_green",
    stats: { haste: 49, crit: 23 },
  },
  {
    id: 192944,
    element: "Fire Emerald",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Crafty Ysemerald",
      de: "Listiger Ysmaragd",
      fr: "Ysémeraude ingénieuse",
      ru: "Коварный изерилл",
      cn: "诡诈伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_green",
    stats: { haste: 60, crit: 28 },
  },
  {
    id: 192945,
    element: "Fire Emerald",
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
    id: 192946,
    element: "Earth Emerald",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Keen Ysemerald",
      de: "Schneidender Ysmaragd",
      fr: "Ysémeraude effilée",
      ru: "Острый изерилл",
      cn: "狂热伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_green",
    stats: { haste: 49, mastery: 23 },
  },
  {
    id: 192947,
    element: "Earth Emerald",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Keen Ysemerald",
      de: "Schneidender Ysmaragd",
      fr: "Ysémeraude effilée",
      ru: "Острый изерилл",
      cn: "狂热伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_green",
    stats: { haste: 60, mastery: 28 },
  },
  {
    id: 192948,
    element: "Earth Emerald",
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
    id: 192950,
    element: "Frost Emerald",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Energized Ysemerald",
      de: "Geladener Ysmaragd",
      fr: "Ysémeraude énergisée",
      ru: "Усиленный изерилл",
      cn: "活跃伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_green",
    stats: { haste: 49, versatility: 23 },
  },
  {
    id: 192951,
    element: "Frost Emerald",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Energized Ysemerald",
      de: "Geladener Ysmaragd",
      fr: "Ysémeraude énergisée",
      ru: "Усиленный изерилл",
      cn: "活跃伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_green",
    stats: { haste: 60, versatility: 28 },
  },
  {
    id: 192952,
    element: "Frost Emerald",
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
    id: 192953,
    element: "Air Emerald",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Quick Ysemerald",
      de: "Spiegelnder Ysmaragd",
      fr: "Ysémeraude véloce",
      ru: "Мягкий изерилл",
      cn: "迅捷伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_green",
    stats: { haste: 62 },
  },
  {
    id: 192954,
    element: "Air Emerald",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Quick Ysemerald",
      de: "Spiegelnder Ysmaragd",
      fr: "Ysémeraude véloce",
      ru: "Мягкий изерилл",
      cn: "迅捷伊瑟翡翠",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_green",
    stats: { haste: 75 },
  },
  {
    id: 192955,
    element: "Air Emerald",
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
    id: 192917,
    element: "Air Ruby",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Crafty Alexstraszite",
      de: "Listiger Alexstraszit",
      fr: "Alexstraszite ingénieuse",
      ru: "Коварный алекстразит",
      cn: "诡诈阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_red",
    stats: { crit: 49, haste: 23 },
  },
  {
    id: 192917,
    element: "Air Ruby",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Crafty Alexstraszite",
      de: "Listiger Alexstraszit",
      fr: "Alexstraszite ingénieuse",
      ru: "Коварный алекстразит",
      cn: "诡诈阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_air_cut_red",
    stats: { crit: 60, haste: 28 },
  },
  {
    id: 192919,
    element: "Air Ruby",
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
    id: 192920,
    element: "Earth Ruby",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Sensei's Alexstraszite",
      de: "Alexstraszit des Mentors",
      fr: "Alexstraszite de sensei",
      ru: "Алекстразит сенсея",
      cn: "导师的阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_red",
    stats: { crit: 49, mastery: 23 },
  },
  {
    id: 192921,
    element: "Earth Ruby",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Sensei's Alexstraszite",
      de: "Alexstraszit des Mentors",
      fr: "Alexstraszite de sensei",
      ru: "Алекстразит сенсея",
      cn: "导师的阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_earth_cut_red",
    stats: { crit: 60, mastery: 28 },
  },
  {
    id: 192922,
    element: "Earth Ruby",
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
    element: "Frost Ruby",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Radiant Alexstraszite",
      de: "Strahlender Alexstraszit",
      fr: "Alexstraszite étincelante",
      ru: "Светозарный алекстразит",
      cn: "辐光阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_red",
    stats: { crit: 49, versatility: 23 },
  },
  {
    id: 192924,
    element: "Frost Ruby",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Radiant Alexstraszite",
      de: "Strahlender Alexstraszit",
      fr: "Alexstraszite étincelante",
      ru: "Светозарный алекстразит",
      cn: "辐光阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_frost_cut_red",
    stats: { crit: 60, versatility: 28 },
  },
  {
    id: 192923,
    element: "Frost Ruby",
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
    id: 192926,
    element: "Fire Ruby",
    quality: 1,
    rarity: "rare",
    ilvl: 385,
    name: {
      en: "Deadly Alexstraszite",
      de: "Tödlicher Alexstraszit",
      fr: "Alexstraszite mortelle",
      ru: "Смертоносный алекстразит",
      cn: "致命的阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_red",
    stats: { crit: 62 },
  },
  {
    id: 192927,
    element: "Fire Ruby",
    quality: 2,
    rarity: "rare",
    ilvl: 400,
    name: {
      en: "Deadly Alexstraszite",
      de: "Tödlicher Alexstraszit",
      fr: "Alexstraszite mortelle",
      ru: "Смертоносный алекстразит",
      cn: "致命的阿莱克丝塔萨之玉",
    },
    icon: "inv_10_jewelcrafting_gem2standard_fire_cut_red",
    stats: { crit: 75 },
  },
  {
    id: 192928,
    element: "Fire Ruby",
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
    id: 192989,
    element: "Primalist Gem",
    quality: 1,
    rarity: "epic",
    ilvl: 385,
    name: {
      en: "Resplendent Illimited Diamond",
      de: "Prunkvoller Endlosdiamant",
      fr: "Diamant insondable resplendissant",
      ru: "Глянцевый бесконечный алмаз",
      cn: "灿烂无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_blue",
    stats: { intellect: 53, versatility: 46 },
  },
  {
    id: 192990,
    element: "Primalist Gem",
    quality: 2,
    rarity: "epic",
    ilvl: 400,
    name: {
      en: "Resplendent Illimited Diamond",
      de: "Prunkvoller Endlosdiamant",
      fr: "Diamant insondable resplendissant",
      ru: "Глянцевый бесконечный алмаз",
      cn: "灿烂无限钻石",
    },
    icon: "inv_10_jewelcrafting_gem3primal_cut_blue",
    stats: { intellect: 64, versatility: 56 },
  },
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
