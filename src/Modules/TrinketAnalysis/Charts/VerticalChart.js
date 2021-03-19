import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from "recharts";
import chroma from "chroma-js";
import "./VerticalChart.css";


const getLevelDiff = (trinketName, db, ilvl, map2) => {
  // Check if item exists at item level. If not, return 0.
  let temp = db.filter(function (item) {
    return item.name === trinketName;
  });

  const item = temp[0];
  const pos = item.levelRange.indexOf(ilvl);
  const previousLevel = item.levelRange[pos - 1];
  //console.log(trinketName + " at " + ilvl + ". Prev: " + previousLevel);

  // Return item score - the previous item levels score.
  if (pos > 0) {
    //console.log("1: " + map2["i" + ilvl] + ". 2: " + map2["i" + previousLevel]);
    // added a or 0 to handle NANs
    return map2["i" + ilvl] - map2["i" + previousLevel] || 0;
  }
  else if (pos == 0) {
    return map2["i" + ilvl];
  } else {
    //console.log("EWQ" + trinketName);
    return 0;
  }
};

// need this to return the Actual Score you want shown for the ilvl
const getILVLScore = (trinketName, db, ilvl, map2) => {
  let temp = db.filter(function (item) {
    return item.name === trinketName;
  });

  const item = temp[0];
  const pos = item.levelRange.indexOf(ilvl);
  const previousLevel = item.levelRange[pos - 1];

  // Return item score - the previous item levels score.
  if (pos !== -1) {
    return 1;
  } else {
    return 0;
  }
};

export default class VerticalChart extends PureComponent {
  constructor(props) {
    super();
  }

  render(props) {
    const data = this.props.data;
    const db = this.props.db;
    console.log(data);

    const Ilvls = ["i233", "i226", "i220", "i213", "i207", "i200", "i194", "i187"];
    let len = Ilvls.length;
    let colorCodes = chroma.random();
    let arr = [];
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) =>
        arr.push({
          name: map2.name,
          //i161: map2.i161,
          i187: getLevelDiff(map2.name, db, 187, map2),
          i194: getLevelDiff(map2.name, db, 194, map2),
          i200: getLevelDiff(map2.name, db, 200, map2),
          i207: getLevelDiff(map2.name, db, 207, map2),
          i213: getLevelDiff(map2.name, db, 213, map2),
          i220: getLevelDiff(map2.name, db, 220, map2),
          i226: getLevelDiff(map2.name, db, 226, map2),
          i233: getLevelDiff(map2.name, db, 233, map2),
        }),
      );

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={2}>
        <BarChart
          barCategoryGap="15%"
          data={arr}
          layout="vertical"
          margin={{
            top: 20,
            right: 40,
            bottom: 20,
            left: 220,
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} padding={0} height={1} axisLine={false} />
          <Tooltip
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid #1b1b1b",
            }}
            labelFormatter={(timeStr) => timeStr}
            // The formatter function of value in tooltip. If you return an array, the first entry will be the formatted "value", and the second entry will be the formatted "name" from - https://recharts.org/en-US/api/Tooltip#formatter
            // props contains ALL The data sent to the tooltip
            formatter={(value, name, props) => {
              {
                //console.log(props)
                if (value > 0) {
                  //console.log(getILVLScore(props["payload"].name, db, props["name"].slice(1, 4)));
                  return [value, name];
                } else {
                  return ["Unobtainable", name];
                }
              }
            }}
          />
          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis type="category" dataKey="name" stroke="#f5f5f5" interval={0} tick={{ width: 300 }} />
          {/*<Bar dataKey={"i161"} fill={"#eee8aa"} stackId="a" /> */}
          {/*<Bar dataKey={"i174"} fill={"#9BB5DD"} stackId="a" /> */}
          <Bar dataKey={"i187"} fill={"#9BB5DD"} stackId="a" />
          <Bar dataKey={"i194"} fill={"#BBCDEA"} stackId="a" />
          <Bar dataKey={"i200"} fill={"#7ECC7E"} stackId="a" />
          <Bar dataKey={"i207"} fill={"#A1EAA1"} stackId="a" />
          <Bar dataKey={"i213"} fill={"#C97474"} stackId="a" />
          <Bar dataKey={"i220"} fill={"#DD9090"} stackId="a" />
          <Bar dataKey={"i226"} fill={"#D8BE7B"} stackId="a" />
          <Bar dataKey={"i233"} fill={"#e6bc53"} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
