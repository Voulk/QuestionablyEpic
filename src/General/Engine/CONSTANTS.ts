

export const CONSTANTS = {
    dpsValue: 1, // In dungeon settings 
    allyStatWeight: 0.43, // 
    allyDPSPerPoint: 0.43 / 2000 * 30000, // Unused
    difficulties: {
        "LFR": 0,
        "LFRMax": 1,
        "normal": 2,
        "normalMax": 3,
        "heroic": 4,
        "heroicMax": 5,
        "mythic": 6,
        "mythicMax": 7,
    },
    socketSlots: ["Head", "Neck", "Wrist", "Finger", "Waist"],
    qualityColors: {
        3: "#328CE3",
        4: "#a73fee",
        5: "#ff8000", // Legendary
        6: "#e6cc80", // Artifact
    },
    specs: ["Holy Paladin", "Restoration Druid", "Preservation Evoker",  "Discipline Priest", "Holy Priest", "Restoration Shaman", "Mistweaver Monk"],
    classicSpecs: ["Restoration Druid Classic", "Holy Paladin Classic",  "Discipline Priest Classic", "Holy Priest Classic", "Restoration Shaman Classic", "Mistweaver Monk Classic"],

    // SEASONAL CONSTANTS
    seasonalItemConversion: 12, // 6 = S2, 7 = S3, 8 = ??, 9 = S4. This value is used to determine if an item can be catalyzed.
    currentRaidIDs: [1307, 1314, 1308], // This should be an array even with one raid. This value is used in various array specific functions.
    currentDungeonIDs: [1315, 1316, 1300, 1299, 1201, 278, 476, 945],
    fullItemLevels: [200, 203, 206, 210, 214, 217, 220, 224, 227, 230, 233, 237, 240, 243, 246, 250, 253, 256, 259, 263, 266, 269, 272, 276, 279, 282, 285, 289],
    itemLevelCaps: { Explorer: 224, Adventurer: 237, Veteran: 250, Champion: 263, Hero: 276, Myth: 289, "Runed Crafted": 272, "Gilded Crafted": 285 },
    seasonID: 34,
    tierNames: {
      "Preservation Evoker": "of the Black Talon", 
      "Holy Paladin": "Luminant Verdict's", 
      "Holy Priest": "Blind Oath's", 
      "Discipline Priest": "Blind Oath's", 
      "Restoration Shaman": "of the Primal Core", 
      "Mistweaver Monk": "of Ra-den's Chosen", 
      "Restoration Druid": "of the Luminous Bloom"
    },

}

// Currently unused. Might use later.
export const SEASONALCONSTS = {

}

export const SUPPORT_TIERS = [
  {
    name: "Gold",
    color: "#DAA520",
    image: "Images/QeAssets/QEGoldTier.png",
    link: "STRIPE_GOLD_PLACEHOLDER",
    perks: [
      "Patreon posts before big releases featuring upcoming and behind the scenes content.",
      "Increased Item Cap in Top Gear (34).",
      "Draft versions of upcoming articles.",
      "Ad free across QE Live.",
      "My appreciation and gratitude.",
      "Discord access.",
    ],
  },
  {
    name: "Diamond",
    color: "#FFB6C1",
    image: "Images/QeAssets/QEDiamondTier.png",
    link: "STRIPE_DIAMOND_PLACEHOLDER",
    perks: [
      "Everything in QE Gold plus:",
      "Your character name in the QE Live Hall of Fame.",
      "Increased Item Cap in Top Gear (36).",
      "QE Diamond tag in QE Live. Diamond color in the QE Discord.",
      "A whole extra level of thanks and appreciation.",
      "Add a tip or joke of your own to QE Live for any spec and have it pop up on the main menu. (Coming soon).",
      "Discord access.",
    ],
  },
  {
    name: "Rolls Royce",
    color: "#04E07C",
    image: "Images/QeAssets/QERollsRoyceTier.png",
    link: "STRIPE_ROLLSROYCE_PLACEHOLDER",
    perks: [
      "Everything in QE Gold & QE Diamond plus:",
      "Direct QA line. A special channel in the QE discord all of your own to ask any question you like. Need your enchants and gems sorted last minute for that alt your raid leader is asking you to play? Need tips for the next progression boss? I'll make sure you're covered.",
      "Resto Druid / Mistweaver / Disc log review every week. You can also give this to a struggling guildie if your own performance is already very good.",
      "A place in orange at the top of the upcoming QE Live Supporters Hall of Fame.",
      "Discord access.",
    ],
  },
];
