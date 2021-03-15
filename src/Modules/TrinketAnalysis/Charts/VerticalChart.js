import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import chroma from "chroma-js";
import "./VerticalChart.css";

export default class VerticalChart extends PureComponent {
  constructor(props) {
    super();
  }

  render(props) {
    const data = this.props.data;

    const Ilvls = ["i233", "i226", "i220", "i213", "i207", "i200", "i187", "i174"];
    let len = Ilvls.length;
    let colorCodes = chroma.random();
    let arr = [];
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) =>
        arr.push({
          name: map2.name,
          //i161: map2.i161,
          i174: map2.i174,
          i187: map2.i187 - map2.i174,
          i200: map2.i200 - map2.i187,
          i207: map2.i207 - map2.i200,
          i213: map2.i213 - map2.i207,
          i220: map2.i220 - map2.i213,
          i226: map2.i226 - map2.i220,
          i233: map2.i233 - map2.i226,
        }),
      );

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={1 / 2}>
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

          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis type="category" dataKey="name" stroke="#f5f5f5" interval={0} tick={{ width: 300 }} />
          {/*<Bar dataKey={"i161"} fill={"#eee8aa"} stackId="a" /> */}
          <Bar dataKey={"i174"} fill={"#9BB5DD"} stackId="a" />
          <Bar dataKey={"i187"} fill={"#BBCDEA"} stackId="a" />
          <Bar dataKey={"i200"} fill={"#7ECC7E"} stackId="a" />
          <Bar dataKey={"i207"} fill={"#A1EAA1"} stackId="a" />
          <Bar dataKey={"i213"} fill={"#C97474"} stackId="a" />
          <Bar dataKey={"i220"} fill={"#DD9090"} stackId="a" />
          <Bar dataKey={"i226"} fill={"#DAA520"} stackId="a" />
          {/*<Bar dataKey={"i233"} fill={"#e6bc53"} stackId="a" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
