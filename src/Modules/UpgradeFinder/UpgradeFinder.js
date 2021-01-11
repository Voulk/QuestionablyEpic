import UpgradeFinderFront from "./UpgradeFinderFront";
import UpgradeFinderResults from "./UpgradeFinderResults";
import UpgradeFinderResult from "./UpgradeFinderResult";
import React, { useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export function UpgradeFinder(props) {
  const [itemSelection, setItemSelection] = React.useState([]);
  const [showReport, setShowReport] = React.useState(false);

  const player = props.player;
  const contentType = props.contentType;
  const allChars = props.allChars;
  const simcSnack = props.simcSnack;

  console.log("== Item Selection ==");
  console.log(itemSelection);

  return showReport ? (
    <UpgradeFinderResults
      player={player}
      contentType={contentType}
      itemSelection={itemSelection}
    />
  ) : (
    <UpgradeFinderFront
      player={player}
      contentType={contentType}
      simcSnack={simcSnack}
      allChars={allChars}
      setItemSelection={setItemSelection}
      setShowReport={setShowReport}
    />
  );
}
