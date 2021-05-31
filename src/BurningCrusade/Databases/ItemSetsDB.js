
export function getItemSet(id, pieces) {
  let effects = [];
  let temp = itemSets.filter(function (set) {
    return set.id === parseInt(id);
  });
  if (temp.length > 0) {
    for (const [bonus, effectid] of Object.entries(temp[0].setBonuses)) {
      //console.log("Getting bonuss" + bonus + ". ID: " + effectid + ". Pieces: " + pieces);
      if (pieces >= bonus) effects.push({type: 'set bonus', name: effectid, class: temp[0].class});
    }
    return effects;
  }
  else return "";
}

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
      2: 32200, // Increases healing by up to 10% of your total Intellect.
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
    /*                                       Wild Draenish Armor                                      */
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
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Field Marshal's Aegis                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=402/field-marshals-aegis
    id: 402,
    class: "Paladin",
    setBonuses: {
      2: 41754, // +20 Stamina.
      4: 23302, // Reduces the cooldown of your Hammer of Justice by 10 sec.
      6: 41753, // Increases damage and healing done by magical spells and effects by up to 23.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Vestments of Transcendence                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=211/vestments-of-transcendence
    id: 211,
    class: "Priest",
    setBonuses: {
      3: 21894, // Restores 20 mana per 5 sec.
      5: 21853, // When struck in melee there is a 50% chance you will Fade for 4 sec. (Proc chance: 50%, 5s cooldown)
      8: 22010, // Your Greater Heals now have a heal over time component equivalent to a rank 5 Renew.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Warlord's Aegis                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=698/warlords-aegis
    id: 698,
    class: "Paladin",
    setBonuses: {
      2: 41886, // +20 Stamina.
      3: 23302, // Reduces the cooldown of your Hammer of Justice by 10 sec.
      6: 30778, // Increases damage and healing done by magical spells and effects by up to 23.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Judgement Armor                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=217/judgement-armor
    id: 217,
    class: "Paladin",
    setBonuses: {
      3: 23565, // Increases the radius of a Paladin's auras to 40 yd.
      5: 41782, // Increases damage and healing done by magical spells and effects by up to 47.
      8: 23591, // Inflicts 60 to 66 additional Holy damage on the target of a Paladin's Judgement.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Avenger's Battlegear                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=505/avengers-battlegear
    id: 505,
    class: "Paladin",
    setBonuses: {
      2: 26130, // Increases the duration of your Judgements by 20%.
      5: 41648, // Increases damage and healing done by magical spells and effects by up to 71.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         The Ten Storms                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=216/the-ten-storms
    id: 216,
    class: "Shaman",
    setBonuses: {
      3: 21899, // Increases the amount healed by Chain Heal to targets beyond the first by 5%.
      5: 23570, // Increases your spell critical strike rating by 42.
      8: 23551, // When you cast a Healing Wave or Lesser Healing Wave, there is a 25% chance the target also receives a free Lightning Shield that causes 50 Nature damage to attacker on hit. (Proc chance: 25%)
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Stormrage Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=214/stormrage-raiment
    id: 214,
    class: "Druid",
    setBonuses: {
      3: 21894, // Restores 20 mana per 5 sec.
      5: 21872, // Reduces the casting time of your Regrowth spell by 0.2 sec.
      8: 21871, // Increases the duration of your Rejuvenation spell by 3 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Warlord's Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=390/warlords-raiment
    id: 390,
    class: "Priest",
    setBonuses: {
      2: 41899, // +20 Stamina.
      3: 23044, // Increases the duration of your Psychic Scream spell by 1 sec.
      6: 41900, // Increases damage and healing done by magical spells and effects by up to 23.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Champion's Redoubt                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=697/champions-redoubt
    id: 697,
    class: "Paladin",
    setBonuses: {
      2: 41705, // Increases damage and healing done by magical spells and effects by up to 23.
      3: 23302, // Reduces the cooldown of your Hammer of Justice by 10 sec.
      6: 41704, // +20 Stamina.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Lawbringer Armor                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=208/lawbringer-armor
    id: 208,
    class: "Paladin",
    setBonuses: {
      3: 23564, // Increases the chance of triggering a Judgement of Light heal by 10%.
      5: [41785, 41784], // Increases your spell critical strike rating by 14. / Increases your critical strike rating by 14.
      6: 21747, // Gives the Paladin a chance on every melee hit to heal your party for 189 to 211.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Stormcaller's Garb                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=501/stormcallers-garb
    id: 501,
    class: "Shaman",
    setBonuses: {
      3: 26119, // Your Lightning Bolt, Chain Lightning, and Shock spells have a 20% chance to grant up to 50 Nature damage to spells for 8 sec. (Proc chance: 20%)
      5: 26122, // -0.4 seconds on the casting time of your Chain Heal spell.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Soulforge Armor                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=516/soulforge-armor
    id: 516,
    class: -1,
    setBonuses: {
      2: 41843, // +8 All Resistances.
      4: 27498, // Chance on melee attack to increase your damage and healing done by magical spells and effects by up to 95 for 10 sec.
      6: 41844, // Increases attack power by 40.
      8: 41842, // +200 Armor.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Lieutenant Commander's Redoubt                                 */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=544/lieutenant-commanders-redoubt
    id: 544,
    class: "Paladin",
    setBonuses: {
      2: 41807, // Increases damage and healing done by magical spells and effects by up to 23.
      4: 23302, // Reduces the cooldown of your Hammer of Justice by 10 sec.
      6: 41806, // +20 Stamina.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Cenarion Raiment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=205/cenarion-raiment
    id: 205,
    class: "Druid",
    setBonuses: {
      3: 23557, // Damage dealt by Thorns increased by 4 and duration increased by 50%.
      5: 39507, // Increases your spell critical strike rating by 28.
      8: 23556, // Reduces the cooldown of your Tranquility and Hurricane spells by 50%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Field Marshal's Raiment                                    */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=389/field-marshals-raiment
    id: 389,
    class: "Priest",
    setBonuses: {
      2: 41759, // +20 Stamina.
      3: 23044, // Increases the duration of your Psychic Scream spell by 1 sec.
      6: 41760, // Increases damage and healing done by magical spells and effects by up to 23.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Lightforge Armor                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=188/lightforge-armor
    id: 188,
    class: -1,
    setBonuses: {
      2: 29093, // +20 Stamina.
      4: 41818, // Increases attack power by 40.
      6: 27498, // Chance on melee attack to increase your damage and healing done by magical spells and effects by up to 95 for 10 sec.
      8: 41819, // +8 All Resistances.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          The Earthfury                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=207/the-earthfury
    id: 207,
    class: "Shaman",
    setBonuses: {
      3: 21895, // The radius of your totems that affect friendly targets is increased to 30 yd.
      5: 23572, // After casting your Healing Wave or Lesser Healing Wave spell, gives you a 25% chance to gain Mana equal to 35% of the base cost of the spell. (Proc chance: 25%, 1s cooldown)
      8: 23573, // Your Healing Wave will now jump to additional nearby targets. Each jump reduces the effectiveness of the heal by 80%, and the spell will jump to up to two additional targets.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        The Five Thunders                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=519/the-five-thunders
    id: 519,
    class: -1,
    setBonuses: {
      2: 41859, // +8 All Resistances.
      4: 27774, // Chance on spell cast to increase your damage and healing by up to 95 for 10 sec. (Proc chance: 4%)
      6: 41860, // Increases damage and healing done by magical spells and effects by up to 23.
      8: 41858, // +200 Armor.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Garments of the Oracle                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=507/garments-of-the-oracle
    id: 507,
    class: "Priest",
    setBonuses: {
      3: 26169, // 20% chance that your heals on others will also heal you 10% of the amount healed. (Proc chance: 20%)
      5: 26171, // Increases the duration of your Renew spell by 3 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Freethinker's Armor                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=475/freethinkers-armor
    id: 475,
    class: "Paladin",
    setBonuses: {
      2: 41770, // 20% chance that your heals on others will also heal you 10% of the amount healed. (Proc chance: 20%)
      3: 24457, // Increases the duration of your Renew spell by 3 sec.
      5: 24460, // Increases the duration of your Renew spell by 3 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Blue Dragon Mail                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=491/blue-dragon-mail
    id: 491,
    class: -1,
    setBonuses: {
      2: 41677, // +4 All Resistances.
      3: 41651, // Increases damage and healing done by magical spells and effects by up to 28.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Lieutenant Commander's Investiture                               */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=549/lieutenant-commanders-investiture
    id: 549,
    class: "Priest",
    setBonuses: {
      2: 41799, // Increases damage and healing done by magical spells and effects by up to 23.
      4: 23044, // Increases the duration of your Psychic Scream spell by 1 sec.
      6: 41798, // +20 Stamina.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      The Highlander's Will                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=472/the-highlanders-will
    id: 472,
    class: "Druid",
    setBonuses: {
      2: 41639, // Increased Stamina 05
      3: 39420, // Increases your spell critical strike rating by 14.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Wildheart Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=472/the-highlanders-will
    id: 185,
    class: -1,
    setBonuses: {
      2: 29097, // +200 Armor.
      4: [41892, 41891], // Increases attack power by 26. / Increases damage and healing done by magical spells and effects by up to 15.
      6: 27781, // When struck in combat has a chance of returning 300 mana, 10 rage, or 40 energy to the wearer. (Proc chance: 2%)
      8: 41893, // +8 All Resistances.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Vestments of Prophecy                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=202/vestments-of-prophecy
    id: 202,
    class: "Priest",
    setBonuses: {
      3: 21973, // -0.1 sec to the casting time of your Flash Heal spell.
      5: 21092, // Improves your spell critical strike rating by 28.
      8: 23550, // Increases your chance of a critical hit with Prayer of Healing by 25%.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Black Dragon Mail                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=489/black-dragon-mail
    id: 489,
    class: -1,
    setBonuses: {
      2: 39510, // Increases your hit rating by 10.
      3: 39509, // Improves your spell critical strike rating by 28.
      4: 41669, // +10 Fire Resistance.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Lieutenant Commander's Raiment                                 */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=344/lieutenant-commanders-raiment
    id: 344,
    class: "Priest",
    setBonuses: {
      2: 41805, // Increases damage and healing done by magical spells and effects by up to 23.
      4: 23044, // Increases the duration of your Psychic Scream spell by 1 sec.
      6: 41804, // +15 Stamina.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Magister's Regalia                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=181/magisters-regalia#comments
    id: 181,
    class: -1,
    setBonuses: {
      2: 29091, // +200 Armor.
      4: 30777, // Increases damage and healing done by magical spells and effects by up to 23.
      6: 27867, // When struck in combat has a chance of freezing the attacker in place for 3 sec. (Proc chance: 5%)
      8: 41822, // +8 All Resistances.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Deathmist Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=518/deathmist-raiment
    id: 518,
    class: -1,
    setBonuses: {
      2: 41728, // +8 All Resistances.
      4: 27780, // When struck in combat has a chance of causing the attacker to flee in terror for 2 seconds. (Proc chance: 2%)
      6: 41729, // Increases damage and healing done by magical spells and effects by up to 23.
      8: 41727, // +200 Armor.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Blood Tiger Harness                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=442/blood-tiger-harness
    id: 442,
    class: -1,
    setBonuses: {
      2: [41670, 41650], // Increases your critical strike rating by 14. / Increases your spell critical strike rating by 14.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Ironfeather Armor                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=144/ironfeather-armor
    id: 144,
    class: -1,
    setBonuses: {
      2: 41780, // Increases damage and healing done by magical spells and effects by up to 20.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       The Defiler's Will                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=488/the-defilers-will
    id: 488,
    class: "Druid",
    setBonuses: {
      2: 41855, // +5 Stamina.
      3: 41854, // Increases your spell critical strike rating by 14.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Necropile Raiment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=122/necropile-raiment
    id: 122,
    class: -1,
    setBonuses: {
      2: 41642, // Increases defense rating by 5.
      3: 41827, // +5 Intellect.
      4: 41826, // +15 All Resistances.
      5: 41825, // Increases damage and healing done by magical spells and effects by up to 23.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Prayer of the Primal                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=465/prayer-of-the-primal
    id: 465,
    class: -1,
    setBonuses: {
      2: 41830, // Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Green Dragon Mail                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=490/green-dragon-mail
    id: 490,
    class: -1,
    setBonuses: {
      2: 41775, // Restores 3 mana per 5 sec.
      3: 21894, // Restores 20 mana per 5 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Bloodsoul Embrace                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=443/bloodsoul-embrace
    id: 443,
    class: -1,
    setBonuses: {
      3: 41675, // Restores 12 mana per 5 sec.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Vestments of the Virtuous                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=514/vestments-of-the-virtuous
    id: 514,
    class: -1,
    setBonuses: {
      2: 41883, // +8 All Resistances.
      4: 27778, // When struck in combat has a chance of shielding the wearer in a protective shield which will absorb 350 damage. (Proc chance: 2%)
      6: 41884, // Increases damage and healing done by magical spells and effects by up to 23.
      8: 41882, // +200 Armor.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         The Postmaster                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=81/the-postmaster
    id: 81,
    class: -1,
    setBonuses: {
      2: 41873, // +50 Armor.
      3: [41871, 41870], // +10 Fire Resistance. / +10 Arcane Resistance.
      4: 41872, // Increases damage and healing done by magical spells and effects by up to 12.
      5: [17498, 41869], // Increases run speed by 5%. / +10 Intellect.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Zanzil's Concentration                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=462/zanzils-concentration
    id: 462,
    class: -1,
    setBonuses: {
      2: [39702, 41894], // Increases your spell hit rating by 8. / Increases damage and healing done by magical spells and effects by up to 6.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Bloodvine Garb                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=421/bloodvine-garb
    id: 421,
    class: -1,
    setBonuses: {
      3: 41676, // Increases your spell critical strike rating by 28.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Sorcerer's Regalia                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=517/sorcerers-regalia
    id: 517,
    class: -1,
    setBonuses: {
      2: 41839, // +8 All Resistances.
      4: 27867, // When struck in combat has a chance of freezing the attacker in place for 3 sec. (Proc chance: 5%)
      6: 32451, // Increases damage and healing done by magical spells and effects by up to 23.
      8: 41840, // +200 Armor.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          The Elements                                          */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=187/the-elements
    id: 187,
    class: -1,
    setBonuses: {
      2: 29095, // +200 Armor.
      4: 41856, // Increases damage and healing done by magical spells and effects by up to 23.
      6: 27774, // Chance on spell cast to increase your damage and healing by up to 95 for 10 sec. (Proc chance: 4%)
      8: 41857, // +8 All Resistances.
    },
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   The Highlander's Fortitude                                   */
    /* ---------------------------------------------------------------------------------------------- */
    // https://tbc.wowhead.com/item-set=470/the-highlanders-fortitude
    id: 470,
    class: "Shaman",
    setBonuses: {
      2: 41638, // +5 Stamina.
      3: 39447, // Increases your spell critical strike rating by 14.
    },
  },
];
