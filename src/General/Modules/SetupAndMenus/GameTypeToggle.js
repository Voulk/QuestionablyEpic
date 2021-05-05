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
      <ToggleButton style={{ minWidth: 300 }} value="Classic" aria-label="classicLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToDungeon")} arrow>
          <div style={{ display: "inline-flex" }}>
            {/* <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/inv_relics_hourglass.jpg").default}
              alt={t("Dungeon")}
            /> */}
            <Typography variant="button" noWrap>
              {t("Burning Crusade")}
            </Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ minWidth: 300 }} value="Retail" aria-label="retailLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToRaid")} arrow>
          <div style={{ display: "inline-flex" }}>
            {/* <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/achievement_raid_revendrethraid_castlenathria.jpg").default}
              alt={t("Raid")}
            /> */}
            <Typography variant="button" noWrap>
              {t("Shadowlands")}
            </Typography>
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
