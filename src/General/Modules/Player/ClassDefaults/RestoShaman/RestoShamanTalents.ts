

const classTalents: TalentTree = {
    /* Increases all Fire and Frost damage you deal by X%. */
    "Fire and Ice": {points: 0, maxPoints: 1, icon: "spell_firefrost_orb", id: 382886, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases the number of Elemental Shields you can have active on yourself by 1.    You can have Earth Shield on yourself and one ally at the same time. */
    "Elemental Orbit": {points: 0, maxPoints: 1, icon: "ability_mage_shattershield", id: 383010, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Stamina increased by X%.    While you are at full health, Reincarnation cools down Y% faster. */
    "Brimming with Life": {points: 0, maxPoints: 2, icon: "inv_jewelry_talisman_06", id: 381689, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Mastery increased by X%. */
    "Spiritual Awakening": {points: 0, maxPoints: 1, icon: "spell_shaman_blessingoftheeternals", id: 1270375, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* The effects of your weapon $?a137041[][and shield ]imbues are increased by $?c1[X]?c2[Y]?c3[Z][]%. */
    "Enhanced Imbues": {points: 0, maxPoints: 1, icon: "spell_nature_rockbiter", id: 462796, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Healing $?a137039[Wave][Surge] is X% more effective on yourself.   */
    "Refreshing Waters": {points: 0, maxPoints: 1, icon: "ability_shaman_fortifyingwaters", id: 378211, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases the critical strike chance of your Nature spells and abilities by X%. */
    "Nature's Fury": {points: 0, maxPoints: 2, icon: "spell_nature_spiritarmor", id: 381655, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases the radius of your totem effects by Z%.    Increases the duration of your Earthbind and Earthgrab Totems by ${X/1000} sec.    Increases the duration of your $?s157153[Cloudburst][Healing Stream], Tremor, Poison Cleansing, $?s137039[Ancestral Protection, Earthen Wall, ][]and Wind Rush Totems by ${Y/1000}.1 sec. */
    "Totemic Focus": {points: 0, maxPoints: 1, icon: "inv_relics_totemofrebirth", id: 382201, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Lava Burst and Riptide casts restore X mana to you and four allies. Allies can only benefit from one Mana Spring effect at a time. */
    "Mana Spring": {points: 0, maxPoints: 1, icon: "spell_nature_manaregentotem", id: 381930, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Earth Shield $?c3[and Water Shield no longer lose charges and are][no longer loses charges and is] ${100+X}% effective. */
    "Therazane's Resilience": {points: 0, maxPoints: 1, icon: "shaman_pvp_rockshield", id: 1217622, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* When refreshing Earth Shield, your target is healed for $462477s1 for each stack of Earth Shield they are missing.$?c3[    When refreshing Water Shield, you are refunded $462479s1 mana for each stack of Water Shield missing.][]    Additionally, Earth Shield$?c3[ and Water Shield][] can consume charges ${Y/-1000}.1 sec faster. */
    "Reactive Warding": {points: 0, maxPoints: 1, icon: "inv_10_elementalcombinedfoozles_water", id: 462454, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the cooldown of most totems by ${X/-1000} sec. */
    "Totemic Surge": {points: 0, maxPoints: 1, icon: "spell_nature_agitatingtotem", id: 381867, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c3[Water][Lightning] Shield increases your $?c2[Agility][Intellect] by X%.    Casting $?c3[Water][Lightning] Shield also applies Earth Shield to yourself and any weapon imbuements if known. */
    "Instinctive Imbuements": {points: 0, maxPoints: 1, icon: "ability_shaman_ascendance", id: 1270350, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},
}

const specTalents: TalentTree = {
    /* Increases the healing done by $?a455630[Surging Totem by X%.][Healing Rain by X% and reduces its cast time by ${Y/-1000}.1 sec.] */
    "Soothing Rain": {points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_2", id: 1252874, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Deal ${$378597s1*X} Nature damage every $378463t1 sec to up to $378597s2 enemies inside of your Healing Rain. */
    "Acid Rain": {points: 0, maxPoints: 1, icon: "spell_nature_acid_01", id: 378443, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the cooldown of Healing Stream Totem by ${X/-1000} sec. */
    "Water Totem Mastery": {points: 0, maxPoints: 1, icon: "ability_shaman_totemcooldownrefund", id: 382030, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?a455630[Surging Totem][Healing Rain] instantly restores $383223s1 health to Z allies within its area, and its radius is increased by X $Lyard:yards;. */
    "Overflowing Shores": {points: 0, maxPoints: 1, icon: "spell_nature_giftofthewaterspirit", id: 383222, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Targets you heal with Healing Wave, Chain Heal, or Riptide's initial heal gain Y% increased health for $207400d. */
    "Ancestral Vigor": {points: 0, maxPoints: 2, icon: "spell_shaman_blessingoftheeternals", id: 207401, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* The cooldown of Ascendance$?a137039[ and Healing Tide Totem][] is reduced by ${X/-1000} sec. */
    "First Ascendant": {points: 0, maxPoints: 1, icon: "spell_shaman_astralshift", id: 462440, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your haste is increased by Y% while Ascendance$?a137039[ or Healing Tide Totem is active and their durations are][ its duration is] increased by ${X/1000} sec. */
    "Preeminence": {points: 0, maxPoints: 1, icon: "spell_shaman_improvedreincarnation", id: 462443, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your direct heal criticals refund a percentage of your maximum mana: $<healingwave>% from Healing Wave, $<riptide>% from Riptide, and $<chainheal>% from Chain Heal. */
    "Resurgence": {points: 0, maxPoints: 1, icon: "ability_shaman_watershield", id: 16196, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Healing Stream Totem heals for X% more, decaying over its duration. */
    "Living Stream": {points: 0, maxPoints: 1, icon: "spell_nature_natureresistancetotem", id: 382482, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the mana cost of Healing Wave by 15%. */
    "Current Control": {points: 0, maxPoints: 1, icon: "inv_misc_volatilewater", id: 1253093, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your critical heals have ${Y+X}% effectiveness instead of the usual Y%. */
    "White Water": {points: 0, maxPoints: 1, icon: "ability_shawaterelemental_swirl", id: 462587, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the mana cost of Chain Heal by X%. */
    "Calm Waters": {points: 0, maxPoints: 1, icon: "inv_10_elementalshardfoozles_water", id: 1252841, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Healing Stream Totem heals ${100*(1/(1+X/100)-1)}% more often. */
    "Quickstream": {points: 0, maxPoints: 1, icon: "inv_spear_04", id: 1253099, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the cooldown of Riptide by ${X/-1000}.1 sec. */
    "Rip Current": {points: 0, maxPoints: 1, icon: "spell_frost_summonwaterelemental", id: 1254251, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Healing Wave's critical strike chance is increased by X%. */
    "Crashing Waves": {points: 0, maxPoints: 1, icon: "spell_nature_healingwavelesser", id: 1253090, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Riptide's initial heal is increased X% and has a Y% increased critical strike chance. */
    "Torrent": {points: 0, maxPoints: 1, icon: "spell_nature_riptide", id: 200072, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases Earth Shield healing by X%. */
    "Earthweaver": {points: 0, maxPoints: 1, icon: "spell_nature_skinofearth", id: 1254210, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Healing Wave and Chain Heal heal for an additional X% on targets affected by your Healing Rain or Riptide. */
    "Deluge": {points: 0, maxPoints: 1, icon: "ability_shawaterelemental_reform", id: 200076, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Unleash Life heals for X% more and its bonus healing effect is increased by Y%. */
    "Earthen Accord": {points: 0, maxPoints: 1, icon: "ability_evoker_earthensky", id: 1271104, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?s137039[Riptide and Lava Burst have][Lava Burst has] an additional charge. */
    "Echo of the Elements": {points: 0, maxPoints: 1, icon: "ability_shaman_echooftheelements", id: 333919, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Earthliving receives X% additional benefit from Mastery: Deep Healing.    Healing Wave always triggers Earthliving on its target. */
    "Improved Earthliving Weapon": {points: 0, maxPoints: 1, icon: "spell_shaman_giftearthmother", id: 382315, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Chain Heal bounces an additional time and its healing is increased by Y%. */
    "Ancestral Reach": {points: 0, maxPoints: 1, icon: "inv_1115_shaman_chainheal", id: 382732, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Chain Heal bounces an additional time and casting Chain Heal on a target affected by Riptide consumes Riptide, increasing the healing of your Chain Heal by X%.     */
    "Flow of the Tides": {points: 0, maxPoints: 1, icon: "spell_frost_manarecharge", id: 382039, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Every X casts of Riptide also applies Riptide to another friendly target near your Riptide target. */
    "Primal Tide Core": {points: 0, maxPoints: 1, icon: "ability_shaman_repulsiontotem", id: 382045, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Earth Shield reduces damage taken by Z% and its healing is increased by up to X% as its target's health decreases. Maximum benefit is reached below Y% health. */
    "Earthen Harmony": {points: 0, maxPoints: 1, icon: "spell_shaman_improvedearthshield", id: 382020, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases Downpour healing by X%. */
    "Water Expulsion": {points: 0, maxPoints: 1, icon: "inv_elemental_primal_water", id: 1253014, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* When you heal with your Healing Wave or Riptide you have a Y% chance to summon an Ancestral spirit to aid you, instantly healing an injured friendly party or raid target within 40 yards for X% of the amount healed. Critical strikes increase this chance to Z%. */
    "Ancestral Awakening": {points: 0, maxPoints: 2, icon: "spell_shaman_ancestralawakening", id: 382309, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* When you cast $?a455630[Surging Totem][Healing Rain], each ally with your Riptide on them is healed for $462425s1. */
    "Tidewaters": {points: 0, maxPoints: 1, icon: "ability_shawaterelemental_split", id: 462424, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* For each Riptide active on an ally, your heals are ${Y/10}.1% more effective. */
    "Undercurrent": {points: 0, maxPoints: 2, icon: "spell_fire_bluehellfire", id: 382194, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Spirit Link Totem reduces damage taken by an additional X%, and it restores $462384s1 health to all nearby allies $m2 $Lsecond:seconds; after it is dropped. Healing reduced beyond Z targets.   */
    "Spouting Spirits": {points: 0, maxPoints: 1, icon: "spell_shaman_spiritlink", id: 462383, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases Riptide's duration by ${X/1000}.1 sec and its healing over time by Y%. */
    "Wavespeaker's Blessing": {points: 0, maxPoints: 2, icon: "inv_alchemist_81_spiritedalchemiststone", id: 381946, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {
    }},

    /* $?a455630[Surging Totem][Healing Rain] grants an additional use of Downpour.   */
    "Double Dip": {points: 0, maxPoints: 1, icon: "spell_shaman_tidalwaves", id: 1252882, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* X% of Healing Wave's healing from you and your ancestors is duplicated onto each of your targets with Riptide. */
    "Whispering Waves": {points: 0, maxPoints: 1, icon: "shaman_pvp_ripplingwaters", id: 1217598, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Chain Heal's mana cost is reduced by X% and Chain Heal increases the initial healing of your next Riptide by $470077s1%, stacking up to $470077u times. */
    "Coalescing Water": {points: 0, maxPoints: 1, icon: "inv_helm_mail_raidshamanmythic_s_01", id: 470076, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Casting Riptide has a Y% chance to activate Ascendance for X seconds. */
    "Deeply Rooted Elements": {points: 0, maxPoints: 1, icon: "inv_misc_herb_liferoot_stem", id: 378270, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Riptide has a X% chance to upgrade your next Healing Stream Totem to Stormstream Totem which heals for Y% more, heals Z additional $Lally:allies; at $s4% effectiveness, and heals $s5 injured allies for $1268684s1 healing when used. */
    "Stormstream Totem I": {points: 0, maxPoints: 1, icon: "ability_shaman_manatidetotem", id: 1267016, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Healing Stream and Stormstream Totem healing increased by X%. */
    "Stormstream Totem II": {points: 0, maxPoints: 2, icon: "ability_shaman_manatidetotem", id: 1267093, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Stormstream Totem is usable for free and ignore its cooldown when available. */
    "Stormstream Totem III": {points: 0, maxPoints: 1, icon: "ability_shaman_manatidetotem", id: 1267120, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},
}

const heroTalents: TalentTree = {
    // Farseer
    /* Unleash Life calls an Ancestor to your side for X sec. Whenever you cast a healing or damaging spell, the Ancestor will cast a 
    similar spell. */
    "Call of the Ancestors": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "ability_racial_ancestralcall", id: 443450, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: 
    number) {

    }},

    /* Your Ancestors' spells are X% more powerful. */
    "Latent Wisdom": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_holy_spiritualguidence", id: 443449, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) 
    {

    }},

    /* Ancestors have a X% chance to call another Ancestor for $445624d when they depart. */
    "Ancient Fellowship": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shaman_astralshift", id: 443423, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Ancestors last an additional ${X/1000} sec. */
    "Heed My Call": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_unused2", id: 443444, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Riptide has a X% chance to call an Ancestor to your side for $445624d. */
    "Routine Communication": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_nature_undyingstrength", id: 443445, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: 
    number) {

    }},

    /* Lava Burst gains an additional charge and deals Y% increased damage.$?a137039[    Riptide gains an additional charge and heals for Z% more.][] */
    "Elemental Reverb": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "ability_shaman_echooftheelements", id: 443418, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Intellect is increased by ${X}.1% for each Ancestor active. */
    "Ancestral Influence": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "shaman_pvp_leaderclan", id: 1270446, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) 
    {

    }},

    /* Chain Heal now jumps to a nearby totem within $458357A3 yards once it reaches its last target, causing the totem to cast Chain Heal on an injured ally within $458357r yards for $458357s1. Jumps to X 
    nearby targets within $458357A3 yards. */
    "Totemic Rebound": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_vehicle_electrocharge", id: 445025, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* While Surging Totem is active, your damage and healing done is increased by $456369s1%. */
    "Amplification Core": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_evoker_essenceburststacks", id: 445029, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Surging Totem $?a462110[heals for X% more][deals Y% more damage] while Ascendance or Healing Tide Totem is active. */
    "Oversurge": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_fire_elementaldevastation", id: 445030, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {
    }},

    /* When you summon a Healing Tide Totem, Healing Stream Totem, or Spirit Link Totem you cast a free instant Chain Heal at $458221s2% effectiveness. */
    "Lively Totems": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_fire_searingtotem", id: 445034, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the cooldown of Healing Stream Totem by ${Z/-1000} sec. */
    "Totemic Momentum": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_frost_fireresistancetotem", id: 1260644, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* When an Ancestor is called, they reduce the cooldown of $?a137040[Stormkeeper by ${X/-1000} sec.][Riptide by ${Y/-1000} sec.] */
    "Offering from Beyond": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shaman_blessingoftheeternals", id: 443451, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases your maximum $?a137040[Maelstrom by X.][mana by Y%.] */
    "Primordial Capacity": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "ability_monk_chiswirl", id: 443448, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {
    }},

    /* The cast times of $?c1[Healing Surge, Chain Heal and][Healing Wave, Chain Heal, and] Lava Burst are reduced by X%. */
    "Windspeaker": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "achievement_raidprimalist_windelemental", id: 1270447, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* If you have a totem active, your totem grants you a shield absorbing ${$mhp*X/100} damage for $457387d every $457390d. */
    "Wind Barrier": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_nature_eyeofthestorm", id: 445031, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Healing Stream Totems heals an additional ally at Z% effectiveness. Healing Tide Totem healing increased by Y%. */
    "Splitstream": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_rhyolith_lavapool", id: 445035, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Mastery increased by X%. */
    "Elemental Attunement": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "inv_10_elementalcombinedfoozles_primordial", id: 1263288, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reduces the cooldown of Nature's Guardian by ${X/-1000} sec and causes it to heal for an additional Y% of your maximum health. */
    "Natural Harmony": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_nature_natureguardian", id: 443442, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Earth Shield has an additional X charges and heals you for Z% more. */
    "Earthen Communion": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_nature_skinofearth", id: 443441, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) 
    {

    }},

    /* Increases the healing done by Healing Wave, Downpour, and Chain Heal by Y%. */
    "Maelstrom Supremacy": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_2", id: 443447, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* When an Ancestor departs, they cast Hydrobubble on a nearby injured ally. */
    "Final Calling": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "spell_shaman_ancestralawakening", id: 443446, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c3[For $1270453d sec after casting Nature's Swiftness or Ancestral Swiftness, the recharge rate of Riptide is increased by $1270453s1%.    ][]Increases the chance for Lava Surge to occur by X%. */
    "Mystic Knowledge": {heroTree: "Farseer", points: 0, maxPoints: 1, icon: "achievement_raidprimalist_council", id: 1270450, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases the duration of your Earthliving effect by ${Z/1000} sec. */
    "Imbuement Mastery": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_shaman_unleashweapon_wind", id: 445028, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?a137041[Increases the damage of Surging Totem by X%.][Increases the healing done by Surging Totem by Y%.] */
    "Pulse Capacitor": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "spell_nature_elementalprecision_1", id: 445032, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Learn a new weapon imbue, Tidecaller's Guard.  */
    "Supportive Imbuements": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_shaman_fortifyingwaters", id: 445033, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Chain Heals from Lively Totem and Totemic Rebound are Z% more effective. */
    "Totemic Coordination": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "ability_shaman_echooftheelements", id: 445036, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Allies affected by your Earthliving effect receive Z% increased healing from you. */
    "Earthsurge": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "inv_elementalearth2", id: 455590, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Healing Stream Totem and Healing Tide Totem healing has a Y% chance to apply Earthliving to allies it heals. */
    "Primal Catalyst": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "misc_legionfall_shaman", id: 1260874, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {  

    }},

    /* Elemental Motes orbit your Surging Totem. Your abilities can consume them for the following effects: Earth Mote: Your next Chain Heal applies Earthliving at 150% effectiveness to all targets hit. Air: The cast time of your next healing spell is reduced by 40%. Water: Your next Healing Wave also heals an ally inside your healing rain at 100% effectiveness. */
    "Whirling Elements": {heroTree: "Totemic", points: 0, maxPoints: 1, icon: "inv_10_enchanting2_elementalswirl_color1", id: 445024, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, 
    points: number) {

    }},
}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};