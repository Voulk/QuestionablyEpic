
import { buffSpellPerc, buffSpellCritChance, manaCostAdj, modCastTime } from "General/Modules/Player/ClassDefaults/Generic/TalentBase"

const classTalents: TalentTree = {
    /* Increases all Fire and Frost damage you deal by X%. */
    "Fire and Ice": {id: 382886, values: [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],  points: 0, maxPoints: 1, icon: "spell_firefrost_orb", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases the number of Elemental Shields you can have active on yourself by 1.    You can have Earth Shield on yourself and one ally at the same time. */
    "Elemental Orbit": {id: 383010, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_mage_shattershield", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Stamina increased by X%.    While you are at full health, Reincarnation cools down Y% faster. */
    "Brimming with Life": {id: 381689, values: [5.0, 50.0],  points: 0, maxPoints: 2, icon: "inv_jewelry_talisman_06", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Mastery increased by X%. */
    "Spiritual Awakening": {id: 1270375, values: [3.0],  points: 0, maxPoints: 1, icon: "spell_shaman_blessingoftheeternals", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* The effects of your weapon $?a137041[][and shield ]imbues are increased by $?c1[X]?c2[Y]?c3[Z][]%. */
    "Enhanced Imbues": {id: 462796, values: [30.0, 15.0, 20.0, 30.0, 30.0, 20.0, 20.0, 20.0, 30.0, 20.0],  points: 0, maxPoints: 1, icon: "spell_nature_rockbiter", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your Healing $?a137039[Wave][Surge] is X% more effective on yourself.   */
    "Refreshing Waters": {id: 378211, values: [25.0],  points: 0, maxPoints: 1, icon: "ability_shaman_fortifyingwaters", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases the critical strike chance of your Nature spells and abilities by X%. */
    "Nature's Fury": {id: 381655, values: [2.0, 2.0],  points: 0, maxPoints: 2, icon: "spell_nature_spiritarmor", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your Earth Elemental no longer taunts nearby enemies or generates threat and instead increases your maximum health by $381755s1% while active. */
    "Primordial Bond": {id: 1279819, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_elemental_primal_earth", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases the radius of your totem effects by Z%.    Increases the duration of your Earthbind and Earthgrab Totems by ${X/1000} sec.    Increases the duration of your $?s157153[Cloudburst][Healing Stream], Tremor, Poison Cleansing, $?s137039[Ancestral Protection, Earthen Wall, ][]and Wind Rush Totems by ${Y/1000}.1 sec. */
    "Totemic Focus": {id: 382201, values: [10000.0, 3000.0, 15.0, 0.0],  points: 0, maxPoints: 1, icon: "inv_relics_totemofrebirth", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your Lava Burst and Riptide casts restore X mana to you and four allies. Allies can only benefit from one Mana Spring effect at a time. */
    "Mana Spring": {id: 381930, values: [4.0, 0.0],  points: 0, maxPoints: 1, icon: "spell_nature_manaregentotem", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Earth Shield $?c3[and Water Shield no longer lose charges and are][no longer loses charges and is] ${100+X}% effective. */
    "Therazane's Resilience": {id: 1217622, values: [15.0, -99.0, -99.0, 15.0, 15.0, -99.0, -99.0, 800.0],  points: 0, maxPoints: 1, icon: "shaman_pvp_rockshield", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* When refreshing Earth Shield, your target is healed for $462477s1 for each stack of Earth Shield they are missing.$?c3[    When refreshing Water Shield, you are refunded $462479s1 mana for each stack of Water Shield missing.][]    Additionally, Earth Shield$?c3[ and Water Shield][] can consume charges ${Y/-1000}.1 sec faster. */
    "Reactive Warding": {id: 462454, values: [1.0, -1000.0],  points: 0, maxPoints: 1, icon: "inv_10_elementalcombinedfoozles_water", select: true, tier: 0, runFunc: function (state: any, spellDB: 
    SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the cooldown of most totems by ${X/-1000} sec. */
    "Totemic Surge": {id: 381867, values: [-5000.0, -5000.0],  points: 0, maxPoints: 1, icon: "spell_nature_agitatingtotem", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, 
    talentValues: number[], points: number) {

    }},

    /* $?c3[Water][Lightning] Shield increases your $?c2[Agility][Intellect] by X%.    Casting $?c3[Water][Lightning] Shield also applies Earth Shield to yourself and any weapon imbuements if known. */
    "Instinctive Imbuements": {id: 1270350, values: [3.0, 3.0],  points: 0, maxPoints: 1, icon: "ability_shaman_ascendance", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, 
    talentValues: number[], points: number) {

    }},
}

const specTalents: TalentTree = {
    /* Increases the healing done by $?a455630[Surging Totem by X%.][Healing Rain by X% and reduces its cast time by ${Y/-1000}.1 sec.] */
    "Soothing Rain": {id: 1252874, values: [10.0, -500.0],  points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_2", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {
        buffSpellPerc(spellDB["Healing Rain"], talentValues[0] / 100)
        modCastTime(spellDB["Healing Rain"], talentValues[1] / 1000)
    }},

    /* Deal ${$378597s1*X} Nature damage every $378463t1 sec to up to $378597s2 enemies inside of your Healing Rain. */
    "Acid Rain": {id: 378443, values: [1.0],  points: 0, maxPoints: 1, icon: "spell_nature_acid_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the cooldown of Healing Stream Totem by ${X/-1000} sec. */
    "Water Totem Mastery": {id: 382030, values: [-5000.0],  points: 0, maxPoints: 1, icon: "ability_shaman_totemcooldownrefund", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* $?a455630[Surging Totem][Healing Rain] instantly restores $383223s1 health to Z allies within its area, and its radius is increased by X $Lyard:yards;. */
    "Overflowing Shores": {id: 383222, values: [2.0, 2.0, 5.0],  points: 0, maxPoints: 1, icon: "spell_nature_giftofthewaterspirit", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Targets you heal with Healing Wave, Chain Heal, or Riptide's initial heal gain Y% increased health for $207400d. */
    "Ancestral Vigor": {id: 207401, values: [0.0, 5.0],  points: 0, maxPoints: 2, icon: "spell_shaman_blessingoftheeternals", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* The cooldown of Ascendance$?a137039[ and Healing Tide Totem][] is reduced by ${X/-1000} sec. */
    "First Ascendant": {id: 462440, values: [-60000.0],  points: 0, maxPoints: 1, icon: "spell_shaman_astralshift", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your haste is increased by Y% $?a137039 [while Ascendance or Healing Tide Totem is active and their durations are][during Ascendance and its duration is] increased by ${X/1000} sec. */
    "Preeminence": {id: 462443, values: [3000.0, 25.0, 25.0],  points: 0, maxPoints: 1, icon: "spell_shaman_improvedreincarnation", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your direct heal criticals refund a percentage of your maximum mana: $<healingwave>% from Healing Wave, $<riptide>% from Riptide, and $<chainheal>% from Chain Heal. */
    "Resurgence": {id: 16196, values: [100.0],  points: 0, maxPoints: 1, icon: "ability_shaman_watershield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Stream Totem heals for X% more, decaying over its duration. */
    "Living Stream": {id: 382482, values: [100.0],  points: 0, maxPoints: 1, icon: "spell_nature_natureresistancetotem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the mana cost of Healing Wave by 15%. */
    "Current Control": {id: 1253093, values: [-15.0],  points: 0, maxPoints: 1, icon: "inv_misc_volatilewater", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your critical heals have ${Y+X}% effectiveness instead of the usual Y%. */
    "White Water": {id: 462587, values: [15.0, 200.0],  points: 0, maxPoints: 1, icon: "ability_shawaterelemental_swirl", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the mana cost of Chain Heal by X%. */
    "Calm Waters": {id: 1252841, values: [-15.0],  points: 0, maxPoints: 1, icon: "inv_10_elementalshardfoozles_water", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Stream Totem heals ${100*(1/(1+X/100)-1)}% more often. */
    "Quickstream": {id: 1253099, values: [-13.0],  points: 0, maxPoints: 1, icon: "inv_spear_04", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the cooldown of Riptide by ${X/-1000}.1 sec. */
    "Rip Current": {id: 1254251, values: [-1000.0],  points: 0, maxPoints: 1, icon: "spell_frost_summonwaterelemental", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Wave's critical strike chance is increased by X%. */
    "Crashing Waves": {id: 1253090, values: [12.0],  points: 0, maxPoints: 1, icon: "spell_nature_healingwavelesser", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Riptide's initial heal is increased X% and has a Y% increased critical strike chance. */
    "Torrent": {id: 200072, values: [20.0, 10.0],  points: 0, maxPoints: 1, icon: "spell_nature_riptide", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases Earth Shield healing by X%. */
    "Earthweaver": {id: 1254210, values: [40.0],  points: 0, maxPoints: 1, icon: "spell_nature_skinofearth", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Wave and Chain Heal heal for an additional X% on targets affected by your Healing Rain or Riptide. */
    "Deluge": {id: 200076, values: [15.0, 15.0],  points: 0, maxPoints: 1, icon: "ability_shawaterelemental_reform", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Unleash Life heals for X% more and its bonus healing effect is increased by Y%. */
    "Earthen Accord": {id: 1271104, values: [30.0, 20.0],  points: 0, maxPoints: 1, icon: "ability_evoker_earthensky", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* $?s137039[Riptide and Lava Burst have][Lava Burst has] an additional charge. */
    "Echo of the Elements": {id: 333919, values: [1.0, 1.0],  points: 0, maxPoints: 1, icon: "ability_shaman_echooftheelements", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Earthliving receives X% additional benefit from Mastery: Deep Healing.    Healing Wave always triggers Earthliving on its target. */
    "Improved Earthliving Weapon": {id: 382315, values: [150.0, 0.0],  points: 0, maxPoints: 1, icon: "spell_shaman_giftearthmother", select: true, tier: 1, runFunc: function (state: any, spellDB: 
    SpellDB, talentValues: number[], points: number) {

    }},

    /* Chain Heal bounces an additional time and its healing is increased by Y%. */
    "Ancestral Reach": {id: 382732, values: [1.0, 8.0],  points: 0, maxPoints: 1, icon: "inv_1115_shaman_chainheal", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Chain Heal bounces an additional time and casting Chain Heal on a target affected by Riptide consumes Riptide, increasing the healing of your Chain Heal by X%.     */
    "Flow of the Tides": {id: 382039, values: [30.0, 1.0],  points: 0, maxPoints: 1, icon: "spell_frost_manarecharge", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Every X casts of Riptide also applies Riptide to another friendly target near your Riptide target. */
    "Primal Tide Core": {id: 382045, values: [4.0],  points: 0, maxPoints: 1, icon: "ability_shaman_repulsiontotem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Earth Shield reduces damage taken by Z% and its healing is increased by up to X% as its target's health decreases. Maximum benefit is reached below Y% health. */
    "Earthen Harmony": {id: 382020, values: [150.0, 50.0, -3.0],  points: 0, maxPoints: 1, icon: "spell_shaman_improvedearthshield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases Downpour healing by X%. */
    "Water Expulsion": {id: 1253014, values: [20.0],  points: 0, maxPoints: 1, icon: "inv_elemental_primal_water", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* When you heal with your Healing Wave or Riptide you have a Y% chance to summon an Ancestral spirit to aid you, instantly healing an injured friendly party or raid target within 40 yards for 
    X% of the amount healed. Critical strikes increase this chance to Z%. */
    "Ancestral Awakening": {id: 382309, values: [15.0, 30.0, 60.0],  points: 0, maxPoints: 2, icon: "spell_shaman_ancestralawakening", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* When you cast $?a455630[Surging Totem][Healing Rain], each ally with your Riptide on them is healed for $462425s1. */
    "Tidewaters": {id: 462424, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_shawaterelemental_split", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* For each Riptide active on an ally, your heals are ${Y/10}.1% more effective. */
    "Undercurrent": {id: 382194, values: [0.5, 5.0, 0.5],  points: 0, maxPoints: 2, icon: "spell_fire_bluehellfire", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Spirit Link Totem reduces damage taken by an additional X%, and it restores $462384s1 health to all nearby allies $m2 $Lsecond:seconds; after it is dropped. Healing reduced beyond Z targets.   */
    "Spouting Spirits": {id: 462383, values: [-5.0, 1.0, 5.0],  points: 0, maxPoints: 1, icon: "spell_shaman_spiritlink", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases Riptide's duration by ${X/1000}.1 sec and its healing over time by Y%. */
    "Wavespeaker's Blessing": {id: 381946, values: [6000.0, 15.0],  points: 0, maxPoints: 2, icon: "inv_alchemist_81_spiritedalchemiststone", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* $?a455630[Surging Totem][Healing Rain] grants an additional use of Downpour.   */
    "Double Dip": {id: 1252882, values: [1.0],  points: 0, maxPoints: 1, icon: "spell_shaman_tidalwaves", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* X% of Healing Wave's healing from you and your ancestors is duplicated onto each of your targets with Riptide. */
    "Whispering Waves": {id: 1217598, values: [10.0],  points: 0, maxPoints: 1, icon: "shaman_pvp_ripplingwaters", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Wave and Chain Heal increase the initial healing of your next Riptide by $470077s1%, stacking up to $470077u times. */
    "Coalescing Water": {id: 470076, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_helm_mail_raidshamanmythic_s_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Casting Riptide has a Y% chance to activate Ascendance for X seconds. */
    "Deeply Rooted Elements": {id: 378270, values: [6000.0, 11.60000038147, 6.0, 7.0],  points: 0, maxPoints: 1, icon: "inv_misc_herb_liferoot_stem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Riptide has a X% chance to upgrade your next Healing Stream Totem to Stormstream Totem which heals for Y% more, heals Z additional $Lally:allies; at $s4% effectiveness, and heals $s5 injured allies for $1268684s1 healing when used. */
    "Stormstream Totem1": {id: 1267016, values: [],  points: 0, maxPoints: 4, icon: "inv12_apextalent_shaman_stormstreamtotem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Stream and Stormstream Totem healing increased by X%. */
    "Stormstream Totem2": {id: 1267093,  values: [], points: 0, maxPoints: 4, icon: "inv12_apextalent_shaman_stormstreamtotem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Casting $?s443454[Ancestral][Nature's] Swiftness grants a use of Stormstream Totem and Stormstream Totem no longer consumes a charge of Healing Stream Totem when used. */
    "Stormstream Totem3": {id: 1267120, values: [], points: 0, maxPoints: 4, icon: "inv12_apextalent_shaman_stormstreamtotem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},
}

const heroTalents: TalentTree = {
    /* $?a137040[Stormkeeper calls an Ancestor to your side for $445624d.][Unleash Life calls an Ancestor to your side for X sec.]    Whenever you cast a healing or damaging spell, the Ancestor will cast a similar spell. */
    "Call of the Ancestors": {id: 443450, values: [12.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "ability_racial_ancestralcall", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your Ancestors' spells are X% more powerful. */
    "Latent Wisdom": {id: 443449, values: [25.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_holy_spiritualguidence", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentValues: number[], points: number) {

    }},

    /* Ancestors have a X% chance to call another Ancestor for $445624d when they depart. */
    "Ancient Fellowship": {id: 443423, values: [20.0, 30.0, 6.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shaman_astralshift", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Ancestors last an additional ${X/1000} sec. */
    "Heed My Call": {id: 443444, values: [4000.0, 4.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_unused2", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, 
    talentValues: number[], points: number) {

    }},

    /* Riptide has a X% chance to call an Ancestor to your side for $445624d. */
    "Routine Communication": {id: 443445, values: [15.0, 8.0, 6.0, 40.0, 4.0, 50.0, 6.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_nature_undyingstrength", select: true, tier: 2, 
    runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Lava Burst gains an additional charge and deals Y% increased damage.$?a137039[    Riptide gains an additional charge and heals for Z% more.][] */
    "Elemental Reverb": {id: 443418, values: [1.0, 10.0, 20.0, 20.0, 1.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "ability_shaman_echooftheelements", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your Intellect is increased by ${X}.1% for each Ancestor active. */
    "Ancestral Influence": {id: 1270446, values: [1.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "shaman_pvp_leaderclan", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Chain Heal now jumps to a nearby totem within $458357A3 yards once it reaches its last target, causing the totem to cast Chain Heal on an injured ally within $458357r yards for $458357s1. Jumps to X nearby targets within $458357A3 yards. */
    "Totemic Rebound": {id: 445025, values: [2.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_vehicle_electrocharge", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* While Surging Totem is active, your damage and healing done is increased by $456369s1%. */
    "Amplification Core": {id: 445029, values: [0.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_evoker_essenceburststacks", select: true, tier: 2, runFunc: function (state: any, 
    spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Surging Totem $?a462110[heals for X% more][deals Y% more damage] while Ascendance or Healing Tide Totem is active. */
    "Oversurge": {id: 445030, values: [150.0, 50.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_fire_elementaldevastation", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* When you summon a Healing Tide Totem, Healing Stream Totem, or Spirit Link Totem you cast a free instant Chain Heal at $458221s2% effectiveness. */
    "Lively Totems": {id: 445034, values: [0.0, 0.0, 5.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_fire_searingtotem", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the cooldown of Healing Stream Totem by ${Z/-1000} sec. */
    "Totemic Momentum": {id: 1260644, values: [200.0, 10.0, -3000.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_frost_fireresistancetotem", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* When an Ancestor is called, they reduce the cooldown of $?a137040[Stormkeeper by ${X/-1000} sec.][Riptide by ${Y/-1000} sec.] */
    "Offering from Beyond": {id: 443451, values: [-3000.0, -2000.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shaman_blessingoftheeternals", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases your maximum $?a137040[Maelstrom by X.][mana by Y%.] */
    "Primordial Capacity": {id: 443448, values: [25.0, 10.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "ability_monk_chiswirl", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* The cast times of $?c1[Healing Surge, Chain Heal and][Healing Wave, Chain Heal, and] Lava Burst are reduced by X%. */
    "Windspeaker": {id: 1270447, values: [-10.0, -10.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "achievement_raidprimalist_windelemental", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* If you have a totem active, your totem grants you a shield absorbing ${$mhp*X/100} damage for $457387d every $457390d. */
    "Wind Barrier": {id: 445031, values: [6.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_nature_eyeofthestorm", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Your Healing Stream Totems heals an additional ally at Z% effectiveness. Healing Tide Totem healing increased by Y%. */
    "Splitstream": {id: 445035, values: [80.0, 25.0, 30.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_rhyolith_lavapool", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Mastery increased by X%. */
    "Elemental Attunement": {id: 1263288, values: [2.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "inv_10_elementalcombinedfoozles_primordial", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Reduces the cooldown of Nature's Guardian by ${X/-1000} sec and causes it to heal for an additional Y% of your maximum health. */
    "Natural Harmony": {id: 443442, values: [-15000.0, 10.0, 50.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_nature_natureguardian", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Earth Shield has an additional X charges and heals you for Z% more. */
    "Earthen Communion": {id: 443441, values: [3.0, 3.0, 25.0, -3.0, -3.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_nature_skinofearth", select: true, tier: 2, runFunc: function 
    (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases the healing done by Healing Wave, Downpour, and Chain Heal by Y%. */
    "Maelstrom Supremacy": {id: 443447, values: [25.0, 25.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_2", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* When an Ancestor departs, they cast Hydrobubble on a nearby injured ally. */
    "Final Calling": {id: 443446, values: [0.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shaman_ancestralawakening", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* $?c3[For $1270453d sec after casting Nature's Swiftness or Ancestral Swiftness, the recharge rate of Riptide is increased by $1270453s1%.    ][]Increases the chance for Lava Surge to occur by X%. */
    "Mystic Knowledge": {id: 1270450, values: [20.0], heroTree: "Farseer", points: 0, maxPoints: 1, icon: "achievement_raidprimalist_council", select: true, tier: 2, runFunc: function (state: any, 
    spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Increases the duration of your Earthliving effect by ${Z/1000} sec. */
    "Imbuement Mastery": {id: 445028, values: [5.0, 8.0, 3000.0, 1.0, 300.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_shaman_unleashweapon_wind", select: true, tier: 2, runFunc: 
    function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* $?a137041[Increases the damage of Surging Totem by X%.][Increases the healing done by Surging Totem by Y%.] */
    "Pulse Capacitor": {id: 445032, values: [18.0, 25.0, 18.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_nature_elementalprecision_1", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Learn a new weapon imbue, Tidecaller's Guard.  */
    "Supportive Imbuements": {id: 445033, values: [25.0, 100.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_shaman_fortifyingwaters", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Chain Heals from Lively Totem and Totemic Rebound are Z% more effective. */
    "Totemic Coordination": {id: 445036, values: [15.0, 30.0, 25.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_shaman_echooftheelements", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Allies affected by your Earthliving effect receive Z% increased healing from you. */
    "Earthsurge": {id: 455590, values: [125.0, 40.0, 15.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "inv_elementalearth2", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Healing Stream Totem and Healing Tide Totem healing has a Y% chance to apply Earthliving to allies it heals. */
    "Primal Catalyst": {id: 1260874, values: [150.0, 8.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "misc_legionfall_shaman", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},

    /* Elemental Motes orbit your Surging Totem. Your abilities can consume them for the following effects: Earth Mote: Your next Chain Heal applies Earthliving at 150% effectiveness to all targets hit. Air: The cast time of your next healing spell is reduced by 40%. Water: Your next Healing Wave also heals an ally inside your healing rain at 100% effectiveness. */
    "Whirling Elements": {id: 445024, values: [0.0], heroTree: "Totemic", points: 0, maxPoints: 1, icon: "inv_10_enchanting2_elementalswirl_color1", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentValues: number[], points: number) {

    }},
}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};