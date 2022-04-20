import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleGameType } from "../../../Redux/Actions";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { toggleContent } from "Redux/Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      minWidth: 175,
      padding: 4,
      opacity: 0.3,
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 250,
      padding: 4,
      opacity: 0.3,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 300,
      padding: 4,
      opacity: 0.3,
    },

    /* ----------------------------------- Unselected button style ---------------------------------- */
    /* ------------------------------------ Selected button style ----------------------------------- */
    "&.MuiToggleButton-root.Mui-selected": {
      [theme.breakpoints.down('md')]: {
        minWidth: 175,
        padding: 4,
        opacity: 1,
      },
      [theme.breakpoints.up("sm")]: {
        minWidth: 250,
        padding: 4,
        opacity: 0.3,
      },
      [theme.breakpoints.up("md")]: {
        minWidth: 300,
        padding: 4,
        opacity: 1,
      },
    },
  },
}));

export default function GameTypeSwitch(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const charUpdate = props.charUpdate;
  const allChars = props.allChars;

  /* ------------------------------- Current gameType in redux state ------------------------------ */
  const gameType = useSelector((state) => state.gameType);

  /* ---------------------------------- Toggle gameType via redux --------------------------------- */
  const handleContent = (event, gameType) => {
    if (gameType === null) {
    } else {
      allChars.setLowestChar(gameType)
      charUpdate(allChars);
      dispatch(toggleGameType(gameType));
      if (gameType === "BurningCrusade") {
        // If we're on the Burning Crusade setting then automatically update to Raid since there is no dungeon support.
        dispatch(toggleContent("Raid"))
      }
      

    }
  };

  return (
    <ToggleButtonGroup value={gameType} exclusive onChange={handleContent} aria-label="gameToggle" size="large">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                  Shadowlands Game Type Toggle                                  */
      /* ----------------------------------------------------------------------------------------------  */}
      <ToggleButton className={classes.root} value="Retail" aria-label="retailLabel">
        <Tooltip title={t("GameTypeToggle.Retail")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={require("../../../Images/Logos/Logo_Shadowlands.png").default} alt={t("Shadowlands")} />
          </div>
        </Tooltip>
      </ToggleButton>

      {/* ---------------------------------------------------------------------------------------------- */
      /*                            Burning Crusade: Classic Game Type Toggle                           */
      /* ---------------------------------------------------------------------------------------------- */}
      <ToggleButton className={classes.root} value="BurningCrusade" aria-label="classicLabel">
        <Tooltip title={t("GameTypeToggle.Classic")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={require("../../../Images/Logos/Logo_BurningCrusade.png").default} alt={t("Burning Crusade")} />
          </div>
        </Tooltip>
      </ToggleButton>

    </ToggleButtonGroup>
  );
}
