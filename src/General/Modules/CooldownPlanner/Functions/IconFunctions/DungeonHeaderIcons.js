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

import AuchindounDungeons from "../../../../../Images/BurningCrusade/Dungeons/AuchindounDungeons.jpg";
import CavernsOfTimeDungeons from "../../../../../Images/BurningCrusade/Dungeons/CavernsOfTimeDungeons.jpg";
import CoilfangReservoirDungeons from "../../../../../Images/BurningCrusade/Dungeons/CoilfangReservoirDungeons.jpg";
import HellfireCitadelDungeons from "../../../../../Images/BurningCrusade/Dungeons/HellfireCitadelDungeons.jpg";
import MagistersTerrace from "../../../../../Images/BurningCrusade/Dungeons/MagistersTerraceDungeons.jpg";
import TempestKeepDungeons from "../../../../../Images/BurningCrusade/Dungeons/TempestKeepDungeons.jpg";

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
  /*                                         Burning Crusade                                        */
  /* ---------------------------------------------------------------------------------------------- */

  if (
    /* --------------------------------------- Auchenai Crypts -------------------------------------- */
    props === 247 ||
    /* ----------------------------------------- Mana-Tombs ----------------------------------------- */
    props === 250 ||
    /* ---------------------------------------- Sethekk Halls --------------------------------------- */
    props === 252 ||
    /* -------------------------------------- Shadow Labyrinth -------------------------------------- */
    props === 253
  ) {
    source = AuchindounDungeons;
  }

  if (
    /* ----------------------------------- Old Hillsbrad Foothills ---------------------------------- */
    props === 251 ||
    /* -------------------------------------- The Black Morass -------------------------------------- */
    props === 255
  ) {
    source = CavernsOfTimeDungeons;
  }

  if (
    /* --------------------------------------- The Slave Pens --------------------------------------- */
    props === 260 ||
    /* --------------------------------------- The Steamvault --------------------------------------- */
    props === 261 ||
    /* ---------------------------------------- The Underbog ---------------------------------------- */
    props === 262
  ) {
    source = CoilfangReservoirDungeons;
  }

  if (
    /* -------------------------------------- Hellfire Ramparts ------------------------------------- */
    props === 248 ||
    /* -------------------------------------- The Blood Furnace ------------------------------------- */
    props === 256 ||
    /* ------------------------------------- The Shattered Halls ------------------------------------ */
    props === 259
  ) {
    source = HellfireCitadelDungeons;
  }

  if (
    /* ---------------------------------------- The Arcatraz ---------------------------------------- */
    props === 254 ||
    /* ---------------------------------------- The Botanica ---------------------------------------- */
    props === 257 ||
    /* ---------------------------------------- The Mechanar ---------------------------------------- */
    props === 258
  ) {
    source = TempestKeepDungeons;
  }

  if (
    /* ------------------------------------- Magister's Terrace ------------------------------------- */
    props === 249
  ) {
    source = MagistersTerrace;
  }

  // return <img style={{ ...style }} src={source} alt={props} />;
  return source;
}
