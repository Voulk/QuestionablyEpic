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

  // drawAreas() {
  //   const Ilvls = ["i226", "i213", "i200", "i187", "i174", "i161"];
  //   let barArr = [];
  //   let len = Ilvls.length;
  //   let colorCodes = chroma.scale("Accent").colors(len);

  //   // Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
  //   for (let i in Ilvls) {
  //     if (Ilvls.hasOwnProperty(i)) {
  //       barArr.push(
  //         <Bar
  //           dataKey={Ilvls[i]}
  //           fill={colorCodes[i]}
  //           barSize={10}
  //           opacity={1}
  //         />
  //       );
  //     }
  //   }
  //   return barArr;
  // }

  render(props) {
    const Ilvls = ["i226", "i213", "i200", "i187", "i174", "i161"];
    let len = Ilvls.length;
    let colorCodes = chroma.scale("Accent").colors(len);
    return (
      <ResponsiveContainer
        className="ResponsiveContainer"
        width="100%"
        height={2000}
      >
        <BarChart
          data={this.props.data}
          barSize={15}
          barGap={-2}
          // barCategoryGap={10}
          layout="vertical"
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 200,
          }}
          reverseStackOrder={true}
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
          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#f5f5f5"
            interval={0}
            tick={{ width: 300 }}
            yAxisId={0}
          />
          <YAxis type="category" dataKey="name" yAxisId={1} hide />
          <YAxis type="category" dataKey="name" yAxisId={2} hide />
          <YAxis type="category" dataKey="name" yAxisId={3} hide />
          <YAxis type="category" dataKey="name" yAxisId={4} hide />
          <YAxis type="category" dataKey="name" yAxisId={5} hide />

          <Bar dataKey={"i226"} fill={colorCodes[0]} yAxisId={0} />
          <Bar dataKey={"i213"} fill={colorCodes[1]} yAxisId={1} />
          <Bar dataKey={"i200"} fill={colorCodes[2]} yAxisId={2} />
          <Bar dataKey={"i187"} fill={colorCodes[3]} yAxisId={3} />
          <Bar dataKey={"i174"} fill={colorCodes[4]} yAxisId={4} />
          <Bar dataKey={"i161"} fill={colorCodes[5]} yAxisId={5} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
