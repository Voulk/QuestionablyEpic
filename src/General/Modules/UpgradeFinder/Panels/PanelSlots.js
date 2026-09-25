import React, { useEffect, useState } from "react";
import { rootStyles } from "./PanelStyles";
import { Typography, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTranslatedSlotName } from "locale/slotsLocale";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";
import { DEFAULT_ITEM_TYPES, getSlotItems, getSlotSourceOptions } from "./slotPanelUtils";

const loadStoredSources = (availableSources) => {
  try {
    const stored = JSON.parse(sessionStorage.getItem("ufSlotSources"));
    if (!Array.isArray(stored) || stored.length === 0) {
      return [...availableSources];
    }
    const valid = availableSources.filter((source) => stored.includes(source));
    return valid.length > 0 ? valid : [...availableSources];
  } catch (e) {
    return [...availableSources];
  }
};

export default function SlotsContainer(props) {
  const classes = rootStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemDifferentials = props.itemDifferentials;
  const spec = props.spec;
  const gameType = props.gameType || "Retail";
  const itemTypesEnabled = props.playerSettings.itemTypes || DEFAULT_ITEM_TYPES;
  const availableSources = getSlotSourceOptions(gameType);
  const [sourcesEnabled, setSourcesEnabled] = useState(() => loadStoredSources(availableSources));

  useEffect(() => {
    sessionStorage.setItem("ufSlotSources", JSON.stringify(sourcesEnabled));
  }, [sourcesEnabled]);

  const toggleSource = (source) => {
    setSourcesEnabled((current) =>
      current.includes(source) ? current.filter((entry) => entry !== source) : [...current, source]
    );
  };

  const slotList = [
    { slot: "Head", label: "head" },
    { slot: "Neck", label: "neck" },
    { slot: "Shoulder", label: "shoulder" },
    { slot: "Back", label: "back" },
    { slot: "Chest", label: "chest" },
    { slot: "Wrist", label: "wrists" },
    { slot: "Hands", label: "hands" },
    { slot: "Waist", label: "waist" },
    { slot: "Legs", label: "legs" },
    { slot: "Feet", label: "feet" },
    { slot: "Finger", label: "finger" },
    { slot: "Trinket", label: "trinket" },
    { slot: "AllMainhands", label: "weapons" },
    { slot: "Offhands", label: "offhands" },
  ];

  const iconReturn = (slot, playerSpec) => {
    switch (playerSpec) {
      case "Restoration Druid":
      case "Restoration Druid Classic":
        return require("Images/UpgradeFinderIcons/Leather/" + slot + ".jpg");
      case "Mistweaver Monk":
      case "Mistweaver Monk Classic":
        return require("Images/UpgradeFinderIcons/Leather/" + slot + ".jpg");
      case "Holy Paladin":
      case "Holy Paladin Classic":
        return require("Images/UpgradeFinderIcons/Plate/" + slot + ".jpg");
      case "Restoration Shaman":
      case "Preservation Evoker":
      case "Restoration Shaman Classic":
        return require("Images/UpgradeFinderIcons/Mail/" + slot + ".jpg");
      case "Holy Priest":
      case "Holy Priest Classic":
      case "Discipline Priest":
      case "Discipline Priest Classic":
        return require("Images/UpgradeFinderIcons/Cloth/" + slot + ".jpg");
      default:
        return [-1];
    }
  };

  const contentGenerator = () => {
    return slotList.map((key, i) => {
      const slotItems = getSlotItems(itemDifferentials, key.slot, itemTypesEnabled, sourcesEnabled);
      const upgradeCount = slotItems.filter((entry) => entry.score > 0).length;

      return (
        <UFAccordion key={getTranslatedSlotName(key.label, currentLanguage) + "-accordian" + i} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
          <UFAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
            <img src={iconReturn(key.slot, spec)} height={30} width={30} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
            <Typography align="center" variant="h6" noWrap color="primary">
              {getTranslatedSlotName(key.label, currentLanguage)} - {upgradeCount} Upgrades
            </Typography>
          </UFAccordionSummary>
          <AccordionDetails style={{ backgroundColor: "#191c23" }}>
            <Grid container spacing={1}>
              {slotItems.map((entry) => (
                <ItemUpgradeCard key={`${entry.item}-${entry.level}-${entry.dropLoc}-${entry.dropType}`} item={entry} slotPanel={true} />
              ))}
            </Grid>
          </AccordionDetails>
        </UFAccordion>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.sourceBar}>
        <Typography variant="h6" color="primary" noWrap>
          {t("UpgradeFinder.SlotSources")}
        </Typography>
        <div className={classes.sourceButtonRow}>
          {availableSources.map((source) => (
            <ToggleButton
              key={source}
              value={source}
              selected={sourcesEnabled.includes(source)}
              onChange={() => toggleSource(source)}
              classes={{
                root: classes.sourceToggle,
                selected: classes.sourceToggleSelected,
              }}
            >
              {t(source, { defaultValue: source })}
            </ToggleButton>
          ))}
        </div>
      </div>
      {contentGenerator()}
    </div>
  );
}
