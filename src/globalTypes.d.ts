declare type bonusStats = {
    intellect?: number;
    haste?: number;
    crit?: number;
    versatility?: number;
    mastery?: number;
    leech?: number;
    hps?: number;
    dps?: number;
    mana?: number;
    allyStats?: number;
}


declare interface effectData  {
    coefficient: number;
    table: number;

    // Optional fields
    efficiency?: {"Raid": number, "Dungeon": number} | number; // The efficiency of an effect. This includes overhealing, and any scenario where a player might not get 100% of its expected value.
    duration?: number;
    ppm?: number;
    stat?: string; // If this is a secondary stat trinket then this is the stat it procs.
    secondaries?: Array<string>; // The secondaries an effect scales with.
    cooldown?: number;
    ticks?: number; // The number of ticks a DoT or HoT effect might have.
    targets?: number; // The number of targets affected by the damage or healing effect.
}

// TODO: Split effectData into multiple interfaces
declare interface statEffect extends effectData {
    stat?: string; // If this is a secondary stat trinket then this is the stat it procs.



}

