import { addBuff } from "../Generic/RampBase";

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
        castTime: 0,
        cost: 16,
        coeff: 1.395, 
        cooldown: 7.5,
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Holy Shock O": [{
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "damage"},
        type: "heal",
        castTime: 0,
        cost: 16,
        coeff: 0.612, 
        cooldown: 7.5,
        expectedOverheal: 0.29,
        holyPower: 1,
        statMods: {'crit': 0.3},
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Flash of Light": [{
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 22,
        coeff: 2.02, // Not final
        expectedOverheal: 0.14,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Crusader Strike": [{
        spellData: {id: 35395, icon: "spell_holy_crusaderstrike", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 10,
        coeff: 0.765, 
        cooldown: 6,
        holyPower: 1,
        secondaries: ['crit', 'vers']
    }],
    "Judgment": [{  
        spellData: {id: 20271, icon: "spell_holy_righteousfury", cat: "damage"},
        type: "damage",
        castTime: 0,
        cost: 3,
        coeff: 0.610542 * 1.5,
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
        value: (20 * 170), // 
        buffDuration: 20,
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

    // Afterimage - After spending 20 HoPo, next WoG cleaves for +30%.

    // Golden Path - Consecration heals 6 allies on tick.

    // Judgment of Light - Judgment heals allies 5 times.
    judgmentOfLight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Judgment'].push({
            name: "Judgment of Light",
            type: "heal",
            coeff: 0.175,
            expectedOverheal: 0.2,
            targets: 5,
            secondaries: ['crit', 'vers', 'mastery']
        });

    }}, 

    // Holy Aegis - Crit +2% per point.

    // Crusader's Reprieve - Small self-heal on Crusader Strike

    // Strength of Conviction - While in Consecration, Word of Glory heals for 10% more.

    // Divine Purpose - HoPo abilities have a chance to make your next HoPo ability free and deal +15% damage or healing.

    // Zealot's Paragon - Hammer of Wrath and Judgment deal 10% additional damage and extend the duration of Avenging Crusader by 0.5s.

    // Divine Resonance - Buff that casts a free Holy Shock every 5s for 15s.

    // Quickened Invocation - 15s off DT cooldown.

    // Of Dusk and Dawn - Casting 3 HoPo generating abilities increases healing of next spender by 20%. 

    // Seal of Order - Dawn is 30% instead of 20%. Dusk causes HoPo generators to cool down 10% faster.

    // Fading Light - Dawn is 30% instead of 20%. Dusk causes HoPo generators to shield for 20%.
}