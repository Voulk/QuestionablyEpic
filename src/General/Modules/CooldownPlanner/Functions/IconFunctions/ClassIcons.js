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
import AugmenationEvokerIcon from "Images/Classes/Evoker/classicon_evoker_augmentation.jpg";

import ShamanIcon from "Images/Classes/Shaman/Icons/class_shaman.jpg";

export default function classIcons(props, style) {
  let src = "";
  let alt = "";
  const iconName = props.toLowerCase() || "";

  // Preservation Evoker
  if (iconName === "preservationevoker" || iconName === "preservation evoker" || iconName === "evoker-preservation" || iconName === "evoker") {
    src = EvokerIcon;
    alt = "Preservation Evoker";
  }
  // Devastation Evoker
  if (iconName === "devastationevoker" || iconName === "devastation evoker" || iconName === "evoker-devastation" || iconName === "devastationevoker") {
    src = DevastationEvokerIcon;
    alt = "Devastation Evoker";
  }

  // Devastation Evoker
  if (iconName === "augmenationevoker" || iconName === "augmenation evoker" || iconName === "evoker-augmenation" || iconName === "augmenationevoker") {
    src = AugmenationEvokerIcon;
    alt = "Augmenation Evoker";
  }

  // Paladin Cooldowns
  if (iconName === "holypaladin" || iconName === "holy paladin" || iconName === "paladin-holy" || iconName === "paladin" || iconName === "holy paladin classic") {
    src = HolyPaladinIcon;
    alt = "Holy Paladin";
  }

  // Restoration Druid
  if (iconName === "restorationdruid" || iconName === "restoration druid" || iconName === "druid-restoration" || iconName === "restoration druid classic") {
    src = RestorationDruidIcon;
    alt = "Restoration Druid";
  }

  // Preservation Evoker
  if (iconName === "preservationEvoker" || iconName === "preservation evoker" || iconName === "evoker-preservation" || iconName === "evoker") {
    src = EvokerIcon;
    alt = "Preservation Evoker";
  }

  // Devastation Evoker
  if (iconName === "devastationEvoker" || iconName === "devastation evoker" || iconName === "evoker-devastation") {
    src = DevastationEvokerIcon;
    alt = "Devastation Evoker";
  }

  // Restoration Druid
  if (iconName === "druid") {
    src = DruidIcon;
    alt = "Druid";
  }

  // Holy Priest
  if (
    iconName === "holypriest" ||
    iconName === "holy priest" ||
    iconName === "priest-holy" ||
    iconName === "priest" ||
    // iconName === "ShadowPriest" ||
    // iconName === "Shadow Priest" ||
    // iconName === "Priest-Shadow"
    iconName === "holy priest classic"
  ) {
    src = HolyPriestIcon;
    alt = "Holy Priest";
  }

  // ShadowPriest
  if (iconName === "dhadowPriest" || iconName === "dhadow Priest" || iconName === "priest-dhadow") {
    src = ShadowPriestIcon;
    alt = "Shadow Priest";
  }

  // Discipline Priest
  if (iconName === "disciplinepriest" || iconName === "discipline priest" || iconName === "priest-discipline") {
    src = DiscPriestIcon;
    alt = "Discipline Priest";
  }

  // Restoration Shaman
  if (
    iconName === "restorationShaman" ||
    iconName === "restoration Shaman" ||
    iconName === "shaman-restoration" ||
    iconName === "shaman" ||
    iconName === "Restoration Shaman Classic" ||
    iconName === "RestorationShaman" ||
    iconName === "Restoration Shaman" ||
    iconName === "restoration shaman"
  ) {
    src = RestorationShamanIcon;
    alt = "Restoration Shaman";
  }
  //  Shaman
  if (iconName === "shamandps") {
    src = ShamanIcon;
    alt = "Shaman";
  }

  // Mistweaver Monk
  if (iconName === "mistweaverMonk" || iconName === "mistweaver monk" || iconName === "monk-mistweaver" || iconName === "monk") {
    src = MistweaverIcon;
    alt = "Mistweaver Monk";
  }

  // Warrior
  if (iconName === "warrior") {
    src = WarriorIcon;
    alt = "Warrior";
  }

  // Demon Hunter
  if (iconName === "havocDemonHunter" || iconName === "havoc Demon Hunter" || iconName === "demonhunter-havoc" || iconName === "demon hunter" || iconName === "demonhunter") {
    src = DemonHunterIcon;
    alt = "Havoc Demon Hunter";
  }

  // Death KNight
  if (iconName === "death knight" || iconName === "deathknight" || iconName === "deathknight-Frost" || iconName === "deathknight-unholy" || iconName === "deathknight-blood") {
    src = DeathKnightIcon;
    alt = "Death Knight";
  }

  // Rogue
  if (iconName === "rogue") {
    src = RogueIcon;
    alt = "Rogue";
  }
  // Warlock
  if (iconName === "warlock") {
    src = WarlockIcon;
    alt = "Warlock";
  }
  // Hunter
  if (iconName === "hunter") {
    src = HunterIcon;
    alt = "Hunter";
  }
  // Mage
  if (iconName === "mage") {
    src = MageIcon;
    alt = "Mage";
  }

  if (iconName === "" || iconName === undefined) {
    return null;
  }
  return (
    // <div>
    <img style={{ ...style }} src={src} alt={alt} />
    // </div>
  );
}
