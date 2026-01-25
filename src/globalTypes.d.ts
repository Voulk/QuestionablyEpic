
interface TickData {
    tickRate: number;
    canPartialTick: boolean;
    tickOnCast: boolean;
}

interface SpellDB {
    [spellName: string]: SpellData[]; // e.g. "Rejuvenation": [ Spell ]
}

type SpellData = {
    displayInfo: {
        id: number;
        icon: string;
        spellName: string;
    };
    castTime: number;
    cost: number;
    coeff: number;
    aura: number;
    expectedOverheal: number;
    secondaries: string[]; 
    spellType: "damage" | "buff" | "heal";
    buffType?: string;
    buffDuration?: number;
    tickData?: TickData;
    hasScript?: boolean;
    specialFields?: { [key: string]: any }; // For any extra fields we might need later.
    customScript?: string; // For spells that are very unique, or that are mostly scripted in game too.
    targets?: number;
}

interface TalentTemplate {
    points: number;
    maxPoints: number;
    icon: string;
    id: number;
    values: number[];
    select: boolean;
    tier: number;
    heroTree?: string;
    runFunc: (state: any, spellDB: SpellDB, talentData: number[], points: number) => void;
}

interface TalentTree {
    [key: string]: TalentTemplate;
}

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
} |
{   // Classic
    [key: string]: number;
    intellect?: number;
    spellpower?: number;
    haste?: number;
    crit?: number;
    mastery?: number;
    spirit?: number;
    hps?: number;
    mana?: number;
}

declare type ItemEffect = {
    type: string;
    name: string;
    level?: number;
    onUse?: boolean;
    class?: string; // Only used for effectEngine routing so could be refactored later.
}


declare type AdditionalData = {
    contentType: contentTypes;
    settings: PlayerSettings;
    setStats: Stats;
    castModel: any;
    player: Player;
    setVariables: any;
}

declare type ProfileEntry = {
    spell: string;
    efficiency?: number; // Used mostly for cooldown spells. Defines how good they are at pressing button cooldown. 
    cpm?: number; // Casts per minute. Can be used for fixed spells that don't have a cooldown but are only pressed X times per minute like Efflorescence.
    manaOverride?: number; // Used for free casts, or cheaper casts.
    castTimeOverride?: number; // Used for spells that should not take up time on our timeline but that aren't structurally off-GCD.

    castTime?: number; // Cast time of the spell before Haste
    cost?: number; // Mana cost of the spell

    fillerSpell?: boolean; // Used by some profiles to designate which spells excess mana and time should be filled with. Can be manually coded instead.
    flags?: any; // Currently unused. Assign a type when necessary.
}

declare type CastProfile = ProfileEntry[]

declare type contentTypes = "Raid" | "Dungeon";
declare type gameTypes = "Retail" | "Classic";

// Unimplemented for now.
declare type playerSpecs = "Restoration Druid" | "Mistweaver Monk" | "Restoration Shaman" | "Holy Priest" | "Discipline Priest" | "Preservation Evoker" | "Holy Paladin";
declare type patronTypes = "Gold" | "Basic" | "Rolls Royce" | "Diamond" | "Sapphire"
declare type Tertiaries = "Leech" | "Avoidance" | "Speed" | "Indestructible" | "";

interface PlayerChars {
    allChar: any[];
    activeChar: number;
    init(): PlayerChars;
    getActiveChar(): Player;
    setActiveChar(index: number): void;
    setupChars(): void;
    getAllChar(gameType?: string): any[];
    pickPlayerClass(gameType: gameTypes, playerClass: string): void;
    getCharOfClass(gameType: gameTypes, playerClass: string): number;
    updatePlayerChar(player: any): void;
    setLowestChar(gameType: string): void;
    saveAllChar(): void;
    addChar(name: string, spec: string, region: string, realm: string, race: string, gameType: string): void;
    delActiveChar(): void;
    delSpecificChar(unique: string): void;
}

interface SettingValue {
    value: any;
    options: any[];
    category: string;
    type: string;
    gameType: gameTypes;
    classRestriction?: string;
  }

interface PlayerSettings {
    [key: string]: { value: any; options: any[]; category: string; type: string; gameType: gameTypes };
}

/*
interface PlayerSettings {
    includeGroupBenefits: { value: boolean; options: boolean[]; category: string; type: string, gameType: gameTypes };
    idolGems: { value: number; options: number[]; category: string; type: string, gameType: gameTypes };
    //alchStonePotions: { value: number; options: number[]; category: string; type: string };
    catalystLimit: { value: number; options: number[]; category: string; type: string, gameType: gameTypes };
    upgradeFinderMetric: { value: string; options: string[]; category: string; type: string, gameType: gameTypes };
    //primordialGems: { value: string; options: string[]; category: string; type: string };
    topGearAutoGem: { value: boolean; options: boolean[]; category: string; type: string };
    healingDartsOverheal: { value: number; options: any[]; category: string; type: string };
    lariatGems: { value: number; options: any[]; category: string; type: string };
    chromaticEssenceBuff: { value: string; options: string[]; category: string; type: string };
    gemSettings: {value: string; options: string[]; category: string; type: string};
    phialChoice: {value: string; options: string[]; category: string; type: string};
    runeChoice: {value: string; options: string[]; category: string; type: string};
    rubyWhelpShell: { value: string, options: string[], category: string, type: string }, // "ST Damage", "AoE Damage",

    //chromaticEssenceAllies: { value: boolean; options: boolean[]; category: string; type: string };
  } */

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
    stacks?: number; // The number of stacks the buff can stack up to.
    value?: number; // Rare effects (and most classic effects) just use a set value either instead of or as part of their formula.
}


// TODO: Split effectData into multiple interfaces
declare interface statEffect extends effectData {
    stat?: string; // If this is a secondary stat trinket then this is the stat it procs.
}

declare type ClassicEffectData = 
  { // 
    value: { [key: number]: number }; // The value of the effect at each item level.
    coefficient: number; // The effects coefficient.
    stat: string;
    ppm?: number;
    cooldown?: number;
    duration?: number;
    secondaries?: Array<string>;
    efficiency?: number;
    specMod?: { [key: string]: number };
    spScaling?: number;
  }


