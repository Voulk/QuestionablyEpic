import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SpellIcon } from "General/Modules/SequenceGenerator/SpellIcon"

import { buildEvokerChartData } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PresEvokerRampGen";
import { buildDiscChartData } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampUtilities";
import { buildPaladinChartData } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinRampUtilities";
import { buildDruidChartData } from "General/Modules/Player/ClassDefaults/RestoDruid/DruidRampGen";
import { buildHolyPriestChartData } from "Retail/Engine/EffectFormulas/Priest/HolyPriestRampGen";

import { buildClassicChartData } from "General/Modules/Player/ClassDefaults/Classic/ClassicChartGen";

/*function createData(ability, tyrannical, fortified, spellID, icon, guid, active, bossName) {
  return { ability, tyrannical, fortified, spellID, icon, guid, active, bossName };
} */

function buildChartData(spec, stats, talents) {
  if (spec === "Holy Paladin") {
    return buildPaladinChartData(stats, talents);
  } else if (spec === "Discipline Priest") {
    return buildDiscChartData(stats, talents);
  } else if (spec === "Preservation Evoker") {
    return buildEvokerChartData(stats, talents);
  }
  else if (spec === "Restoration Druid") {
    return buildDruidChartData(stats, talents);
  }
  else if (spec === "Holy Priest") {
    return buildHolyPriestChartData(stats, talents);
  }
  else if (spec === "Restoration Druid Classic") {
    return buildClassicChartData(stats, "Restoration Druid")
  }
  else if (spec === "Holy Paladin Classic") {
    return buildClassicChartData(stats, "Holy Paladin")
  }
  else if (spec === "Discipline Priest Classic") {
    return buildClassicChartData(stats, "Discipline Priest")
  }
  else if (spec === "Holy Priest Classic") {
    return buildClassicChartData(stats, "Holy Priest")
  }
  else {
    return [];
  }
}

export default function SequenceDataTable(props) {
  const { t, i18n } = useTranslation();
  const lightColor = "#515151"; // Example light color
  const darkColor = "#474747"; // Example dark color

  const data = buildChartData(props.spec, props.stats, props.talents);//buildEvokerChartData(); //props.data;
  
  const rows = data;
  const cats = [...new Set(data.map(item => item.cat))];
  //const rows = data.map((row) => createData(row.name, row.tyrannical, row.fortified, row.spellID, row.icon, row.spellID, true, row.bossName));

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid rgba(255, 255, 255, 0.24)" }}>
      <Table sx={{}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Spell Combo</TableCell>
            <TableCell align="right">Healing</TableCell>
            <TableCell align="right">HPM</TableCell>
            <TableCell align="right">HPCT</TableCell>
            <TableCell align="right">DPS</TableCell>
          </TableRow>
        </TableHead>
            <TableBody>
              {cats.map((cat) => {
                  let currentColor = lightColor;

                  // Here, we explicitly return the content for each category
                  return (
                    <>
                      <TableRow>
                        <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>{cat}</TableCell>
                      </TableRow>
                      {rows
                        .filter(row => row.cat === cat)
                        .map((row, index) => {
                          currentColor = currentColor === lightColor ? darkColor : lightColor;
                          
                          // Also here, explicitly return the TableRow for each row
                          return (
                            <TableRow key={row.name} style={{ backgroundColor: currentColor }} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                                  <SpellIcon spell={row.spell} iconType={"Spell"} className="table" 
                                    style={{ display: "block", width: '18px', height: '18px', marginRight: "10px", verticalAlign: 'middle', border: "1px solid rgba(20, 20, 20, 0.5)" }} />
                                  <div>{row.tag}</div>
                                </div>
                              </TableCell>
                              <TableCell align="right">{row.hps.toLocaleString()}</TableCell>
                              <TableCell align="right">{row.hpm}</TableCell>
                              <TableCell align="right">{row.hpct.toLocaleString()}</TableCell>
                              <TableCell align="right">{row.dps}</TableCell>
                            </TableRow>
                          );
                        })
                      }
                    </>
                  );
                })}
      </TableBody>
      </Table>
    </TableContainer>
  );
}
