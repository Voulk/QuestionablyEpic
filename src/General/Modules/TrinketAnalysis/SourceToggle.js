
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import { useTranslation } from "react-i18next";
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const matches = useMediaQuery("(max-width:750px)");
  // const { t } = useTranslation();

  // TODO: Localise Tooltips?
  return (
    <ToggleButtonGroup value={sources} onChange={setSources} aria-label="contentToggle" size="small" orientation={`${matches ? "vertical" : "horizontal"}`}  style={{ padding: 8, width: "100%" }}>
      <ToggleButton style={{ padding: 5 }} value="Raids" aria-label="dpsLabel" classes={{ selected: classes.selected }}>
        <Tooltip title={"Raids"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/Logos/RaidLogo.jpg")}
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

      <ToggleButton style={{ padding: 5 }} value="Delves" aria-label="dpsLabel" classes={{ selected: classes.selected }}>
        <Tooltip title={"Delves"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/Logos/RaidLogo.jpg")}
              alt={"Delves"}
            />
            <Typography variant="button">{"Delves"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ padding: 5 }} value="Timewalking" aria-label="dpsLabel" classes={{ selected: classes.selected }}>
        <Tooltip title={"Timewalking"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/Logos/TimewalkingLogo.png")}
              alt={"Timewalking"}
            />
            <Typography variant="button">{"Timewalking"}</Typography>
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
