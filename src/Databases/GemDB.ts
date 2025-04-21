

type GemEntry = {
    id: number; // The gems ID
    element?: string; // Gems element
    name: string; // The English name for the gem.
    icon: string; // The icon to use for the gem.
    stats: { [key: string]: number };
  }

  const gemDB: GemEntry[] = [
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
    }
];
  