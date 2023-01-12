// import React from "react";

export function classColoursERT(props) {
  if (props === "HolyPaladin") {
    return "|cfff38bb9";
  }
  if (props === "RestorationDruid" || props === "Druid") {
    return "|cfffe7b09";
  }
  if (props === "HolyPriest") {
    return "|cffffff00";
  }
  if (props === "ShadowPriest") {
    return "|cfffefefe";
  }
  if (props === "DisciplinePriest") {
    return "|cff808080";
  }
  if (props === "RestorationShaman" || props === "Shaman-Elemental" || props === "Shaman-Elemental") {
    return "|cff006fdc";
  }
  if (props === "MistweaverMonk") {
    return "|cff00fe95";
  }
  if (props === "Warrior") {
    return "|cffc59a6c";
  }
  if (props === "Hunter") {
    return "|cffa9d271";
  }
  if (props === "Mage") {
    return "|cff3ec6ea";
  }
  if (props === "Warlock") {
    return "|cff8687ed";
  }
  if (props === "Rogue") {
    return "|cfffef367";
  }
  if (props === "HavocDemonHunter") {
    return "|cffa22fc8";
  }
  if (props === "DeathKnight") {
    return "|cffc31d39";
  }
  if (props === "PreservationEvoker" || props === "DevastationEvoker") {
    return "|cff33937f";
  }
}

export function classColoursJS(props) {
  if (props === undefined) {
    return "#FFFFFF";
  }
  if (props.includes("Paladin")) {
    return "#F58CBA";
  }
  if (props.includes("Druid")) {
    return "#FF7D0A";
  }
  if (props.includes("Priest")) {
    return "#FFFFFF";
  }
  if (props.includes("Shaman")) {
    return "#007af2";
  }
  if (props.includes("Mage")) {
    return "#3FC7EB";
  }
  if (props === "Hunter") {
    return "#AAD372";
  }
  if (props.includes("Evoker")) {
    return "#33937F";
  }
  if (props.includes("Rogue")) {
    return "#FFF468";
  }
  if (props.includes("Warlock")) {
    return "#8788EE";
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
