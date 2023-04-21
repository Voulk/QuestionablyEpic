import React from "react";

export default function bossHeaders(props, style, QEmodule) {
  let source = "";

  // temp fix for Upgrade Finder, will need to redo boss ids
  if (QEmodule === "UpgradeFinder") {
    if (props === 2468) {
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-Antros.png").default;
    }
    if (props === 2456) {
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-MawswornCaster.png").default;
    }
    if (props === 2430) {
      source = require("Images/Bosses/WorldBosses/valinor.png").default;
    }
    if (props === 2431) {
      source = require("Images/Bosses/WorldBosses/mortanis.png").default;
    }
    if (props === 2432) {
      source = require("Images/Bosses/WorldBosses/oranomonos.png").default;
    }
    if (props === 2433) {
      source = require("Images/Bosses/WorldBosses/nurgash.png").default;
    }

    // Dragonflight World Bosses
    if (props === 2506) {
      // Basrikron, The Shale Wing
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-BasrikronTheShaleWing.png").default;
    }
    if (props === 2515) {
      // Strunraan, The Sky's Misery
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-StrunraanTheSkysMisery.png").default;
    }
    if (props === 2518) {
      // Liskanoth, The Futurebane
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-LiskanothTheFuturebane.png").default;
    }
    if (props === 2517) {
      // Bazual, The Dreaded Flame
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-BazualTheDradedFlame.png").default;
    }
    //

    if (props === 2418) {
      source = require("Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png").default;
    }
    if (props === 2429) {
      source = require("Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png").default;
    }
    if (props === 2428) {
      source = require("Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png").default;
    }
    if (props === 2420) {
      source = require("Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png").default;
    }
    if (props === 2426) {
      source = require("Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png").default;
    }
    if (props === 2424) {
      source = require("Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png").default;
    }
    if (props === 2425) {
      source = require("Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png").default;
    }
    if (props === 2393) {
      source = require("Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png").default;
    }
    if (props === 2394) {
      source = require("Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png").default;
    }
    if (props === 2422) {
      source = require("Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png").default;
    }

    if (props === 2435) {
      source = require("Images/Bosses/SanctumOfDomination/TheTarragrue/UI-EJ-BOSS-Tarragrue.png").default;
    }
    if (props === 2442) {
      source = require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/UI-EJ-BOSS-EyeoftheJailer.png").default;
    }
    if (props === 2439) {
      source = require("Images/Bosses/SanctumOfDomination/TheNine/UI-EJ-BOSS-TheNine.png").default;
    }
    if (props === 2444) {
      source = require("Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/UI-EJ-BOSS-RemnantofNerzhul.png").default;
    }
    if (props === 2445) {
      source = require("Images/Bosses/SanctumOfDomination/SoulrenderDormazain/UI-EJ-BOSS-SoulrenderDormazain.png").default;
    }
    if (props === 2443) {
      source = require("Images/Bosses/SanctumOfDomination/PainsmithRaznal/UI-EJ-BOSS-PainsmithRaznal.png").default;
    }
    if (props === 2446) {
      source = require("Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/UI-EJ-BOSS-GuardianoftheFirstOnes.png").default;
    }
    if (props === 2447) {
      source = require("Images/Bosses/SanctumOfDomination/FatescribeRohKalo/UI-EJ-BOSS-FatescribeRoh-Talo.png").default;
    }
    if (props === 2440) {
      source = require("Images/Bosses/SanctumOfDomination/Kelthuzad/UI-EJ-BOSS-KelThuzadShadowlands.png").default;
    }
    if (props === 2441) {
      source = require("Images/Bosses/SanctumOfDomination/SylvanusWindrunner/SylvanusEJ.png").default;
    }

    if (props === 2458) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-VigilantGuardian.png").default;
    }
    if (props === 2465) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Skolex.png").default;
    }
    if (props === 2470) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-ArtificerXymox_Sepulcher.png").default;
    }
    if (props === 2460) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Dausegne.png").default;
    }
    if (props === 2459) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-PrototypePantheon.png").default;
    }
    if (props === 2461) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Lihuvim.png").default;
    }
    if (props === 2463) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Halondrus.png").default;
    }
    if (props === 2469) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-AnduinShadowlands.png").default;
    }
    if (props === 2457) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-LordsOfDread.png").default;
    }
    if (props === 2467) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Rygelon.png").default;
    }
    if (props === 2464) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Jailer.png").default;
    }

    // Eranog
    if (props === 2480) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Eranog.png").default;
    }
    // Terros
    if (props === 2500) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Terros.png").default;
    }
    // The Primalist Council
    if (props === 2486) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-ThePrimalCouncil.png").default;
    }
    // Sennarth, The Cold Breath
    if (props === 2482) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-SennarthTheColdBreath.png").default;
    }
    // Dathea, Ascended
    if (props === 2502) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-DatheaAscended.png").default;
    }
    // Kurog Grimtotem
    if (props === 2491) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-KurogGrimtotem.png").default;
    }
    // Broodkeeper Diurna
    if (props === 2493) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-BroodkeeperDiurna.png").default;
    }
    // Raszageth the Storm-Eater
    if (props === 2499) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-RaszagethTheStorm-Eater.png").default;
    }
  } else {
    // World Bosses
    // Valinor
    if (props === 167524 || props === 2430) {
      source = require("Images/Bosses/WorldBosses/valinor.png").default;
    }
    // Mortanis
    if (props === 173104 || props === 2431) {
      source = require("Images/Bosses/WorldBosses/mortanis.png").default;
    }
    // Oranomonos
    if (props === 167527 || props === 2432) {
      source = require("Images/Bosses/WorldBosses/oranomonos.png").default;
    }
    // Nurgash
    if (props === 167526 || props === 2433) {
      source = require("Images/Bosses/WorldBosses/nurgash.png").default;
    }

    if (props === 2405) {
      source = require("Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png").default;
    }
    if (props === 2418) {
      source = require("Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png").default;
    }
    if (props === 2383) {
      source = require("Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png").default;
    }
    if (props === 2406) {
      source = require("Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png").default;
    }
    if (props === 2412) {
      source = require("Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png").default;
    }
    if (props === 2407) {
      source = require("Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png").default;
    }
    if (props === 2417) {
      source = require("Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png").default;
    }
    if (props === 2398) {
      source = require("Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png").default;
    }
    if (props === 2399) {
      source = require("Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png").default;
    }
    if (props === 2402) {
      source = require("Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png").default;
    }

    if (props === 2423) {
      source = require("Images/Bosses/SanctumOfDomination/TheTarragrue/UI-EJ-BOSS-Tarragrue.png").default;
    }

    if (props === 2433) {
      source = require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/UI-EJ-BOSS-EyeoftheJailer.png").default;
    }

    if (props === 2429) {
      source = require("Images/Bosses/SanctumOfDomination/TheNine/UI-EJ-BOSS-TheNine.png").default;
    }

    if (props === 2432) {
      source = require("Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/UI-EJ-BOSS-RemnantofNerzhul.png").default;
    }

    if (props === 2434) {
      source = require("Images/Bosses/SanctumOfDomination/SoulrenderDormazain/UI-EJ-BOSS-SoulrenderDormazain.png").default;
    }

    if (props === 2430) {
      source = require("Images/Bosses/SanctumOfDomination/PainsmithRaznal/UI-EJ-BOSS-PainsmithRaznal.png").default;
    }

    if (props === 2436) {
      source = require("Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/UI-EJ-BOSS-GuardianoftheFirstOnes.png").default;
    }

    if (props === 2431) {
      source = require("Images/Bosses/SanctumOfDomination/FatescribeRohKalo/UI-EJ-BOSS-FatescribeRoh-Talo.png").default;
    }

    if (props === 2422) {
      source = require("Images/Bosses/SanctumOfDomination/Kelthuzad/UI-EJ-BOSS-KelThuzadShadowlands.png").default;
    }

    if (props === 2435) {
      source = require("Images/Bosses/SanctumOfDomination/SylvanusWindrunner/SylvanusEJ.png").default;
    }

    // Vigilant Guardian
    if (props === 2512) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-VigilantGuardian.png").default;
    }

    // Skolex, the Insatiable Ravener
    if (props === 2542) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Skolex.png").default;
    }

    // Artificer Xy'mox
    if (props === 2553) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-ArtificerXymox_Sepulcher.png").default;
    }

    // Dausegne, the Fallen Oracle
    if (props === 2540) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Dausegne.png").default;
    }

    // Prototype Pantheon
    if (props === 2544) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-PrototypePantheon.png").default;
    }

    // Lihuvim, Principal Architect
    if (props === 2539) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Lihuvim.png").default;
    }

    // Halondrus the Reclaimer
    if (props === 2529) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Halondrus.png").default;
    }

    // Anduin Wrynn
    if (props === 2546) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-AnduinShadowlands.png").default;
    }

    // Lords of Dread
    if (props === 2543) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-LordsOfDread.png").default;
    }

    // Rygelon
    if (props === 2549) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Rygelon.png").default;
    }

    // The Jailer, Zovaal
    if (props === 2537) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Jailer.png").default;
    }

    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Classic                                            */
    /* ---------------------------------------------------------------------------------------------- */
    if (props === 1107) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-AnubRekhan.png").default;
    }
    if (props === 1110) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GrandWidowFaerlina.png").default;
    }
    if (props === 1116) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Maexxna.png").default;
    }
    if (props === 1117) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-NoththePlaguebringer.png").default;
    }
    if (props === 1112) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-HeigantheUnclean.png").default;
    }
    if (props === 1115) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Loatheb.png").default;
    }
    if (props === 1113) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-InstructorRazuvious.png").default;
    }
    if (props === 1109) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GothiktheHarvester.png").default;
    }
    if (props === 1121) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-FourHorseman.png").default;
    }
    if (props === 1118) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Patchwerk.png").default;
    }
    if (props === 1111) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Grobbulus.png").default;
    }
    if (props === 1108) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Gluth.png").default;
    }
    if (props === 1120) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Thaddius.png").default;
    }
    if (props === 1119) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Sapphiron.png").default;
    }
    if (props === 1114) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-KelThuzad.png").default;
    }

    if (props === 1094) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Malygos.png").default;
    }

    if (props === 1132) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-FlameLeviathan.png").default;
    }
    if (props === 1136) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-IgnistheFurnaceMaster.png").default;
    }
    if (props === 1139) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Razorscale.png").default;
    }
    if (props === 1142) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-XT002Deconstructor.png").default;
    }
    if (props === 1140) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-AssemblyOfIron.png").default;
    }
    if (props === 1137) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Kologarn.png").default;
    }
    if (props === 1131) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Auriaya.png").default;
    }
    if (props === 1135) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Hodir.png").default;
    }
    if (props === 1141) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Thorim.png").default;
    }
    if (props === 1133) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Freya.png").default;
    }
    if (props === 1138) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Mimiron.png").default;
    }
    if (props === 1134) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GeneralVezax.png").default;
    }
    if (props === 1143) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-YoggSaron.png").default;
    }
    if (props === 1130) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-AlgalontheObserver.png").default;
    }

    if (props === 1126) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-ArchavontheStoneWatcher.png").default;
    }
    if (props === 1127) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-EmalontheStormWatcher.png").default;
    }
    if (props === 1128) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-KoralontheFlameWatcher.png").default;
    }
    if (props === 1129) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-TaravontheIceWatcher.png").default;
    }

    if (props === 1090) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Sartharion.png").default;
    }

    if (props === 1084) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Onyxia.png").default;
    }

    if (props === 1088) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-NorthrendBeasts.png").default;
    }
    if (props === 1087) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-LordJaraxxus.png").default;
    }
    if (props === 1086) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GrandChampions-Horde.png").default;
    }
    if (props === 1089) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-TwinValkyr.png").default;
    }
    if (props === 1085) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Anubarak.png").default;
    }

    if (props === 1101) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-LordMarrowgar.png").default;
    }
    if (props === 1100) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-LadyDeathwhisper.png").default;
    }
    if (props === 1099) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GunshipHorde.png").default;
    }
    if (props === 1096) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-DeathbringerSaurfang.png").default;
    }
    if (props === 1097) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Festergut.png").default;
    }
    if (props === 1104) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Rotface.png").default;
    }
    if (props === 1102) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-ProfessorPutricide.png").default;
    }
    if (props === 1095) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-BloodPrinceCouncil.png").default;
    }
    if (props === 1103) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-BloodQueenLanathel.png").default;
    }
    if (props === 1098) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-ValithriaDreamwalker.png").default;
    }
    if (props === 1105) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Sindragosa.png").default;
    }
    if (props === 1106) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-TheLichKing.png").default;
    }
  }

  if (props === 999 || props === 998) {
    source = require("Images/Classic/Raid/JournalImages/BOE.png").default;
  }

  // Eranog
  if (props === 2587) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Eranog.png").default;
  }
  // Terros
  if (props === 2639) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Terros.png").default;
  }
  // The Primalist Council
  if (props === 2590) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-ThePrimalCouncil.png").default;
  }
  // Sennarth, The Cold Breath
  if (props === 2592) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-SennarthTheColdBreath.png").default;
  }
  // Dathea, Ascended
  if (props === 2635) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-DatheaAscended.png").default;
  }
  // Kurog Grimtotem
  if (props === 2605) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-KurogGrimtotem.png").default;
  }
  // Broodkeeper Diurna
  if (props === 2614) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-BroodkeeperDiurna.png").default;
  }
  // Raszageth the Storm-Eater
  if (props === 2607) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-RaszagethTheStorm-Eater.png").default;
  }

  // Rashok, the Elder
  if (props === 2680 || props === 2525) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-RashoktheElder.png").default;
  }
  // Assault of the Zaqali
  if (props === 2682 || props === 2524) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-AssaultoftheZaqali.png").default;
  }
  // Magmorax
  if (props === 2683 || props === 2527) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-Magmorax.png").default;
  }
  // Echo of Neltharion
  if (props === 2684 || props === 2523) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-EchoofNeltharion.png").default;
  }
  // Scalecommander Sarkareth
  if (props === 2685 || props === 2520) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-ScalecommanderSarkareth.png").default;
  }
  // The Amalgamation Chamber
  if (props === 2687 || props === 2529) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-TheAmalgamationChamber.png").default;
  }
  // Kazzara, the Hellforged
  if (props === 2688 || props === 2522) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-KazzaratheHellforged.png").default;
  }
  // The Vigilant Steward, Zskarn
  if (props === 2689 || props === 2532) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-TheVigilantStewardZskarn.png").default;
  }
  // The Forgotten Experiments
  if (props === 2693 || props === 2530) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-TheForgottenExperiments.png").default;
  }

  // The Zaqali Elders
  if (props === 2696) {
    source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-TheZaqaliElders.png").default;
  }

  return <img style={{ ...style }} src={source} alt={props} />;
}
