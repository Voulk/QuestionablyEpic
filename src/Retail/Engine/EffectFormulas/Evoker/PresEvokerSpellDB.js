
import { runHeal, getHaste, runDamage } from "./PresEvokerRamps";

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
    // Essence recharge rate: 3s?

    // Living Flame
    "Living Flame": [{ 
        // Can be used for DPS or Healing. This is the healing version but both can be included either together or separately (the latter might be more efficient).
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "heal"},
        type: "heal",
        school: 'red',
        castTime: 2,
        cost: 2.0,
        coeff: 2.75,
        expectedOverheal: 0.22,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Living Flame D": [{ 
        // This is the DPS version of Living Flame.
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "damage"},
        type: "damage",
        school: "red",
        castTime: 2,
        cost: 2.0,
        coeff: 1.61,
        secondaries: ['crit', 'vers']
    }],
    "Rescue": [{ 
        // Single target heal that also moves you to the targets location.
        spellData: {id: 360995, icon: "ability_evoker_rescue", cat: "heal"},
        type: "heal",
        school: "green",
        castTime: 0,
        onGCD: true,
        cost: 3.0,
        coeff: 4.3,
        expectedOverheal: 0.15,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Spiritbloom": [{  
        // Spiritbloom is a charge ability that adds a target per charge tier.
        // TODO: Assumption is chained targets are random injured not lowest health or distance based. 
        spellData: {id: 382731, icon: "ability_evoker_spiritbloom2", cat: "heal"},
        type: "heal",
        school: "green",
        castTime: [1, 1.75, 2.5, 3.25],
        empowered: true,
        cost: 3.8,
        cooldown: 30,
        coeff: 5.65,
        targets: [1, 2, 3, 4], // 
        expectedOverheal: 0.4,
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
        coeff: [1.85 * 2, 1.85 * 2.25, 1.85 * 2.5, 1.85 * 2.75],
        cooldown: [25, 20, 15, 10],
        expectedOverheal: 0.45,
        targets: 5, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Emerald Blossom": [{
        // Instant, 3 Essence cost, heals 3 targets after a 2s delay.
        // This hooks into a lot of different talents.
        spellData: {id: 355913, icon: "ability_evoker_emeraldblossom", cat: "heal"},
        type: "heal",
        castTime: 0,
        school: 'green',
        onGCD: true,
        delay: 2, // The number of seconds before the spell heals.
        targets: 3,
        essence: 3,
        cost: 4.0,
        coeff: 2.5,
        expectedOverheal: 0.35,
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
        castTime: 3.25,
        school: "bronze",
        targets: 1,
        essence: 2,
        cost: 1.7,
        coeff: 2 * 0.67, // Aura
        expectedOverheal: 0.2,
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
        tickRate: 2,
        castTime: 1.5,
        coeff: 0.57 * 0.67,
        cost: 2.0,
        buffDuration: 12,
        function: function (state, buff) {
            const hotHeal = { type: "heal", coeff: buff.coeff, expectedOverheal: 0.2, secondaries: ['crit', 'vers', 'mastery']}

            runHeal(state, hotHeal, "Reversion")
            // Roll dice and extend. If RNG is turned off then we can instead calculate expected duration on buff application instead.
            // This can't take into account on-use crit increases though whereas rolling it each time will (but requires more iterations for a proper valuation).
            // Current model uses the deterministic method. TODO. 
        }

    }],
    "Temporal Anomaly": [{
        // Lasts 8s and heals every 1s within range but it. Puts absorbs on allies. 
        // Stacks to 3, however the cap is based on how much 3 stacks would absorb pre-mastery.
        spellData: {id: 373861, icon: "ability_evoker_temporalanomaly", cat: "heal"},
        name: "Temporal Anomaly",
        type: "buff",
        buffType: "heal",
        school: "bronze",
        castTime: 1.5,
        buffDuration: 6,
        tickRate: 2,
        cooldown: 6,
        cost: 7.5,
        coeff: 1.75, 
        targets: 2, 
        expectedOverheal: 0.4, // Note that while this is called ExpectedOverhealing it's really just an efficiency value.
        secondaries: ['vers', 'mastery']
    }],
    "Blessing of the Bronze": [{
        // Blessing of the Bronze is a short CD buff spell that buffs the raid. It can also be used as a generic Bronze spell for Temporal Compression.
        spellData: {id: 364342, icon: "ability_evoker_blessingofthebronze", cat: "cooldown"},
        type: "rest",
        school: "bronze",
        castTime: 1.5,
        cooldown: 15,
        cost: 4.0,
    }],
    "Dream Flight": [{
        // Large upfront heal and leaves a 15s HoT on anyone it hits.
        // 1 min cooldown. Travels up to 60 yards. 
        spellData: {id: 359816, icon: "ability_evoker_dreamflight", cat: "cooldown"},
        type: "heal",
        school: "green",
        castTime: 3, // TODO: This one has variance based on how far we travel. 
        cooldown: 120,
        cost: 4.0,
        coeff: 4,
        targets: 10, // Can hit everyone. Likely to be retuned around sqrt scaling.
        expectedOverheal: 0.4,
        secondaries: ['crit', 'vers', 'mastery']
    },
    {
        type: "buff",
        buffType: "heal",
        tickRate: 3,
        targets: 10,
        coeff: 0.5,
        buffDuration: 15,
        expectedOverheal: 0.5,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Azure Strike": [{
        // Two target hit. Instant.
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
        // Questions:
        // - Is it sqrt scaling after 5 targets?
        // - Is the HoT also reduced damage after 5 targets?
        // - Does Lifegivers Flame also heal for the DoT amount?
        spellData: {id: 357208, icon: "ability_evoker_firebreath", cat: "damage"},
        type: "damage",
        empowered: true,
        school: "red",
        castTime: [1, 1.75, 2.5, 3.25],
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
        targets: 5,
        coeff: 0.35,
        buffDuration: [4, 8, 12, 16],
        expectedOverheal: 0.45,
        secondaries: ['crit', 'vers']
    }],

    // Disintegrate (Essence damage ability)

    // 

}

export const evokerTalents = {
    // Class Tree
    // Some pure utility based talents might not appear.

    rescue: {points: 0, maxPoints: 1, icon: "ability_evoker_rescue", id: 360995, select: false},

    naturalConvergence: {points: 0, maxPoints: 1, icon: "spell_frost_frostblast", id: 369913, select: true}, // Disintegrate channels 20% faster.
    //rescue: {points: 0, maxPoints: 1, icon: "", id: 0, select: true},
    innateMagic: {points: 0, maxPoints: 1, icon: "ability_evoker_innatemagic4", id: 375520, select: true}, // Essence regens 5% faster (2 charges).
    enkindled: {points: 1, maxPoints: 2, icon: "ability_evoker_livingflame", id: 375554, select: true}, // Living Flame does +5% damage / healing.
    scarletAdaptation: {points: 0, maxPoints: 1, icon: "inv_bijou_red", id: 372469, select: true}, // Store 20% of healing dealt. Offensive living flame consumes it to increase damage dealt. Cap is 6x SP x Vers.
    cauterizingFlame: {points: 0, maxPoints: 1, icon: "", id: 0, select: false}, // Big dispel that also heals.
    tipTheScales: {points: 0, maxPoints: 1, icon: "", id: 0, select: false}, // Your next empowered spell casts instantly. 2 min CD.
    attunedToTheDream: {points: 0, maxPoints: 1, icon: "ability_rogue_imrovedrecuperate", id: 376930, select: true}, // +2% healing (2 points).
    draconicLegacy: {points: 0, maxPoints: 1, icon: "inv_helm_mail_dracthyrquest_b_02", id: 376166, select: true}, // +2% stamina (2 points).
    bountifulBloom: {points: 0, maxPoints: 1, icon: "ability_evoker_emeraldblossom", id: 370886, select: true}, // Emerald Blossom heals +2 targets.
    protractedTalons: {points: 0, maxPoints: 1, icon: "ability_evoker_azurestrike", id: 369909, select: true}, // Azure Strike hits an additional target.
    lushGrowth: {points: 0, maxPoints: 1, icon: "inv_staff_2h_bloodelf_c_01", id: 375561, select: true}, // Green spells heal for 5% more (2 points).

    // Spec Tree
    reversion: {points: 0, maxPoints: 1, icon: "", id: 0, select: false},
    dreamBreath: {points: 0, maxPoints: 1, icon: "", id: 0, select: false},
    echo: {points: 0, maxPoints: 1, icon: "", id: 0, select: false},
    temporalCompression: {points: 0, maxPoints: 1, icon: "ability_evoker_rewind2", id: 362877, select: true}, // Bronze spells reduce the cast time of your next finisher by 5%. Stacks to 4. 15s duration.
    essenceBurst: {points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst", id: 359618, select: true}, // Living Flame has a 20% chance to make your next Essence ability free.
    rewind: {points: 0, maxPoints: 1, icon: "", id: 0, select: false}, // Raid cooldown.
    spiritbloom: {points: 0, maxPoints: 1, icon: "", id: 0, select: false},
    lifeGiversFlame: {points: 0, maxPoints: 1, icon: "item_sparkofragnoros", id: 371441, select: true}, // Fire Breath heals a nearby ally for 80% of damage done.
    timeDilation: {points: 0, maxPoints: 1, icon: "", id: 0, select: false}, // ST defensive
    emeraldCommunion: {points: 0, maxPoints: 1, icon: "", id: 0, select: false}, // ST self-heal channel
    spiritualClarity: {points: 0, maxPoints: 1, icon: "ability_evoker_spiritbloom", id: 376150, select: true}, // Spiritbloom CD reduced by 15s. Choice node with Empath.
    empath: {points: 0, maxPoints: 1, icon: "ability_evoker_powernexus2", id: 370840, select: true}, // Spiritbloom increases regen rate by 100% for 10 seconds. Choice node with Spiritual Clarity.
    flutteringSeedlings: {points: 0, maxPoints: 1, icon: "inv_herbalism_70_yserallineseed", id: 359793, select: true}, // Emerald Blossoms sends out 3 flying seedlings when it bursts, each healing for 90% sp.
    goldenHour: {points: 0, maxPoints: 1, icon: "inv_belt_armor_waistoftime_d_01", id: 378196, select: true}, // Reversion instantly heals the target for 15% of the damage they took in the last 5 seconds.
    temporalAnomaly: {points: 0, maxPoints: 1, icon: "", id: 0, select: false}, // Ability.
    fieldOfDreams: {points: 0, maxPoints: 1, icon: "inv_misc_herb_chamlotus", id: 370062, select: true}, // Gain a 30% chance for your fluttering seedlings to grow into a new emerald blossom.
    lifeforceMender: {points: 0, maxPoints: 3, icon: "ability_evoker_dragonrage2", id: 376179, select: true}, // Living Flame and Fire Breath deal extra damage & healing equal to 1% of your maximum health (3 points).
    timeLord: {points: 0, maxPoints: 1, icon: "ability_evoker_innatemagic4", id: 372527, select: true}, // Echo replicates an additional 30% healing (3 points).
    nozdormusTeachings: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Temporal Anomaly shields one additional target.
    temporalDisruption: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Temporal Anomaly adds an Echo to allies hit.
    lifebind: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Rescue binds you to your ally, causing any healing either partner receives to splash for 40% on the other.
    callOfYsera: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Rescue increases the effectiveness of your next Dream Breath by 40% or Living Flame by 100%.
    timeOfNeed: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Needs testing.
    sacralEmpowerment: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Consuming a full Temporal Compression grants Essence Burst (next essence ability is free). Need to test.
    exhiliratingBurst: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Each time you gain Essence Burst gain +50% crit damage / healing for 8 seconds.
    groveTender: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Dream Breath, Spiritbloom and Emerald Blossom cost 10% less mana.
    fontOfMagic: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Your Empower spells go to 4 (longer cast time).
    energyLoop: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Disintegrate grants 1200 mana over it's duration.
    renewingBreath: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Allies healed by dream breath get a HoT for 10% of the amount over 8 seconds (3 points).
    gracePeriod: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Your healing is increased by 15% on allies with Reversion.
    timelessMagic: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Reversion, Time Dilation, Echo last 2s longer (3 points).
    dreamFlight: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, 
    stasis: {points: 0, maxPoints: 1, icon: "", id: 0, select: true},
    cycleOfLife: {points: 0, maxPoints: 1, icon: "", id: 0, select: true}, // Emerald Blossom leaves behind a sprout that absorbs 5% of healing over 10 seconds.


};