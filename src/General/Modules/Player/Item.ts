import { calcStatsAtLevel, calcStatsAtLevelClassic, getItemAllocations, getItemProp } from "../../Engine/ItemUtilities";
import { CONSTRAINTS, setBounds } from "../../Engine/CONSTRAINTS";
import { CONSTANTS } from "General/Engine/CONSTANTS";

// The Item class represents an active item in the app at a specific item level.
// We'll create them when we import a SimC string, or when an item is added manually.
// Items are stored in the players character. They are not currently stored in local storage but that is a likely addition soon after release.
export class Item {
  gameType: gameTypes = "Retail"; 
  id: number; // The items ID
  level: number; // The items ilvl
  name: string; // Consider how to store this in a localised form.
  slot: string;
  softScore: number;
  socket: number; // This is an int since items can have more than one socket (neck).
  classicSockets?: any = {sockets: [], bonus: {}}; // Classic sockets have specific colors.
  socketedGems: number[] = []; // The gems in the item.
  tertiary: "Leech" | "Avoidance" | ""; // Can probably just be moved to stats.
  stats: Stats = {}; // The stats on a given item.
  missiveStats?: string[];
  specialAllocations?: {[key: string]: number} = {};
  primGems?: number[];

  // Used for items where we might have multiple variations at the same item level. 
  // Single option items like Unbound Changeling would end up as a 1 length array but
  // we also support items like Cyrces Circlet or Onyx Annulet where all three gem options can end up here.   
  selectedOptions?: number[]; 
  customOptions?: {label: string, id: number[]}[]; // This just stored the options available. {label: string, id: number}[]

  effect: ItemEffect | "";
  uniqueHash: string; // Technically not a hash.
  uniqueEquip: string; // Unique Equip type if relevant.
  active: boolean = false; // An active item is selected for inclusion in Top Gear.
  
  vaultItem: boolean = false; // If true, the item is in a vault and so gains a special Vault color and restriction.
  isEquipped: boolean = false; // If true, the item is currently equipped to the character. This is just used to color differences 
  source = {};
  onUse: boolean = false; // True if the item is an on-use trinket. Can be converted to a tag.
  setID: number = 0; // The set this item belongs to. Frequently used for tier but not exclusively.
  quality: number = 4; // The quality number. 

  upgradeTrack: string = ""; // These two upgrade track variables could be combined into one.
  upgradeRank: number = 0;
  itemConversion?: number = 0; // This tells us which set of items our item can be catalyzed into. 3 = S1, 6 = S2, ? = S3

  bonusIDS: string = "";
  isCatalystItem: boolean = false; // If true, the item has already been catalyzed and is not viable for a second conversion.

  overriddenName: boolean = false; // If true, the effect will be used as the items name instead of its ID. This was used for SL legendaries but nothing in DF.

  offhandID: number = 0; // Only used for correctly translating weapon combos.
  mainHandUniqueHash?: string;
  offHandUniqueHash?: string;
  gemString?: string;
  flags: string[] = []; // Flags: reforged, offspecWeapon. 

  constructor(id: number, name: string, slot: string, socket: number, tertiary: string, softScore: number = 0, level: number, bonusIDS: string, gameType: gameTypes = "Retail") {
    this.id = id;
    this.name = name;
    this.level = setBounds(level, CONSTRAINTS.Retail.minItemLevel, CONSTRAINTS.Retail.maxItemLevel); //Math.max(1, Math.min(300, level));
    this.slot = slot;
    this.socket = socket;
    this.gameType = gameType || "Retail";
    this.tertiary = tertiary === "Leech" || tertiary === "Avoidance" ? tertiary : "";
    this.softScore = softScore;
    this.uniqueHash = this.getUnique(id);

   
    this.effect = getItemProp(id, "effect", gameType);
    this.setID = getItemProp(id, "itemSetId", gameType);
    this.uniqueEquip = getItemProp(id, "uniqueEquip").toLowerCase();
    this.onUse = (slot === "Trinket" && getItemProp(id, "onUseTrinket", gameType) === true);
    if (this.onUse && this.effect) this.effect['onUse'] = true;
    //if (slot === "Neck" && this.gameType === "Retail") this.socket = 3; // This is an override to apply 3 sockets to every neck. It makes the app easier to use.
    if (getItemProp(id, "offspecWeapon", gameType)) this.flags.push("offspecWeapon");
    this.bonusIDS = bonusIDS || "";

    if (gameType === "Classic") {
      const sockets = getItemProp(id, "sockets", gameType);
      this.classicSockets.sockets = sockets? sockets.gems : [];
      this.classicSockets.bonus = sockets ? sockets.bonus : {};
      this.quality = getItemProp(id, "quality", gameType);
      this.name = getItemProp(id, "name", gameType);
      // Adjust allocations for sockets.
      const itemAllocations = getItemAllocations(id, [], gameType);

      if (slot === "Waist") this.classicSockets.sockets = sockets ? [...sockets.gems, 'prismatic'] : ['prismatic'];
 
      this.stats = getItemProp(id, "stats", "Classic");
      //this.stats = calcStatsAtLevelClassic(this.level - 1, getItemProp(id, "slot", gameType), itemAllocations);
    }
    else if (gameType === "Retail") {
      if (this.id === 228411) this.primGems = [228639, 228638, 228640];
      this.stats = calcStatsAtLevel(this.level, getItemProp(id, "slot", gameType), getItemAllocations(id, [], gameType), tertiary);

      // TEMPORARY
      if (this.id === 228411) {
        this.customOptions = [
                              {label: "Stormbringers, Fathomdwellers, Windsingers", id: [228638, 228639, 228640]},
                              {label: "Stormbringers, Fathomdwellers, Skippers", id: [228638, 228639, 228646]},
                              {label: "Stormbringers, Mariners, Skippers", id: [228638, 228644, 228646]},
                              {label: "Stormbringers, Mariners, Windsingers", id: [228638, 228644, 228640]},
                              {label: "Thunderlords, Mariners, Windsingers", id: [228634, 228644, 228640]},
                            ]
        this.selectedOptions = this.customOptions[0].id;
      }
      /*
      if (this.id === 178708) {
        this.customOptions = [{label: "Convert to Crit", id: [0]},
                              {label: "Convert to Haste", id: [1]},
                              {label: "Convert to Mastery", id: [2]},]
      }*/
    }

  }

  clone(): Item {
    const clonedItem = new Item(
      this.id,
      this.name,
      this.slot,
      this.socket,
      this.tertiary,
      this.softScore,
      this.level,
      this.bonusIDS
    );

    // 
    clonedItem.effect = this.effect ? { ...this.effect } : ""; 
    clonedItem.uniqueEquip = this.uniqueEquip;
    clonedItem.active = this.active;
    clonedItem.vaultItem = this.vaultItem;
    clonedItem.isEquipped = false; // We don't want to duplicate isEquipped since it isn't possible for the original and the clone to both be equipped at the same time.
    clonedItem.source = { ...this.source };
    clonedItem.onUse = this.onUse;
    clonedItem.setID = this.setID;
    clonedItem.quality = this.quality;
    clonedItem.upgradeTrack = this.upgradeTrack;
    clonedItem.upgradeRank = this.upgradeRank;
    clonedItem.itemConversion = this.itemConversion;
    clonedItem.bonusIDS = this.bonusIDS;
    clonedItem.isCatalystItem = this.isCatalystItem;
    clonedItem.overriddenName = this.overriddenName;
    clonedItem.offhandID = this.offhandID;
    clonedItem.mainHandUniqueHash = this.mainHandUniqueHash;
    clonedItem.offHandUniqueHash = this.offHandUniqueHash;
    clonedItem.gemString = this.gemString;
    clonedItem.missiveStats = this.missiveStats;
    clonedItem.specialAllocations = { ...this.specialAllocations };
    clonedItem.flags = [...this.flags]; // Create a new array to avoid modifying the original array

    if (clonedItem.missiveStats) clonedItem.stats = calcStatsAtLevel(this.level, this.slot, getItemAllocations(this.id, this.missiveStats, "Retail"), this.tertiary);
    if (this.customOptions) clonedItem.customOptions = [...this.customOptions];
    // ... (copy other properties as needed)

    return clonedItem;
  }

  updateLevel(level: number, missiveStats: string[] = []) {
    this.level = level;
    if (Object.keys(this.specialAllocations).length > 0) this.stats = (calcStatsAtLevel(level, getItemProp(this.id, "slot", this.gameType), this.specialAllocations, this.tertiary));
    else this.stats = calcStatsAtLevel(level, getItemProp(this.id, "slot", this.gameType), getItemAllocations(this.id, missiveStats), this.tertiary);
  }

  // To be replaced with a proper method of assigning ID's but this will do for now since duplicates will be very rare and
  // it isn't life crushing if they do ever dup.
  getUnique(id: number) {
    return id + "" + (Math.floor(Math.random() * 100000) + 1).toString();
  }

  checkHasFlag(flag: string) {
    return this.flags.includes(flag);
  }

  canBeCatalyzed() {
    return !this.isCatalystItem && this.itemConversion === CONSTANTS.seasonalItemConversion && ['Head', 'Chest', 'Shoulder', 'Back', 'Wrist', 'Hands', 'Waist', 'Legs', 'Feet'].includes(this.slot);
  }


  // Make an educated guess at what quality an item is based on its level.
  // We'll use this when we don't have access to precise information via SimC string.
  guessItemQuality() {
    if (this.level >= 372) this.quality = 4;
    else if (this.level >= 340) this.quality = 3;
    else this.quality = 2;
  }

  // Get the color tag of an item based on its quality.
  // Special override for legendaries though if we have their SimC string then they'll just naturally be at quality 5 anyway.
  // This could arguably be moved to ItemUtilities.
  getQualityColor() {
    const isLegendary = this.id === 2068200;
    if (isLegendary || this.quality === 5) return "#ff8000";
    else if (this.quality === 4) return "#a73fee";
    else if (this.quality === 3) return "#328CE3";
    else return "#1eff00";
  } 

  //@deprecated
  isLegendary() {
    return false;
  }

  // This is only of moderate accuracy since there can be non-tier sets that use the same slots as tier.
  // We only use this to color Tier pieces differently so it's ok if it colors non-tier set pieces.
  isTierPiece(): boolean {
    return this.setID !== 0 && this.setID !== "" && this.slot !== "Trinket" && this.slot !== "Finger";
  }

  // This compiles an additional stat array into an item.
  // Useful if an items stats are coming from two different sources.
  addStats(bonus_stats: Stats) {
    for (const stat in this.stats) {
      if (stat in bonus_stats) {
        this.stats[stat as keyof Stats] = (this.stats[stat as keyof Stats] || 0) + (bonus_stats[stat as keyof Stats] || 0)
      }
    }
  }

}

export default Item;
