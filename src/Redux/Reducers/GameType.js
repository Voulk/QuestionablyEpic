import ls from "local-storage";

// Action to toggle content type in the Redux store.
export function gameType(state, action) {
  const { gameType } = action.payload;
  const toggleGameType = gameType === "Retail" ? "Classic" : "Retail";
  ls.set("gameType", toggleGameType);
  return {
    ...state,
    gameType: toggleGameType,
  };
}
