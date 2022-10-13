import ls from "local-storage";

// Action to toggle content type in the Redux store.
export function playerSettings(state, action) {
  const { playerSettings } = action.payload;
  //ls.set("playerSettings", toggleType);
  console.log(action.payload);
  return {
    ...state,
    playerSettings: playerSettings,
  };
}
