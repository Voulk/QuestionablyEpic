import React from "react";

export default function bossHeaders(props, style) {
  let source = "";

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

  return <img style={{ ...style }} src={source} alt={props} />;
}
