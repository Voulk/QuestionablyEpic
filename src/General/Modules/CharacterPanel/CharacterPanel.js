import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";

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
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
    height: 100,
    width: 100,
  },
}));

const checkCharacterValid = (player, gameType) => {
  const weaponSet = player.getActiveItems("AllMainhands", false, true);
  const weapon = weaponSet.length > 0 ? weaponSet[0] : "";
  if (gameType === "Retail") {
    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
  } else if (gameType === "BurningCrusade") {
    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 16) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 17);
  }
};

const getSimCStatus = (player, gameType) => {
  if (player.activeItems.length === 0) return "Missing";
  else if (checkCharacterValid(player, gameType) === false) return "Invalid";
  else return "Good";
};

export default function UpgradeFinderSimCnew(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const gameType = useSelector((state) => state.gameType);
  const currentLanguage = i18n.currentLanguage;
  const simcStatus = getSimCStatus(props.player, gameType);
  const simcString = "UpgradeFinderFront.SimCBody1" + simcStatus;
  const wowheadDom = (gameType === "BurningCrusade" ? "tbc-" : "") + currentLanguage;

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

  const currentCharacter = props.allChars.allChar[props.allChars.activeChar];

  return (
    <Grid item xs={12}>
      <Paper elevation={0} className={check(simcStatus)} style={{ display: "inline-flex", width: "100%", height: 102 }}>
        {/* <Avatar src="https://render.worldofwarcraft.com/us/character/frostmourne/212/180358868-main.jpg" variant="rounded" className={classes.rounded} /> */}
        <div
          style={{
            backgroundImage: `url("${"https://render.worldofwarcraft.com/us/character/frostmourne/212/180358868-main.jpg"}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 28%",
            backgroundSize: "auto 500%",
            textAlign: "center",
            position: "relative",
            border: "1px solid rgb(118, 118, 118)",
            flex: "1 1 10%",
            height: 100,
            width: 100,
            borderRadius: 4,
          }}
        />

        <Grid container direction="row" justify="space-between" spacing={1}>
          <Grid item xs="auto">
            <div style={{ display: "inline-flex" }}>
              {classIcons(currentCharacter.spec, { height: 18, width: 18, margin: "0px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" })}
              <Typography style={{ color: classColoursJS(currentCharacter.spec) }}>{currentCharacter.charName}</Typography>
              <Typography style={{ color: classColoursJS(currentCharacter.spec) }}>{currentCharacter.getRealmString()}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <SimCraftInput
              buttonLabel={t("UpgradeFinderFront.SimCButton")}
              disableElevation={true}
              color="primary"
              variant="contained"
              player={props.player}
              simcSnack={props.simcSnack}
              allChars={props.allChars}
            />
          </Grid>
          <Grid item container xs={10} alignItems="center" justify="center" spacing={1}>
            <Grid item xs={2}>
              <Typography color="primary" align="center" variant="h5">
                {t("Equipped")}:
              </Typography>
            </Grid>
            {/* <Grid item xs={5}>
                  <Typography color="primary" align="center" variant="h5">
                    {t(simcString)}
                  </Typography>
                </Grid> */}

            <Grid item xs={10}>
              <Grid container justify="center">
                {props.player.activeItems
                  .filter((key) => key.isEquipped === true)
                  .map((key, i) => (
                    <Grid item key={i}>
                      <a style={{ margin: "2px 2px" }} data-wowhead={"item=" + key.id + "&" + "ilvl=" + key.level + "&bonus=" + key.bonusIDS + "&domain=" + wowheadDom} key={i}>
                        <img
                          style={{
                            height: 22,
                            width: 22,
                            verticalAlign: "middle",
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: key.getQualityColor(),
                          }}
                          src={getItemIcon(key.id, gameType)}
                          alt=""
                        />
                      </a>
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
