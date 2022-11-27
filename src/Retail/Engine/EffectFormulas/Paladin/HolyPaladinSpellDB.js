
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
        castTime: 1.5,
        cost: 0,
    }],
    "Holy Shock": [{
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "heal"},
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
    "Holy Shock O": [{
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "damage"},
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
    "Flash of Light": [{
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0.22,
        coeff: 2.02, // Not final
        expectedOverheal: 0.14,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Crusader Strike": [{
        spellData: {id: 35395, icon: "spell_holy_crusaderstrike", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0.11,
        coeff: 0.765, 
        cooldown: 6,
        holyPower: 1,
        secondaries: ['crit', 'vers']
    }],
    "Judgment": [{  
        spellData: {id: 20271, icon: "spell_holy_righteousfury", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0.03,
        coeff: 0.634 * 1.5,
        cooldown: 12,
        secondaries: ['crit', 'vers']
    }],
    "Hammer of Wrath": [{
        spellData: {id: 24275, icon: "spell_paladin_hammerofwrath", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0,
        coeff: 1.2, 
        cooldown: 7.5,
        hastedCooldown: true,
        holyPower: 1,
        secondaries: ['crit', 'vers']
    }],
    "Light of Dawn": [{
        spellData: {id: 85222, icon: "spell_paladin_lightofdawn", cat: "heal"},
        type: "heal",
        castTime: 1.5,
        cost: 0,
        coeff: 1.05, // Not final
        expectedOverheal: 0.4,
        holyPower: -3,
        targets: 5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Avenging Wrath": [{
        spellData: {id: 31884, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldown: 120,
        buffType: 'statsMult',
        stat: 'crit',
        value: (20 * 35), // 
        buffDuration: 20,
    }],

}

export const baseTalents = { }