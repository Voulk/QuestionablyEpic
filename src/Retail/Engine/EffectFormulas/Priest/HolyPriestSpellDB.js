
import { checkRoll, getTalentPoints, getHaste, } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellSequence"

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
        secondaries: ['crit', 'versatility', 'mastery'] 
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
        castTime: 0,
        cost: 8, //
        type: "buff",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: true, tickOnCast: true}, 
        buffDuration: 12,
        coeff: 0.32 * 1.06,
        expectedOverheal: 0.2,
        targeting: {type: "friendly", count: 1, behavior: "avoidSame"},
        secondaries: ['crit', 'versatility'] 
    }], 
    "Holy Fire": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "damage"},
        castTime: 1.5,
        cost: 0.4, //
        type: "damage",
        coeff: 2.97907,
        secondaries: ['crit', 'versatility'] 
    },
    {
        type: "buff",
        buffType: "damage",
        tickData: {tickRate: 1, canPartialTick: true, tickOnCast: true}, 
        buffDuration: 7,
        coeff: 0.16385,
        secondaries: ['crit', 'versatility'] 
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
    "Divine Hymn": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 8,
        channel: true,
        cost: 4.4,
        coeff: 2.844 * 5,
        targets: 20,
        expectedOverheal: 0.3,
        cooldownData: {cooldown: 180, hasted: true}, 
        tags: ['sqrt'],
        sqrtMin: 5,
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }], 
    "Prayer of Mending": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "function",
        castTime: 0,
        cost: 10,
        coeff: 0.61,
        bounces: 5, 
        expectedOverheal: 0.2,
        cooldownData: {cooldown: 12, hasted: true}, 
        runFunc: function (state, spell) {
            // Prayer of Mending is a slightly weird spell where it's a direct heal that will expel charges.
            // We'll handle it in a function so that we can be very flexible with attached effects.
            let totalHealing = 0;
            for (let i = spell.bounces; i > 0; i--) {
                const pomHeal = {
                    name: "Prayer of Mending",
                    coeff: spell.coeff, 
                    targets: 1,
                    expectedOverheal: spell.expectedOverheal, 
                    secondaries: spell.secondaries,
                    type: "heal",
                }
                if (getTalentPoints(state.talents, "divineService")) pomHeal.coeff *= (1 + (0.04 * spell.bounces - 1));
                if (getTalentPoints(state.talents, "sayYourPrayers") && checkRoll(0.15)) {
                    // 15% to not consume a stack (that is, i - 1)
                    i += 1;
                }
                totalHealing += runHeal(state, pomHeal, "Prayer of Mending", true);
            }
            return totalHealing; // Only used in cast profiles.
        },
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }], 
    "Halo": 
    // 
        [{
            spellData: {id: 120517, icon: "ability_priest_halo", cat: "heal"},
            type: "damage",
            castTime: 1.5,
            cost: 2.7,
            coeff: 1.442,
            cooldownData: {cooldown: 40, hasted: false}, 
            school: "holy",
            secondaries: ['crit', 'vers'],
        },
        {
            type: "heal",
            coeff: 1.61,
            targets: 15,
            secondaries: ['crit', 'vers', 'mastery'],
            tags: ['sqrt'],
            sqrtMin: 6,
            expectedOverheal: 0.5,
        }],
    "Lightwell": 
        [{
            spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
            castTime: 0,
            cost: 3.7, //
            type: "function",
            cooldownData: {cooldown: 120, hasted: false}, 
            coeff: 1.845,
            charges: 15,
            expectedOverheal: 0.2,
            secondaries: ['crit', 'versatility', 'mastery'],
            runFunc: function (state, spell) {
                // Lightwell can tick 15 times max, and we'll assume that most of those get used (not necessarily at 100% efficiency though).
                let totalHealing = 0;
                const charges = 15;
                const lwHeal = {
                    name: "Lightwell",
                    coeff: spell.coeff, 
                    targets: 1,
                    expectedOverheal: spell.expectedOverheal, 
                    secondaries: spell.secondaries,
                    type: "heal",
                }

                for (let i = 0; i < charges; i++) {
                    totalHealing += runHeal(state, lwHeal, "Lightwell", true);

                    if (state.simType === "CastProfile") {
                        // Handle Renew as a heal.
                        const renewHealing = castProfileRenew(state, 6);

                        totalHealing += renewHealing
                    }
                    
                }
                return totalHealing; // Only used in cast profiles.



            },
        },
    ],
    "Holy Word: Salvation": 
    [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        castTime: 2.5,
        cost: 6, //
        type: "function",
        cooldownData: {cooldown: 720, hasted: false}, 
        coeff: 1.28535,
        targets: 20,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'versatility', 'mastery'],
        runFunc: function (state, spell) {
            // Lightwell can tick 15 times max, and we'll assume that most of those get used (not necessarily at 100% efficiency though).
            let totalHealing = 0;

            const salvHeal = {
                name: "Holy Word: Salvation",
                coeff: spell.coeff, 
                targets: spell.targets,
                expectedOverheal: spell.expectedOverheal, 
                secondaries: spell.secondaries,
                type: "heal",
            }
            totalHealing += runHeal(state, salvHeal, "Holy Word: Salvation", true);
            
            if (state.simType === "CastProfile") {
                // Handle Renew and Prayer of Mending

                totalHealing += castProfileRenew(state, 15) * spell.targets;
                totalHealing += castProfilePrayerOfMending(state, 2) * spell.targets;
                
            }

            return totalHealing; // Only used in cast profiles.

        },
    },
],
}

const castProfilePrayerOfMending = (state, stacks) => {
    let totalHealing = 0;
    for (let i = stacks; i > 0; i--) {
        const spell = state.spellDB["Prayer of Mending"][0];
        const pomHeal = {
            name: "Prayer of Mending",
            coeff: spell.coeff, 
            targets: 1,
            expectedOverheal: spell.expectedOverheal, 
            secondaries: spell.secondaries,
            type: "heal",
        }
        if (getTalentPoints(state.talents, "divineService")) pomHeal.coeff *= (1 + (0.04 * spell.bounces - 1));
        if (getTalentPoints(state.talents, "sayYourPrayers") && checkRoll(0.15)) {
            // 15% to not consume a stack (that is, i - 1)
            i += 1;
        }
        totalHealing += runHeal(state, pomHeal, "Prayer of Mending", true);
    }
    return totalHealing; // Only used in cast profiles.
}

const castProfileRenew = (state, duration) => {
    const renew = state.spellDB["Renew"][0];
    const oneRenewTick = runHeal(state, renew, "Renew", true);
    const renewHealing = oneRenewTick * (duration / renew.tickData.tickRate * getHaste(state.currentStats));

    return renewHealing;
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

        spellDB["Prayer of Mending"][0].bounces += points;
    }}, 
    sayYourPrayers: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // Handled in the PoM spell function.
    }}, 
    divineService: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // Handled in the PoM spell function.
    }}, 
    renewedFaith: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // Handled in the PoM spell function.
    }}, 
    crisisManagement: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Flash Heal"][0].statMods.crit = (0.075 * points);
        spellDB["Heal"][0].statMods.crit = (0.075 * points)
    }}, 

    voiceOfHarmony: {points: 2, maxPoints: 2, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const cdReductionBase = {
            type: "cooldownReduction",
            cooldownReduction: 2 * points,
            targetSpell: "",
        };

        spellDB["Circle of Healing"].push({...cdReductionBase, targetSpell: "Holy Word: Sanctify"});
        spellDB["Prayer of Mending"].push({...cdReductionBase, targetSpell: "Holy Word: Serenity"});
        spellDB["Holy Fire"].push({...cdReductionBase, targetSpell: "Holy Word: Chastise"});
        //spellDB["Holy Nova"].push({...cdReductionBase, targetSpell: "Holy Word: Chastise"});
    }},

    epiphany: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 207383, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const cdReductionBase = {
            type: "cooldownReduction",
            cooldownReduction: 99,
            chance: 0.125 * points,
            targetSpell: "Prayer of Mending",
        };

        spellDB["Holy Word: Sanctify"].push(cdReductionBase);
        spellDB["Holy Word: Serenity"].push(cdReductionBase);
        //spellDB["Holy Word: Chastise"].push(cdReductionBase);
    }},
 
}

export const baseTalents = {
    ...classTalents,
    ...specTalents,
};

