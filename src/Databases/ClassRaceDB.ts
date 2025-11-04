// Contains the list of races localization IDs for each class's available 

interface ClassRaceEntry {
  races: string[]; // Can arguably be its own type in future.
  gameType: gameTypes;
}

// TODO. This file is weirdly chunky and could be greatly slimmed down.
export const classRaceDB: Record<string, ClassRaceEntry> = {
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Paladins                                            */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Holy Paladin": {
    races: ["Earthen", "Draenei", "Dwarf", "Human", "Lightforged Draenei", "Dark Iron Dwarf", "Blood Elf", "Tauren", "Zandalari Troll"],
    gameType: "Retail",
  },

  /* --------------------------------------- Classic -------------------------------------- */
  "Holy Paladin Classic": {
    races: ["Draenei", "Dwarf", "Human", "Blood Elf", "Tauren"],
    gameType: "Classic",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Druids                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Restoration Druid": {
    races: ["Night Elf", "Worgen", "Kul Tiran", "Tauren", "Troll", "Highmountain Tauren", "Zandalari Troll"],
    gameType: "Retail",
  },

  /* --------------------------------------- Classic -------------------------------------- */
  "Restoration Druid Classic": {
    races: ["Night Elf", "Tauren", "Worgen", "Troll"],
    gameType: "Classic",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Evoker                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Preservation Evoker": {
    races: ["Dracthyr"],
    gameType: "Retail",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Priest                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Holy Priest": {
    races: [
      "Draenei",
      "Dwarf",
      "Gnome",
      "Human",
      "Night Elf",
      "Worgen",
      "Void Elf",
      "Lightforged Draenei",
      "Dark Iron Dwarf",
      "Kul Tiran",
      "Mechagnome",
      "Pandaren",
      "Blood Elf",
      "Goblin",
      "Tauren",
      "Troll",
      "Undead",
      "Nightborne",
      "Mag'har Orc",
      "Zandalari Troll",
      "Vulpera",
      "Highmountain Tauren",
      "Orc",
      "Dracthyr",
      "Earthen",
    ],
    gameType: "Retail",
  },
  "Discipline Priest": {
    races: [
      "Draenei",
      "Dwarf",
      "Gnome",
      "Human",
      "Night Elf",
      "Worgen",
      "Void Elf",
      "Lightforged Draenei",
      "Dark Iron Dwarf",
      "Kul Tiran",
      "Mechagnome",
      "Pandaren",
      "Blood Elf",
      "Goblin",
      "Tauren",
      "Troll",
      "Undead",
      "Nightborne",
      "Mag'har Orc",
      "Zandalari Troll",
      "Vulpera",
      "Highmountain Tauren",
      "Orc",
      "Dracthyr",
      "Earthen",
    ],
    gameType: "Retail",
  },

  /* --------------------------------------- Classic -------------------------------------- */
  "Holy Priest Classic": {
    races: ["Pandaren", "Goblin", "Draenei", "Dwarf", "Human", "Night Elf", "Blood Elf", "Troll", "Undead", "Gnome", "Worgen", "Tauren"],
    gameType: "Classic",
  },
  "Discipline Priest Classic": {
    races: ["Pandaren", "Goblin", "Draenei", "Dwarf", "Human", "Night Elf", "Blood Elf", "Troll", "Undead", "Gnome", "Worgen", "Tauren"],
    gameType: "Classic",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Shamans                                            */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Restoration Shaman": {
    races: [
      "Draenei",
      "Dwarf",
      "Dark Iron Dwarf",
      "Kul Tiran",
      "Pandaren",
      "Goblin",
      "Orc",
      "Tauren",
      "Troll",
      "Highmountain Tauren",
      "Mag'har Orc",
      "Zandalari Troll",
      "Vulpera",
      "Earthen",
    ],
    gameType: "Retail",
  },

  /* --------------------------------------- Classic -------------------------------------- */
  "Restoration Shaman Classic": {
    races: ["Draenei", "Orc", "Pandaren", "Tauren", "Troll", "Dwarf", "Goblin"],
    gameType: "Classic",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Monks                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */

  "Mistweaver Monk": {
    races: [
      "Draenei",
      "Dwarf",
      "Gnome",
      "Human",
      "Night Elf",
      "Void Elf",
      "Dark Iron Dwarf",
      "Kul Tiran",
      "Mechagnome",
      "Pandaren",
      "Goblin",
      "Lightforged Draenei",
      "Worgen",
      "Blood Elf",
      "Orc",
      "Tauren",
      "Troll",
      "Undead",
      "Nightborne",
      "Highmountain Tauren",
      "Mag'har Orc",
      "Zandalari Troll",
      "Vulpera",
      "Earthen",
    ],
    gameType: "Retail",
  },
  "Mistweaver Monk Classic": {
    races: [
      "Draenei",
      "Dwarf",
      "Gnome",
      "Human",
      "Night Elf",
      "Pandaren",
      "Blood Elf",
      "Orc",
      "Tauren",
      "Troll",
      "Undead",
    ],
    gameType: "Classic",
  },
};
