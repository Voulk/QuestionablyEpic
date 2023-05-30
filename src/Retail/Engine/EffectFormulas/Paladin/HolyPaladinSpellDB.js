import { addBuff } from "../Generic/RampBase";
import { runHeal } from "./HolyPaladinRamps2";

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
        cost: 16,
        coeff: 1.395, 
        cooldown: 7.5,
        expectedOverheal: 0.25,
        holyPower: 1,
        hastedCooldown: true,
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
        hastedCooldown: true,
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
        hastedCooldown: true,
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
        castTime: 0,
        cost: 0,
        coeff: 1.05, // Not final
        expectedOverheal: 0.3,
        holyPower: -3,
        targets: 5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Word of Glory": [{
        spellData: {id: 0, icon: "", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0,
        coeff: 3.15,
        expectedOverheal: 0.3,
        holyPower: -3,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Avenging Wrath": [{
        spellData: {id: 31884, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        name: "Avenging Wrath",
        castTime: 0,
        cost: 0,
        cooldown: 120,
        buffType: 'statsMult',
        stat: 'crit',
        value: (20 * 170), // 
        buffDuration: 20,
    }],
    "Avenging Crusader": [{
        spellData: {id: 318849, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        name: "Avenging Crusader",
        castTime: 0,
        cost: 0,
        cooldown: 45,
        holyPower: -5,
        buffType: 'special',
        buffDuration: 12,
    }],
    "Divine Toll": [{
        spellData: {id: 31884, icon: "", cat: "cooldown"},
        type: "function",
        cost: 15,
        castTime: 0,
        cooldown: 60,
        count: 5,
        runFunc: function (state, spell, spellDB) {
            // Cast 5 Holy Shocks
            const holyShock = spellDB["Holy Shock"];
            

            for (let i = 0; i < spell.count; i++) {
                state.holyPower = Math.max(5, state.holyPower + 1);
                runHeal(state, holyShock[0], "Holy Shock (Divine Toll)");
            }

        }
    }],
    "Light's Hammer": [{
        // Ticks on cast. Probably need to create a generic case for this.
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal"},
        castTime: 0,
        type: "heal",
        cost: 18,
        coeff: 0.25 * 1.6,
        targets: 6,
        secondaries: ['crit', 'vers', 'mastery'],
        cooldown: 60,
        expectedOverheal: 0.5,
    },
    {
        // To check: See if Renew still has an initial heal, and confirm whether it gets a mastery buff (unlikely).
        type: "buff",
        name: "Light's Hammer",
        buffType: "heal",
        coeff: 0.25 * 1.6,
        targets: 6,
        secondaries: ['crit', 'vers', 'mastery'],
        canPartialTick: false,
        buffDuration: 14,
        tickRate: 2,
        expectedOverheal: 0.5,
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
            value: (0.03 * points + 1)
        };
        addBuff(state, buff, "Seal of Might")

        //stats.intellect *= (1 + 0.02 * points);
    }}, 

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

    // Crusader's Reprieve - Small self-heal on Crusader Strike

    // Strength of Conviction - While in Consecration, Word of Glory heals for 10% more.

    // Divine Purpose - HoPo abilities have a chance to make your next HoPo ability free and deal +15% damage or healing.
    divinePurpose: {points: 0, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const buffSpell = {
            name: "Divine Purpose",
            chance: 0.15, //0.075 * points,
            type: 'buff',
            buffType: 'special',
            value: 1.15,
            buffDuration: 25, // Irrelevant. 
        }

        spellDB['Light of Dawn'].push(buffSpell);
        spellDB['Word of Glory'].push(buffSpell);
    }}, 



    // Zealot's Paragon - Hammer of Wrath and Judgment deal 10% additional damage and extend the duration of Avenging Crusader by 0.5s.
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
    }}, 

    // Divine Resonance - Buff that casts a free Holy Shock every 5s for 15s.

    // Quickened Invocation - 15s off DT cooldown.
    quickenedInvocation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Divine Toll'][0].cooldown -= 15;
    }}, 

    // Of Dusk and Dawn - Casting 3 HoPo generating abilities increases healing of next spender by 20%. 

    // Seal of Order - Dawn is 30% instead of 20%. Dusk causes HoPo generators to cool down 10% faster.

    // Fading Light - 
    fadingLight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        const expectedShieldEfficiency= 0.9; // Dusk uptime is basically 100%.
        spellDB['Holy Shock'][0].coeff *= (1 + 0.2 * expectedShieldEfficiency);

        // Fading Light also increases the power of Dawn by 10%.
    }}, 


    // === Spec Tree ===
    // Crusader's Might
    crusadersMight: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Crusader Strike'].push({
            type: "cooldownReduction",
            cooldownReduction: 1 * points,
            targetSpell: "Holy Shock",
        });

    }}, 

    // Shining Savior - WoG / LoD +5%.
    shiningSavior: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Word of Glory'][0].coeff *= 1.05;
        spellDB['Light of Dawn'][0].coeff *= 1.05;
    }}, 

    // Resplendent Light - Holy Light splashes to 5 targets for 8% each.

    // Divine Insight - Holy Shock damage and healing increased by 5%.
    divineInsight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].coeff *= 1.05;
    }}, 

    // Radiant Onslaught - Extra CS charge.

    // Tower of Radiance - Casting FoL / HL on Beacon gives +1 HoPo. Casting FoL / HL on anyone else has a chance to give +1 HoPo.

    // Inbued Infusions - Consuming IoL reduces the CD of Holy Shock by 1s.

    // Divine Rev - While empowered by IoL, Flash heals for +10% and Holy Light refunds 1% mana.

    // Commanding Light - Beacon transfers an extra 10/20%. Baked in for now.

    // Divine Glimpse - Holy Shock has a +7/15% crit chance.
    divineGlimpse: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Holy Shock'][0].statMods.crit += (0.075 * points);
    }}, 

    // Sanctified Wrath - Holy Shock CD reduced by 40% during wings. +5s Wings duration.
    // Note that the CD portion is handled in Ramps instead of here.
    sanctifiedWrath: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Avenging Wrath'][0].buffDuration += 5;
    }}, 

    // Second Sunrise - Light of Dawn heals a second time for 20% of the amount.
    // TODO: Check if Empyrean Legacy affects both.
    // We'll probably end up converting this to an actual second cast in otrder to adjust its overhealing up.
    secondSunrise: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB['Light of Dawn'][0].coeff *= 1.2;
    }}, 

    // Veneration - Flash of Light, Holy Light and Judgment critical strikes reset the CD of Hammer of Wrath and make it usable on any target.

    // Might - Gain 20% Crit during wings. Currently just built in.
    avengingCrusader: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) { }},

    // Power of the Silver Hand - HL and FoL have a chance to give you a buff, increasing the healing of the next HS you cast by 10% of the damage / healing you do in the next 10s.

    // Spending Holy Power gives you +1% haste for 12s. Stacks up to 3 times.

    // Awakening - WoG / LoD have a 7% chance to grant you Avenging Wrath for 8s.
    awakening: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {

        if (state.talents.avengingCrusader.points > 0) {
            spellDB['Light of Dawn'].push({
                name: "Avenging Crusader",
                chance: 0.075 * points,
                type: "buff",
                buffType: 'special',
                buffDuration: 8,
            });
        }
        else {
            spellDB['Light of Dawn'].push({
                name: "Avenging Wrath",
                chance: 0.075 * points,
                type: "buff",
                castTime: 0,
                cost: 0,
                cooldown: 120,
                buffType: 'statsMult',
                stat: 'crit',
                value: (20 * 170), // 
                buffDuration: 8,
            });
        }



    }}, 

    // Glimmer of Light - Holy Shock leaves a glimmer. When you HS all glimmers are healed. Lasts 30s. Maximum 8 at a time.

    // Empyrean Legacy - Judgment empowers the next WoD to automatically cast Light of Dawn with +25% effectiveness. 30s cooldown.

    // Boundless Salvation

    // Inflorescence of the Sunwell
}