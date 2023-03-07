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
import ShamanIcon from "Images/Classes/Shaman/Icons/class_shaman.jpg";

export default function classIcons(props, style) {
  let src = "";
  let alt = "";
  const iconName = props.toLowerCase() || "";

  // Preservation Evoker
  if (props === "preservationevoker" || props === "preservation evoker" || props === "evoker-preservation" || props === "evoker") {
    src = EvokerIcon;
    alt = "Preservation Evoker";
  }
  // Devastation Evoker
  if (props === "devastationevoker" || props === "devastation evoker" || props === "evoker-devastation" || props === "devastationevoker") {
    src = DevastationEvokerIcon;
    alt = "Devastation Evoker";
  }

  // Paladin Cooldowns
  if (props === "holypaladin" || props === "holy paladin" || props === "paladin-holy" || props === "paladin" || props === "holy paladin classic") {
    src = HolyPaladinIcon;
    alt = "Holy Paladin";
  }

  // Restoration Druid
  if (props === "restorationDruid" || props === "restoration druid" || props === "druid-restoration" || props === "restoration druid classic") {
    src = RestorationDruidIcon;
    alt = "Restoration Druid";
  }

  // Preservation Evoker
  if (props === "preservationEvoker" || props === "preservation evoker" || props === "evoker-preservation" || props === "evoker") {
    src = EvokerIcon;
    alt = "Preservation Evoker";
  }

  // Devastation Evoker
  if (props === "devastationEvoker" || props === "devastation evoker" || props === "evoker-devastation") {
    src = DevastationEvokerIcon;
    alt = "Devastation Evoker";
  }

  // Restoration Druid
  if (props === "druid") {
    src = DruidIcon;
    alt = "Druid";
  }

  // Holy Priest
  if (
    props === "holypriest" ||
    props === "holy priest" ||
    props === "priest-holy" ||
    props === "priest" ||
    // props === "ShadowPriest" ||
    // props === "Shadow Priest" ||
    // props === "Priest-Shadow"
    props === "holy priest classic"
  ) {
    src = HolyPriestIcon;
    alt = "Holy Priest";
  }

  // ShadowPriest
  if (props === "dhadowPriest" || props === "dhadow Priest" || props === "priest-dhadow") {
    src = ShadowPriestIcon;
    alt = "Shadow Priest";
  }

  // Discipline Priest
  if (props === "disciplinepriest" || props === "discipline priest" || props === "priest-discipline") {
    src = DiscPriestIcon;
    alt = "Discipline Priest";
  }

  // Restoration Shaman
  if (props === "restorationShaman" || props === "restoration Shaman" || props === "shaman-restoration" || props === "shaman" || props === "Restoration Shaman Classic") {
    src = RestorationShamanIcon;
    alt = "Restoration Shaman";
  }
  //  Shaman
  if (props === "shamandps" ) {
    src = ShamanIcon;
    alt = "Shaman";
  }

  // Mistweaver Monk
  if (props === "mistweaverMonk" || props === "mistweaver monk" || props === "monk-mistweaver" || props === "monk") {
    src = MistweaverIcon;
    alt = "Mistweaver Monk";
  }

  // Warrior
  if (props === "warrior") {
    src = WarriorIcon;
    alt = "Warrior";
  }

  // Demon Hunter
  if (props === "havocDemonHunter" || props === "havoc Demon Hunter" || props === "demonhunter-havoc" || props === "demon hunter" || props === "demonhunter") {
    src = DemonHunterIcon;
    alt = "Havoc Demon Hunter";
  }

  // Death KNight
  if (props === "death knight" || props === "deathknight" || props === "deathknight-Frost" || props === "deathknight-unholy" || props === "deathknight-blood") {
    src = DeathKnightIcon;
    alt = "Death Knight";
  }

  // Rogue
  if (props === "rogue") {
    src = RogueIcon;
    alt = "Rogue";
  }
  // Warlock
  if (props === "warlock") {
    src = WarlockIcon;
    alt = "Warlock";
  }
  // Hunter
  if (props === "hunter") {
    src = HunterIcon;
    alt = "Hunter";
  }
  // Mage
  if (props === "mage") {
    src = MageIcon;
    alt = "Mage";
  }

  if (props === "" || props === undefined) {
    return null;
  }
  return (
    // <div>
      <img style={{ ...style }} src={src} alt={alt} />
    // </div>
  );
}
