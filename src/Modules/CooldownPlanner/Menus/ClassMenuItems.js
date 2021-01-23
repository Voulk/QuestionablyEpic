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
import DeathKnightIcon from "../../../Images/Classes/DeathKnight/DeathKnightIcon.jpg";
import DemonHunterIcon from "../../../Images/Classes/DemonHunter/DemonHunterIcon.jpg";
import ShadowPriestIcon from "../../../Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg";
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.HolyPaladin")}
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.RestorationDruid")}
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.HolyPriest")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"DisciplinePriest"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlanner.Classes.DisciplinePriest")}
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.RestorationShaman")}
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.MistweaverMonk")}
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.HavocDemonHunter")}
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
      {(t, { i18n }) => t("CooldownPlanner.Classes.Warrior")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#C41E3A" }} value={"DeathKnight"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlanner.Classes.DeathKnight")}
    </Translation>
  </MenuItem>,
  <Divider />,
  <MenuItem style={{ color: "#FFFFFF" }} value={"ShadowPriest"}>
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
    <Translation>
      {(t, { i18n }) => t("CooldownPlanner.Classes.ShadowPriest")}
    </Translation>
  </MenuItem>,
  <Divider />,
];
