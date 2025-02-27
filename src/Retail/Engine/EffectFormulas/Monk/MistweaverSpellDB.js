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
    "Soothing Mist": [    {
        type: "buff",
        buffType: "heal",
        coeff: 3.612,
        tickRate: 1,
        buffDuration: 8,
        overheal: 0.17,
        channel: true,
        secondaries: ['crit', 'vers'], // + Haste
    }],
    "Vivify": [{
        type: "heal",
        castTime: 1.5,
        cost: 3, // Mana cost as a percent. 
        coeff: 6.0372, //2.58 x 1.95 x 1.2 (Vivify main) x 1.2 (Vivify all)
        overheal: 0.15,
        secondaries: ['crit', 'vers'],
        mastery: true
    },
    { // Invigorating Mists
        type: "special",
        coeff: 1.2428,
        overheal: 0.35,
        secondaries: ['crit', 'vers'],
        mastery: false,
        runFunc: function (state) {
            // Heal allies with Renewing Mist.
            const activeRem = state.activeBuffs.filter(function (buff) {return buff.name === "Renewing Mist"})
            const spell = { type: "heal", coeff: 1.2428, overheal: 0.35, secondaries: ['crit', 'vers'], targets: activeRem.length} 
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
            const efDirect = { type: "heal", coeff: directData.coeff, overheal: 0.25, secondaries: ['crit', 'vers'], targets: 1}
            
            // Apply 5 special Essence Font hots. These stack with existing EF hots.
            const EF = {coeff: 0.042 * (state.settings.misc.includes("2T28") ? 1 : 1), duration: 8 + (state.settings.misc.includes("2T28") ? 2 : 0)}
            // Essence Font HoT
            const efHot = { type: "heal", coeff: EF.coeff, overheal: 0.3, secondaries: ['crit', 'vers'], duration: EF.duration}
            const newBuff = {name: "Essence Font (HoT - Faeline Stomp)", buffType: "heal", attSpell: efHot,
                tickRate: 2, next: state.t + (2 / getHaste(state.currentStats))}
            newBuff['expiration'] = state.t + efHot.duration

            for (let i = 0; i < 5; i++) {
                runHeal(state, efDirect, "Essence Font (Faeline Stomp)")
                state.activeBuffs.push(newBuff)
            }

            // Support Faeline Harmony
            // TODO: Implement properly :)
            if (state.settings.misc.includes("FLH")) {
                const newBuffFLH = {name: "Faeline Harmony Inc", buffType: "special", expiration: state.t + 10, value: 1.08}
                state.activeBuffs.push(newBuffFLH)
            }
        }
    }/*,
    {
        FLH Condition WIP
        type: "special",
        //condition: "Faeline Harmony",
        runFunc: function (state) {
            const newBuff = {name: "Faeline Harmony Inc", buffType: "special", expiration: state.t + 10}
            state.activeBuffs.push(newBuff)
        }
    }*/],
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
        coeff: 0.19665,
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
        coeff: 0.6, 
        tickRate: 2,
        buffDuration: 6,
        overheal: 0.35,
        secondaries: ['crit', 'vers'] // + Haste
    },
    {
        type: "special",
        condition: "Celestial Active",
        runFunc: function (state) {
            // Cast enveloping breath.
            const CelestialBuff = state.activeBuffs.filter(buff => buff.name === "Celestial Active").length
            if (CelestialBuff > 0){
                const envbHot = { type: "heal", coeff: 0.3, overheal: 0.4, secondaries: ['crit', 'vers'], duration: 6, targets:3}
                const newBuff = {name: "Enveloping Breath", buffType: "heal", attSpell: envbHot,
                    tickRate: 1, next: state.t + (1 / getHaste(state.currentStats))}
                newBuff['expiration'] = state.t + envbHot.duration

                state.activeBuffs.push(newBuff)
            }
            
            // Chiji reduced mana cost
            const chijiBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Chiji Active"});
            const chijiStacks = (chijiBuff.length > 0 && chijiBuff[0]['stacks'] || 0)            
            state.manaSpent -= chijiStacks / 3 * 5.6
        }
            
            
    }],
    "Thunder Focus Tea": [{ // TFT
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
            if (state.settings.misc.includes("4T28"))
            {
                const newBuff = {name: "Primordial Mending", buffType: "special", expiration: state.t + 10}
                state.activeBuffs.push(newBuff)
            }
        }
    },
    {
        type: "special",
        condition: "Yulon's Whisper",
        runFunc: function (state) {
            if (state.settings['legendaries'].includes("Yulon's Whisper"))
            {
                const spell = {name: "Yulon's Whisper", 
                type: "heal", 
                coeff: 0.6, 
                overheal: 0.45, 
                secondaries: ['crit', 'vers'], 
                targets: 6}

                runHeal(state, spell, "Yulon's Whisper (Initial)")
                runHeal(state, spell, "Yulon's Whisper")
                runHeal(state, spell, "Yulon's Whisper")
            }
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
        type: "special",
        castTime: 3,
        cost: 7.2,
        runFunc: function (state) {
            // Essence Font HoT - only goes onto unique targets, this was easiest way to sim
            const hotData = {coeff: 0.042 * (state.settings.misc.includes("2T28") ? 1 : 1), duration: 8 + (state.settings.misc.includes("2T28") ? 2 : 0)}
            const efHot = { type: "heal", coeff: hotData.coeff, overheal: 0.3, secondaries: ['crit', 'vers'], duration: hotData.duration}
            const newBuff = {name: "Essence Font (HoT)", buffType: "heal", attSpell: efHot,
                tickRate: 2, next: state.t + (2 / getHaste(state.currentStats))}
            newBuff['expiration'] = state.t + efHot.duration

            for (var t = 0; t < 12; t++) // 12 avg targets hit (Abe advised 12 or 13, this dosen't replace existing hots so lowballing)
            {
                state.activeBuffs.push(newBuff)
            }

            // Weapons of Order heal
            if (state.activeBuffs.filter(function (buff) {return buff.name === "Weapons of Order"}).length > 0)
            {
                const spell = { type: "heal", coeff: 0.4, overheal: 0.15, secondaries: ['crit', 'vers'], targets: 6} 
                runHeal(state, spell, "Weapons of Order")
                runHeal(state, spell, "Weapons of Order")
            }
        }
    },
    {
        type: "buff",
        buffType: "function",
        tickRate: 0.1667,
        buffDuration: 3,
        hastedDuration: true,
        function: function (state) {
            // Essence Font Heal
            const directData = {coeff: 0.472 * (state.settings.misc.includes("2T28") ? 1 : 1)}
            const efDirect = { type: "heal", coeff: directData.coeff, overheal: 0.15, secondaries: ['crit', 'vers'], targets: 1}
            runHeal(state, efDirect, "Essence Font")            
        }
    }],
    "Tiger Palm": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        coeff: 0.297297, // 0.27027 * 1.1  (SP * MW Monk core passive)
        aura: 1.04, // AP -> SP conversion.
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    },
    {
        type: "special",
        runFunc: (state) => {
            // Add stack of TotM
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
                buff.expiration = 20;
            }
        }
    },
    {
        type: "special",
        condition: "Ancient Teachings of the Monastery",
        runFunc: function (state) {
            // Checks if AtoTM active
            
            if (state.activeBuffs.filter(function (buff) {return buff.name === "Ancient Teachings of the Monastery"}).length > 0)
            {
                const spell = { type: "heal", coeff: 0.297297 * 1.04 * 2.5 * 1.05 * GLOBALMODS.ARMOR, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
                runHeal(state, spell, "Ancient Teachings of the Monastery")
            }
        }
    }],
    "Blackout Kick": [{
        type: "special",
        runFunc: function (state) {
            // Calculate number of bonus kicks.
            const teachingsBuff = state.activeBuffs.filter(function (buff) {return buff.name === 'Teachings of the Monastery'});
            const teachingsStacks = (teachingsBuff.length > 0 && teachingsBuff[0]['stacks'] || 0) + 1 

            const atotmBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Ancient Teachings of the Monastery"}).length > 0;
            const chijiBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Chiji Active"}).length > 0;
            const CTAchijiBuff = state.activeBuffs.filter(function (buff) {return buff.name === "CTA Chiji Active"}).length > 0;

            // For each bonus kick, deal damage and heal via Ancient Teachings if applicable.
            for (var i = 0; i < teachingsStacks; i++) {
                // Deal damage
                const blackoutKick = { type: "damage", damageType: "physical", coeff: 0.847 * 1.04, secondaries: ['crit', 'vers'], targets: 1} 
                runDamage(state, blackoutKick, "Blackout Kick")

                // Ancient Teachings if applicable.
                if (atotmBuff) {
                    const spell = { type: "heal", coeff: 0.847 * 1.04 * 2.5 * 1.05 * GLOBALMODS.ARMOR, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
                    runHeal(state, spell, "Ancient Teachings of the Monastery")
                }

                // Chiji if applicable 
                if (chijiBuff)
                {
                    const bonusMasteryProc = MONKSPELLS['Gust of Mists'][0];
                    runHeal(state, bonusMasteryProc, "Gust of Mists (Chiji)");
                    runHeal(state, bonusMasteryProc, "Gust of Mists (Chiji)");
                }

                if (CTAchijiBuff)
                {
                    const bonusMasteryProc = MONKSPELLS['Gust of Mists'][0];
                    runHeal(state, bonusMasteryProc, "Gust of Mists (CTA Chiji)");
                    runHeal(state, bonusMasteryProc, "Gust of Mists (CTA Chiji)");
                }

                if (chijiBuff || CTAchijiBuff)
                {
                    // Add stack of Chiji reduced mana cost
                    const activeBuffs = state.activeBuffs;
                    const chijiStacks = activeBuffs.filter(function (buff) {return buff.name === "Chiji Stacks"}).length;
                    if (chijiStacks === 0) {
                        // Add buff
                        activeBuffs.push({name: "Chiji Stacks", buffType: "special", stacks: 1, expiration: 20})
                    }
                    else {
                        // Add stack of buff.
                        const buff = activeBuffs.filter(buff => buff.name === "Chiji Stacks")[0]
                        buff.stacks = Math.min(buff.stacks + 1, 3);
                        buff.expiration = 20;
                    }
                }
            }

            // Remove Teachings of the Monastery stacks.
            const teachingsStacksBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Teachings of the Monastery"}).length;
            if (teachingsStacksBuff != 0) {
                const buff = state.activeBuffs.filter(buff => buff.name === "Teachings of the Monastery")[0]
                buff.stacks = 0;
            }
        }
    }],
    "Rising Sun Kick": [{
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 1.5,
        coeff: 2.151248, // 1.438 x 1.7 * 0.88 (RSK Rank 2, MW Monk core passive)
        aura: 1.04, // AP -> SP conversion.
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    },
    {
        type: "special",
        runFunc: (state) => {
            // Rising Mist
            const rmHots = ["Renewing Mist", "Essence Font (HoT)", "Enveloping Mist", "Essence Font (HoT - Faeline Stomp)"]
            const risingMistExtension = 4;
            const activeRMBuffs = state.activeBuffs.filter(function (buff) {return rmHots.includes(buff.name)})
            let expectedtargets = 0;
            // Apply heal to allies with ReM, EF or Enveloping Mist.
            // ReM and EF can be double counted here, slightly inflating value.
            // The addition of target markers in the buff list would solve this but isn't high priority.
            // Capped healed targets at 20 - this reduces RM healing on NF
            if (activeRMBuffs.length > 20)
                expectedtargets = 20;
            else expectedtargets = activeRMBuffs.length;

            const spell = { type: "heal", coeff: 0.28, overheal: 0.15, secondaries: ['crit', 'vers'], targets: expectedtargets} 
         
            if (activeRMBuffs.length > 0) runHeal(state, spell, "Rising Mist")

            // Extend ReM, EF and Enveloping Mist HoTs. Mark down the extension.
            activeRMBuffs.forEach((buff) => {
                if ('durationExtended' in buff) {
                    buff.durationExtended = buff.durationExtended + 1;
                }
                else {
                    buff.durationExtended = 1;
                }
                if ((buff.name === "Enveloping Mist" || buff.name === "Essence Font (HoT)" || buff.name === "Essence Font (HoT - Faeline Stomp") && buff.durationExtended <= 2) {
                    buff.expiration = buff.expiration + risingMistExtension;
                }
                if (buff.name === "Renewing Mist" && buff.durationExtended <= 5) {
                    buff.expiration = buff.expiration + risingMistExtension;
                }
                if ((buff.name === "Essence Font (HoT)" || buff.name === "Essence Font (HoT - Faeline Stomp") && buff.durationExtended <= 3 && state.settings.misc.includes("2T28")) {
                    buff.expiration = buff.expiration + risingMistExtension / 2;
                }
            })
        }
    },
    {
        type: "special",
        condition: "Ancient Teachings of the Monastery",
        runFunc: function (state) {
            if (state.activeBuffs.filter(function (buff) {return buff.name === "Ancient Teachings of the Monastery"}).length > 0)
            {
                const spell = { type: "heal", coeff: 2.151248 * 2.5 * 1.05 * GLOBALMODS.ARMOR, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
                runHeal(state, spell, "Ancient Teachings of the Monastery")
            }
        }
    },
    {
        type: "special",
        condition: "Chiji Active",
        runFunc: function (state) {
            const chijiBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Chiji Active"}).length > 0;
            const CTAchijiBuff = state.activeBuffs.filter(function (buff) {return buff.name === "CTA Chiji Active"}).length > 0;
            if (chijiBuff || CTAchijiBuff)
            {
                // Gusts healing from Chi-ji
                if (chijiBuff)
                {
                    const bonusMasteryProc = MONKSPELLS['Gust of Mists'][0];
                    runHeal(state, bonusMasteryProc, "Gust of Mists (Chiji)");
                    runHeal(state, bonusMasteryProc, "Gust of Mists (Chiji)");
                }

                // Gusts healing from CTA Chi-ji
                if (CTAchijiBuff) // Does CTA + Chiji active give double stacks?
                {
                    const bonusMasteryProc = MONKSPELLS['Gust of Mists'][0];
                    runHeal(state, bonusMasteryProc, "Gust of Mists (CTA Chiji)");
                    runHeal(state, bonusMasteryProc, "Gust of Mists (CTA Chiji)");
                }

                // Add stack of Chiji reduced mana cost
                const activeBuffs = state.activeBuffs;
                const chijiStacks = activeBuffs.filter(function (buff) {return buff.name === "Chiji Stacks"}).length;
                if (chijiStacks === 0) {
                    // Add buff
                    activeBuffs.push({name: "Chiji Stacks", buffType: "special", stacks: 1, expiration: 20})
                }
                else {
                    // Add stack of buff.
                    const buff = activeBuffs.filter(buff => buff.name === "Chiji Stacks")[0]
                    buff.stacks = Math.min(buff.stacks + 1, 3);
                    buff.expiration = 20;
                }
            }
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
            const SBHot = { type: "heal", coeff: 0.35, overheal: 0.3, secondaries: ['crit', 'vers'], duration:  4.5, hastedDuration: true}
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
        cost: 4.374, // Mana cost as a percent. 
        coeff: 2.83,
        overheal: 0.35,
        targets: 20,
        secondaries: ['crit', 'vers']
    }, 
    {
        type: "special",
        runFunc: function (state) {

            const masteryProc = MONKSPELLS['Gust of Mists'][0];
            for (var i = 0; i < 20; i++)
            {
                runHeal(state, masteryProc, "Gust of Mists (Revival)")
            }
        }
    }],
    "Weapons of Order":[{ // TODO: Implement WoO properly if ever needing to use reset function
        type: "buff",
        castTime: 0,
        cost: 5,
        cooldown: 120,
        buffDuration: 30,
        buffType: 'stats',
        stat: "mastery",
        value: 356.9
    },
    {
        type: "buff",
        buffType: "function",
        castTime: 0,
        cost: 0,
        tickRate: 4.5,
        buffDuration: 12,
        cooldown: 180,
        function: function (state) {
            // Yu'lon Soothing Breath
            if (state.settings.misc.includes("CTA") && !state.settings.misc.includes("Chiji")) 
            {
                const SBHot = { type: "heal", coeff: 0.35, overheal: 0.3, secondaries: ['crit', 'vers'], duration:  4.5, hastedDuration: true}
                const newBuff = {name: "Soothing Breath (CTA Yulon)", buffType: "heal", attSpell: SBHot, tickRate: 1.5, next: state.t + (1.5 / getHaste(state.currentStats)), hastedDuration: true, targets: 3}
                newBuff['expiration'] = state.t + SBHot.duration
                state.activeBuffs.push(newBuff)
            }

            // TODO: Make ongoing heal expire when Yulon ends.

            // TODO: Implement weaker CTA Enveloping breath
        }
    ,
        type: "special",
        runFunc: function (state) {
            if (state.settings.misc.includes("CTA"))
            {
                state.activeBuffs.push({name: "CTA Celestial Active", buffType: "special", expiration: state.t + 12})

                if (state.settings.misc.includes("Chiji"))
                {
                state.activeBuffs.push({name: "CTA Chiji Active", buffType: "special", expiration: state.t + 12})
                }
            }
            
            
        }
    }]
}


