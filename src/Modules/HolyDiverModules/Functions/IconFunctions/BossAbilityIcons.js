import React from "react";
import ReverberatingScreamIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/ReverberatingScreamIcon.jpg";
import SanguineIchorIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/SanguineIchorIcon.jpg";
import DeadlyDescentIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/DeadlyDescentIcon.jpg";
import DescentIconIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/DescentIcon.jpg";
import BloodlightIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/BloodlightIcon.jpg";
import ExsanguinatingBiteIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/ExsanguinatingBiteIcon.jpg";
import EchoingSonarIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/EchoingSonarIcon.jpg";
import BloodcurdlingShriekIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/BloodcurdlingShriekIcon.jpg";
import SonarShriekIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/SonarShriekIcon.jpg";
import EchoingScreechIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/EchoingScreechIcon.jpg";
import ExsanguinatedIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/ExsanguinatedIcon.jpg";
import BlindSwipeIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/BlindSwipeIcon.jpg";
import EarsplittingShriekIcon from "../../../../Images/Bosses/CastleNathria/Shriekwing/Icons/EarsplittingShriekIcon.jpg";

export default function bossAbilityIcons(props) {
  let source = "";
  let alt = "";

  // Shriekwing
  // Reverberating Scream
  if (
    props === 344112 ||
    props === 344114 ||
    props === "Reverberating Scream (Hit)" ||
    props === "Reverberating Scream (DOT)"
  ) {
    source = ReverberatingScreamIcon;
    alt = "Reverberating Scream";
  }
  if (props === 340324 || props === "Sanguine Ichor") {
    source = SanguineIchorIcon;
    alt = "Sanguine Ichor";
  }
  if (props === 343021 || props === "Deadly Descent") {
    source = DeadlyDescentIcon;
    alt = "Deadly Descent";
  }
  if (props === 342923 || props === "Descent") {
    source = DescentIconIcon;
    alt = "Descent";
  }
  if (props === 343384 || props === "Bloodlight") {
    source = BloodlightIcon;
    alt = "Bloodlight";
  }
  if (props === 328887 || props === "Exsanguinated") {
    source = ExsanguinatingBiteIcon;
    alt = "Exsanguinating Bite";
  }
  if (props === 343022 || props === "Echoing Screech") {
    source = EchoingSonarIcon;
    alt = "Echoing Sonar";
  }
  if (
    props === 330712 ||
    props === 336005 ||
    props === "Bloodcurdling Shriek (Hit)" ||
    props === "Bloodcurdling Shriek (DOT)"
  ) {
    source = BloodcurdlingShriekIcon;
    alt = "Bloodcurdling Shriek";
  }
  if (props === 343023 || props === "Sonar Shriek") {
    source = SonarShriekIcon;
    alt = "Sonar Shriek";
  }
  if (props === 342866 || props === "Echoing Screech") {
    source = EchoingScreechIcon;
    alt = "Echoing Screech";
  }
  if (props === 328897 || props === "Exsanguinated") {
    source = ExsanguinatedIcon;
    alt = "Exsanguinated";
  }
  if (props === 343005 || props === "Blind Swipe") {
    source = BlindSwipeIcon;
    alt = "Blind Swipe";
  }
    if (props === 330711 || props === "Earsplitting Shriek") {
    source = EarsplittingShriekIcon;
    alt = "Earsplitting Shriek";
  }

  return (
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
        borderRadius: "4px",
      }}
      src={source}
      alt={alt}
    />
  );
}