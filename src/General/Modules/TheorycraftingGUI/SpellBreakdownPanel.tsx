import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SpellRow {
  spellName: string;
  icon?: string;
  cpm: number;
  overhealing: number;
  hps?: number;
  dps?: number;
  percentHealing?: string;
  percentDamage?: string;
}

export interface SpellBreakdownProps {
  rows: SpellRow[];
  activeResult?: any;
  tag: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt2 = (n: number) => n.toFixed(2);
const fmtInt = (n: number) => n.toLocaleString();

// Parses "42.5%" / "42.5" / 0.425 -> 42.5. Falls back to 0.
const parsePercent = (value?: string | number): number => {
  if (value === undefined || value === null) return 0;
  const n =
    typeof value === "number" ? value : parseFloat(value.replace("%", ""));
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : 0;
};

// Bar colors: rank 1 gets the gold accent used for TOTAL HPS, everyone else
// gets a quieter tone so the top parse still reads as "the" bar in the row.
const BAR_COLORS = {
  healing: { top: "rgba(218, 165, 32, 0.16)", rest: "rgba(120, 170, 160, 0.10)" },
  damage: { top: "rgba(218, 165, 32, 0.16)", rest: "rgba(180, 90, 70, 0.12)" },
} as const;

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
  borderBottom: "1px solid rgba(0, 0, 0, 0.55)", // dark + semi-transparent so it stays visible over any bar color
  whiteSpace: "nowrap",
  py: "8px",
  px: "14px",
  background: "transparent", // row background carries the meter bar instead
} as const;

const sxTdNumeric = {
  ...sxTd,
  fontFamily: "monospace",
  color: "#bbb",
  textAlign: "right",
} as const;

const sxTdRank = {
  ...sxTd,
  color: "#666",
  fontFamily: "monospace",
  fontSize: "11px",
  textAlign: "right",
  width: "1%",
  paddingRight: "8px",
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const SpellBreakdown: React.FC<SpellBreakdownProps> = ({ rows, activeResult, tag }) => {
  const isHealing = tag === "healing";
  const palette = isHealing ? BAR_COLORS.healing : BAR_COLORS.damage;

  // Bars are scaled relative to the top spell, not to 0–100%, since with many
  // contributing sources even the top spell might only be ~10-15% of the total.
  // Top spell = full-width bar; everyone else is proportional to it.
  const maxPercent = rows.reduce((max, row) => {
    const p = parsePercent(isHealing ? row.percentHealing : row.percentDamage);
    return p > max ? p : max;
  }, 0);

  return (
    <div style={{ padding: "10px 12px 12px" }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...sxTh, width: "1%" }} />
              <TableCell sx={sxTh}>Spell Name</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>{isHealing ? "HPS" : "DPS"}</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>{isHealing ? "% Healing" : "% Damage"}</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>CPM</TableCell>
              <TableCell sx={{ ...sxTh, textAlign: "right" }}>Overhealing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              const rawPercent = parsePercent(isHealing ? row.percentHealing : row.percentDamage);
              const percent = maxPercent > 0 ? (rawPercent / maxPercent) * 100 : 0;
              const rowBg = i % 2 === 0 ? "#1a1a1a" : "#252525";
              const barColor = i === 0 ? palette.top : palette.rest;

              return (
                <TableRow
                  key={i}
                  sx={{
                    background: `linear-gradient(90deg, ${barColor} 0%, ${barColor} ${percent}%, ${rowBg} ${percent}%, ${rowBg} 100%)`,
                    borderLeft: i === 0 ? "2px solid #DAA520" : "2px solid transparent",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)", // faint top bevel, reads as a seam regardless of bar color
                    transition: "filter 0.12s ease",
                    "&:hover": { filter: "brightness(1.1)" },
                  }}
                >
                  <TableCell sx={sxTdRank}>{i + 1}</TableCell>
                  <TableCell sx={sxTd}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {row.icon && (
                        <img
                          src={"https://wow.zamimg.com/images/wow/icons/large/" + row.icon + ".jpg"}
                          alt=""
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "3px",
                            flexShrink: 0,
                            border: "1px solid rgba(255,255,255,0.12)",
                          }}
                        />
                      )}
                      {row.spellName}
                    </div>
                  </TableCell>
                  <TableCell sx={sxTdNumeric}>{fmtInt(isHealing ? row.hps : row.dps)}</TableCell>
                  <TableCell sx={sxTdNumeric}>{isHealing ? row.percentHealing : row.percentDamage}</TableCell>
                  <TableCell sx={sxTdNumeric}>{fmt2(row.cpm)}</TableCell>
                  <TableCell sx={sxTdNumeric}>{fmt2(row.overhealing ? row.overhealing : 0)}</TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{ ...sxTd, color: "#555", textAlign: "center" }}
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "12px",
          letterSpacing: "0.08em",
          color: "#999",
          paddingRight: "2px",
        }}
      >
        <span style={{ color: "#DAA520", marginRight: "8px" }}>TOTAL HPS:</span>
        <span style={{ fontFamily: "monospace", color: "#e0e0e0" }}>
          {Math.round(activeResult?.healing || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default SpellBreakdown;