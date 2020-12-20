import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianAxis,
  CartesianGrid,
} from "recharts";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import chroma from "chroma-js";

export default class VerticalChart extends PureComponent {
  constructor(props) {
    super();
  }

  drawAreas() {
    const Ilvls = ["i226", "i213", "i200", "i187", "i174", "i161"];
    let barArr = [];
    let len = Ilvls.length;
    let colorCodes = chroma.scale("Paired").colors(len);

    // Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
    for (let i in Ilvls) {
      if (Ilvls.hasOwnProperty(i)) {
        barArr.push(
          <Bar
            dataKey={Ilvls[i]}
            fill={colorCodes[i]}
            barSize={10}
            opacity={1}
          />
        );
      }
    }
    return barArr;
  }

  render(props) {
    return (
      <ResponsiveContainer className="ResponsiveContainer" aspect={1 / 1}>
        <BarChart
          data={this.props.data}
          barGap={-10}
          barCategoryGap={10}
          layout="vertical"
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 200,
          }}
        >
          <Tooltip
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid #1b1b1b",
            }}
            cursor={{ stroke: "#F2BF59", fill: "#1f1f1f" }}
            wrapperStyle={{ color: "#1b1b1b" }}
          />
          <XAxis type="number" stroke="#f5f5f5" />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" />

          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#f5f5f5"
            interval={0}
            tick={{ width: 300 }}
            maxTickGap={10}
          />
          {this.drawAreas()}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
