import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions.js";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import classicons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons.js";

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
  "Restoration Druid": require("../../Images/DruidSmall.png"),
  "Discipline Priest": require("../../Images/DiscSmall.png"),
  "Holy Paladin": require("../../Images/PaladinSmall.png"),
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

export default function CharCards(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [region, setRegion] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [charName, setCharName] = React.useState(props.name);
  const [healClass, setHealClass] = React.useState(props.char.spec);
  const [selectedRace, setSelectedRace] = React.useState("");
  const [intellect, setIntellect] = React.useState("1.5");
  const [critical, setCritical] = React.useState("1.5");
  const [haste, setHaste] = React.useState("1.5");
  const [mastery, setMastery] = React.useState("1.5");
  const [versatility, setVersatility] = React.useState("1.5");
  const [leech, setLeech] = React.useState("1.5");
  const [server, setServer] = React.useState("");

  const handleChangeName = (event) => {
    setCharName(event.target.value);
  };
  const handleChangeServer = (event) => {
    setServer(event.target.value);
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
  const handleUpdateData = (name, spec, race, region, server) => {
    setOpen(false);
    //Update data Function Here
    // Unimplemented Snackbar Here
    // props.charAddedSnack();
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
                US-Frostmourne
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
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Info" {...a11yProps(0)} />
              <Tab label="Stat Weights" {...a11yProps(1)} />
              <Tab label="Saved Logs" {...a11yProps(2)} />
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
                  disabled={charName === "" ? true : false}
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
                  options={serverList[region]}
                  // value={server}
                  onChange={handleChangeServer}
                  getOptionLabel={(option) => option}
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
                  disabled={region === "" ? true : false}
                >
                  <InputLabel id="ClassSelector">
                    {t("Select Class")}
                  </InputLabel>
                  <Select
                    label={t("Select Class")}
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
                >
                  <InputLabel id="RaceSelector">{t("Select Race")}</InputLabel>
                  <Select value={selectedRace} onChange={handleChangeRace}>
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
                  // fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Intellect"
                  value={intellect}
                  onChange={handleIntellect}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  // fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Crit"
                  value={critical}
                  onChange={handleCrit}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  // fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Haste"
                  value={haste}
                  onChange={handleHaste}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  // fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Mastery"
                  value={mastery}
                  onChange={handleMastery}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  // fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Vers"
                  value={versatility}
                  onChange={handleVers}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  // fullWidth
                  // className={classes.textInput}
                  id="standard-basic"
                  label="Leech"
                  value={leech}
                  onChange={setLeech}
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
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
