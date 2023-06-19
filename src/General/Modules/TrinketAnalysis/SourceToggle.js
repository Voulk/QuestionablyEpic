import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { green } from "@mui/material/colors";

const useStyles = makeStyles(() => ({
  selected: {
    "&&": {
      backgroundColor: green[900],
      // color: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: green[900],
      },
    },
  },
}));

export default function SourceToggle(props) {
  const sources = props.sources;
  const setSources = props.setSources;
  const classes = useStyles();
  // const { t } = useTranslation();

  // TODO: Localise Tooltips?
  return (
    <ToggleButtonGroup value={sources} onChange={setSources} aria-label="contentToggle" size="small" style={{ padding: 8 }}>
      <ToggleButton style={{ padding: 5 }} value="Raids" aria-label="dpsLabel" classes={{ selected: classes.selected }}>
        <Tooltip title={"Raids"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/achievement_raid_torghastraid.jpg")}
              alt={"Raids"}
            />
            <Typography variant="button">{"Raids"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ padding: 5 }} value="Dungeons" aria-label="dpsLabel" classes={{ selected: classes.selected }}>
        <Tooltip title={"Dungeons"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/inv_relics_hourglass.jpg")}
              alt={"Dungeons"}
            />
            <Typography variant="button">{"Dungeons"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>


      <ToggleButton style={{ padding: 5 }} value="The Rest" aria-label="hpsLabel" classes={{ selected: classes.selected }}>
        <Tooltip title={"The Rest"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4 }} src={require("Images/Resources/worldQuest.png")} alt={"World Quests"} />
            <Typography variant="button">{"The Rest"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
