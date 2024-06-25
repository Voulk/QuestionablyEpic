import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";
import { buffSpell } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { addBuff } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/BuffBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICPRIESTSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Power Word: Shield": [{
        spellData: {id: 17, icon: "spell_holy_powerwordshield", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 34, 
        coeff: 0.87, 
        flat: 8863,
        expectedOverheal: 0.07,
        cooldownData: {cooldown: 3},
        secondaries: ["mastery"],
        absorb: true,
    }],
    "Prayer of Healing": [{
        spellData: {id: 596, icon: "spell_holy_prayerofhealing02", cat: "heal"},
        type: "heal",
        castTime: 2.5, 
        cost: 26, 
        coeff: 0.34000000358, 
        flat: 3175,
        expectedOverheal: 0.45,
        targets: 5,
        secondaries: ['crit'],
    }],
    "Prayer of Mending": [{
        spellData: {id: 33076, icon: "spell_holy_prayerofmendingtga", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 18, 
        coeff: 0.8069999814, 
        flat: 0,
        expectedOverheal: 0.1,
        targets: 3, // Effectively jumps
        secondaries: ['crit'],
    }],
    "Flash Heal": [{
        spellData: {id: 2061, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 28, 
        coeff: 0.72500002384, 
        flat: 6781,
        expectedOverheal: 0.1,
        secondaries: ['crit'],
    }],
    "Renew": [{
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 17, 
        coeff: 0.13099999726, 
        flat: 1224,
        expectedOverheal: 0.1,
        secondaries: ['crit'],
    }],
    "Smite": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "damage"},
        type: "damage",
        castTime: 2.5, 
        cost: 15, 
        coeff: 0.8560000062, 
        flat: 693,
        secondaries: ['crit'],
        statMod: {critEffect: 1.5},
    }],
    "Holy Fire": [{
        spellData: {id: 14914, icon: "spell_holy_searinglight", cat: "damage"},
        type: "damage",
        castTime: 2, 
        cost: 15, 
        coeff: 1.11000001431,
        flat: 1024, 
        secondaries: ['crit'],
        statMod: {critEffect: 1.5},
    },
    {
        type: "classic periodic",
        buffType: "damage",
        buffDuration: 7,
        coeff: 0.03119999915, // The coefficient for a single regrowth tick.
        flat: 51,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        secondaries: ['crit'],
        statMods: {crit: 0, critEffect: 0}
    }
],
    "Penance": [{
        spellData: {id: 47540, icon: "spell_holy_penance", cat: "damage"},
        type: "damage",
        castTime: 2, 
        cost: 14, 
        coeff: 0.458, 
        flat: 746,
        secondaries: ['crit'],
    },
],
    "Penance D": [{
        spellData: {id: 47540, icon: "spell_holy_penance", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 14, 
        coeff: 0.321, 
        flat: 3006,
        expectedOverheal: 0.1,
        secondaries: ['crit'],
    },
    {
        type: "buff",
        buffType: "heal",
        buffDuration: 2,
        coeff: 0.321, // The coefficient for a single regrowth tick.
        flat: 3006,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false, hasteScaling: false}, 
        expectedOverheal: 0.1,
        secondaries: ['crit']
    }],
    "Divine Hymn": [
    {
        castTime: 8, 
        cost: 36, 
        spellData: {id: 47540, icon: "spell_holy_penance", cat: "heal"},
        type: "buff",
        buffType: "heal",
        buffDuration: 8,
        coeff: 0.429, // The coefficient for a single regrowth tick.
        flat: 3023,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, hasteScaling: false}, 
        expectedOverheal: 0.1,
        targets: 5,
        secondaries: ['crit']
    }],

}

// Talents that aren't in the 
const offspecTalents = {

}


const discTalents = {
    improvedPowerWordShield: {points: 2, maxPoints: 2, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Power Word: Shield"], 0.1 * points, "additive");
    }},

    twinDisciplines: {points: 3, maxPoints: 3, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // NYI
        state.genericBonus.healing *= 1 + (0.02 * points);
        state.genericBonus.damage *= 1 + (0.02 * points)
    }},

    mentalAgility: {points: 3, maxPoints: 3, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        Object.keys(spellDB).forEach(spellName => {
            if (spellDB[spellName][0].castTime === 0) spellDB[spellName][0].cost *= (1 - 0.033 * points);
        });
    }},

    soulWarding: {points: 3, maxPoints: 3, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Power Word: Shield"][0].cooldownData.cooldown -= points;
    }},

    atonement: {points: 1, maxPoints: 1, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Smite"][0].damageToHeal = true;
        spellDB["Holy Fire"][0].damageToHeal = true;
        spellDB["Holy Fire"][1].damageToHeal = true;
    }},

    divineFury: {points: 3, maxPoints:3, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const reduction = [0.15, 0.3, 0.5][points];
        spellDB["Smite"][0].castTime -= reduction;
        spellDB["Holy Fire"][0].castTime -= reduction;
        //spellDB["Heal"][0].castTime -= reduction;
        //spellDB["Greater Heal"][0].castTime -= reduction;
    }},



}

const holyTalents = {

}


const glyphs = {
    glyphOfPrayerOfHealing: {points: 0, maxPoints: 1, icon: "spell_holy_searinglight", id: 63224, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const healOverTimeEffect = {        
            type: "classic periodic",
            buffType: "heal",
            buffDuration: 6,
            coeff: 0.34000000358 * 0.1, // This ticks twice for 20% total
            flat: 3175 * 0.1,
            tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
            secondaries: ['crit'], // This effectively has crit scaling because the casting Prayer of Healing does. It can't double dip though.
            ignoreEffects: true};

        spellDB["Prayer of Healing"].push(healOverTimeEffect);
    }},

    

    glyphOfDivineFavor: {points: 1, maxPoints: 1, icon: "spell_holy_divineillumination", id: 54937, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    glyphOfSealOfInsight: {points: 1, maxPoints: 1, icon: "spell_holy_healingaura", id: 54943, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},
    glyphOfWordOfGlory: {points: 1, maxPoints: 1, icon: "inv_helmet_96", id: 54936, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

}

export const compiledDiscTalents = {
    ...offspecTalents,
    ...discTalents,
    ...glyphs,
};

export const compiledHolyTalents = {
    ...offspecTalents,
    ...holyTalents,
    ...glyphs,
}

