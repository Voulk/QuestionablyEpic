import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper, AppBar, Tabs, Tab, Box } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, filterBCItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
  karazhanHeaderStyle: {
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/Karazhan.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/Gruul&Mag.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/ZulAman.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/MagtheridonsLair.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/SerpentshrineCavern.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/TempestKeep.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/MountHyjal.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/BlackTemple.jpg").default})`,
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
    backgroundImage: `url(${require("../../../../Images/BurningCrusade/Raid/SunwellPlateau.jpg").default})`,
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
      return 213;
    case 1:
      return 226;
    case 2:
      return 239;
    case 3:
      return 252;
  }
};

export default function RaidGearContainer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const gameType = useSelector((state) => state.gameType);

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Shadowlands                                          */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGenerator = () => {
    // Raid Panel
    const difficulties = props.playerSettings.raid;
    difficulties.sort().reverse();
    const firstDifficulty = difficulties[0];
    const secondDifficulty = difficulties.length === 2 ? difficulties[1] : -1;

    return (
      encounterDB[1195]
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
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
                        require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesBackground.png").default
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center 60%",
                      backgroundSize: "auto 100%",
                      // backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    className="container-UpgradeCards"
                  >
                    <img src={UpgradeFinderBossImages(key)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxHeight: "90%", maxWidth: "90%" }} />
                    <Typography variant="h6" style={{ width: "100%" }} className="centered-UpgradeCards">
                      {t("BossNames." + key)}
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

                    {[...filterItemListBySource(itemList, 1193, key, getDifficultyBaseLevel(firstDifficulty))].map((item, index) => (
                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                    ))}
                  </Grid>

                  {secondDifficulty !== -1 ? (
                    <Grid item xs={12} sm container spacing={1}>
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

                      {[...filterItemListBySource(itemList, 1193, key, getDifficultyBaseLevel(secondDifficulty))].map((item, index) => (
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
        ))
    );
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Burning Crusade                                        */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGeneratorBC = () => {
    // Raid Panel

    const burningCrusadeList = [745, 746, 748, 749, 750, 751, 321, 752];
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
                  <Tab className={classes.karazhanHeaderStyle} label={t("BurningCrusade.Raids.745")} {...a11yProps(0)} />
                  {/* ---------------------------------------- Gruul's Lair ---------------------------------------- */}
                  <Tab className={classes.gruulsHeaderStyle} label={t("BurningCrusade.Raids.746")} {...a11yProps(1)} />
                  {/* ------------------------------------ Serpentshrine Cavern ------------------------------------ */}
                  <Tab className={classes.serpentshringHeaderStyle} label={t("BurningCrusade.Raids.748")} {...a11yProps(2)} />
                  {/* ---------------------------------------- Tempest Keep ---------------------------------------- */}
                  <Tab className={classes.tempestKeepHeaderStyle} label={t("BurningCrusade.Raids.749")} {...a11yProps(3)} />
                  {/* --------------------------------- The Battle for Mount Hyjal --------------------------------- */}
                  <Tab className={classes.mountHyjalHeaderStyle} label={t("BurningCrusade.Raids.750")} {...a11yProps(4)} />
                  {/* ---------------------------------------- Black Temple ---------------------------------------- */}
                  <Tab className={classes.blackTempleHeaderStyle} label={t("BurningCrusade.Raids.751")} {...a11yProps(5)} />
                  {/* ------------------------------------------ Zul'Aman ------------------------------------------ */}
                  <Tab className={classes.zulamanHeaderStyle} label={t("BurningCrusade.Raids.321")} {...a11yProps(6)} />
                  {/* --------------------------------------- Sunwell Plateau -------------------------------------- */}
                  <Tab className={classes.sunwellHeaderStyle} label={t("BurningCrusade.Raids.752")} {...a11yProps(7)} />
                </Tabs>
              </AppBar>
            </Grid>

            <Grid item xs={12}>
              {burningCrusadeList.map((raidID, index) => (
                <TabPanel key={"panel" + index} value={tabvalue} index={index}>
                  <div className={classes.panel}>
                    <Grid container spacing={1}>
                      {/* <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} /> */}
                      {encounterDB[raidID]
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
                                      backgroundImage: `url(${UpgradeFinderBossImages(key)})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "center 60%",
                                      backgroundSize: "auto 100%",
                                    }}
                                    className="container-UpgradeCards"
                                  >
                                    <Typography variant="button" noWrap className="centered-UpgradeCards">
                                      {t("BurningCrusade.BossNames." + key)}
                                    </Typography>
                                  </div>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={12} sm container style={{ padding: 8 }} spacing={1}>
                                  {[...filterBCItemListBySource(itemList, raidID, key)].map((item, index) => (
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
