// Action Types
import PlayerChars from "../../Modules/Player/PlayerChars";

import { TOGGLE_CONTENT } from "../ActionTypes";
import { TOGGLE_GAMETYPE } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";
import { gameType } from "./GameType";

// Initial Store/State settings
const initialState = {
  gameType: "Retail",
  contentType: "Raid",
};

export default function rootReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case TOGGLE_CONTENT:
      return contentType(state, action);
    case TOGGLE_GAMETYPE:
      return gameType(state, action);
    default:
      return state;
  }
}
