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
      /* ---------------------------------- Kodohide Battlegear 4 Set --------------------------------- */
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

    default:
      return bonus_stats;
  }
}
