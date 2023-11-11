// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.
import createRygelonEvents from "./BossEvents/SepulcherEvents/Rygelon";
import createjailerEvents from "./BossEvents/SepulcherEvents/Jailer";
import createAnduinEvents from "./BossEvents/SepulcherEvents/Anduin";
import createVigilantEvents from "./BossEvents/SepulcherEvents/Vigilant";
import createXymoxEvents from "./BossEvents/SepulcherEvents/Xymox";
import createPantheonEvents from "./BossEvents/SepulcherEvents/Pantheon";
import createDesaugneEvents from "./BossEvents/SepulcherEvents/Desaugne";
import createShriekwingEvents from "./BossEvents/NathriaEvents/Shriekwing";
import createHuntsmanEvents from "./BossEvents/NathriaEvents/Huntsman";
import createHungeringEvents from "./BossEvents/NathriaEvents/Hungering";
import createNathriaXymoxEvents from "./BossEvents/NathriaEvents/NathriaXymox";
import createDarkveinEvents from "./BossEvents/NathriaEvents/Darkvein";
import createSunKingEvents from "./BossEvents/NathriaEvents/SunKing";
import createCouncilOfBloodEvents from "./BossEvents/NathriaEvents/CouncilOfBlood";
import createSludgefistEvents from "./BossEvents/NathriaEvents/SludgeFist";
import createStoneLegionEvents from "./BossEvents/NathriaEvents/StoneLegion";
import createDenathriusEvents from "./BossEvents/NathriaEvents/Denathrius";
import createEyeEvents from "./BossEvents/SanctumEvents/EyeOfTheJailer";
import createNineEvents from "./BossEvents/SanctumEvents/TheNine";
import createRemnantEvents from "./BossEvents/SanctumEvents/RemnantOfNerzhul";
import createSoulrenderEvents from "./BossEvents/SanctumEvents/Soulrender";
import createPainsmithEvents from "./BossEvents/SanctumEvents/Painsmith";
import createFatescribeEvents from "./BossEvents/SanctumEvents/Fatescribe";
import createKelthuzadEvents from "./BossEvents/SanctumEvents/Kelthuzad";
import createGuardianEvents from "./BossEvents/SanctumEvents/Guardian";
import createSylvanusEvents from "./BossEvents/SanctumEvents/Sylvanus";
import createEranogEvents from "./BossEvents/VaultOfTheIncarnatesEvents/1. Eranog";
import createTerrosEvents from "./BossEvents/VaultOfTheIncarnatesEvents/2. Terros";
import createPrimalistCouncilEvents from "./BossEvents/VaultOfTheIncarnatesEvents/3. PrimalistCouncil";
import createSennarthEvents from "./BossEvents/VaultOfTheIncarnatesEvents/4. Sennarth";
import createDatheaEvents from "./BossEvents/VaultOfTheIncarnatesEvents/5. Dathea";
import createKurogEvents from "./BossEvents/VaultOfTheIncarnatesEvents/6. KurogGrimtotem";
import createBroodkeeperEvents from "./BossEvents/VaultOfTheIncarnatesEvents/7. BroodKeeperDiurna";
import createRaszagethEvents from "./BossEvents/VaultOfTheIncarnatesEvents/8. Raszageth";
import createAmalgamationEvents from "./BossEvents/AbberusEvents/2. AmalgamationChamber";
import createForgottenExperimentEvents from "./BossEvents/AbberusEvents/3. ForgottenExperiments";
import createMagmoraxEvents from "./BossEvents/AbberusEvents/7. Magmorax";
import createZskarnEvents from "./BossEvents/AbberusEvents/6. Zskarn";
import createNeltharionEvents from "./BossEvents/AbberusEvents/8. Neltharion";
import createRashokEvents from "./BossEvents/AbberusEvents/5. Rashok";
import createSarkarethEvents from "./BossEvents/AbberusEvents/9. Sarkareth";
import createGnarlrootEvents from "./BossEvents/AmirdrassilEvents/1. Gnarlroot";
import createIgiraEvents from "./BossEvents/AmirdrassilEvents/2. Igira";
import createVolcorossEvents from "./BossEvents/AmirdrassilEvents/3. Volcoross";
import createCouncilofDreamsEvents from "./BossEvents/AmirdrassilEvents/4. CouncilofDreams";
import createLarodarEvents from "./BossEvents/AmirdrassilEvents/5. Larodar";
import createNymueEvents from "./BossEvents/AmirdrassilEvents/6. Nymue";
import createSmolderonEvents from "./BossEvents/AmirdrassilEvents/7. Smolderon";
import createTindralSageswiftEvents from "./BossEvents/AmirdrassilEvents/8. TindralSageswift";
import createFyrakkEvents from "./BossEvents/AmirdrassilEvents/9. Fyrakk";

export default function createEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime) {
  let returnedEvents = [];

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Castle Nathria                                         */
  /* ---------------------------------------------------------------------------------------------- */
  /* ------------------------------------------ Shriekwing ------------------------------------------ */
  if (bossID === 2398) {
    returnedEvents = createShriekwingEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* -------------------------------------- Huntsman Altimor -------------------------------------- */
  if (bossID === 2418) {
    returnedEvents = createHuntsmanEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* ------------------------------------- Hungering Destroyer ------------------------------------ */
  if (bossID === 2383) {
    returnedEvents = createHungeringEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* --------------------------------------- Artificer Xymox -------------------------------------- */
  if (bossID === 2405) {
    returnedEvents = createNathriaXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2406) {
    returnedEvents = createDarkveinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2402) {
    returnedEvents = createSunKingEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2412) {
    returnedEvents = createCouncilOfBloodEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2399) {
    returnedEvents = createSludgefistEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2417) {
    returnedEvents = createStoneLegionEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2407) {
    returnedEvents = createDenathriusEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Sanctum of Domination                                     */
  /* ---------------------------------------------------------------------------------------------- */
  if (bossID === 2433) {
    returnedEvents = createEyeEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2429) {
    returnedEvents = createNineEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2432) {
    returnedEvents = createRemnantEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2434) {
    returnedEvents = createSoulrenderEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2430) {
    returnedEvents = createPainsmithEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2431) {
    returnedEvents = createFatescribeEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2422) {
    returnedEvents = createKelthuzadEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2436) {
    returnedEvents = createGuardianEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  if (bossID === 2435) {
    returnedEvents = createSylvanusEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */
  /* ------------------------------------------ Vigilant ------------------------------------------ */
  if (bossID === 2512) {
    returnedEvents = createVigilantEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  if (bossID === 2540) {
    returnedEvents = createDesaugneEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* -------------------------------------------- Xymox ------------------------------------------- */
  if (bossID === 2553) {
    returnedEvents = createXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* ------------------------------------------ Pantheon ------------------------------------------ */
  if (bossID === 2544) {
    returnedEvents = createPantheonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* ------------------------------------------- Anduin ------------------------------------------- */
  if (bossID === 2546) {
    returnedEvents = createAnduinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* ------------------------------------------- Rygelon ------------------------------------------- */
  if (bossID === 2549) {
    returnedEvents = createRygelonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }
  /* ------------------------------------------- Jailer ------------------------------------------- */
  if (bossID === 2537) {
    returnedEvents = createjailerEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ------------------------------------------- Eranog ------------------------------------------- */
  if (bossID === 2587) {
    returnedEvents = createEranogEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ------------------------------------------- Terros ------------------------------------------- */
  if (bossID === 2639) {
    returnedEvents = createTerrosEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* -------------------------------------- Primalist Council ------------------------------------- */
  if (bossID === 2590) {
    returnedEvents = createPrimalistCouncilEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ------------------------------------------ Sennarth ------------------------------------------ */
  if (bossID === 2592) {
    returnedEvents = createSennarthEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ------------------------------------------- Dathea ------------------------------------------- */
  if (bossID === 2635) {
    returnedEvents = createDatheaEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* -------------------------------------------- Kurog ------------------------------------------- */
  if (bossID === 2605) {
    returnedEvents = createKurogEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ----------------------------------------- Broodkeeper ---------------------------------------- */
  if (bossID === 2614) {
    returnedEvents = createBroodkeeperEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ------------------------------------------ Raszageth ----------------------------------------- */
  if (bossID === 2607) {
    returnedEvents = createRaszagethEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ---------------------------------- The Amalgamation Chamber ---------------------------------- */
  if (bossID === 2687) {
    returnedEvents = createAmalgamationEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ---------------------------------- The Forgotten Experiments --------------------------------- */
  if (bossID === 2693) {
    returnedEvents = createForgottenExperimentEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* ------------------------------------------ Magmorax ------------------------------------------ */
  if (bossID === 2683) {
    returnedEvents = createMagmoraxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  /* -------------------------------- The Vigilant Steward, Zskarn -------------------------------- */
  if (bossID === 2689) {
    returnedEvents = createZskarnEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  if (bossID === 2680) {
    returnedEvents = createRashokEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  if (bossID === 2684) {
    returnedEvents = createNeltharionEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime);
  }

  if (bossID === 2685) {
    returnedEvents = createSarkarethEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }

  /* -------------------------------- Gnarlroot ------------------------------- */
  if (bossID === 2820) {
    returnedEvents = createGnarlrootEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* ----------------------------- Igira the Cruel ---------------------------- */
  if (bossID === 2709) {
    returnedEvents = createIgiraEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* -------------------------------- Volcoross ------------------------------- */
  if (bossID === 2737) {
    returnedEvents = createVolcorossEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* ---------------------------- Council of Dreams --------------------------- */
  if (bossID === 2728) {
    returnedEvents = createCouncilofDreamsEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* ---------------------- Larodar, Keeper of the Flame ---------------------- */
  if (bossID === 2731) {
    returnedEvents = createLarodarEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* ----------------------- Nymue, Weaver of the Cycle ----------------------- */
  if (bossID === 2708) {
    returnedEvents = createNymueEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* -------------------------------- Smolderon ------------------------------- */
  if (bossID === 2824) {
    returnedEvents = createSmolderonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* ------------------ Tindral Sageswift, Seer of the Flame ------------------ */
  if (bossID === 2786) {
    returnedEvents = createTindralSageswiftEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }
  /* --------------------------- Fyrakk the Blazing --------------------------- */
  if (bossID === 2677) {
    returnedEvents = createFyrakkEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy);
  }

  return returnedEvents;
}
