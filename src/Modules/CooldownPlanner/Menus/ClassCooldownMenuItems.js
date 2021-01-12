import React from "react";
import { MenuItem } from "@material-ui/core";
import AuraMasteryIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/AuraMastery.jpg";
import AvengingWrathIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/AvengingWrath.jpg";
import DivineHymnIcon from "../../../Images/Classes/Priest/Specialisation/Holy/Icons/DivineHymn.jpg";
import EvangelismIcon from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/Evangelism.jpg";
import HealingTideTotemIcon from "../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/HealingTideTotem.jpg";
import PowerWordBarrierIcon from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/PowerWordBarrier.jpg";
import RevivalIcon from "../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/Revival.jpg";
import SalvationIcon from "../../../Images/Classes/Priest/Specialisation/Holy/Icons/Salvation.jpg";
import SpiritLinkTotemIcon from "../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/SpiritLinkTotem.jpg";
import TranquilityIcon from "../../../Images/Classes/Druid/Specialisation/Restoration/Icons/Tranquility.jpg";
import TreeofLifeIcon from "../../../Images/Classes/Druid/Specialisation/Restoration/Icons/TreeofLife.jpg";
import DarknessIcon from "../../../Images/Classes/DemonHunter/DemonHunterIcon.jpg";
import RallyingCryIcon from "../../../Images/Classes/Warrior/RallyingCryIcon.jpg";
import SpiritShell from "../../../Images/Classes/Priest/Specialisation/Discipline/Icons/Talents/SpiritShellIcon.jpg";
import AntiMagicZoneIcon from "../../../Images/Classes/DeathKnight/AntiMagicZone.jpg";
import VampiricEmbraceIcon from "../../../Images/Classes/Priest/Specialisation/Shadow/VampiricEmbrace.jpg";

import { Translation } from "react-i18next";
import Divider from "@material-ui/core/Divider";

export default function ClassCooldownMenuItems(props) {
  // Paladin Cooldowns
  if (props === "HolyPaladin") {
    return [
      <MenuItem value={31821} key={1}>
        <a data-wowhead="spell=31821">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={AuraMasteryIcon}
            alt="Aura Mastery"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.31821")}
        </Translation>
      </MenuItem>,
      <Divider key={"divider1"} />,
      <MenuItem value={31884} key={2}>
        <a data-wowhead="spell=31884">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={AvengingWrathIcon}
            alt="Avenging Wrath"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.31884")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Restoration Druid
  if (props === "RestorationDruid") {
    return [
      <MenuItem value={740} key={3}>
        <a data-wowhead="spell=740">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={TranquilityIcon}
            alt="Tranquility"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.740")}
        </Translation>
      </MenuItem>,
      <Divider key={"divider2"} />,
      <MenuItem value={33891} key={4}>
        <a data-wowhead="spell=33891">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={TreeofLifeIcon}
            alt="Incarnation: Tree of Life"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.33891")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Holy Priest
  if (props === "HolyPriest") {
    return [
      <MenuItem value={265202} key={5}>
        <a data-wowhead="spell=265202">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={SalvationIcon}
            alt="Holy Word: Salvation"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.265202")}
        </Translation>
      </MenuItem>,
      <Divider key={"divider3"} />,
      <MenuItem value={64843} key={6}>
        <a data-wowhead="spell=64843">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={DivineHymnIcon}
            alt="Divine Hymn"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.64843")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Discipline Priest
  if (props === "DisciplinePriest") {
    return [
      <MenuItem value={246287} key={8}>
        <a data-wowhead="spell=246287">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={EvangelismIcon}
            alt="Evangelism"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.246287")}
        </Translation>
      </MenuItem>,
      <Divider key={"divider4"} />,
      <MenuItem value={62618} key={7}>
        <a data-wowhead="spell=62618">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={PowerWordBarrierIcon}
            alt="Power Word: Barrier"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.62618")}
        </Translation>
      </MenuItem>,
      <Divider key={"divider5"} />,
      <MenuItem value={109964} key={7}>
        <a data-wowhead="spell=109964">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={SpiritShell}
            alt="109964"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.109964")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Restoration Shaman
  if (props === "RestorationShaman") {
    return [
      <MenuItem value={108280} key={9}>
        <a data-wowhead="spell=108280">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={HealingTideTotemIcon}
            alt="Healing Tide Totem"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.108280")}
        </Translation>
      </MenuItem>,
      <Divider key={"divider6"} />,
      <MenuItem value={98008} key={10}>
        <a data-wowhead="spell=98008">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={SpiritLinkTotemIcon}
            alt="Spirit Link Totem"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.98008")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Mistweaver Monk
  if (props === "MistweaverMonk") {
    return [
      <MenuItem value={115310} key={11}>
        <a data-wowhead="spell=115310">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={RevivalIcon}
            alt="Revival"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.115310")}
        </Translation>
      </MenuItem>,
    ];
  }

  if (props === "HavocDemonHunter") {
    return [
      <MenuItem value={196718} key={12}>
        <a data-wowhead="spell=196718">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={DarknessIcon}
            alt="Darkness"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.196718")}
        </Translation>
      </MenuItem>,
    ];
  }

  if (props === "Warrior") {
    return [
      <MenuItem value={97462} key={13}>
        <a data-wowhead="spell=97462">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={RallyingCryIcon}
            alt="Rallying Cry"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.97462")}
        </Translation>
      </MenuItem>,
    ];
  }

  if (props === "DeathKnight") {
    return [
      <MenuItem value={51052} key={14}>
        <a data-wowhead="spell=51052">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={AntiMagicZoneIcon}
            alt="51052"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.51052")}
        </Translation>
      </MenuItem>,
    ];
  }

  if (props === "ShadowPriest") {
    return [
      <MenuItem value={15286} key={15}>
        <a data-wowhead="spell=15286">
          <img
            style={{
              height: 20,
              width: 20,
              padding: "0px 5px 0px 5px",
              verticalAlign: "middle",
            }}
            src={VampiricEmbraceIcon}
            alt="15286"
          />
        </a>
        <Translation>
          {(t) => t("CooldownPlanner.ClassAbilities.15286")}
        </Translation>
      </MenuItem>,
    ];
  }
  if (props === 0) {
    return [<MenuItem key={0}> No Class Selected </MenuItem>];
  }
}
