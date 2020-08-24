import React from "react";
import MautHeader from "../../../Images/Bosses/Nya'lotha/Maut/maut.png"
import XaneshHeader from "../../../Images/Bosses/Nya'lotha/Xanesh/xanesh.png"
import WrathionHeader from "../../../Images/Bosses/Nya'lotha/Wrathion/wrathion.png"
import RadenHeader from "../../../Images/Bosses/Nya'lotha/Raden/raden.png"
import HivemindHeader from "../../../Images/Bosses/Nya'lotha/Hivemind/hivemind.png"
import SkitraHeader from "../../../Images/Bosses/Nya'lotha/Skitra/skitra.png"
import ShadharHeader from "../../../Images/Bosses/Nya'lotha/Shadhar/shadhar.png"
import VexionaHeader from "../../../Images/Bosses/Nya'lotha/Vexiona/vexiona.png"
import CarapaceHeader from "../../../Images/Bosses/Nya'lotha/Carapace/carapace.png"
import DrestagathHeader from "../../../Images/Bosses/Nya'lotha/Drestagath/drestagath.png"
import NzothHeader from "../../../Images/Bosses/Nya'lotha/Nzoth/nzoth.png"
import IlgynothHeader from "../../../Images/Bosses/Nya'lotha/Ilgynoth/ilgynoth.png"

import SivaraHeader from "../../../Images/Bosses/eternalpalace/sivara/sivara.png"
import BehemothHeader from "../../../Images/Bosses/eternalpalace/behemoth/behemoth.png"
import RadianceHeader from "../../../Images/Bosses/eternalpalace/radiance/radiance.png"
import AshvaneHeader from "../../../Images/Bosses/eternalpalace/ashvane/ashvane.png"
import OrgozoaHeader from "../../../Images/Bosses/eternalpalace/orgozoa/orgozoa.png"
import QueensCourtHeader from "../../../Images/Bosses/eternalpalace/queenscourt/queenscourt.png"
import ZaqulHeader from "../../../Images/Bosses/eternalpalace/zaqul/zaqul.png"
import QueenAzsharaHeader from "../../../Images/Bosses/eternalpalace/queenazshara/queenazshara.png"

import ChampionsOfLightHeader from "../../../Images/Bosses/dazaralor/championsoflight/championsoflight.png"
import GrongHeader from "../../../Images/Bosses/dazaralor/grong/grong.png"
import JadefireMastersHeader from "../../../Images/Bosses/dazaralor/jadefiremasters/jadefiremasters.png"
import OpulenceHeader from "../../../Images/Bosses/dazaralor/opulence/opulence.png"
import ConclaveHeader from "../../../Images/Bosses/dazaralor/conclave/conclave.png"
import RastakhanHeader from "../../../Images/Bosses/dazaralor/rastakhan/rastakhan.png"
import BlockadeHeader from "../../../Images/Bosses/dazaralor/blockade/blockade.png"
import MekkatorqueHeader from "../../../Images/Bosses/dazaralor/mekkatorque/mekkatorque.png"
import JainaHeader from "../../../Images/Bosses/dazaralor/jaina/jaina.png"

// import ArtificerHeader from "../../../Images/Bosses/CastleNathria/Artificer.jpg"
// import CouncilHeader from "../../../Images/Bosses/CastleNathria/Council.jpg"
// import HungeringDestroyerHeader from "../../../Images/Bosses/CastleNathria/HungeringDestroyer.jpg"
// import HuntsmanAltimorHeader from "../../../Images/Bosses/CastleNathria/HuntsmanAltimor.jpg"
// import KaelthasSunstriderHeader from "../../../Images/Bosses/CastleNathria/KaelthasSunstrider.jpg"
// import LadyInervaDarkveinHeader from "../../../Images/Bosses/CastleNathria/LadyInervaDarkvein.jpg"
// import ShriekwingHeader from "../../../Images/Bosses/CastleNathria/Shriekwing.jpg"
// import SireDenathriusHeader from "../../../Images/Bosses/CastleNathria/SireDenathrius.jpg"
// import SludgefistHeader from "../../../Images/Bosses/CastleNathria/Sludgefist.jpg"
// import StonebornGeneralsHeader from "../../../Images/Bosses/CastleNathria/StonebornGenerals.jpg"


export default function bossHeaders(props) {
  let source = ""

  if (props === 'Maut') { source = MautHeader }
  if (props === 'Dark Inquisitor Xanesh') { source = XaneshHeader }
  if (props === 'Wrathion') { source = WrathionHeader }
  if (props === 'Ra-den the Despoiled') { source = RadenHeader }
  if (props === 'The Hivemind') { source = HivemindHeader }
  if (props === "Prophet Skitra") { source = SkitraHeader }
  if (props === "Shad'har the Insatiable") { source = ShadharHeader }
  if (props === 'Vexiona') { source = VexionaHeader }
  if (props === "Carapace of N'Zoth") { source = CarapaceHeader }
  if (props === "Drest'agath") { source = DrestagathHeader }
  if (props === "N'Zoth the Corruptor") { source = NzothHeader }
  if (props === "Il'gynoth, Corruption Reborn") { source = IlgynothHeader }

  if (props === 'Abyssal Commander Sivara') { source = SivaraHeader }
  if (props === 'Blackwater Behemoth') { source = BehemothHeader }
  if (props === 'Radiance of Azshara') { source = RadianceHeader }
  if (props === 'Lady Ashvane') { source = AshvaneHeader }
  if (props === 'Orgozoa') { source = OrgozoaHeader }
  if (props === "The Queen's Court") { source = QueensCourtHeader }
  if (props === "Za'qul") { source = ZaqulHeader }
  if (props === 'Queen Azshara') { source = QueenAzsharaHeader }

  if (props === 'Champions of the Light') { source = ChampionsOfLightHeader }
  if (props === 'Grong') { source = GrongHeader }
  if (props === 'Jadefire Masters') { source = JadefireMastersHeader }
  if (props === 'Opulence') { source = OpulenceHeader }
  if (props === 'Conclave of the Chosen') { source = ConclaveHeader }
  if (props === 'King Rastakhan') { source = RastakhanHeader }
  if (props === 'Mekkatorque') { source = MekkatorqueHeader }
  if (props === 'Stormwall Blockade') { source = BlockadeHeader }
  if (props === 'Lady Jaina Proudmoore') { source = JainaHeader }

  return (
    <img
      style={{ height: 64, width: 128, padding: '0px 5px 0px 5px', verticalAlign: 'middle', marginRight: '-50px' }}
      src={source}
      alt={props}
    />
  )
}

