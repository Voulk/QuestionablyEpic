import React from "react";
// Castle Nathria
import ArtificerHeader from "../../../Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png";
import CouncilHeader from "../../../Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png";
import HungeringDestroyerHeader from "../../../Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png";
import HuntsmanAltimorHeader from "../../../Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png";
import SunKingsSalvationHeader from "../../../Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png";
import LadyInervaDarkveinHeader from "../../../Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png";
import ShriekwingHeader from "../../../Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png";
import SireDenathriusHeader from "../../../Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png";
import SludgefistHeader from "../../../Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png";
import StonebornGeneralsHeader from "../../../Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png";
// Nyalotha
import MautHeader from "../../../Images/Bosses/Nya'lotha/Maut/maut.png";
import XaneshHeader from "../../../Images/Bosses/Nya'lotha/Xanesh/xanesh.png";
import WrathionHeader from "../../../Images/Bosses/Nya'lotha/Wrathion/wrathion.png";
import RadenHeader from "../../../Images/Bosses/Nya'lotha/Raden/raden.png";
import HivemindHeader from "../../../Images/Bosses/Nya'lotha/Hivemind/hivemind.png";
import SkitraHeader from "../../../Images/Bosses/Nya'lotha/Skitra/skitra.png";
import ShadharHeader from "../../../Images/Bosses/Nya'lotha/Shadhar/shadhar.png";
import VexionaHeader from "../../../Images/Bosses/Nya'lotha/Vexiona/vexiona.png";
import CarapaceHeader from "../../../Images/Bosses/Nya'lotha/Carapace/carapace.png";
import DrestagathHeader from "../../../Images/Bosses/Nya'lotha/Drestagath/drestagath.png";
import NzothHeader from "../../../Images/Bosses/Nya'lotha/Nzoth/nzoth.png";
import IlgynothHeader from "../../../Images/Bosses/Nya'lotha/Ilgynoth/ilgynoth.png";
// Eternal Palace
import SivaraHeader from "../../../Images/Bosses/EternalPalace/sivara/sivara.png";
import BehemothHeader from "../../../Images/Bosses/EternalPalace/behemoth/behemoth.png";
import RadianceHeader from "../../../Images/Bosses/EternalPalace/radiance/radiance.png";
import AshvaneHeader from "../../../Images/Bosses/EternalPalace/ashvane/ashvane.png";
import OrgozoaHeader from "../../../Images/Bosses/EternalPalace/orgozoa/orgozoa.png";
import QueensCourtHeader from "../../../Images/Bosses/EternalPalace/queenscourt/queenscourt.png";
import ZaqulHeader from "../../../Images/Bosses/EternalPalace/zaqul/zaqul.png";
import QueenAzsharaHeader from "../../../Images/Bosses/EternalPalace/queenazshara/queenazshara.png";
// Dazalor
import ChampionsOfLightHeader from "../../../Images/Bosses/Dazaralor/championsoflight/championsoflight.png";
import GrongHeader from "../../../Images/Bosses/Dazaralor/grong/grong.png";
import JadefireMastersHeader from "../../../Images/Bosses/Dazaralor/jadefiremasters/jadefiremasters.png";
import OpulenceHeader from "../../../Images/Bosses/Dazaralor/opulence/opulence.png";
import ConclaveHeader from "../../../Images/Bosses/Dazaralor/conclave/conclave.png";
import RastakhanHeader from "../../../Images/Bosses/Dazaralor/rastakhan/rastakhan.png";
import BlockadeHeader from "../../../Images/Bosses/Dazaralor/blockade/blockade.png";
import MekkatorqueHeader from "../../../Images/Bosses/Dazaralor/mekkatorque/mekkatorque.png";
import JainaHeader from "../../../Images/Bosses/Dazaralor/jaina/jaina.png";

export default function bossHeaders(props) {
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

  // Nyalotha
  // Maut
  if (props === 2327) {
    source = MautHeader;
  }
  // Dark Inquisitor Xanesh
  if (props === 2328) {
    source = XaneshHeader;
  }
  // Wrathion
  if (props === 2329) {
    source = WrathionHeader;
  }
  // Ra-den the Despoiled
  if (props === 2331) {
    source = RadenHeader;
  }
  // The Hivemind
  if (props === 2333) {
    source = HivemindHeader;
  }
  // Prophet Skitra
  if (props === 2334) {
    source = SkitraHeader;
  }
  // Shad'har the Insatiable
  if (props === 2335) {
    source = ShadharHeader;
  }
  // Vexiona
  if (props === 2336) {
    source = VexionaHeader;
  }
  // Carapace of N'Zoth
  if (props === 2337) {
    source = CarapaceHeader;
  }
  // Drest'agath
  if (props === 2343) {
    source = DrestagathHeader;
  }
  // N'Zoth the Corruptor
  if (props === 2344) {
    source = NzothHeader;
  }
  // Il'gynoth, Corruption Reborn
  if (props === 2345) {
    source = IlgynothHeader;
  }

  // Eternal Palace
  // Abyssal Commander Sivara
  if (props === 2352) {
    source = SivaraHeader;
  }
  // Blackwater Behemoth
  if (props === 2347) {
    source = BehemothHeader;
  }
  // Radiance of Azshara
  if (props === 2353) {
    source = RadianceHeader;
  }
  // Lady Ashvane
  if (props === 2354) {
    source = AshvaneHeader;
  }
  // Orgozoa
  if (props === 2351) {
    source = OrgozoaHeader;
  }
  // The Queen's Court
  if (props === 2359) {
    source = QueensCourtHeader;
  }
  // Za'qul
  if (props === 2349) {
    source = ZaqulHeader;
  }
  // Queen Azshara
  if (props === 2361) {
    source = QueenAzsharaHeader;
  }

  // Dazalor
  // Champions of the Light
  if (props === 2333) {
    source = ChampionsOfLightHeader;
  }
  if (props === 2344) {
    source = ChampionsOfLightHeader;
  }
  // Grong
  if (props === 2325) {
    source = GrongHeader;
  }
  if (props === 2340) {
    source = GrongHeader;
  }
  // Jadefire Masters
  if (props === 2323) {
    source = JadefireMastersHeader;
  }
  if (props === 2341) {
    source = JadefireMastersHeader;
  }
  // Opulence
  if (props === 2342) {
    source = OpulenceHeader;
  }
  // Conclave of the Chosen
  if (props === 2330) {
    source = ConclaveHeader;
  }
  // King Rastakhan
  if (props === 2335) {
    source = RastakhanHeader;
  }
  // Mekkatorque
  if (props === 2334) {
    source = MekkatorqueHeader;
  }
  // Stormwall Blockade
  if (props === 2337) {
    source = BlockadeHeader;
  }
  // Lady Jaina Proudmoore
  if (props === 2343) {
    source = JainaHeader;
  }

  return (
    <img
      style={{
        height: 64,
        width: 128,
        padding: "0px 5px 0px 5px",
        verticalAlign: "middle",
        marginRight: "-50px",
      }}
      src={source}
      alt={props}
    />
  );
}