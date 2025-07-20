import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Paper, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";
import { useSelector } from "react-redux";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips.tsx";

const useStyles = makeStyles(() => ({
  slider: {
    width: "90%",
    margin: "0px 20px 35px 20px",
    textAlign: "center",
  },
  simcerror: {
    borderColor: "red",
    borderWidth: "2px",
    borderStyle: "Solid",
  },
  simcok: {
    borderStyle: "None",
  },
}));

const checkCharacterValid = (player, gameType) => {
  const weaponSet = player.getActiveItems("AllMainhands", false, true);
  const weapon = weaponSet.length > 0 ? weaponSet[0] : "";
  if (gameType === "Retail") {
    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
  } else if (gameType === "Classic") {
    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 16) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 17);
  }
};

const getSimCStatus = (player, gameType) => {
  if (player.activeItems.length === 0) return "Missing";
  else if (checkCharacterValid(player, gameType) === false) return "Invalid";
  else return "Good";
};

export default function UpgradeFinderSimC(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const gameType = useSelector((state) => state.gameType);
  const currentLanguage = i18n.currentLanguage;
  const simcStatus = getSimCStatus(props.player, gameType);
  const simcString = "UpgradeFinderFront.SimCBody1" + simcStatus;
  const wowheadDom = (gameType === "Classic" ? "wotlk-" : "") + currentLanguage;

  const check = (simcStatus) => {
    let style = "";

    /* ----------------------- If quickcompare prop is true then only show ok. ---------------------- */
    /* ---------------- Quickcompare doesn't need to be checked for missing items etc --------------- */

    if (props.quickCompare === true) {
      style = classes.simcok;
    } else {
      style = simcStatus === "Good" || simcStatus === "Missing" ? classes.simcok : classes.simcerror;
    }
    return style;
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={0} className={check(simcStatus)} style={{ padding: 10 }}>
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5} alignItems="center" container justifyContent="center" spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
              <Typography color="primary" align="center" variant="h5">
                {t(simcString)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={4} style={{ textAlign: "center" }}>
              <SimCraftInput
                buttonLabel={t("UpgradeFinderFront.SimCButton")}
                disableElevation={true}
                color="secondary"
                variant="contained"
                player={props.player}
                simcSnack={props.simcSnack}
                allChars={props.allChars}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" flexItem style={{ height: "100%" }} />
          </Grid>
          <Grid item container xs={12} sm={12} md={12} lg={7} xl={7} alignItems="center" justifyContent="center" spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Typography color="primary" align="center" variant="h5">
                {t("Equipped")}:
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
              <Grid container justifyContent="center">
                {props.player.activeItems
                  .filter((key) => key.isEquipped === true)
                  .map((key, i) => (
                    <Grid item key={i}>
                      <WowheadTooltip type="item" level={key.level} bonusIDS={key.bonusIDS} domain={wowheadDom}>
                        <img
                          style={{
                            height: 22,
                            width: 22,
                            verticalAlign: "middle",
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: key.getQualityColor(),
                            margin: "2px 2px",
                          }}
                          src={getItemIcon(key.id, gameType)}
                          alt=""
                        />
                      </WowheadTooltip>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
