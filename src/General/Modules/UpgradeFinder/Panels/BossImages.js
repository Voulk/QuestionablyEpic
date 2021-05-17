// Castle Nathria
import ArtificerHeader from "../../../../Images/Bosses/CastleNathria/ArtificerXymox/Artificer.png";
import CouncilHeader from "../../../../Images/Bosses/CastleNathria/TheCouncilOfBlood/Council.png";
import HungeringDestroyerHeader from "../../../../Images/Bosses/CastleNathria/HungeringDestroyer/Hungering.png";
import HuntsmanAltimorHeader from "../../../..//Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimor.png";
import SunKingsSalvation from "../../../../Images/Bosses/CastleNathria/SunKingsSalvation/SunKing.png";
import LadyInervaDarkveinHeader from "../../../../Images/Bosses/CastleNathria/LadyInervaDarkvein/Darkvein.png";
import ShriekwingHeader from "../../../../Images/Bosses/CastleNathria/Shriekwing/Shriekwing.png";
import SireDenathriusHeader from "../../../../Images/Bosses/CastleNathria/SireDenathrius/Denathrius.png";
import SludgefistHeader from "../../../../Images/Bosses/CastleNathria/Sludgefist/Sludgefist.png";
import StonebornGeneralsHeader from "../../../../Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegion.png";
import BoeHeader from "../../../../Images/Bosses/BOE.png";

// World Bosses
import ValinorHeader from "../../../../Images/Bosses/WorldBosses/ValinorUGF.png";
import MortanisHeader from "../../../../Images/Bosses/WorldBosses/MortanisUGF.png";
import OranomonosHeader from "../../../../Images/Bosses/WorldBosses/OranomonosUGF.png";
import NurgashHeader from "../../../../Images/Bosses/WorldBosses/NurgashUGF.png";

import ServantQuarters from "../../../../Images/BurningCrusade/Raid/Karazhan/ServantQuarters.png";
import Attumen from "../../../../Images/BurningCrusade/Raid/Karazhan/AttumenTheHuntsman.png";
import Moroes from "../../../../Images/BurningCrusade/Raid/Karazhan/Moroes.png";
import Maiden from "../../../../Images/BurningCrusade/Raid/Karazhan/Maiden.png";
import Opera from "../../../../Images/BurningCrusade/Raid/Karazhan/Opera.png";
import Netherspite from "../../../../Images/BurningCrusade/Raid/Karazhan/Netherspite.png";
import ChessEvent from "../../../../Images/BurningCrusade/Raid/Karazhan/ChessEvent.png";
import PrinceMalchezaar from "../../../../Images/BurningCrusade/Raid/Karazhan/PrinceMalchezaar.png";
import Curator from "../../../../Images/BurningCrusade/Raid/Karazhan/Curator.png";
import ShadeofAran from "../../../../Images/BurningCrusade/Raid/Karazhan/ShadeofAran.png";
import Illhoof from "../../../../Images/BurningCrusade/Raid/Karazhan/Illhoof.png";

export default function UpgradeFinderBossImages(props) {
  let source = "";

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

  if (props === 1552) {
    source = ServantQuarters;
  }

  if (props === 1553) {
    source = Attumen;
  }

  if (props === 1554) {
    source = Moroes;
  }

  if (props === 1555) {
    source = Maiden;
  }

  if (props === 1556) {
    source = Opera;
  }

  if (props === 1557) {
    source = Curator;
  }

  if (props === 1561) {
    source = Netherspite;
  }

  if (props === 1563) {
    source = PrinceMalchezaar;
  }

  if (props === 1562) {
    source = ChessEvent;
  }

  if (props === 1560) {
    source = Illhoof;
  }

  if (props === 1559) {
    source = ShadeofAran;
  } else if (props === 999) {
    source = BoeHeader;
  }

  return source;
}
