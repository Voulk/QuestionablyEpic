// Action Types
import { TOGGLE_CONTENT, TOGGLE_GAMETYPE, TOGGLE_PLAYERSETTINGS, TOGGLE_PATRONSTATUS, TOGGLE_COOLDOWNPLANNERTHEME } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";
import { gameType } from "./GameType";
import { playerSettings } from "./PlayerSettings";
import { patronStatus } from "./PatronStatus";
import { cooldownPlannerTheme } from "./CooldownPlannerTheme";

// Local Storage
import ls from "local-storage";

// Initial Store/State settings
const initialState = {
  gameType: "Retail",
  contentType: ls.get("contentType") || "Raid",
  playerSettings: {
    includeGroupBenefits: { value: true, options: [true, false], category: "trinkets", type: "selector" },
    incarnateAllies: { value: "Solo", options: ["Solo", "DPS", "Tank", "Tank + DPS"], category: "trinkets", type: "selector" },
    idolGems: { value: 2, options: [1, 2, 3, 4, 5, 6, 7, 8], category: "trinkets", type: "input" },
    //rubyWhelpShell: { value: "Untrained", options: ["Untrained", "AoE Heal", "ST Heal", "Crit Buff", "Haste Buff"], category: "trinkets", type: "selector" }, // "ST Damage", "AoE Damage",
    alchStonePotions: { value: 1, options: [0, 1, 2], category: "trinkets", type: "selector" },
    //enchantItems: { value: true, options: [true, false], category: "topGear", type: "selector" },
    catalystLimit: { value: 1, options: [1, 2, 3], category: "topGear", type: "selector" },
    upgradeFinderMetric: { value: "Show % Upgrade", options: ["Show % Upgrade", "Show HPS"], category: "upgradeFinder", type: "selector" },
    primordialGems: {
      value: "Automatic",
      options: ["Automatic", "Wild Spirit, Exuding Steam, Deluging Water", "Wild Spirit, Exuding Steam, Desirous Blood", "Flame Licked, Wild Spirit, Exuding Steam"],
      category: "topGear",
      type: "selector",
    },
    topGearAutoGem: { value: false, options: [true, false], category: "topGear", type: "selector" },
    healingDartsOverheal: { value: 62, options: [], category: "embellishments", type: "Entry" },
    lariatGems: { value: 3, options: [], category: "embellishments", type: "Entry" },
    chromaticEssenceBuff: { value: "Automatic", options: ["Automatic", "Haste", "Crit", "Mastery", "Versatility", "Quad Buff"], category: "trinkets", type: "selector" },
    chromaticEssenceAllies: { value: true, options: [true, false], category: "trinkets", type: "selector" },
  }, // "whisperingIncarnateIcon": "Alone", "enemyTargets": 1},
  patronStatus: "Standard", // Currently not used. Will be once we evolve app into a functional component.
};
if (initialState.gameType === "BurningCrusade") initialState.gameType = "Classic";

export default function rootReducer(state = initialState, action) {
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
