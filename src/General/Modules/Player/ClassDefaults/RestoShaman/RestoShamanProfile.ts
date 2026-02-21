
import { runSpellScript } from "../Generic/SpellScripts";
import { hasTalent, deepCopyFunction } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import specSpellDB from "./RestoShamanSpellDB.json";
import { defaultTalents, shamanTalents } from "./RestoShamanTalents";
import {
    getCPM,
    applyRaidBuffs,
    printHealingBreakdownWithCPM,
    convertStatPercentages,
    getSpellThroughput,
    applyTalents,
    completeCastProfile,
    getTimeUsed
} from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";

export const restoShamanProfile = {
    spec: "Restoration Shaman",
    name: "Restoration Shaman Classic",
    scoreSet: scoreShamanSet,
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

// Ascendance spells are modified copies of the base ones so we add their own entries
const addAscendanceSpells = (spellDB) => {
    let ascendanceHealingWave = deepCopyFunction(spellDB["Healing Wave"]);
    if (!ascendanceHealingWave[0].statMods) ascendanceHealingWave[0].statMods = {};
    ascendanceHealingWave[0].statMods.crit = 1
    // Extra target is handled in profile
    spellDB["Healing Wave (Ascendance)"] = ascendanceHealingWave

    let ascendanceChainHeal = deepCopyFunction(spellDB["Chain Heal"]);
    ascendanceChainHeal[0].targets += 3
    ascendanceChainHeal[0].specialFields.chainHealFalloff = 0.1
    ascendanceChainHeal[0].cost *= 0.75
    spellDB["Chain Heal (Ascendance)"] = ascendanceChainHeal
}

// Get the real crit% of a spell counting stats and modifiers
const getRealCrit = (spellName: string, state, spellDB) => {
    if (!spellDB[spellName][0].statMods) spellDB[spellName][0].statMods = {}
    // Hardcap at 2 because Asc Healing Wave always has 100% crit (is this needed? am i avoiding a bug?)
    const spellCrit = Math.min(state.statPercentages.crit + (spellDB[spellName][0].statMods.crit ?? 0), 2)
    return spellCrit
}

// PlayerData needs some work to be a fully formed idea still. I'll fix its typing later.
/*
TODO:
- Tidal Waves
- Earthen Harmony
- Unleash Life buff + Earthen Accord
- Flow of the Tides
- Oversurge
*/
export function scoreShamanSet(stats: Stats, playerData: any, settings: PlayerSettings = {}) {
    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    const fightLength = 6
    // This will be sent to applyTalents and then we'll turn it into a proper state variable afterwards.
    let initialState = {statBonuses: applyRaidBuffs(settings), talents: shamanTalents, heroTree: playerData.heroTree};
    const reportingData: any = {};
    
    const damageBreakdown: Record<string, number> = {};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};

    // Apply Talents
    const talents = initialState.talents;
    defaultTalents(initialState.talents, "default", playerData.heroTree);
    applyTalents(initialState, spellDB, initialState.statBonuses);
    
    // The state variable that will be passed into each spell calculation.
    const state = { fightLength: fightLength, spec: "Restoration Shaman", statPercentages: convertStatPercentages(stats, initialState.statBonuses, "Restoration Shaman",
        playerData.masteryEffectiveness), settings: settings, talents: shamanTalents};

    let castProfile: CastProfile = [
        // Add Spells here
        {spell: "Riptide", efficiency: 1},
        {spell: "Healing Stream Totem", efficiency: 1},
        {spell: "Spirit Link Totem", efficiency: 1},
        {spell: "Unleash Life", efficiency: 1},
    ]

    // Ratio of how to spend extra time on filler spells
    const fillerSpellsPriority = {
        "Chain Heal": 0,
        "Healing Wave": 1
    }
    const ascendanceFillerSpellsPriority = {
        "Chain Heal": 0,
        "Healing Wave": 1
    }

    // Add Surging for totemic or rain if talented for farseer
    // Swiftness procs one guaranteed SST and also gets us one free chain heal (which should be better than healing wave when its free)
    let swiftnessCPM
    if (playerData.heroTree === "Totemic") {
        castProfile.push({spell: "Surging Totem", efficiency: 1})
        swiftnessCPM = 1
    } else {
        if (hasTalent(talents, "Healing Rain")){castProfile.push({spell: "Healing Rain", efficiency: 1})}
        swiftnessCPM = 2
        // If im inside the `else` from heroTree === "Totemic" i am safe to just add always-active hero talents from Farseer right?

        // Farseer has a couple of talents that give us more Riptides, im adding them up here because other stuff like SST, DRE and filler spells will vary from this
        // Offering from beyond from Farseer gives us 2 seconds of Riptide cdr when we summon an ancestor, average that one out over a minute
        const riptideCdr = getCPM(castProfile, "Unleash Life") + swiftnessCPM * 2
        castProfile.push({spell: "Riptide", cpm: riptideCdr / spellDB["Riptide"][0].cooldownData.cooldown })
        // Mystic Knowledge makes Riptide cooldown 10% faster for 8 seconds after pressing swiftness
        // We have 2 swiftness a minute so 16 seconds every minute of Riptide recharging 10% faster
        // If my logic from Flow State tracks here that is just 1.6s off Riptide every minute, so not even a single cast?
        castProfile.push({spell: "Riptide", cpm: (8 / 10 * swiftnessCPM) / spellDB["Riptide"][0].cooldownData.cooldown})
    }
    castProfile.push({spell: "Stormstream Totem", cpm: swiftnessCPM, label: "Stormstream Totem - Swiftness Proc"})
    // This is our free chain heal from swiftness, if we are farseer the swiftness also increases it by 10%
    castProfile.push({spell: "Chain Heal", cpm: swiftnessCPM, manaOverride: 0, castTimeOverride: 0, mult: (playerData.heroTree === "Farseer") ? 1.1 : 1, label: "Chain Heal - Swiftness Cast"})

    // Earth shield has a 3s icd but in actual logs it procs aprox every 5 seconds on tanks that are taking constant damage
    const avgEarthShieldTickTime = 5
    const earthShieldCPM = (60 / avgEarthShieldTickTime) * 1.75 // We assume the ES on the player will proc only 75% as much as the one on the tank
    castProfile.push({spell: "Earth Shield", cpm: earthShieldCPM, autoSpell: true})

    // We add HTT or Asc
    if (hasTalent(talents, "Healing Tide Totem")){
        castProfile.push({spell: "Healing Tide Totem", efficiency: 1})
    } else if (hasTalent(talents, "Ascendance")){
        castProfile.push({spell: "Ascendance", efficiency: 1})
    }

    // Convert efficiencies to effect CPMs. Handle any special overrides.
    completeCastProfile(castProfile, spellDB);

    // Totemic procs motes every time you cast Surging Totem
    if (playerData.heroTree === "Totemic") {
        const surgingTotemCPM = getCPM(castProfile, "Surging Totem")
        // Water mote makes Healing Wave cleave an ally at 50% power. This always gets consumed by filler spells so just add it
        castProfile.push({spell: "Healing Wave", cpm: surgingTotemCPM, autoSpell: true, mult: 0.5, label: "Healing Wave - Water Mote Cleave"})
        // Earth mote makes Chain Heal apply Earthliving to everyone it hits at 150% power. Even free ones from Lively Totems consume it so its always used
        // In theory this should be replacing the normal elw that one chain heal can apply but it shouldn't matter too much and we're also not including air mote (40% cast time reduction to one heal cast)
        castProfile.push({spell: "Earthliving Weapon", cpm: surgingTotemCPM * spellDB["Chain Heal"][0].targets, autoSpell: true, mult: 1.5, label: "Earthliving Weapon - Earth Mote"})
    }

    // If Downpour is talented we add it based on the cpm of surging or rain
    // Double dip doubles the cpm
    if (hasTalent(talents, "Downpour")){
        if (hasTalent(talents, "Double Dip")){
            castProfile.push({spell: "Downpour", cpm: (getCPM(castProfile, "Surging Totem") + getCPM(castProfile, "Healing Rain")) * 2})
        } else {
            castProfile.push({spell: "Downpour", cpm: (getCPM(castProfile, "Surging Totem") + getCPM(castProfile, "Healing Rain"))})
        }
    }

    // Stormstream procs from casts of Riptide but only casted ones, not PTC
    castProfile.push({spell: "Stormstream Totem", cpm: getCPM(castProfile, "Riptide") * 0.06, label: "Stormstream Totem - Riptide Proc"})

    // PTC procs a free Riptide every 4th we cast. So just add 1/4 more Riptides as autos
    if (hasTalent(talents, "Primal Tide Core")){
        castProfile.push({spell: "Riptide", cpm: getCPM(castProfile, "Riptide") / 4, autoSpell: true, label: "Riptide - PTC"})
    }

    // We save our Asc cpm before adding DRE because DRE procs also generate the initial healing but we need to split them to know our total Asc uptime
    const baselineAscendanceCPM = getCPM(castProfile, "Ascendance")

    // DRE procs are based on our Riptide casts, they can also proc from PTC so we're safe to just grab cpm here
    let drePPM = 0
    if (hasTalent(talents, "Deeply Rooted Elements")){
        drePPM = getCPM(castProfile, "Riptide") * 0.07
        castProfile.push({spell: "Ascendance", cpm: drePPM, autoSpell: true, label: "Ascendance (DRE Proc)"})
    }

    // If we have any Ascendance in the profile at all we need to add the filler spells
    // I am fairly sure that i am messing up this because i am not removing other things spells, but also i am not totally sure what the ideal asc cast sequence is
    // Maybe weaving Healing Wave and Riptide due to talent interactions?
    // If Riptide during Ascendance is worth it then we don't really need to remove anything i suppose, HST has 17s cd and two charges so you don't need to cast it during Asc to not waste
    // And Unleash Life is still good to press, it would only be Riptide but surely you want to keep using it to maximize SST procs + all the other things
    if (getCPM(castProfile, "Ascendance")) {
        addAscendanceSpells(spellDB)
        // Base Ascendance duration times casts per minute, plus DRE ppm times DRE duration to get per min duration of asc
        // Should maybe be grabbing the duration from spell data instead once the DB is fixed to make this a buff?
        const ascendanceDurationPerMin = ((hasTalent(talents, "Preeminence") ? 18 : 15) * baselineAscendanceCPM) + (drePPM * 6)
        const ascendanceHaste = state.statPercentages.haste * (hasTalent(talents, "Preeminence") ? 1.25 : 1)
        const ascendanceSpellCount = ascendanceDurationPerMin / spellDB["Healing Wave"][0].castTime * ascendanceHaste

        // We use the priorities we defined earlier to split the time between Chain Heals and Healing Waves
        castProfile.push({spell: "Chain Heal (Ascendance)", cpm: ascendanceSpellCount * ascendanceFillerSpellsPriority["Chain Heal"]})
        // Healing Wave cleaves at half power, we need them to be different casts because each can proc Resurgence and Ancestral Awakening
        castProfile.push({spell: "Healing Wave (Ascendance)", cpm: ascendanceSpellCount * ascendanceFillerSpellsPriority["Healing Wave"]})
        castProfile.push({spell: "Healing Wave (Ascendance)", cpm: ascendanceSpellCount * ascendanceFillerSpellsPriority["Healing Wave"], mult: 0.5, autoSpell: true, label: "Healing Wave (Ascendance Cleave)"})
    }

    // For Lively Totems, we add free chain heals based on our cpm of the totems
    if (hasTalent(talents, "Lively Totems")){
        let livelyTotemsCPM = getCPM(castProfile, "Healing Stream Totem") + getCPM(castProfile, "Stormstream Totem") + getCPM(castProfile, "Healing Tide Totem") + getCPM(castProfile, "Spirit Link Totem")
        // Totemic Coordination makes these Chain Heals 25% stronger
        let mult = 1
        if (hasTalent(talents, "Totemic Coordination")){
            mult = 1.25
        }
        castProfile.push({spell: "Chain Heal", cpm: livelyTotemsCPM, autoSpell: true, mult: mult, label: "Lively Totems Chain Heal"})
    }

    // Max mana
    let manaPool = 250000;

    if (hasTalent(talents, "Primordial Capacity")){
        manaPool *= 1.1
    }

    // We are assuming you never actually get melee hit so no water shield procs, just the passive
    const waterShieldRegen = hasTalent(talents, "Therazane's Resilience") ? 714 : 621
    const regen = (manaPool * 0.04 + waterShieldRegen) * 12;
    let manaAvailable = manaPool / fightLength + regen;
    reportingData.manaAvailable = manaAvailable;

    // Modify mana costs due to resurgence
    if (hasTalent(talents, "Resurgence")){

        // Ascendance Healing Wave hits two targets and procs resurgence on both. Because we already added the cleaves as autoSpells they won't take the mana reduction
        // But because the casts always happen together we can just cut it from the main cast right?
        let resurgenceManaReturns = {
            "Healing Wave (Ascendance)": 1.6,
            "Healing Wave": 0.8,
            "Riptide": 0.48,
            "Chain Heal": 0.2,
            "Chain Heal (Ascendance)": 0.2
        }

        Object.keys(resurgenceManaReturns).forEach(spellName => {
            if (spellDB[spellName]){
                // First figure out the real mana return because it is based on max mana
                const realResurgenceReturn = manaPool * resurgenceManaReturns[spellName] / 250000
                // Every hit can proc resurgence so for Chains we need to see how many they hit
                const spellTargets = spellDB[spellName][0].targets || 1
                const spellCrit = getRealCrit(spellName, state, spellDB)
                // This ends up being a % of *base* mana that the resurgence hits of the spell restore. It is higher than the actual talent number if our max mana went up
                const manaRestored = realResurgenceReturn * (spellCrit - 1) * spellTargets
                spellDB[spellName][0].cost -= manaRestored

                // Lively Totems Chain Heals won't have discounts but they also should return mana
                // Currently just handling it by hand, as we haven't added any other chain heal that isn't the free ones we can just assume all of them are from Lively Totems right now
                // FUCK SOMEONE TOLD ME LIVELY TOTEMS DOESN'T RESURGENCE MY LIFE IS A LIE IM COMMENTING THIS OUT
                /*
                if (spellName === "Chain Heal"){
                    const livelyTotemsChainHeals = getCPM(castProfile, "Chain Heal")
                    const livelyTotemsManaReturn = manaPool * (manaRestored / 100) * livelyTotemsChainHeals
                    manaAvailable += livelyTotemsManaReturn
                }
                */
            }
        })

    }

    // Check our current mana usage
    const spellCosts = Object.fromEntries(Object.keys(spellDB).map((s: string) => [s, spellDB[s][0].cost * 250000 / 100]));
    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.autoSpell ? 0 : (spellCosts[spell.spell] * spell.cpm! * (spell.manaOverride ?? 1))), 0);
    reportingData.baselineCostPerMinute = baselineCostPerMinute;
    const fillerMana = manaAvailable - baselineCostPerMinute;
    reportingData.fillerManaPerMinute = fillerMana;

    // Spend extra time with filler spells
    // Totally ripped this off of one of the other profiles
    const timeAvailable = 60 - getTimeUsed(castProfile, spellDB, state.statPercentages.haste);
    reportingData.timeAvailable = timeAvailable;
    const fillerTime = spellDB["Healing Wave"][0].castTime / state.statPercentages.haste; // Both fillers have the same cast time
    const fillerCPMTime = timeAvailable / fillerTime
    const fillerCost = (spellCosts["Healing Wave"] * fillerSpellsPriority["Healing Wave"]) + (spellCosts["Chain Heal"] * fillerSpellsPriority["Chain Heal"])
    const fillerCPMMana = fillerMana / fillerCost
    const fillerCPM = Math.min(fillerCPMMana, fillerCPMTime)
    reportingData.fillerCPM = fillerCPM

    Object.keys(fillerSpellsPriority).forEach(spellName => {
        castProfile.push({spell: spellName, cpm: fillerCPM * fillerSpellsPriority[spellName] })
    })
    //I am actually not completely sure but i am assuming that below here i am only allowed to add autoSpells, otherwise i am cheating by adding more stuff after i already spend my remaining resources

    // Farseer Ancestor casts
    // Should be fairly simple? we find our average ancestor count, and then add a cpm of the ancestor spell that matches each of the real spells multiplied by that
    if (playerData.heroTree === "Farseer"){
        const ancestorSpellMap = {
            // Notably, the ancestors do not chain heal on stormstream, probably a bug
            "Chain Heal (Ancestor)": [
                "Chain Heal",
                "Chain Heal (Ascendance)",
                "Healing Stream Totem",
                "Healing Tide Totem"
            ],
            // I am not sure if the ancestors respond to the asc hw cleaves, if they don't i need to come back and cut down half the casts from those
            "Healing Wave (Ancestor)": [
                "Healing Wave",
                "Healing Wave (Ascendance)"
            ],
            "Healing Surge (Ancestor)": [
                "Riptide",
                "Unleash Life"
            ]
        }

        const longAncestors = hasTalent(talents, "Heed My Call")
        const unleashLifeAncestors = getCPM(castProfile, "Unleash Life") * (longAncestors ? 16 : 12) / 60
        const swiftnessAncestors = swiftnessCPM * (longAncestors ? 12 : 8) / 60
        // Ancient Fellowship is Riptide having a 20% chance to summon an ancestor so we do Riptide cpm * 0.2 * how long they last to find out many seconds of ancestor Riptide gives
        // In theory this is the one effect that could give more than one ancestor at the same time but also can give none so it balances itself out right?
        const riptideAncestors = hasTalent(talents, "Ancient Fellowship") ? (getCPM(castProfile, "Riptide") * 0.2) * (longAncestors ? 12 : 8) / 60 : 0
        const averageAncestorCount = unleashLifeAncestors + swiftnessAncestors + riptideAncestors

        Object.keys(ancestorSpellMap).forEach(ancestorSpell => {
            const ancestorSpellCPM = ancestorSpellMap[ancestorSpell].reduce((totalCPM: number, spellName: string) =>
                totalCPM + getCPM(castProfile, spellName), 0
            )
            // For each sum of the spells that cause ancestor spells, we multiply that by our average ancestor count
            castProfile.push({spell: ancestorSpell, cpm: ancestorSpellCPM * averageAncestorCount, autoSpell: true})
        })

        // Ancestral Influence makes every ancestor increase our int by 1%
        state.statPercentages.intellect *= averageAncestorCount

        // Final Calling makes ancestors cast one hydrobubble when they go away
        // I assume there is no practical purpose to "when they depart" and we just care about one ancestor = one hydrobubble
        const ancestorSpawns = getCPM(castProfile, "Unleash Life") + swiftnessCPM
        // TODO: Hydrobubble is not in the spellDB - https://www.wowhead.com/spell=444490
        //castProfile.push({spell: "Hydrobubble", cpm: ancestorSpawns, autoSpell: true})
    }

    // We are gonna need our average Riptide count for several talents that are based on your active Riptides
    const averageRiptideCount = getCPM(castProfile, "Riptide") * spellDB["Riptide"][1].buffDuration / 60

    // Tidewaters heals everyone with Riptide every time we cast Surging or Rain
    if (hasTalent(talents, "Tidewaters")){
        // Is this the correct way?
        spellDB["Tidewaters"][0].targets = getCPM(castProfile, "Riptide")
        castProfile.push({spell: "Tidewaters", cpm: (getCPM(castProfile, "Surging Totem") + getCPM(castProfile, "Healing Rain")), autoSpell: true})
    }

    // Flat 0.5% increase to all healing per point in the talent for every active Riptide
    if (hasTalent(talents, "Undercurrent")){
        state.statPercentages.genericHealingMult *= (0.5 * talents["Undercurrent"].points) + (averageRiptideCount / 100)
    }

    // 15% healing increase to Riptide targets, so we get an average across the raid
    if (hasTalent(talents, "Deluge")){
        const averageDelugeIncrease = averageRiptideCount * 15 / 20
        state.statPercentages.genericHealingMult *= 1 + (averageDelugeIncrease / 100)
    }

    // Now to figure out Earthliving Weapon
    if (hasTalent(talents, "Earthliving Weapon")){
        // Totemic gets ELW from totem heals
        if (hasTalent(talents, "Primal Catalyst")){
            // Every heal event can apply it so totems can on every tick
            const elwTotemsApplications = {
                "Healing Stream Totem": 0.08,
                "Healing Tide Totem": 0.08,
                "Stormstream Totem": 0.08
            }
            let elwTotemCPM = 0
            Object.keys(elwTotemsApplications).forEach(spellName => {
                let totemTicks
                // Totems can apply Earthliving on each tick so we find out how many times are they ticking
                spellDB[spellName].forEach((slice, i) => {
                    if (slice.tickData){
                        totemTicks = slice.buffDuration / (slice.tickData.tickRate / state.statPercentages.haste)
                    }
                })
                const applications = (getCPM(castProfile, spellName) * (spellDB[spellName][0].targets ?? 1) * totemTicks) * elwTotemsApplications[spellName]
                elwTotemCPM += applications
            })
            castProfile.push({spell: "Earthliving Weapon", cpm: elwTotemCPM, autoSpell: true, label: "Earthliving Weapon - Totems"})
        }

        const elwCastsApplications = {
            "Healing Wave (Ascendance)": hasTalent(talents, "Improved Earthliving Weapon") ? 1 : 0.2,
            "Healing Wave": hasTalent(talents, "Improved Earthliving Weapon") ? 1 : 0.2,
            "Chain Heal (Ascendance)": 0.2,
            "Chain Heal": 0.2,
            "Riptide": 0.2
        }
        let elwCastCPM = 0
        Object.keys(elwCastsApplications).forEach(spellName => {
            const applications = getCPM(castProfile, spellName) * (spellDB[spellName][0].targets ?? 1) * elwCastsApplications[spellName]
            elwCastCPM += applications
        })
        castProfile.push({spell: "Earthliving Weapon", cpm: elwCastCPM, autoSpell: true, label: "Earthliving Weapon - Casts"})
    }

    // Earthsurge is a flat healing increase on targets with Earthliving, now that we know how much earthliving we are applying we get the average same way we did Deluge
    if (hasTalent(talents, "Earthsurge")){
        // I was using getSpellEntry here cause i copied it from hpal but aparently thats wrong? was getting only 12cpm from the first entry instead of the sum
        const averageEarthlivingCount = getCPM(castProfile, "Earthliving Weapon") * spellDB["Earthliving Weapon"][0].buffDuration / 60
        const averageEarthSurgeIncrease = averageEarthlivingCount * 15 / 20
        state.statPercentages.genericHealingMult *= 1 + (averageEarthSurgeIncrease / 100)
    }

    // Coalescing Waters makes Chain Heal and Healing Wave casts increase the *initial* healing of your next Riptide by 30%.
    // It can stack to two and we want to spam Riptide so we assume all stacks are consumed normally
    if (hasTalent(talents, "Coalescing Waters")){
        // Asc Healing wave includes the hard cast and the cleave, both give a stack of Coalescing Waters
        const cwProcs = getCPM(castProfile, "Healing Wave") + getCPM(castProfile, "Chain Heal") + getCPM(castProfile, "Healing Wave (Ascendance)") + getCPM(castProfile, "Chain Heal (Ascendance)")
        // TODO: I know this is wrong because im also adding more Riptide hots when it should be only 0.3 of the initial heal every time we get a stack
        // But im just putting it here to come back later when i know how to add a single part of a spell, or whatever the proper way to do this is
        castProfile.push({spell: "Riptide", cpm: cwProcs, mult: 0.3, autoSpell: true, label: "Coalescing Waters"})
    }

    // Ancestral Awakening heals based on Riptide and Healing Wave casts, 50% of the amount healed
    // I actually don't know if this is a problem but the healing from AA isn't a replicate cast of the spell is its own thing that doesn't carry extra effects
    // But by this point i already added all the possible extra effects from these spells so adding more cpm shouldn't affect anything else?
    if (hasTalent(talents, "Ancestral Awakening")){
        let aaSpells = [
            "Healing Wave",
            "Riptide",
            "Healing Wave (Ascendance)",
        ]
        aaSpells.forEach(spellName => {
            if (!spellDB[spellName][0].statMods) spellDB[spellName][0].statMods = {}
            // Proc rate is 60% on crits and 30% on non-crits, so we model it as 30 * crit (so 30 * 0.5 = 15 for 50% crit) plus 30 baseline
            // We end up with something like 0.37, or the full 0.6 in the case of Asc HW that always crits
            const aaProcRate = ((30 * (getRealCrit(spellName, state, spellDB) - 1)) + 30) / 100
            if (spellName === "Healing Wave (Ascendance)"){
                // For Ascendance Healing Wave, half of these casts are the cleaves at half power so we need to halve the AA healing for them
                const realAscHealingWaveCPM = getCPM(castProfile, spellName) / 2
                // Half the casts to get the real number of hard casts, then 0.375 instead of 0.25 so it accounts for both the main cast and the 50% cleave (i can do this right?)
                castProfile.push({spell: spellName, cpm: realAscHealingWaveCPM * aaProcRate, autoSpell: true, mult: (0.375 * talents["Ancestral Awakening"].points), label: "Ancestral Awakening - " + spellName})
            } else {
                castProfile.push({spell: spellName, cpm: getCPM(castProfile, spellName) * aaProcRate, autoSpell: true, mult: (0.25 * talents["Ancestral Awakening"].points), label: "Ancestral Awakening - " + spellName})
            }
            // Did i make a mistake here or this talent is just fucking insane when you add Ascendance?
        })
    }

    // Sum the healing of each spell. Some of this can be shared between specs, others might need spec-specific implementations.
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData) => {
            let spellOutput = 0;

            if (slice.customScript) {
                // Spells that do things that are too complex for generic throughput calculations.
                // These are often scripted in-game too, like Wild Growth.
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else {
                // Get how much healing or damage we expect the spell to do.
                // We'll need to make a damage vs healing determination at some point but I'm still thinking about it.
                spellOutput = getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, spellFlags)
            }


            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            const totalOutput = (spellOutput * effectiveCPM);

            if (totalOutput > 0) {
                const label = spellProfile.label || spellName;
                castBreakdown[label] = (castBreakdown[label] ?? 0) + (effectiveCPM);
                healingBreakdown[label] = (healingBreakdown[label] ?? 0) + (totalOutput);
            }

        })

    })
    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    const totalDamage = Object.values(damageBreakdown).reduce((sum: number, val: number) => sum + val, 0);

    console.log(reportingData);
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { damage: totalDamage / 60, healing: totalHealing / 60 }
}