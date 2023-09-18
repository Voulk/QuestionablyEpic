
// Add onTick, onExpiry functions to spells.
export const DRUIDSPELLDB = {
    "Rejuvenation": [
        {
        // HoT portion - Note the free tick on cast.
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "heal"},
        castTime: 0,
        cost: 2.2, // 5500
        type: "buff",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: true, tickOnCast: true}, 
        buffDuration: 12,
        coeff: 0.2465,
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 3.4, 
        coeff: 0.29, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    {
        // Regrowth HoT portion
        type: "heal",
        coeff: 0.0864, // The coefficient for a single regrowth tick.
        tickData: {tickRate: 2, canPartialTick: true, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery']
    }],


}

const classTalents = {
    improvedRejuvenation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 3;
    }}, 

}

const specTalents = {


    luxuriantSoil: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].tickData.onTick = function (state, buff, runSpell, druidSpells) {
            const roll = Math.random();
            const canProceed = (roll < (0.01 * state.talents.luxuriantSoil.points));

            if (canProceed) {
                // Create a new rejuvenation.
                runSpell(druidSpells["Rejuvenation"], state, "Rejuvenation", druidSpells)
            }
        };
    }}, 

    // This occurs in 3 2 second ticks. We'll watch this one closely on logs but functionally it usually represents a full 6s extension. 
    // Note that if we were to reduce this rate it should be by chance rather than cutting the extension.
    nurturingDormancy: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 6;
    }}, 

    germination: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 2;
    }}, 
}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
};

