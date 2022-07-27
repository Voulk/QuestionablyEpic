import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip, Paper, Divider } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { runCastSequence as evokerSequence } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps";
import { runCastSequence as discSequence } from "General/Modules/Player/DiscPriest/DiscPriestRamps";
import { runCastSequence as shamanSequence } from "Retail/Engine/EffectFormulas/Shaman/RestoShamanRamps";

import { EVOKERSPELLDB, baseTalents } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerSpellDB";
import { DISCSPELLS, baseTalents as discTalents } from "General/Modules/Player/DiscPriest/DiscSpellDB";
import { SHAMANSPELLDB } from "Retail/Engine/EffectFormulas/Shaman/RestoShamanSpellDB";
import { buildRamp } from "General/Modules/Player/DiscPriest/DiscRampGen";

import LooksOneIcon from "@mui/icons-material/LooksOne";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "100%",
      justifyContent: "center",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "44%",
      justifyContent: "center",
      display: "block",
    },
  },
}));

const getSpellDB = (spec) => {
  if (spec === "Preservation Evoker") return EVOKERSPELLDB;
  if (spec === "Discipline Priest") return DISCSPELLS;
  if (spec === "Restoration Shaman") return SHAMANSPELLDB;
};

const getSequence = (spec) => {
  if (spec === "Preservation Evoker") return evokerSequence;
  if (spec === "Discipline Priest") return discSequence;
  if (spec === "Restoration Shaman") return shamanSequence;
};

const dpsSpells = Object.keys(EVOKERSPELLDB).filter((spell) => EVOKERSPELLDB[spell][0].type === "damage");
const healSpells = Object.keys(EVOKERSPELLDB).filter((spell) => EVOKERSPELLDB[spell][0].type === "heal" || spell === "Reversion");

export default function SequenceGenerator(props) {
  const selectedSpec = "Preservation Evoker";
  const spellDB = getSpellDB(selectedSpec);

  const spellCategories = ["Healing", "Damage", "Cooldowns & Other"];

  const classes = useStyles();
  const [seq, setSeq] = useState([]);
  const [talents, settalents] = useState({ ...baseTalents });
  const [result, setResult] = useState({ totalDamage: 0, totalHealing: 0, hpm: 0 });

  const spellList = {
    Damage: Object.keys(spellDB).filter((spell) => spellDB[spell][0].spellData?.cat === "damage"),
    Healing: Object.keys(spellDB).filter((spell) => spellDB[spell][0].spellData?.cat === "heal"),
    "Cooldowns & Other": Object.keys(spellDB).filter((spell) => spellDB[spell][0].spellData?.cat === "cooldown"),
  };
  const dpsSpells = [];
  const healSpells = [];

  console.log(healSpells);

  const stats = {
    intellect: 2000,
    haste: 600,
    crit: 600,
    mastery: 600,
    versatility: 600,
    stamina: 2800,

    critMult: 1,
  };

  const addSpell = (spell) => {
    setSeq([...seq, spell]);
  };

  const clearSeq = () => {
    setSeq([]);
  };

  const runSeq = () => {
    const simFunc = getSequence(selectedSpec);
    const sim = simFunc(seq, stats, {}, {});
    setResult(sim);
    console.log(sim);
  };

  const autoGen = () => {
    setSeq(buildRamp("Primary", 10, [], stats.haste, "", discTalents));
  };

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper padding={0} elevation={0} style={{ padding: "10px 5px 10px 10px", opacity: 100, backgroundColor: "transparent" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Sequences"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Paper style={{ padding: "8px 8px 4px 8px" }} elevation={0}>
                    <Grid container spacing={1} alignItems="center">
                      {/*<Grid item xs="auto">
                            <LooksOneIcon fontSize="large" />
                            </Grid> */}

                      {seq.map((spell, index) => (
                        <Grid item xs="auto" key={index}>
                          <a data-wowhead={"spell=" + spellDB[spell][0].spellData.id}>
                            <img
                              height={40}
                              width={40}
                              src={require("Images/Spells/" + spellDB[spell][0].spellData.icon + ".jpg").default || ""}
                              alt=""
                              style={{
                                borderRadius: 4,
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "#008CFF",
                                marginRight: 0,
                              }}
                            />
                          </a>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Divider />
                </Grid>

                {spellCategories.map((cat, index) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                          {cat + " Spells"}
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        {spellList[cat].map((spell, i) => (
                          <Grid item xs="auto" key={index}>
                            <a data-wowhead={"spell=" + spellDB[spell][0].spellData.id}>
                              <img
                                height={40}
                                width={40}
                                src={require("Images/Spells/" + spellDB[spell][0].spellData.icon + ".jpg").default || ""}
                                alt=""
                                onClick={(e) => addSpell(spell, e)}
                                style={{
                                  borderRadius: 4,
                                  borderWidth: "1px",
                                  borderStyle: "solid",
                                  borderColor: "#ff8000",
                                  marginRight: 0,
                                }}
                              />
                            </a>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Talents"}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    key={321}
                    variant="contained"
                    onClick={() => runSeq()}
                    color="secondary"
                    style={{
                      width: "100%",
                      height: "35px",
                      whiteSpace: "nowrap",
                      justifyContent: "center",
                      textTransform: "none",
                      paddingLeft: "32px",
                      color: "#F2BF59",
                    }}
                  >
                    {"Run Sequence"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    key={321}
                    variant="contained"
                    onClick={() => clearSeq()}
                    color="secondary"
                    style={{
                      width: "100%",
                      height: "35px",
                      whiteSpace: "nowrap",
                      justifyContent: "center",
                      textTransform: "none",
                      paddingLeft: "32px",
                      color: "#F2BF59",
                    }}
                  >
                    {"Clear"}
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    key={321}
                    variant="contained"
                    onClick={() => autoGen()}
                    color="secondary"
                    style={{
                      width: "100%",
                      height: "35px",
                      whiteSpace: "nowrap",
                      justifyContent: "center",
                      textTransform: "none",
                      paddingLeft: "32px",
                      color: "#F2BF59",
                    }}
                  >
                    {"Auto-Generate Sequence"}
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Results"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ backgroundColor: "#525252", padding: 16 }} elevation={0}>
                    <p style={{ color: "whitesmoke", paddingTop: "10px" }}>
                      {"Damage: " + result.totalDamage.toLocaleString("en-US") + ". Healing: " + result.totalHealing.toLocaleString("en-US") + ". HPM: " + Math.round(100 * result.hpm) / 100}
                    </p>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
