import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../../General/Modules/SetupAndMenus/QEMainMenu";
import LegendaryObject from "./LegendaryObject";
import "./Legendaries.css";
import { useTranslation } from "react-i18next";
import { getEffectValue } from "../../Engine/EffectFormulas/EffectEngine";
import ReactGA from "react-ga";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
      marginTop: 120,
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 32,
    },
  },
}));

const convertToHPS = (bonus_stats, player, contentType) => {
  /* ----------------------- Multiply the item's stats by our stat weights. ----------------------- */
  let score = 0;

  for (var stat in bonus_stats) {
    let statSum = bonus_stats[stat];
    score += statSum * player.getStatWeight(contentType, stat);
    score = (score / player.activeStats.intellect) * player.getHPS(contentType);
  }

  /* -------------------------------------- Add any bonus HPS ------------------------------------- */
  if ("hps" in bonus_stats) {
    score += bonus_stats.hps;
  }

  return score;
};

const createLegendary = (legendaryName, container, spec, player, contentType) => {
  let lego = new Legendary(legendaryName);
  lego.bonus_stats = getEffectValue({ name: lego.name, type: "spec legendary" }, player, contentType);
  lego.effectiveHPS = convertToHPS(lego.bonus_stats, player, contentType);
  lego.effectiveDPS = "dps" in lego.bonus_stats ? lego.bonus_stats.dps : 0;

  container.push(lego);
};

const fillLegendaries = (container, spec, player, contentType) => {
  /* ---------------------- These are used in the legendary snapshot module. ---------------------- */
  let choices = {
    "Restoration Druid": [
      "Vision of Unending Growth",
      "Verdant Infusion",
      "The Dark Titans Lesson",
      "Lycaras Fleeting Glimpse",
      "Circle of Life and Death",
      "Oath of the Elder Druid",
      "Memory of the Mother Tree",
      "Kindred Affinity",
      "Sinful Hysteria",
      "Unbridled Swarm",
      "Celestial Spirits",
    ],
    "Holy Paladin": [
      //"Vanguards Momentum",
      "The Magistrates Judgment",
      "Inflorescence of the Sunwell",
      "Maraads Dying Breath",
      "Shadowbreaker, Dawn of the Sun",
      "Shock Barrier",
      "The Mad Paragon",
      "Relentless Inquisitor",
      "Of Dusk and Dawn",
      "Divine Resonance",
      "Duty-Bound Gavel",
      "Seasons of Plenty",
      "Radiant Embers",
    ],
    "Restoration Shaman": [
      "Earthen Harmony",
      "Jonat's Natural Focus",
      "Primal Tide Core",
      "Spiritwalker's Tidal Totem",
      "Ancestral Reminder",
      //"Chains of Devastation",
      "Deeply Rooted Elements",
      "Raging Vesper Vortex",
      "Seeds of Rampant Growth",
      "Splintered Elements",
      "Elemental Conduit",
    ],
    "Discipline Priest": [
      "Clarity of Mind",
      "Crystalline Reflection",
      "Kiss of Death",
      "The Penitent One",
      "Cauterizing Shadows",
      "Measured Contemplation",
      "Twins of the Sun Priestess",
      "Spheres' Harmony",
      "Pallid Command",
      "Bwonsamdi's Pact",
      "Shadow Word: Manipulation",
      //"Vault of Heavens",
    ],
    "Holy Priest": [
      "Divine Image",
      "Flash Concentration",
      "Harmonious Apparatus",
      "X'anshi, Return of Archbishop Benedictus",
      "Cauterizing Shadows",
      "Measured Contemplation",
      "Twins of the Sun Priestess",
      "Spheres' Harmony",
      "Pallid Command",
      "Bwonsamdi's Pact",
      "Shadow Word: Manipulation",
      //"Vault of Heavens",
    ],
    "Mistweaver Monk": [
      //"Escape from Reality",
      "Invoker's Delight",
      //"Roll Out",
      //"Fatal Touch",
      "Ancient Teachings of the Monastery",
      "Yu'lon's Whisper",
      "Clouded Focus",
      "Tear of Morning",
      // "Vitality Sacrifice",
      // "Sephuz's Proclamation",
      "Echo of Eonar",
      "Call to Arms",
      "Bountiful Brew",
      "Faeline Harmony",
      "Sinister Teachings",
    ],
  };

  /* --------------------------- Create legendaries for the given spec. --------------------------- */
  choices[spec].map((itemName) => createLegendary(itemName, container, spec, player, contentType));
};

const sortLegendaries = (container) => {
  /* --------- Current default sorting is by HPS but we could get creative here in future. -------- */
  container.sort((a, b) => (a.effectiveHPS < b.effectiveHPS ? 1 : -1));
};

class Legendary {
  constructor(name) {
    this.id = 0;
    this.name = name;
    this.description = "Legendary Description";
    this.image = 0;
    this.bonus_stats = {};
    this.effectiveHPS = 0;
    this.effectiveDPS = 0;
    //this.expectedHps = 0;
    //this.expectedDps = 0;
    //this.singleTargetHPS = 0;
  }
}

export default function LegendaryCompare(props) {
  const classes = useStyles();
  const contentType = useSelector((state) => state.contentType);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const { t } = useTranslation();

  let legendaryList = [];

  fillLegendaries(legendaryList, props.player.spec, props.player, contentType);
  sortLegendaries(legendaryList);

  return (
    <div className={classes.header}>
      <Grid item container spacing={1} direction="row">
        {/* ---------------------------------------- Module Title ---------------------------------------- */}
        <Grid item xs={12}>
          <Typography color="primary" variant="h4" align="center" style={{ paddingBottom: 16 }}>
            {t("LegendaryCompare.Title")}
          </Typography>
        </Grid>
        {/* ------------------------------ Map the Legendary list into Cards ----------------------------- */}
        <Grid item container spacing={1} direction="row">
          {legendaryList.map((item, index) => (
            <LegendaryObject key={index} item={item} player={props.player} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
