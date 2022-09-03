/* ----------------------------------------- Shadowlands ---------------------------------------- */
import HoA from "../../../../../Images/MythicPlus/HallsOfAtonement/HallsOfAtonementAG.jpg";
import MoTS from "../../../../../Images/MythicPlus/MistsOfTirnaScithe/MistsOfTirnaScitheAG.jpg";
import NW from "../../../../../Images/MythicPlus/TheNecroticWake/TheNecroticWakeAG.jpg";
import PF from "../../../../../Images/MythicPlus/Plaguefall/PlaguefallAG.jpg";
import SD from "../../../../../Images/MythicPlus/SanguineDepths/SanguineDepthsAG.jpg";
import ToP from "../../../../../Images/MythicPlus/TheaterOfPain/TheaterOfPainAG.jpg";
import SoA from "../../../../../Images/MythicPlus/SpiresOfAscension/SpiresOfAscensionAG.jpg";
import DoS from "../../../../../Images/MythicPlus/DeOtherSide/DeOtherSideAG.jpg";
import TtVM from "../../../../../Images/MythicPlus/TazaveshTheVeiledMarket/TazaveshTheVeiledMarket.jpg";
/* ------------------------------------- Legion Timewalking ------------------------------------- */
import CoS from "../../../../../Images/MythicPlus/LegionTimewalking/CourtOfStars.jpg";
import BRH from "../../../../../Images/MythicPlus/LegionTimewalking/BlackrookHold.jpg";
import NL from "../../../../../Images/MythicPlus/LegionTimewalking/NeltharionsLair.jpg";
import DHT from "../../../../../Images/MythicPlus/LegionTimewalking/DarkheartThicket.jpg";
import VotW from "../../../../../Images/MythicPlus/LegionTimewalking/VaultOfTheWardens.jpg";
import EoA from "../../../../../Images/MythicPlus/LegionTimewalking/EyeOfAzshara.jpg";

import Ahnkahet from "../../../../../Images/Classic/Dungeons/Ahnkahet.jpg";
import AzjolNerub from "../../../../../Images/Classic/Dungeons/AzjolNerub.jpg";
import CullingOfStratholme from "../../../../../Images/Classic/Dungeons/CullingOfStratholme.jpg";
import DrakTharon from "../../../../../Images/Classic/Dungeons/DrakTharon.jpg";
import ForgeOfSouls from "../../../../../Images/Classic/Dungeons/ForgeOfSouls.jpg";
import GunDrak from "../../../../../Images/Classic/Dungeons/GunDrak.jpg";
import HallsOfLightning from "../../../../../Images/Classic/Dungeons/HallsOfLightning.jpg";
import HallsofReflection from "../../../../../Images/Classic/Dungeons/HallsofReflection.jpg";
import PitofSaron from "../../../../../Images/Classic/Dungeons/PitofSaron.jpg";
import Oculus from "../../../../../Images/Classic/Dungeons/Oculus.jpg";
import Nexus from "../../../../../Images/Classic/Dungeons/Nexus.jpg";
import VioletHold from "../../../../../Images/Classic/Dungeons/VioletHold.jpg";
import TrialOfChampion from "../../../../../Images/Classic/Dungeons/TrialOfChampion.jpg";
import UtgardeKeep from "../../../../../Images/Classic/Dungeons/UtgardeKeep.jpg";
import UtgardePinnecle from "../../../../../Images/Classic/Dungeons/UtgardePinnecle.jpg";

import ReturnToKarazhan from "../../../../../Images/MythicPlus/ReturntoKarazhan.png";
import MechagonLower from "../../../../../Images/MythicPlus/MechagonLower.png";
import MechagonUpper from "../../../../../Images/MythicPlus/MechagonUpper.png";
import Grimrail from "../../../../../Images/MythicPlus/Grimrail.png";
import IronDocks from "../../../../../Images/MythicPlus/IronDocks.png";

export default function DungeonHeaderIcons(props) {
  let source = "";

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Shadowlands                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------- Halls of Atonement ------------------------------------- */
  if (props === 12831 || props === 1185) {
    source = HoA;
  }
  /* ------------------------------------ Mists of Tirna Scithe ----------------------------------- */
  if (props === 13334 || props === 1184) {
    source = MoTS;
  }
  /* ---------------------------------------- Necrotic Wake --------------------------------------- */
  if (props === 12916 || props === 1182) {
    source = NW;
  }
  /* ----------------------------------------- Plaguefall ----------------------------------------- */
  if (props === 13228 || props === 1183) {
    source = PF;
  }
  /* --------------------------------------- Sanguine Depths -------------------------------------- */
  if (props === 12842 || props === 1189) {
    source = SD;
  }
  /* --------------------------------------- Theater of Pain -------------------------------------- */
  if (props === 12841 || props === 1187) {
    source = ToP;
  }
  /* ------------------------------------- Spires of Ascension ------------------------------------ */
  if (props === 12837 || props === 1186) {
    source = SoA;
  }
  /* ---------------------------------------- De Other Side --------------------------------------- */
  if (props === 13309 || props === 1188) {
    source = DoS;
  }
  /* --------------------------------- Tazavesh the Veiled Market --------------------------------- */
  if (props === 13577 || props === 1194 || props === -20) {
    source = TtVM;
  }
  /* --------------------------------- Tazavesh the Veiled Market Part II --------------------------------- */
  if (props === 13577 || props === -21) {
    source = TtVM;
  }

  /* ---------------------------------- Return to Karazhan Upper ---------------------------------- */
  if (props === 860 || props === -25) {
    source = ReturnToKarazhan;
  }
  /* ---------------------------------- Return to Karazhan Lower ---------------------------------- */
  if (props === 860 || props === -24) {
    source = ReturnToKarazhan;
  }
  /* ---------------------------------- Operation: Mechagon Lower --------------------------------- */
  if (props === 1178 || props === -22) {
    source = MechagonLower;
  }
  /* ---------------------------------- Operation: Mechagon Upper --------------------------------- */
  if (props === 1178 || props === -23) {
    source = MechagonUpper;
  }
  /* --------------------------------------- Grimrail Depot --------------------------------------- */
  if (props === 536) {
    source = Grimrail;
  }
  /* ----------------------------------------- Iron Docks ----------------------------------------- */
  if (props === 558) {
    source = IronDocks;
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Legion Timewalking                                       */
  /* ---------------------------------------------------------------------------------------------- */

  /* --------------------------------------- Court of Stars --------------------------------------- */
  if (props === 800) {
    source = CoS;
  }
  /* -------------------------------------- Neltharion's Lair ------------------------------------- */
  if (props === 767) {
    source = NL;
  }
  /* -------------------------------------- Darkheart Thicket ------------------------------------- */
  if (props === 762) {
    source = DHT;
  }
  /* --------------------------------------- Black Rook Hold -------------------------------------- */
  if (props === 740) {
    source = BRH;
  }
  /* --------------------------------------- Eye of Azshara --------------------------------------- */
  if (props === 716) {
    source = EoA;
  }
  /* ------------------------------------ Vault of the Wardens ------------------------------------ */
  if (props === 707) {
    source = VotW;
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Classic                                            */
  /* ---------------------------------------------------------------------------------------------- */

  if (props === 271) {
    source = Ahnkahet;
  }
  if (props === 272) {
    source = AzjolNerub;
  }
  if (props === 279) {
    source = CullingOfStratholme;
  }
  if (props === 273) {
    source = DrakTharon;
  }
  if (props === 280) {
    source = ForgeOfSouls;
  }
  if (props === 274) {
    source = GunDrak;
  }
  if (props === 275) {
    source = HallsOfLightning;
  }
  if (props === 276) {
    source = HallsofReflection;
  }
  if (props === 278) {
    source = PitofSaron;
  }
  if (props === 281) {
    source = Nexus;
  }
  if (props === 282) {
    source = Oculus;
  }
  if (props === 283) {
    source = VioletHold;
  }
  if (props === 284) {
    source = TrialOfChampion;
  }
  if (props === 285) {
    source = UtgardeKeep;
  }
  if (props === 286) {
    source = UtgardePinnecle;
  }

  return source;
}
