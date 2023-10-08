import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { buildEvokerChartData } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRampGen";
import { buildDiscChartData } from "General/Modules/Player/DiscPriest/DiscRampUtilities";
import { buildPaladinChartData } from "Retail/Engine/EffectFormulas/Paladin/HolyPaladinRampUtilities";

/*function createData(ability, tyrannical, fortified, spellID, icon, guid, active, bossName) {
  return { ability, tyrannical, fortified, spellID, icon, guid, active, bossName };
} */

export default function SequenceDataTable(props) {
  const { t, i18n } = useTranslation();
  const data = buildPaladinChartData(props.stats, props.talents);//buildEvokerChartData(); //props.data;
    const rows = data;
  //const rows = data.map((row) => createData(row.name, row.tyrannical, row.fortified, row.spellID, row.icon, row.spellID, true, row.bossName));

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid rgba(255, 255, 255, 0.24)" }}>
      <Table sx={{}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Spell Combo</TableCell>
            <TableCell align="right">Healing</TableCell>
            <TableCell align="right">HPM</TableCell>
            <TableCell align="right">DPS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                      {/*<OneShotSpellIcon spell={row} iconType={"Spell"} className="table" /> */}
                      <div>{row.tag}</div>
                    </div>
                </TableCell>
                <TableCell align="right">{row.hps.toLocaleString()}</TableCell>
                <TableCell align="right">{row.hpm}</TableCell>
                <TableCell align="right">{row.dps}</TableCell>
              </TableRow>
            ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
