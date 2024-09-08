import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from "recharts";
// import chroma from "chroma-js";
import { getGemIcon, getEmbellishmentIcon, getTranslatedEmbellishment } from "General/Engine/ItemUtilities";
import MuiTooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import "General/Modules/TrinketAnalysis/Charts/VerticalChart.css";
import i18n from "i18next";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";
import { styled } from "@mui/material/styles";

const getTooltip = (data, id) => {
  const tooltip = data.filter(filter => filter.id === id)[0].tooltip;
  return tooltip;
}

const StyledTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  zIndex: theme.zIndex.tooltip + 1,
  //margin: 4,
  [`& .MuiTooltip-tooltip`]: {
    //maxWidth: 150,
    //height: 100,
    //fontFamily: "'Grape Nuts', Helvetica",
    backgroundColor: "rgba(0,0,25,0.9)",
    //color: "deepskyblue", see sx value
    margin: 4,
    padding: 8,
    whiteSpace: "pre-line"
    //border: "solid yellow 1px"
  }
}));

const getRankDiff = (rank, map2, prevRank) => {
  /* ----------- Return gem score - the previous gem ranks score. ---------- */
  if (rank > 0) {
    // added a or 0 to handle NANs
    return map2["r" + rank] - map2["r" + prevRank] || 0;
  } else if (rank == 600) {
    return map2["r" + rank];
  } else {
    return 0;
  }
};

/* ------------------------ Cleans Zeros from Objects ----------------------- */
const cleanZerosFromArray = (obj) => {
  return Object.keys(obj)
    .filter((key) => {
      return obj[key] !== 0;
    })
    .reduce((object, key) => {
      object[key] = obj[key];
      return object;
    }, {});
};

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
export default class EmbelChart extends PureComponent {
  constructor() {
    super();
  }
  render() {
    const currentLanguage = i18n.language;
    const data = this.props.data;

    const db = this.props.db;
    const barColours = this.props.theme;
    let arr = [];
    let cleanedArray = [];
    // 
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        arr.push({ // [447, 460, 470, 473, 477, 480, 483, 486];
          // 600, 606, 612, 618, 624, 630, 636
          name: map2.id,
          600: map2.r600,
          606: getRankDiff(606, map2, 600),
          612: getRankDiff(612, map2, 606),
          618: getRankDiff(618, map2, 612),
          624: getRankDiff(624, map2, 618),
          630: getRankDiff(630, map2, 624),
          636: getRankDiff(636, map2, 630),
        });
      });

    /* ------------ Map new Array of Cleaned Objects (No Zero Values) ----------- */
    arr.map((key) => cleanedArray.push(cleanZerosFromArray(key)));
    /* ----------------------- Y-Axis Label Customization ----------------------- */
    const CustomizedYAxisTick = (props) => {
      const { x, y, payload } = props;
      return (
        <g transform={`translate(${x},${y})`}>
          <foreignObject x={-300} y={-10} width="300" height="22" style={{ textAlign: "right" }}>
            <text x={0} y={-10} style={{ color: "#fff", marginRight: 5, verticalAlign: "top", position: "relative", top: 2 }}>
              {truncateString(getTranslatedEmbellishment(payload.value, currentLanguage), 32)}
            </text>
            <WowheadTooltip type="item" id={payload.value} level={522} domain={currentLanguage}>
              <img width={20} height={20} x={0} y={0} src={getEmbellishmentIcon(payload.value)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </WowheadTooltip>
            <StyledTooltip title={
              <div>
                {getTooltip(data, payload.value).map((key) => {
                  return (
                    <span key={key}/* style={{ fontWeight: "bold" }}*/>
                      {key}
                      <br />
                    </span>
                  );
                })}
              </div>
            }
            style={{ display: "inline-block", lineHeight: "0px" }}>
              <IconButton sx={{ color: 'goldenrod'   ,  
                                padding: '2px',    // Adjust padding
                                marginTop: '-14px'  // Move the icon slightly upward 
                                }} 
              size="small">
                <HelpIcon fontSize="inherit" />
              </IconButton>
            </StyledTooltip>
          </foreignObject>
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" aspect={1.5}>
        <BarChart
          barCategoryGap="15%"
          data={cleanedArray}
          layout="vertical"
          margin={{
            top: 20,
            right: 40,
            bottom: 20,
            left: 250,
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} padding={0} height={1} axisLine={false} />
          <Tooltip
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            isAnimationActive={false}
            labelFormatter={(timeStr) => getTranslatedEmbellishment(timeStr, currentLanguage)}
            formatter={(value, name, props) => {
              {
                if (value > 0) {
                  return [
                    data
                      .filter((filter) => filter.id === props["payload"].name)
                      .map((key) => key["r" + name])
                      .toString(),
                    name,
                  ];
                } else {
                  return ["Unobtainable", name];
                }
              }
            }}
          />
          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis type="category" dataKey="name" stroke="#f5f5f5" interval={0} tick={CustomizedYAxisTick} />
          {[600, 606, 612, 618, 624, 630, 636].map((key, i) => (
            <Bar key={"bar" + i} dataKey={key} fill={barColours[i]} stackId="a" />
          ))}

          {/*}
          <Bar dataKey={411} fill={"#208c81"} stackId="a" />
          <Bar dataKey={421} fill={"#2aa497"} stackId="a" />
          <Bar dataKey={427} fill={"#34bdad"} stackId="a" />
          <Bar dataKey={437} fill={"#3ed6c4"} stackId="a" />
          <Bar dataKey={443} fill={"#49f0db"} stackId="a" />
          <Bar dataKey={447} fill={"#49f5df"} stackId="a" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
