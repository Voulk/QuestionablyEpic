import { getHaste, getHealth, runSpell } from "../Generic/RampBase";
import { checkBuffActive, getBuffStacks, addBuff, removeBuff } from "../Generic/BuffBase";
import { runHeal  } from "./HolyPaladinRamps";
import { STATCONVERSION } from "General/Engine/STAT"

// This is the Disc spell database. 
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

// Spell coefficients combine a spells base coefficient with any relevant auras that might impact the spell. 
export const PALADINSPELLDB = {
    //
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        type: "",
        castTime: 0.75,
        cost: 0,
    }],
    "Holy Shock": [{
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 2.6,
        coeff: 3.17,
        cooldownData: {cooldown: 9.5, hasted: true, charges: 1, maxCharges: 2, activeCooldown: 0},
        expectedOverheal: 0.17,
        holyPower: 1,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility', 'mastery']
    },
    { // Infusion of Light
        type: "buff",
        onCrit: true,
        name: "Infusion of Light",
        buffType: 'special',
        canStack: true,
        stacks: 1,
        maxStacks: 1,
        buffDuration: 30,
    }
],
    "Holy Shock O": [{
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "damage"},
        type: "heal",
        castTime: 0,
        cost: 2.6,
        coeff: 1.08, 
        cooldownData: {cooldown: 9.5, hasted: true, charges: 1, maxCharges: 2},
        holyPower: 1,
        statMods: {'crit': 0},
        secondaries: ['crit', 'versatility', 'mastery']
    }],
    "Flash of Light": [{
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 10,
        coeff: 3.156, 
        expectedOverheal: 0.14,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility', 'mastery']
    }],
    "Holy Light": [{
        spellData: {id: 19750, icon: "spell_holy_surgeoflight", cat: "heal"},
        type: "heal",
        castTime: 2,
        cost: 7,
        coeff: 11.2632, // 2.6 * 1.4,
        expectedOverheal: 0.21,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility', 'mastery']
    }],
    "Crusader Strike": [{
        spellData: {id: 35395, icon: "spell_holy_crusaderstrike", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 3,
        coeff: 0.473928, 
        cooldownData: {cooldown: 4.5, hasted: true},
        holyPower: 1,
        secondaries: ['crit', 'versatility']
    }],
    "Shield of the Righteous": [{
        spellData: {id: 53600, icon: "ability_paladin_shieldofvengeance", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 0,
        coeff: 0.425, // AP -> SP mult. 
        holyPower: -3,
        secondaries: ['crit', 'versatility']
    },
    {
        type: "cooldownReduction",
        cooldownReduction: 1.5,
        targetSpell: "Crusader Strike",
    }

    ],
    "Judgment": [{  
        spellData: {id: 20271, icon: "spell_holy_righteousfury", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 0.6,
        coeff: 0.671596,
        cooldownData: {cooldown: 11, hasted: false},
        holyPower: 1,
        statMods: {'crit': 0},
        secondaries: ['crit', 'versatility']
    }],
    "Hammer of Wrath": [{
        spellData: {id: 24275, icon: "spell_paladin_hammerofwrath", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 0.6,
        coeff: 1.11067, 
        cooldownData: {cooldown: 7.5, hasted: true},
        holyPower: 1,
        secondaries: ['crit', 'versatility']
    }],
    "Light of Dawn": [{
        spellData: {id: 85222, icon: "spell_paladin_lightofdawn", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0.6,
        coeff: 1.5456,
        expectedOverheal: 0.26,
        holyPower: -3,
        targets: 5,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility', 'mastery']
    }],
    "Word of Glory": [{
        spellData: {id: 0, icon: "inv_helmet_96", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0.6,
        coeff: 6.61815, // 3.15 x 1.91 x 1.1
        expectedOverheal: 0.3,
        holyPower: -3,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility', 'mastery']
    }],
    "Eternal Flame": [{
        spellData: {id: 0, icon: "inv_helmet_96", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0.6,
        coeff: 6.61815, // 3.15 x 1.91 x 1.1
        expectedOverheal: 0.25,
        holyPower: -3,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility', 'mastery']
    },
    {
        type: "buff",
        buffType: "heal",
        buffDuration: 16,
        coeff: 0.1254, // 0.114 x 1.1
        tickData: {tickRate: 2, canPartialTick: true, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'versatility', 'mastery']
    }
    ],
    "Dawnlight": [{ // Fake Spell
        spellData: {id: 0, icon: "inv_helmet_96", cat: "N/A"},
        type: "buff",
        buffType: "heal",
        buffDuration: 8,
        coeff: 3.6 / 4 + (3.6 / 4 * 0.08 * 10),
        tickData: {tickRate: 2, canPartialTick: true, tickOnCast: false}, 
        expectedOverheal: 0.3,
        secondaries: ['crit', 'versatility', 'mastery']
    },],
    "Sunsear": [{ // Fake Spell
        spellData: {id: 0, icon: "inv_helmet_96", cat: "N/A"},
        type: "buff",
        buffType: "heal",
        buffDuration: 4,
        coeff: 0.54 / 4, 
        tickData: {tickRate: 1, canPartialTick: true, tickOnCast: false}, 
        expectedOverheal: 0.4,
        secondaries: ['crit', 'versatility', 'mastery']

    }],
    "Holy Bulwark": [{
        spellData: {id: 0, icon: "inv_ability_lightsmithpaladin_holybulwark", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0,
        coeff: 0,
        flatHeal: getHealth({stamina: 360000}, {}) * 15,
        expectedOverheal: 0.05,
        secondaries: ['versatility']
    },
    {
        type: "buff",
        buffType: "heal",
        buffDuration: 20,
        flatHeal: getHealth({stamina: 360000}, {}) * 2,
        coeff: 0.1254, // 0.114 x 1.1
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.07,
        secondaries: ['versatility']
    },
    ],
    "Avenging Wrath": [{
        spellData: {id: 31884, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        name: "Avenging Wrath",
        castTime: 0,
        offGCD: true,
        cost: 0,
        cooldownData: {cooldown: 120, hasted: false},
        buffType: 'statsMult',
        stat: 'crit',
        value: 0, // For handling Avenging Wrath: Might
        buffDuration: 20
    }],
    "Avenging Crusader": [{
        spellData: {id: 216331, icon: "ability_paladin_veneration", cat: "cooldown"},
        type: "buff",
        name: "Avenging Crusader",
        castTime: 0,
        offGCD: true,
        cost: 3,
        cooldownData: {cooldown: 60, hasted: false},
        holyPower: -3,
        buffType: 'special',
        buffDuration: 15,
    }],
    "Divine Toll": [{
        spellData: {id: 375576, icon: "ability_bastion_paladin", cat: "cooldown"},
        type: "function",
        cost: 3,
        castTime: 0,
        cooldownData: {cooldown: 60, hasted: false},
        count: 5,
        runFunc: function (state, spell, spellDB) {
            // Cast 5 Holy Shocks           
            let totalHealing = 0;
            for (let i = 0; i < spell.count; i++) {
                state.holyPower = Math.max(5, state.holyPower + 1);
                //runSpell(spellDB["Holy Shock"], state, "Holy Shock (Divine Toll)", PALADINSPELLDB, true);
                runSpell(spellDB["Holy Shock"], state, "Holy Shock (Divine Toll)", PALADINSPELLDB, null, runHeal, null, {bonus: true})
            }

        }
    }],
    "Holy Prism": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 114165, icon: "spell_paladin_holyprism", cat: "cooldown"},
        castTime: 0,
        type: "heal",
        cost: 2.6,
        coeff: 3.15,
        targets: 5,
        secondaries: ['crit', 'versatility', 'mastery'],
        cooldownData: {cooldown: 30, hasted: false},
        expectedOverheal: 0.4,
    },
    {
        type: "damage",
        coeff: 2.16,
        targets: 1,
        secondaries: ['crit', 'versatility'],
    },],
    "Tyr's Deliverance": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 200652, icon: "inv_mace_2h_artifactsilverhand_d_01", cat: "cooldown"},
        castTime: 2,
        type: "heal",
        cost: 2,
        coeff: 0.351,
        targets: 5,
        secondaries: ['crit', 'versatility', 'mastery'],
        cooldownData: {cooldown: 90, hasted: false},
        expectedOverheal: 0.45,
    },
    {
        // 
        type: "buff",
        name: "Tyr's Deliverance",
        buffType: "heal",
        coeff: 0.351,
        targets: 1,
        secondaries: ['crit', 'versatility', 'mastery'],
        
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        canPartialTick: false,
        buffDuration: 20,
        buffCap: 60,
        tickRate: 1,
        expectedOverheal: 0.55,
    }],
    "Consecration": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 26573, icon: "spell_holy_innerfire", cat: "damage"},
        castTime: 0,
        cost: 0,
        coeff: 0.05 * 1.04, // AP boost.
        targets: 5,
        secondaries: ['crit', 'versatility'],
        cooldownData: {cooldown: 9, hasted: false}, // Technically 9
        type: "buff",
        name: "Consecration",
        buffType: "damage",
        buffDuration: 12,
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
    }],
    "Barrier of Faith": [{
        // Absorb on cast, then buff.
        spellData: {id: 148039, icon: "ability_paladin_barrieroffaith", cat: "heal"},
        castTime: 0,
        type: "heal",
        cost: 2.4,
        coeff: 5,
        targets: 1,
        secondaries: ['crit', 'versatility'], // No mastery scaling
        cooldownData: {cooldown: 30, hasted: false}, // Technically 9
        expectedOverheal: 0.4,
    },
    {
        // 
        type: "buff",
        name: "Barrier of Faith",
        buffType: "special",
        targets: 1,
        buffDuration: 24,
    }],
    "Beacon of Virtue": [{
        spellData: {id: 200025, icon: "ability_paladin_beaconofinsight", cat: "cooldown"},
        type: "buff",
        name: "Beacon of Virtue",
        castTime: 0,
        cost: 4,
        cooldownData: {cooldown: 15, hasted: false}, 
        buffType: 'special',
        buffDuration: 8,
    }],
    "Divine Favor": [{
        spellData: {id: 210294, icon: "spell_holy_heal", cat: "cooldown"},
        type: "buff",
        name: "Divine Favor",
        castTime: 0,
        cost: 0,
        cooldownData: {cooldown: 30, hasted: false}, 
        offGCD: true,
        buffType: 'special',
        buffDuration: 99,
    }],
    "Aura Mastery": [{
        spellData: {id: 31821, icon: "spell_holy_auramastery", cat: "cooldown"},
        type: "buff",
        name: "Aura Mastery",
        castTime: 0,
        cost: 0,
        cooldownData: {cooldown: 180, hasted: false}, 
        buffType: 'special',
        buffDuration: 8,
    }],
    "Blessing of Seasons": [{ // Rotating Buff, handles rotation. 
        spellData: {id: 388007, icon: "", cat: "cooldown"},
        type: "function",
        cost: 1,
        castTime: 0,
        cooldownData: {cooldown: 45, hasted: false}, 
        runFunc: function (state, spell, spellDB) {
            // Activatate the next buff, then increment the buff number
            const stacker = {
                name: "Blessing of Seasons Stacker",
                canStack: true,
                type: "buff",
                buffType: "special",
                buffDuration: 999, // Hidden buff in game.
                maxStacks: 3,    
            };

            if (checkBuffActive(state.activeBuffs, "Blessing of Seasons Stacker")) {
                if (getBuffStacks(state.activeBuffs, "Blessing of Seasons Stacker") === 1)
                {
                    // 1 = Blessing of Autumn
                    const buff = {
                        name: "Blessing of Autumn",
                        type: "buff",
                        buffType: "special",
                        value: 0.3, // Unused, implemented in sequence
                        buffDuration: 30, 
                    };

                    state.activeBuffs.push(buff);
                    state.activeBuffs.push(stacker);
                }
                
                if (getBuffStacks(state.activeBuffs, "Blessing of Seasons Stacker") === 2)
                {
                    // 2 = Blessing of Winter
                    state.manaSpent -= 0.15 * 250000; // Would much rather this use the value in PALADINCONSTANTS
                    state.activeBuffs.push(stacker);
                }
                
                if (getBuffStacks(state.activeBuffs, "Blessing of Seasons Stacker") === 3)
                {
                    // 3 = Blessing of Spring
                    const buff = {
                        name: "Blessing of Spring",
                        type: "buff",
                        buffType: "special", // Ignores healing received
                        value: 0.15, // Unused, implemented in getHealingMult
                        buffDuration: 30, 
                    };

                    state.activeBuffs.push(buff);
                    removeBuff(state.activeBuffs, "Blessing of Seasons Stacker");
                }
            } else {
                // 0 = Blessing of Summer
                const buff = {
                    name: "Blessing of Summer",
                    type: "buff",
                    buffType: "special",
                    value: 0.4 * 0.2, // Unused, implemented in getDamMulti
                    buffDuration: 30, 
                };

                state.activeBuffs.push(buff);
                state.activeBuffs.push(stacker);
            }
        }
    }],
}

// These could be reworked to take state and to do the work here instead of in its own big function.
export const baseTalents = { 
    // == Paladin Class Tree ==
    /*
    talentName: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 4, runFunc: function (state, spellDB, points) {

    }}, 
    */

    // == Holy Tree ==
    // Seal of Alacrity (2% haste pp + 0.5s off Judgment CD)
    // REMOVED in 11.0.5
    /*sealOfAlacrity: {points: 2, maxPoints: 2, icon: "spell_holy_sealofvengeance", id: 385425, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // We'll add this via a buff because it's a multiplicative stat gain and needs to be applied post-DR.
        const buff = {
            name: "Seal of Alacrity",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'haste',
            value: (0.02 * points + 1)
        };
        addBuff(state, buff, "Seal of Alacrity")

        spellDB['Judgment'][0].cooldownData.cooldown -= (0.5 * points);
    }}, */

    // Seal of Might (2% base mastery pp + 2% intellect)
    sealOfMight: {points: 2, maxPoints: 2, icon: "spell_holy_sealofwrath", id: 385450, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // We'll add this via a buff because it's a multiplicative stat gain and needs to be applied post-DR.
        const buff = {
            name: "Seal of Might",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'mastery',
            value: (0.02 * points + 1)
        };
        addBuff(state, buff, "Seal of Might")

        //stats.intellect *= (1 + 0.02 * points);
    }}, 

    overflowingLight: {points: 1, maxPoints: 1, icon: "spell_holy_holyguidance", id: 414127, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // Handled inside.
    }},

    glisteningRadiance: {points: 1, maxPoints: 1, icon: "spell_holy_holyguidance", id: 414127, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // Handled inside.
        const savedByTheLight = {
            name: "Saved by the Light",
            type: "heal",
            coeff: 9 * 0.25 * 0.33,
            expectedOverheal: 0.05,
            targets: state.beacon === "Beacon of Virtue" ? 5 * 0.5 : 2,
            secondaries: ['versatility']
        }

        spellDB['Eternal Flame'].push(savedByTheLight);
        spellDB['Light of Dawn'].push(savedByTheLight);
        spellDB['Word of Glory'].push(savedByTheLight);


    }},

    // Afterimage - After spending 20 HoPo, next WoG cleaves for +30%.

    // Golden Path - Consecration heals 6 allies on tick.
    goldenPath: {points: 1, maxPoints: 1, icon: "ability_priest_cascade", id: 377128, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Consecration'].push({
            type: "buff",
            name: "Golden Path",
            buffType: "heal",
            coeff: 0.05 * 1.04,
            buffDuration: 12,
            expectedOverheal: 0.5,
            targets: 6, // You and 5 allies
            tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
            secondaries: ['crit', 'versatility', 'haste', 'mastery']
        })
    }},

    // Seal of Mercy - Golden Path heals the lowest health ally an additional time for 100% value.
    // REMOVED
    /*sealOfMercy: {points: 1, maxPoints: 1, icon: "spell_holy_greaterblessingofsalvation", id: 384897, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Consecration'][1].targets += 1;
    }},*/

    // Judgment of Light - Judgment heals allies 5 times.
    judgmentOfLight: {points: 1, maxPoints: 1, icon: "spell_holy_divineprovidence", id: 183778, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            name: "Judgment of Light",
            type: "heal",
            coeff: 0.175,
            expectedOverheal: 0.28,
            targets: 5,
            secondaries: ['crit', 'versatility', 'mastery']
        });

    }}, 

    // Holy Aegis - Crit +2% per point.
    holyAegis: {points: 1, maxPoints: 1, icon: "ability_paladin_touchedbylight", id: 385515, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // We'll add this via a buff because it's a multiplicative stat gain and needs to be applied post-DR.
        const buff = {
            name: "Holy Aegis",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'crit',
            value: (4 * points * STATCONVERSION.CRIT),
        };
        addBuff(state, buff, "Holy Aegis")

    }}, 

    // Crusader's Reprieve - Small self-heal on Crusader Strike (2% max health).

    // Strength of Conviction - While in Consecration, SotR and Word of Glory deal 10/20% more damage and healing. 

    // Divine Purpose - HoPo abilities have a chance to make your next HoPo ability free and deal +15% damage or healing.
    divinePurpose: {points: 1, maxPoints: 1, icon: "spell_holy_divinepurpose", id: 223817, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const buffSpell = {
            name: "Divine Purpose",
            chance: 0.15, //1,//0.15, //0.075 * points,
            type: 'buff',
            buffType: 'special',
            value: 1.15,
            buffDuration: 25, // Irrelevant. 
        }

        spellDB['Light of Dawn'].push(buffSpell);
        spellDB['Word of Glory'].push(buffSpell);
        spellDB['Avenging Crusader'].push(buffSpell);
    }}, 

    // Justification. +10% Judgment damage.
    // REMOVED
    /*justification: {points: 1, maxPoints: 1, icon: "ability_paladin_empoweredsealsrighteous", id: 377043, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'][0].coeff *= 1.1;
    }},*/

    // SotR heals 5 nearby allies for 1% max health. Doesn't scale with anything. 
    lightforgedBlessing: {points: 0, maxPoints: 1, icon: "spell_holy_circleofrenewal", id: 406468, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Shield of the Righteous'].push({
            type: "heal",
            coeff: 0,
            flatHeal: getHealth(state.currentStats, {}) * 0.01,
            expectedOverheal: 0.20,
            targets: 3,
            statMods: {'crit': 0},
            secondaries: [] // TODO: Check secondary scaling
        })
    }},

    sealOfTheCrusader: {points: 0, maxPoints: 2, icon: "spell_holy_holysmite", id: 385728, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        // Seal of the Crusader heals when we connect a weapon swing. We don't actually swing here, but a HoT is effectively the same.
        const buff = {
            type: "buff",
            buffType: "heal",
            coeff: 0.1 * points * 1.04, 
            tickData: {tickRate: 2.6, canPartialTick: false, tickOnCast: false}, 
            targets: 1,
            buffDuration: 999,
            expectedOverheal: 0.5,
            secondaries: ['crit', 'versatility'], // + Haste
        };
        addBuff(state, buff, "Seal of the Crusader")
    }},

    // Zealot's Paragon - Hammer of Wrath and Judgment deal 10% additional damage and extend the duration of Avenging Crusader by 0.5s.
    // == REMOVED ==
    /*
    zealotsParagon: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            type: "extendBuff",
            value: 0.5,
            targetSpell: "Avenging Wrath",
        });
        spellDB['Hammer of Wrath'].push({
            type: "extendBuff",
            value: 0.5,
            targetSpell: "Avenging Wrath",
        });
        spellDB['Judgment'][0].coeff *= 1.1;
        spellDB['Hammer of Wrath'][0].coeff *= 1.1;
    }},  */

    // Lightforged Blessing
    // SotR heals you and 4 nearby allies for 1% max health. Not buffed by Strength of Conviction.

    // Divine Resonance - Buff that casts a free Holy Shock every 5s for 15s.

    // Quickened Invocation - 15s off DT cooldown.
    quickenedInvocation: {points: 1, maxPoints: 1, icon: "spell_holy_pureofheart", id: 379391, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Divine Toll'][0].cooldownData.cooldown -= 15;
    }}, 

    // Of Dusk and Dawn - Casting 3 HoPo generating abilities increases healing of next spender by 20%. 
    ofDuskAndDawn: {points: 0, maxPoints: 1, icon: "spell_paladin_lightofdawn", id: 385125, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const dawnStacker = {
            name: "Blessing of Dawn Stacker",
            canStack: true,
            type: "buff",
            buffType: "special",
            buffDuration: 999, // Hidden buff in game.
            maxStacks: 3,

        }

        // Daybreak and Divine Toll gain a stack per Holy Shock
        spellDB['Holy Shock'].push(dawnStacker);
        spellDB['Judgment'].push(dawnStacker);
        spellDB['Flash of Light'].push(dawnStacker);
        spellDB['Holy Light'].push(dawnStacker);
        spellDB['Crusader Strike'].push(dawnStacker);
        spellDB['Hammer of Wrath'].push(dawnStacker);
    }},

    // Seal of Order - Dawn is 30% instead of 20%. Dusk causes HoPo generators to cool down 10% faster.
    sealOfOrder: {points: 0, maxPoints: 1, icon: "spell_holy_sealofwisdom", id: 385129, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const cooldownMultiplier = 0.9; // Dusk uptime is basically 100%.
        spellDB['Holy Shock'][0].cooldownData.cooldown *= cooldownMultiplier;
        spellDB['Judgment'][0].cooldownData.cooldown *= cooldownMultiplier;
        spellDB['Divine Toll'][0].cooldownData.cooldown *= cooldownMultiplier;
        spellDB['Hammer of Wrath'][0].cooldownData.cooldown *= cooldownMultiplier;
        spellDB['Crusader Strike'][0].cooldownData.cooldown *= cooldownMultiplier;

        // Seal of Order also increases the power of Dawn by 10%.
    }}, 

    // Fading Light - 
    fadingLight: {points: 0, maxPoints: 1, icon: "spell_shadow_sealofkings", id: 405768, select: true, tier: 4, runFunc: function (state, spellDB, points) {

        // Fading Light also increases the power of Dawn by 10%. 
    }}, 


    // Judgment also adds an absorb to the target.
    greaterJudgment: {points: 1, maxPoints: 1, icon: "spell_holy_righteousfury", id: 231663, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            name: "Greater Judgment",
            type: "heal",
            coeff: 1.38,
            expectedOverheal: 0.04,
            targets: 1,
            secondaries: ['crit', 'versatility']
        })
    }},

    // === Spec Tree ===
    // Crusader's Might
    crusadersMight: {points: 1, maxPoints: 1, icon: "ability_paladin_swiftretribution", id: 196926, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Crusader Strike'].push({
            type: "cooldownReductions",
            cooldownReduction: 2 * points,
            targetSpells: ["Holy Shock", "Judgment"],
        });

    }}, 

    // Shining Savior - WoG / LoD +5%.
    // == REMOVED ==
    /*
    shiningSavior: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Word of Glory'][0].coeff *= 1.05;
        spellDB['Light of Dawn'][0].coeff *= 1.05;
    }},  */

    // Resplendent Light - Holy Light splashes to 5 targets for 8% each.
    // This ISN'T AOE reduced by Beacon, and scales off of raw healing, not effective
    resplendentLight: {points: 1, maxPoints: 1, icon: "ability_priest_voidshift", id: 392902, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Light'].push({
            type: "heal",
            coeff: spellDB['Holy Light'][0].coeff * 0.08,
            expectedOverheal: 0.5,
            targets: 5,
            secondaries: ['crit', 'versatility', 'mastery']
        })
    }}, 

    // Divine Insight - +1 Holy shock charge
    divineInsight: {points: 1, maxPoints: 1, icon: "spell_holy_pureofheart", id: 392914, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].charges += 1;
    }}, 

    // Tower of Radiance - Casting FoL / HL on Beacon gives +1 HoPo. Casting FoL / HL on anyone else has a chance to give +1 HoPo.

    // Inbued Infusions - Consuming IoL reduces the CD of Holy Shock by 2s.
    // Implemented in function.
    imbuedInfusions: {points: 1, maxPoints: 1, icon: "ability_priest_flashoflight", id: 392961, select: true, tier: 4, runFunc: function (state, spellDB, points) { }},

    // Divine Rev - While empowered by IoL, Flash heals for +20% and Holy Light refunds 1% mana.
    // Handled inside.
    divineRevelations: {points: 1, maxPoints: 1, icon: "ability_paladin_infusionoflight", id: 387808, select: true, tier: 4, data: {manaReturn: 0.005 * 250000, flashBonus: 1.2}, runFunc: function (state, spellDB, points) {}},

    // Commanding Light - Beacon transfers an extra 10/20%. Baked in for now.

    // Divine Glimpse - Holy Shock / Judgment have +8% crit chance.
    divineGlimpse: {points: 1, maxPoints: 1, icon: "spell_holy_healingaura", id: 387805, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].statMods.crit += (0.08 * points);
        spellDB['Judgment'][0].statMods.crit += (0.08 * points);
    }}, 

    extrication: {points: 1, maxPoints: 1, icon: "ability_paladin_righteousvengeance", id: 461278, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Eternal Flame'][0].statMods.crit += (0.1 * points);
        spellDB['Light of Dawn'][0].statMods.crit += (0.1 * points);
        spellDB['Word of Glory'][0].statMods.crit += (0.1 * points);
    }}, 

    truthPrevails: {points: 1, maxPoints: 1, icon: "spell_holy_spiritualguidence", id: 461273, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            type: "heal",
            name: "Truth Prevails",
            coeff: 2.4,
            expectedOverheal: 0.15, 
            targets: 1,
            secondaries: ['crit', 'versatility', 'mastery']
        })
        spellDB['Judgment'][0].cost *= 0.7;
    }}, 

    // Sanctified Wrath - Holy Shock CD reduced by 40% during wings. +5s Wings duration.
    // Note that the CD portion is handled in Ramps instead of here.
    // == REMOVED ==
    
    sanctifiedWrath: {points: 0, maxPoints: 1, icon: "ability_paladin_judgementsofthejust", id: 53376, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Avenging Wrath'][0].buffDuration += 5;
    }},

    // Second Sunrise - Light of Dawn heals a second time for 20% of the amount.
    // TODO: Check if Empyrean Legacy affects both.
    // We'll probably end up converting this to an actual second cast in otrder to adjust its overhealing up.
    // == REMOVED ==
    /*
    secondSunrise: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Light of Dawn'][0].coeff *= 1.2;
    }}, */ 

    // Veneration - Flash of Light, Holy Light and Judgment critical strikes reset the CD of Hammer of Wrath and make it usable on any target.
    veneration: {points: 0, maxPoints: 1, icon: "ability_crown_of_the_heavens_icon", id: 392938, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Hammer of Wrath'][0].convertToHealing = 2;
        const venerationBuff = { // Push a HoW reset
            type: "buff",
            onCrit: true,
            name: "Veneration",
            buffType: 'special',
            canStack: false,
            stacks: 1,
            buffDuration: 30,
        };
        spellDB['Flash of Light'].push(venerationBuff);
        spellDB['Holy Light'].push(venerationBuff);
        spellDB['Judgment'].push(venerationBuff);

    }},


    // Might - Gain 20% Crit during wings. Currently just built in.
    avengingCrusader: {points: 0, maxPoints: 1, icon: "ability_paladin_veneration", id: 216331, select: true, tier: 4, runFunc: function (state, spellDB, points) { }},

    /*might: {points: 1, maxPoints: 1, icon: "spell_holy_avenginewrath", id: 384442, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Avenging Wrath'][0].value = (20 * STATCONVERSION.CRIT);
    }},*/

    // Power of the Silver Hand - HL and FoL have a chance to give you a buff, increasing the healing of the next HS you cast by 10% of the damage / healing you do in the next 10s.

    // Spending Holy Power gives you +1% haste for 12s. Stacks up to 5 times.
    relentlessInquisitor: {points: 0, maxPoints: 1, icon: "spell_holy_mindvision", id: 383388, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // We'll add this via a buff because it's a multiplicative stat gain and needs to be applied post-DR.
        const buff = {
            name: "Relentless Inquisitor",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'haste',
            value: (0.05 * points + 1)
        };
        addBuff(state, buff, "Relentless Inquisitor")

    }}, 

    // Holy Infusion
    // Crusader strike generates +1 HoPo and deals +25% damage.
    /*holyInfusion: {points: 0, maxPoints: 1, icon: "ability_paladin_lightoftheprotector", id: 414214, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Crusader Strike'][0].coeff *= 1.25;
        spellDB['Crusader Strike'][0].holyPower += 1;
    }},*/

    // Awestruck
    // Holy Shock, Holy Light, Flash of Light critical healing increased by 20%..
    aweStruck: {points: 1, maxPoints: 1, icon: "ability_paladin_blindinglight2", id: 417855, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Flash of Light'][0].statMods.critEffect += 0.2;
        spellDB['Holy Light'][0].statMods.critEffect += 0.2;
        spellDB['Holy Shock'][0].statMods.critEffect += 0.2;
    }},

    // Awakening - WoG / LoD 
    // When we get 12 stacks, remove Awakening buff, and add "Awakening - Final". Awakening Final causes the next Judgment cast to crit, deal 30% more damage and activate
    // wings for 12s.
    // Judgment crit portion not currently included but also very minor since it has no healing implications.
    awakening: {points: 0, maxPoints: 1, icon: "inv_helm_plate_raidpaladin_n_01", id: 414195, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const awakeningBuff = {
            name: "Awakening",
            canStack: true,
            type: "buff",
            buffType: "special",
            buffDuration: 999,
            maxStacks: 12,

        }

        spellDB['Light of Dawn'].push(awakeningBuff);
        spellDB['Word of Glory'].push(awakeningBuff);
        spellDB['Eternal Flame'].push(awakeningBuff);
    }}, 



    // Holy Shock has a 12% chance to refund a charge when cast and it's healing is increased by 10%.
    gloriousDawn: {points: 1, maxPoints: 1, icon: "ability_paladin_holyavenger", id: 414065, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const resetSlice = {
            type: "function",
            runFunc: function (state, spell, spellDB) {
                const holyShock = spellDB["Holy Shock"];

                const roll = Math.random();
                const canProceed = roll < 0.12;

                // Previous logic, with charges bandaid fix would have been giving 2 charges
                //if (canProceed) holyShock[0].activeCooldown = 0;
                // New logic, counts as giving one extra charge.
                if (canProceed) holyShock[0].cooldownData.activeCooldown = 0 // holyShock[0].cooldownData.cooldown / getHaste(state.currentStats)
            }
        }

        spellDB['Holy Shock'].push(resetSlice);
        spellDB['Holy Shock'].coeff *= 1.1;
    }},

    // Daybreak
    // Consume glimmers, triggering their effects at 200% value and granting 3k mana per glimmer consumed. 
    daybreak: {points: 1, maxPoints: 1, icon: "", id: 0, select: false, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active spell.
    }},


    // Barrier of Faith
    barrierOfFaith: {points: 1, maxPoints: 1, icon: "ability_paladin_barrieroffaith", id: 148039, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active spell.
    }},

    // Reclamation - Holy Shock and Judgement refund mana and deal extra damage/healing based on target's health
    reclamation: {points: 0, maxPoints: 1, icon: "ability_paladin_longarmofthelaw", id: 415364, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Handled in ramp / constants
    }},

    // Rising Sunlight - After casting Daybreak your next 2 Holy Shocks cast 2 additional times.
    risingSunlight: {points: 1, maxPoints: 1, icon: "spell_priest_divinestar_holy", id: 414203, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        const risingSunlight = {
            name: "Rising Sunlight",
            type: "buff",
            buffType: 'special',
            canStack: true,
            stacks: 2,
            buffDuration: 20,
        }
        
        spellDB['Avenging Wrath'].push(risingSunlight);
        spellDB['Avenging Crusader'].push(risingSunlight);
        spellDB['Divine Toll'].push(risingSunlight);
    }},

    tyrsDeliverance: {points: 1, maxPoints: 1, icon: "inv_mace_2h_artifactsilverhand_d_01", id: 200652, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active spell.
    }},

    // Empyrean Legacy - Judgment empowers the next WoD to automatically cast Light of Dawn with +25% effectiveness. 30s cooldown.

    // Boundless Salvation
    boundlessSalvation: {points: 1, maxPoints: 1, icon: "ability_paladin_selflesshealer", id: 392951, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB["Tyr's Deliverance"][1].buffDuration = 60;
    }},

    // Inflorescence of the Sunwell
    inflorescenceOfTheSunwell: {points: 1, maxPoints: 1, icon: "spell_lfieblood", id: 392907, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Holy Shock'][1].stacks = 2;
        spellDB['Holy Shock'][1].maxStacks = 2;

    }},



    // Righteous Judgment 
    righteousJudgment: {points: 0, maxPoints: 1, icon: "ability_priest_holybolts01", id: 414113, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Judgment'].push({
            type: "buff",
            name: "Righteous Judgment (Golden Path)",
            buffType: "heal",
            coeff: 0.05 / 2,
            buffDuration: 12,
            expectedOverheal: 0.50,
            targets: 6,
            tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
            secondaries: ['crit', 'versatility', 'haste']
        })

        spellDB['Judgment'].push({
            type: "buff",
            name: "Righteous Judgment",
            buffType: "damage",
            coeff: 0.05 / 2 * 1.05,
            buffDuration: 12,
            targets: 5,
            tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
            secondaries: ['crit', 'versatility', 'haste']
        })
    }},

    // Blessing of Seasons
    blessingOfSeasons: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active Spell
    }},

    // Merciful Auras - Aura of Mercy
    mercifulAuras: {points: 0, maxPoints: 1, icon: "spell_holy_blessedlife", id: 183415, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        const buff = {
            type: "buff",
            buffType: "heal",
            coeff: 0.1552, 
            tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
            targets: 3,
            buffDuration: 999,
            expectedOverheal: 0.5,
            secondaries: ['crit', 'versatility', 'mastery'], // Not Hasted
        };

        addBuff(state, buff, "Merciful Auras (Passive)")

        spellDB['Aura Mastery'].push({
            type: "buff",
            name: "Merciful Auras (Active)",
            buffType: "heal",
            coeff: 0.21 * 1.5 * (1 - .143),
            buffDuration: 8,
            expectedOverheal: 0.30,
            targets: 20,
            tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
            secondaries: ['crit', 'versatility', 'mastery']
        })
    }},


    // Herald of the Sun
    luminosity: {points: 1, maxPoints: 1, icon: "inv_qirajidol_sun", id: 431402, heroTree: "heraldOfTheSun", select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].statMods.crit += (0.05 * points);
        spellDB['Light of Dawn'][0].statMods.crit += (0.05 * points);
    }}, 
    dawnlight: {points: 1, maxPoints: 1, icon: "ability_paladin_empoweredsealsrighteous", id: 377043, heroTree: "heraldOfTheSun", select: true, tier: 4, runFunc: function (state, spellDB, points) {

    }},

    // Lightsmith
    // Rite of Sanctification

    // Divine Guidance

    // Hammer and Anvil
    hammerAndAnvil: {points: 1, maxPoints: 1, icon: "", id: 377043, heroTree: "lightsmith", select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const data = {
            name: "Hammer and Anvil",
            type: "heal",
            coeff: 2,
            expectedOverheal: 0.3,
            secondaries: ['versatility', 'crit']
        }

        spellDB['Judgment'].push(data);

    }},


    // Meta
    judgementInfusionUseIfUp: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 4, runFunc: function (state, spellDB, points) { 
        // Meta talent, doesn't do anything except impact APL
    }},
 
    judgementInfusionHold: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 4, runFunc: function (state, spellDB, points) { 
        // Meta talent, doesn't do anything except impact APL
    }},
}
