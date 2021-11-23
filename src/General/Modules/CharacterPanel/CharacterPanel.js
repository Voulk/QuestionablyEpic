import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Paper, Typography, Divider, Tooltip, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";
import { useSelector } from "react-redux";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";
import Settings from "../Settings/Settings";
import { covenantIcons, covenantColours } from "../CooldownPlanner/Functions/CovenantFunctions";
import ErrorTooltip from "./ErrorTooltip";
import { classTranslator } from "General/Functions/CommonFunctions";

const useStyles = makeStyles(() => ({
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

/* ------------------------------ Spec Images. ------------------------------ */
const specImages = {
  "Restoration Druid": require("Images/DruidSmall.jpg"),
  "Restoration Shaman": require("Images/ShamanSmall.png"),
  "Discipline Priest": require("Images/DiscSmall.jpg"),
  "Holy Paladin": require("Images/PaladinSmall.png"),
  "Holy Priest": require("Images/HPriestSmall.jpg"),
  "Mistweaver Monk": require("Images/MistweaverSmall.jpg"),

  "Holy Paladin BC": require("Images/classicon_paladin.jpg"),
  "Restoration Druid BC": require("Images/classicon_druid.jpg"),
  "Restoration Shaman BC": require("Images/classicon_shaman.jpg"),
  "Holy Priest BC": require("Images/classicon_priest.jpg"),
};

export default function CharacterPanel(props) {
  const classes = useStyles();
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const smBreakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const playerStats = props.player.getActiveStats();
  const [backgroundImage, setBackgroundImage] = useState("");
  const gameType = useSelector((state) => state.gameType);
  const contentType = useSelector((state) => state.contentType);
  const currentLanguage = i18n.currentLanguage;
  const simcStatus = getSimCStatus(props.player, gameType);
  // const simcString = "UpgradeFinderFront.SimCBody1" + simcStatus;
  const wowheadDom = (gameType === "BurningCrusade" ? "tbc-" : "") + currentLanguage;
  const currentCharacter = props.allChars.allChar[props.allChars.activeChar];
  const covenant = currentCharacter.covenant;

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

  useEffect(() => {
    async function setImg() {
      let img = "";
      if (gameType === "Retail") {
        img = currentCharacter.charAvatarURL === "" ? specImages[currentCharacter.spec].default : currentCharacter.charAvatarURL;
      } else {
        img = `url(${specImages[currentCharacter.spec].default})`;
      }

      setBackgroundImage(img);
    }

    setImg();
  }, []);

  const imageStyle = {
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    position: "relative",
    border: "1px solid" + classColoursJS(currentCharacter.spec), //rgb(118, 118, 118)",
    backgroundSize: "auto 100%",
    height: 72,
    width: 72,
    borderRadius: 4,
  };

  const errorMessage = (
    <div>
      There is a problem with your import, please check the following:
      <br />
      If your character is wearing the correct items:
      <br />
      <span>• Weapon / Off Hands</span>
      <br />
      <span>• Helm / Neck / Chest / Wrist / Hands / Belt / Legs / Boots / Rings </span>
      <br />
      <span>• Trinkets</span>
      <br />
      <br />
      Make sure that all your items with a primary stat are Intellect based, and not Strength or Agility.
    </div>
  );

  return (
    // disabled errortooltip until properly implemented
    //<ErrorTooltip title={errorMessage} open={simcStatus === "Invalid"} placement="bottom-end">
    <Paper elevation={0} className={check(simcStatus)}>
      <div style={{ margin: "8px 8px 8px 8px", paddingBottom: 8 }}>
        <Grid container direction="row" justifyContent="space-between" spacing={1}>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                         Character Image                                         */
          /* ----------------------------------------------------------------------------------------------  */}
          {backgroundImage === "" ? (
            ""
          ) : (
            <Grid id="charPanelAvatarGridItem" item xs="auto" sm="auto">
              <div style={{ position: "relative", textAlign: "center", color: "white" }}>
                {gameType === "Retail" ? (
                  <div
                    id="charPanelAvatarImage"
                    style={{
                      backgroundImage: `url("${backgroundImage}")`,
                      ...imageStyle,
                    }}
                  />
                ) : (
                  <div
                    id="charPanelAvatarImage"
                    style={{
                      backgroundImage: backgroundImage,
                      ...imageStyle,
                    }}
                  />
                )}
                <div style={{ position: "absolute", bottom: 1, left: 1 }}>
                  <Tooltip title={t(classTranslator(currentCharacter.spec))} placement="left" arrow>
                    {classIcons(
                      currentCharacter.spec,
                      gameType === "Retail"
                        ? {
                            height: 22,
                            width: 22,
                            margin: "0px 2px 0px 0px",
                            verticalAlign: "middle",
                            borderRadius: "0px 0px 0px 4px",
                            borderRight: "1px solid " + classColoursJS(currentCharacter.spec),
                            borderTop: "1px solid" + classColoursJS(currentCharacter.spec),
                          }
                        : {
                            height: 26,
                            width: 26,
                            margin: "0px 2px 0px 0px",
                            verticalAlign: "middle",
                            borderRadius: "0px 4px 0px 4px",
                            borderRight: "1px solid " + classColoursJS(currentCharacter.spec),
                            borderTop: "1px solid" + classColoursJS(currentCharacter.spec),
                          },
                    )}
                  </Tooltip>
                </div>
                {gameType === "Retail" ? (
                  <div style={{ position: "absolute", bottom: 24, left: 1 }}>
                    <Tooltip title={t(covenant)} placement="left" arrow>
                      {covenantIcons(covenant, {
                        height: 22,
                        width: 22,
                        verticalAlign: "middle",
                        borderRadius: "0px 4px 0px 0px",
                        borderRight: "1px solid" + covenantColours(covenant),
                        borderTop: "1px solid" + covenantColours(covenant),
                      })}
                    </Tooltip>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Grid>
          )}
          <Grid id="charPanelMainContainer" item xs sm container spacing={1}>
            <Grid item xs={12} sm container direction="row" spacing={0} justifyContent="space-between">
              <Grid item xs container direction="row" spacing={0}>
                <Grid item xs={12} sm>
                  <Grid item container direction="row">
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "inline-flex",
                        }}
                      >
                        <Grid container direction="row">
                          {/* ------------------------------------- Character Name Text ------------------------------------ */}
                          <Grid item xs={12} md="auto">
                            <Typography
                              variant={xsBreakpoint ? "h5" : "h6"}
                              style={{
                                color: classColoursJS(currentCharacter.spec),
                                marginRight: 8,
                                fontSize: gameType === "Retail" ? 16 : 22,
                              }}
                            >
                              {currentCharacter.charName}
                            </Typography>
                          </Grid>
                          {
                            /* ----------------------------------- Current Playstyle Text -----------------------------------  */
                            // The players currently selected playstyle
                          }
                          {gameType === "Retail" ? (
                            <Grid item xs={12} md="auto">
                              <Typography
                                variant={xsBreakpoint ? "h5" : "h6"}
                                color="primary"
                                style={{
                                  fontSize: 16,
                                }}
                              >
                                {smBreakpoint
                                  ? "Current Playstyle: " + props.player.getActiveModel(props.contentType).modelName + " - " + t(contentType)
                                  : "- Current Playstyle: " + props.player.getActiveModel(props.contentType).modelName + " - " + t(contentType)}
                              </Typography>
                            </Grid>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </div>
                    </Grid>
                    {
                      /* --------------------------------------- Character Stats --------------------------------------  */
                      // The characters current stat totals are mapped with verticle dividers between them
                    }
                    {gameType === "Retail" ? (
                      <Grid container spacing={1}>
                        <Grid item xs={4} sm="auto">
                          <Typography style={{ fontSize: 11, lineHeight: 1 }}>{"Stats (pre-enchants):"}</Typography>
                        </Grid>
                        {Object.keys(playerStats)
                          .filter((filterOut) => filterOut !== "stamina" && filterOut !== "hps" && filterOut !== "dps" && filterOut !== "leech")
                          .map((key) => (
                            <Grid item xs={4} sm="auto">
                              <Typography style={{ fontSize: 11, lineHeight: 1 }}>{t(capitalizeFirstLetter(key)) + ": " + playerStats[key]}</Typography>
                            </Grid>
                          ))}
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* --------------------------- If the breakpoint is xs hide, else show -------------------------- */}
              {xsBreakpoint ? (
                ""
              ) : (
                // /* ----------------------------------- Simcraft import button -----------------------------------  */
                <Grid item xs={12} sm="auto">
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
              )}
            </Grid>

            {xsBreakpoint ? (
              ""
            ) : (
              <Grid item xs={12} style={{ padding: "0px 4px" }}>
                <Divider style={{ align: "center" }} />
              </Grid>
            )}

            {xsBreakpoint ? (
              ""
            ) : (
              <Grid item sm container justifyContent="flex-start" spacing={0}>
                {
                  /* ----------------------------- Characters Active (Equipped) Items -----------------------------  */
                  // Map currently equipped items with wowhead tooltips
                }
                <Grid item container xs justifyContent="center" spacing={1} alignItems="center">
                  {props.player.activeItems.length > 0 ? (
                    props.player.activeItems
                      .filter((key) => key.isEquipped === true)
                      .map((key, i) => (
                        <Grid item key={i}>
                          <a data-wowhead={"item=" + key.id + "&" + "ilvl=" + key.level + "&bonus=" + key.bonusIDS + "&domain=" + wowheadDom} key={i}>
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
                      ))
                  ) : (
                    <Grid item key={i}>
                      {/* // TODO: Localize this */}
                      <Typography variant="body2">Import your gear with a SimC string via the "Import Gear" button above.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* --------------------------- If the breakpoint is xs show, else hide -------------------------- */}
          {xsBreakpoint ? (
            // /* ----------------------------------- Simcraft import button -----------------------------------  */
            <Grid item container spacing={1}>
              <Grid item xs={12} sm="auto">
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

              <Grid item xs={12} style={{ padding: "0px 4px" }}>
                <Divider style={{ align: "center" }} />
              </Grid>

              <Grid item sm container justifyContent="flex-start" spacing={0}>
                {
                  /* ----------------------------- Characters Active (Equipped) Items -----------------------------  */
                  // Map currently equipped items with wowhead tooltips
                }
                <Grid item container xs justifyContent="center" spacing={1} alignItems="center">
                  {props.player.activeItems.length > 0 ? (
                    props.player.activeItems
                      .filter((key) => key.isEquipped === true)
                      .map((key, i) => (
                        <Grid item key={i}>
                          <a data-wowhead={"item=" + key.id + "&" + "ilvl=" + key.level + "&bonus=" + key.bonusIDS + "&domain=" + wowheadDom} key={i}>
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
                      ))
                  ) : (
                    <Grid item key={i}>
                      {/* // TODO: Localize this */}
                      <Typography variant="body2">Import your gear with a SimC string via the "Import Gear" button above.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            ""
          )}

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
    //</ErrorTooltip>
  );
}
