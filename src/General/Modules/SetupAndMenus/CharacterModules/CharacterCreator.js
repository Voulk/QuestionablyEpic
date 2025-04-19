import React from "react";
//prettier-ignore
import { Avatar, Button, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Typography, MenuItem, TextField, Select, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
import classIcons from "General/Modules/IconFunctions/ClassIcons";
import raceIcons from "General/Modules/IconFunctions/RaceIcons";
import Autocomplete from "@mui/material/Autocomplete";
import { classRaceDB } from "../../../../Databases/ClassRaceDB";
import { getTranslatedRaceName } from "Databases/RacesDB";
import { serverDB, serverDBBurningCrusade } from "../../../../Databases/ServerDB";
import { classColours } from "General/Engine/ClassData";
import { useSelector } from "react-redux";
import { getTranslatedClassName } from "locale/ClassNames";


const addBtn = require("../../../../Images/AddBtn.jpg");

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
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding: "5px",
  },
  large: {
    width: "51px",
    height: "51px",
  },
  option: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
  },
}));

export default function AddNewChar(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  const gameType = useSelector((state) => state.gameType);
  const availableClasses = classRaceDB;
  const [open, setOpen] = React.useState(false);
  const [healClass, setHealClass] = React.useState("");
  const [charName, setCharName] = React.useState("");
  const [regions, setRegions] = React.useState("");
  const [selectedRace, setSelectedRace] = React.useState("");
  const [server, setServer] = React.useState("");
  const region = ["CN", "US", "TW", "EU", "KR"];

  const serverList = gameType === "Retail" ? serverDB : serverDBBurningCrusade;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = (name, spec, allChars, updateChar, region, realm, race, gameType, covenant) => {
    setOpen(false);
    allChars.addChar(name, spec, region, realm, race, gameType, covenant);
    updateChar(allChars);
    props.charAddedSnack();
    setSelectedRace("");
    setHealClass("");
    setServer("");
    // setRegions(null);
    setCharName("");
  };
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
    <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
      <CardActionArea onClick={handleClickOpen}>
        <Card className={classes.root} variant="outlined">
          <Avatar variant="square" alt="" className={classes.large} src={addBtn} />
          <div className={classes.details}>
            <CardContent className={classes.content} style={{ paddingBottom: 0 }}>
              <Typography variant="h6" component="h4">
                {t("CharacterCreator.AddChar")}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>

      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="char-dialog-title">
        <DialogTitle id="char-dialog-title">{t("CharacterCreator.AddChar")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12}>
              <TextField className={classes.textInput} id="char-name" label={t("CharacterCreator.CharName")} onChange={handleChangeName} variant="outlined" size="small" />
            </Grid>
            <Grid container spacing={1} item>
              <Grid item xs={4}>
                <FormControl className={classes.formRegion} variant="outlined" size="small" disabled={charName === "" ? true : false} label={t("Region")}>
                  <InputLabel id="NewClassSelector">{t("Region")}</InputLabel>
                  <Select label={t("Region")} value={regions} onChange={handleChangeRegion}>
                    {Object.values(region).map((key, i, arr) => {
                      let lastItem = i + 1 === arr.length ? false : true;
                      return (
                        <MenuItem divider={lastItem} key={"region" + i} value={key}>
                          {key}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
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
            <Grid item xs={12}>
              <FormControl className={classes.formControl} variant="outlined" size="small" disabled={regions === "" ? true : false} label={t("Select Class")}>
                <InputLabel id="NewClassSelector">{t("Select Class")}</InputLabel>
                <Select label={t("Select Class")} value={healClass} onChange={handleChangeSpec}>
                  {Object.getOwnPropertyNames(availableClasses)
                    .filter((filter) => gameType === availableClasses[filter].gameType && (filter !== "Restoration Shaman Classic" && filter !== "Holy Priest Classic"))
                    .map((key, i, arr) => {
                      let lastItem = i + 1 === arr.length ? false : true;
                      return (
                        <MenuItem divider={lastItem} key={"class" + i} value={key} style={{ color: classColours(key) }}>
                          <div style={{ display: "inline-flex" }}>
                            {classIcons(key, {
                              height: 20,
                              width: 20,
                              margin: "0px 5px 0px 5px",
                              verticalAlign: "middle",
                              borderRadius: 4,
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                            })}
                            {getTranslatedClassName(key, currentLanguage)}
                          </div>
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl disabled={healClass === "" ? true : false} className={classes.formControl} variant="outlined" size="small" label={t("Select Race")}>
                <InputLabel id="NewRaceSelector">{t("Select Race")}</InputLabel>
                <Select label={t("Select Race")} value={selectedRace} onChange={handleChangeRace}>
                  {healClass === ""
                    ? ""
                    : availableClasses[healClass.toString()].races.map((key, i, arr) => {
                        let lastItem = i + 1 === arr.length ? false : true;
                        return (
                          <MenuItem divider={lastItem} key={"race" + i} value={key}>
                            <div style={{ display: "inline-flex" }}>
                              {raceIcons(key)}
                              {getTranslatedRaceName(key, currentLanguage)}
                            </div>
                          </MenuItem>
                        );
                      })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            {t("Cancel")}
          </Button>
          <Button
            onClick={() => handleAdd(charName, healClass, props.allChars, props.charUpdate, regions, server, selectedRace, gameType, "")}
            color="primary"
            disabled={selectedRace === "" ? true : false}
            variant="outlined"
          >
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
