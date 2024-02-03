

export const CONSTANTS = {
    dpsValue: 1, // In dungeon settings 
    allyStatWeight: 0.55,
    allyDPSPerPoint: 0.55 / 13000 * 135000,
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
    seasonalItemConversion: 7, // 6 = S2, 7 = S3. This value is used to determine if an item can be catalyzed.

    specs: ["Holy Paladin", "Restoration Druid", "Preservation Evoker",  "Discipline Priest", "Holy Priest", "Restoration Shaman", "Mistweaver Monk"],
    classicSpecs: ["Holy Paladin Classic", "Restoration Druid Classic", "Discipline Priest Classic", "Holy Priest Classic", "Restoration Shaman Classic"],
}