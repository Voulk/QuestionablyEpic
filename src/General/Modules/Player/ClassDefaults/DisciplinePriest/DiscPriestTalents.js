
import { DISCCONSTANTS, runDamage } from "./DiscPriestRamps";
//import { removeBuffStack } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { removeBuffStack } from "General/Modules/Player/ClassDefaults/Generic/BuffBase"
/**
* This function handles all of our effects that might change our spell database before the ramps begin.
* It includes conduits, legendaries, and some trinket effects.
* 
* @param {*} discSpells Our spell database
* @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
* @param {*} talents The talents run in the current set.
* @returns An updated spell database with any of the above changes made.
*/
export const applyLoadoutEffects = (discSpells, settings, talents, state, stats, heroTree) => {

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
       discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.025 * talents.throesOfPain);
       discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.025 * talents.throesOfPain);
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
   }
   if (talents.sanctuary) {
        discSpells['Smite'].push({
            name: "Smite (Sanctuary)",
            type: "heal",
            coeff: 1,
            secondaries: ['vers'],
            expectedOverheal: 0.04,
        });
   }
   if (talents.schism) {
        // Adds Schisms former effect to Mind Blast
        discSpells['Mind Blast'].push({
            type: "buff",
            buffDuration: 9 + 6 * talents.maliciousIntent,
            buffType: "special",
            value: 1.1,
            name: "Schism",
            canStack: false,
        });
   }

   if (talents.enduringLuminescence) {
        discSpells['Power Word: Radiance'][0].atonement *= 1.1;
        discSpells['Power Word: Radiance'][0].castTime /= 1.3;
   }
   if (talents.shieldDiscipline) discSpells['Power Word: Shield'][0].cost -= (0.5 * DISCCONSTANTS.shieldDisciplineEfficiency);

   // Tier 2 talents
   if (talents.revelInDarkness) {
       discSpells['Purge the Wicked'][0].coeff *= (1 + 0.05 * talents.revelInPurity);
       discSpells['Purge the Wicked'][1].coeff *= (1 + 0.05 * talents.revelInPurity);
   }
   if (talents.painAndSuffering) {
       // ASSUMPTION: Throes of Pain should work on both DoTs but let's double check anyway.
       discSpells['Shadow Word: Pain'][0].coeff *= (1 + 0.15 * talents.painAndSuffering);
       discSpells['Shadow Word: Pain'][1].coeff *= (1 + 0.15 * talents.painAndSuffering);
       discSpells['Shadow Word: Pain'][1].buffDuration += (2 * talents.painAndSuffering);
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
   if (talents.indemnity) discSpells['Power Word: Shield'][0].atonement += 4;
   if (talents.castigation) {
       discSpells['Penance'][0].bolts += 1;
       discSpells['DefPenance'][0].bolts += 1;
   }
   //if (talents.stolenPsyche) discSpells['Mind Blast'][0].atonementBonus = (1 + 0.2 * talents.stolenPsyche);

   // Tier 3 talents
   if (talents.blazeOfLight) {
       //+7.5% to Penance / Smite.
       discSpells['Penance'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
       discSpells['Smite'][0].coeff *= (1 + 0.075 * talents.blazeOfLight);
   }
   if (talents.divineAegis) {
       // Now that Divine Aegis doesn't work with some direct healing (atonement) we're going to handle it within DiscRamps instead of as a global wrapper.
       // That also lets us track its healing separately from the spell that triggered it.
       //stats.critMult *= (1 + 0.6 * talents.divineAegis);
   }
   if (talents.harshDiscipline) {
       const hdBuff = {
        name: "Harsh Discipline",
        type: "buff",
        buffDuration: 30,
        buffType: "special",
        value: talents.harshDiscipline, 
        stacks: 1, 
        canStack: true, 
        maxStacks: 2
       }
       discSpells["Power Word: Radiance"].push(hdBuff);
   }
   if (talents.expiation) {
       // TODO: Add special function to Mindblast / SWD spell that consumes SWP
       discSpells["Mind Blast"].push(
       {
           type: "function",
           runFunc: function (state, atonementApp) {
               const temp = state.activeBuffs.filter(buff => buff.name === "Shadow Word: Pain");
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
       // Note that this damage only fires if a Shadowfiend / Mindbender is active.
       const inescapableTormentDmg = {
            name: "Inescapable Torment",
            condition: {type: "buff", buffName: talents.mindbender? "Mindbender" : "Shadowfiend"},
            type: "damage",
            coeff: 1.9 * 1.6 * 0.6, // Horribly complicated spell. Note this coefficient is modified below by pet choice.
            aura: 1,
            targets: 1, // 5
            atoneOverheal: 0.32,
            school: "shadow",
            secondaries: ['crit', 'vers'],
       }
       const inescapableTormentDuration = {
            type: "buffExtension",
            buffName: talents.mindbender? "Mindbender" : "Shadowfiend",
            extension: 1,
       }
       inescapableTormentDmg.coeff *= talents.mindbender ? 0.3 : 0.408;


       discSpells["Mind Blast"].push(inescapableTormentDmg);
       discSpells["Mind Blast"].push(inescapableTormentDuration);

       discSpells["Shadow Word: Death"].push(inescapableTormentDmg);
       discSpells["Shadow Word: Death"].push(inescapableTormentDuration);

       discSpells["Penance"].push(inescapableTormentDmg);
       discSpells["Penance"].push(inescapableTormentDuration);
   }
   if (talents.voidSummoner) {
        // Can be mostly handled in RampGen.
        discSpells['Mindbender'][0].cooldownData.cooldown / 2;
        discSpells['Shadowfiend'][0].cooldownData.cooldown / 2;
    }

   // Passive Shadow Cov
   if (talents.shadowCovenant) {
    const shadowCov = {
        type: "buff",
        buffDuration: 15,
        buffType: "special",
        value: (talents.mindbender ? 1.1 : 1.25) + (0.1 * talents.twilightCorruption),
        name: "Shadow Covenant",
        canStack: false,
    }

    discSpells["Mindbender"].push(shadowCov);
    discSpells["Shadowfiend"].push(shadowCov);
   }

   if (talents.crystallineReflection) {
       discSpells["Power Word: Shield"].push({
           name: "Crystalline Reflection",
           type: "heal",
           coeff: 0.42,
           secondaries: ['crit', 'vers', 'mastery'],
           expectedOverheal: 0.6,
       })
       discSpells["Rapture"].push({
           name: "Crystalline Reflection",
           type: "heal",
           coeff: 0.42,
           secondaries: ['crit', 'vers', 'mastery'],
           expectedOverheal: 0.6,
       })
   }
   if (talents.eternalBarrier) {
        discSpells["Power Word: Shield"][0].coeff *= 1.2;
   }
   /*if (talents.makeAmends) {
       // We can kind of model this, but benefit isn't really going to be concentrated on ramps.
   }*/
   if (talents.wealAndWoe) {
       // Penance bolts increase the damage of Smite by 8% per stack, or Power Word: Shield by 3% per stack.
       discSpells["PenanceTick"].push({
           type: "buff",
           name: "Weal & Woe",
           buffType: 'special',
           value: 1.2, // 
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
           expectedOverheal: 0.5,
       })
   }

   // Settings
   if (settings.execute === "Always") discSpells["Shadow Word: Death"][0].coeff *= 2.5
   else if (settings.execute === "20% of the time") discSpells["Shadow Word: Death"][0].coeff *= (2.5 * 0.2 + 0.8);

   // ==== Tier & Other Effects ====
   // Remember that anything that isn't wired into a ramp can just be calculated normally (like flat heal procs trinkets).

   // We might still opt to start them with a PotDS proc on major ramps since the chance of it being active is extremely high.
   if (settings['Power of the Dark Side']) {
       state.activeBuffs.push({name: "Power of the Dark Side", expiration: 999, buffType: "special", value: 1.5, stacks: 1, canStack: true})
   }  
   
   // ==== Trinkets ====
   // These settings change the stat value prescribed to a given trinket. We call these when adding trinkets so that we can grab their value at a specific item level.
   // When adding a trinket to this section, make sure it has an entry in DiscSpellDB first prescribing the buff duration, cooldown and type of stat.
   //if (settings["Instructor's Divine Bell"]) discSpells["Instructor's Divine Bell"][0].value = settings["Instructor's Divine Bell"];
   if (settings["Voidmender's Shadowgem"]) discSpells["Voidmender's Shadowgem"][0].value = settings["Voidmender's Shadowgem"];
   //

   if (state.heroTree === "oracle") applyOracle(discSpells, settings, talents, state, stats, heroTree);
   else if (state.heroTree === "voidweaver") applyVoidweaver(discSpells, settings, talents, state, stats, heroTree);
   else console.error("Disc: No Hero tree provided");

   // Setup mana costs & cooldowns.
   for (const [key, value] of Object.entries(discSpells)) {
       let spell = value[0];

       if (!spell.targets) spell.targets = 1;
       if ('cooldownData' in spell && spell.cooldownData.cooldown) spell.cooldownData.activeCooldown = 0;
       if (spell.cost) spell.cost = spell.cost * DISCCONSTANTS.baseMana / 100;

       if (settings.includeOverheal === "No") {
           value.forEach(spellSlice => {
               if ('overheal' in spellSlice) spellSlice.overheal = 0;
               if ('atoneOverheal' in spellSlice) spellSlice.atoneOverheal = 0;
           })

       }
   }

   return discSpells;
}

const applyOracle = (discSpells, settings, talents, state, stats, heroTree) => {

    // Preventative Measures
    discSpells["Power Word: Shield"][0].coeff *= 1.4;
    discSpells["Penance"][0].coeff *= 1.2;
    discSpells["Smite"][0].coeff *= 1.2;

    // Preemptive care
    discSpells["Power Word: Shield"][0].atonement += 4;
    discSpells["Power Word: Radiance"][0].atonement += 4; // Check for EL

    // Assured Safety
    // TODO

    // Twinsight
    // We'll mostly use Penance offensively which means this adds 3 healing bolts to the cast. 


    

}

const applyVoidweaver = (discSpells, settings, talents, state, stats, heroTree) => {


}