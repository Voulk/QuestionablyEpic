import React from "react";

import HoA from "../../../../Images/MythicPlus/HallsOfAtonement/HallsOfAtonementAG.png";
import MoTS from "../../../../Images/MythicPlus/MistsOfTirnaScithe/MistsOfTirnaScitheAG.png";
import NW from "../../../../Images/MythicPlus/TheNecroticWake/TheNecroticWakeAG.png";
import PF from "../../../../Images/MythicPlus/Plaguefall/PlaguefallAG.png";
import SD from "../../../../Images/MythicPlus/SanguineDepths/SanguineDepthsAG.png";
import ToP from "../../../../Images/MythicPlus/TheaterOfPain/TheaterOfPainAG.png";
import SoA from "../../../../Images/MythicPlus/SpiresOfAscension/SpiresOfAscensionAG.png";
import DoS from "../../../../Images/MythicPlus/DeOtherSide/DeOtherSideAG.png";

export default function DungeonHeaderIcons(props, style) {
  let source = "";

  if (props === 12831) {
    source = HoA;
  }
  if (props === 13334) {
    source = MoTS;
  }
  if (props === 12916) {
    source = NW;
  }
  if (props === 13228) {
    source = PF;
  }
  if (props === 12842) {
    source = SD;
  }
  if (props === 12841) {
    source = ToP;
  }
  if (props === 12837) {
    source = SoA;
  }
  if (props === 13309) {
    source = DoS;
  }

  return <img style={{ ...style }} src={source} alt={props} />;
}
