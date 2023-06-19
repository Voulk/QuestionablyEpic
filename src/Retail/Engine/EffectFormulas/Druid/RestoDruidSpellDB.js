
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
export const DRUIDSPELLDB = {
    //
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Rejuvenation": [{
        spellData: {id: 774, icon: "spell_nature_rejuvenation", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Wild Growth": [{
        spellData: {id: 48438, icon: "ability_druid_flourish", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Swiftmend": [{
        spellData: {id: 18562, icon: "inv_relics_idolofrejuvenation", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Convoke the Spirits": [{
        spellData: {id: 323764, icon: "ability_ardenweald_druid", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Flourish": [{
        spellData: {id: 197721, icon: "spell_druid_wildburst", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Regrowth": [{
        spellData: {id: 8936, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Wrath": [{
        spellData: {id: 5176, icon: "spell_nature_wrathv2", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        cooldown: 7.5,
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Tranquility": [{
        spellData: {id: 740, icon: "spell_nature_tranquility", cat: "cooldown"},
        type: "heal",
        castTime: 1.5,
        cost: 0.16,
        coeff: 1.55, // Not final
        cooldown: 7.5,
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],

}

export const baseTalents = { }