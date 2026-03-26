import React, { useState } from "react";
import Button from "@mui/material/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  label: string;
}

export interface StatWeights {
  intellect: number;
  haste: number;
  crit: number;
  mastery: number;
  versatility: number;
}

export interface ControlPanelProps {
  profiles: Profile[];
  stats: Stats;
  setStats: (stats: Stats) => void;
  onRunProfile?: (profileId: string, stats: StatWeights) => void;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    width: "260px",
    padding: "20px",
    background: "#303030",
    border: "1px solid #3a3a3a",
    borderRadius: "6px",
    fontFamily: "'Cinzel', 'Georgia', serif",
    color: "#e0e0e0",
  },

  sectionTitle: {
    fontSize: "10px",
    fontFamily: "'Cinzel', 'Georgia', serif",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "#DAA520",
    marginBottom: "7px",
    paddingBottom: "5px",
    borderBottom: "1px solid #2e2e2e",
  },

  // ── Profile dropdown ──────────────────────────────────────────────────────

  selectWrapper: {
    position: "relative" as const,
  },

  select: {
    width: "100%",
    padding: "8px 28px 8px 10px",
    background: "#2a2a2a",
    border: "1px solid #3a3a3a",
    borderRadius: "4px",
    color: "#e0e0e0",
    fontFamily: "'Cinzel', 'Georgia', serif",
    fontSize: "13px",
    appearance: "none" as const,
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box" as const,
  },

  selectChevron: {
    position: "absolute" as const,
    right: "9px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none" as const,
    color: "#DAA520",
    fontSize: "11px",
  },

  // ── Statistics box ────────────────────────────────────────────────────────

  statsBox: {
    border: "1px solid #2e2e2e",
    borderRadius: "5px",
    padding: "12px 14px",
    background: "#252525",
    display: "flex",
    flexDirection: "column" as const,
    gap: "9px",
  },

  statRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },

  statLabel: {
    fontSize: "11px",
    color: "#999",
    letterSpacing: "0.04em",
    flex: 1,
    fontFamily: "'Cinzel', 'Georgia', serif",
  },

  statInput: {
    width: "78px",
    padding: "5px 8px",
    background: "#1a1a1a",
    border: "1px solid #3a3a3a",
    borderRadius: "3px",
    color: "#e0e0e0",
    fontFamily: "monospace",
    fontSize: "13px",
    textAlign: "right" as const,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s, box-shadow 0.15s",
  },

  // ── Run button styles handled via MUI sx prop ─────────────────────────────
};

// ─── Stat field metadata ──────────────────────────────────────────────────────

const STAT_FIELDS: { key: keyof StatWeights; label: string }[] = [
  { key: "intellect", label: "Intellect" },
  { key: "haste", label: "Haste" },
  { key: "crit", label: "Crit" },
  { key: "mastery", label: "Mastery" },
  { key: "versatility", label: "Versatility" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ControlPanel: React.FC<ControlPanelProps> = ({
  profiles = [],
  stats = { intellect: 0, haste: 0, crit: 0, mastery: 0, versatility: 0 },
  setStats,
  onRunProfile,
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    profiles[0]?.id ?? ""
  );



  const [selectHovered, setSelectHovered] = useState(false);

  const handleStatChange = (key: keyof StatWeights, raw: string) => {
    const value = parseInt(raw, 10);
    setStats((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  const handleRun = () => {
    onRunProfile?.(selectedProfileId, stats);
  };

  return (
    <div style={styles.panel}>
      {/* Profile selector */}
      <div>
        <div style={styles.sectionTitle}>Profile</div>
        <div style={styles.selectWrapper}>
          <select
            value={selectedProfileId}
            onChange={(e) => setSelectedProfileId(e.target.value)}
            style={{
              ...styles.select,
              borderColor: selectHovered ? "#DAA520" : "#3a3a3a",
            }}
            onMouseEnter={() => setSelectHovered(true)}
            onMouseLeave={() => setSelectHovered(false)}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
            {profiles.length === 0 && (
              <option value="">— No profiles —</option>
            )}
          </select>
          <span style={styles.selectChevron}>▾</span>
        </div>
      </div>

      {/* Statistics box */}
      <div>
        <div style={styles.sectionTitle}>Statistics</div>
        <div style={styles.statsBox}>
          {STAT_FIELDS.map(({ key, label }) => (
            <StatInputRow
              key={key}
              label={label}
              value={stats[key]}
              onChange={(v) => handleStatChange(key, v)}
            />
          ))}
        </div>
      </div>

      {/* Run button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleRun}
        sx={{
          background: "#DAA520",
          fontFamily: "'Cinzel', Georgia, serif",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.12em",
          color: "#fff",
          borderRadius: "4px",
          padding: "10px 0",
          boxShadow: "none",
          "&:hover": {
            background: "#c4941c",
            boxShadow: "none",
          },
        }}
      >
        Run Profile
      </Button>
    </div>
  );
};

// ─── Sub-component: individual stat row ──────────────────────────────────────

const StatInputRow: React.FC<{
  label: string;
  value: number;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={styles.statRow}>
      <label style={styles.statLabel}>{label}</label>
      <input
        type="number"
        min={0}
        value={value === 0 ? "" : value}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.statInput,
          borderColor: focused ? "#DAA520" : "#3a3a3a",
          boxShadow: focused
            ? "0 0 0 2px rgba(218,165,32,0.15)"
            : "none",
        }}
      />
    </div>
  );
};

export default ControlPanel;
