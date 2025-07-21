import { TOGGLE_CONTENT, TOGGLE_PLAYERSETTINGS, TOGGLE_PATRONSTATUS, TOGGLE_GAMETYPE } from "./ActionTypes";

export const toggleContent = (content: contentTypes) => ({
  type: TOGGLE_CONTENT,
  payload: { content },
});

export const toggleGameType = (gameType: gameTypes) => ({
  type: TOGGLE_GAMETYPE,
  payload: { gameType },
});

export const togglePlayerSettings = (playerSettings: PlayerSettings) => ({
  type: TOGGLE_PLAYERSETTINGS,
  payload: { playerSettings },
});

export const togglePatronStatus = (patronStatus : string) => ({
  type: TOGGLE_PATRONSTATUS,
  payload: { patronStatus },
});

