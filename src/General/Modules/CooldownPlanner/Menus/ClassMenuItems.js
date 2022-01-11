import React from "react";
import { ListSubheader, MenuItem } from "@mui/material";
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
  <ListSubheader key={"Header1"}>Healers</ListSubheader>,
  <MenuItem divider style={{ color: "#F58CBA" }} value={"HolyPaladin"} key="HolyPaladin">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.HolyPaladin")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#FF7D0A" }} value={"RestorationDruid"} key="RestorationDruid">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.RestorationDruid")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#FFFFFF" }} value={"HolyPriest"} key="HolyPriest">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.HolyPriest")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#FFFFFF" }} value={"DisciplinePriest"} key="DisciplinePriest">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.DisciplinePriest")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#0070DE" }} value={"RestorationShaman"} key="RestorationShaman">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.RestorationShaman")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#00FF96" }} value={"MistweaverMonk"} key="MistweaverMonk">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.MistweaverMonk")}</Translation>
  </MenuItem>,
  <ListSubheader key={"Header2"}>Utility</ListSubheader>,
  <MenuItem divider style={{ color: "#A330C9" }} value={"HavocDemonHunter"} key="HavocDemonHunter">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.HavocDemonHunter")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#C79C6E" }} value={"Warrior"} key="Warrior">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.Warrior")}</Translation>
  </MenuItem>,
  <MenuItem divider style={{ color: "#C41E3A" }} value={"DeathKnight"} key="DeathKnight">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.DeathKnight")}</Translation>
  </MenuItem>,
  <MenuItem divider={false} style={{ color: "#FFFFFF" }} value={"ShadowPriest"} key="ShadowPriest">
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
    <Translation>{(t) => t("CooldownPlanner.Classes.ShadowPriest")}</Translation>
  </MenuItem>,
];
