import React, { useState } from "react";
import Button from "@mui/material/Button";

// ─── Types ────────────────────────────────────────────────────────────────────
 
export interface Profile {
  modelName: string;
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
  selectedProfile: Profile;
  onProfileChange: (profile: Profile) => void;
  stats: Stats;
  setStats: (stats: Stats) => void;
  onRunProfile?: () => void;
}

interface AdditionalSetting {
  label: string;
  options: string[];
  defaultSetting?: string;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
// Shared with SpellBreakdown so both panels read as one system: cool slate
// base, Space Grotesk for labels, monospace for entered/numeric values, mint
// as the single "primary" accent (this panel has no healing/damage split, so
// unlike SpellBreakdown's dual-hue meters it just uses the one accent throughout).

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

const PRIMARY = "#e3b341";
const PRIMARY_DIM = "rgba(227, 179, 65, 0.15)";
 
// ─── Styles ───────────────────────────────────────────────────────────────────
 
const styles: Record<string, React.CSSProperties> = {
  accordion: {
    width: "100%",
    background: COLORS.bg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    fontFamily: FONT_DISPLAY,
    color: COLORS.textPrimary,
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
    background: COLORS.rowB,
  },

  expandArrow: {
    fontSize: "16px",
    color: PRIMARY,
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
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: COLORS.textMuted,
    marginBottom: "7px",
    paddingBottom: "5px",
    borderBottom: `1px solid ${COLORS.border}`,
  },
 
  divider: {
    width: "1px",
    alignSelf: "stretch",
    background: COLORS.border,
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
    background: COLORS.rowA,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "5px",
    color: COLORS.textPrimary,
    fontFamily: FONT_DISPLAY,
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
    color: PRIMARY,
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
    color: COLORS.textMuted,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    fontFamily: FONT_DISPLAY,
  },
 
  statInput: {
    width: "100%",
    padding: "7px 8px",
    background: COLORS.rowA,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "4px",
    color: COLORS.textPrimary,
    fontFamily: FONT_MONO,
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
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: "16px",
  },

  accordionContentCollapsed: {
    maxHeight: "0px",
    padding: "0",
    borderTop: "none",
  },

  settingsSection: {
    padding: "6px 20px 20px 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },

  settingsGrid: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    alignItems: "flex-start",
    gap: "12px",
    width: "fit-content",
    maxWidth: "760px",
  },

  settingCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
    width: "160px",
    flex: "0 0 160px",
  },

  settingsPlaceholder: {
    fontSize: "13px",
    color: COLORS.textMuted,
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

const ADDITIONAL_SETTINGS: AdditionalSetting[] = [
  { "label": "Season 1 Tier Set", "options": ["0pc", "2pc", "4pc"], defaultSetting: "4pc"},
  { "label": "Season 2 Tier Set", "options": ["0pc", "2pc", "4pc"], defaultSetting: "4pc"},
];
 
// ─── Component ────────────────────────────────────────────────────────────────
 
const ControlPanel: React.FC<ControlPanelProps> = ({
  profiles = [],
  selectedProfile,
  onProfileChange,
  stats = { intellect: 0, haste: 0, crit: 0, mastery: 0, versatility: 0 },
  setStats,
  onRunProfile,
}) => {
  const [selectHovered, setSelectHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [hoveredSettingLabel, setHoveredSettingLabel] = useState<string | null>(null);
  const [focusedSettingLabel, setFocusedSettingLabel] = useState<string | null>(null);
  const [additionalSettings, setAdditionalSettings] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    ADDITIONAL_SETTINGS.forEach((setting) => {
      defaults[setting.label] = setting.defaultSetting ?? setting.options[0] ?? "";
    });
    return defaults;
  });

  const handleStatChange = (key: keyof StatWeights, raw: string) => {
    const value = parseInt(raw, 10);
    setStats((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  const handleRun = () => {
    onRunProfile?.();
  };

  const handleAdditionalSettingChange = (label: string, value: string) => {
    setAdditionalSettings((prev) => ({ ...prev, [label]: value }));
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
              value={profiles.indexOf(selectedProfile)}
              onChange={(e) => onProfileChange(profiles[Number(e.target.value)])}
              style={{
                ...styles.select,
                borderColor: selectHovered ? PRIMARY : COLORS.border,
              }}
              onMouseEnter={() => setSelectHovered(true)}
              onMouseLeave={() => setSelectHovered(false)}
            >
              {profiles.map((p, index) => (
                <option key={index} value={index}>
                  {p.modelName}
                </option>
              ))}
              {profiles.length === 0 && (
                <option value={-1}>— No profiles —</option>
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
              background: PRIMARY,
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: COLORS.bg,
              borderRadius: "5px",
              padding: "8px 24px",
              boxShadow: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                background: "#c99a2e",
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
              borderRadius: "4px",
              padding: "4px 8px",
              transition: "background-color 0.15s",
            }}
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.rowB)}
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
            <div style={styles.settingsGrid}>
              {ADDITIONAL_SETTINGS.map((setting) => (
                <div key={setting.label} style={styles.settingCol}>
                  <label style={styles.statLabel}>{setting.label}</label>
                  <div style={styles.selectWrapper}>
                    <select
                      value={additionalSettings[setting.label] ?? ""}
                      onChange={(e) => handleAdditionalSettingChange(setting.label, e.target.value)}
                      style={{
                        ...styles.select,
                        background: COLORS.rowB,
                        padding: "7px 28px 7px 10px",
                        fontSize: "12px",
                        borderColor:
                          focusedSettingLabel === setting.label || hoveredSettingLabel === setting.label
                            ? PRIMARY
                            : COLORS.border,
                      }}
                      onFocus={() => setFocusedSettingLabel(setting.label)}
                      onBlur={() => setFocusedSettingLabel(null)}
                      onMouseEnter={() => setHoveredSettingLabel(setting.label)}
                      onMouseLeave={() => setHoveredSettingLabel(null)}
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span style={styles.selectChevron}>▾</span>
                  </div>
                </div>
              ))}
            </div>
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
          borderColor: focused ? PRIMARY : COLORS.border,
          boxShadow: focused ? `0 0 0 2px ${PRIMARY_DIM}` : "none",
        }}
      />
    </div>
  );
};
 
export default ControlPanel;