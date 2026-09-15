import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, ReferenceLine, Customized, Legend, DefaultLegendContent } from "recharts";
// import chroma from "chroma-js";
import { getItemIcon, getTranslatedItemName } from "../../../Engine/ItemUtilities";
import MuiTooltip from '@mui/material/Tooltip';
import "./VerticalChart.css";
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import WarningAmber from '@mui/icons-material/WarningAmber';
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

const getLevelDiff = (trinketID, db, ilvl, map2) => {
  /* ---------- Check if item exists at item level. If not, return 0. --------- */
  let temp = db.filter(function (item) {
    return item.id === trinketID;
  });

  const item = temp[0];
  if (!item) {
    console.error("Invalid Trinket " + trinketID);
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

const Indicator = {
  EQUIPPED: { id: "equipped", color: "#4FC3F7", label: "Equipped" },
  OWNED: { id: "owned", color: "#CE93D8", label: "In bags" },
  VAULT: { id: "vault", color: "#00FFFF", label: "Great Vault" },
  key(id, ilvl) {
    return `${id}:${ilvl}`;
  },
  of(trinket, current) {
    if (trinket.isEquipped) return this.EQUIPPED;
    if (trinket.vaultItem && current !== this.EQUIPPED) return this.VAULT;
    return current || this.OWNED;
  },
  fromPlayer(trinkets, itemLevels) {
    const indicators = {};
    (trinkets || []).forEach((t) => {
      if (!t) return;
      const key = this.key(t.id, snapIlvl(t.level, itemLevels));
      indicators[key] = this.of(t, indicators[key]);
    });
    return indicators;
  },
  legend() {
    return [this.EQUIPPED, this.OWNED, this.VAULT];
  },
};

const snapIlvl = (level, itemLevels) => {
  if (!itemLevels || !itemLevels.length) return level;
  return itemLevels.reduce((best, ilvl) =>
    Math.abs(ilvl - level) < Math.abs(best - level) ? ilvl : best
  );
};

const sliceScore = (rows, id, ilvl) => {
  const row = (rows || []).find((entry) => entry.id === id);
  return row ? row["i" + ilvl] || 0 : 0;
};

const playerTrinkets = (player) => (player && player.getActiveItems("Trinket")) || [];

const chartSignature = ({ itemLevels = [], data = [], theme = [], breakdown, player }) => {
  const top = itemLevels[itemLevels.length - 1] || "";
  return [
    itemLevels.join(),
    !!breakdown,
    theme.join(),
    playerTrinkets(player).map((t) => `${t.id}:${t.level}:${!!t.isEquipped}:${!!t.vaultItem}`).join(),
    data.map((row) => `${row.id}:${row["i" + top] || 0}`).join(),
  ].join("|");
};

function IndicatorOverlay({ formattedGraphicalItems, indicators, hoverSlice }) {
  if (!formattedGraphicalItems) return null;
  const overlays = [];
  let hoverRect = null;
  formattedGraphicalItems.forEach((entry) => {
    const ilvl = entry.item && entry.item.props && entry.item.props.dataKey;
    const rects = entry.props && entry.props.data;
    if (ilvl == null || !rects) return;
    rects.forEach((rect) => {
      const id = rect.payload && rect.payload.name;
      if (id == null || !(rect.width > 0) || !(rect.height > 0)) return;
      const indicator = indicators[Indicator.key(id, ilvl)];
      if (indicator) {
        overlays.push(
          <rect
            key={Indicator.key(id, ilvl)}
            x={rect.x + rect.width - 3}
            y={rect.y - 3}
            width={3}
            height={rect.height + 6}
            fill={indicator.color}
            stroke="#111"
            strokeWidth={1}
            style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.8))" }}
          />
        );
      }
      if (hoverSlice && hoverSlice.id === id && hoverSlice.ilvl === ilvl) hoverRect = rect;
    });
  });
  return (
    <g pointerEvents="none">
      {hoverRect ? (
        <rect
          x={hoverRect.x - 1}
          y={hoverRect.y - 1}
          width={hoverRect.width + 2}
          height={hoverRect.height + 2}
          fill="none"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth={2}
        />
      ) : null}
      {overlays}
    </g>
  );
}

function TrinketTooltip({ active, payload, label, hoverSlice, breakdown, data, currentLanguage }) {
  if (!active || !payload || !payload.length) return null;
  const itemId = payload[0].payload && payload[0].payload.name;
  if (!breakdown && (!hoverSlice || hoverSlice.id !== itemId)) return null;
  return (
    <div className="trinket-tooltip">
      <div className="trinket-tooltip-label">{getTranslatedItemName(label, currentLanguage)}</div>
      {payload.map((entry) => {
        const name = entry.dataKey;
        const hovered = !breakdown && hoverSlice && hoverSlice.id === itemId && hoverSlice.ilvl == name;
        let text;
        if (entry.value <= 0) text = "Unobtainable";
        else if (breakdown) text = Math.round(entry.value);
        else text = data.filter((row) => row.id === itemId).map((row) => row["i" + name]).toString();
        const displayName = breakdown ? (name === "passive" ? "Passive Stats" : "Effect") : name;
        return (
          <div key={String(name)} className={"trinket-tooltip-row" + (hovered ? " is-hovered" : "")} style={{ color: entry.color }}>
            {hovered ? "▸ " : ""}
            {displayName} : {text}
          </div>
        );
      })}
    </div>
  );
}

function IndicatorLegend({ items }) {
  return (
    <ul className="recharts-default-legend" style={{ padding: 0, margin: 0, textAlign: "center" }}>
      {items.map(({ label, color }) => (
        <li key={label} className="recharts-legend-item" style={{ display: "inline-block", marginRight: 10 }}>
          <svg width={8} height={14} viewBox="0 0 8 14" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 4 }}>
            <rect x={2.5} y={1} width={3} height={12} fill={color} stroke="#111" strokeWidth={1} style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.8))" }} />
          </svg>
          <span className="recharts-legend-item-text">{label}</span>
        </li>
      ))}
    </ul>
  );
}
export default class VerticalChart extends PureComponent {
  constructor() {
    super();
    this.state = { focusBar: null, mouseLeave: true, width: window.innerWidth, height: window.innerHeight, hoverSlice: null, compare: null };
  }
   
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentDidUpdate(prevProps) {
    if (this.state.compare && chartSignature(prevProps) !== chartSignature(this.props)) {
      this.setState({ compare: null, hoverSlice: null });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const currentLanguage = i18n.language;
    const gameType = this.props.gameType;
    const data = this.props.data;
    const db = this.props.db;
    const itemLevels = this.props.itemLevels;
    /* ------------------------- Ilvls to Show on Chart & Colour Generation ------------------------- */
    //const iLvls = [359, 372, 379, 382, 385, 389, 395, 405, 408, 411, 415, 418, 421, 424];

    /* ------------------------------------- Visibility of Ilvls ------------------------------------ */
    // (Currently won't work as intended due to how the data is provided, currently the previous ilvl is needed to build the stacked bars)
    //let iLvlsVisible = {359: true, 372: true, 379: true, 382: true, 385: true, 389: true, 395: true, 405: true, 408: true, 411: true, 415: true, 418: true, 421: true, 424: true};

    const barColours = this.props.theme;
    const breakdown = this.props.breakdown ?? false;
    const indicators = breakdown ? {} : Indicator.fromPlayer(playerTrinkets(this.props.player), itemLevels);
    const { hoverSlice, compare } = this.state;
    const guide = compare || (hoverSlice && hoverSlice.indicator ? hoverSlice : null);
    const readSlice = (entry, ilvl) => {
      const id = entry && entry.payload && entry.payload.name;
      if (id == null) return null;
      return { id, ilvl, score: sliceScore(data, id, ilvl), indicator: indicators[Indicator.key(id, ilvl)] };
    };

    let arr = [];
    let cleanedArray = [];

    if (breakdown) {
      Object.entries(data)
        .map((key) => key[1])
        .map((map2) => {
          const effectiveIlvl = Math.min(map2.highestLevel, itemLevels.at(-1));
          const total = map2["i" + effectiveIlvl] ?? 0;
          const passive = map2["p" + effectiveIlvl] ?? 0;
          arr.push({
            name: map2.id,
            info: { name: map2.name, id: map2.id },
            passive: Math.max(0, passive),
            effect: Math.max(0, total - passive),
          });
        });
    } else {
      Object.entries(data)
        .map((key) => key[1])
        .map((map2) => {
          let x = Object.fromEntries(itemLevels.map((ilvl) => [ilvl, getLevelDiff(map2.id, db, ilvl, map2)]));
          arr.push({
            name: map2.id,
            info: {name: map2.name, id: map2.id},
            ...x,
          });
        });
    }

    /* ------------ Map new Array of Cleaned Objects (No Zero Values) ----------- */
    arr.map((key) => cleanedArray.push(cleanZerosFromArray(key)));
    /* ----------------------- Y-Axis Label Customization ----------------------- */
    const CustomizedYAxisTick = ({ x, y, payload, data, gameType, isMobile }) => {
      //const { x, y, payload } = props;
      const row = payload?.payload ?? data?.[payload.index];
      const rowName = row ? row.name : "Unknown Item" //getTranslatedItemName(row.id, currentLanguage) : "";

      //console.log(row);
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
              // Use function to get the first letters of the item name per word removing spaces
              }
              {this.state.width < mobileWidthThreshold ? getInitials(truncateString(payload.value === 242392 ?  "D V ( N S )": getTranslatedItemName(payload.value, currentLanguage), 32)) : payload.value === 242392 ? "Diamantine Voidcore (No Set)" : (truncateString(rowName, 32))}
            </text>
            <WowheadTooltip type="item" id={payload.value} level={row.highestLevel} domain={gameType === "Retail" ? currentLanguage : "mop-classic"}>
              <img width={20} height={20} x={0} y={0} src={getItemIcon(payload.value, gameType)} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            </WowheadTooltip>
            <StyledTooltip title={
              <div>
                {getTooltip(data, payload.value).map((key, index) => {
                  return (
                    <span key={key}/* style={{ fontWeight: "bold" }}*/
                    style={{ 
                      fontWeight: (index === 0 || key == "Passive Stats" || key === "Effect Breakdown" || key === "Setting Available" || key.includes("Drops from")) ? "bold" : "normal", // Make the first entry bold
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
              <IconButton sx={{ color: row.warningFlag ? 'red' : 'goldenrod', marginTop: '-5px' }} size="small">
                {row.warningFlag ? <WarningAmber fontSize="inherit" /> : <HelpIcon fontSize="inherit" />}
              </IconButton>
            </StyledTooltip>
            </div>
          </foreignObject>
        </g>
      );
    };

    return (
      <ResponsiveContainer className="ResponsiveContainer2" width="100%" height={gameType === "Retail" ? 650 : 700}>
        <BarChart
          barCategoryGap="15%"
          data={cleanedArray}
          layout="vertical"
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
            } else {
              this.setState({ focusBar: null, mouseLeave: true, hoverSlice: null });
            }
          }}
        >
          <XAxis type="number" stroke="#f5f5f5" axisLine={false} scale="linear" />
          <XAxis type="number" stroke="#f5f5f5" orientation="top" xAxisId={1} padding={0} height={1} axisLine={false} />
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            wrapperStyle={{ pointerEvents: "none" }}
            content={
              <TrinketTooltip
                hoverSlice={hoverSlice}
                breakdown={breakdown}
                data={data}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Legend
            verticalAlign="top"
            iconType="square"
            wrapperStyle={{ color: "#fff", fontSize: 12, paddingBottom: 8 }}
            content={
              breakdown
                ? undefined
                : (props) => (
                    <div>
                      <IndicatorLegend items={Indicator.legend()} />
                      <DefaultLegendContent {...props} payload={props.payload || []} />
                    </div>
                  )
            }
          />
          <CartesianGrid vertical={true} horizontal={false} />
          <YAxis type="category" className="CustomizedYAxis" width={this.state.width < mobileWidthThreshold ? 110 : 300} dataKey="name" stroke="#f5f5f5" interval={0}
              tick={<CustomizedYAxisTick
                  data={data}
                  gameType={gameType}
                  isMobile={this.state.width < mobileWidthThreshold}
                />} />
          {breakdown
            ? [
                <Bar key="passive" dataKey="passive" fill={barColours[0]} stackId="a" />,
                <Bar key="effect" dataKey="effect" fill={barColours[Math.floor(barColours.length / 2)]} stackId="a" />,
              ]
            : itemLevels.map((key, i) => (
                <Bar
                  key={"bar" + i}
                  dataKey={key}
                  fill={barColours[i]}
                  stackId="a"
                  isAnimationActive={false}
                  cursor="pointer"
                  onClick={(entry) => {
                    const slice = readSlice(entry, key);
                    if (!slice) return;
                    this.setState((prev) => ({
                      compare: prev.compare && prev.compare.id === slice.id && prev.compare.ilvl === slice.ilvl ? null : slice,
                    }));
                  }}
                  onMouseEnter={(entry) => {
                    const slice = readSlice(entry, key);
                    if (slice) this.setState({ hoverSlice: slice });
                  }}
                  onMouseLeave={() => this.setState({ hoverSlice: null })}
                />
              ))}
          {breakdown ? null : (
            <Customized
              component={(chartProps) => (
                <IndicatorOverlay formattedGraphicalItems={chartProps.formattedGraphicalItems} indicators={indicators} hoverSlice={hoverSlice} />
              )}
            />
          )}
          {breakdown || !guide ? null : (
            <ReferenceLine
              x={guide.score}
              stroke="#fff"
              strokeWidth={2}
              ifOverflow="visible"
              isFront
              style={{ pointerEvents: compare ? "auto" : "none" }}
              shape={
                compare
                  ? (props) => (
                      <line
                        x1={props.x1}
                        y1={props.y1}
                        x2={props.x2}
                        y2={props.y2}
                        stroke="#fff"
                        strokeWidth={2}
                        cursor="pointer"
                        onClick={() => this.setState({ compare: null })}
                      />
                    )
                  : undefined
              }
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
