import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import { runCastSequence as evokerSequence } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps";
import { runCastSequence as discSequence } from "General/Modules/Player/DiscPriest/DiscPriestRamps";
import { runCastSequence as shamanSequence } from "Retail/Engine/EffectFormulas/Shaman/RestoShamanRamps";
import { runCastSequence as paladinSequence } from "Retail/Engine/EffectFormulas/Paladin/HolyPaladinRamps";
import { runCastSequence as druidSequence } from "Retail/Engine/EffectFormulas/Druid/RestoDruidRamps";
import { runCastSequence as monkSequence } from "Retail/Engine/EffectFormulas/Monk/MonkSpellSequence";
import { runCastSequence as holyPriestSequence } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellSequence";

import { EVOKERSPELLDB, evokerTalents } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerSpellDB";
import { DISCSPELLS, baseTalents as discTalents } from "General/Modules/Player/DiscPriest/DiscSpellDB";
import { SHAMANSPELLDB } from "Retail/Engine/EffectFormulas/Shaman/RestoShamanSpellDB";
import { PALADINSPELLDB, baseTalents as palaTalents } from "Retail/Engine/EffectFormulas/Paladin/HolyPaladinSpellDB";
import { DRUIDSPELLDB, baseTalents as druidTalents } from "Retail/Engine/EffectFormulas/Druid/RestoDruidSpellDB";
import { HOLYPRIESTSPELLDB, baseTalents as holyPriestTalents } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellDB";
import { MONKSPELLS, baseTalents as monkTalents } from "Retail/Engine/EffectFormulas/Monk/MistweaverSpellDB";
import { buildRamp } from "General/Modules/Player/DiscPriest/DiscRampGen";
import { buildEvokerRamp } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRampGen";

import { SpellIcon } from "./SpellIcon";
import "./Sequence.css";

export const sequence = {
  id: 0,
  seqName: "",
  spells: [],
};

export function SequenceObject(props) {
  //#region Drag and Drop Functions
  const dragSpell = useRef();
  const dragOverSpell = useRef();

  const seq = props.seq.spells;
  const spellDB = props.db;
  const selectedSpec = props.spec;

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
    // <Paper style={{ padding: "8px 8px 4px 8px", minHeight: 40 }} elevation={0}>
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center" className="backgroundDropTarget" onDragOver={onDragOver} onDrop={dropInsertion}>
        {/*<Grid item xs="auto">
            <LooksOneIcon fontSize="large" />
            </Grid> */}

        {seq.map((spell, index) => (
          <Grid
            item
            xs="auto"
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
              draggable
              onDragStart={(e) => {
                dragStart(e, index);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                removeSpellAtIndex(index, e);
              }}
              style={{ display: "flex" }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
    // </Paper>
  );
}
