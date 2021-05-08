export const itemSets = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Primal Mooncloth                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=554/primal-mooncloth
    id: 554,
    class: -1,
    setBonuses: {
      3: 32102, // Allow 5% of your Mana regeneration to continue while casting.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Wrath of Spellfire                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=552/wrath-of-spellfire
    // TODO: Requires Mage on tooltip? https://tbc.wowhead.com/spell=32196/increased-dam-intellect
    id: 552,
    class: -1,
    setBonuses: {
      3: 32196, // Increases spell damage by up to 7% of your total Intellect.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Shadow's Embrace                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=553/shadows-embrace
    // TODO: Requires Priest & 2% of base mana in tooltip? https://tbc.wowhead.com/spell=39372/frozen-shadoweave
    id: 553,
    class: -1,
    setBonuses: {
      3: 39372, // Your Frost and Shadow damage spells heal you for 2% of the damage they deal.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Windhawk Armor                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=618/windhawk-armor
    id: 618,
    class: -1,
    setBonuses: {
      3: 41591, // Restores 8 mana per 5 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Incarnate Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=663/incarnate-raiment
    id: 663,
    class: "Priest",
    setBonuses: {
      2: 37564, // Your Prayer of Healing spell now also causes an additional 150 healing over 9 sec.
      4: 37568, // Each time you cast Flash Heal, your next Greater Heal cast within 15 sec has its casting time reduced by 0.1, stacking up to 5 times.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Redemption Armor                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=528/redemption-armor
    id: 528,
    class: "Paladin",
    setBonuses: {
      2: 28775, // Increases the amount healed by your Judgement of Light by 20.
      4: 28774, // Reduces cooldown on your Lay on Hands by 12 min.,
      6: 28789, // Your Flash of Light and Holy Light spells have a chance to imbue your target with Holy Power. (Proc chance: 10%)
      8: 28787, // Your Cleanse spell also heals the target for 200.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Spellstrike Infusion                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=559/spellstrike-infusion
    id: 559,
    class: -1,
    setBonuses: {
      2: 32106, // Gives a chance when your harmful spells land to increase the damage of your spells and effects by 92 for 10 sec. (Proc chance: 5%)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Malorne Raiment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=638/malorne-raiment
    id: 638,
    class: "Druid",
    setBonuses: {
      2: 37288, // Your helpful spells have a chance to restore up to 120 mana. (Proc chance: 5%)
      4: 37292, // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    },
  },

  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Hallowed Raiment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    id: 662,
    class: "Priest",
    setBonuses: {
      2: 37556, // Gives you a 30% chance to avoid interruption caused by damage while casting binding heal.
      4: 37558, // Your prayer of mending heals for an extra 100 health.
    },
  },
];
