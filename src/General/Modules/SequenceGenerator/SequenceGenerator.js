import { useState, useRef } from "react";
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { sequence, SequenceObject } from "./Sequence";
import StatPanel from "./SeqStatPanel";

import { useSelector } from "react-redux";

import { runCastSequence as evokerSequence } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRamps";
import { runCastSequence as discSequence } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscPriestRamps";
import { runCastSequence as shamanSequence } from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanRamps";
import { runCastSequence as paladinSequence } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinRamps";
import { runCastSequence as druidSequence } from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidRamps";
import { runCastSequence as monkSequence } from "General/Modules/Player/ClassDefaults/MistweaverMonk/MonkSpellSequence";
import { runCastSequence as holyPriestSequence } from "General/Modules/Player/ClassDefaults/HolyPriest/HolyPriestSpellSequence";

// Classic
import { runCastSequence as classicSequence } from "General/Modules/Player/ClassDefaults/Classic/ClassicRamps";

import { EVOKERSPELLDB, evokerTalents } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerSpellDB";
import { DISCSPELLS, baseTalents as discTalents } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscSpellDB";
import { SHAMANSPELLDB } from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanSpellDBWarWithin";
import { PALADINSPELLDB, baseTalents as palaTalents } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinSpellDBTWW";
import { DRUIDSPELLDB, druidTalents } from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidSpellDBTWW";

import { HOLYPRIESTSPELLDB, baseTalents as holyPriestTalents } from "General/Modules/Player/ClassDefaults/HolyPriest/HolyPriestSpellDB";
import { MONKSPELLS } from "General/Modules/Player/ClassDefaults/MistweaverMonk/MistweaverSpellDB";
import { baseTalents as monkTalents } from "General/Modules/Player/ClassDefaults/MistweaverMonk/MistweaverTalents"
import { buildRamp } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampGen";
import { buildEvokerRamp } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRampGen";

// Classic
import { CLASSICDRUIDSPELLDB, druidTalents as classicDruidTalents } from "General/Modules/Player/ClassDefaults/Classic/Druid/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB, paladinTalents as classicPaladinTalents } from "General/Modules/Player/ClassDefaults/Classic/Paladin/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB, compiledDiscTalents as classicDiscTalents, compiledHolyTalents as classicHolyTalents } from "General/Modules/Player/ClassDefaults/Classic/Priest/ClassicPriestSpellDB";
import { CLASSICMONKSPELLDB, monkTalents as classicMonkTalents } from "General/Modules/Player/ClassDefaults/Classic/Monk/ClassicMonkSpellDB";

import { SpellIcon } from "./SpellIcon";
import { classColours } from "General/Engine/ClassData";
import "./Sequence.css";
import SequenceDataTable from "./SequenceDataTable";

import SequenceSettings from "General/Modules/SequenceGenerator/SequenceSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "100%",
      justifyContent: "center",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "66%",
      justifyContent: "center",
      display: "block",
      paddingTop: 80,
      paddingBottom: 40
    },
  },
}));

const getSpellDB = (spec) => {
  if (spec === "Preservation Evoker") return EVOKERSPELLDB;
  else if (spec === "Discipline Priest") return DISCSPELLS;
  else if (spec === "Restoration Shaman") return SHAMANSPELLDB;
  else if (spec === "Holy Paladin") return PALADINSPELLDB;
  else if (spec === "Restoration Druid") return DRUIDSPELLDB;
  else if (spec === "Mistweaver Monk") return MONKSPELLS;
  else if (spec === "Holy Priest") return HOLYPRIESTSPELLDB;

  // Classic
  else if (spec === "Restoration Druid Classic") return CLASSICDRUIDSPELLDB;
  else if (spec === "Holy Paladin Classic") return CLASSICPALADINSPELLDB;
  else if (spec === "Discipline Priest Classic") return CLASSICPRIESTSPELLDB;
  else if (spec === "Holy Priest Classic") return CLASSICPRIESTSPELLDB;
  else if (spec === "Mistweaver Monk Classic") return CLASSICMONKSPELLDB;
};

const getTalentDB = (spec) => {
  if (spec === "Preservation Evoker") return evokerTalents;
  else if (spec === "Discipline Priest") return discTalents;
  else if (spec === "Restoration Shaman") return null;
  else if (spec === "Holy Paladin") return palaTalents;
  else if (spec === "Restoration Druid") return druidTalents;
  else if (spec === "Mistweaver Monk") return monkTalents;
  else if (spec === "Holy Priest") return holyPriestTalents;

  // Classic
  else if (spec === "Restoration Druid Classic") return classicDruidTalents;
  else if (spec === "Holy Paladin Classic") return classicPaladinTalents;
  else if (spec === "Discipline Priest Classic") return classicDiscTalents;
  else if (spec === "Holy Priest Classic") return classicHolyTalents;
  else if (spec === "Mistweaver Monk Classic") return classicMonkTalents;
  else return null;
};

const saveStats = (newStats) => {

}

const getSpecSettings = (spec) => {
  const baseSettings = {
    includeOverheal: { title: "Include Overhealing", value: "Yes", options: ["Yes", "No"] },
    testMode: { title: "Ignore Secondaries & Buffs", value: "Yes", options: ["Yes", "No"] },
  }
  if (spec === "Preservation Evoker") {
    return baseSettings;
  } 
  else if (spec === "Discipline Priest") {
      return {
        ...baseSettings, 
          includeOverheal: { title: "Include Overhealing", value: "Yes", options: ["Yes", "No"] },
          openWithDoT: { title: "Open with DoT active", value: "Yes", options: ["Yes", "No"] },
          numEnemyTargets: { title: "Num Enemy Targets", value: 1, options: [1, 2, 3, 4, 5] },
          execute: { title: "Execute", value: "Ignore", options: ["Ignore", "20% of the time", "Always"] },
        };
      }
  else {
    return baseSettings;
  }
};

const compressSettings = (settings) => {
  const newObject = {};
  Object.keys(settings).forEach((key) => {
    newObject[key] = settings[key].value;
  });
  return newObject;
};

const getSequence = (spec) => {
  if (spec === "Preservation Evoker") return evokerSequence;
  else if (spec === "Discipline Priest") return discSequence;
  else if (spec === "Restoration Shaman") return shamanSequence;
  else if (spec === "Holy Paladin") return paladinSequence;
  else if (spec === "Restoration Druid") return druidSequence;
  else if (spec === "Mistweaver Monk") return monkSequence;
  else if (spec === "Holy Priest") return holyPriestSequence;
  else if (spec.includes("Classic")) return classicSequence;
  else console.error("Invalid Spec");

};

const setupSequences = (len = 1) => {
  const seqArray = [];

  for (let i = 0; i < len; i++) {
    seqArray.push(JSON.parse(JSON.stringify(sequence)));
  }

  return seqArray;
};

const roundN = (num, places) => {
  return Math.round(num * 10 ** places) / 10 ** places;
}

export default function SequenceGenerator(props) {
  const selectedSpec = props.player.getSpec();
  const spellDB = getSpellDB(selectedSpec);
  const gameType = useSelector((state) => state.gameType);
  const spellCategories = ["Healing", "Damage", "Cooldowns & Other"];

  const classes = useStyles();
  const [seq, setSeq] = useState([]);
  const [sequences, setSequences] = useState(setupSequences());
  const [selectedSeq, setSelectedSeq] = useState(0);
  const [activeStats, setActiveStats] = useState(selectedSpec.includes("Classic") ? 
                                { spellpower: 5200, intellect: 9500, haste: 2020, crit: 3300, mastery: 3000, spirit: 1000, averageDamage: 5585.25, weaponSwingSpeed: 3.4, isTwoHanded: true } :
                                { intellect: 131420, haste: 7000, crit: 20000, mastery: 20000, versatility: 7500, stamina: 16000 });

  const [talentDB, setTalentDB] = useState(getTalentDB(selectedSpec));
  const [result, setResult] = useState({ totalDamage: 0, totalHealing: 0, hpm: 0 });
  const [combatLog, setCombatLog] = useState([]);
  const [seqSettings, setSeqSettings] = useState(getSpecSettings(selectedSpec));

  const editSettings = (key, value) => {
    const temp = { ...seqSettings };
    temp[key].value = value;
    setSeqSettings(temp);
    updateSequence(seq);
  };

  const updateSequences = (id, newSeq, sim) => {
    let temp = [...sequences];
    temp[id].spells = newSeq;

    temp[id].data = {hps: roundN(sim.hps, 0), hpm: roundN(sim.hpm, 2), dps: roundN(sim.dps, 0)};

    

    setSequences(temp);
  };

  const spellList = {
    Damage: Object.keys(spellDB).filter((spell) => (spellDB[spell][0].spellData?.cat === "damage" && (spellDB[spell][0].spellData?.spec === selectedSpec || !spellDB[spell][0].spellData.spec))),
    Healing: Object.keys(spellDB).filter((spell) => (spellDB[spell][0].spellData?.cat === "heal" && (spellDB[spell][0].spellData?.spec === selectedSpec || !spellDB[spell][0].spellData.spec))),
    "Cooldowns & Other": Object.keys(spellDB).filter((spell) => spellDB[spell][0].spellData?.cat === "cooldown"),
  };
  const talentList = Object.keys(talentDB).filter((talent) => talentDB[talent].select === true);
  const [talents, setTalents] = useState({ ...talentDB });

  /*
  const stats = {
    intellect: 14500,
    haste: 3000,
    crit: 3300,
    mastery: 6500,
    versatility: 1200,
    stamina: 16000,

    critMult: 1,
  }; */

  const updateAllSequences = (sequences) => {
    const temp = [];
    for (let i = 0; i < sequences.length; i++) {
      temp.push(JSON.parse(JSON.stringify(sequence)));
      const simFunc = getSequence(selectedSpec);
      const sim = simFunc(sequences[i].spells, activeStats, { ...{ reporting: true, harshDiscipline: true, advancedReporting: true, spec: selectedSpec }, ...compressSettings(seqSettings) }, talents);
      temp[i].spells = sequences[i].spells;
      temp[i].data = {hps: roundN(sim.hps, 0), hpm: roundN(sim.hpm, 2), dps: roundN(sim.dps, 0)};
      // multiple state updates get bundled by react into one update

    }

    setSequences(temp);
  }

  // 
  const updateActiveSequence = (sequence, id) => {

  }

  
  const updateSequence = (sequence) => {
    const simFunc = getSequence(selectedSpec);
    const sim = simFunc(sequence, activeStats, { ...{ reporting: true, harshDiscipline: true, advancedReporting: true, spec: selectedSpec  }, ...compressSettings(seqSettings) }, talents);

    // multiple state updates get bundled by react into one update
    setSeq(sequence);
    updateSequences(selectedSeq, sequence, sim);
    setResult(sim);
    setCombatLog(sim.report);
  }; 

  const runIterations = (sequence, simFunc) => {
    const iter = 1;
    const results = { totalHealing: 0, totalDamage: 0, manaSpent: 0, hpm: 0 };
    let finalReport = [];

    for (let i = 0; i < iter; i++) {
      //const baseline = runCastSequence(sequence, activeStats, settings, talents)

      //const simFunc = getSequence(selectedSpec);
      const sim = simFunc(sequence, activeStats, { ...{ reporting: true, harshDiscipline: true, advancedReporting: true, spec: selectedSpec  }, ...compressSettings(seqSettings) }, talents);

      results.totalHealing += sim.totalHealing;
      results.manaSpent += sim.manaSpent;
      results.totalDamage += sim.totalDamage;

      if (i === iter - 1) finalReport = sim.report;

      //console.log("Baseline: " + JSON.stringify(baseline));
    }
    results.hpm = results.totalHealing / results.manaSpent;
    results.totalHealing /= iter;
    results.totalDamage /= iter;
    results.manaSpent /= iter;

    setResult(results);
    setCombatLog(finalReport);
  };

  const addTalent = (talentName, talentDB, setTalents) => {
    const talent = talentDB[talentName];

    if (gameType === "Classic") {
      Object.keys(talentDB).forEach((key) => {
        if (talentDB[key].tier === talent.tier  && key !== talentName && talentDB[key].tier !== 5) {
            talentDB[key].points = 0;
        }
      });
    }

    talent.points = talent.points === talent.maxPoints ? 0 : talent.points + 1;

    setTalents({ ...talentDB });
    updateSequence(seq);
    updateAllSequences(sequences);
  };

  const addSpell = (spell) => {
    updateSequence([...sequences[selectedSeq].spells, spell]);
  };

  const removeSpellAtIndex = (index, e = null) => {
    if (!!e) {
      e.preventDefault();
    }

    const editSeq = [...seq];
    editSeq.splice(index, 1);
    updateSequence(editSeq);
  };

  const insertSpellAtIndex = (spell, index) => {
    const editSeq = [...seq.slice(0, index), spell, ...seq.slice(index)];
    updateSequence(editSeq);
  };

  const moveSpell = (indexOld, indexNew) => {
    const editSeq = [...seq];
    const dragItemContent = editSeq[indexOld];
    editSeq.splice(indexOld, 1);
    editSeq.splice(indexNew, 0, dragItemContent);
    updateSequence(editSeq);
  };

  const clearSeq = () => {
    updateSequence([]);
  };

  const runSeq = () => {
    const simFunc = getSequence(selectedSpec);
    //const sim = simFunc(seq, stats, {reporting: true, harshDiscipline: true}, talents);
    runIterations(seq, simFunc);
    //setResult(sim);
  };

  const autoGen = () => {
    if (selectedSpec === "Discipline Priest") {
      updateSequence(buildRamp("Primary", 10, [], stats.haste, "", discTalents));
      const temp = [];
      for (let i = 0; i < 4; i++) {
        temp.push(JSON.parse(JSON.stringify(sequence)));
      }
      temp[0].spells = buildRamp("Primary", 10, [], stats.haste, "", discTalents);
      temp[1].spells = buildRamp("Secondary", 10, [], stats.haste, "", discTalents);
      temp[2].spells = buildRamp("RaptureLW", 10, [], stats.haste, "", discTalents);
      temp[2].spells = buildRamp("Mini", 10, [], stats.haste, "", discTalents);
      setSequences(temp);
    } else if (selectedSpec === "Preservation Evoker") {
      updateSequence(buildEvokerRamp("Reversion", 0, [], stats.haste, "", evokerTalents));
    }
  };

  //#region Drag and Drop Functions
  const dragSpell = useRef();
  const dragOverSpell = useRef();
  /**
   * Drag and Drop inside of the Sequence.
   * Moves the drag target to the location of a different spell
   * using their indexes.
   *
   * @param {*} e
   */
  const dropMove = (e) => {
    if (dragSpell.current === null || dragOverSpell.current === null) return;

    if (Number.isInteger(dragSpell.current)) {
      moveSpell(dragSpell.current, dragOverSpell.current);
    }

    dragSpell.current = null;
    dragOverSpell.current = null;
  };

  /**
   * Drag and Drop from outside into the Sequence.
   * Inserts a spell using the spell name into the list
   * at the location of your cursor.
   *
   * @param {*} e
   */
  const dropInsertion = (e) => {
    if (dragSpell.current === null || Number.isInteger(dragSpell.current)) return;

    const spell = dragSpell.current;
    // The dropping behavior is a bit weird, dropping an item on top of a spell will trigger both the spell drop & background drop so we have to circumvent double insertions
    if (e.target.className.includes("backgroundDropTarget")) addSpell(spell);
    else if (dragOverSpell.current !== null) insertSpellAtIndex(spell, dragOverSpell.current);

    dragSpell.current = null;
    dragOverSpell.current = null;
  };

  /**
   * Saves the picked up spell in a reference so we can use it
   * whenever we drop the item.
   *
   * @param {*} e
   * @param {*} value Either the index or the spell name
   */
  const dragStart = (e, value) => {
    dragSpell.current = value;
    $WowheadPower.clearTouchTooltip();
  };

  /**
   * @param {*} e
   * @param {*} position Index of the spell location we're hovering over.
   */
  const dragEnter = (e, position) => {
    dragOverSpell.current = position;
  };

  const onDragOver = (e) => {
    // required for dnd to work
    e.preventDefault();
  };
  //#endregion

  return (
    <div height="100%">
      <div className={classes.root}>
      <Grid item xs={7} sm={7} md={7} lg={7} xl={7} style={{paddingBottom: "20px"}}>
            <SequenceDataTable data={""} spec={selectedSpec} stats={activeStats} talents={talentDB} />
          </Grid>
      <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                <Paper
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.24)",
                    padding: "0px 8px 8px 8px",
                  }}
                  elevation={0}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                        {"Sequences"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      {sequences.map((s, i) => (
                        <SequenceObject index={i} seq={s} data={s.data} db={spellDB} isSelected={selectedSeq===i} spec={selectedSpec} setSelectedSeq={setSelectedSeq} />
                      ))}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

        <Grid container spacing={1} style={{paddingTop: "10px"}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
            <Paper
              style={{
                border: "1px solid rgba(255, 255, 255, 0.24)",
                padding: "0px 8px 8px 8px",
              }}
              elevation={0}
            >
              <Grid container spacing={1}>
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
                              gameType={gameType}
                              iconType={"Spell"}
                              draggable
                              onDragStart={(e) => {
                                dragStart(e, spell);
                              }}
                              onClick={(e) => addSpell(spell, e)}
                              style={{ display: "flex", width: '36px', height: '36px', borderColor: classColours(selectedSpec) }}
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
                  {[1, 2, 3, 4, 5, 6].map((tier, i) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Grid container spacing={1}>
                        {talentList.map((spell, j) =>
                          talentDB[spell].tier === tier ? (
                            <Grid item xs="auto" key={j} style={{ paddingBottom: 7 }}>
                              <SpellIcon
                                spell={talentDB[spell]}
                                spec={selectedSpec}
                                gameType={gameType}
                                iconType={"Talent"}
                                width={25}
                                //onDragStart={(e) => { dragStart(e, spell) }}
                                onClick={(e) => {
                                  e.persist();
                                  addTalent(spell, talentDB, setTalents, e);
                                }}
                                style={{ display: "flex", width: '30px', height: '30px', border: talentDB[spell].points === talentDB[spell].maxPoints ? "2px solid #F2BF59" : "2px solid rgba(255,255,255,0.2)", borderRadius: "2px" }}
                              />
                            </Grid>
                          ) : (
                            ""
                          ),
                        )}
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
                  <SequenceSettings possibleSettings={seqSettings} editSettings={editSettings} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                <Paper
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.24)",
                    padding: "0px 8px 8px 8px",
                  }}
                  elevation={0}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                        {"Combat Log"}
                      </Typography>
                    </Grid>
                    {/*<Grid item xs={12}>
                      <Paper style={{ backgroundColor: "#525252", padding: 16 }} elevation={0}>
                        <p style={{ color: "whitesmoke", paddingTop: "10px" }}>
                          {"Damage: " + result.totalDamage.toLocaleString("en-US") + ". Healing: " + result.totalHealing.toLocaleString("en-US") + ". HPM: " + Math.round(100 * result.hpm) / 100}
                        </p>
                      </Paper>
                      </Grid> */}
                    {/* Combat Log */}
                    <Grid item xs={12}>
                      <TextField value={combatLog.join("\n")} variant="outlined" multiline minRows={8} maxRows={8} fullWidth disabled style={{ whiteSpace: "pre-line" }} />
                    </Grid>
                  </Grid>
                </Paper>
                <Grid item xs={7} sm={7} md={7} lg={12} xl={12} style={{paddingTop: "10px"}}>
                  <StatPanel setActiveStats={setActiveStats} stats={activeStats} />
                </Grid>
              </Grid>
          </Grid>




        {/*<div style={{ height: 50 }}>&nbsp;</div> */}
      </div>

    </div>
  );
}
