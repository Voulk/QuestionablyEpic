import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import HolyPaladinIcon from "../../../../Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "../../../../Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import HolyPriestIcon from "../../../../Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "../../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "../../../../Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "../../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";
import WarriorIcon from "../../../../Images/Classes/Warrior/WarriorIcon.jpg";
import DemonHunterIcon from "../../../../Images/Classes/DemonHunter/DemonHunterIcon.jpg";
import Divider from "@material-ui/core/Divider";

export const classMenus = [
  <ListSubheader>Healers</ListSubheader>,
  <Divider />,
  <MenuItem style={{ color: "#F58CBA" }} value={"Holy Paladin"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={HolyPaladinIcon}
      alt="Holy Paladin"
    />
    Holy Paladin
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FF7D0A" }} value={"Restoration Druid"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={RestorationDruidIcon}
      alt="Restoration Druid"
    />
    Restoration Druid
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"Holy Priest"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={HolyPriestIcon}
      alt="Holy Priest"
    />
    Holy Priest
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"Discispline Priest"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={DiscPriestIcon}
      alt="Discispline Priest"
    />
    Discispline Priest
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#0070DE" }} value={"Restoration Shaman"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={RestorationShamanIcon}
      alt="Restoration Shaman"
    />
    Restoration Shaman
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#00FF96" }} value={"Mistweaver Monk"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={MistweaverIcon}
      alt="Mistweaver Monk"
    />
    Mistweaver Monk
  </MenuItem>,
  <Divider />,
  <ListSubheader>Utility</ListSubheader>,
  <Divider />,
  <MenuItem style={{ color: "#A330C9" }} value={"Havoc Demon Hunter"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={DemonHunterIcon}
      alt="Havoc Demon Hunter"
    />
    Havoc Demon Hunter
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#C79C6E" }} value={"Warrior"}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={WarriorIcon}
      alt="Warrior"
    />
    Warrior
  </MenuItem>,
  <Divider />,
];