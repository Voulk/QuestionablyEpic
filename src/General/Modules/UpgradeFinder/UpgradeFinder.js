import UpgradeFinderFront from "./UpgradeFinderFront";
import UpgradeFinderResults from "./UpgradeFinderResults";
import UpgradeFinderResult from "./UpgradeFinderResult";
import React, { useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga";

export function UpgradeFinder(props) {
  const [itemSelection, setItemSelection] = React.useState([]);
  const [showReport, setShowReport] = React.useState(false);
  const [playerSettings, setPlayerSettings] = React.useState({ raid: [2, 3], dungeon: 6, pvp: 0 });
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const setRaidDifficulty = (difficulty) => {
    let currDiff = playerSettings.raid;
    let difficultyIndex = currDiff.indexOf(difficulty);
    if (difficultyIndex > -1) currDiff.splice(difficultyIndex, 1);
    else {
      currDiff.push(difficulty);
      if (currDiff.length > 2) currDiff.splice(0, 1);
    }
    setPlayerSettings({ ...playerSettings, raid: currDiff });
  };

  const setDungeonDifficulty = (event, difficulty) => {
    if (difficulty <= 15 && difficulty >= 0) setPlayerSettings({ ...playerSettings, dungeon: difficulty });
  };

  const setBCDungeonDifficulty = (event, difficulty) => {
    if (difficulty === "Heroic") {
      setPlayerSettings({ ...playerSettings, dungeon: 1 });
    }
    else {
      setPlayerSettings({ ...playerSettings, dungeon: 0 });
    }
  };

  const setPVPDifficulty = (event, rating) => {
    let newRank = -1;
    switch (rating) {
      case 0:
        newRank = 0;
        break;

      case 600:
        newRank = 1;
        break;

      case 800:
        newRank = 2;
        break;

      case 1000:
        newRank = 3;
        break;

      case 1300:
        newRank = 4;
        break;

      case 1600:
        newRank = 5;
        break;
    }

    if (newRank <= 5 && newRank >= 0) setPlayerSettings({ ...playerSettings, pvp: newRank });
  };

  const player = props.player;
  const allChars = props.allChars;
  const simcSnack = props.simcSnack;
  //const playerSettings = { raid: [0,1], dungeon: 15, pvp: 4 };

  return showReport ? (
    <div>
      <UpgradeFinderResults player={player} itemSelection={itemSelection} playerSettings={playerSettings} setShowReport={setShowReport} />
      <div style={{ marginBottom: 100 }} />
    </div>
  ) : (
    <UpgradeFinderFront
      player={player}
      simcSnack={simcSnack}
      allChars={allChars}
      setItemSelection={setItemSelection}
      setShowReport={setShowReport}
      playerSettings={playerSettings}
      setRaidDifficulty={setRaidDifficulty}
      setDungeonDifficulty={setDungeonDifficulty}
      setPVPDifficulty={setPVPDifficulty}
      setBCDungeonDifficulty={setBCDungeonDifficulty}
    />
  );
}
