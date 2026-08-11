import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TCPanel from "./TCPanel";
 
// ─── Types ────────────────────────────────────────────────────────────────────
 
export interface StatScalingDataPoint {
  amount: number;
  haste: number;
  crit: number;
  mastery: number;
  versatility: number;
  intellect: number;
}
 
export interface StatScalingChartProps {
  data?: StatScalingDataPoint[];
  currentWeights: { haste: number; crit: number; mastery: number; versatility: number; intellect: number };
}

// ─── Design tokens ────────────────────────────────────────────────────────────
// Shared with SpellBreakdown / ControlPanel / ModelInformationTabs: cool slate
// base, Space Grotesk for labels, monospace for numeric values, gold as the
// neutral chrome accent (used here just for Intellect's line, same as before).

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";

const COLORS = {
  bg: "#15171c",
  rowA: "#181a20",
  rowB: "#1d2028",
  border: "rgba(255,255,255,0.06)",
  gridLine: "rgba(255,255,255,0.05)",
  textPrimary: "#e6e8ee",
  textMuted: "#7d8394",
  textFaint: "#565b6b",
};

const PRIMARY = "#e3b341";
 
// ─── Colour palette ───────────────────────────────────────────────────────────
// One distinct colour per stat, chosen to be legible on a dark background.
 
const STAT_LINES: { key: keyof Omit<StatScalingDataPoint, "amount">; label: string; color: string }[] = [
  { key: "haste",       label: "Haste",       color: "#4e9eff" },
  { key: "crit",        label: "Crit",        color: "#ff6b6b" },
  { key: "mastery",     label: "Mastery",     color: "#a78bfa" },
  { key: "versatility", label: "Versatility", color: "#34d399" },
  { key: "intellect",   label: "Intellect",   color: PRIMARY },
];
 
// ─── Placeholder data ─────────────────────────────────────────────────────────
 
const PLACEHOLDER_DATA: StatScalingDataPoint[] = Array.from({ length: 11 }, (_, i) => {
  const amount = i * 100;
  return {
    amount,
    haste:       8000 + amount * 4.2  + Math.sin(i * 0.8) * 200,
    crit:        8000 + amount * 4  + Math.sin(i * 1.1) * 180,
    mastery:     8000 + amount * 3.5  + Math.sin(i * 0.6) * 150,
    versatility: 8000 + amount * 2.7  + Math.sin(i * 1.3) * 120,
    intellect:   8000 + amount * 7.0  + Math.sin(i * 0.9) * 250,
  };
});
 
// ─── Custom tooltip ───────────────────────────────────────────────────────────
 
const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: number;
}> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
 
  return (
    <div
      style={{
        background: COLORS.rowB,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "6px",
        padding: "10px 14px",
        fontFamily: FONT_DISPLAY,
        fontSize: "12px",
      }}
    >
      <p style={{ color: PRIMARY, marginBottom: "6px", letterSpacing: "0.06em", fontWeight: 600 }}>
        Amount: {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color, margin: "2px 0", fontFamily: FONT_MONO }}>
          {entry.name}: {Math.round(entry.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};
 
// ─── Component ────────────────────────────────────────────────────────────────
 
const StatScalingChart: React.FC<StatScalingChartProps> = ({
  data = PLACEHOLDER_DATA,
  currentWeights,
}) => {
  const yAxisMin = React.useMemo(() => {
    if (!data.length) return 0;

    let lowest = Number.POSITIVE_INFINITY;
    for (const point of data) {
      for (const { key } of STAT_LINES) {
        const value = point[key];
        if (value < lowest) lowest = value;
      }
    }

    if (!Number.isFinite(lowest)) return 0;
    return Math.floor(lowest * 0.8);
  }, [data]);

  // Uses the final data point (highest amount) as the displayed total.
  const totalHps = React.useMemo(() => {
    if (!data.length) return 0;
    const lastPoint = data[data.length - 1];
    return STAT_LINES.reduce((sum, { key }) => sum + (Number(lastPoint[key]) || 0), 0);
  }, [data]);

  return (
    <TCPanel title="Stat Scaling" height={500}>
      <div style={{ padding: "20px 8px 16px", background: COLORS.bg }}>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.gridLine}
              vertical={false}
            />
            <XAxis
              dataKey="amount"
              tick={{ fill: COLORS.textMuted, fontSize: 11, fontFamily: FONT_DISPLAY }}
              axisLine={{ stroke: COLORS.border }}
              tickLine={false}
              label={{
                value: "Amount",
                position: "insideBottom",
                offset: -2,
                fill: COLORS.textFaint,
                fontSize: 10,
                fontFamily: FONT_DISPLAY,
                letterSpacing: "0.08em",
              }}
            />
            <YAxis
              domain={[yAxisMin, "auto"]}
              tick={{ fill: COLORS.textMuted, fontSize: 11, fontFamily: FONT_MONO }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              label={{
                value: "HPS",
                angle: -90,
                position: "insideLeft",
                offset: 16,
                fill: COLORS.textFaint,
                fontSize: 10,
                fontFamily: FONT_DISPLAY,
                letterSpacing: "0.08em",
              }}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "16px",
                fontFamily: FONT_DISPLAY,
                fontSize: "11px",
                color: COLORS.textMuted,
              }}
            />
            {STAT_LINES.map(({ key, label, color }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={label}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div
          style={{
            marginTop: "14px",
            paddingTop: "12px",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              flexWrap: "wrap",
              padding: "10px 16px",
              background: COLORS.rowA,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              minWidth: "fit-content",
            }}
          >
            {STAT_LINES.map(({ key, label, color }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontFamily: FONT_DISPLAY,
                  color: COLORS.textMuted,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color, fontWeight: 600 }}>{label}:</span>
                <span style={{ fontFamily: FONT_MONO, color: COLORS.textPrimary }}>
                  {currentWeights[key].toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TCPanel>
  );
};
 
export default StatScalingChart;