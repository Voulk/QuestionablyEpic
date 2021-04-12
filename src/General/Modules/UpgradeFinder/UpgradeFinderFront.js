import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import HelpText from "../SetupAndMenus/HelpText";
import UpgradeFinderSlider from "./Slider";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Settings from "../Settings/Settings";
import UpgradeFinderSimC from "./UpgradeFinderSimCImport";
import { runUpgradeFinder } from "./UpgradeFinderEngine";
// import { useHistory } from "react-router-dom";
import userSettings from "../Settings/SettingsObject";
import { useSelector } from "react-redux";

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
  labels: { fontSize: 12 },
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
  const contentType = useSelector((state) => state.contentType);
  const helpText = t("UpgradeFinderFront.HelpText");

  const marks = [
    {
      value: 0,
      label: (
        <div className={classes.labels}>
          <div>lvl 184</div>
          <div>M 0</div>
        </div>
      ),
    },
    {
      value: 1,
      label: (
        <div className={classes.labels}>
          <div>lvl 187</div>
          <div>M 2</div>
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div className={classes.labels}>
          <div>lvl 190</div>
          <div>M 3</div>
        </div>
      ),
    },
    {
      value: 3,
      label: (
        <div className={classes.labels}>
          <div>lvl 194</div>
          <div>M 4-5</div>
        </div>
      ),
    },
    {
      value: 4,
      label: (
        <div className={classes.labels}>
          <div>lvl 197</div>
          <div>M 6</div>
        </div>
      ),
    },
    {
      value: 5,
      label: (
        <div className={classes.labels}>
          <div>lvl 200</div>
          <div>M 7-9</div>
        </div>
      ),
    },
    {
      value: 6,
      label: (
        <div className={classes.labels}>
          <div>lvl 203</div>
          <div>M 10-11</div>
        </div>
      ),
    },
    {
      value: 7,
      label: (
        <div className={classes.labels}>
          <div>lvl 207</div>
          <div>M 12-14</div>
        </div>
      ),
    },
    {
      value: 8,
      label: (
        <div className={classes.labels}>
          <div>lvl 210</div>
          <div>M 15</div>
        </div>
      ),
    },
    {
      value: 9,
      label: (
        <div className={classes.labels}>
          <div>lvl 213</div>
        </div>
      ),
    },
    {
      value: 10,
      label: (
        <div className={classes.labels}>
          <div>lvl 216</div>
        </div>
      ),
    },
    {
      value: 11,
      label: (
        <div className={classes.labels}>
          <div>lvl 220 </div>
        </div>
      ),
    },
    {
      value: 12,
      label: (
        <div className={classes.labels}>
          <div>lvl 226</div>
        </div>
      ),
    },
  ];

  const [selectedRaidFinder, setSelectedRaidFinder] = React.useState(false);
  const [selectedNormal, setSelectedNormal] = React.useState(false);
  const [selectedHeroic, setSelectedHeroic] = React.useState(false);
  const [selectedMythic, setSelectedMythic] = React.useState(false);

  // let history = useHistory();

  const selectsPvE = [selectedRaidFinder, selectedNormal, selectedHeroic, selectedMythic];
  const setsPvE = [setSelectedRaidFinder, setSelectedNormal, setSelectedHeroic, setSelectedMythic];

  const editSettings = (setting, newValue) => {
    //console.log("Updating Settings" + setting + ". " + newValue);
    userSettings[setting] = newValue;
    //console.log("Settings: " + JSON.stringify(userSettings));
  };

  const unleashUpgradeFinder = () => {
    const playerSettings = props.playerSettings;
    const result = runUpgradeFinder(props.player, contentType, currentLanguage, playerSettings, userSettings);
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
          <UpgradeFinderSimC player={props.player} simcSnack={props.simcSnack} allChars={props.allChars} />
        </Grid>
        <Grid item xs={12}>
          <Settings player={props.player} userSettings={userSettings} editSettings={editSettings} hymnalShow={true} groupBuffShow={true} autoSocket={true} />
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

            <Grid container justify="center" spacing={1}>
              {raidDifficulty.map((key, i) => (
                <Grid item xs="auto" key={i}>
                  <ToggleButton
                    classes={{
                      root: classes.red,
                      selected: classes.selectedRed,
                    }}
                    value="check"
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
          <Paper elevation={0} style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>
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
              defaultValue={6}
              step={null}
              valueLabelDisplay="off"
              marks={marks}
              max={12}
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
            <Button variant="contained" color="secondary" align="center" style={{ height: "68%", width: "180px" }} disabled={!getUpgradeFinderReady(props.player)} onClick={unleashUpgradeFinder}>
              {t("TopGear.GoMsg")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
