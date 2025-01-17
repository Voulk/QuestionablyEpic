import { getHealth, getHaste, getSqrt } from "../Generic/RampGeneric/RampBase";
import { addBuff } from "../Generic/RampGeneric/BuffBase";
import { runHeal } from "./PresEvokerRamps"

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} evokerSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
export const applyLoadoutEffects = (evokerSpells, settings, talents, state, stats, EVOKERCONSTANTS) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    settings['DefaultLoadout'] = true;
    if (settings['DefaultLoadout']) {
        settings.t31_2 = true;
        settings.t31_4 = true;
    }



    // ==== Talents ====
    // Not all talents just make base modifications to spells, but those that do can be handled here.

    // Natural Convergence makes Disintegrate channel 20% faster
    if (talents.naturalConvergence) {
        evokerSpells['Disintegrate'][0].castTime -= (evokerSpells['Disintegrate'][0].castTime * 0.2);
        evokerSpells['Disintegrate'][1].tickRate += (evokerSpells['Disintegrate'][1].tickRate * 0.2);
    }

    // Energy Loop makes Disintegrate deal more damage and grants mana over it's duration.
    if (talents.energyLoop) {
        evokerSpells['Disintegrate'][0].coeff *= 1.2;
        evokerSpells['Disintegrate'][1].coeff *= 1.2;
    }

    // Fire Breath talents
    // Note that Lifegivers Flame should always come last.
    if (talents.blastFurnace) evokerSpells['Fire Breath'][0].coeff *= (1 + talents.blastFurnace * 0.1);

    // Lifegivers Flame
    if (talents.lifeGiversFlame) {
        evokerSpells['Fire Breath'].push({
            spellData: {id: 357208, icon: "ability_evoker_firebreath", cat: "damage"},
            type: "heal",
            school: "red",
            coeff: (evokerSpells['Fire Breath'][0].coeff * talents.lifeGiversFlame * 0.8 * EVOKERCONSTANTS.auraDamageBuff),
            expectedOverheal: 0.15,
            targets: 1,
            secondaries: ['crit', 'vers']
        });

        evokerSpells['Fire Breath'].push({
            type: "buff",
            name: "Fire Breath",
            school: "red",
            buffType: "heal",
            buffDuration: evokerSpells['Fire Breath'][1].buffDuration[EVOKERCONSTANTS.defaultEmpower['Fire Breath']],
            tickRate: evokerSpells['Fire Breath'][1].tickRate,
            tickData: {tickData: evokerSpells['Fire Breath'][1].tickRate, canPartialTick: true},
            coeff: (evokerSpells['Fire Breath'][1].coeff * talents.lifeGiversFlame * 0.4 * EVOKERCONSTANTS.auraDamageBuff),
            expectedOverheal: 0.4,
            targets: 1,
            secondaries: ['crit', 'vers']
        });

    }
    if (talents.lifeforceMender) {
        const bonus = (talents.lifeforceMender * 0.01 * getHealth(stats, talents))

        evokerSpells['Fire Breath'][0].flatDamage = bonus;
        if (evokerSpells.length > 2) evokerSpells['Fire Breath'][2].flatHeal = bonus;
        evokerSpells['Living Flame O'][0].flatDamage = bonus;
        evokerSpells['Living Flame'][0].flatHeal = bonus;
    }


    // Life-force Mender
    //if (talents.lifeforceMender) 

    // Evoker Class Talents
    if (talents.bountifulBloom) evokerSpells['Emerald Blossom'][0].targets += 2;


    if (talents.enkindled) {
        evokerSpells['Living Flame'][0].coeff *= (1 + 0.03 * talents.enkindled);
        evokerSpells['Living Flame O'][0].coeff *= (1 + 0.03 * talents.enkindled);
    }

    // Evoker Spec Talents
    if (talents.renewingBreath) {
        evokerSpells['Dream Breath'][0].coeff *= (1 + 0.15 * talents.renewingBreath);
        evokerSpells['Dream Breath'][1].coeff[EVOKERCONSTANTS.defaultEmpower['Dream Breath']] *= (1 + 0.15 * talents.renewingBreath);
        evokerSpells['Dream Breath'][2].coeff *= (1 + 0.15 * talents.renewingBreath);
    }
    //if (settings.twoPc) evokerSpells['Reversion']

    if (talents.goldenHour) evokerSpells['Reversion'].push({
        type: "heal",
        name: "Golden Hour",
        coeff: 0,
        flatHeal: EVOKERCONSTANTS.goldenHourHealing,
        targets: 1, // Can hit everyone. Likely to be retuned around sqrt scaling.
        expectedOverheal: 0,
        secondaries: []
    })
    /*
    if (talents.renewingBreath) evokerSpells['Dream Breath'].push({
        type: "buff",
        buffType: "heal",
        name: "Renewing Breath",
        tickRate: 2,
        targets: 5,
        coeff: evokerSpells['Dream Breath'][0].coeff[EVOKERCONSTANTS.defaultEmpower] / 4 * (0.15 * talents.renewingBreath) * (1 + 0.05 * talents.lushGrowth),
        hasted: false,
        buffDuration: 8,
        expectedOverheal: 0.45,
        secondaries: ['crit', 'vers', 'mastery']
    }) */
    if (talents.timelessMagic) {
        evokerSpells['Reversion'][0].buffDuration *= (1 + 0.15 * talents.timelessMagic);
        evokerSpells['Reversion'][0].cost *= (1 - 0.15 * talents.timelessMagic);
        evokerSpells['Temporal Anomaly'][0].cost *= (1 - 0.15 * talents.timelessMagic);
        evokerSpells['Echo'][0].cost *= (1 - 0.15 * talents.timelessMagic);
    }
    if (talents.timeLord) {
        // Temporal Anomaly handled in function.
        evokerSpells['Echo'][1].value *= (1 + 0.25 * talents.timeLord);

    }
    if (talents.flutteringSeedlings) evokerSpells['Emerald Blossom'].push({
        // TODO
        name: "Fluttering Seedlings",
        type: "heal",
        school: "green",
        coeff: 0.648,
        targets: 1 * talents.flutteringSeedlings, // 
        expectedOverheal: 0.25,
        secondaries: ['crit', 'vers', 'mastery']
    });
    // Panacea doesn't scale with Lush Growth.
    if (talents.panacea) {
        const panacea = {
                name: "Panacea",
                type: "heal",
                school: "green",
                coeff: 1.25,
                targets: 1,
                expectedOverheal: 0.3,
                secondaries: ['crit', 'vers', 'mastery']
            }
        evokerSpells['Emerald Blossom'].push(panacea);
        evokerSpells['Verdant Embrace'].push(panacea);
    }

    if (talents.fieldOfDreams) evokerSpells['Emerald Blossom'].push({
        type: "castSpell",
        storedSpell: "Emerald Blossom",
        chance: 0.3,
    });
    if (talents.essenceBurst) {
        evokerSpells['Living Flame'].push({...EVOKERCONSTANTS.essenceBurstBuff, chance: 0.2})
        evokerSpells['Living Flame O'].push({...EVOKERCONSTANTS.essenceBurstBuff, chance: 0.2})
        evokerSpells['Reversion'].push({...EVOKERCONSTANTS.essenceBurstBuff, chance: 0.15})
    }


    if (talents.lifebind) {
        evokerSpells['Verdant Embrace'].push({
            name: "Lifebind",
            type: "buff",
            stacks: false,
            canStack: false,
            buffDuration: 5,
            buffType: 'special',
            value: 0.4,
        });
    }
    if (talents.callOfYsera) {
        evokerSpells['Verdant Embrace'].push({
            name: "Call of Ysera",
            type: "buff",
            stacks: false,
            buffDuration: 999,
            buffType: 'spellAmp',
            value: 1.4,
        })
    }
    if (talents.ancientFlame) {
        const ancientFlame = {
            name: "Ancient Flame",
            type: "buff",
            stacks: 0,
            canStack: false,
            buffDuration: 15,
            buffType: 'spellSpeed',
            buffSpell: ["Living Flame", "Living Flame D"],
            unique: true,
            value: 0.4,
        }
        evokerSpells['Verdant Embrace'].push(ancientFlame);
        evokerSpells['Emerald Blossom'].push(ancientFlame);
    }

    if (talents.cycleOfLife) {
        // This can possibly be handled by just multiplying healing during it's duration like with CBT.
        evokerSpells['Emerald Blossom'].push({
            name: "Cycle of Life",
            type: "buff",
            canStack: false,
            buffDuration: 8,
            value: 0,
            buffType: 'special',
            canPartialTick: true,
            runEndFunc: true,
            runFunc: function (state, buff) {
                const heal = {type: "heal",
                    flatHeal: buff.value,
                    coeff: 0,
                    expectedOverheal: 0.22,
                    secondaries: []}
                runHeal(state, heal, "Cycle of Life")
            }
        })
    }

    //applyChronowarden(evokerSpells, settings, talents, state, stats, EVOKERCONSTANTS);
    applyFlameshaper(evokerSpells, settings, talents, state, stats, EVOKERCONSTANTS);
   
    // Setup mana costs & cooldowns.
    for (const [key, value] of Object.entries(evokerSpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];
        
        if ('cooldownData' in spellInfo && spellInfo.cooldownData.cooldown) spellInfo.cooldownData.activeCooldown = 0;

        if (fullSpell[0].empowered) {
            fullSpell[0].castTime = fullSpell[0].castTime[EVOKERCONSTANTS.defaultEmpower[key]]
            fullSpell.forEach(spell => {
                
                const defaultEmpower = EVOKERCONSTANTS.defaultEmpower[key];
                if (spell.targets && typeof spell.targets === "object") spell.targets = spell.targets[defaultEmpower];
                if (spell.coeff && typeof spell.coeff === "object") spell.coeff = spell.coeff[defaultEmpower];
                
                if (spell.buffDuration && typeof spell.buffDuration === "object") spell.buffDuration = spell.buffDuration[defaultEmpower];
                //if (key === "Fire Breath") value[1].buffDuration = value[1].buffDuration[EVOKERCONSTANTS.defaultEmpower];
                //console.log(typeof spell.coeff)
                
            }) 
        }

        if ('school' in spellInfo && spellInfo.school === "bronze" && talents.temporalCompression) {
            evokerSpells[key].push(EVOKERCONSTANTS.temporalCompressionBuff)
        }
        if ('school' in spellInfo && spellInfo.school === "green" && talents.lushGrowth) {
            value.forEach(spellSlice => {
                if ('name' in spellSlice && (spellSlice.name === "Panacea" || spellSlice.name === "Fluttering Seedlings")) return; // Exception case.
                spellSlice.coeff *= (1 + 0.05 * talents.lushGrowth);
                
            });
        }

        if (spellInfo.targets && 'maxAllyTargets' in settings) Math.max(spellInfo.targets, settings.maxAllyTargets);
        if (!spellInfo.targets) spellInfo.targets = 1;
        if ('cooldownData' in spellInfo && spellInfo.cooldownData.cooldown) spellInfo.cooldownData.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * EVOKERCONSTANTS.baseMana / 100;

        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
    }

    // Setup Emerald Communion
    const ecBonus = (0.2 * getHealth(stats, talents)) //* (1 + talents.rushOfVitality * 0.2))

    evokerSpells['Emerald Communion'][0].flatHeal = ecBonus;
    evokerSpells['Emerald Communion'][1].flatHeal = ecBonus;
    
    // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.
    if (settings.t31_2) {
        /*
        const bonus = {
            type: "castSpell",
            storedSpell: "Living Flame",
            powerMod: 0.5,
            targetMod: 3, // This is dynamic from 1-3 based on targets hit. 
            chance: 1,
        }
        const offensiveBonus = {
            type: "castSpell",
            storedSpell: "Living Flame O",
            powerMod: 0.5,
            targetMod: 1,
            chance: 1,
        }

        evokerSpells['Spiritbloom'].push(bonus);
        evokerSpells['Dream Breath'].push(bonus);
        evokerSpells['Fire Breath'].push(offensiveBonus);
        */
    }
    if (settings.t31_4) {
        const echoBuff = {
            name: "Echo",
            type: "buff",
            value: 0.7 * (1 + state.talents.timeLord * 0.25),
            stacks: 0, 
            canStack: false,
            buffDuration: 999,
            buffType: 'special',
            chance: 0.2,
        }

        evokerSpells['Living Flame'].push(echoBuff);
        evokerSpells['Living Flame O'].push(echoBuff);
    }


    // ==== Tier Sets ====
    
    return evokerSpells;
}

// The value of Chronowarden is:
// - Spiritbloom HoT
// - Dream Breath extension
// - Temporal Burst
// - Golden Opportunity (20% increase to Echo effectiveness)
// - Afterimage
export const applyChronowarden = (evokerSpells, settings, talents, state, stats, EVOKERCONSTANTS) => {
    // Chronoflame

    // Temporal Burst

    // Reverberations
    evokerSpells["Spiritbloom"].push({
            name: "Spiritbloom (HoT)",
            type: "buff",
            buffType: "heal",
            buffDuration: 8,
            tickData: {tickRate: 2, canPartialTick: false, hasteScaling: false},
            tickRate: 2,
            coeff: evokerSpells["Spiritbloom"][0].coeff * 0.3 / 4, 
            targets: [1, 2, 3, 4], 
            expectedOverheal: 0.3,
            secondaries: ['crit', 'vers', 'mastery'] // Note that Haste for HoTs is included via reduced tick rate so doesn't need to be explicitly included.
    })


    // Primacy

    //--
    // Careful Contemplation

    // Time Convergence

    // Master of Destiny

    // Golden Opportunity

    // Instability Matrix

    // Afterimage
}

// The value of Flameshaper is:
// - Engulf + Consume Flame (including in Stasis and any DB increases).
// - Expanded Lungs
// - Conduit of Flame (lol)
// - Titanic Precision
export const applyFlameshaper = (evokerSpells, settings, talents, state, stats, EVOKERCONSTANTS) => {

    // Travelling Flame + Consume

    /*
    evokerSpells["Engulf"].push(
        {
            type: "function",
            runFunc: function (state) {
                const temp = state.activeBuffs.filter(buff => buff.name === "Dream Breath");
                if (temp.length > 0) {
                    const expiationDuration = 4;
                    const consumeBuff = 3; // 300%
                    const buff = temp[0]; // TODO: Grab the most powerful Dream Breath instead of the first one found.
 
                    const ticks = Math.min(expiationDuration, (buff.expiration - state.t)) / buff.tickRate * getHaste(state.currentStats); // TODO: Add Haste
                    const attSpell = JSON.parse(JSON.stringify(buff.attSpell));
                    const consumeHeal = { type: "heal", coeff: attSpell.coeff * consumeBuff * ticks * getSqrt(20, 5), expectedOverheal: 0.45, secondaries: ['crit', 'vers', 'mastery']}
                    //attSpell.coeff = attSpell.coeff * consumeBuff * ticks// ;
                    
                    runHeal(state, consumeHeal, "Consume Flame");
 
                    buff.expiration -= expiationDuration + 8; // Travelling Flame adds 8s.

                    // Travelling Flame
                    // Add another full duration Dream Breath HoT
                    addBuff(state, evokerSpells["Dream Breath"][2], "Dream Breath");


                    //if (state.t > buff.expiration) {
                    //    removeBuffStack(state.activeBuffs, "Dream Breath");
                    //} 
                }
            }
        });
    */
    // Expanded Lungs
    // Check if 0 should also be buffed.
    if (true) {
        evokerSpells["Dream Breath"][1].coeff[0] *= 1.3;
        evokerSpells["Dream Breath"][1].coeff[1] *= 1.3;
        evokerSpells["Dream Breath"][1].coeff[2] *= 1.3;
        evokerSpells["Dream Breath"][1].coeff[3] *= 1.3;
        evokerSpells["Dream Breath"][2].coeff *= 1.3;
    }

    // Red Hot
    evokerSpells["Engulf"][0].coeff *= 1.2;
    evokerSpells["Engulf"][0].charges = 2;


    evokerSpells['Engulf'].push({
        name: "Burning Adrenaline",
        type: "buff",
        stacks: 1,
        canStack: true,
        maxStacks: 2,
        buffDuration: 15,
        buffType: 'spellSpeed',
        buffSpell: ["All"],
        unique: true,
        value: 1.3,
    });
}
