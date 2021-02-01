import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
//prettier-ignore
import {Accordion, AccordionSummary, AccordionDetails, AppBar, Paper, Box, Button, Card, CardContent, CardActionArea, Divider, IconButton, Typography, Avatar, Grid, TextField, Dialog, DialogActions, Tabs, Tab, Tooltip, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { red } from "@material-ui/core/colors";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions.js";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import raceIcons from "../CooldownPlanner/Functions/IconFunctions/RaceIcons";
import { serverList, classRaceList } from "../CooldownPlanner/Data/Data";
import LogDetailsTable from "./CharacterLogDetailsTable";
import { STAT } from "../Engine/STAT";
import { apiGetPlayerImage } from "./ConnectionUtilities";
import { CONSTRAINTS, setBounds } from "../Engine/CONSTRAINTS";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/* ------------------------------ Spec Images. ------------------------------ */
const specImages = {
  "Restoration Druid": require("../../Images/DruidSmall.jpg"),
  "Restoration Shaman": require("../../Images/ShamanSmall.png"),
  "Discipline Priest": require("../../Images/DiscSmall.jpg"),
  "Holy Paladin": require("../../Images/PaladinSmall.png"),
  "Holy Priest": require("../../Images/HPriestSmall.jpg"),
  "Mistweaver Monk": require("../../Images/MistweaverSmall.jpg"),
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
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  content: {
    flex: "1 0 auto",
    padding: "0px",
  },
  large: {
    width: "80px",
    height: "80px",
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    minHeight: 250,
    maxWidth: 700,
  },
}));

const deleteTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export default function CharCards(props) {
  const classes = useStyles();
  const contentType = props.contentType;
  const player = props.char;
  const { t } = useTranslation();

  const [value, setValue] = React.useState(0);
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

  useEffect(() => {
    async function setImg() {
      const img = await apiGetPlayerImage(props.char);
      setBackgroundImage(img);
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    setIntellect(event.target.value);
  };
  const handleCrit = (event) => {
    setCritical(event.target.value);
  };
  const handleHaste = (event) => {
    setHaste(event.target.value);
  };
  const handleMastery = (event) => {
    setMastery(event.target.value);
  };
  const handleVers = (event) => {
    setVersatility(event.target.value);
  };
  const handleLeech = (event) => {
    setLeech(event.target.value);
  };

  /* ------------------------ Delete Character Function ----------------------- */

  const handleDelete = () => {
    props.delChar(player.uniqueHash);
    handleClose();
  };

  /* ----- Check the Spec and return the appropriate translation reference ---- */
  const classTranslator = (spec) => {
    switch (spec) {
      case "Restoration Druid":
        return "Classes.RestorationDruid";
      case "Mistweaver Monk":
        return "Classes.MistweaverMonk";
      case "Holy Paladin":
        return "Classes.HolyPaladin";
      case "Restoration Shaman":
        return "Classes.RestorationShaman";
      case "Holy Priest":
        return "Classes.HolyPriest";
      case "Discipline Priest":
        return "Classes.DisciplinePriest";
      default:
        return "Error";
    }
  };

  /* ------------------------- Default Button Function ------------------------ */
  const resetDefaults = (event) => {
    let newPlayer = props.char;

    newPlayer.setDefaultWeights(newPlayer.getSpec(), contentType);
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
      haste: haste > CONSTRAINTS.maxSecondaryWeight ? newPlayer.statWeights[contentType].haste : haste,
      crit: critical > CONSTRAINTS.maxSecondaryWeight ? newPlayer.statWeights[contentType].crit : critical,
      mastery: mastery > CONSTRAINTS.maxSecondaryWeight ? newPlayer.statWeights[contentType].mastery : mastery,
      versatility: versatility > CONSTRAINTS.maxSecondaryWeight ? newPlayer.statWeights[contentType].versatility : versatility,
      leech: leech > CONSTRAINTS.maxTertiaryWeight ? newPlayer.statWeights[contentType].leech : leech,
    };

    newPlayer.editChar(contentType, charName, server, region, selectedRace, weights);
    setOpen(false);
    props.singleUpdate(newPlayer);
    props.charUpdatedSnack();
  };

  /* ---------------------------- Spec for the card --------------------------- */
  const spec = props.cardType === "Char" ? props.char.spec : "";

  /* ------------------------ Active Character Styling ------------------------ */
  const rootClassName = classes.root + " " + (props.isActive ? classes.activeChar : "");

  /* ------------------ Regions Array for the Region Selector ----------------- */
  const regions = ["CN", "US", "TW", "EU"];

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
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <CardActionArea onClick={(e) => charClicked(props.char, props.cardType, props.allChars, props.charUpdate, e)} onContextMenu={(e) => handleClickOpen(e)}>
        <Card className={rootClassName} variant="outlined" raised={true}>
          <Avatar src={specImages[spec].default} variant="square" alt="" className={classes.large} />
          <Divider orientation="vertical" flexItem />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6" component="h4" style={{ lineHeight: 1, color: classColoursJS(spec) }}>
                {props.name}
              </Typography>
              <Typography variant="caption" style={{ fontSize: 11 }}>
                {player.getRealmString()}
              </Typography>
              <Divider />
              <Typography style={{ color: classColoursJS(spec), marginTop: 2 }}>
                {t(classTranslator(spec))}
                {classIcons(spec, { height: 18, width: 18, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>

      {/* -------------------------------------------------------------------------- */
      /*                                Dialog Popup                                */
      /* -------------------------------------------------------------------------- */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
        <div className={classes.tabRoot}>
          <AppBar position="static" elevation={0}>
            {/* -------------------------------------------------------------------------- */
            /*                                    Tabs                                    */
            /* -------------------------------------------------------------------------- */}
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
              <Tab label="Info" {...a11yProps(0)} />
              <Tab label="Stat Weights" {...a11yProps(1)} />
              <Tab label="Saved Logs" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          {/* -------------------------------------------------------------------------- */
          /*                            Character Information Panel                     */
          /* -------------------------------------------------------------------------- */}
          <TabPanel className={classes.tabPanel} value={value} index={0}>
            <Grid container spacing={2}>
              {/* --------------- Character Image (Pulled from Blizzard API) --------------- */}
              <Grid item xs={3}>
                <div
                  style={{
                    backgroundImage: `url("${backgroundImage}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center 60%",
                    backgroundSize: "auto 130%",
                    textAlign: "center",
                    position: "relative",
                    flex: 1,
                    height: "100%",
                    borderRadius: 4,
                    // width: "100%"
                  }}
                />
              </Grid>

              {/* -------------- Character Information Grid Container (Name, Server etc) -------------  */}
              <Grid item xs={9} container spacing={1}>
                {/* ----------------------------- Character Name ---------------------------- */}
                <Grid item xs={9}>
                  <TextField fullWidth id="standard-basic" label="Character Name" value={charName} onChange={handleChangeName} variant="outlined" size="small" />
                </Grid>

                {/* ----------------------------- Region Selector ----------------------------  */}
                <Grid item xs={3}>
                  <FormControl variant="outlined" size="small" fullWidth label={t("Region")} disabled={true}>
                    <InputLabel id="ClassSelector">{t("Region")}</InputLabel>
                    <Select value={region} onChange={handleChangeRegion} label={t("Region")}>
                      {Object.values(regions).map((key, i) => (
                        <MenuItem key={i} value={key}>
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* ----------------------------- Server Selector ----------------------------  */}
                <Grid item xs={12}>
                  <Autocomplete
                    size="small"
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
                    renderInput={(params) => <TextField {...params} label="Server Name" variant="outlined" styLe={{ width: 100 }} />}
                  />
                </Grid>

                {/* ------------------------------ Class Selctor -----------------------------  */}
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth size="small" label={t("Class")} disabled={true}>
                    <InputLabel id="ClassSelector">{t("Class")}</InputLabel>
                    <Select label={t("Class")} value={healClass} onChange={handleChangeSpec}>
                      {Object.getOwnPropertyNames(classRaceList).map((key, i) => (
                        <MenuItem key={i} value={key}>
                          {classIcons(key, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* ------------------------------ Race Selector -----------------------------  */}
                <Grid item xs={12}>
                  <FormControl disabled={healClass === "" ? true : false} fullWidth variant="outlined" size="small" label={t("Race")}>
                    <InputLabel id="RaceSelector">{t("Race")}</InputLabel>
                    <Select value={selectedRace} onChange={handleChangeRace} label={t("Race")}>
                      {healClass === ""
                        ? ""
                        : classRaceList[healClass.toString()].races.map((key, i) => (
                            <MenuItem key={i} value={key}>
                              <div style={{ display: "inline-flex" }}>
                                {raceIcons(key)}
                                {t(key)}
                              </div>
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>

          {/* -------------------------------------------------------------------------- */
          /*                            Character Stats Panel                           */
          /* -------------------------------------------------------------------------- */}
          <TabPanel className={classes.tabPanel} value={value} index={1}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
              {/* ------------------------ Stat Message/Instructions -----------------------  */}

              <Grid item xs={12}>
                <Paper elevation={0} style={{ border: "1px", padding: 10 }}>
                  <Typography style={{ color: "limegreen" }} align="left" variant="subtitle2">
                    {t("CharacterCreator.StatMessage")}
                  </Typography>
                </Paper>
              </Grid>

              {/* -------------------------------- Intellect -------------------------------  */}
              <Grid item xs={4}>
                <TextField
                  id="IntellectInput"
                  type="number"
                  label={t("Intellect")}
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
                  label={t("Crit")}
                  style={{ textAlignLast: "center" }}
                  type="text"
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
                  label={t("Haste")}
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
                  label={t("Mastery")}
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
                  label={t("Versatility")}
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
                  label={t("Leech")}
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
          </TabPanel>

          {/* -------------------------------------------------------------------------- */
          /*                          Imported WarcraftLog Data                         */
          /* -------------------------------------------------------------------------- */}

          <TabPanel className={classes.tabPanel} value={value} index={2}>
            <Grid container spacing={1}>
              {/* map here */}
              <Grid item xs={12}>
                <Typography align="center" style={{ fontStyle: "italic" }}>
                  {t("CharacterCreator.SavedLogs.Header")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ backgroundColor: "#525252", padding: 16 }}>
                  <Grid container>
                    <Grid item container xs={11} spacing={1}>
                      {/* -------------------------------- Report ID -------------------------------  */}
                      <Grid item xs={6}>
                        <Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.Report") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {props.char.getReportID(contentType)}
                          </Typography>
                        </Typography>
                      </Grid>
                      {/* -------------------------------- Boss Name -------------------------------  */}
                      <Grid item xs={6}>
                        <Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.Boss") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {props.char.getBossName(contentType)}
                          </Typography>
                        </Typography>
                      </Grid>
                      {/* ------------------------------ Fight Length ------------------------------  */}
                      <Grid item>
                        <Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.FightLength") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {sec2hmmss(props.char.getFightLength(contentType))}
                          </Typography>
                        </Typography>
                      </Grid>
                      {/* ----------------------------------- HPS ----------------------------------  */}
                      <Grid item>
                        <Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.HPS") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {props.char.getHPS(contentType)}
                          </Typography>
                        </Typography>
                      </Grid>
                      {/* --------------------------------- Raw HPS --------------------------------  */}
                      <Grid item>
                        {/*<Typography style={{ display: "inline-flex" }}>
                          {t("CharacterCreator.SavedLogs.RawHPS") + ":"}
                          <Typography color="primary" style={{ paddingLeft: 4 }}>
                            {props.char.getRawHPS(contentType)}
                          </Typography>
                        </Typography> */}
                      </Grid>
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
          </TabPanel>
        </div>
        <DialogActions>
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* ------------------------------ Delete Button -----------------------------  */}
            <ThemeProvider theme={deleteTheme}>
              {value === 0 ? (
                <Button onClick={handleDelete} color="primary">
                  {t("CharacterCreator.DeleteCharacter")}
                </Button>
              ) : (
                "⠀"
              )}
            </ThemeProvider>
            {/* ---------------------- Default Button (Reset Stats) ----------------------  */}
            <div>
              {value === 1 ? (
                <Button onClick={resetDefaults} color="primary">
                  {"Defaults"}
                </Button>
              ) : (
                ""
              )}
              {/* ------------------------------ Cancel Button -----------------------------  */}
              <Button onClick={handleClose} color="primary">
                {t("Cancel")}
              </Button>
              {/* ------------------------------- Save Button ------------------------------  */}
              <Button onClick={() => handleUpdateData()} color="primary">
                {t("Save")}
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

// Accordian for the logs

// <Accordion disabled onClick={() => ""} style={{ backgroundColor: "#525252" }}>
// <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
//   <Grid container spacing={1}>
//     {/* -------------------------------- Report ID -------------------------------  */}
//     <Grid item xs={6}>
//       <Typography style={{ display: "inline-flex" }}>
//         Report:
//         <Typography color="primary" style={{ paddingLeft: 4 }}>
//           {props.char.getReportID(contentType)}
//         </Typography>
//       </Typography>
//     </Grid>
//     {/* -------------------------------- Boss Name -------------------------------  */}
//     <Grid item xs={6}>
//       <Typography style={{ display: "inline-flex" }}>
//         Boss:
//         <Typography color="primary" style={{ paddingLeft: 4 }}>
//           {props.char.getBossName(contentType)}
//         </Typography>
//       </Typography>
//     </Grid>
//     {/* ------------------------------ Fight Length ------------------------------  */}
//     <Grid item>
//       <Typography style={{ display: "inline-flex" }}>
//         Fight Length:
//         <Typography color="primary" style={{ paddingLeft: 4 }}>
//           {sec2hmmss(props.char.getFightLength(contentType))}
//         </Typography>
//       </Typography>
//     </Grid>
//     {/* ----------------------------------- HPS ----------------------------------  */}
//     <Grid item>
//       <Typography style={{ display: "inline-flex" }}>
//         HPS:
//         <Typography color="primary" style={{ paddingLeft: 4 }}>
//           {props.char.getHPS(contentType)}
//         </Typography>
//       </Typography>
//     </Grid>
//     {/* --------------------------------- Raw HPS --------------------------------  */}
//     <Grid item>
//       <Typography style={{ display: "inline-flex" }}>
//         Raw HPS:
//         <Typography color="primary" style={{ paddingLeft: 4 }}>
//           {props.char.getRawHPS(contentType)}
//         </Typography>
//       </Typography>
//     </Grid>
//   </Grid>
// </AccordionSummary>
// <AccordionDetails>
//   {/* ----------------------- Cast Model Breakdown Table -----------------------  */}
//   <LogDetailsTable data={props.char.getSpellList(contentType)} />
// </AccordionDetails>
// </Accordion>
