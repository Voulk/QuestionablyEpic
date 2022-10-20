import React from "react";
import HolyPaladinIcon from "Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import ShadowPriestIcon from "Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg";
import HolyPriestIcon from "Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";
import WarriorIcon from "Images/Classes/Warrior/WarriorIcon.jpg";
import DemonHunterIcon from "Images/Classes/DemonHunter/DemonHunterIcon.jpg";
import DeathKnightIcon from "Images/Classes/DeathKnight/DeathKnightIcon.jpg";
import RogueIcon from "Images/Classes/Rogue/Icons/RogueIcon.jpg";
import WarlockIcon from "Images/Classes/Warlock/Icons/WarlockIcon.jpg";
import MageIcon from "Images/Classes/Mage/Icons/MageIcon.jpg";
import HunterIcon from "Images/Classes/Hunter/Icons/HunterIcon.jpg";
import DruidIcon from "Images/Classes/Druid/classicon_druid.jpg";
import EvokerIcon from "Images/Classes/Evoker/classicon_evoker_preservation.jpg";
import DevastationEvokerIcon from "Images/Classes/Evoker/classicon_evoker_devastation.jpg";

export default function classIcons(props, style) {
  let src = "";
  let alt = "";

  // Preservation Evoker
  if (props === "PreservationEvoker" || props === "Preservation Evoker" || props === "Evoker-Preservation") {
    src = RestorationDruidIcon;
    alt = "Preservation Evoker";
  }

  // Paladin Cooldowns
  if (props === "HolyPaladin" || props === "Holy Paladin" || props === "Paladin-Holy" || props === "Paladin" || props === "Holy Paladin Classic") {
    src = HolyPaladinIcon;
    alt = "Holy Paladin";
  }

  // Restoration Druid
  if (props === "RestorationDruid" || props === "Restoration Druid" || props === "Druid-Restoration" || props === "Restoration Druid Classic") {
    src = RestorationDruidIcon;
    alt = "Restoration Druid";
  }

  // Preservation Evoker
  if (props === "PreservationEvoker" || props === "Preservation Evoker" || props === "Evoker-Preservation") {
    src = EvokerIcon;
    alt = "Preservation Evoker";
  }

  // Devastation Evoker
  if (props === "DevastationEvoker" || props === "Devastation Evoker" || props === "Evoker-Devastation") {
    src = DevastationEvokerIcon;
    alt = "Devastation Evoker";
  }

  // Restoration Druid
  if (props === "Druid") {
    src = DruidIcon;
    alt = "Druid";
  }

  // Holy Priest
  if (
    props === "HolyPriest" ||
    props === "Holy Priest" ||
    props === "Priest-Holy" ||
    props === "Priest" ||
    // props === "ShadowPriest" ||
    // props === "Shadow Priest" ||
    // props === "Priest-Shadow"
    props === "Holy Priest Classic"
  ) {
    src = HolyPriestIcon;
    alt = "Holy Priest";
  }

  // ShadowPriest
  if (props === "ShadowPriest" || props === "Shadow Priest" || props === "Priest-Shadow") {
    src = ShadowPriestIcon;
    alt = "Shadow Priest";
  }

  // Discipline Priest
  if (props === "DisciplinePriest" || props === "Discipline Priest" || props === "Priest-Discipline") {
    src = DiscPriestIcon;
    alt = "Discipline Priest";
  }

  // Restoration Shaman
  if (props === "RestorationShaman" || props === "Restoration Shaman" || props === "Shaman-Restoration" || props === "Shaman" || props === "Restoration Shaman Classic") {
    src = RestorationShamanIcon;
    alt = "Restoration Shaman";
  }

  // Mistweaver Monk
  if (props === "MistweaverMonk" || props === "Mistweaver Monk" || props === "Monk-Mistweaver" || props === "Monk") {
    src = MistweaverIcon;
    alt = "Mistweaver Monk";
  }

  // Warrior
  if (props === "Warrior") {
    src = WarriorIcon;
    alt = "Warrior";
  }

  // Demon Hunter
  if (props === "HavocDemonHunter" || props === "Havoc Demon Hunter" || props === "DemonHunter-Havoc" || props === "Demon Hunter" || props === "DemonHunter") {
    src = DemonHunterIcon;
    alt = "Havoc Demon Hunter";
  }

  // Death KNight
  if (props === "Death Knight" || props === "DeathKnight" || props === "DeathKnight-Frost" || props === "DeathKnight-Unholy" || props === "DeathKnight-Blood") {
    src = DeathKnightIcon;
    alt = "Death Knight";
  }

  // Rogue
  if (props === "Rogue") {
    src = RogueIcon;
    alt = "Rogue";
  }
  // Warlock
  if (props === "Warlock") {
    src = WarlockIcon;
    alt = "Warlock";
  }
  // Hunter
  if (props === "Hunter") {
    src = HunterIcon;
    alt = "Hunter";
  }
  // Mage
  if (props === "Mage") {
    src = MageIcon;
    alt = "Mage";
  }

  if (props === "" || props === undefined) {
    return null;
  }
  return (
    <div>
      <img style={{ ...style }} src={src} alt={alt} />
    </div>
  );
}
