import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@material-ui/core";

export default function SourceToggle(props) {
  const metric = props.metric;
  const setMetric = props.setMetric;
  const { t } = useTranslation();
  const handleContent = (event, content) => {
    if (content === null) {
    } else {
      setMetric(content);
    }
  };

  // TODO: Localise Tooltips?
  return (
    <ToggleButtonGroup value={metric} onChange={setMetric} aria-label="contentToggle" size="small">
      <ToggleButton style={{ padding: 5 }} value="Raids" aria-label="dpsLabel">
        <Tooltip title={"Raids"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4 }}
              src={require("Images/achievement_raid_torghastraid.jpg").default}
              alt={"Raids"}
            />
            <Typography variant="button">{"Raids"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ padding: 5 }} value="Dungeons" aria-label="dpsLabel">
        <Tooltip title={"Dungeons"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4 }} src={require("Images/inv_relics_hourglass.jpg").default} alt={"Dungeons"} />
            <Typography variant="button">{"Dungeons"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ padding: 5 }} value="The Rest" aria-label="hpsLabel">
        <Tooltip title={"The Rest"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4 }} src={require("Images/Resources/worldQuest.png").default} alt={"World Quests"} />
            <Typography variant="button">{"The Rest"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
