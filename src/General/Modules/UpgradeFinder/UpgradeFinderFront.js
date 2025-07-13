import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Paper, Grid, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import HelpText from "../SetupAndMenus/HelpText";
import UpgradeFinderSlider from "./Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { runUpgradeFinder } from "./UpgradeFinderEngine";
import { runUpgradeFinderBC } from "./UpgradeFinderEngineClassic";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { generateReportCode } from "General/Modules/TopGear/Engine/TopGearEngineShared";
import ReactGA from "react-ga";
import { itemLevels } from "Databases/ItemLevelsDB";
import { trackPageView } from "Analytics";
import IconHeader from "./IconHeader";

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

/*const craftedItemLevels = [
  { value: 0, label: "590" },
  { value: 1, label: "606" },
  { value: 2, label: "616" },
  { value: 3, label: "622" },
  { value: 4, label: "626" },
  { value: 5, label: "636" },
]*/

const craftedItemLevels = itemLevels.crafted.map((label, index) => ({ value: index, label }));

const craftedOptions = [
  "Crit / Mastery",
  "Crit / Haste",
  "Crit / Versatility",
  "Haste / Mastery",
  "Haste / Versatility",
  "Mastery / Versatility",
]

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


// playerSettings = Upgrade Finder specific settings. userSettings = playerSettings everywhere else.
function shortenReport(player, contentType, result, ufSettings, settings) {
  const now = new Date();
  const date = now.getUTCFullYear() + " - " + (now.getUTCMonth() + 1) + " - " + now.getUTCDate();

  const socketSetting = settings.topGearAutoGem.value || false;
  
  // Equipped items
  const equippedItems = player.activeItems.filter((item) => item.isEquipped);
  
  const report = { id: generateReportCode(), dateCreated: date, playername: player.charName, realm: player.realm, region: player.region, 
                    autoGem: socketSetting, spec: player.spec, contentType: contentType, results: result.differentials, ufSettings: ufSettings, 
                    equippedItems: equippedItems, gameType: player.gameType };
  return report;
}

const sendReport = (shortReport) => {
  const requestOptions = {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shortReport),
  };
  fetch("https://questionablyepic.com/api/addUpgradeReport.php", requestOptions).then((response) => console.log(response));
};

/* ---------------------------------------------------------------------------------------------- */

/*                                    Burning Crusade Constants                                   */
/* ---------------------------------------------------------------------------------------------- */

/* ---------------------------- Burning Crusade Dungeon Difficulties ---------------------------- */
// const burningCrusadeDungeonDifficulty = ["Normal", "Heroic"];

const mythicPlusLevels = [
  { value: 636, label: "M0" },
  { value: 639, label: "+2/3" },
  { value: 642, label: "+4" },
  { value: 645, label: "+5" },
  { value: 649, label: "+6/7" },
  { value: 652, label: "+8/9" },
  { value: 655, label: "+10" },
  { value: 658, label: "Vault" },
  { value: 665, label: "" },
  { value: 671, label: "" },
  { value: 678, label: "" },
  { value: 684, label: "" },


]

export default function UpgradeFinderFront(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const contentType = useSelector((state) => state.contentType);
  const userSettings = useSelector((state) => state.playerSettings);
  const gameType = useSelector((state) => state.gameType);
  const helpBlurb = t("UpgradeFinderFront.HelpText");

  const [ufSettings, setUFSettings] = React.useState({ raid: [5, 7], dungeon: gameType === "Retail" ? 6 : 1, pvp: 0, craftedLevel: 5, craftedStats: "Crit / Haste" });

  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
  }, []);


  const setRaidDifficulty = (difficulty) => {
    let currDiff = ufSettings.raid;
    let difficultyIndex = currDiff.indexOf(difficulty);
    if (difficultyIndex > -1) currDiff.splice(difficultyIndex, 1);
    else {
      currDiff.push(difficulty);
      if (currDiff.length > 2) currDiff.splice(0, 1);
  }
    setUFSettings({ ...ufSettings, raid: currDiff });
  };

  const changeCraftedStats = (event) => {
    setUFSettings({ ...ufSettings, craftedStats: event.target.value });
  }

  const setCraftedLevel = (event, newLevel) => {
    setUFSettings({ ...ufSettings, craftedLevel: newLevel });
  }

  const setDungeonDifficulty = (event, difficulty) => {
    if (difficulty <= 11 && difficulty >= 0) setUFSettings({ ...ufSettings, dungeon: difficulty });
  };

  const setBCDungeonDifficulty = (event, difficulty) => {
    if (difficulty === "Heroic") {
      setUFSettings({ ...ufSettings, dungeon: 1 });
    } else {
      setUFSettings({ ...ufSettings, dungeon: 0 });
    }
  };

  const setPVPDifficulty = (event, rating) => {
    let newRank = -1;
    switch (rating) {
      case 0:
        newRank = 0;
        break;

      case 600:
        newRank = 1;
        break;

      case 800:
        newRank = 2;
        break;

      case 1000:
        newRank = 3;
        break;

      case 1200:
        newRank = 4;
        break;

      case 1400:
        newRank = 5;
        break;
      case 1600:
        newRank = 6;
        break;

      case 1800:
        newRank = 7;
        break;

      case 2000:
        newRank = 8;
        break;
    }

    if (newRank <= 8 && newRank >= 0) setUFSettings({ ...ufSettings, pvp: newRank });
  };

  const player = props.player;
  const allChars = props.allChars;
  const simcSnack = props.simcSnack;


  let history = useHistory();
  const helpText =
    gameType === "Retail"
      ? [
          "Insert a SimC string to automatically import your gear.",
          "(Optional) Use the settings panel to make further customizations.",
          "Select a raid difficulty and Mythic+ level.",
          "Hit Go at the bottom of the page.",
        ]
      : [
          "Insert a QE Import string to automatically import your gear.",
          "(Optional) Use the settings panel to set specific gem types, enchants and how much value to put on extra mana.",
          "Select a dungeon difficulty, and (optionally) a PVP rating.",
          "Hit Go at the bottom of the page.",
        ];

  const marks = mythicPlusLevels.map((level, index) => {
    return { value: index, 
      label: (
        <div className={classes.labels}>
          <div>{level.value}</div>
          <div>{level.label}</div>
        </div>
  )};
  });

  const [dungeonBC, setDungeonBC] = React.useState("Heroic");

  const handleContent = (event, content) => {
    if (content !== null) {
      setDungeonBC(content);
      setBCDungeonDifficulty(event, content);
      //setUFSettings({ ...ufSettings, dungeon: parseInt(content)})
    }
  };

  const [selected, setSelected] = React.useState(raidDifficulty.reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));

  const toggleSelected = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const unleashUpgradeFinder = () => {
    if (gameType === "Retail") {

      const result = runUpgradeFinder(player, contentType, currentLanguage, ufSettings, userSettings);
      const shortReport = shortenReport(player, result.contentType, result, ufSettings, userSettings);
      result.id = shortReport.id;
      sendReport(shortReport);
      shortReport.new = true;
      props.setUFResult(shortReport);
      //props.setShowReport(true);
      history.push("/upgradereport/");
    } 
    
    else if (gameType === "Classic") {
      const result = runUpgradeFinderBC(props.player, contentType, currentLanguage, ufSettings, userSettings);
      const shortReport = shortenReport(player, result.contentType, result, ufSettings, userSettings);

      result.id = shortReport.id;
      //sendReport(shortReport);
      shortReport.new = true;
      props.setUFResult(shortReport);
      //props.setShowReport(true);
      history.push("/upgradereport/");
    }

  };

  const getSimCStatus = (player) => {
    if (player.activeItems.length === 0) return "Missing";
    else if (checkCharacterValid(player) === false) return "Invalid";
    else return "Good";
  };

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
    return getSimCStatus(player) === "Good" && (ufSettings.raid.length > 0 || gameType == "Classic");
  };

  return (
    <div className={classes.header}>
      <div style={{ height: 96 }} />
      {/*<Typography variant="h4" color="primary" align="center" style={{ padding: "10px 10px 5px 10px" }}>
        {t("UpgradeFinderFront.Header")}
  </Typography> */}

      <Grid container spacing={1}>
        {/* ---------------------------- Help Text Section --------------------------- */}
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={false} />
        </Grid>
        <Grid item xs={12}>
          <CharacterPanel
            player={player}
            simcSnack={simcSnack}
            allChars={allChars}
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
            <Paper elevation={3} style={{ width: "80%", margin: "auto" }} >
              <div style={{ padding: 8 }}>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12}>
                    <IconHeader
                      icon={require("Images/Logos/RaidLogo.jpg")}
                      alt="Raid Logo"
                      text={"Raid Difficulty"}
                      />

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
                            selected={ufSettings.raid.includes(i)}
                            style={{ height: 40 }}
                            onChange={() => {
                              toggleSelected(key);
                              setRaidDifficulty(i);
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
            <Paper elevation={3} style={{ textAlign: "center", width: "80%", margin: "auto" }}>
              <div style={{ padding: 8 }}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                <IconHeader
                      icon={require("Images/inv_relics_hourglass.jpg")}
                      alt="M+ Logo"
                      text={"Mythic+ Key Level"}
                      />
                  <Grid item xs={12}>
                    <Typography align="center">
                      {t("UpgradeFinderFront.MythicPlusBody")}
                    </Typography>
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
                  max={11}
                  change={setDungeonDifficulty}
                />
              </div>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12}>
          <Typography color="whitesmoke" align="center" style={{ marginTop: 16 }}>
            {"Import your gear to run upgrade finder!"}
          </Typography>
          </Grid>
        )}

        {/* Crafted Items */}
        {gameType === "Retail" ? (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ width: "80%", margin: "auto" }}>
              <div style={{ padding: 8 }}>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12}>
                  <IconHeader
                      icon={require("Images/Logos/CraftingIcon.jpg")}
                      alt="Craft Logo"
                      text={"Crafted Gear"}
                    />
                    <Grid item xs={12}>
                      <Typography align="center">{"Pick crafted stats and item level"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

            <Grid container justifyContent="center" spacing={1} style={{ marginTop: "10px 10px 0px 10px" }}>
              {/* Add TextField component here */}
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <TextField
                  select
                  label="Secondaries"
                  value={ufSettings.craftedStats} // Provide value and onChange handler as per your requirement
                  onChange={changeCraftedStats} // Provide your handleChange function
                  variant="outlined"
                  fullWidth
                >
                  {craftedOptions.map((option => {
                    return <MenuItem key={option} value={option}>{option}</MenuItem>
                  }))}
                </TextField>
              </Grid>

            <Grid item style={{ textAlign: "center" }} xs={8}>
              <UpgradeFinderSlider
                className={classes.slider}
                style={{ color: "#af5050" }}
                defaultValue={5}
                step={null}
                valueLabelDisplay="off"
                marks={craftedItemLevels}
                max={5}
                change={setCraftedLevel}
              />
            </Grid>
          </Grid> 

          
        </div>
      </Paper>
    </Grid> ) : null}
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
            <Button variant="contained" color="primary" align="center" style={{ height: "68%", width: "180px" }} disabled={!getUpgradeFinderReady(player)} onClick={unleashUpgradeFinder}>
              {t("TopGear.GoMsg")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
