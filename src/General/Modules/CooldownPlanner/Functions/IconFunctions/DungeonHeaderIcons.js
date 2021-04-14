import HoA from "../../../../../Images/MythicPlus/HallsOfAtonement/HallsOfAtonementAG.jpg";
import MoTS from "../../../../../Images/MythicPlus/MistsOfTirnaScithe/MistsOfTirnaScitheAG.jpg";
import NW from "../../../../../Images/MythicPlus/TheNecroticWake/TheNecroticWakeAG.jpg";
import PF from "../../../../../Images/MythicPlus/Plaguefall/PlaguefallAG.jpg";
import SD from "../../../../../Images/MythicPlus/SanguineDepths/SanguineDepthsAG.jpg";
import ToP from "../../../../../Images/MythicPlus/TheaterOfPain/TheaterOfPainAG.jpg";
import SoA from "../../../../../Images/MythicPlus/SpiresOfAscension/SpiresOfAscensionAG.jpg";
import DoS from "../../../../../Images/MythicPlus/DeOtherSide/DeOtherSideAG.jpg";

export default function DungeonHeaderIcons(props) {
  let source = "";

  if (props === 12831 || props === 1185) {
    source = HoA;
  }
  if (props === 13334 || props === 1184) {
    source = MoTS;
  }
  if (props === 12916 || props === 1182) {
    source = NW;
  }
  if (props === 13228 || props === 1183) {
    source = PF;
  }
  if (props === 12842 || props === 1189) {
    source = SD;
  }
  if (props === 12841 || props === 1187) {
    source = ToP;
  }
  if (props === 12837 || props === 1186) {
    source = SoA;
  }
  if (props === 13309 || props === 1188) {
    source = DoS;
  }

  // return <img style={{ ...style }} src={source} alt={props} />;
  return source;
}
