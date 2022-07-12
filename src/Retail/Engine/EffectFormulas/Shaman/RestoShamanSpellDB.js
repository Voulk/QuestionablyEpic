
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
export const PALASPELLDB = {
    //
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        type: "",
        castTime: 1.5,
        cost: 0,
    }],

    "Healing Surge": [{
        type: "heal",
        castTime: 1.5,
        cost: 0.24,
        coeff: 2.48, 
        expectedOverheal: 0.14,
        secondaries: ['crit', 'vers', 'mastery']
    }],

    "Judgment": [{ // TODO: Judgment also increases the damage of our next HS or CS by 30%, but this is rather trivial. 
        type: "damage",
        castTime: 1.5,
        cost: 0.03,
        coeff: 0.634 * 1.5,
        cooldown: 12,
        secondaries: ['crit', 'vers']
    }],
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
    }]
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