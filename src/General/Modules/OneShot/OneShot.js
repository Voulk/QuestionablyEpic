import React, { useState, useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";


import { SpellIcon } from "./SpellIcon";
import "./Sequence.css";

import SequenceSettings from "General/Modules/SequenceGenerator/SequenceSettings"

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


const getTalentDB = (dungeon) => {
    
  
}



export default function SequenceGenerator(props) {


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
                  <Paper style={{ padding: "8px 8px 4px 8px", minHeight: 40 }} elevation={0}>
                    <Grid container spacing={1} alignItems="center" className="backgroundDropTarget" onDragOver={onDragOver} onDrop={dropInsertion}>
                      {/*<Grid item xs="auto">
                            <LooksOneIcon fontSize="large" />
                            </Grid> */}

                      {seq.map((spell, index) => (
                        <Grid item xs="auto" key={index} onDragOver={onDragOver} onDragEnd={dropMove} onDrop={dropInsertion} onDragEnter={(e) => { dragEnter(e, index) }}>
                          <SpellIcon
                            spell={spellDB[spell][0].spellData}
                            spec={selectedSpec}
                            iconType={"Spell"}
                            draggable
                            onDragStart={(e) => { dragStart(e, index) }}
                            onContextMenu={(e) => {
                              e.preventDefault()
                              removeSpellAtIndex(index, e)}}
                            style={{ display: "flex" }}
                          />
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
                          <Grid item xs="auto" key={spellDB[spell][0].spellData.id}>
                            <SpellIcon
                              spell={spellDB[spell][0].spellData}
                              spec={selectedSpec}
                              iconType={"Spell"}
                              draggable
                              onDragStart={(e) => { dragStart(e, spell) }}
                              onClick={(e) => addSpell(spell, e)}
                              style={{ display: "flex" }}
                            />
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
                        {[1, 2, 3, 4].map((tier, i) => (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                          <Grid container spacing={1}>
                          {talentList.map((spell, j) => (
                            talentDB[spell].tier === tier ?

                              <Grid item xs="auto" key={j} style={{paddingBottom: 7}}>
                                <SpellIcon
                                  spell={talentDB[spell]}
                                  spec={selectedSpec}
                                  iconType={"Talent"}
                                  width={25}
                                  //onDragStart={(e) => { dragStart(e, spell) }}
                                  onClick={(e) => {
                                    e.persist();
                                    addTalent(spell, talentDB, setTalents, e)
                                  }}
                                  style={{ display: "flex"}}
                                />

                          </Grid>
                               : ""
                              

                          ))}
                          <div style={{ height: 25 }} />
                          </Grid>
                              </Grid>

                        ))}

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
                    key={322}
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
                    <SequenceSettings 
                      possibleSettings = {seqSettings} 
                      editSettings = {editSettings}
                      />
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
                {/* Combat Log */}
                <Grid item xs={12}>
                    <TextField value={combatLog.join("\n")} variant="outlined" multiline minRows={10} maxRows={10} fullWidth disabled style={{whiteSpace: 'pre-line'}} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ height: 50 }} />
      </div>
    </div>
  );
}
