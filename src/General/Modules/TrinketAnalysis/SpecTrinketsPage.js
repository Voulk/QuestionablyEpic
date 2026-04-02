import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Player from "General/Modules/Player/Player";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import TrinketChart from "./TrinketChart";
import CharacterPanel from "General/Modules/CharacterPanel/CharacterPanel";
import { trackPageView } from "Analytics";

export const URL_TO_SPEC = {
  holypriest: "Holy Priest",
  disciplinepriest: "Discipline Priest",
  restoshaman: "Restoration Shaman",
  restorationshaman: "Restoration Shaman",
  restodruid: "Restoration Druid",
  restorationdruid: "Restoration Druid",
  presevoker: "Preservation Evoker",
  preservationevoker: "Preservation Evoker",
  mwmonk: "Mistweaver Monk",
  mistweavermonk: "Mistweaver Monk",
  holypaladin: "Holy Paladin",
  holypriestclassic: "Holy Priest Classic",
  disciplinepriestclassic: "Discipline Priest Classic",
  restoshamanclassic: "Restoration Shaman Classic",
  restorationshamanclassic: "Restoration Shaman Classic",
  restodruidclassic: "Restoration Druid Classic",
  restorationdruidclassic: "Restoration Druid Classic",
  mwmonkclassic: "Mistweaver Monk Classic",
  mistweavermonkclassic: "Mistweaver Monk Classic",
  holypaladinclassic: "Holy Paladin Classic",
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "85%",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "55%",
      display: "block",
    },
  },
}));

export default function SpecTrinketsPage({ onSpecChange, player, allChars, singleUpdate, simcSnack }) {
  const gameType = useSelector((state) => state.gameType);
  const availableSpecs = gameType === "Classic" ? CONSTANTS.classicSpecs : CONSTANTS.specs;
  const classes = useStyles();
  const location = useLocation();

  const defaultSpec = (forGameType) => forGameType === "Classic" ? CONSTANTS.classicSpecs[0] : CONSTANTS.specs[0];

  const [selectedSpec, setSelectedSpec] = useState(() => {
    const urlSlug = new URLSearchParams(location.search).get("spec");
    const urlSpec = urlSlug ? URL_TO_SPEC[urlSlug.toLowerCase()] : null;
    if (urlSpec && [...CONSTANTS.specs, ...CONSTANTS.classicSpecs].includes(urlSpec)) {
      return urlSpec;
    }
    return defaultSpec(gameType);
  });

  React.useEffect(() => {
    if (onSpecChange) onSpecChange(selectedSpec);
  }, [selectedSpec]);

  React.useEffect(() => {
    if (!availableSpecs.includes(selectedSpec)) {
      setSelectedSpec(defaultSpec(gameType));
    }
  }, [gameType]);

  const specPlayer = useMemo(() => {
    const specGameType = selectedSpec.includes("Classic") ? "Classic" : "Retail";
    return new Player("", selectedSpec, 0, "US", "Default", "Default", "default", specGameType);
  }, [selectedSpec]);

  const contentType = useSelector((state) => state.contentType);

  React.useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
  }, [selectedSpec]);

  const chartPlayer = player || specPlayer;

  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <Grid container spacing={2}>
        {player ? (
          <Grid item xs={12}>
            <CharacterPanel
              player={player}
              simcSnack={simcSnack}
              allChars={allChars}
              contentType={contentType}
              singleUpdate={singleUpdate}
              hymnalShow={true}
              groupBuffShow={true}
              autoSocket={true}
            />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TrinketChart player={chartPlayer} />
        </Grid>
      </Grid>
      <div style={{ height: 300 }} />
    </div>
  );
}
