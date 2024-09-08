interface BossAbility {
  bossAbility: string | number;
  time: string;
}

interface Difficulty {
  default: BossAbility[];
}

interface Boss {
  Normal: Difficulty;
  Heroic: Difficulty;
  Mythic: Difficulty;
}

interface DefaultPlans {
  [key: number]: Boss;
}

export const defaultPlans: DefaultPlans = {
  2902: {
    // Ulgrax
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2898: {
    // Sikran
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2917: {
    // Bloodbound
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2918: {
    // Rasha'nan
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2919: {
    // Broodtwister
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2920: {
    // Nexus-Princess Ky'veza
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2921: {
    // The Silken Court
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
  2922: {
    // Queen Ansurek
    Normal: {
      default: [],
    },
    Heroic: {
      default: [],
    },
    Mythic: {
      default: [],
    },
  },
};
