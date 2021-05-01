import ls from "local-storage";

// Action to toggle content type in the Redux store.
export function gameType(state, action) {
  const { gameType } = action.payload;
  ls.set("gameType", gameType);
  return {
    ...state,
    gameType: gameType,
  };
}
