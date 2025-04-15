import { runHeal } from "./MonkSpellSequence";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";


// This is the Mistweaver spell database. 
// It contains information on every spell used in a ramp. Each spell is an array which means you can include multiple effects to code spells like Mindblast. 
// Any errors can be reported on the QE github, or to me directly on discord @Voulk1858.
// The spell database can be copied locally to a function and then individual spells edited for conduits, legendaries, soulbinds and so on.

// Let's go through the available fields.
// type: damage (effect deals damage), healing (effect heals), buff (effect adds a buff), atonementExtension (specific to Evang).
// cost: mana cost. This is currently represented as an integer, but could be converted to % mana cost in future.
// coeff: the spells intellect scaling. This is a combination of base coefficient, any possible spell ranks, and any relevant auras that might impact the spell.
// cooldown: a spells cooldown. 
// atoneOverheal: The average atonement overhealing caused by this spells cast. This is an average based on log analysis, and won't be perfectly accurate for every scenario.
// expectedOverheal: A healing spells typical overhealing percentage.
// secondaries: The secondary stats a spell scales with. Note that if it's a damage spell, you don't need to include the resulting atonements mastery scaling. 
// targets: The number of targets a spell hits. All effects will be applied to every target.
// tags: optional tags for specific functionality. Also includes scaling modifiers like spells that have square root scaling with number of targets.

// Buff spells also expect the following:
// buffDuration: How long the buff lasts
// buffType: 'stats' / 'spec'. Spec can cover spec interactions like Boon, Schism etc.
// stat: stat buff types should include which stat it gives you. Bell for example would add 'mastery'
// value: stat buff types should also have a value showing how much stat it gives you. When this is variable (like a trinket) then it can be fed into the ramp functions directly and
// any values displayed in this DB are placeholders only.

const GLOBALMODS = {
    ARMOR: 0.7 // Raid bosses have a !30% reduction to physical damage through armor. 
}

// Spell coefficients combine a spells base coefficient with any relevant auras that might impact the spell. 
export const MONKSPELLS = {
    "Gust of Mists": [{
        type: "heal",
        castTime: 0,
        cost: 0, // Mana cost as a percent. 
        coeff: 0.1,
        expectedOverheal: 0.15,
        secondaries: ['mastery', 'crit', 'vers'],
    }],
    "Soothing Mist": [    {
        type: "buff",
        buffType: "heal",
        coeff: 3.612,
        tickRate: 1,
        buffDuration: 8,
        expectedOverheal: 0.17,
        channel: true,
        secondaries: ['crit', 'vers'], // + Haste
    }],
    "Vivify": [{
        type: "heal",
        castTime: 1.5,
        cost: 3, // Mana cost as a percent. 
        coeff: 6.0372, //2.58 x 1.95 x 1.2 (Vivify main) x 1.2 (Vivify all)
        expectedOverheal: 0.17,
        secondaries: ['crit', 'vers'],
        mastery: 1
    }],
    "Chi Cocoon": [{
        type: "heal",
        cost: 0, // Mana cost as a percent. 
        coeff: 0,
        offGCD: true,
        flatHeal: 7500000 * 0.24,
        expectedOverheal: 0.075,
        secondaries: ['vers'],
        targets: 5,
    }],
    "Invigorating Mist": [{ // Invigorating Mists
        type: "heal",
        castTime: 0,
        offGCD: true,
        coeff: 1.2428,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers'],
    }],
    "Zen Pulse": [{ 
        type: "heal",
        castTime: 0,
        offGCD: true,
        coeff: 1.6,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers'],
    }],
    "Celestial Conduit": [{
        type: "heal",
        castTime: 4,
        cost: 5, // Mana cost as a percent. 
        coeff: 11 * 1.3, 
        expectedOverheal: 0.3,
        channel: true,
        secondaries: ['crit', 'vers'],
        cooldownData: {cooldown: 90, charges: 1},
        targets: 5,
    }],
    "Jadefire Stomp": [{
        type: "damage",
        castTime: 0,
        cost: 4.0,
        coeff: 0.4 * 1.04, //
        targets: 5,
        cooldownData: {cooldown: 30, charges: 1},
        secondaries: ['crit', 'vers']
    },
    {
        type: "heal",
        coeff: 0.91 * 2.5,
        targets: 5,
        expectedOverheal: 0.45,
        secondaries: ['crit', 'vers']
    }],
    "Renewing Mist": [{
        type: "heal",
        castTime: 0,
        cost: 1.8, // Mana cost as a percent. 
        coeff: 0,
        expectedOverheal: 0.35,
        secondaries: [],
        cooldownData: {cooldown: 9, charges: 3},
        mastery: 1
    },
    {
        type: "buff",
        buffType: "heal",
        coeff: 0.19665,
        tickData: {tickRate: 2, canPartialTick: true},
        buffDuration: 20,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers'], // + Haste
    }],
    "Enveloping Mist": [{
        type: "buff",
        buffType: "heal",
        castTime: 2,
        cost: 4.2,
        coeff: 0.52, 
        tickData: {tickRate: 1, canPartialTick: true},
        buffDuration: 7,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers'] // + Haste
    }],
    "Enveloping Breath": [{
        type: "buff",
        buffName: "Enveloping Breath",
        buffType: "heal",
        tickData: {tickRate: 1, canPartialTick: true},
        targets: 5,
        coeff: 1.026 / 7, 
        castTime: 0,
        offGCD: true,
        buffDuration: 7,
        expectedOverheal: 0.4,
        secondaries: ['crit', 'vers']
    }],
    "Thunder Focus Tea": [{ // TFT
        type: "buff",
        buffType: "special",
        castTime: 0,
        offGCD: true,
        cost: 0,
        buffDuration: 10,
        cooldownData: {cooldown: 30, charges: 1},
    },],
    "Refreshing Jade Wind": [{
        castTime: 0,
        cost: 0,
        offGCD: true,

        type: "buff",
        buffType: "heal",
        coeff: 0.145,
        tickData: {tickRate: 0.75, canPartialTick: true},
        buffDuration: 6,
        targets: 5,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'vers'],
    }],
    "Crackling Jade Lightning": [{
        type: "damage",
        damageType: "magic",
        castTime: 3,
        channel: true,
        cost: 0,
        coeff: 0.224 * 1.04 * 6.25 * 2, // 297% aura on Tiger Palm + 4% for the AP -> SP conversion.
        aura: 1.04, // AP -> SP conversion.
        damageToHeal: 0.3, // Note Armor
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    }],
    "Tiger Palm": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        coeff: 0.27027 * 1.04 * 3.97, // 297% aura on Tiger Palm + 4% for the AP -> SP conversion.
        aura: 1.04, // AP -> SP conversion.
        damageToHeal: 0.3, // Note Armor
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    }],
    "Blackout Kick": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 2.5,
        coeff: 0.847 * 1.04 * 2.28, // 
        aura: 1.04, // AP -> SP conversion.
        damageToHeal: 0.3,
        cooldown: 3,
        secondaries: ['crit', 'vers'],
    }],
    "Rising Sun Kick": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 2.5,
        coeff: 1.438 * 1.04 * 2.06, // 1.438 x 1.7 * 0.88 (RSK Rank 2, MW Monk core passive)
        aura: 1.04, // AP -> SP conversion.
        damageToHeal: 0.3,
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    }],
    "Courage of the White Tiger": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        coeff: 3.375 * 1.04, // 
        aura: 1.04, // AP -> SP conversion.
        offGCD: true, // Called by another spell
        damageToHeal: 2, // Note Armor
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    }],
    "Strength of the Black Ox": [{
        type: "heal",
        castTime: 0,
        coeff: 0,
        flatHeal: 7500000 * 0.03,
        offGCD: true, // Called by another spell
        expectedOverheal: 0.1,
        targets: 5,
        secondaries: ['vers'],
    }],
    "Crane Style": [{
        type: "heal",
        castTime: 0,
        coeff: 0,
        offGCD: true, // Called by another spell
        expectedOverheal: 0.24,
        mastery: 1.5, // This is effective a target count for Crane Style
        targets: 1,
        secondaries: [],
    }],
    "Rising Mist": [{
        type: "heal",
        castTime: 0,
        coeff: 0.2394,
        offGCD: true, // Called by another spell
        expectedOverheal: 0.12,
        targets: 1,
        secondaries: ['crit', 'vers'],
    }],
    "Flight of the Red Crane": [{
        type: "heal",
        castTime: 0,
        cost: 0,  
        offGCD: true,
        coeff: 1.25, 
        expectedOverheal: 0.45,
        secondaries: ['crit', 'vers'],
        targets: 5,
    }],
    "Life Cocoon": [{
        type: "heal",
        castTime: 0,
        cost: 2.4,  
        flatHeal: 7500000 * 0.48, 
        expectedOverheal: 0.3,
        secondaries: ['vers'],
        cooldownData: {cooldown: 120, charges: 1},
        targets: 1,
    }],
    "Sheilun's Gift": [{
        // Note: Chi Burst is currently coded to apply it's damage & healing immediately. Travel time could be added if necessary but
        // this is reasonably low priority since fitting the entire cast in the 4pc window is trivial. 
        type: "heal",
        castTime: 2,
        cost: 2.5,
        coeff: 1.2084 * 1.15, // Per Cloud
        targets: 3,
        mastery: 1,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers']
    }],
    "Chi Burst": [{
        // Note: Chi Burst is currently coded to apply it's damage & healing immediately. Travel time could be added if necessary but
        // this is reasonably low priority since fitting the entire cast in the 4pc window is trivial. 
        type: "damage",
        castTime: 1,
        cost: 0,
        coeff: 0.4784, // SP -> AP mod included.
        targets: 1,
        cooldown: 30,
        secondaries: ['crit', 'vers']
    },
    {
        type: "heal",
        coeff: 0.98,
        targets: 8,
        tags: ['sqrt'],
        softCap: 6,
        expectedOverheal: 0.48,
        secondaries: ['crit', 'vers']
    }],
    "Mana Tea": [{
        type: "buff",
        castTime: 0,
        cost: 0,
        offGCD: true,
        cooldown: 90,
        buffDuration: 10,
        buffType: 'stats',
        stat: "manaMod",
        value: -0.5, //
    }],
    "Invoke Yulon": [{ // Invoke Yu'lon, the Jade Serpent
        type: "buff",
        buffType: "function",
        castTime: 0,
        cost: 5,
        tickRate: 4.5,
        buffDuration: 25,
        cooldown: 180,
        function: function (state) {
            // Yu'lon Soothing Breath
            const SBHot = { type: "heal", coeff: 0.35, expectedOverheal: 0.3, secondaries: ['crit', 'vers'], duration:  4.5, hastedDuration: true}
            const newBuff = {name: "Soothing Breath (Yulon)", buffType: "heal", attSpell: SBHot, tickRate: 1.5, next: state.t + (1.5 / getHaste(state.currentStats)), hastedDuration: true, targets: 3}
            newBuff['expiration'] = state.t + SBHot.duration
            state.activeBuffs.push(newBuff)

            // TODO: Make ongoing heal expire when Yulon ends.
        }
    },
    {
        // Enveloping Breath activator / Celestial active flag
        type: "special",
        runFunc: function (state) {
            state.activeBuffs.push({name: "Celestial Active", buffType: "special", expiration: state.t + 25})
            
        }
    }],
    "Invoke Chiji": [{ // Invoke Chi-Ji, the Red Crane
        type: "special",
        castTime: 0,
        cost: 5,
        cooldown: 180,
        runFunc: function (state) {
            // Enveloping Breath activator / Celestial active flag
            state.activeBuffs.push({name: "Celestial Active", buffType: "special", expiration: state.t + 25})
            state.activeBuffs.push({name: "Chiji Active", buffType: "special", expiration: state.t + 25})
        }
    }], 
    "Revival":[{
        type: "heal",
        castTime: 0,
        cost: 4.37, // Mana cost as a percent. 
        coeff: 14.97 / 20,
        expectedOverheal: 0.35,
        targets: 20,
        secondaries: ['crit', 'vers'],
        tags: ['sqrt'],
        sqrtMin: 5,
        mastery: 20,
        cooldownData: {cooldown: 180, charges: 1},
    }],
    "Insurance": [{
        type: "buff",
        buffName: "Insurance",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: true},
        targets: 1,
        castTime: 0,
        offGCD: true,
        coeff: 0.55223, 
        buffDuration: 15,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers']
    }],
}


