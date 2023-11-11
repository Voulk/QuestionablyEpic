import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import HelpText from "../SetupAndMenus/HelpText";
import UpgradeFinderSlider from "./Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { runUpgradeFinder } from "./UpgradeFinderEngine";
import { runUpgradeFinderBC } from "./UpgradeFinderEngineBC";
// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { generateReportCode } from "General/Modules/TopGear/Engine/TopGearEngineShared";

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
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "95%",
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "80%",
      marginTop: 44,
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "70%",
      marginTop: 0,
    },
    [theme.breakpoints.up("lg")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "60%",
      marginTop: 0,
    },
  },
}));

/* ---------------------------------------------------------------------------------------------- */
/*                                        Retail Constants                                        */
/* ---------------------------------------------------------------------------------------------- */

/* ---------------------------------- Retail Raid Difficulties ---------------------------------- */
const raidDifficulty = ["Raid Finder", "Raid Finder (Max)", "Normal", "Normal (Max)", "Heroic", "Heroic (Max)", "Mythic", "Mythic (Max)"];

/* -------------------------------------- Retail PVP Ranks -------------------------------------- */

const PvPRating = [
  { value: 0, label: "Unranked" },
  { value: 600, label: "Combatant I" },
  { value: 800, label: "Combatant II" },
  { value: 1000, label: "Challenger I" },
  { value: 1200, label: "Challenger II" },
  { value: 1400, label: "Rival I" },
  { value: 1600, label: "Rival II" },
  { value: 1800, label: "Duelist 2100+" },
  { value: 2000, label: "Elite 2400+" },
];



function shortenReport(player, contentType, result, settings) {
  const now = new Date();
  const date = now.getUTCFullYear() + " - " + (now.getUTCMonth() + 1) + " - " + now.getUTCDate();

  const socketSetting = settings.topGearAutoGem.value || false;
  
  
  const report = { id: generateReportCode(), dateCreated: date, playername: player.charName, realm: player.realm, region: player.region, 
                    autoGem: socketSetting, spec: player.spec, contentType: contentType, results: result.differentials };
  return report;
}

const sendReport = (shortReport) => {
  const requestOptions = {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shortReport),
  };
  console.log(shortReport);
  fetch("https://questionablyepic.com/api/addUpgradeReport.php", requestOptions).then((response) => console.log(response));
};

/* ---------------------------------------------------------------------------------------------- */
/*                                    Burning Crusade Constants                                   */
/* ---------------------------------------------------------------------------------------------- */

/* ---------------------------- Burning Crusade Dungeon Difficulties ---------------------------- */
// const burningCrusadeDungeonDifficulty = ["Normal", "Heroic"];

export default function UpgradeFinderFront(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const contentType = useSelector((state) => state.contentType);
  const userSettings = useSelector((state) => state.playerSettings);
  const gameType = useSelector((state) => state.gameType);
  const helpBlurb = t("UpgradeFinderFront.HelpText");
  const helpText =
    gameType === "Retail"
      ? [
          "Insert a SimC string to automatically import your gear.",
          "(Optional) Use the settings panel to make further customizations.",
          "Select a raid difficulty, Mythic+ level and PVP rating. If you don't play any particular content type, feel free to set it to 0.",
          "Hit Go at the bottom of the page.",
        ]
      : [
          "Insert a QE Import string to automatically import your gear.",
          "(Optional) Use the settings panel to set specific gem types, enchants and how much value to put on extra mana.",
          "Select a dungeon difficulty, and (optionally) a PVP rating.",
          "Hit Go at the bottom of the page.",
        ];

  const marks = [
    {
      value: 0,
      label: (
        <div className={classes.labels}>
          <div>lvl 441</div>
          <div>M 2</div>
        </div>
      ),
    },
    {
      value: 1,
      label: (
        <div className={classes.labels}>
          <div>lvl 444</div>
          <div>M 3/4</div>
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div className={classes.labels}>
          <div>lvl 447</div>
          <div>M 5/6</div>
        </div>
      ),
    },
    {
      value: 3,
      label: (
        <div className={classes.labels}>
          <div>lvl 450</div>
          <div>M 7/8</div>
        </div>
      ),
    },
    {
      value: 4,
      label: (
        <div className={classes.labels}>
          <div>lvl 454</div>
          <div>M 9/10</div>
        </div>
      ),
    },
    {
      value: 5,
      label: (
        <div className={classes.labels}>
          <div>lvl 457</div>
          <div>M 11/12</div>
        </div>
      ),
    },
    {
      value: 6,
      label: (
        <div className={classes.labels}>
          <div>lvl 460</div>
          <div>M 13/14</div>
        </div>
      ),
    },
    {
      value: 7,
      label: (
        <div className={classes.labels}>
          <div>lvl 463</div>
          <div>M 15/16</div>
        </div>
      ),
    },
    {
      value: 8,
      label: (
        <div className={classes.labels}>
          <div>lvl 467</div>
          <div>M 17/18</div>
        </div>
      ),
    },
    {
      value: 9,
      label: (
        <div className={classes.labels}>
          <div>lvl 470</div>
          <div>M 19/20</div>
        </div>
      ),
    },
    {
      value: 10,
      label: (
        <div className={classes.labels}>
          <div>lvl 473</div>
        </div>
      ),
    },
    {
      value: 11,
      label: (
        <div className={classes.labels}>
          <div>lvl 476</div>
        </div>
      ),
    },
    {
      value: 12,
      label: (
        <div className={classes.labels}>
          <div>lvl 480</div>
        </div>
      ),
    },
    {
      value: 13,
      label: (
        <div className={classes.labels}>
          <div>lvl 483</div>
        </div>
      ),
    },
  ];

  const [dungeonBC, setDungeonBC] = React.useState("Heroic");

  const handleContent = (event, content) => {
    if (content !== null) {
      setDungeonBC(content);
      props.setBCDungeonDifficulty(event, content);
    }
  };

  const [selected, setSelected] = React.useState(raidDifficulty.reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));

  const toggleSelected = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const editSettings = (setting, newValue) => {
    userSettings[setting] = newValue;
  };

  const unleashUpgradeFinder = () => {
    if (gameType === "Retail") {
      const playerSettings = props.playerSettings;
      const result = runUpgradeFinder(props.player, contentType, currentLanguage, playerSettings, userSettings);
      const shortReport = shortenReport(props.player, result.contentType, result, userSettings);
      sendReport(shortReport);
      props.setItemSelection(result);
      props.setReport(shortReport);
      props.setShowReport(true);
    } else if (gameType === "Classic") {
      const playerSettings = props.playerSettings;
      const result = runUpgradeFinderBC(props.player, contentType, currentLanguage, playerSettings, userSettings);
      props.setItemSelection(result);
      props.setShowReport(true);
    }

    //history.push("/UpgradeFinderReport/");
  };

  const getSimCStatus = (player) => {
    if (player.activeItems.length === 0) return "Missing";
    else if (checkCharacterValid(player) === false) return "Invalid";
    else return "Good";
  };

  /*
  const checkCharacterValid = (player) => {
    const weaponSet = player.getActiveItems("AllMainhands", false, true);
    const weapon = weaponSet.length > 0 ? weaponSet[0] : "";

    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
  }; */

  const checkCharacterValid = (player, gameType) => {
    const weaponSet = player.getActiveItems("AllMainhands", false, true);
    const weapon = weaponSet.length > 0 ? weaponSet[0] : "";
    if (gameType === "Retail") {
      return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
    } else if (gameType === "Classic") {
      return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 16) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 17);
    }
  };

  const getUpgradeFinderReady = (player) => {
    return getSimCStatus(player) === "Good" && (props.playerSettings.raid.length > 0 || gameType == "Classic");
  };

  return (
    <div className={classes.header}>
      <div style={{ height: 96 }} />
      <Typography variant="h4" color="primary" align="center" style={{ padding: "10px 10px 5px 10px" }}>
        {t("UpgradeFinderFront.Header")}
      </Typography>

      <Grid container spacing={1}>
        {/* ---------------------------- Help Text Section --------------------------- */}
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={true} />
        </Grid>
        <Grid item xs={12}>
          <CharacterPanel
            player={props.player}
            simcSnack={props.simcSnack}
            allChars={props.allChars}
            contentType={contentType}
            singleUpdate={props.singleUpdate}
            hymnalShow={true}
            groupBuffShow={true}
            autoSocket={true}
          />
        </Grid>
        {/* ------------------------------ Raid Section ------------------------------ */}

        {gameType === "Retail" ? (
          <Grid item xs={12}>
            <Paper elevation={0} style={{ width: "80%", margin: "auto" }}>
              <div style={{ padding: 8 }}>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12}>
                    <Typography color="primary" align="center" variant="h5">
                      {t("UpgradeFinderFront.RaidDifficultyHeader")}
                    </Typography>
                    <Grid item xs={12}>
                      <Typography align="center">{t("UpgradeFinderFront.RaidDifficultyBody")}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={1} columns={8}>
                  {raidDifficulty.map((key, i) => (
                    <Grid item xs={2} key={i} style={{ order: i % 2 === 0 ? 0 : 1 }}>
                      <Grid container justifyContent="center" spacing={1}>
                        <Grid item xs={12}>
                          <ToggleButton
                            classes={{
                              root: classes.red,
                              selected: classes.selectedRed,
                            }}
                            value="check"
                            fullWidth
                            selected={props.playerSettings.raid.includes(i)}
                            style={{ height: 40 }}
                            onChange={() => {
                              toggleSelected(key);
                              props.setRaidDifficulty(i);
                            }}
                          >
                            {t("RaidDifficulty." + key)}
                          </ToggleButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Paper>
          </Grid>
        ) : (
          ""
        )}

        {/* -------------------------------------- Dungeon Settings -------------------------------------- */}

        {gameType === "Retail" ? (
          /* ---------------------------------------------------------------------------------------------- */
          /*                                  Retail Mythic Dungeon Section                                 */
          /* ---------------------------------------------------------------------------------------------- */

          <Grid item xs={12}>
            <Paper elevation={0} style={{ textAlign: "center", width: "80%", margin: "auto" }}>
              <div style={{ padding: 8 }}>
                <Grid container justifyContent="center" spacing={1}>
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
                  defaultValue={8}
                  step={null}
                  valueLabelDisplay="off"
                  marks={marks}
                  max={14}
                  change={props.setDungeonDifficulty}
                />
              </div>
            </Paper>
          </Grid>
        ) : (
          /* ---------------------------------------------------------------------------------------------- */
          /*                                 Burning Crusade Dungeon Section                                */
          /* ---------------------------------------------------------------------------------------------- */

          <Grid item xs={12}>
            <Paper elevation={0} style={{ textAlign: "center", width: "80%", margin: "auto" }}>
              <div style={{ padding: 8 }}>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12}>
                    <Typography color="primary" align="center" variant="h5">
                      {t("Dungeon")}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container justifyContent="center">
                  <ToggleButtonGroup value={dungeonBC} exclusive onChange={handleContent} aria-label="contentToggle" size="large">
                    <ToggleButton style={{ padding: "15px 30px" }} value="Normal" aria-label="dungeonLabel">
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="button">{t("RaidDifficulty.Normal")}</Typography>
                      </div>
                    </ToggleButton>

                    <ToggleButton style={{ padding: "15px 30px" }} value="Heroic" aria-label="raidLabel">
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="button">{t("RaidDifficulty.Heroic")}</Typography>
                      </div>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </div>
            </Paper>
          </Grid>
        )}
        {/* ------------------------------- PvP Section ------------------------------ */}
        {/*<Grid item xs={12}>
          <Paper elevation={0} style={{ width: "80%", margin: "auto" }}>
            <div style={{ padding: 8 }}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                  <Typography color="primary" align="center" variant="h5">
                    {t("UpgradeFinderFront.PvPHeader")}
                  </Typography>
                  <Grid item xs={12}>
                    <Typography align="center">{t("UpgradeFinderFront.PvPBody")}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container justifyContent="center" spacing={1} style={{ marginTop: "10px 10px 0px 10px" }}>
                <Grid item style={{ textAlign: "center" }} xs={12}>
                  <UpgradeFinderSlider
                    className={classes.slider}
                    style={{ color: "#af5050" }}
                    defaultValue={0}
                    step={null}
                    valueLabelDisplay="off"
                    marks={PvPRating}
                    max={2000}
                    change={props.setPVPDifficulty}
                  />
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid> */}
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
            padding: 8,
          }}
        >
          <div>
            <Button variant="contained" color="primary" align="center" style={{ height: "68%", width: "180px" }} disabled={!getUpgradeFinderReady(props.player)} onClick={unleashUpgradeFinder}>
              {t("TopGear.GoMsg")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
