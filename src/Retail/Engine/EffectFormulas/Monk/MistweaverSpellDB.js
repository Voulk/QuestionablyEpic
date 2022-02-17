import { buildDifferential } from "General/Modules/TopGear/Engine/TopGearEngineShared";
import { runHeal, getHaste, runDamage } from "./MonkSpellSequence";


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
// overheal: A healing spells typical overhealing percentage.
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
        overheal: 0.15,
        secondaries: ['mastery', 'crit', 'vers'],
    }],
    "Vivify": [{
        type: "heal",
        castTime: 1.5,
        cost: 3.8, // Mana cost as a percent. 
        coeff: 1.41,
        overheal: 0.15,
        secondaries: ['crit', 'vers'],
        mastery: true
    },
    {
        type: "special",
        coeff: 1.04,
        overheal: 0.35,
        castTime: 1.5,
        secondaries: ['crit', 'vers'],
        mastery: false,
        runFunc: function (state) {
            // Heal allies with Renewing Mist.
            const activeRem = state.activeBuffs.filter(function (buff) {return buff.name === "Renewing Mist"})
            const spell = { type: "heal", coeff: 1.04, overheal: 0.37, secondaries: ['crit', 'vers'], targets: activeRem.length} 
            if (activeRem.length > 0) runHeal(state, spell, "Vivify (Cleave)")
        }
    },
    ],
    "Faeline Stomp": [{
        type: "damage",
        castTime: 0,
        cost: 4.0,
        coeff: 0.416, // 0.4 * 1.04
        targets: 5,
        cooldown: 30,
        secondaries: ['crit', 'vers']
    },
    {
        type: "heal",
        coeff: 0.91,
        targets: 5,
        castTime: 0,
        overheal: 0.55,
        secondaries: ['crit', 'vers']
    },
    {
        type: "special",
        runFunc: function (state) {
                        // Essence Font Heal
            const directData = {coeff: 0.472 * (state.settings.misc.includes("2T28") ? 1 : 1)}
            const efDirect = { type: "heal", coeff: directData.coeff, overheal: 0.15, secondaries: ['crit', 'vers'], targets: 1}
            
            // Apply 5 special Essence Font hots. These stack with existing EF hots.
            const EF = {coeff: 0.042 * (state.settings.misc.includes("2T28") ? 1 : 1), duration: 8 + (state.settings.misc.includes("2T28") ? 2 : 0)}
            // Essence Font HoT
            const efHot = { type: "heal", coeff: EF.coeff, overheal: 0.3, secondaries: ['crit', 'vers'], duration: EF.duration}
            const newBuff = {name: "Essence Font (HoT - Faeline Stomp)", buffType: "heal", attSpell: efHot,
                tickRate: 2, next: state.t + (2 / getHaste(state.currentStats))}
            newBuff['expiration'] = state.t + efHot.duration

            for (let i = 0; i < 5; i++) {
                runHeal(state, efDirect, "Essence Font")
                state.activeBuffs.push(newBuff)
            }
        }
    }],
    "Renewing Mist": [{
        type: "heal",
        castTime: 0,
        cost: 1.8, // Mana cost as a percent. 
        coeff: 0,
        overheal: 0,
        secondaries: [],
        mastery: true
    },
    {
        type: "buff",
        buffType: "heal",
        coeff: 0.225, // 
        tickRate: 2,
        buffDuration: 20,
        cooldown: 9,
        overheal: 0.07,
        secondaries: ['crit', 'vers'], // + Haste
    }],
    "Enveloping Mist": [{
        type: "buff",
        buffType: "heal",
        castTime: 2,
        cost: 5.6,
        coeff: 0.6, // 
        tickRate: 2,
        buffDuration: 6,
        overheal: 0.35,
        secondaries: ['crit', 'vers'], // + Haste
    }],
    "Thunder Focus Tea": [{
        type: "buff",
        buffType: "special",
        castTime: 0,
        offGCD: true,
        cost: 0,
        buffDuration: 10,
    },
    {
        type: "special",
        condition: "4T28",
        runFunc: function (state) {
            // 
            const newBuff = {name: "Primordial Mending", buffType: "special", expiration: state.t + 10}
            state.activeBuffs.push(newBuff)
        }
    }],
    "Refreshing Jade Wind": [{
        type: "heal",
        castTime: 0,
        cost: 3.5,
        coeff: 0.116,
        targets: 6,
        overheal: 0.2,
        secondaries: ['crit', 'vers'],
    },
    {
        type: "buff",
        buffType: "heal",
        coeff: 0.116,
        tickRate: 0.75,
        buffDuration: 9,
        hastedDuration: true,
        targets: 6,
        overheal: 0.2,
        secondaries: ['crit', 'vers'],
    }],
    "Essence Font": [{
        type: "buff",
        buffType: "function",
        castTime: 3,
        cost: 7.2,
        tickRate: 0.1667,
        buffDuration: 3,
        hastedDuration: true,
        function: function (state) {
            // Essence Font Heal
            const directData = {coeff: 0.472 * (state.settings.misc.includes("2T28") ? 1 : 1)}
            const efDirect = { type: "heal", coeff: directData.coeff, overheal: 0.15, secondaries: ['crit', 'vers'], targets: 1}
            runHeal(state, efDirect, "Essence Font")

            // Essence Font HoT
            const hotData = {coeff: 0.042 * (state.settings.misc.includes("2T28") ? 1 : 1), duration: 8 + (state.settings.misc.includes("2T28") ? 2 : 0)}
            const efHot = { type: "heal", coeff: hotData.coeff, overheal: 0.3, secondaries: ['crit', 'vers'], duration: hotData.duration}
            const newBuff = {name: "Essence Font (HoT)", buffType: "heal", attSpell: efHot,
                tickRate: 2, next: state.t + (2 / getHaste(state.currentStats))}
            newBuff['expiration'] = state.t + efHot.duration

            state.activeBuffs.push(newBuff)


        }
    }],
    "Tiger Palm": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        coeff: 0.27027, 
        aura: 1,
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    },
    {
        type: "special",
        runFunc: (state) => {
            // Apply 5 special Essence Font hots. These stack with existing EF hots.
            const activeBuffs = state.activeBuffs;
            const teachingsStacks = activeBuffs.filter(function (buff) {return buff.name === "Teachings of the Monastery"}).length;
            if (teachingsStacks === 0) {
                // Add buff
                activeBuffs.push({name: "Teachings of the Monastery", buffType: "special", stacks: 1, expiration: 30})
            }
            else {
                // Add stack of buff.
                const buff = activeBuffs.filter(buff => buff.name === "Teachings of the Monastery")[0]
                buff.stacks = Math.min(buff.stacks + 1, 3);
            }
        }
    },
    {
        type: "special",
        condition: "Ancient Teachings of the Monastery",
        runFunc: function (state) {
            // Heal allies with Renewing Mist.
            const spell = { type: "heal", coeff: 0.27027 * 1.04 * 2.5 * 1.05 * GLOBALMODS.ARMOR, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
            runHeal(state, spell, "Ancient Teachings of the Monastery")
        }
    }],
    "Blackout Kick": [{
        type: "special",
        runFunc: function (state) {
            // Calculate number of bonus kicks.
            const teachingsBuff = state.activeBuffs.filter(function (buff) {return buff.name === 'Teachings of the Monastery'});
            const teachingsStacks = (teachingsBuff.length > 0 && teachingsBuff[0]['stacks'] || 0) + 1 
            // For each bonus kick, deal damage and heal via Ancient Teachings if applicable.
            for (var i = 0; i < teachingsStacks; i++) {
                // Deal damage
                const blackoutKick = { type: "damage", coeff: 0.847 * 1.04, secondaries: ['crit', 'vers'], targets: 1} 
                runDamage(state, blackoutKick, "Blackout Kick")

                // Ancient Teachings if applicable.
                const spell = { type: "heal", coeff: 0.847 * 1.04 * 2.5 * 1.05 * GLOBALMODS.ARMOR, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
                runHeal(state, spell, "Ancient Teachings of the Monastery")

            }

            // Remove Teachings of the Monastery stacks.

        }
    }],
    "Rising Sun Kick": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 1.5,
        coeff: 2.4446, // 1.438 x 1.7 (RSK Rank 2)
        aura: 1.04, // AP -> SP conversion.
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    },
    {
        type: "special",
        runFunc: (state) => {
            // Rising Mist
            const rmHots = ["Renewing Mist", "Essence Font (HoT)", "Enveloping Mist"]
            const risingMistExtension = 4;
            const activeRMBuffs = state.activeBuffs.filter(function (buff) {return rmHots.includes(buff.name)})
            // Apply heal to allies with ReM, EF or Enveloping Mist.
            // ReM and EF can be double counted here, slightly inflating value.
            // The addition of target markers in the buff list would solve this but isn't high priority.
            const spell = { type: "heal", coeff: 0.28, overheal: 0.15, secondaries: ['crit', 'vers'], targets: activeRMBuffs.length} 
            if (activeRMBuffs.length > 0) runHeal(state, spell, "Rising Mist")

            // Extend ReM, EF and Enveloping Mist HoTs. Mark down the extension.
            // TODO: Extensions should be specific to a HoTs base duration. 
            activeRMBuffs.forEach((buff) => {
                if ('durationExtended' in buff) {
                    buff.durationExtended = buff.durationExtended + 1;
                }
                else {
                    buff.durationExtended = 1;
                }
                if (buff.durationExtended <= 2) {
                    buff.expiration = buff.expiration + risingMistExtension;
                }
            })
        }
    },
    {
        type: "special",
        condition: "Ancient Teachings of the Monastery",
        runFunc: function (state) {
            // Heal allies with Renewing Mist.
            const spell = { type: "heal", coeff: 2.4446 * 2.5 * 1.05 * GLOBALMODS.ARMOR, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
            runHeal(state, spell, "Ancient Teachings of the Monastery")
        }
    },
],
    "Bonedust Brew": [{
        type: "buff",
        buffType: "special",
        castTime: 0,
        cost: 0,
        targets: 5,
        buffDuration: 10,
        cooldown: 60,
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
        overheal: 0.48,
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
        value: -0.5, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
    "Instructor's Divine Bell": [{
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 9,
        buffType: 'stats',
        stat: "mastery",
        value: 668, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
}

// TODO
export const mistweaverConduits = (conduit, rank) => {
    if (conduit === "Exaltation") return 0.0675 + (rank * 0.0075);
    else if (conduit === "Shining Radiance") return 0.36 + (rank * 0.04);
    else if (conduit === "Pain Transformation") return 0.135 + (rank * 0.015);
    else if (conduit === "Rabid Shadows") return 0.171 + (rank * 0.19);
    else if (conduit === "Courageous Ascension") return 0.225 + (rank * 0.025);
    else if (conduit === "Shattered Perception") return 0.117 + (rank * 0.013);
    else {
        console.error("Invalid Conduit");
    }
}