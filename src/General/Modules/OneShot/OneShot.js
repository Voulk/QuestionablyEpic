import React, { useState, useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import OneShotClassToggle from "./OneShotClassToggle";
import { encounterDB } from "Databases/InstanceDB";
import { enemySpellDB} from "./EnemySpellDB";
import OneShotDataTable from "./OneShotDataTable";
import OneShotDungeonToggle from "./OneShotDungeonToggle";

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
      width: "90%",
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
      width: "55%",
      justifyContent: "center",
      display: "block",
    },
  },
}));

const getTalentDB = (dungeon) => {};


// Returns the key damage multiplier for a given key level. Note that there is no support for keys lower than +10 and while it's easy to add to the function,
// the app itself should not support such cases given the tool would be an inappropriate choice for it.
export const getKeyMult = (keyLevel) => {
  return 1.08 ** 8 * 1.1 ** (keyLevel - 10);
}

export default function OneShot(props) {
  const classes = useStyles();
  const dungeonList = encounterDB["-1"]["bossOrderMythicPlus"];

  const [selectedClass, setSelectedClass] = React.useState("Evoker");
  const [selectedDungeon, setSelectedDungeon] = React.useState(dungeonList[0]);
  const [enemySpellList, setEnemySpellList] = React.useState([{name: "Deafening Screech(1)", tyranical: 70000, fortified: 45000},
                                                              {name: "Deafening Screech(2)", tyranical: 70000, fortified: 45000}]);
  const [keyLevel, setKeyLevel] = React.useState(20);

  const calcDamage = (spell) => {
    
    const sumDamageReduction = 0;
    const baseMultiplier = getKeyMult(keyLevel); // The key multiplier. We'll add Tyrannical / Fort afterwards.

    let spellData = {name: spell.name, tyrannical: spell.baseDamage * baseMultiplier, fortified: spell.baseDamage * baseMultiplier};
    spellData.tyrannical = Math.round(spellData.tyrannical * (spell.source === "Boss" ? 1.15 : 1));
    spellData.fortified = Math.round(spellData.fortified * (spell.source === "Trash" ? 1.3 : 1));

    console.log(spellData);

    return spellData;
  }

  const updateDungeonSpellList = (dungeon) => {
    const dungeonName = encounterDB["-1"][dungeon]['name']['en'] // We're using this as an object reference so we don't want to translate it.
    const spellList = enemySpellDB[dungeonName];
    let damageList = [];

    spellList.forEach((spell) => {
      damageList.push(calcDamage(spell));
    })
    
    console.log(dungeonName);

    return damageList;
  }


  const updateSelectedDungeon = (dungeon) => {
    //updateDungeonSpellList(dungeon);
    setSelectedDungeon(dungeon);
    setEnemySpellList(updateDungeonSpellList(dungeon));
  }

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              padding={0}
              elevation={0}
              style={{
                padding: "10px 5px 10px 10px",
                opacity: 100,
                //backgroundColor: "transparent"
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Classes"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1}>
                    <OneShotClassToggle setSelectedClass={setSelectedClass} selectedClass={selectedClass} />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Dungeons"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1}>
                    <OneShotDungeonToggle selectedDungeon={selectedDungeon} setSelectedDungeon={updateSelectedDungeon} dungeonList={dungeonList} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Defensives"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Externals"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Talents"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Stats"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                      <OneShotDataTable data={enemySpellList} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
