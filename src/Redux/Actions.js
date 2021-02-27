import { TOGGLE_CONTENT } from "./ActionTypes"

export const toggleContent = content => ({
    type: TOGGLE_CONTENT,
    payload: { content }
  });