import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Box, AppBar, Grid, Paper, Typography } from "@material-ui/core";
import { soulbindDB, soulbindConnectors } from "../../../Databases/SoulbindDB";
import SoulbindNode from "./SoulbindNode";
import ConduitObject from "./ConduitObject";
import { getSoulbindFormula } from "../../Engine/EffectFormulas/Generic/GenericSoulbindFormulas";
import SoulbindStatPanel from "./SoulbindStatPanel";
import { getCovAbility } from "../../Engine/EffectFormulas/EffectEngine";
import { sumSelectedStats, getEstimatedHPS, getConduitIcon, buildConduitStats } from "../CovenantUtilities";
import "./CovenantExploration.css";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1014,
    borderRadius: "4px 4px 4px 4px",
  },
  panel: {
    flexGrow: 1,
    backgroundColor: "#191c23",
    display: "flex",
    height: 700,
    borderRadius: "0px 0px 4px 4px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  kyrianHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/BastionHeader.png").default})`,
    borderRadius: "4px 0px 0px 0px",
  },
  nightFaeHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/NightFaeHeader.png").default})`,
  },
  venthyrHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/VenthyrHeader.png").default})`,
  },
  necrolordHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/NecroHeader.png").default})`,
    borderRadius: "0px 4px 0px 0px",
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 120,
    },
  },
}));

export default function CovenantExploration(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [tabvalue, setTabValue] = React.useState(0);
  const [soulbindValue, setSoulbindValue] = React.useState(0);
  const [soulbindState, setSoulbindState] = React.useState(buildBonusStats(soulbindDB, props.player, props.contentType));

  function updateConduitLevel(id, newLevel) {
    props.player.updateConduitLevel(id, newLevel);
    props.updatePlayerChar(props.player);
  }

  /* ------------------------------ Builds the stats the conduits use ----------------------------- */
  function buildBonusStats(soulbindTraits, player, contentType) {
    let updatedArray = soulbindTraits.map((trait) => {
      return {
        ...trait,
        bonus_stats: getSoulbindFormula(trait.id, player, contentType),
      };
    });
    return updatedArray;
  }

  /* --------------------------------- Changes to the Selected Tab -------------------------------- */
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSoulbindValue(0);
  };

  /* ------------------------------ Changes to the Selected Soulbind ------------------------------ */
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
    <div className={classes.header}>
      {/* ---------------------------------------- Module Header ---------------------------------------  */}
      <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
        {t("Soulbinds.Header")}
      </Typography>
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "#000", borderRadius: "4px 4px 0px 0px" }} elevation={0}>
          {/* -------------------- Tabs at the top of the module for covenant selection --------------------  */}
          <Tabs value={tabvalue} onChange={handleTabChange} aria-label="simple tabs example" variant="fullWidth" TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}>
            {/* -------------------------------------- Kyrian Header Tab -------------------------------------  */}
            <Tab
              className={classes.kyrianHeaderStyle}
              icon={
                <div className="container">
                  <img height={45} src={process.env.PUBLIC_URL + "/Images/Interface/Kyrian_Sigil.png"} alt={t("Covenants.Kyrian")} />
                  <div className="centered"> {t("Covenants.Kyrian")} </div>
                </div>
              }
              {...a11yProps(0)}
            />
            {/* ------------------------------------- Nightfae Header Tab ------------------------------------  */}
            <Tab
              className={classes.nightFaeHeaderStyle}
              icon={
                <div className="container">
                  <img height={45} src={process.env.PUBLIC_URL + "/Images/Interface/Fae_Sigil.png"} alt={t("Covenants.NightFae")} />
                  <div className="centered"> {t("Covenants.NightFae")} </div>
                </div>
              }
              {...a11yProps(1)}
            />
            {/* ------------------------------------- Venthyr Header Tab -------------------------------------  */}
            <Tab
              className={classes.venthyrHeaderStyle}
              icon={
                <div className="container">
                  <img height={45} src={process.env.PUBLIC_URL + "/Images/Interface/Venthyr_Sigil.png"} alt={t("Covenants.Venthyr")} />
                  <div className="centered"> {t("Covenants.Venthyr")} </div>
                </div>
              }
              {...a11yProps(2)}
            />
            {/* ------------------------------------ Necrolord Header Tab ------------------------------------  */}
            <Tab
              className={classes.necrolordHeaderStyle}
              icon={
                <div className="container">
                  <img height={45} src={process.env.PUBLIC_URL + "/Images/Interface/Death_Lords_Sigil.png"} alt={t("Covenants.Necrolords")} />
                  <div className="centered"> {t("Covenants.Necrolords")} </div>
                </div>
              }
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                             Kyrian                                              */
        /* ----------------------------------------------------------------------------------------------  */}
        <TabPanel value={tabvalue} index={0}>
          <div className={classes.panel}>
            {/* ------------------- These are the Tabs on the left hand side of the module ------------------- */}
            <Tabs
              orientation="vertical"
              value={soulbindValue}
              onChange={handleChange2}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
            >
              {/* ----------------------------------------- Pelagos Tab ----------------------------------------  */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Pelagos")} src={process.env.PUBLIC_URL + "/Images/Interface/pelagos.webp"} />}
                label={t("Covenants.Soulbinds.Pelagos")}
                {...a11yPropsVert(0)}
              />
              {/* ------------------------------------------ Kleia Tab -----------------------------------------  */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Kleia")} src={process.env.PUBLIC_URL + "/Images/Interface/kleia.webp"} />}
                label={t("Covenants.Soulbinds.Kleia")}
                {...a11yPropsVert(1)}
              />
              {/* ---------------------------------------- Mikanikos Tab ---------------------------------------  */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Mikanikos")} src={process.env.PUBLIC_URL + "/Images/Interface/forgelite-prime-mikanikos.webp"} />}
                label={t("Covenants.Soulbinds.Mikanikos")}
                {...a11yPropsVert(2)}
              />
            </Tabs>
            {/* -------------------------------------- Pelagos Tab Panel -------------------------------------  */}
            <TabPanel value={soulbindValue} index={0} style={{ display: "inline-flex" }}>
              {buildSoulbind("Pelagos", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* --------------------------------------- Kleia Tab Panel --------------------------------------  */}
            <TabPanel value={soulbindValue} index={1} style={{ display: "inline-flex" }}>
              {buildSoulbind("Kleia", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* ------------------------------------- Mikanikos Tab Panel ------------------------------------  */}
            <TabPanel value={soulbindValue} index={2} style={{ display: "inline-flex" }}>
              {buildSoulbind("Mikanikos", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
          </div>
        </TabPanel>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                            Night Fae                                           */
        /* ----------------------------------------------------------------------------------------------  */}
        <TabPanel value={tabvalue} index={1}>
          <div className={classes.panel}>
            {/* ------------------- These are the Tabs on the left hand side of the module ------------------- */}
            <Tabs
              orientation="vertical"
              value={soulbindValue}
              onChange={handleChange2}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
            >
              {/* ------------------------------------------ Niya Tab ------------------------------------------ */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Niya")} src={process.env.PUBLIC_URL + "/Images/Interface/niya.webp"} />}
                label={t("Covenants.Soulbinds.Niya")}
                {...a11yPropsVert(0)}
              />
              {/* --------------------------------------- Dreamweaver Tab -------------------------------------- */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Dreamweaver")} src={process.env.PUBLIC_URL + "/Images/Interface/dreamweaver.webp"} />}
                label={t("Covenants.Soulbinds.Dreamweaver")}
                {...a11yPropsVert(1)}
              />
              {/* ----------------------------------------- Korayn Tab ----------------------------------------- */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Korayn")} src={process.env.PUBLIC_URL + "/Images/Interface/korayn.webp"} />}
                label={t("Covenants.Soulbinds.Korayn")}
                {...a11yPropsVert(2)}
              />
            </Tabs>
            {/* --------------------------------------- Niya Tab Panel --------------------------------------- */}
            <TabPanel value={soulbindValue} index={0}>
              {buildSoulbind("Niya", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* ------------------------------------ Dreamweaver Tab Panel ----------------------------------- */}
            <TabPanel value={soulbindValue} index={1}>
              {buildSoulbind("Dreamweaver", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* -------------------------------------- Korayn Tab Panel -------------------------------------- */}
            <TabPanel value={soulbindValue} index={2}>
              {buildSoulbind("Korayn", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
          </div>
        </TabPanel>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                             Venthyr                                            */
        /* ----------------------------------------------------------------------------------------------  */}
        <TabPanel value={tabvalue} index={2}>
          <div className={classes.panel}>
            {/* ------------------- These are the Tabs on the left hand side of the module ------------------- */}
            <Tabs
              orientation="vertical"
              value={soulbindValue}
              onChange={handleChange2}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
            >
              {/* ----------------------------------------- Nadjia Tab ----------------------------------------- */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Nadjia")} src={process.env.PUBLIC_URL + "/Images/Interface/nadjia-the-mistblade.webp"} />}
                label={t("Covenants.Soulbinds.Nadjia")}
                {...a11yPropsVert(0)}
              />
              {/* ----------------------------------------- Theotar Tab ---------------------------------------- */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Theotar")} src={process.env.PUBLIC_URL + "/Images/Interface/theotar-the-mad-duke.webp"} />}
                label={t("Covenants.Soulbinds.Theotar")}
                {...a11yPropsVert(1)}
              />
              {/* ----------------------------------------- Draven Tab ----------------------------------------- */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Draven")} src={process.env.PUBLIC_URL + "/Images/Interface/general-draven.webp"} />}
                label={t("Covenants.Soulbinds.Draven")}
                {...a11yPropsVert(2)}
              />
            </Tabs>

            {/* ------------------------------------- Marileth Tab Panel ------------------------------------- */}
            <TabPanel value={soulbindValue} index={0}>
              {buildSoulbind("Nadjia", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* -------------------------------------- Theotar Tab Panel ------------------------------------- */}
            <TabPanel value={soulbindValue} index={1}>
              {buildSoulbind("Theotar", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* -------------------------------------- Draven Tab Panel -------------------------------------- */}
            <TabPanel value={soulbindValue} index={2}>
              {buildSoulbind("Draven", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
          </div>
        </TabPanel>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                           Necrolords                                           */
        /* ----------------------------------------------------------------------------------------------  */}

        <TabPanel value={tabvalue} index={3}>
          <div className={classes.panel}>
            {/* ------------------- These are the Tabs on the left hand side of the module ------------------- */}
            <Tabs
              orientation="vertical"
              value={soulbindValue}
              onChange={handleChange2}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
            >
              {/* ---------------------------------------- Marileth Tab ----------------------------------------  */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Marileth")} src={process.env.PUBLIC_URL + "/Images/Interface/plague-deviser-marileth.webp"} />}
                label={t("Covenants.Soulbinds.Marileth")}
                {...a11yPropsVert(0)}
              />
              {/* ------------------------------------------ Emeni Tab -----------------------------------------  */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Emeni")} src={process.env.PUBLIC_URL + "/Images/Interface/emeni.webp"} />}
                label={t("Covenants.Soulbinds.Emeni")}
                {...a11yPropsVert(1)}
              />
              {/* ----------------------------------------- Heirmir Tab ----------------------------------------  */}
              <Tab
                style={{ color: "white" }}
                icon={<img height={100} alt={t("Covenants.Soulbinds.Heirmir")} src={process.env.PUBLIC_URL + "/Images/Interface/bonesmith-heirmir.webp"} />}
                label={t("Covenants.Soulbinds.Heirmir")}
                {...a11yPropsVert(2)}
              />
            </Tabs>
            {/* ----------- These are the Necrolord Panels that contain all the conduits and nodes ----------- */}
            {/* ------------------------------------- Marileth Tab Panel -------------------------------------  */}
            <TabPanel value={soulbindValue} index={0}>
              {buildSoulbind("Marileth", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* --------------------------------------- Emeni Tab Panel -------------------------------------- */}
            <TabPanel value={soulbindValue} index={1}>
              {buildSoulbind("Emeni", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
            {/* -------------------------------------- Heimir Tab Panel -------------------------------------- */}
            <TabPanel value={soulbindValue} index={2}>
              {buildSoulbind("Heirmir", props.player, props.contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel)}
            </TabPanel>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

function buildSoulbind(soulbindName, player, contentType, soulbindState, activateSoulbind, setConduitInSlot, updateConduitLevel) {
  const { t, i18n } = useTranslation();
  let activeSoulbind = soulbindState.filter((trait) => trait.soulbind === soulbindName);
  let activeConnectors = soulbindConnectors.filter((trait) => trait.soulbind === soulbindName);

  player.calculateConduits(contentType);

  let potencyConduits = player.getActiveConduits("Potency");
  let enduranceConduits = player.getActiveConduits("Endurance");

  soulbindState = buildConduitStats(soulbindState, player, contentType);

  let statSums = sumSelectedStats(soulbindName, soulbindState);
  let estimatedHPS = getEstimatedHPS(statSums, player, contentType);
  let covAbility = getEstimatedHPS(getCovAbility(soulbindName, player, contentType));
  return (
    <Grid id="soulbind" container direction="row" style={{ display: "flex", flexWrap: "nowrap" }}>
      <Grid item>
        <div id="soulbinds" style={{ position: "relative" }}>
          <img src={process.env.PUBLIC_URL + "/Images/Interface/SoulbindBackgroundFat.jpg"} alt="" />
          <div id="nodes" style={{}}>
            {activeConnectors.map((trait, index) => (
              <img
                key={index}
                src={process.env.PUBLIC_URL + "/Images/Interface/SoulbindsLine" + trait.src}
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
          <Grid container direction="column" justify="space-between" alignItems="center" style={{ height: "100%" }}>
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
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" align="center" style={{ fontSize: 12 }}>
                    {t("Soulbinds.ConduitInstructions")}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={process.env.PUBLIC_URL + "/Images/Interface/PotencyConduitTag.png"}
                  style={{
                    objectFit: "cover",
                    width: "214px",
                    paddingLeft: "8px",
                  }}
                  alt=""
                />
                <Grid container spacing={1}>
                  {potencyConduits.map((conduit, i) => (
                    <ConduitObject conduit={conduit} key={i} updateConduitLevel={updateConduitLevel} />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={process.env.PUBLIC_URL + "/Images/Interface/EnduranceConduitTag.png"}
                  style={{
                    objectFit: "cover",
                    width: "214px",
                    paddingLeft: "8px",
                  }}
                  alt=""
                />
                <Grid container spacing={1}>
                  {enduranceConduits.map((conduit, i) => (
                    <ConduitObject conduit={conduit} key={i} updateConduitLevel={updateConduitLevel} />
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
              <SoulbindStatPanel hps={estimatedHPS} covAbility={covAbility} stats={statSums} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
