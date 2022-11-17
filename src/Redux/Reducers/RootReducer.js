// Action Types
import { TOGGLE_CONTENT } from "../ActionTypes";
import { TOGGLE_GAMETYPE } from "../ActionTypes";
import { TOGGLE_PLAYERSETTINGS } from "../ActionTypes";
import { TOGGLE_PATRONSTATUS } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";
import { gameType } from "./GameType";
import { playerSettings } from "./PlayerSettings";
import { patronStatus } from "./PatronStatus";

// Local Storage
import ls from "local-storage";

// Initial Store/State settings
const initialState = {
  gameType: ls.get("gameType") || "Retail",
  contentType: ls.get("contentType") || "Raid",
  playerSettings: {"groupBenefits": true, "Sins": 4, "Hymnal": 5},
  patronStatus: "Standard" // Currently not used. Will be once we evolve app into a functional component.
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
    default:
      return state;
  }
}
