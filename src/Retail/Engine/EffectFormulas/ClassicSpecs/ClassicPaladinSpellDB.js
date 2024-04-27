import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";
import { buffSpell } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { addBuff } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/BuffBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICPALADINSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Holy Light": [{
        // Regrowth direct heal portion
        spellData: {id: 635, icon: "spell_holy_holybolt", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 12, 
        coeff: 0.432, 
        flat: 4400,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        onCastEnd: [{type: "Remove Buff", buffName: "Infusion of Light"}]
    }],
    "Holy Shock": [{
        // Regrowth direct heal portion
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 7, 
        coeff: 0.2689999938, 
        flat: 2738,
        expectedOverheal: 0.3,
        holyPower: 1,
        secondaries: ['crit', 'mastery'],
        cooldownData: {cooldown: 8},
        statMods: {'crit': 0, critEffect: 0},
    }],
    "Holy Shock O": [{
        // Regrowth direct heal portion
        spellData: {id: 20473, icon: "spell_holy_searinglight", cat: "damage"},
        type: "damage",
        castTime: 0, 
        cost: 7, 
        coeff: 0.2689999938, // TODO
        flat: 2738, // TODO
        holyPower: 1,
        secondaries: ['crit'],
        statMods: {'crit': 0, critEffect: 0},
    }],
    "Flash of Light": [{
        // Regrowth direct heal portion
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 31, 
        flat: 7329,
        coeff: 0.863, 
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        onCastEnd: [{type: "Remove Buff", buffName: "Infusion of Light"}]
    }],
    "Divine Light": [{ // NYI
        // Regrowth direct heal portion
        spellData: {id: 82326, icon: "spell_holy_surgeoflight", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 12, 
        coeff: 0.432, 
        flat: 4400,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        onCastEnd: [{type: "Remove Buff", buffName: "Infusion of Light"}]
    }],
    "Holy Radiance": [{
        // Regrowth direct heal portion
        spellData: {id: 82327, icon: "spell_paladin_divinecircle", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 40, 
        flat: 2666,
        coeff: 0.259, 
        expectedOverheal: 0.2,
        targets: 6,
        secondaries: ['crit', 'mastery'],
        onCastEnd: [{type: "Remove Buff", buffName: "Infusion of Light"}]
    },
    {
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 3,
        coeff: 0.0504, // Estimated. Check it in Beta.
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        targets: 6, // Has *some* scaling above 6. Check. Does sqrt exist in Cata?
        secondaries: ['crit']
    }],
    "Light of Dawn": [{
        // Regrowth direct heal portion
        spellData: {id: 85222, icon: "spell_paladin_lightofdawn", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        flat: 640,
        coeff: 0.132, // Adjust this per Holy Power. 
        targets: 6,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        tags: ['Holy Power Spender'],
    }],
    "Word of Glory": [{
        // Regrowth direct heal portion
        spellData: {id: 85673, icon: "inv_helmet_96", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        flat: 2133,
        coeff: 0.209, // Adjust this per Holy Power. 
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        tags: ['Holy Power Spender'],
    }],
    "Judgement": [{
        // Regrowth direct heal portion
        spellData: {id: 20271, icon: "spell_holy_righteousfury", cat: "damage"},
        type: "damage",
        castTime: 0, 
        cost: 5, 
        flat: 1,
        coeff: 1, // Adjust this per Holy Power. 
        cooldownData: {cooldown: 6, activeCooldown: 0},
        secondaries: ['crit'] 
    }],
    "Avenging Wrath": [{
        spellData: {id: 31884, icon: "spell_holy_avenginewrath", cat: "cooldown"},
        type: "buff",
        name: "Avenging Wrath",
        castTime: 0,
        offGCD: true,
        cost: 8.0,
        cooldownData: {cooldown: 180, hasted: false},
        buffType: 'allIncrease',
        value: 1.2, // For handling Avenging Wrath: Might
        buffDuration: 20
    }],


    "Judgements of the Pure": [{
        spellData: {id: 0, icon: "", cat: "N/A"},
        type: "buff",
        name: "Judgements of the Pure",
        buffType: 'statsMult',
        stat: 'haste',
        value: 1.09,
        buffDuration: 60
    }]

}

// Talents that aren't in the resto portion of the tree (Feral / Balance)
const offspecTalents = {


}

// Holy Paladin talents
const specTalents = {
    arbiterOfTheLight: {points: 2, maxPoints: 2, icon: "spell_holy_healingaura", id: 20359, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    // Doesn't Beacon transfer.
    protectorOfTheInnocent: {points: 3, maxPoints: 3, icon: "ability_paladin_protectoroftheinnocent", id: 20138, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const newSpell = {
            name: "Protector of the Innocent",
            flat: 895 * points,
            coeff: 0,
            expectedOverheal: 0.3,
            secondaries: ['crit'] 
        }

        spellDB["Holy Light"].push(newSpell);
        spellDB["Flash of Light"].push(newSpell);
        spellDB["Holy Shock"].push(newSpell);
        //spellDB["Divine Light"].push(newSpell);
        
    }},

    judgementsOfThePure: {points: 3, maxPoints: 3, icon: "ability_paladin_judgementofthepure", id: 53671, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB['Judgement'].push(spellDB["Judgements of the Pure"][0]);

    }},

    clarityOfPurpose: {points: 3, maxPoints: 3, icon: "spell_paladin_clarityofpurpose", id: 85462, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const reduction = points === 3 ? 0.5 : points * 0.15;
        spellDB["Holy Light"][0].castTime -= reduction;
        spellDB["Divine Light"][0].castTime -= reduction;
        spellDB["Holy Radiance"][0].castTime -= reduction;
    }},

    lastWord: {points: 3, maxPoints: 3, icon: "spell_holy_holyguidance", id: 20234, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    blazingLight: {points: 2, maxPoints: 2, icon: "spell_holy_holybolt", id: 20237, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Holy Shock O"], 1 + 0.05 * points);
    }},

    infusionOfLight: {points: 2, maxPoints: 2, icon: "ability_paladin_infusionoflight", id: 53569, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Holy Shock"][0].statMods.crit += 0.05 * points;
        spellDB["Holy Shock O"][0].statMods.crit += 0.05 * points;

        const infusion = { // Infusion of Light
            name: "Infusion of Light",
            type: "buff",
            stacks: 1,
            onCrit: true,
            canStack: false,
            buffDuration: 15,
            buffType: 'spellSpeedFlat',
            buffSpell: ["Flash of Light", "Holy Light", "Holy Radiance", "Divine Light"],
            unique: true,
            buffSpeed: 1.5,
        }

        spellDB["Holy Shock"].push(infusion);
        spellDB["Holy Shock O"].push(infusion);
    }},

    daybreak: {points: 2, maxPoints: 2, icon: "inv_qirajidol_sun", id: 88820, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const daybreak = { // Infusion of Light
            type: "buff",
            chance: 0.1 * points,
            name: "Daybreak",
            buffType: 'special',
            canStack: false,
            stacks: 1,
            maxStacks: 1,
            buffDuration: 30,
        }

        spellDB["Flash of Light"].push(daybreak);
        spellDB["Holy Light"].push(daybreak);
        spellDB["Divine Light"].push(daybreak);
    }},

    enlightenedJudgements: {points: 2, maxPoints: 2, icon: "ability_paladin_enlightenedjudgements", id: 53556, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    speedOfLight: {points: 3, maxPoints: 3, icon: "paladin_icon_speedoflight", id: 85495, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const buff = {
            type: "buff",
            name: "Speed of Light Passive",
            buffType: 'statsMult',
            stat: 'haste',
            value: 1 + 0.01 * points,
            buffDuration: 9999
        }

        addBuff(state, buff, "Passive: Speed of Light");
    }},

    // NYI
    conviction: {points: 3, maxPoints: 3, icon: "ability_paladin_conviction", id: 20049, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const conviction = {
            type: "buff",
            onCrit: true,
            name: "Conviction",
            buffType: 'special',
            canStack: false,
            stacks: 1,
            maxStacks: 1,
            buffDuration: 30,
        }
    }},

    paragonOfVirtue: {points: 2, maxPoints: 2, icon: "spell_holy_avenginewrath", id: 93418, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Avenging Wrath"][0].cooldownData.cooldown -= 30 * points;
    }},

    towerOfRadiance: {points: 3, maxPoints: 3, icon: "achievement_bg_winsoa", id: 84800, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Holy Radiance"][0].holyPower = 1;
    }},

    blessedLife: {points: 2, maxPoints: 2, icon: "spell_holy_blessedlife", id: 31828, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},



}

const glyphs = {
    glyphOfHolyShock: {points: 1, maxPoints: 1, icon: "spell_holy_searinglight", id: 63224, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    glyphOfDivineFavor: {points: 1, maxPoints: 1, icon: "spell_holy_divineillumination", id: 54937, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    glyphOfSealOfInsight: {points: 1, maxPoints: 1, icon: "spell_holy_healingaura", id: 54943, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},
    glyphOfWordOfGlory: {points: 1, maxPoints: 1, icon: "inv_helmet_96", id: 54936, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

}

export const paladinTalents = {
    ...offspecTalents,
    ...specTalents,
    ...glyphs,
};

