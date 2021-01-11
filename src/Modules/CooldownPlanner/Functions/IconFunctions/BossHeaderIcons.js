import React from "react";
// Castle Nathria
import ArtificerHeader from "../../../../Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png";
import CouncilHeader from "../../../../Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png";
import HungeringDestroyerHeader from "../../../../Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png";
import HuntsmanAltimorHeader from "../../../../Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png";
import SunKingsSalvationHeader from "../../../../Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png";
import LadyInervaDarkveinHeader from "../../../../Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png";
import ShriekwingHeader from "../../../../Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png";
import SireDenathriusHeader from "../../../../Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png";
import SludgefistHeader from "../../../../Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png";
import StonebornGeneralsHeader from "../../../../Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png";

// World Bosses
import ValinorHeader from "../../../../Images/Bosses/WorldBosses/valinor.png";
import MortanisHeader from "../../../../Images/Bosses/WorldBosses/mortanis.png";
import OranomonosHeader from "../../../../Images/Bosses/WorldBosses/oranomonos.png";
import NurgashHeader from "../../../../Images/Bosses/WorldBosses/nurgash.png";

export default function bossHeaders(props, style) {
  let source = "";
  // "2393", //"Shriekwing",
  // "2429", //"Huntsman Altimor",
  // "2422", //"Sun Kings Salvation",
  // "2418", //"Artificer Xy'mox",
  // "2428", //"Hungering Destroyer",
  // "2420", //"Inerva Darkvein",
  // "2426", //"Council of Blood",
  // "2394", //"Sludgefist",
  // "2425", //"Stone Legion Generals",
  // "2424", //"Sire Denathrius",

  // Castle Nathria
  // Broker Curator
  if (props === 2405 || props === 2418) {
    source = ArtificerHeader;
  }
  // Huntsman Altimor
  if (props === 2418 || props === 2429) {
    source = HuntsmanAltimorHeader;
  }
  // Hungering Destroyer
  if (props === 2383 || props === 2428) {
    source = HungeringDestroyerHeader;
  }
  // Lady Inerva Darkvein
  if (props === 2406 || props === 2420) {
    source = LadyInervaDarkveinHeader;
  }
  // The Council of Blood
  if (props === 2412 || props === 2426) {
    source = CouncilHeader;
  }
  // Sire Denathrius
  if (props === 2407 || props === 2424) {
    source = SireDenathriusHeader;
  }
  // Stone Legion Generals
  if (props === 2417 || props === 2425) {
    source = StonebornGeneralsHeader;
  }
  // Shriekwing
  if (props === 2398 || props === 2393) {
    source = ShriekwingHeader;
  }
  // Sludgefist
  if (props === 2399 || props === 2394) {
    source = SludgefistHeader;
  }
  // Kael'thas
  if (props === 2402 || props === 2422) {
    source = SunKingsSalvationHeader;
  }

  // World Bosses
  // Valinor
  if (props === 167524 || props === 2430) {
    source = ValinorHeader;
  }
  // Mortanis
  if (props === 173104 || props === 2431) {
    source = MortanisHeader;
  }
  // Oranomonos
  if (props === 167527 || props === 2432) {
    source = OranomonosHeader;
  }
  // Nurgash
  if (props === 167526 || props === 2433) {
    source = NurgashHeader;
  }

  return <img style={{ ...style }} src={source} alt={props} />;
}
