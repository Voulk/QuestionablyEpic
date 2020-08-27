import React from "react";
// Castle Nathria
import ArtificerHeader from '../../../Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png'
import CouncilHeader from '../../../Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png'
import HungeringDestroyerHeader from '../../../Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png'
import HuntsmanAltimorHeader from '../../../Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png'
import SunKingsSalvationHeader from '../../../Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png'
import LadyInervaDarkveinHeader from '../../../Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png'
import ShriekwingHeader from '../../../Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png'
import SireDenathriusHeader from '../../../Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png'
import SludgefistHeader from '../../../Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png'
import StonebornGeneralsHeader from '../../../Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png'
// Nyalotha
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
// Eternal Palace
import SivaraHeader from "../../../Images/Bosses/EternalPalace/sivara/sivara.png"
import BehemothHeader from "../../../Images/Bosses/EternalPalace/behemoth/behemoth.png"
import RadianceHeader from "../../../Images/Bosses/EternalPalace/radiance/radiance.png"
import AshvaneHeader from "../../../Images/Bosses/EternalPalace/ashvane/ashvane.png"
import OrgozoaHeader from "../../../Images/Bosses/EternalPalace/orgozoa/orgozoa.png"
import QueensCourtHeader from "../../../Images/Bosses/EternalPalace/queenscourt/queenscourt.png"
import ZaqulHeader from "../../../Images/Bosses/EternalPalace/zaqul/zaqul.png"
import QueenAzsharaHeader from "../../../Images/Bosses/EternalPalace/queenazshara/queenazshara.png"
// Dazalor
import ChampionsOfLightHeader from "../../../Images/Bosses/Dazaralor/championsoflight/championsoflight.png"
import GrongHeader from "../../../Images/Bosses/Dazaralor/grong/grong.png"
import JadefireMastersHeader from "../../../Images/Bosses/Dazaralor/jadefiremasters/jadefiremasters.png"
import OpulenceHeader from "../../../Images/Bosses/Dazaralor/opulence/opulence.png"
import ConclaveHeader from "../../../Images/Bosses/Dazaralor/conclave/conclave.png"
import RastakhanHeader from "../../../Images/Bosses/Dazaralor/rastakhan/rastakhan.png"
import BlockadeHeader from "../../../Images/Bosses/Dazaralor/blockade/blockade.png"
import MekkatorqueHeader from "../../../Images/Bosses/Dazaralor/mekkatorque/mekkatorque.png"
import JainaHeader from "../../../Images/Bosses/Dazaralor/jaina/jaina.png"

export default function bossHeaders(props) {
  let source = ""

  // Castle Nathria
  if (props === 'Broker Curator') { source = ArtificerHeader }
  if (props === 'Huntsman Altimor') { source = HuntsmanAltimorHeader }
  if (props === 'Hungering Destroyer') { source = HungeringDestroyerHeader }
  if (props === 'Lady Inerva Darkvein') { source = LadyInervaDarkveinHeader }
  if (props === 'The Council of Blood') { source = CouncilHeader }
  if (props === 'Sire Denathrius') { source = SireDenathriusHeader }
  if (props === 'Stone Legion Generals') { source = StonebornGeneralsHeader }
  if (props === 'Shriekwing') { source = ShriekwingHeader }
  if (props === 'Sludgefist') { source = SludgefistHeader }
  if (props === "Kael'thas") { source = SunKingsSalvationHeader }

  // Nyalotha
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

  // Eternal Palace
  if (props === 'Abyssal Commander Sivara') { source = SivaraHeader }
  if (props === 'Blackwater Behemoth') { source = BehemothHeader }
  if (props === 'Radiance of Azshara') { source = RadianceHeader }
  if (props === 'Lady Ashvane') { source = AshvaneHeader }
  if (props === 'Orgozoa') { source = OrgozoaHeader }
  if (props === "The Queen's Court") { source = QueensCourtHeader }
  if (props === "Za'qul") { source = ZaqulHeader }
  if (props === 'Queen Azshara') { source = QueenAzsharaHeader }

  // Dazalor
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

