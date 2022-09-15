// Action Types
import { TOGGLE_CONTENT } from "../ActionTypes";
import { TOGGLE_GAMETYPE } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";
import { gameType } from "./GameType";

// Local Storage
import ls from "local-storage";

// Initial Store/State settings
const initialState = {
  gameType: ls.get("gameType") || "Retail",
  contentType: ls.get("contentType") || "Raid",
};
if (initialState.gameType === "BurningCrusade") initialState.gameType = "Classic";

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CONTENT:
      return contentType(state, action);
    case TOGGLE_GAMETYPE:
      return gameType(state, action);
    default:
      return state;
  }
}
