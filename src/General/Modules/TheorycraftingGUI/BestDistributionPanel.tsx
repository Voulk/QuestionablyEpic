import React from "react";
import Button from "@mui/material/Button";
import TCPanel from "./TCPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BestInSlotStats {
  haste: number;
  crit: number;
  mastery: number;
  versatility: number;
}

export interface BestInSlotPanelProps {
  /** Best-performing stat combination found so far. Undefined fields show as a placeholder. */
  stats?: Partial<BestInSlotStats>;
  /** Called when the user clicks "Go" to kick off the simulation run. */
  onRun?: () => void;
  /** Show a running/disabled state on the Go button while sims are in flight. */
  isRunning?: boolean;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
// Shared with SpellBreakdown / ControlPanel / ModelInformationTabs / StatScalingChart / TCPanel.

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";

const COLORS = {
  rowA: "#181a20",
  border: "rgba(255,255,255,0.06)",
  textPrimary: "#e6e8ee",
  textMuted: "#7d8394",
  textFaint: "#565b6b",
};

const PRIMARY = "#e3b341";

// ─── Stat field metadata ──────────────────────────────────────────────────────

const STAT_FIELDS: { key: keyof BestInSlotStats; label: string }[] = [
  { key: "haste", label: "Haste" },
  { key: "crit", label: "Crit" },
  { key: "mastery", label: "Mastery" },
  { key: "versatility", label: "Versatility" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const BestInSlotPanel: React.FC<BestInSlotPanelProps> = ({ stats, onRun, isRunning = false }) => {
  return (
    <TCPanel
      title="Best-in-Slot Stat Distribution"
      action={
        <Button
          variant="contained"
          onClick={onRun}
          disabled={isRunning}
          sx={{
            background: PRIMARY,
            fontFamily: FONT_DISPLAY,
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "#15171c",
            borderRadius: "5px",
            padding: "6px 20px",
            minWidth: 0,
            boxShadow: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              background: "#c99a2e",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              background: "rgba(227, 179, 65, 0.25)",
              color: "rgba(21, 23, 28, 0.6)",
            },
          }}
        >
          {isRunning ? "Running…" : "Go"}
        </Button>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          padding: "16px 20px",
          boxSizing: "border-box",
        }}
      >
        {STAT_FIELDS.map(({ key, label }) => (
          <StatDisplayField
            key={key}
            label={label}
            value={stats?.[key]}
          />
        ))}
      </div>
    </TCPanel>
  );
};

// ─── Sub-component: read-only stat output field ──────────────────────────────

const StatDisplayField: React.FC<{
  label: string;
  value?: number;
}> = ({ label, value }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
      <label
        style={{
          fontSize: "10px",
          color: COLORS.textMuted,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: FONT_DISPLAY,
        }}
      >
        {label}
      </label>
      <div
        style={{
          width: "100%",
          padding: "7px 8px",
          background: COLORS.rowA,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "4px",
          color: value === undefined ? COLORS.textFaint : COLORS.textPrimary,
          fontFamily: FONT_MONO,
          fontSize: "13px",
          textAlign: "right",
          boxSizing: "border-box",
        }}
      >
        {value === undefined ? "—" : value.toLocaleString()}
      </div>
    </div>
  );
};

export default BestInSlotPanel;