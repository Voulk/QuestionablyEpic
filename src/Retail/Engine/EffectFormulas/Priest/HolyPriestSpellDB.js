


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
        cost: 0.4,
        coeff: 0.52875, // 0.705 x 0.7 (smite aura nerf)
        atoneOverheal: 0.2,
        school: "holy",
        secondaries: ['crit', 'vers', 'mastery'],
    }],
    "Heal": [{
        spellData: {id: 2060, icon: "spell_holy_greaterheal", cat: "heal"},
        type: "heal",
        castTime: 2.5,
        cost: 0.4,
        coeff: 0.52875, // 0.705 x 0.7 (smite aura nerf)
        expectedOverheal: 0.15,
        school: "holy",
        secondaries: ['crit', 'vers'],
    }],
    
    "Renew": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0.4, // TODO
        coeff: 0.52875, // TODO
        school: "holy",
        expectedOverheal: 0.15,
        secondaries: ['crit', 'vers'], // Haste handled elsewhere.

    }], 
    "Circle of Healing": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},

    }], 
    "Holy Word: Serenity": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},

    }], 
    "Holy Word: Sanctify": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0.4, // TODO
        coeff: 0.52875, // TODO
        school: "holy",
        expectedOverheal: 0.15,
        secondaries: ['crit', 'vers'], 

    }], 
    "Prayer of Healing": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},

    }], 
}

export const baseTalents = {
    // Disc spec tree
    // Tier 1
    lightsPromise: {points: 0, maxPoints: 1, icon: "spell_priest_power-word", id: 322115, select: false, tier: 1},
    darkIndulgence: {points: 1, maxPoints: 1, icon: "spell_shadow_painandsuffering", id: 372972, select: true, tier: 1},
    schism: {points: 1, maxPoints: 1, icon: "spell_warlock_focusshadow", id: 214621, select: false, tier: 1},
    brightPupil: {points: 1, maxPoints: 1, icon: "spell_holy_surgeoflight", id: 390684, select: true, tier: 1},
    enduringLuminescence: {points: 0, maxPoints: 1, icon: "ability_priest_holybolts01", id: 390685, select: true, tier: 1},
    powerWordSolace: {points: 0, maxPoints: 1, icon: "ability_priest_flashoflight", id: 129250, select: false, tier: 1, exclusive: "shieldDiscipline"},
    shieldDiscipline: {points: 0, maxPoints: 1, icon: "spell_holy_divineprotection", id: 197045, select: true, tier: 1, exclusive: "powerWordSolace"},
    powerWordBarrier: {points: 0, maxPoints: 1, icon: "spell_holy_powerwordbarrier", id: 62618, select: false, tier: 1},
    painfulPunishment: {points: 1, maxPoints: 1, icon: "ability_priest_clarityofpower", id: 390686, select: true, tier: 1},
    maliciousIntent: {points: 0, maxPoints: 1, icon: "ability_demonhunter_darkness", id: 372969, select: true, tier: 1},
    
    // Tier 2
    purgeTheWicked: {points: 1, maxPoints: 1, icon: "ability_mage_firestarter", id: 204197, select: true, tier: 2},
    rapture: {points: 1, maxPoints: 1, icon: "spell_holy_rapture", id: 47536, select: false, tier: 2},
    shadowCovenant: {points: 0, maxPoints: 1, icon: "spell_shadow_summonvoidwalker", id: 314867, select: true, tier: 2},
    revelInPurity: {points: 0, maxPoints: 1, icon: "spell_fire_felflamering_red", id: 373003, select: true, tier: 2},
    contrition: {points: 0, maxPoints: 2, icon: "ability_priest_savinggrace", id: 197419, select: true, tier: 2},
    exaltation: {points: 1, maxPoints: 1, icon: "spell_holy_spiritualguidence", id: 373042, select: true, tier: 2},
    indemnity: {points: 1, maxPoints: 1, icon: "ability_priest_clarityofwill", id: 373049, select: true, tier: 2},
    painAndSuffering: {points: 0, maxPoints: 2, icon: "spell_shadow_shadowwordpain", id: 390689, select: true, tier: 2},
    embraceShadow: {points: 0, maxPoints: 1, icon: "spell_warlock_demonsoul", id: 372985, select: true, tier: 2},
    twilightCorruption: {points: 0, maxPoints: 1, icon: "spell_fire_twilightimmolation", id: 373065, select: true, tier: 2},
    borrowedTime: {points: 0, maxPoints: 2, icon: "spell_holy_borrowedtime", id: 390691, select: true, tier: 2},
    castigation: {points: 1, maxPoints: 1, icon: "spell_holy_searinglightpriest", id: 193134, select: true, tier: 2},
    stolenPsyche: {points: 2, maxPoints: 2, icon: "ability_priest_surgeofdarkness", id: 373054, select: true, tier: 2},

    
    // Tier 3
    trainOfThought: {points: 1, maxPoints: 1, icon: "ability_mage_studentofthemind", id: 390693, select: true, tier: 3},
    lightsWrath: {points: 1, maxPoints: 1, icon: "inv_staff_2h_artifacttome_d_01", id: 373178, select: false, tier: 3},
    lenience: {points: 0, maxPoints: 1, icon: "ability_priest_atonement", id: 238063, select: true, tier: 3},
    evangelism: {points: 1, maxPoints: 1, icon: "spell_holy_divineillumination", id: 246287, select: false, tier: 3},
    mindbender: {points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_3", id: 123040, select: false, tier: 3},
    divineAegis: {points: 2, maxPoints: 2, icon: "spell_holy_devineaegis", id: 47515, select: true, tier: 3},
    //sinsOfTheMany: {points: 0, maxPoints: 2, icon: "spell_holy_holyguidance", id: 280391, select: true, tier: 3},
    blazeOfLight: {points: 2, maxPoints: 2, icon: "spell_holy_searinglight", id: 215768, select: true, tier: 3},
    resplendentLight: {points: 0, maxPoints: 2, icon: "inv_staff_2h_artifacttome_d_01", id: 390765, select: true, tier: 3},
    harshDiscipline: {points: 2, maxPoints: 2, icon: "ability_paladin_handoflight", id: 373180, select: true, tier: 3},
    expiation: {points: 0, maxPoints: 2, icon: "spell_shadow_shadowpower", id: 390832, select: true, tier: 3},
    voidSummoner: {points: 0, maxPoints: 2, icon: "spell_shadow_shadowfiend", id: 391218, select: true, tier: 3},
    aegisOfWrath: {points: 0, maxPoints: 1, icon: "spell_holy_powerwordshield", id: 238135, select: true, tier: 3},
    makeAmends: {points: 0, maxPoints: 1, icon: "spell_holy_penance", id: 391079, select: true, tier: 3},
    wealAndWoe: {points: 0, maxPoints: 1, icon: "spell_priest_burningwill", id: 390786, select: true, tier: 3},
    wrathUnleashed: {points: 0, maxPoints: 1, icon: "spell_priest_divinestar_holy", id: 390781, select: true, tier: 3},
    twilightEquilibrium: {points: 1, maxPoints: 1, icon: "ability_priest_innerlightandshadow", id: 390705, select: true, tier: 3},
    inescapableTorment: {points: 0, maxPoints: 1, icon: "spell_shadow_chilltouch", id: 373427, select: true, tier: 3},

    // Priest class tree
    improvedFlashHeal: {points: 0, maxPoints: 1, icon: "spell_holy_heal", id: 393870, select: true, tier: 4},
    bindingHeals: {points: 1, maxPoints: 1, icon: "spell_holy_blindingheal", id: 368275, select: true, tier: 4},
    shadowWordDeath: {points: 1, maxPoints: 1, icon: "spell_shadow_demonicfortitude", id: 32379, select: false, tier: 4},
    focusedMending: {points: 0, maxPoints: 1, icon: "achievement_bg_returnxflags_def_wsg", id: 372354, select: false, tier: 4},
    deathAndMadness: {points: 0, maxPoints: 1, icon: "spell_shadow_demonicfortitude", id: 321291, select: true, tier: 4},
    wordsOfThePious: {points: 0, maxPoints: 1, icon: "ability_priest_clarityofwill", id: 377438, select: true, tier: 4},
    unwaveringWill: {points: 0, maxPoints: 1, icon: "ability_warrior_unrelentingassault", id: 373456, select: false, tier: 4},
    //twistOfFaith:
    throesOfPain: {points: 0, maxPoints: 2, icon: "spell_shadow_haunting", id: 377427, select: true, tier: 4},
    
    surgeOfLight: {points: 0, maxPoints: 2, icon: "spell_holy_surgeoflight", id: 114255, select: true, tier: 4},
    crystallineReflection: {points: 0, maxPoints: 2, icon: "ability_priest_reflectiveshield", id: 373457, select: true, tier: 4},
    //manipulation:
    mindgames: {points: 1, maxPoints: 1, icon: "ability_revendreth_priest", id: 323673, select: false, tier: 4},
    shatteredPerceptions: {points: 1, maxPoints: 1, icon: "spell_animarevendreth_debuff", id: 391112, select: true, tier: 4},

};