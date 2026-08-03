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

// ─── Design tokens ────────────────────────────────────────────────────────────
// A cooler, flatter "analytics dashboard" palette in place of the parchment/gold
// fantasy theme. Two accent hues (mint for healing, coral for damage) instead of
// one gold accent doing double duty, and Space Grotesk (a geometric, slightly
// technical display face) + a monospace for all numerics — legible at a glance
// and reads more like a stats panel than a menu.

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";

const COLORS = {
  bg: "#15171c",
  rowA: "#181a20",
  rowB: "#1d2028",
  border: "rgba(255,255,255,0.06)",
  divider: "rgba(0,0,0,0.4)",
  textPrimary: "#e6e8ee",
  textMuted: "#7d8394",
  textFaint: "#565b6b",
} as const;

// Accent per meter type: a fill tint for the bar body + a saturated cap color
// for the crisp leading edge (the "equalizer" signature touch).
const ACCENTS = {
  healing: { fill: "rgba(61, 220, 151, 0.10)", fillTop: "rgba(61, 220, 151, 0.16)", cap: "#3ddc97" },
  damage: { fill: "rgba(242, 84, 91, 0.10)", fillTop: "rgba(242, 84, 91, 0.16)", cap: "#f2545b" },
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt2 = (n: number) => n.toFixed(2);
const fmtInt = (n: number) => n.toLocaleString();

// "#3ddc97" -> "rgba(61, 220, 151, 0.55)"
const hexToRgba = (hex: string, alpha: number): string => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Parses "42.5%" / "42.5" / 0.425 -> 42.5. Falls back to 0.
const parsePercent = (value?: string | number): number => {
  if (value === undefined || value === null) return 0;
  const n =
    typeof value === "number" ? value : parseFloat(value.replace("%", ""));
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : 0;
};

// ─── Shared sx shorthands ─────────────────────────────────────────────────────

const sxTh = {
  fontSize: "10px",
  fontFamily: FONT_DISPLAY,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: COLORS.textMuted,
  background: COLORS.bg,
  borderBottom: `1px solid ${COLORS.border}`,
  whiteSpace: "nowrap",
  py: "9px",
  px: "14px",
} as const;

const sxTd = {
  fontFamily: FONT_DISPLAY,
  fontSize: "13px",
  fontWeight: 500,
  color: COLORS.textPrimary,
  borderBottom: `1px solid ${COLORS.divider}`,
  whiteSpace: "nowrap",
  py: "8px",
  px: "14px",
  background: "transparent", // row background carries the meter bar instead
} as const;

const sxTdNumeric = {
  ...sxTd,
  fontFamily: FONT_MONO,
  fontWeight: 400,
  color: "#c3c7d1",
  textAlign: "right",
} as const;

const sxTdRank = {
  ...sxTd,
  color: COLORS.textFaint,
  fontFamily: FONT_MONO,
  fontSize: "11px",
  textAlign: "right",
  width: "1%",
  paddingRight: "8px",
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const SpellBreakdown: React.FC<SpellBreakdownProps> = ({ rows, activeResult, tag }) => {
  const isHealing = tag === "healing";
  const accent = isHealing ? ACCENTS.healing : ACCENTS.damage;

  // Bars are scaled relative to the top spell, not to 0–100%, since with many
  // contributing sources even the top spell might only be ~10-15% of the total.
  // Top spell = full-width bar; everyone else is proportional to it.
  const maxPercent = rows.reduce((max, row) => {
    const p = parsePercent(isHealing ? row.percentHealing : row.percentDamage);
    return p > max ? p : max;
  }, 0);

  return (
    <div style={{ padding: "10px 12px 12px", background: COLORS.bg }}>
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
              const rowBg = i % 2 === 0 ? COLORS.rowA : COLORS.rowB;
              const fill = i === 0 ? accent.fillTop : accent.fill;

              // Bar body is a soft tinted fill; a hairline "cap" sits at the fill's
              // leading edge, like an equalizer/meter needle, so the magnitude
              // still reads clearly without a heavy line competing with the text.
              const capStart = Math.max(percent - 0.15, 0);
              const capEnd = Math.min(percent + 0.15, 100);
              const capColorRgba = hexToRgba(accent.cap, 0.55);

              return (
                <TableRow
                  key={i}
                  sx={{
                    background: `linear-gradient(90deg,
                      ${fill} 0%, ${fill} ${capStart}%,
                      ${capColorRgba} ${capStart}%, ${capColorRgba} ${capEnd}%,
                      ${rowBg} ${capEnd}%, ${rowBg} 100%)`,
                    borderLeft: i === 0 ? `2px solid ${accent.cap}` : "2px solid transparent",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                    transition: "filter 0.12s ease",
                    "&:hover": { filter: "brightness(1.12)" },
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
                            borderRadius: "4px",
                            flexShrink: 0,
                            border: "1px solid rgba(255,255,255,0.08)",
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
                  sx={{ ...sxTd, color: COLORS.textFaint, textAlign: "center" }}
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
          fontFamily: FONT_DISPLAY,
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: COLORS.textMuted,
          paddingRight: "2px",
        }}
      >
        <span style={{ color: accent.cap, marginRight: "8px" }}>
          {isHealing ? "TOTAL HPS" : "TOTAL DPS"}:
        </span>
        <span style={{ fontFamily: FONT_MONO, color: COLORS.textPrimary }}>
          {Math.round((isHealing ? activeResult?.healing : activeResult?.damage) || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default SpellBreakdown;