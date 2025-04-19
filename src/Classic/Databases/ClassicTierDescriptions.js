export const tierSets = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                           Restoration Druid Tier 4 [Marlorne Raiment]                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Stormrider's Vestments" },
    spec: "Restoration Druid",
    slots: [65195, 65198, 65197, 65194, 65196],
    twoSet: {
      effect: {
        en: "(2) Increases the crit chance of the periodic portion of Lifebloom by 5%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Grants 540 Spirit for 6s while you have the Harmony buff.",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                              Restoration Druid Tier 12                                */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Obsidian Arborweave Vestments" },
    spec: "Restoration Druid",
    slots: [71492, 71495, 71494, 71491, 71493],
    twoSet: {
      effect: {
        en: "(2) Lifebloom periodic healing has a 40% chance to restore 1% of base mana.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "(4) Your Swiftmend also heals an injured target within 15 yards.",
      },
      hps: 0,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Restoration Druid Tier 13                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Deep Earth Vestments" },
    spec: "Restoration Druid",
    slots: [78690, 78740, 78660, 78680, 78710],
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of Healing Touch and Rejuvenation by 5%.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "(4) Your Rejuvenation and Regrowth HoTs have a 10% chance to have double the duration.",
      },
      hps: 0,
    },
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Holy Paladin Tier 11                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Reinforced Sapphirium Regalia" },
    spec: "Holy Paladin",
    slots: [60359, 60362, 60360, 60363, 60361], // head, shoulder, chest, hands, legs
    twoSet: {
      effect: {
        en: "(2) Increases the crit chance of your Holy Light by 5%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Grants 540 Spirit for 6s after you cast Holy Shock.",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Holy Paladin Tier 8                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Regalia of Immolation" },
    spec: "Holy Paladin",
    slots: [71093, 71095, 71091, 71092, 71094], // head, shoulder, chest, hands, legs
    twoSet: {
      effect: {
        en: "(2) Healing with Holy Shock has a 40% chance to grant you 6% of your base mana.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "Your Divine Light, Flash of Light, and Holy Light spells also heal an injured target within 15 yards for 10% of the amount healed.",
      },
      hps: 0,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Holy Paladin Tier 13                                       */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Regalia of Radiant Glory" },
    spec: "Holy Paladin",
    slots: [76767, 76769, 76765, 76766, 76768], // head, shoulder, chest, hands, legs
    twoSet: {
      effect: {
        en: "(2) After using Divine Favor, the mana cost of your healing spells is reduced by 25% for 15 sec.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the healing done by your Holy Radiance spell by 5%.",
      },
      hps: 0,
    },
  },
];
