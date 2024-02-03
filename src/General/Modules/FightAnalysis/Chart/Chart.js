import React, { Component } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, ComposedChart, Line } from "recharts";
import chroma from "chroma-js";
import "./Chart.css";
import moment from "moment";
import i18n from "i18next";
import { Paper } from "@mui/material";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilityList: this.props.abilityList,
      data: this.props.chartdata,
      left: "dataMin",
      right: "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      top: "dataMax+1",
      bottom: "dataMin-1",
      top2: "dataMax+20",
      bottom2: "dataMin-20",
      animation: true,
    };
  }

  drawAreas(cooldownsToUse) {
    // Provided prop array of abilities and guids are mapped for datakeys then made into a unique array of ability names.
    let abilities = Array.from(new Set(this.props.abilityList.map((key) => key.ability)));
    let cooldowns = cooldownsToUse;
    let dataSet = abilities;
    let dataset2 = cooldowns;
    let areaArr = [];
    let count = 0;
    let len = dataSet.length;
    let len2 = dataset2.length;
    // Sets the Colour Scale of the Damaging Abilities (uses brewer colour scales: See in Resources Folder)
    let colorCodes = chroma.scale("Spectral").colors(len);
    // Sets the Colour Scale of the Cooldown Abilities (uses brewer colour scales: See in Resources Folder)
    let colorCodeCooldowns = chroma.scale("Paired").colors(len2);

    // Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
    for (let i in dataSet) {
      if (dataSet.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type="linear"
            fillOpacity={0.9}
            dataKey={abilities[i]}
            stackId="1"
            key={"abilities" + [i]}
            stroke={null}
            fill={colorCodes[i]}
            animationDuration={300}
            yAxisId="1"
            connectNulls={true}
          />,
        );
        count = count + 1;
      }
    }

    // if props.showcds is true Pushes Each datakey for ability with a colour from the generated scale to an array for the chart.
    if (this.props.showcds === true) {
      for (let i in dataset2) {
        if (dataset2.hasOwnProperty(i)) {
          areaArr.push(
            <Area
              type="step"
              fillOpacity={0.5}
              dataKey={cooldowns[i]}
              stackId="1"
              key={"cooldowns" + [i]}
              stroke={null}
              fill={colorCodeCooldowns[i]}
              animationDuration={300}
              yAxisId="2"
              connectNulls={true}
            />,
          );
          count = count + 1;
        }
      }
    }
    return areaArr;
  }

  // Generates a set of ticks based on the log length, otherwise the chart doesn't show the missing timestamps
  customticks = (loglength) => {
    let ticks = [];
    let tickcount = 0;
    let length = moment.utc(loglength).startOf("second") / 1000;
    for (let i = 0; i < length; i++) {
      ticks = ticks.concat(tickcount + 1000);
      tickcount = tickcount + 1000;
    }
    return ticks.flat();
  };

  // The charts data is set here on component mount. The data is passed from the CooldownPlannerModule.
  componentDidMount() {
    this.setState({ data: this.props.chart });
  }

  // The charts legend is generated here from the charts entries, and is matched with the provided ability list prop to return a matching guid for the wowhead tooltip
  renderColorfulLegendText = (value, entry) => {
    return (
      <WowheadTooltip
        type="spell"
        id={this.props.abilityList
          .filter((obj) => {
            return obj.ability === value;
          })
          .map((obj) => obj.guid)}
      >
        <span style={{ fontSize: "0.7rem" }}>{value}</span>
      </WowheadTooltip>
    );
  };

  data2Show = (dataToShow, cooldownsToShow) => {
    if (dataToShow === "unmitigated" && cooldownsToShow === "log") {
      return this.props.unmitigated;
    }
    if (dataToShow === "unmitigated" && cooldownsToShow === "user") {
      return this.props.unmitigatedCooldowns;
    }
    if (dataToShow === "mitigated" && cooldownsToShow === "log") {
      return this.props.mitigated;
    }
    if (dataToShow === "mitigated" && cooldownsToShow === "user") {
      return this.props.mitigatedCooldowns;
    }
  };

  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Filter out items with value 0
      const nonZeroItems = payload.filter((item) => item.value !== 0);

      return (
        <div
          style={{
            backgroundColor: "#1b1b1b",
            border: "1px solid #1b1b1b",
            borderRadius: "10px",
            padding: "0px 10px 10px 10px",
          }}
        >
          <p style={{ color: "#ffffff", marginBottom: "10px" }}>{moment.utc(label).format("mm:ss")}</p>
          {nonZeroItems.map((item, index) => (
            <p key={index} style={{ color: item.color || item.fill, margin: "5px 0" }}>{`${item.name} : ${item.value}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  render() {
    // Shortens long numbers i.e 1000000 will be 1M
    const DataFormater = (number) => {
      if (number > 1000000000) {
        return (number / 1000000000).toString() + "B";
      } else if (number > 1000000) {
        return (number / 1000000).toString() + "M";
      } else if (number > 1000) {
        return (number / 1000).toString() + "K";
      } else if (number === 0) {
        return "";
      }
      return number.toString();
    };

    return (
      <Paper style={{ padding: 10 }} elevation={0}>
        <ResponsiveContainer className="ResponsiveContainer" aspect={4 / 0.8}>
          <ComposedChart data={this.data2Show(this.props.dataToShow, this.props.cooldownsToShow)} margin={{ left: 22, right: -44 }} width="100%">
            <XAxis
              dataKey="timestamp"
              scale="time"
              ticks={this.customticks(this.props.endtime)}
              type="number"
              tickFormatter={(timeStr) => moment.utc(timeStr).format("mm:ss")}
              stroke="#f5f5f5"
              domain={[0, this.props.timeend]}
            />
            <YAxis
              yAxisId="1"
              mirror={true}
              stroke="#f5f5f5"
              tickFormatter={DataFormater}
              label={{
                value: this.props.dataToShow === "unmitigated" ? i18n.t("CooldownPlanner.ChartLabels.UnmitigatedDamageLabel") : i18n.t("CooldownPlanner.ChartLabels.MitigatedDamageLabel"),
                angle: -90,
                fill: "#f5f5f5",
                fontWeight: "bold",
                position: "insideLeft",
                offset: -12,
              }}
            />
            <YAxis yAxisId="2" orientation="right" stroke="#f5f5f5" tick={false} domain={["dataMin", 5]} />
            <YAxis yAxisId="3" orientation="right" stroke="#f5f5f5" tick={false} domain={[0, "dataMax"]} hide={true} />
            <Legend
              verticalAlign="bottom"
              iconType="square"
              iconSize={8}
              formatter={this.renderColorfulLegendText}
              wrapperStyle={{
                padding: 2,
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
              width="97%"
              margin={{ right: 44 }}

              // payload={this.props.legendata}
            />
            <Tooltip content={this.CustomTooltip} />
            {this.drawAreas(this.props.cooldownsToShow === "log" ? this.props.cooldown : this.props.customCooldowns)}
            <Line yAxisId="3" type="monotone" dataKey="Raid Health" stroke="#FF0000" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}

export default Chart;
