/* ---------------------------------------------------------------------------------------------- */
/*                  A static dictionary of all healer base-kit spell information.                 */
/* ---------------------------------------------------------------------------------------------- */

const SPELLS = [
  // Druid
  {
    id: 774,
    baseName: "Rejuvenation", // This is just an identifier for debugging purposes. It won't be shown to the user anywhere.
    ranks: [
      {
        rank: 1,
        healing: 8,
        manaCost: 25,
      },
      {
        rank: 2,
        healing: 14,
        manaCost: 40,
      },
    ],

    baseMana: 0.11,
    spellPower: 1.56,
    duration: 15,
    tickRate: 3,
  },
];

export default SPELLS;
