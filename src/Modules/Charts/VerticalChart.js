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
} from "recharts";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import chroma from "chroma-js";

export default class VerticalChart extends PureComponent {
  constructor(props) {
    super();
  }

  // dataGenerator = (data) => {
  //   for (let i in dataSet) {
  //     if (dataSet.hasOwnProperty(i)) {
  //       areaArr.push(
  //         <Bar
  //           fillOpacity={1}
  //           dataKey={abilities[i]}
  //           stackId="1"
  //           key={"abilities" + [i]}
  //           stroke={null}
  //           fill={}
  //           animationDuration={300}
  //           yAxisId="1"
  //           connectNulls={true}
  //         />
  //       );
  //       count = count + 1;
  //     }
  //   }
  // };

  drawAreas() {
    const Ilvls = ["i226", "i213", "i200", "i187", "i174", "i161"];
    let areaArr = [];
    let len = Ilvls.length;
    let colorCodes = chroma.scale("Spectral").colors(len);

    // Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
    for (let i in Ilvls) {
      if (Ilvls.hasOwnProperty(i)) {
        areaArr.push(
          <Bar dataKey={Ilvls[i]} fill={colorCodes[i]} opacity={1} />
        );
      }
    }

    return areaArr;
  }

  render(props) {
    const data = [
      {
        i161: 68.33,
        i174: 75.71,
        i187: 84.23,
        i200: 93.42,
        i213: 103.61,
        i226: 114.15,
        id: 175943,
        name: "Spiritual Alchemy Stone",
      },
      {
        i161: 67.82,
        i174: 75.61,
        i187: 84.69,
        i200: 94.37,
        i213: 105.04,
        i226: 115.92,
        id: 178298,
        name: "Sinful Aspirant's Insignia of Alacrity",
      },
    ];
    return (
      <Paper>
        <ResponsiveContainer className="ResponsiveContainer" aspect={1 / 2}>
          <BarChart
            data={this.props.data}
            maxBarSize={20}
            barGap={-26}
            barCategoryGap={0}
            layout="vertical"
            // width={1400}
            // height={800}
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
              // labelFormatter={(timeStr) => moment(timeStr).format("mm:ss")}
            />
            <XAxis type="number" stroke="#f5f5f5" />
            <Legend />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#f5f5f5"
              interval={0}
              tick={{ width: 300 }}
              minTickGap={10}
              // xAxisId={0}
            />
            {this.drawAreas()}
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}
