import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SpellRow {
  spellName: string;
  cpm: number;
  overhealing: number;
  hps: number;
  percentHealing: string;
}

export interface SpellBreakdownProps {
  rows: SpellRow[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt2 = (n: number) => n.toFixed(2);
const fmtInt = (n: number) => n.toLocaleString();

// ─── Shared sx shorthands ─────────────────────────────────────────────────────

const sxTh = {
  fontSize: "10px",
  fontFamily: "'Cinzel', Georgia, serif",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#777",
  background: "#252525",
  borderBottom: "1px solid #2e2e2e",
  whiteSpace: "nowrap",
  py: "9px",
  px: "14px",
} as const;

const sxTd = {
  fontFamily: "'Cinzel', Georgia, serif",
  fontSize: "13px",
  color: "#e0e0e0",
  borderBottom: "1px solid #2a2a2a",
  whiteSpace: "nowrap",
  py: "8px",
  px: "14px",
} as const;

const sxTdNumeric = {
  ...sxTd,
  fontFamily: "monospace",
  color: "#bbb",
  textAlign: "right",
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const SpellBreakdown: React.FC<SpellBreakdownProps> = ({ rows }) => {
  return (
    <Box
      sx={{
        background: "#1e1e1e",
        border: "1px solid #3a3a3a",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <Box sx={{ px: "16px", py: "12px", borderBottom: "1px solid #2e2e2e" }}>
        <Typography
          sx={{
            fontSize: "11px",
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#DAA520",
          }}
        >
          Spell Breakdown
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={sxTh}>Spell Name</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>CPM</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>Overhealing</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>HPS</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>% Healing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ background: i % 2 === 0 ? "#1e1e1e" : "#232323" }}
              >
                <TableCell sx={sxTd}>{row.spellName}</TableCell>
                <TableCell sx={sxTdNumeric}>{fmt2(row.cpm)}</TableCell>
                <TableCell sx={sxTdNumeric}>{fmt2(row.overhealing)}</TableCell>
                <TableCell sx={sxTdNumeric}>{fmtInt(row.hps)}</TableCell>
                <TableCell sx={sxTdNumeric}>{row.percentHealing}</TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ ...sxTd, color: "#555", textAlign: "center" }}
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SpellBreakdown;

