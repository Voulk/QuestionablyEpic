// import React from "react";

export function classColoursERT(props) {
  if (props === "HolyPaladin") {
    return "|cfff38bb9";
  }
  if (props === "RestorationDruid") {
    return "|cfffe7b09";
  }
  if (props === "HolyPriest") {
    return "|cfffefefe";
  }

  if (props === "ShadowPriest") {
    return "|cfffefefe";
  }

  if (props === "DisciplinePriest") {
    return "|cfffefefe";
  }

  if (props === "RestorationShaman") {
    return "|cff006fdc";
  }

  if (props === "MistweaverMonk") {
    return "|cff00fe95";
  }

  if (props === "Warrior") {
    return "|cffc59a6c";
  }

  if (props === "HavocDemonHunter") {
    return "|cffa22fc8";
  }

  if (props === "DeathKnight") {
    return "|cffc31d39";
  }
}

export function classColoursJS(props) {
  if (props.includes("Paladin")) {
    return "#F58CBA";
  }
  if (props.includes("Druid")) {
    return "#FF7D0A";
  }
  if (
    props.includes("Priest")
  ) {
    return "#FFFFFF";
  }
  if (props.includes("Shaman")) {
    return "#007af2";
  }

  if (props.includes("Monk")) {
    return "#00FF96";
  }
  if (props === "Warrior") {
    return "#C79C6E";
  }
  if (props === "HavocDemonHunter" || props === "Havoc Demon Hunter" || props === "DemonHunter" || props === "Demon Hunter") {
    return "#AC44CE ";
  }
  if (props === "DeathKnight" || props === "Death Knight") {
    return "#C41E3A	 ";
  }
}
