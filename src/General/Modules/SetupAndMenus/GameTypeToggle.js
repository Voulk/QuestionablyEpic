import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleGameType } from "../../../Redux/Actions";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    /* ----------------------------------- Unselected button style ---------------------------------- */
    minWidth: 300,
    padding: 4,
    opacity: 0.3,
    /* ------------------------------------ Selected button style ----------------------------------- */
    "&.MuiToggleButton-root.Mui-selected": {
      minWidth: 300,
      padding: 4,
      opacity: 1,
    },
  },
});

export default function GameTypeSwitch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  /* ------------------------------- Current gameType in redux state ------------------------------ */
  const gameType = useSelector((state) => state.gameType);

  /* ---------------------------------- Toggle gameType via redux --------------------------------- */
  const handleContent = (event, gameType) => {
    if (gameType === null) {
    } else {
      dispatch(toggleGameType(gameType));
    }
  };

  return (
    <ToggleButtonGroup value={gameType} exclusive onChange={handleContent} aria-label="gameToggle" size="large">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                            Burning Crusade: Classic Game Type Toggle                           */
      /* ---------------------------------------------------------------------------------------------- */}
      <ToggleButton className={classes.root} value="Classic" aria-label="classicLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToDungeon")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={require("../../../Images/Logos/Logo_BurningCrusade.png").default} alt={t("Burning Crusade")} />
          </div>
        </Tooltip>
      </ToggleButton>

      {/* ---------------------------------------------------------------------------------------------- */
      /*                                  Shadowlands Game Type Toggle                                  */
      /* ----------------------------------------------------------------------------------------------  */}
      <ToggleButton className={classes.root} value="Retail" aria-label="retailLabel">
        <Tooltip title={t("QeHeader.Tooltip.ChangeToRaid")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={require("../../../Images/Logos/Logo_Shadowlands.png").default} alt={t("Shadowlands")} />
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
