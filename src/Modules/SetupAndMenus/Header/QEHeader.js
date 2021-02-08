import React from "react";
import { AppBar, Toolbar, Button, Typography, Popover, Tooltip, Grid } from "@material-ui/core";
import logo from "../../../Images/QeAssets/QELogo.png";
import "../QEMainMenu.css";
import LanguageSelector from "./LanguageButton";
import ProfileSelector from "./ProfileButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimCraftInput from "../SimCraftDialog";
import QELogImport from "./QELogImport";
import { makeStyles } from "@material-ui/core/styles";
import CharacterHeaderButton from "./CharacterHeader"
// import ReactGA from "react-ga";n

const useStyles = makeStyles((theme) => ({
  qeLogo: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
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
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
  let patronStatus = props.patronStatus !== "" && props.patronStatus !== "Basic" ? props.patronStatus + " Edition" : "Standard Edition";
  let color = {
    "Rolls Royce Edition": "#04E07C",
    "Diamond Edition": "#FFB6C1",
    "Gold Edition": "#DAA520",
    "Standard Edition": "#FFFFFF",
    "Basic Edition": "#FFFFFF",
  };

  return (
    <div style={{ backgroundColor: "#353535" }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar style={{ marginLeft: "16%", marginRight: "16%" }}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} align="center">
              <Grid container direction="row" alignItems="center">
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
                  <Link to={"/"}>
                    <Tooltip title={t("QeHeader.Tooltip.Home")} arrow>
                      <img className={classes.qeLogo} src={logo} alt="QE Live" />
                    </Tooltip>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl="auto">
                  <Typography style={{ color: color[patronStatus], paddingLeft: 10, paddingRight: 10 }} variant="body1" align="center">
                    {patronStatus}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/*}
                    <Grid item alignItems="left" justify="flex-start">
                      <p className={classes.qeLogo} style={{color: 'white', textAlign: 'left'}}>Gearing Made Easy</p>
          </Grid> */}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={1} wrap="nowrap" style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Grid item>
                  <Tooltip title={props.contentType === "Raid" ? t("QeHeader.Tooltip.ChangeToDungeon") : t("QeHeader.Tooltip.ChangeToRaid")} arrow>
                    <Button
                      style={{ color: "white" }}
                      onClick={props.toggleContentType}
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      {t(props.contentType)}
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <QELogImport logImportSnack={props.logImportSnack} player={props.pl} allChars={props.allChars} />
                </Grid>
                <Grid item>
                  <CharacterHeaderButton player={props.pl} allChars={props.allChars} />
                </Grid>
                <Grid item>
                  <SimCraftInput
                    buttonLabel={t("SimCInput.SimCHeaderButtonLabel")}
                    pl={props.pl}
                    contentType={props.contentType}
                    simcSnack={props.simcSnack}
                    allChars={props.allChars}
                  />
                </Grid>
                <Grid item>
                  <ProfileSelector name={playerName} component={Link} to={linkTarget} logFunc={props.logFunc} setRegion={props.setRegion} />
                </Grid>
                <Grid item>
                  <LanguageSelector />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
