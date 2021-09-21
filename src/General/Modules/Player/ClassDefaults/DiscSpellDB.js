export const DISCSPELLS = {
    "Mind Blast": [{
        type: "damage",
        castTime: 1.5,
        cost: 1250,
        coeff: 0.74,
        cooldown: 15,
        atoneOverheal: 0.2,
        secondaries: ['crit', 'vers']
    }],
    "Power Word: Solace": [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 0.75,
        cooldown: 15,
        atoneOverheal: 0.2,
        secondaries: ['crit', 'vers']
    }],
    "Smite": [{
        type: "damage",
        castTime: 1.5,
        cost: 200,
        coeff: 0.5,
        cooldown: 0,
        atoneOverheal: 0.15,
        secondaries: ['crit', 'vers'],
    }],
    "Schism": [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.41,
        buffDuration: 7,
        atoneOverheal: 0.25,
        secondaries: ['crit', 'vers'],
    }],
    "Penance": [{
        type: "damage",
        castTime: 2,
        cost: 800,
        coeff: 1.128,
        atoneOverheal: 0.2,
        secondaries: ['crit', 'vers'],
    }],
    "Ascended Blast": 
        [{
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.68,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.3,
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 2.15,
            targets: 1,
            secondaries: ['crit', 'vers', 'mastery'],
            overheal: 0.6,
        }],
    "Ascended Nova": 
        [{
        type: "damage",
        castTime: 1,
        cost: 0,
        coeff: 0.7,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.15,
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 0.24,
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
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.6,
        },
        {
            type: "heal",
            castTime: 0,
            coeff: 2.15,
            targets: 20,
            secondaries: ['crit', 'vers'],
            tags: ['sqrt'],
            overheal: 0.6,
        }],
    "Power Word: Shield": [{
        type: "heal",
        castTime: 1.5,
        cost: 1550,
        coeff: 1.65,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'start',
        targets: 1,
        secondaries: ['crit', 'vers'],
        overheal: 0,
    }],
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
        targets: 5,
        cooldown: 20,
        atonement: 9,
        atonementPos: 'end',
        secondaries: ['crit', 'vers'],
        overheal: 0.35,
    }],
    "Purge the Wicked": [{
        type: "damage",
        castTime: 1.5,
        cost: 900,
        coeff: 0.21,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.1,
        dot: {
            tickRate: 2,
            coeff: 0.12,
            duration: 20,
        }
    }],
    "Shadowfiend": [{
        type: "",
        castTime: 1.5,
        cost: 900,
        coeff: 0.13,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.2,
        dot: {
            tickRate: 1.5,
            coeff: 0.46,
            duration: 15,
        }
    }],
    "Evangelism": [{
        type: "atonementExtension",
        castTime: 1.5,
        cost: 0,
        coeff: 0,
        extension: 6,
    }],
    "Divine Bell": [{
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 9,
        buffType: 'stats',
        stat: "mastery",
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