import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleContent } from "../../../../Redux/Actions";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@material-ui/core";

export default function ContentSwitch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const handleContent = (event, content) => {
    // console.log(content)
    dispatch(toggleContent(content));
  };

  return (
    <ToggleButtonGroup value={contentType} exclusive onChange={handleContent} aria-label="contentToggle" size="small">
      <ToggleButton style={{ padding: 5 }} value="Dungeon" aria-label="dungeonLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToDungeon")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/inv_relics_hourglass.jpg").default}
              alt={t("Dungeon")}
            />
            <Typography variant="button">{t("Dungeon")}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ padding: "5px 7px" }} value="Raid" aria-label="raidLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToRaid")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/achievement_raid_revendrethraid_castlenathria.jpg").default}
              alt={t("Raid")}
            />
            <Typography variant="button">{t("Raid")}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
