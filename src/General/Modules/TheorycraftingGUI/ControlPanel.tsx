import React, { useState, useEffect } from "react";
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
  accordion: {
    width: "100%",
    background: "#1e1e1e",
    border: "1px solid #3a3a3a",
    borderRadius: "6px",
    fontFamily: "'Cinzel', 'Georgia', serif",
    color: "#e0e0e0",
    boxSizing: "border-box" as const,
  },

  accordionHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    cursor: "pointer",
    userSelect: "none" as const,
    transition: "background-color 0.15s",
  },

  accordionHeaderHover: {
    background: "#252525",
  },

  expandArrow: {
    fontSize: "16px",
    color: "#DAA520",
    transition: "transform 0.3s",
    flexShrink: 0,
  },

  expandArrowOpen: {
    transform: "rotate(90deg)",
  },

  panel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: "24px",
    padding: "16px 20px",
    boxSizing: "border-box" as const,
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
 
  divider: {
    width: "1px",
    alignSelf: "stretch",
    background: "#2e2e2e",
    flexShrink: 0,
  },
 
  // ── Profile dropdown ──────────────────────────────────────────────────────
 
  profileSection: {
    display: "flex",
    flexDirection: "column" as const,
    minWidth: "180px",
  },
 
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
    transition: "border-color 0.15s, box-shadow 0.15s",
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
 
  // ── Statistics ────────────────────────────────────────────────────────────
 
  statsSection: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
  },
 
  statsFields: {
    display: "flex",
    flexDirection: "row" as const,
    gap: "12px",
  },
 
  statCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
    flex: 1,
  },
 
  statLabel: {
    fontSize: "10px",
    color: "#777",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    fontFamily: "'Cinzel', 'Georgia', serif",
  },
 
  statInput: {
    width: "100%",
    padding: "7px 8px",
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

  // ── Accordion content (expandable tray) ───────────────────────────────────

  accordionContent: {
    maxHeight: "1000px",
    overflow: "hidden",
    transition: "max-height 0.3s ease, padding 0.3s ease",
    borderTop: "1px solid #2e2e2e",
    paddingTop: "16px",
  },

  accordionContentCollapsed: {
    maxHeight: "0px",
    padding: "0",
    borderTop: "none",
  },

  settingsSection: {
    padding: "0 20px 20px 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },

  settingsPlaceholder: {
    fontSize: "13px",
    color: "#777",
    fontStyle: "italic",
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

const ADDITIONAL_SETTINGS: string[] = [];
 
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
 
  const handleStatChange = (key: keyof StatWeights, raw: string) => {
    const value = parseInt(raw, 10);
    setStats((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };
 
  const handleRun = () => {
    onRunProfile?.(selectedProfileId, stats);
  };
 
  return (
    <div style={styles.accordion}>

      {/* Main Content */}
      <div style={styles.panel}>
 
        {/* Profile selector */}
        <div style={styles.profileSection}>
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
                  {p.modelName}
                </option>
              ))}
              {profiles.length === 0 && (
                <option value="">— No profiles —</option>
              )}
            </select>
            <span style={styles.selectChevron}>▾</span>
          </div>
        </div>
 
        {/* Divider */}
        <div style={styles.divider} />
 
        {/* Statistics */}
        <div style={styles.statsSection}>
          <div style={styles.sectionTitle}>Statistics</div>
          <div style={styles.statsFields}>
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
 
        {/* Divider */}
        <div style={styles.divider} />
 
        {/* Run button and Settings toggle */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={handleRun}
            sx={{
              background: "#DAA520",
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "#fff",
              borderRadius: "4px",
              padding: "8px 24px",
              boxShadow: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                background: "#c4941c",
                boxShadow: "none",
              },
            }}
          >
            Run Profile
          </Button>

          {/* Settings toggle arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: "4px 8px",
              transition: "background-color 0.15s",
            }}
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#252525")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            title="Toggle additional settings"
          >
            <span
              style={{
                ...styles.expandArrow,
                ...(isExpanded ? styles.expandArrowOpen : {}),
              }}
            >
              ▸
            </span>
          </div>
        </div>
 
      </div>

      {/* Expandable Settings Tray */}
      <div
        style={{
          ...styles.accordionContent,
          ...(isExpanded ? {} : styles.accordionContentCollapsed),
        }}
      >
        <div style={styles.settingsSection}>
          {ADDITIONAL_SETTINGS.length === 0 ? (
            <div style={styles.settingsPlaceholder}>
              Additional settings coming soon...
            </div>
          ) : (
            ADDITIONAL_SETTINGS.map((setting, idx) => (
              <div key={idx}>{setting}</div>
            ))
          )}
        </div>
      </div>

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
    <div style={styles.statCol}>
      <label style={styles.statLabel}>{label}</label>
      <input
        className="cp-no-spinner"
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
          boxShadow: focused ? "0 0 0 2px rgba(218,165,32,0.15)" : "none",
        }}
      />
    </div>
  );
};
 
export default ControlPanel;