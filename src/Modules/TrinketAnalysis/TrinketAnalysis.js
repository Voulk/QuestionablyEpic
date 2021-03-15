import React, { useEffect } from "react";
import { makeStyles, Paper, Typography, Grid, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { itemDB } from "../../Databases/ItemDB";
import Item from "../Player/Item";
import { getItemAllocations, calcStatsAtLevel, getItemEffect, scoreItem, getTranslatedItemName } from "../Engine/ItemUtilities";
import VerticalChart from "./Charts/VerticalChart";
import HelpText from "../SetupAndMenus/HelpText";

// [{TrinketID: 90321, i173: 92, i187: 94, i200: 99, i213: 104, i226: 116}]

const getTrinketAtItemLevel = (id, itemLevel, player, contentType) => {
  let item = new Item(id, "", "Trinket", false, "", 0, itemLevel, "");
  let itemAllocations = getItemAllocations(id);
  item.stats = calcStatsAtLevel(itemLevel, "Trinket", itemAllocations, "");
  item.effect = getItemEffect(id);
  item.softScore = scoreItem(item, player, contentType);

  return item.softScore;
};

export default function TrinketAnalysis(props) {
  /*useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }, []); */

  const { t, i18n } = useTranslation();
  const itemLevel = 213;
  const itemLevels = [174, 187, 194, 200, 207, 213, 220, 226, 233];
  const trinketDB = itemDB.filter((key) => key.slot === "Trinket" && key.levelRange.length > 0);
  const helpText = t("TrinketAnalysis.HelpText");

  let activeTrinkets = [];

  for (var i = 0; i < trinketDB.length; i++) {
    const trinket = trinketDB[i];
    let trinketAtLevels = {
      id: trinket.id,
      name: getTranslatedItemName(trinket.id, "en"),
    };

    for (var x = 0; x < itemLevels.length; x++) {
      trinketAtLevels["i" + itemLevels[x]] = getTrinketAtItemLevel(trinket.id, itemLevels[x], props.player, props.contentType);
    }
    activeTrinkets.push(trinketAtLevels);
  }

  activeTrinkets.sort((a, b) => (a.i233 < b.i233 ? 1 : -1));
  return (
    <div
      style={{
        margin: "auto",
        width: "60%",
        justifyContent: "space-between",
        display: "block",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("TrinketAnalysis.Header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText text={helpText} />
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Grid container spacing={1} justify="center">
              <Grid item xs={12}>
                <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={0}>
                  <VerticalChart data={activeTrinkets} db={trinketDB}/>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
