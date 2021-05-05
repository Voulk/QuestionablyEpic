import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleGameType } from "../../../Redux/Actions";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@material-ui/core";

export default function GameTypeSwitch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const gameType = useSelector((state) => state.gameType);
  const handleContent = (event, gameType) => {
    if (gameType === null) {
    } else {
      dispatch(toggleGameType(gameType));
    }
  };

  return (
    <ToggleButtonGroup value={gameType} exclusive onChange={handleContent} aria-label="gameToggle" size="large">
      <ToggleButton style={{ minWidth: 300, padding: 4 }} value="Classic" aria-label="classicLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToDungeon")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={require("../../../Images/Logos/Logo_BurningCrusade.png").default} alt={t("Burning Crusade")} />
            {/* <Typography variant="button" noWrap>
              {t("Burning Crusade")}
            </Typography> */}
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ minWidth: 300, padding: 4 }} value="Retail" aria-label="retailLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToRaid")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={require("../../../Images/Logos/Logo_Shadowlands.png").default} alt={t("Shadowlands")} />
            {/* <Typography variant="button" noWrap>
              {t("Shadowlands")}
            </Typography> */}
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
