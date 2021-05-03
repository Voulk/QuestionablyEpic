import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Paper, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { encounterDB } from "../../Player/InstanceDB";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

const getDifficultyName = (difficulty) => {
  switch (difficulty) {
    case 0:
      return "LFR";
      break;
    case 1:
      return "Normal";
      break;
    case 2:
      return "Heroic";
      break;
    case 3:
      return "Mythic";
      break;
  }
};

const getDifficultyBaseLevel = (difficulty) => {
  switch (difficulty) {
    case 0:
      return 187;
      break;
    case 1:
      return 200;
      break;
    case 2:
      return 213;
      break;
    case 3:
      return 226;
      break;
  }
};

export default function RaidGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const gameType = useSelector((state) => state.gameType);

  const contentGenerator = (items) => {
    // Raid Panel
    const difficulties = props.playerSettings.raid;
    difficulties.sort().reverse();
    const firstDifficulty = difficulties[0];
    const secondDifficulty = difficulties.length === 2 ? difficulties[1] : -1;

    return (
      encounterDB[1190]
        //.filter((key) => key === raidID)
        .map((key, i) => (
          <Grid item xs={12} key={"bossContainer-" + i} style={{ padding: "4px 0px" }}>
            <Paper style={{ backgroundColor: "#191c23", padding: 8, border: "1px solid rgba(255, 255, 255, 0.22)" }}>
              <Grid container spacing={2} justify="center" alignItems="flex-start">
                <Grid item style={{ alignSelf: "center" }}>
                  <div
                    style={{
                      width: 175,
                      height: 181,
                      paddingLeft: 8,
                      backgroundImage: `url(${UpgradeFinderBossImages(key)})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center 60%",
                      backgroundSize: "auto 100%",
                    }}
                    className="container-UpgradeCards"
                  >
                    <Typography variant="h6" noWrap className="centered-UpgradeCards">
                      {t("BossNames." + key)}
                    </Typography>
                  </div>
                </Grid>
                <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
                <Grid item xs={12} sm container direction="column" spacing={1}>
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

                    {[...filterItemListBySource(itemList, 1190, key, getDifficultyBaseLevel(firstDifficulty))].map((item, index) => (
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

                      {[...filterItemListBySource(itemList, 1190, key, getDifficultyBaseLevel(secondDifficulty))].map((item, index) => (
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

  const contentGeneratorBC = (items) => {
    // Raid Panel

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
      <div>
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
            {/* Karazhan */}
            <Tab className={classes.raidHeaderStyle} label={t("UpgradeFinder.CurrentRaid")} {...a11yProps(0)} />
            {/* Gruul's Lair */}
            <Tab className={classes.mythicPlusHeaderStyle} label={t("UpgradeFinder.MythicPlus")} {...a11yProps(1)} />
            {/* PVP */}
            <Tab className={classes.pvpHeaderStyle} label={t("UpgradeFinder.PvP")} {...a11yProps(2)} />
            {/* World Bosses */}
            <Tab className={classes.worldBossHeaderStyle} label={t("UpgradeFinder.WorldBosses")} {...a11yProps(3)} />
            {/* Slots */}
            <Tab className={classes.slotsHeaderStyle} label={t("UpgradeFinder.UpgradeBySlot")} {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabvalue} index={0}>
          <div className={classes.panel}>
            <Grid container>
              {/* <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} /> */}
              {encounterDB[745]
                //filter((key) => key === raidID)
                .map((key, i) => (
                  <Grid item xs={12} key={"bossContainer-" + i} style={{ padding: "4px 0px" }}>
                    <Paper style={{ backgroundColor: "#191c23", padding: 8, border: "1px solid rgba(255, 255, 255, 0.22)" }}>
                      <Grid container spacing={2} justify="center" alignItems="flex-start">
                        <Grid item style={{ alignSelf: "center" }}>
                          <div
                            style={{
                              width: 175,
                              height: 181,
                              paddingLeft: 8,
                              backgroundImage: `url(${UpgradeFinderBossImages(key)})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center 60%",
                              backgroundSize: "auto 100%",
                            }}
                            className="container-UpgradeCards"
                          >
                            <Typography variant="h6" noWrap className="centered-UpgradeCards">
                              {t("BossNames." + key)}
                            </Typography>
                          </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
                        <Grid item xs={12} sm container direction="column" spacing={1}>
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
                                {/* {getDifficultyName(firstDifficulty)} */}
                              </Typography>
                            </Grid>

                            {/* {[...filterItemListBySource(itemList, 1190, key, getDifficultyBaseLevel(firstDifficulty))].map((item, index) => (
                        <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                      ))} */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </div>
        </TabPanel>
      </div>
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
