import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@mui/material";

export default function MetricToggle(props) {
  const metric = props.metric
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
    <ToggleButtonGroup value={metric} exclusive onChange={handleContent} aria-label="contentToggle" size="small">
      <ToggleButton style={{ padding: 5, width: 70 }} value="hps" aria-label="hpsLabel">
        <Tooltip title={"HPS"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4 }}
              src={require("Images/Resources/healerIcon.png")}
              alt={"HPS"}
            />
            <Typography variant="button">{"HPS"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      <ToggleButton style={{ padding: 5, width: 70 }} value="dps" aria-label="dpsLabel">
        <Tooltip title={"DPS"} arrow>
          <div style={{ display: "inline-flex" }}>
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4 }}
              src={require("Images/Resources/dpsIcon.png")}
              alt={"DPS"}
            />
            <Typography variant="button">{"DPS"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>
      <ToggleButton style={{ padding: 5, width: 75 }} value="both" aria-label="dpsLabel">
        <Tooltip title={"Both"} arrow>
          <div style={{ display: "inline-flex" }}>
            {/*<img
              style={{ height: 18, width: 18, margin: "2px 5px 2px 0px", verticalAlign: "middle", borderRadius: 4 }}
              src={require("Images/Resources/dpsIcon.png")}
              alt={"Both"}
            /> */}
            <Typography variant="button">{"Both"}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}