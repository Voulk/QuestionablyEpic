/* -------------------------------------------------------------------------- */
/*                               Changelog Data                               */
/* -------------------------------------------------------------------------- */

/* ------- The latest update needs to be the first object in the array ------ */

// Template for Changelog Entry
// {version: "", update: , date: "", changes: ["",""]}
;
export const changeLog = [
  {
    version: "9.0",
    update: 25,
    date: "2nd March",
    changes: [
      "Upgrade Finder - A New Tab to show you upgrades by equipment slots has been added.",
      "Character Panel - Minor Changes to prep for future work on saved log functionality.",
      "The SimC import bar for Quick Compare, Top Gear, Upgrade Finder has been slimmed down.",
      "Various visual improvements across the app. (Settings Bar, Language Selection, Menus, Icons etc)"
    ],
  },
  {
    version: "9.0",
    update: 24,
    date: "23rd February",
    changes: [
      "New: Added Recent articles and spec guides to the main menu.",
      "New: Top Gear now has a settings panel for advanced configuration.",
      "New: Added Burning Crusade Timewalking gear.",
      "Top Gear: Items that differ from what you have equipped will highlight in yellow.",
      "Top Gear: Revamped Competitive Alternatives & increased closest sets to 8 (was 4).",
      "Top Gear: Re-implemented diminishing returns formulas.",
      "Revamped character edit pane.",
      "Druid: Dark Titans Lesson now includes Photosynthesis value in dungeons.",
      "Heavy visual improvements through the app.",
    ],
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
      "General Draven's 'Hold Your Ground' has been updated to better reflect real world uptimes. The current Disc Priest bug is also included.",
    ],
  },
];
