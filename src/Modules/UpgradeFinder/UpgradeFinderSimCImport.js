import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Grid, Slider, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "90%",
    margin: "0px 20px 35px 20px",
    textAlign: "center",
  },
}));

export default function UpgradeFinderSimC(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <Grid item xs={12}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="primary" align="center" variant="h5">
              {t("UpgradeFinderFront.SimCHeader")}
            </Typography>
          </Grid>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={5}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Typography align="center">
                    {t("UpgradeFinderFront.SimCBody1") + " " + "Loaded"}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <SimCraftInput
                    disableElevation={true}
                    color="primary"
                    variant="contained"
                    pl={props.player}
                    contentType={props.contentType}
                    simcSnack={props.simcSnack}
                    allChars={props.allChars}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={7} justify="flex-end">
              <Typography align="center">
                {t("UpgradeFinderFront.SimCBody2")}
              </Typography>
              {props.player.activeItems
                .filter((key) => key.isEquipped === true)
                .map((key) => (
                  <a
                    data-wowhead={"item=" + key.id + "&" + "ilvl=" + key.level}
                  >
                    <img
                      style={{
                        height: 25,
                        width: 25,
                        padding: 4,
                        verticalAlign: "middle",
                        borderRadius: "8px",
                      }}
                      src={getItemIcon(key.id)}
                      //   alt={alt}
                    />
                  </a>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
