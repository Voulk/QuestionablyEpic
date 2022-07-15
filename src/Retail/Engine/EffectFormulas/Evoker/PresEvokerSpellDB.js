
import { SpellcheckRounded } from "@mui/icons-material";
import { runHeal, getHaste, runDamage } from "./PresEvokerRamps";

// This is the Disc spell database. 
// It contains information on every spell used in a ramp. Each spell is an array which means you can include multiple effects to code spells like Mindblast. 
// Any errors can be reported on the QE github, or to me directly on discord @Voulk1858.
// The spell database can be copied locally to a function and then individual spells edited for conduits, legendaries, soulbinds and so on.

// Let's go through the available fields.
// type: damage (effect deals damage), healing (effect heals), buff (effect adds a buff), atonementExtension (specific to Evang).
// cost: mana cost. This is currently represented as an integer, but could be converted to % mana cost in future.
// coeff: the spells intellect scaling. This is a combination of base coefficient, any possible spell ranks, and any relevant auras that might impact the spell.
// cooldown: a spells cooldown. 
// atoneOverheal: The average atonement overhealing caused by this spells cast. This is an average based on log analysis, and won't be perfectly accurate for every scenario.
// overheal: A healing spells typical overhealing percentage.
// secondaries: The secondary stats a spell scales with. Note that if it's a damage spell, you don't need to include the resulting atonements mastery scaling. 
// targets: The number of targets a spell hits. All effects will be applied to every target.
// tags: optional tags for specific functionality. Also includes scaling modifiers like spells that have square root scaling with number of targets.

// Buff spells also expect the following:
// buffDuration: How long the buff lasts
// buffType: 'stats' / 'spec'. Spec can cover spec interactions like Boon, Schism etc.
// stat: stat buff types should include which stat it gives you. Bell for example would add 'mastery'
// value: stat buff types should also have a value showing how much stat it gives you. When this is variable (like a trinket) then it can be fed into the ramp functions directly and
// any values displayed in this DB are placeholders only.

// Spell coefficients combine a spells base coefficient with any relevant auras that might impact the spell. 
export const EVOKERSPELLDB = {
    // Essence recharge rate: 3s?

    // Living Flame
    "Living Flame": [{ 
        // Also has a damage version that we could just include as a separate ability. Living Flame H and Living Flame D.
        type: "heal",
        castTime: 2,
        cost: 0.02,
        coeff: 2.75,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Rescue": [{ 
        // Single target heal that also moves you to that location. Talent that buffs the next dragon breath.
        type: "heal",
        castTime: 1.5,
        cost: 0.03,
        coeff: 4.3,
        expectedOverheal: 0.15,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Spiritbloom": [{  // Maybe run these as functions? Or have them as an array and we decide what we're casting.
        // Spiritbloom is a charge ability that adds a target per charge tier.
        type: "heal",
        castTime: 3.25,
        charged: true,
        cost: 0.038,
        cooldown: 30,
        coeff: 5.65,
        targets: 4, // 
        expectedOverheal: 0.4,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Dream Breath": [{  // NYI
        // Dream Breath heals for more per charge tier and also has a lower cooldown.
        type: "heal",
        castTime: 3.25,
        charged: true,
        cost: 0,
        coeff: 0.99,
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Emerald Blossom": [{
        // Instant, 3 Essence cost, heals 3 targets after a 2s delay.
        // Probably play this as a buff with a custom function attached to it's expiration.
        // Should have a reference in the MW tree.
        type: "heal",
        castTime: 1.5,
        targets: 3,
        essence: 3,
        cost: 0.04,
        coeff: 2.5,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Echo": [{
        // Cast time, 2 Essence Cost, Single target, Increases next ST healing spell by 70% (technically casts it a second time).
        // We can model this by assuming your next ST cast will be on the target since it likely will.
        type: "heal",
        castTime: 3.25,
        charged: true,
        targets: 3,
        cost: 0,
        coeff: 0.99,
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Reversion": [{
        // Big heal over time effect, extended by crits. 12s base duration, 9s cooldown, crits extend by one tick.

        type: "buff",
        buffType: "function",
        tickRate: 2,
        castTime: 1.5,
        coeff: 1,
        manaCost: 0,
        buffDuration: 12,
        function: function (state, buff) {
            // Essence Font Heal
            const hotHeal = { type: "heal", coeff: buff.coeff, expectedOverheal: 0.15, secondaries: ['crit', 'vers', 'mastery']}
            console.log("Healin");

            runHeal(state, hotHeal, "Reversion")
            
            // Roll dice and extend. If RNG is turned off then we can instead calculate expected duration on buff application instead.
            // This can't take into account on-use crit increases though whereas rolling it each time will (but requires more iterations for a proper valuation).
            // NYI
        }

    }],
    "Temporal Anomaly": [{
        // Lasts 8s and heals every 1s within range but it keeps running away so low efficiency. Heals 3 targets per tick. 6s cooldown.
        type: "heal",
        castTime: 3.25,
        charged: true,
        duration: 0,
        cooldown: 9,
        cost: 0,
        coeff: 0.99,
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Dream Flight": [{
        // Fat upfront heal and leaves a 15s HoT on anyone it hits.
        // 1 min cooldown. 
        type: "heal",
        castTime: 3.25,
        charged: true,
        duration: 0,
        cooldown: 9,
        cost: 0,
        coeff: 0.99,
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    "Azure Strike": [{
        // Two target hit. Instant.
        type: "damage",
        castTime: 3.25,
        charged: true,
        duration: 0,
        cooldown: 9,
        cost: 0,
        coeff: 0.99,
        targets: 1, // 
        secondaries: ['crit', 'vers', 'mastery']
    }],
    // Disintegrate (Essence damage ability)

    // 


    "": [
        {
            type: "buff",
            buffType: "heal",
            cost: 0.216,
            castTime: 2,
            coeff: 0.265, 
            tickRate: 2,
            cooldown: 10,
            hastedCooldown: false,
            buffDuration: 10,
            targets: 6,
            expectedOverheal: 0.15,
            secondaries: ['crit', 'vers', 'mastery'], // + Haste
            canPartialTick: true,
    }],


    "Healing Rain": [
    {
        type: "buff",
        buffType: "heal",
        cost: 0.216,
        castTime: 2,
        coeff: 0.265, 
        tickRate: 2,
        cooldown: 10,
        hastedCooldown: false,
        buffDuration: 10,
        targets: 6,
        expectedOverheal: 0.15,
        secondaries: ['crit', 'vers', 'mastery'], // + Haste
        canPartialTick: true,
    }],
    "Cloudburst Totem": [
        {
            type: "buff",
            name: "Cloudburst Totem",
            cost: 0.086,
            castTime: 1.5,
            buffType: "special",
            cooldown: 30,
            hastedCooldown: false,
            buffDuration: 15,
        }],

    "Judgment": [{ // TODO: Judgment also increases the damage of our next HS or CS by 30%, but this is rather trivial. 
        type: "damage",
        castTime: 1.5,
        cost: 0.03,
        coeff: 0.634 * 1.5,
        cooldown: 12,
        secondaries: ['crit', 'vers']
    }],
    "Mind Blast": [{
        type: "damage",
        castTime: 1.5,
        cost: 1250,
        coeff: 0.744642, // 0.9792 x 0.809 (Mind Blast aura) x 0.94 (Disc aura)
        cooldown: 15,
        atoneOverheal: 0.29,
        secondaries: ['crit', 'vers']
    },
    {
        type: "heal",
        castTime: 0,
        coeff: 3,
        aura: 1,
        targets: 1,
        secondaries: ['vers'],
        overheal: 0,
    }]
}

export const discConduits = (conduit, rank) => {
    if (conduit === "Exaltation") return 0.0675 + (rank * 0.0075);
    else if (conduit === "Shining Radiance") return 0.36 + (rank * 0.04);
    else if (conduit === "Pain Transformation") return 0.135 + (rank * 0.015);
    else if (conduit === "Rabid Shadows") return 0.171 + (rank * 0.19);
    else if (conduit === "Courageous Ascension") return 0.225 + (rank * 0.025);
    else if (conduit === "Shattered Perception") return 0.117 + (rank * 0.013);
    else {
        console.error("Invalid Conduit");
    }
}