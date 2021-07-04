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
          187: getLevelDiff(map2.name, db, 187, map2),
          194: getLevelDiff(map2.name, db, 194, map2),
          200: getLevelDiff(map2.name, db, 200, map2),
          207: getLevelDiff(map2.name, db, 207, map2),
          213: getLevelDiff(map2.name, db, 213, map2),
          220: getLevelDiff(map2.name, db, 220, map2),
          226: getLevelDiff(map2.name, db, 226, map2),
          233: getLevelDiff(map2.name, db, 233, map2),
          239: getLevelDiff(map2.name, db, 239, map2),
          246: getLevelDiff(map2.name, db, 246, map2),
          252: getLevelDiff(map2.name, db, 252, map2),
          259: getLevelDiff(map2.name, db, 259, map2),
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
              {truncateString(getTranslatedItemName(payload.value, currentLanguage), 32)}
            </text>
            <a data-wowhead={"item=" + payload.value + "&ilvl=200" + "&domain=" + currentLanguage}>
              <img width={20} height={20} x={0} y={0} src={getItemIcon(payload.value)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
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
          {/*<Bar dataKey={"i161"} fill={"#eee8aa"} stackId="a" /> */}
          {/*<Bar dataKey={"i174"} fill={"#9BB5DD"} stackId="a" /> */}
          <Bar dataKey={187} fill={"#7291c4"} stackId="a" />
          <Bar dataKey={194} fill={"#9fb8d7"} stackId="a" />
          <Bar dataKey={200} fill={"#BBCDEA"} stackId="a" />

          <Bar dataKey={207} fill={"#72C47F"} stackId="a" />
          <Bar dataKey={213} fill={"#97d79f"} stackId="a" />
          <Bar dataKey={220} fill={"#bbeabf"} stackId="a" />

          <Bar dataKey={226} fill={"#D8BE7B"} stackId="a" />
          <Bar dataKey={233} fill={"#e0d09b"} stackId="a" />
          <Bar dataKey={239} fill={"#eae2bb"} stackId="a" />

          <Bar dataKey={246} fill={"#d87b7b"} stackId="a" />
          <Bar dataKey={252} fill={"#e29b9b"} stackId="a" />
          <Bar dataKey={259} fill={"#eabbbb"} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
