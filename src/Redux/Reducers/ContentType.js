import ls from "local-storage";

export default function (state = initialState, action) {
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
