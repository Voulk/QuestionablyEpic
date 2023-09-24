
import { DISCCONSTANTS } from "./DiscPriestRamps";

/**
* This function handles all of our effects that might change our spell database before the ramps begin.
* It includes conduits, legendaries, and some trinket effects.
* 
* @param {*} discSpells Our spell database
* @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
* @param {*} talents The talents run in the current set.
* @returns An updated spell database with any of the above changes made.
*/
export const applyLoadoutEffects = (discSpells, settings, talents, state, stats) => {

   // ==== Default Loadout ====
   // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
   // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
   // we don't have full information about a character.
   // As always, Top Gear is able to provide a more complete picture. 
   if (settings['DefaultLoadout']) {
       settings['T31_2'] = true;
       settings['T31_4'] = true;

   }

   // ==== Talents ====
   // Not all talents just make base modifications to spells, but those that do can be handled here.

   if (talents.throesOfPain) {
       // ASSUMPTION: Throes of Pain should work on both DoTs but let's double check anyway.
       discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.025 * talents.throesOfPain);
       discSpells['Purge the Wicked'][0].coeff *= (1 + 0.025 * talents.throesOfPain);

       discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.025 * talents.throesOfPain);
       discSpells['Purge the Wicked'][1].coeff *= (1 + 0.025 * talents.throesOfPain);
   }

   // Disc specific talents.
   // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.

   // Tier 1 talents

   if (talents.painfulPunishment) {
       // Add a DoT extension to PenanceTick
       discSpells['PenanceTick'].push({
           type: "buffExtension",
           buffName: "Shadow Word: Pain",

           extension: 1.5,
       })
       discSpells['PenanceTick'].push(
       {
           type: "buffExtension",
           buffName: "Purge the Wicked",
           extension: 1.5,
        })
   }
   if (talents.sanctuary) {
        discSpells['Smite'].push({
            name: "Smite (Sanctuary)",
            type: "heal",
            coeff: 0.8,
            secondaries: ['vers'],
            overheal: 0.03,
        });
   }
   if (talents.schism) {
        // Adds Schisms former effect to Mind Blast
        discSpells['Mind Blast'].push({
            type: "buff",
            buffDuration: 9,
            buffType: "special",
            value: 1.1,
            name: "Schism",
            canStack: false,
        });
   }
   if (talents.maliciousIntent) discSpells['Schism'][1].buffDuration += 6;
   if (talents.enduringLuminescence) {
        discSpells['Power Word: Radiance'][0].atonement *= 1.1;
        discSpells['Power Word: Radiance'][0].castTime /= 1.3;
   }
   if (talents.shieldDiscipline) discSpells['Power Word: Shield'][0].cost -= (0.5 * DISCCONSTANTS.shieldDisciplineEfficiency);

   // Tier 2 talents
   if (talents.revelInPurity) {
       discSpells['Purge the Wicked'][0].coeff *= (1 + 0.05 * talents.revelInPurity);
       discSpells['Purge the Wicked'][1].coeff *= (1 + 0.05 * talents.revelInPurity);
   }
   if (talents.exaltation) {
       discSpells['Rapture'][1].buffDuration += 5;
   }
   if (talents.painAndSuffering) {
       // ASSUMPTION: Throes of Pain should work on both DoTs but let's double check anyway.
       discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.075 * talents.painAndSuffering);
       discSpells['Purge the Wicked'][0].coeff *= (1 + 0.075 * talents.painAndSuffering);
       discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.075 * talents.painAndSuffering);
       discSpells['Purge the Wicked'][1].coeff *= (1 + 0.075 * talents.painAndSuffering);
   }
   if (talents.borrowedTime) {
       discSpells['Power Word: Shield'].push({
           type: "buff",
           buffType: 'statsMult',
           stat: 'haste',
           value: (1 + 0.04 * talents.borrowedTime), // This is equal to 4% haste.
           buffDuration: 4,
       })

   }
   if (talents.indemnity) discSpells['Power Word: Shield'][0].atonement += 2;
   if (talents.castigation) {
       discSpells['Penance'][0].bolts += 1;
       discSpells['DefPenance'][0].bolts += 1;
   }
   if (talents.contrition) {
       discSpells['DefPenanceTick'].push({
           type: "function",
           runFunc: function (state, atonementApp) {
               const atonementCount = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
               const spell = {type: "heal", coeff: 0.0936 * talents.contrition, overheal: 0.2, secondaries: ['crit', 'vers', 'mastery'], targets: atonementCount}
               runHeal(state, spell, "Contrition");
           }
       })
   }
   //if (talents.stolenPsyche) discSpells['Mind Blast'][0].atonementBonus = (1 + 0.2 * talents.stolenPsyche);

   // Tier 3 talents
   if (talents.trainOfThought) {
       // Can be mostly handled in RampGen.
       discSpells['Smite'].push({
        type: "cooldownReduction",
        cooldownReduction: 0.5,
        targetSpell: "Penance",
       })
   }
   if (talents.blazeOfLight) {
       //+7.5% to Penance / Smite.
       discSpells['Penance'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
       discSpells['Smite'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
   }
   if (talents.divineAegis) {
       // Can either just increase crit mod, or have it proc on all healing events as a separate line (too messy?).
       // Note that we increase our crit modifier by twice the amount of Divine Aegis since it's a wrapper around the entire crit.
       stats.critMult *= (1 + 0.1 * talents.divineAegis);
       // TODO: PW:S Crit mod
   }
   /*
   if (talents.wrathUnleashed) {
       discSpells["Light's Wrath"][0].castTime -= 1;
       discSpells["Light's Wrath"][0].critMod = 0.15;
       discSpells["Light's Wrath"].push({
           type: "buff",
           name: "Wrath Unleashed",
           buffType: 'special',
           value: 1.4, //
           buffDuration: 15,
       }) 
       // TODO: Add Smite buff
   }*/
   if (talents.harshDiscipline && settings.harshDiscipline) {
       // Can probably just add a buff on sequence start for the first Penance.
       state.activeBuffs.push({name: "Harsh Discipline", expiration: 999, buffType: "special", value: 3, stacks: 1, canStack: false})
   }
   if (talents.expiation) {
       discSpells["Mind Blast"][0].coeff *= (1 + 0.1 * talents.expiation);
       discSpells["Shadow Word: Death"][0].coeff *= (1 + 0.1 * talents.expiation);
       // TODO: Add special function to Mindblast / SWD spell that consumes SWP
       discSpells["Mind Blast"].push(
       {
           type: "function",
           runFunc: function (state, atonementApp) {
               const temp = state.activeBuffs.filter(buff => buff.name === "Purge the Wicked" || buff.name === "Shadow Word: Pain");
               if (temp.length > 0) {
                   const expiationDuration = 3 * talents.expiation;
                   const buff = temp[0];

                   const ticks = Math.min(expiationDuration, (buff.expiration - state.t)) / buff.tickRate; // TODO: Add Haste
                   const attSpell = {...buff.attSpell};
                   attSpell.coeff *= ticks;

                   runDamage(state, attSpell, "Expiation", atonementApp);

                   buff.expiration -= expiationDuration;
                   if (state.t > buff.expiration) {
                       removeBuffStack(state.activeBuffs, "Purge the Wicked");
                       removeBuffStack(state.activeBuffs, "Shadow Word: Pain");
                   }
               }

           }

       })
   }
   if (talents.darkIndulgence) {
       discSpells["Mind Blast"][0].cost *= 0.6; // 40% cost reduction.
       discSpells["Mind Blast"].push({name: "Power of the Dark Side", expiration: 999, buffType: "special", value: 1.5, stacks: 1, canStack: true});
   }
   if (talents.twilightEquilibrium) {
       // This is not required to be implemented here, and is done elsewhere.

   }
   if (talents.inescapableTorment) {
       // TODO: Add two spell components, an AoE damage spell and a Shadowfiend / Mindbender duration increase function spell component.
   }
    /*
   if (talents.twilightCorruption) {
       // Shadow Covenant increases damage / healing by an extra 10%.
       discSpells["Shadow Covenant"][1].value += 0.1;
   }*/
   if (talents.embraceShadow) {
        discSpells["Shadow Covenant"][1].buffDuration += 8;
   }

   // Passive Shadow Cov
   if (talents.shadowCovenant) {
    const shadowCov = {
        type: "buff",
        buffDuration: 15 + (8 * talents.embraceShadow),
        buffType: "special",
        value: 1.25 + (0.1 * talents.twilightCorruption),
        name: "Shadow Covenant",
        canStack: false,
    }
    discSpells["Mindbender"].push(shadowCov);
   }

   if (talents.crystallineReflection) {
       discSpells["Power Word: Shield"].push({
           name: "Crystalline Reflection",
           type: "heal",
           coeff: 0.42,
           secondaries: ['crit', 'vers', 'mastery'],
           overheal: 0.6,
       })
       discSpells["Rapture"].push({
           name: "Crystalline Reflection",
           type: "heal",
           coeff: 0.42,
           secondaries: ['crit', 'vers', 'mastery'],
           overheal: 0.6,
       })
   }
   if (talents.aegisOfWrath) {
       discSpells["Power Word: Shield"][0].coeff *= 1.3 * (1 - settings.aegisOfWrathWastage);
   }
   /*if (talents.makeAmends) {
       // We can kind of model this, but benefit isn't really going to be concentrated on ramps.
   }*/
   if (talents.shatteredPerceptions) {
       discSpells['Mindgames'][0].coeff *= 1.25;
       discSpells['Mindgames'][1].coeff *= 1.25;
   }
   if (talents.wealAndWoe) {
       // Penance bolts increase the damage of Smite by 8% per stack, or Power Word: Shield by 3% per stack.
       discSpells["PenanceTick"].push({
           type: "buff",
           name: "Weal & Woe",
           buffType: 'special',
           value: 1.12, // This is equal to 45% crit, though the stats are applied post DR. 
           buffDuration: 15,
           canStack: true,
           stacks: 1,
           maxStacks: 7,
       })
   }

   // Tier 4 talents
   if (talents.improvedFlashHeal) discSpells["Flash Heal"][0].coeff *= 1.15;
   if (talents.bindingHeals) {
       discSpells["Flash Heal"].push({
           type: "heal",
           coeff: discSpells["Flash Heal"][0].coeff * 0.2,
           atonement: 15,
           atonementPos: 'end',
           targets: 1,
           secondaries: ['crit', 'vers'],
           overheal: 0.5,
       })
   }

   // Settings
   if (settings.execute === "Always") discSpells["Shadow Word: Death"][0].coeff *= 2.5
   else if (settings.execute === "20% of the time") discSpells["Shadow Word: Death"][0].coeff *= (2.5 * 0.2 + 0.8);
       
   if (settings.T29_2) {
       // Power Word: Shield increases the damage of the next cast by 10%.
       discSpells["Power Word: Shield"].push({
           type: "buff",
           name: "Light Weaving",
           buffType: 'special',
           value: 1.1, // This is a 10% damage buff that's consumed on our next damage spell.
           buffDuration: 15,
           canStack: false,
           stacks: 1,
           maxStacks: 1,
       })
   }
   if (settings.T29_4) {
       // Power Word: Shield increases the damage of the next cast by 10%.
       discSpells["Penance"].push({
           type: "buff",
           name: "T29_4",
           buffType: 'special',
           value: 0, // This is a 10% damage buff that's consumed on our next damage spell.
           buffDuration: 15,
           canStack: false,
           stacks: 1,
           maxStacks: 1,
       })
   }


   // ==== Legendaries ====
   // Note: Some legendaries do not need to be added to a ramp and can be compared with an easy formula instead like Cauterizing Shadows.
   // Unity Note: Unity is automatically converted to the legendary it represents and should not have an entry here.

   // -- Penitent One --
   // Power Word: Radiance has a chance to make your next Penance free, and fire 3 extra bolts.
   // This is a close estimate, and could be made more accurate by tracking the buff and adding ticks instead of power.
   if (talents.evenfall2) { // TODO
       // Penitent One is a bit odd in that it is technically a percentage chance rather than a guarantee.
       // We could roll for the probability on Radiance cast but this is problematic because a weaker set could beat a stronger one
       // based on stronger rolls during Top Gear.
       // To get around this, we'll add the ticks always, but lower their strength according to the percentage chance to proc.
       // On a double radiance then we have an 84% chance to get a proc so we'll multiply our 3 extra Penance ticks by that number.

       // To recap:
       // Penance without proc: 3 ticks at 100% strength.
       // Penance with proc: 6 ticks at 100% strength.
       // Including probability: Penance with proc is 6 ticks at 92% strength (3 + 3 * 0.84)
       discSpells['Power Word: Radiance'].push({
           name: "Penitent One",
           type: "buff",
           buffType: "special",
           value: 6,
           buffDuration: 20,
           castTime: 0,
           stacks: 1,
           canStack: false, 
       });

   }

   // ==== Tier & Other Effects ====
   // Remember that anything that isn't wired into a ramp can just be calculated normally (like flat heal procs trinkets).

   // We might still opt to start them with a PotDS proc on major ramps since the chance of it being active is extremely high.
   // This is unnecessary with 4pc since we'll always have a PotDS proc during our sequences due to Radiance always coming before Penance.
   if (settings['Power of the Dark Side']) {
       state.activeBuffs.push({name: "Power of the Dark Side", expiration: 999, buffType: "special", value: 1.5, stacks: 1, canStack: true})
   }  
   
   // ==== Trinkets ====
   // These settings change the stat value prescribed to a given trinket. We call these when adding trinkets so that we can grab their value at a specific item level.
   // When adding a trinket to this section, make sure it has an entry in DiscSpellDB first prescribing the buff duration, cooldown and type of stat.
   //if (settings["Instructor's Divine Bell"]) discSpells["Instructor's Divine Bell"][0].value = settings["Instructor's Divine Bell"];
   if (settings["Voidmender's Shadowgem"]) discSpells["Voidmender's Shadowgem"][0].value = settings["Voidmender's Shadowgem"];
   //

   // Setup mana costs & cooldowns.
   for (const [key, value] of Object.entries(discSpells)) {
       let spell = value[0];

       if (!spell.targets) spell.targets = 1;
       if (spell.cooldown) spell.activeCooldown = 0;
       if (spell.cost) spell.cost = spell.cost * DISCCONSTANTS.baseMana / 100;

       if (settings.includeOverheal === "No") {
           value.forEach(spellSlice => {
               if ('overheal' in spellSlice) spellSlice.overheal = 0;
               if ('atoneOverheal' in spellSlice) spellSlice.atoneOverheal = 0;
           })

       }
   }

   // Set Rapture to Power Word: Shield.
   // That way anything that buffs PW:S will also buff Rapture.
   discSpells['Rapture'][0] = {...discSpells['Power Word: Shield'][0]};

   return discSpells;
}