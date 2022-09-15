import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper, AppBar, Tabs, Tab, Box } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { raidDB } from "../../CooldownPlanner/Data/CooldownPlannerBossList";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, filterClassicItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import i18n from "i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
  karazhanHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/Karazhan.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  gruulsHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/Gruul&Mag.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  zulamanHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/ZulAman.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  magtheridonHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/MagtheridonsLair.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  serpentshringHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/SerpentshrineCavern.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  tempestKeepHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/TempestKeep.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  mountHyjalHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/MountHyjal.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  blackTempleHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/BlackTemple.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  sunwellHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/SunwellPlateau.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  sunwellHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/SunwellPlateau.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  sunwellHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/Classic/Raid/SunwellPlateau.jpg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  nathriaHeader: {
    backgroundImage: `url(${require("../../../../Images/Bosses/CastleNathria/loadingScreenArt.png").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  sepulcherHeader: {
    backgroundImage: `url(${require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesHeader.png").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  sanctumHeader: {
    backgroundImage: `url(${require("Images/Bosses/SanctumOfDomination/SanctumArt.png").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "101%",
    borderRadius: "4px 0px 0px 4px",
    height: 45,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "0.9rem",
  },
  header: {
    [theme.breakpoints.down("lg")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      flexGrow: 1,
      maxWidth: "100%",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      flexGrow: 1,
      maxWidth: "100%",
    },
  },
}));

const getDifficultyName = (difficulty) => {
  switch (difficulty) {
    case 0:
      return "LFR";
    case 1:
      return "Normal";
    case 2:
      return "Heroic";
    case 3:
      return "Mythic";
  }
};

const getDifficultyBaseLevel = (difficulty) => {
  switch (difficulty) {
    case 0:
      return 265;
    case 1:
      return 278;
    case 2:
      return 291;
    case 3:
      return 304;
  }
};

const raidImage = (raidID) => {
  switch (raidID) {
    case 1190:
      return require("Images/Bosses/CastleNathria/CastleNathriaBackground.png").default;
    case 1193:
      return require("Images/Bosses/SanctumOfDomination/SanctumBackground.png").default;
    case 1195:
      return require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesBackground.png").default;
    default:
      return require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesBackground.png").default;
  }
};
export default function RaidGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const gameType = useSelector((state) => state.gameType);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && <Box p={0}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [tabvalue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTranslatedRaidName = (raid) => {
    const raidName = raidDB.filter((obj) => {
      return obj.raidID === raid;
    })[0]["name"][currentLanguage];

    return raidName;
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Shadowlands                                          */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGenerator = () => {
    // Raid Panel
    const shadowlandsList = [1190, 1193, 1195];
    const difficulties = props.playerSettings.raid;

    difficulties.sort().reverse();
    const firstDifficulty = difficulties[0];
    const secondDifficulty = difficulties.length === 2 ? difficulties[1] : -1;
    const retailBossList = Array.from(Object.keys(encounterDB[1195].bosses));

    return (
      <Grid item xs={12}>
        <div className={classes.header}>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "#000",
                  borderRadius: "4px 4px 4px 4px",
                }}
                elevation={1}
              >
                <Tabs
                  value={tabvalue}
                  onChange={handleTabChange}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.22)" }}
                  TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
                >
                  {/* ------------------------------------------ Karazhan ------------------------------------------ */}
                  <Tab className={classes.nathriaHeader} label={getTranslatedRaidName(1190)} {...a11yProps(0)} />
                  {/* ---------------------------------------- Gruul's Lair ---------------------------------------- */}
                  <Tab className={classes.sanctumHeader} label={getTranslatedRaidName(1193)} {...a11yProps(1)} />
                  {/* ------------------------------------ Serpentshrine Cavern ------------------------------------ */}
                  <Tab className={classes.sepulcherHeader} label={getTranslatedRaidName(1195)} {...a11yProps(2)} />
                </Tabs>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              {shadowlandsList.map((raidID, index) => (
                <TabPanel key={"panel" + index} value={tabvalue} index={index}>
                  <div className={classes.panel}>
                    <Grid container spacing={1}>
                      {encounterDB[raidID].bossOrder
                        //.filter((key) => key === raidID)
                        .map((key, i) => (
                          <Grid item xs={12} key={"bossContainer-" + i}>
                            <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
                              <Grid container>
                                <Grid item xs={12} sm="auto">
                                  <div
                                    style={{
                                      width: 175,
                                      height: "100%",
                                      paddingLeft: 8,
                                      // background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))", `url(${require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesBackground.png").default})`,
                                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${raidImage(raidID)})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "center 60%",
                                      backgroundSize: "auto 100%",
                                      // backgroundColor: "rgba(0,0,0,0.5)",
                                    }}
                                    className="container-UpgradeCards"
                                  >
                                    <img
                                      src={UpgradeFinderBossImages(parseInt(key))}
                                      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxHeight: "90%", maxWidth: "90%" }}
                                    />
                                    <Typography variant="h6" style={{ width: "100%" }} className="centered-UpgradeCards">
                                      {encounterDB[raidID].bosses[key].name[currentLanguage]}
                                    </Typography>
                                  </div>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={12} sm container direction="row" style={{ padding: 8 }} spacing={1}>
                                  <Grid item xs={12} container spacing={1}>
                                    <Grid item xs={12}>
                                      <Typography
                                        variant="h6"
                                        color="primary"
                                        align="center"
                                        style={{
                                          backgroundColor: "#35383e",
                                          borderRadius: 4,
                                        }}
                                      >
                                        {getDifficultyName(firstDifficulty)}
                                      </Typography>
                                    </Grid>

                                    {[...filterItemListBySource(itemList, raidID, key, getDifficultyBaseLevel(firstDifficulty))].map((item, index) => (
                                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                    ))}
                                  </Grid>

                                  {secondDifficulty !== -1 ? (
                                    <Grid item xs={12} container spacing={1}>
                                      <Grid item xs={12}>
                                        <Typography
                                          variant="h6"
                                          color="primary"
                                          align="center"
                                          style={{
                                            backgroundColor: "#35383e",
                                            borderRadius: 4,
                                          }}
                                        >
                                          {getDifficultyName(secondDifficulty)}
                                        </Typography>
                                      </Grid>

                                      {[...filterItemListBySource(itemList, raidID, key, getDifficultyBaseLevel(secondDifficulty))].map((item, index) => (
                                        <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                      ))}
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Burning Crusade                                        */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGeneratorBC = () => {
    // Raid Panel

    const burningCrusadeList = [
      754, // Naxxramas
      756, // The Eye of Eternity
      759, // Ulduar
      753, // Vault of Archavon
      755, // The Obsidian Sanctum
      760, // Onyxia's Lair
      757, // Trial of the Crusader
      761, // The Ruby Sanctum
      758, // Icecrown Citadel
    ];

    return (
      <Grid item xs={12}>
        <div className={classes.header}>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "#000",
                  borderRadius: "4px 4px 4px 4px",
                }}
                elevation={1}
              >
                <Tabs
                  value={tabvalue}
                  onChange={handleTabChange}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.22)" }}
                  TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
                >
                  {/* ------------------------------------------ Karazhan ------------------------------------------ */}
                  <Tab className={classes.karazhanHeaderStyle} label={encounterDB[754].name[currentLanguage]} {...a11yProps(0)} />
                  {/* ---------------------------------------- Gruul's Lair ---------------------------------------- */}
                  <Tab className={classes.gruulsHeaderStyle} label={encounterDB[756].name[currentLanguage]} {...a11yProps(1)} />
                  {/* ------------------------------------ Serpentshrine Cavern ------------------------------------ */}
                  <Tab className={classes.serpentshringHeaderStyle} label={encounterDB[759].name[currentLanguage]} {...a11yProps(2)} />
                  {/* ---------------------------------------- Tempest Keep ---------------------------------------- */}
                  <Tab className={classes.tempestKeepHeaderStyle} label={encounterDB[753].name[currentLanguage]} {...a11yProps(3)} />
                  {/* --------------------------------- The Battle for Mount Hyjal --------------------------------- */}
                  <Tab className={classes.mountHyjalHeaderStyle} label={encounterDB[755].name[currentLanguage]} {...a11yProps(4)} />
                  {/* ---------------------------------------- Black Temple ---------------------------------------- */}
                  <Tab className={classes.blackTempleHeaderStyle} label={encounterDB[760].name[currentLanguage]} {...a11yProps(5)} />
                  {/* ------------------------------------------ Zul'Aman ------------------------------------------ */}
                  <Tab className={classes.zulamanHeaderStyle} label={encounterDB[757].name[currentLanguage]} {...a11yProps(6)} />
                  {/* --------------------------------------- Sunwell Plateau -------------------------------------- */}
                  <Tab className={classes.sunwellHeaderStyle} label={encounterDB[761].name[currentLanguage]} {...a11yProps(7)} />
                  <Tab label={encounterDB[758].name[currentLanguage]} {...a11yProps(8)} />
                </Tabs>
              </AppBar>
            </Grid>

            <Grid item xs={12}>
              {burningCrusadeList.map((raidID, index) => (
                <TabPanel key={"panel" + index} value={tabvalue} index={index}>
                  <div className={classes.panel}>
                    <Grid container spacing={1}>
                      {/* <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} /> */}
                      {encounterDB[raidID].bossOrder
                        //filter((key) => key === raidID)
                        .map((key, i) => (
                          <Grid item xs={12} key={"bossContainer-" + i}>
                            <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
                              <Grid container justifyContent="center" alignItems="flex-start">
                                <Grid item style={{ alignSelf: "center" }}>
                                  <div
                                    style={{
                                      width: 175,
                                      height: 181,
                                      backgroundImage: `url(${UpgradeFinderBossImages(parseInt(key))})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "center 60%",
                                      backgroundSize: "auto 100%",
                                    }}
                                    className="container-UpgradeCards"
                                  >
                                    <Typography variant="button" noWrap className="centered-UpgradeCards">
                                      {encounterDB[raidID].bosses[key].name[currentLanguage]}
                                    </Typography>
                                  </div>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={12} sm container style={{ padding: 8 }} spacing={1}>
                                  {[...filterClassicItemListBySource(itemList, raidID, parseInt(key))].map((item, index) => (
                                    <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                  ))}
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {gameType === "Retail" ? contentGenerator() : contentGeneratorBC()}
      </Grid>
    </div>
  );
}
