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

const itemQuality = (itemLevel) => {
  // const isLegendary = "effect" in item && item.effect.type === "spec legendary";

  // if (isLegendary) return "#ff8000";
  if (itemLevel >= 183) return "#a73fee";
  else if (itemLevel >= 120) return "#328CE3";
  else return "#1eff00";

  /*
    case "Legendary":
      return "#ff8000";
      break;
    case "Epic":
      return "#a335ee";
      break;
    case "Rare":
      return "#a335ee";
      break;
    case "Uncommon":
      return "#328CE3"; // Previously #0070dd
      break;
    case "Common":
      return "#1eff00";
      break;
    default:
      return "#fff";
      */
};

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
                      style={{ padding: 2 }}
                      data-wowhead={
                        "item=" +
                        key.id +
                        "&" +
                        "ilvl=" +
                        key.level +
                        "&bonus=6646" +
                        (key.tertiary === "Leech" ? ":41" : "") +
                        (key.tertiary === "Avoidance" ? ":40" : "") +
                        (key.tertiary === "Speed" ? ":42" : "") +
                        (key.socket === true ? ":565" : "")
                      }
                    >
                      <img
                        style={{
                          height: 22,
                          width: 22,

                          verticalAlign: "middle",
                          borderRadius: "8px",
                          border: "1px solid",
                          borderColor: itemQuality(key.level),
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
