import React, { useState } from "react";
import { styled } from "@mui/system";
import logo from "Images/QeAssets/QELogo.png";
import { Button, Dialog, DialogActions, DialogContent, Typography, Grid, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import * as ls from "local-storage";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../SetupAndMenus/Header/LanguageButton";
import GameTypeSwitch from "../SetupAndMenus/GameTypeToggle";
import { classRaceDB } from "../../../Databases/ClassRaceDB";
import { serverDB, serverDBBurningCrusade } from "../../../Databases/ServerDB";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";
import { useSelector } from "react-redux";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import raceIcons from "../CooldownPlanner/Functions/IconFunctions/RaceIcons";
import { getTranslatedRaceName } from "Databases/RacesDB";
import { getTranslatedClassName } from "locale/ClassNames";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  whiteSpace: "nowrap",
  width: "100%",
  minWidth: 150,
}));

const StyledFormRegion = styled(FormControl)(({ theme }) => ({
  whiteSpace: "nowrap",
  width: "100%",
  marginRight: 1,
}));

const StyledTextInput = styled(TextField)(({ theme }) => ({
  width: "100%",
}));

const StyledRoot = styled("div")(({ theme }) => ({
  display: "inline-flex",
  width: "100%",
  maxHeight: "80px",
  borderColor: "#e0e0e0",
  padding: "0px",
  marginRight: "0px",
}));

const StyledOption = styled("div")(({ theme }) => ({
  borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
}));

interface WelcomeDialogProps {
  welcomeOpen: boolean;
  charAddedSnack: () => void;
  charUpdate: () => void;
  allChars: any;
}

export default function WelcomeDialog(props: WelcomeDialogProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const gameType = useSelector((state: any) => state.gameType);
  const availableClasses: Record<string, { races: string[]; gameType: string }> = classRaceDB;
  const [open, setOpen] = useState(props.welcomeOpen);
  const [page, setPage] = useState(1);
  const [healClass, setHealClass] = useState("");
  const [charName, setCharName] = useState("");
  const [regions, setRegions] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [server, setServer] = useState("");
  const serverList: Record<string, string[]> = gameType === "Retail" ? serverDB : serverDBBurningCrusade;

  const region = ["CN", "US", "TW", "EU", "KR"];

  const handleAddCharacterPanel = () => {
    setPage(2);
  };

  const handleAdd = (name: string, spec: string, allChars: any, updateChar: any, region: string, realm: string, race: string, gameType: string) => {
    setOpen(false);
    allChars.addChar(name, spec, region, realm, race, gameType, "");
    updateChar(allChars);
    props.charAddedSnack();
    setSelectedRace("");
    setHealClass("");
    setServer("");
    setCharName("");
    ls.set("welcomeMessage", true);
  };

  const handleChangeSpec = (event: SelectChangeEvent<string>) => {
    setHealClass(event.target.value);
  };

  const handleChangeRace = (event: SelectChangeEvent<string>) => {
    setSelectedRace(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharName(event.target.value);
  };

  const handleChangeRegion = (event: SelectChangeEvent<string>) => {
    setRegions(event.target.value);
  };

  const handleChangeServer = (event: React.ChangeEvent<{}>, value: string | null) => {
    setServer(value || "");
  };

  return (
    <Dialog maxWidth={page === 1 ? "md" : "xs"} fullWidth={true} open={open} BackdropProps={{ style: { backgroundColor: "rgba(82,82,82,0.9)" } }}>
      {page === 1 ? (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" variant="h3">
                {t("Welcome.WelcomeTo")}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <img src={logo} alt="QE Live" />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography align="center" variant="h6" style={{ textAlign: "center" }}>
                {t("Welcome.GameTypeMessage")}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <GameTypeSwitch charUpdate={props.charUpdate} allChars={props.allChars} />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography align="center" variant="h6" style={{ textAlign: "center" }}>
                {t("Welcome.ContinueMessage")}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button variant="outlined" size="large" onClick={handleAddCharacterPanel} color="primary">
                {t("Welcome.CreateCharacter")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      ) : page === 2 ? (
        <DialogContent>
          <DialogTitle id="char-dialog-title">{t("CharacterCreator.AddChar")}</DialogTitle>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12}>
              <StyledTextInput id="char-name" label={t("CharacterCreator.CharName")} onChange={handleChangeName} variant="outlined" size="small" />
            </Grid>
            <Grid container spacing={1} item>
              <Grid item xs={4}>
                <StyledFormRegion variant="outlined" size="small" disabled={charName === "" ? true : false}>
                  <InputLabel id="NewClassSelector">{t("Region")}</InputLabel>
                  <Select label={t("Region")} value={regions} onChange={handleChangeRegion}>
                    {Object.values(region).map((key, i, arr) => {
                      let lastItem = i + 1 === arr.length ? false : true;
                      return (
                        <MenuItem divider={lastItem} key={i} value={key}>
                          {key}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </StyledFormRegion>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  size="small"
                  disabled={regions === "" ? true : false}
                  id="server-select"
                  options={serverList[regions] || []}
                  getOptionLabel={(option) => option as string}
                  style={{ width: "100%" }}
                  onChange={(e, newValue) => {
                    handleChangeServer(e, newValue as string);
                  }}
                  renderInput={(params) => <TextField {...params} label={t("CharacterCreator.ServerName")} variant="outlined" />}
                  ListboxProps={{ style: { border: "1px solid rgba(255, 255, 255, 0.23)", borderRadius: 4, paddingTop: 0, paddingBottom: 0 } }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <StyledFormControl variant="outlined" size="small" disabled={regions === "" ? true : false}>
                <InputLabel id="NewClassSelector">{t("Select Class")}</InputLabel>
                <Select label={t("Select Class")} value={healClass} onChange={handleChangeSpec}>
                  {Object.getOwnPropertyNames(availableClasses)
                    .filter((filter) => gameType === availableClasses[filter].gameType)
                    .map((key, i, arr) => {
                      let lastItem = i + 1 === arr.length ? false : true;
                      return (
                        <MenuItem divider={lastItem} key={i} value={key} style={{ color: classColoursJS(key) }}>
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
              </StyledFormControl>
            </Grid>
            <Grid item xs={12}>
              <StyledFormControl disabled={healClass === "" ? true : false} variant="outlined" size="small">
                <InputLabel id="NewRaceSelector">{t("Select Race")}</InputLabel>
                <Select label={t("Select Race")} value={selectedRace} onChange={handleChangeRace}>
                  {healClass === ""
                    ? ""
                    : availableClasses[healClass.toString()].races.map((key, i, arr) => {
                        let lastItem = i + 1 === arr.length ? false : true;
                        return (
                          <MenuItem divider={lastItem} key={i} value={key}>
                            <div style={{ display: "inline-flex" }}>
                              {raceIcons(key)}
                              {getTranslatedRaceName(key, currentLanguage)}
                            </div>
                          </MenuItem>
                        );
                      })}
                </Select>
              </StyledFormControl>
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
          <LanguageSelector />
          {page === 2 ? (
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
