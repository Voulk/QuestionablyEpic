import React from "react";
import HolyPaladinIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import HolyPriestIcon from "../../../Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "../../../Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";

export default function classicons(props, iconsize) {
  // Paladin Cooldowns
  if (props === "Holy Paladin" || props === "Paladin-Holy") {
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
  if (props === "Restoration Druid" || props === "Druid-Restoration") {
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
  if (props === "Holy Priest" || props === "Priest-Holy") {
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
  if (props === "Restoration Shaman" || props === "Shaman-Restoration") {
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
  if (props === "Mistweaver Monk" || props === "Monk-Mistweaver") {
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
}