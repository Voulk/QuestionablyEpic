import ls from "local-storage";

// Action to toggle content type in the Redux store.
export function PatronStatus(state, action) {
  const { patronStatus } = action.payload;
  //ls.set("patronStatus", patronStatus);
  return {
    ...state,
    patronStatus: patronStatus,
  };
}
