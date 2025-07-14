import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
//prettier-ignore
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  IconButton,
  Typography,
  Avatar,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import { classColours } from "General/Engine/ClassData";
import classIcons from "General/Modules/IconFunctions/ClassIcons";
import { getRaceIcon } from "General/Modules/IconFunctions/RaceIcons";
import { classRaceDB } from "../../../../Databases/ClassRaceDB";
import { serverDB, serverDBBurningCrusade } from "../../../../Databases/ServerDB";
import LogDetailsTable from "./CharacterLogDetailsTable";
import { STAT } from "../../../Engine/STAT";
import { apiGetPlayerImage } from "../ConnectionUtilities";
import { CONSTRAINTS } from "../../../Engine/CONSTRAINTS";
import { useSelector } from "react-redux";
import { getTranslatedRaceName } from "Databases/RacesDB";
import { getTranslatedClassName } from "locale/ClassNames.js";
import { getTranslatedStats } from "locale/statsLocale.js";

/* ------------------------------ Spec Images. ------------------------------ */
const specImages = {
  "Preservation Evoker": require("Images/EvokerSmall2.jpg"),
  "Restoration Druid": require("Images/DruidSmall.jpg"),
  "Restoration Shaman": require("Images/ShamanSmall.png"),
  "Discipline Priest": require("Images/DiscSmall.jpg"),
  "Holy Paladin": require("Images/PaladinSmall.png"),
  "Holy Priest": require("Images/HPriestSmall.jpg"),
  "Mistweaver Monk": require("Images/MistweaverSmall.jpg"),

  "Holy Paladin Classic": require("Images/classicon_paladin.jpg"),
  "Restoration Druid Classic": require("Images/classicon_druid.jpg"),
  "Restoration Shaman Classic": require("Images/classicon_shaman.jpg"),
  "Holy Priest Classic": require("Images/classicon_priest.jpg"),
  "Discipline Priest Classic": require("Images/classicon_priest.jpg"),
  "Mistweaver Monk Classic": require("Images/MistweaverSmall.jpg"),
};

/* ------------------- Called when a character is clicked. ------------------ */
// TODO: Add Logic
const charClicked = (char, cardType, allChars, updateChar) => {
  if (cardType === "Char") {
    // Character Clicked. Take player to character sheet.
    allChars.setActiveChar(char.charID);
    updateChar(allChars);
  } else {
    // New character clicked. Offer new character dialog.
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    width: "100%",
    maxHeight: "80px",
    borderColor: "Grey",
    padding: "0px",
    marginRight: "0px",
  },
  activeChar: {
    borderColor: "Goldenrod",
    borderWidth: "2px",
    backgroundColor: "#494a3d",
  },

  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // marginTop: 5,
    // marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  content: {
    flex: "1 0 auto",
    padding: "0px",
  },
  large: {
    width: "51px",
    height: "51px",
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    minHeight: 250,
    maxWidth: 700,
  },
  option: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
  },
}));

const deleteTheme = createTheme({
  palette: {
    primary: red,
  },
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CharTab = withStyles((theme) => ({
  root: {
    backgroundColor: "#222222",

    "&:hover": {
      // color: '#40a9ff',
      opacity: 1,
    },
    "&$selected": {
      color: "#F2BF59",
      backgroundColor: theme.palette.background.paper,
      fontWeight: theme.typography.fontWeightMedium,
    },
    // '&:focus': {
    //   color: '#40a9ff',
    // },
  },
  selected: {},
}))((props) => <Tab {...props} />);

export default function CharCards(props) {
  const classes = useStyles();
  const contentType = useSelector((state) => state.contentType);
  const player = props.char;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [tabvalue, setTabValue] = React.useState(0);

  const [region, setRegion] = React.useState(player.region);
  const [open, setOpen] = React.useState(false);
  const [charName, setCharName] = React.useState(player.charName);
  const [healClass, setHealClass] = React.useState(player.getSpec());
  const [selectedRace, setSelectedRace] = React.useState(player.getRace());
  const [intellect, setIntellect] = React.useState("1");
  const [critical, setCritical] = React.useState(player.getStatWeight(contentType, STAT.CRITICAL_STRIKE));
  const [haste, setHaste] = React.useState(player.getStatWeight(contentType, STAT.HASTE));
  const [mastery, setMastery] = React.useState(player.getStatWeight(contentType, STAT.MASTERY));
  const [versatility, setVersatility] = React.useState(player.getStatWeight(contentType, STAT.VERSATILITY));
  const [leech, setLeech] = React.useState(player.getStatWeight(contentType, STAT.LEECH));
  const [server, setServer] = React.useState(player.realm);
  const [backgroundImage, setBackgroundImage] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    async function setImg() {
      //const img = await apiGetPlayerImage(props.char);
      //setBackgroundImage(img);
    }

    setImg();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*    Character Information Handlers (Sets Relevant Information on Change)    */
  /* -------------------------------------------------------------------------- */

  const handleChangeName = (event) => {
    setCharName(event.target.value);
  };
  const handleChangeServer = (serverName) => {
    setServer(serverName);
  };
  const handleChangeSpec = (event) => {
    setHealClass(event.target.value);
  };
  const handleChangeRace = (event) => {
    setSelectedRace(event.target.value);
  };
  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };

  /* -------------------------------------------------------------------------- */
  /*                         Dialog open/closer handlers                        */
  /* -------------------------------------------------------------------------- */

  const handleClickOpen = (e) => {
    e.preventDefault();
    setCritical(player.getStatWeight(contentType, STAT.CRITICAL_STRIKE));
    setHaste(player.getStatWeight(contentType, STAT.HASTE));
    setMastery(player.getStatWeight(contentType, STAT.MASTERY));
    setVersatility(player.getStatWeight(contentType, STAT.VERSATILITY));
    setLeech(player.getStatWeight(contentType, STAT.LEECH));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCritical(player.getStatWeight(contentType, STAT.CRITICAL_STRIKE));
    setHaste(player.getStatWeight(contentType, STAT.HASTE));
    setMastery(player.getStatWeight(contentType, STAT.MASTERY));
    setVersatility(player.getStatWeight(contentType, STAT.VERSATILITY));
    setLeech(player.getStatWeight(contentType, STAT.LEECH));
    setServer(player.realm);
  };

  /* -------------------------------------------------------------------------- */
  /*              Stat Handlers (Sets the relevant stat on change)              */
  /* -------------------------------------------------------------------------- */

  const handleIntellect = (event) => {
    setIntellect(parseFloat(event.target.value));
  };
  const handleCrit = (event) => {
    setCritical(parseFloat(event.target.value));
  };
  const handleHaste = (event) => {
    setHaste(parseFloat(event.target.value));
  };
  const handleMastery = (event) => {
    setMastery(parseFloat(event.target.value));
  };
  const handleVers = (event) => {
    setVersatility(parseFloat(event.target.value));
  };
  const handleLeech = (event) => {
    setLeech(parseFloat(event.target.value));
  };

  /* ------------------------ Delete Character Function ----------------------- */

  const handleDelete = () => {
    props.delChar(player.uniqueHash);
    handleClose();
  };

  /* ------------------------- Default Button Function ------------------------ */
  const resetDefaults = () => {
    let newPlayer = props.char;

    newPlayer.setModelDefaults(contentType);
    props.singleUpdate(newPlayer);
    props.charUpdatedSnack();

    setCritical(player.getStatWeight(contentType, STAT.CRITICAL_STRIKE));
    setHaste(player.getStatWeight(contentType, STAT.HASTE));
    setMastery(player.getStatWeight(contentType, STAT.MASTERY));
    setVersatility(player.getStatWeight(contentType, STAT.VERSATILITY));
    setLeech(player.getStatWeight(contentType, STAT.LEECH));
  };

  // TODO
  /* -------------- Update Character Function for the Save Button ------------- */
  const handleUpdateData = () => {
    let newPlayer = props.char;
    let weights = {
      intellect: 1,
      haste: haste > CONSTRAINTS.Retail.maxSecondaryWeight ? newPlayer.getStatWeight(contentType, STAT.HASTE) : haste,
      crit: critical > CONSTRAINTS.Retail.maxSecondaryWeight ? newPlayer.getStatWeight(contentType, STAT.CRITICAL_STRIKE) : critical,
      mastery: mastery > CONSTRAINTS.Retail.maxSecondaryWeight ? newPlayer.getStatWeight(contentType, STAT.MASTERY) : mastery,
      versatility: versatility > CONSTRAINTS.Retail.maxSecondaryWeight ? newPlayer.getStatWeight(contentType, STAT.VERSATILITY) : versatility,
      leech: leech > CONSTRAINTS.Retail.maxTertiaryWeight ? newPlayer.getStatWeight(contentType, STAT.LEECH) : leech,
    };

    newPlayer.editChar(contentType, charName, server, region, selectedRace, weights);

    setOpen(false);
    props.singleUpdate(newPlayer);
    props.charUpdatedSnack();
  };

  /* ---------------------------- Spec for the card --------------------------- */
  const spec = props.cardType === "Char" ? props.char.spec : "";

  const gameType = useSelector((state) => state.gameType);
  const serverList = gameType === "Retail" ? serverDB : serverDBBurningCrusade;
  const availableClasses = classRaceDB;

  /* ------------------------ Active Character Styling ------------------------ */
  const rootClassName = classes.root + " " + (props.isActive ? classes.activeChar : "");

  /* ------------------ Regions Array for the Region Selector ----------------- */
  const regions = ["CN", "US", "TW", "EU", "KR"];

  /* ------------------ Converts Milliseconds to mm:ss format ----------------- */
  const sec2hmmss = (seconds) => {
    let sec = Math.round(seconds % 60);
    let min = parseInt(seconds / 60);
    if (sec.toString().length == 1) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
  };
  return (
    /* -------------------------------------------------------------------------- */
    /*                      Character Card for the main menu                      */
    /* -------------------------------------------------------------------------- */
    <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
      <div style={{ position: "relative" }}>
        {gameType === "Retail" ? (
          <Tooltip title={t("Edit")}>
            <IconButton style={{ position: "absolute", right: 0, top: 2, zIndex: 1 }} onClick={(e) => handleClickOpen(e)} aria-label="settings" size="small">
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : ""}

        <CardActionArea onClick={(e) => charClicked(props.char, props.cardType, props.allChars, props.charUpdate, e)} onContextMenu={gameType === "Retail" ? (e) => handleClickOpen(e) : null}>
          <Card className={rootClassName} variant="outlined">
            <Avatar src={props.char.charAvatarURL === "" ? specImages[props.char.spec] : props.char.charAvatarURL} variant="square" alt="" className={classes.large} />
            <Divider orientation="vertical" flexItem />
            <div className={classes.details}>
              <CardContent className={classes.content} style={{ paddingBottom: 0 }}>
                <Grid container style={{ marginTop: 1 }} spacing={0.5}>
                  {/* ------------------------ Character name and Realm ------------------------ */}
                  <Grid item xs={10}>
                    <Typography variant="h6" component="h4" style={{ lineHeight: 1, color: classColours(spec), display: "inline-flex" }}>
                      {props.name}
                      <Tooltip title={getTranslatedClassName(spec, currentLanguage)} style={{ color: classColours(spec) }} placement="top">
                        {/* ----------------------------------------- Class Icon -----------------------------------------  */}
                        {classIcons(spec, {
                          height: 20,
                          width: 20,
                          margin: "0px 0px 0px 5px",
                          verticalAlign: "middle",
                          borderRadius: 4,
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                        })}
                      </Tooltip>
                    </Typography>
                  </Grid>
                  {/* ---- Settings Button - More apparent for users how to edit characters ---- */}
                  <Grid item container spacing={0}>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" style={{ fontSize: 11 }}>
                        {player.getRealmString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        </CardActionArea>
      </div>

      {/* -------------------------------------------------------------------------- */
      /*                                Dialog Popup                                */
      /* -------------------------------------------------------------------------- */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
        <Tabs value={tabvalue} onChange={handleTabChange} aria-label="simple tabs example" variant="fullWidth" TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}>
          {/* Character Information */}
          <CharTab className={classes.tabRoot} label={t("CharacterCreator.CharacterInfo")} {...a11yProps(0)} />
          {/* Saved Logs (Coming Soon) */}
          <CharTab className={classes.tabRoot} disabled label={t("CharacterCreator.SavedLogs.TabHeader")} {...a11yProps(1)} />
        </Tabs>
        {/* <div className={classes.tabRoot}> */}

        <TabPanel value={tabvalue} index={0}>
          <div className={classes.panel}>
            <Grid container>
              <DialogContent>
                {/* ------------------------------ Dialog Header ----------------------------- */}
                <Grid container spacing={2} direction="row">
                  {/* --------------- Character Image (Pulled from Blizzard API) --------------- */}
                  <Grid item xs={4}>
                    <div
                      style={{
                        backgroundImage: `url("${backgroundImage}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center 60%",
                        backgroundSize: "auto 130%",
                        textAlign: "center",
                        position: "relative",
                        border: "1px solid rgb(118, 118, 118)",
                        flex: 1,
                        height: "100%",
                        borderRadius: 4,
                        // width: 100,
                      }}
                    />
                  </Grid>

                  {/* -------------- Character Information Grid Container (Name, Server etc) -------------  */}
                  <Grid item xs={8} container spacing={1}>
                    <Grid item xs={12} container spacing={1}>
                      {/* ----------------------------- Character Name ----------------------------- */}
                      <Grid item xs={9}>
                        <TextField fullWidth id="standard-basic" label={t("CharacterCreator.CharacterInfo")} value={charName} onChange={handleChangeName} variant="outlined" size="small" />
                      </Grid>
                      {/* ------------------------------ Region Select ----------------------------- */}
                      <Grid item xs={3}>
                        <FormControl variant="outlined" size="small" fullWidth label={t("Region")} disabled={true}>
                          <InputLabel id="ClassSelector">{t("Region")}</InputLabel>
                          <Select value={region} onChange={handleChangeRegion} label={t("Region")}>
                            {Object.values(regions).map((key, i, arr) => {
                              let lastItem = i + 1 === arr.length ? false : true;
                              return (
                                <MenuItem divider={lastItem} key={"charCardRegion" + i} value={key}>
                                  {key}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          size="small"
                          classes={{
                            option: classes.option,
                          }}
                          disabled={region === "" ? true : false}
                          id="server-select"
                          value={server}
                          onChange={(e, newValue) => {
                            handleChangeServer(newValue);
                          }}
                          options={serverList[region]}
                          inputValue={server}
                          getOptionLabel={(option) => option}
                          onInputChange={(e, newInputValue) => {
                            handleChangeServer(newInputValue);
                          }}
                          renderInput={(params) => <TextField {...params} label={t("CharacterCreator.ServerName")} variant="outlined" styLe={{ width: 100 }} />}
                          ListboxProps={{ style: { border: "1px solid rgba(255, 255, 255, 0.23)", borderRadius: 4, paddingTop: 0, paddingBottom: 0 } }}
                        />
                      </Grid>
                      {/* ------------------------------ Class Select ------------------------------ */}
                      <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth size="small" label={t("Class")} disabled={true}>
                          <InputLabel id="ClassSelector">{t("Class")}</InputLabel>
                          <Select label={t("Class")} value={healClass} onChange={handleChangeSpec}>
                            {Object.getOwnPropertyNames(availableClasses).map((key, i, arr) => {
                              let lastItem = i + 1 === arr.length ? false : true;
                              return (
                                <MenuItem divider={lastItem} key={"charCardClass" + i} value={key}>
                                  <div style={{ display: "inline-flex" }}>
                                    {classIcons(key, { height: 20, width: 20, margin: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" })}
                                    {getTranslatedClassName(key, currentLanguage)}
                                  </div>
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* ------------------------------- Race Select ------------------------------ */}
                      <Grid item xs={12}>
                        <FormControl disabled={healClass === "" ? true : false} fullWidth variant="outlined" size="small" label={t("Race")}>
                          <InputLabel id="RaceSelector">{t("Race")}</InputLabel>
                          <Select value={selectedRace} onChange={handleChangeRace} label={t("Race")}>
                            {healClass === ""
                              ? ""
                              : availableClasses[healClass.toString()].races.map((key, i, arr) => {
                                  let lastItem = i + 1 === arr.length ? false : true;
                                  return (
                                    <MenuItem divider={lastItem} key={"charCardRace" + i} value={key}>
                                      <div style={{ display: "inline-flex" }}>
                                        {getRaceIcon(key, "both")}
                                        {getTranslatedRaceName(key, currentLanguage)}
                                      </div>
                                    </MenuItem>
                                  );
                                })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    {/* -------------------------------------------------------------------------- */
                    /*                            Character Stats Panel                           */
                    /* -------------------------------------------------------------------------- */}
                    <Grid item xs={12} container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Grid item xs={12} container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                          <Typography variant="h6" align="center" noWrap color="primary">
                            {t("CharacterCreator.StatWeights")}
                          </Typography>
                        </Grid>
                        {/* ------------------------ Stat Message/Instructions -----------------------  */}

                        <Grid item xs={12}>
                          <Typography style={{ color: "limegreen" }} align="center" variant="subtitle2">
                            {t("CharacterCreator.StatMessage")}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* -------------------------------- Intellect -------------------------------  */}
                      <Grid item xs={4}>
                        <TextField
                          id="IntellectInput"
                          type="number"
                          label={getTranslatedStats("Intellect", currentLanguage)}
                          style={{ textAlignLast: "center" }}
                          inputProps={{
                            step: 0.01,
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          InputProps={{
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          value={intellect}
                          onChange={handleIntellect}
                          variant="outlined"
                          size="medium"
                          disabled={true}
                        />
                      </Grid>

                      {/* ----------------------------- Critical Strike ----------------------------  */}
                      <Grid item xs={4}>
                        <TextField
                          id="CriticalInput"
                          label={getTranslatedStats("Crit", currentLanguage)}
                          style={{ textAlignLast: "center" }}
                          inputProps={{
                            step: 0.01,
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          InputProps={{
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          type="number"
                          value={critical}
                          onChange={handleCrit}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>

                      {/* ---------------------------------- Haste ---------------------------------  */}
                      <Grid item xs={4}>
                        <TextField
                          id="HasteInput"
                          label={getTranslatedStats("Haste", currentLanguage)}
                          style={{ textAlignLast: "center" }}
                          inputProps={{
                            step: 0.01,
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          InputProps={{
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          type="number"
                          value={haste}
                          onChange={handleHaste}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>

                      {/* --------------------------------- Mastery --------------------------------  */}
                      <Grid item xs={4}>
                        <TextField
                          id="MasteryInput"
                          label={getTranslatedStats("Mastery", currentLanguage)}
                          style={{ textAlignLast: "center" }}
                          inputProps={{
                            step: 0.01,
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          InputProps={{
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          type="number"
                          value={mastery}
                          onChange={handleMastery}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>

                      {/* ------------------------------- Versatility ------------------------------  */}
                      <Grid item xs={4}>
                        <TextField
                          id="VersatilityInput"
                          label={getTranslatedStats("Versatility", currentLanguage)}
                          style={{ textAlignLast: "center" }}
                          inputProps={{
                            step: 0.01,
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          InputProps={{
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          type="number"
                          value={versatility}
                          onChange={handleVers}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>

                      {/* ---------------------------------- Leech ---------------------------------  */}
                      <Grid item xs={4}>
                        <TextField
                          id="LeechInput"
                          label={getTranslatedStats("Leech", currentLanguage)}
                          style={{ textAlignLast: "center" }}
                          inputProps={{
                            step: 0.01,
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          InputProps={{
                            style: { fontSize: "1.2rem", textAlignLast: "center" },
                          }}
                          type="number"
                          value={leech}
                          onChange={handleLeech}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* -------------------------------------------------------------------------- */
                /*                          Imported WarcraftLog Data                         */
                /* -------------------------------------------------------------------------- */}
                {gameType === "Retail" ? (
                  <Grid container spacing={1}>
                    <Grid item xs={12} container>
                      {/* ------------------------------- Logs Header ------------------------------ */}
                      <Grid item xs={12}>
                        <Typography variant="h6" align="center" noWrap color="primary" style={{ marginTop: "12px" }}>
                          {/* TODO: Translate */}
                          {t("CharacterCreator.SavedLogs.Header")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={{ backgroundColor: "#525252", padding: 16 }} elevation={0}>
                        <Grid container>
                          <Grid item container xs={11} spacing={1}>
                            {/* -------------------------------- Report ID -------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.Report") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {props.char.getReportID(contentType)}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* -------------------------------- Boss Name -------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.Boss") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {props.char.getBossName(contentType)}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* ------------------------------ Fight Length ------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.FightLength") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {sec2hmmss(props.char.getFightLength(contentType))}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* ----------------------------------- HPS ----------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.HPS") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {props.char.getHPS(contentType)}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* --------------------------------- Raw HPS --------------------------------  */}
                            {/* <Grid item> */}
                            {/*<Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.RawHPS") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {props.char.getRawHPS(contentType)}
                          </Typography>
                        </Typography> */}
                            {/* </Grid> */}
                          </Grid>
                          <Grid item xs={1} style={{ alignSelf: "center", textAlign: "center" }}>
                            <Tooltip title={t("Delete")} arrow>
                              <IconButton
                                // onClick={deleteItemCard}
                                aria-label="delete"
                                size="small"
                              >
                                {/*<DeleteIcon style={{ color: "#ad2c34", paddingTop: 2 }} fontSize="large" /> */}
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                ) : (
                  ""
                )}
              </DialogContent>
            </Grid>
          </div>
        </TabPanel>

        {/* Saved Logs */}
        {gameType === "Retail" ? (
          <TabPanel value={tabvalue} index={1}>
            <div className={classes.panel} style={{ minWidth: 912, minHeight: 506.36, padding: "20px 24px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" noWrap color="primary" style={{ marginTop: "12px" }}>
                    {/* TODO: Translate */}
                    {t("CharacterCreator.SavedLogs.Header")}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Accordion disabled onClick={() => ""} style={{ backgroundColor: "#525252" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Grid container spacing={1}>
                        <Grid container>
                          <Grid item container xs={11} spacing={1}>
                            {/* -------------------------------- Report ID -------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.Report") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {props.char.getReportID(contentType)}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* -------------------------------- Boss Name -------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.Boss") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {props.char.getBossName(contentType)}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* ------------------------------ Fight Length ------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.FightLength") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {sec2hmmss(props.char.getFightLength(contentType))}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* ----------------------------------- HPS ----------------------------------  */}
                            <Grid item xs={3}>
                              <Typography style={{ display: "inline-flex" }}>
                                {t("CharacterCreator.SavedLogs.HPS") + ":"}
                                <Typography color="primary" style={{ paddingLeft: 4 }}>
                                  {props.char.getHPS(contentType)}
                                </Typography>
                              </Typography>
                            </Grid>
                            {/* --------------------------------- Raw HPS --------------------------------  */}
                            {/* <Grid item> */}
                            {/*<Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.RawHPS") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {props.char.getRawHPS(contentType)}
                          </Typography>
                        </Typography> */}
                            {/* </Grid> */}
                          </Grid>
                          <Grid item xs={1} style={{ alignSelf: "center", textAlign: "center" }}>
                            <Tooltip title={t("Delete")} arrow>
                              <IconButton
                                // onClick={deleteItemCard}
                                aria-label="delete"
                                size="small"
                              >
                                {/*<DeleteIcon style={{ color: "#ad2c34", paddingTop: 2 }} fontSize="large" /> */}
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* ----------------------- Cast Model Breakdown Table -----------------------  */}
                      <LogDetailsTable data={props.char.getSpellList(contentType)} />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </div>
          </TabPanel>
        ) : (
          ""
        )}

        <DialogActions>
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* ------------------------------ Delete Button -----------------------------  */}
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={deleteTheme}>
                <Button onClick={handleDelete} color="primary" variant="outlined">
                  {t("CharacterCreator.DeleteCharacter")}
                </Button>
              </ThemeProvider>
            </StyledEngineProvider>

            {/* ---------------------- Default Button (Reset Stats) ----------------------  */}
            <div>
              <Grid container spacing={1}>
                <Grid item>
                  <Button onClick={resetDefaults} color="primary" variant="outlined">
                    {t("CharacterCreator.SavedLogs.ResetToDefaults")}
                  </Button>
                </Grid>
                {/* ------------------------------ Cancel Button -----------------------------  */}
                <Grid item>
                  <Button onClick={handleClose} color="primary" variant="outlined">
                    {t("Cancel")}
                  </Button>
                </Grid>
                {/* ------------------------------- Save Button ------------------------------  */}
                <Grid item>
                  <Button onClick={() => handleUpdateData()} color="primary" variant="outlined">
                    {t("Save")}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
