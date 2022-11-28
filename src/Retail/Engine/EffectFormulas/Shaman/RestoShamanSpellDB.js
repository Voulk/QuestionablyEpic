
import { FamilyRestroom, SpellcheckRounded } from "@mui/icons-material";
import { runHeal, getHaste, runDamage } from "./RestoShamanRamps";

// This is the Rshaman spell database. 
// It contains information on every spell used in a ramp. Each spell is an array which means you can include multiple effects to code spells like Mindblast. 
// Any errors can be reported on the QE github, or to me directly on discord @Voulk1858.
// The spell database can be copied locally to a function and then individual spells edited for conduits, legendaries, soulbinds and so on.

// Let's go through the available fields.
// type: damage (effect deals damage), healing (effect heals), buff (effect adds a buff), atonementExtension (specific to Evang).
// cost: mana cost. This is currently represented as an integer, but could be converted to % mana cost in future.
// coeff: the spells intellect scaling. This is a combination of base coefficient, any possible spell ranks, and any relevant auras that might impact the spell.
// cooldown: a spells cooldown. 
// atoneOverheal: The average atonement overhealing caused by this spells cast. This is an average based on log analysis, and won't be perfectly accurate for every scenario.
// overheal: A healing spells typical overhealing percentage.
// secondaries: The secondary stats a spell scales with. Note that if it's a damage spell, you don't need to include the resulting atonements mastery scaling. 
// targets: The number of targets a spell hits. All effects will be applied to every target.
// tags: optional tags for specific functionality. Also includes scaling modifiers like spells that have square root scaling with number of targets.

// Buff spells also expect the following:
// buffDuration: How long the buff lasts
// buffType: 'stats' / 'spec'. Spec can cover spec interactions like Boon, Schism etc.
// stat: stat buff types should include which stat it gives you. Bell for example would add 'mastery'
// value: stat buff types should also have a value showing how much stat it gives you. When this is variable (like a trinket) then it can be fed into the ramp functions directly and
// any values displayed in this DB are placeholders only.

// Spell coefficients combine a spells base coefficient with any relevant auras that might impact the spell. 
export const SHAMANSPELLDB = {
  "Healing Surge": [{
    spellData: {id: 8004, icon: "spell_nature_healingway", cat: "heal"},
    type: "heal",
    castTime: 1.5,
    cost: 0.24,
    coeff: 2.48,
    expectedOverheal: 0.14,
    secondaries: ['crit', 'vers', 'mastery']
  }],
  "Wellspring": [{
    spellData: {id: 197997, icon: "ability_shawaterelemental_split", cat: "heal"},
    type: "heal",
    castTime: 1.5,
    cooldown: 20,
    targets: 6, // Wellspring will technically hit more than 6 targets, but the healing still caps out at 1x hit x 6 (divided by the number of targets hit).
    cost: 0.2,
    coeff: 1.9,
    expectedOverheal: 0.19,
    secondaries: ['crit', 'vers', 'mastery']
  }],
  "Chain Heal": [{
    spellData: {id: 1064, icon: "spell_nature_healingwavegreater", cat: "heal"},
    type: "function",
    castTime: 1.5,
    cost: 0.3,
    coeff: 2.1,
    targets: 4,
    bounceReduc: 0.7,
    expectedOverheal: 0.22,
    secondaries: ['crit', 'vers', 'mastery'],
    runFunc: function (state, spell) {
      let mult = 1;

      for (let i = 0; i < spell.targets; i++) {
        const newSpell = { type: "heal", coeff: spell.coeff * mult, expectedOverheal: spell.expectedOverheal, secondaries: ['crit', 'vers', 'mastery'], targets: 1 }
        runHeal(state, newSpell, "Chain Heal")
        mult *= spell.bounceReduc;
      }

    }
  }],
  "Riptide": [{ // charges?
    spellData: {id: 61295, icon: "spell_nature_riptide", cat: "heal"},
    type: "heal",
    castTime: 1.5,
    cost: 0.08,
    coeff: 1.7,
    cooldown: 6,
    hastedCooldown: false,
    secondaries: ['crit', 'vers', 'mastery'],
    expectedOverheal: 0.12,
  },
  {
    type: "buff",
    buffType: "heal",
    cost: 0,
    coeff: 0.22, // 
    tickRate: 3,
    buffDuration: 18,
    expectedOverheal: 0.3,
    secondaries: ['crit', 'vers', 'mastery'], // + Haste
    canPartialTick: true,
  }],
  "Healing Rain": [{
    spellData: {id: 73920, icon: "spell_nature_giftofthewaterspirit", cat: "heal"}, // cast id
    type: "buff",
    buffType: "heal",
    cost: 0.216,
    castTime: 2,
    coeff: 0.265,
    tickRate: 2,
    cooldown: 10,
    hastedCooldown: false, // ?
    buffDuration: 10,
    targets: 6,
    expectedOverheal: 0.15,
    secondaries: ['crit', 'vers', 'mastery'], // + Haste
    canPartialTick: true,
  }],
  /*
  "Overflowing Shores": [{
    spellData: {id: 73920, icon: "spell_nature_giftofthewaterspirit"},
    type: "heal",
    coeff: 0.25,
    targets: 6,
    expectedOverheal: 0.15,
    secondaries: ['crit', 'vers', 'mastery'], // + Haste
  }],*/
  "Cloudburst Totem": [{
    spellData: {id: 157153, icon: "ability_shaman_condensationtotem", cat: "cooldown"},
    type: "buff",
    name: "Cloudburst Totem",
    cost: 0.086,
    castTime: 1,
    buffType: "special",
    cooldown: 30,
    hastedCooldown: false,
    buffDuration: 15,
  }],
  "Ancestral Spirit": [{}],
  "Astral Recall": [{}],
  "Earthbind Totem": [{}],
  "Far Sight": [{}],
  "Flame Shock": [{
    spellData: {id: 188389, icon: "spell_fire_flameshock", cat: "damage"},
    type: "damage",
    castTime: 1.5,
    cost: 0.015,
    coeff: 0.195,
    secondaries: ['crit', 'vers'],
  },
  {
    cost: 0,
    castTime: 0,
    type: "buff",
    buffType: "damage",
    coeff: 0.116, // 
    tickRate: 2,
    buffDuration: 12,
    secondaries: ['crit', 'vers'], // + Haste
    canPartialTick: true,
  }],
  "Flametongue Weapon": [{}],
  "Ghost Wolf": [{}],
  "Bloodlust": [{}],
  "Lightning Bolt": [{
    spellData: {id: 188196, icon: "spell_nature_lightning", cat: "damage"},
    type: "damage",
    castTime: 2.5,
    cost: 0.01,
    coeff: 0.95,
    cooldown: 0,
    secondaries: ['crit', 'vers'],
  }],
  "Lightning Shield": [{}],
  "Primal Strike": [{}],
  "Water Walking": [{}],
  "Reincarnation": [{}],
  "Lava Burst": [{
    spellData: {id: 51505, icon: "spell_shaman_lavaburst", cat: "damage"},
    type: "damage",
    castTime: 2,
    cost: 0.025,
    coeff: 0.972, // flame shock aura double crit not accounted for
    cooldown: 8,
    hastedCooldown: false,
    secondaries: ['crit', 'vers'],
  }],
  "Healing Stream Totem": [{
    spellData: {id: 5394, icon: "inv_spear_04", cat: "heal"},
    type: "buff",
    buffType: "heal",
    cost: 0.09,
    castTime: 1,
    coeff: 0.47,
    tickRate: 2,
    cooldown: 30,
    hastedCooldown: false,
    buffDuration: 15,
    targets: 1,
    expectedOverheal: 0.15,
    secondaries: ['crit', 'vers', 'mastery'], // + Haste
    canPartialTick: true,
  }],
  "Acid Rain": [{}],
  "Flash Flood": [{}],
  "Water Totem Mastery": [{}],
  "Stormkeeper": [{}],
  "Spirit Link Totem": [{}],
  "Healing Tide Totem": [{
    spellData: {id: 108280, icon: "ability_shaman_healingtide", cat: "cooldown"},
    type: "buff",
    buffType: "heal",
    cost: 0.056,
    castTime: 1,
    coeff: 0.35,
    tickRate: 2,
    cooldown: 180,
    hastedCooldown: false,
    buffDuration: 10,
    targets: 20,
    expectedOverheal: 0.15,
    secondaries: ['crit', 'vers', 'mastery'], // + Haste
    canPartialTick: true,
  }],
  "Mana Tide Totem": [{}],
  "Unleash Life": [{ // todo special handling
    spellData: {id: 73685, icon: "spell_shaman_unleashweapon_life", cat: "heal"},
    type: "heal",
    cost: 0.04,
    castTime: 1.5,
    coeff: 1.9,
    cooldown: 15,
    secondaries: ['crit', 'vers', 'mastery'],
    hastedCooldown: false,
  }, {
    type: "buff",
    buffType: "special",
    buffDuration: 10,
  }],
  "Ancestral Protaction Totem": [{}],
  "Earthen Wall Totem": [{}],
  "Primordial Wave": [{}], // good luck
  "Downpour": [{
    spellData: {id: 207778, icon: "ability_mage_waterjet", cat: "heal"},
    type: "heal",
    castTime: 1.5,
    cooldown: 5, // increased by each target effectively healed
    targets: 6, // unleash life: 8
    cost: 0.2,
    coeff: 1.75,
    expectedOverheal: 0.19,
    secondaries: ['crit', 'vers', 'mastery']
  }],
  "Ascendance": [{
    spellData: {id: 114052, icon: "spell_fire_elementaldevastation", cat: "cooldown"},
    type: "heal",
    castTime: 1.5,
    cooldown: 180,
    targets: 1, // distributed
    cost: 0,
    coeff: 8.76,
    expectedOverheal: 0.19,
    secondaries: ['crit', 'vers', 'mastery']
  },
  {
    type: "buff",
    buffType: "special",
    castTime: 0,
    targets: 1, // distributed
    cost: 0.2,
    coeff: 1.75,
    expectedOverheal: 0.19,
    secondaries: ['crit', 'vers', 'mastery']
  }],
  "Earthen Elemental": [{}],
  "Astral Shift": [{}],
  "Frost Shock": [{
    spellData: {id: 196840, icon: "spell_frost_frostshock", cat: "damage"},
    type: "damage",
    castTime: 1.5,
    cost: 0.01,
    coeff: 0.63,
    secondaries: ['crit', 'vers'],
  }],
  "Earth Shield": [{}],
  "Wind Rush Totem": [{}],
  "Gust of Wind": [{}], // :)
  "Nature's Swiftness": [{}],
  "Mana Spring Totem": [{}],
  "Poison Cleansing Totem": [{}],
  "Stoneskin Totem": [{}],
  "Ancestral Guidance": [{
    spellData: {id: 108281, icon: "ability_shaman_ancestralguidance", cat: "cooldown"},
    type: "buff",
    buffType: "special",
    castTime: 0,
    cost: 0,
    coeff: 0.75, // distributed on 3
    expectedOverheal: 0.19,
    secondaries: ['crit', 'vers', 'mastery']
  }],

}


// Adding talents with pure utility benefit is not currently necessary.
export const shamanTalents = {
  // Class Talents
  earthShield: false,
  fireAndIce: false,
  focusedInsight: 0,


  // Spec Talents
  waterShield: false,
  tidalWaves: false,
  deluge: false,
  acidRain: false,
  callOfThunder: false,
  overflowingShores: 0, // /2
  lavaSurge: false,
  flashFlood: 0, // /2
  waterTotemMastery: false,
  wavespeakersBlessing: false,
  masterOfTheElements: false,
  cloudBurstTotem: false,
  livingStream: false,



}
