import { TOGGLE_CONTENT, TOGGLE_PLAYERSETTINGS, TOGGLE_PATRONSTATUS, TOGGLE_GAMETYPE } from "./ActionTypes";

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

export const togglePatronStatus = (patronStatus) => ({
  type: TOGGLE_PATRONSTATUS,
  payload: { patronStatus },
});

