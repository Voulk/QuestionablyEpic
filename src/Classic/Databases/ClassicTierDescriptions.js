export const tierSets = [
  {
    name: { en: "Vestments of the Eternal Blossom" },
    spec: "Restoration Druid",
    slots: [85354, 85356, 85355, 85358, 85357], 
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of Rejuvenation by 10%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown of your Swiftmend spell by 3 sec.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Vestments of the Haunted Forest" },
    spec: "Restoration Druid",
    slots: [95240, 95242, 95241, 95243, 95244], //
    twoSet: {
      effect: {
        en: "(2) Efflorescence now heals 4 targets instead of 3.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "(4) The healing done by your Rejuvenation increases by 6% each time it causes healing.",
      },
      hps: 0,
    },
  },
  {
    name: { en: "Vestments of the Shattered Vale" },
    spec: "Restoration Druid",
    slots: [99171, 99173, 99172, 99178, 99185], 
    twoSet: {
      effect: {
        en: "(2) Rejuvenation ticks have a 12% chance to grant a Sage Mender, reducing the mana cost and cast time of your next Healing Touch by 20%, stacking up to 5 times.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "(4) Targets of your Wild Growth spell are instantly healed for 25% of your spell power.",
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

  // Mistweaver Tier Sets
    {
    name: { en: "Vestments of the Red Crane" },
    spec: "Mistweaver Monk",
    slots: [85393, 85389, 85390, 85391, 85392], 
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of your Surging Mist spell by 10%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the healing done by Enveloping Mist by 5%.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Fire-Charm Vestments" },
    spec: "Mistweaver Monk",
    slots: [95270, 95272, 95271, 95273, 95274], 
    twoSet: {
      effect: {
        en: "(2) Your Renewing Mist heals for 15% more each time it travels to a new target.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown of your Thunder Focus Tea by 5 sec.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Vestments of Seven Sacred Seals" },
    spec: "Mistweaver Monk",
    slots: [99151, 99147, 99148, 99149, 99150], 
    twoSet: {
      effect: {
        en: "(2) When Gift of the Serpent spheres from Mastery heal a player, they gain an absorb for 45% of the amount healed.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) When your Renewing Mist heals a target, you have a 4% chance to cast a Mist Wave healing bolt at a nearby low health friendly target.",
      },
      hps: 300,
    },
  },

  // Priest
  {
    name: { en: "Vestments of the Guardian Serpent" },
    spec: "Holy Priest",
    slots: [85359, 85361, 85360, 85363, 85362], 
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of your Flash Heal spell by 20%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown of your Circle of Healing spell by 4 sec.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Vestments of the Exorcist" },
    spec: "Holy Priest",
    slots: [95295, 95297, 95296, 95299, 95298], 
    twoSet: {
      effect: {
        en: "(2) Your Prayer of Mending heals for 10% more each time it jumps to a new target.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Your Circle of Healing have a 40% chance to summon a Golden Apparition, which moves to a nearby ally and heals for an additional amount.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Vestments of Ternion Glory" },
    spec: "Holy Priest",
    slots: [99117, 99119, 99118, 99131, 99120],
    twoSet: {
      effect: {
        en: "(2) Serendipity also increases the healing of your next Greater Heal or Prayer of Healing by 50% per stack.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Circle of Healing and Prayer of Mending casts increase the effect of your next Holy Word: Serenity by 33% and your Holy Word: Chastise and Sanctuary spells by 75%, stacking up to 3 times.",
      },
      hps: 300,
    },
  },

  // Disc Priest
    {
    name: { en: "Vestments of the Guardian Serpent" },
    spec: "Discipline Priest",
    slots: [85359, 85361, 85360, 85363, 85362], 
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of your Flash Heal spell by 20%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown of your Penance spell by 1 sec.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Vestments of the Exorcist" },
    spec: "Discipline Priest",
    slots: [95295, 95297, 95296, 95299, 95298], 
    twoSet: {
      effect: {
        en: "(2) Your Prayer of Mending heals for 10% more each time it jumps to a new target.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Your Penance has a 40% chance to summon a Golden Apparition, which moves to a nearby ally and heals for an additional amount.",
      },
      hps: 300,
    },
  },
  {
    name: { en: "Vestments of Ternion Glory" },
    spec: "Discipline Priest",
    slots: [99117, 99119, 99118, 99131, 99120],
    twoSet: {
      effect: {
        en: "(2) While Archangel is active, your critical chance is increased by 10%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) While Spirit Shell is active, you gain 10% haste and 3500 mastery.",
      },
      hps: 300,
    },
  },

];
