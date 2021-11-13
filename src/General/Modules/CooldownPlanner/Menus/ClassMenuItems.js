import React from "react";
import { Divider, ListSubheader, MenuItem } from "@mui/material";
import HolyPaladinIcon from "Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg";
import DiscPriestIcon from "Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg";
import HolyPriestIcon from "Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg";
import MistweaverIcon from "Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg";
import RestorationDruidIcon from "Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg";
import RestorationShamanIcon from "Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg";
import WarriorIcon from "Images/Classes/Warrior/WarriorIcon.jpg";
import DeathKnightIcon from "Images/Classes/DeathKnight/DeathKnightIcon.jpg";
import DemonHunterIcon from "Images/Classes/DemonHunter/DemonHunterIcon.jpg";
import ShadowPriestIcon from "Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg";
import { Translation } from "react-i18next";

export const classMenus = [
  <ListSubheader key={"Header1"} >Healers</ListSubheader>,
  <Divider key={"Divider1"}/>,
  <MenuItem style={{ color: "#F58CBA" }} value={"HolyPaladin"} key="HolyPaladin">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.HolyPaladin")}</Translation>
  </MenuItem>,
  <Divider key={"Divider1"} />,
  <MenuItem style={{ color: "#FF7D0A" }} value={"RestorationDruid"} key="RestorationDruid">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.RestorationDruid")}</Translation>
  </MenuItem>,
  <Divider key={"Divider2"} />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"HolyPriest"} key="HolyPriest">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.HolyPriest")}</Translation>
  </MenuItem>,
  <Divider key={"Divider3"} />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"DisciplinePriest"} key="DisciplinePriest">
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={DiscPriestIcon}
      alt="Discipline Priest"
    />
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.DisciplinePriest")}</Translation>
  </MenuItem>,
  <Divider key={"Divider4"} />,
  <MenuItem style={{ color: "#0070DE" }} value={"RestorationShaman"} key="RestorationShaman">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.RestorationShaman")}</Translation>
  </MenuItem>,
  <Divider key={"Divider5"} />,
  <MenuItem style={{ color: "#00FF96" }} value={"MistweaverMonk"} key="MistweaverMonk">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.MistweaverMonk")}</Translation>
  </MenuItem>,
  <Divider key={6} />,
  <ListSubheader key={"Header2"} >Utility</ListSubheader>,
  <Divider key={"Divider6"} />,
  <MenuItem style={{ color: "#A330C9" }} value={"HavocDemonHunter"} key="HavocDemonHunter">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.HavocDemonHunter")}</Translation>
  </MenuItem>,
  <Divider key={"Divider7"} />,
  <MenuItem style={{ color: "#C79C6E" }} value={"Warrior"} key="Warrior">
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
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.Warrior")}</Translation>
  </MenuItem>,
  <Divider key={"Divider8"} />,
  <MenuItem style={{ color: "#C41E3A" }} value={"DeathKnight"} key="DeathKnight">
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={DeathKnightIcon}
      alt="Death Knight"
    />
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.DeathKnight")}</Translation>
  </MenuItem>,
  <Divider key={"Divider9"} />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"ShadowPriest"} key="ShadowPriest">
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
      }}
      src={ShadowPriestIcon}
      alt="Shadow Priest"
    />
    <Translation>{(t, { i18n }) => t("CooldownPlanner.Classes.ShadowPriest")}</Translation>
  </MenuItem>,
  <Divider key={"Divider10"} />,
];
