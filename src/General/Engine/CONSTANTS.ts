

export const CONSTANTS = {
    dpsValue: 1, // In dungeon settings 
    allyStatWeight: 0.55, // This is a heavy underestimation. Maybe add a setting.
    allyDPSPerPoint: 0.55 / 15500 * 300000,
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
    seasonalItemConversion: 9, // 6 = S2, 7 = S3, 8 = ??, 9 = S4. This value is used to determine if an item can be catalyzed.

    specs: ["Holy Paladin", "Restoration Druid", "Preservation Evoker",  "Discipline Priest", "Holy Priest", "Restoration Shaman", "Mistweaver Monk"],
    classicSpecs: ["Restoration Druid Classic", "Holy Paladin Classic",  "Discipline Priest Classic", "Holy Priest Classic", "Restoration Shaman Classic"],
}