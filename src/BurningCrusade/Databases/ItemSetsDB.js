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
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Gladiator's Refuge                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=685/gladiators-refuge
    id: 685,
    class: "Druid",
    setBonuses: {
      2: 40043, // +35 Resilience Rating.
      4: 46834, // The casting time on your Regrowth spell is reduced by 0.20 sec. (Proc chance: 15%, 15s cooldown)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Lightbringer Raiment                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=681/lightbringer-raiment
    id: 681,
    class: "Paladin",
    setBonuses: {
      2: 38426, // Increases the critical strike chance of your Holy Light ability by 5%.
      4: 38425, // Increases the healing from your Flash of Light ability by 5%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Nordrassil Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=642/nordrassil-raiment
    id: 642,
    class: "Druid",
    setBonuses: {
      2: 37313, // Increases the duration of your Regrowth spell by 6 sec.
      4: 37314, // Increases the final amount healed by your Lifebloom spell by 150.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Gladiator's Redemption                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/spell=46851/holy-shock-bonus
    id: 690,
    class: "Paladin",
    setBonuses: {
      2: 40043, // +35 Resilience Rating.
      4: 46851, // Increases the healing from your Holy Shock spell by 30%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Crystalforge Raiment                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=627/crystalforge-raiment
    id: 627,
    class: "Paladin",
    setBonuses: {
      2: 37188, // Each time you cast a Judgement, your party members gain 50 mana.
      4: 37189, // Your critical heals from Flash of Light and Holy Light reduce the cast time of your next Holy Light spell by 0.50 sec for 10 sec.  This effect cannot occur more than once per minute. (1m cooldown)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Satin Battlegear                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=740/satin-battlegear
    id: 740,
    class: "Priest",
    setBonuses: {
      2: 46414, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   High Warlord's Investiture                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=692/high-warlords-investiture
    id: 692,
    class: "Priest",
    setBonuses: {
      2: 40049, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Gladiator's Investiture                                    */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=687/gladiators-investiture
    id: 687,
    class: "Priest",
    setBonuses: {
      2: 40043, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      High Warlord's Refuge                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=689/high-warlords-refuge
    id: 689,
    class: "Druid",
    setBonuses: {
      2: 40049, // +35 Resilience Rating.
      4: 46834, // The casting time on your Regrowth spell is reduced by 0.20 sec. (Proc chance: 15%, 15s cooldown)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Thunderheart Raiment                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=678/thunderheart-raiment
    id: 678,
    class: "Druid",
    setBonuses: {
      2: 38417, // Reduces the cooldown of your Swiftmend ability by 2 sec.
      4: 38420, // Increases the healing from your Healing Touch ability by 5%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Grand Marshal's Refuge                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=688/grand-marshals-refuge
    id: 688,
    class: "Druid",
    setBonuses: {
      2: 40045, // +35 Resilience Rating.
      4: 46834, // The casting time on your Regrowth spell is reduced by 0.20 sec. (Proc chance: 15%, 15s cooldown)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Dreamwalker Raiment                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=521/dreamwalker-raiment
    id: 521,
    class: "Druid",
    setBonuses: {
      2: 28716, // Your Rejuvenation ticks have a chance to restore 60 mana, 8 energy, or 2 rage to your target.
      4: 28743, // Reduces the mana cost of your Healing Touch, Regrowth, Rejuvenation,  and Tranquility spells by 3%.
      6: 28744, // Your initial cast and Regrowth ticks will increase the maximum health of your target by up to 50, stacking up to 7 times.
      8: 28719, // On Healing Touch critical hits, you regain 30% of the mana cost of the spell.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Skyshatter Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=683/skyshatter-raiment
    id: 683,
    class: "Shaman",
    setBonuses: {
      2: 38434, // Your Chain Heal ability costs 10% less mana.
      4: 38435, // Increases the amount healed by your Chain Heal ability by 5%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     High Warlord's Wartide                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=696/high-warlords-wartide
    id: 696,
    class: "Shaman",
    setBonuses: {
      2: 40049, // +35 Resilience Rating.
      4: 38499, // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Gladiator's Raiment                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=581/gladiators-raiment
    id: 581,
    class: "Priest",
    setBonuses: {
      2: 40042, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Grand Marshal's Investiture                                  */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=691/grand-marshals-investiture
    id: 691,
    class: "Priest",
    setBonuses: {
      2: 40045, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     High Warlord's Raiment                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=598/high-warlords-raiment
    id: 598,
    class: "Priest",
    setBonuses: {
      2: 40051, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Grand Marshal's Raiment                                    */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=597/grand-marshals-raiment
    id: 597,
    class: "Priest",
    setBonuses: {
      2: 40047, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Netherweave Vestments                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=555/netherweave-vestments
    id: 555,
    class: -1,
    setBonuses: {
      2: 39543, // Increases damage and healing done by magical spells and effects by up to 23.
      4: 41829, // Increases your spell critical strike rating by 14.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Imbued Netherweave                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/spell=39881/increased-critical-spell
    id: 556,
    class: -1,
    setBonuses: {
      3: 39881, // Increases your spell critical strike rating by 28.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Seer's Ringmail Battlegear                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=747/seers-ringmail-battlegear
    id: 747,
    class: "Shaman",
    setBonuses: {
      2: 46455, // +35 Resilience Rating.
      4: 38466, // Reduces the cooldown of your Nature's Swiftness ability by 24 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Grand Marshal's Wartide                                    */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=695/grand-marshals-wartide
    id: 695,
    class: "Shaman",
    setBonuses: {
      2: 40045, // +35 Resilience Rating.
      4: 38499, // Reduces the cooldown of your Nature's Swiftness ability by 24 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    High Warlord's Redemption                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=694/high-warlords-redemption
    id: 694,
    class: "Paladin",
    setBonuses: {
      2: 40049, // +35 Resilience Rating.
      4: 46851, // Increases the healing from your Holy Shock spell by 30%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Grand Marshal's Redemption                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=693/grand-marshals-redemption
    id: 693,
    class: "Paladin",
    setBonuses: {
      2: 40045, // +35 Resilience Rating.
      4: 46851, // Increases the healing from your Holy Shock spell by 30%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Mooncloth Battlegear                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=739/mooncloth-battlegear
    id: 739,
    class: "Priest",
    setBonuses: {
      2: 46413, // +35 Resilience Rating.
      4: 33333, // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Fel Iron Chain                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=561/fel-iron-chain
    id: 561,
    class: -1,
    setBonuses: {
      2: 41561, // Increases your critical strike rating by 14.
      4: 41562, // Restores 8 mana per 5 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Fury of the Nether                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=576/fury-of-the-nether
    id: 576,
    class: -1,
    setBonuses: {
      3: 41771, // +20 Intellect.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Battlecast Garb                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=572/battlecast-garb
    id: 572,
    class: -1,
    setBonuses: {
      2: 41660, // Increases the chance spell pushback and spell interrupt will be resisted by 5%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Khorium Ward                                          */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=565/khorium-ward
    id: 565,
    class: -1,
    setBonuses: {
      3: 41783, // Increases healing done by up to 55 and damage done by up to 19 for all magical spells and effects.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         The Twin Stars                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=667/the-twin-stars
    id: 667,
    class: -1,
    setBonuses: {
      2: 41875, // Increases damage and healing done by magical spells and effects by up to 15.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Wild Draenish Armo                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=614/wild-draenish-armor
    id: 614,
    class: -1,
    setBonuses: {
      2: 41890, // Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.
      4: 41889, // +20 Stamina.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Scaled Draenic Armor                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=612/scaled-draenic-armor
    id: 612,
    class: -1,
    setBonuses: {
      2: 41833, // Increases your spell critical strike rating by 15.
      4: 41834, // Increases damage and healing done by magical spells and effects by up to 18.
    },
  },
];
