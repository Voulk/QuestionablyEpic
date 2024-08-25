import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleContent } from "../../../../Redux/Actions";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    color: "rgb(255,255,255,0.38)",
    "&.Mui-selected": {
      color: "#fff",
    },
  },
}));

/* ---------------------------------------------------------------------------------------------- */
/*                 Toggle Button to swap content used by the app (Dungeon or Raid)                */
/* ---------------------------------------------------------------------------------------------- */

export default function ContentSwitch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);

  /* -------------------------- Function to dispatch the content to Redux ------------------------- */
  // Content === null check is to stop the component throwing an error when the user clicks on the already active content
  const handleContent = (event, content) => {
    if (content === null) {
    } else {
      dispatch(toggleContent(content));
    }
  };

  return (
    <StyledToggleButtonGroup value={contentType} exclusive onChange={handleContent} aria-label="contentToggle" size="small">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                         Dungeon Button                                         */
      /* ----------------------------------------------------------------------------------------------  */}
      <ToggleButton style={{ padding: 5 }} value="Dungeon" aria-label="dungeonLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToDungeon")} arrow>
          <div style={{ display: "inline-flex" }}>
            {/* ---------------------------------------- Keystone Icon ---------------------------------------  */}
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/inv_relics_hourglass.jpg")}
              alt={t("Dungeon")}
            />
            <Typography variant="button">{t("Dungeon")}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>

      {/* ---------------------------------------------------------------------------------------------- */
      /*                                           Raid Button                                          */
      /* ----------------------------------------------------------------------------------------------  */}
      <ToggleButton style={{ padding: "5px 7px" }} value="Raid" aria-label="raidLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToRaid")} arrow>
          <div style={{ display: "inline-flex" }}>
            {/* -------------------------------------- Current Raid Icon -------------------------------------  */}
            <img
              style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
              src={require("Images/Logos/RaidLogo.jpg")}
              alt={t("Raid")}
            />
            <Typography variant="button">{t("Raid")}</Typography>
          </div>
        </Tooltip>
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
