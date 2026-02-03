
import { getCurrentStats, getCrit, getHaste, hasTalent, deepCopyFunction, getSpellAttribute, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { applyTalents } from "../../Generic/ProfileUtilities";
import { runHeal, applyLoadoutEffects, PALADINCONSTANTS } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinRamps";
import { STATCONVERSION } from "General/Engine/STAT";

import { printHealingBreakdown, getSpellEntry } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";

export const holyPaladinProfile = {
    spec: "Holy Paladin",
    name: "Holy Paladin",
    scoreSet: scorePaladinSet,
    defaultStatProfile: { 
        // Our stats we want to run through the profile. 
        // You can change and play with these as much as you want.
        // All user-facing operations will set their own anyway like in Top Gear.
        intellect: 2000,
        haste: 550,
        crit: 550,
        mastery: 550,
        versatility: 550,
        stamina: 19000,
        critMult: 2,
    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        intellect: 1,
        crit: 0.452,
        mastery: 0.2,
        versatility: 0.35,
        haste: 0.3,
        hps: 0.304, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
}

const getCPM = (profile, spellName) => {
    const filterSpell = profile.filter(spell => spell.spell === spellName)
    let cpm = 0;
    for (let i = 0; i < filterSpell.length; i++) cpm += filterSpell[i].cpm || 0;

    return cpm;
}


const getBeaconHealing = (state, healingVal, spellName) => {
        let beaconHealing = 0;
        let beaconMult = 1;
        if (PALADINCONSTANTS.beaconAoEList.includes(spellName)) beaconMult = 0.5;
        else if (PALADINCONSTANTS.beaconExclusionList.includes(spellName)) beaconMult = 0;
    
    
        // Beacons
        if (state.beacon === "Beacon of Light") beaconHealing = healingVal * 0.15 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
        else if (state.beacon === "Beacon of Faith") beaconHealing = healingVal * 0.105 * 2 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
        //else if (state.beacon === "Beacon of Virtue") beaconHealing = (checkBuffActive(state.activeBuffs, "Beacon of Virtue") ? healingVal * 0.1 * 5 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult : 0);
        
        return beaconHealing;
}


export const scorePaladinSet = (playerData) => {
    const fightLength = 300;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, simType: "CastProfile", damageDone: {}, casts: {}, manaSpent: 0, settings: playerData.settings, 
                    beacon: "Beacon of Faith", talents: playerData.talents, reporting: true, heroTree: "heraldOfTheSun", currentTarget: 0, currentStats: getCurrentStats(playerData.stats, [])};
    
    // Run Talents
    const paladinSpells = applyLoadoutEffects(deepCopyFunction(playerData.spells), state.settings, state.talents, state, state.currentStats);
    applyTalents(state, paladinSpells, state.currentStats)
    const talents = state.talents;
    state.spellDB = paladinSpells;

    let currentStats = {...playerData.stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    
    let genericHealingIncrease = 1;
    let genericCritIncrease = 1;
    
    const castData = getCastData(playerData.profileName, paladinSpells);

    const castProfile = castData.profile;
    const spenderUsage = castData.extras.spenderUsage;

    // Second Sunrise
    if (hasTalent(talents, "Second Sunrise")) castProfile.push({spell: "Holy Shock", cpm: getCPM(castProfile, "Holy Shock") * 0.15, mult: 0.3});
   

    // Dawnlight
    if (state.heroTree === "heraldOfTheSun") {
        const dawnlightCPM = getCPM(castProfile, "Avenging Wrath") * 4 + getCPM(castProfile, "Holy Prism") * 2;
        getSpellEntry(castProfile, "Dawnlight").cpm = dawnlightCPM;
    
        // Apply multiplicative haste
        const averageDawnlightStacks = dawnlightCPM * 12 / 60;
        currentStats.haste = (((currentStats.haste / STATCONVERSION.HASTE / 100 + 1) * (1 + 0.02 * averageDawnlightStacks))-1) * STATCONVERSION.HASTE * 100
    }

    // Haste our CPMs
    castProfile.forEach(spellProfile => {
        if (spellProfile.hastedCPM) spellProfile.cpm = spellProfile.cpm * getHaste(state.currentStats);
        }
    )

    // Free Holy shocks from Glorious Dawn
    getSpellEntry(castProfile, "Holy Shock", 0).cpm *= 1.1;
    getSpellEntry(castProfile, "Holy Shock", 1).cpm *= 1.1;

    // Fill in missing casts like Holy Words. Adjust any others that are impacted.
    const holyPowerPerMinute = getCPM(castProfile, "Holy Shock") + getCPM(castProfile, "Crusader Strike") + getCPM(castProfile, "Flash of Light")+ getCPM(castProfile, "Holy Light")  + getCPM(castProfile, "Judgment");
    const averageSpenderCPM = holyPowerPerMinute / 3 * 1.1725; // DP
    getSpellEntry(castProfile, "Eternal Flame").cpm = averageSpenderCPM * spenderUsage["Eternal Flame"];
    getSpellEntry(castProfile, "Light of Dawn").cpm = averageSpenderCPM * spenderUsage["Light of Dawn"];

    // Calculate Wings Effects
    // Calculate Wings uptime
    const awakeningProcs = averageSpenderCPM / 15
    if (hasTalent(talents, "Avenging Wrath")) {
        const wingsUptime = getCPM(castProfile, "Avenging Wrath") * 20 / 60 +  awakeningProcs * 12 / 60;
        getSpellEntry(castProfile, "Dawnlight").cpm += awakeningProcs;
        genericHealingIncrease *= (wingsUptime * 0.2 + 1);
        genericCritIncrease *= (wingsUptime * 0.2 + 1);
    }
    else if (hasTalent(talents, "Avenging Crusader")) {

    }
    

    // Infusion Count
    const baseCritChance = getCrit(state.currentStats) - 1 + genericCritIncrease - 1;
    const holyShockCritChance = (baseCritChance + paladinSpells["Holy Shock"][0].statMods.crit)
    const totalInfusions = getCPM(castProfile, "Holy Shock") * holyShockCritChance;

    state.currentStats.crit += (genericCritIncrease - 1) * 46 * 100

    // Handle CDR on Holy Shock and free casts
    // Note that we get some free HS casts here that won't be run for Infusions. Have a think about this. Minor.
    let totalHolyShockCDR = 0;
    if (getTalentPoints(state.talents, "crusadersMight")) totalHolyShockCDR += getCPM(castProfile, "Crusader Strike") * 2;
    if (getTalentPoints(state.talents, "imbuedInfusions")) totalHolyShockCDR += totalInfusions * 2;
    const extraHolyShockCPM = totalHolyShockCDR / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown");
    getSpellEntry(castProfile, "Holy Shock").cpm += extraHolyShockCPM;

    // Sunsear
    if (state.heroTree === "heraldOfTheSun") {
        const sunsearCPM = getCPM(castProfile, "Holy Shock") * holyShockCritChance + getCPM(castProfile, "Light of Dawn") * (baseCritChance + paladinSpells["Light of Dawn"][0].statMods.crit);
        getSpellEntry(castProfile, "Sunsear").cpm = sunsearCPM;
    }

    const healingBreakdown = {}
    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = paladinSpells[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellCPM = spellProfile.cpm// * (spellProfile.hastedCPM ? getHaste(state.currentStats) : 1);

        fullSpell.forEach(spell => {
            let spellThroughput = 0;
            if (spell.type === "heal" && spellProfile.cpm > 0) {
                let value = runHeal(state, spell, spellName) ;
                
                if (spell.onCrit) {
                    // Spell only heals on crits. 
                    value *= (getCrit(state.currentStats) / 100);
                }

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
            // 2ppm of triple Holy Shocks
            if (spellName === "Holy Shock" && state.heroTree === "heraldOfTheSun") spellThroughput *= 1 + (2 * getHaste(state.currentStats) / spellCPM * 3);

            spellThroughput *= genericHealingIncrease;
            healingBreakdown[spellName] = Math.round((healingBreakdown[spellName] || 0) + (spellThroughput));

            const beaconHealing = getBeaconHealing(state, spellThroughput, spellName);
            healingBreakdown[state.beacon] = Math.round((healingBreakdown[state.beacon] || 0) + (beaconHealing));

        });


    })
    //console.log("HPS: " + totalHealing / 60);
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const totalHealing = sumValues(healingBreakdown);
    const spellBreakdown = {}
    printHealingBreakdown(healingBreakdown, totalHealing);

    console.log(Math.round(totalHealing / 60).toLocaleString() + " HPS");
    console.log(castProfile);
    return { hps: totalHealing / 60, hpm: 0 }
}