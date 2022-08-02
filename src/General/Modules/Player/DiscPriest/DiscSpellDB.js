
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
export const DISCSPELLS = {
    "Mind Blast": [{
        type: "damage",
        castTime: 1.5,
        cost: 1250,
        coeff: 0.744642, // 0.9792 x 0.809 (Mind Blast aura) x 0.94 (Disc aura)
        cooldown: 15,
        atoneOverheal: 0.29,
        secondaries: ['crit', 'vers']
    },
    {
        type: "heal",
        castTime: 0,
        coeff: 3,
        aura: 1,
        targets: 1,
        secondaries: ['vers'],
        overheal: 0,
    }],
    "Power Word: Solace": [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 0.752,
        cooldown: 15,
        atoneOverheal: 0.3,
        secondaries: ['crit', 'vers']
    }],
    "Smite": [{
        type: "damage",
        castTime: 1.5,
        cost: 200,
        coeff: 0.497025, // 0.47 x 1.5 (smite rank 2) x 0.75 (smite aura nerf) x 0.94 (disc aura nerf)
        cooldown: 0,
        atoneOverheal: 0.28,
        secondaries: ['crit', 'vers'],
    }],
    "Mindgames": [{
        type: "damage",
        castTime: 1.5,
        cost: 1000,
        coeff: 2.397, // 3 x 0.94 (disc aura nerf) x 0.85 (Mindgames specific aura nerf)
        cooldown: 40,
        atoneOverheal: 0.23,
        secondaries: ['crit', 'vers'],
    },
    { // This is the absorb / damage reverse portion.
        type: "heal",
        castTime: 0,
        coeff: 9, // This is 4.5 x 2 since the damage is both negated and then the target healed.
        aura: 1,
        targets: 1,
        secondaries: ['vers'],
        overheal: 0.15, // 
    }],
    "Schism": [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.41,
        buffDuration: 9,
        atoneOverheal: 0.28,
        secondaries: ['crit', 'vers'],
    }],
    "Penance": [{
        type: "special",
        castTime: 0, // The spell takes place over 2 seconds (before Haste) but it'll be replaced by X penance bolts in the app so doesn't need a cast time here.
        cost: 800,
        coeff: 1.128, // This is shown for informational purposes, but the function itself splits it into individual bolts instead.
        bolts: 3,
        atoneOverheal: 0.26,
        secondaries: ['crit', 'vers'],
    }],
    "PenanceTick": [{
        type: "damage",
        castTime: 0.66, // This will still be dynamically adjusted at runtime.
        cost: 0,
        coeff: 0.376,
        atoneOverheal: 0.27,
        secondaries: ['crit', 'vers'],
    }],
    "Ascended Blast": 
        [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.68,
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.36,
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 2.15,
            aura: 1,
            targets: 1,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.4,
        }],
    "Ascended Nova": 
        [{
            type: "damage",
            castTime: 1,
            cost: 0,
            coeff: 0.7,
            aura: 1,
            secondaries: ['crit', 'vers'],
            atoneOverheal: 0.34,
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 0.24,
            aura: 1,
            targets: 6,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.3,
        }],
    "Ascended Eruption": 
        [{
            type: "damage",
            castTime: 0,
            cost: 0,
            coeff: 1.68,
            aura: 1,
            secondaries: ['crit', 'vers'],
            atoneOverheal: 0.44,
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 2.15,
            aura: 1,
            targets: 20,
            secondaries: ['crit', 'vers'],
            tags: ['sqrt'],
            overheal: 0.3,
        }],
    "Divine Star": 
    // Divine Star deals damage and heals both on the way out and on the way back. 
    // We won't be modelling the time right now, but this is possible in future when we upgrade the base engine.
    // Instead we're just doubling the coefficients so that both are taken into account.
    [{
        type: "damage",
        castTime: 1.5,
        cost: 1000,
        coeff: 0.56 * 2,
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.24,
    },
    {
        type: "heal",
        castTime: 0,
        coeff: 0.7 * 2,
        aura: 1,
        targets: 6,
        secondaries: ['crit', 'vers'],
        //tags: ['sqrt'],
        overheal: 0.4,
    }],
    "Power Word: Shield": [{
        type: "heal",
        castTime: 1.5,
        cost: 1550,
        coeff: 1.65,
        aura: 1,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'start',
        targets: 1,
        secondaries: ['crit', 'vers'],
        overheal: 0,
    }],
    // Rapture both buffs Power Word: Shield and adds an absorb to the target that is functionally the same as a buffed Power Word: Shield.
    // We'll match that in-game behavior here too.
    "Rapture": [{
        type: "heal",
        castTime: 1.5,
        cost: 1550,
        coeff: 1.65 * 3,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'start',
        targets: 1,
        secondaries: ['crit', 'vers'],
        overheal: 0,
    },
    {
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 8,
    }],
    "Power Word: Radiance": [{
        type: "heal",
        castTime: 2,
        cost: 3250,
        coeff: 1.05,
        aura: 1,
        targets: 5,
        cooldown: 20,
        atonement: 9,
        atonementPos: 'end',
        secondaries: ['crit', 'vers'],
        overheal: 0.3,
    }],
    "Purge the Wicked": [{
        type: "damage",
        castTime: 1.5,
        cost: 900,
        coeff: 0.21,
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.2,
        dot: { // Replaced and now unused.
            tickRate: 2,
            coeff: 0.12,
            aura: 1,
            duration: 26, // 20 x 1.3
        }
    },
    {
        castTime: 0,
        type: "buff",
        buffType: "damage",
        coeff: 0.12, // 
        tickRate: 2,
        buffDuration: 26,
        atoneOverheal: 0.2,
        secondaries: ['crit', 'vers'], // + Haste
        canPartialTick: true,
    }],
    "Shadow Word: Pain": [{
        type: "damage",
        castTime: 1.5,
        cost: 900,
        coeff: 0.1292,
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.2,
        dot: { // Now unused. Will remove in a few updates. 
            tickRate: 2,
            coeff: 0.09588,
            aura: 1,
            duration: 15.6, // 12 x 1.3
        }
    },
    {
        castTime: 0,
        type: "buff",
        buffType: "damage",
        coeff: 0.09588, // 
        tickRate: 2,
        buffDuration: 15.6,
        atoneOverheal: 0.07,
        secondaries: ['crit', 'vers'], // + Haste
        canPartialTick: true,
    }],
    "Shadowfiend": [/*{
        type: "",
        castTime: 1.5,
        cost: 900,
        coeff: 0.13,
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.22,
        dot: {
            tickRate: 1.5,
            coeff: 0.46,
            duration: 15,
        }
    },*/
    {
        castTime: 1.5,
        cost: 900,
        type: "buff",
        buffType: "damage",
        coeff: 0.46, // 
        tickRate: 1.5,
        buffDuration: 15,
        atoneOverheal: 0.22,
        secondaries: ['crit', 'vers'], // Shadowfiend scales with Haste but the DoT / HoT function will handle that. 
        canPartialTick: false,
    }],
    "Evangelism": [{
        type: "atonementExtension",
        castTime: 1.5,
        cost: 0,
        coeff: 0,
        extension: 6,
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
    "Instructor's Divine Bell (new)": [{
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 15,
        buffType: 'stats',
        stat: "mastery",
        value: 450, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
    "Flame of Battle": [{
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 12,
        buffType: 'stats',
        stat: "versatility",
        value: 668, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
    "Shadowed Orb": [{
        type: "buff",
        castTime: 0, // While this has a 2s cast time, it can be used well before our ramp starts which means it functionally does not cost us cast time.
        cost: 0,
        cooldown: 120,
        buffDuration: 40,
        buffType: 'stats',
        stat: "mastery",
        value: 400, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
    "Soulletting Ruby": [{
        type: "buff",
        castTime: 0, // While this has a 2s cast time, it can be used well before our ramp starts which means it functionally does not cost us cast time.
        cost: 0,
        cooldown: 120,
        buffDuration: 16,
        buffType: 'stats',
        stat: "crit",
        value: 900, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
    "Neural Synapse Enhancer": [{
        type: "buff",
        castTime: 0, 
        cost: 0,
        cooldown: 45,
        buffDuration: 15,
        buffType: 'stats',
        stat: "intellect",
        value: 0, // Effect values are replaced by the value on the specific version of the trinket.
    }],
    "Moonlit Prism": [{
        type: "buff",
        castTime: 0, // While this has a 2s cast time, it can be used well before our ramp starts which means it functionally does not cost us cast time.
        cost: 0,
        cooldown: 90,
        buffDuration: 20,
        buffType: 'stats',
        stat: "intellect",
        value: 25, // Trinket values are replaced by the value on the specific version of the trinket.
    }],
    "Boon of the Ascended": [{
        type: "buff",
        castTime: 1.5,
        cost: 0,
        cooldown: 180,
        buffType: "spec",
        buffDuration: 10,
    }],
}

export const discConduits = (conduit, rank) => {
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