import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid,  } from "recharts";
import { styled } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import { getItemIcon, getTranslatedItemName } from "../../../Engine/ItemUtilities";
import "./VerticalChart.css";
import i18n from "i18next";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips.tsx";


const mobileWidthThreshold = 650;
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

const getTooltip = (data, id) => {
  const tooltip = data.filter(filter => filter.id === id)[0].tooltip;
  return tooltip;
}

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} enterTouchDelay={0}/>
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

const truncateString = (str, num) => {
  if (str.length <= num/* || window.innerWidth >= 1025*/) {
    return str;
  }
  return str.slice(0, num) + "...";
};
function getInitials(str) {
  return str
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('');
}
export default class BCChart extends PureComponent {
  constructor() {
    super();
    this.state = { width: window.innerWidth, height: window.innerHeight };
  }
    updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  getShortenedItemName = (name) => {
    return name.slice(0, 10) + '...';
  }


  render() {
    const isMobile = window.innerWidth < 1025;
    const currentLanguage = i18n.language;
    const data = this.props.data;

    const barColours = this.props.theme;

    let arr = [];
    let cleanedArray = [];
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        arr.push({
          name: map2.id,
          //i161: map2.i161,
          "Celestial": map2.lfr,
          "Normal": map2.lfr ? (map2.normal - map2.lfr) : map2.normal,
          "Heroic": (map2.heroic - map2.normal) || 0,
          "lfrilvl": map2.lfrilvl || "",
          "normalilvl": map2.normalilvl || "",
          "heroicilvl": map2.heroicilvl || "",
        });
      });

    /* ------------ Map new Array of Cleaned Objects (No Zero Values) ----------- */
    arr.map((key) => cleanedArray.push(cleanZerosFromArray(key)));

    /* ----------------------- Y-Axis Label Customization ----------------------- */
    const CustomizedYAxisTick = ({ x, y, payload, data, currentLanguage, isMobile }) => {
      const row = payload?.payload ?? data?.[payload.index];
      const rowName = row ? row.name : "Unknown Item" //getTranslatedItemName(row.id, currentLanguage) : "";

      return (
        <g transform={`translate(${x},${y})`}>
          <foreignObject x={-300} y={-10} width="300" height="22" style={{ textAlign: "right" }}>
          <div style={{
            display: 'flex',
            alignItems: 'right',
            justifyContent: "flex-end",
            flexWrap: 'wrap',
        }}>
            <text is="Text" x={0} y={-10} style={{ color: "#fff", marginRight: 5, verticalAlign: "top", position: "relative", top: 2 }}>
              {this.state.width < mobileWidthThreshold ? getInitials(truncateString(getTranslatedItemName(payload.value, currentLanguage, "", "Classic"), 32)) : ( truncateString(getTranslatedItemName(payload.value, currentLanguage, "", "Classic"), 30))}
            </text>
            <WowheadTooltip type="item" id={payload.value} level={row.highestLevel} forg={row.reforgeID || 0} domain={"mop-classic"}>
              <img width={20} height={20} x={0} y={0} src={getItemIcon(payload.value, "Classic")} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </WowheadTooltip>
            <StyledTooltip title={
              <div>
                {getTooltip(data, payload.value).map((key, index) => {
                  return (<span key={key} style={{
                      fontWeight: (index === 0 || key === "Effect Breakdown" || key === "Setting Available" || key.includes("Item Source")) ? "bold" : "normal", // Make the first entry bold
                      color: index === 0 ? "yellow" : key.includes("Item Source") ? "#00D1D1" : "inherit" // Change color of the first entry (red as an example)
                    }}>
                      {key}
                      <br />
                    </span>
                  );
                })}
              </div>
            }
            style={{ display: "inline-block", lineHeight: "0px" }}>
              <IconButton sx={{ color: 'goldenrod' }} size="small">
                <HelpIcon fontSize="inherit" />
              </IconButton>
            </StyledTooltip>
          </div>
          </foreignObject>
          
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" height={800}>
        <BarChart
          barCategoryGap="10%"
          data={cleanedArray}
          layout="vertical"
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: this.state.width < mobileWidthThreshold ? 65 : 250,
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
            labelFormatter={(timeStr) => getShortenedItemName(timeStr)} //getTranslatedItemName(timeStr, currentLanguage, "", "Classic")}
            formatter={(value, name, props) => {
              {
                if (value > 0) {
                  return [
                    data
                      .filter((filter) => filter.id === props["payload"].name)
                      .map((key) => key[name.toLowerCase()])
                      .toString(),
                    name + " \t(" + props.payload[name.toLowerCase() + "ilvl"] + ")",
                  ];
                } else {
                  return ["Unobtainable", name];
                }
              }
            }}
          />
          <Legend verticalAlign="top" />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis type="category" className="CustomizedYAxis" width={this.state.width < mobileWidthThreshold ? 40 : 40} dataKey="name" stroke="#f5f5f5" interval={0} 
              tick={<CustomizedYAxisTick
                  data={data}
                  currentLanguage={currentLanguage}
                  isMobile={this.state.width < mobileWidthThreshold}
          />} />
          <Bar dataKey={"Celestial"} fill={"#cc4dbf"} stackId="a" />   
          <Bar dataKey={"Normal"} fill={"#1f78b4"} stackId="a" /> 
          <Bar dataKey={"Heroic"} fill={"#33a02c"} stackId="a" />   

        </BarChart>
      </ResponsiveContainer>
    );
  }
}
