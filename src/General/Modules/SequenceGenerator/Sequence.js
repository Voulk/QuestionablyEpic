import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { sequenceTheme } from "./SequenceTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useTheme } from "@mui/material/styles";

import { runCastSequence as evokerSequence } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRamps";
import { runCastSequence as discSequence } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscPriestRamps";
import { runCastSequence as shamanSequence } from "Retail/Engine/EffectFormulas/Shaman/RestoShamanRamps";
import { runCastSequence as paladinSequence } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinRamps";
import { runCastSequence as druidSequence } from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidRamps";
import { runCastSequence as monkSequence } from "Retail/Engine/EffectFormulas/Monk/MonkSpellSequence";
import { runCastSequence as holyPriestSequence } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellSequence";

import { EVOKERSPELLDB, evokerTalents } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerSpellDB";
import { DISCSPELLS, baseTalents as discTalents } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscSpellDB";
import { SHAMANSPELLDB } from "Retail/Engine/EffectFormulas/Shaman/RestoShamanSpellDB";
import { PALADINSPELLDB, baseTalents as palaTalents } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinSpellDB";
import { DRUIDSPELLDB, druidTalents } from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidSpellDB";
import { HOLYPRIESTSPELLDB, baseTalents as holyPriestTalents } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellDB";
import { MONKSPELLS, baseTalents as monkTalents } from "Retail/Engine/EffectFormulas/Monk/MistweaverSpellDB";
import { buildRamp } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampGen";
import { buildEvokerRamp } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRampGen";

import { SpellIcon } from "./SpellIcon";
import "./Sequence.css";

import Counter from "./SequenceCounter";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    // Remove marginRight: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const sequence = {
  id: 0,
  seqName: "",
  spells: [],
  data: { hps: 6000, hpm: 15, dps: 4 },
};

export function SequenceObject(props) {
  //#region Drag and Drop Functions
  const index = props.index;
  const dragSpell = useRef();
  const dragOverSpell = useRef();

  const seq = props.seq.spells;
  const spellDB = props.db;
  const selectedSpec = props.spec;
  const setSelectedSeq = props.setSelectedSeq;

  const [expanded, setExpanded] = useState(false);
  const isSelected = props.isSelected;

  const theme = useTheme();

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

  const onDragOver = (e) => {
    // required for dnd to work
    e.preventDefault();
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
   * @param {*} e
   * @param {*} position Index of the spell location we're hovering over.
   */
  const dragEnter = (e, position) => {
    dragOverSpell.current = position;
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={sequenceTheme}>
        <Accordion style={{ borderColor: isSelected ? "goldenrod" : "" }} index={index} fullWidth expanded={expanded} onClick={(e) => setSelectedSeq(index)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon onClick={(e) => setExpanded(expanded ? false : true)} />} aria-controls="panel1a-content" id="panel1a-header">
            <Grid
              container
              spacing={1}
              style={{
                marginRight: expanded ? theme.spacing(2) : theme.spacing(2),
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 1 }}>
                              {index + 1}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: "24px",
                                bgcolor: theme.palette.text.primary,
                                mx: 1,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{"HPS: " + props.data.hps}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{"HPM: " + props.data.hpm}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{"DPS: " + props.data.dps}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/*<Grid item>
                    <Counter />
                    </Grid> */}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={1} alignItems="center" className="backgroundDropTarget" onDragOver={onDragOver} onDrop={dropInsertion} style={{ width: "100%" }}>
                  {seq.map((spell, index) => (
                    <Grid
                      item
                      xs={"auto"}
                      key={index}
                      onDragOver={onDragOver}
                      onDragEnd={dropMove}
                      onDrop={dropInsertion}
                      onDragEnter={(e) => {
                        dragEnter(e, index);
                      }}
                    >
                      <SpellIcon
                        spell={spellDB[spell][0].spellData}
                        spec={selectedSpec}
                        iconType={"Spell"}
                        gameType={props.gameType}
                        draggable
                        onDragStart={(e) => {
                          dragStart(e, index);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          removeSpellAtIndex(index, e);
                        }}
                        style={{ display: "flex", width: "30px", height: "30px" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div style={{ height: 4 }} />
              </Grid> */}
            </Grid>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
