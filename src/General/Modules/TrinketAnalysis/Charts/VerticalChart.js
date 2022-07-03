import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from "recharts";
// import chroma from "chroma-js";
import { getItemIcon, getTranslatedItemName } from "../../../Engine/ItemUtilities";
import "./VerticalChart.css";
import i18n from "i18next";

const getLevelDiff = (trinketName, db, ilvl, map2) => {
  /* ---------- Check if item exists at item level. If not, return 0. --------- */
  let temp = db.filter(function (item) {
    return item.name === trinketName;
  });
  
  const item = temp[0];
  const pos = item.levelRange.indexOf(ilvl);
  const previousLevel = item.levelRange[pos - 1];

  /* ----------- Return item score - the previous item levels score. ---------- */
  if (pos > 0) {
    // added a or 0 to handle NANs
    return map2["i" + ilvl] - map2["i" + previousLevel] || 0;
  } else if (pos == 0) {
    return map2["i" + ilvl];
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
export default class VerticalChart extends PureComponent {
  constructor() {
    super();
    this.state = { focusBar: null, mouseLeave: true };
  }
  

  render() {
    const currentLanguage = i18n.language;
    const data = this.props.data;
    const db = this.props.db;
    /* ------------------------- Ilvls to Show on Chart & Colour Generation ------------------------- */
    const iLvls = [226, 233, 239, 246, 252, 259, 262, 265, 272, 278, 285, 291, 298, 304, 311];

    /* ------------------------------------- Visibility of Ilvls ------------------------------------ */
    // (Currently won't work as intended due to how the data is provided, currently the previous ilvl is needed to build the stacked bars)
    let iLvlsVisible = { 226: true, 233: true, 239: true, 246: true, 252: true, 259: true, 262: true, 265: true, 272: true, 278: true, 285: true, 
                          291: true, 298: true, 304: true, 311: true };

    const barColours = this.props.theme;

    let arr = [];
    let cleanedArray = [];
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        /* -------------------------- Map Ilvls & Scores Then create an object -------------------------- */
        let x = Object.fromEntries(iLvls.map((ilvl) => [ilvl, getLevelDiff(map2.name, db, ilvl, map2)]));
        /* ------------------------- Push Trinket ID & Spread Scores into array ------------------------- */
        arr.push({
          name: map2.id,
          ...x,
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
            <text is="Text" x={0} y={-10} style={{ color: "#fff", marginRight: 5, verticalAlign: "top", position: "relative", top: 2 }}>
              {truncateString(getTranslatedItemName(payload.value, currentLanguage), 32)}
            </text>
            <a data-wowhead={"item=" + payload.value + "&ilvl=200" + "&domain=" + currentLanguage}>
              <img width={16} height={16} x={0} y={0} src={getItemIcon(payload.value)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </a>
          </foreignObject>
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={2}>
        <BarChart
          barCategoryGap="15%"
          data={cleanedArray}
          layout="vertical"
          margin={{
            top: -10,
            right: 40,
            bottom: 10,
            left: 250,
          }}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
            } else {
              this.setState({ focusBar: null, mouseLeave: true });
            }
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} height={1} axisLine={false} />
          <Tooltip
            cursor={false}
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            isAnimationActive={false}
            labelFormatter={(timeStr) => getTranslatedItemName(timeStr, currentLanguage)}
            formatter={(value, name, props) => {
              {
                if (value > 0) {
                  return [
                    data
                      .filter((filter) => filter.id === props["payload"].name)
                      .map((key) => key["i" + name])
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
          {iLvls.map((key, i) => (
            <Bar key={"bar" + i} dataKey={iLvlsVisible[key] ? key : ""} fill={barColours[i]} stackId="a" />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
