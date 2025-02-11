

export const applyLoadoutEffects = (spells, settings, conduits, state) => {

}

export const baseTalents = {
    // Tier 1
    fastFeet: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // +70% RSK damage, +10% SCK damage
    }},
    graceOfTheCrane: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // +4% healing tkn
    }},
    vivaciousVivification: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // Every 10s your Vivify is instant and heals for 20% more.
    }},

    // Class Tree Tier 2
    ferocityOfXuen: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        // +2% damage done
    }},
    vigorousExpulsion: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        // +5% Expel Harm healing, +15% crit chance
    }},

    // Class Tree Tier 3
    saveThemAll: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        // +10% healing for 4s when you heal someone below 35%.
    }},
    chiProficiency: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        // +2% magic damage done. +2% healing done.
    }},
    martialInstincts: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        // +2% physical damage done.
    }},

    // Spec Tree Tier 1
    craneStyle: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        // RSK, SCK, BoK have a chance to heal via Gust of Mists.
    }},
    calmingCoalescence: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // +80% absorb on Life Cocoon
    }},
    refreshment: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Life Cocoon grants 5 stacks of Mana Tea and applies 2 stacks of healing elixir to the target.
    }},
    upliftedSpirits: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Vivify and RSK reduce the cooldown on Revival by 1s. Revival heals targets for 15% of its amount over 10 seconds.
    }},
    energizingBrew: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Mana Tea channels 50% faster and generates 20% more mana.
    }},
    lifecycles: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Vivify has a 20% chance to cause your next RSK or EnV to generate 1 stack of mana tea. EnV and RSK have a 20% chance to cause your next vivify
        // to generate 1 stack of Mana Tea.
    }},
    zenPulse: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Renewing Mists HoT effect has a chance to cause your next Vivify to trigger a Zen Pulse on its target and all allies with Renewing Mist, healing them.
        // Increased by 6% for each ReM active up to 30%.
    }},
    mistsOfLife: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Life Cocoon applies ReM and Env
    }},
    overflowingMist: {points: 1, maxPoints: 2, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Your Env heals the target for 0.6% of their health each time they take direct damage.
    }},
    deepClarity: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // After you consume TFT, your next Vivify triggers Zen Pulse.
    }},
    rapidDiffusion: {points: 1, maxPoints: 2, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // RSk and EnV apply ReM for 3s to an ally.
    }},
    chrysalis: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Reduces the CD of Life Cocoon by 45s.
    }},
    burstOfLife: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // When Life Cocoon expires it heals 3 targets for 806% sp.
    }},
    yulonsWhisper: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // While channeling mana tea you heal 5 allies for 45.5% sp every 0.5s.
    }},
    mistWrap: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Increases EnV duration by 1s and healing bonus by 10%.
    }},
    refreshingJadeWind: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // TFT heals 5 allies every 0.75s for 6s.
    }},
    celestialHarmony: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // While active, Yulon / Chiji cast Enveloping Breath on 5 targets when you cast EnV healing them over 6s and increasing their healing taken by 10%.
        // When activated, they apply Chi Cocoons to 5 targets, absorbing damage.
    }},
    dancingMists: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Renewing Mist has an 8% chance to immediately spread when cast or travelling to a new target.
    }},
    lotusInfusion: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // Allies with ReM take 10% more healing from you, and ReMs duration is increased by 2s.
    }},
    chiHarmony: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        // ReM increases its targets healing received from you by 50% for the first 8s of its duration but can't jump during this time.
    }},
    peerIntoPeace: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // 5% of overhealing done with Soom spreads to 3 nearby allies. Soom now follows the target of your EnV / Vivify and its duration is increased by 4s.
    }},
    poolOfMists: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // ReM now has 3 charges and reduces the CD on RSK by 1s. RSK now reduces the CD on ReM by 1s.
    }},
    jadeBond: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // Chi Cocoons now apply EnV for 4s when they expire or are consumed. Chi-Ji GoM healing +40%, Yu'lons Soothing Breath healing +500%.
    }},
    giftOfTheCelestials: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // Reduces the CD on Chi'ji / Yulon by 1 minute but reduces their duration to 12s.
    }},
    danceOfChiji: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // 3ppm: Chance to make next SCK deal +400% damage.
    }},
    jadeEmpowerment: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // Casting TFT: Your next CJL deals +2500% damage and causes it to chain to 4 nearby enemies at 15% effectiveness.
    }},
    focusedThunder: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // TFT now empowers two spells.
    }},
    awakenedJadefire: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // Abilitie reset stomp twice as often. While within Stomp: TP strikes twice, BoK strikes two extra targets at 20% effectiveness, SCK heals 3 allies for 110% damage done.
    }},
    jadefireTeachings: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // After casting Stomp or TFT: Ancient Teachings transfers an extra 160% damage -> healing. +5% stamina while active.
    }},
    resplendentMist: {points: 1, maxPoints: 2, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // GoM has a 30% chance to heal +75%.
    }},
    secretInfusion: {points: 1, maxPoints: 2, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        /* After using TFT your next spell gives you a stat for 10s.
            Vivify: Mastery
            Enveloping Mist: Crit
            Renewing Mist: Haste
            Rising Sun Kick / Expel Harm: Versatility
        */
    }},
    mistyPeaks: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // ReM has a 4% / 8% chance per tick to apply Enveloping Mist
    }},
    teaOfSerenity: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // TFT empowers 2 additional ReM, Vivify or Enveloping Mist at random.
    }},
    teaOfPlenty: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // TFT empowers 2 additional EnV, Expel Harm or RSK at random.
    }},
    unison: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // Soothing Harm heals a second ally for 25% of the amount.
    }},
    mendingProliferation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // Each time EnV heals, its healing bonus has a 50% chance to spread to an ally.
    }},
    invokersDelight: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // You gain 33% haste for 20s after summoning a celestial.
    }},
    tearOfMorning: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // On Viv / EnV cast on ally with ReM: 10% chance to spread ReM to another target.
        // Vivify cleave + 10%. EnV also now cleaves for 12%.
    }},
    risingMist: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // RSK heals all allies with ReM / EnV and extends by 4s up to 100% of their base duration.
    }},
    legacyOfWisdom: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // SG heals +2 allies, cast time -0.5s
    }},
    emperorsFavor: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 6, runFunc: function (state, spellDB, points) {
        // SG healing +150%, cast time -100%, heals only 1 target now.
    }},
};