import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { itemDB } from "../Player/ItemDB";
import Item from "../Player/Item";
import {
  getItemAllocations,
  calcStatsAtLevel,
  getItemEffect,
  scoreItem,
  getTranslatedItemName,
} from "../Engine/ItemUtilities";
import VerticalChart from "../Charts/VerticalChart";

// [{TrinketID: 90321, i173: 92, i187: 94, i200: 99, i213: 104, i226: 116}]

const getTrinketAtItemLevel = (id, itemLevel, player, contentType) => {
  let item = new Item(id, "", "Trinket", false, "", 0, itemLevel);
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

  const itemLevel = 213;
  const itemLevels = [161, 174, 187, 200, 213, 226];
  const trinketDB = itemDB.filter((key) => key.slot === "Trinket");

  let activeTrinkets = [];

  for (var i = 0; i < trinketDB.length; i++) {
    const trinket = trinketDB[i];
    let trinketAtLevels = {
      id: trinket.id,
      name: getTranslatedItemName(trinket.id, "en"),
    };

    for (var x = 0; x < itemLevels.length; x++) {
      trinketAtLevels["i" + itemLevels[x]] = getTrinketAtItemLevel(
        trinket.id,
        itemLevels[x],
        props.player,
        props.contentType
      );
    }
    activeTrinkets.push(trinketAtLevels);
  }

  activeTrinkets.sort((a, b) => (a.i226 < b.i226 ? 1 : -1));
  // console.log(activeTrinkets);
  return (
    <div
      style={{
        margin: "auto",
        width: "70%",
        justifyContent: "space-between",
        display: "block",
      }}
    >
      <Paper>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography color="primary" align="center" variant="h5">
              Trinket Analysis Page
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 20, marginBottom: 20 }}>
            <Paper
              style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }}
              elevation={0}
            >
              <VerticalChart data={activeTrinkets} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
