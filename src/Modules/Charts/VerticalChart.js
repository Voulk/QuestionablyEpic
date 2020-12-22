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

    const CandyBar = (props) => {
      const {
        x: oX,
        y: oY,
        width: oWidth,
        height: oHeight,
        value,
        fill,
      } = props;

      let x = oX;
      let y = oHeight < 0 ? oY + oHeight : oY;
      let width = oWidth;
      let height = Math.abs(oHeight);

      return (
        <rect
          fill={fill}
          x={x}
          y={y}
          width={width}
          height={height}
          stroke-width="0"
          stroke-position="inside "
        />
      );
    };

    return (
      <ResponsiveContainer
        className="ResponsiveContainer"
        width="100%"
        height={2000}
      >
        <BarChart
          data={this.props.data}
          barGap={-15}
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

          <Bar
            dataKey={"i226"}
            fill={colorCodes[0]}
            barSize={15}
            shape={
              <CandyBar
                stroke-width="0"
                stroke-alignment="inner"
                stroke-opacity={0}
              />
            }
            yAxisId={0}
          />
          <Bar
            dataKey={"i213"}
            barSize={15}
            fill={colorCodes[1]}
            shape={<CandyBar />}
            yAxisId={1}
          />
          <Bar
            dataKey={"i200"}
            barSize={15}
            fill={colorCodes[2]}
            shape={<CandyBar />}
            yAxisId={2}
          />
          <Bar
            dataKey={"i187"}
            barSize={15}
            fill={colorCodes[3]}
            shape={<CandyBar />}
            yAxisId={3}
          />
          <Bar
            dataKey={"i174"}
            barSize={15}
            fill={colorCodes[4]}
            shape={<CandyBar />}
            yAxisId={4}
          />
          <Bar
            dataKey={"i161"}
            barSize={15}
            fill={colorCodes[5]}
            shape={<CandyBar />}
            yAxisId={5}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
