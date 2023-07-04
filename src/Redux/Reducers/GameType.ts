import * as ls from "local-storage";
import { RootState } from "../Reducers/RootReducer";

// Action to toggle content type in the Redux store.
export function gameType(state: RootState, action: any): RootState {
  const { gameType } = action.payload;
  ls.set<string>("gameType", gameType);
  return {
    ...state,
    gameType: gameType,
  };
}
