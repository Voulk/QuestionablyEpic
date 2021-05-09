export function getSpell(effectID, player, contentType) {
  let bonus_stats = {};

  switch (effectID) {
    case 32102:
      /* ---------------------------------------- Mana Regen 5% --------------------------------------- */
      /* ----------------------------------- Primal Mooncloth 3 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=32102/mana-regen-5
      // Allow 5% of your Mana regeneration to continue while casting.
      // Math here
      break;

    case 32196:
      /* ---------------------------------- Increased Dam - Intellect --------------------------------- */
      /* ---------------------------------- Wrath of Spellfire 3 Set ---------------------------------- */
      // https://tbc.wowhead.com/item-set=552/wrath-of-spellfire
      // Increases spell damage by up to 7% of your total Intellect.
      // Math here
      break;

    case 39372:
      /* -------------------------------------- Frozen Shadoweave ------------------------------------- */
      /* ----------------------------------- Shadow's Embrace 3 Set ----------------------------------- */
      // https://tbc.wowhead.com/item-set=553/shadows-embrace
      // Your Frost and Shadow damage spells heal you for 2% of the damage they deal.
      // Math here
      break;

    case 41591:
      /* ------------------------------------ Increased Mana Regen ------------------------------------ */
      /* ------------------------------------ Windhawk Armor 3 Set ------------------------------------ */
      // https://tbc.wowhead.com/spell=41591/increased-mana-regen
      // Restores 8 mana per 5 sec.
      // Math here
      break;

    case 37564:
      /* --------------------------------- Improved Prayer of Healing --------------------------------- */
      /* ----------------------------------- Incarnate Raiment 2 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=37564/improved-prayer-of-healing
      // Your Prayer of Healing spell now also causes an additional 150 healing over 9 sec.
      // Math here
      break;

    case 37568:
      /* ------------------------------------ Greater Heal Discount ----------------------------------- */
      /* ----------------------------------- Incarnate Raiment 4 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=37568/greater-heal-discount
      // Each time you cast Flash Heal, your next Greater Heal cast within 15 sec has its casting time reduced by 0.1, stacking up to 5 times.
      // Math here
      break;

    case 28775:
      /* ------------------------------------- Judgement of Light ------------------------------------- */
      /* ----------------------------------- Redemption Armor 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=28775/judgement-of-light
      // Increases the amount healed by your Judgement of Light by 20.
      // Math here
      break;

    case 28774:
      /* ------------------------------------------ Lay Hands ----------------------------------------- */
      /* ----------------------------------- Redemption Armor 4 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=28774/lay-hands
      // Reduces cooldown on your Lay on Hands by 12 min.
      // Math here
      break;

    case 28789:
      /* ----------------------------------------- Holy Power ----------------------------------------- */
      /* ----------------------------------- Redemption Armor 6 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=28789/holy-power
      // Your Flash of Light and Holy Light spells have a chance to imbue your target with Holy Power. (Proc chance: 10%)
      // Math here
      break;

    case 28787:
      /* ------------------------------------------- Cleanse ------------------------------------------ */
      /* ----------------------------------- Redemption Armor 8 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=28787/cleanse
      // Your Cleanse spell also heals the target for 200.
      // Math here
      break;

    case 32106:
      /* ------------------------------------ Lesser Spell Blasting ----------------------------------- */
      /* --------------------------------- Spellstrike Infusion 2 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=32106/lesser-spell-blasting
      // Gives a chance when your harmful spells land to increase the damage of your spells and effects by 92 for 10 sec. (Proc chance: 5%)
      // Math here
      break;

    case 37288:
      /* ---------------------------------------- Mana Restore ---------------------------------------- */
      /* ------------------------------------ Malorne Raiment 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37288/mana-restore
      // Your helpful spells have a chance to restore up to 120 mana. (Proc chance: 5%)
      // Math here
      break;

    case 37292:
      /* --------------------------------- Improved Nature's Swiftness -------------------------------- */
      /* ------------------------------------ Malorne Raiment 4 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37292/improved-natures-swiftness
      // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
      // Math here
      break;

    case 37210:
      /* --------------------------------- Improved Mana Spring Totem --------------------------------- */
      /* ------------------------------------ Cyclone Raiment 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37210/improved-mana-spring-totem
      // Your Mana Spring Totem ability grants an additional 3 mana every 2 sec.
      // Math here
      break;

    case 37211:
      /* --------------------------------- Improved Nature's Swiftness -------------------------------- */
      /* ------------------------------------ Cyclone Raiment 4 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37211/improved-natures-swiftness
      // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
      // Math here
      break;

    case 41828:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      /* ---------------------------------- Netherstrike Armor 3 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=41828/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 32200:
      /* -------------------------------- Increased Healing - Intellect ------------------------------- */
      /* ----------------------------------- Whitemend Wisdom 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=32200/increased-healing-intellect
      // Increases healing by up to 10% of your total Intellect.
      // Math here
      break;

    case 37182:
      /* -------------------------------- Increased Judgement of Light -------------------------------- */
      /* ----------------------------------- Justicar Raiment 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37182/increased-judgement-of-light
      // Increases the amount healed by your Judgement of Light by 20.
      // Math here
      break;

    case 37183:
      /* ------------------------------------ Divine Favor Cooldown ----------------------------------- */
      /* ----------------------------------- Justicar Raiment 4 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37183/divine-favor-cooldown
      // Reduces the cooldown on your Divine Favor ability by 15 sec.
      // Math here
      break;

    case 28818:
      /* --------------------------------------- Totemic Energy --------------------------------------- */
      /* ---------------------------------- The Earthshatterer 2 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28818/totemic-energy
      // Reduces the mana cost of your totem spells by 12%.
      // Math here
      break;

    case 29171:
      /* --------------------------------------- Strong Current --------------------------------------- */
      /* ---------------------------------- The Earthshatterer 4 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=29171/strong-current
      // Increases the mana gained from your Mana Spring totems by 25%.
      // Math here
      break;

    case 28823:
      /* ---------------------------------------- Totemic Power --------------------------------------- */
      /* ---------------------------------- The Earthshatterer 6 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28823/totemic-power
      // Your Healing Wave and Lesser Healing Wave spells have a chance to imbue your target with Totemic Power. (Proc chance: 10%)
      // Math here
      break;

    case 28821:
      /* -------------------------------------- Lightning Shield -------------------------------------- */
      /* ---------------------------------- The Earthshatterer 8 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28821/lightning-shield
      // Your Lightning Shield spell also grants you 15 mana per 5 sec. while active.
      // Math here
      break;

    case 37594:
      /* ------------------------------------- Greater Heal Refund ------------------------------------ */
      /* ------------------------------------ Avatar Raiment 2 Set ------------------------------------ */
      // https://tbc.wowhead.com/spell=37594/greater-heal-refund
      // If your Greater Heal brings the target to full health, you gain 100 mana.
      // Math here
      break;

    case 26171:
      /* ---------------------------------- Increased Renew Duration ---------------------------------- */
      /* ------------------------------------ Avatar Raiment 4 Set ------------------------------------ */
      // https://tbc.wowhead.com/spell=26171/increased-renew-duration
      // Increases the duration of your Renew spell by 3 sec.
      // Math here
      break;

    case 46437:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      /* ---------------------------------- Kodohide Battlegear 2 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=46437/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 46834:
      /* --------------------------------- Restoration Regrowth Bonus --------------------------------- */
      // https://tbc.wowhead.com/spell=46834/restoration-regrowth-bonus
      // The casting time on your Regrowth spell is reduced by 0.20 sec. (Proc chance: 15%, 15s cooldown)
      // Math here
      break;

    case 37225:
      /* -------------------------------- Improved Lesser Healing Wave -------------------------------- */
      /* ----------------------------------- Cataclysm Raiment 2 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=37225/improved-lesser-healing-wave
      // Reduces the cost of your Lesser Healing Wave spell by 5%.
      // Math here
      break;

    case 37227:
      /* ------------------------------------ Improved Healing Wave ----------------------------------- */
      /* ----------------------------------- Cataclysm Raiment 4 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=37227/improved-healing-wave
      // Your critical heals from Healing Wave, Lesser Healing Wave, and Chain Heal reduce the cast time of your next Healing Wave spell by 0.50 sec for 10 sec.  This effect cannot occur more than once per minute. (1m cooldown)
      // Math here
      break;

    case 38410:
      /* ------------------------------- Reduced Prayer of Healing Cost ------------------------------- */
      /* -------------------------------- Vestments of Absolution 2 Set ------------------------------- */
      // https://tbc.wowhead.com/spell=38410/reduced-prayer-of-healing-cost
      // Reduces the mana cost of your Prayer of Healing ability by 10%.
      // Math here
      break;

    case 38411:
      /* ------------------------------------ Improved Greater Heal ----------------------------------- */
      /* -------------------------------- Vestments of Absolution 4 Set ------------------------------- */
      // https://tbc.wowhead.com/spell=38411/improved-greater-heal
      // Increases the healing from your Greater Heal ability by 5%.
      // Math here
      break;

    case 37556:
      /* --------------------------------- Binding Heal Cost Reduction -------------------------------- */
      /* ----------------------------------- Hallowed Raiment 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37556/binding-heal-cost-reduction
      // Gives you a 30% chance to avoid interruption caused by damage while casting Binding Heal.
      // Math here
      break;

    case 37558:
      /* --------------------------------- Improved Prayer of Mending --------------------------------- */
      /* ----------------------------------- Hallowed Raiment 4 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=37558/improved-prayer-of-mending
      // Your Prayer of Mending heals an additional 100 health.
      // Math here
      break;

    case 37607:
      /* -------------------------------------- Spell Hit Rating -------------------------------------- */
      /* ---------------------------------- Mana-Etched Regalia 2 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=37607/spell-hit-rating
      // Increases your spell hit rating by 35.
      // Math here
      break;

    case 37619:
      /* -------------------------------------- Spell Power Bonus ------------------------------------- */
      /* ---------------------------------- Mana-Etched Regalia 4 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=37619/spell-power-bonus
      // Your harmful spells have a chance to grant you up to 110 spell damage and healing for 15 sec. (Proc chance: 2%)
      // Math here
      break;

    case 28807:
      /* -------------------------------------------- Renew ------------------------------------------- */
      /* ---------------------------------- Vestments of Faith 2 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28807/renew
      // Reduces the mana cost of your Renew spell by 12%.
      // Math here
      break;

    case 28809:
      /* ---------------------------------------- Greater Heal ---------------------------------------- */
      /* ---------------------------------- Vestments of Faith 4 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28809/greater-heal
      // On Greater Heal critical hits, your target will gain Armor of Faith, absorbing up to 500 damage.
      // Math here
      break;

    case 28808:
      /* --------------------------------------- Reduced Threat --------------------------------------- */
      /* ---------------------------------- Vestments of Faith 6 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28808/reduced-threat
      // Reduces the threat from your healing spells.
      // Math here
      break;

    case 28802:
      /* ------------------------------------------ Epiphany ------------------------------------------ */
      /* ---------------------------------- Vestments of Faith 8 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=28802/epiphany
      // Each spell you cast can trigger an Epiphany, increasing your mana regeneration by 24 for 30 sec. (Proc chance: 5%)
      // Math here
      break;

    case 40043:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=40043/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 38426:
      /* --------------------------------------- Holy Light Crit -------------------------------------- */
      /* --------------------------------- Lightbringer Raiment 2 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=38426/holy-light-crit
      // Increases the critical strike chance of your Holy Light ability by 5%.
      // Math here
      break;

    case 38425:
      /* ----------------------------------- Improved Flash of Light ---------------------------------- */
      /* --------------------------------- Lightbringer Raiment 4 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=38425/improved-flash-of-light
      // Increases the healing from your Flash of Light ability by 5%.
      // Math here
      break;

    case 37313:
      /* --------------------------------------- Regrowth Bonus --------------------------------------- */
      /* ---------------------------------- Nordrassil Raiment 2 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=37313/regrowth-bonus
      // Increases the duration of your Regrowth spell by 6 sec.
      // Math here
      break;

    case 37314:
      /* --------------------------------------- Lifebloom Bonus -------------------------------------- */
      /* ---------------------------------- Nordrassil Raiment 4 Set ---------------------------------- */
      // https://tbc.wowhead.com/spell=37314/lifebloom-bonus
      // Increases the final amount healed by your Lifebloom spell by 150.
      // Math here
      break;

    case 46851:
      /* -------------------------------------- Holy Shock Bonus -------------------------------------- */
      /* -------------------------------- Gladiator's Redemption 4 Set -------------------------------- */
      // https://tbc.wowhead.com/spell=46851/holy-shock-bonus
      // Increases the healing from your Holy Shock spell by 30%.
      // Math here
      break;

    case 37188:
      /* ------------------------------------- Improved Judgement ------------------------------------- */
      /* --------------------------------- Crystalforge Raiment 2 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=37188/improved-judgement
      // Each time you cast a Judgement, your party members gain 50 mana.
      // Math here
      break;

    case 37189:
      /* -------------------------------- Recuced Holy Light Cast Time -------------------------------- */
      /* --------------------------------- Crystalforge Raiment 4 Set --------------------------------- */
      // https://tbc.wowhead.com/spell=37189/recuced-holy-light-cast-time
      // Your critical heals from Flash of Light and Holy Light reduce the cast time of your next Holy Light spell by 0.50 sec for 10 sec.  This effect cannot occur more than once per minute. (1m cooldown)
      // Math here
      break;

    case 46414:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      /* ----------------------------------- Satin Battlegear 2 Set ----------------------------------- */
      // https://tbc.wowhead.com/spell=46414/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 33333:
      /* ----------------------------------- Weakened Soul Reduction ---------------------------------- */
      /* ----------------------------------- Satin Battlegear 4 Set ----------------------------------- */
      /* ------------------------------ High Warlord's Investiture 4 Set ------------------------------ */
      // https://tbc.wowhead.com/spell=33333/weakened-soul-reduction
      // Reduces the duration of the Weakened Soul effect caused by your Power Word: Shield by 2 sec.
      // Math here
      break;

    case 40049:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=46414/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 38417:
      /* --------------------------------- Reduced Swiftmend Cooldown --------------------------------- */
      // https://tbc.wowhead.com/spell=38417/reduced-swiftmend-cooldown
      // Reduces the cooldown of your Swiftmend ability by 2 sec.
      // Math here
      break;

    case 38420:
      /* ----------------------------------- Improved Healing Touch ----------------------------------- */
      // https://tbc.wowhead.com/spell=38420/improved-healing-touch
      // Increases the healing from your Healing Touch ability by 5%.
      // Math here
      break;

    case 40045:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=40045/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 28716:
      /* ---------------------------------------- Rejuvenation ---------------------------------------- */
      // https://tbc.wowhead.com/spell=28716/rejuvenation
      // Your Rejuvenation ticks have a chance to restore 60 mana, 8 energy, or 2 rage to your target.
      // Math here
      break;

    case 28743:
      /* ----------------------------------------- Dreamwalker ---------------------------------------- */
      // https://tbc.wowhead.com/spell=28743/dreamwalker
      // Reduces the mana cost of your Healing Touch, Regrowth, Rejuvenation,  and Tranquility spells by 3%.
      // Math here
      break;

    case 28744:
      /* ------------------------------------------ Regrowth ------------------------------------------ */
      // https://tbc.wowhead.com/spell=28744/regrowth
      // Your initial cast and Regrowth ticks will increase the maximum health of your target by up to 50, stacking up to 7 times.
      // Math here
      break;

    case 28719:
      /* ---------------------------------------- Healing Touch --------------------------------------- */
      // https://tbc.wowhead.com/spell=28719/healing-touch
      // On Healing Touch critical hits, you regain 30% of the mana cost of the spell.
      // Math here
      break;

    case 38434:
      /* ------------------------------------- Chain Heal Discount ------------------------------------ */
      // https://tbc.wowhead.com/spell=38434/chain-heal-discount
      // Your Chain Heal ability costs 10% less mana.
      // Math here
      break;

    case 38435:
      /* ------------------------------------- Improved Chain Heal ------------------------------------ */
      // https://tbc.wowhead.com/spell=38435/improved-chain-heal
      // Increases the amount healed by your Chain Heal ability by 5%.
      // Math here
      break;

    case 38499:
      /* ---------------------------- Nature's Swiftness Cooldown Reduction --------------------------- */
      // https://tbc.wowhead.com/spell=38499/natures-swiftness-cooldown-reduction
      // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
      // Math here
      break;

    case 40042:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=40042/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 40051:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=40051/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 40047:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=40047/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 39543:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=39543/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41829:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=41829/increased-critical-spell
      // Increases your spell critical strike rating by 14.
      // Math here
      break;

    case 39881:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=39881/increased-critical-spell
      // Increases your spell critical strike rating by 28.
      // Math here
      break;

    case 46455:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=46455/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 38466:
      /* ---------------------------- Nature's Swiftness Cooldown Reduction --------------------------- */
      // https://tbc.wowhead.com/spell=38466/natures-swiftness-cooldown-reduction
      // Reduces the cooldown of your Nature's Swiftness ability by 24 sec.
      // Math here
      break;

    case 46413:
      /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
      // https://tbc.wowhead.com/spell=46413/increased-resilience-35
      // +35 Resilience Rating.
      // Math here
      break;

    case 41561:
      /* ------------------------------------ Increased Critical 14 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41561/increased-critical-14
      // Increases your critical strike rating by 14.
      // Math here
      break;

    case 41562:
      /* ------------------------------------ Increased Mana Regen ------------------------------------ */
      // https://tbc.wowhead.com/spell=41562/increased-mana-regen
      // Restores 8 mana per 5 sec.
      // Math here
      break;

    case 41771:
      /* ----------------------------------- Increased Intellect 20 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41771/increased-intellect-20
      // +20 Intellect.
      // Math here
      break;

    case 41660:
      /* ---------------------------------- Resist Interrupt/Pushback --------------------------------- */
      // https://tbc.wowhead.com/spell=41660/resist-interrupt-pushback
      // Increases the chance spell pushback and spell interrupt will be resisted by 5%.
      // Math here
      break;

    case 41783:
      /* ------------------------------------- Increase Healing 55 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41783/increase-healing-55
      // Increases healing done by up to 55 and damage done by up to 19 for all magical spells and effects.
      // Math here
      break;

    case 41875:
      /* ------------------------------------ Increase Spell Dam 15 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41875/increase-spell-dam-15
      // Increases damage and healing done by magical spells and effects by up to 15.
      // Math here
      break;

    case 41890:
      /* ------------------------------------- Increase Healing 33 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41890/increase-healing-33
      // Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.
      // Math here
      break;

    case 41889:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41889/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 41833:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=41833/increased-critical-spell
      // Increases your spell critical strike rating by 15.
      // Math here
      break;

    case 41834:
      /* ------------------------------------ Increase Spell Dam 18 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41834/increase-spell-dam-18
      // Increases damage and healing done by magical spells and effects by up to 18.
      // Math here
      break;

    case 41754:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41754/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 23302:
      /* ---------------------------- Hammer of Justice Cooldown Reduction ---------------------------- */
      // https://tbc.wowhead.com/spell=23302/hammer-of-justice-cooldown-reduction
      // Reduces the cooldown of your Hammer of Justice by 10 sec.
      // Math here
      break;

    case 41753:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41753/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 21894:
      /* ----------------------------------------- Meditation ----------------------------------------- */
      // https://tbc.wowhead.com/spell=21894/meditation
      // Restores 20 mana per 5 sec.
      // Math here
      break;

    case 21853:
      /* ---------------------------------------- Reactive Fade --------------------------------------- */
      // https://tbc.wowhead.com/spell=21853/reactive-fade
      // When struck in melee there is a 50% chance you will Fade for 4 sec. (Proc chance: 50%, 5s cooldown)
      // Math here
      break;

    case 22010:
      /* ------------------------------------- Greater Heal Renew ------------------------------------- */
      // https://tbc.wowhead.com/spell=22010/greater-heal-renew
      // Your Greater Heals now have a heal over time component equivalent to a rank 5 Renew.
      // Math here
      break;

    case 41886:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41886/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 30778:
      /* ------------------------------ Increase Spell Dam 23 - Dreadmist ----------------------------- */
      // https://tbc.wowhead.com/spell=30778/increase-spell-dam-23-dreadmist
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 23565:
      /* ------------------------------------ Increased Aura Radii ------------------------------------ */
      // https://tbc.wowhead.com/spell=23565/increased-aura-radii
      // Increases the radius of a Paladin's auras to 40 yd.
      // Math here
      break;

    case 41782:
      /* ------------------------------------ Increase Spell Dam 47 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41782/increase-spell-dam-47
      // Increases damage and healing done by magical spells and effects by up to 47.
      // Math here
      break;

    case 23591:
      /* ------------------------------------------ Judgement ----------------------------------------- */
      // https://tbc.wowhead.com/spell=23591/judgement
      // Inflicts 60 to 66 additional Holy damage on the target of a Paladin's Judgement.
      // Math here
      break;

    case 26130:
      /* ----------------------------------- Avenger Judgment Bonus ----------------------------------- */
      // https://tbc.wowhead.com/spell=26130/avenger-judgment-bonus
      // Increases the duration of your Judgements by 20%.
      // Math here
      break;

    case 41648:
      /* ------------------------------------ Increase Spell Dam 71 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41648/increase-spell-dam-71
      // Increases damage and healing done by magical spells and effects by up to 71.
      // Math here
      break;

    case 21899:
      /* ------------------------------------- Improved Chain Heal ------------------------------------ */
      // https://tbc.wowhead.com/spell=21899/improved-chain-heal
      // Increases the amount healed by Chain Heal to targets beyond the first by 5%.
      // Math here
      break;

    case 23570:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=23570/increased-critical-spell
      // Increases your spell critical strike rating by 42.
      // Math here
      break;

    case 23551:
      /* -------------------------------------- Lightning Shield -------------------------------------- */
      // https://tbc.wowhead.com/spell=23551/lightning-shield
      // When you cast a Healing Wave or Lesser Healing Wave, there is a 25% chance the target also receives a free Lightning Shield that causes 50 Nature damage to attacker on hit. (Proc chance: 25%)
      // Math here
      break;

    case 21872:
      /* ------------------------------------ Faster Regrowth Cast ------------------------------------ */
      // https://tbc.wowhead.com/spell=21872/faster-regrowth-cast
      // Reduces the casting time of your Regrowth spell by 0.2 sec.
      // Math here
      break;

    case 21871:
      /* ------------------------------- Increased Rejuvenation Duration ------------------------------ */
      // https://tbc.wowhead.com/spell=21871/increased-rejuvenation-duration
      // Increases the duration of your Rejuvenation spell by 3 sec.
      // Math here
      break;

    case 41899:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41899/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 23044:
      /* ------------------------------ Psychic Scream Duration Increase ------------------------------ */
      // https://tbc.wowhead.com/spell=23044/psychic-scream-duration-increase
      // Increases the duration of your Psychic Scream spell by 1 sec.
      // Math here
      break;

    case 41900:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41900/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41705:
      /* ------------------------------ Increase Spell Dam 23 - Magister ------------------------------ */
      // https://tbc.wowhead.com/spell=41705/increase-spell-dam-23-magister
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41704:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41704/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 23564:
      /* --------------------------------- Improved Judgement of Light -------------------------------- */
      // https://tbc.wowhead.com/spell=23564/improved-judgement-of-light
      // Increases the chance of triggering a Judgement of Light heal by 10%.
      // Math here
      break;

    case 41785:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=41785/increased-critical-spell
      // Increases your spell critical strike rating by 14.
      // Math here
      break;

    case 41784:
      /* ------------------------------------ Increased Critical 14 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41784/increased-critical-14
      // Increases your critical strike rating by 14.
      // Math here
      break;

    case 21747:
      /* ----------------------------------------- Lawbringer ----------------------------------------- */
      // https://tbc.wowhead.com/spell=21747/lawbringer
      // Gives the Paladin a chance on every melee hit to heal your party for 189 to 211.
      // Math here
      break;

    case 26119:
      /* -------------------------------- Stormcaller Spelldamage Bonus ------------------------------- */
      // https://tbc.wowhead.com/spell=26119/stormcaller-spelldamage-bonus
      // Your Lightning Bolt, Chain Lightning, and Shock spells have a 20% chance to grant up to 50 Nature damage to spells for 8 sec. (Proc chance: 20%)
      // Math here
      break;

    case 26122:
      /* -------------------------------- Stormcaller Spelldamage Bonus ------------------------------- */
      // https://tbc.wowhead.com/spell=26122/stormcaller-chain-heal-bonus
      // -0.4 seconds on the casting time of your Chain Heal spell.
      // Math here
      break;

    case 41843:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41843/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 27498:
      /* -------------------------------------- Crusader's Wrath -------------------------------------- */
      // https://tbc.wowhead.com/spell=27498/crusaders-wrath
      // Chance on melee attack to increase your damage and healing done by magical spells and effects by up to 95 for 10 sec.
      // Math here
      break;

    case 41844:
      /* --------------------------------------- Attack Power 40 -------------------------------------- */
      // https://tbc.wowhead.com/spell=41844/attack-power-40
      // Increases attack power by 40.
      // Math here
      break;

    case 41842:
      /* ------------------------------------- Increased Armor 200 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41842/increased-armor-200
      // +200 Armor.
      // Math here
      break;

    case 41807:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41807/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41806:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41806/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 23557:
      /* ----------------------------------- Improved Thorns Damage ----------------------------------- */
      // https://tbc.wowhead.com/spell=23557/improved-thorns-damage
      // Damage dealt by Thorns increased by 4 and duration increased by 50%.
      // Math here
      break;

    case 39507:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=39507/increased-critical-spell
      // Increases your spell critical strike rating by 28.
      // Math here
      break;

    case 23556:
      /* ------------------------ Decreased Tranquility and Hurricane Cooldown ------------------------ */
      // https://tbc.wowhead.com/spell=23556/decreased-tranquility-and-hurricane-cooldown
      // Reduces the cooldown of your Tranquility and Hurricane spells by 50%.
      // Math here
      break;

    case 41759:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41759/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 41760:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41760/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 29093:
      /* ------------------------------- Increased Armor 200 Lightforge ------------------------------- */
      // https://tbc.wowhead.com/spell=29093/increased-armor-200-lightforge
      // +200 Armor.
      // Math here
      break;

    case 41818:
      /* -------------------------------- Attack Power 40 - Lightforge -------------------------------- */
      // https://tbc.wowhead.com/spell=41818/attack-power-40-lightforge
      // Increases attack power by 40.
      // Math here
      break;

    case 41819:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41819/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 21895:
      /* ----------------------------------- Increased Totem Radius ----------------------------------- */
      // https://tbc.wowhead.com/spell=21895/increased-totem-radius
      // The radius of your totems that affect friendly targets is increased to 30 yd.
      // Math here
      break;

    case 23572:
      /* ----------------------------------------- Mana Surge ----------------------------------------- */
      // https://tbc.wowhead.com/spell=23572/mana-surge
      // After casting your Healing Wave or Lesser Healing Wave spell, gives you a 25% chance to gain Mana equal to 35% of the base cost of the spell. (Proc chance: 25%, 1s cooldown)
      // Math here
      break;

    case 23573:
      /* ------------------------------------- Chain Healing Wave ------------------------------------- */
      // https://tbc.wowhead.com/spell=23573/chain-healing-wave
      // Your Healing Wave will now jump to additional nearby targets. Each jump reduces the effectiveness of the heal by 80%, and the spell will jump to up to two additional targets.
      // Math here
      break;

    case 41859:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41859/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 27774:
      /* -------------------------------------- The Furious Storm ------------------------------------- */
      // https://tbc.wowhead.com/spell=27774/the-furious-storm
      // Chance on spell cast to increase your damage and healing by up to 95 for 10 sec. (Proc chance: 4%)
      // Math here
      break;

    case 41860:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41860/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41858:
      /* ------------------------------------- Increased Armor 200 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41858/increased-armor-200
      // +200 Armor.
      // Math here
      break;

    case 26169:
      /* ------------------------------------ Oracle Healing Bonus ------------------------------------ */
      // https://tbc.wowhead.com/spell=26169/oracle-healing-bonus
      // 20% chance that your heals on others will also heal you 10% of the amount healed. (Proc chance: 20%)
      // Math here
      break;

    case 41770:
      /* ------------------------------------ Increased Mana Regen ------------------------------------ */
      // https://tbc.wowhead.com/spell=41770/increased-mana-regen
      // Restores 4 mana per 5 sec.
      // Math here
      break;

    case 24457:
      /* ------------------------------------ Increased Mana Regen ------------------------------------ */
      // https://tbc.wowhead.com/spell=24457/improved-holy-light
      // Reduces the casting time of your Holy Light spell by 0.1 sec.
      // Math here
      break;

    case 24460:
      /* ------------------------------------- Improved Blessings ------------------------------------- */
      // https://tbc.wowhead.com/spell=24460/improved-blessings
      // Increases the duration of all Blessings by 10%.
      // Math here
      break;

    case 41677:
      /* ----------------------------------- Increased All Resist 04 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41677/increased-all-resist-04
      // +4 All Resistances.
      // Math here
      break;

    case 41651:
      /* ------------------------------------ Increase Spell Dam 28 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41651/increase-spell-dam-28
      // Increases damage and healing done by magical spells and effects by up to 28.
      // Math here
      break;

    case 41799:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41799/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41798:
      /* ------------------------------------ Increased Stamina 20 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41798/increased-stamina-20
      // +20 Stamina.
      // Math here
      break;

    case 41639:
      /* ------------------------------------ Increased Stamina 05 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41639/increased-stamina-05
      // +5 Stamina.
      // Math here
      break;

    case 39420:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=39420/increased-critical-spell
      // Increases your spell critical strike rating by 14.
      // Math here
      break;

    case 29097:
      /* -------------------------------- Increased Armor 200 Wildheart ------------------------------- */
      // https://tbc.wowhead.com/spell=29097/increased-armor-200-wildheart
      // +200 Armor.
      // Math here
      break;

    case 41892:
      /* --------------------------------------- Attack Power 26 -------------------------------------- */
      // https://tbc.wowhead.com/spell=41892/attack-power-26
      // Increases attack power by 26.
      // Math here
      break;

    case 41891:
      /* ------------------------------------ Increase Spell Dam 15 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41891/increase-spell-dam-15
      // Increases damage and healing done by magical spells and effects by up to 15.
      // Math here
      break;

    case 27781:
      /* --------------------------------------- Nature's Bounty -------------------------------------- */
      // https://tbc.wowhead.com/spell=27781/natures-bounty
      // When struck in combat has a chance of returning 300 mana, 10 rage, or 40 energy to the wearer. (Proc chance: 2%)
      // Math here
      break;

    case 41893:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41893/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 21973:
      /* ---------------------------------- Prophecy Flash Heal Bonus --------------------------------- */
      // https://tbc.wowhead.com/spell=21973/prophecy-flash-heal-bonus
      // -0.1 sec to the casting time of your Flash Heal spell.
      // Math here
      break;

    case 21092:
      /* ----------------------------------- Increased Critical Holy ---------------------------------- */
      // https://tbc.wowhead.com/spell=21092/increased-critical-holy
      // Improves your spell critical strike rating by 28.
      // Math here
      break;

    case 23550:
      /* ---------------------------- Increased Prayer of Healing Criticals --------------------------- */
      // https://tbc.wowhead.com/spell=23550/increased-prayer-of-healing-criticals
      // Increases your chance of a critical hit with Prayer of Healing by 25%.
      // Math here
      break;

    case 39510:
      /* ----------------------------------- Increased Hit Rating 10 ---------------------------------- */
      // https://tbc.wowhead.com/spell=39510/increased-hit-rating-10
      // Increases your hit rating by 10.
      // Math here
      break;

    case 39509:
      /* ------------------------------------ Increased Critical 28 ----------------------------------- */
      // https://tbc.wowhead.com/spell=39509/increased-critical-28
      // Increases your critical strike rating by 28.
      // Math here
      break;

    case 41669:
      /* ---------------------------------- Increased Fire Resist 10 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41669/increased-fire-resist-10
      // +10 Fire Resistance.
      // Math here
      break;

    case 41805:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41805/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41804:
      /* ------------------------------------ Increased Stamina 15 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41804/increased-stamina-15
      // +15 Stamina.
      // Math here
      break;

    case 29091:
      /* -------------------------------- Increased Armor 200 Magister -------------------------------- */
      // https://tbc.wowhead.com/spell=29091/increased-armor-200-magister
      // +200 Armor.
      // Math here
      break;

    case 30777:
      /* ------------------------------ Increase Spell Dam 23 - Magister ------------------------------ */
      // https://tbc.wowhead.com/spell=30777/increase-spell-dam-23-magister
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 27867:
      /* ------------------------------------------- Freeze ------------------------------------------- */
      // https://tbc.wowhead.com/spell=27867/freeze
      // When struck in combat has a chance of freezing the attacker in place for 3 sec. (Proc chance: 5%)
      // Math here
      break;

    case 41822:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41822/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 41728:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41728/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 27780:
      /* --------------------------------------- Corrupted Fear --------------------------------------- */
      // https://tbc.wowhead.com/spell=27780/corrupted-fear
      // When struck in combat has a chance of causing the attacker to flee in terror for 2 seconds. (Proc chance: 2%)
      // Math here
      break;

    case 41729:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41729/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41727:
      /* ------------------------------------- Increased Armor 200 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41727/increased-armor-200
      // +200 Armor.
      // Math here
      break;

    case 41670:
      /* ------------------------------------ Increased Critical 14 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41670/increased-critical-14
      // Increases your critical strike rating by 14.
      // Math here
      break;

    case 41650:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=41650/increased-critical-spell
      // Increases your spell critical strike rating by 14.
      // Math here
      break;

    case 41780:
      /* ------------------------------------ Increase Spell Dam 20 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41780/increase-spell-dam-20
      // Increases damage and healing done by magical spells and effects by up to 20.
      // Math here
      break;

    case 41855:
      /* ------------------------------------ Increased Stamina 05 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41855/increased-stamina-05
      // +5 Stamina.
      // Math here
      break;

    case 41854:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=41854/increased-critical-spell
      // Increases your spell critical strike rating by 14.
      // Math here
      break;

    case 41642:
      /* -------------------------------------- Increased Defense ------------------------------------- */
      // https://tbc.wowhead.com/spell=41642/increased-defense
      // Increases defense rating by 5.
      // Math here
      break;

    case 41827:
      /* ----------------------------------- Increased Intellect 05 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41827/increased-intellect-05
      // +5 Intellect.
      // Math here
      break;

    case 41826:
      /* ----------------------------------- Increased All Resist 15 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41826/increased-all-resist-15
      // +15 All Resistances.
      // Math here
      break;

    case 41825:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41825/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41830:
      /* ------------------------------------- Increase Healing 33 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41830/increase-healing-33
      // Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.
      // Math here
      break;

    case 41775:
      /* ------------------------------------ Increased Mana Regen ------------------------------------ */
      // https://tbc.wowhead.com/spell=41775/increased-mana-regen
      // Restores 3 mana per 5 sec.
      // Math here
      break;

    case 41675:
      /* ------------------------------------ Increased Mana Regen ------------------------------------ */
      // https://tbc.wowhead.com/spell=41675/increased-mana-regen
      // Restores 12 mana per 5 sec.
      // Math here
      break;

    case 41883:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41883/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 27778:
      /* -------------------------------------- Divine Protection ------------------------------------- */
      // https://tbc.wowhead.com/spell=27778/divine-protection
      // When struck in combat has a chance of shielding the wearer in a protective shield which will absorb 350 damage. (Proc chance: 2%)
      // Math here
      break;

    case 41884:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41884/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41882:
      /* ------------------------------------- Increased Armor 200 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41882/increased-armor-200
      // +200 Armor.
      // Math here
      break;

    case 41873:
      /* ------------------------------------- Increased Armor 50 ------------------------------------- */
      // https://tbc.wowhead.com/spell=41873/increased-armor-50
      // +50 Armor.
      // Math here
      break;

    case 41871:
      /* ---------------------------------- Increased Fire Resist 10 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41871/increased-fire-resist-10
      // +10 Fire Resistance.
      // Math here
      break;

    case 41870:
      /* --------------------------------- Increased Arcane Resist 10 --------------------------------- */
      // https://tbc.wowhead.com/spell=41870/increased-arcane-resist-10
      // +10 Arcane Resistance.
      // Math here
      break;

    case 41872:
      /* ------------------------------------ Increase Spell Dam 12 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41872/increase-spell-dam-12
      // Increases damage and healing done by magical spells and effects by up to 12.
      // Math here
      break;

    case 17498:
      /* -------------------------------------------- Speed ------------------------------------------- */
      // https://tbc.wowhead.com/spell=17498/speed
      // Increases run speed by 5%.
      // Math here
      break;

    case 41869:
      /* ----------------------------------- Increased Intellect 10 ----------------------------------- */
      // https://tbc.wowhead.com/spell=41869/increased-intellect-10
      // +10 Intellect.
      // Math here
      break;

    case 39702:
      /* -------------------------------- Increased Spell Hit Chance 8 -------------------------------- */
      // https://tbc.wowhead.com/spell=39702/increased-spell-hit-chance-8
      // Increases your spell hit rating by 8.
      // Math here
      break;

    case 41894:
      /* ------------------------------------ Increase Spell Dam 6 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41894/increase-spell-dam-6
      // Increases damage and healing done by magical spells and effects by up to 6.
      // Math here
      break;

    case 41676:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=41676/increased-critical-spell
      // Increases your spell critical strike rating by 28.
      // Math here
      break;

    case 41839:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41839/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 32451:
      /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
      // https://tbc.wowhead.com/spell=32451/increase-spell-dam-23
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 41840:
      /* ------------------------------------- Increased Armor 200 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41840/increased-armor-200
      // +200 Armor.
      // Math here
      break;

    case 29095:
      /* -------------------------------- Increased Armor 200 Elements -------------------------------- */
      // https://tbc.wowhead.com/spell=29095/increased-armor-200-elements
      // +200 Armor.
      // Math here
      break;

    case 41856:
      /* ------------------------------ Increase Spell Dam 23 - Elements ------------------------------ */
      // https://tbc.wowhead.com/spell=41856/increase-spell-dam-23-elements
      // Increases damage and healing done by magical spells and effects by up to 23.
      // Math here
      break;

    case 27774:
      /* -------------------------------------- The Furious Storm ------------------------------------- */
      // https://tbc.wowhead.com/spell=27774/the-furious-storm
      // Chance on spell cast to increase your damage and healing by up to 95 for 10 sec. (Proc chance: 4%)
      // Math here
      break;

    case 41857:
      /* ----------------------------------- Increased All Resist 08 ---------------------------------- */
      // https://tbc.wowhead.com/spell=41857/increased-all-resist-08
      // +8 All Resistances.
      // Math here
      break;

    case 41638:
      /* ------------------------------------ Increased Stamina 05 ------------------------------------ */
      // https://tbc.wowhead.com/spell=41638/increased-stamina-05
      // +5 Stamina.
      // Math here
      break;

    case 39447:
      /* ---------------------------------- Increased Critical Spell ---------------------------------- */
      // https://tbc.wowhead.com/spell=39447/increased-critical-spell
      // Increases your spell critical strike rating by 14.
      // Math here
      break;

    default:
      return bonus_stats;
  }
}
