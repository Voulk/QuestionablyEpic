import React, { useEffect, useState } from "react";
import ItemCardReport from "./MiniItemCardReport";
import TopSetStatsPanel from "./TopSetStatsPanel";
import { testList, differentialsTest } from "./TestData";
import { apiGetPlayerImage } from "../SetupAndMenus/ConnectionUtilities";
import { useTranslation } from "react-i18next";
import { Button, Paper, Typography, Divider, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getItemIcon, getTranslatedItemName } from "../Engine/ItemUtilities";

function TopGearReport(props) {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    async function setImg() {
      const img = await apiGetPlayerImage(props.pl);
      setBackgroundImage(img);
    }

    setImg();
  }, []);
  const roundTo = (value, places) => {
    let power = Math.pow(10, places);
    return (Math.round(value * power) / power) * -1;
  };

  /*
  let result = props.result;

  let topSet = result.itemSet;
  let enchants = topSet.enchantBreakdown;
  console.log(enchants);
  let differentials = result.differentials;
  console.log(topSet);
  console.log(differentials);
  let itemList = topSet !== null && "itemList" in topSet ? topSet.itemList : [];

  let statList = topSet !== null && "setStats" in topSet ? topSet.setStats : {};

  */
  //console.log("Top Set: " + JSON.stringify(itemList));

  //statList = topSet.stats;
  let itemList = testList;
  let differentials = differentialsTest;
  let enchants = {
    Chest: "+30 Stats",
    Wrist: "+15 Int",
    Finger: "+16 Haste",
    Back: "+20 Stam +30 Leech",
  };

  let statList = {
    intellect: 321,
    haste: 931,
    crit: 831,
    mastery: 31,
    versatility: 91,
    leech: 49,
    hps: 911,
    dps: 893,
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "70%",
        display: "block",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <div
              style={{
                //   display: "flex",
                //   flexDirection: "row",
                justifyContent: "center",
                backgroundImage: `url("${backgroundImage}")`,
                backgroundSize: "cover",
                backgroundPositionY: "-160px",
                padding: 16,
                borderRadius: 4,
              }}
            >
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Button color="primary" component={Link} to={"/topgear"}>
                    Back to Gear Selection
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row">
                    <Grid item xs={3} style={{ width: "100%" }}>
                      {/* Left Side Items */}
                      <Grid container spacing={1}>
                        {itemList
                          .filter(
                            (key) =>
                              key.slot === "Head" ||
                              key.slot === "Neck" ||
                              key.slot === "Back" ||
                              key.slot === "Shoulder" ||
                              key.slot === "Chest" ||
                              key.slot === "Wrist" ||
                              key.slot === "CombinedWeapon"
                          )
                          .map((item, index) => (
                            <ItemCardReport
                              key={index}
                              item={item}
                              activateItem={true}
                              enchants={enchants}
                            />
                          ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ width: "40%" }} />
                    </Grid>
                    <Grid item xs={3} style={{ width: "100%" }}>
                      {/* Right Side Items */}
                      <Grid container spacing={1}>
                        {itemList
                          .filter(
                            (key) =>
                              key.slot === "Hands" ||
                              key.slot === "Waist" ||
                              key.slot === "Legs" ||
                              key.slot === "Feet" ||
                              key.slot === "Finger" ||
                              key.slot === "Trinket"
                          )
                          .map((item, index) => (
                            <ItemCardReport
                              key={index}
                              item={item}
                              activateItem={true}
                              enchants={enchants}
                            />
                          ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {/* Stat Panel */}
                  <Grid container spacing={1} direction="column">
                    <TopSetStatsPanel
                      statList={statList}
                      spec={props.pl.spec}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
        {/* Alternate Sets here */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }} elevation={0}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ width: "100%" }}
                  color="primary"
                >
                  Competitive Alternatives
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {differentials.map((key) => (
                    <Grid item xs={3}>
                      <Paper
                        elevation={0}
                        style={{
                          padding: 10,
                          backgroundColor: "rgba(34, 34, 34, 0.52)",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12} alignContent="center">
                            <Typography
                              variant="caption"
                              align="center"
                              style={{ width: "100%" }}
                            >
                              {roundTo(key.scoreDifference, 2)}
                            </Typography>
                            <Divider />
                          </Grid>
                          {key.items.map((item) => (
                            <Grid item xs={12}>
                              <img
                                src={getItemIcon(item.id)}
                                height={20}
                                width={20}
                              />{" "}
                              {getTranslatedItemName(item.id, currentLanguage)}
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TopGearReport;
