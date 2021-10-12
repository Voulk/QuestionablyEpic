import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider, Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";
import Settings from "../Settings/Settings";
import { covenantIcons } from "../CooldownPlanner/Functions/CovenantFunctions";
import { apiGetPlayerImage } from "../SetupAndMenus/ConnectionUtilities";
import { characterImageStyle } from "./CharacterImageCSS";

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
    margin: "auto",
    width: "80%",
  },
  simcok: {
    borderStyle: "None",
    width: "80%",
    margin: "auto",
    width: "80%",
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

export default function CharacterPanel(props) {
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

  // TODO: this will be removed potentially by using the blizzard created avatar image.
  const imageStyle = characterImageStyle(props.player.race);
  console.log(imageStyle);
  return (
    <Paper elevation={0} className={check(simcStatus)}>
      <div style={{ padding: "8px 8px 8px 8px" }}>
        {/* <Avatar src="https://render.worldofwarcraft.com/us/character/frostmourne/212/180358868-main.jpg" variant="rounded" className={classes.rounded} /> */}
        <Grid container direction="row" justifyContent="space-between" spacing={1}>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                         Character Image                                         */
          /* ----------------------------------------------------------------------------------------------  */}
          {backgroundImage === "" ? (
            ""
          ) : (
            <Grid id="charPanelAvatarGridItem" item>
              <div
                id="charPanelAvatarImage"
                style={{
                  backgroundImage: `url("${"https://render.worldofwarcraft.com/us/character/frostmourne/212/180358868-avatar.jpg"}")`,
                  ...imageStyle,
                }}
              />
            </Grid>
          )}
          <Grid id="charPanelMainContainer" item xs={12} sm container>
            {/* <Grid item xs container direction="column" spacing={0} justifyContent="space-between"> */}
            <Grid item xs={12} container direction="row" spacing={1} justifyContent="space-between">
              <Grid item xs>
                {/* <div style={{ display: "inline-flex", verticalAlign: "middle" }}> */}
                <Grid item xs container direction="row" spacing={1}>
                  {/* ----------------------------------------- Class Icon -----------------------------------------  */}
                  {/* {classIcons(currentCharacter.spec, { height: 30, width: 30, margin: "0px 2px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" })} */}
                  {/* ---------------------------------------- Covenant Icon ---------------------------------------  */}
                  {/* <Tooltip title={t(covenant)} style={{ color: classColoursJS(currentCharacter.spec) }} placement="top">
                        {covenantIcons(covenant, 30, 30)}
                      </Tooltip> */}
                  <Grid item container direction="row">
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "inline-flex",
                          //  verticalAlign: "top"
                        }}
                      >
                        {/* ------------------------------------- Character Name Text ------------------------------------ */}
                        <Typography
                          variant="h6"
                          style={{
                            color: classColoursJS(currentCharacter.spec),
                            marginRight: 8,
                            fontSize: 16,
                            // lineHeight: 1
                          }}
                        >
                          {currentCharacter.charName}
                        </Typography>
                        {
                          /* ----------------------------------- Current Playstyle Text -----------------------------------  */
                          // The players currently selected playstyle
                        }
                        <Typography
                          variant="h6"
                          color="primary"
                          style={{
                            fontSize: 16,
                            //lineHeight: 1
                          }}
                        >
                          {"- Current Playstyle: " + props.player.getActiveModel(props.contentType).modelName}
                        </Typography>
                      </div>
                    </Grid>
                    {
                      /* --------------------------------------- Character Stats --------------------------------------  */
                      // The characters current stat totals are mapped with verticle dividers between them
                    }
                    <Grid item xs={12} style={{ height: 8 }}>
                      {/* <div style={{ verticalAlign: "top", marginTop: -1, display: "inline-flex" }}> */}
                      <Grid container spacing={1}>
                        {Object.keys(playerStats).map((key) => (
                          <Grid item>
                            <Typography style={{ fontSize: 11, lineHeight: 1 }}>{t(capitalizeFirstLetter(key)) + ": " + playerStats[key]}</Typography>
                          </Grid>
                        ))}
                      </Grid>
                      {/* </div> */}
                    </Grid>
                  </Grid>
                </Grid>
                {/* </div> */}
              </Grid>
              <Grid item xs={12} lg={"auto"}>
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
            </Grid>
            <Grid item xs={12}>
              <Divider style={{ align: "center" }} />
            </Grid>
            <Grid item sm container justifyContent="flex-start" spacing={0}>
              {/* ----------------------------------- Simcraft import button -----------------------------------  */}

              {
                /* ----------------------------- Characters Active (Equipped) Items -----------------------------  */
                // Map currently equipped items with wowhead tooltips
              }
              <Grid item container xs justifyContent="center" spacing={1} alignItems="center">
                {props.player.activeItems
                  .filter((key) => key.isEquipped === true)
                  .map((key, i) => (
                    <Grid item key={i}>
                      <a
                        style={
                          {
                            // margin: "2px 2px"
                          }
                        }
                        data-wowhead={"item=" + key.id + "&" + "ilvl=" + key.level + "&bonus=" + key.bonusIDS + "&domain=" + wowheadDom}
                        key={i}
                      >
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
            {/* </Grid> */}
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
      </div>
    </Paper>
  );
}
