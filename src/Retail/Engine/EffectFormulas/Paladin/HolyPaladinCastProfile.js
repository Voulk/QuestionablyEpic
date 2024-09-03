
import { getCurrentStats, getCrit, getHaste, applyTalents, deepCopyFunction, getSpellAttribute, getTalentPoints } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase"
import { runHeal, applyLoadoutEffects } from "Retail/Engine/EffectFormulas/Paladin/HolyPaladinRamps";
import { STATCONVERSION } from "General/Engine/STAT";

const getCPM = (profile, spellName) => {
    const filterSpell = profile.filter(spell => spell.spell === spellName)
    let cpm = 0;
    for (let i = 0; i < filterSpell.length; i++) cpm += filterSpell[i].cpm || 0;

    return cpm;
}

export const runHolyPaladinCastProfile = (playerData) => {
    const fightLength = 300;

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
    const blessingOfDawnCDR = 1 + 0.1 * 0.9

    const castProfile = [
        {spell: "Avenging Wrath", cpm: 0.5},
        {spell: "Divine Toll", cpm: 1},
        {spell: "Holy Shock", cpm: 60 / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown") * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},
        {spell: "Crusader Strike", cpm: 60 / getSpellAttribute(paladinSpells["Crusader Strike"], "cooldown") * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},
        {spell: "Eternal Flame", cpm: 0},
        {spell: "Light of Dawn", cpm: 0},
        
        {spell: "Judgment", cpm: 5.5 / blessingOfDawnCDR, hastedCPM: true }, // Technically a hasted CPM but in practice we cast this twice every 20s
        {spell: "Flash of Light", cpm: 4, hastedCPM: true},
        {spell: "Holy Light", cpm: 3.5, hastedCPM: true},
        {spell: "Holy Prism", cpm: 2},

        // Free Holy Shocks
        {spell: "Holy Shock", cpm: 60 / getSpellAttribute(paladinSpells["Divine Toll"], "cooldown") * 9
                                + 60 / getSpellAttribute(paladinSpells["Avenging Wrath"], "cooldown") * 4, freeSpell: true},
 
        {spell: "Dawnlight", cpm: 0, freeSpell: true},       
        {spell: "Sunsear", cpm: 0, freeSpell: true},                                   
      ]
    

    // Second Sunrise
    castProfile.push({spell: "Holy Shock", cpm: getCPM(castProfile, "Holy Shock") * 0.15, mult: 0.3});

    // Dawnlight
    const dawnlightCPM = getCPM(castProfile, "Avenging Wrath") * 4 + getCPM(castProfile, "Holy Prism") * 2;
    castProfile.filter(spell => spell.spell === "Dawnlight")[0].cpm = dawnlightCPM;

    // Apply multiplicative haste
    const averageDawnlightStacks = dawnlightCPM * 12 / 60;
    console.log(currentStats.haste);
    currentStats.haste = (((currentStats.haste / STATCONVERSION.HASTE / 100 + 1) * (1 + 0.02 * averageDawnlightStacks))-1) * STATCONVERSION.HASTE * 100
    console.log(currentStats.haste);

    // Haste our CPMs
    castProfile.forEach(spellProfile => {
        if (spellProfile.hastedCPM) spellProfile.cpm = spellProfile.cpm * getHaste(state.currentStats);
        }
    )


    // Free Holy shocks from Glorious Dawn
    castProfile.filter(spell => spell.spell === "Holy Shock")[0].cpm *= 1.1;
    castProfile.filter(spell => spell.spell === "Holy Shock")[1].cpm *= 1.1;

    // Fill in missing casts like Holy Words. Adjust any others that are impacted.
    const holyPowerPerMinute = getCPM(castProfile, "Holy Shock") + getCPM(castProfile, "Crusader Strike") + getCPM(castProfile, "Flash of Light")+ getCPM(castProfile, "Holy Light")  + getCPM(castProfile, "Judgment");
    const averageSpenderCPM = holyPowerPerMinute / 3 * 1.1725; // DP
    castProfile.filter(spell => spell.spell === "Eternal Flame")[0].cpm = averageSpenderCPM * 0.8;
    castProfile.filter(spell => spell.spell === "Light of Dawn")[0].cpm = averageSpenderCPM * 0.2;

    // Calculate Wings Effects
    // Calculate Wings uptime
    const awakeningProcs = averageSpenderCPM / 15
    const wingsUptime = getCPM(castProfile, "Avenging Wrath") * 20 / 60 +  awakeningProcs * 12 / 60;
    castProfile.filter(spell => spell.spell === "Dawnlight")[0].cpm += awakeningProcs;
    genericHealingIncrease *= (wingsUptime * 0.2 + 1);
    genericCritIncrease *= (wingsUptime * 0.2 + 1);
    // Infusion Count
    const baseCritChance = getCrit(state.currentStats) - 1 + genericCritIncrease - 1;
    const holyShockCritChance = (baseCritChance + paladinSpells["Holy Shock"][0].statMods.crit)
    const totalInfusions = getCPM(castProfile, "Holy Shock") * holyShockCritChance;

    state.currentStats.crit += (genericCritIncrease - 1) * 700 * 100

    // Handle CDR on Holy Shock and free casts
    // Note that we get some free HS casts here that won't be run for Infusions. Have a think about this. Minor.
    let totalHolyShockCDR = 0;
    if (getTalentPoints(state.talents, "crusadersMight")) totalHolyShockCDR += getCPM(castProfile, "Crusader Strike") * 2;
    if (getTalentPoints(state.talents, "imbuedInfusions")) totalHolyShockCDR += totalInfusions * 2;
    const extraHolyShockCPM = totalHolyShockCDR / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown");
    castProfile.filter(spell => spell.spell === "Holy Shock")[0].cpm += extraHolyShockCPM;

    // Sunsear
    const sunsearCPM = getCPM(castProfile, "Holy Shock") * holyShockCritChance + getCPM(castProfile, "Light of Dawn") * (baseCritChance + paladinSpells["Light of Dawn"][0].statMods.crit);
    castProfile.filter(spell => spell.spell === "Sunsear")[0].cpm = sunsearCPM;

    //console.log(paladinSpells["Holy Shock"])

    const healingBreakdown = {}
    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = paladinSpells[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm// * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;
            if (spell.type === "heal" && spellProfile.cpm > 0) {
                const value = runHeal(state, spell, spellName) ;
                
                spellThroughput += (value * spellCPM);
            }
            else if (spell.type === "buff" && spell.buffType === "heal") {
                // HoT
                const oneTick = {
                    name: spellName,
                    type: "heal",
                    coeff: spell.coeff,
                    expectedOverheal: spell.expectedOverheal,
                    targets: spell.targets || 1,
                    secondaries: spell.secondaries,
                }
                const oneTickHealing = runHeal(state, oneTick, spellName);
                const tickCount = spell.buffDuration / (spell.tickData.tickRate / getHaste(state.currentStats))

                spellThroughput += oneTickHealing * tickCount * spellCPM;

            }
            else if (spell.type === "function") {
                //const value = spell.runFunc(state, spell) * spellCPM;
            }

            if (spellName === "Judgment" && spell.name === "Greater Judgment") {
                // Double Judgment healing for each Infusion we collected.
                const percInfused = Math.min(1, totalInfusions / getCPM(castProfile, "Judgment"));

                spellThroughput *= (1 + percInfused)
            }

            // Spell Slice complete
            if (spellProfile.mult) spellThroughput *= spellProfile.mult;

            // Blessing of Anshe
            if (spellName === "Holy Shock") spellThroughput *= 1 + (2 * getHaste(state.currentStats) / spellCPM * 3);

            spellThroughput *= genericHealingIncrease;
            healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));

        });


    })
    //console.log("HPS: " + totalHealing / 60);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);
    const spellBreakdown = {}
    Object.keys(healingBreakdown).forEach(spellName => {
        spellBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) / 60) + " (" + Math.round(healingBreakdown[spellName] / totalHealing * 10000) / 100 + "%)";
    })
    
    console.log(spellBreakdown);
    console.log(totalHealing / 60);
    return { hps: totalHealing / 60, hpm: 0 }
}