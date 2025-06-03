
type GemEntry = {
  id: number; // The gems ID
  rarity: string; // Rarity level. We use this for settings deciding whether we should use Epic or Rare gems for example.
  name: string; // The English name for the gem.
  icon: string; // The icon to use for the gem.
  stats: { [key: string]: number };
  color: string;
}

export const classicGemDB: GemEntry[] = [
  // Mists of Pandaria Gems
  {
    id: 76694,
    rarity: "rare",
    name: "Brilliant Primordial Ruby",
    icon: "inv_misc_gem_x4_rare_cut_red",
    stats: { intellect: 160 },
    color: "red",
  },
    {
    id: 76668,
    rarity: "rare",
    name: "Reckless Vermilion Onyx",
    icon: "inv_misc_gem_x4_rare_cut_orange",
    stats: { intellect: 80, haste: 160 },
    color: "orange",
  },
  {
    id: 76660,
    rarity: "rare",
    name: "Potent Vermilion Onyx",
    icon: "inv_misc_gem_x4_rare_cut_orange",
    stats: { intellect: 80, crit: 160 },
    color: "orange",
  },
    {
    id: 76686,
    rarity: "rare",
    name: "Purified Imperial Amethyst",
    icon: "inv_misc_gem_x4_rare_cut_purple",
    stats: { intellect: 80, spirit: 160 },
    color: "purple",
  },

      {
    id: 76885,
    rarity: "rare",
    name: "Burning Primal Diamond",
    icon: "inv_misc_gem_x4_metagem_cut",
    stats: { intellect: 160 },
    color: "meta",
  },


  // Cataclysm Gems
  /*
  {
    id: 71850,
    rarity: "epic",
    name: "Reckless Lava Coral",
    icon: "inv_misc_epicgem_04",
    stats: { intellect: 25, haste: 25 },
  },
  {
    id: 71868,
    rarity: "epic",
    name: "Purified Shadow Spinel",
    icon: "inv_misc_epicgem_05",
    stats: { intellect: 25, spirit: 25 },
  },
  {
    id: 71881,
    rarity: "epic",
    name: "Brilliant Queen's Garnet",
    icon: "inv_misc_epicgem_01",
    stats: { intellect: 50 },
  },
  {
    id: 59480,
    rarity: "epic",
    name: "Fractured Cogwheel",
    icon: "inv_misc_enggizmos_30",
    stats: { mastery: 208 },
  },
  {
    id: 59479,
    rarity: "epic",
    name: "Quick Cogwheel",
    icon: "inv_misc_enggizmos_30",
    stats: { haste: 208 },
  },
  {
    id: 59496,
    rarity: "epic",
    name: "Sparkling Cogwheel",
    icon: "inv_misc_enggizmos_30",
    stats: { spirit: 208 },
  },
  {
    id: 52236,
    rarity: "rare",
    name: "Purified Demonseye",
    icon: "inv_misc_cutgemsuperior3",
    stats: { intellect: 20, spirit: 20 },
  },
  {
    id: 52296,
    rarity: "rare",
    name: "Ember Shadowspirit Diamond",
    icon: "inv_misc_metagem_b",
    stats: { intellect: 54 },
  },
  {
    id: 52207,
    rarity: "rare",
    name: "Brilliant Inferno Ruby",
    icon: "inv_misc_cutgemsuperior6",
    stats: { intellect: 40 },
  },
  {
    id: 52208,
    rarity: "rare",
    name: "Reckless Ember Topaz",
    icon: "inv_misc_cutgemsuperior4",
    stats: { intellect: 20, haste: 20 },
  },*/
];
