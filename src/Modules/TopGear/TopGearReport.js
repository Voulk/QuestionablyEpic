import React, { useEffect, useState } from "react";
import ItemCardReport from "./MiniItemCardReport";
import TopSetStatsPanel from "./TopSetStatsPanel";
// import { testList, differentialsTest } from "./TestData";
import { apiGetPlayerImage } from "../SetupAndMenus/ConnectionUtilities";
import { useTranslation } from "react-i18next";
import { Button, Paper, Typography, Divider, Grid, Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getItemIcon } from "../Engine/ItemUtilities";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions";
import CompetitiveAlternatives from "./CompetitiveAlternatives";

function TopGearReport(props) {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  /* ----------------------------- On Component load get player image ----------------------------- */
  useEffect(() => {
    async function setImg() {
      const img = await apiGetPlayerImage(props.player);
      setBackgroundImage(img);
    }

    setImg();
  }, []);

  const classIcon = () => {
    switch (props.player.spec) {
      case "Holy Paladin":
        return require("../../Images/Classes/Paladin/icon-paladin.png").default;
        break;
      case "Restoration Shaman":
        return require("../../Images/Classes/Shaman/icon-shaman.png").default;
        break;
      case "Holy Priest":
        return require("../../Images/Classes/Priest/icon-priest.png").default;
        break;
      case "Discipline Priest":
        return require("../../Images/Classes/Priest/icon-priest.png").default;
        break;
      case "Restoration Druid":
        return require("../../Images/Classes/Druid/icon-druid.png").default;
        break;
      case "Mistweaver Monk":
        return require("../../Images/Classes/Monk/icon-monk.png").default;
        break;
      default:
        break;
    }
  };

  const checkResult = (result) => {
    return result !== "undefined" && result && result.itemSet.hardScore && result.itemSet.hardScore > 1 && result.itemSet.setStats && result.itemSet.itemList;
  };

  let resultValid = true;
  let result = props.result;
  let topSet = "";
  let enchants = {};
  let differentials = {};
  let itemList = {};
  let statList = {};

  if (checkResult(result)) {
    topSet = result.itemSet;
    enchants = topSet.enchantBreakdown;
    differentials = result.differentials;
    itemList = topSet.itemList;
    statList = topSet.setStats;
  } else {
    resultValid = false;
  }

  /* TEST DATA
  enchants = { chest: "+30 Stats", Wrist: "+15 Int", Finger: "+16 Haste", Back: "+20 Stam +30 Leech", Weapon: "Celestial Guidance" };
  let itemList = testList;
  let differentials = differentialsTest;
  let statList = { intellect: 321, haste: 931, crit: 831, mastery: 31, versatility: 91, leech: 49, hps: 911, dps: 893 }; */

  return (
    <div
      style={{
        margin: "auto",
        width: "70%",
        display: "block",
      }}
    >
      {resultValid ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{ padding: 10 }}>
              <div
                style={{
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
                    <Button color="primary" variant="outlined" component={Link} to={"/topgear"}>
                      {t("TopGear.BackToGearSelection")}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction="row">
                      <Grid item xs={3} style={{ width: "100%" }}>
                        {/* ---------------------------------------------------------------------------------------------- */
                        /*                                         Left Side Items                                        */
                        /* ---------------------------------------------------------------------------------------------- */}
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
                                key.slot === "CombinedWeapon",
                            )
                            .map((item, index) => (
                              <ItemCardReport key={index} item={item} activateItem={true} enchants={enchants} />
                            ))}
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ width: "40%" }} />
                      </Grid>
                      <Grid item xs={3} style={{ width: "100%" }}>
                        {/* ---------------------------------------------------------------------------------------------- */
                        /*                                        Right Side Items                                        */
                        /* ---------------------------------------------------------------------------------------------- */}
                        <Grid container spacing={1}>
                          {itemList
                            .filter((key) => key.slot === "Hands" || key.slot === "Waist" || key.slot === "Legs" || key.slot === "Feet" || key.slot === "Finger" || key.slot === "Trinket")
                            .map((item, index) => (
                              <ItemCardReport key={index} item={item} activateItem={true} enchants={enchants} />
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* ---------------------------------------------------------------------------------------------- */
                    /*                                           Stat Panel                                           */
                    /* ---------------------------------------------------------------------------------------------- */}
                    <Grid container spacing={1} direction="row" justify="space-between">
                      <Grid item xs={4} style={{ paddingBottom: 8 }}>
                        <Grid container justify="flex-start">
                          <TopSetStatsPanel statList={statList} spec={props.player.spec} currentLanguage={currentLanguage} />
                        </Grid>
                      </Grid>
                      <Grid item xs={3} style={{ paddingBottom: 8, alignSelf: "flex-end" }}>
                        <Grid container justify="flex-end">
                          <Paper
                            style={{
                              fontSize: "12px",
                              textAlign: "left",
                              maxWidth: 300,
                              backgroundColor: "rgba(44, 44, 44, 0.5)",
                              display: "block",
                            }}
                          >
                            <Grid container direction="row">
                              <Grid item xs="auto">
                                <Grid container direction="row">
                                  <img src={classIcon()} height={80} width={80} style={{ padding: 4 }} />
                                </Grid>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid container direction="row" style={{ paddingTop: 9, paddingBopttom: 9 }}>
                                  <Grid item xs={12}>
                                    <Typography
                                      variant="h5"
                                      wrap="nowrap"
                                      display="inline"
                                      align="left"
                                      style={{
                                        color: classColoursJS(props.player.spec),
                                      }}
                                    >
                                      {props.player.charName}
                                    </Typography>
                                    <Divider />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography
                                      variant="caption"
                                      wrap="nowrap"
                                      display="inline"
                                      align="left"
                                      style={{
                                        color: classColoursJS(props.player.spec),
                                      }}
                                    >
                                      {props.player.spec}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="caption" wrap="nowrap" display="inline" align="left">
                                      {props.player.region}-{props.player.realm}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                    Competitive Alternatives                                    */
          /* ----------------------------------------------------------------------------------------------  */}
          <CompetitiveAlternatives differentials={differentials} />

          <Grid item style={{ height: 40 }} xs={12} />
        </Grid>
      ) : (
        <Typography style={{ textAlign: "center", color: "white" }}>{t("TopGear.ErrorMessage")}</Typography>
      )}
    </div>
  );
}

export default TopGearReport;
