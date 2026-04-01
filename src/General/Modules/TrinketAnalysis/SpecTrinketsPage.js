import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Player from "General/Modules/Player/Player";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import TrinketChart from "./TrinketChart";
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

export default function SpecTrinketsPage() {
  const gameType = useSelector((state) => state.gameType);
  const availableSpecs = gameType === "Classic" ? CONSTANTS.classicSpecs : CONSTANTS.specs;
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();

  const [selectedSpec, setSelectedSpec] = useState(() => {
    const urlSlug = match.params.spec;
    const urlSpec = urlSlug ? URL_TO_SPEC[urlSlug.toLowerCase()] : null;
    if (urlSpec && [...CONSTANTS.specs, ...CONSTANTS.classicSpecs].includes(urlSpec)) {
      return urlSpec;
    }
    return CONSTANTS.specs[0];
  });

  const player = useMemo(() => {
    const specGameType = selectedSpec.includes("Classic") ? "Classic" : "Retail";
    return new Player("", selectedSpec, 0, "US", "Default", "Default", "default", specGameType);
  }, [selectedSpec]);

  const handleSpecChange = (event) => {
    const newSpec = event.target.value;
    setSelectedSpec(newSpec);
    const urlSlug = newSpec.toLowerCase().replace(/ /g, "");
    history.replace(`/spec-trinkets/${urlSlug}`);
  };

  React.useEffect(() => {
    trackPageView(window.location.pathname);
  }, [selectedSpec]);

  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Trinket Rankings
          </Typography>
          <Select value={selectedSpec} onChange={handleSpecChange}>
            {availableSpecs.map((spec) => (
              <MenuItem key={spec} value={spec}>
                {spec}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TrinketChart player={player} />
        </Grid>
      </Grid>
      <div style={{ height: 300 }} />
    </div>
  );
}
