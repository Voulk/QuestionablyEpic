import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default class Example extends PureComponent {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Paper style={{ padding: 8}}>
            <div style={{marginBottom: 8}}>
            <Divider/>
            <Typography variant="body2" color="primary" style={{ textAlign: "center" }}>
              Damage Taken / Second by Ability
            </Typography>
            <Divider/>
            </div>
        <ResponsiveContainer
          className="ResponsiveContainer"
          width="100%"
          height="100%"
          aspect={1 / 0.6}
        >
          <BarChart
            width={500}
            height={300}
            data={this.props.data}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
             maxBarSize={20}
             barGap={1}
             barCategoryGap={1}
            layout="vertical"
          >
            <XAxis type="number" stroke="#f5f5f5" />
            <YAxis type="category" dataKey="ability" stroke="#f5f5f5"
             />
            <Bar label={{ fill: "#f5f5f5", fontSize: 12, position:"right" }} dataKey="damage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}