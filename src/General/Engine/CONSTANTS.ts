

export const CONSTANTS = {
    dpsValue: 1, // In dungeon settings 
    allyStatWeight: 0.4, // This is a heavy underestimation. Maybe add a setting.
    allyDPSPerPoint: 0.4 / 2000 * 30000,
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
    seasonalItemConversion: 11, // 6 = S2, 7 = S3, 8 = ??, 9 = S4. This value is used to determine if an item can be catalyzed.
    currentRaidID: 1302, // Undermine
    currentDungeonIDs: [-20, 11941, 1303, 1185, 1267, 1298, 1270, 1271],
    bossNPCIDs: {
        2639: 225821, // Vexie and the Geargrinders.
        2640: 229177, // Cauldron of Carnage
        2641: 228652, // Rik Reverb
        2642: 230322, // Stix Bunkjunker
        2653: 230583, // Sprocketmonger Lockenstock
        2644: 228458, // One Armed Bandit
        2645: 229953, // Mug'Zee
        2646: 237194 // Chrome King Gallywix
    },
    dungeonZoneIDs: {
        1210: 14882, // Darkflame Cleft
        1272: 15103, // Cinderbrew Meadery
        1268: 14938, // The Rookery
        1267: 14954, // Priory
        1012: 8064, // The Motherlode
        1178: 10225, // Workshop
        1298: 15452, // Operation Floodgate
        1187: 12841, // Theater of Pain
    },
    seasonID: 30,
    specs: ["Holy Paladin", "Restoration Druid", "Preservation Evoker",  "Discipline Priest", "Holy Priest", "Restoration Shaman", "Mistweaver Monk"],
    classicSpecs: ["Restoration Druid Classic", "Holy Paladin Classic",  "Discipline Priest Classic", "Holy Priest Classic", "Restoration Shaman Classic", "Mistweaver Monk Classic"],

    qualityColors: {
        3: "#328CE3",
        4: "#a73fee",
        5: "#ff8000", // Legendary
        6: "#e6cc80", // Artifact
    }
}

// Currently unused. Might use later.
export const SEASONALCONSTS = {
    
}