import ls from "local-storage";

// Action to toggle content type in the Redux store.
export function cooldownPlannerTheme(state, action) {
  const { status } = action.payload;
  ls.set("cooldownPlannerTheme", status);

  return {
    ...state,
    cooldownPlannerTheme: status,
  };
}
