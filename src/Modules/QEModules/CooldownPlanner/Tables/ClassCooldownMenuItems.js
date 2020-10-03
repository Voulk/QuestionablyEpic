import React from "react";
import { MenuItem } from "@material-ui/core";
import AuraMasteryIcon from "../../../../Images/Classes/Paladin/Specialisation/Holy/Icons/AuraMastery.jpg";
import AvengingWrathIcon from "../../../../Images/Classes/Paladin/Specialisation/Holy/Icons/AvengingWrath.jpg";
import DivineHymnIcon from "../../../../Images/Classes/Priest/Specialisation/Holy/Icons/DivineHymn.jpg";
import EvangelismIcon from "../../../../Images/Classes/Priest/Specialisation/Discipline/Icons/Evangelism.jpg";
import HealingTideTotemIcon from "../../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/HealingTideTotem.jpg";
import PowerWordBarrierIcon from "../../../../Images/Classes/Priest/Specialisation/Discipline/Icons/PowerWordBarrier.jpg";
import RevivalIcon from "../../../../Images/Classes/Monk/Specialisation/Mistweaver/Icons/Revival.jpg";
import SalvationIcon from "../../../../Images/Classes/Priest/Specialisation/Holy/Icons/Salvation.jpg";
import SpiritLinkTotemIcon from "../../../../Images/Classes/Shaman/Specialisation/Restoration/Icons/SpiritLinkTotem.jpg";
import TranquilityIcon from "../../../../Images/Classes/Druid/Specialisation/Restoration/Icons/Tranquility.jpg";
import TreeofLifeIcon from "../../../../Images/Classes/Druid/Specialisation/Restoration/Icons/TreeofLife.jpg";
import DarknessIcon from "../../../../Images/Classes/DemonHunter/DemonHunterIcon.jpg"
import RallyingCryIcon from "../../../../Images/Classes/Warrior/RallyingCryIcon.jpg"
import { useTranslation, Translation } from "react-i18next";
import Divider from "@material-ui/core/Divider";


export default function ClassCooldownMenuItems(props) {
  // Paladin Cooldowns
  if (props === "HolyPaladin") {
    return [
      <MenuItem value={31821}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.31821")}
        </Translation>
      </MenuItem>,
      <Divider />,
      <MenuItem value={31884}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.31884")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Restoration Druid
  if (props === "RestorationDruid") {
    return [
      <MenuItem value={740}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.740")}
        </Translation>
      </MenuItem>,
      <Divider />,
      <MenuItem value={33891}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.33891")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Holy Priest
  if (props === "HolyPriest") {
    return [
      <MenuItem value={265202}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.265202")}
        </Translation>
      </MenuItem>,
      <Divider />,
      <MenuItem value={64843}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.64843")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Discipline Priest
  if (props === "DiscisplinePriest") {
    return [
      <MenuItem value={62618}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.62618")}
        </Translation>
      </MenuItem>,
      <Divider />,
      <MenuItem value={246287}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.246287")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Restoration Shaman
  if (props === "RestorationShaman") {
    return [
      <MenuItem value={108280}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.108280")}
        </Translation>
      </MenuItem>,
      <Divider />,
      <MenuItem value={98008}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.98008")}
        </Translation>
      </MenuItem>,
    ];
  }
  // Mistweaver Monk
  if (props === "MistweaverMonk") {
    return [
      <MenuItem value={115310}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.115310")}
        </Translation>
      </MenuItem>,
    ];
  }

  if (props === "HavocDemonHunter") {
    return [
      <MenuItem value={196718}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.196718")}
        </Translation>
      </MenuItem>,
    ];
  }

  if (props === "Warrior") {
    return [
      <MenuItem value={97462}>
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
          {(t, { i18n }) => t("CooldownPlannerClassAbilities.97462")}
        </Translation>
      </MenuItem>,
    ];
  }
  if (props === 0) {
    return [<MenuItem> No Class Selected </MenuItem>];
  }
}