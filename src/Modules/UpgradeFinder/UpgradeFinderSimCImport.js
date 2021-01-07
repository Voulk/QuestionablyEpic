import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Grid, Slider, Paper, Typography, Divider } from "@material-ui/core";
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
  console.log(props.player);
  return (
    <Grid item xs={12}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={6} container justify="center" spacing={1}>
            <Grid item xs={12}>
              <Typography color="primary" align="center" variant="h5">
                {t("UpgradeFinderFront.SimCBody1") + " Loaded"}
              </Typography>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <SimCraftInput
                buttonLabel={t("UpgradeFinderFront.SimCButton")}
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
          <Divider orientation="vertical" flexItem />
          <Grid item xs={6} container justify="center" spacing={1}>
            <Grid item xs={12}>
              <Typography color="primary" align="center" variant="h5">
                {t("UpgradeFinderFront.SimCBody2")}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify="center">
                {props.player.activeItems
                  .filter((key) => key.isEquipped === true)
                  .map((key) => (
                    <a
                      data-wowhead={
                        "item=" +
                        key.id +
                        "&" +
                        "ilvl=" +
                        key.level +
                        (key.tertiary === "Leech" ? "&bonus=41" : "") +
                        (key.tertiary === "Avoidance" ? "&bonus=40" : "") +
                        (key.tertiary === "Speed" ? "&bonus=42" : "") +
                        (key.socket === true ? "&bonus=565" : "")
                      }
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
        </Grid>
      </Paper>
    </Grid>
  );
}
