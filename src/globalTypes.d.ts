declare type Stats = {
    [key: string]: number;
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

declare type ItemEffect = {
    type: string;
    name: string;
    level?: number;
    onUse?: boolean;
}

declare type contentTypes = "Raid" | "Dungeon";
declare type gameTypes = "Retail" | "Classic";

// Unimplemented for now.
declare type playerSpecs = "Restoration Druid" | "Mistweaver Monk" | "Restoration Shaman" | "Holy Priest" | "Discipline Priest" | "Preservation Evoker" | "Holy Paladin";

interface PlayerSettings {
    includeGroupBenefits: { value: boolean; options: boolean[]; category: string; type: string };
    incarnateAllies: { value: string; options: string[]; category: string; type: string };
    idolGems: { value: number; options: number[]; category: string; type: string };
    alchStonePotions: { value: number; options: number[]; category: string; type: string };
    catalystLimit: { value: number; options: number[]; category: string; type: string };
    upgradeFinderMetric: { value: string; options: string[]; category: string; type: string };
    primordialGems: { value: string; options: string[]; category: string; type: string };
    topGearAutoGem: { value: boolean; options: boolean[]; category: string; type: string };
    healingDartsOverheal: { value: number; options: any[]; category: string; type: string };
    lariatGems: { value: number; options: any[]; category: string; type: string };
    chromaticEssenceBuff: { value: string; options: string[]; category: string; type: string };
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

