import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from "recharts";
import { getItemIcon, getTranslatedItemName } from "../../../Engine/ItemUtilities";
import "./VerticalChart.css";
import i18n from "i18next";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

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
export default class BCChart extends PureComponent {
  constructor() {
    super();
  }
  render() {
    const currentLanguage = i18n.language;
    const data = this.props.data;

    const barColours = this.props.theme;

    let arr = [];
    let cleanedArray = [];
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        arr.push({
          name: map2.id,
          //i161: map2.i161,
          "Normal": map2.i100,
          "Heroic": (map2.i200 - map2.i100) || 0,
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
              {truncateString(getTranslatedItemName(payload.value, currentLanguage, "", "Classic"), 32)}
            </text>
            <WowheadTooltip type="item" id={payload.value} domain={"cata"}>
              <img width={20} height={20} x={0} y={0} src={getItemIcon(payload.value, "Classic")} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </WowheadTooltip>
          </foreignObject>
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={1.6}>
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
            labelFormatter={(timeStr) => getTranslatedItemName(timeStr, currentLanguage, "", "Classic")}
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
          <Bar dataKey={"Normal"} fill={"#1f78b4"} stackId="a" /> 
          <Bar dataKey={"Heroic"} fill={"#33a02c"} stackId="a" />   
  ,
          {/*[""].map((key, i) => (
            <Bar key={"bar" + i} dataKey={key} fill={barColours[i]} stackId="a" />
          ))*/}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
