import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import "../../../General/Modules/SetupAndMenus/QEMainMenu";
import LegendaryObject from "./LegendaryObject";
import "./Legendaries.css";
import { useTranslation } from "react-i18next";
import { getEffectValue } from "../../Engine/EffectFormulas/EffectEngine";
import ReactGA from "react-ga";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CharacterPanel from "General/Modules/CharacterPanel/CharacterPanel";
import { loadBottomBannerAd, loadBannerAd } from "General/Ads/AllAds"
import { trackPageView } from "Analytics";

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      // marginTop: 32,
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

const createLegendary = (legendary, container, spec, player, contentType) => {
  let lego = new Legendary(legendary.name);
  lego.bonus_stats = getEffectValue({ name: lego.name, type: "spec legendary" }, player, player.getActiveModel(contentType), contentType);
  lego.effectiveHPS = convertToHPS(lego.bonus_stats, player, contentType);
  lego.effectiveDPS = "dps" in lego.bonus_stats ? lego.bonus_stats.dps : 0;
  lego.id = legendary.id;
  lego.covenant = legendary.covenant;

  container.push(lego);
};

const fillLegendaries = (container, spec, player, contentType) => {
  /* ---------------------- These are used in the legendary snapshot module. ---------------------- */
  let choices = {
    "Restoration Druid": [
      { name: "Vision of Unending Growth", id: 338832, covenant: false },
      { name: "Verdant Infusion", id: 338829, covenant: false },
      { name: "The Dark Titans Lesson", id: 338831, covenant: false },
      { name: "Lycaras Fleeting Glimpse", id: 340059, covenant: false },
      { name: "Circle of Life and Death", id: 338657, covenant: false },
      { name: "Oath of the Elder Druid", id: 338608, covenant: false },
      { name: "Memory of the Mother Tree", id: 183240, covenant: false },
      { name: "Kindred Affinity", id: 354115, covenant: true },
      { name: "Sinful Hysteria", id: 354109, covenant: true },
      { name: "Unbridled Swarm", id: 354123, covenant: true },
      { name: "Celestial Spirits", id: 354118, covenant: true },
    ],
    "Preservation Evoker": [],
    "Holy Paladin": [
      // { name: "Vanguards Momentum", id: 337638, covenant: false },
      { name: "The Magistrates Judgment", id: 337681, covenant: false },
      { name: "Inflorescence of the Sunwell", id: 337777, covenant: false },
      { name: "Maraads Dying Breath", id: 340458, covenant: false },
      { name: "Shadowbreaker, Dawn of the Sun", id: 337812, covenant: false },
      { name: "Shock Barrier", id: 337825, covenant: false },
      { name: "The Mad Paragon", id: 337594, covenant: false },
      { name: "Relentless Inquisitor", id: 337297, covenant: false },
      { name: "Of Dusk and Dawn", id: 337746, covenant: false },
      { name: "Divine Resonance", id: 355098, covenant: true },
      { name: "Duty-Bound Gavel", id: 355099, covenant: true },
      { name: "Seasons of Plenty", id: 355100, covenant: true },
      { name: "Radiant Embers", id: 355447, covenant: true },
    ],
    "Restoration Shaman": [
      { name: "Earthen Harmony", id: 335886, covenant: false },
      { name: "Jonat's Natural Focus", id: 335893, covenant: false },
      { name: "Primal Tide Core", id: 335889, covenant: false },
      { name: "Spiritwalker's Tidal Totem", id: 335891, covenant: false },
      { name: "Ancestral Reminder", id: 336741, covenant: false },
      // { name: "Chains of Devastation", id: 336735, covenant: false},
      { name: "Deeply Rooted Elements", id: 336738, covenant: false },
      { name: "Raging Vesper Vortex", id: 356789, covenant: true },
      { name: "Seeds of Rampant Growth", id: 356218, covenant: true },
      { name: "Splintered Elements", id: 354647, covenant: true },
      { name: "Elemental Conduit", id: 356250, covenant: true },
    ],
    "Discipline Priest": [
      { name: "Clarity of Mind", id: 336067, covenant: false },
      { name: "Crystalline Reflection", id: 336507, covenant: false },
      { name: "Kiss of Death", id: 336133, covenant: false },
      { name: "The Penitent One", id: 336011, covenant: false },
      { name: "Cauterizing Shadows", id: 336370, covenant: false },
      { name: "Measured Contemplation", id: 341804, covenant: false },
      { name: "Twins of the Sun Priestess", id: 336897, covenant: false },
      { name: "Spheres' Harmony", id: 356395, covenant: true },
      { name: "Pallid Command", id: 356390, covenant: true },
      { name: "Bwonsamdi's Pact", id: 356391, covenant: true },
      { name: "Shadow Word: Manipulation", id: 356392, covenant: true },
      // { name: "Vault of Heavens", id: 336470, covenant: false },
    ],
    "Holy Priest": [
      { name: "Divine Image", id: 0, covenant: false },
      { name: "Flash Concentration", id: 0, covenant: false },
      { name: "Harmonious Apparatus", id: 0, covenant: false },
      { name: "X'anshi, Return of Archbishop Benedictus", id: 0, covenant: false },
      { name: "Cauterizing Shadows", id: 336370, covenant: false },
      { name: "Measured Contemplation", id: 341804, covenant: false },
      { name: "Twins of the Sun Priestess", id: 336897, covenant: false },
      { name: "Spheres' Harmony", id: 356395, covenant: true },
      { name: "Pallid Command", id: 356390, covenant: true },
      { name: "Bwonsamdi's Pact", id: 356391, covenant: true },
      { name: "Shadow Word: Manipulation", id: 356392, covenant: true },
      // { name: "Vault of Heavens", id: 336470, covenant: false },
    ],
    "Mistweaver Monk": [
      // { name: "Escape from Reality", id: 343250, covenant: false},
      { name: "Invoker's Delight", id: 337298, covenant: false },
      // { name: "Roll Out", id: 337294, covenant: false},
      // { name: "Fatal Touch", id: 337296, covenant: false},
      { name: "Ancient Teachings of the Monastery", id: 337172, covenant: false },
      { name: "Yu'lon's Whisper", id: 337225, covenant: false },
      { name: "Clouded Focus", id: 337343, covenant: false },
      { name: "Tear of Morning", id: 337473, covenant: false },
      // { name: "Vitality Sacrifice", id: 338743, covenant: false},
      // { name: "Sephuz's Proclamation", id: 339348, covenant: false},
      // { name: "Echo of Eonar", id: 338477, covenant: false},
      { name: "Call to Arms", id: 356684, covenant: true },
      { name: "Bountiful Brew", id: 356592, covenant: true },
      { name: "Faeline Harmony", id: 356705, covenant: true },
      { name: "Sinister Teachings", id: 356818, covenant: true },
    ],
  };

  /* --------------------------- Create legendaries for the given spec. --------------------------- */
  choices[spec].map((object) => createLegendary(object, container, spec, player, contentType));
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
    this.id = 0;
    this.covenant = "";
    //this.expectedHps = 0;
    //this.expectedDps = 0;
    //this.singleTargetHPS = 0;
  }
}

export default function LegendaryCompare(props) {
  const classes = useStyles();
  const contentType = useSelector((state) => state.contentType);
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
    loadBannerAd(props.patronStatus);
    loadBottomBannerAd(props.patronStatus);

  }, []);
  const { t } = useTranslation();

  let legendaryList = [];

  fillLegendaries(legendaryList, props.player.spec, props.player, contentType);
  sortLegendaries(legendaryList);

  return (
    <div className={classes.header}>
      <div style={{ height: 96 }} />
      <div id="banner2"></div>
      <Grid item container spacing={2} direction="row">
        {/* ---------------------------------------- Module Title ---------------------------------------- */}
        <Grid item xs={12}>
          <Typography color="primary" variant="h4" align="center" style={{ paddingBottom: 4 }}>
            {t("LegendaryCompare.Title")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: "80%", margin: "auto" }}>
            <CharacterPanel
              player={props.player}
              simcSnack={props.simcSnack}
              allChars={props.allChars}
              contentType={contentType}
              singleUpdate={props.singleUpdate}
              hymnalShow={true}
              groupBuffShow={true}
              autoSocket={true}
            />
          </div>
        </Grid>
        {/* ------------------------------ Map the Legendary list into Cards ----------------------------- */}
        <Grid item container spacing={1} direction="row">
          {legendaryList
            .filter((filter) => filter.covenant === false)
            .map((item, index) => (
              <LegendaryObject key={index} item={item} player={props.player} />
            ))}
        </Grid>
        <Grid item container spacing={1} direction="row">
          <Grid item xs={12}>
            <Typography color="primary" variant="h5" align="center" style={{ paddingBottom: 4 }}>
              {t("CovLegendaries")}
            </Typography>
          </Grid>
          {legendaryList
            .filter((filter) => filter.covenant === true)
            .map((item, index) => (
              <LegendaryObject key={index} item={item} player={props.player} />
            ))}
        </Grid>
      </Grid>
      <div id="qelivead2"></div>
      <div style={{ height: 100 }} />
    </div>
  );
}
