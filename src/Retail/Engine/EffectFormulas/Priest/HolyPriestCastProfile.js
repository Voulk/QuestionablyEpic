
import { getCurrentStats, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, applyLoadoutEffects } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpellSequence"

const getCPM = (profile, spellName) => {
    return profile.filter(spell => spell.spell === spellName)[0].cpm || 0;
}

export const runHolyPriestCastProfile = (playerData) => {
    const fightLength = 300;
    let totalHealing = 0;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: playerData.talents, reporting: true, heroSpec: "Oracle", currentTarget: 0, currentStats: getCurrentStats(playerData.stats, [])};
    
    // Run Talents
    const priestSpells = applyLoadoutEffects(deepCopyFunction(playerData.spellDB), state.settings, state.talents, state, state.currentStats);
    applyTalents(state, priestSpells, state.currentStats)
    state.spellDB = priestSpells;

    let currentStats = {...playerData.stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1;

    const castProfile = [
        {spell: "Flash Heal", cpm: 4, hastedCPM: true, fillerSpell: true, fillerRatio: 0.66},
        {spell: "Heal", cpm: 0, hastedCPM: true, fillerSpell: true, fillerRatio: 0.66},
        {spell: "Prayer of Healing", cpm: 3, hastedCPM: true, fillerSpell: true, fillerRatio: 0.66},
        {spell: "Prayer of Mending", cpm: 60 / getSpellAttribute(priestSpells["Prayer of Mending"], "cooldown") * cooldownWastage, hastedCPM: true},
        {spell: "Renew", cpm: 0},
        {spell: "Heal", cpm: 0},
        {spell: "Halo", cpm: 60 / getSpellAttribute(priestSpells["Halo"], "cooldown") * cooldownWastage},
        {spell: "Divine Hymn", cpm: 60 / getSpellAttribute(priestSpells["Divine Hymn"], "cooldown") * cooldownWastage},
        {spell: "Lightwell", cpm: 60 / getSpellAttribute(priestSpells["Lightwell"], "cooldown") * cooldownWastage},
        {spell: "Holy Word: Serenity", cpm: 0},
        {spell: "Holy Word: Sanctify", cpm: 0},
        {spell: "Holy Word: Salvation", cpm: 0},
        {spell: "Circle of Healing", cpm: 60 / getSpellAttribute(priestSpells["Circle of Healing"], "cooldown") * cooldownWastage, hastedCPM: true},
        //{spell: "Prayer of Mending", cpm: 2},
      ]


    // Fill in missing casts like Holy Words. Adjust any others that are impacted.
    // Our Sanctify CPM is basically equal to 1 (2 w/ Miracle Worker) + fightLength / (60 - avgCDR)
    const averageSancCPM = 1 + getCPM(castProfile, "Prayer of Healing") * 6 / 60 + getCPM(castProfile, "Renew") * 2 / 60;
    castProfile.filter(spell => spell.spell === "Holy Word: Sanctify")[0].cpm = averageSancCPM;
    // TODO: Voice of Harmony

    const averageSerenityCPM = 1 + getCPM(castProfile, "Flash Heal") * 6 / 60 + getCPM(castProfile, "Heal") * 6 / 60;
    castProfile.filter(spell => spell.spell === "Holy Word: Serenity")[0].cpm = averageSerenityCPM;

    const averageSalvationCPM = 1 + getCPM(castProfile, "Holy Word: Serenity") * 30 / 720 + getCPM(castProfile, "Holy Word: Sanctify") * 30 / 720;
    castProfile.filter(spell => spell.spell === "Holy Word: Salvation")[0].cpm = averageSalvationCPM;
      
    // Surge of Light

    // Calculate Renew uptime
    // Sources: Hard casts, Salvation, Benediction (PoM), Lightwell
    if (getTalentPoints(state.talents, "renewedFaith")) {
        const totalRenewDuration = getCPM(castProfile, "Renew") * 15 + 
                                    getCPM(castProfile, "Holy Word: Salvation") * 15 * playerData.spellDB["Holy Word: Salvation"][0].targets + 
                                    getCPM(castProfile, "Lightwell") * 6 * playerData.spellDB["Lightwell"][0].charges;

        genericHealingIncrease *= (1 + totalRenewDuration / 60 / 20 * 0.06);
    }


    // Lightwell, Salv, Revit Prayers (low prio), Benediction (low)


    const healingBreakdown = {}
    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = playerData.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;
            if (spell.type === "heal" && spellProfile.cpm > 0) {
                const value = runHeal(state, spell, spellName) ;
                
                spellThroughput += (value * spellCPM);
            }
            else if (spell.type === "function") {
                if (spellName === "Prayer of Mending" || spellName === "Lightwell" || spellName === "Holy Word: Salvation") {
                    const value = spell.runFunc(state, spell) * spellCPM;
                    spellThroughput += value;
                }

            }

            
            // Handle special healing increases. These can be on a spell by spell basis. Most often it's dynamic increases.

            // Pontifex
            if (spellName === "Holy Word: Sanctify" || spellName === "Holy Word: Serenity") {
                const avgStacks = getCPM(castProfile, "Prayer of Healing") + getCPM(castProfile, "Circle of Healing") + getCPM(castProfile, "Flash Heal") + getCPM(castProfile, "Heal");
                const holyWordCPM = getCPM(castProfile, "Holy Word: Sanctify") + getCPM(castProfile, "Holy Word: Serenity");
                spellThroughput *= 1 + (Math.min(0.3, 0.06 * avgStacks) / holyWordCPM);
            }
            // Resonant Words

            // Healing Chorus


            // Spell Slice complete
            spellThroughput *= genericHealingIncrease;
            healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));

        });


    })
    //console.log("HPS: " + totalHealing / 60);
    //console.log(healingBreakdown);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    return sumValues(healingBreakdown)
}