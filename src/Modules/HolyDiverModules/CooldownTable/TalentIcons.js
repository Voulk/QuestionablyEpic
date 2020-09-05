import React from "react";

import AvengingCrusaderIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/AvengingCrusaderIcon.jpg";
import AwakeningIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/AwakeningIcon.jpg";
import BeaconOfFaithIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/BeaconOfFaithIcon.jpg";
import BeaconOfVirtueIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/BeaconOfVirtueIcon.jpg";
import BestowFaithIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/BestowFaithIcon.jpg";
import BlindingLightIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/BlindingLightIcon.jpg";
import CavalierIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/CavalierIcon.jpg";
import CrusadersMightIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/CrusadersMightIcon.jpg";
import DivinePurposeIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/DivinePurposeIcon.jpg";
import FistOfJusticeIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/FistOfJusticeIcon.jpg";
import GlimmerOfLightIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/GlimmerOfLightIcon.jpg";
import HolyAvengerIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/HolyAvengerIcon.jpg";
import HolyPrismIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/HolyPrismIcon.jpg";
import JudgmentOfLightIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/JudgmentOfLightIcon.jpg";
import LightsHammerIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/LightsHammerIcon.jpg";
import RepentanceIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/RepentanceIcon.jpg";
import RuleOfLawIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/RuleOfLawIcon.jpg";
import SavedByTheLightIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/SavedByTheLightIcon.jpg";
import SeraphimIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/SeraphimIcon.jpg";
import UnbreakableSpiritIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/UnbreakableSpiritIcon.jpg";
import SanctifiedWrathIcon from "../../../Images/Classes/Paladin/Specialisation/Holy/Icons/Talents/SanctifiedWrathIcon.jpg";

export default function talentIcons(props) {
  let source = "";
  let alt = "";

  // Paldin Talents
  if (props === 196926) {
    source = CrusadersMightIcon;
    alt = "Crusader's Might";
  }
  if (props === 223306) {
    source = BestowFaithIcon;
    alt = "Bestow Faith";
  }
  if (props === 114158) {
    source = LightsHammerIcon;
    alt = "Light's Hammer";
  }
  if (props === 157047) {
    source = SavedByTheLightIcon;
    alt = "Saved by the Light";
  }
  if (props === 183778) {
    source = JudgmentOfLightIcon;
    alt = "Judgment of Light";
  }
  if (props === 114165) {
    source = HolyPrismIcon;
    alt = "Holy Prism";
  }
  if (props === 234299) {
    source = FistOfJusticeIcon;
    alt = "Fist of Justice";
  }
  if (props === 20066) {
    source = RepentanceIcon;
    alt = "Repentance";
  }
  if (props === 115750) {
    source = BlindingLightIcon;
    alt = "Blinding Light";
  }
  if (props === 114154) {
    source = UnbreakableSpiritIcon;
    alt = "Unbreakable Spirit";
  }
  if (props === 230332) {
    source = CavalierIcon;
    alt = "Cavalier";
  }
  if (props === 214202) {
    source = RuleOfLawIcon;
    alt = "Rule of Law";
  }
  if (props === 223817) {
    source = DivinePurposeIcon;
    alt = "Divine Purpose";
  }
  if (props === 105809) {
    source = HolyAvengerIcon;
    alt = "Holy Avenger";
  }
  if (props === 152262) {
    source = SeraphimIcon;
    alt = "Seraphim";
  }
  if (props === 53376) {
    source = SanctifiedWrathIcon;
    alt = "Sanctified Wrath";
  }
  if (props === 216331) {
    source = AvengingCrusaderIcon;
    alt = "Avenging Crusader";
  }
  if (props === 248033) {
    source = AwakeningIcon;
    alt = "Awakening";
  }
  if (props === 325966) {
    source = GlimmerOfLightIcon;
    alt = "Glimmer of Light";
  }
  if (props === 156910) {
    source = BeaconOfFaithIcon;
    alt = "Beacon of Faith";
  }
  if (props === 200025) {
    source = BeaconOfVirtueIcon;
    alt = "Beacon of Virtue";
  }

  return (
    <a data-wowhead={"spell=" + props}>
      <img
        style={{
          height: 48,
          width: 48,
          padding: "0px 5px 0px 5px",
          verticalAlign: "middle",
        }}
        src={source}
        alt={alt}
      />
    </a>
  );
}