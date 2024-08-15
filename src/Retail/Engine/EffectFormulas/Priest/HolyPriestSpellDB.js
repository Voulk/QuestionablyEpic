
import { checkRoll, getTalentPoints, getCurrentStats} from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
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
                runHeal(state, pomHeal, "Prayer of Mending", true);
            }
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
        spellDB["Holy Nova"].push({...cdReductionBase, targetSpell: "Holy Word: Chastise"});
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
        spellDB["Holy Word: Chastise"].push(cdReductionBase);
    }},
 
}

export const baseTalents = {
    ...classTalents,
    ...specTalents,
};


export const runHolyPriestCastProfile = (playerData) => {
    const castProfile = [
        {spell: "Flash Heal", cpm: 2, hastedCPM: true, fillerSpell: true, fillerRatio: 0.66},
        //{spell: "Prayer of Mending", cpm: 2},
      ]
    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: playerData.talents, reporting: true, heroSpec: "Oracle", currentTarget: 0, currentStats: getCurrentStats(playerData.stats, [])};
    // Fill in missing casts like Holy Words. Adjust any others that are impacted.


    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = playerData.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {
            if (spell.type === "heal") {
                const value = runHeal(state, spell, spellName) // * spellprofile.cpm;
               console.log(spellName + " " + value);
            }

        });


    })
}