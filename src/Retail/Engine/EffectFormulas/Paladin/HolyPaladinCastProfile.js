
import { getCurrentStats, getCrit, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, applyLoadoutEffects } from "Retail/Engine/EffectFormulas/Paladin/HolyPaladinRamps";

const getCPM = (profile, spellName) => {
    return profile.filter(spell => spell.spell === spellName)[0].cpm || 0;
}

export const runHolyPaladinCastProfile = (playerData) => {
    const fightLength = 300;
    let totalHealing = 0;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    talents: playerData.talents, reporting: true, heroTree: "heraldOfTheSun", currentTarget: 0, currentStats: getCurrentStats(playerData.stats, [])};
    
    // Run Talents
    const paladinSpells = applyLoadoutEffects(deepCopyFunction(playerData.spells), state.settings, state.talents, state, state.currentStats);
    applyTalents(state, paladinSpells, state.currentStats)
    state.spellDB = paladinSpells;

    let currentStats = {...playerData.stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const cooldownWastage = 0.9;
    let genericHealingIncrease = 1;
    let genericCritIncrease = 1;

    const castProfile = [
        {spell: "Avenging Wrath", cpm: 0.5},
        {spell: "Divine Toll", cpm: 1},
        {spell: "Holy Shock", cpm: 60 / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown") * cooldownWastage, hastedCPM: true},
        {spell: "Crusader Strike", cpm: 60 / getSpellAttribute(paladinSpells["Crusader Strike"], "cooldown") * cooldownWastage, hastedCPM: true},
        {spell: "Eternal Flame", cpm: 0},
        {spell: "Light of Dawn", cpm: 0},
        //{spell: "Prayer of Mending", cpm: 2},
      ]


    // Fill in missing casts like Holy Words. Adjust any others that are impacted.
    const holyPowerPerMinute = getCPM(castProfile, "Holy Shock") + getCPM(castProfile, "Crusader Strike");
    const averageSpenderCPM = holyPowerPerMinute / 3;
    castProfile.filter(spell => spell.spell === "Eternal Flame")[0].cpm = averageSpenderCPM * 0.8;
    castProfile.filter(spell => spell.spell === "Light of Dawn")[0].cpm = averageSpenderCPM * 0.2;

    // Calculate Wings Effects
    // Calculate Wings uptime
    const wingsUptime = getCPM(castProfile, "Avenging Wrath") * 20 / 60;
    genericHealingIncrease *= (wingsUptime * 0.2 + 1);
    genericCritIncrease *= (wingsUptime * 0.2 + 1);

    // Infusion Count
    const baseCritChance = getCrit(state.currentStats) - 1 + genericCritIncrease;
    const holyShockCritChance = (baseCritChance + paladinSpells["Holy Shock"][0].statMods.crit)
    const totalInfusions = getCPM(castProfile, "Holy Shock") * holyShockCritChance;

    // Handle CDR on Holy Shock and free casts
    // Note that we get some free HS casts here that won't be run for Infusions. Have a think about this. Minor.
    let totalHolyShockCDR = 0;
    if (getTalentPoints(state.talents, "crusadersMight")) totalHolyShockCDR += getCPM(castProfile, "Crusader Strike") * 2;
    if (getTalentPoints(state.talents, "imbuedInfusions")) totalHolyShockCDR += totalInfusions * 2;
    const extraHolyShockCPM = totalHolyShockCDR / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown");
    castProfile.filter(spell => spell.spell === "Holy Shock")[0].cpm += extraHolyShockCPM;


    // TODO: Awakening



    // Lightwell, Salv, Revit Prayers (low prio), Benediction (low)


    const healingBreakdown = {}
    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = playerData.spells[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;
            if (spell.type === "heal" && spellProfile.cpm > 0) {
                const value = runHeal(state, spell, spellName) ;
                
                spellThroughput += (value * spellCPM);
            }
            else if (spell.type === "function") {

            }

            // Spell Slice complete
            spellThroughput *= genericHealingIncrease;
            healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));

        });


    })
    //console.log("HPS: " + totalHealing / 60);
    console.log(healingBreakdown);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    return { hps: sumValues(healingBreakdown) / 60, hpm: 0 }
}