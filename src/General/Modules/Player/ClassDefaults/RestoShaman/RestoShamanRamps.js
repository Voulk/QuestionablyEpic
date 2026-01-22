// 
import { SHAMANSPELLDB } from "./RestoShamanSpellDBWarWithin";
import { getCurrentStats, getHaste, getSpellRaw, getStatMult } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff, runBuffs } from "General/Modules/Player/ClassDefaults/Generic/BuffBase";

// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.

const SHAMANCONSTANTS = {
  masteryMod: 3,
  masteryEfficiency: 0.65,
  baseMastery: 0.24,
  baseMana: 10000,

  CBT: { transferRate: 0.2, expectedOverhealing: 0.25 },

  auraHealingBuff: 0.96,
  auraDamageBuff: 1.15,
}

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} shamanSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
const applyLoadoutEffects = (shamanSpells, settings, talents, state) => {

  // ==== Default Loadout ====
  // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
  // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
  // we don't have full information about a character.
  // As always, Top Gear is able to provide a more complete picture. 
  if (settings['DefaultLoadout']) {

  }

  // ==== Talents ====
  // Not all talents just make base modifications to spells, but those that do can be handled here.

  // Class talents.


  // Spec talents.
  // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in RampGen.


  return shamanSpells;
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 */
const getDamMult = (state, buffs, t, spellName, talents) => {
  let mult = SHAMANCONSTANTS.auraDamageBuff;

  return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 */
const getHealingMult = (buffs, t, spellName, talents) => {
  let mult = SHAMANCONSTANTS.auraHealingBuff;

  return mult;
}

const getSqrt = (targets) => {
  return Math.sqrt(targets);
}

const getHotName = (spellName) => spellName; // + " (hot)" throws issues when doing things by name comparison
export const runHeal = (state, spell, spellName, compile = true) => {

  // Pre-heal processing
  const currentStats = state.currentStats;
  const cloudburstActive = checkBuffActive(state.activeBuffs, "Cloudburst Totem");
  let cloudburstHealing = 0;
  const healingMult = getHealingMult(state.activeBuffs, state.t, spellName, state.talents);
  const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets) : spell.targets) || 1;
  const healingVal = getSpellRaw(spell, currentStats, SHAMANCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;

  if (cloudburstActive) cloudburstHealing = (healingVal / (1 - spell.expectedOverheal)) * SHAMANCONSTANTS.CBT.transferRate * (1 - SHAMANCONSTANTS.CBT.expectedOverhealing);

  if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
  if (compile) state.healingDone['Cloudburst Totem'] = (state.healingDone['Cloudburst Totem'] || 0) + cloudburstHealing;
  //console.log("Mu: " + healingMult + ". " + getSpellRaw(spell, currentStats, SHAMANCONSTANTS) + ". " + targetMult);

  return healingVal;
}

export const runDamage = (state, spell, spellName, compile = true) => {

  const damMultiplier = getDamMult(state, state.activeBuffs, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
  const damageVal = getSpellRaw(spell, state.currentStats, SHAMANCONSTANTS) * damMultiplier;

  // This is stat tracking, the atonement healing will be returned as part of our result.
  if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.

  return damageVal;
  //if (state.reporting) console.log(getTime(state.t) + " " + spellName + ": " + damageVal + ". Buffs: " + JSON.stringify(state.activeBuffs) + " to " + activeAtonements);
}

const canCastSpell = (state, spellDB, spellName) => {

  const spell = spellDB[spellName][0];
  let miscReq = true;
  const cooldownReq = (state.t > spell.activeCooldown) || !spell.cooldown;

  //console.log("Checking if can cast: " + spellName + ": " + cooldownReq)
  return cooldownReq && miscReq;
}

const getSpellHPM = (state, spellDB, spellName) => {
  const spell = spellDB[spellName][0];
  const spellHealing = runHeal(state, spell, spellName, false)

  return spellHealing / spell.cost || 0;
}

export const genSpell = (state, spells) => {
  let spellName = ""

  const usableSpells = [...apl].filter(spell => canCastSpell(state, spells, spell));

  return usableSpells[0];

}


const apl = ["Riptide", "Rest"]

/**
 * Run a full cast sequence. This is where most of the work happens. It runs through a short ramp cycle in order to compare the impact of different trinkets, soulbinds, stat loadouts,
 * talent configurations and more. Any effects missing can be easily included where necessary or desired.
 * @param {} sequence A sequence of spells representing a ramp. Note that in two ramp cycles like alternating Fiend / Boon this function will cover one of the two (and can be run a second
 * time for the other).
 * @param {*} stats A players base stats that are found on their gear. This doesn't include any effects which we'll apply in this function.
 * @param {*} settings Any special settings. We can include soulbinds, legendaries and more here. Trinkets should be included in the cast sequence itself and conduits are handled below.
 * @param {object} conduits Any conduits we want to include. The conduits object is made up of {ConduitName: ConduitLevel} pairs where the conduit level is an item level rather than a rank.
 * @returns The expected healing of the full ramp.
 */
export const runCastSequence = (sequence, stats, settings = {}, talents = {}) => {
  //console.log("Running cast sequence");
  let state = { t: 0.01, activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, };

  const sequenceLength = 20; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
  const seqType = "Manual" // Auto / Manual.
  let nextSpell = 0;

  // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
  // Ideally we'll cover as much as we can in here.
  const shamanSpells = applyLoadoutEffects(deepCopyFunction(SHAMANSPELLDB), settings, talents, state);

  // Setup mana costs & cooldowns.
  for (const [key, value] of Object.entries(shamanSpells)) {
    let spell = value[0];

    if (!spell.targets) spell.targets = 1;
    if (spell.cooldown) spell.activeCooldown = 0;
    if (spell.cost) spell.cost = spell.cost * SHAMANCONSTANTS.baseMana;
  }

  const seq = [...sequence];

  for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

    // ---- Heal over time and Damage over time effects ----
    // When we add buffs, we'll also attach a spell to them. The spell should have coefficient information, secondary scaling and so on. 
    // When it's time for a HoT or DoT to tick (state.t > buff.nextTick) we'll run the attached spell.
    // Note that while we refer to DoTs and HoTs, this can be used to map any spell that's effect happens over a period of time. 
    // This includes stuff like Shadow Fiend which effectively *acts* like a DoT even though it is technically not one.
    // You can also call a function from the buff if you'd like to do something particularly special. You can define the function in the specs SpellDB.
    const healBuffs = state.activeBuffs.filter(function (buff) { return (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType === "function") && state.t >= buff.next })
    if (healBuffs.length > 0) {
      healBuffs.forEach((buff) => {
        let currentStats = { ...stats };
        state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

        if (buff.buffType === "heal") {
          const spell = buff.attSpell;
          runHeal(state, spell, buff.name + "(hot)")
        }
        else if (buff.buffType === "damage") {
          const spell = buff.attSpell;
          runDamage(state, spell, buff.name)
        }
        else if (buff.buffType === "function") {
          const func = buff.attFunction;
          func(state, spell);
        }
        buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
      });
    }

    // -- Partial Ticks --
    // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
    // If your DoT ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
    // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
    const expiringHots = state.activeBuffs.filter(function (buff) { return (buff.buffType === "heal" || buff.buffType === "damage") && state.t >= buff.expiration && buff.canPartialTick })
    expiringHots.forEach(buff => {
      const tickRate = buff.tickRate / getHaste(state.currentStats)
      const partialTickPercentage = (buff.next - state.t) / tickRate;
      const spell = buff.attSpell;
      spell.coeff = spell.coeff * partialTickPercentage;

      if (buff.buffType === "damage")
        runDamage(state, spell, buff.name);
      else if (buff.buffType === "heal")
        runHeal(state, spell, getHotName(buff.name));
    })

    // Remove any buffs that have expired. Note that we call this after we handle partial ticks. 
    state.activeBuffs = state.activeBuffs.filter(function (buff) { return buff.expiration > state.t });

    // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
    // It'll also auto-cast Ascended Eruption if Boon expired.
    if ((state.t > nextSpell && seq.length > 0)) {

      // Update current stats for this combat tick.
      // Effectively base stats + any current stat buffs.
      let currentStats = { ...stats };
      state.currentStats = getCurrentStats(currentStats, state.activeBuffs);


      let spellName = "";
      if (seqType === "Manual") spellName = seq.shift();
      else spellName = genSpell(state, shamanSpells);

      const fullSpell = shamanSpells[spellName];

      // We'll iterate through the different effects the spell has.
      // Smite for example would just trigger damage (and resulting atonement healing), whereas something like Mind Blast would trigger two effects (damage,
      // and the absorb effect).
      state.manaSpent += fullSpell[0].cost || 0;
      fullSpell.forEach(spell => {

        // The spell has a healing component. Add it's effective healing.
        // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
        if (spell.type === 'heal') {
          runHeal(state, spell, spellName)
        }

        // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
        else if (spell.type === 'damage') {
          runDamage(state, spell, spellName)
        }
        // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
        else if (spell.type === 'function') {
          spell.runFunc(state, spell);
        }

        // The spell adds a buff to our player.
        // We'll track what kind of buff, and when it expires.
        else if (spell.type === "buff") {
          if (spell.buffType === "stats") {
            state.activeBuffs.push({ name: spellName, expiration: state.t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat });
          }
          else if (spell.buffType === "statsMult") {
            state.activeBuffs.push({ name: spellName, expiration: state.t + spell.buffDuration, buffType: "statsMult", value: spell.value, stat: spell.stat });
          }
          else if (spell.buffType === "damage" || spell.buffType === "heal") {
            const newBuff = {
              name: spellName, buffType: spell.buffType, attSpell: spell,
              tickRate: spell.tickRate, canPartialTick: spell.canPartialTick, next: state.t + (spell.tickRate / getHaste(state.currentStats))
            }

            newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(currentStats)) : state.t + spell.buffDuration
            state.activeBuffs.push(newBuff)

          }
          else if (spell.buffType === "special") {

            // Check if buff already exists, if it does add a stack.
            const buffStacks = state.activeBuffs.filter(function (buff) { return buff.name === spell.name }).length;
            if (buffStacks === 0) state.activeBuffs.push({ name: spell.name, expiration: (state.t + spell.castTime + spell.buffDuration) || 999, buffType: "special", value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack });
            else {
              const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

              if (buff.canStack) buff.stacks += 1;
            }
          }
          else {
            state.activeBuffs.push({ name: spellName, expiration: state.t + spell.castTime + spell.buffDuration });
          }
        }

        // These are special exceptions where we need to write something special that can't be as easily generalized.

        if (spell.cooldown) spell.activeCooldown = state.t + (spell.cooldown / getHaste(currentStats));

        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.

      });

      if (fullSpell[0].castTime) nextSpell += (fullSpell[0].castTime / getHaste(currentStats));
      else console.log("CAST TIME ERROR. Spell: " + spellName);

    }
  }


  // Add up our healing values (including atonement) and return it.
  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
  state.activeBuffs = [];
  state.totalDamage = Object.keys(state.damageDone).length > 0 ? Math.round(sumValues(state.damageDone)) : 0;
  state.totalHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
  state.hps = (state.totalHealing / sequenceLength);
  state.dps = (state.totalDamage / sequenceLength);
  state.hpm = (state.totalHealing / state.manaSpent) || 0;

  return state;

}

// This is a boilerplate function that'll let us clone our spell database to avoid making permanent changes.
// We need this to ensure we're always running a clean DB, free from any changes made on previous runs.
const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

