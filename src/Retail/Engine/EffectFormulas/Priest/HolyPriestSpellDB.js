


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

    }], /*
    "Prayer of Healing": [{
        spellData: {id: 585, icon: "spell_holy_holysmite", cat: "heal"},

    }], */
}

export const baseTalents = {


};