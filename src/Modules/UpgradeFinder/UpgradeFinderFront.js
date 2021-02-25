import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import HelpText from "../SetupAndMenus/HelpText";
import UpgradeFinderSlider from "./Slider";
import ToggleButton from "@material-ui/lab/ToggleButton";
import TopGearSettingsAccordion from "../TopGear/TopGearSettings";
import UpgradeFinderSimC from "./UpgradeFinderSimCImport";
import { runUpgradeFinder } from "./UpgradeFinderEngine";
import { useHistory } from "react-router-dom";
import userSettings from "../TopGear/SettingsObject";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "90%",
    margin: "0px 20px 50px 20px",
    textAlign: "center",
  },
  button: {
    width: 150,
    height: 50,
  },
  red: {},
  selectedRed: {
    "&$red": {
      color: "#000",
      backgroundColor: "#F2BF59",
    },
    "&$red:hover": {
      color: "#000",
      backgroundColor: "rgb(169, 133, 62)",
    },
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "55%",
      marginTop: 120,
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "55%",
    },
    [theme.breakpoints.down("lg")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "55%",
    },
    [theme.breakpoints.up("xl")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "55%",
    },
  },
}));

const raidDifficulty = ["Raid Finder", "Normal", "Heroic", "Mythic"];
const pvpCurrency = ["Honor", "Conquest"];

const marks = [
  { value: 0, label: "M 0" },
  { value: 2, label: "M 2" },
  { value: 3, label: "M 3" },
  { value: 5, label: "M 4-5" },
  { value: 6, label: "M 6" },
  { value: 7, label: "M 7-9" },
  { value: 10, label: "M 10-11" },
  { value: 12, label: "M 12-14" },
  { value: 15, label: "M 15" },
];

const PvPRating = [
  { value: 0, label: "Unranked" },
  { value: 600, label: "Combatant 1400-1599" },
  { value: 800, label: "Challenger  1600-1799" },
  { value: 1000, label: "Rival 1800-2099" },
  { value: 1300, label: "Duelist 2100-2399" },
  { value: 1600, label: "Elite 2400+" },
];

export default function UpgradeFinderFront(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const helpText = t("UpgradeFinderFront.HelpText");

  const [selectedRaidFinder, setSelectedRaidFinder] = React.useState(false);
  const [selectedNormal, setSelectedNormal] = React.useState(false);
  const [selectedHeroic, setSelectedHeroic] = React.useState(false);
  const [selectedMythic, setSelectedMythic] = React.useState(false);

  const [selectedHonor, setSelectedHonor] = React.useState(false);
  const [selectedConquest, setSelectedConquest] = React.useState(false);

  let history = useHistory();

  const selectsPvE = [selectedRaidFinder, selectedNormal, selectedHeroic, selectedMythic];
  const setsPvE = [setSelectedRaidFinder, setSelectedNormal, setSelectedHeroic, setSelectedMythic];

  const editSettings = (setting, newValue) => {
    //console.log("Updating Settings" + setting + ". " + newValue);
    userSettings[setting] = newValue;
    //console.log("Settings: " + JSON.stringify(userSettings));
  };

  const unleashUpgradeFinder = () => {
    const playerSettings = props.playerSettings;
    const result = runUpgradeFinder(props.player, props.contentType, currentLanguage, playerSettings, userSettings);
    props.setItemSelection(result);
    props.setShowReport(true);
    //history.push("/UpgradeFinderReport/");
  };

  const getSimCStatus = (player) => {
    if (player.activeItems.length === 0) return "Missing";
    else if (checkCharacterValid(player) === false) return "Invalid";
    else return "Good";
  };

  const checkCharacterValid = (player) => {
    const weaponSet = player.getActiveItems("AllMainhands", false, true);
    const weapon = weaponSet.length > 0 ? weaponSet[0] : "";

    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
  };

  const getUpgradeFinderReady = (player) => {
    return getSimCStatus(player) === "Good" && props.playerSettings.raid.length > 0;
  };

  const selectsPvP = [selectedHonor, selectedConquest];

  const setsPvP = [setSelectedHonor, setSelectedConquest];

  return (
    <div className={classes.header}>
      <Typography variant="h4" color="primary" align="center" style={{ padding: "10px 10px 5px 10px" }}>
        {t("UpgradeFinderFront.Header")}
      </Typography>

      <Grid container spacing={1}>
        {/* ---------------------------- Help Text Section --------------------------- */}
        <Grid item xs={12}>
          <HelpText text={helpText} />
        </Grid>
        <Grid item xs={12}>
          <UpgradeFinderSimC player={props.player} contentType={props.contentType} simcSnack={props.simcSnack} allChars={props.allChars} />
        </Grid>
        <Grid item xs={12}>
          <TopGearSettingsAccordion userSettings={userSettings} editSettings={editSettings} />
        </Grid>

        {/* ------------------------------ Raid Section ------------------------------ */}
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12}>
                <Typography color="primary" align="center" variant="h5">
                  {t("UpgradeFinderFront.RaidDifficultyHeader")}
                </Typography>
                <Grid item xs={12}>
                  <Typography align="center">{t("UpgradeFinderFront.RaidDifficultyBody")}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid container justify="center" spacing={1}>
              {raidDifficulty.map((key) => (
                <Grid item justify="center" xs="auto">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    {key}
                  </Button>
                </Grid>
              ))}
            </Grid> */}
            <Grid container justify="center" spacing={1}>
              {raidDifficulty.map((key, i) => (
                <Grid item xs="auto" key={i}>
                  <ToggleButton
                    classes={{
                      root: classes.red,
                      selected: classes.selectedRed,
                    }}
                    value="check"
                    //selected={selectsPvE[i]}
                    selected={props.playerSettings.raid.includes(i)}
                    style={{ width: 180, height: 45 }}
                    onChange={() => {
                      setsPvE[i](!selectsPvE[i]);
                      props.setRaidDifficulty(i);
                    }}
                  >
                    {t("RaidDifficulty." + key)}
                  </ToggleButton>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* --------------------------- Mythic Plus Section -------------------------- */}
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: "10px 10px 0px 10px", textAlign: "center" }}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12}>
                <Typography color="primary" align="center" variant="h5">
                  {t("UpgradeFinderFront.MythicPlusHeader")}
                </Typography>
                <Grid item xs={12}>
                  <Typography align="center">{t("UpgradeFinderFront.MythicPlusBody")}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <UpgradeFinderSlider
              className={classes.slider}
              style={{ color: "#52af77" }}
              defaultValue={10}
              step={null}
              valueLabelDisplay="off"
              marks={marks}
              max={15}
              change={props.setDungeonDifficulty}
            />
          </Paper>
        </Grid>
        {/* ------------------------------- PvP Section ------------------------------ */}
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12}>
                <Typography color="primary" align="center" variant="h5">
                  {t("UpgradeFinderFront.PvPHeader")}
                </Typography>
                <Grid item xs={12}>
                  <Typography align="center">{t("UpgradeFinderFront.PvPBody")}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={1} style={{ marginTop: "10px 10px 0px 10px" }}>
              <Grid item style={{ textAlign: "center" }} xs={12}>
                <UpgradeFinderSlider
                  className={classes.slider}
                  style={{ color: "#af5050" }}
                  defaultValue={0}
                  step={null}
                  valueLabelDisplay="off"
                  marks={PvPRating}
                  max={1600}
                  change={props.setPVPDifficulty}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 100 }} />
      </Grid>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
          backgroundColor: "#424242",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <Typography variant="subtitle2" align="center" style={{ padding: "5px 10px 5px 10px" }} color="primary">
              {/* {errorMessage} */}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              align="center"
              style={{ height: "68%", width: "180px" }}
              disabled={!getUpgradeFinderReady(props.player)}
              onClick={unleashUpgradeFinder}
            >
              {t("TopGear.GoMsg")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
