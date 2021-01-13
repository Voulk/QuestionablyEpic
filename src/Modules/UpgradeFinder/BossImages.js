import React from "react";
// Castle Nathria
import ArtificerHeader from "../../Images/Bosses/CastleNathria/ArtificerXymox/Artificer.png";
import CouncilHeader from "../../Images/Bosses/CastleNathria/TheCouncilOfBlood/Council.png";
import HungeringDestroyerHeader from "../../Images/Bosses/CastleNathria/HungeringDestroyer/Hungering.png";
import HuntsmanAltimorHeader from "../../Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimor.png";
import SunKingsSalvation from "../../Images/Bosses/CastleNathria/SunKingsSalvation/SunKing.png";
import LadyInervaDarkveinHeader from "../../Images/Bosses/CastleNathria/LadyInervaDarkvein/Darkvein.png";
import ShriekwingHeader from "../../Images/Bosses/CastleNathria/Shriekwing/Shriekwing.png";
import SireDenathriusHeader from "../../Images/Bosses/CastleNathria/SireDenathrius/Denathrius.png";
import SludgefistHeader from "../../Images/Bosses/CastleNathria/Sludgefist/Sludgefist.png";
import StonebornGeneralsHeader from "../../Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegion.png";

// World Bosses
import ValinorHeader from "../../Images/Bosses/WorldBosses/ValinorUGF.png";
import MortanisHeader from "../../Images/Bosses/WorldBosses/MortanisUGF.png";
import OranomonosHeader from "../../Images/Bosses/WorldBosses/OranomonosUGF.png";
import NurgashHeader from "../../Images/Bosses/WorldBosses/NurgashUGF.png";

export default function UpgradeFinderBossImages(props, style) {
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
  if (props === 2418) {
    source = ArtificerHeader;
  }
  // Huntsman Altimor
  if (props === 2429) {
    source = HuntsmanAltimorHeader;
  }
  // Hungering Destroyer
  if (props === 2428) {
    source = HungeringDestroyerHeader;
  }
  // Lady Inerva Darkvein
  if (props === 2420) {
    source = LadyInervaDarkveinHeader;
  }
  // The Council of Blood
  if (props === 2426) {
    source = CouncilHeader;
  }
  // Sire Denathrius
  if (props === 2424) {
    source = SireDenathriusHeader;
  }
  // Stone Legion Generals
  if (props === 2425) {
    source = StonebornGeneralsHeader;
  }
  // Shriekwing
  if (props === 2393) {
    source = ShriekwingHeader;
  }
  // Sludgefist
  if (props === 2394) {
    source = SludgefistHeader;
  }
  // Kael'thas
  if (props === 2422) {
    source = SunKingsSalvation;
  }

  // World Bosses
  // Valinor
  if (props === 2430) {
    source = ValinorHeader;
  }
  // Mortanis
  if (props === 2431) {
    source = MortanisHeader;
  }
  // Oranomonos
  if (props === 2432) {
    source = OranomonosHeader;
  }
  // Nurgash
  if (props === 2433) {
    source = NurgashHeader;
  }

  return <img style={{ ...style }} src={source} alt={props} />;
}
