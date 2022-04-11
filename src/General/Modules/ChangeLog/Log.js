/* -------------------------------------------------------------------------- */
/*                               Changelog Data                               */
/* -------------------------------------------------------------------------- */

/* ------- The latest update needs to be the first object in the array ------ */

// Template for Changelog Entry
// {version: "", update: , date: "", changes: ["",""]}

export const changeLog = [
  {
    version: "9.2 / 2.5.3",
    update: 14,
    date: "11th April",
    changes: [
      "Strength and agility items will no longer show in Upgrade Finder.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 13,
    date: "10th April",
    changes: [
      "Added Necrolord Paladin",
      "Bugfix: Sets with Unity on a ring slot + a regular legendary also on a ring should no longer fail to create a set using both.",
      "Bugfix: Fixed a bug where Unity could call the wrong formula if you were playing an unconventional covenant.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 12,
    date: "5th April",
    changes: [
      "New Trinket: Scars of Fraternal Strife.",
      "Revamped Sinister Teachings stat priorities based on new bugs found in-game.",
      "Added 272 versions of Amalgam's / Flask in prep for Legion timewalking next week.",
      "Added tooltips to Top Gear gems for a non-visual description."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 11,
    date: "22nd March (Bugfix)",
    changes: [
      "Bugfix: SimC imported Unity items should now have the correct item restriction attached.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 10,
    date: "17th March (Major)",
    changes: [
      "Added support for the Unity special legendary in all modules.",
      "Added manual Unity entry in any slot.",
      "New Trinket: Gemstone of Prismatic Brilliance.",
      "Added an option to show Upgrade Finder results in HPS instead of % gains.",
      "Bugfix: Upgrade Finder PVP items will now display at the correct item level.",
      "Bugfix: Manually added legendaries will once again have secondary stats.",
      "Bugfix: Burning Crusade items should once again import."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 9,
    date: "14th March (Major)",
    changes: [
      "Soleah's Secret Technique: Nerfed in-game. Values now match.",
      "Main Menu revamp. Hopefully this is more accessible to people new to the app.",
      "Multiple modules renamed to be less verbose.",
      "Disc Priest / Resto Druid: Added formulas for 4pc bonuses.",
      "Renamed a bunch of modules to make them easier to understand.",
      "Legendary card revamps: Covenant legendaries now displayed separately. Moved text into tooltip.",
      "Upgrade Finder: A number of missing items will now show up including tier pieces.",
      "Upgrade Finder: Tazavesh now split into two dungeons.",
      "Upgrade Finder: Legion items will no longer clog up the slot-by-slot lists.",
      "Upgrade Finder: Tier pieces will now highlight in yellow to make them easier to spot."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 8,
    date: "10th March (Minor Update)",
    changes: [
      "Added effect formulas for Antumbra, Shadow of the Cosmos.",
      "Bugfix: Paladin tier sets should now be correctly accounted for again",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 7,
    date: "9th March (Minor Update)",
    changes: [
      "Added Disc Priest 2pc.",
      "Added a label for Tier Pieces to make your collection easier to manage",
      "MW 2pc now includes additional Rising Mist healing (A ~5% increase in value).",
      "Bugfix: Orange Mageweave Shirt will no longer import as a Disc legendary.",
      "Bugfix: Origin will now import with the correct amount of intellect.",
      "Bugfix: Top Gear will now account for all sources of bonus mana."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 6,
    date: "7th March",
    changes: [
      "Added tier set effect formulas.",
      "Added world quest trinket: Symbol of the Raptura.",
      "Some minor fixes to item drop location data.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 5,
    date: "3rd March",
    changes: [
      "Added support for Origin - A BoE cape with variable stats.",
      "Added support for the Cosmic Protoweave & Ephemera Harmonizing Stone crafted effects.",
      "Bugfix: 262 Crafted items will now import with the correct number of stats.",
      "Bugfix: Pandaria items should now import at the correct item level.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 4,
    date: "1st March (Major Update)",
    changes: [
      "Added Mists of Pandaria Timewalking items.",
      "Added a WIP value to Sinister Teachings post-buff. To be refined with logs.",
      "Anduin ring should now show the correct secondary stats.",
      "Various minor visual fixes."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 3,
    date: "1st March (Minor Update)",
    changes: [
      "In-game hotfix: Reclaimer's Intensity Core rebalanced.",
      "In-game hotfix: First Class haste bonus nerfed by about ~75%.",
      "Bugfix: 262 crafted items should now import at the correct item level.",
      "Bugfix: Stats should once again DR correctly in Top Gear."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 2,
    date: "28th February (Major Update)",
    changes: [
      "Included the Bell and Ruby nerfs.",
      "Capped World Quest trinkets at 213 item level.",
      "Added raid BoEs.",
      "Fixed a few items appearing in the wrong slot.",
      "Updated MW legendary formulas.",
      "Removed 278 PVP category since they cap at 275.",
      "UI: Updated Item Cards."
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 1,
    date: "22nd February (Major Update)",
    changes: [
      "All content updated to patch 9.2.",
      "Added 9.2 trinkets, updated item level on old trinkets.",
      "Added special effect pieces like Genesis Lathe and Soulwarped Seal of Wrynn.",
      "Added Tazavesh to Upgrade Finder as a Mythic+ dungeon. Added new world boss.",
      "Updated spell models to 9.2. They might change further through the week.",
      "Removed Domination Gear & Effects.",
      "Various minor visual improvements."
    ],
  },
  {
    version: "9.1.5 / 2.5.2",
    update: 6,
    date: "10th January (Minor Update)",
    changes: [
      "Several large codebase changes in preparation for 9.2.",
      "200 ilvl crafted items should now import at the correct level.",
    ],
  },
  {
    version: "9.1.5 / 2.5.2",
    update: 5,
    date: "16 December (Minor Update)",
    changes: [
      "Added better error handling to Top Gear to help diagnose very rare crashes.",
      "Paladin (Dungeon): Reduced the expected proc rate of Flask of Solemn Night.",
      "Top Gear item limit increased to 32."
    ],
  },
  {
    version: "9.1.5 / 2.5.2",
    update: 4,
    date: "12 December (Minor Update)",
    changes: [
      "DR is now applied to So'leah's Secret Technique correctly.",
      "Moonlit Prism is now combined with spec cooldowns where applicable."
    ],
  },
  {
    version: "9.1.5 / 2.5.2",
    update: 3,
    date: "6 December (Major Update)",
    changes: [
      "Added Legion Timewalking gear.",
      "Added a Legion Timewalking section to the Upgrade Finder.",
      "Revamped how stat DR is calculated on trinkets, offering more accuracy in special cases like Flask of the Solemn Night."
    ],
  },
  {
    version: "9.1.5 / 2.5.2",
    update: 2,
    date: "16 November (Minor Update)",
    changes: [
      "Added Doomwalker anniversary gear.",
      "Added a few missing PVP items to the item DB.",
    ],
  },
  {
    version: "9.1.5 / 2.5.2",
    update: 1,
    date: "7 November (Major Update)",
    changes: [
      "Discipline Priest overhaul. Conduit / legendary information added.",
      "New Character panel incorporating old settings and SimC import panels.",
      "Recommended Slots added to prominent legendaries",
      "Legendaries can now be added manually with whichever Missives you want.",
      "Added a new Footer to the main menu to get back to the main QE site.",
      "Items can now be added manually without specifying a slot first.",
      "Top Gear & Trinket Analysis visual revamps.",
    ],
  },
  {
    version: "9.1 / 2.5.2",
    update: 26,
    date: "29th September",
    changes: [
      "Sets with two on-use trinkets will now be correctly devalued for Holy Paladin as the value of the second drops a lot.",
      "Added dungeon specific DPS values to the few specs that were still missing them to improve dom gem DPS accuracy.",
      "UI: Text updates and clarifications around the app.",
      "Removed the Hymnals in group setting. The percentage of people using this trinket is now near 0.",
      "Bugfix: Fixed the position of a few Venthyr conduit nodes.",
      "Bugfix: Fixed a rare bug where manually entering a domination item could add the gem type twice for the purpose of set bonuses."
    ],
  },
  {
    version: "9.1 / 2.5.2",
    update: 25,
    date: "20th September",
    changes: [
      "Prep for the release of a complete Disc backend overhaul.",
      "Bugfix: Fixed a new bug where specific effects could be DR'd twice.",
      "Improved help text around the app. Big stuff coming very soon!"
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 24,
    date: "8th September",
    changes: [
      "Bugfix: Maraads should now be scored correctly in the Top Gear module.",
      "Visual Fix: Versatility gems will now show the correct icon in Top Gear.",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 23,
    date: "1st September",
    changes: [
      "Bugfix: Prismatic sockets should no longer be scored twice in some scenarios.",
      "Bugfix: Titanic Ocular Gland should now use a sets highest stat in all modules.",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 21,
    date: "31st August",
    changes: [
      "WoW Hotfix: Domination Set Bonuses are now activated by two different slots instead of just one.",
      "Mistweaver: Added a Sinister Teachings dungeon profile. ",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 20,
    date: "24th August",
    changes: [
      "Added Domination Shard panel. Add your shards once, and then let QE Live automatically pick which are best.",
      "Full support in both Top Gear and Upgrade Finder.",
      "Removed the Vault Domination Gem setting. The panel does the same thing but is much easier to use.",
      "DPS from shards is now included in the Dungeon setting. Further settings will be available in this area soon.",
      "Re-added a delete button to items.",
      "Competitive Alternatives from the vault will now have the Vault colour scheme."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 19,
    date: "18th August",
    changes: [
      "Added full Multi-Model support for completely different playstyles.",
      "First version includes Sinister Teachings Mistweaver and Maraads Paladin.",
      "Updated spell data now that there's sufficient logs for the tier.",
      "Added support for enhanced conduits.",
      "You can now add items directly in Top Gear.",
      "Bugfix: The auto-socket items setting will no longer add a prismatic socket Dom items.",
      "Bugfix: Adding a Domination item without a gem inserted will no longer crash the app.",
      "BC: Fixed a bug where Top Gear could crash with specific items."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 18,
    date: "3rd August",
    changes: [
      "Winds of Winter buffed on live servers by 50%.",
      "Blood Link buffed on live servers by 20%.",
      "Multiple in-game bugs with Winds of Winter fixed including Ashen Hallow & Pets",
      "Bugfix: Fixed the order of two traits in Theotars tree.",
      "BC: Fixed a bug where Domination Shards could occasionally appear on BC items."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 17,
    date: "27th July",
    changes: [
      "Adjusted the power of set bonuses due to nerfs on live servers & then reverted them again."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 15,
    date: "26th July",
    changes: [
      "Fixed a bug where higher rank dom set bonuses were being calculated at a lower rank."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 14,
    date: "21st July",
    changes: [
      "Added Warlords of Draenor Timewalking items.",
      "Mistweaver: Added formulas for multiple legendaries.",
      "Adjusted Domination Set bonuses with live data. Removed their value in the Dungeon setting."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 13,
    date: "18th July",
    changes: [
      "Added a formula for the Celestial Spirits legendary.",
      "The Upgrade Finder upgrades-by-slot tab will now show item sources."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 12,
    date: "16th July",
    changes: [
      "Added Set Bonus Ranks.",
      "Added Forbidden Necromantic Tome."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 11,
    date: "14th July",
    changes: [
      "Vault: You can now choose which domination gem to socket in vault items.",
      "Added character covenant to cards.",
      "Bugfix: Character covenants will no longer reset occasionally."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 10,
    date: "13th July",
    changes: [
      "Bugfix: Fixed a bug that was preventing some players from loading the app",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 9,
    date: "12th July",
    changes: [
      "Shadowed Orb of Torment & Titanic Ocular Gland updated to post-buff values.",
      "You can now select your Covenant in the character right click menu to further tune results.",
      "Top Gear: 230 crafted items are now restricted to one per gear set.",
      "SimC Imports: Added support for the 'Linked Items' tag.",
      "Updated several portions of the model to better align with 9.1 data now that we have some early logs.",
      "Bugfix: 10% of the new crafted items use a unique bonus ID structure. This is now supported.",
      "Bugfix: Empty domination sockets in your equipped set will no longer cause Upgrade Finder results to be errant."  
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 8,
    date: "9th July",
    changes: [
      "First Class Healing Distributor was nerfed a second time, and that change is now live.",
      "Manual entry is now available for Domination sockets and will show on all socketed items.",
      "UI: Tidied up the stat text on items with leech. Also, Intellect will now always be listed first."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 7,
    date: "7th July",
    changes: [
      "Bugfix: Alchemy Stone now grants the correct amount of mana.",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 6,
    date: "6th July",
    changes: [
      "Tome of Insight / First Class Healing Distributor were nerfed in game, and this is live in all modules.",
      "Bugfix: The Tazavesh int proc necks will now import at the correct item level."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 5,
    date: "5th July",
    changes: [
      "Launched the 9.1 Upgrade Finder.",
      "Added a back button to the Retail upgrade Finder. BC already had it.",
      "Bugfix: Crafted items should no longer import with more stats than they should.",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 4,
    date: "4th July",
    changes: [
      "Added Spiritual Alchemy Stone to the trinket chart.",
      "Added formula for Perfectly Forged Credentials and variants.",
      "Added SimC Import support for 230 crafted items.",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 3,
    date: "1st July",
    changes: [
      "Updated Trinket Analysis Colors.",
      "Updated formulas for Anima Sphere, Hallowed Discernment and Well-Honed Instincts to match live values.",
      "Adjusted stat soft DR coefficients for the new patch.",
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 2,
    date: "30th June",
    changes: [
      "Soulbinds: Combat Med, Soothing Shade, Grove Invigoration and Bron all updated to the now nerfed in-game values.",
      "Disc Priest: Updated the default spell model for 9.1.",
      "New Trinket: Tome of Insight.",
      "Bugfix: Covenant icons should now appear as expected."
    ],
  },
  {
    version: "9.1 / 2.5.1",
    update: 1,
    date: "29th June",
    changes: [
      "Retail: All 9.1 content added to the game.",
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 9,
    date: "22nd June",
    changes: [
      "Bugfix: BC Troll Priests should no longer get an error when running Top Gear or Upgrade Finder.",
      "Bugfix: Importing Suffixed items multiple times should no longer double their stat allocations.",
      "Bugfix: Fixed a rare bug where some BC gems weren't using the correct stat line."
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 8,
    date: "10th June",
    changes: [
      "Improved clarity around the QE Import addon, and where to get it.",
      "Revamped the help text at the top of every module.",
      "BC: Added Badge gear to Upgrade Finder."
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 7,
    date: "8th June",
    changes: [
      "Fixed a bug where gems were being counted twice in set scores.",
      "Fixed a bug where Spirit was being undervalued for BC Druid.",
      "Fixed some minor UI bugs."
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 6,
    date: "2nd June",
    changes: [
      "Added support for gear with Suffixes (like of the Owl, of the Whale and so on).",
      "Added formulas for all levelling trinkets.",
      "Added a Top Gear setting to use the Honor Hold starter gems since blues / epics aren't really appropriate for levelling gear."
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 5,
    date: "1st June",
    changes: [
      "Added full support for all four Burning Crusade Classic specs.",
      "BC: Added Tier Sets module.",
      "Added Welcome screen for players new to the app.",
      "Retail / BC: All items now have attached tooltips."
    ],
  },
  {
    version: "9.0.5",
    update: 4,
    date: "29th April",
    changes: [
      "New 'auto-socket' setting in Top Gear / Upgrade Finder to automatically add sockets to compatible slots.",
      "Added the Hall of Fame. Thank you so much to all patrons.",
      "Added Darkmoon Deck: Repose to the trinket graph as requested.",
      "Significant visual revamps through the app!",
      "Sweeping code cleanup and revamps behind the scenes to prepare for both Burning Crusade and 9.1.",
    ],
  },
  {
    version: "9.0.5",
    update: 3,
    date: "23th March",
    changes: [
      "Added the Trinket Analysis module",
      "Added another large set of Russian translations",
      "Default class trinket models updated slightly. You should see only slight shifts.",
    ],
  },
  {
    version: "9.0.5",
    update: 2,
    date: "11th March",
    changes: [
      "Addded a beta version of the Russian language.",
      "Upgrade Finder Visual Update",
      "Quick Compare Visual Update",
      "Slightly adjusted Paladin default weights in response to the mana cost change.",
    ],
  },
  {
    version: "9.0.5",
    update: 1,
    date: "9th March",
    changes: [
      "9.05 fully implemented.",
      "9.0.5: Legendary changes to Paladin, Druid, Shaman.",
      "Upgrade Finder: Added all Valor ilvls for dungeon gear.",
      "Updated the default spell data for all specs.",
      "9.0.5: Trinkets with flat healing have been buffed by roughly 11%.",
      "9.0.5: Almost every piece of gear has shifted by 1-2 secondary and primary stats.",
    ],
  },
  {
    version: "9.0.2",
    update: 25,
    date: "3rd March",
    changes: [
      "Upgrade Finder 'Slots' - A New Tab to show you upgrades sorted by slot rather than drop location.",
      "Upgrade Finder: The Settings tab has been copied across from Top Gear.",
      "Various visual improvements across the app. (SimC import bar, Settings Bar, Language Selection, Menus, Icons & more).",
      "SimC strings for classes that differ to the one you have selected will now be rejected to avoid confusion",
      "Bugfix: Fixed a bug where sets with excess Leech would overly devalue the stat in Top Gear."
    ],
  },
  {
    version: "9.0.2",
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
    version: "9.0.2",
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
