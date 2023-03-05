import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(ability, tyrannical, fortified) {
  return { ability, tyrannical, fortified };
}

const data = [
  { name: "Deafening Screech(1)", tyrannical: 70000, fortified: 45000 },
  { name: "Deafening Screech(2)", tyrannical: 70000, fortified: 45000 },
];

//const rows = data.map((row) => createData(row.name, row.tyranical, row.fortified))

/*
const rows = [


  createData("Deafening Screech(1)", 70000, 45000),
  createData("Deafening Screech(2)", 70000, 45000),
  createData("Deafening Screech(3)", 70000, 45000),
  createData("Deafening Screech(4)", 70000, 45000),
  createData("Deafening Screech(5)", 70000, 45000),
]; */

export default function OneShotDataTable(props) {
  const data = props.data;
  const rows = data.map((row) => createData(row.name, row.tyrannical, row.fortified));

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
                {row.ability}
              </TableCell>
              <TableCell align="right">{row.tyrannical}</TableCell>
              <TableCell align="right">{row.fortified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
