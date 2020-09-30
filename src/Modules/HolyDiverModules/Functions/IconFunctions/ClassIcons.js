import React from "react";
import HolyPaladinIcon from "../../../../Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "../../../../Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import HolyPriestIcon from "../../../../Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "../../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "../../../../Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "../../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";
import WarriorIcon from "../../../../Images/Classes/Warrior/WarriorIcon.jpg";
import DemonHunterIcon from "../../../../Images/Classes/DemonHunter/DemonHunterIcon.jpg";

export default function classicons(props, iconsize) {
  // Paladin Cooldowns
  if (
    props === "Holy Paladin" ||
    props === "Paladin-Holy" ||
    props === "Paladin"
  ) {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={HolyPaladinIcon}
        alt="Holy Paladin"
      />
    );
  }

  // Restoration Druid
  if (
    props === "Restoration Druid" ||
    props === "Druid-Restoration" ||
    props === "Druid"
  ) {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={RestorationDruidIcon}
        alt="Restoration Druid"
      />
    );
  }

  // Holy Priest
  if (
    props === "Holy Priest" ||
    props === "Priest-Holy" ||
    props === "Priest"
  ) {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={HolyPriestIcon}
        alt="Holy Priest"
      />
    );
  }

  // Discipline Priest
  if (props === "Discispline Priest" || props === "Priest-Discipline") {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={DiscPriestIcon}
        alt="Discispline Priest"
      />
    );
  }

  // Restoration Shaman
  if (
    props === "Restoration Shaman" ||
    props === "Shaman-Restoration" ||
    props === "Shaman"
  ) {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={RestorationShamanIcon}
        alt="Restoration Shaman"
      />
    );
  }

  // Mistweaver Monk
  if (
    props === "Mistweaver Monk" ||
    props === "Monk-Mistweaver" ||
    props === "Monk"
  ) {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={MistweaverIcon}
        alt="Mistweaver Monk"
      />
    );
  }

  // Warrior
  if (props === "Warrior") {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={WarriorIcon}
        alt="Warrior"
      />
    );
  }

  // Demon Hunter
  if (props === "Havoc Demon Hunter") {
    return (
      <img
        style={{
          height: iconsize,
          width: iconsize,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={DemonHunterIcon}
        alt="Havoc Demon Hunter"
      />
    );
  }
}