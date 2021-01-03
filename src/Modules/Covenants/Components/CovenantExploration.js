import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Box,
  AppBar,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { soulbindDB, soulbindConnectors } from "../SoulbindDB";
import SoulbindNode from "./SoulbindNode";
import ConduitObject from "./ConduitObject";
import { getSoulbindFormula } from "../../Engine/EffectFormulas/Generic/GenericSoulbindFormulas";
import SoulbindStatPanel from "./SoulbindStatPanel";
import { getCovAbility } from "../../Engine/EffectFormulas/EffectEngine";
import {
  sumSelectedStats,
  getEstimatedHPS,
  getConduitIcon,
  buildConduitStats,
} from "../CovenantUtilities";
import "./CovenantExploration.css";
import ReactGA from "react-ga";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function a11yPropsVert(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1014,
  },
  panel: {
    flexGrow: 1,
    backgroundColor: "#191c23",
    display: "flex",
    height: 700,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

// ==============================================
export default function CovenantExploration(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const classes = useStyles();
  const [tabvalue, setTabValue] = React.useState(0);
  const [soulbindValue, setSoulbindValue] = React.useState(0);
  const [soulbindState, setSoulbindState] = React.useState(
    buildBonusStats(soulbindDB, props.pl, props.contentType)
  );

  function updateConduitLevel(id, newLevel) {
    props.pl.updateConduitLevel(id, newLevel);
    props.updatePlayerChar(props.pl);
  }

  function buildBonusStats(soulbindTraits, player, contentType) {
    let updatedArray = soulbindTraits.map((trait) => {
      return {
        ...trait,
        bonus_stats: getSoulbindFormula(trait.id, player, contentType),
      };
    });
    return updatedArray;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSoulbindValue(0);
  };

  const handleChange2 = (event, newValue) => {
    setSoulbindValue(newValue);
  };

  function activateSoulbind(id) {
    let updatedArray = soulbindState.map((trait) => {
      if (trait.id === id) {
        return { ...trait, active: !trait.active };
      }
      return trait;
    });

    setSoulbindState(updatedArray);
  }

  function setConduitInSlot(slotID, conduitID) {
    let updatedArray = soulbindState.map((trait) => {
      if (trait.id === slotID) {
        return {
          ...trait,
          slotted_id: conduitID,
          icon: getConduitIcon(conduitID),
          active: conduitID === -1 ? false : true,
        };
      }
      return trait;
    });

    setSoulbindState(updatedArray);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#424242" }}
        elevation={0}
      >
        <Tabs
          value={tabvalue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
        >
          <Tab
            icon={
              <div className="container">
                <img
                  height={45}
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/Kyrian_Sigil.png"
                  }
                  alt="Kyrian"
                />
                <div className="centered"> Kyrian </div>
              </div>
            }
            {...a11yProps(0)}
          />
          <Tab
            icon={
              <div className="container">
                <img
                  height={45}
                  src={
                    process.env.PUBLIC_URL + "/Images/Interface/Fae_Sigil.png"
                  }
                  alt="Night Fae"
                />
                <div className="centered"> Night Fae </div>
              </div>
            }
            {...a11yProps(1)}
          />
          <Tab
            icon={
              <div className="container">
                <img
                  height={45}
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/Venthyr_Sigil.png"
                  }
                  alt="Venthyr"
                />
                <div className="centered"> Venthyr </div>
              </div>
            }
            {...a11yProps(2)}
          />
          <Tab
            icon={
              <div className="container">
                <img
                  height={45}
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/Death_Lords_Sigil.png"
                  }
                  alt="Necrolords"
                />
                <div className="centered"> Necrolords </div>
              </div>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>

      {/* Kyrian */}
      <TabPanel value={tabvalue} index={0}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Pelagos"
                  src={
                    process.env.PUBLIC_URL + "/Images/Interface/pelagos.webp"
                  }
                />
              }
              label="Pelagos"
              {...a11yPropsVert(0)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Kleia"
                  src={process.env.PUBLIC_URL + "/Images/Interface/kleia.webp"}
                />
              }
              label="Kleia"
              {...a11yPropsVert(1)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Mikanikos"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/forgelite-prime-mikanikos.webp"
                  }
                />
              }
              label="Mikanikos"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          <TabPanel
            value={soulbindValue}
            index={0}
            style={{ display: "inline-flex" }}
          >
            {buildSoulbind(
              "Pelagos",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel
            value={soulbindValue}
            index={1}
            style={{ display: "inline-flex" }}
          >
            {buildSoulbind(
              "Kleia",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel
            value={soulbindValue}
            index={2}
            style={{ display: "inline-flex" }}
          >
            {buildSoulbind(
              "Mikanikos",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,

              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
        </div>
      </TabPanel>

      {/* Night Fae */}
      <TabPanel value={tabvalue} index={1}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Niya"
                  src={process.env.PUBLIC_URL + "/Images/Interface/niya.webp"}
                />
              }
              label="Niya"
              {...a11yPropsVert(0)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Dreamweaver"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/dreamweaver.webp"
                  }
                />
              }
              label="Dreamweaver"
              {...a11yPropsVert(1)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Korayn"
                  src={process.env.PUBLIC_URL + "/Images/Interface/korayn.webp"}
                />
              }
              label="Korayn"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          <TabPanel value={soulbindValue} index={0}>
            {buildSoulbind(
              "Niya",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel value={soulbindValue} index={1}>
            {buildSoulbind(
              "Dreamweaver",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel value={soulbindValue} index={2}>
            {buildSoulbind(
              "Korayn",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
        </div>
      </TabPanel>

      {/* Venthyr */}
      <TabPanel value={tabvalue} index={2}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Nadjia"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/nadjia-the-mistblade.webp"
                  }
                />
              }
              label="Nadjia"
              {...a11yPropsVert(0)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Theotar"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/theotar-the-mad-duke.webp"
                  }
                />
              }
              label="Theotar"
              {...a11yPropsVert(1)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Draven"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/general-draven.webp"
                  }
                />
              }
              label="Draven"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          <TabPanel value={soulbindValue} index={0}>
            {buildSoulbind(
              "Nadjia",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel value={soulbindValue} index={1}>
            {buildSoulbind(
              "Theotar",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel value={soulbindValue} index={2}>
            {buildSoulbind(
              "Draven",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
        </div>
      </TabPanel>

      {/* Necrolords */}
      <TabPanel value={tabvalue} index={3}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Marileth"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/plague-deviser-marileth.webp"
                  }
                />
              }
              label="Marileth"
              {...a11yPropsVert(0)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Emeni"
                  src={process.env.PUBLIC_URL + "/Images/Interface/emeni.webp"}
                />
              }
              label="Emeni"
              {...a11yPropsVert(1)}
            />
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
                  alt="Heirmir"
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/bonesmith-heirmir.webp"
                  }
                />
              }
              label="Heirmir"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          <TabPanel value={soulbindValue} index={0}>
            {buildSoulbind(
              "Marileth",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel value={soulbindValue} index={1}>
            {buildSoulbind(
              "Emeni",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
          <TabPanel value={soulbindValue} index={2}>
            {buildSoulbind(
              "Heirmir",
              props.pl,
              props.contentType,
              soulbindState,
              activateSoulbind,
              setConduitInSlot,
              updateConduitLevel
            )}
          </TabPanel>
        </div>
      </TabPanel>
    </div>
  );
}

/* 


*/
function buildSoulbind(
  soulbindName,
  player,
  contentType,
  soulbindState,
  activateSoulbind,
  setConduitInSlot,
  updateConduitLevel
) {
  let activeSoulbind = soulbindState.filter(
    (trait) => trait.soulbind === soulbindName
  );
  let activeConnectors = soulbindConnectors.filter(
    (trait) => trait.soulbind === soulbindName
  );

  player.calculateConduits(contentType);

  let potencyConduits = player.getActiveConduits("Potency");
  let enduranceConduits = player.getActiveConduits("Endurance");

  soulbindState = buildConduitStats(soulbindState, player, contentType);

  let statSums = sumSelectedStats(soulbindName, soulbindState);
  let estimatedHPS = getEstimatedHPS(statSums, player, contentType);
  let covAbility = getEstimatedHPS(
    getCovAbility(soulbindName, player, contentType)
  );
  return (
    <Grid
      id="soulbind"
      container
      direction="row"
      style={{ display: "flex", flexWrap: "nowrap" }}
    >
      <Grid item>
        <div id="soulbinds" style={{ position: "relative" }}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/Images/Interface/SoulbindBackgroundFat.jpg"
            }
            alt=""
          />
          <div id="nodes" style={{}}>
            {activeConnectors.map((trait, index) => (
              <img
                key={index}
                src={
                  process.env.PUBLIC_URL +
                  "/Images/Interface/SoulbindsLine" +
                  trait.src
                }
                style={{
                  position: "absolute",
                  zIndex: 0,
                  transform: "rotate(" + trait.angle + "deg)",
                  transformOrigin: "top center",
                  filter: "grayscale(95%)",
                  left: trait.position[0],
                  top: trait.position[1],
                }}
                alt=""
              />
            ))}

            {activeSoulbind.map((trait, index) => (
              <SoulbindNode
                key={index}
                activateSoulbind={activateSoulbind}
                setConduitInSlot={setConduitInSlot}
                soulbindTrait={trait}
                player={player}
                contentType={contentType}
                potencyConduits={potencyConduits}
                enduranceConduits={enduranceConduits}
              />
            ))}
          </div>
        </div>
      </Grid>

      <Grid container>
        <div
          id="conduits"
          style={{
            position: "relative",
            width: 245,
            backgroundColor: "#191c23",
            borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
            maxHeight: 700, // 609 Slim
          }}
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Grid
              container
              id="conduitChoices"
              spacing={1}
              style={{
                margin: 1,
                maxWidth: 245,
              }}
            >
              <Grid item xs={12}>
                <Paper
                  style={{
                    padding: 4,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ fontSize: 12 }}
                  >
                    Right/Left Click Conduits to change Ilvl
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/PotencyConduitTag.png"
                  }
                  style={{
                    objectFit: "cover",
                    width: "214px",
                    paddingLeft: "8px",
                  }}
                  alt=""
                />
                <Grid container spacing={1}>
                  {potencyConduits.map((conduit, i) => (
                    <ConduitObject
                      conduit={conduit}
                      key={i}
                      updateConduitLevel={updateConduitLevel}
                    />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/EnduranceConduitTag.png"
                  }
                  style={{
                    objectFit: "cover",
                    width: "214px",
                    paddingLeft: "8px",
                  }}
                  alt=""
                />
                <Grid container spacing={1}>
                  {enduranceConduits.map((conduit, i) => (
                    <ConduitObject
                      conduit={conduit}
                      key={i}
                      updateConduitLevel={updateConduitLevel}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              style={{
                margin: 1,
                maxWidth: 245,
              }}
            >
              <SoulbindStatPanel
                hps={estimatedHPS}
                covAbility={covAbility}
                stats={statSums}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
