/* -------------------------------------------------------------------------- */
/*                               Changelog Data                               */
/* -------------------------------------------------------------------------- */

/* ------- The latest update needs to be the first object in the array ------ */

// Template for Changelog Entry
// {version: "", update: , date: "", changes: ["",""]}

interface entry {
  version: string;
  update: number;
  date: string;
  changes: string[];
}

export const getVersion = (): string => {
  return changeLog[0].update + " (" + changeLog[0].version + ")";
}

export const changeLog: entry[] = [
    {
    version: "11.1.7 / 5.5",
    update: 3,
    date: "July 28",
    changes: [ 
      "Classic: Added Blacksmithing support.",
      "Classic: MoP items with suffixes should now import.",
      "Classic: Added a setting to ignore enchants.",
      "Classic: Improved ReforgeLite export.",
    ]},
  {
    version: "11.1.7 / 5.5",
    update: 2,
    date: "July 25",
    changes: [ 
      "Bugfix: Retail gems will once again show on linked reports.",
      "Bugfix: Fixed a bug where retail tier sets wouldn't be correctly evaluated.",
      "Report export options are now game type specific.",
      "MoP: Added a PVP auto-add button for conquest gear.",
      "New trinket entries: Vision of the Predator, Jade Magistrate Figurine",
      "Bugfix: The Close Alternatives HPS number will now match the percentage.",
    ]},
  {
    version: "11.1.7 / 5.5",
    update: 1,
    date: "July 21",
    changes: [ 
      "Heavy app-wide refactor.",
      "Brought back a revamped Welcome screen to help introduce new players to the app.",
      "You can now swap character class at any time from the header instead of having to return to the main menu.",
      "Top Gear: A variety of Export options are now available on reports including a Classic export to the ReforgeLite addon.",
      "Upgrade Finder: Currently Equipped items are now shown on the report.",
      "Visual: Fixed a bug where Competitive Alternative tooltips would break if your app game type didn't match the report.",
      "Visual: Multiple improvements app-wide",
      "War Within: Embellishments can now be added directly in the Item Bar in addition to the cog menu.",
      "Classic: Auto-add buttons are now based and labelled on gear source rather than item level.",
      "Classic: The Trinket Analysis chart will now actively reforge secondary passives.",
      "Classic: Competitive Alternatives now works for Resto Druid.",
      "Classic: Added Upgrade Finder for all specs. ",
      "Classic: Added a player race dropdown.",
      "Classic: Spell information will now show on your Top Gear report based on the gear you're wearing."
  ]},
  {
    version: "11.1.7 / 5.5.0",
    update: 19,
    date: "July 1",
    changes: [ 
      "Classic: Transitioned to prepatch. Support is light.",
      "Updated Auto-add buttons to 684 item level.",
      "Added a few missing items.",
    ]},
  {
    version: "11.1.7 / 4.4.2",
    update: 18,
    date: "June 24",
    changes: [ 
      "Titan Disc Belt in-game buffs.",
      "Cataclysm: Added Cloak of the Frigid Winds.",
      "Some minor item tidy-up.",
    ]},
  {
    version: "11.1.7 / 4.4.2",
    update: 17,
    date: "June 17",
    changes: [ 
      "Added the Titan Disc Belt.",
    ]},
  {
    version: "11.1.5 / 4.4.2",
    update: 16,
    date: "May 20",
    changes: [ 
      "Corruption: Added Void Ritual to Top Gear.",
      "Fixed a bug with the log import.",
    ]},
  {
    version: "11.1.5 / 4.4.2",
    update: 15,
    date: "May 14",
    changes: [ 
      "Visual: Duplicate Rings / Trinkets will no longer show in Top Gear.",
      "Crafted items now use their own upgrade track, will upgrade with the 'upgrade all' button and can be upgraded via cog menu.",
      "Upgrade Finder: Added a 684 option to the dungeon track.",
    ]},
  {
    version: "11.1.5 / 4.4.2",
    update: 14,
    date: "May 13",
    changes: [ 
      "Enabled Turbo Boost item levels across the app.",
      "Top Gear will now make it clear which ring / trinket slot are being replaced.",
      "Reworked how Cyrce's Circlet handles DR in ultra high mastery sets.",
    ]},
  {
    version: "11.1.5 / 4.4.2",
    update: 13,
    date: "May 2",
    changes: [ 
      "In-game trinket tuning to Soulletting Ruby & Carved Blazikon Wax",
    ]},
  {
    version: "11.1.5 / 4.4.2",
    update: 12,
    date: "April 28",
    changes: [ 
      "Oracle Disc Priest Beta",
      "Vault items are now automatically upgraded to max instead of having to click it.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 12,
    date: "April 28",
    changes: [ 
      "Oracle Disc Priest Beta",
      "Vault items are now automatically upgraded to max instead of having to click it.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 11,
    date: "April",
    changes: [ 
      "Cataclysm: Added Epic Gem setting. Removed some more items that don't exist.",
      "Added Catalyst offpieces and BoE items to Upgrade Finder.",
      "Bugfix: Some missing crafted items will now appear in Upgrade Finder.",
      "Upgrade Finder: Non-max difficulties will now respect drop level.",
      "New Setting: Ignore Embellishment value.",
      "Some Chi-Ji model updates.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 10,
    date: "March 31",
    changes: [ 
      "Quality of Life UX changes for Top Gear reports.",
      "The playstyle dropdown is now in a more prominent place that's harder to miss.",
      "Miniature Roulette Wheel will now show secondaries in its tooltip.",
      "Top Gear tooltips will now show gems (they're still in their regular place too).",
      "Fixed an issue where manually added Miniature Roulette Wheel would show wrong secondaries on tooltip while calculating correctly.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 9,
    date: "March 27",
    changes: [ 
      "Mistweaver: Added Chi-Ji support.",
      "Sockets are now auto-added to all Rings / Necks for ease of use.",
      "Renovated Workshop loot table.",
      "Various minor fixes to the UI.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 8,
    date: "March 24",
    changes: [ 
      "In-game: Sigil of Algari Concordance nerfed by ~80%.",
      "Renamed Monk & Disc playstyles to make them clearer. Prepped the app for Chi-Ji support.",
      "Slightly lowered the percentage of Entropic Skardyn Core orbs picked up.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 7,
    date: "March 21",
    changes: [ 
      "In-game: Mister Pick-me-up nerfed 10%.",
      "Removed Sigil of Algari Concordance from chart & added a note on it.",
      "Cyrce's Circlet: Fixed a bug with the Old Salt Top Gear options",
      "Removed some inactive trinkets from the chart.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 7,
    date: "March 13",
    changes: [ 
      "Gallagio Bottle service: Slightly revamped how the penalty for spending 4s casting it is calculated. This is a slight bump to its value in most cases.",
      "Preservation Evoker: Top Gear & Upgrade Finder will now swap flasks / enchants more aggressively to search for the Haste break point.",
      "Resto Druid: Mastery percentage in Top Gear will now show up correctly. No change to any results."
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 7,
    date: "March 11",
    changes: [ 
      "Bugfix: Gallagio Bottle Service's coefficient was 5% too low post-buff.",
      "Holy Priest: Added Mastery value to Gallagio Bottle Service & Mr Pick-me-up.",
      "Mr Pick-me-up now uses its true ppm value now that we can confirm it works correctly.",
      "Slightly reduced the penalty for wearing double on-use trinkets.",
      "Added Amorphous Relic."
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 6,
    date: "March 9",
    changes: [ 
      "Bugfix: Jastor Diamond should now be evaluated correctly.",
      "Cleaned up Mechagon: Workshop loot table.",
      "Fixed Holy Paladin tier set",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 5,
    date: "March 5",
    changes: [ 
      "Fixed the seasonal upgrade track - this will mean you can upgrade your S2 items correctly.",
      "Added Dr Scrapheal and a few other delve items to the item chart.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 4,
    date: "March 4",
    changes: [ 
      "Fixed a bug undervaluing Best-in-slots.",
      "Added a few missing items.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 3,
    date: "March 3",
    changes: [ 
      "Updated Trinket graph filters.",
      "In-game change: Removed Roaring War Queen from Legendary Skippers.",
      "New Setting: Mr Pick-me-up overhealing.",
      "Upgrade Finder: Capped Delve item level at 665. Updated dungeon item levels.",
      "Added Season 2 upgrade tracks to item right cick menus.",
      "Added some Season 2 4pc bonuses.",
      "Fixed a bug where Ritual Commander's Ring wouldn't import correctly."
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 2,
    date: "February 27",
    changes: [ 
      "Added trinket hotfixes including to Eye of Kezan, Mister Pick-me-up & more.",
      "Fixed a bug that overvalued Soulletting Ruby.",
    ]},
  {
    version: "11.1 / 4.4.2",
    update: 1,
    date: "February 26",
    changes: [ 
      "Added support for Patch 11.1",
      "Added Delves tab to Upgrade Finder",
    ]},
  {
    version: "11.0.7 / 4.4.2",
    update: 1,
    date: "December 21",
    changes: [ 
      "Cataclysm: Added Dragon Soul support.",
      "Cataclysm: Added Holy Priest and Discipline Priest.",
      "Cataclysm: Added LFR difficulty to the trinket chart."
    ]},
  {
    version: "11.0.7 / 4.4.1",
    update: 2,
    date: "February 2",
    changes: [ 
      "Cata: Added new versions of the Love is in the Air necks.",
      "Scrapsinger's Symphony underperforms its spell data. Its ranking now reflects that.",
    ]},
  {
    version: "11.0.7 / 4.4.1",
    update: 1,
    date: "December 21",
    changes: [ 
      "Circlet setting moved to individual items instead of being global.",
      "Circlet will now show gems used in Top Gear.",
    ]},
  {
    version: "11.0.7 / 4.4.1",
    update: 1,
    date: "December 18",
    changes: [ 
      "New Module: Cyrce's Circlet",
      "Circlet added as an option in Top Gear with new setting",
    ]},
  {
    version: "11.0.5 / 4.4.1",
    update: 4,
    date: "November 21",
    changes: [ 
      "Bugfix: Leech should display correctly on Top Gear sets now. No change to results.",
      "Renamed a bunch of models to make it clearer what they're optimizing. Disc Priest M+ will now use a healing focused model.",
      "Cata: Random-affix Firelands items should now import fine. So should the Tempest Keeper plate belt.",
    ]},
  {
    version: "11.0.5 / 4.4.1",
    update: 3,
    date: "November 7",
    changes: [ 
      "QE Live: Firelands",
      "Cata: Fixed a bug with triple socketed items.",
      "Cata: Added new buttons for 378 and 391 loot.",
      "TWW: Added Dracthyr and Earthen race options.",
      "TWW: Fixed a bug where the Headless Horseman rings wouldn't import correctly",
    ]},
  {
    version: "11.0.5 / 4.4",
    update: 2,
    date: "October 26",
    changes: [ 
      "Added significantly more items from the anniversary event including timewalking dungeons and world bosses.",
    ]},
  {
    version: "11.0.5 / 4.4",
    update: 1,
    date: "October 22",
    changes: [ 
      "Added all WoW Anniversary items & effects.",
      "Added a Max Level slider to the Trinket Analysis chart.",
      "Fixed a bug that would prevent running 2x Ring of Earthen Craftsmanship in Top Gear.",
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 12,
    date: "October 14",
    changes: [ 
      "Enabled Crafting panel.",
      "Upgrade Finder: Jewelry will now have two sockets.",
      "Bugfix: Adding a socket to jewelry will now add two instead.",
      "Bugfix: Added a socket to, or converting a crafted item to Vault will now keep its secondaries.",

    ]},
  {
    version: "11.0.2 / 4.4",
    update: 11,
    date: "October 3",
    changes: [ 
      "Added an 'Upgrade All' button to SimC imports.",
      "In game change: Mercurial Egg buffed 5%.",
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 10,
    date: "September 27",
    changes: [ 
      "Bugfix: Necks will no longer be auto-socketed in Upgrade Finder.",
      "The 635 ilvl option is now correctly 636.",
      "Manually added necks will no longer default to 3 sockets.",

    ]},
  {
    version: "11.0.2 / 4.4",
    update: 9,
    date: "September 17",
    changes: [ 
      "Hovering over tooltips will now include secondaries / effects.",
      "Bugfix: Ascension / Symbiosis will now count toward the two embellishment limit when added via SimC.",
      "Bugfix: Sureki's is now correctly valued.",
      "In game changes: Algari Alchemist Stone buffed. Fateweaver's Needle / Mallet nerfed.",
      "Added Crystal Spire of Karabor.",
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 8,
    date: "September 16",
    changes: [ 
      "Weekly trinket hotfixes.",
      "Added Crafted tags to all PVP items.",
      "Imported items with suffixes will now function correctly with the gear upgrader.",
      "Added the Fateweavers Needle / Mallet effect.",
      "Tidied up some embellishments now we have live data.",
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 8,
    date: "September 9",
    changes: [ 
      "Upgrade Finder",
      "Added Armor Banding and the Linings to the context menu for crafted items.",
      "Writhing Armor Banding and Sureki Zealot's Insignia now work in Top Gear.",
      "New Auto-Add Option: M0 Gear."
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 7,
    date: "September 9",
    changes: [ 
      "Top Gear: Mistweaver, Resto Shaman",
      "You can now add embellishments to crafted weapons from the context menu on each.",
      "Bugfix: The top gear stat panel should no longer be missing 17k intellect.",
      "Bugfix: Crafted items can now be upgraded or socketed without losing secondaries"
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 7,
    date: "September 8",
    changes: [ 
      "Added a crafted tag to a lot more items.",
      "The S1 dungeon button will now only add season 1 items."
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 6,
    date: "September 8",
    changes: [ 
      "Added offspec weapons with a red warning.",
      "Top Gear: Resto Druid, Holy Paladin, Preservation Evoker.",
      "Added drop location to Trinket descriptions.",
      "New buttons to auto add all items from a content type."
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 5,
    date: "August 28",
    changes: [ 
      "Added a lot more early pre-season trinkets to the chart.",

    ]},
  {
    version: "11.0.2 / 4.4",
    update: 4,
    date: "August 26",
    changes: [ 
      "Embellishments: Added Captured Starlight, Woven Dawn, Woven Dusk. Binding of Binding nerfed in-game.",
      "Added a setting for the Dusk / Dawnthread embellishments.",
      "Added descriptions to many embellishments.",
      "Added some missing items.",
      "Added Darkmoon Decks to trinket chart."
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 3,
    date: "August 25",
    changes: [ 
      "The War Within: Added Trinket / Embellishment charts.",
      "The War Within: Revamped Trinket Deep Dive.",
      "Cataclysm: Added Goblin as a possible race option for Priests."
    ]},
  {
    version: "11.0.2 / 4.4",
    update: 2,
    date: "July 25",
    changes: [ 
      "Added some missing prepatch items.",
      "Added a button to auto-add ZG / ZA items."
    ]},
  {
    version: "11.0.0 / 4.4",
    update: 1,
    date: "July 25",
    changes: [ 
      "Added light prepatch support.",
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 8,
    date: "July 8",
    changes: [ 
      "Fixed a bug where Top Gear reports could show invalid items when viewed by other people.",
      "Cataclysm: Fixed warning about items not being included when they were.",
      "Cataclysm: Included a few more suffix bonus IDs for imports."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 7,
    date: "June 20",
    changes: [ 
      "Cataclysm: Import strings will now save between sessions as they already do for retail.",
      "Cataclysm: Top Gear will no longer create sets with two Planetary Bands.",
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 6,
    date: "June 18 (Bugfix)",
    changes: [ 
      "Cataclysm: Added Holy Paladin",
      "Fixed a bug with character creation that could cause results to look funny until you refreshed."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 6,
    date: "June 9 (Major)",
    changes: [ 
      "Cataclysm: Greatly increased the speed of Resto Druid Top Gear.",
      "Cataclysm: Fixed the stat allocation on non-plate 372 Affix belts and a few other throne items.",
      "Cataclysm: Fixed a few affix item imports."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 5,
    date: "June 4 (Minor)",
    changes: [ 
      "Cataclysm: Smart Reforge should now be more consistent on weapons.",
      "Cataclysm: Cogwheel sockets are now more dynamic around haste breakpoints.",
      "Cataclysm: Disabled character creation for specs that aren't implemented yet."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 4,
    date: "June 1 (Minor)",
    changes: [ 
      "Cataclysm: Added import support for Throne gear.",
      "Cataclysm: Swapped Shard of Woe to its post-nerf form.",
      "Improved Report loading when your selected game doesn't match the reports."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 4,
    date: "May 30 (Minor)",
    changes: [ 
      "Cataclysm: Socket bonuses now correctly added to each set.",
      "Cataclysm: Prismatic gems are now correctly ignored for the sake of socket bonuses.",
      "Cataclysm: Fixed an issue where imports could fail with non-socketed belt items."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 3,
    date: "May 29 (Minor)",
    changes: [ 
      "Cataclysm: Auto-fill can now be used after importing.",
      "Dragonflight: Fixed dungeon dropdowns in Upgrade Finder."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 2,
    date: "May 28 (Minor)",
    changes: [ 
      "Cataclysm: Added Haste enchant wrist setting.",
      "Fixed retail settings."
    ]},
  {
    version: "10.2.7 / 4.4",
    update: 1,
    date: "May 28 (Major)",
    changes: [ 
      "Cataclysm: Resto Druid.",
      "Revamped Top Gear report visuals.",
      "Revamped item selection cards.",
      "Added help button",
    ]},
  {
    version: "10.2.7",
    update: 18,
    date: "May 9 (Fixes)",
    changes: [ 
      "Upgrade Finder engineering items now only use the first missive stat given rather than both.",
      "Adding a set item manually will now always use the season 4 piece instead of falling back to a season 1-3 piece.",
    ]},
  {
    version: "10.2.6",
    update: 18,
    date: "May 3 (Fixes)",
    changes: [ 
      "Fixed a bug with the season 4 Paladin 4pc bonus.",
    ]},
  {
    version: "10.2.6",
    update: 18,
    date: "April 28 (Minor)",
    changes: [ 
      "Added Engraved Spearhead.",
      "Removed 535 version of Broodkeeper's Promise from the chart (it doesn't exist).",
    ]},
  {
    version: "10.2.6",
    update: 17,
    date: "April 25 (Major)",
    changes: [ 
      "Re-enabled Catalyst conversions.",
      "Wearing 2pc season 3 and 2pc season 4 sets will no longer grant double the set bonus.",
      "Evoker: Fixed a bug where the new 2pc could be overvalued (it's still great).",
      "Adventurer items can now be upgraded to 489.",
      "New Setting: Ruby Whelp Shell training mode.",
      "Fixed a bug where running upgrade finder without changing any sliders would set M+ items to 519 ilvl.",
      "Added more trinkets to the trinket chart.",
      "The Embellishment chart now obeys your 'Include Ally Stats' setting.",
    ]},
  {
    version: "10.2.6",
    update: 16,
    date: "April 23 (Minor)",
    changes: [ 
      "Added WQ trinkets to trinket chart.",
      "Fixed bug with upgrading Explorer / Adventurer items.",
    ]},
  {
    version: "10.2.6",
    update: 15,
    date: "April 23 (Major)",
    changes: [ 
      "QE Live now supports Season 4.",
      "Upgrade Finder: Added a Crafted items tab.",
    ]},
  {
    version: "10.2.6",
    update: 14,
    date: "March 18 (Fixes)",
    changes: [ 
      "Upgrade Finder: Items are once again sorted by upgrade percentage.",
      "Upgrade Finder: Fixed dungeon headers not reporting upgrade count.",
    ]},
  {
    version: "10.2.5",
    update: 13,
    date: "March 14 (Major)",
    changes: [ 
      "Upgrade Finder revamped. Reports can now be shared.",
      "New Settings: Runes, Phials and Gems.",
      "Added a button to automatically upgrade Vault items to max level.",
      "App-wide Visual Revamp."
    ]},
    {
      version: "10.2.5",
      update: 12,
      date: "February 21 (Fixes)",
      changes: [ 
        "Mistweaver Gem Fix.",
      ]},
  {
    version: "10.2.5",
    update: 11,
    date: "January 17 (Minor)",
    changes: [ 
      "Minor general 10.2.5 updates.",
      "Updated Evoker gearing after the 10.2.5 Reversion buff.",
      "Bugfix: Some timewalking items weren't importing correctly. They should work fine now."
    ]},
  {
    version: "10.2",
    update: 10,
    date: "January 10 (Minor)",
    changes: [ 
      "Ulduar Timewalking: Added formulas for all trinkets.",
      "The trinket graph filter buttons have been updated.",
      "Added Verdant Tether to the Embellishment Deep Dive."
    ]},
  {
    version: "10.2",
    update: 9,
    date: "December 29 (Minor)",
    changes: [ 
      "Mistweaver: Added Tear of Morning playstyle.",
    ]},
  {
    version: "10.2",
    update: 8,
    date: "December 26 (Minor)",
    changes: [ 
      "Timewalking: Added Skull of Gul'dan.",
      "Timewalking: Added some missing Legion timewalking items.",
      "Goldsteel Sabatons will now show in the Upgrade Finder for Paladin."
    ]},
  {
    version: "10.2",
    update: 7,
    date: "December 2",
    changes: [ 
      "Upgrade Finder: Non-max difficulties should now show correct item levels for later bosses.",
      "Item Cards: Add Socket should now work correctly.",
      "Item Cards: Added an option to add a Vault tag to items.",
    ]},
  {
    version: "10.2",
    update: 6,
    date: "December 1",
    changes: [ 
      "In-game Blossom buff #6",
      "Removed low season 2 item levels from the chart",
      "Re-evaluated the 1:1 portion of Smoldering Seedling",
    ]},
  {
    version: "10.2",
    update: 5,
    date: "November 22",
    changes: [ 
      "Saved SimC strings are now auto-selected when you open the SimC dialog and pasting a new string will automatically overwrite it.",
      "Converting an item via the Catalyst menu option will keep any Upgrade Tracks it's connected to.",
      "Added some missing item icons.",
      "Dreaming Devotion is now included as an option in Top Gear. It'll primarily be chosen in raid.",
    ]},
  {
    version: "10.2",
    update: 4,
    date: "November 16",
    changes: [ 
      "Added a ton of missing items.",
    ]},
  {
    version: "10.2",
    update: 3,
    date: "November 11",
    changes: [ 
      "Re-enabled Upgrade Finder & Cooldown Planner",
    ]},
  {
    version: "10.2",
    update: 2,
    date: "November 8",
    changes: [ 
      "Added formulas for a few new world quest trinkets",
    ]},
  {
    version: "10.2",
    update: 1,
    date: "November 7",
    changes: [ 
      "All season 3 content is now live.",
      "There's now a default version of every spec so that character creation is unnecessary.",
      "SimC strings are now saved in between app uses.",
      "Common offspec weapons are now included in the app (though of little value).",
      "Items you add manually will now automatically be added to the app."
    ]},
  {
    version: "10.1.7",
    update: 4,
    date: "October 17",
    changes: [ 
      "Added Terrific Tankard O' Terror (Brewfest)",
    ]},
  {
    version: "10.1.7",
    update: 3,
    date: "October 8",
    changes: [ 
      "Small fix for Holy Priest dungeon gem advice.",
      "Updated Lariat default gems to 5",
      "Note that most development has moved to the 10.2 branch of the app."
    ]},
  {
    version: "10.1.7",
    update: 2,
    date: "September 26",
    changes: [ 
      "Added some missing Timewalking items.",
    ]},
  {
    version: "10.1.7",
    update: 1,
    date: "September 5",
    changes: [ 
      "Added Dreamsurge items.",
      "Minor Resto Druid adjustments for the new talents",
    ]},
  {
    version: "10.1.5",
    update: 7,
    date: "August 23",
    changes: [ 
      "Added Black Temple Timewalking gear including Spire of Karabor and Memento of Tyrande.",
      "Added more information to the Upgrade Finder JSON file.",
    ]},
  {
    version: "10.1.5",
    update: 6,
    date: "August 10",
    changes: [ 
      "Added a healing focused playstyle for Resto Druid in Dungeons.",
      "Increased each models base HPS since we're now quite late in the tier. Results will be unchanged if you entered a log.",
      "Added more advice in Top Gear.",
      "Fixed some items icons."
    ]},
  {
    version: "10.1.5",
    update: 5,
    date: "July 19",
    changes: [ 
      "In game change: Tyrstone no longer splits to pets.",
      "Rewrote ally buff code to a more reasonable DPS / healing split.",
      "The Top Gear stat panel will now properly show stats gained from talents",
      "Bugfix: Leech will no longer be calculated incorrectly on a few specific items.",
      "UI Bugfix: Leech will once again show in Top Gear reports."
    ]},
  {
    version: "10.1.5",
    update: 4,
    date: "July 18",
    changes: [ 
      "Applied nerf to Echoing Tyrstone",
      "Rewrote ally stats code to better represent how many of them go on DPS players."
    ]},
  {
    version: "10.1.5",
    update: 3,
    date: "July 14",
    changes: [ 
      "New Feature: Top Gear Contexts. Top Gear will now give you extra information on your set sometimes to make it easier to parse out the decisions made.",
      "Relaxed the conservative estimate on Echoing Tyrstone now that we can see it's just as overpowered as expected.",
      "Added support for the new dungeon leather pants that have natural leech.",
      "Cooldown Planner: Fixed images not popping up.",
    ]},
  {
    version: "10.1.5",
    update: 2,
    date: "July 11",
    changes: [ 
      "Fixed a bug where Onyx Annulet was being undervalued in Raid today.",
      "You can once again select Tertiaries when manually adding items.",
      "Added support for the new Myth track."
    ]},
  {
    version: "10.1.5",
    update: 1,
    date: "July 11",
    changes: [ 
      "Added all 10.1.5 content including new items, effects and more.",
      "Updated all Paladin profiles for the rework.",
      "Upgrade Finder: Added LFR Max and Mythic Max options.",
      "Upgrade Finder: Reports will now have a unique ID in the URL for external resources like WoWAudit.",
      "Upgrade Finder: Added Dawn of the Infinite mega dungeon.",
      "Item Entry: You can now add a socket to crafted items. You can no longer add crafted items without Missives.",
      "Dev: Rewrote most of the application in Typescript.",
      "Dev: Updated to React 18."
  ]},
  {
    version: "10.1.0",
    update: 13,
    date: "21 June",
    changes: [ 
      "New Setting: Chromatic Essence Ally Buffs.",
      "Screaming Black Dragonscale will now show at the correct item level in MAX versions of the Upgrade Finder."
  ]},
  {
    version: "10.1.0",
    update: 12,
    date: "16 June",
    changes: [ 
      "New Setting: Chromatic Essence Stat / Resonance.",
      "Added 5 new Trinket Deep Dive cards.",
      "Bugfix: The expected uptime of Dragonscale and Call to Chaos decreased slightly to better match in-game values. Due to the way these trinkets proc they just don't live up to the uptime the spell data would suggest. Note that while this changes trinket order, both are still powerful options.",
      "In game Hotfix: Magmawclaw Lure nerfed by ~67%."
  ]},
  {
    version: "10.1.0",
    update: 11,
    date: "12 June",
    changes: [ 
      "Fixed a bug where Annulet could import at a higher item level depending on your version of the SimC addon.",
      "Added Magmaclaw Lure.",
  ]},
  {
    version: "10.1.0",
    update: 10,
    date: "7 June",
    changes: [ 
      "Added Heroic and Normal Max versions to Upgrade Finder so that you can test fully upgraded versions of items.",
      "Added an Avenging Crusader playstyle for Holy Paladin.",
      "Toxic Thorn boots now assume you spend more of the procs on healing and fewer on damage.",
  ]},
  {
    version: "10.1.0",
    update: 9,
    date: "23 May",
    changes: [ 
      "You can now click the cog on items to change its item level.",
      "New trinkets: Ward of Faceless Ire, Eye of Blazing Power (Timewalking), Necromantic Focus (Timewalking).",
      "New Embellishment: Slimy Expulsion Boots.",
      "Updated trinket chart with some missing items.",
      "Greatly improved error checking in top gear.",
      "Incarnate Icon now defaults to solo only.",
      "The legendary Evoker staff should now import and be scored correctly.",
      "Bugfix: Fixed a bug where three embellishments could be recommended if one was on a 1H Weapon or offhand.",
      "Bugfix: Items using a new in-game CurveID should now import correctly.",
      "Bugfix (Visual): The trinket chart will no longer occasionally show duplicates of icons"
  ]},
  {
    version: "10.1.0",
    update: 8,
    date: "17 May",
    changes: [ 
      "In game changes to Healing Darts, Adaptive Dracothyst Armguards and Sporecloak.",
      "Bugfix: Shaman tier 30 should now be correctly valued in all cases.",
      "Top Gear can no longer be crashed by running it while missing item slots. Improved error messaging.",
  ]},
  {
    version: "10.1.0",
    update: 8,
    date: "14 May",
    changes: [ 
      "Fixed wowhead tooltips across the app",
      "Improved how errors are handled.",
      "Crafted items should now import with the correct quality color (visual only).",
      "Adaptive Dracothyst Armguards now count as an Embellishment effect in Top Gear"
  ]},
  {
    version: "10.1.0",
    update: 7,
    date: "10 May",
    changes: [ 
      "Upgrade Finder: Removed old Azerite items & duplicate versions of tier sets.",
      "Added some missing icons.",
      "Updated the Revival Catalyst button to Season 2.",

  ]},
  {
    version: "10.1.0",
    update: 6,
    date: "10 May",
    changes: [ 
      "Re-enabled Cooldown Planner.",
      "Added Shadowflame-Tempered Armor Patch.",
      "Fixed a bug with the Intellect gem in Top Gear Reports."
  ]},
  {
    version: "10.1.0",
    update: 5,
    date: "9 May",
    changes: [ 
      "In game: Two class trinkets buffed by 5/10%.",
      "In game: Embellishments scale with secondaries once again.",
      "Added MW / Shaman class trinket",
  ]},
  {
    version: "10.1.0",
    update: 4,
    date: "5 May",
    changes: [ 
      "In game changes: Many Aberrus trinkets tuned.",
      "Bugfix: Flaring Cowl now correctly scales with item level again.",
  ]},
  {
    version: "10.1.0",
    update: 3,
    date: "4 May",
    changes: [ 
      "In game nerf: Spore Tender cut down 72%. QE/L enchant recommendations updated.",
      "In game buff: Neltharion's Call to Suffering now works on HoTs, raising value for Druid / HPriest.",
  ]},
  {
    version: "10.1.0",
    update: 2,
    date: "3 May",
    changes: [ 
      "Healing Darts no longer scale with crit or versatility in game.",
      "Ally buff effects will now be evaluated in Top Gear / Upgrade Finder too.",
      "Bugfix: Fixed the 'Show HPS' report style.",
      "Disc Priest: Updated the base model slightly.",
  ]},
  {
    version: "10.1.0",
    update: 1,
    date: "2 May",
    changes: [ 
      "Top Gear results can now be shared and returned to!",
      "All modules updated for season 2 including items, graphs, upgrade finder and more.",
      "All spec models updated for the patch.",
      "New: The Trinkets module now includes a card for the strongest trinkets, providing more information than just numbers alone.",
      "Main Menu rearranged to better support future modules that are coming soon."
  ]},
  {
    version: "10.0.7",
    update: 16,
    date: "2 April",
    changes: [ 
      "Auto-gem functionality is now disabled by default and can be correctly left off",
  ]},
  {
    version: "10.0.7",
    update: 15,
    date: "30 March",
    changes: [ 
      "New Setting: Pick your Primordial gem set or leave on Automatic",
      "New Setting: Auto socket items in your bags so that items are compared fairly.",
      "UI: Revamped how the Onyx Annulet is displayed.",
      "Fire Magic: Top Gear will now correctly handle external instances of Fire when evaluating effects that value it.",
      "New Embellishment: Adorned Fangs"
  ]},
  {
    version: "10.0.7",
    update: 14,
    date: "23 March",
    changes: [ 
      "Updated Onyx Annulet for in game tuning.",
  ]},
  {
    version: "10.0.7",
    update: 13,
    date: "22 March",
    changes: [ 
      "Added Onyx Annulet.",
      "Added some missing timewalking items."
  ]},
  {
    version: "10.0.5",
    update: 12,
    date: "25 February",
    changes: [ 
      "Bugfix: Non-embellishment special item effects should no longer count toward the limit.",
  ]},
  {
    version: "10.0.5",
    update: 11,
    date: "22 February",
    changes: [ 
      "All Neck items will now be added with 3 sockets.",
      "Crackling Codex of the Isles is now considered a crafted item.",
      "Added a few missing timewalking items.",
      "Bugfix: The potion embellishment will now count toward the limit of two."
  ]},
  {
    version: "10.0.5",
    update: 10,
    date: "2 February",
    changes: [ 
      "Bugfix: Gems will now work correctly in Quick Compare once again.",
      "Fixed a bug from update 9 that broke Idol trinkets.",
      "Bugfix: Evoker logs should no longer fail to import.",
  ]},
  {
    version: "10.0.5",
    update: 9,
    date: "31 January",
    changes: [ 
      "Added a setting to limit the number of Catalyst items that can be added to a Top Gear set.",
      "Updated specs to 10.0.5 where necessary.",
      "Added some missing 10.0.5 and timewalking items.",
  ]},
  {
    version: "10.0.2",
    update: 8,
    date: "18 January",
    changes: [ 
      "Intellect gems will now appear in Top Gear.",
      "Necks manually added with a socket, or in Upgrade Finder will now add 3 of them by default.",
      "Ruby Whelp Shell now has a setting that lets you select its training mode.",
      "Enabled the Creation Catalyst for Dragonflight (opens in-game next week).",
      "Bugfix: Kurog Grimtotem will now show at the appropriate item level in Upgrade Finder.",
      "Bugfix: Weapons with a UniqueEquip (like embellishments) will now be correctly limited.",
      "Bugfix: Fixed a bug where leech was being underallocated on trinkets.",
      "Added some missing Timewalking items.",
  ]},
  {
    version: "10.0.2",
    update: 7,
    date: "11 January",
    changes: [ 
      "Added Holy Priest tier and the Raging Tempest set bonuses.",
      "Engineering goggles should now import with the correct secondary stat.",
      "Added single stat options when manually adding crafted items for Engineering.",
      "The crafted rings will now have a default socket when added manually.",
      "Holy Paladin tier gear will now show up in upgrade finder."
  ]},
  {
    version: "10.0.2",
    update: 16,
    date: "4 January",
    changes: [ 
      "Gems have been revamped and dual stat gems are now default. Primary gem will be added very soon. All items with sockets have gone up correspondingly.",
      "Upgrade Finder: Very Rare raid items will now show at their correct item level.",
      "Bugfix: Profile should once again be accessible."
  ]},
  {
    version: "10.0.2",
    update: 15,
    date: "2 January",
    changes: [ 
      "Entering the app for the first time through a module will now return you to the main menu.",
      "Added Mistweaver 4pc set bonus. Refined Evoker 4pc value.",
      "Added the Assembly Guardian's Ring, and Seal of Filial Duty effects",
      "Updated enchants to use Rank 3s.",
      "Crafted rings should now be created with a socket when added manually.",
      "Top Gear will now cap sets at two embellishments.",
      "Bugfix: Evokers can now enter staves manually.",
      "Bugfix: You should be able to delete items again.",

  ]},
  {
    version: "10.0.2",
    update: 14,
    date: "28 December",
    changes: [ 
      "Added Settings for Incarnate Icon, JC Idol Trinkets and Alacritous Alchemist Stone",
      "Made a number of backend changes to try and fix grey screen errors.",
      "Signet of Titanic Insight should now import with a socket.",
  ]},
  {
    version: "10.0.2",
    update: 13,
    date: "22 December",
    changes: [ 
      "Added Disc Priest T29 set bonuses.",
      "Bugfix: HoTs / DoTs should now scale their partial tick correctly with Haste.",
      "Bugfix: Lariat should no longer sometimes import with incorrect secondaries.",
      "Bugfix: Mistweaver set bonuses should now be correctly added to Top Gear." 
  ]},
  {
    version: "10.0.2",
    update: 12,
    date: "19 December",
    changes: [ 
      "Upgrade Finder: M0 dungeons will now show 372 items only.",
      "Upgrade Finder: Added tier pieces to their respective bosses, and enabled Staves for Evokers.",
      "Upgrade Finder: Fixed a bug where selecting a high M+ level could crash the app.",
      "Added Inferal Writ & the Jewelcrafting Idols to the trinket chart.",
      "Multi-gem items will now display every socket in Quick Compare.",
      "Primal Ritual Shell now shows which buff it's recommending.",
      "Fixed an issue where on-use trinkets could be undervalued for Disc in Top Gear."
  ]},
  {
    version: "10.0.2",
    update: 11,
    date: "16 December",
    changes: [ 
      "Launched the Dragonflight version of Upgrade Finder.",
      "Minor changes to expected overheal on Healing Darts."
  ]},
  {
    version: "10.0.2",
    update: 10,
    date: "13 December",
    changes: [ 
      "Pushed a possible fix for an issue where Top Gear could crash immediately for some people.",
      "Added the in-game 5% nerf to Lariat."
  ]},
  {
    version: "10.0.2",
    update: 7,
    date: "10 December",
    changes: [ 
      "New Module: Embellishment Analysis.",
      "This offers an easy way to see all Embellishment effects at once. Consult a guide before crafting anything."
  ]},
  {
    version: "10.0.2",
    update: 6,
    date: "7 December",
    changes: [ 
      "In game hotfixes: Kyrakka's Searing Embers, Irideus Fragment, Darkmoon Deck: Dance",
      "Added the Blood of the Khansguard and Gladiator's Insignia of Alacrity trinkets."
  ]},
  {
    version: "10.0.2",
    update: 5,
    date: "6 December",
    changes: [ 
      "In game hotfixes: Dreamscape Prism, Gnollhide Belt",
      "Reduced the expected value of Miniature Singing stone in dungeon content."
  ]},
  {
    version: "10.0.2",
    update: 4,
    date: "5 December",
    changes: [ 
      "Crafted items can now be added manually via the Item Bar.",
      "Fixed a bug with Mistweaver & Evoker dungeon stat valuation.",
      "Bugfix: Leveling items should once again import correctly.",
  ]},
  {
    version: "10.0.2",
    update: 3,
    date: "3 December",
    changes: [ 
      "Added the Drakebreaker set bonuses",
      "Imported items now match in-game quality instead of being estimates.",
      "Bugfix: The 'Ally Benefits' setting should work.",
      "Bugfix: The Trinket Chart toggle buttons should work again.",
  ]},
  {
    version: "10.0.2",
    update: 2,
    date: "30 November",
    changes: [ 
      "Added Assembly Preserver's Band",
      "Broodkeeper's Promise updated to match in-game nerfs.",
      "Added a lot more world quest trinkets.",
  ]},
  {
    version: "10.0.2",
    update: 1,
    date: "28 November",
    changes: [ 
      "Dragonflight Support",
  ]},
  {
    version: "10.0.0",
    update: 1,
    date: "11 October",
    changes: [ 
      "Added a new Sequence Generator module. You can now select a talent build and sequence and it'll tell you how much damage / healing it'll do.",
      "Added support for the Evoker class.",
      "Added Dragonflight trinkets & item database."
  ]},
  {
    version: "10.0.2 / 3.4.0",
    update: 1,
    date: "15 November",
    changes: [ 
      "Preservation Evoker.",
      "Added Storm Hunter's Insignia, Versatile Storm Lure and Ekrazathal's Colored Fang.",
    ],
  },
  {
    version: "10.0.0 / 3.4.0",
    update: 1,
    date: "25 October",
    changes: [ 
      "Models updated for patch 10.0.",
      "Covenants module retired.",
      "Tier set bonuses disabled.",
      "Added the new race combinations for Priest."
    ],
  },
  {
    version: "9.2.7 / 3.4.0",
    update: 4,
    date: "11 October",
    changes: [ 
      "Mainhands and Offhands are now displayed separately in Top Gear.",
      "Re-added a bunch of trinkets to Trinket Analysis."
    ],
  },
  {
    version: "9.2.7 / 3.4.0",
    update: 3,
    date: "14 September",
    changes: [ 
      "New Setting: Hymnal Allies. Note that the trinket chart won't update automatically.",
      "Converted Burning Crusade characters to Wrath of the Lich King characters.",
      "Burning Crusade Classic support ended. Wrath of the Lich King support coming soon.",
      "Fixed Dreadfire Vessel item levels on the trinket chart.",
      "Slightly reduced the value of DPS in dungeons due to it being a healing heavy tier.",
      "Added Burning Crusade Timewalking items."
    ],
  },
  {
    version: "9.2.7",
    update: 3,
    date: "16 August (Minor)",
    changes: [ 
      "Added the Fleshrender's Meathook & Enforcer's Stun Grenade hotfixes.",
    ],
  },
  {
    version: "9.2.5 / 2.5.4",
    update: 21,
    date: "2 August (Major)",
    changes: [ 
      "Added all Season 4 Content.",
      "Cooldown Planner: Added Castle Nathria Fated.",
      "Upgrade Finder: Added Karazhan, Mechagon, Grimrail Depot and Iron Docks.",
      "Upgrade Finder: Added Castle Nathria and Sanctum of Domination at Fated item levels.",
      "New Effects: Added Mechagon ring sets, Drape of Shame, Neural Synapse Enhancer and more.",
      "Added Karazhan & Mechagon trinkets. Updated trinket item levels.",
    ],
  },
  {
    version: "9.2.5 / 2.5.4",
    update: 20,
    date: "15 July (Minor)",
    changes: [ 
      "Fight Analysis (Alpha): Added a personal defensives panel.",
      "Added the Circle of Life and Death legendary to manual legendary creation.",
      "Re-added Auxiliary Attendant Charm to the trinket chart."
    ],
  },
  {
    version: "9.2.5 / 2.5.4",
    update: 19,
    date: "7 July (Major)",
    changes: [ 
      "Added the following DPS Trinkets: Resonant Reservoir, Infinitely Divisible Ooze, Oakheart's Gnarled Root, Mailemental.",
      "Cooldown Planner (Alpha): Fixed a bug in ERT exports.",
      "Cooldown Planner (Alpha): Added a converter to WCL plan imports."
    ],
  },
  {
    version: "9.2.5 / 2.5.4",
    update: 18,
    date: "24 June (Major)",
    changes: [ 
      "Added an Alpha version of the Cooldown Planner & Fight Analysis Modules",
    ],
  },
  {
    version: "9.2.5 / 2.5.4",
    update: 17,
    date: "3 June",
    changes: [ 
      "Holy Priest: Added 2pc & 4pc set bonuses.",
      "Disc Priest: Implemented a few minor missing effects. Updated expected atonement overhealing.",
      "Antumbra: Added a separate version that holds at 19 stacks. A common strategy for high HPS logs",
      "Disc Priest: Added advanced reporting to Top Gear. In Console log for now, but expanded to UI soon."
    ],
  },
  {
    version: "9.2 / 2.5.4",
    update: 16,
    date: "18th April (Minor)",
    changes: [ 
      "Shields will once again appear in the Upgrade Finder for Paladins / Shamans.",
      "The Paladin 4pc bonus should no longer be heavily undervalued in dungeons.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 15,
    date: "20th April (Major)",
    changes: [ 
      "Venthyr Disc Priest!",
      "Catalyst Converter: Auto convert any item you own into it's catalyst version to see which is the larger upgrade.",
      "New optional Setting: Automatically add Leech to all Upgrade Finder items.",
      "New optional Setting: Auto-cap the number of post-catalyst items you want in your Top Gear sets.",
      "Added a link to the SimC addon page from the import dialog to make it easier for newbies to find.",
      "Bugfix: Manually added weapons & offhands can no longer accidentally be socketed by the player.",
    ],
  },
  {
    version: "9.2 / 2.5.3",
    update: 14,
    date: "12th April",
    changes: [ 
      "Amalgam's Seventh Spine: Nerfed in-game. It got about 37% weaker at max item level.",
      "Flask of Solemn Night: Adjusted value to more closely reflect what a spec can get out of ~1400 haste in a short window.",
      "Added 272 versions of the other Legion TW trinkets.",
      "Updated the base model HPS to around ~13.5k now that we're a month into the tier. No impact if you're entering a log.",
      "Bugfix: Top Gear should now always consider bonus mana in it's calculation.",
      "Strength and agility items will no longer show in Upgrade Finder."
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
      "Classic: Fixed a bug where Top Gear could crash with specific items."
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
      "Classic: Fixed a bug where Domination Shards could occasionally appear on Classic items."
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
      "Added a back button to the Retail upgrade Finder. Classic already had it.",
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
      "Bugfix: Classic Troll Priests should no longer get an error when running Top Gear or Upgrade Finder.",
      "Bugfix: Importing Suffixed items multiple times should no longer double their stat allocations.",
      "Bugfix: Fixed a rare bug where some Classic gems weren't using the correct stat line."
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 8,
    date: "10th June",
    changes: [
      "Improved clarity around the QE Import addon, and where to get it.",
      "Revamped the help text at the top of every module.",
      "Classic: Added Badge gear to Upgrade Finder."
    ],
  },
  {
    version: "9.0.5 / 2.5.1",
    update: 7,
    date: "8th June",
    changes: [
      "Fixed a bug where gems were being counted twice in set scores.",
      "Fixed a bug where Spirit was being undervalued for Classic Druid.",
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
      "Classic: Added Tier Sets module.",
      "Added Welcome screen for players new to the app.",
      "Retail / Classic: All items now have attached tooltips."
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
