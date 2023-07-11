import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from "recharts";
// import chroma from "chroma-js";
import { getGemIcon, getEmbellishmentIcon, getTranslatedEmbellishment } from "General/Engine/ItemUtilities";
import "General/Modules/TrinketAnalysis/Charts/VerticalChart.css";
import i18n from "i18next";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

const getRankDiff = (rank, map2, prevRank) => {
  /* ----------- Return gem score - the previous gem ranks score. ---------- */
  if (rank > 0) {
    // added a or 0 to handle NANs
    return map2["r" + rank] - map2["r" + prevRank] || 0;
  } else if (rank == 411) {
    return map2["r" + rank];
  } else {
    return 0;
  }
};

/* ------------------------ Cleans Zeros from Objects ----------------------- */
const cleanZerosFromArray = (obj) => {
  return Object.keys(obj)
    .filter((key) => {
      return obj[key] !== 0;
    })
    .reduce((object, key) => {
      object[key] = obj[key];
      return object;
    }, {});
};

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
export default class EmbelChart extends PureComponent {
  constructor() {
    super();
  }
  render() {
    const currentLanguage = i18n.language;
    const data = this.props.data;
    const db = this.props.db;
    let arr = [];
    let cleanedArray = [];

    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        arr.push({
          name: map2.id,
          //i161: map2.i161,
          411: map2.r411,
          421: getRankDiff(421, map2, 411),
          427: getRankDiff(427, map2, 421),
          437: getRankDiff(437, map2, 427),
          443: getRankDiff(443, map2, 437),
          447: getRankDiff(447, map2, 443),
        });
      });

    /* ------------ Map new Array of Cleaned Objects (No Zero Values) ----------- */
    arr.map((key) => cleanedArray.push(cleanZerosFromArray(key)));
    /* ----------------------- Y-Axis Label Customization ----------------------- */
    const CustomizedYAxisTick = (props) => {
      const { x, y, payload } = props;
      return (
        <g transform={`translate(${x},${y})`}>
          <foreignObject x={-300} y={-10} width="300" height="22" style={{ textAlign: "right" }}>
            <text x={0} y={-10} style={{ color: "#fff", marginRight: 5, verticalAlign: "top", position: "relative", top: 2 }}>
              {truncateString(getTranslatedEmbellishment(payload.value, currentLanguage), 32)}
            </text>
            <WowheadTooltip type="item" id={payload.value} domain={currentLanguage}>
              <img width={20} height={20} x={0} y={0} src={getEmbellishmentIcon(payload.value)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </WowheadTooltip>
          </foreignObject>
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={1.5}>
        <BarChart
          barCategoryGap="15%"
          data={cleanedArray}
          layout="vertical"
          margin={{
            top: 20,
            right: 40,
            bottom: 20,
            left: 250,
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} padding={0} height={1} axisLine={false} />
          <Tooltip
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            isAnimationActive={false}
            labelFormatter={(timeStr) => getTranslatedEmbellishment(timeStr, currentLanguage)}
            formatter={(value, name, props) => {
              {
                if (value > 0) {
                  return [
                    data
                      .filter((filter) => filter.id === props["payload"].name)
                      .map((key) => key["r" + name])
                      .toString(),
                    name,
                  ];
                } else {
                  return ["Unobtainable", name];
                }
              }
            }}
          />
          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis type="category" dataKey="name" stroke="#f5f5f5" interval={0} tick={CustomizedYAxisTick} />
          <Bar dataKey={411} fill={"#208c81"} stackId="a" />
          <Bar dataKey={421} fill={"#2aa497"} stackId="a" />
          <Bar dataKey={427} fill={"#34bdad"} stackId="a" />
          <Bar dataKey={437} fill={"#3ed6c4"} stackId="a" />
          <Bar dataKey={443} fill={"#49f0db"} stackId="a" />
          <Bar dataKey={447} fill={"#49f5df"} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
