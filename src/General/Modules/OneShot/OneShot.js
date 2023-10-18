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
import OneShotSpellSelection from "./OneShotSpellSelection";

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
      width: "60%",
      display: "block",
    },
  },
}));

export const getDefensiveList = (className, specName) => {
  let onUseDefensives = specData[className]["defensives"]; //.concat(specData[specName + " " + className]["defensives"]);
  if (specData[specName + " " + className]["defensives"]) onUseDefensives = onUseDefensives.concat(specData[specName + " " + className]["defensives"]);
  let passives = specData[className]["passives"]; //.concat(specData[specName + " " + className]["passives"]);
  if (specData[specName + " " + className]["passives"]) passives = passives.concat(specData[specName + " " + className]["passives"]);
  const externals = externalsDB.filter((a) => a.include).map((a) => a.name.en); //["Zephyr"];
  const groupBuffs = raidBuffsDB.map((a) => a.name.en); //["Devotion Aura", "Mark of the Wild", "Power Word: Fortitude"];

  return onUseDefensives.concat(externals).concat(groupBuffs).concat(passives);
};

const updateSpec = (className, specName) => {
  console.log("updateSpec", className, specName);
  //const defensiveList = ["Obsidian Scales", "Inherent Resistance", "Zephyr", "Devotion Aura", "Mark of the Wild", "Power Word: Fortitude"];
  const defensiveList = getDefensiveList(className, specName);
  const defensiveData = [];
  const externals = externalsDB.filter((a) => a.include);
  const combinedDefensiveDB = defensiveDB.concat(defensiveTalentsDB).concat(externals).concat(raidBuffsDB);

  defensiveList.forEach((defensiveName) => {
    const temp = combinedDefensiveDB.filter((defensive) => defensive.name.en === defensiveName);
    if (temp.length > 0) {
      const data = temp[0];
      const defensiveType = data.talent ? "talent" : data.external ? "external" : data.raidBuff ? "raidBuff" : "defensive";

      defensiveData.push({ name: data.name.en, icon: data.autoIcon, type: data.type, reduction: data.reduction || 0, active: false, defensiveType: defensiveType, guid: data.guid, hookTalent: data.hookTalent || null, hookedReduction: data.hookedReduction || null });
    } else {
      console.error("Can't find defensive: ", defensiveName);
    }
  });

  return defensiveData;
};

// Returns the key damage multiplier for a given key level. Note that there is no support for keys lower than +10 and while it's easy to add to the function,
// the app itself should not support such cases given the tool would be an inappropriate choice for it.
export const getKeyMult = (keyLevel) => {
  return Math.round(100 * 1.08 ** 8 * 1.1 ** (keyLevel - 10)) / 100;
};

export const getHookValue = (defensives, talentName) => {
  const passive = defensives.filter((defensive) => defensive.name === talentName && defensive.active)

  if (passive.length > 0) return passive[0].hookedReduction;
  else return 0;
}

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
    let reduction = defensive.reduction || 0;

    if ('hookTalent' in defensive && defensive.hookTalent !== null) {
      reduction += getHookValue(defensives, defensive.hookTalent)
    }

    if (defensive.active && defensiveApplies) {
      sumDR *= 1 - reduction;
      
    }
  });

  return Math.max(sumDR, 0);
};

export const calcHealth = (stamina, absorb = 0, defensives) => {
  return stamina * 20 + absorb;
};

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

export const getRawDamage = (spell, keyLevel) => {
  return getKeyMult(keyLevel) * spell.baseDamage;
};

export const calcDR = (defensives, versatility, avoidance, stamina, armor, spell) => {
  // All of these are in percentage damage *taken* form. If you have 3% DR from vers then the variable should be 0.97 not 0.03.
  const defensiveDR = calcDefensives(defensives, spell);
  let versDR = 1 - versatility / 410 / 100;
  if (defensives.filter((d) => d.name === "Mark of the Wild")[0].active) versDR -= 0.015;


  const armorDR = spell.damageType === "Physical" && !("tags" in spell && spell.tags.includes("ignoreArmor")) ? calcArmor(armor) : 1;
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
  const [selectedDungeon, setSelectedDungeon] = React.useState(dungeonList[3]);
  const [enemySpellList, setEnemySpellList] = React.useState([]);
  const [keyLevel, setKeyLevel] = React.useState(20);
  const [defensives, setDefensives] = React.useState(updateSpec(selectedClass, selectedSpec));

  const [stats, setStats] = React.useState({ versatility: 2000, avoidance: 0, stamina: 29000, armor: 8000, absorb: 0, health: calcHealth(29000, 0) });

  const spellArray = [
    { label: "Defensives", type: "defensive" },
    { label: "Externals", type: "external" },
    { label: "Passive Talents", type: "talent" },
    { label: "Group Buffs", type: "raidBuff" },
  ];

  const runUpdate = () => {

  }

  const updateStats = (statName, statValue) => {
    // TODO: We could add some extras here like checking if a stat is in a valid range.

    const newStats = { ...stats, [statName]: statValue };
    newStats.health = calcHealth(newStats.stamina, newStats.absorb);
    setStats(newStats);
    setEnemySpellList(updateDungeonSpellList(selectedDungeon, defensives, newStats));
  };

  const updateKeyLevel = (newKeyLevel) => {
    setKeyLevel(newKeyLevel);
    setEnemySpellList(updateDungeonSpellList(selectedDungeon, defensives, stats, newKeyLevel));
  };

  const activateSpell = (e, spell) => {
    spell.active = !spell.active;
    setDefensives([...defensives]);
    setEnemySpellList(updateDungeonSpellList(selectedDungeon, defensives, stats));
  };

  const updateDungeonSpellList = (dungeon, defensives, stats, newKeyLevel = keyLevel) => {
    const dungeonName = encounterDB["-1"][dungeon]["name"]["en"]; // We're using this as an object reference so we don't want to translate it.
    const spellList = enemySpellDB[dungeonName];
    let damageList = [];

    spellList.forEach((spell) => {
      damageList.push(calcDamage(spell, defensives, stats, newKeyLevel));
    });

    return damageList;
  };

  const calcDamage = (spell, defensives, stats, keyLevel) => {
    const sumDamageReduction = calcDR(defensives, stats.versatility, stats.avoidance, stats.stamina, stats.armor, spell);
    const baseMultiplier = getKeyMult(keyLevel) * sumDamageReduction; // The key multiplier. We'll add Tyrannical / Fort afterwards.

    let spellData = { name: spell.name, tyrannical: spell.baseDamage * baseMultiplier, fortified: spell.baseDamage * baseMultiplier, spellID: spell.spellID, icon: spell.icon, bossName: spell.bossName || "" };
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
    <div style={{ paddingTop: "34px", paddingBottom: "34px" }}>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <OneShotClassToggle
                setSelectedClass={setSelectedClass}
                selectedClass={selectedClass}
                selectedSpec={selectedSpec}
                setSelectedSpec={setSelectedSpec}
                updateSpec={updateSpec}
                setDefensives={setDefensives}
              />

              <OneShotDungeonToggle selectedDungeon={selectedDungeon} setSelectedDungeon={updateSelectedDungeon} dungeonList={dungeonList} />

              <OneShotSlider sliderValue={keyLevel} setSliderValue={updateKeyLevel} />

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={1}>
                  <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                    <Grid container spacing={1}>
                      {/* Stats Textfields Box */}
                      <OneShotStats stats={stats} updateStats={updateStats} />

                      {/* Map Spell Selection Boxes */}
                      {spellArray.map((key) => (
                        <OneShotSpellSelection defensives={defensives} activateSpell={activateSpell} label={key.label} defensiveType={key.type} />
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <OneShotDataTable data={enemySpellList} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
