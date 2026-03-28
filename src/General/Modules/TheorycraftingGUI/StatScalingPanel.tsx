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
 
// ─── Colour palette ───────────────────────────────────────────────────────────
// One distinct colour per stat, chosen to be legible on a dark background.
 
const STAT_LINES: { key: keyof Omit<StatScalingDataPoint, "amount">; label: string; color: string }[] = [
  { key: "haste",       label: "Haste",       color: "#4e9eff" },
  { key: "crit",        label: "Crit",        color: "#ff6b6b" },
  { key: "mastery",     label: "Mastery",     color: "#a78bfa" },
  { key: "versatility", label: "Versatility", color: "#34d399" },
  { key: "intellect",   label: "Intellect",   color: "#DAA520" },
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
        background: "#252525",
        border: "1px solid #3a3a3a",
        borderRadius: "4px",
        padding: "10px 14px",
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "12px",
      }}
    >
      <p style={{ color: "#DAA520", marginBottom: "6px", letterSpacing: "0.08em" }}>
        Amount: {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color, margin: "2px 0" }}>
          {entry.name}: {Math.round(entry.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};
 
// ─── Component ────────────────────────────────────────────────────────────────
 
const StatScalingChart: React.FC<StatScalingChartProps> = ({
  data = PLACEHOLDER_DATA,
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
      <div style={{ padding: "20px 8px 16px" }}>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2a2a2a"
              vertical={false}
            />
            <XAxis
              dataKey="amount"
              tick={{ fill: "#777", fontSize: 11, fontFamily: "'Cinzel', Georgia, serif" }}
              axisLine={{ stroke: "#3a3a3a" }}
              tickLine={false}
              label={{
                value: "Amount",
                position: "insideBottom",
                offset: -2,
                fill: "#555",
                fontSize: 10,
                fontFamily: "'Cinzel', Georgia, serif",
                letterSpacing: "0.1em",
              }}
            />
            <YAxis
              domain={[yAxisMin, "auto"]}
              tick={{ fill: "#777", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              label={{
                value: "HPS",
                angle: -90,
                position: "insideLeft",
                offset: 16,
                fill: "#555",
                fontSize: 10,
                fontFamily: "'Cinzel', Georgia, serif",
                letterSpacing: "0.1em",
              }}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "16px",
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: "11px",
                color: "#999",
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
      </div>
    </TCPanel>
  );
};
 
export default StatScalingChart;