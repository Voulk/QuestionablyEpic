/* ------------------- List of spells removed from the fight analysis module. ------------------- */
// These can be things like non-boss damage like Player spells cast while mind controlled,
// spells that cause the player to take damage like Warlocks Burning Rush/ Mage Cauterize.

export const spellExclusions = [
  // Melee
  1,
  // Stagger - Monk
  124255,
  // Eye of Corruption
  315161,
  // Grand Delusions
  315197,
  // Burning Rush - Warlock
  111400,
  // Cauterize - Mage
  86949,
  // Light of the Martyr - Paladin
  183998,
  // Cauterize - Mage
  87023,
  // Conflagrate - Warlock
  17962,
  // Earth Shock - Shaman
  8042,
  // Infinite Stars
  317265,
  // Lethal Strikes
  311192,
  // Meteor - Mage
  153561,
  // Ignite - Mage
  12654,
  // Execute - Warrior
  260798,
  // Blessing of Sacrifice - Paladin
  6940,
  // Psyche Shredder
  313663,
  // Kindred Protection - Druid
  327037,
  // Shadow Mend - Priest
  186263,
  // Shadow Word: Death - Priest
  32409,
  // Splintered Heart of Al'ar
  344909,
  // Soul Ignition
  345211,
];
