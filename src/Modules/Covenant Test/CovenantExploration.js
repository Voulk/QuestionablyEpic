import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { soulbinds } from "./Soulbinds";
import SoulbindNode from "./SoulbindNode";
import ConduitObject from "./ConduitObject";

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
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    maxWidth: 1010,
  },
  panel: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 608,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [tabvalue, setTabValue] = React.useState(0);
  const [soulbindValue, setSoulbindValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSoulbindValue(0);
  };

  const handleChange2 = (event, newValue) => {
    setSoulbindValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={tabvalue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Kyrian" {...a11yProps(0)} />
          <Tab label="Night Fae" {...a11yProps(1)} />
          <Tab label="Venthyr" {...a11yProps(2)} />
          <Tab label="Necrolords" {...a11yProps(3)} />
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
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
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

          {/* // need to figure out how to pass "pelagos" as the index or a value as a "soulbind1 prop" otherwise each 1st soulbind will show the pelagos tree */}
          <TabPanel
            value={soulbindValue}
            index={0}
            style={{ display: "inline-flex" }}
          >
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel
            value={soulbindValue}
            index={1}
            style={{ display: "inline-flex" }}
          >
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel
            value={soulbindValue}
            index={2}
            style={{ display: "inline-flex" }}
          >
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
        </div>
      </TabPanel>

      {/* Night Fae */}
      <TabPanel value={tabvalue} index={1}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            // variant="scrollable"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
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
                  src={process.env.PUBLIC_URL + "/Images/Interface/korayn.webp"}
                />
              }
              label="Korayn"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          {/* // need to figure out how to pass "pelagos" as the index or a value as a "soulbind1 prop" otherwise each 1st soulbind will show the pelagos tree */}
          <TabPanel value={soulbindValue} index={0}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel value={soulbindValue} index={1}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel value={soulbindValue} index={2}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
        </div>
      </TabPanel>

      {/* Venthyr */}
      <TabPanel value={tabvalue} index={2}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            // variant="scrollable"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
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
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/general-draven.webp"
                  }
                />
              }
              label="General Draven"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          {/* // need to figure out how to pass "pelagos" as the index or a value as a "soulbind1 prop" otherwise each 1st soulbind will show the pelagos tree */}
          <TabPanel value={soulbindValue} index={0}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel value={soulbindValue} index={1}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel value={soulbindValue} index={2}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
        </div>
      </TabPanel>

      {/* Necrolords */}
      <TabPanel value={tabvalue} index={3}>
        <div className={classes.panel}>
          <Tabs
            orientation="vertical"
            // variant="scrollable"
            value={soulbindValue}
            onChange={handleChange2}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab
              style={{ color: "white" }}
              icon={
                <img
                  height={100}
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
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Interface/bonesmith-heirmir.webp"
                  }
                />
              }
              label="Bonesmith Heirmir"
              {...a11yPropsVert(2)}
            />
          </Tabs>

          {/* // need to figure out how to pass "pelagos" as the index or a value as a "soulbind1 prop" otherwise each 1st soulbind will show the pelagos tree */}
          <TabPanel value={soulbindValue} index={0}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel value={soulbindValue} index={1}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
          <TabPanel value={soulbindValue} index={2}>
            {buildSoulbind("Pelagos", props.pl)}
          </TabPanel>
        </div>
      </TabPanel>
    </div>
  );
}

function buildSoulbind(soulbindName, player) {
  
  console.log(JSON.stringify(player))
  let activeSoulbind = soulbinds[soulbindName]["traits"];
  let potencyConduits = player.getActiveConduits("Potency");
  let enduranceConduits = player.getActiveConduits("Endurance");
  //let conduitList = ["Conduit 1", "Conduit 2", "Conduit 3", "Conduit 4", "Conduit 5"] // Pure, raw placeholder. 
  //console.log(activeSoulbind);

  return (
    <div
      id="soulbind"
      style={{
        /* position: "absolute" */ display: "flex",
        flexDirection: "row",
      }}
    >
      <div id="soulbinds" style={{ position: "relative" }}>
        <img
          src={
            process.env.PUBLIC_URL +
            "/Images/Interface/SoulbindBackgroundSlim.jpg"
          }
          style={
            {
              /* position: "absolute", margin: 0, left: 0, padding: 0 */
            }
          }
        />
        <div
          id="nodes"
          style={{ position: "absolute", top: 0, backgroundColor: "pink" }}
        >
          {activeSoulbind.map((trait, index) => (
            <SoulbindNode key={index} soulbindTrait={trait} />
          ))}
        </div>
      </div>

      <div id="conduits" style={{ position: "relative" }}>
        <img
          src={
            process.env.PUBLIC_URL + "/Images/Interface/ConduitContainer.jpg"
          }
          style={
            {
              /* position: "absolute", margin: 0, left: 0, padding: 0 */
            }
          }
        />

        <div
          id="conduitChoices"
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            paddingLeft: "14px",
            paddingTop: "7px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "0px",
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/Images/Interface/PotencyConduitTag.png"
              }
              style={{ objectFit: "cover", width: "214px" }}
            />
            {potencyConduits.map((conduit, index) => (
              <p style={{ color: "white", margin: "5px", paddingLeft: "10px" }}>
                {<ConduitObject conduit={conduit} />}
              </p>
            ))}

            <img
              src={
                process.env.PUBLIC_URL +
                "/Images/Interface/EnduranceConduitTag.png"
              }
              style={{ objectFit: "cover", width: "214px", marginTop: "20px" }}
            />
            {enduranceConduits.map((conduit, index) => (
              <p style={{ color: "white", margin: "5px", paddingLeft: "10px" }}>
                {<ConduitObject conduit={conduit} />}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
