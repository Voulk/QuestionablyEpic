
import { getCurrentStats, getCrit, getHaste, applyTalents, hasTalent, deepCopyFunction, getSpellAttribute, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { runHeal, applyLoadoutEffects, PALADINCONSTANTS } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinRamps";
import { STATCONVERSION } from "General/Engine/STAT";

import { printHealingBreakdown, getSpellEntry } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";


const getCPM = (profile, spellName) => {
    const filterSpell = profile.filter(spell => spell.spell === spellName)
    let cpm = 0;
    for (let i = 0; i < filterSpell.length; i++) cpm += filterSpell[i].cpm || 0;

    return cpm;
}

const getSpellEntry = (profile, spellName, index = 0) => {
    return profile.filter(spell => spell.spell === spellName)[index]
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

const getCastData = (profileName, paladinSpells) => {
    const castData = {
        profile: [],
        extras: {},
    }
    const cooldownWastage = 0.9;
    const blessingOfDawnCDR = 1 + 0.1 * 0.9

    if (profileName === "Herald of the Sun AW") {
        castData.profile = [
            {spell: "Avenging Wrath", cpm: 0.5},
            {spell: "Divine Toll", cpm: 1},
            {spell: "Holy Shock", cpm: 60 / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown") * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},
            {spell: "Crusader Strike", cpm: 60 / getSpellAttribute(paladinSpells["Crusader Strike"], "cooldown") * 0.3 * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},
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

          castData.extras.spenderUsage = {
            "Light of Dawn": 0.3,
            "Eternal Flame": 0.7,
            "Word of Glory": 0
            }
    }
    else if (profileName === "Lightsmith AW") {

    }
    else if (profileName === "Lightsmith AC") {
        castData.profile = [
            {spell: "Avenging Wrath", cpm: 0.5},
            {spell: "Divine Toll", cpm: 1},
            {spell: "Holy Shock", cpm: 60 / getSpellAttribute(paladinSpells["Holy Shock"], "cooldown") * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},
            {spell: "Crusader Strike", cpm: 60 / getSpellAttribute(paladinSpells["Crusader Strike"], "cooldown") * 0.3 * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},
            {spell: "Eternal Flame", cpm: 0},
            {spell: "Light of Dawn", cpm: 0},
            
            {spell: "Judgment", cpm: 5.5 / blessingOfDawnCDR, hastedCPM: true }, // Technically a hasted CPM but in practice we cast this twice every 20s
            {spell: "Flash of Light", cpm: 4, hastedCPM: true},
            {spell: "Holy Light", cpm: 3.5, hastedCPM: true},
            {spell: "Holy Prism", cpm: 2},
    
            // Free Holy Shocks
            {spell: "Holy Shock", cpm: 60 / getSpellAttribute(paladinSpells["Divine Toll"], "cooldown") * 9
                                    + 60 / getSpellAttribute(paladinSpells["Avenging Wrath"], "cooldown") * 4, freeSpell: true},    
            
            // AC
            {spell: "Crusader Strike", avengingCrusader: true, cpm: 60 / getSpellAttribute(paladinSpells["Crusader Strike"], "cooldown") * 0.3 * cooldownWastage / blessingOfDawnCDR, hastedCPM: true},

            
          ]
    }
    else {
        console.error("Paladin Cast Profile not found: " + profileName);
    }

    return castData;
}

export const runHolyPaladinCastProfile = (playerData) => {
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