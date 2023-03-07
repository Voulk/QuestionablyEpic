import React, { useState, useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import OneShotClassToggle from "./OneShotClassToggle";
import { encounterDB } from "Databases/InstanceDB";
import { defensiveDB, defensiveTalentsDB, raidBuffsDB } from "Databases/DefensiveDB";
import { externalsDB } from "Databases/ExternalsDB";
import { enemySpellDB } from "./EnemySpellDB";
import OneShotDataTable from "./OneShotDataTable";
import OneShotDungeonToggle from "./OneShotDungeonToggle";
import { OneShotSpellIcon } from "./OneShotSpellIcon";
import OneShotStats from "./OneShotStats";
import OneShotSlider from "./OneShotSlider";
import { specData } from "./ClassData";

import "./OneShot.css";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 32,
      margin: "auto",
      width: "55%",
      display: "block",
    },
  },
}));

const getDefensiveList = (className, specName) => {
  const onUseDefensives = specData[className]['defensives'].concat(specData[specName + " " + className]['defensives']);
  //if (specData[specName + " " + className]['defensives']) onUseDefensives = onUseDefensives.concat(specData[specName + " " + className]['defensives']);
  const passives = specData[className]['passives'].concat(specData[specName + " " + className]['passives']);
  const externals = ["Zephyr"];
  const groupBuffs = ["Devotion Aura", "Mark of the Wild", "Power Word: Fortitude"];

  return onUseDefensives.concat(externals).concat(groupBuffs).concat(passives);

};

const updateSpec = (className, specName) => {

  //const defensiveList = ["Obsidian Scales", "Inherent Resistance", "Zephyr", "Devotion Aura", "Mark of the Wild", "Power Word: Fortitude"];
  const defensiveList = getDefensiveList(className, specName);
  const defensiveData = [];
  const combinedDefensiveDB = defensiveDB.concat(defensiveTalentsDB).concat(externalsDB).concat(raidBuffsDB);

  defensiveList.forEach((defensiveName) => {
    const temp = combinedDefensiveDB.filter((defensive) => defensive.name.en === defensiveName);
    if (temp.length > 0) {
      const data = temp[0];
      const defensiveType = data.talent ? "talent" : data.external ? "external" : data.raidBuff ? "raidBuff" : "defensive";

      defensiveData.push({ name: data.name.en, icon: data.icon, type: data.type, reduction: data.reduction || 0, active: false, defensiveType: defensiveType });
    } else {
      console.error("Can't find defensive: ", defensiveName);
    }
  });

  return defensiveData;
};

// Returns the key damage multiplier for a given key level. Note that there is no support for keys lower than +10 and while it's easy to add to the function,
// the app itself should not support such cases given the tool would be an inappropriate choice for it.
export const getKeyMult = (keyLevel) => {
  return 1.08 ** 8 * 1.1 ** (keyLevel - 10);
};

// Sources of damage reduction are multiplicative with each other.
// That means if we have Barkskin (20%) and Ironbark (20%) active at the same time then
// we get (1 - 0.2) * (1 - 0.2) = 0.64 or 64% damage reduction rather than an additive 40%.
// This function returns the percentage damage that the target will still take, NOT the amount reduced.
export const calcDefensives = (defensives, spell) => {
  let sumDR = 1;

  defensives.forEach((defensive) => {
    // Defensives can either work on all mechanics or a specific spell type.
    // Magic-only defensive talents in particular are quite common.
    // We also handle "AoE reduction" effects like Zephyr and Feint by checking if the spell is reduced by avoidance.
    // Note that there are some rare mechanics that ignore defensives altogether (see 'pure' tag in EnemySpellDB).
    const defensiveApplies = (defensive.type === "aoe" && spell.avoidance) || defensive.type === "All" || defensive.type === spell.damageType;

    if (defensive.active && defensiveApplies) {
      sumDR *= 1 - defensive.reduction;
    }
  });

  return Math.max(sumDR, 0);
};

export const calcHealth = (stamina) => {
  return stamina * 20;

}

// The formula for Armor -> Damage reduction is Armor / (Armor + K). The K value changes depending on what you're fighting and from patch to patch.
// We're only really interested in Mythic+ right now so the K value below is for that. Trash and bosses are identical.
// If we expand to include boss mechanics (possible) then we'll need to add a K value for Mythic difficulty.
//
// To get a K value when a new patch hits we can run the macro below in-game while targeting the given mob.
// We need to update this each major patch.
// /run local _, A = UnitArmor('player'); local r = PaperDollFrame_GetArmorReductionAgainstTarget(A) / 100; print('K ~ ', (A-r*A)/r);
export const calcArmor = (armor) => {
  const kValue = 12824.94;

  return 1 - armor / (armor + kValue);
};

export const calcDR = (defensives, versatility, avoidance, stamina, armor, spell) => {
  // All of these are in percentage damage *taken* form. If you have 3% DR from vers then the variable should be 0.97 not 0.03.
  const defensiveDR = calcDefensives(defensives, spell);
  const versDR = 1 - versatility / 410 / 100;

  const armorDR = (spell.damageType === "Physical" && !("tags" in spell && spell.tags.includes("ignoreArmor"))) ? calcArmor(armor) : 1;
  const avoidanceDR = spell.avoidance ? 1 - avoidance / 72 / 100 : 1; // TODO: Add DR to Avoidance.

  // Special cases
  if ("tag" in spell && spell.tag.includes("pure")) {
    return 1;
  }
  //console.log("Vers DR: " + versDR + " Armor DR: " + armorDR + " AvoidanceDR " + avoidanceDR + " Defensive DR: " + defensiveDR)
  return defensiveDR * versDR * armorDR * avoidanceDR;
};

export default function OneShot(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const dungeonList = encounterDB["-1"]["bossOrderMythicPlus"];

  const [selectedClass, setSelectedClass] = React.useState("evoker");
  const [selectedSpec, setSelectedSpec] = React.useState("preservation");
  const [selectedDungeon, setSelectedDungeon] = React.useState(dungeonList[0]);
  const [enemySpellList, setEnemySpellList] = React.useState([]);
  const [keyLevel, setKeyLevel] = React.useState(24);
  const [defensives, setDefensives] = React.useState(updateSpec(selectedClass, selectedSpec));

  const [stats, setStats] = React.useState({versatility: 2000, avoidance: 0, stamina: 16500, armor: 8000, absorb: 0, health: calcHealth(16500)})

  const [sliderValue, setSliderValue] = React.useState(0);

  const updateStats = (statName, statValue) => {
    // TODO: We could add some extras here like checking if a stat is in a valid range.

    const newStats = {...stats, [statName]: statValue};
    newStats.health = calcHealth(newStats.stamina);
    setStats(newStats)
    setEnemySpellList(updateDungeonSpellList(selectedDungeon, defensives, newStats));
    
    
  }

  const activateSpell = (e, spell) => {
    spell.active = !spell.active;
    setDefensives([...defensives]);
    setEnemySpellList(updateDungeonSpellList(selectedDungeon, defensives, stats));
  };

  const updateDungeonSpellList = (dungeon, defensives, stats) => {
    const dungeonName = encounterDB["-1"][dungeon]["name"]["en"]; // We're using this as an object reference so we don't want to translate it.
    const spellList = enemySpellDB[dungeonName];
    let damageList = [];

    spellList.forEach((spell) => {
      damageList.push(calcDamage(spell, defensives, stats));
    });

    return damageList;
  };

  const calcDamage = (spell, defensives, stats) => {
    const sumDamageReduction = calcDR(defensives, stats.versatility, stats.avoidance, stats.stamina, stats.armor, spell);
    console.log("Sum DR: ", sumDamageReduction);
    const baseMultiplier = getKeyMult(keyLevel) * sumDamageReduction; // The key multiplier. We'll add Tyrannical / Fort afterwards.

    let spellData = { name: spell.name, tyrannical: spell.baseDamage * baseMultiplier, fortified: spell.baseDamage * baseMultiplier };
    spellData.tyrannical = Math.round(spellData.tyrannical * (spell.source === "Boss" ? 1.15 : 1));
    spellData.fortified = Math.round(spellData.fortified * (spell.source === "Trash" ? 1.3 : 1));

    return spellData;
  };

  const updateSelectedDungeon = (dungeon) => {
    //updateDungeonSpellList(dungeon);
    setSelectedDungeon(dungeon);
    setEnemySpellList(updateDungeonSpellList(dungeon, defensives, stats));
  };

  useEffect(() => {
    setEnemySpellList(updateDungeonSpellList(selectedDungeon, defensives, stats));
  }, []);

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* <Paper
              padding={0}
              elevation={0}
              style={{
                padding: "10px 5px 10px 10px",
                opacity: 100,
                //backgroundColor: "transparent"
              }}
            > */}
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.24)",
                    // backgroundColor: "#2c2c2c",

                    padding: "0px 8px 8px 8px",
                  }}
                  elevation={0}
                >
                  <Grid container spacing={0}>
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
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.24)",
                    // backgroundColor: "#2c2c2c",

                    padding: "0px 8px 8px 8px",
                  }}
                  elevation={0}
                >
                  <Grid container spacing={0}>
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
                  </Grid>
                </Paper>
              </Grid>


              <OneShotSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={1}>
                  <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                    <Grid container spacing={1}>
                    <OneShotStats
                      stats={stats}
                      updateStats={updateStats}
                    />
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.24)",
                            // backgroundColor: "#2c2c2c",

                            padding: "0px 0px 0px 4px",
                          }}
                          elevation={0}
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                                {"Defensives"}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Grid container spacing={1} alignItems="center">
                                {defensives
                                  .filter((d) => d.defensiveType === "defensive")
                                  .map((spell, index) => (
                                    <Grid item xs="auto" key={index}>
                                      <OneShotSpellIcon
                                        spell={spell}
                                        iconType={"Spell"}
                                        draggable
                                        onClick={(e) => {
                                          activateSpell(e, spell);
                                        }}
                                      />
                                    </Grid>
                                  ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.24)",
                            // backgroundColor: "#2c2c2c",

                            padding: "0px 0px 0px 4px",
                          }}
                          elevation={0}
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                                {"Externals"}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Grid container spacing={1} alignItems="center">
                                {defensives
                                  .filter((d) => d.defensiveType === "external")
                                  .map((spell, index) => (
                                    <Grid item xs="auto" key={index}>
                                      <OneShotSpellIcon
                                        spell={spell}
                                        iconType={"Spell"}
                                        draggable
                                        onClick={(e) => {
                                          activateSpell(e, spell);
                                        }}
                                      />
                                    </Grid>
                                  ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.24)",
                            // backgroundColor: "#2c2c2c",

                            padding: "0px 0px 0px 4px",
                          }}
                          elevation={0}
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                                {"Passive Talents"}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Grid container spacing={1} alignItems="center">
                                {defensives
                                  .filter((d) => d.defensiveType === "talent")
                                  .map((spell, index) => (
                                    <Grid item xs="auto" key={index}>
                                      <OneShotSpellIcon
                                        spell={spell}
                                        iconType={"Spell"}
                                        draggable
                                        onClick={(e) => {
                                          activateSpell(e, spell);
                                        }}
                                      />
                                    </Grid>
                                  ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.24)",
                            // backgroundColor: "#2c2c2c",

                            padding: "0px 0px 0px 4px",
                          }}
                          elevation={0}
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                                {"Group Buffs"}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Grid container spacing={1} alignItems="center">
                                {defensives
                                  .filter((d) => d.defensiveType === "raidBuff")
                                  .map((spell, index) => (
                                    <Grid item xs="auto" key={index}>
                                      <OneShotSpellIcon
                                        spell={spell}
                                        iconType={"Spell"}
                                        draggable
                                        onClick={(e) => {
                                          activateSpell(e, spell);
                                        }}
                                      />
                                    </Grid>
                                  ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <OneShotDataTable data={enemySpellList} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
