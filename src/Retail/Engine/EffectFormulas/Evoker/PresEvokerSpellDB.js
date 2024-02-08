
import { runHeal, runDamage } from "./PresEvokerRamps";
import { addReport, getCrit, getHaste, runSpell } from "../Generic/RampGeneric/RampBase";


// This is the Evoker spell database. 
// It contains information on every spell used in a sequence. Each spell is an array which means you can include multiple effects to code spells like Echo that are both a heal,
// and a buff. 
// Any errors can be reported on the QE github, or to me directly on discord @Voulk1858.
// The spell database can be copied locally to a function and then individual spells edited for talents, tier sets and so on.

// - Available Fields -
// type: damage (effect deals damage), heal (effect heals), buff (effect adds a buff), function (spell runs a custom function).
// cost: mana cost. This is a percentage of base mana, not the raw mana cost. The true mana spend should be cost x baseMana / 100.
// coeff: the spells intellect scaling. This is a combination of base coefficient, any possible spell ranks, and any relevant auras that might impact the spell.
// cooldown: a spells cooldown. 
// expectedOverheal: A healing spells typical overhealing percentage. We'll pull this from logs when we can, but they're estimates for now. Can be turned off completely.
// secondaries: The secondary stats a spell scales with. Note that HoTs that scale with haste should use the hasteScaling flag instead of including it as a secondary.
// targets: The number of targets a spell hits. All effects will be applied to every target. If missing then defaults to 1.
// tags: optional tags for specific functionality. Also includes scaling modifiers like spells that have square root scaling with number of targets.

// Buff spells also expect the following:
// buffDuration: How long the buff lasts
// buffType: 'stats' / 'statmult' / 'special' / 'function'. 
// stat: stat buff types should include which stat it gives you. Bell for example would add 'mastery'.
// value: stat buff types should also have a value showing how much stat it gives you. When this is variable (like a trinket) then it can be fed into the ramp functions directly and
// Any trinket values displayed in this DB are placeholders only and are replaced when simulated.

// For spells with aura effects, include it in the coefficient itself. Aura effects that buff the entire spec are handled in EVOKERCONST.
export const EVOKERSPELLDB = {
    // Essence recharge rate: 5s / haste.
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],

    // Living Flame
    "Living Flame": [{ 
        // Can be used for DPS or Healing. This is the healing version but both can be included either together or separately (the latter might be more efficient).
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "heal"},
        name: "Living Flame",
        type: "heal",
        school: 'red',
        castTime: 2,
        cost: 2.0,
        coeff: 1.98,
        expectedOverheal: 0.22,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Living Flame O": [{ 
        // This is the Offensive, DPS version of Living Flame.
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "damage"},
        name: "Living Flame O",
        type: "damage",
        school: "red",
        castTime: 2,
        cost: 0,//2.0,
        coeff: 2.76,
        secondaries: ['crit', 'vers']
    }],
    "Verdant Embrace": [{ 
        // Single target heal that also moves you to the targets location.
        spellData: {id: 360995, icon: "ability_evoker_rescue", cat: "heal"},
        type: "heal",
        school: "green",
        castTime: 0,
        onGCD: true,
        cost: 3.0,
        coeff: 4.18,
        cooldownData: {cooldown: 18, hasted: true}, 
        expectedOverheal: 0.5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Spiritbloom": [{  
        // Spiritbloom is a charge ability that adds a target per charge tier.
        // Spiritbloom is smart healing.
        spellData: {id: 382731, icon: "ability_evoker_spiritbloom2", cat: "heal"},
        type: "heal",
        school: "green",
        castTime: [1, 1.75, 2.5, 3.25],
        empowered: true,
        cost: 3.8,
        cooldownData: {cooldown: 30, hasted: false}, 
        coeff: 5.085,
        targets: [1, 2, 3, 4], // 
        expectedOverheal: 0.5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Dream Breath": [{  
        // Dream Breath heals for more per charge tier and also has a lower cooldown.
        spellData: {id: 355936, icon: "ability_evoker_dreambreath", cat: "heal"},
        type: "heal",
        school: "green",
        castTime: [1, 1.75, 2.5, 3.25],
        empowered: true,
        cost: 4.5,
        coeff: 0.768,
        cooldownData: {cooldown: 30, hasted: false}, 
        expectedOverheal: 0.3, // 0.25
        targets: 5, // 
        secondaries: ['crit', 'vers', 'mastery']
    },
    {  
        // This is the second portion of Dream Breath. It's effectively a roll up of the HoT portion depending on empower rank.
        // This makes it a bit unique since it's a direct heal that scales with Haste.
        type: "heal",
        coeff: [0, 0.768, 1.536, 2.304],
        expectedOverheal: 0.3, // 0.25
        targets: 5, // 
        secondaries: ['haste', 'crit', 'vers', 'mastery']
    },
    {  
        // Dream Breath heals for more per charge tier and also has a lower cooldown.
        name: "Dream Breath",
        type: "buff",
        buffType: "heal",
        buffDuration: [16, 12, 8, 4],
        tickData: {tickRate: 2, canPartialTick: true},
        tickRate: 2,
        coeff: 0.384, 
        targets: 5, 
        expectedOverheal: 0.6,
        secondaries: ['crit', 'vers', 'mastery'] // Note that Haste for HoTs is included via reduced tick rate so doesn't need to be explicitly included.
    }],
    "Emerald Blossom": [{
        // Instant, 3 Essence cost, heals 3 targets after a 2s delay.
        // This hooks into a lot of different talents.
        spellData: {id: 355913, icon: "ability_evoker_emeraldblossom", cat: "heal"},
        type: "heal",
        castTime: 0,
        school: 'green',
        onGCD: true,
        delay: 1.5, // The number of seconds before the spell heals.
        targets: 3,
        essence: 3,
        cost: 4.8,
        coeff: 1.5,
        expectedOverheal: 0.4,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Echo": [{
        // Cast time, 2 Essence Cost, Single target, 
        // The next ST healing spell you cast is duplicated on the Echo target for 70% of it's healing value.
        // Does spread Reversion. 
        spellData: {id: 364343, icon: "ability_evoker_echo", cat: "heal"},
        // To confirm:
        // - Stasis Interaction
        type: "heal",
        castTime: 0,
        school: "bronze",
        targets: 1,
        essence: 2,
        cost: 1.7,
        coeff: 1.2, // Aura
        expectedOverheal: 0.4,
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    },
    {
        name: "Echo",
        type: "buff",
        value: 0.7,
        stacks: 0, // Note that we can have Echo out on multiple people at once, just not two on one person.
        canStack: false,
        castTime: 0,
        buffDuration: 999,
        cooldown: 0,
        buffType: 'special',
    }],
    "Reversion": [{
        // Big heal over time effect, extended by crits. 12s base duration, 9s cooldown, crits extend by one tick.
        // Talent to increase it's base duration by 6s.
        spellData: {id: 366155, icon: "ability_evoker_reversion", cat: "heal"},
        name: "Reversion (HoT)",
        type: "buff",
        buffType: "function",
        school: "bronze",
        tickData: {tickRate: 2, canPartialTick: true},
        castTime: 0,
        coeff: 0.342,
        cost: 2.0,
        cooldownData: {cooldown: 8, hasted: true}, 
        buffDuration: 12,
        /*onApplication: function (state, spell, buff) {
            const newDuration = (state.t + spell.castTime + (spell.buffDuration / (1 - (getCrit(state.currentStats)-1))));
            buff.expiration = newDuration;

            return buff;
        },*/
        runFunc: function (state, spell, buff) {
            const hotHeal = { type: "heal", coeff: spell.coeff, expectedOverheal: 0.45, secondaries: ['crit', 'vers', 'mastery']}

            runHeal(state, hotHeal, spell.name)
            // Roll dice and extend. If RNG is turned off then we can instead calculate expected duration on buff application instead.
            // This can't take into account on-use crit increases though whereas rolling it each time will (but requires more iterations for a proper valuation).
            // Current model uses the deterministic method. TODO. 
            const roll = Math.random();
            const extension = roll <= (getCrit(state.currentStats) - 1)

            if (extension) {
                if ('extensionCount' in buff) {
                    if (buff.extensionCount < 6) {
                        buff.extensionCount += 1;
                        buff.expiration += (2 / getHaste(state.currentStats));
                    
                    }
                    else {
                        //console.log("Tried to extend but already at cap");
                    }
                }
                else {
                    buff.extensionCount = 1;

                    buff.expiration += (2 / getHaste(state.currentStats));

                }
            }
        }

    }],
    "Temporal Anomaly": [
    { // 
        spellData: {id: 373861, icon: "ability_evoker_temporalanomaly", cat: "heal"},
        name: "Temporal Anomaly",
        type: "heal",
        school: "bronze",
        castTime: 1.5,
        coeff: 1.4,
        cost: 7.5,
        targets: 15,
        expectedOverheal: 0.05,
        cooldownData: {cooldown: 15, hasted: true}, 
        tags: ['sqrt'],
        sqrtMin: 5,
        secondaries: ['vers', 'mastery']
    },
    { 
        type: "function",
        runFunc: function (state, spell) {
            if (state.talents.resonatingSphere) {
                const echoBuffs = 5;
                const buff = {name: "Echo", expiration: state.t  + 20, buffType: "special", 
                    value: 0.3 * (1 + state.talents.timeLord * 0.25), stacks: 1, canStack: false, maxStacks: 1};
                

                for (let i = 0; i < echoBuffs; i++) { state.activeBuffs.push(buff); }
                
                addReport(state, `Adding Buff: Echo (Temporal Anomaly x${echoBuffs})`)
            }
        }
    
    }],
    "Blessing of the Bronze": [{
        // Blessing of the Bronze is a short CD buff spell that buffs the raid. It can also be used as a generic Bronze spell for Temporal Compression.
        // While it's included for completeness, you really shouldn't use this. 
        spellData: {id: 364342, icon: "ability_evoker_blessingofthebronze", cat: "cooldown"},
        type: "rest",
        school: "bronze",
        castTime: 1.5,
        cooldownData: {cooldown: 15, hasted: false}, 
        cost: 4.0,
    }],
    "Dream Flight": [{
        // Large upfront heal and leaves a 15s HoT on anyone it hits.
        spellData: {id: 359816, icon: "ability_evoker_dreamflight", cat: "cooldown"},
        type: "heal",
        school: "green",
        castTime: 3, // TODO: This one has variance based on how far we travel. 
        cooldownData: {cooldown: 120, hasted: false}, 
        cost: 4.0,
        coeff: 4,
        targets: 15, // Can hit everyone. No sqrt scaling.
        expectedOverheal: 0.4,
        secondaries: ['crit', 'vers', 'mastery']
    },
    {
        type: "buff",
        buffName: "Dream Flight",
        buffType: "heal",
        tickRate: 3,
        tickData: {tickRate: 3, canPartialTick: true},
        targets: 10,
        coeff: 0.5,
        buffDuration: 15,
        expectedOverheal: 0.5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Azure Strike": [{
        // Hits two targets. Instant.
        spellData: {id: 362969, icon: "ability_evoker_azurestrike", cat: "damage"},
        type: "damage",
        school: "blue",
        castTime: 0,
        onGCD: true,
        cost: 0.9,
        coeff: 0.99,
        targets: 2, // 
        secondaries: ['crit', 'vers']
    }],
    "Fire Breath": [{
        // Hits all targets in front of you. Reduced after 5 targets.
        spellData: {id: 357208, icon: "ability_evoker_firebreath", cat: "damage"},
        type: "damage",
        empowered: true,
        school: "red",
        castTime: [1, 1.75, 2.5, 3.25],
        cooldownData: {cooldown: 30, hasted: false}, 
        cost: 2.6,
        coeff: 1.45,
        targets: 5, // Note that multi-target DPS abilities might be capped by enemyTargets in EVOKERCONST.
        secondaries: ['crit', 'vers']
    },
    {
        name: "Fire Breath (DoT)",
        type: "buff",
        buffType: "damage",
        tickRate: 2,
        tickData: {tickRate: 2, canPartialTick: true},
        targets: 5,
        coeff: 0.35,
        buffDuration: [4, 8, 12, 16],
        expectedOverheal: 0.45,
        secondaries: ['crit', 'vers']
    }],

    // Disintegrate (Essence damage ability)
    "Disintegrate": [{
        spellData: {id: 356995, icon: "ability_evoker_disintegrate", cat: "damage"},
        type: "damage",
        school: "blue",
        essence: 3,
        castTime: 3.0,
        coeff: 0.76,
        targets: 1,
        secondaries: ['crit', 'haste', 'vers'],
    },
    {
        name: "Disintegrate (DoT)",
        type: "buff",
        buffType: "damage",
        tickRate: 1,
        tickData: {tickRate: 1, canPartialTick: false},
        buffDuration: 3,
        coeff: 0.76,
        secondaries: ['crit', 'haste', 'vers'],
    }],
    // Disintegrate (Essence damage ability)
    "Emerald Communion": [{
        spellData: {id: 370984, icon: "ability_evoker_green_01", cat: "cooldown"},
        type: "heal",
        school: "blue",
        castTime: 5,
        channel: true,
        coeff: 0,
        flatHeal: 0,
        targets: 1,
        expectedOverheal: 0.4,
        cooldownData: {cooldown: 180, hasted: false}, 
        secondaries: [],
    },
    {
        name: "Emerald Communion",
        type: "buff",
        buffType: "heal",
        tickRate: 1,
        tickData: {tickRate: 1, canPartialTick: false},
        buffDuration: 5,
        coeff: 0,
        flatHeal: 0,
        hastedDuration: true,
        canPartialTick: false,
        expectedOverheal: 0.4,
        secondaries: [],
    }],
    "Stasis": [
    {
        spellData: {id: 370984, icon: "ability_evoker_green_01", cat: "cooldown"},
        name: "Stasis",
        castTime: 0,
        cost: 0,
        onGCD: false,
        canStack: false,
        type: "buff",
        buffType: "special",
        stacks: 0,
        canStack: false,
        cooldownData: {cooldown: 90, hasted: false}, 
        buffDuration: 90, //30
        special: {
            storedSpells: [],
        }
    }],
    "StasisRelease": [
        {
            spellData: {id: 370984, icon: "ability_evoker_green_01", cat: "cooldown"},
            name: "StasisRelease",
            castTime: 0,
            cost: 0,
            onGCD: false,
            canStack: false,
            type: "function",
            runFunc: function (state, spell, evokerSpells, triggerSpecial, runHeal, runDamage) {
                // Get stored spells.
                const storedSpells = state.activeBuffs.filter(buff => buff.name === "Stasis")[0].special.storedSpells;
                const flag = {ignoreCD: true};
                // Cast stored spells.
                storedSpells.forEach(spellName => {
                    const fullSpell = evokerSpells[spellName];
                    runSpell(fullSpell, state, spellName, evokerSpells, triggerSpecial, runHeal, runDamage, flag)
                });

                // Remove Stasis.
                state.activeBuffs = state.activeBuffs.filter(buff => buff.name !== "Stasis");
            
            }
        }],
}


export const evokerTalents = {
    // Class Tree
    // Some pure utility based talents might not appear.
    naturalConvergence: {points: 0, maxPoints: 1, icon: "spell_frost_frostblast", id: 369913, select: true, tier: 4}, // Disintegrate channels 20% faster.
    lushGrowth: {points: 2, maxPoints: 2, icon: "inv_staff_2h_bloodelf_c_01", id: 375561, select: true, tier: 4}, // Green spells heal for 5% more (2 points).


    // Spec Tree
    reversion: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 1},
    dreamBreath: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 1},
    echo: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 1},
    temporalCompression: {points: 1, maxPoints: 1, icon: "ability_evoker_rewind2", id: 362877, select: true, tier: 1}, // Bronze spells reduce the cast time of your next finisher by 5%. Stacks to 4. 15s duration.
    essenceBurst: {points: 1, maxPoints: 1, icon: "ability_evoker_essenceburst", id: 359618, select: true, tier: 1}, // Living Flame has a 20% chance to make your next Essence ability free.
    rewind: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 1}, // Raid cooldown.
    spiritbloom: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 1},
    lifeGiversFlame: {points: 0, maxPoints: 2, icon: "item_sparkofragnoros", id: 371441, select: true, tier: 1}, // Fire Breath heals a nearby ally for 40/80% of damage done.
    timeDilation: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 1}, // ST defensive

    // Tier 2
    emeraldCommunion: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 2}, // ST self-heal channel
    spiritualClarity: {points: 1, maxPoints: 1, icon: "ability_evoker_spiritbloom", id: 376150, select: true, tier: 2}, // Spiritbloom CD reduced by 15s. Choice node with Empath.
    empath: {points: 0, maxPoints: 1, icon: "ability_evoker_powernexus2", id: 370840, select: true, tier: 2}, // Spiritbloom increases regen rate by 100% for 10 seconds. Choice node with Spiritual Clarity.
    flutteringSeedlings: {points: 0, maxPoints: 2, icon: "inv_herbalism_70_yserallineseed", id: 359793, select: true, tier: 2}, // Emerald Blossoms sends out 3 flying seedlings when it bursts, each healing for 90% sp.
    goldenHour: {points: 0, maxPoints: 1, icon: "inv_belt_armor_waistoftime_d_01", id: 378196, select: true, tier: 2}, // Reversion instantly heals the target for 15% of the damage they took in the last 5 seconds.
    temporalAnomaly: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 2}, // Ability.
    fieldOfDreams: {points: 0, maxPoints: 1, icon: "inv_misc_herb_chamlotus", id: 370062, select: true, tier: 2}, // Gain a 30% chance for your fluttering seedlings to grow into a new emerald blossom.
    lifeforceMender: {points: 0, maxPoints: 3, icon: "ability_evoker_dragonrage2", id: 376179, select: true, tier: 2}, // Living Flame and Fire Breath deal extra damage & healing equal to 1% of your maximum health (3 points).
    timeLord: {points: 2, maxPoints: 2, icon: "ability_evoker_innatemagic4", id: 372527, select: true, tier: 2}, // Echo replicates an additional 25/50% healing (2 points).
    nozdormusTeachings: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 2}, // Temporal Anomaly shields one additional target.
    resonatingSphere: {points: 1, maxPoints: 1, icon: "ability_evoker_bronze_01", id: 376236, select: true, tier: 2}, // Temporal Anomaly adds an Echo to allies hit.
    lifebind: {points: 1, maxPoints: 1, icon: "ability_evoker_hoverred", id: 373270, select: true, tier: 2}, // Rescue binds you to your ally, causing any healing either partner receives to splash for 40% on the other.
    callOfYsera: {points: 1, maxPoints: 1, icon: "4096390", id: 373835, select: true, tier: 2}, // Rescue increases the effectiveness of your next Dream Breath by 40% or Living Flame by 100%.

    ancientFlame: {points: 1, maxPoints: 1, icon: "ability_evoker_rescue", id: 99998, select: false},
    timeOfNeed: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 3}, // Needs testing.
    sacralEmpowerment: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 3}, // Consuming a full Temporal Compression grants Essence Burst (next essence ability is free). Need to test.
    exhilaratingBurst: {points: 1, maxPoints: 2, icon: "ability_evoker_essenceburst3", id: 377100, select: true, tier: 3}, // Each time you gain Essence Burst gain +25/50% crit damage / healing for 8 seconds.
    fontOfMagic: {points: 0, maxPoints: 1, icon: "ability_evoker_fontofmagic", id: 375783, select: true, tier: 3}, // Your Empower spells go to 4 (longer cast time).
    energyLoop: {points: 0, maxPoints: 1, icon: "inv_elemental_mote_mana", id: 372233, select: true, tier: 3}, // makes Disintegrate deals more damage and grants mana over it's duration.
    renewingBreath: {points: 2, maxPoints: 2, icon: "ability_evoker_dreambreath", id: 371257, select: true, tier: 3}, // Allies healed by dream breath get a HoT for 15/30% of the amount over 8 seconds (2 points).
    gracePeriod: {points: 0, maxPoints: 2, icon: "ability_evoker_reversion_green", id: 376239, select: true, tier: 3}, // Your healing is increased by 5/10% on allies with Reversion. Echo Reversion applies it's own. Stacks multiplicatively.
    timelessMagic: {points: 0, maxPoints: 2, icon: "inv_artifact_xp05", id: 376240, select: true, tier: 3}, // Reversion, Time Dilation, Echo last 15/30% longer.
    dreamFlight: {points: 1, maxPoints: 1, icon: "ability_evoker_dreamflight", id: 359816, select: false, tier: 3}, 
    stasis: {points: 1, maxPoints: 1, icon: "", id: 0, select: false, tier: 3},
    cycleOfLife: {points: 0, maxPoints: 1, icon: "spell_lifegivingseed", id: 371871, select: true, tier: 3}, // Emerald Blossom leaves behind a sprout that absorbs 10% of healing over 15 seconds.

    rescue: {points: 0, maxPoints: 1, icon: "ability_evoker_rescue", id: 360995, select: false},
    //rescue: {points: 0, maxPoints: 1, icon: "", id: 0, select: true},
    innateMagic: {points: 2, maxPoints: 2, icon: "ability_evoker_innatemagic4", id: 375520, select: true, tier: 4}, // Essence regens 5% faster (2 charges).
    enkindled: {points: 0, maxPoints: 2, icon: "ability_evoker_livingflame", id: 375554, select: true, tier: 4}, // Living Flame does +3% damage / healing.
    scarletAdaptation: {points: 0, maxPoints: 1, icon: "inv_bijou_red", id: 372469, select: true, tier: 4}, // Store 20% of healing dealt. Offensive living flame consumes it to increase damage dealt. Cap is 6x SP x Vers.
    cauterizingFlame: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 4}, // Big dispel that also heals.
    tipTheScales: {points: 0, maxPoints: 1, icon: "", id: 0, select: false, tier: 4}, // Your next empowered spell casts instantly. 2 min CD.
    attunedToTheDream: {points: 2, maxPoints: 2, icon: "ability_rogue_imrovedrecuperate", id: 376930, select: true, tier: 4}, // +2% healing (2 points).
    draconicLegacy: {points: 0, maxPoints: 2, icon: "inv_helm_mail_dracthyrquest_b_02", id: 376166, select: true, tier: 4}, // +2% stamina (2 points).
    bountifulBloom: {points: 1, maxPoints: 1, icon: "ability_evoker_emeraldblossom", id: 370886, select: true, tier: 4}, // Emerald Blossom heals +2 targets.
    panacea: {points: 1, maxPoints: 1, icon: "ability_druid_protectionofthegrove", id: 387761, select: true, tier: 4}, // Emerald Blossom heals +2 targets.
    protractedTalons: {points: 0, maxPoints: 1, icon: "ability_evoker_azurestrike", id: 369909, select: true, tier: 4}, // Azure Strike hits an additional target.
};
