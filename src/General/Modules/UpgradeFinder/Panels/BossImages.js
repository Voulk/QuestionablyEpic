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
        return require("Images/BurningCrusade/Raid/Karazhan/ServantQuarters.png");
      case 652: // Attumen The Huntsman
        return require("Images/BurningCrusade/Raid/Karazhan/AttumenTheHuntsman.png");
      case 653: // Moroes
        return require("Images/BurningCrusade/Raid/Karazhan/Moroes.png");
      case 654: // Maiden of Virtue
        return require("Images/BurningCrusade/Raid/Karazhan/Maiden.png");
      case 655: // Opera Event
        return require("Images/BurningCrusade/Raid/Karazhan/Opera.png");
      case 656: // Curator
        return require("Images/BurningCrusade/Raid/Karazhan/Curator.png");
      case 659: // Netherspite
        return require("Images/BurningCrusade/Raid/Karazhan/Netherspite.png");
      case 661: // Prince Malchezaar
        return require("Images/BurningCrusade/Raid/Karazhan/PrinceMalchezaar.png");
      case 660: // Chess Event
        return require("Images/BurningCrusade/Raid/Karazhan/ChessEvent.png");
      case 658: // Illhoof
        return require("Images/BurningCrusade/Raid/Karazhan/Illhoof.png");
      case 657: // Shade of Aran
        return require("Images/BurningCrusade/Raid/Karazhan/ShadeofAran.png");
      case 662: // Nightbane
        return require("Images/BurningCrusade/Raid/Karazhan/Nightbane.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Gruul's Lair                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 649: // High King Maulgar
        return require("Images/BurningCrusade/Raid/GruulsLair/HighKingMaulgar.png");
      case 650: // Gruul
        return require("Images/BurningCrusade/Raid/GruulsLair/Gruul.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                       Magtheridon's Lair                                       */
      /* ---------------------------------------------------------------------------------------------- */
      case 651: // Magtheridon
        return require("Images/BurningCrusade/Raid/MagtheridonsLair/MagtheridonsLair.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Tempest Keep                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 730: // Al'ar
        return require("Images/BurningCrusade/Raid/TempestKeep/Alar.png");
      case 731: // Void Reaver
        return require("Images/BurningCrusade/Raid/TempestKeep/VoidReaver.png");
      case 732: // High Astromancer Solarian
        return require("Images/BurningCrusade/Raid/TempestKeep/HighAstromancerSolarian.png");
      case 733: // High Astromancer Solarian
        return require("Images/BurningCrusade/Raid/TempestKeep/KaelthasSunstrider.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                      Serpentshrine Cavern                                      */
      /* ---------------------------------------------------------------------------------------------- */
      case 623: // Hydross the Unstable
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/HydrosstheUnstable.png");
      case 624: // The Lurker Below
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/TheLurkerBelow.png");
      case 625: // Leotheras the Blind
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/LeotherastheBlind.png");
      case 626: // Fathom Lord Karathress
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/FathomLordKarathress.png");
      case 627: // Morogrim Tidewalker
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/MorogrimTidewalker.png");
      case 628: // Lady Vashj
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/LadyVashj.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                     Battle for Mount Hyjal                                     */
      /* ---------------------------------------------------------------------------------------------- */
      case 618: // Rage Winterchill
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/RageWinterchill.png");
      case 619: // Anetheron
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Anetheron.png");
      case 620: // Kaz'rogal
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Kazrogal.png");
      case 621: // Azgalor
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Azgalor.png");
      case 622: // Archimonde
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Archimonde.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Black Temple                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 601: // High Warlord Naj'entus
        return require("Images/BurningCrusade/Raid/BlackTemple/HighWarlordNajentus.png");
      case 602: // Supremus
        return require("Images/BurningCrusade/Raid/BlackTemple/Supremus.png");
      case 603: // Shade of Akama
        return require("Images/BurningCrusade/Raid/BlackTemple/ShadeofAkama.png");
      case 604: // Teron Gorefiend
        return require("Images/BurningCrusade/Raid/BlackTemple/TeronGorefiend.png");
      case 605: // Gurtogg Bloodboil
        return require("Images/BurningCrusade/Raid/BlackTemple/GurtoggBloodboil.png");
      case 606: // Reliquary of Souls
        return require("Images/BurningCrusade/Raid/BlackTemple/ReliquaryoftheLost.png");
      case 607: // Mother Shahraz
        return require("Images/BurningCrusade/Raid/BlackTemple/MotherShahraz.png");
      case 608: // The Illidari Council
        return require("Images/BurningCrusade/Raid/BlackTemple/IllidariCouncil.png");
      case 609: // Illidan Stormrage
        return require("Images/BurningCrusade/Raid/BlackTemple/IllidanStormrage.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                            Zul'Aman                                            */
      /* ---------------------------------------------------------------------------------------------- */
      case 1189: // Akil'zon
        return require("Images/BurningCrusade/Raid/Zulaman/Akilzon.png");
      case 1190: // Nalorakk
        return require("Images/BurningCrusade/Raid/Zulaman/Nalorakk.png");
      case 1191: // Jan'alai
        return require("Images/BurningCrusade/Raid/Zulaman/Janalai.png");
      case 1192: // Halazzi
        return require("Images/BurningCrusade/Raid/Zulaman/Halazzi.png");
      case 1193: // Hex Lord Malacrass
        return require("Images/BurningCrusade/Raid/Zulaman/HexLordMalacrass.png");
      case 1194: // Zul'jin
        return require("Images/BurningCrusade/Raid/Zulaman/Zuljin.png");
      /* ---------------------------------------------------------------------------------------------- */
      /*                                         Sunwell Plateau                                        */
      /* ---------------------------------------------------------------------------------------------- */
      case 724: // Kalecgos
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Kalecgos.png");
      case 725: // Brutallus
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Brutallus.png");
      case 726: // Felmyst
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Felmyst.png");
      case 727: // The Eredar Twins
        return require("Images/BurningCrusade/Raid/SunwellPlateau/EredarTwins.png");
      case 728: // M'uru
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Muru.png");
      case 729: // Kil'jaeden
        return require("Images/BurningCrusade/Raid/SunwellPlateau/KilJaeden.png");
      default:
        // Error Checking
        return "Error: Boss Missing :(";
    }
  }
}
