

type GemEntry = {
    id: number; // The gems ID
    element?: string; // Gems element
    name: string; // The English name for the gem.
    icon: string; // The icon to use for the gem.
    stats: { [key: string]: number };
  }

export const gemDB: GemEntry[] = [
    {
      id: 240969,
      element: "Meta",
      name: "Telluric Eversong Diamond",
      icon: "inv_12_profession_jewelcrafting_epic_gem_cut_blue",
      stats: { intellect: 23, manaPerc: 1.04 },
    },
      {
      id: 240983,
      element: "Meta",
      name: "Indecipherable Eversong Diamond",
      icon: "inv_12_profession_jewelcrafting_epic_gem_cut_green",
      stats: { intellect: 32 },
    },
     {
      id: 240914,
      element: "Lapis",
      name: "Flawless Deadly Lapis",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_fire_blue",
      stats: { versatility: 12, crit: 5 },
    },
    {
      id: 240918,
      element: "Lapis",
      name: "Flawless Masterful Lapis",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_void_blue",
      stats: { versatility: 12, mastery: 5 },
    },
    {
      id: 240916,
      element: "Lapis",
      name: "Flawless Quick Lapis",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_nature_blue",
      stats: { versatility: 12, haste: 5 },
    },
    {
      id: 240910,
      element: "Garnet",
      name: "Flawless Versatile Garnet",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_frost_red",
      stats: { crit: 12, versatility: 5 },
    },
    {
      id: 240906,
      element: "Garnet",
      name: "Flawless Quick Garnet",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_nature_red",
      stats: { crit: 12, haste: 5 },
    },
    {
      id: 240908,
      element: "Garnet",
      name: "Flawless Masterful Garnet",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_void_red",
      stats: { crit: 12, mastery: 5 },
    },
    {
      id: 240902,
      element: "Amethyst",
      name: "Flawless Versatile Amethyst",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_frost_purple",
      stats: { mastery: 12, versatility: 5 },
    },
    {
      id: 240902,
      element: "Amethyst",
      name: "Flawless Versatile Amethyst",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_frost_purple",
      stats: { mastery: 12, versatility: 5 },
    },
    {
      id: 240900,
      element: "Amethyst",
      name: "Flawless Quick Amethyst",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_nature_purple",
      stats: { mastery: 12, haste: 5 },
    },
    {
      id: 240898,
      element: "Amethyst",
      name: "Flawless Deadly Amethyst",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_fire_purple",
      stats: { mastery: 12, crit: 5 },
    },
    {
      id: 240894,
      element: "Peridot",
      name: "Flawless Versatile Peridot",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_frost_green",
      stats: { haste: 12, versatility: 5 },
    },
     {
      id: 240892,
      element: "Peridot",
      name: "Flawless Masterful Peridot",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_void_green",
      stats: { haste: 12, mastery: 5 },
    },
        {
      id: 240892,
      element: "Peridot",
      name: "Flawless Masterful Peridot",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_void_green",
      stats: { haste: 12, mastery: 5 },
    },
      {
      id: 240890,
      element: "Peridot",
      name: "Flawless Deadly Peridot",
      icon: "inv_12_profession_jewelcrafting_rare_gem_cut_fire_green",
      stats: { haste: 12, crit: 5 },
    },
    {
      id: 213488,
      element: "Emerald",
      name: "Quick Emerald",
      icon: "inv_jewelcrafting_cut-standart-gem_color2",
      stats: { haste: 7 },
    },
    {
      id: 213482,
      element: "Emerald",
      name: "Masterful Emerald",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color1_3",
      stats: { haste: 10, mastery: 3 },
    },
    {
      id: 213479,
      element: "Emerald",
      name: "Deadly Emerald",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color1_2",
      stats: { haste: 10, crit: 3 },
    },
    {
      id: 213485,
      element: "Emerald",
      name: "Versatile Emerald",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color1_1",
      stats: { haste: 10, versatility: 3 },
    },
    {
      id: 21334,
      element: "Onyx",
      name: "Quick Onyx",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color2_3",
      stats: { mastery: 10, haste: 3 },
    },
    {
      id: 21331,
      element: "Onyx",
      name: "Deadly Onyx",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color2_2",
      stats: { mastery: 10, crit: 3 },
    },
    {
      id: 21337,
      element: "Onyx",
      name: "Versatile Onyx",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color2_1",
      stats: { mastery: 10, versatility: 3 },
    },
    {
      id: 213500,
      element: "Onyx",
      name: "Masterful Onyx",
      icon: "inv_jewelcrafting_cut-standart-gem_color1",
      stats: { mastery: 7 },
    },
    {
      id: 213458,
      element: "Ruby",
      name: "Masterful Ruby",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color4_1",
      stats: { crit: 10, mastery: 3 },
    },
    {
      id: 213455,
      element: "Ruby",
      name: "Quick Ruby",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color4_3",
      stats: { crit: 10, haste: 3 },
    },
    {
      id: 213461,
      element: "Ruby",
      name: "Versatile Ruby",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color4_2",
      stats: { crit: 10, versatility: 3 },
    },
    {
      id: 213464,
      element: "Ruby",
      name: "Deadly Ruby",
      icon: "inv_jewelcrafting_cut-standart-gem_color5",
      stats: { crit: 7 },
    },
    {
      id: 213470,
      element: "Sapphire",
      name: "Quick Sapphire",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color5_3",
      stats: { versatility: 10, haste: 3 },
    },
    {
      id: 213473,
      element: "Sapphire",
      name: "Masterful Sapphire",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color5_1",
      stats: { versatility: 10, mastery: 3 },
    },
    {
      id: 213467,
      element: "Sapphire",
      name: "Deadly Sapphire",
      icon: "inv_jewelcrafting_cut-standart-gem-hybrid_color5_2",
      stats: { versatility: 10, crit: 3 },
    },
    {
      id: 213476,
      element: "Sapphire",
      name: "Versatile Sapphire",
      icon: "inv_jewelcrafting_cut-standart-gem_color3",
      stats: { versatility: 7 },
    },
    {
      id: 213743,
      element: "Meta",
      name: "Culminating Blasphemite",
      icon: "item_cutmetagemb",
      stats: { intellect: 12 },
    },
    {
      id: 213746,
      element: "Meta",
      name: "Elusive Blasphemite",
      icon: "inv_misc_gem_x4_metagem_cut",
      stats: { intellect: 12 },
    },
];

/* ---------------------------------------------------------------------------------------------- */
/*                                        Gem Choices                                             */
/* ---------------------------------------------------------------------------------------------- */
// The current tier's gems form a complete matrix: each secondary as the major stat (12) paired with each of the
// other three as the minor (5). These drive the gem dropdowns, so the labels here are what the player sees.

export const META_GEM_OPTIONS: { [label: string]: number } = {
  "Indecipherable (Intellect)": 240983,
  "Telluric (Mana)": 240969,
};

// label -> [major stat, minor stat]. getGemID resolves the pair to an actual gem.
export const GEM_COMBO_OPTIONS: { [label: string]: [string, string] } = {
  "Haste / Crit": ["haste", "crit"],
  "Haste / Mastery": ["haste", "mastery"],
  "Haste / Vers": ["haste", "versatility"],
  "Crit / Haste": ["crit", "haste"],
  "Crit / Mastery": ["crit", "mastery"],
  "Crit / Vers": ["crit", "versatility"],
  "Mastery / Haste": ["mastery", "haste"],
  "Mastery / Crit": ["mastery", "crit"],
  "Mastery / Vers": ["mastery", "versatility"],
  "Vers / Haste": ["versatility", "haste"],
  "Vers / Crit": ["versatility", "crit"],
  "Vers / Mastery": ["versatility", "mastery"],
};

// Finds the gem that grants 12 of the major stat and 5 of the minor. Returns 0 when no such gem exists so the
// caller can fall back rather than socketing something arbitrary.
export const findGemByStats = (majorStat: string, minorStat: string): number => {
  const match = gemDB.find((gem) => gem.stats[majorStat] === 12 && gem.stats[minorStat] === 5);
  return match ? match.id : 0;
};
