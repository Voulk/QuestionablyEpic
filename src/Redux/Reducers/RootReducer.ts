// Action Types
import { TOGGLE_CONTENT, TOGGLE_GAMETYPE, TOGGLE_PLAYERSETTINGS, TOGGLE_PATRONSTATUS } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";
import { gameType } from "./GameType";
import { playerSettings } from "./PlayerSettings";
import { patronStatus } from "./PatronStatus";

// Local Storage
import * as ls from "local-storage";
import { Reducer } from "redux";



export interface RootState {
  gameType: string;
  contentType: string;
  playerSettings: PlayerSettings;
  patronStatus: string;
}

// Initial Store/State settings
const initialState : RootState = {
  gameType: ls.get<string>("gameType") || "Retail",
  contentType: ls.get<string>("contentType") || "Raid",
  playerSettings: {
    includeGroupBenefits: { value: true, options: [true, false], category: "trinkets", type: "selector", gameType: "Retail" },
    groupBuffValuation: {value: "50%", options: ["50%", "75%", "100%"], category: "trinkets", type: "selector", gameType: "Retail"},
    //incarnateAllies: { value: "Tank + DPS", options: ["Solo", "DPS", "Tank", "Tank + DPS"], category: "trinkets", type: "selector", gameType: "Retail" },
    //broodkeeperCloseTime: {value: 70, options: [], category: "trinkets", type: "Entry", gameType: "Retail"},
    //idolGems: { value: 2, options: [1, 2, 3, 4, 5, 6, 7, 8], category: "trinkets", type: "input", gameType: "Retail" },

    // TWW Trinkets
    misterPickMeUpOverheal: { value: 20, options: [], category: "trinkets", type: "Entry", gameType: "Retail" },
    antennaPickupRate: { value: 100, options: [], category: "trinkets", type: "Entry", gameType: "Retail" },
    shatteredSoulUsage: { value: 0, options: [], category: "trinkets", type: "Entry", gameType: "Retail" },
    //fightTimer: { value: 400, options: [], category: "trinkets", type: "Entry", gameType: "Retail" },
    dpsFlag: { value: false, options: [true, false], category: "trinkets", type: "selector", gameType: "Retail" },
    //syringeHealProcs: { value: 90, options: [], category: "trinkets", type: "Entry", gameType: "Retail" },
    delayOnUseTrinkets: { value: true, options: [true, false], category: "trinkets", type: "selector", gameType: "Retail" },

    includeJastorEffect: { value: true, options: [true, false], category: "trinkets", type: "selector", gameType: "Retail" },
    
    //enchantItems: { value: true, options: [true, false], category: "topGear", type: "selector" },
    catalystLimit: { value: 2, options: [1, 2, 3, 4], category: "topGear", type: "selector", gameType: "Retail" },
    upgradeFinderMetric: { value: "Show % Upgrade", options: ["Show % Upgrade", "Show HPS"], category: "upgradeFinder", type: "selector", gameType: "Retail" },

    topGearAutoGem: { value: false, options: [true, false], category: "topGear", type: "selector", gameType: "Retail" },
    calculateEmbellishments: { value: true, options: [true, false], category: "embellishments", type: "selector", gameType: "Retail" },
    socketedGems: { value: 4, options: [0, 1, 2, 3, 4, 5, 6, 7, 8], category: "embellishments", type: "Entry", gameType: "Retail" },
    
    gemSettings: {value: "Simple", options: ["Simple", /*"Precise (Beta)"*/], category: "topGear", type: "selector", gameType: "Retail"}, // TODO: Add a "Keep current".
    //runeChoice: {value: "Automatic", options: ["Automatic", "Haste", "Crit", "Mastery"], category: "topGear", type: "selector", gameType: "Retail"},
    flaskChoice: {value: "Automatic", options: ["Automatic", "Crit", "Mastery", "Versatility", "Haste"], category: "topGear", type: "selector", gameType: "Retail"},
    liningUptime: { value: 60, options: [], category: "embellishments", type: "Entry", gameType: "Retail" },

    // Classic Settings
    manaProfile: {value: "Standard", options: ["Standard", "More Efficient", "More Burst Healing"], category: "topGear", type: "selector", gameType: "Classic"},
    metric: {value: "HPS", options: ["HPS", "HPS + DPS"], category: "topGear", type: "selector", gameType: "Classic"},
    //classicGemSettings: {value: "Rare", options: ["Rare"], category: "topGear", type: "selector", gameType: "Classic"},
    reforgeSetting: {value: "Smart", options: ["Smart", "Dont reforge"], category: "topGear", type: "selector", gameType: "Classic"},
    hasteBuff: {value: "Haste Aura", options: ["No Buff", "Haste Aura"], category: "topGear", type: "selector", gameType: "Classic"},
    //numManaTides: {value: 0, options: [0, 1, 2, 3], category: "topGear", type: "selector", gameType: "Classic"},
    //metaGem: {value: "Ember Shadowspirit", options: ["Ember Shadowspirit"], category: "topGear", type: "selector", gameType: "Classic"},
    professionOne: {value: "Alchemy", options: ["Alchemy", "Blacksmithing", "Enchanting", "Engineering", "Herbalism", "Inscription", "Jewelcrafting (NYI)", "Leatherworking", "Mining", "Skinning", "Tailoring (NYI)"], category: "topGear", type: "selector", gameType: "Classic"},
    professionTwo: {value: "Leatherworking", options: ["Alchemy", "Blacksmithing", "Enchanting", "Engineering (NYI)", "Herbalism (NYI)", "Inscription", "Jewelcrafting (NYI)", "Leatherworking", "Mining", "Skinning", "Tailoring (NYI)"], category: "topGear", type: "selector", gameType: "Classic"},
    gloveEnchant: {value: "Haste", options: ["Haste", "Mastery"], category: "enchants", type: "selector", gameType: "Classic"},
    classicGems: {value: "Prefer Match", options: ["Prefer Match", "Prefer Optimal", "Keep Equipped Gems"], category: "topGear", type: "selector", gameType: "Classic"},
    includeEnchants: {value: "Yes", options: ["Yes", "No"], category: "topGear", type: "selector", gameType: "Classic"},
    

  }, // "whisperingIncarnateIcon": "Alone", "enemyTargets": 1},
  patronStatus: "Standard", // Currently not used. Will be once we evolve app into a functional component.
};
// We previously used BurningCrusade as our Classic designation but now just use Classic for all expansions. 
// If we support SoD or something in future then we'll adjust.
if (initialState.gameType === "BurningCrusade") initialState.gameType = "Classic";

const rootReducer: Reducer<RootState, any> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CONTENT:
      return contentType(state, action);
    case TOGGLE_GAMETYPE:
      return gameType(state, action);
    case TOGGLE_PLAYERSETTINGS:
      return playerSettings(state, action);
    case TOGGLE_PATRONSTATUS:
      return patronStatus(state, action);
    case TOGGLE_PATRONSTATUS:
      return patronStatus(state, action);
    default:
      return state;
  }
}

export default rootReducer;
