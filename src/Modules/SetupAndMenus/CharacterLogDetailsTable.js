import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  table: {},
});

export default function LogDetailsTable(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const rows = props.data;

  return (
    <TableContainer
    // component={Paper}
    >
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 30 }}>Spell</TableCell>
            <TableCell align="right">Casts</TableCell>
            <TableCell align="right" style={{ width: 30 }}>
              Healing
            </TableCell>
            <TableCell align="right" style={{ width: 30 }}>
              HPS
            </TableCell>
            <TableCell align="right" style={{ width: 30 }}>
              Overhealing
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.getOwnPropertyNames(rows).map((row) => (
            <TableRow key={row}>
              <TableCell
                component="th"
                scope="row"
                style={{
                  whiteSpace: "nowrap",
                  display: "table-cell",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    verticalAlign: "middle",
                    marginRight: -4,
                  }}
                >
                  <a data-wowhead={"spell=" + row}>
                    <img height={16} width={16} style={{ marginRight: 4 }} />
                  </a>
                  {t("SpellNames." + row)}
                </div>
              </TableCell>
              <TableCell align="right">{rows[row].casts}</TableCell>
              <TableCell align="right">{rows[row].healing}</TableCell>
              <TableCell align="right">{rows[row].hps}</TableCell>
              <TableCell align="right">{rows[row].overhealing}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
