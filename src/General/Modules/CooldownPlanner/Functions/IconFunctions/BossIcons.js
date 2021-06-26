import React from "react";

// import MautIcon from "Images/Bosses/Nya'lotha/Maut.jpg";
// import XaneshIcon from "Images/Bosses/Nya'lotha/Xanesh.jpg";
// import WrathionIcon from "Images/Bosses/Nya'lotha/Wrathion.jpg";
// import RadenIcon from "Images/Bosses/Nya'lotha/Raden.jpg";
// import HivemindIcon from "Images/Bosses/Nya'lotha/Hivemind.jpg";
// import SkitraIcon from "Images/Bosses/Nya'lotha/Skitra.jpg";
// import ShadharIcon from "Images/Bosses/Nya'lotha/Shadhar.jpg";
// import VexionaIcon from "Images/Bosses/Nya'lotha/Vexiona.jpg";
// import CarapaceIcon from "Images/Bosses/Nya'lotha/Carapace.jpg";
// import DrestagathIcon from "Images/Bosses/Nya'lotha/Drestagath.jpg";
// import NzothIcon from "Images/Bosses/Nya'lotha/Nzoth.jpg";
// import IlgynothIcon from "Images/Bosses/Nya'lotha/Ilgynoth.jpg";

import ArtificerIcon from "Images/Bosses/CastleNathria/ArtificerXymox/Icons/ArtificerIcon.jpg";
import CouncilIcon from "Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/TheCouncilOfBloodIcon.jpg";
import HungeringDestroyerIcon from "Images/Bosses/CastleNathria/HungeringDestroyer/Icons/HungeringDestroyerIcon.jpg";
import HuntsmanAltimorIcon from "Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/HuntsmanAltimorIcon.jpg";
import KaelthasSunstriderIcon from "Images/Bosses/CastleNathria/SunKingsSalvation/Icons/KaelthasSunstriderIcon.jpg";
import LadyInervaDarkveinIcon from "Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/LadyInervaDarkveinIcons.jpg";
import ShriekwingIcon from "Images/Bosses/CastleNathria/Shriekwing/Icons/ShriekwingIcon.jpg";
import SireDenathriusIcon from "Images/Bosses/CastleNathria/SireDenathrius/Icons/SireDenathriusIcon.jpg";
import SludgefistIcon from "Images/Bosses/CastleNathria/Sludgefist/Icons/SludgefistIcon.jpg";
import StonebornGeneralsIcon from "Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/StonebornGeneralsIcons.jpg";

import SylvanusIcon from "Images/Bosses/SanctumOfDomination/SylvanusWindrunner/Icons/achievement_raid_torghast_sylvanaswindrunner.jpg";
import SoulrenderDormazainIcon from "Images/Bosses/SanctumOfDomination/SoulrenderDormazain/Icons/achievement_raid_torghast_soulrenderdormazain.jpg";
import TheTarragrueIcon from "Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/achievement_raid_torghast_tarragrue.jpg";
import TheEyeOfTheJailerIcon from "Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/achievement_raid_torghast_theeyeofthejailer.jpg";
import TheNineIcon from "Images/Bosses/SanctumOfDomination/TheNine/Icons/achievement_raid_torghast_thenine.jpg";
import FatescribeRohtaloIcon from "Images/Bosses/SanctumOfDomination/FatescribeRohKalo/Icons/achievement_raid_torghast_fatescriberoh-talo.jpg";
import GuardianOfTheFirstOnesIcon from "Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/Icons/achievement_raid_torghast_guardianofthefirstones.jpg";
import KelThuzadIcon from "Images/Bosses/SanctumOfDomination/Kelthuzad/Icons/achievement_raid_torghast_kel-thuzad.jpg";
import PainsmithRaznalIcon from "Images/Bosses/SanctumOfDomination/PainsmithRaznal/Icons/achievement_raid_torghast_painsmithraznal.jpg";
import RemnantOfNerzhulIcon from "Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/Icons/achievement_raid_torghast_shadowscourge_prisonofnerzhul.jpg";

export default function bossIcons(props) {
  let source = null;
  let alt = "";

  // Ny'alotha, the Waking City
  // if (props === 2327) {
  //   source = MautIcon;
  //   alt = "Maut";
  // }
  // if (props === 2328) {
  //   source = XaneshIcon;
  //   alt = "Dark Inquisitor Xanesh";
  // }
  // if (props === 2329) {
  //   source = WrathionIcon;
  //   alt = "Wrathion";
  // }
  // if (props === 2331) {
  //   source = RadenIcon;
  //   alt = "Ra-den the Despoiled";
  // }
  // if (props === 2333) {
  //   source = HivemindIcon;
  //   alt = "The Hivemind";
  // }
  // if (props === 2334) {
  //   source = SkitraIcon;
  //   alt = "Prophet Skitra";
  // }
  // if (props === 2335) {
  //   source = ShadharIcon;
  //   alt = "Shad'har the Insatiable";
  // }
  // if (props === 2336) {
  //   source = VexionaIcon;
  //   alt = "Vexiona";
  // }
  // if (props === 2337) {
  //   source = CarapaceIcon;
  //   alt = "Carapace of N'Zoth";
  // }
  // if (props === 2343) {
  //   source = DrestagathIcon;
  //   alt = "Drest'agath";
  // }
  // if (props === 2344) {
  //   source = NzothIcon;
  //   alt = "N'Zoth the Corruptor";
  // }
  // if (props === 2345) {
  //   source = IlgynothIcon;
  //   alt = "Il'gynoth, Corruption Reborn";
  // }
  
  /* --------------------------------------- Castle Nathria --------------------------------------- */
  if (props === 2398) {
    source = ShriekwingIcon;
    alt = "Shriekwing";
  }
  if (props === 2418) {
    source = HuntsmanAltimorIcon;
    alt = "Huntsman Altimor";
  }
  if (props === 2402) {
    source = KaelthasSunstriderIcon;
    alt = "Sun King's Salvation";
  }
  if (props === 2405) {
    source = ArtificerIcon;
    alt = "Artificer Xy'mox";
  }
  if (props === 2383) {
    source = HungeringDestroyerIcon;
    alt = "Hungering Destroyer";
  }
  if (props === 2406) {
    source = LadyInervaDarkveinIcon;
    alt = "Lady Inerva Darkvein";
  }
  if (props === 2412) {
    source = CouncilIcon;
    alt = "The Council of Blood";
  }
  if (props === 2399) {
    source = SludgefistIcon;
    alt = "Sludgefist";
  }
  if (props === 2417) {
    source = StonebornGeneralsIcon;
    alt = "Stone Legion Generals";
  }
  if (props === 2407) {
    source = SireDenathriusIcon;
    alt = "Sire Denathrius";
  }

  if (props === 2423) {
    source = TheTarragrueIcon;
    alt = "The Tarragrue";
  }

  if (props === 2433) {
    source = TheEyeOfTheJailerIcon;
    alt = "The Eye of the Jailer";
  }

  if (props === 2429) {
    source = TheNineIcon;
    alt = "The Nine";
  }

  if (props === 2432) {
    source = RemnantOfNerzhulIcon;
    alt = "Remnant of Ner'zhul";
  }

  if (props === 2434) {
    source = SoulrenderDormazainIcon;
    alt = "Soulrender Dormazain";
  }

  if (props === 2430) {
    source = PainsmithRaznalIcon;
    alt = "Painsmith Raznal";
  }

  if (props === 2436) {
    source = GuardianOfTheFirstOnesIcon;
    alt = "Guardian of the First Ones";
  }

  if (props === 2431) {
    source = FatescribeRohtaloIcon;
    alt = "Fatescribe Roh-Kalo";
  }

  if (props === 2422) {
    source = KelThuzadIcon;
    alt = "Kel'Thuzad";
  }

  if (props === 2435) {
    source = SylvanusIcon;
    alt = "Sylvanas Windrunner";
  }

  return (
    <img
      style={{
        height: 20,
        width: 20,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
        borderRadius: 1,
      }}
      src={source}
      alt={alt}
    />
  );
}
