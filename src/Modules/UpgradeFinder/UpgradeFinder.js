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
  const [playerSettings, setPlayerSettings] = React.useState({ raid: [2,3], dungeon: 14, pvp: 4 })

  const setRaidDifficulty = (difficulty) =>  {
    let currDiff = playerSettings.raid;
    let difficultyIndex = currDiff.indexOf(difficulty);
    if (difficultyIndex > -1) currDiff.splice(difficultyIndex, 1);
    else {
      currDiff.push(difficulty);
      if (currDiff.length > 2) currDiff.splice(0, 1);
    }
    setPlayerSettings({...playerSettings, raid: currDiff});
    
  }

  const player = props.player;
  const contentType = props.contentType;
  const allChars = props.allChars;
  const simcSnack = props.simcSnack;
  //const playerSettings = { raid: [0,1], dungeon: 15, pvp: 4 };

  console.log("== Item Selection ==");
  console.log(itemSelection);

  return showReport ? (
    <UpgradeFinderResults
      player={player}
      contentType={contentType}
      itemSelection={itemSelection}
      playerSettings={playerSettings}
    />
  ) : (
    <UpgradeFinderFront
      player={player}
      contentType={contentType}
      simcSnack={simcSnack}
      allChars={allChars}
      setItemSelection={setItemSelection}
      setShowReport={setShowReport}
      playerSettings={playerSettings}
      setRaidDifficulty={setRaidDifficulty}
    />
  );
}
