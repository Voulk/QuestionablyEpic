import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Paper from "@material-ui/core/Paper";

export default class Example extends PureComponent {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Paper>
        <ResponsiveContainer
          className="ResponsiveContainer"
          width="100%"
          height="100%"
          aspect={1 / 1}
        >
          <BarChart
            width={500}
            height={300}
            data={this.props.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout="vertical"
          >
            <XAxis type="number" stroke="#f5f5f5" />
            <YAxis type="category" dataKey="ability" stroke="#f5f5f5"
             />
            <Tooltip />
            <Bar dataKey="damage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}