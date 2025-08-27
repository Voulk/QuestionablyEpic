import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from "recharts";
// import chroma from "chroma-js";
import { getItemIcon, getTranslatedItemName } from "../../../Engine/ItemUtilities";
import MuiTooltip from '@mui/material/Tooltip';
import "./VerticalChart.css";
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import i18n from "i18next";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips.tsx";
import { styled } from "@mui/material/styles";

const mobileWidthThreshold = 650;

const getTooltip = (data, id) => {
  const tooltip = data.filter(filter => filter.id === id)[0].tooltip;
  return tooltip;
}

const StyledTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }} enterTouchDelay={0} />
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

const getLevelDiff = (trinketName, db, ilvl, map2) => {
  /* ---------- Check if item exists at item level. If not, return 0. --------- */
  let temp = db.filter(function (item) {
    return item.name === trinketName;
  });

  const item = temp[0];
  if (!item) {
    console.error("Invalid Trinket " + trinketName);
  }
  const pos = item.levelRange.indexOf(ilvl);
  const previousLevel = item.levelRange[pos - 1];

  /* ----------- Return item score - the previous item levels score. ---------- */
  if (pos > 0) {
    // added a or 0 to handle NANs
    return map2["i" + ilvl] - map2["i" + previousLevel] || 0;
  } else if (pos == 0) {
    return map2["i" + ilvl];
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

/** Get the initials of a string */
function getInitials(str) {
  return str
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('');
}
export default class VerticalChart extends PureComponent {
  constructor() {
    super();
    this.state = { focusBar: null, mouseLeave: true, width: window.innerWidth, height: window.innerHeight };
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

  render() {
    const currentLanguage = i18n.language;
    const data = this.props.data;
    const db = this.props.db;
    const itemLevels = this.props.itemLevels;
    /* ------------------------- Ilvls to Show on Chart & Colour Generation ------------------------- */
    //const iLvls = [359, 372, 379, 382, 385, 389, 395, 405, 408, 411, 415, 418, 421, 424];

    /* ------------------------------------- Visibility of Ilvls ------------------------------------ */
    // (Currently won't work as intended due to how the data is provided, currently the previous ilvl is needed to build the stacked bars)
    //let iLvlsVisible = {359: true, 372: true, 379: true, 382: true, 385: true, 389: true, 395: true, 405: true, 408: true, 411: true, 415: true, 418: true, 421: true, 424: true};

    const barColours = this.props.theme;
    let arr = [];
    let cleanedArray = [];
    Object.entries(data)
      .map((key) => key[1])
      .map((map2) => {
        /* -------------------------- Map Ilvls & Scores Then create an object -------------------------- */
        let x = Object.fromEntries(itemLevels.map((ilvl) => [ilvl, getLevelDiff(map2.name, db, ilvl, map2)]));
        /* ------------------------- Push Trinket ID & Spread Scores into array ------------------------- */
        arr.push({
          name: map2.id,
          ...x,
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
          <div style={{
            display: 'flex',
            alignItems: 'right',
            justifyContent: "flex-end",
            flexWrap: 'wrap',
            }}>
            <text  is="Text" x={0} y={-10} style={{ color: "#fff", marginRight: 5, verticalAlign: "top", position: "relative", top: 2 }}>
              {
              //use function to get the first letters of the item name per word removing spaces
              }
              {this.state.width < mobileWidthThreshold ? getInitials(truncateString(payload.value === 242392 ?  "D V ( N S )": getTranslatedItemName(payload.value, currentLanguage), 32)) : (truncateString(payload.value === 242392 ? "Diamantine Voidcore (No Set)" :   getTranslatedItemName(payload.value, currentLanguage), 32))}
            </text>
            <WowheadTooltip type="item" id={payload.value} level={722} domain={currentLanguage}>
              <img width={20} height={20} x={0} y={0} src={getItemIcon(payload.value)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </WowheadTooltip>
            <StyledTooltip title={
              <div>
                {getTooltip(data, payload.value).map((key, index) => {
                  return (
                    <span key={key}/* style={{ fontWeight: "bold" }}*/
                    style={{ 
                      fontWeight: (index === 0 || key === "Effect Breakdown" || key === "Setting Available" || key.includes("Drops from")) ? "bold" : "normal", // Make the first entry bold
                      color: index === 0 ? "yellow" : key.includes("Drops from") ? "#00D1D1" : "inherit" // Change color of the first entry (red as an example)
                    }}
                    >
                      {key}
                      <br />
                    </span>
                  );
                })}
              </div>
            }
            style={{ display: "inline-block", lineHeight: "0px" }}>
              <IconButton sx={{ color: 'goldenrod', marginTop: '-5px' }} size="small">
                <HelpIcon fontSize="inherit" />
              </IconButton>
            </StyledTooltip>
            </div>
          </foreignObject>
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" height={1200}>
        <BarChart
          barCategoryGap="15%"
          data={cleanedArray}
          layout="vertical"
          
          
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
            } else {
              this.setState({ focusBar: null, mouseLeave: true });
            }
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} scale="linear" />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} padding={0} height={1} axisLine={false} />
          <Tooltip
            cursor={false}
            labelStyle={{ color: "#ffffff" }}
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            isAnimationActive={false}
            labelFormatter={(timeStr) => getTranslatedItemName(timeStr, currentLanguage)}
            formatter={(value, name, props) => {
              {
                if (value > 0) {
                  return [
                    data
                      .filter((filter) => filter.id === props["payload"].name)
                      .map((key) => key["i" + name])
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
          <YAxis type="category" className="CustomizedYAxis" width={this.state.width < mobileWidthThreshold ? 110 : 300} dataKey="name" stroke="#f5f5f5" interval={0} tick={CustomizedYAxisTick} />
          {itemLevels.map((key, i) => (
            <Bar key={"bar" + i} dataKey={key} fill={barColours[i]} stackId="a" />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
