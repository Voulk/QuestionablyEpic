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
    id: 552,
    class: -1,
    setBonuses: {
      3: 32196, // Increases spell damage by up to 7% of your total Intellect. // TODO: Requires Mage on tooltip? https://tbc.wowhead.com/spell=32196/increased-dam-intellect
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Shadow's Embrace                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=553/shadows-embrace
    id: 553,
    class: -1,
    setBonuses: {
      3: 39372, // Your Frost and Shadow damage spells heal you for 2% of the damage they deal. // TODO: Requires Priest & 2% of base mana in tooltip? https://tbc.wowhead.com/spell=39372/frozen-shadoweave
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
    /*                                         Cyclone Raiment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=631/cyclone-raiment
    id: 631,
    class: "Shaman",
    setBonuses: {
      2: 37210, // Your Mana Spring Totem ability grants an additional 3 mana every 2 sec.
      4: 37211, // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Netherstrike Armor                                       */
    /* ---------------------------------------------------------------------------------------------- */

    // https://tbc.wowhead.com/item-set=617/netherstrike-armor
    id: 617,
    class: -1,
    setBonuses: {
      3: 41828, // Increases damage and healing done by magical spells and effects by up to 23.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Whitemend Wisdom                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=571/whitemend-wisdom
    id: 571,
    class: -1,
    setBonuses: {
      2: 32200, // Increases healing by up to 10% of your total Intellect. // TODO: Requires Mage on tooltip?
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Justicar Raiment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=624/justicar-raiment
    id: 624,
    class: "Paladin",
    setBonuses: {
      2: 37182, // Increases the amount healed by your Judgement of Light by 20.
      4: 37183, // Reduces the cooldown on your Divine Favor ability by 15 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       The Earthshatterer                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=527/the-earthshatterer
    id: 527,
    class: "Shaman",
    setBonuses: {
      2: 28818, // Reduces the mana cost of your totem spells by 12%.
      4: 29171, // Increases the mana gained from your Mana Spring totems by 25%.
      6: 28823, // Your Healing Wave and Lesser Healing Wave spells have a chance to imbue your target with Totemic Power. (Proc chance: 10%)
      8: 28821, // Your Lightning Shield spell also grants you 15 mana per 5 sec. while active.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Avatar Raiment                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=665/avatar-raiment
    id: 665,
    class: "Priest",
    setBonuses: {
      2: 37594, // If your Greater Heal brings the target to full health, you gain 100 mana.
      4: 26171, // Increases the duration of your Renew spell by 3 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Kodohide Battlegear                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=665/avatar-raiment
    id: 744,
    class: "Druid",
    setBonuses: {
      2: 46437, // +35 Resilience Rating.
      4: 46834, // The casting time on your Regrowth spell is reduced by 0.20 sec. (Proc chance: 15%, 15s cooldown)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Cataclysm Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=634/cataclysm-raiment
    id: 634,
    class: "Shaman",
    setBonuses: {
      2: 37225, // Reduces the cost of your Lesser Healing Wave spell by 5%.
      4: 37227, // Your critical heals from Healing Wave, Lesser Healing Wave, and Chain Heal reduce the cast time of your next Healing Wave spell by 0.50 sec for 10 sec.  This effect cannot occur more than once per minute. (1m cooldown)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Vestments of Absolution                                    */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=675/vestments-of-absolution
    id: 675,
    class: "Priest",
    setBonuses: {
      2: 38410, // Reduces the mana cost of your Prayer of Healing ability by 10%.
      4: 38411, // Increases the healing from your Greater Heal ability by 5%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Hallowed Raiment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=662/hallowed-raiment
    id: 662,
    class: "Priest",
    setBonuses: {
      2: 37556, // Gives you a 30% chance to avoid interruption caused by damage while casting binding heal.
      4: 37558, // Your prayer of mending heals for an extra 100 health.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Mana-Etched Regalia                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=658/mana-etched-regalia
    id: 658,
    class: -1,
    setBonuses: {
      2: 37607, // Increases your spell hit rating by 35.
      4: 37619, // Your harmful spells have a chance to grant you up to 110 spell damage and healing for 15 sec. (Proc chance: 2%) // TODO: Requires Priest in tooltip
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Vestments of Faith                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=525/vestments-of-faith
    id: 525,
    class: "Priest",
    setBonuses: {
      2: 28807, // Reduces the mana cost of your Renew spell by 12%.
      4: 28809, // On Greater Heal critical hits, your target will gain Armor of Faith, absorbing up to 500 damage.
      6: 28808, // Reduces the threat from your healing spells. Modifies Threat -10%
      8: 28802, // Each spell you cast can trigger an Epiphany, increasing your mana regeneration by 24 for 30 sec. (Proc chance: 5%)
    },
  },
];
