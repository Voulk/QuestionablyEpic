import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Paper, Typography, Divider, Tooltip, useMediaQuery, MenuItem, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getItemIcon } from "../../Engine/ItemUtilities";
import SimCraftInput from "../SetupAndMenus/SimCraftDialog";
import { useSelector } from "react-redux";
import classIcons from "General/Modules/IconFunctions/ClassIcons";
import { classColours } from "General/Engine/ClassData";
import Settings from "../Settings/Settings";
// import ErrorTooltip from "./ErrorTooltip";
import { getTranslatedClassName } from "locale/ClassNames";
import { getTranslatedStats } from "locale/statsLocale";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips";

// Define your types here
interface Player {
  activeItems: any[];
  getActiveItems: (arg1: string, arg2: boolean, arg3: boolean) => any[];
  getEquippedItems: () => any[];
  getActiveModel: (arg1: string) => any;
  getActiveStats: () => any;
}

interface AllChars {
  getActiveChar: () => any;
}

interface Props {
  player: Player;
  allChars: AllChars;
  quickCompare?: boolean;
  simcSnack?: any;
  singleUpdate?: any;
  contentType?: string;
}

// Define your types here
interface CurrentCharacter {
  charAvatarURL: string;
  spec: string;
  charName: string;
}



const checkCharacterValid = (player: Player, gameType: string) => {
  const weaponSet = player.getActiveItems("AllMainhands", false, true);
  const weapon = weaponSet.length > 0 ? weaponSet[0] : "";
  if (gameType === "Retail") {
    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
  } else if (gameType === "Classic") {
    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 16) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 17);
  }
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getSimCStatus = (player: Player, gameType: string) => {
  if (player.activeItems.length === 0) return "Missing";
  else if (checkCharacterValid(player, gameType) === false) return "Invalid";
  else return "Good";
};

/* ------------------------------ Spec Images. ------------------------------ */
const specImages: { [key: string]: string } = {
  "Restoration Druid": require("Images/DruidSmall.jpg"),
  "Preservation Evoker": require("Images/EvokerSmall.jpg"),
  "Restoration Shaman": require("Images/ShamanSmall.png"),
  "Discipline Priest": require("Images/DiscSmall.jpg"),
  "Holy Paladin": require("Images/PaladinSmall.png"),
  "Holy Priest": require("Images/HPriestSmall.jpg"),
  "Mistweaver Monk": require("Images/MistweaverSmall.jpg"),

  "Holy Paladin Classic": require("Images/classicon_paladin.jpg"),
  "Restoration Druid Classic": require("Images/classicon_druid.jpg"),
  "Restoration Shaman Classic": require("Images/classicon_shaman.jpg"),
  "Holy Priest Classic": require("Images/classicon_priest.jpg"),
  "Discipline Priest Classic": require("Images/DiscSmall.jpg"),
  "Mistweaver Monk Classic": require("Images/MistweaverSmall.jpg"),
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    marginRight: 4,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function CharacterPanel(props: Props) {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const smBreakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const specBuilds = props.player.getAllModels(props.contentType);

  const [backgroundImage, setBackgroundImage] = useState("");
  const gameType = useSelector((state: any) => state.gameType);
  const contentType = useSelector((state: any) => state.contentType) || "";

  const currentLanguage = i18n.language;
  const simcStatus = getSimCStatus(props.player, gameType);
  const wowheadDom = (gameType === "Classic" ? "wotlk-" : "") + currentLanguage;
  const currentCharacter: CurrentCharacter = props.allChars.getActiveChar();
  const playerStats = props.player !== null ? props.player.getActiveStats() : {};
  const [specBuild, setSpecBuild] = useState(props.player.activeModelID[props.contentType]);


  useEffect(() => {
    async function setImg() {
      const img = currentCharacter.charAvatarURL === "" ? specImages[currentCharacter.spec] : currentCharacter.charAvatarURL;

      setBackgroundImage(img);
    }

    setImg();
  }, []);

  const updateSpecBuild = (value) => {
    props.player.setModelID(parseInt(value), props.contentType);
    setSpecBuild(value); // This is mostly just used to forced a CharPanel UI update.
    props.singleUpdate(props.player);
  };

  const imageStyle: React.CSSProperties = {
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    position: "relative", // This should be one of the valid values
    border: "1px solid" + classColours(currentCharacter.spec),
    backgroundSize: "auto 100%",
    height: 72,
    width: 72,
    borderRadius: 4,
    backgroundImage: `url("${backgroundImage}")`,
  };

  return currentCharacter !== null ? (
    <Paper
      elevation={0}
      sx={{
        margin: "auto",
        width: "80%",
        borderStyle: props.quickCompare === true || simcStatus === "Good" || simcStatus === "Missing" ? "none" : "solid",
        borderColor: props.quickCompare === true || gameType === "Classic" || simcStatus === "Good" || simcStatus === "Missing" ? "transparent" : "red",
        borderWidth: props.quickCompare === true || simcStatus === "Good" || simcStatus === "Missing" ? "0px" : "2px",
      }}
    >
      <div
        style={{
          margin: "8px 8px 0px 8px",
        }}
      >
        <Grid container direction="row" justifyContent="space-between" spacing={1}>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                         Character Image                                         */
          /* ----------------------------------------------------------------------------------------------  */}
          {backgroundImage === "" ? (
            ""
          ) : (
            <Grid id="charPanelAvatarGridItem" item xs="auto" sm="auto">
              <div style={{ position: "relative", textAlign: "center", color: "white" }}>
                  <div
                    id="charPanelAvatarImage"
                    style={{
                      backgroundImage: `url("${backgroundImage}")`,
                      ...imageStyle,
                    }}
                  />
                <div style={{ position: "absolute", bottom: 1, left: 1 }}>
                  <Tooltip title={getTranslatedClassName(currentCharacter.spec, currentLanguage)} placement="left" arrow>
                    {classIcons(
                      currentCharacter.spec,
                      {height: 22,
                      width: 22,
                      margin: "0px 2px 0px 0px",
                      verticalAlign: "middle",
                      borderRadius: "0px 0px 0px 4px",
                      borderRight: "1px solid " + classColours(currentCharacter.spec),
                      borderTop: "1px solid" + classColours(currentCharacter.spec),
                      }
                    ) || <></>}
                  </Tooltip>
                </div>
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
                                color: classColours(currentCharacter.spec),
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
                                  ? `Current Playstyle: ${props.player.getActiveModel(contentType)?.modelName} - ${t(contentType)}`
                                  : `- Current Playstyle: ${props.player.getActiveModel(contentType)?.modelName} - ${t(contentType)}`}
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
                      // The characters current stat totals are mapped with verticle dividers between them.
                      // We can definitely create a version of this for Classic but TODO for now.
                    }
                    {gameType === "Retail" ? (
                      <Grid container spacing={1}>
                        <Grid item xs={4} sm="auto">
                          <Typography style={{ fontSize: 11, lineHeight: 1 }}>{"Stats (pre-enchants):"}</Typography>
                        </Grid>
                        {Object.keys(playerStats)
                          .filter((filterOut) => ["intellect", "haste", "crit", "mastery", "versatility"].includes(filterOut)) //filterOut !== "stamina" && filterOut !== "hps" && filterOut !== "dps" && filterOut !== "leech" && filterOut !== "mana")
                          .map((key, i) => (
                            <Grid item xs={4} sm="auto" key={"stat" + i}>
                              <Typography style={{ fontSize: 11, lineHeight: 1 }}>{getTranslatedStats(capitalizeFirstLetter(key), currentLanguage) + ": " + playerStats[key]}</Typography>
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
                    color="secondary"
                    variant="contained"
                    player={props.player}
                    simcSnack={props.simcSnack}
                    allChars={props.allChars}
                    charPanel={true}
                    
                  />
                </Grid>
              )}
            </Grid>

            {xsBreakpoint ? (
              ""
            ) : (
              <Grid item xs={12} style={{ padding: "4px 0px 0px 4px", textAlign: "center" }}>
                <Divider />
              </Grid>
            )}

            {xsBreakpoint ? (
              ""
            ) : (
              <Grid item sm container justifyContent="flex-start" spacing={0} style={{ padding: "4px 0px 0px 8px" }}>
                {
                  /* ----------------------------- CharactersActive (Equipped) Items -----------------------------  */
                  // Map currently equipped items with wowhead tooltips
                }
                <Grid item container xs justifyContent="flex-start" spacing={1} alignItems="center">
                  {props.player.activeItems.length > 0 ? (
                    props.player.activeItems
                      .filter((key) => key.isEquipped === true)
                      .map((key, i) => (
                        <Grid item key={i}>
                          <WowheadTooltip type="item" id={key.id} level={key.level} bonusIDS={key.bonusIDS} domain={wowheadDom}>
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
                          </WowheadTooltip>
                        </Grid>
                      ))
                  ) : (
                    <Grid item>
                      {/* // TODO: Localize this */}
                      <Typography variant="body2">Import your gear with a SimC string via the &ldquo;Import Gear&ldquo; button above.</Typography>
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
                  color="secondary"
                  variant="contained"
                  player={props.player}
                  simcSnack={props.simcSnack}
                  allChars={props.allChars}
                  charPanel={true}
                />
              </Grid>

              <Grid item xs={12} style={{ padding: "0px 4px", textAlign: "center" }}>
                <Divider />
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
                          <WowheadTooltip type="item" id={key.id} level={key.level} bonusIDS={key.bonusIDS} domain={wowheadDom}>
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
                          </WowheadTooltip>
                        </Grid>
                      ))
                  ) : (
                    <Grid item>
                      {/* // TODO: Localize this */}
                      <Typography variant="body2">Import your gear with a SimC string via the &ldquo;Import Gear&ldquo; button above.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            ""
          )}

          <Grid item xs={12}>
                <Grid container spacing={1} direction="row" style={{ paddingBottom: "10px", paddingTop: "5px"}}>
                  {/* --------------------------------- Playstyle / Build Selection --------------------------------  */}
                  <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
                    <Tooltip
                      title={
                        <Typography align="center" variant="body2">
                          {t("Settings.Retail.Setting5Tooltip")}
                        </Typography>
                      }
                      placement="top-start"
                    >
                      <TextField
                        className={classes.select}
                        InputProps={{ variant: "outlined" }}
                        select
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={props.player.activeModelID[props.contentType]}
                        onChange={(e) => updateSpecBuild(e.target.value)}
                        label={t("Settings.Retail.Setting5Title")}
                        style={{ textAlign: "center", minWidth: 120 }}
                      >
                        {specBuilds.map((key, i, arr) => {
                          let lastItem = i + 1 === arr.length ? false : true;
                          const disabled = key.modelName.includes("Coming Soon");
                          return (
                            <MenuItem divider={lastItem} key={"playstyle" + i} id={key.modelName} value={key.arrayID} style={{ justifyContent: "center" }} disabled={disabled}>
                              {key.modelName}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Tooltip>
                  </Grid>
                </Grid>
            <Divider />
            <Settings player={props.player} contentType={props.contentType} singleUpdate={props.singleUpdate} hymnalShow={true} groupBuffShow={true} autoSocket={true} />
          </Grid>
        </Grid>
      </div>
    </Paper>
  ) : (
    ""
  );
}
