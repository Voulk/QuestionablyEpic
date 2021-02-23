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
    date: "23rd February", // TBA
    changes: [
      "New: Added Recent articles and spec guides to the main menu.",
      "New: Top Gear now has a settings panel for advanced configuration.",
      "Top Gear: Items that differ from what you have equipped will highlight in yellow.",
      "Top Gear: Revamped Competitive Alternatives & increased closest sets to 8 (was 4).",
      "Top Gear: Re-implemented diminishing returns formulas.",
      "Revamped character edit pane.",
      "Druid: Dark Titans Lesson now includes Photosynthesis value in dungeons.",
      "Heavy visual improvements through the app."
    ]
  },
  { 
  version: "9.0",
  update: 23,
  date: "11th February",
  changes: [
    "New: Changelog to improve transparency",
    "Large codebase revamp to prepare for the rest of the expansion.",
    "Updated: The Summary Panel in #Covenants should now be clearer to read.",
    "Venthyr Paladin Covenant Ability score now correctly displays HPS.",
    "Monk: Necrolord conduit 'Bone Marrow Hops' now correctly uses the 50% hit chance of Bonedust Brew",
    "General Draven's 'Hold Your Ground' has been updated to better reflect real world uptimes. The current Disc Priest bug is also included."
  ]
  },
];
