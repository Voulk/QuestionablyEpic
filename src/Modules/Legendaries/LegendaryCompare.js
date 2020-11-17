import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../SetupAndMenus/QEMainMenu.css";
import LegendaryObject from "./LegendaryObject";
import "./Legendaries.css";
import { useTranslation } from "react-i18next";
import {getEffectValue} from '../Engine/EffectFormulas/EffectEngine'

// This is all shitty boilerplate code that'll be replaced. Do not copy.
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 5,
//   },
// }));

const createLegendary = (legendaryName, container, spec, pl, contentType) => {
  let lego = new Legendary(legendaryName);
  lego.bonus_stats = getEffectValue({name: lego.name, type: 'spec legendary'}, pl, contentType);

  container.push(lego);
};

const fillLegendaries = (container, spec, pl, contentType) => {
  //container = [];

  // These are used in the legendary snapshot module. 
  
  let choices = {
    "Restoration Druid": [
      "Vision of Unending Growth",
      "Verdant Infusion",
      "The Dark Titans Lesson",
      "Lycaras Fleeting Glimpse",
      "Circle of Life and Death",
      "Oath of the Elder Druid",
      "Memory of the Mother Tree",
    ],
    "Holy Paladin": [
      "Of Dusk and Dawn",
      "Vanguards Momentum",
      "The Magistrates Judgment",
      "Inflorescence of the Sunwell",
      "Maraads Dying Breath",
      "Shadowbreaker, Dawn of the Sun",
      "Shock Barrier",
    ],
    "Restoration Shaman": [
      "Earthen Harmony",
      "Jonat's Natural Focus",
      "Primal Tide Core",
      "Spirit Walker's Tidal Totem",
      "Ancestral Reminder",
      "Chains of Devastation",
      "Deeply Rooted Elements",
    ],
    "Discipline Priest": [
      "Clarity of Mind",
      "Crystalline Reflection",
      "Kiss of Death",
      "The Penitent One",
      "Cauterizing Shadows",
      "Measured Contemplation",
      "Twins of the Sun Priestess",
      "Vault of Heavens",
    ],
    "Mistweaver Monk": [
      "Ancient Teachings of the Monastery",
      "Clouded Focus",
      "Tear of Morning",
      "Yu'lon's Whisper",
      "Invoker's Delight",
    ],
    "Holy Priest": ["HolyPriestLegendary1",
      "Divine Image",
      "Flash Concentration",
      "Harmonious Apparatus",
      "X'anshi, Return of Archbishop Benedictus",
      "Cauterizing Shadows",
      "Measured Contemplation",
      "Twins of the Sun Priestess",
      "Vault of Heavens",
  ],
  };
  
  /*
 let choices = {
  "Restoration Druid": [
    338832, // Vision of Unending Growth
    338829, // Verdant Infusion
    338831, // "The Dark Titans Lesson",
    340059, // "Lycaras Fleeting Glimpse",
    338657, // "Circle of Life and Death",
    338608, // "Oath of the Elder Druid",
    339064, // "Memory of the Mother Tree",
  ],
  "Holy Paladin": [
    337746, // "Of Dusk and Dawn",
    337638, // "Vanguards Momentum",
    337681, // "The Magistrates Judgment",
    337777, // "Inflorescence of the Sunwell",
    234848, // "Maraads Dying Breath",
    337812, // "Shadowbreaker, Dawn of the Sun",
    337825, // "Shock Barrier",
    337297, // Relentless Inquisitor,
  ],
  "Restoration Shaman": [
    "Earthen Harmony",
    "Jonat's Natural Focus",
    "Primal Tide Core",
    "Spirit Walker's Tidal Totem",
    "Ancestral Reminder",
    "Chains of Devastation",
    "Deeply Rooted Elements",
  ],
  "Discipline Priest": [
    "Clarity of Mind",
    "Crystalline Reflection",
    "Kiss of Death",
    "The Penitent One",
    "Cauterizing Shadows",
    "Measured Contemplation",
    "Twins of the Sun Priestess",
    "Vault of Heavens",
  ],
  "Mistweaver Monk": [
    "Ancient Teachings of the Monastery",
    "Clouded Focus",
    "Tear of Morning",
    "Yu'lon's Whisper",
    "Invoker's Delight",
  ],
  "Holy Priest": ["HolyPriestLegendary1",
    "Divine Image",
    "Flash Concentration",
    "Harmonious Apparatus",
    "X'anshi, Return of Archbishop Benedictus",
    "Cauterizing Shadows",
    "Measured Contemplation",
    "Twins of the Sun Priestess",
    "Vault of Heavens",
  ],
  };

  */

  // Create legendaries for the given spec.
  choices[spec].map((itemName, index) =>
    createLegendary(itemName, container, spec, pl, contentType)
  );
};

const sortLegendaries = (container) => {
  // Current default sorting is by HPS but we could get creative here in future.
  container.sort((a, b) => (a.expectedHPS < b.expectedHPS ? 1 : -1));
};

class Legendary {
  constructor(name) {
    this.id = 0;
    this.name = name;
    this.description = "Legendary Description";
    this.image = 0;
    this.bonus_stats = {};
    //this.expectedHps = 0;
    //this.expectedDps = 0;
    //this.singleTargetHPS = 0;
  }
}

export default function LegendaryCompare(props) {
  const { t, i18n } = useTranslation();

  let legendaryList = [];

  fillLegendaries(legendaryList, props.pl.spec, props.pl, props.contentType);
  sortLegendaries(legendaryList);

  return (
    <div
    // style={{ backgroundColor: "#313131" }}
    >
      <div
        style={{
          margin: "auto",
          width: "55%",
          justifyContent: "space-between",
          display: "block",
        }}
      >
        <p className="headers">{t("LegendaryCompareTitle")}</p>

        {legendaryList.map((item, index) => (
          <LegendaryObject key={index} item={item} />
        ))}
      </div>
    </div>
  );
}