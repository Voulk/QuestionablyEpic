
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
        type: "damage",
        school: "red",
        castTime: 2,
        cost: 2.0,
        coeff: 2,
        secondaries: ['crit', 'vers']
    }],
    "Rescue": [{ 
        // Single target heal that also moves you to the targets location.
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
        expiration: 999,
        cooldown: 0,
        buffType: 'special',
    }],
    "Reversion": [{
        // Big heal over time effect, extended by crits. 12s base duration, 9s cooldown, crits extend by one tick.
        // Talent to increase it's base duration by 6s.
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
        // Lasts 8s and heals every 1s within range but it. Heals 3 targets per tick. 6s cooldown.
        // Travels very fast but NYI in Alpha.
        type: "heal",
        school: "bronze",
        castTime: 1.5,
        duration: 0,
        cooldown: 9,
        cost: 9999,
        coeff: 0.99999, // NYI
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Blessing of the Bronze": [{
        // Blessing of the Bronze is a short CD buff spell that buffs the raid. It can also be used as a generic Bronze spell for Temporal Compression.
        type: "rest",
        school: "bronze",
        castTime: 1.5,
        cooldown: 15,
        cost: 4.0,
    }],
    "Dream Flight": [{
        // Large upfront heal and leaves a 15s HoT on anyone it hits.
        // 1 min cooldown. Travels up to 60 yards. 
        type: "heal",
        school: "green",
        castTime: 3, // TODO: This one has variance based on how far we travel. 
        cooldown: 60,
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

export const baseTalents = {
    // Class Tree
    // Some pure utility based talents might not appear.
    naturalConvergence: false, // Disintegrate channels 20% faster.
    rescue: true,
    innateMagic: false, // Essence regens 5% faster (2 charges).
    enkindled: false, // Living Flame does +5% damage / healing.
    scarletAdaptation: false, // Store 20% of healing dealt. Offensive living flame consumes it to increase damage dealt. Cap is 6x SP x Vers.
    cauterizingFlame: false, // Big dispel that also heals.
    tipTheScales: false, // Your next empowered spell casts instantly. 2 min CD.
    attunedToTheDream: false, // +2% healing (2 points).
    draconicLegacy: false, // +2% stamina (2 points).
    bountifulBloom: false, // Emerald Blossom heals +2 targets.
    protractedTalons: false, // Azure Strike hits an additional target.
    lushGrowth: false, // Green spells heal for 5% more (2 points).

    // Spec Tree
    reversion: true,
    dreamBreath: true,
    echo: true,

    temporalCompression: false, // Bronze spells reduce the cast time of your next finisher by 5%. Stacks to 4. 15s duration.
    essenceBurst: true, // Living Flame has a 20% chance to make your next Essence ability free.
    rewind: false, // Raid cooldown.
    spiritbloom: false,
    lifeGiversFlame: false, // Fire Breath heals a nearby ally for 80% of damage done.
    timeDilation: false, // ST defensive
    emeraldCommunion: false, // ST self-heal channel
    spiritualClarity: false, // Spiritbloom CD reduced by 15s. Choice node with Empath.
    empath: false, // Spiritbloom increases regen rate by 100% for 10 seconds. Choice node with Spiritual Clarity.
    flutteringSeedlings: false, // Emerald Blossoms sends out 3 flying seedlings when it bursts, each healing for 90% sp.
    essenceStrike: false, // Azure Strike has a 15% chance to make your next essence ability free.
    goldenHour: false, // Reversion instantly heals the target for 15% of the damage they took in the last 5 seconds.
    temporalAnomaly: false, // Ability.
    fieldOfDreams: false, // Gain a 30% chance for your fluttering seedlings to grow into a new emerald blossom.
    lifeforceMender: false, // Living Flame and Fire Breath deal extra damage & healing equal to 1% of your maximum health (3 points).
    timeLord: false, // Echo replicates an additional 30% healing (3 points).
    nozdormusTeachings: false, // Temporal Anomaly is instant.
    temporalDisruption: false, // Anomaly heals for 40% more in 40% less time. (Needs testing).
    lifebind: false, // Rescue binds you to your ally, causing any healing either partner receives to splash for 40% on the other.
    callOfYsera: false, // Rescue increases the effectiveness of your next Dream Breath by 40% or Living Flame by 100%.
    timeOfNeed: false, // Needs testing.
    sacralEmpowerment: false, // Consuming a full Temporal Compression grants Essence Burst (next essence ability is free). Need to test.
    exhiliratingBurst: false, // Each time you gain Essence Burst gain +50% crit damage / healing for 8 seconds.
    groveTender: false, // Dream Breath, Spiritbloom and Emerald Blossom cost 10% less mana.
    fontOfMagic: false, // Your Empower spells go to 4 (longer cast time).
    energyLoop: false, // Disintegrate grants 1200 mana over it's duration.
    renewingBreath: false, // Allies healed by dream breath get a HoT for 10% of the amount over 8 seconds (3 points).
    gracePeriod: false, // Your healing is increased by 15% on allies with Reversion.
    timelessMagic: false, // Reversion, Time Dilation, Echo last 2s longer (3 points).
    dreamFlight: false, 
    stasis: false,
    cycleOfLife: false, // Emerald Blossom leaves behind a sprout that absorbs 5% of healing over 10 seconds.


};