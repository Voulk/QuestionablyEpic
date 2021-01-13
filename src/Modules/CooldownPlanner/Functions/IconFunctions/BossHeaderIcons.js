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

  // Castle Nathria
  // Broker Curator
  if (props === 2405) {
    source = ArtificerHeader;
  }
  // Huntsman Altimor
  if (props === 2418) {
    source = HuntsmanAltimorHeader;
  }
  // Hungering Destroyer
  if (props === 2383) {
    source = HungeringDestroyerHeader;
  }
  // Lady Inerva Darkvein
  if (props === 2406) {
    source = LadyInervaDarkveinHeader;
  }
  // The Council of Blood
  if (props === 2412) {
    source = CouncilHeader;
  }
  // Sire Denathrius
  if (props === 2407) {
    source = SireDenathriusHeader;
  }
  // Stone Legion Generals
  if (props === 2417) {
    source = StonebornGeneralsHeader;
  }
  // Shriekwing
  if (props === 2398) {
    source = ShriekwingHeader;
  }
  // Sludgefist
  if (props === 2399) {
    source = SludgefistHeader;
  }
  // Kael'thas
  if (props === 2402) {
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
