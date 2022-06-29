import React from "react";

export default function bossHeaders(props, style) {
  let source = "";

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

  return <img style={{ ...style }} src={source} alt={props} />;
}
