import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../../Images/QeAssets/QELogo.png";
import "./QEMainMenu.css";

import Box from "@material-ui/core/Box";
import LanguageSelector from "./LanguageButton";
import ProfileSelector from "./ProfileButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimCraftInput from "./SimCraftDialog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  qeLogo: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
}));

export default function QEHeader(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  // If the player isn't logged in, then show a login button and redirect to the login page on click.
  // If the player IS logged in, show their battle tag and redirect to profile on click.
  // TODO: Implement profile.
  let playerName = props.playerTag || t("HeaderLabels.Login");
  let linkTarget = props.playerTag === "" ? "/login" : "/profile";

  return (
    <div style={{ backgroundColor: "#353535" }}>
      <AppBar position="static" color="inherit">
        <Toolbar style={{ marginLeft: "10%", marginRight: "10%" }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1} align="center">
              <Link to={"/"}>
                <img className={classes.qeLogo} src={logo} alt="QE Live" />
              </Link>
            </Grid>
            <Grid
              container
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
              <Grid item>
                <Button style={{ color: "white" }}>
                  {t("QeHeader.InsertLogLabel")}
                </Button>
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
                <LanguageSelector
                  langSet={props.langSet}
                  curLang={props.curLang}
                />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
