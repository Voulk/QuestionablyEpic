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

const itemQuality = (itemLevel, effectCheck) => {
  const isLegendary = effectCheck.type === "spec legendary";
  if (isLegendary) return "#ff8000";
  if (itemLevel >= 183) return "#a73fee";
  else if (itemLevel >= 120) return "#328CE3";
  else return "#1eff00";
};

/*
const getSimCStatus = (player) => {
  if (player.activeItems.length === 0) return "Missing";
  else if (checkCharacterValid(player) === false) return "Invalid";
  else return "Good";

}

const checkCharacterValid = (player) => {
  const weaponSet = player.getActiveItems("AllMainhands", false, true);
  const weapon = weaponSet.length > 0 ? weaponSet[0] : "";

  return ((weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) ||
          (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16));
}
*/
export default function UpgradeFinderSimC(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const simcStatus =
    "UpgradeFinderFront.SimCBody1" + props.getSimCStatus(props.player);

  return (
    <Grid item xs={12}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={6} container justify="center" spacing={1}>
            <Grid item xs={12}>
              <Typography color="primary" align="center" variant="h5">
                {/*t("UpgradeFinderFront.SimCBody1") + "" + getSimCStatus(props.player) */}
                {t(simcStatus)}
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
                        "&bonus=" +
                        key.bonusIDS +
                        "&domain=" +
                        currentLanguage
                      }
                    >
                      <img
                        style={{
                          height: 22,
                          width: 22,

                          verticalAlign: "middle",
                          borderRadius: "8px",
                          border: "1px solid",
                          borderColor: itemQuality(key.level, key.effect),
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
