// Action Types
import { TOGGLE_CONTENT, TOGGLE_GAMETYPE, TOGGLE_PLAYERSETTINGS, TOGGLE_PATRONSTATUS, TOGGLE_COOLDOWNPLANNERTHEME } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";
import { gameType } from "./GameType";
import { playerSettings } from "./PlayerSettings";
import { patronStatus } from "./PatronStatus";
import { cooldownPlannerTheme } from "./CooldownPlannerTheme";

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
    incarnateAllies: { value: "Tank + DPS", options: ["Solo", "DPS", "Tank", "Tank + DPS"], category: "trinkets", type: "selector", gameType: "Retail" },
    idolGems: { value: 2, options: [1, 2, 3, 4, 5, 6, 7, 8], category: "trinkets", type: "input", gameType: "Retail" },
    //rubyWhelpShell: { value: "Untrained", options: ["Untrained", "AoE Heal", "ST Heal", "Crit Buff", "Haste Buff"], category: "trinkets", type: "selector" }, // "ST Damage", "AoE Damage",
    //alchStonePotions: { value: 1, options: [0, 1, 2], category: "trinkets", type: "selector" },
    //enchantItems: { value: true, options: [true, false], category: "topGear", type: "selector" },
    catalystLimit: { value: 1, options: [1, 2, 3, 4], category: "topGear", type: "selector", gameType: "Retail" },
    upgradeFinderMetric: { value: "Show % Upgrade", options: ["Show % Upgrade", "Show HPS"], category: "upgradeFinder", type: "selector", gameType: "Retail" },
    /*primordialGems: {
      value: "Automatic",
      options: ["Automatic", "Wild Spirit, Exuding Steam, Deluging Water", "Wild Spirit, Exuding Steam, Desirous Blood", "Flame Licked, Wild Spirit, Exuding Steam"],
      category: "topGear",
      type: "selector",
    }, */
    topGearAutoGem: { value: false, options: [true, false], category: "topGear", type: "selector", gameType: "Retail" },
    healingDartsOverheal: { value: 62, options: [], category: "embellishments", type: "Entry", gameType: "Retail" },
    lariatGems: { value: 4, options: [], category: "embellishments", type: "Entry", gameType: "Retail" },
    chromaticEssenceBuff: { value: "Automatic", options: ["Automatic", "Haste", "Crit", "Mastery", "Versatility", "Quad Buff"], category: "trinkets", type: "selector", gameType: "Retail" },
    
    gemSettings: {value: "Simple", options: ["Simple", /*"Precise (Beta)"*/], category: "topGear", type: "selector", gameType: "Retail"}, // TODO: Add a "Keep current".
    runeChoice: {value: "Automatic", options: ["Automatic", "Haste", "Crit", "Mastery"], category: "topGear", type: "selector", gameType: "Retail"},
    phialChoice: {value: "Automatic", options: ["Automatic", "Corrupting Rage", "Tepid Versatility"], category: "topGear", type: "selector", gameType: "Retail"},
    chromaticEssenceAllies: { value: true, options: [true, false], category: "trinkets", type: "selector", gameType: "Retail" },


    // Classic Settings
    manaProfile: {value: "Standard", options: ["Standard", "Conservative", "Mana Guzzler"], category: "topGear", type: "selector", gameType: "Classic"},
    numManaTides: {value: 0, options: [0, 1, 2, 3], category: "topGear", type: "selector", gameType: "Classic"},
    metaGem: {value: "Ember Shadowspirit Diamond", options: ["Ember Shadowspirit Diamond"], category: "topGear", type: "selector", gameType: "Classic"},

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
    case TOGGLE_COOLDOWNPLANNERTHEME:
      return cooldownPlannerTheme(state, action);
    default:
      return state;
  }
}

export default rootReducer;
