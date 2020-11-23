import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import logo from "../../Images/QeAssets/QELogo.png";
import "./QEMainMenu.css";
import LanguageSelector from "./LanguageButton";
import ProfileSelector from "./ProfileButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimCraftInput from "./SimCraftDialog";
import QELogImport from "./QELogImport";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import ReactGA from "react-ga";

const useStyles = makeStyles((theme) => ({
  qeLogo: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
}));

export default function QEHeader(props) {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  // If the player isn't logged in, then show a login button and redirect to the login page on click.
  // If the player IS logged in, show their battle tag and redirect to profile on click.
  // TODO: Implement profile.
  let playerName = props.playerTag || t("HeaderLabels.Login");
  let linkTarget = props.playerTag === "" ? "/login" : "/profile";
  let patronStatus = props.patronStatus !== "" ? props.patronStatus + " Edition" : "Standard Edition";
  let color = {
    "Rolls Royce Edition": "#04E07C",
    "Diamond Edition": "#FFB6C1",
    "Gold Edition": "#DAA520",
    "Standard Edition": "#FFFFFF",
    "Basic Edition": "#FFFFFF",
  }

  return (
    <div style={{ backgroundColor: "#353535" }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar style={{ marginLeft: "16%", marginRight: "16%" }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} align="center">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Link to={"/"}>
                    <img className={classes.qeLogo} src={logo} alt="QE Live" />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Typography
                    style={{ color: color[patronStatus] }}
                    variant="body1"
                    align="left"
                  >
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
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item>
                  <QELogImport
                    logImportSnack={props.logImportSnack}
                    player={props.pl}
                    allChars={props.allChars}
                  />
                </Grid>
                <Grid item>
                  <SimCraftInput
                    pl={props.pl}
                    contentType={props.contentType}
                    simcSnack={props.simcSnack}
                  />
                </Grid>
                <Grid item>
                  <Button
                    style={{ color: "white" }}
                    onClick={props.toggleContentType}
                  >
                    {t(props.contentType)}
                  </Button>
                </Grid>
                <Grid item>
                  <ProfileSelector
                    name={playerName}
                    component={Link}
                    to={linkTarget}
                    logFunc={props.logFunc}
                    setRegion={props.setRegion}
                  />
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
