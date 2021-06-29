import React from "react";
// Castle Nathria
// import ArtificerHeader from "Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png";
// import CouncilHeader from "Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png";
// import HungeringDestroyerHeader from "Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png";
// import HuntsmanAltimorHeader from "Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png";
// import SunKingsSalvationHeader from "Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png";
// import LadyInervaDarkveinHeader from "Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png";
// import ShriekwingHeader from "Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png";
// import SireDenathriusHeader from "Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png";
// import SludgefistHeader from "Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png";
// import StonebornGeneralsHeader from "Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png";

// World Bosses
import ValinorHeader from "Images/Bosses/WorldBosses/valinor.png";
import MortanisHeader from "Images/Bosses/WorldBosses/mortanis.png";
import OranomonosHeader from "Images/Bosses/WorldBosses/oranomonos.png";
import NurgashHeader from "Images/Bosses/WorldBosses/nurgash.png";

import SylvanusIcon from "Images/Bosses/SanctumOfDomination/SylvanusWindrunner/SylvanusEJ.png";
import SoulrenderDormazainIcon from "Images/Bosses/SanctumOfDomination/SoulrenderDormazain/UI-EJ-BOSS-SoulrenderDormazain.png";
import TheTarragrueIcon from "Images/Bosses/SanctumOfDomination/TheTarragrue/UI-EJ-BOSS-Tarragrue.png";
import TheEyeOfTheJailerIcon from "Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/UI-EJ-BOSS-EyeoftheJailer.png";
import TheNineIcon from "Images/Bosses/SanctumOfDomination/TheNine/UI-EJ-BOSS-TheNine.png";
import FatescribeRohtaloIcon from "Images/Bosses/SanctumOfDomination/FatescribeRohKalo/UI-EJ-BOSS-FatescribeRoh-Talo.png";
import GuardianOfTheFirstOnesIcon from "Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/UI-EJ-BOSS-GuardianoftheFirstOnes.png";
import KelThuzadIcon from "Images/Bosses/SanctumOfDomination/Kelthuzad/UI-EJ-BOSS-KelThuzadShadowlands.png";
import PainsmithRaznalIcon from "Images/Bosses/SanctumOfDomination/PainsmithRaznal/UI-EJ-BOSS-PainsmithRaznal.png";
import RemnantOfNerzhulIcon from "Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/UI-EJ-BOSS-RemnantofNerzhul.png";

export default function bossHeaders(props, style) {
  let source = "";

  // // Castle Nathria
  // // Broker Curator
  // if (props === 2405) {
  //   source = ArtificerHeader;
  // }
  // // Huntsman Altimor
  // if (props === 2418) {
  //   source = HuntsmanAltimorHeader;
  // }
  // // Hungering Destroyer
  // if (props === 2383) {
  //   source = HungeringDestroyerHeader;
  // }
  // // Lady Inerva Darkvein
  // if (props === 2406) {
  //   source = LadyInervaDarkveinHeader;
  // }
  // // The Council of Blood
  // if (props === 2412) {
  //   source = CouncilHeader;
  // }
  // // Sire Denathrius
  // if (props === 2407) {
  //   source = SireDenathriusHeader;
  // }
  // // Stone Legion Generals
  // if (props === 2417) {
  //   source = StonebornGeneralsHeader;
  // }
  // // Shriekwing
  // if (props === 2398) {
  //   source = ShriekwingHeader;
  // }
  // // Sludgefist
  // if (props === 2399) {
  //   source = SludgefistHeader;
  // }
  // // Kael'thas
  // if (props === 2402) {
  //   source = SunKingsSalvationHeader;
  // }

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

  if (props === 2423) {
    source = TheTarragrueIcon;
  }

  if (props === 2433) {
    source = TheEyeOfTheJailerIcon;
  }

  if (props === 2429) {
    source = TheNineIcon;
  }

  if (props === 2432) {
    source = RemnantOfNerzhulIcon;
  }

  if (props === 2434) {
    source = SoulrenderDormazainIcon;
  }

  if (props === 2430) {
    source = PainsmithRaznalIcon;
  }

  if (props === 2436) {
    source = GuardianOfTheFirstOnesIcon;
  }

  if (props === 2431) {
    source = FatescribeRohtaloIcon;
  }

  if (props === 2422) {
    source = KelThuzadIcon;
  }

  if (props === 2435) {
    source = SylvanusIcon;
  }

  return <img style={{ ...style }} src={source} alt={props} />;
}
