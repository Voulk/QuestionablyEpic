// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { PALADINSPELLDB } from "./HolyPaladinSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { getSqrt, addReport, getCurrentStats, getHaste, getSpellRaw, queueSpell, deepCopyFunction, spendSpellCost, runRampTidyUp,
            getStatMult, GLOBALCONST, getHealth, getCrit, runSpell, getSpellCastTime, getTalentPoints, getTalentData } from "../Generic/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff, runBuffs, extendBuff } from "../Generic/BuffBase";
import { genSpell } from "../Generic/APLBase";

export const PALADINCONSTANTS = {
    
    masteryMod: 1.5, 
    masteryEfficiency: 0.82, 
    baseMana: 250000,

    auraHealingBuff: 0.97,
    auraDamageBuff: 1,
    enemyTargets: 1,

    // Beacon Section
    beaconSingleTargetList: ["Holy Shock", "Word of Glory", "Eternal Flame", "Holy Light", "Flash of Light", "Avenging Crusader"],
    beaconAoEList: ["Light of Dawn", "Light's Hammer"], // Glimmer is handled manually to catch other sources of glimmer
    beaconExclusionList: ["Saved by the Light", "Greater Judgment", "Touch of Light", "Beacon of Light", "Beacon of Light + Faith", "Beacon of Virtue", 
                            "Judgment", "Greater Judgment", "Shield of the Righteous", "Barrier of Faith"],
    beaconOverhealing: 0.3,

    // Talents
    tyrsHitRate: 0.8,
    barrierOverhealing: 0.15, // Barrier of Faith - Expected overhealing. Likely to be quite low.
    infusion: {holyLight: 1.3, flashOfLight: 1.3, judgment: 2},
    reclamation: {avgHealHealth: 0.75, avgDamHealth: 0.5, manaReduction: 0.15, throughputIncrease: 0.5},
    
    // Fading light
    duskSpellList: ["Holy Shock", "Judgment", "Holy Shock (Divine Toll)", "Holy Shock (Rising Sunlight)", "Hammer of Wrath", "Crusader Strike", "Flash of Light", "Holy Light"], 
    fadingLight: {effect: 0.1, efficiency: 0.9 }
}



//const apl = ["Avenging Wrath", "Divine Toll", "Light's Hammer", "Light of Dawn", "Holy Shock", "Hammer of Wrath", "Crusader Strike", "Judgment", "Rest"]

// Avenging Crusader
const apl2 = [
        {s: "Beacon of Virtue", conditions: {type: "CooldownDown", cooldownName: "Avenging Crusader", timer: 13}},
        {s: "Daybreak", c: {type: "buff", buffName: "Beacon of Virtue", talent: "daybreak"}}, 
        //{s: "Daybreak", c: {talent: "daybreak"}}, 
        {s: "Divine Toll", c: {type: "buff", buffName: "Rising Sunlight"}}, 
        {s: "Avenging Crusader"}, 
        {s: "Judgment", conditions: {type: "buff", buffName: "Avenging Crusader"}}, 
        {s: "Crusader Strike", conditions: {type: "buff", buffName: "Avenging Crusader"}}, 
        //{s: "Shield of the Righteous", conditions: {type: "buff", buffName: "Avenging Crusader"}}, Worth a shot
        //{s: "Hammer of Wrath", conditions: {type: "buff", buffName: "Avenging Crusader"}},
        {s: "Light's Hammer"}, 
        {s: "Light of Dawn", c: {type: "CooldownDown", cooldownName: "Beacon of Virtue", timer: 4}}, 
        //{s: "Light of Dawn", conditions: {type: "CooldownDown", cooldownName: "Avenging Crusader", timer: 3}}, // Don't cast LoD if AC is coming off cooldown.
        {s: "Holy Shock"}, 
        {s: "Judgment", conditions: {type: "CooldownDown", cooldownName: "Avenging Crusader", timer: 8}},
        {s: "Flash of Light", c: {type: "buff", buffName: "Infusion of Light"}}, 
        {s: "Crusader Strike", conditions: {type: "CooldownDown", cooldownName: "Avenging Crusader", timer: 3}},
        {s: "Consecration"}, 
        {s: "Holy Light"},
        {s: "Rest"}] 


/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} paladinSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 export const applyLoadoutEffects = (paladinSpells, settings, talents, state, stats) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    if (settings['DefaultLoadout']) {
        settings['T30_4'] = true;
        settings['T30_2'] = true;
    }

    /*
    if (settings['T30_2']) {
        paladinSpells["Holy Shock"][0].statMods.critEffect = 0.6;
        paladinSpells["Holy Shock"].push({
            type: "function",
            runFunc: function (state, buff, paladinSpells) {
                // Roll Dice equal to crit chance.
                const roll = Math.random();
                const holyShockCritChance = getCrit(state.currentStats) - 1 + paladinSpells["Holy Shock"][0].statMods.crit;
                // If successful, reduce CD on Light's Hammer by 2s.
                if (roll < getCrit(state.currentStats) - 1) {
                    const targetSpell = paladinSpells["Light's Hammer"];
                    targetSpell[0].cooldownData.activeCooldown -= 2;
                }
            }
        })
    }

    if (settings['T30_4']) {
        paladinSpells["Light's Hammer"][1].tickRate /= 2;
        paladinSpells["Light's Hammer"].push({
            name: "LH HoPo Gen",
            buffDuration: 12,
            type: "buff",
            buffType: 'function',
            stacks: false,
            tickRate: 4,
            hastedDuration: false,
            function: function (state, buff) {
                state.holyPower = Math.min(state.holyPower + 1, 5);
            }
        })
    }*/

    if (getTalentPoints(state, "inflorescenceOfTheSunwell")) {
        PALADINCONSTANTS.infusion.flashOfLightReduction = 0.7 + 0.3;
        PALADINCONSTANTS.infusion.holyLightHoPo = 2 + 0.34;
        PALADINCONSTANTS.infusion.judgmentBonus = 2 * 1.5;
    }
    else {
        PALADINCONSTANTS.infusion = {holyLightHoPo: 2, flashOfLightReduction: 0.7, judgmentBonus: 2}
    }


    // Setup mana costs & cooldowns.
    for (const [key, value] of Object.entries(paladinSpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];


        if (spellInfo.targets && 'maxAllyTargets' in settings) Math.max(spellInfo.targets, settings.maxAllyTargets);
        if (!spellInfo.targets) spellInfo.targets = 1;
        if ('cooldownData' in spellInfo && spellInfo.cooldownData.cooldown) spellInfo.cooldownData.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * PALADINCONSTANTS.baseMana / 100;

        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
    }

    // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.



    // ==== Tier Sets ====

    return paladinSpells;
}

const applyTalents = (state, spellDB, stats) => {
    const talents = Object.keys(state.talents);
    Object.keys(state.talents).forEach(talentName => {
        const talent = state.talents[talentName];
        if (talent.points > 0) {
            talent.runFunc(state, spellDB, talent.points, stats)
        }
    });

}



/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    let mult = PALADINCONSTANTS.auraDamageBuff;

    // Avenging Crusader
    mult *= (buffs.filter(function (buff) {return buff.name === "Avenging Wrath"}).length > 0 ? 1.15 : 1); 
    mult *= ((["Crusader Strike", "Judgment"].includes(spellName) && buffs.filter(function (buff) {return buff.name === "Avenging Crusader"}).length > 0) ? 1.3 : 1); 
    
    // Reclamation
    mult *= (((["Crusader Strike"].includes(spellName) || spellName.includes("Holy Shock")) && state.talents.reclamation.points == 1) ? 1 + (1 - PALADINCONSTANTS.reclamation.avgDamHealth) * PALADINCONSTANTS.reclamation.throughputIncrease : 1);
    
    // Blessing of Dawn
    if ((spellName === "Shield of the Righteous") && checkBuffActive(state.activeBuffs, "Blessing of Dawn")) {
        mult *= (1 + getBuffStacks(state.activeBuffs, "Blessing of Dawn") * (0.2 + (getTalentPoints(state, "sealOfOrder") || getTalentPoints(state, "fadingLight") ? 0.1 : 0)));
        removeBuff(state.activeBuffs, "Blessing of Dawn");
        const buff = {
            name: "Dusk",
            type: "buff",
            stacks: false,
            buffDuration: 10,
            buffType: 'special'
        };
        addBuff(state, buff, "Dusk");
    }


    return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = PALADINCONSTANTS.auraHealingBuff;

    // Wings
    mult *= (state.activeBuffs.filter(function (buff) {return buff.name === "Avenging Wrath"}).length > 0 ? 1.15 : 1); // Avenging Wrath

    // Divine Purpose
    if ((spellName === "Light of Dawn" || spellName === "Word of Glory") && checkBuffActive(state.activeBuffs, "Divine Purpose")) {
        mult *= 1.15;
    }

    // Infusion of Light
    if (spellName === "Flash of Light" && checkBuffActive(state.activeBuffs, "Infusion of Light") && getTalentPoints(state, "divineRevelations") > 0) mult *= getTalentData(state, "divineRevelations", "flashBonus");
    else if (spellName === "Judgment" && checkBuffActive(state.activeBuffs, "Infusion of Light")) mult *= PALADINCONSTANTS.infusion.judgmentBonus;

    else if ((spellName === "Light of Dawn" || spellName === "Word of Glory") && checkBuffActive(state.activeBuffs, "Blessing of Dawn")) {
        mult *= (1 + getBuffStacks(state.activeBuffs, "Blessing of Dawn") * (0.2 + (getTalentPoints(state, "sealOfOrder") || getTalentPoints(state, "fadingLight") ? 0.1 : 0)));
        removeBuff(state.activeBuffs, "Blessing of Dawn");
        const buff = {
            name: "Dusk",
            type: "buff",
            stacks: false,
            buffDuration: 10,
            buffType: 'special'
        };
        addBuff(state, buff, "Dusk");
    }

    if (["Flash of Light", "Holy Light"].includes(spellName) || spellName.includes("Holy Shock")) {
        if (checkBuffActive(state.activeBuffs, "Tyr's Deliverance")) {
            mult *= (0.15 * PALADINCONSTANTS.tyrsHitRate + 1);
        }
        if (checkBuffActive(state.activeBuffs, "Divine Favor")) {
            mult *= 1.4;
            state.activeBuffs = removeBuff(state.activeBuffs, "Divine Favor");
        }
    }


    if ((["Crusader Strike"].includes(spellName) || spellName.includes("Holy Shock")) && state.talents.reclamation.points == 1) {
        mult *= 1 + (1 - PALADINCONSTANTS.reclamation.avgHealHealth) * PALADINCONSTANTS.reclamation.throughputIncrease;
    }

    if (checkBuffActive(state.activeBuffs, "Blessing of Spring")) {
        mult *= 1.15;
    }

    return mult;
}




export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, PALADINCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    // Special cases
    if ('specialMult' in spell) healingVal *= spell.specialMult;
    //if (spellName === "Merciful Auras (Passive)" && checkBuffActive(state.activeBuffs, "Aura Mastery")) healingVal = 0;

    // Beacon
    let beaconHealing = 0;
    let beaconMult = 1;
    if (PALADINCONSTANTS.beaconAoEList.includes(spellName)) beaconMult = 0.5;
    else if (PALADINCONSTANTS.beaconExclusionList.includes(spellName)) beaconMult = 0;


    // Beacons
    if (state.beacon === "Beacon of Light") beaconHealing = healingVal * 0.25 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
    else if (state.beacon === "Beacon of Faith") beaconHealing = healingVal * 0.175 * 2 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult;
    else if (state.beacon === "Beacon of Virtue") beaconHealing = (checkBuffActive(state.activeBuffs, "Beacon of Virtue") ? healingVal * 0.25 * 5 * (1 - PALADINCONSTANTS.beaconOverhealing) * beaconMult : 0);
    
    // Compile healing and add report if necessary.
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
    if (targetMult > 1 && !(spellName.includes("HoT"))) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else if (!(spellName.includes("HoT"))) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)
    if (compile) state.healingDone[(state.beacon == "Beacon of Faith" ? "Beacon of Light + Faith" : state.beacon)] = (state.healingDone[(state.beacon == "Beacon of Faith" ? "Beacon of Light + Faith" : state.beacon)] || 0) + beaconHealing;

    // Barrier of Faith
    if ((["Flash of Light", "Holy Light", "Holy Shock"].includes(spellName)) && checkBuffActive(state.activeBuffs, "Barrier of Faith")) {
        const barrierHealing = healingVal * 0.25 * (1 - PALADINCONSTANTS.barrierOverhealing);
        if (compile) state.healingDone["Barrier of Faith (Charge)"] = (state.healingDone["Barrier of Faith (Charge)"] || 0) + barrierHealing;
        addReport(state, `Barrier of Faith stored ${Math.round(barrierHealing)} (Exp OH: ${PALADINCONSTANTS.barrierOverhealing * 100}%)`)
    }


    // Fading Light
    if (PALADINCONSTANTS.duskSpellList.includes(spellName) && state.talents.fadingLight.points == 1 && checkBuffActive(state.activeBuffs, "Dusk")) {
        if (compile) state.healingDone["Fading Light"] = (state.healingDone["Fading Light"] || 0) + (healingVal * PALADINCONSTANTS.fadingLight.effect * PALADINCONSTANTS.fadingLight.efficiency);
    }

    return healingVal;
}

export const runDamage = (state, spell, spellName, atonementApp, compile = true) => {

    //const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, 0, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, PALADINCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage`)

    // Avenging Crusader
    if (checkBuffActive(state.activeBuffs, "Avenging Crusader") && ["Judgment", "Crusader Strike"].includes(spellName)) {
        const acSpell = {type: "heal", coeff: 0, flatHeal: damageVal * 3.6, secondaries: ['mastery'], expectedOverheal: 0.4, targets: 1} // Healing is split between 5 targets, so count as 1
        runHeal(state, acSpell, "Avenging Crusader")
    }
    if (spell.convertToHealing) {
        const healSpell = {type: "heal", coeff: 0, flatHeal: damageVal * spell.convertToHealing, secondaries: ['mastery'], expectedOverheal: 0.25, targets: 1}
        runHeal(state, healSpell, spellName + " (heal)");
    }

    // Fading Light
    if (PALADINCONSTANTS.duskSpellList.includes(spellName) && state.talents.fadingLight.points == 1) {
        if (compile) state.healingDone["Fading Light"] = (state.healingDone["Fading Light"] || 0) + (damageVal * PALADINCONSTANTS.fadingLight.effect * PALADINCONSTANTS.fadingLight.efficiency);
    }

    return damageVal;
}


/**
 * Run a full cast sequence. This is where most of the work happens. It runs through a short ramp cycle in order to compare the impact of different trinkets, soulbinds, stat loadouts,
 * talent configurations and more. Any effects missing can be easily included where necessary or desired.
 * @param {} sequence A sequence of spells representing a ramp. Note that in two ramp cycles like alternating Fiend / Boon this function will cover one of the two (and can be run a second
 * time for the other).
 * @param {*} stats A players base stats that are found on their gear. This doesn't include any effects which we'll apply in this function.
 * @param {*} settings Any special settings. We can include soulbinds, legendaries and more here. Trinkets should be included in the cast sequence itself and conduits are handled below.
 * @param {object} conduits Any conduits we want to include. The conduits object is made up of {ConduitName: ConduitLevel} pairs where the conduit level is an item level rather than a rank.
 * @returns The expected healing of the full ramp.
 */
export const runCastSequence = (sequence, stats, settings = {}, incTalents = {}, apl = []) => {
    //console.log("Running cast sequence");

    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        //talents[key] = value.points;
        talents[key] = value;
    }
    // Add base Mastery bonus.
    // We'd like to convert this to a % buff at some point since it will be incorrectly reduced by DR as-is.

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, casts: {}, damageDone: {}, manaSpent: 0, settings: settings, 
                    talents: talents, reporting: true, holyPower: 5, beacon: "Beacon of Faith", spec: "Holy Paladin", heroTree: "heraldOfTheSun"};

    let currentStats = JSON.parse(JSON.stringify(stats));

    const sequenceLength = 240; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = apl.length > 0 ? "Auto" : "Manual"; // Auto / Manual.

    let castState = {
        nextSpell: 0, // The time when the next spell cast can begin.
        spellFinish: 0, // The time when the cast will finish. HoTs / DoTs can continue while this charges.
        queuedSpell: "",
    }
    const startTime = performance.now();
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.

    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    const paladinSpells = applyLoadoutEffects(deepCopyFunction(PALADINSPELLDB), settings, talents, state, stats);
    applyTalents(state, paladinSpells, stats)

    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

    // Extra Settings
    if (settings.masteryEfficiency) PALADINCONSTANTS.masteryEfficiency = settings.masteryEfficiency;
    if (settings.preBuffs) {
        // Apply buffs before combat starts. Very useful for comparing individual spells with different buffs active.
        settings.preBuffs.forEach(buffName => {
            if (buffName === "Infusion of Light") addBuff(state, paladinSpells["Holy Shock"][1], "Infusion of Light");
            else if (buffName === "Barrier of Faith") addBuff(state, paladinSpells["Barrier of Faith"][1], "Barrier of Faith");
            else if (buffName === "Glimmer of Light 8") {
                for (let i = 0; i < 8; i++) addBuff(state, paladinSpells["Holy Shock"][2], "Glimmer of Light");
            }
            else if (buffName === "Tyr's Deliverance") {
                addBuff(state, paladinSpells["Tyr's Deliverance"][1], "Tyr's Deliverance");
                paladinSpells["Tyr's Deliverance"][1].coeff = 0; // Disable HoT for the purpose of tracking the healing increase only.
            }
            else if (buffName === "Blessing of Dawn") {
                const dawnStacker = {
                    name: "Blessing of Dawn",
                    canStack: true,
                    type: "buff",
                    buffType: "special",
                    buffDuration: 999, // Hidden buff in game.
                    maxStacks: 3,
        
                }
                addBuff(state, dawnStacker, "Blessing of Dawn");
            }
        })
    }
    if (settings.includeOverheal === "No") PALADINCONSTANTS.beaconOverhealing = 0;

    //
    const seq = [...sequence];

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        runBuffs(state, stats, paladinSpells, runHeal, runDamage);

        if (state.t > castState.nextSpell) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list
            queueSpell(castState, seq, state, paladinSpells, seqType, apl)


        }
        if (castState.queuedSpell !== "" && state.t >= castState.spellFinish) {
            // We have a queued spell, check if it's finished.
            // Instant spells should proc this immediately.


            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = castState.queuedSpell;
            const fullSpell = paladinSpells[castState.queuedSpell];
            addReport(state, `Casting ${spellName}`);
            spendSpellCost(fullSpell, state, spellName);


            // Rising Sunlight - If has buff, cast Holy Shock three times instead of twice.
            if (checkBuffActive(state.activeBuffs, "Rising Sunlight") && spellName === "Holy Shock") {
                addReport(state, "Casting Multiple Holy Shocks due to Rising Sunlight")
                runSpell(paladinSpells["Holy Shock"], state, "Holy Shock (Rising Sunlight)", paladinSpells, null, runHeal, null, {bonus: true})
                runSpell(paladinSpells["Holy Shock"], state, "Holy Shock (Rising Sunlight)", paladinSpells, null, runHeal, null, {bonus: true})

                //runSpell(fullSpell, state, "Holy Shock (Rising Sunlight)", paladinSpells, true);
                //runSpell(fullSpell, state, "Holy Shock (Rising Sunlight)", paladinSpells, true);
                removeBuffStack(state.activeBuffs, "Rising Sunlight");
            }

            runSpell(fullSpell, state, spellName, paladinSpells, null, runHeal, runDamage);
            state.casts[spellName] = (state.casts[spellName] || 0) + 1;


            // Post Spell
            if (["Flash of Light", "Holy Light", "Judgment"].includes(spellName) && checkBuffActive(state.activeBuffs, "Infusion of Light")) {
                if (spellName === "Holy Light") {
                    if (getTalentPoints(state, "divineRevelations")) state.manaSpent -= getTalentData(state, "divineRevelations", "manaReturn");
                    state.holyPower = Math.min(state.holyPower + PALADINCONSTANTS.infusion.holyLightHoPo, 5);
                }
        
                if (spellName === "Judgment") {
                    if (getTalentPoints(state, "divineRevelations")) state.manaSpent -= getTalentData(state, "divineRevelations", "manaReturn");
                }
        
                // Apply Imbued Infusions
                if (getTalentPoints(state, "imbuedInfusions")) {
                    const targetSpell = paladinSpells["Holy Shock"];
                    targetSpell[0].cooldownData.activeCooldown -= 1;
                }
        
                // Remove a stack of IoL.
                state.activeBuffs = removeBuffStack(state.activeBuffs, "Infusion of Light");
            }
            else if (spellName === "Hammer of Wrath") state.activeBuffs = removeBuffStack(state.activeBuffs, "Veneration");
            if (spellName === "Judgment" && checkBuffActive(state.activeBuffs, "Awakening - Final")) {
                // Add wings
                const buffExists = state.activeBuffs.filter(function (buff) {return buff.name === "Avenging Wrath"}).length;
                if (buffExists) {
                    const buff = state.activeBuffs.filter(function (buff) {return buff.name === "Avenging Wrath"})[0];
                    buff.expiration = buff.expiration + 12;
                    addReport(state, "Awakening: Extending Wings Buff");
                }
                else {
                    const wings = {name: "Avenging Wrath", expiration: (state.t + 12), buffType: "statsMult", stat: "crit", value: (state.talents.might.points * 15 * 170)};
                    state.activeBuffs.push(wings);
                    addReport(state, "Awakening Proc! Wings for 12s!");
                }
        
                // Remove 
                state.activeBuffs = removeBuff(state.activeBuffs, "Awakening - Final");
            }
            else if ((spellName === "Light of Dawn" || spellName === "Word of Glory") && checkBuffActive(state.activeBuffs, "Divine Purpose")) {
                // Refund HoPo
                state.holyPower += 3;
                state.manaSpent -= paladinSpells[spellName][0].cost;
                state.activeBuffs = removeBuff(state.activeBuffs, "Divine Purpose");
        
            }

            castState.queuedSpell = "";
            castState.spellFinish = 0;
        }

        if (seq.length === 0 && castState.queuedSpell === "") {
            // We have no spells queued, no DoTs / HoTs and no spells to queue. We're done.
            //state.t = 999;
        }

        // Autumn, only checks every second and reduces to save processing
        
        const checkInterval = 1; /*
        if (t % checkInterval === 0) {
            if (getTalentPoints(state, "blessingOfSeasons")) {
                if (checkBuffActive(state.activeBuffs, "Blessing of Autumn")) // This takes a bit of processing time :(
                {
                    // Smaller list of spells, to reduce processing.. experimented with this but it wasn't any quicker
                    /*const spellList = ["Holy Shock"];

                    spellList.forEach(checkCooldownSpells => {
                    if (paladinSpells[checkCooldownSpells][0].cooldownData.activeCooldown - (0.3 * checkInterval) > t) {
                        paladinSpells[checkCooldownSpells][0].cooldownData.activeCooldown -= 0.3 * checkInterval;
                    }})

                    paladinSpells.foreach(spellCD => {
                        if (spellCD[0].cooldowndata.cooldown) {
                            if (spellCD[0].cooldownData.activeCooldown > t) {
                                if (spellCD[0].cooldownData.activeCooldown - (0.3 * checkInterval) > t){
                                    spellCD[0].cooldownData.activeCooldown -= 0.3 * checkInterval;
                                }
                                else {
                                    spellCD[0].cooldownData.activeCooldown = t;
                                }
                            }                    
                        }
                    })
                }
            }
        } */
    }



    runRampTidyUp(state, settings, sequenceLength, startTime)
    return state;

}


