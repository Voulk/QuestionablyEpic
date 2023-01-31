// import React from "react";
import { cooldownDB } from "../Data/CooldownDB";

export function classColoursERT(props, cooldown) {
  if (props === "Paladin") {
    return "|cfff38bb9";
  }
  if (props === "Druid") {
    return "|cfffe7b09";
  }
  if (props === "Priest") {
    if (
      cooldownDB
        .filter((filter) => filter.class === "Priest" && filter.spec === "Holy")
        .map((map) => map.guid)
        .includes(cooldown)
    ) {
      return "|cffffff00";
    }
    if (
      cooldownDB
        .filter((filter) => filter.class === "Priest" && filter.spec === "Shadow")
        .map((map) => map.guid)
        .includes(cooldown)
    ) {
      return "|cfffefefe";
    }
    if (
      cooldownDB
        .filter((filter) => filter.class === "Priest" && filter.spec === "Discipline")
        .map((map) => map.guid)
        .includes(cooldown)
    ) {
      return "|cff808080";
    }
    return "|cffffff00";
  }
  if (props === "Shaman") {
    return "|cff006fdc";
  }
  if (props === "Monk") {
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
  if (props === "DemonHunter") {
    return "|cffa22fc8";
  }
  if (props === "DeathKnight") {
    return "|cffc31d39";
  }
  if (props === "Evoker") {
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

export function classColoursFonts(props) {
  if (props === undefined) {
    return "#000000";
  }
  if (props.includes("Paladin")) {
    return "#000000";
  }
  if (props.includes("Druid")) {
    return "#000000";
  }
  if (props.includes("Priest")) {
    return "#000000";
  }
  if (props.includes("Shaman")) {
    return "#000000";
  }
  if (props.includes("Mage")) {
    return "#000000";
  }
  if (props === "Hunter") {
    return "#000000";
  }
  if (props.includes("Evoker")) {
    return "#000000";
  }
  if (props.includes("Rogue")) {
    return "#000000";
  }
  if (props.includes("Warlock")) {
    return "#000000";
  }
  if (props.includes("Monk")) {
    return "#000000";
  }
  if (props === "Warrior") {
    return "#000000";
  }
  if (props === "HavocDemonHunter" || props === "Havoc Demon Hunter" || props === "DemonHunter" || props === "Demon Hunter") {
    return "#ffffff";
  }
  if (props === "DeathKnight" || props === "Death Knight") {
    return "#ffffff";
  }
}
