import React, { CSSProperties } from 'react';

// --- Icon Imports ---
import HolyPaladinIcon from "Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import ShadowPriestIcon from "Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg";
import HolyPriestIcon from "Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";
import DruidIcon from "Images/Classes/Druid/classicon_druid.jpg";
import EvokerIcon from "Images/Classes/Evoker/classicon_evoker_preservation.jpg";

// --- Types ---
interface ClassIconProps {
  name: string;
  style?: CSSProperties;
}

interface IconData {
  src: string;
  alt: string;
}


const ICON_MAP: Record<string, IconData> = {
  preservation: { src: EvokerIcon, alt: "Preservation Evoker" },
  devastation: { src: DevastationEvokerIcon, alt: "Devastation Evoker" },
  augmentation: { src: AugmentationEvokerIcon, alt: "Augmentation Evoker" },
  holypaladin: { src: HolyPaladinIcon, alt: "Holy Paladin" },
  restodruid: { src: RestorationDruidIcon, alt: "Restoration Druid" },
  druid: { src: DruidIcon, alt: "Druid" },
  holypriest: { src: HolyPriestIcon, alt: "Holy Priest" },
  shadowpriest: { src: ShadowPriestIcon, alt: "Shadow Priest" },
  discpriest: { src: DiscPriestIcon, alt: "Discipline Priest" },
  restoshaman: { src: RestorationShamanIcon, alt: "Restoration Shaman" },
  shamandps: { src: ShamanIcon, alt: "Shaman" },
  mistweaver: { src: MistweaverIcon, alt: "Mistweaver Monk" },
  warrior: { src: WarriorIcon, alt: "Warrior" },
  dh: { src: DemonHunterIcon, alt: "Havoc Demon Hunter" },
  dk: { src: DeathKnightIcon, alt: "Death Knight" },
  rogue: { src: RogueIcon, alt: "Rogue" },
  warlock: { src: WarlockIcon, alt: "Warlock" },
  hunter: { src: HunterIcon, alt: "Hunter" },
  mage: { src: MageIcon, alt: "Mage" },
};


const ALIAS_MAP: Record<string, string> = {
  // Evokers
  "preservationevoker": "preservation", "preservation evoker": "preservation", "evoker-preservation": "preservation", "evoker": "preservation",
  "devastationevoker": "devastation", "devastation evoker": "devastation", "evoker-devastation": "devastation",
  "augmentationevoker": "augmentation", "augmenationevoker": "augmentation", "augmenation evoker": "augmentation", "evoker-augmentation": "augmentation",

  // Paladin
  "holypaladin": "holypaladin", "holy paladin": "holypaladin", "paladin-holy": "holypaladin", "paladin": "holypaladin", "holy paladin classic": "holypaladin",

  // Druid
  "restorationdruid": "restodruid", "restoration druid": "restodruid", "druid-restoration": "restodruid", "restoration druid classic": "restodruid",
  "druid": "druid",

  // Priest
  "holypriest": "holypriest", "holy priest": "holypriest", "priest-holy": "holypriest", "priest": "holypriest", "holy priest classic": "holypriest",
  "shadowpriest": "shadowpriest", "shadow priest": "shadowpriest", "priest-shadow": "shadowpriest", "dhadowpriest": "shadowpriest", // typo fix
  "disciplinepriest": "discpriest", "discipline priest": "discpriest", "priest-discipline": "discpriest", "discipline priest classic": "discpriest",

  // Shaman
  "restorationshaman": "restoshaman", "restoration shaman": "restoshaman", "shaman-restoration": "restoshaman", "shaman": "restoshaman", "restoration shaman classic": "restoshaman",
  "shamandps": "shamandps",

  // Monk
  "mistweavermonk": "mistweaver", "mistweaver monk": "mistweaver", "monk-mistweaver": "mistweaver", "monk": "mistweaver", "mistweaver monk classic": "mistweaver",

  // Demon Hunter
  "havocdemonhunter": "dh", "havoc demon hunter": "dh", "demonhunter-havoc": "dh", "demon hunter": "dh", "demonhunter": "dh",

  // Death Knight
  "death knight": "dk", "deathknight": "dk", "deathknight-frost": "dk", "deathknight-unholy": "dk", "deathknight-blood": "dk",
};

export default function ClassIcon({ name, style }: ClassIconProps) {
  if (!name) return null;

  const normalizedInput = name.toLowerCase().trim();
  const targetKey = ALIAS_MAP[normalizedInput] || normalizedInput;
  const icon = ICON_MAP[targetKey];

  if (!icon) return null;

  return (
    <img 
      src={icon.src} 
      alt={icon.alt} 
      style={{ ...style }} 
    />
  );
}