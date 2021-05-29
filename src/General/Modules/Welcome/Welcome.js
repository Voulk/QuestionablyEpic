import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "Images/QeAssets/QELogo.png";
import { Button, Box, Dialog, DialogActions, DialogContent, Typography, Grid, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Divider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ls from "local-storage";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../SetupAndMenus/Header/LanguageButton";
import GameTypeSwitch from "../SetupAndMenus/GameTypeToggle";
import { bcClassRaceList, classRaceList } from "../CooldownPlanner/Data/Data";
import { serverDB, serverDBBurningCrusade } from "../../../Databases/ServerDB";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";
import { useSelector } from "react-redux";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import raceIcons from "../CooldownPlanner/Functions/IconFunctions/RaceIcons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    whiteSpace: "nowrap",
    width: "100%",
    minWidth: 150,
  },
  formRegion: {
    whiteSpace: "nowrap",
    width: "100%",
    marginRight: 1,
  },
  textInput: {
    width: "100%",
  },
  root: {
    display: "inline-flex",
    // maxWidth: "260px",
    width: "100%",
    maxHeight: "80px",
    borderColor: "#e0e0e0",
    padding: "0px",
    marginRight: "0px",
  },
  option: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
  },
}));

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export default function WelcomeDialog(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const gameType = useSelector((state) => state.gameType);
  const availableClasses = classRaceList;
  const [open, setOpen] = React.useState(props.welcomeOpen);
  const [page, setPage] = React.useState(1);
  const [healClass, setHealClass] = React.useState("");
  const [charName, setCharName] = React.useState("");
  const [regions, setRegions] = React.useState("");
  const [selectedRace, setSelectedRace] = React.useState("");
  const [server, setServer] = React.useState("");
  const serverList = gameType === "Retail" ? serverDB : serverDBBurningCrusade;
  const region = ["CN", "US", "TW", "EU", "KR"];
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  /* ------------------------------------ Go to Page 2 Function ----------------------------------- */
  const handleAddCharacterPanel = () => {
    setPage(2);
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Add Character Function                                     */
  /* ---------------------------------------------------------------------------------------------- */
  const handleAdd = (name, spec, allChars, updateChar, region, realm, race, gameType) => {
    setOpen(false);
    allChars.addChar(name, spec, region, realm, race, gameType);
    updateChar(allChars);
    props.charAddedSnack();
    setSelectedRace("");
    setHealClass("");
    setServer("");
    // setRegions(null);
    setCharName("");
    /* ----- Set welcomeMessage local storage to true, so that the message does not show anymore ---- */
    ls.set("welcomeMessage", true);
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Character Input Handlers                                    */
  /* ---------------------------------------------------------------------------------------------- */
  const handleChangeSpec = (event) => {
    setHealClass(event.target.value);
  };
  const handleChangeRace = (event) => {
    setSelectedRace(event.target.value);
  };
  const handleChangeName = (event) => {
    setCharName(event.target.value);
  };
  const handleChangeRegion = (event) => {
    setRegions(event.target.value);
  };
  const handleChangeServer = (serverName) => {
    setServer(serverName);
  };

  return (
    <Dialog maxWidth={page === 1 ? "md" : "xs"} fullWidth={true} open={open}>
      {page === 1 ? (
        /* ---------------------------------------------------------------------------------------------- */
        /*                              Page 1 - Welcome & GameType Selection                             */
        /* ---------------------------------------------------------------------------------------------- */
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" variant="h3">
                {t("Welcome.WelcomeTo")}
              </Typography>
            </Grid>
            {/* ----------------------------------- Questionably Epic Logo ----------------------------------- */}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <img src={logo} alt="QE Live" />
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography align="center" variant="h6" style={{ textAlign: "center" }}>
                {t("Welcome.ContinueMessage")}
              </Typography>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography align="center" variant="h6" style={{ textAlign: "center" }}>
                {t("Welcome.GameTypeMessage")}
              </Typography>
            </Grid>
            {/* ---------------------------------- Game Type Switch Buttons ---------------------------------- */}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <GameTypeSwitch />
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button variant="outlined" size="large" onClick={handleAddCharacterPanel} color="primary">
                {t("Welcome.CreateCharacter")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      ) : page === 2 ? (
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Page 2 - Character Creation                                  */
        /* ---------------------------------------------------------------------------------------------- */
        <DialogContent>
          <DialogTitle id="char-dialog-title">{t("CharacterCreator.AddChar")}</DialogTitle>
          <Grid container spacing={1} direction="column">
            {/* ----------------------------------------- Name Input ----------------------------------------- */}
            <Grid item xs={12}>
              <TextField className={classes.textInput} id="char-name" label={t("CharacterCreator.CharName")} onChange={handleChangeName} variant="outlined" size="small" />
            </Grid>
            <Grid container spacing={1} item>
              {/* -------------------------------------- Region Selection -------------------------------------- */}
              <Grid item xs={4}>
                <FormControl className={classes.formRegion} variant="outlined" size="small" disabled={charName === "" ? true : false} label={t("Region")}>
                  <InputLabel id="NewClassSelector">{t("Region")}</InputLabel>
                  <Select label={t("Region")} value={regions} onChange={handleChangeRegion} MenuProps={menuStyle}>
                    {Object.values(region)
                      .map((key, i) => (
                        <MenuItem key={i} value={key}>
                          {key}
                        </MenuItem>
                      ))
                      .map((item, i) => [item, <Divider key={i} />])}
                  </Select>
                </FormControl>
              </Grid>
              {/* -------------------------------------- Server Selection -------------------------------------- */}
              <Grid item xs={8}>
                <Autocomplete
                  size="small"
                  classes={{
                    option: classes.option,
                  }}
                  disabled={regions === "" ? true : false}
                  id="server-select"
                  options={serverList[regions] || []}
                  getOptionLabel={(option) => option}
                  style={{ width: "100%" }}
                  onChange={(e, newValue) => {
                    handleChangeServer(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label={t("CharacterCreator.ServerName")} variant="outlined" />}
                  ListboxProps={{ style: { border: "1px solid rgba(255, 255, 255, 0.23)", borderRadius: 4, paddingTop: 0, paddingBottom: 0 } }}
                />
              </Grid>
            </Grid>
            {/* --------------------------------------- Class Selection -------------------------------------- */}
            <Grid item xs={12}>
              <FormControl className={classes.formControl} variant="outlined" size="small" disabled={regions === "" ? true : false} label={t("Select Class")}>
                <InputLabel id="NewClassSelector">{t("Select Class")}</InputLabel>
                <Select label={t("Select Class")} value={healClass} onChange={handleChangeSpec} MenuProps={menuStyle}>
                  {Object.getOwnPropertyNames(availableClasses)
                    .filter((filter) => gameType === availableClasses[filter].gameType)
                    .map((key, i) => (
                      <MenuItem key={i} value={key} style={{ color: classColoursJS(key) }}>
                        {classIcons(key, {
                          height: 20,
                          width: 20,
                          margin: "0px 5px 0px 5px",
                          verticalAlign: "middle",
                          borderRadius: 4,
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                        })}
                        {t("Classes." + key)}
                      </MenuItem>
                    ))
                    .map((item, i) => [item, <Divider key={i} />])}
                </Select>
              </FormControl>
            </Grid>
            {/* --------------------------------------- Race Selection --------------------------------------- */}
            <Grid item xs={12}>
              <FormControl disabled={healClass === "" ? true : false} className={classes.formControl} variant="outlined" size="small" label={t("Select Race")}>
                <InputLabel id="NewRaceSelector">{t("Select Race")}</InputLabel>
                <Select label={t("Select Race")} value={selectedRace} onChange={handleChangeRace} MenuProps={menuStyle}>
                  {healClass === ""
                    ? ""
                    : availableClasses[healClass.toString()].races
                        .map((key, i) => (
                          <MenuItem key={i} value={key}>
                            <div style={{ display: "inline-flex" }}>
                              {raceIcons(key)}
                              {t(key)}
                            </div>
                          </MenuItem>
                        ))
                        .map((item, i) => [item, <Divider key={i} />])}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
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
          {/* ------------------------------------- Language Selection ------------------------------------- */}
          <LanguageSelector />
          {page === 2 ? (
            // ------------------------------------ Add Button for Page 2 -----------------------------------
            <Button
              onClick={() => handleAdd(charName, healClass, props.allChars, props.charUpdate, regions, server, selectedRace, gameType)}
              color="primary"
              disabled={selectedRace === "" ? true : false}
              variant="outlined"
            >
              {t("Add")}
            </Button>
          ) : (
            ""
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
