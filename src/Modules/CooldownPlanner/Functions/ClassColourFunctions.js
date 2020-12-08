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

  if (props === "DisciplinePriest") {
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
  if (
    props === "HolyPaladin" ||
    props === "Holy Paladin" ||
    props === "Paladin"
  ) {
    return "#F58CBA";
  }
  if (
    props === "RestorationDruid" ||
    props === "Restoration Druid" ||
    props === "Druid"
  ) {
    return "#FF7D0A";
  }
  if (
    props === "HolyPriest" ||
    props === "Priest" ||
    props === "DisciplinePriest" ||
    props === "Holy Priest" ||
    props === "Discipline Priest"
  ) {
    return "#FFFFFF";
  }
  if (
    props === "RestorationShaman" ||
    props === "Restoration Shaman" ||
    props === "Shaman"
  ) {
    return "#007af2";
  }

  if (
    props === "MistweaverMonk" ||
    props === "Mistweaver Monk" ||
    props === "Monk"
  ) {
    return "#00FF96";
  }
  if (props === "Warrior") {
    return "#C79C6E";
  }
  if (props === "HavocDemonHunter") {
    return "#AC44CE ";
  }
}
