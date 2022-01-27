export default function UpgradeFinderBossImages(props, gameType, other) {
  if (other === 1194) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Tazavesh                                            */
    /* ---------------------------------------------------------------------------------------------- */
    switch (props) {
      case 2437: // Zo'phex the Sentinel
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/zophex.png").default;
      case 2454: // The Grand Menagerie
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/menagerie.png").default;
      case 2436: // Mailroom Mayhem
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/postmaster.png").default;
      case 2452: // Myza's Oasis
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/oasis.png").default;
      case 2451: // So'azmi
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/soazmi.png").default;
      case 2448: // Hylbrande
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/hylbrande.png").default;
      case 2449: // Timecap'n Hooktail
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/timecapn.png").default;
      case 2455: // So'leah
        return require("Images/MythicPlus/TazaveshTheVeiledMarket/soleah.png").default;
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
        return require("Images/Bosses/SepulcherOfTheFirstOnes/VigilantGuardian.png").default;
      case 2465: // Skolex, the Insatiable Ravener
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Skolex.png").default;
      case 2470: // Artificer Xy'mox
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Xymox.png").default;
      case 2460: // Prototype Pantheon
        return require("Images/Bosses/SepulcherOfTheFirstOnes/ProtoTypePantheon.png").default;
      case 2459: // Dausegne, the Fallen Oracle
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Dausegne.png").default;
      case 2461: // Lihuvim, Principle Architect
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Lihuvim.png").default;
      case 2463: // Halondrus the Reclaimer
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Halondrus.png").default;
      case 2469: // Anduin Wrynn
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Anduin.png").default;
      case 2457: // Lords of Dread
        return require("Images/Bosses/SepulcherOfTheFirstOnes/LordsOfDread.png").default;
      case 2467: // Rygelon
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Rygelon.png").default;
      case 2464: // The Jailer
        return require("Images/Bosses/SepulcherOfTheFirstOnes/Jailer.png").default;
      case 999: // Bind on Equips
        return require("Images/Bosses/BOE.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          World Bosses                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 2430: // Valinor
        return require("Images/Bosses/WorldBosses/ValinorUGF.png").default;
      case 2431: // Mortanis
        return require("Images/Bosses/WorldBosses/MortanisUGF.png").default;
      case 2432: // Oranomonos
        return require("Images/Bosses/WorldBosses/OranomonosUGF.png").default;
      case 2433: // Nurgash
        return require("Images/Bosses/WorldBosses/NurgashUGF.png").default;
      case 2456: // Morgeth
        return require("Images/Bosses/WorldBosses/morgethUGF.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                            Karazhan                                            */
      /* ---------------------------------------------------------------------------------------------- */
      case 1552: // Servant Quarters
        return require("Images/BurningCrusade/Raid/Karazhan/ServantQuarters.png").default;
      case 652: // Attumen The Huntsman
        return require("Images/BurningCrusade/Raid/Karazhan/AttumenTheHuntsman.png").default;
      case 653: // Moroes
        return require("Images/BurningCrusade/Raid/Karazhan/Moroes.png").default;
      case 654: // Maiden of Virtue
        return require("Images/BurningCrusade/Raid/Karazhan/Maiden.png").default;
      case 655: // Opera Event
        return require("Images/BurningCrusade/Raid/Karazhan/Opera.png").default;
      case 656: // Curator
        return require("Images/BurningCrusade/Raid/Karazhan/Curator.png").default;
      case 659: // Netherspite
        return require("Images/BurningCrusade/Raid/Karazhan/Netherspite.png").default;
      case 661: // Prince Malchezaar
        return require("Images/BurningCrusade/Raid/Karazhan/PrinceMalchezaar.png").default;
      case 660: // Chess Event
        return require("Images/BurningCrusade/Raid/Karazhan/ChessEvent.png").default;
      case 658: // Illhoof
        return require("Images/BurningCrusade/Raid/Karazhan/Illhoof.png").default;
      case 657: // Shade of Aran
        return require("Images/BurningCrusade/Raid/Karazhan/ShadeofAran.png").default;
      case 662: // Nightbane
        return require("Images/BurningCrusade/Raid/Karazhan/Nightbane.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Gruul's Lair                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 649: // High King Maulgar
        return require("Images/BurningCrusade/Raid/GruulsLair/HighKingMaulgar.png").default;
      case 650: // Gruul
        return require("Images/BurningCrusade/Raid/GruulsLair/Gruul.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                       Magtheridon's Lair                                       */
      /* ---------------------------------------------------------------------------------------------- */
      case 651: // Magtheridon
        return require("Images/BurningCrusade/Raid/MagtheridonsLair/MagtheridonsLair.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Tempest Keep                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 730: // Al'ar
        return require("Images/BurningCrusade/Raid/TempestKeep/Alar.png").default;
      case 731: // Void Reaver
        return require("Images/BurningCrusade/Raid/TempestKeep/VoidReaver.png").default;
      case 732: // High Astromancer Solarian
        return require("Images/BurningCrusade/Raid/TempestKeep/HighAstromancerSolarian.png").default;
      case 733: // High Astromancer Solarian
        return require("Images/BurningCrusade/Raid/TempestKeep/KaelthasSunstrider.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                      Serpentshrine Cavern                                      */
      /* ---------------------------------------------------------------------------------------------- */
      case 623: // Hydross the Unstable
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/HydrosstheUnstable.png").default;
      case 624: // The Lurker Below
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/TheLurkerBelow.png").default;
      case 625: // Leotheras the Blind
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/LeotherastheBlind.png").default;
      case 626: // Fathom Lord Karathress
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/FathomLordKarathress.png").default;
      case 627: // Morogrim Tidewalker
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/MorogrimTidewalker.png").default;
      case 628: // Lady Vashj
        return require("Images/BurningCrusade/Raid/SerpentshrineCavern/LadyVashj.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                     Battle for Mount Hyjal                                     */
      /* ---------------------------------------------------------------------------------------------- */
      case 618: // Rage Winterchill
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/RageWinterchill.png").default;
      case 619: // Anetheron
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Anetheron.png").default;
      case 620: // Kaz'rogal
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Kazrogal.png").default;
      case 621: // Azgalor
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Azgalor.png").default;
      case 622: // Archimonde
        return require("Images/BurningCrusade/Raid/TheBattleforMountHyjal/Archimonde.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Black Temple                                          */
      /* ---------------------------------------------------------------------------------------------- */
      case 601: // High Warlord Naj'entus
        return require("Images/BurningCrusade/Raid/BlackTemple/HighWarlordNajentus.png").default;
      case 602: // Supremus
        return require("Images/BurningCrusade/Raid/BlackTemple/Supremus.png").default;
      case 603: // Shade of Akama
        return require("Images/BurningCrusade/Raid/BlackTemple/ShadeofAkama.png").default;
      case 604: // Teron Gorefiend
        return require("Images/BurningCrusade/Raid/BlackTemple/TeronGorefiend.png").default;
      case 605: // Gurtogg Bloodboil
        return require("Images/BurningCrusade/Raid/BlackTemple/GurtoggBloodboil.png").default;
      case 606: // Reliquary of Souls
        return require("Images/BurningCrusade/Raid/BlackTemple/ReliquaryoftheLost.png").default;
      case 607: // Mother Shahraz
        return require("Images/BurningCrusade/Raid/BlackTemple/MotherShahraz.png").default;
      case 608: // The Illidari Council
        return require("Images/BurningCrusade/Raid/BlackTemple/IllidariCouncil.png").default;
      case 609: // Illidan Stormrage
        return require("Images/BurningCrusade/Raid/BlackTemple/IllidanStormrage.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                            Zul'Aman                                            */
      /* ---------------------------------------------------------------------------------------------- */
      case 1189: // Akil'zon
        return require("Images/BurningCrusade/Raid/Zulaman/Akilzon.png").default;
      case 1190: // Nalorakk
        return require("Images/BurningCrusade/Raid/Zulaman/Nalorakk.png").default;
      case 1191: // Jan'alai
        return require("Images/BurningCrusade/Raid/Zulaman/Janalai.png").default;
      case 1192: // Halazzi
        return require("Images/BurningCrusade/Raid/Zulaman/Halazzi.png").default;
      case 1193: // Hex Lord Malacrass
        return require("Images/BurningCrusade/Raid/Zulaman/HexLordMalacrass.png").default;
      case 1194: // Zul'jin
        return require("Images/BurningCrusade/Raid/Zulaman/Zuljin.png").default;
      /* ---------------------------------------------------------------------------------------------- */
      /*                                         Sunwell Plateau                                        */
      /* ---------------------------------------------------------------------------------------------- */
      case 724: // Kalecgos
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Kalecgos.png").default;
      case 725: // Brutallus
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Brutallus.png").default;
      case 726: // Felmyst
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Felmyst.png").default;
      case 727: // The Eredar Twins
        return require("Images/BurningCrusade/Raid/SunwellPlateau/EredarTwins.png").default;
      case 728: // M'uru
        return require("Images/BurningCrusade/Raid/SunwellPlateau/Muru.png").default;
      case 729: // Kil'jaeden
        return require("Images/BurningCrusade/Raid/SunwellPlateau/KilJaeden.png").default;
      default:
        // Error Checking
        return "Error: Boss Missing :(";
    }
  }
}
