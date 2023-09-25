import React from "react";
import { AppBar, Toolbar, Button, Typography, Tooltip, Grid } from "@mui/material";
import logo from "Images/QeAssets/QELogo.png";
import "../QEMainMenu.css";
import LanguageSelector from "./LanguageButton";
import ProfileSelector from "./ProfileButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimCraftInput from "../SimCraftDialog";
import QELogImport from "./QELogImport";
import makeStyles from "@mui/styles/makeStyles";
import CharacterHeaderButton from "./CharacterHeader";
import ContentSwitch from "./ContentToggle";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { patronColor } from "./PatronColors";

// import ReactGA from "react-ga";n

const useStyles = makeStyles((theme) => ({
  qeLogo: {
    [theme.breakpoints.down("xl")]: {
      marginTop: "5px",
      marginBottom: "-5px",
    },
  },
  headerButtons: {
    [theme.breakpoints.down("lg")]: {
      marginBottom: "5px",
    },
  },
  headerMargins: {
    [theme.breakpoints.down("lg")]: {
      marginLeft: "4%",
      marginRight: "4%",
      minHeight: 56,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "8%",
      marginRight: "8%",
      minHeight: 56,
    },
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function QEHeader(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const gameType = useSelector((state) => state.gameType);
  const bgColor = props.isPTR ? "#000065" : "#353535"; // Not functional yet.
  //const hasAccount = props.pl && props.allChar;
  //const patronStatus = useSelector((state) => state.patronStatus);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // If the player isn't logged in, then show a login button and redirect to the login page on click.
  // If the player IS logged in, show their battle tag and redirect to profile on click.
  // TODO: Implement profile.
  let playerName = props.playerTag || t("QeHeader.Login");
  let linkTarget = props.playerTag === "" ? "/login" : "/profile";
  let patronStatus = props.patronStatus !== "" && props.patronStatus !== "Basic" ? props.patronStatus : "Standard";


  // box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  return (
    <div style={{  }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar className={classes.headerMargins}>
          <Grid container direction="row" spacing={0} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={12} md={3} lg={3} xl={6} align="center">
              {/* ---------------------------------------------------------------------------------------------- */
              /*                                         Logo Container                                          */
              /* ----------------------------------------------------------------------------------------------  */}
              <Grid container direction="row" alignItems="center">
                <Grid item xs={12} sm={12} md="auto" lg={"auto"} xl="auto" align="center">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} sm={12} md={12} lg={6} xl="auto">
                      <Link to={"/"}>
                        <Tooltip title={t("QeHeader.Tooltip.Home")} arrow>
                          <img className={classes.qeLogo} src={logo} alt="QE Live" />
                        </Tooltip>
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={12} md={12} lg={6} xl="auto">
                      <Typography style={{ color: patronColor[patronStatus], paddingLeft: 10, paddingRight: 10 }} variant="body1" align="center" noWrap>
                        {patronStatus + " Edition"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {true ? (
            <Grid item xs={12} sm={12} md={8} lg={6} xl={4} className={classes.headerButtons}>
              {/* ---------------------------------------------------------------------------------------------- */
              /*                                     Menu Buttons Container                                      */
              /* ----------------------------------------------------------------------------------------------  */}
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                wrap={matches && gameType === "Retail" ? "wrap" : "nowrap"}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                {(props.allChars && props.allChars.allChar.length) > 0 ? (
                  <Grid item xs={gameType === "Retail" ? 6 : "auto"} sm="auto">
                    <CharacterHeaderButton player={props.pl} allChars={props.allChars} />
                  </Grid>
                ) : (
                  ""
                )}
                {gameType === "Retail" ? (
                  <Grid item xs={6} sm="auto">
                    <ContentSwitch />
                  </Grid>
                ) : (
                  ""
                )}
                {gameType === "Retail" ? (
                  <Grid item>
                    <QELogImport logImportSnack={props.logImportSnack} player={props.player} allChars={props.allChars} />
                  </Grid>
                ) : (
                  ""
                )}
                <Grid item>
                  <SimCraftInput
                    colour={"white"}
                    variant="outlined"
                    buttonLabel={t("SimCInput.SimCHeaderButtonLabel" + gameType)}
                    player={props.player}
                    simcSnack={props.simcSnack}
                    allChars={props.allChars}
                  />
                </Grid>
                {/*<Grid item>
                  <ProfileSelector name={playerName} component={Link} to={linkTarget} logFunc={props.logFunc} setRegion={props.setRegion} />
                </Grid> */}
                <Grid item>
                  <LanguageSelector />
                </Grid>
              </Grid>
            </Grid> ) : ""}
          </Grid> 
        </Toolbar>
      </AppBar>
    </div>
  );
}
