
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
    "Smite": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 200,
        coeff: 0.33135, // 0.75 (smite aura nerf) x 0.94 (disc aura nerf)
        cooldown: 0,
        atoneOverheal: 0.28,
        secondaries: ['crit', 'vers'],
    }],
    "Penance": [{
        spellData: {id: 47540, icon: "spell_holy_penance", cat: "damage"},
        type: "special",
        castTime: 0, // The spell takes place over 2 seconds (before Haste) but it'll be replaced by X penance bolts in the app so doesn't need a cast time here.
        cost: 800,
        coeff: 1.128, // This is shown for informational purposes, but the function itself splits it into individual bolts instead.
        bolts: 3,
        atoneOverheal: 0.26,
        secondaries: ['crit', 'vers'],
    }],
    "PenanceTick": [{
        spellData: {id: 366155, icon: "ability_evoker_reversion", cat: "N/A"},
        type: "damage",
        castTime: 0.66, // This will still be dynamically adjusted at runtime.
        cost: 0,
        coeff: 0.376,
        atoneOverheal: 0.27,
        secondaries: ['crit', 'vers'],
    }],
    "Schism": [{
        spellData: {id: 214621, icon: "spell_warlock_focusshadow", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.41,
        buffDuration: 9,
        atoneOverheal: 0.28,
        secondaries: ['crit', 'vers'],
    },
    {
        type: "buff",
        castTime: 0,
        cost: 0,
        buffDuration: 9,
        buffType: "special",
        value: 1.25,
        name: "Schism",
        canStack: false,
    }],
    "Mind Blast": [{
        spellData: {id: 8092, icon: "spell_shadow_unholyfrenzy", cat: "damage"},
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
        spellData: {id: 129250, icon: "ability_priest_flashoflight", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 0.752,
        cooldown: 15,
        atoneOverheal: 0.3,
        secondaries: ['crit', 'vers']
    }],
    "Light's Wrath": [{
        spellData: {id: 207948, icon: "inv_staff_2h_artifacttome_d_01", cat: "cooldown"},
        type: "damage",
        castTime: 2.5,
        cost: 0,
        coeff: 1.75, // This is almost definitely incorrect.
        cooldown: 90,
        atoneOverheal: 0.33,
        secondaries: ['crit', 'vers'],
    }],
    "Mindgames": [{
        spellData: {id: 323673, icon: "ability_revendreth_priest", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 1000,
        coeff: 2.54, // 3 x 0.94 (disc aura nerf) x 0.85 (Mindgames specific aura nerf)
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
    "Divine Star": 
    // Divine Star deals damage and heals both on the way out and on the way back. 
    // We won't be modelling the time right now, but this is possible in future when we upgrade the base engine.
    // Instead we're just doubling the coefficients so that both are taken into account.
    [{
        spellData: {id: 110744, icon: "spell_priest_divinestar", cat: "damage"},
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
        spellData: {id: 17, icon: "spell_holy_powerwordshield", cat: "heal"},
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
    "Shadow Mend": [{
        spellData: {id: 186263, icon: "spell_shadow_shadowmend", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 1750,
        coeff: 3.2,
        aura: 1,
        cooldown: 0,
        atonement: 15,
        atonementPos: 'end',
        targets: 1,
        secondaries: ['crit', 'vers'],
        overheal: 0.35,
    }],
    // Rapture both buffs Power Word: Shield and adds an absorb to the target that is functionally the same as a buffed Power Word: Shield.
    // We'll match that in-game behavior here too.
    "Rapture": [{
        spellData: {id: 47536, icon: "spell_holy_rapture", cat: "cooldown"},
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
        spellData: {id: 194509, icon: "spell_priest_power-word", cat: "heal"},
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
        spellData: {id: 204197, icon: "ability_mage_firestarter", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 900,
        aura: 1,
        coeff: 0.21,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.15,
    },
    {
        castTime: 0,
        type: "buff",
        buffType: "damage",
        coeff: 0.12, // 
        tickRate: 2,
        buffDuration: 26,
        atoneOverheal: 0.15,
        secondaries: ['crit', 'vers'], // + Haste
        canPartialTick: true,
    }],
    "Shadow Word: Pain": [{
        spellData: {id: 589, icon: "spell_shadow_shadowwordpain", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 900,
        coeff: 0.1292,
        aura: 1,
        secondaries: ['crit', 'vers'],
    },
    {
        castTime: 0,
        type: "buff",
        buffType: "damage",
        coeff: 0.09588, // 
        tickRate: 2,
        buffDuration: 20.8,
        atoneOverheal: 0.15,
        secondaries: ['crit', 'vers'], // + Haste
        canPartialTick: true,
    }],
    "Shadowfiend": [{
        spellData: {id: 34433, icon: "spell_shadow_shadowfiend", cat: "cooldown"},
        type: "",
        castTime: 1.5,
        cost: 900,
        coeff: 0.46, // Unused. Change coefficient below instead.
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.22,
    },
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
    "Mindbender": [{
        spellData: {id: 123040, icon: "spell_shadow_soulleech_3", cat: "cooldown"},
        type: "",
        castTime: 1.5,
        cost: 900,
        coeff: 0.34,
        aura: 1,
        secondaries: ['crit', 'vers'],
        atoneOverheal: 0.22,
    },
    {
        castTime: 0,
        cost: 0,
        type: "buff",
        buffType: "damage",
        coeff: 0.34, // 
        tickRate: 1.5,
        buffDuration: 12,
        atoneOverheal: 0.22,
        secondaries: ['crit', 'vers'], // Shadowfiend scales with Haste but the DoT / HoT function will handle that. 
        canPartialTick: false,
    }],
    "Evangelism": [{
        spellData: {id: 246287, icon: "spell_holy_divineillumination", cat: "cooldown"},
        type: "atonementExtension",
        castTime: 1.5,
        cost: 0,
        coeff: 0,
        extension: 6,
    }],
    "Instructor's Divine Bell (new)": [{
        spellData: {id: 366155, icon: "ability_evoker_reversion", cat: "N/A"},
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 90,
        buffDuration: 15,
        buffType: 'stats',
        stat: "mastery",
        value: 450, // Trinket values are replaced by the value on the specific version of the trinket.
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