import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider, Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";
import Settings from "../Settings/Settings";
import { covenantIcons } from "../CooldownPlanner/Functions/CovenantFunctions";
import { apiGetPlayerImage } from "../SetupAndMenus/ConnectionUtilities";

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
    width: "80%",
    margin: "auto",
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getSimCStatus = (player, gameType) => {
  if (player.activeItems.length === 0) return "Missing";
  else if (checkCharacterValid(player, gameType) === false) return "Invalid";
  else return "Good";
};

export default function UpgradeFinderSimCnew(props) {
  const classes = useStyles();
  const playerStats = props.player.getActiveStats();
  const { t, i18n } = useTranslation();
  const [backgroundImage, setBackgroundImage] = useState("");
  const gameType = useSelector((state) => state.gameType);
  const contentType = useSelector((state) => state.contentType);
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
  const covenant = currentCharacter.covenant;

  useEffect(() => {
    async function setImg() {
      const img = await apiGetPlayerImage(currentCharacter);
      console.log(img);
      setBackgroundImage(img);
    }

    setImg();
  }, []);

  return (
    <Grid item xs={12}>
      <Paper elevation={0} className={check(simcStatus)}>
        {/* <Avatar src="https://render.worldofwarcraft.com/us/character/frostmourne/212/180358868-main.jpg" variant="rounded" className={classes.rounded} /> */}
        <Grid container direction="row" justifyContent="space-between" spacing={1} style={{ padding: 8 }} wrap="noWrap">
          {backgroundImage === "" ? (
            ""
          ) : (
            <Grid item>
              <div
                style={{
                  backgroundImage: `url("${backgroundImage}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 28%",
                  backgroundSize: "auto 500%",
                  textAlign: "center",
                  position: "relative",
                  border: "1px solid rgb(118, 118, 118)",
                  flex: "1 1 10%",
                  height: 82,
                  width: 82,
                  borderRadius: 4,
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1} justifyContent="space-between">
              <Grid item xs>
                <div style={{ display: "inline-flex", verticalAlign: "middle" }}>
                  {classIcons(currentCharacter.spec, { height: 30, width: 30, margin: "0px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" })}
                  <Tooltip title={t(covenant)} style={{ color: classColoursJS(currentCharacter.spec) }} placement="top">
                    {covenantIcons(covenant, 30, 30)}
                  </Tooltip>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <div style={{ display: "inline-flex", verticalAlign: "top" }}>
                        <Typography variant="h6" style={{ color: classColoursJS(currentCharacter.spec), marginRight: 8, fontSize: 16, lineHeight: 1 }}>
                          {currentCharacter.charName}
                        </Typography>
                        <Typography variant="h6" color="primary" style={{ fontSize: 16, lineHeight: 1 }}>
                          {"- Current Playstyle: " + props.player.getActiveModel(props.contentType).modelName}
                        </Typography>
                        {/* <Typography variant="h6" style={{ margin: "0px 5px 0px 5px" }}>
                          {"- " + currentCharacter.getRealmString()}
                        </Typography> */}
                      </div>
                    </Grid>
                    <Grid item xs={12} style={{ height: 8 }}>
                      <div style={{ verticalAlign: "top", marginTop: -1, display: "inline-flex" }}>
                        {Object.keys(playerStats).map((key) => [
                          <Typography style={{ fontSize: 11, lineHeight: 1 }}>{t(capitalizeFirstLetter(key)) + ": " + playerStats[key]}</Typography>,
                          <Divider orientation="vertical" flexItem style={{ margin: "0px 4px" }} />,
                        ])}
                      </div>
                    </Grid>
                    {/* <Divider orientation="vertical" flexItem />
                    <Grid item xs={6} wrap="noWrap">
                      <Typography variant="h6" style={{ margin: "0px 5px 0px 5px" }}>
                        {"Playstyle: " + props.player.getActiveModel(contentType).modelName + " - " + contentType}
                      </Typography>
                    </Grid> */}
                  </Grid>
                </div>
              </Grid>
              <Grid item xs style={{ height: 3 }}>
                <Divider />
              </Grid>
              <Grid item sm container justifyContent="flex-start" spacing={1}>
                <Grid item>
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

                {/* <Grid item xs={2}>
                  <Typography color="primary" variant="h5">
                    {t("Equipped")}:
                  </Typography>
                </Grid> */}
                {/* <Grid item xs={5}>
                  <Typography color="primary" align="center" variant="h5">
                    {t(simcString)}
                  </Typography>
                </Grid> */}

                <Grid item container xs justifyContent="center" alignItems="center">
                  {props.player.activeItems
                    .filter((key) => key.isEquipped === true)
                    .map((key, i) => (
                      <Grid item key={i}>
                        <a style={{ margin: "2px 2px" }} data-wowhead={"item=" + key.id + "&" + "ilvl=" + key.level + "&bonus=" + key.bonusIDS + "&domain=" + wowheadDom} key={i}>
                          <img
                            style={{
                              height: 26,
                              width: 26,
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

          <Grid item xs={12}>
            <Divider />
            <Settings
              player={props.player}
              contentType={props.contentType}
              userSettings={props.userSettings}
              editSettings={props.editSettings}
              singleUpdate={props.singleUpdate}
              hymnalShow={true}
              groupBuffShow={true}
              autoSocket={true}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
