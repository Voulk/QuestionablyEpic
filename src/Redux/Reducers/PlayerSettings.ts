import ls from "local-storage";
import { RootState } from "../Reducers/RootReducer";

// Action to toggle content type in the Redux store.
export function playerSettings(state: RootState, action: any): RootState {
  const { playerSettings } = action.payload;
  //ls.set("playerSettings", toggleType);
  return {
    ...state,
    playerSettings: playerSettings,
  };
}
