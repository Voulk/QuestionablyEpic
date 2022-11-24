// import Player from "../../../../General/Modules/Player/Player";
// import SPEC from "../../../../General/Engine/SPECS";
// import { STAT, STATPERONEPERCENT } from "../../../../General/Engine/STAT";
// import { convertPPMToUptime, getBestWeaponEnchant } from "../EffectUtilities";
// import { getPaladinCovAbility } from "Retail/Engine/EffectFormulas/Paladin/PaladinMiscFormulas";

// /* ---------------------------------------------------------------------------------------------- */
// /*                                    Generic Soulbind Effects                                    */
// /* ---------------------------------------------------------------------------------------------- */
// /*
// All specs use the same set of Soulbinds and so the formulas contained are for all six.
// You can refer to a players spec if the formula should differ between them,
// for example an interrupt specific Soulbind might represent some gain for Shaman while being useless for the other five.
    
// Durations of buffs can also change between specs, especially if the
// soulbind is procced by using your Covenant ability.
// */

// export function getSoulbindFormula(effectID, player, contentType) {
//   let bonus_stats = {};

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                         === KYRIAN ===                                         */
//   /* ---------------------------------------------------------------------------------------------- */

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                          -- Pelagos --                                         */
//   /* ---------------------------------------------------------------------------------------------- */

//   if (
//     /* -------------------------------------- Combat Meditation ------------------------------------- */
//     effectID === 328266
//   ) {
//     /*
//     Activating your Kyrian class ability increases your mastery by X for Y seconds.
//     You occasionally expel sorrowful memories which can be walked through to extend the effect by 3 seconds.
//     */
//     let expectedUptime = (30 + 9 * 2) / 180;
//     bonus_stats.Mastery = 315 * expectedUptime;
//   } else if (
//     /* --------------------------------------- Focusing Mantra -------------------------------------- */
//     effectID === 328261
//   ) {
//     /*
//     Left as 0 for now. While you might occasionally get some value from being able to vial slightly earlier, this is honestly
//     just going to be 0 throughput in most cases.
//     */
//     bonus_stats.HPS = 0;
//   } else if (
//     /* -------------------------------------- Phial of Patience ------------------------------------- */
//     effectID === 329777
//   ) {
//       /*
//       Your Phial heals for 35% additional health, but over 10 seconds.
//       */
//       let expected_overhealing = 0.55;
//       let healing_bonus = player.getHealth() * 0.35;
//       let uses_per_combat = 1.5;

//       bonus_stats.HPS = (healing_bonus * uses_per_combat * (1 - expected_overhealing)) / player.getFightLength(contentType); // Placeholder.
//   } else if (
//     /* ------------------------------------- Let go of the Past ------------------------------------- */
//     effectID === 328257
//   ) {
//     /*
//     This was changed to a small magic damage DR and is given no value currently.
//     Will likely be included when the stats panel expands to offer more specific detail.
//     */
//     bonus_stats.HPS = 0;
//   } else if (
//     /* --------------------------------------- Better Together -------------------------------------- */
//     effectID === 351146
      
//   ) {
//       bonus_stats.Mastery = 40;
//   } else if (
//     /* ------------------------------------- Path of the Devoted ------------------------------------ */
//     effectID === 351147
//   ) {
//   } else if (
//     /* -------------------------------------- Newfound Resolve -------------------------------------- */
//     effectID === 351149
//   ) {
//       const duration = 10;
//       const expectedUptime = duration / (3 * 30); // 30 card deck with 1 success. Card drawn every 3 seconds.
//       const buffPercentage = 0.10;

//       bonus_stats.Intellect = buffPercentage * player.getInt() * expectedUptime;

//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                           -- Kleia --                                          */
//   /* ---------------------------------------------------------------------------------------------- */
//   //prettier-ignore
//   else if (
//     /* --------------------------------------- Valiant Strikes -------------------------------------- */
//     effectID === 329791
//   ) {
//     let average_health_pool = player.getHealth(); // The players health is an acceptable average for an average target.
//     let ppm = 0.49; // POSTLIVE: Check against logs.

//     bonus_stats.HPS = (average_health_pool * 0.2 * ppm) / 60;
//   } else if (
//     /* --------------------------------------- Cleansing Rites -------------------------------------- */
//     effectID === 329784
//   ) {
//     let health_pool = player.getHealth(contentType);

//     bonus_stats.HPS = (health_pool * 0.1) / player.getFightLength(contentType);
//   } else if (
//     /* --------------------------------------- Pointed Courage -------------------------------------- */
//     effectID === 329778
//   ) {
//     const expected_allies = contentType === "Raid" ? 4.8 : 3.1;
//     const critPerAlly = STATPERONEPERCENT.Retail.CRIT * 2; // This was advertised as being buffed to 2% crit, stacking up to 3 allies but doesn't behave this way on the PTR yet.

//     bonus_stats.Crit = Math.min(expected_allies, 3) * critPerAlly;
//   } else if (
//     /* ------------------------------------- Resonant Accolades ------------------------------------- */
//     effectID === 329781
//   ) {
//     /*
//     This one needs a check against log. It can obviously never exceed 4% total healing but is likely to be much less.
//     */
//     let percent_healing_above_70 = 0.7;
//     let expected_overhealing = 0.5;
//     let effect_power = 0.04;

//     bonus_stats.HPS = player.getHPS(contentType) * percent_healing_above_70 * (1 - expected_overhealing) * effect_power;
//   } else if (
//     /* ------------------------------------- Spear of the Archon ------------------------------------ */
//     effectID === 351488
//   ) {
//       const critValue = 3 * STATPERONEPERCENT.Retail.CRIT
//       const uptime = (player.getFightLength(contentType) * 0.1) / player.getFightLength(contentType); // The buff is effectively just up for the first 10% of the fight. Not great.
//       bonus_stats.Crit = critValue * uptime;

//   } else if (
//     /* ------------------------------------ Hope Springs Eternal ------------------------------------ */
//     effectID === 351489
//   ) {
//       const onePhial = player.getHealth() * 0.2; // DR portion not accounted for.

//       bonus_stats.HPS = onePhial * 3 / player.getFightLength(contentType);
//   } else if (
//     /* --------------------------------------- Light the Path --------------------------------------- */
//     effectID === 351491
//   ) {
//     const ppm = 0.54
//     const stackTimer = 1.64 // Time it takes to get one stack. It has a 1.5s ICD.
//     const cycleLength = 60/ppm + 60;
//     const percentFull = ((60/ppm) - (20 * stackTimer)) / (cycleLength);
//     const percentStacking = (20 * stackTimer) / (cycleLength);
//     const averageValiantStacks = (20 / 2 * percentStacking) + (20 * percentFull);
//     const critPerStack = 0.25 * STATPERONEPERCENT.Retail.CRIT

//     bonus_stats.Crit = (critPerStack * averageValiantStacks) + (5 * STATPERONEPERCENT.Retail.CRIT * 15 * ppm) / 60

//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                         -- Mikanikos --                                        */
//   /* ---------------------------------------------------------------------------------------------- */
//   /*
//   Why does Mikanikos have so few throughput traits =( Poor Mikanikos.
//   */

//   //prettier-ignore
//   else if (
//     /* ------------------------------------ Bron's Call to Action ----------------------------------- */
//     effectID === 333950
//   ) {
//     /*
//     DOES reset stacks on raid boss pull. Doesn't in Mythic+.
//     */
    
//     const stackTimer = 1.4 // Time it takes to get one stack. It has a 0.1s ICD and doesn't build while Bron is active.
//     const base_ppm = 60 / (stackTimer * 75);
//     const buildTime = 75 * stackTimer;
//     const cycleLength = buildTime + 30;
//     const ppmAdj = buildTime / cycleLength;
//     const brons_per_minute = base_ppm * (ppmAdj);

//     let bron_sp = player.activeStats.intellect * 2 * 1.1;
//     let anima_cannon_dps = 0.55 * bron_sp * 3; //* player.getStatMultiplier("", ['Crit', 'Vers'])
//     let smash_dps = 0.25 * bron_sp * 1;
//     let vit_bolt_hps = 0.575 * bron_sp * 8;

//     bonus_stats.HPS = (brons_per_minute * vit_bolt_hps * player.getStatMultiplier(["Crit", "Versatility"])) / 60;
//   } else if (
//     /* -------------------------------------- Hammer of Genesis ------------------------------------- */
//     effectID === 333935
//   ) {
//   } else if (
//     /* ------------------------------------ Soulglow Spectrometer ----------------------------------- */
//     effectID === 352186
//   ) {
//   } else if (
//     /* ------------------------------------ Reactive Retrofitting ----------------------------------- */
//     effectID === 352187
//   ) {
//   } else if (
//     /* --------------------------------- Effusive Anima Accelerator --------------------------------- */
//     effectID === 352188
//   ) {
//       const reductionPerTarget = 0.06667;
//       const expectedTargets = {Raid: 1, Dungeon: 3.9};
      
//       if (player.getSpec() === "Holy Paladin") {
//         const oneDivineToll = getPaladinCovAbility("Mikanikos", player, contentType);

//         bonus_stats.HPS = oneDivineToll['HPS'] * (reductionPerTarget * expectedTargets[contentType]);
//     }

//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                        === Night Fae ===                                       */
//   /* ---------------------------------------------------------------------------------------------- */

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                           -- Niya --                                           */
//   /* ---------------------------------------------------------------------------------------------- */
//   //prettier-ignore
//   else if (
//     /* ------------------------------------- Grove Invigoration ------------------------------------- */
//     effectID === 322721
//   ) {
//     let expectedStacks = (2 * 30) / 60 + (8 * 30) / 120;

//     bonus_stats.Mastery = expectedStacks * 25;
//   } else if (
//     /* ------------------------------------- Run without Tiring ------------------------------------- */
//     effectID === 342270
//   ) {
//   } else if (
//     /* ------------------------------------- Niya's Tools: Burrs ------------------------------------ */
//     effectID === 320659
//   ) {
//   } else if (
//     /* ------------------------------------- Niya's Tools: Herbs ------------------------------------ */
//     effectID === 320662
//   ) {
//     /*
//     This is basically 100% uptime on one target at a time. Team benefit is included.
//     */
//     bonus_stats.Haste = 4.85 * STATPERONEPERCENT.Retail.HASTE;
//   } else if (
//     /* ----------------------------------------- Called Shot ---------------------------------------- */
//     effectID === 352501
//   ) {
//   } else if (
//     /* -------------------------------------- Survivor's Rally -------------------------------------- */
//     effectID === 352502
//   ) {
//     const expectedPPM = 0.67 // 1 minute ICD, high proc chance because 80% is a high threshold. 
//     const playerHealth = player.getHealth(contentType);
//     bonus_stats.HPS = expectedPPM * playerHealth * 0.2 / 60;
//   } else if (
//     /* ---------------------------------------- Bonded Hearts --------------------------------------- */
//     effectID === 352503
//   ) {
//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                        -- Dreamweaver --                                       */
//   /* ---------------------------------------------------------------------------------------------- */
//   //prettier-ignore
//   else if (
//     /* ------------------------------------------ Podtender ----------------------------------------- */
//     effectID === 333950
//   ) {
//     /*
//     TODO: We'll see. The approaches to this one is maybe you have a "chance of death" and then include the healing portion but I'm not convinced
//     that you get a great picture from that.
//     It's a good trait, but not for HPS reasons.
//      */
//   } else if (
//     /* -------------------------------------- Social Butterfly -------------------------------------- */
//     effectID === 319210
//   ) {
//     let expectedUptime = 1; // POSTLIVE: Check if this is falling off often in either content type.

//     bonus_stats.Versatility = 1.5 * 40 * expectedUptime;
//   } else if (
//     /* ------------------------------------- Empowered Chrysalis ------------------------------------ */
//     effectID === 319213
//   ) {
//     /*
//     TODO: Expand to include overhealing on yourself.
//     Double check the shield_consumed is a fair approximation.
//     */
//     let trait_bonus = 0.1;
//     let shield_consumed = contentType == "Raid" ? 0.78 : 0.3; // The percentage of our overhealing shield that gets consumed. Likely to be very high.
//     let overhealing = player.getRawHPS(contentType) - player.getHPS(contentType);

//     bonus_stats.HPS = trait_bonus * shield_consumed * overhealing;
//   } else if (
//     /* -------------------------------------- Field of Blossoms ------------------------------------- */
//     effectID === 319191
//   ) {
//     let expectedUptime = (1 / 6) * 0.64; // Likely needs fight-by-fight expected uptimes.
//     bonus_stats.Haste = 12 * STATPERONEPERCENT.Retail.HASTE * expectedUptime;
//   } else if (
//     /* --------------------------------------- Cunning Dreams --------------------------------------- */
//     effectID === 352782
//   ) {
//   } else if (
//     /* ---------------------------------------- Waking Dreams --------------------------------------- */
//     effectID === 352779
//   ) {
//       const expectedPPM = 0.74 // 1 minute ICD, high proc chance because 80% is a high threshold. 
//       const playerHealth = player.getHealth();
//       bonus_stats.HPS = expectedPPM * playerHealth * 0.2 / 60;

//   } else if (
//     /* ---------------------------------------- Dream Delver ---------------------------------------- */
//     effectID === 352786
//   ) {

//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                          -- Korayn --                                          */
//   /* ---------------------------------------------------------------------------------------------- */
//   /*
//   (Mikanikos V2)
//   */
//   //prettier-ignore
//   else if (
//     /* -------------------------------------- Wild Hunt Tactics ------------------------------------- */
//     effectID === 325066
//   ) {
//   } else if (
//     /* ---------------------------------------- First Strike ---------------------------------------- */
//     effectID === 325069
//   ) {
//   } else if (
//     /* ---------------------------------------- Vorkai Ambush --------------------------------------- */
//     effectID === 352800
//   ) {
//   } else if (
//     /* ------------------------------------- Hunt's Exhilaration ------------------------------------ */
//     effectID === 352806
//   ) {
//   } else if (
//     /* ------------------------------------- Wild Hunt Strategem ------------------------------------ */
//     effectID === 352805
//   ) {
//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                         === Venthyr ===                                        */
//   /* ---------------------------------------------------------------------------------------------- */

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                          -- Nadjia --                                          */
//   /* ---------------------------------------------------------------------------------------------- */

//   //prettier-ignore
//   else if (
//     /* ---------------------------------------- Thrill Seeker --------------------------------------- */
//     effectID === 331586
//   ) {
//     let average_uptime = 10 / 80;

//     bonus_stats.Haste = average_uptime * 20 * STATPERONEPERCENT.Retail.HASTE;
//   } else if (
//     /* ------------------------------------ Exacting Preparation ------------------------------------ */
//     effectID === 331580
//   ) {
//     let flask_int = 70;
//     let feast_int = 18; // Should add something to offer an option of non-int food, but they are very close.
//     let enchant_int = getBestWeaponEnchant(player, contentType);

//     bonus_stats.Intellect = (flask_int + feast_int + enchant_int) * 0.2;
//   } else if (
//     /* -------------------------------------- Dauntless Duelist ------------------------------------- */
//     effectID === 331584
//   ) {
//     /*
//     3% damage to one target + 1.5% DR. No value currently assigned to DR and it's unlikely you would take this as a healer.
//     */
//   } else if (
//     /* ------------------------------------- Sinful Preservation ------------------------------------ */
//     effectID === 352405
//   ) {
//   } else if (
//     /* ---------------------------------------- Nimble Steps ---------------------------------------- */
//     effectID === 352366
//   ) {
//   } else if (
//     /* ----------------------------------------- Fatal Flaw ----------------------------------------- */
//     effectID === 352373
//   ) {
//   }
//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                   -- Theotar the Mad Duke --                                   */
//   /* ---------------------------------------------------------------------------------------------- */

//   //prettier-ignore
//   else if (
//     /* --------------------------------------- Soothing Shade --------------------------------------- */
//     effectID === 336239
//   ) {
//     let chanceOfMovement = 0.1;
//     let uptime = convertPPMToUptime(1, 12) * (1 - chanceOfMovement);

//     bonus_stats.Mastery = uptime * 525;
//   } else if (
//     /* ------------------------------------ Token of Appreciation ----------------------------------- */
//     effectID === 336245
//   ) {
//     const expectedPPM = 9.72; // ~3.9 targets getting an absorb every ~25 seconds.
//     const healAmount = player.getInt() * 1.5 * player.getStatPerc("Versatility"); // TODO: Implement the Spell Power -> Attack Power conversion.
//     const expectedWastage = 0.04; // Unused shields. Very low.

//     bonus_stats.HPS = (expectedPPM * healAmount * (1 - expectedWastage)) / 60;
//   } else if (
//     /* --------------------------------------- Refined Palate --------------------------------------- */
//     effectID === 336243
//   ) {
//   } else if (
//     /* ------------------------------------- Wasteland Propriety ------------------------------------ */
//     effectID === 319983
//   ) {
//     bonus_stats.Versatility = 6 * STATPERONEPERCENT.Retail.VERSATILITY * (10 / 60); // Arguably some classes won't be able to proc this on cooldown because of misaligned CDs but we'll see.
//   } else if (
//     /* ------------------------------------ It's Always Tea Time ------------------------------------ */
//     effectID === 351747
//   ) {
//   } else if (
//     /* ---------------------------------- Life is but an Appetizer ---------------------------------- */
//     effectID === 351748
//   ) {
//   } else if (
//     /* ---------------------------------------- Party Favors ---------------------------------------- */
//     effectID === 351750
//   ) {
//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                      -- General Draven --                                      */
//   /* ---------------------------------------------------------------------------------------------- */

//   //prettier-ignore
//   else if (
//     /* -------------------------------------- Service in Stone -------------------------------------- */
//     effectID === 340159
//   ) {
//   } else if (
//     /* --------------------------------------- Enduring Gloom --------------------------------------- */
//     effectID === 319978
//   ) {
//   } else if (
//     /* -------------------------------------- Hold Your Ground -------------------------------------- */
//     effectID === 332754
//   ) {
//     const spec = player.getSpec();
//     const expected_uptime = player.getSpecialQuery("HoldYourGroundUptime", contentType);
//     const percentHealingAffected = 1; // The Disc Priest bug has been fixed.

//     bonus_stats.HPS = expected_uptime * (player.getHPS(contentType) * 0.04 * percentHealingAffected);
//   } else if (
//     /* -------------------------------------- Superior Tactics -------------------------------------- */
//     effectID === 332753
//   ) {
//   } else if (
//     /* ---------------------------------------- Built for War --------------------------------------- */
//     effectID === 319973
//   ) {
//     let expected_stacks = 3.65;
//     bonus_stats.Intellect = expected_stacks * player.activeStats.intellect * 0.01;
//   } else if (
//     /* ----------------------------------- Regenerative Stone Skin ---------------------------------- */
//     effectID === 352365
//   ) {
//   } else if (
//     /* ------------------------------------ Intimidation Tactics ------------------------------------ */
//     effectID === 352415
//   ) {
//   } else if (
//     /* ------------------------------------ Battlefield Presence ------------------------------------ */
//     effectID === 352417
//   ) {
//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                        === Necrolord ===                                       */
//   /* ---------------------------------------------------------------------------------------------- */

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                         -- Marileth --                                         */
//   /* ---------------------------------------------------------------------------------------------- */

//   //prettier-ignore
//   else if (
//     /* -------------------------------------- Volatile Solvent -------------------------------------- */
//     effectID === 323074
//   ) {
//   } else if (
//     /* --------------------------------- Ooz's Frictionless Coating --------------------------------- */
//     effectID === 323091
//   ) {
//   } else if (
//     /* --------------------------------- Plague'ys Preemptive Strike -------------------------------- */
//     effectID === 323090
//   ) {
//   } else if (
//     /* ---------------------------------------- Ultimate Form --------------------------------------- */
//     effectID === 323095
//   ) {
//   } else if (
//     /* ---------------------------------------- Viscous Trail --------------------------------------- */
//     effectID === 352108
//   ) {
//   } else if (
//     /* ------------------------------------ Undulating Maneuvers ------------------------------------ */
//     effectID === 352109
//   ) {
//   } else if (
//     /* -------------------------------------- Kevin's Oozeling -------------------------------------- */
//     effectID === 352110
//   ) {
//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                           -- Emeni --                                          */
//   /* ---------------------------------------------------------------------------------------------- */

//   //prettier-ignore
//   else if (
//     /* --------------------------------------- Lead by Example -------------------------------------- */
//     effectID === 342156
//   ) {
//     let total_bonus = 0.05 + 0.02 * 4;
//     total_bonus += 0.02 * 4; // The buff TO your party. Treated as your own.
//     let uptime = 1 / 6;

//     bonus_stats.Intellect = player.activeStats.intellect * total_bonus * uptime;
//   } else if (
//     /* -------------------------------------- Gnashing Chompers ------------------------------------- */
//     effectID === 323919
//   ) {
//     /*
//     TODO: Implement
//     This will need to be implemented for Mythic+ primarily. It's raid value will really only play up on 1-2 fights.
//     Probably needs to be a fight specific formula.
//     */
//   } else if (
//     /* ----------------------------------------- Sole Slough ---------------------------------------- */
//     effectID === 351089
//   ) {
//   } else if (
//     /* ------------------------------------- Resilient Stitching ------------------------------------ */
//     effectID === 351093
//   ) {
//   } else if (
//     /* -------------------------------------- Pustule Eruption -------------------------------------- */
//     effectID === 351094
//   ) {
//   }

//   /* ---------------------------------------------------------------------------------------------- */
//   /*                                     -- Bonesmith Heirmir --                                    */
//   /* ---------------------------------------------------------------------------------------------- */
//   //prettier-ignore
//   else if (
//     /* ------------------------------------- Forgeborne Reveries ------------------------------------ */
//     effectID === 326514
//   ) {
//     bonus_stats.Intellect = player.activeStats.intellect * 0.03;
//   } else if (
//     /* ---------------------------- Heirmir's Arsenal: Marrowed Gemstone ---------------------------- */
//     effectID === 326572
//   ) {
//     /*
//     TODO, work out if you can collect stacks when it's on cooldown, or if the 10 crits have to take place after the cooldown.
//     The uptime won't change much regardless but it'll be of slight impact.
//     */
//     let uptime = 10 / 81;

//     bonus_stats.Crit = STATPERONEPERCENT.Retail.CRIT * 18 * uptime;
//   } else if (
//     /* ---------------------------------------- Carver's Eye ---------------------------------------- */
//     effectID === 350899
//   ) {
//   } else if (
//     /* ----------------------------------- Waking Bone Breastplate ---------------------------------- */
//     effectID === 350935
//   ) {
//   } else if (
//     /* ------------------------------------- Mnemonic Equipment ------------------------------------- */
//     effectID === 350936
//   ) {
//   }

//   return bonus_stats;
// }
