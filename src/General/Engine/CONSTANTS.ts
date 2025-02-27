

export const CONSTANTS = {
    dpsValue: 1, // In dungeon settings 
    allyStatWeight: 0.8, // This is a heavy underestimation. Maybe add a setting.
    allyDPSPerPoint: 0.8 / 60000 * 1500000,
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
    seasonalItemConversion: 8, // 6 = S2, 7 = S3, 8 = ??, 9 = S4. This value is used to determine if an item can be catalyzed.
    currentRaidID: 1296, // Undermine
    currentDungeonIDs: [1178, 1012, 1187, 1298, 1210, 1267, 1272, 1268],
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
    WHCodes: {
        2639: "[=retail-raid-tww-s2-vexie]", // Vexie and the Geargrinders.
        2640: "[=retail-raid-tww-s2-cauldron-carnage]", // Cauldron of Carnage
        2641: "[=retail-raid-tww-s2-rik-reverb]", // Rik Reverb
        2642: "[=retail-raid-tww-s2-stix-bunkjunker]", // Stix Bunkjunker
        2653: "[=retail-raid-tww-s2-sprocketmonger]", // Sprocketmonger Lockenstock
        2644: "[=retail-raid-tww-s2-one-armed-bandit]", // One Armed Bandit
        2645: "[=retail-raid-tww-s2-mugzee]", // Mug'Zee
        2646: "[=retail-raid-tww-s2-gallywix]", // Chrome King Gallywix

        // Dungeons
        1210: "[=retail-dun-darkflame-cleft]", // Darkflame Cleft
        1272: "[=retail-dun-cinderbrew-meadery]", // Cinderbrew Meadery
        1268: "[=retail-dun-rookery]", // The Rookery
        1267: "[=retail-dun-priory-sacred-flame]", // Priory
        1012: "[=retail-dun-motherlode]", // The Motherlode
        1178: "[=retail-dun-operation-mechagon-workshop]", // Workshop
        1298: "[=retail-dun-operation-floodgate]", // Operation Floodgate
        1187: "[=retail-dun-theater-pain]", // Theater of Pain
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
    seasonID: 24,
    specs: ["Holy Paladin", "Restoration Druid", "Preservation Evoker",  "Discipline Priest", "Holy Priest", "Restoration Shaman", "Mistweaver Monk"],
    classicSpecs: ["Restoration Druid Classic", "Holy Paladin Classic",  "Discipline Priest Classic", "Holy Priest Classic", "Restoration Shaman Classic"],

    wh: {
        classColor: {
            "Holy Paladin": "c2",
            "Restoration Druid": "c11", 
            "Preservation Evoker": "c13",  
            "Discipline Priest": "c5", 
            "Holy Priest": "c5", 
            "Restoration Shaman": "c7", 
            "Mistweaver Monk": "c10"
        }
    }
}

export const SEASONALCONSTS = {
    
}