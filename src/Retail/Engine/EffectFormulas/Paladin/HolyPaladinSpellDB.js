import { addBuff, getHaste, getHealth, getBuffStacks, removeBuff, checkBuffActive } from "../Generic/RampBase";
import { runHeal, triggerGlimmerOfLight, runSpell } from "./HolyPaladinRamps2";

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
        cost: 2.4,
        coeff: 1.535, // 1.395, 
        cooldown: 8.5,
        charges: 1,
        expectedOverheal: 0.22,
        holyPower: 1,
        hastedCooldown: true,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'vers', 'mastery']
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
        coeff: 0.612, 
        cooldown: 8.5,
        expectedOverheal: 0.29,
        holyPower: 1,
        hastedCooldown: true,
        statMods: {'crit': 0},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Flash of Light": [{
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 3.6,
        coeff: 2.727, // Test this since it's an aura mess.
        expectedOverheal: 0.14,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Light of the Martyr": [{
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 1.6,
        coeff: 2.3, // Not final
        expectedOverheal: 0.15,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Holy Light": [{
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 2.5,
        cost: 2.4,
        coeff: 3.25, // 
        expectedOverheal: 0.21,
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Crusader Strike": [{
        spellData: {id: 35395, icon: "spell_holy_crusaderstrike", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 1.6,
        coeff: 1.071, 
        cooldown: 6,
        holyPower: 1,
        hastedCooldown: true,
        secondaries: ['crit', 'vers']
    }],
    "Shield of the Righteous": [{
        spellData: {id: 35395, icon: "spell_holy_crusaderstrike", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 0,
        coeff: 0.5525 * 1.04, // AP -> SP mult. 
        holyPower: -3,
        secondaries: ['crit', 'vers']
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
        cost: 2.4,
        coeff: 1.125,
        cooldown: 12,
        holyPower: 1,
        statMods: {'crit': 0},
        secondaries: ['crit', 'vers']
    }],
    "Hammer of Wrath": [{
        spellData: {id: 24275, icon: "spell_paladin_hammerofwrath", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 1,
        coeff: 1.302, 
        cooldown: 7.5,
        hastedCooldown: true,
        stacks: 1,
        holyPower: 1,
        secondaries: ['crit', 'vers']
    }],
    "Light of Dawn": [{
        spellData: {id: 85222, icon: "spell_paladin_lightofdawn", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 1.2,
        coeff: 0.8334,
        expectedOverheal: 0.26,
        holyPower: -3,
        targets: 5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Word of Glory": [{
        spellData: {id: 0, icon: "", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 1.2,
        coeff: 3.15, //2.89
        expectedOverheal: 0.3,
        holyPower: -3,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Avenging Wrath": [{
        spellData: {id: 31884, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        name: "Avenging Wrath",
        castTime: 0,
        offGCD: true,
        cost: 0,
        cooldown: 120,
        buffType: 'statsMult',
        stat: 'crit',
        value: 0, // For handling Avenging Wrath: Might
        buffDuration: 20
    }],
    "Avenging Crusader": [{
        spellData: {id: 318849, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        name: "Avenging Crusader",
        castTime: 0,
        offGCD: true,
        cost: 3.6,
        cooldown: 60,
        holyPower: -3,
        buffType: 'special',
        buffDuration: 12,
    }],
    "Divine Toll": [{
        spellData: {id: 31884, icon: "", cat: "cooldown"},
        type: "function",
        cost: 3,
        castTime: 0,
        cooldown: 60,
        count: 5,
        runFunc: function (state, spell, spellDB) {
            // Cast 5 Holy Shocks           
            for (let i = 0; i < spell.count; i++) {
                state.holyPower = Math.max(5, state.holyPower + 1);
                runSpell(spellDB["Holy Shock"], state, "Holy Shock (Divine Toll)", PALADINSPELLDB, true);
            }

            triggerGlimmerOfLight(state, "Divine Toll");

        }
    }],
    "Daybreak": [{ // Absorb all glimmers, healing for twice the amount.
        spellData: {id: 31884, icon: "", cat: "cooldown"},
        type: "function",
        cost: 0,
        castTime: 0,
        cooldown: 60,
        runFunc: function (state, spell, spellDB) {
            // Activates Glimmer on all targets for 200% value
            const numGlimmers = state.activeBuffs.filter(buff => buff.name === "Glimmer of Light").length;
            const triggeredGlimmer = {
                name: "Glimmer of Light (Daybreak)",
                coeff: 1.6416 * 2, // This version of the spell is not split, activates on every target at 200% base value, but is not increased by number of targets
                targets: numGlimmers,
                expectedOverheal: 0.25,
                secondaries: ["crit", "vers", "mastery"],
                type: "heal",
            }

            runHeal(state, triggeredGlimmer, "Glimmer of Light (Daybreak)", true);
            state.manaSpent -= 3000 * numGlimmers;

        }
    }],
    "Light's Hammer": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal"},
        castTime: 0,
        type: "heal",
        cost: 3.6,
        coeff: 0.4 * 1.6,
        targets: 6,
        secondaries: ['crit', 'vers', 'mastery'],
        cooldown: 60,
        expectedOverheal: 0.4,
    },
    {
        // 
        type: "buff",
        name: "Light's Hammer",
        buffType: "heal",
        coeff: 0.4 * 1.6,
        targets: 6,
        secondaries: ['crit', 'vers', 'mastery'],
        canPartialTick: false,
        buffDuration: 14,
        tickRate: 2,
        expectedOverheal: 0.45,
    }],
    "Tyr's Deliverance": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal"},
        castTime: 2,
        type: "heal",
        cost: 2.4,
        coeff: 0.7375,
        targets: 5,
        secondaries: ['crit', 'vers', 'mastery'],
        cooldown: 90,
        expectedOverheal: 0.45,
    },
    {
        // 
        type: "buff",
        name: "Tyr's Deliverance",
        buffType: "heal",
        coeff: 0.7375,
        targets: 1,
        secondaries: ['crit', 'vers', 'mastery'],
        canPartialTick: false,
        buffDuration: 20,
        buffCap: 60,
        tickRate: 1,
        expectedOverheal: 0.55,
    }],
    "Consecration": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal"},
        castTime: 0,
        cost: 0,
        coeff: 0.05 * 1.04 * 1.05, // AP boost.
        targets: 5,
        secondaries: ['crit', 'vers'],
        cooldown: 11, // Technically 9
        type: "buff",
        name: "Consecration",
        buffType: "damage",
        canPartialTick: false,
        buffDuration: 12,
        tickRate: 1,
    }],
    "Barrier of Faith": [{
        // Absorb on cast, then buff.
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal"},
        castTime: 0,
        type: "heal",
        cost: 2.4,
        coeff: 5,
        targets: 1,
        secondaries: ['crit', 'vers'], // No mastery scaling
        cooldown: 30,
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
        spellData: {id: 200025, icon: "BeaconOfVirtueIcon", cat: "cooldown"},
        type: "buff",
        name: "Beacon of Virtue",
        castTime: 0,
        cost: 4,
        cooldown: 15,
        buffType: 'special',
        buffDuration: 8,
    }],
    "Aura Mastery": [{
        spellData: {id: 31821, icon: "spell_holy_auramastery", cat: "cooldown"},
        type: "buff",
        name: "Aura Mastery",
        castTime: 0,
        cost: 0,
        cooldown: 180,
        buffType: 'special',
        buffDuration: 8,
    }],
    "Blessing of Seasons": [{ // Rotating Buff, handles rotation. 
        spellData: {id: 388007, icon: "", cat: "cooldown"},
        type: "function",
        cost: 1,
        castTime: 0,
        cooldown: 45,
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
                    value: 0.4 * 0.3, // Unused, implemented in getDamMulti
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
    talentName: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {

    }}, 


    // == Holy Tree ==
    // Seal of Alacrity (2% haste pp + 0.5s off Judgment CD)
    sealOfAlacrity: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
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

        spellDB['Judgment'][0].cooldown -= (0.5 * points);
    }}, 

    // Seal of Might (2% base mastery pp + 2% intellect)
    sealOfMight: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
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

    overflowingLight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // Handled inside.
    }},

    // Afterimage - After spending 20 HoPo, next WoG cleaves for +30%.

    // Golden Path - Consecration heals 6 allies on tick.
    goldenPath: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Consecration'].push({
            type: "buff",
            name: "Golden Path",
            buffType: "heal",
            coeff: 0.05,
            buffDuration: 12,
            expectedOverheal: 0.5,
            targets: 6,
            tickRate: 1,
            secondaries: ['crit', 'versatility', 'haste']
        })
    }},

    // Seal of Mercy - Golden Path heals the lowest health ally an additional time for 100% value.
    sealOfMercy: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Consecration'][1].targets += 1;
    }},

    // Judgment of Light - Judgment heals allies 5 times.
    judgmentOfLight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            name: "Judgment of Light",
            type: "heal",
            coeff: 0.175,
            expectedOverheal: 0.28,
            targets: 5,
            secondaries: ['crit', 'vers', 'mastery']
        });

    }}, 

    // Holy Aegis - Crit +2% per point.
    holyAegis: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
        // We'll add this via a buff because it's a multiplicative stat gain and needs to be applied post-DR.
        const buff = {
            name: "Holy Aegis",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'crit',
            value: (0.02 * points + 1)
        };
        addBuff(state, buff, "Holy Aegis")

    }}, 

    // Crusader's Reprieve - Small self-heal on Crusader Strike (2% max health).

    // Strength of Conviction - While in Consecration, SotR and Word of Glory deal 10/20% more damage and healing. 

    // Divine Purpose - HoPo abilities have a chance to make your next HoPo ability free and deal +15% damage or healing.
    divinePurpose: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
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
    justification: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'][0].coeff *= 1.1;
    }},

    // SotR heals 5 nearby allies for 1% max health. Doesn't scale with anything. 
    lightforgedBlessing: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Shield of the Righteous'].push({
            type: "heal",
            coeff: 0,
            flatHeal: getHealth(state.currentStats, {}) * 0.01,
            expectedOverheal: 0.20,
            targets: 5,
            statMods: {'crit': 0},
            secondaries: [] // TODO: Check secondary scaling on launch.
        })
    }},

    sealOfTheCrusader: {points: 0, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        // Seal of the Crusader heals when we connect a weapon swing. We don't actually swing here, but a HoT is effectively the same.
        const buff = {
            type: "buff",
            buffType: "heal",
            coeff: 0.1 * points * 1.04 * 1.3, // 1.3 = 30% buff. 
            tickRate: 2.6,
            targets: 1,
            buffDuration: 999,
            expectedOverheal: 0.5,
            secondaries: ['crit', 'vers'], // + Haste
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
    quickenedInvocation: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Divine Toll'][0].cooldown -= 15;
    }}, 

    // Of Dusk and Dawn - Casting 3 HoPo generating abilities increases healing of next spender by 20%. 
    ofDuskAndDawn: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
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
    sealOfOrder: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const cooldownMultiplier = 0.9; // Dusk uptime is basically 100%.
        spellDB['Holy Shock'][0].cooldown *= cooldownMultiplier;
        spellDB['Judgment'][0].cooldown *= cooldownMultiplier;
        spellDB['Divine Toll'][0].cooldown *= cooldownMultiplier;
        spellDB['Hammer of Wrath'][0].cooldown *= cooldownMultiplier;
        spellDB['Crusader Strike'][0].cooldown *= cooldownMultiplier;

        // Seal of Order also increases the power of Dawn by 10%.
    }}, 

    // Fading Light - 
    fadingLight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {

        // Fading Light also increases the power of Dawn by 10%. 
    }}, 




    // Judgment also adds an absorb to the target.
    greaterJudgment: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            type: "heal",
            coeff: 2,
            expectedOverheal: 0.04,
            targets: 1,
            secondaries: ['crit', 'versatility']
        })
    }},

    // === Spec Tree ===
    // Crusader's Might
    crusadersMight: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Crusader Strike'].push({
            type: "cooldownReduction",
            cooldownReduction: 1.5 * points,
            targetSpell: "Holy Shock",
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
    resplendentLight: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Light'].push({
            type: "heal",
            coeff: spellDB['Holy Light'][0].coeff * 0.08,
            expectedOverheal: 0.5,
            targets: 5,
            secondaries: ['crit', 'versatility', 'mastery']
        })
    }}, 

    // Divine Insight - +1 Holy shock charge
    divineInsight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].charges += 1;
    }}, 

    // Tower of Radiance - Casting FoL / HL on Beacon gives +1 HoPo. Casting FoL / HL on anyone else has a chance to give +1 HoPo.

    // Inbued Infusions - Consuming IoL reduces the CD of Holy Shock by 2s.
    // Implemented in function.
    imbuedInfusions: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { }},

    // Divine Rev - While empowered by IoL, Flash heals for +20% and Holy Light refunds 1% mana.
    // Handled inside.
    divineRevelations: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, data: {manaReturn: 0.005 * 250000, flashBonus: 1.2}, runFunc: function (state, spellDB, points) {}},

    // Commanding Light - Beacon transfers an extra 10/20%. Baked in for now.

    // Divine Glimpse - Holy Shock / Judgment have +8% crit chance.
    divineGlimpse: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].statMods.crit += (0.08 * points);
        spellDB['Judgment'][0].statMods.crit += (0.08 * points);
    }}, 

    // Sanctified Wrath - Holy Shock CD reduced by 40% during wings. +5s Wings duration.
    // Note that the CD portion is handled in Ramps instead of here.
    // == REMOVED ==
    
    sanctifiedWrath: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
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
    veneration: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
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

    // Untempered Dedication - LotM healing +10% per cast, stacks up to 15s.
    untemperedDedication: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Light of the Martyr'].push({
            type: "buff",
            name: "Untempered Dedication",
            buffType: 'special',
            value: 1.1, 
            buffDuration: 15,
            canStack: true,
            stacks: 1,
            maxStacks: 5,
        })

    }},

    // Maraads Dying Breath - LoD increases your LotM healing by 10% for each target healed. That LotM can heal through Beacon.
    maraadsDyingBreath: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Light of Dawn'].push({
            type: "buff",
            name: "Maraads Dying Breath",
            buffType: 'special',
            value: 1.5, 
            buffDuration: 10,
            canStack: false,
            stacks: 1,
            maxStacks: 1,
        })
    }},

    // Might - Gain 20% Crit during wings. Currently just built in.
    avengingCrusader: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { }},

    might: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Avenging Wrath'][0].value = (15 * 170);
    }},

    // Power of the Silver Hand - HL and FoL have a chance to give you a buff, increasing the healing of the next HS you cast by 10% of the damage / healing you do in the next 10s.

    // Spending Holy Power gives you +1% haste for 12s. Stacks up to 5 times.
    relentlessInquisitor: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points, stats) {
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
    holyInfusion: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Crusader Strike'][0].coeff *= 1.25;
        spellDB['Crusader Strike'][0].holyPower += 1;
    }},

    // Awestruck
    // Holy Shock, Holy Light, Flash of Light critical healing increased by 20%..
    aweStruck: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Flash of Light'][0].statMods.critEffect += 0.2;
        spellDB['Holy Light'][0].statMods.critEffect += 0.2;
        spellDB['Holy Shock'][0].statMods.critEffect += 0.2;
    }},

    // Awakening - WoG / LoD 
    // When we get 12 stacks, remove Awakening buff, and add "Awakening - Final". Awakening Final causes the next Judgment cast to crit, deal 30% more damage and activate
    // wings for 12s.
    // Judgment crit portion not currently included but also very minor since it has no healing implications.
    awakening: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
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

    }}, 

    // Glimmer of Light - Holy Shock leaves a glimmer. When you HS all glimmers are healed. Lasts 30s. Maximum 8 at a time.
    glimmerOfLight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'].push({
            name: "Glimmer of Light",
            type: "buff",
            buffType: 'special',
            canStack: false,
            maxStacks: 8,
            buffDuration: 30,
        });
    }},

    // Spending Holy Power has a 25% chance to trigger Glimmer of Light.
    glisteningRadiance: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const glisten = {
            type: "function",
            chance: 0.25,
            runFunc: function (state, spell, spellDB) {
                triggerGlimmerOfLight(state, "Glistening Radiance");
            }
        }

        spellDB['Word of Glory'].push(glisten);
        spellDB['Light of Dawn'].push(glisten);
        spellDB['Shield of the Righteous'].push(glisten);
        spellDB['Avenging Crusader'].push(glisten);

    }},

    // Holy Shock has a 10 + 1.5% chance per glimmer to refund a charge when cast. Glimmer of Lights damage and healing is increased by 10%.
    gloriousDawn: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const resetSlice = {
            type: "function",
            runFunc: function (state, spell, spellDB) {
                const holyShock = spellDB["Holy Shock"];
                const glimmerBuffs = state.activeBuffs.filter(buff => buff.name === "Glimmer of Light").length;

                const roll = Math.random();
                const canProceed = roll < (0.1 + (0.015 * glimmerBuffs));

                // Previous logic, with charges bandaid fix would have been giving 2 charges
                //if (canProceed) holyShock[0].activeCooldown = 0;
                // New logic, counts as giving one extra charge.
                if (canProceed) holyShock[0].activeCooldown -= holyShock[0].cooldown / getHaste(state.currentStats)
            }
        }

        spellDB['Holy Shock'].push(resetSlice);

    }},

    // Daybreak
    // Consume glimmers, triggering their effects at 200% value and granting 3k mana per glimmer consumed. 
    daybreak: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active spell.
    }},


    // Barrier of Faith
    barrierOfFaith: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active spell.
    }},

    // Reclamation - Holy Shock and Judgement refund mana and deal extra damage/healing based on target's health
    reclamation: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Handled in ramp / constants
        }},

    // Rising Sunlight - After casting Daybreak your next 3 Holy Shocks cast 2 additional times.
    risingSunlight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Daybreak'].push({
            name: "Rising Sunlight",
            type: "buff",
            buffType: 'special',
            canStack: true,
            stacks: 3,
            buffDuration: 20,
        });
    }},

    tyrsDeliverance: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active spell.
    }},

    // Empyrean Legacy - Judgment empowers the next WoD to automatically cast Light of Dawn with +25% effectiveness. 30s cooldown.

    // Boundless Salvation
    boundlessSalvation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB["Tyr's Deliverance"][1].buffDuration = 60;
    }},

    // Inflorescence of the Sunwell
    inflorescenceOfTheSunwell: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Holy Shock'][1].stacks = 2;
        spellDB['Holy Shock'][1].maxStacks = 2;

    }},



    // Righteous Judgment 
    righteousJudgment: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        spellDB['Judgment'].push({
            type: "buff",
            name: "Righteous Judgment (Golden Path)",
            buffType: "heal",
            coeff: 0.05 / 2,
            buffDuration: 12,
            expectedOverheal: 0.50,
            targets: 6,
            tickRate: 1,
            secondaries: ['crit', 'versatility', 'haste']
        })

        spellDB['Judgment'].push({
            type: "buff",
            name: "Righteous Judgment",
            buffType: "damage",
            coeff: 0.05 / 2 * 1.05,
            buffDuration: 12,
            targets: 5,
            tickRate: 1,
            secondaries: ['crit', 'versatility', 'haste']
        })
    }},

    // Blessing of Seasons
    blessingOfSeasons: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        // Active Spell
    }},

    // Merciful Auras - Aura of Mercy
    mercifulAuras: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { 
        const buff = {
            type: "buff",
            buffType: "heal",
            coeff: 0.21, 
            tickRate: 2 * getHaste(state.currentStats), // Not Hasted
            targets: 3,
            buffDuration: 999,
            expectedOverheal: 0.5,
            secondaries: ['crit', 'vers'], // Not Hasted
        };

        addBuff(state, buff, "Merciful Auras (Passive)")

        spellDB['Aura Mastery'].push({
            type: "buff",
            name: "Merciful Auras (Active)",
            buffType: "heal",
            coeff: 0.21 * 1.5,
            buffDuration: 8,
            expectedOverheal: 0.30,
            targets: 20,
            tickRate: 2 * getHaste(state.currentStats), // Not Hasted
            secondaries: ['crit', 'versatility']
        })
    }}
}