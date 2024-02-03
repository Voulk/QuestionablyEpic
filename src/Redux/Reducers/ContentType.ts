import * as ls from "local-storage";
import { RootState } from "../Reducers/RootReducer";

// Action to toggle content type in the Redux store.
export function contentType(state: RootState, action: any): RootState {
  const { content } = action.payload;
  const toggleType = content // === "Raid" ? "Dungeon" : "Raid";
  ls.set<string>("contentType", toggleType);
  return {
    ...state,
    contentType: toggleType,
  };
}
