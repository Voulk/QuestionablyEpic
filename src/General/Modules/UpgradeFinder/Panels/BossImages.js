export default function UpgradeFinderBossImages(props, gameType, other) {
  if (other === 1194) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Tazavesh                                            */
    /* ---------------------------------------------------------------------------------------------- */
    switch (props) {
      case 2437: // Zo'phex the Sentinel
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/zophex.png");
      case 2454: // The Grand Menagerie
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/menagerie.png");
      case 2436: // Mailroom Mayhem
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/postmaster.png");
      case 2452: // Myza's Oasis
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/oasis.png");
      case 2451: // So'azmi
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/soazmi.png");
      case 2448: // Hylbrande
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/hylbrande.png");
      case 2449: // Timecap'n Hooktail
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/timecapn.png");
      case 2455: // So'leah
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/soleah.png");
      default:
        // Error Checking
        return "Error: Boss Missing :(";
    }
  } else {
    switch (props) {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                         Castle Nathria                                         */
      /* ---------------------------------------------------------------------------------------------- */
      case 2418: // Artificer
        return require("Images/Bosses/CastleNathria/ArtificerXymox/Artificer.png");
      case 2429: // Huntsman Altimor
        return require("Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimor.png");
      case 2428: // Hungering Destroyer
        return require("Images/Bosses/CastleNathria/HungeringDestroyer/Hungering.png");
      case 2420: // Lady Inerva Darkvein
        return require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Darkvein.png");
      case 2426: // The Council of Blood
        return require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Council.png");
      case 2424: // Sire Denathrius
        return require("Images/Bosses/CastleNathria/SireDenathrius/Denathrius.png");
      case 2425: // Stone Legion Generals
        return require("Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegion.png");
      case 2393: // Shriekwing
        return require("Images/Bosses/CastleNathria/Shriekwing/Shriekwing.png");
      case 2394: // Sludgefist
        return require("Images/Bosses/CastleNathria/Sludgefist/Sludgefist.png");
      case 2422: // Kael'thas
        return require("Images/Bosses/CastleNathria/SunKingsSalvation/SunKing.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                      Sanctum of Domination                                     */
      /* ---------------------------------------------------------------------------------------------- */
      case 2435: // The Tarragrue
        return require("Images/Bosses/SanctumOfDomination/TheTarragrue/TarragrueUF.png");
      case 2442: // The Eye of the Jailer
        return require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/EyeoftheJailer.png");
      case 2439: // The Nine
        return require("Images/Bosses/SanctumOfDomination/TheNine/TheNine.png");
      case 2444: // Remnant of Ner'zhul
        return require("Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/RemnantOfNerzhulUF.png");
      case 2445: // Soulrender Dormazain
        return require("Images/Bosses/SanctumOfDomination/SoulrenderDormazain/SoulrenderDormazain.png");
      case 2443: // Painsmith Raznal
        return require("Images/Bosses/SanctumOfDomination/PainsmithRaznal/PainsmithRaznalUF.png");
      case 2446: // Guardian of the First Ones
        return require("Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/GuardianOfTheFirstOnesUF.png");
      case 2447: // Fatescribe Roh-Kalo
        return require("Images/Bosses/SanctumOfDomination/FatescribeRohKalo/FatescribeRohKaloUF.png");
      case 2440: // Kel'Thuzad
        return require("Images/Bosses/SanctumOfDomination/Kelthuzad/KelthuzadUF.png");
      case 2441: // Sylvanas Windrunner
        return require("Images/Bosses/SanctumOfDomination/SylvanusWindrunner/SylvanusWindrunnerUF.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                   Sepulcher of the First Ones                                  */
      /* ---------------------------------------------------------------------------------------------- */
      case 2458: // Vigilant Guardian
        return require("Images/Bosses/SepulcherOfTheFirstOnes/VigilantGuardian.png");
      case 2465: // Skolex, the Insatiable Ravener
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Skolex.png");
      case 2470: // Artificer Xy'mox
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Xymox.png");
      case 2460: // Prototype Pantheon
        return require("Images/Bosses/SepulcherOfTheFirstOnes/ProtoTypePantheon.png");
      case 2459: // Dausegne, the Fallen Oracle
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Dausegne.png");
      case 2461: // Lihuvim, Principle Architect
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Lihuvim.png");
      case 2463: // Halondrus the Reclaimer
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Halondrus.png");
      case 2469: // Anduin Wrynn
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Anduin.png");
      case 2457: // Lords of Dread
        return require("Images/Bosses/SepulcherOfTheFirstOnes/LordsOfDread.png");
      case 2467: // Rygelon
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Rygelon.png");
      case 2464: // The Jailer
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Jailer.png");
      case 999: // Bind on Equips
        return require("Images/Bosses/BOE.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          World Bosses                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 2430: // Valinor
        return require("Images/Bosses/WorldBosses/ValinorUGF.png");
      case 2431: // Mortanis
        return require("Images/Bosses/WorldBosses/MortanisUGF.png");
      case 2432: // Oranomonos
        return require("Images/Bosses/WorldBosses/OranomonosUGF.png");
      case 2433: // Nurgash
        return require("Images/Bosses/WorldBosses/NurgashUGF.png");
      case 2456: // Morgeth
        return require("Images/Bosses/WorldBosses/morgethUGF.png");
      case 2468: // Antros
        return require("Images/Bosses/WorldBosses/AntrosUGF.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                            Karazhan                                            */
      /* ---------------------------------------------------------------------------------------------- */
      case 1552: // Servant Quarters
        return require("Images/Classic/Raid/Karazhan/ServantQuarters.png");
      case 652: // Attumen The Huntsman
        return require("Images/Classic/Raid/Karazhan/AttumenTheHuntsman.png");
      case 653: // Moroes
        return require("Images/Classic/Raid/Karazhan/Moroes.png");
      case 654: // Maiden of Virtue
        return require("Images/Classic/Raid/Karazhan/Maiden.png");
      case 655: // Opera Event
        return require("Images/Classic/Raid/Karazhan/Opera.png");
      case 656: // Curator
        return require("Images/Classic/Raid/Karazhan/Curator.png");
      case 659: // Netherspite
        return require("Images/Classic/Raid/Karazhan/Netherspite.png");
      case 661: // Prince Malchezaar
        return require("Images/Classic/Raid/Karazhan/PrinceMalchezaar.png");
      case 660: // Chess Event
        return require("Images/Classic/Raid/Karazhan/ChessEvent.png");
      case 658: // Illhoof
        return require("Images/Classic/Raid/Karazhan/Illhoof.png");
      case 657: // Shade of Aran
        return require("Images/Classic/Raid/Karazhan/ShadeofAran.png");
      case 662: // Nightbane
        return require("Images/Classic/Raid/Karazhan/Nightbane.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Gruul's Lair                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 649: // High King Maulgar
        return require("Images/Classic/Raid/GruulsLair/HighKingMaulgar.png");
      case 650: // Gruul
        return require("Images/Classic/Raid/GruulsLair/Gruul.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                       Magtheridon's Lair                                       */
      /* ---------------------------------------------------------------------------------------------- */
      case 651: // Magtheridon
        return require("Images/Classic/Raid/MagtheridonsLair/MagtheridonsLair.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Tempest Keep                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 730: // Al'ar
        return require("Images/Classic/Raid/TempestKeep/Alar.png");
      case 731: // Void Reaver
        return require("Images/Classic/Raid/TempestKeep/VoidReaver.png");
      case 732: // High Astromancer Solarian
        return require("Images/Classic/Raid/TempestKeep/HighAstromancerSolarian.png");
      case 733: // High Astromancer Solarian
        return require("Images/Classic/Raid/TempestKeep/KaelthasSunstrider.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                      Serpentshrine Cavern                                      */
      /* ---------------------------------------------------------------------------------------------- */
      case 623: // Hydross the Unstable
        return require("Images/Classic/Raid/SerpentshrineCavern/HydrosstheUnstable.png");
      case 624: // The Lurker Below
        return require("Images/Classic/Raid/SerpentshrineCavern/TheLurkerBelow.png");
      case 625: // Leotheras the Blind
        return require("Images/Classic/Raid/SerpentshrineCavern/LeotherastheBlind.png");
      case 626: // Fathom Lord Karathress
        return require("Images/Classic/Raid/SerpentshrineCavern/FathomLordKarathress.png");
      case 627: // Morogrim Tidewalker
        return require("Images/Classic/Raid/SerpentshrineCavern/MorogrimTidewalker.png");
      case 628: // Lady Vashj
        return require("Images/Classic/Raid/SerpentshrineCavern/LadyVashj.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                     Battle for Mount Hyjal                                     */
      /* ---------------------------------------------------------------------------------------------- */
      case 618: // Rage Winterchill
        return require("Images/Classic/Raid/TheBattleforMountHyjal/RageWinterchill.png");
      case 619: // Anetheron
        return require("Images/Classic/Raid/TheBattleforMountHyjal/Anetheron.png");
      case 620: // Kaz'rogal
        return require("Images/Classic/Raid/TheBattleforMountHyjal/Kazrogal.png");
      case 621: // Azgalor
        return require("Images/Classic/Raid/TheBattleforMountHyjal/Azgalor.png");
      case 622: // Archimonde
        return require("Images/Classic/Raid/TheBattleforMountHyjal/Archimonde.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Black Temple                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 601: // High Warlord Naj'entus
        return require("Images/Classic/Raid/BlackTemple/HighWarlordNajentus.png");
      case 602: // Supremus
        return require("Images/Classic/Raid/BlackTemple/Supremus.png");
      case 603: // Shade of Akama
        return require("Images/Classic/Raid/BlackTemple/ShadeofAkama.png");
      case 604: // Teron Gorefiend
        return require("Images/Classic/Raid/BlackTemple/TeronGorefiend.png");
      case 605: // Gurtogg Bloodboil
        return require("Images/Classic/Raid/BlackTemple/GurtoggBloodboil.png");
      case 606: // Reliquary of Souls
        return require("Images/Classic/Raid/BlackTemple/ReliquaryoftheLost.png");
      case 607: // Mother Shahraz
        return require("Images/Classic/Raid/BlackTemple/MotherShahraz.png");
      case 608: // The Illidari Council
        return require("Images/Classic/Raid/BlackTemple/IllidariCouncil.png");
      case 609: // Illidan Stormrage
        return require("Images/Classic/Raid/BlackTemple/IllidanStormrage.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                            Zul'Aman                                            */
      /* ---------------------------------------------------------------------------------------------- */
      case 1189: // Akil'zon
        return require("Images/Classic/Raid/Zulaman/Akilzon.png");
      case 1190: // Nalorakk
        return require("Images/Classic/Raid/Zulaman/Nalorakk.png");
      case 1191: // Jan'alai
        return require("Images/Classic/Raid/Zulaman/Janalai.png");
      case 1192: // Halazzi
        return require("Images/Classic/Raid/Zulaman/Halazzi.png");
      case 1193: // Hex Lord Malacrass
        return require("Images/Classic/Raid/Zulaman/HexLordMalacrass.png");
      case 1194: // Zul'jin
        return require("Images/Classic/Raid/Zulaman/Zuljin.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                         Sunwell Plateau                                        */
      /* ---------------------------------------------------------------------------------------------- */
      case 724: // Kalecgos
        return require("Images/Classic/Raid/SunwellPlateau/Kalecgos.png");
      case 725: // Brutallus
        return require("Images/Classic/Raid/SunwellPlateau/Brutallus.png");
      case 726: // Felmyst
        return require("Images/Classic/Raid/SunwellPlateau/Felmyst.png");
      case 727: // The Eredar Twins
        return require("Images/Classic/Raid/SunwellPlateau/EredarTwins.png");
      case 728: // M'uru
        return require("Images/Classic/Raid/SunwellPlateau/Muru.png");
      case 729: // Kil'jaeden
        return require("Images/Classic/Raid/SunwellPlateau/KilJaeden.png");
      default:
        // Error Checking
        return "Error: Boss Missing :(";
    }
  }
}
