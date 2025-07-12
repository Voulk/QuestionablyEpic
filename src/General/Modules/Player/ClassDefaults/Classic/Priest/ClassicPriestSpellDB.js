import { runHeal } from "General/Modules/Player/ClassDefaults/Classic/ClassicRamps";
import { buffSpell } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { addBuff } from "General/Modules/Player/ClassDefaults/Generic/BuffBase";

// Add onTick, onExpiry functions to spells.
// It gets increasingly messy keeping two spces in here. Might be able to just have them inherit a core priest DB and then make changes if needed.
export const CLASSICPRIESTSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
        secondaries: [],
    }],
    "Power Word: Shield": [{
        spellData: {id: 17, icon: "spell_holy_powerwordshield", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 6.1 * 0.75, 
        coeff: 1.871, 
        flat: 19428,
        expectedOverheal: 0.07,
        cooldownData: {cooldown: 3},
        secondaries: [], // Disc Mastery
        absorb: true,
    }],
    "Prayer of Healing": [{
        spellData: {id: 596, icon: "spell_holy_prayerofhealing02", cat: "heal"},
        type: "heal",
        healType: "direct",
        castTime: 2.5, 
        cost: 4.5, 
        coeff: 0.838, 
        flat: 8688,
        expectedOverheal: 0.45,
        targets: 5,
        secondaries: ['crit', 'hmastery', 'mastery'],
    }],
    /*"Prayer of Mending": [{
        spellData: {id: 33076, icon: "spell_holy_prayerofmendingtga", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 18, 
        coeff: 0.318, 
        flat: 3299,
        additiveScaling: 0.25,
        expectedOverheal: 0.1,
        cooldownData: {cooldown: 10},
        targets: 3, // Effectively jumps
        secondaries: ['crit'],
    }],*/
    "Flash Heal": [{
        spellData: {id: 2061, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        healType: "direct",
        cost: 5.9, 
        coeff: 1.314, 
        flat: 13641,
        additiveScaling: 0.25,
        expectedOverheal: 0.1,
        secondaries: ['crit', 'hmastery', 'mastery'],
    }],
    "Binding Heal": [{
        spellData: {id: 32546, icon: "spell_holy_blindingheal", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        healType: "direct",
        cost: 5.4, 
        coeff: 0.899,
        flat: 9962,
        additiveScaling: 0.25,
        expectedOverheal: 0.1,
        targets: 2,
        secondaries: ['crit', 'hmastery', 'mastery'],
    }],
    "Renew": [{
        spellData: {id: 139, icon: "spell_holy_renew", cat: "heal", spec: "Holy Priest Classic"},
        cost: 2.6,
        castTime: 0,
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 12,
        coeff: 0.207, 
        flat: 2152,
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
        secondaries: ['crit'],
        additiveScaling: 0.4375,
        expectedOverheal: 0.3,
    },
    {
        //Rapid Renewal
        type: "heal",
        castTime: 0, 
        flat: 1484.88, 
        coeff: 0.14268, 
        expectedOverheal: 0.2,
        secondaries: ['hmastery'],
    }],
    "Smite": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "damage"},
        type: "damage",
        castTime: 2.5, 
        cost: 2.7, 
        coeff: 0.8560000062, 
        flat: 2361,
        secondaries: ['crit'],
    }],
    "Holy Fire": [{
        spellData: {id: 14914, icon: "spell_holy_searinglight", cat: "damage"},
        type: "damage",
        castTime: 0, 
        cost: 1.8, 
        coeff: 1.11,
        flat: 1136, 
        secondaries: ['crit'],
        cooldownData: {cooldown: 10},
        statMods: {},
    },
    {
        type: "classic periodic",
        buffType: "damage",
        buffDuration: 7,
        coeff: 0.0312, //
        flat: 57,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        secondaries: ['crit'],
        statMods: {crit: 0, critEffect: 0}
    }
    ],
    "Power Word: Solace": [{
        spellData: {id: 129250, icon: "ability_priest_flashoflight", cat: "damage"},
        type: "damage",
        castTime: 0, 
        cost: 0, 
        coeff: 1.11,
        flat: 1136, 
        damageToHeal: 1,
        secondaries: ['crit'],
        cooldownData: {cooldown: 10},
    },
    {
        type: "classic periodic",
        buffType: "damage",
        buffDuration: 7,
        coeff: 0.0312, //
        flat: 57,
        damageToHeal: 1,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        secondaries: ['crit'],
        statMods: {crit: 0, critEffect: 0}
    }
    ],
    "Penance": [{
        spellData: {id: 47540, icon: "spell_holy_penance", cat: "damage", spec: "Discipline Priest Classic"},
        type: "damage",
        castTime: 2, 
        cost: 3.1, 
        coeff: 1.12 * 3, 
        flat: 1081 * 3,
        cooldownData: {cooldown: 9},
        secondaries: ['crit'],
    },
],
    "Penance D": [{
        spellData: {id: 47540, icon: "spell_holy_penance", cat: "heal", spec: "Discipline Priest Classic"},
        type: "heal",
        castTime: 0, 
        cost: 3.1, 
        coeff: 0.838 * 3, 
        flat: 8719 * 3,
        expectedOverheal: 0.1,
        cooldownData: {cooldown: 9},
        secondaries: ['crit', 'mastery'],
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
        spellData: {id: 64843, icon: "spell_holy_divinehymn", cat: "heal", spec: "Holy Priest Classic"},
        castTime: 8, 
        cost: 6.3, 
        type: "classic periodic",
        buffType: "heal",
        healType: "direct",
        buffDuration: 8,
        coeff: 0.429, //
        flat: 4009,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, hasteScaling: true}, 
        cooldownData: {cooldown: 180 },
        expectedOverheal: 0.2,
        targets: 5,
        secondaries: ['crit', 'hmastery']
    }],
    "Prayer of Mending": [{
        spellData: {id: 33076, icon: "spell_holy_prayerofmendingtga", cat: "heal"},
        type: "heal",
        castTime: 0, 
        healType: "direct",
        cost: 3.5, 
        coeff: 0.571 * 1.25,
        flat: 3299 * 1.7948 * 1.25, // Yeah I know. This is just kind of how it is. 25% aura attached to Divine Fury & 25% on Spiritual Healing.
        additiveScaling: 0.25,
        cooldownData: {cooldown: 10},
        expectedOverheal: 0.1,
        targets: 3.5, // Maximum is 5.
        secondaries: ['crit', 'hmastery', 'mastery'],
    }],
    "Divine Star": [{
        spellData: {id: 110744, icon: "spell_priest_divinestar", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        coeff: 0.758, //
        flat: 7862,
        cooldownData: {cooldown: 15},
        expectedOverheal: 0.4, 
        targets: 6 * 2, // Hits on way out and way back.
        secondaries: ['crit', 'mastery'],
    },
    {
        type: "damage",
        damageType: "magic",
        coeff: 0.455, // 
        flat: 4717,
        targets: 1 * 2,
        secondaries: ['crit'],
    }],


    // HPriest only
    "Holy Word: Sanctuary": [{
        spellData: {id: 88685, icon: "spell_holy_divineprovidence", cat: "heal", spec: "Holy Priest Classic"},
        type: "classic periodic",
        buffType: "heal",
        healType: "direct",
        castTime: 0.5, 
        cost: 3.8, 
        buffDuration: 30,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, hasteScaling: false}, 
        cooldownData: {cooldown: 40 },
        coeff: 0.0583, 
        flat: 504,
        expectedOverheal: 0.35,
        targets: 6, // sqrt
        secondaries: ['crit', 'hmastery'], // HPriest Mastery
    }],
    "Holy Word: Serenity": [{
        spellData: {id: 88684, icon: "spell_holy_persuitofjustice", cat: "heal", spec: "Holy Priest Classic"},
        type: "heal",
        castTime: 0, 
        healType: "direct",
        cost: 2, 
        coeff: 1.3, 
        flat: 13442,
        expectedOverheal: 0.12,
        cooldownData: {cooldown: 40 },
        secondaries: ['crit', 'hmastery'],
    }],

    "Circle of Healing": [{
        spellData: {id: 34861, icon: "spell_holy_circleofrenewal", cat: "heal", spec: "Holy Priest Classic"},
        type: "heal",
        castTime: 0,
        healType: "direct",
        cost: 3.2, 
        coeff: 0.467, 
        flat: 4841,
        expectedOverheal: 0.15,
        cooldownData: {cooldown: 10},
        targets: 5, // sqrt
        secondaries: ['crit', 'hmastery'], // HPriest Mastery
    }],
    "Power Infusion": [{
        spellData: {id: 10060, icon: "spell_holy_powerinfusion", cat: "cooldown"},
        type: "buff",
        castTime: 0,
        cost: 0,
        cooldownData: {cooldown: 120, hasted: false}, 
        buffDuration: 20,
        buffType: 'statsMult',
        ongcd: true,
        stat: "haste",
        value: 1.2, 
    }],
    "Mindbender": [{
        spellData: {id: 123040, icon: "spell_shadow_soulleech_3", cat: "cooldown"},
        castTime: 0,
        cost: 0,
        type: "classic periodic",
        buffType: "damage",
        cooldownData: {cooldown: 60, hasted: false}, 
        tickData: {tickRate: 1.5, canPartialTick: false, tickOnCast: true},
        coeff: 0.88, // Has a 15% damage ability with 80% uptime. Can also get glancing blows.
        flat: 1847,
        tickRate: 1.5, // To confirm. Does tick on cast.
        buffDuration: 15,
        secondaries: ['crit'],
    }],
    "Shadowfiend": [{
        spellData: {id: 34433, icon: "spell_shadow_shadowfiend", cat: "cooldown"},
        castTime: 0,
        cost: 0,
        type: "classic periodic",
        buffType: "damage",
        cooldownData: {cooldown: 180, hasted: false}, 
        tickData: {tickRate: 1.5, canPartialTick: false, tickOnCast: true},
        coeff: 1, // 
        flat: 2098,
        tickRate: 1.5, // To confirm. Does tick on cast.
        buffDuration: 12,
        secondaries: ['crit'],
    }],
}

// Talents that aren't in the 
const offspecTalents = {

}


const discTalents = {

    // Fake talent to include stuff we need.
    discAura: {points: 1, maxPoints: 1, icon: "spell_holy_powerwordshield", id: 9999, select: false, tier: 9, runFunc: function (state, spellDB, points) {
        const atonementMult = 0.7
        spellDB["Divine Star"][0].coeff *= 0.75;
        spellDB["Divine Star"][1].coeff *= 0.75;
        spellDB["Divine Star"][0].flat *= 0.75;
        spellDB["Divine Star"][1].flat *= 0.75;

        // Atonement
        spellDB["Smite"][0].damageToHeal = atonementMult;
        spellDB["Holy Fire"][0].damageToHeal = atonementMult;
        spellDB["Holy Fire"][1].damageToHeal = atonementMult;
        spellDB["Penance"][0].damageToHeal = atonementMult;

    }},

        fromDarknessComesLight: {points: 0, maxPoints: 1, icon: "spell_holy_surgeoflight", id: 109186, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 
    mindbender: {points: 1, maxPoints: 1, icon: "spell_shadow_soulleech_3", id: 123040, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 
    solaceAndInsanity: {points: 0, maxPoints: 1, icon: "ability_priest_flashoflight", id: 139139, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T2
    twistOfFate: {points: 1, maxPoints: 1, icon: "spell_shadow_mindtwisting", id: 109142, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    powerInfusion: {points: 0, maxPoints: 1, icon: "spell_holy_powerinfusion", id: 10060, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    divineInsight: {points: 0, maxPoints: 1, icon: "spell_priest_burningwill", id: 109175, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T3
    cascade: {points: 0, maxPoints: 1, icon: "ability_priest_cascade", id: 121135, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    divineStar: {points: 1, maxPoints: 1, icon: "spell_priest_divinestar", id: 110744, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    halo: {points: 0, maxPoints: 1, icon: "ability_priest_halo", id: 120517, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 


}

const holyTalents = {
    // Row 2
    fromDarknessComesLight: {points: 0, maxPoints: 1, icon: "spell_holy_surgeoflight", id: 109186, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 
    mindbender: {points: 1, maxPoints: 1, icon: "spell_shadow_soulleech_3", id: 123040, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 
    solaceAndInsanity: {points: 0, maxPoints: 1, icon: "ability_priest_flashoflight", id: 139139, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T2
    twistOfFate: {points: 0, maxPoints: 1, icon: "spell_shadow_mindtwisting", id: 109142, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    powerInfusion: {points: 1, maxPoints: 1, icon: "spell_holy_powerinfusion", id: 10060, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    divineInsight: {points: 0, maxPoints: 1, icon: "spell_priest_burningwill", id: 109175, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T3
    cascade: {points: 0, maxPoints: 1, icon: "ability_priest_cascade", id: 121135, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    divineStar: {points: 1, maxPoints: 1, icon: "spell_priest_divinestar", id: 110744, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    halo: {points: 0, maxPoints: 1, icon: "ability_priest_halo", id: 120517, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 

    /*
    improvedRenew: {points: 2, maxPoints: 2, icon: "inv_helmet_96", id: 14908, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Renew"], 0.05 * points, "additive"); 
    }},
    empoweredHealing: {points: 0, maxPoints: 3, icon: "inv_helmet_96", id: 33158, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const value = 0.05 * points;
        buffSpell(spellDB["Heal"], value, "additive"); 
        buffSpell(spellDB["Flash Heal"], value, "additive"); 
        buffSpell(spellDB["Binding Heal"], value, "additive"); 
        buffSpell(spellDB["Greater Heal"], value, "additive"); 
    }},
    divineFury: {points: 0, maxPoints: 3, icon: "inv_helmet_96", id: 18530, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const reduction = points === 3 ? 0.5 : points * 0.15;
        spellDB["Smite"][0].castTime -= reduction;
        spellDB["Holy Fire"][0].castTime -= reduction;
        spellDB["Heal"][0].castTime -= reduction;
        spellDB["Greater Heal"][0].castTime -= reduction;
    }},
    surgeOfLight: {points: 0, maxPoints: 2, icon: "inv_helmet_96", id: 88687, select: true, tier: 1, runFunc: function (state, spellDB, points) {
    }},
    inspiration: {points: 0, maxPoints: 2, icon: "inv_helmet_96", id: 14892, select: true, tier: 1, runFunc: function (state, spellDB, points) {
    }},
    divineTouch: {points: 0, maxPoints: 2, icon: "inv_helmet_96", id: 63534, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // TODO
    }},
    heavenlyVoice: {points: 2, maxPoints: 2, icon: "inv_helmet_96", id: 87430, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Divine Hymn"][0].cooldownData.cooldown -= points * 90;
        buffSpell(spellDB["Divine Hymn"], 1, "additive"); 
    }},

    // Disc tree
    improvedPowerWordShield: {points: 2, maxPoints: 2, icon: "", id: 14748, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Power Word: Shield"], 0.1 * points, "additive");
    }},

    twinDisciplines: {points: 3, maxPoints: 3, icon: "", id: 47586, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // NYI
        state.genericBonus.healing *= 1 + (0.02 * points);
        state.genericBonus.damage *= 1 + (0.02 * points)
    }},
*/
}


const glyphs = {
    /*
    glyphOfPrayerOfHealing: {points: 1, maxPoints: 1, icon: "spell_holy_prayerofhealing02", id: 55680, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        const healOverTimeEffect = {       
            name: "Glyph of Prayer of Healing", 
            type: "classic periodic",
            buffType: "heal",
            buffDuration: 6,
            coeff: 0.34000000358 * 0.1, // This ticks twice for 20% total
            flat: 3175 * 0.1,
            targets: 5,
            tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
            expectedOverheal: 0.35,
            secondaries: ['crit'], // This effectively has crit scaling because the casting Prayer of Healing does. It can't double dip though.
            ignoreEffects: true};

        spellDB["Prayer of Healing"].push(healOverTimeEffect);
    }},
    */
    glyphOfCircleOfHealing: {points: 1, maxPoints: 1, icon: "spell_holy_circleofrenewal", id: 55675, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        spellDB["Circle of Healing"][0].targets = 6;
        spellDB["Circle of Healing"][0].cost *= 1.2;
    }},

    glyphOfBindingHeal: {points: 0, maxPoints:1, icon: "spell_holy_blindingheal", id: 63248, select: true, tier: 5, runFunc: function(state, spellDB, points) {
        spellDB["Binding Heal"][0].targets = 3;
        spellDB["Binding Heal"][0].cost *= 1.35;
    }},

    glyphOfRenew: {points: 0, maxPoints: 1, icon: "spell_holy_renew", id: 119872, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Renew"], 0.15, "additive"); 
        //spellDB["Renew"][0].additiveScaling += 0.474375; //idfk
        spellDB["Renew"][0].buffDuration = 9; 
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

