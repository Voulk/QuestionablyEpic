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
import BRH from "../../../../../Images/MythicPlus/LegionTimewalking/BlackrookHold.jpg";

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

import UldamanLegacyofTyr from "../../../../../Images/MythicPlus/UldamanLegacyofTyr.png";
import TheNokhudOffensive from "../../../../../Images/MythicPlus/TheNokhudOffensive.png";
import TheAzureVault from "../../../../../Images/MythicPlus/TheAzureVault.png";
import TheAcademy from "../../../../../Images/MythicPlus/TheAcademy.png";
import RubyLifePools from "../../../../../Images/MythicPlus/RubyLifePools.png";
import Neltharus from "../../../../../Images/MythicPlus/Neltharus.png";
import HallsofInfusion from "../../../../../Images/MythicPlus/HallsofInfusion.png";
import BrackenhideHollow from "../../../../../Images/MythicPlus/BrackenhideHollow.png";

import HallsofValor from "../../../../../Images/MythicPlus/HallsOfValor.png";
import CourtofStars from "../../../../../Images/MythicPlus/CourtofStars.png";
import ShadowmoonBurialGrounds from "../../../../../Images/MythicPlus/ShadowmoonBurialGrounds.png";
import TempleoftheJadeSerpent from "../../../../../Images/MythicPlus/TempleoftheJadeSerpent.png";

import Freehold from "../../../../../Images/MythicPlus/Freehold.png";
import TheUnderrot from "../../../../../Images/MythicPlus/TheUnderrot.png";
import TheVortexPinnacle from "../../../../../Images/MythicPlus/TheVortexPinnacle.png";
import NL from "../../../../../Images/MythicPlus/NeltharionsLair.png";

import Ataldazar from "../../../../../Images/MythicPlus/Ataldazar.png";
import WaycrestManor from "../../../../../Images/MythicPlus/WaycrestManor.png";
import DawnOfTheInfinites from "../../../../../Images/MythicPlus/DawnOfTheInfinites.png";

import ThroneOfTheTides from "../../../../../Images/MythicPlus/ThroneOfTheTides.png";
import Everbloom from "../../../../../Images/MythicPlus/Everbloom.png";
import Stonecore from "Images/Classic/Dungeons/Stonecore.jpg";
import BlackrockCavern from "Images/Classic/Dungeons/BlackrockCavern.jpg";
import Deadmines from "Images/Classic/Dungeons/Deadmines.jpg";
import LostCityOfTolvir from "Images/Classic/Dungeons/LostCityOfTolvir.jpg";
import ShadowfangKeep from "Images/Classic/Dungeons/ShadowfangKeep.jpg";
import GrimBatol from "Images/Classic/Dungeons/GrimBatol.jpg";
import HallsOfReorigination from "Images/Classic/Dungeons/HallsOfReorigination.jpg";

export default function DungeonHeaderIcons(props) {
  let source = "";

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Shadowlands                                          */
  /* ---------------------------------------------------------------------------------------------- */
  if (props === 67) source = Stonecore;
  if (props === 66) source = BlackrockCavern;
  if (props === 63) source = Deadmines;
  if (props === 71) source = GrimBatol;
  if (props === 70) source = HallsOfReorigination;
  if (props === 69) source = LostCityOfTolvir;
  if (props === 64) source = ShadowfangKeep;

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
  if (props === 860 || props === -27) {
    source = ReturnToKarazhan;
  }
  /* ---------------------------------- Return to Karazhan Lower ---------------------------------- */
  if (props === 860 || props === -26) {
    source = ReturnToKarazhan;
  }
  /* ---------------------------------- Operation: Mechagon Lower --------------------------------- */
  if (props === 1178 || props === -14) {
    source = MechagonLower;
  }
  /* ---------------------------------- Operation: Mechagon Upper --------------------------------- */
  if (props === 1178 || props === -15) {
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
  /*                                          DragonFlight                                          */
  /* ---------------------------------------------------------------------------------------------- */

  if (props === 1001) {
    // Freehold
    source = Freehold;
  }
  if (props === 1022) {
    // TheUnderrot
    source = TheUnderrot;
  }
  if (props === 68) {
    // TheVortexPinnacle
    source = TheVortexPinnacle;
  }

  if (props === 1197) {
    // Uldaman: Legacy of Tyr
    source = UldamanLegacyofTyr;
  }
  if (props === 1201) {
    // Taz'algeth Academy
    source = TheAcademy;
  }
  if (props === 1202) {
    // Ruby Life Pools
    source = RubyLifePools;
  }
  if (props === 1204) {
    // Halls of Infusion
    source = HallsofInfusion;
  }
  if (props === 1203) {
    // The Azure Vault
    source = TheAzureVault;
  }
  if (props === 1199) {
    // Neltharus
    source = Neltharus;
  }
  if (props === 1198) {
    // The Nokhud Offensive
    source = TheNokhudOffensive;
  }
  if (props === 1196) {
    // Brackenhide Hollow
    source = BrackenhideHollow;
  }

  if (props === 313) {
    // Temple of the Jade Serpent
    source = TempleoftheJadeSerpent;
  }
  if (props === 537) {
    // Shadowmoon Burial Grounds
    source = ShadowmoonBurialGrounds;
  }
  if (props === 721) {
    // Halls of Valor
    source = HallsofValor;
  }
  if (props === 800) {
    // Court of Stars
    source = CourtofStars;
  }

  // Ataldazar
  if (props === 968) {
    source = Ataldazar;
  }

  // Waycrest Manor
  if (props === 1021) {
    source = WaycrestManor;
  }

  // Throne of the Tides
  if (props === 65) {
    source = ThroneOfTheTides;
  }

  // Everbloom
  if (props === 556) {
    source = Everbloom;
  }

  // Dawn of the Infinites
  if (props === '-55' || props === '-56') {
    source = DawnOfTheInfinites;
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Legion Timewalking                                       */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Neltharion's Lair ------------------------------------- */
  if (props === 767) {
    source = NL;
  }
  /* -------------------------------------- Darkheart Thicket ------------------------------------- */
  if (props === 762 || props === 2) {
    source = DHT;
  }
  /* --------------------------------------- Black Rook Hold -------------------------------------- */
  if (props === 740 || props === 3) {
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
