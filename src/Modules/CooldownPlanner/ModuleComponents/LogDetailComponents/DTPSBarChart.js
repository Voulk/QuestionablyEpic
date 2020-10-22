import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default class Example extends PureComponent {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Paper style={{ padding: 8 }}>
        <div style={{ marginBottom: 8 }}>
          <Typography
            variant="h6"
            color="primary"
            style={{ padding: "4px 8px 4px 24px" }}
          >
            Damage Taken / Second by Ability
          </Typography>
          <Divider />
        </div>
        <ResponsiveContainer
          className="ResponsiveContainer"
          height="100%"
          aspect={1 / 1}
        >
          <BarChart
            // width={500}
            // height={300}
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
          <Tooltip
              labelStyle={{ color: "#ffffff" }}
              contentStyle={{
                backgroundColor: "#1b1b1b",
                border: "1px solid #1b1b1b",
              }}
               cursor
               wrapperStyle={{color: "#1b1b1b"}}
              // labelFormatter={(timeStr) => moment(timeStr).format("mm:ss")}
            />
            <XAxis type="number" stroke="#f5f5f5" />
            <YAxis type="category" dataKey="ability" stroke="#f5f5f5" />
            <Bar
              label={{ fill: "#f5f5f5", fontSize: 12, position: "right" }}
              dataKey="damage"
              fill="#8884d8"
            />
            
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}