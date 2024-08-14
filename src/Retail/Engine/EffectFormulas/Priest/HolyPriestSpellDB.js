


export const HOLYPRIESTSPELLDB = {
    "Smite": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "damage"},
        type: "damage",
        castTime: 1.5,
        cost: 0.4,
        coeff: 0.52875, // 0.705 x 0.7 (smite aura nerf)
        atoneOverheal: 0.2,
        school: "holy",
        secondaries: ['crit', 'vers'],
    }],
    "Flash Heal": [{
        spellData: {id: 2061, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 10, 
        coeff: 3.4104 * 1.61, 
        expectedOverheal: 0.2,
        targeting: {type: "friendly", count: 1, behavior: "random"},
        statMods: {'crit': 0, critEffect: 0},
        secondaries: ['crit', 'versatility'] 
    }],
    "Heal": [{
        spellData: {id: 2060, icon: "spell_holy_greaterheal", cat: "heal"},
        type: "heal",
        castTime: 2.5,
        cost: 0.4,
        coeff: 8.6862, // 0.705 x 0.7 (smite aura nerf)
        expectedOverheal: 0.15,
        school: "holy",
        secondaries: ['crit', 'vers'],
        statMods: {'crit': 0, critEffect: 0},
    }],
    
    "Renew": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 8, //
        type: "buff",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: true, tickOnCast: true}, 
        buffDuration: 12,
        coeff: 0.32 * 1.06,
        expectedOverheal: 0.2,
        targeting: {type: "friendly", count: 1, behavior: "avoidSame"},
        secondaries: ['crit', 'versatility', 'mastery'] 
    }], 
    "Circle of Healing": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 3.3,
        coeff: 1.599,
        targets: 5,
        expectedOverheal: 0.15,
        cooldownData: {cooldown: 18, hasted: true}, 
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }], 
    "Holy Word: Serenity": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 2.5,
        coeff: 12.7674,
        expectedOverheal: 0.22,
        cooldownData: {cooldown: 60, hasted: false, charges: 1}, 
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }], 
    "Holy Word: Sanctify": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 3.5,
        coeff: 3.5793,
        targets: 5,
        expectedOverheal: 0.3,
        cooldownData: {cooldown: 60, hasted: false}, 
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],

    }], 
    "Prayer of Healing": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 2,
        cost: 4.4,
        coeff: 1.32918,
        targets: 5,
        expectedOverheal: 0.47,
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }], 
    "Prayer of Mending": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 10,
        coeff: 0.61,
        targets: 5, // Bounces
        expectedOverheal: 0.2,
        cooldownData: {cooldown: 12, hasted: true}, 
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }], 
}

// Maybe split to a shared file for Disc?
const classTalents = {

}

const specTalents = {
    orison: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Circle of Healing"][0].targets = 6;
        spellDB["Circle of Healing"][0].cooldownData.cooldown -= 3;
    }}, 


    prayersOfTheVirtuous: {points: 2, maxPoints: 2, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {

        spellDB["Prayer of Mending"][0].targets += points;
    }}, 
    sayYourPrayers: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {

        spellDB["Prayer of Mending"][0].targets *= 1.15;
    }}, 
    divineService: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Prayer of Mending"][0].coeff *= (1 + (0.04 * spellDB["Prayer of Mending"][0].targets / 2));
    }}, 
    crisisManagement: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Flash Heal"][0].statMods.crit = (0.075 * points);
        spellDB["Heal"][0].statMods.crit = (0.075 * points)
    }}, 
}

export const baseTalents = {
    ...classTalents,
    ...specTalents,
};