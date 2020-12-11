import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions.js";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import classicons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons.js";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { serverList, classRaceList } from "../CooldownPlanner/Data/Data";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useTranslation } from "react-i18next";

import raceIcons from "../CooldownPlanner/Functions/IconFunctions/RaceIcons";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";

import { STAT } from "../Engine/STAT";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

// Spec Images.
const specImages = {
  "Restoration Druid": require("../../Images/DruidSmall.jpg"),
  "Restoration Shaman": require("../../Images/ShamanSmall.png"),
  "Discipline Priest": require("../../Images/DiscSmall.jpg"),
  "Holy Paladin": require("../../Images/PaladinSmall.png"),
  "Holy Priest": require("../../Images/HPriestSmall.jpg"),
  "Mistweaver Monk": require("../../Images/MistweaverSmall.jpg"),
};

// Called when a character is clicked.
// TODO: Add Logic
const charClicked = (char, cardType, allChars, updateChar) => {
  if (cardType === "Char") {
    // Character Clicked. Take player to character sheet.
    //alert("Character Clicked " + char.charName);
    allChars.setActiveChar(char.charID);
    updateChar(allChars);
  } else {
    // New character clicked. Offer new character dialog.
    //alert("New Character");
    //charCreationDialog(char);
    // allChars.addChar("VoulkPriest", "Discipline Priest");
    // updateChar(allChars);
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    // maxWidth: "260px",
    width: "100%",
    maxHeight: "80px",
    borderColor: "Gold",
    padding: "0px",
    marginRight: "0px",
  },
  activeChar: {
    borderColor: "ForestGreen",
    borderWidth: "2px",
    backgroundColor: "#424E42",
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
    minWidth: 300,
  },
}));

const deleteTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export default function CharCards(props) {
  const player = props.char;
  const contentType = props.contentType;

  const { t } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [region, setRegion] = React.useState(player.region);
  const [open, setOpen] = React.useState(false);
  const [charName, setCharName] = React.useState(player.charName);
  const [healClass, setHealClass] = React.useState(player.getSpec());
  const [selectedRace, setSelectedRace] = React.useState(player.getRace());
  const [intellect, setIntellect] = React.useState("1");
  const [critical, setCritical] = React.useState(
    player.getStatWeight(props.contentType, STAT.CRITICAL_STRIKE)
  );
  const [haste, setHaste] = React.useState(
    player.getStatWeight(props.contentType, STAT.HASTE)
  );
  const [mastery, setMastery] = React.useState(
    player.getStatWeight(props.contentType, STAT.MASTERY)
  );
  const [versatility, setVersatility] = React.useState(
    player.getStatWeight(props.contentType, STAT.VERSATILITY)
  );
  const [leech, setLeech] = React.useState(
    player.getStatWeight(props.contentType, STAT.LEECH)
  );
  const [server, setServer] = React.useState(player.realm);

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
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCritical(player.getStatWeight(props.contentType, STAT.CRITICAL_STRIKE));
    setHaste(player.getStatWeight(props.contentType, STAT.HASTE));
    setMastery(player.getStatWeight(props.contentType, STAT.MASTERY));
    setVersatility(player.getStatWeight(props.contentType, STAT.VERSATILITY));
    setLeech(player.getStatWeight(props.contentType, STAT.LEECH));
    setServer(player.realm);
  };
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

  const handleDelete = () => {
    props.delChar(player.uniqueHash);
    handleClose();
  }

  // TODO
  const handleUpdateData = () => {
    let newPlayer = props.char;
    let weights = {
      intellect: 1,
      haste: haste,
      crit: critical,
      mastery: mastery,
      versatility: versatility,
      leech: leech,
    };

    newPlayer.editChar(
      props.contentType,
      charName,
      server,
      region,
      selectedRace,
      weights
    );

    setOpen(false);
    //Update data Function Here
    props.singleUpdate(newPlayer);
    props.charUpdatedSnack();
  };

  const spec = props.cardType === "Char" ? props.char.spec : "";

  const rootClassName =
    classes.root + " " + (props.isActive ? classes.activeChar : "");
  //alert(rootClassName);

  const regions = ["CN", "US", "TW", "EU"];

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <CardActionArea
        onClick={(e) =>
          charClicked(
            props.char,
            props.cardType,
            props.allChars,
            props.charUpdate,
            e
          )
        }
        onContextMenu={(e) => handleClickOpen(e)}
      >
        <Card className={rootClassName} variant="outlined" raised={true}>
          <Avatar
            src={specImages[spec]}
            variant="square"
            alt=""
            className={classes.large}
          />
          <Divider orientation="vertical" flexItem />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography
                variant="h6"
                component="h4"
                style={{ lineHeight: 1, color: classColoursJS(spec) }}
              >
                {props.name}
              </Typography>
              <Typography variant="caption" style={{ fontSize: 11 }}>
                {player.getRealmString()}
              </Typography>
              <Divider />
              <Typography style={{ color: classColoursJS(spec), marginTop: 2 }}>
                {spec}
                {classicons(spec, 18)}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.tabRoot}>
          <AppBar position="static" elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Info" {...a11yProps(0)} />
              <Tab label="Stat Weights" {...a11yProps(1)} />
              <Tab disabled={true} label="Saved Logs" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel className={classes.tabPanel} value={value} index={0}>
            <Grid container spacing={1} style={{ width: 440 }}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Character Name"
                  value={charName}
                  onChange={handleChangeName}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={t("Region")}
                  disabled={true}
                >
                  <InputLabel id="ClassSelector">{t("Region")}</InputLabel>
                  <Select
                    value={region}
                    onChange={handleChangeRegion}
                    label={t("Region")}
                  >
                    {Object.values(regions).map((key, i) => (
                      <MenuItem key={i} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Server Name"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  label={t("Class")}
                  disabled={true}
                >
                  <InputLabel id="ClassSelector">{t("Class")}</InputLabel>
                  <Select
                    label={t("Class")}
                    value={healClass}
                    onChange={handleChangeSpec}
                  >
                    {Object.getOwnPropertyNames(classRaceList).map((key, i) => (
                      <MenuItem key={i} value={key}>
                        {classIcons(key, 20)}
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  disabled={healClass === "" ? true : false}
                  fullWidth
                  variant="outlined"
                  size="small"
                  label={t("Race")}
                >
                  <InputLabel id="RaceSelector">{t("Race")}</InputLabel>
                  <Select
                    value={selectedRace}
                    onChange={handleChangeRace}
                    label={t("Race")}
                  >
                    {healClass === ""
                      ? ""
                      : classRaceList[healClass.toString()].races.map(
                          (key, i) => (
                            <MenuItem key={i} value={key}>
                              <div style={{ display: "inline-flex" }}>
                                {raceIcons(key)}
                                {t(key)}
                              </div>
                            </MenuItem>
                          )
                        )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={value} index={1}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
              style={{ width: 440 }}
            >
              <Grid item xs={6}>
                <TextField
                  id="IntellectInput"
                  label={t("Intellect")}
                  value={intellect}
                  onChange={handleIntellect}
                  variant="outlined"
                  size="small"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="CriticalInput"
                  label={t("Crit")}
                  value={critical}
                  onChange={handleCrit}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="HasteInput"
                  label={t("Haste")}
                  value={haste}
                  onChange={handleHaste}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="MasteryInput"
                  label={t("Mastery")}
                  value={mastery}
                  onChange={handleMastery}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="VersatilityInput"
                  label={t("Versatility")}
                  value={versatility}
                  onChange={handleVers}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="LeechInput"
                  label={t("Leech")}
                  value={leech}
                  onChange={handleLeech}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={value} index={2}>
            Item Three
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
            <ThemeProvider theme={deleteTheme}>
              <Button onClick={handleDelete} color="primary">
                {t("Delete")}
              </Button>
            </ThemeProvider>
            <div>
              <Button onClick={handleClose} color="primary">
                {t("Cancel")}
              </Button>
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
