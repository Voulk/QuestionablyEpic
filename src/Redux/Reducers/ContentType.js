import ls from "local-storage";

// Action to toggle content type in the Redux store.
export function contentType(state, action) {
  const { content } = action.payload;
  const toggleType = content === "Raid" ? "Dungeon" : "Raid";
  ls.set("contentType", toggleType);
  return {
    ...state,
    contentType: toggleType,
  };
}
