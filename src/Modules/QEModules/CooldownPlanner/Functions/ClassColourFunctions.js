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

  if (props === "DiscisplinePriest") {
    return "|cfffefefe";
  }

  if (props === "RestorationShaman") {
    return "|cff006fdc";
  }

  if (props === "MistweaverMonk") {
    return "|cff00fe95";
  }
}

export function classColoursJS(props) {
  if (props === "HolyPaladin" || props === "Paladin") {
    return "#F58CBA";
  }
  if (props === "RestorationDruid" || props === "Druid") {
    return "#FF7D0A";
  }
  if (
    props === "HolyPriest" ||
    props === "Priest" ||
    props === "DiscisplinePriest"
  ) {
    return "#FFFFFF";
  }
  if (props === "RestorationShaman" || props === "Shaman") {
    return "#0070DE  ";
  }

  if (props === "MistweaverMonk" || props === "Monk") {
    return "#00FF96";
  }
  if (props === "Warrior") {
    return "#C79C6E";
  }
  if (props === "HavocDemonHunter") {
    return "#A330C9";
  }
}