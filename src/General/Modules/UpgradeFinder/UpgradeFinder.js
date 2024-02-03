import React, { useEffect } from "react";
import UpgradeFinderFront from "./UpgradeFinderFront";
import UpgradeFinderReport from "./UpgradeFinderReport";
import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";

// Does this need to exist anymore? Could we fold it into UpgradeFinderFront and just have two files instead of three?
export function UpgradeFinder(props) {
  const [itemSelection, setItemSelection] = React.useState([]);
  const [report, setReport] = React.useState(null);
  const [showReport, setShowReport] = React.useState(false);
  const [ufSettings, setUFSettings] = React.useState({ raid: [5, 7], dungeon: 8, pvp: 0 });
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


  const setRaidDifficulty = (difficulty) => {
    let currDiff = ufSettings.raid;
    let difficultyIndex = currDiff.indexOf(difficulty);
    if (difficultyIndex > -1) currDiff.splice(difficultyIndex, 1);
    else {
      currDiff.push(difficulty);
      if (currDiff.length > 2) currDiff.splice(0, 1);
  }
    setUFSettings({ ...ufSettings, raid: currDiff });
  };

  const setDungeonDifficulty = (event, difficulty) => {
    if (difficulty <= 15 && difficulty >= 0) setUFSettings({ ...ufSettings, dungeon: difficulty });
  };

  const setBCDungeonDifficulty = (event, difficulty) => {
    if (difficulty === "Heroic") {
      setUFSettings({ ...ufSettings, dungeon: 1 });
    } else {
      setUFSettings({ ...ufSettings, dungeon: 0 });
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

      case 1200:
        newRank = 4;
        break;

      case 1400:
        newRank = 5;
        break;
      case 1600:
        newRank = 6;
        break;

      case 1800:
        newRank = 7;
        break;

      case 2000:
        newRank = 8;
        break;
    }

    if (newRank <= 8 && newRank >= 0) setUFSettings({ ...ufSettings, pvp: newRank });
  };

  const player = props.player;
  const allChars = props.allChars;
  const simcSnack = props.simcSnack;
  //const ufSettings = { raid: [0,1], dungeon: 15, pvp: 4 };

  return showReport ? (
    <div>
      <UpgradeFinderReport player={player} report={report} itemSelection={itemSelection} ufSettings={ufSettings} setShowReport={setShowReport} />
      <div style={{ marginBottom: 100 }} />
    </div>
  ) : (
    <UpgradeFinderFront
      player={player}
      simcSnack={simcSnack}
      allChars={allChars}
      setItemSelection={setItemSelection}
      setShowReport={setShowReport}
      ufSettings={ufSettings}
      setRaidDifficulty={setRaidDifficulty}
      setDungeonDifficulty={setDungeonDifficulty}
      setPVPDifficulty={setPVPDifficulty}
      setBCDungeonDifficulty={setBCDungeonDifficulty}
      singleUpdate={props.singleUpdate}
      setUFResult={props.setUFResult}
    />
  );
}
