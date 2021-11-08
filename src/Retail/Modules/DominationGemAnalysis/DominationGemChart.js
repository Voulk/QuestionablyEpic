import React, { PureComponent, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip, Cell } from "recharts";
// import chroma from "chroma-js";
import { getGemIcon, getTranslatedDominationGem } from "General/Engine/ItemUtilities";
import "General/Modules/TrinketAnalysis/Charts/VerticalChart.css";
import i18n from "i18next";
import chroma from "chroma-js";
import { colorGenerator } from "../../../General/Modules/CooldownPlanner/Functions/Functions";

const getRankDiff = (rank, map2) => {
  /* ----------- Return gem score - the previous gem ranks score. ---------- */
  if (rank > 0) {
    // added a or 0 to handle NANs
    return map2["r" + rank] - map2["r" + (rank - 1)] || 0;
  } else if (rank == 0) {
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

/* ------------------------------- Set strings to a certain length ------------------------------ */
const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
export default class DomChart extends PureComponent {
  constructor() {
    super();
    this.state = { focusBar: null, mouseLeave: true };
  }

  render() {
    const currentLanguage = i18n.language;
    const data = this.props.data;
    const db = this.props.db;

    let arr = [];
    let cleanedArray = [];

    /* ---------------------------- Create Chart Data from supplied data ---------------------------- */
    // map each entry in "data" and push the differences between ranks to a new Array
    // this is so that chart shows the correct length for each score on the stacked bar chart
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        arr.push({
          name: map2.id,
          //i161: map2.i161,
          1: map2.r1,
          2: getRankDiff(2, map2),
          3: getRankDiff(3, map2),
          4: getRankDiff(4, map2),
          5: getRankDiff(5, map2),
        });
      });

    /* ------------ Map new Array of Cleaned Objects (No Zero Values) ----------- */
    arr.map((key) => cleanedArray.push(cleanZerosFromArray(key)));

    /* ---------------------- Y-Axis Label Customization (Domination Gem Names) --------------------- */
    const CustomizedYAxisTick = (props) => {
      const { x, y, payload } = props;
      return (
        <g transform={`translate(${x},${y})`}>
          <foreignObject x={-300} y={-10} width="300" height="22" style={{ textAlign: "right" }}>
            {/* ---------------------------------------- Trinket name ----------------------------------------  */}
            <text x={0} y={-10} style={{ color: "#fff", marginRight: 5, verticalAlign: "top", position: "relative", top: 2 }}>
              {truncateString(getTranslatedDominationGem(payload.value, currentLanguage), 32)}
            </text>
            {/* ------------------------------ Trinket Icon with Wowhead Tooltip -----------------------------  */}
            <a data-wowhead={(payload.value > 200000 ? "spell=" : "item=") + payload.value + "&domain=" + currentLanguage}>
              <img width={20} height={20} x={0} y={0} src={getGemIcon(payload.value)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </a>
          </foreignObject>
        </g>
      );
    };

    /* -------------------------------------------- Ranks ------------------------------------------- */
    const ranks = [1, 2, 3, 4, 5];
    /* ---------- We add 2 to the rank length to remove the darkest/lightest colour created --------- */
    const barColours = colorGenerator("BrBG", ranks.length + 2);

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={2}>
        <BarChart
          barCategoryGap="15%"
          data={cleanedArray}
          layout="vertical"
          margin={{
            top: -20,
            right: 40,
            bottom: 10,
            left: 150,
          }}
          /* ------------ When the cursor enters the chart the hovered bar will be set as focus ----------- */
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
            } else {
              this.setState({ focusBar: null, mouseLeave: true });
            }
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} padding={0} height={1} axisLine={false} />
          <Tooltip
            cursor={false}
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            // isAnimationActive set to false to avoid the 'jittering' users experiencing when the tooltip animates off screen up to the cursor causing the scroll bar to appear then disappear
            isAnimationActive={false}
            // translate the domination gem into the users currently selected language
            labelFormatter={(string) => getTranslatedDominationGem(string, currentLanguage)}
            // only show values in the tooltip if > 0
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
          {/* ---------------------------------------- Chart Legend ----------------------------------------  */}
          <Legend verticalAlign="top" />
          {/* ----------------------------------- Background Divding Lines ---------------------------------  */}
          <CartesianGrid vertical={true} horizontal={false} />
          {/* -------------------------------- Verticle Axis (Trinket Names) -------------------------------  */}
          <YAxis type="category" dataKey="name" stroke="#f5f5f5" interval={0} tick={CustomizedYAxisTick} />
          {/* -------------------- Here we map a bar for each rank provided to the chart -------------------  */}
          {ranks.map((rank, i) => (
            <Bar dataKey={rank} fill={barColours[ranks.length - i]} stackId="a">
              {/* ------------------------------------ Hover effect for bar ------------------------------------  */}
              {data.map((entry, index) => (
                <Cell fill={this.state.focusBar === index || this.state.mouseLeave ? barColours[ranks.length - i] : chroma(barColours[ranks.length - i]).alpha(0.2)} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
