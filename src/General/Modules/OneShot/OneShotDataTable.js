import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { OneShotSpellIcon } from "./OneShotSpellIcon";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

function createData(ability, tyrannical, fortified, spellID, icon, guid, active) {
  return { ability, tyrannical, fortified, spellID, icon, guid, active };
}

export default function OneShotDataTable(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const data = props.data;
  const rows = data.map((row) => createData(row.name, row.tyrannical, row.fortified, row.spellID, row.icon, row.spellIDw, true));

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid rgba(255, 255, 255, 0.24)" }}>
      <Table sx={{}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ability</TableCell>
            <TableCell align="right">Tyrannical</TableCell>
            <TableCell align="right">Fortified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <WowheadTooltip type="spell" id={row.spellID} domain={currentLanguage} >
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <OneShotSpellIcon spell={row} iconType={"Spell"} className="table" />
                    <div>{row.ability}</div>
                  </div>
                </WowheadTooltip>
              </TableCell>
              <TableCell align="right">{row.tyrannical.toLocaleString()}</TableCell>
              <TableCell align="right">{row.fortified.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
