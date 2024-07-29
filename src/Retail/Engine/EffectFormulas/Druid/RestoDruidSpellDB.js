import { runHeal } from "./RestoDruidRamps";


// Add onTick, onExpiry functions to spells.
export const DRUIDSPELLDB = {
    "Rejuvenation": [
        {
        // Rejuv is split into two spell effects. The direct heal, and the HoT. The direct heal is the same amount of healing as one tick, but doesn't scale with Haste.
        // The number of rejuv ticks is (5 x haste) + 1.
        spellData: {id: 361469, icon: "spell_nature_rejuvenation", cat: "heal"},
        castTime: 0,
        cost: 2.2, // 5500
        type: "buff",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: true, tickOnCast: true}, 
        buffDuration: 12,
        coeff: 0.2465 * 2.1,
        expectedOverheal: 0.2,
        targeting: {type: "friendly", count: 1, behavior: "avoidSame"},
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 8936, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 3.4, 
        coeff: 2.076 * 1.44, 
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    {
        // Regrowth HoT portion
        type: "buff",
        buffType: "heal",
        buffDuration: 12,
        coeff: 0.0864 * 1.44, // The coefficient for a single regrowth tick.
        tickData: {tickRate: 2, canPartialTick: true, tickOnCast: false}, 
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Swiftmend": [{
        // Regrowth direct heal portion
        spellData: {id: 18562, icon: "inv_relics_idolofrejuvenation", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 1.4, 
        coeff: 6.1824, 
        expectedOverheal: 0.3,
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    ],
    "Wild Growth": [
        {
        // HoT portion - Note the free tick on cast.
        spellData: {id: 48438, icon: "ability_druid_flourish", cat: "heal"},
        castTime: 1.5,
        cost: 2.2, // 5500
        type: "buff",
        buffType: "function",
        targeting: {type: "friendly", count: 5, behavior: "random"},
        runFunc: function (state, spell, buff, partialTickPercentage) {

            // Wild Growth caught a 4% nerf in Dragonflight, and this is applied to the decayrate also.
            // Unstoppable Growth is a 15/30% reduction to the Decay rate.
            const decayRate = 0.07 * 0.96 * (1 - state.talents.unstoppableGrowth.points * 0.15) / (buff.expiration - buff.startTime);
            const t = state.t - buff.startTime;
            const inTree = state.activeBuffs.filter(x => x.name === "Incarnation: Tree of Life").length > 0;
            
            // The Wild Growth aura is applied at the end, after the decay has been applied.
            const netCoeff = ((spell.coeff) - decayRate * t) * spell.specialMod;

            const wgCast = {
                name: "Wild Growth",
                coeff: netCoeff, 
                targets: spell.targets + (inTree ? 2 : 0),
                expectedOverheal: spell.expectedOverheal, 
                secondaries: spell.secondaries,
                type: "heal",
            }
            
            runHeal(state, wgCast, "Wild Growth", true);

        },
        tickData: {tickRate: 1, canPartialTick: true, tickOnCast: false}, 
        buffDuration: 7,
        targets: 5, // Talent to increase to 6.
        coeff: 0.168, //0.1344, // This is the base coefficient before decay. The 0.1344 listed in places appears to just be an average, but not the base coefficient.
        specialMod: 1.44, // Aura buff + any extras.
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Flourish": [{
        // Two portions: extends active HoTs, and then increases tick rate.
        spellData: {id: 197721, icon: "spell_druid_wildburst", cat: "cooldown"},
        type: "buffExtension",
        castTime: 0, 
        cost: 0, 
        extensionList: ["Rejuvenation", "Regrowth", "Wild Growth", "Cenarion Ward", "Spring Blossoms", "Adaptive Swarm", "Lifebloom"],
        extensionDuration: 6,
    },
    {
        type: "buff",
        buffType: "periodicSpeed",
        buffDuration: 6,
        value: 1.25,
    }],
    "Cenarion Ward": [
        {
            spellData: {id: 102352, icon: "ability_druid_naturalperfection", cat: "heal"},
            castTime: 0,
            cost: 1.84, // 5500
            type: "buff",
            buffType: "heal",
            tickData: {tickRate: 2, canPartialTick: true, tickOnCast: false}, 
            buffDuration: 8,
            coeff: 0.79,
            expectedOverheal: 0.2,
            flags: {targeted: true},
            secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Efflorescence": [
        {
            spellData: {id: 102352, icon: "inv_misc_herb_talandrasrose", cat: "heal"},
            castTime: 0,
            cost: 3.4, // 5500
            type: "buff",
            buffType: "heal",
            tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
            buffDuration: 30,
            coeff: 0.233,
            expectedOverheal: 0.3,
            targets: 3,
            secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Incarnation: Tree of Life": [{
        // All healing +15%
        // Rejuv: +50%, -30% cost
        // Regrowth: Instant
        // Wild Growth: +2 targets
        spellData: {id: 33891, icon: "ability_druid_improvedtreeform", cat: "cooldown"},
        type: "buff",
        buffType: "special",
        buffDuration: 30,
        castTime: 0, 
        cost: 0, 
    },
    ],
    "Grove Guardians": [{
        // GG Swiftmend portion
        spellData: {id: 8936, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 0,
        charges: 3, 
        cost: 1.2, 
        coeff: 1.36, 
        expectedOverheal: 0.1,
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    { // WG Portion. Technically a talent.
        type: "buff",
        buffType: "function",
        runFunc: function (state, spell, buff) {
            const decayRate = 0.07 / (buff.expiration - buff.startTime);
            const t = state.t - buff.startTime;
            const wildGrowthAura = 1;

            const decay = spell.coeff - decayRate * t;
            const netCoeff = decay * wildGrowthAura;
            const wgCast = {
                name: "Wild Growth",
                coeff: netCoeff, 
                targets: spell.targets, // TODO
                expectedOverheal: 0, // TODO
                secondaries: ["vers"], // TODO
                type: "heal",
            }
            
            runHeal(state, wgCast, "Wild Growth", true);

        },
        tickData: {tickRate: 1, canPartialTick: true, tickOnCast: false}, 
        buffDuration: 7,
        targets: 5, 
        coeff: 0.1344, // This is the base coefficient before decay.
        expectedOverheal: 0,
        flags: {targeted: true},
        secondaries: [/*'crit', 'vers', 'mastery'*/] // Rejuv also scales with haste, but this is handled elsewhere.
    }],

}

const classTalents = {
    improvedRejuvenation: {points: 1, maxPoints: 1, icon: "spell_nature_rejuvenation", id: 231040, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 3;
    }}, 
    lycarasTeachings: {points: 2, maxPoints: 2, icon: "inv_trinket_ardenweald_02_green", id: 378988, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        // While Lycara's is permanent, we'll add it as a buff so that we can correctly multiply it with other sources of haste.
        // No support right now for other forms.
        const buff = {
            name: "Lycara's Teachings",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'haste',
            value: (0.03 * points + 1)
        };
        addBuff(state, buff, "Lycara's Teachings")
    }}, 
    risingLight: {points: 1, maxPoints: 1, icon: "spell_druid_equinox", id: 417712, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        // We could add a setting to swap between healing and versatility but most content happens at night.
        const buff = {
            name: "Rising Light",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'statsMult',
            stat: 'versatility',
            value: (2 * STATCONVERSION.VERSATILITY)
        };
        addBuff(state, buff, "Rising Light")
    }}, 
    loreOfTheGrove: {points: 2, maxPoints: 2, icon: "spell_nature_starfall", id: 449185, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const percIncrease = (0.03 * points + 1)
        spellDB["Wild Growth"][0].specialMod *= percIncrease;
        spellDB["Rejuvenation"][0].coeff *= percIncrease;
    }}, 

    // Handled in healingMult since we don't really want to modify our CONSTANTS.
    nurturingInstinct: {points: 2, maxPoints: 2, icon: "spell_nature_starfall", id: 33873, select: true, tier: 4, runFunc: function (state, spellDB, points) {
    
    }}, 

}

const specTalents = {


    improvedWildGrowth: {points: 1, maxPoints: 1, icon: "ability_druid_flourish", id: 328025, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Wild Growth"][0].targets += 1;
    }}, 

    // Handled in WG formula.
    unstoppableGrowth: {points: 2, maxPoints: 2, icon: "ability_druid_flourish", id: 382559, select: true, tier: 4, runFunc: function (state, spellDB, points) {

    }}, 

    // This occurs in 3 2 second ticks. We'll watch this one closely on logs but functionally it usually represents a full 6s extension. 
    // Note that if we were to reduce this rate it should be by chance rather than cutting the extension.
    nurturingDormancy: {points: 1, maxPoints: 1, icon: "ability_druid_replenish", id: 392099, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 4;
    }}, 

    germination: {points: 1, maxPoints: 1, icon: "spell_druid_germination", id: 155675, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 2;
    }}, 

    soulOfTheForest: {points: 1, maxPoints: 1, icon: "spell_druid_germination", id: 155675, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        
        spellDB['Swiftmend'].push({
            name: "Soul of the Forest",
            type: "buff",
            stacks: false,
            buffDuration: 20,
            buffType: 'spellAmpMulti',
            buffedSpells: {"Rejuvenation": 3, "Regrowth": 3, "Wild Growth": 1.5},
            })
    }}, 

}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
};

