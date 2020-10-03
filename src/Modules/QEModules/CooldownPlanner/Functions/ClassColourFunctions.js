// import React from "react";

export function classColoursERT(props) {
  if (props === "Holy Paladin") {
    return "|cfff38bb9";
  }
  if (props === "Restoration Druid") {
    return "|cfffe7b09";
  }
  if (props === "Holy Priest") {
    return "|cfffefefe";
  }

  if (props === "Discispline Priest") {
    return "|cfffefefe";
  }

  if (props === "Restoration Shaman") {
    return "|cff006fdc";
  }

  if (props === "Mistweaver Monk") {
    return "|cff00fe95";
  }
}

export function classColoursJS(props) {
  if (props === "Holy Paladin" || props === "Paladin") {
    return "#F58CBA";
  }
  if (props === "Restoration Druid" || props === "Druid") {
    return "#FF7D0A";
  }
  if (
    props === "Holy Priest" ||
    props === "Priest" ||
    props === "Discispline Priest"
  ) {
    return "#FFFFFF";
  }
  if (props === "Restoration Shaman" || props === "Shaman") {
    return "#0070DE  ";
  }

  if (props === "Mistweaver Monk" || props === "Monk") {
    return "#00FF96";
  }
  if (props === "Warrior") {
    return "#C79C6E";
  }
  if (props === "Havoc Demon Hunter") {
    return "#A330C9";
  }
}