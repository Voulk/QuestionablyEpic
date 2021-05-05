import { TOGGLE_CONTENT } from "./ActionTypes";
import { TOGGLE_GAMETYPE } from "./ActionTypes";

export const toggleContent = (content) => ({
  type: TOGGLE_CONTENT,
  payload: { content },
});

export const toggleGameType = (gameType) => ({
  type: TOGGLE_GAMETYPE,
  payload: { gameType },
});

