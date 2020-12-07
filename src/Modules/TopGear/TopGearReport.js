import React, { useEffect, useState } from "react";
import ItemCardReport from "./MiniItemCardReport";
import TopSetStatsPanel from "./TopSetStatsPanel";
import { testList } from "./TestData";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { apiGetPlayerImage } from "../SetupAndMenus/ConnectionUtilities";
import { useTranslation } from "react-i18next";

function TopGearReport(props) {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function setImg() {
      const img = await apiGetPlayerImage(props.pl);
      //console.log("IMG: " + img);
      setBackgroundImage(img);
    }

    setImg();
  }, []);

  
  
  let result = props.result;
  
  let topSet = result.itemSet;
  let enchants = topSet.enchantBreakdown;
  let differentials = result.differentials;
  console.log(topSet);
  console.log(differentials);
  let itemList = topSet !== null && "itemList" in topSet ? topSet.itemList : [];
  
  let statList =
    topSet !== null && "setStats" in topSet ? topSet.setStats : {};
  


  //console.log("Top Set: " + JSON.stringify(itemList));

  //itemList = JSON.parse([{"id":178692,"level":146,"name":"","slot":"Head","softScore":71,"socket":false,"tertiary":"","effect":"","uniqueHash":"17869289822","offhandID":0,"active":false,"stats":{"intellect":38,"stamina":0,"haste":25,"mastery":46,"versatility":0,"crit":0,"leech":0,"bonus_stats":{}}},{"id":173146,"level":151,"name":"","slot":"Neck","softScore":53,"socket":true,"tertiary":"","effect":"","uniqueHash":"17314648580","offhandID":0,"active":false,"stats":{"intellect":0,"stamina":0,"haste":71,"mastery":29,"versatility":0,"crit":0,"leech":0,"bonus_stats":{}}},{"id":172263,"level":151,"name":"","slot":"Shoulder","softScore":61,"socket":false,"tertiary":"","effect":"","uniqueHash":"17226371577","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":29,"mastery":0,"versatility":0,"crit":29,"leech":0,"bonus_stats":{}}},{"id":180123,"level":184,"name":"","slot":"Back","softScore":61,"socket":false,"tertiary":"","effect":"","uniqueHash":"18012389517","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":41,"mastery":0,"versatility":0,"crit":22,"leech":0,"bonus_stats":{}}},{"id":172258,"level":151,"name":"","slot":"Chest","softScore":83,"socket":false,"tertiary":"","effect":"","uniqueHash":"1722582615","offhandID":0,"active":false,"stats":{"intellect":40,"stamina":0,"haste":0,"mastery":40,"versatility":0,"crit":40,"leech":0,"bonus_stats":{}}},{"id":178767,"level":184,"name":"","slot":"Wrist","softScore":62,"socket":false,"tertiary":"","effect":"","uniqueHash":"17876789190","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":0,"mastery":21,"versatility":41,"crit":0,"leech":0,"bonus_stats":{}}},{"id":172260,"level":151,"name":"","slot":"Hands","softScore":60,"socket":false,"tertiary":"","effect":"","uniqueHash":"17226050102","offhandID":0,"active":false,"stats":{"intellect":31,"stamina":0,"haste":0,"mastery":29,"versatility":29,"crit":0,"leech":0,"bonus_stats":{}}},{"id":180110,"level":184,"name":"","slot":"Waist","softScore":82,"socket":false,"tertiary":"","effect":"","uniqueHash":"18011017097","offhandID":0,"active":false,"stats":{"intellect":41,"stamina":0,"haste":0,"mastery":50,"versatility":32,"crit":0,"leech":0,"bonus_stats":{}}},{"id":178839,"level":184,"name":"","slot":"Legs","softScore":104,"socket":false,"tertiary":"","effect":"","uniqueHash":"17883943481","offhandID":0,"active":false,"stats":{"intellect":55,"stamina":0,"haste":70,"mastery":41,"versatility":0,"crit":0,"leech":0,"bonus_stats":{}}},{"id":178745,"level":184,"name":"","slot":"Feet","softScore":87,"socket":false,"tertiary":"","effect":"","uniqueHash":"17874562676","offhandID":0,"active":false,"stats":{"intellect":41,"stamina":0,"haste":0,"mastery":0,"versatility":48,"crit":35,"leech":0,"bonus_stats":{}}},{"id":178736,"level":184,"name":"","slot":"Finger","softScore":67,"socket":false,"tertiary":"","effect":"","uniqueHash":"17873661511","offhandID":0,"active":false,"stats":{"intellect":0,"stamina":0,"haste":94,"mastery":0,"versatility":52,"crit":0,"leech":0,"bonus_stats":{}}},{"id":178872,"level":171,"name":"","slot":"Finger","softScore":70,"socket":false,"tertiary":"","effect":"","uniqueHash":"17887222710","offhandID":0,"active":false,"stats":{"intellect":0,"stamina":0,"haste":0,"mastery":42,"versatility":0,"crit":83,"leech":0,"bonus_stats":{}}},{"id":178708,"level":146,"name":"","slot":"Trinket","softScore":65,"socket":false,"tertiary":"","effect":{"type":"trinket","name":"Unbound Changeling"},"uniqueHash":"17870850513","offhandID":0,"active":false,"stats":{"intellect":37,"stamina":0,"haste":0,"mastery":0,"versatility":0,"crit":0,"leech":0,"bonus_stats":{"crit":47.0357909471232}}},{"id":178809,"level":171,"name":"","slot":"Trinket","softScore":90,"socket":false,"tertiary":"","effect":{"type":"trinket","name":"Soulletting Ruby"},"uniqueHash":"1788094039","offhandID":0,"active":false,"stats":{"intellect":46,"stamina":0,"haste":0,"mastery":0,"versatility":0,"crit":0,"leech":0,"bonus_stats":{"hps":4.520880060374999,"crit":71.84341512764914}}}]);
  
  //statList = topSet.stats;

  /*
  statList = {
    intellect: 321,
    haste: 931,
    crit: 831,
    mastery: 31,
    versatility: 91,
    leech: 49,
    hps: 911,
    dps: 893,
  }; */

  //let playerImage = apiGetPlayerImage(props.pl);
  //let playerImage = "https://render-us.worldofwarcraft.com/character/frostmourne/212/180358868-main.jpg"
  console.log(backgroundImage);
  return (
    <div
      style={{
        margin: "auto",
        width: "70%",
        display: "block",
      }}
    >
      <div
        style={{
          //   display: "flex",
          //   flexDirection: "row",
          justifyContent: "center",
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPositionY: "-160px",
          padding: 16,
        }}
      >
        <Grid container direction="row" spacing={1} style={{ marginTop: 40 }}>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={3} style={{ width: "100%" }}>
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
                      />
                    ))}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <div style={{ width: "40%" }} />
              </Grid>
              <Grid item xs={3} style={{ width: "100%" }}>
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
                      />
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} direction="column">
              <TopSetStatsPanel statList={statList} spec={props.pl.spec} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TopGearReport;
