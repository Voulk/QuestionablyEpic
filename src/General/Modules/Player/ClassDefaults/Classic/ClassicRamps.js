// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { CLASSICDRUIDSPELLDB } from "./Druid/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB } from "./Paladin/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB } from "./ClassicPriestSpellDB";
import { CLASSICSHAMANSPELLDB } from "./Shaman/ClassicShamanSpellDB";
import { CLASSICMONKSPELLDB } from "./Monk/ClassicMonkSpellDB";
import { runRampTidyUp, getSqrt, addReport,  getHaste, getStatMult, GLOBALCONST, 
            getHealth, getCrit, advanceTime, spendSpellCost, getSpellCastTime, queueSpell, deepCopyFunction, runSpell, applyTalents, getTalentPoints } from "../Generic/RampBase";
import { checkBuffActive, removeBuffStack, getBuffStacks, addBuff, removeBuff, runBuffs } from "../Generic/BuffBase";
import { getSpellRaw, applyRaidBuffs, getMastery, getCurrentStats,  } from "../Generic/ClassicBase"
import { genSpell } from "../Generic/APLBase";
import { applyLoadoutEffects } from "./ClassicUtilities";


const CLASSICCONSTANTS = {
    
    masteryMod: 1.8, 
    masteryEfficiency: 0.82, 
    baseMana: 250000,

    beaconOverhealing: 0.2,

    auraHealingBuff: { // THIS IS FOR MULTIPLICATIVE BONUSES ONLY. The healing increases offered by each spec are additive for some reason.
        "Restoration Druid": 1,
        "Discipline Priest": 1, // Gets 15% intellect instead.
        "Holy Paladin": 1,
        "Holy Priest": 1,
        "Restoration Shaman": 1, // Also gets 0.5s off Healing Wave / Greater Healing Wave
        "Mistweaver Monk": 1, // Soon :)
    },
    auraDamageBuff: 1,
    enemyTargets: 1, 

    druidMastList: ["Healing Touch", "Regrowth", "Swiftmend", "Nourish"],

    manaRegenBuff: {
        name: "ManaGen",
        expiration: 5,
        buffDuration: 5,
        buffType: 'function',
        stacks: false,
        tickData: {tickRate: 5, canPartialTick: false, hasted: false},
        runFunc: function (state, buff) {
            const manaRegen = 500; //0.05 * state.currentStats.intellect * state.currentStats.spirit;
            
        }
    }

}

// Eh don't we have this function somewhere else already?
const getSpellDB = (spec) => {
    if (spec === "Restoration Druid" || spec === "Resto Druid") return CLASSICDRUIDSPELLDB;
    else if (spec === "Holy Paladin") return CLASSICPALADINSPELLDB;
    else if (spec === "Discipline Priest") return CLASSICPRIESTSPELLDB;
    else if (spec === "Holy Priest") return CLASSICPRIESTSPELLDB;
    else if (spec === "Mistweaver Monk") return CLASSICMONKSPELLDB;
    else if (spec === "Restoration Shaman" || spec === "Resto Shaman") return CLASSICSHAMANSPELLDB;
    else return {};
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 */
const getDamMult = (state, buffs, t, spellName, talents) => {
    let mult = CLASSICCONSTANTS.auraDamageBuff * state.genericBonus.damage;


    return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = CLASSICCONSTANTS.auraHealingBuff[state.spec] * state.genericBonus.healing;

    if (checkBuffActive(state.activeBuffs, "Tree of Life")) mult *= 1.15;

    if (state.spec === "Holy Paladin") {
        if (["Light of Dawn", "Word of Glory"].includes(spellName)) mult *= state.holyPower;
    }
    
    return mult;
}


export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;
    let masteryFlag = true;
    
    let healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    let targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    
    // Mastery special checks
    if (state.spec === "Restoration Druid") {
        if (checkBuffActive(state.activeBuffs, "Harmony") || CLASSICCONSTANTS.druidMastList.includes(spellName) || state.settings.alwaysMastery) {
            //masteryFlag = true;
            const additiveScaling = (spell.additiveScaling || 0) + 1;
            healingMult *= (additiveScaling + (currentStats.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling;
        }
        masteryFlag = false;

    }
    else if (state.spec === "Holy Paladin") masteryFlag = false; // We'll handle this separately.

    // Special cases
    if ('specialMult' in spell) healingVal *= spell.specialMult;
    if (spellName.includes("Wild Growth") && checkBuffActive(state.activeBuffs, "Tree of Life")) targetMult += 2;
    const healingVal = getSpellRaw(spell, currentStats, state.spec, 0, masteryFlag) * (1 - spell.expectedOverheal) * healingMult * targetMult;

    // Compile healing and add report if necessary.
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + Math.round(healingVal);
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)

    // Beacon
    if (state.spec === "Holy Paladin") {
        let beaconHealing = 0;
        let beaconMult = 0;
        if (spellName === "Holy Light") beaconMult = 1;
        else if (["Flash of Light", "Divine Light", "Light of Dawn", "Holy Shock", "Word of Glory"].includes(spellName)) beaconMult = 0.5;
        else beaconMult = 0;

        beaconHealing = healingVal * (1 - CLASSICCONSTANTS.beaconOverhealing) * beaconMult;

        state.healingDone["Beacon of Light"] = (state.healingDone["Beacon of Light"] || 0) + beaconHealing;
        if (beaconHealing > 0) addReport(state, `Beacon of Light healed for ${Math.round(beaconHealing)} (Exp OH: ${spell.expectedOverheal * 100}%)`)

        // Illuminated Healing
        if (spell.secondaries.includes("mastery")) {
            const absorbVal = healingVal / (1 - spell.expectedOverheal) * (getMastery(state.currentStats, state.spec) - 1);
            state.healingDone["Illuminated Healing"] = (state.healingDone["Illuminated Healing"] || 0) + absorbVal;
            addReport(state, `Illuminated Healing absorbed ${Math.round(absorbVal)} (Exp OH: 0%)`)
        }
    }
    else if (state.spec === "Discipline Priest") {
        // Mastery procs on Prayer of Healing (direct only) and all crits. It functions off raw healing, not overhealing.
        // TODO: PW:S: only auto pass the absorb.
        const successfulRoll = false; // Math.random() < getCrit(state.currentStats, state.spec);
        if (spellName === "Power Word: Shield" || (spellName === "Prayer of Healing" && spell.type === "heal") || successfulRoll) {
            const masteryVal = healingVal * (getMastery(state.currentStats, state.spec) - 1);
            state.healingDone["Divine Aegis"] = (state.healingDone["Divine Aegis"] || 0) + masteryVal;
            addReport(state, `Divine Aegis for ${Math.round(masteryVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)
        }
        
    }

    

    return healingVal;
}

export const runDamage = (state, spell, spellName, compile = true) => {

    const damMultiplier = getDamMult(state, state.activeBuffs, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, state.spec, 0, false) * damMultiplier;

    if (spell.damageToHeal) state.healingDone['atonement'] = (state.healingDone['atonement'] || 0) + damageVal;

    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage`)
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
    const startTime = performance.now();
    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        //talents[key] = value.points;
        talents[key] = value
    }

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, casts: {}, execTime: 0, manaSpent: 0, settings: settings, 
                    talents: talents, reporting: true, spec: settings.spec.replace(" Classic", ""), manaPool: 100000, 
                    genericBonus: {healing: 1, damage: 1}, gameType: "Classic"};

    let currentStats = {...stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)
    
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    const sequenceLength = ('seqLength' in settings ? settings.seqLength : 120) * (1 + (Math.random() - 0.5) * 0.2); // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = apl.length > 0 ? "Auto" : "Manual"; // Auto / Manual.
    
    let castState = {
        nextSpell: 0, // The time when the next spell cast can begin.
        spellFinish: 0, // The time when the cast will finish. HoTs / DoTs can continue while this charges.
        queuedSpell: "",
    }
    
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.
    const playerSpells = deepCopyFunction(getSpellDB(state.spec));
    applyTalents(state, playerSpells, stats)
    applyLoadoutEffects(playerSpells, settings, state);


    if (state.spec.includes("Holy Priest")) {
        // Convert Mastery
        Object.keys(playerSpells).forEach(spellName => {
            const spell = playerSpells[spellName];
            spell.forEach(spellSlice => {
                console.log(spellSlice);
                if (spellSlice.secondaries && spellSlice.secondaries.includes("hmastery")) spellSlice.secondaries.push("mastery");
            })
            
        })
    }

    const baseStats = applyRaidBuffs(state, JSON.parse(JSON.stringify(stats)));
    
    if (settings.preBuffs) {
        // Apply buffs before combat starts. Very useful for comparing individual spells with different buffs active.
        settings.preBuffs.forEach(buffName => {
            const hasteBuff = { // We add this in profiles themselves so for simulation or spell data we need to do it manually.
                type: "buff",
                buffDuration: 99999,
                buffType: 'statsMult',
                stat: "haste",
                value: 1.05, 
            }
            if (buffName === "Haste Aura") addBuff(state, hasteBuff, buffName)
            else if (buffName === "Tree of Life") addBuff(state, playerSpells["Tree of Life"][0], buffName);
            else if (buffName === "Soul of the Forest") addBuff(state, playerSpells["Soul of the Forest"][0], buffName);
            else if (buffName === "Harmony") addBuff(state, playerSpells["Harmony"], buffName);
            else if (buffName === "Judgements of the Pure") {

                if (getTalentPoints(state.talents, "judgementsOfThePure")) addBuff(state, playerSpells["Judgements of the Pure"][0], buffName);
            } 
            else addBuff(state, null, buffName);
        })
    }

    // Extra Settings
    if (settings.masteryEfficiency) CLASSICCONSTANTS.masteryEfficiency = settings.masteryEfficiency;

    let seq = [...sequence];

    // Note that while we'll run in 10ms batches here, we also have some optimization to remove dead space.
    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // Advanced reporting
        // We store our current HPS, manaSpent and the names of buffs active. 
        if (state.settings.advancedReporting && (Math.floor(state.t * 100) % 100 === 0)) {
            const hps = (Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0) / state.t;
            if ('advancedReport' in state === false) state.advancedReport = [];
            state.advancedReport.push({t: Math.floor(state.t*100)/100, hps: hps, manaSpent: state.manaSpent, buffs: state.activeBuffs.map(obj => obj.name)});
        }

        // ---- Heal over time and Damage over time effects ----
        // When we add buffs, we'll also attach a spell to them. The spell should have coefficient information, secondary scaling and so on. 
        // When it's time for a HoT or DoT to tick (state.t > buff.nextTick) we'll run the attached spell.
        // Note that while we refer to DoTs and HoTs, this can be used to map any spell that's effect happens over a period of time. 
        // This includes stuff like Shadow Fiend which effectively *acts* like a DoT even though it is technically not one.
        // You can also call a function from the buff if you'd like to do something particularly special. You can define the function in the specs SpellDB.
        runBuffs(state, stats, playerSpells, runHeal, runDamage);

        // Check if there is an ongoing cast and if there is, check if it's ended.
        // Check if the next spell is able to be cast, and if so, queue it.
        if ((state.t > castState.nextSpell)) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...baseStats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);
           // console.log(state.currentStats);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list
            queueSpell(castState, seq, state, playerSpells, seqType, apl)

        }
        if (castState.queuedSpell !== "" && state.t >= castState.spellFinish) {
            // We have a queued spell, check if it's finished.
            // Instant spells should proc this immediately.


            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...baseStats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = castState.queuedSpell;
            const fullSpell = playerSpells[castState.queuedSpell];
            state.casts[spellName] = (state.casts[spellName] || 0) + 1;
            addReport(state, `Casting ${spellName}`);
            spendSpellCost(fullSpell, state);
 

            runSpell(fullSpell, state, spellName, playerSpells, null, runHeal, runDamage);

            // Cleanup
            castState.queuedSpell = "";
            castState.spellFinish = 0;

            // Cleanup Holy Power.
            if (fullSpell[0].holyPower > 0) state.holyPower = Math.min(3, state.holyPower + fullSpell[0].holyPower);
            if ('tags' in fullSpell[0] && fullSpell[0].tags.includes("Holy Power Spender")) state.holyPower = 0;
            removeBuff(state.activeBuffs, "Soul of the Forest");

        }

        if (seqType === "Manual" && (!castState.queuedSpell || castState.queuedSpell === "Rest") && seq.length === 0) {
            // We have no spells queued, no DoTs / HoTs and no spells to queue. We're done.
            state.t = 999;
        }

        // Time optimization
        // We'll skip this with advanced reporting on since it'll ruin our polling and time optimizations don't matter for single iterations.
        if (!state.settings.advancedReporting) state.t = advanceTime(state.t, castState.nextSpell, castState.spellFinish, state.activeBuffs);

    }

    runRampTidyUp(state, settings, sequenceLength, startTime)

    return state;

}