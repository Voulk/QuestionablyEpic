/* -------------------------------------------------------------------------- */
/*                               Changelog Data                               */
/* -------------------------------------------------------------------------- */

/* ------- The latest update needs to be the first object in the array ------ */

// Template for Changelog Entry
// {version: "", update: , date: "", changes: ["",""]}

export const changeLog = [
  { 
    version: "9.0",
    update: 24,
    date: "15th February", // TBA
    changes: [
      "Top Gear: Items that differ from what you have equipped will highlight in yellow.",
      "Top Gear: Expanded Competitive Alternatives to your closest 8 sets (was 4).",
      "Top Gear: Re-implemented diminishing returns formulas.",
      "Revamped the character edit pane.",
      "Druid: Dark Titans Lesson now includes Photosynthesis in dungeons."
    ]
  },
  { 
  version: "9.0",
  update: 23,
  date: "11th February",
  changes: [
    "Implemented Changelog to improve transparency",
    "Large codebase revamp to prepare for the rest of the expansion",
    "Updated Summary Panel on the Covenant Exploration page to be clearer on what it represents",
    "Venthyr Paladin Covenant Ability score now correctly displays it's HPS",
    "Necrolord Monk 'Bone Marrow Hops' conduit now correctly uses the 50% hit chance of 'Bonedust Brew'",
    "General Draven's 'Hold Your Ground' has been updated to better reflect real world uptimes. The Spirit Shell bug is also now accounted for."
  ]
  },
];
