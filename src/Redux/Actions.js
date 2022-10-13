import { TOGGLE_CONTENT, TOGGLE_PLAYERSETTINGS } from "./ActionTypes";
import { TOGGLE_GAMETYPE } from "./ActionTypes";

export const toggleContent = (content) => ({
  type: TOGGLE_CONTENT,
  payload: { content },
});

export const toggleGameType = (gameType) => ({
  type: TOGGLE_GAMETYPE,
  payload: { gameType },
});

export const togglePlayerSettings = (playerSettings) => ({
  type: TOGGLE_PLAYERSETTINGS,
  payload: { playerSettings },
});

