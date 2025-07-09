import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleGameType } from "../../../Redux/Actions";
import { useTranslation } from "react-i18next";
import { Tooltip, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { toggleContent } from "Redux/Actions";

import RetailLogo from "Images/Logos/Logo_WarWithin.png";
import ClassicLogo from "Images/Logos/LogoMistsOfPandaria.png";

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
      minWidth: 260,
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
        minWidth: 260,
        padding: 4,
        opacity: 1,
      },
    },
  },
}));

export default function WelcomeGameTypeSwitch(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const gameType = props.gameType;

  /* ------------------------------- Current gameType in redux state ------------------------------ */

  /* ---------------------------------- Toggle gameType via redux --------------------------------- */
  const handleContent = (event, gameType) => {
    props.handleGameTypeChange(gameType);
  };

  return (
    <ToggleButtonGroup value={gameType} exclusive onChange={handleContent} aria-label="gameToggle" size="large">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                  Dragonflight Game Type Toggle                                  */
      /* ----------------------------------------------------------------------------------------------  */}
      <ToggleButton className={classes.root} value="Retail" aria-label="retailLabel">
        <Tooltip title={t("GameTypeToggle.Retail")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={RetailLogo} alt={t("Dragonflight")} />
          </div>
        </Tooltip>
      </ToggleButton>

      {/* ---------------------------------------------------------------------------------------------- */
      /*                            Cataclysm: Classic Game Type Toggle                           */
      /* ---------------------------------------------------------------------------------------------- */}
      <ToggleButton className={classes.root} value="Classic" aria-label="classicLabel">
        <Tooltip title={t("GameTypeToggle.Classic")} arrow>
          <div style={{ display: "inline-flex" }}>
            <img src={ClassicLogo} alt={t("Cataclysm")} />
          </div>
        </Tooltip>
      </ToggleButton>

    </ToggleButtonGroup>
  );
}
