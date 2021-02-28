import { TOGGLE_CONTENT } from "../ActionTypes"
import ls from "local-storage";

const initialState = {
    gameType: "Retail",
    contentType: "Raid",
  };
  
 export default function rootReducer(state = initialState, action) {
    console.log('reducer', state, action);
  
    switch (action.type) {
      case TOGGLE_CONTENT: {
        const { content } = action.payload;
        const toggleType = content === "Raid" ? "Dungeon" : "Raid";
        ls.set("contentType", toggleType);
        return {
          ...state,
          contentType: toggleType,
        };
      }
      default:
    return state;
  }
  }