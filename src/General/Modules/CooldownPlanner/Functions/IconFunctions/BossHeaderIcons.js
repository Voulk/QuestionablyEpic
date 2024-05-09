import React from "react";

export default function bossHeaders(props, style, QEmodule) {
  let source = "";

  // temp fix for Upgrade Finder, will need to redo boss ids
  if (QEmodule === "UpgradeFinder") {
    if (props === 156) { source = require("Images/Classic/Raid/Tier11/bossHalfusWyrmbreaker.png")}
    if (props === 157) { source = require("Images/Classic/Raid/Tier11/bossValiona.png")}
    if (props === 158) { source = require("Images/Classic/Raid/Tier11/bossAscendentCouncil.png")}
    if (props === 167) { source = require("Images/Classic/Raid/Tier11/bossChogall.png")}
    if (props === 168) { source = require("Images/Classic/Raid/Tier11/bossSinestra.png")}

    if (props === 169) { source = require("Images/Classic/Raid/Tier11/bossOmnotron.png")}
    if (props === 170) { source = require("Images/Classic/Raid/Tier11/bossMagmaw.png")}
    if (props === 171) { source = require("Images/Classic/Raid/Tier11/bossAtramedes.png")}
    if (props === 172) { source = require("Images/Classic/Raid/Tier11/bossChimaeron.png")}
    if (props === 173) { source = require("Images/Classic/Raid/Tier11/bossMaloriak.png")}
    if (props === 174) { source = require("Images/Classic/Raid/Tier11/bossNefarian.png")}

    if (props === 154) { source = require("Images/Classic/Raid/Tier11/bossNezir.png")}
    if (props === 155) { source = require("Images/Classic/Raid/Tier11/bossAlakir.png")}

    if (props === 2468) {
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-Antros.png");
    }
    if (props === 2456) {
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-MawswornCaster.png");
    }
    if (props === 2430) {
      source = require("Images/Bosses/WorldBosses/valinor.png");
    }
    if (props === 2431) {
      source = require("Images/Bosses/WorldBosses/mortanis.png");
    }
    if (props === 2432) {
      source = require("Images/Bosses/WorldBosses/oranomonos.png");
    }
    if (props === 2433) {
      source = require("Images/Bosses/WorldBosses/nurgash.png");
    }

    // Dragonflight World Bosses
    if (props === 2506) {
      // Basrikron, The Shale Wing
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-BasrikronTheShaleWing.png");
    }
    if (props === 2515) {
      // Strunraan, The Sky's Misery
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-StrunraanTheSkysMisery.png");
    }
    if (props === 2518) {
      // Liskanoth, The Futurebane
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-LiskanothTheFuturebane.png");
    }
    if (props === 2517) {
      // Bazual, The Dreaded Flame
      source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-BazualTheDradedFlame.png");
    }
    //

    if (props === 2418) {
      source = require("Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png");
    }
    if (props === 2429) {
      source = require("Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png");
    }
    if (props === 2428) {
      source = require("Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png");
    }
    if (props === 2420) {
      source = require("Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png");
    }
    if (props === 2426) {
      source = require("Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png");
    }
    if (props === 2424) {
      source = require("Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png");
    }
    if (props === 2425) {
      source = require("Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png");
    }
    if (props === 2393) {
      source = require("Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png");
    }
    if (props === 2394) {
      source = require("Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png");
    }
    if (props === 2422) {
      source = require("Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png");
    }

    if (props === 2435) {
      source = require("Images/Bosses/SanctumOfDomination/TheTarragrue/UI-EJ-BOSS-Tarragrue.png");
    }
    if (props === 2442) {
      source = require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/UI-EJ-BOSS-EyeoftheJailer.png");
    }
    if (props === 2439) {
      source = require("Images/Bosses/SanctumOfDomination/TheNine/UI-EJ-BOSS-TheNine.png");
    }
    if (props === 2444) {
      source = require("Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/UI-EJ-BOSS-RemnantofNerzhul.png");
    }
    if (props === 2445) {
      source = require("Images/Bosses/SanctumOfDomination/SoulrenderDormazain/UI-EJ-BOSS-SoulrenderDormazain.png");
    }
    if (props === 2443) {
      source = require("Images/Bosses/SanctumOfDomination/PainsmithRaznal/UI-EJ-BOSS-PainsmithRaznal.png");
    }
    if (props === 2446) {
      source = require("Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/UI-EJ-BOSS-GuardianoftheFirstOnes.png");
    }
    if (props === 2447) {
      source = require("Images/Bosses/SanctumOfDomination/FatescribeRohKalo/UI-EJ-BOSS-FatescribeRoh-Talo.png");
    }
    if (props === 2440) {
      source = require("Images/Bosses/SanctumOfDomination/Kelthuzad/UI-EJ-BOSS-KelThuzadShadowlands.png");
    }
    if (props === 2441) {
      source = require("Images/Bosses/SanctumOfDomination/SylvanusWindrunner/SylvanusEJ.png");
    }

    if (props === 2458) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-VigilantGuardian.png");
    }
    if (props === 2465) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Skolex.png");
    }
    if (props === 2470) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-ArtificerXymox_Sepulcher.png");
    }
    if (props === 2460) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Dausegne.png");
    }
    if (props === 2459) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-PrototypePantheon.png");
    }
    if (props === 2461) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Lihuvim.png");
    }
    if (props === 2463) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Halondrus.png");
    }
    if (props === 2469) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-AnduinShadowlands.png");
    }
    if (props === 2457) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-LordsOfDread.png");
    }
    if (props === 2467) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Rygelon.png");
    }
    if (props === 2464) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Jailer.png");
    }

    // Eranog
    if (props === 2480) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Eranog.png");
    }
    // Terros
    if (props === 2500) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Terros.png");
    }
    // The Primalist Council
    if (props === 2486) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-ThePrimalCouncil.png");
    }
    // Sennarth, The Cold Breath
    if (props === 2482) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-SennarthTheColdBreath.png");
    }
    // Dathea, Ascended
    if (props === 2502) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-DatheaAscended.png");
    }
    // Kurog Grimtotem
    if (props === 2491) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-KurogGrimtotem.png");
    }
    // Broodkeeper Diurna
    if (props === 2493) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-BroodkeeperDiurna.png");
    }
    // Raszageth the Storm-Eater
    if (props === 2499) {
      source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-RaszagethTheStorm-Eater.png");
    }
  } else {
    // World Bosses
    // Valinor
    if (props === 167524 || props === 2430) {
      source = require("Images/Bosses/WorldBosses/valinor.png");
    }
    // Mortanis
    if (props === 173104 || props === 2431) {
      source = require("Images/Bosses/WorldBosses/mortanis.png");
    }
    // Oranomonos
    if (props === 167527 || props === 2432) {
      source = require("Images/Bosses/WorldBosses/oranomonos.png");
    }
    // Nurgash
    if (props === 167526 || props === 2433) {
      source = require("Images/Bosses/WorldBosses/nurgash.png");
    }

    if (props === 2405) {
      source = require("Images/Bosses/CastleNathria/ArtificerXymox/ArtificerXymoxEJ.png");
    }
    if (props === 2418) {
      source = require("Images/Bosses/CastleNathria/HuntsmanAltimor/HuntsmanAltimorEJ.png");
    }
    if (props === 2383) {
      source = require("Images/Bosses/CastleNathria/HungeringDestroyer/HungeringDestroyerEJ.png");
    }
    if (props === 2406) {
      source = require("Images/Bosses/CastleNathria/LadyInervaDarkvein/LadyInervaDarkveinEJ.png");
    }
    if (props === 2412) {
      source = require("Images/Bosses/CastleNathria/TheCouncilOfBlood/TheCouncilOfBloodEJ.png");
    }
    if (props === 2407) {
      source = require("Images/Bosses/CastleNathria/SireDenathrius/SireDenathriusEJ.png");
    }
    if (props === 2417) {
      source = require("Images/Bosses/CastleNathria/StoneLegionGenerals/StoneLegionGeneralsEJ.png");
    }
    if (props === 2398) {
      source = require("Images/Bosses/CastleNathria/Shriekwing/ShriekwingEJ.png");
    }
    if (props === 2399) {
      source = require("Images/Bosses/CastleNathria/Sludgefist/SludgefistEJ.png");
    }
    if (props === 2402) {
      source = require("Images/Bosses/CastleNathria/SunKingsSalvation/SunKingsSalvationEJ.png");
    }

    if (props === 2423) {
      source = require("Images/Bosses/SanctumOfDomination/TheTarragrue/UI-EJ-BOSS-Tarragrue.png");
    }

    if (props === 2433) {
      source = require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/UI-EJ-BOSS-EyeoftheJailer.png");
    }

    if (props === 2429) {
      source = require("Images/Bosses/SanctumOfDomination/TheNine/UI-EJ-BOSS-TheNine.png");
    }

    if (props === 2432) {
      source = require("Images/Bosses/SanctumOfDomination/RemnantOfNerzhul/UI-EJ-BOSS-RemnantofNerzhul.png");
    }

    if (props === 2434) {
      source = require("Images/Bosses/SanctumOfDomination/SoulrenderDormazain/UI-EJ-BOSS-SoulrenderDormazain.png");
    }

    if (props === 2430) {
      source = require("Images/Bosses/SanctumOfDomination/PainsmithRaznal/UI-EJ-BOSS-PainsmithRaznal.png");
    }

    if (props === 2436) {
      source = require("Images/Bosses/SanctumOfDomination/GuardianOfTheFirstOnes/UI-EJ-BOSS-GuardianoftheFirstOnes.png");
    }

    if (props === 2431) {
      source = require("Images/Bosses/SanctumOfDomination/FatescribeRohKalo/UI-EJ-BOSS-FatescribeRoh-Talo.png");
    }

    if (props === 2422) {
      source = require("Images/Bosses/SanctumOfDomination/Kelthuzad/UI-EJ-BOSS-KelThuzadShadowlands.png");
    }

    if (props === 2435) {
      source = require("Images/Bosses/SanctumOfDomination/SylvanusWindrunner/SylvanusEJ.png");
    }

    // Vigilant Guardian
    if (props === 2512) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-VigilantGuardian.png");
    }

    // Skolex, the Insatiable Ravener
    if (props === 2542) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Skolex.png");
    }

    // Artificer Xy'mox
    if (props === 2553) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-ArtificerXymox_Sepulcher.png");
    }

    // Dausegne, the Fallen Oracle
    if (props === 2540) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Dausegne.png");
    }

    // Prototype Pantheon
    if (props === 2544) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-PrototypePantheon.png");
    }

    // Lihuvim, Principal Architect
    if (props === 2539) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Lihuvim.png");
    }

    // Halondrus the Reclaimer
    if (props === 2529) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Halondrus.png");
    }

    // Anduin Wrynn
    if (props === 2546) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-AnduinShadowlands.png");
    }

    // Lords of Dread
    if (props === 2543) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-LordsOfDread.png");
    }

    // Rygelon
    if (props === 2549) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Rygelon.png");
    }

    // The Jailer, Zovaal
    if (props === 2537) {
      source = require("Images/Bosses/SepulcherOfTheFirstOnes/EJ/UI-EJ-BOSS-Jailer.png");
    }

    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Classic                                            */
    /* ---------------------------------------------------------------------------------------------- */
    if (props === 1107) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-AnubRekhan.png");
    }
    if (props === 1110) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GrandWidowFaerlina.png");
    }
    if (props === 1116) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Maexxna.png");
    }
    if (props === 1117) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-NoththePlaguebringer.png");
    }
    if (props === 1112) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-HeigantheUnclean.png");
    }
    if (props === 1115) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Loatheb.png");
    }
    if (props === 1113) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-InstructorRazuvious.png");
    }
    if (props === 1109) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GothiktheHarvester.png");
    }
    if (props === 1121) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-FourHorseman.png");
    }
    if (props === 1118) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Patchwerk.png");
    }
    if (props === 1111) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Grobbulus.png");
    }
    if (props === 1108) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Gluth.png");
    }
    if (props === 1120) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Thaddius.png");
    }
    if (props === 1119) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Sapphiron.png");
    }
    if (props === 1114) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-KelThuzad.png");
    }

    if (props === 1094) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Malygos.png");
    }

    if (props === 1132) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-FlameLeviathan.png");
    }
    if (props === 1136) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-IgnistheFurnaceMaster.png");
    }
    if (props === 1139) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Razorscale.png");
    }
    if (props === 1142) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-XT002Deconstructor.png");
    }
    if (props === 1140) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-AssemblyOfIron.png");
    }
    if (props === 1137) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Kologarn.png");
    }
    if (props === 1131) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Auriaya.png");
    }
    if (props === 1135) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Hodir.png");
    }
    if (props === 1141) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Thorim.png");
    }
    if (props === 1133) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Freya.png");
    }
    if (props === 1138) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Mimiron.png");
    }
    if (props === 1134) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GeneralVezax.png");
    }
    if (props === 1143) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-YoggSaron.png");
    }
    if (props === 1130) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-AlgalontheObserver.png");
    }

    if (props === 1126) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-ArchavontheStoneWatcher.png");
    }
    if (props === 1127) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-EmalontheStormWatcher.png");
    }
    if (props === 1128) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-KoralontheFlameWatcher.png");
    }
    if (props === 1129) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-TaravontheIceWatcher.png");
    }

    if (props === 1090) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Sartharion.png");
    }

    if (props === 1084) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Onyxia.png");
    }

    if (props === 1088) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-NorthrendBeasts.png");
    }
    if (props === 1087) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-LordJaraxxus.png");
    }
    if (props === 1086) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GrandChampions-Horde.png");
    }
    if (props === 1089) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-TwinValkyr.png");
    }
    if (props === 1085) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Anubarak.png");
    }

    if (props === 1101) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-LordMarrowgar.png");
    }
    if (props === 1100) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-LadyDeathwhisper.png");
    }
    if (props === 1099) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-GunshipHorde.png");
    }
    if (props === 1096) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-DeathbringerSaurfang.png");
    }
    if (props === 1097) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Festergut.png");
    }
    if (props === 1104) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Rotface.png");
    }
    if (props === 1102) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-ProfessorPutricide.png");
    }
    if (props === 1095) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-BloodPrinceCouncil.png");
    }
    if (props === 1103) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-BloodQueenLanathel.png");
    }
    if (props === 1098) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-ValithriaDreamwalker.png");
    }
    if (props === 1105) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-Sindragosa.png");
    }
    if (props === 1106) {
      source = require("Images/Classic/Raid/JournalImages/UI-EJ-BOSS-TheLichKing.png");
    }
  }

  if (props === 999 || props === 998 || props === -54) {
    source = require("Images/Classic/Raid/JournalImages/BOE.png");
  }

  // Eranog
  if (props === 2587) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Eranog.png");
  }
  // Terros
  if (props === 2639) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Terros.png");
  }
  // The Primalist Council
  if (props === 2590) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-ThePrimalCouncil.png");
  }
  // Sennarth, The Cold Breath
  if (props === 2592) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-SennarthTheColdBreath.png");
  }
  // Dathea, Ascended
  if (props === 2635) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-DatheaAscended.png");
  }
  // Kurog Grimtotem
  if (props === 2605) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-KurogGrimtotem.png");
  }
  // Broodkeeper Diurna
  if (props === 2614) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-BroodkeeperDiurna.png");
  }
  // Raszageth the Storm-Eater
  if (props === 2607) {
    source = require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-RaszagethTheStorm-Eater.png");
  }

  // Rashok, the Elder
  if (props === 2680 || props === 2525) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-RashoktheElder.png");
  }
  // Assault of the Zaqali
  if (props === 2682 || props === 2524) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-AssaultoftheZaqali.png");
  }
  // Magmorax
  if (props === 2683 || props === 2527) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-Magmorax.png");
  }
  // Echo of Neltharion
  if (props === 2684 || props === 2523) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-EchoofNeltharion.png");
  }
  // Scalecommander Sarkareth
  if (props === 2685 || props === 2520) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-ScalecommanderSarkareth.png");
  }
  // The Amalgamation Chamber
  if (props === 2687 || props === 2529) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-TheAmalgamationChamber.png");
  }
  // Kazzara, the Hellforged
  if (props === 2688 || props === 2522) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-KazzaratheHellforged.png");
  }
  // The Vigilant Steward, Zskarn
  if (props === 2689 || props === 2532) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-TheVigilantStewardZskarn.png");
  }
  // The Forgotten Experiments
  if (props === 2693 || props === 2530) {
    source = require("Images/Bosses/Aberrus/UI-EJ-BOSS-TheForgottenExperiments.png");
  }
  // The Zaqali Elders
  if (props === 2696 || props === 2531) {
    source = require("Images/Bosses/WorldBosses/UI-EJ-BOSS-TheZaqaliElders.png");
  }

  // Chronikar
  if (props === 2666 || props === 2521) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Chronikar.png");
  }
  // Tyr
  if (props === 2670 || props === 2526) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Tyr.png");
  }
  // Manifested Timeways
  if (props === 2667 || props === 2528) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Manifested.png");
  }
  // Time-Lost Battlefield
  if (props === 2672 || props === 2533) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Battlefield.png");
  }
  // Blight of Galakrond
  if (props === 2668 || props === 2535) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Galakrond.png");
  }
  // Morchie
  if (props === 2671 || props === 2536) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Morchie.png");
  }
  // Iridikron
  if (props === 2669 || props === 2537) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Iridikron.png");
  }
  // Deios
  if (props === 2673 || props === 2538) {
    source = require("Images/MythicPlus/DawnOfTheInfinite/Deios.png");
  }

  // Gnarlroot
  if (props === 2820 || props === 2564) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-Gnarlroot.png");
  }

  // Igira the Cruel
  if (props === 2709 || props === 2554) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-IgiratheCruel.png");
  }

  // Volcoross
  if (props === 2557 || props === 2737) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-Volcoross.png");
  }

  // Council of Dreams
  if (props === 2728 || props === 2555) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-CouncilofDreams.png");
  }

  // Larodar, Keeper of the Flame
  if (props === 2731 || props === 2553) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-LarodarKeeperoftheFlame.png");
  }

  // Nymue, Weaver of the Cycle
  if (props === 2708 || props === 2556) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-NymueWeaveroftheCycle.png");
  }

  // Smolderon
  if (props === 2563 || props === 2824) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-Smolderon.png");
  }

  // Tindral Sageswift, Seer of the Flame
  if (props === 2565 || props === 2786) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-TindralSageswiftSeerofFlame.png");
  }

  // Fyrakk the Blazing
  if (props === 2677 || props === 2519) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-FyrakktheBurning.png");
  }

  // Aurostor World Boss
  if (props === 2562 || props === 2828 || props === 1205) {
    source = require("Images/Bosses/Amirdrassil/UI-EJ-BOSS-AurostortheHibernator.png");
  }

  return <img style={{ ...style }} src={source} alt={props} />;
}
