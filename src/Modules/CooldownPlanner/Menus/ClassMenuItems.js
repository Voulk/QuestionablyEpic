import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import HolyPaladinIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import HolyPriestIcon from "../../../Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "../../../Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";
import WarriorIcon from "../../../Images/Classes/Warrior/WarriorIcon.jpg";
import DemonHunterIcon from "../../../Images/Classes/DemonHunter/DemonHunterIcon.jpg";
import { Translation } from "react-i18next";
import Divider from "@material-ui/core/Divider";

export const classMenus = [
  <ListSubheader>Healers</ListSubheader>,
  <Divider />,
  <MenuItem style={{ color: "#F58CBA" }} value={"HolyPaladin"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.HolyPaladin")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FF7D0A" }} value={"RestorationDruid"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.RestorationDruid")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"HolyPriest"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.HolyPriest")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"DiscisplinePriest"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.DiscisplinePriest")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#0070DE" }} value={"RestorationShaman"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.RestorationShaman")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#00FF96" }} value={"MistweaverMonk"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.MistweaverMonk")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <ListSubheader>Utility</ListSubheader>,
  <Divider />,
  <MenuItem style={{ color: "#A330C9" }} value={"HavocDemonHunter"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.HavocDemonHunter")}
    </Translation>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlannerClasses.Warrior")}
    </Translation>
  </MenuItem>,
  <Divider />,
];