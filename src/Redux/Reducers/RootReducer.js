// Action Types
import { TOGGLE_CONTENT } from "../ActionTypes";

// Reducers
import { contentType } from "./ContentType";

// Initial Store/State settings
const initialState = {
  gameType: "Retail",
  contentType: "Raid",
};

export default function rootReducer(state = initialState, action) {
  console.log("reducer", state, action);

  switch (action.type) {
    case TOGGLE_CONTENT:
      return contentType(state, action);

    default:
      return state;
  }
}
