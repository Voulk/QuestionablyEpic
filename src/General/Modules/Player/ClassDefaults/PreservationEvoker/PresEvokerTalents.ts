

const specTalents: TalentTree = {
    /* Each cast of a Bronze spell causes your next empower spell to reach maximum level in X% less time, stacking up to $362877u times. */
    "Temporal Compression": {points: 0, maxPoints: 1, icon: "ability_evoker_rewind2", id: 362874, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Living Flame has a X% chance, and Reversion has a Y% chance to make your next Essence ability free.$?s375722[ Stacks $359618u times.][] */
    "Essence Burst": {points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst", id: 369297, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Verdant Embrace temporarily bonds your life with an ally, causing your healing on either partner to heal the other for X% of the amount. Lasts $373267d. */
    "Lifebind": {points: 0, maxPoints: 1, icon: "ability_evoker_hoverred", id: 373270, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Essence Burst stacks ${X+1} times. */
    "Essence Attunement": {points: 0, maxPoints: 1, icon: "ability_evoker_essenceburststacks", id: 375722, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your empower spells are X% more effective. While charging a healing empower spell, you cannot be knocked back. */
    "Unshakable": {points: 0, maxPoints: 1, icon: "ability_evoker_masterygiantkiller", id: 1239581, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Emerald Blossom sends out flying seedlings when it bursts, healing X $Lally:allies; up to Y yds away for $361361s1. */
    "Fluttering Seedlings": {points: 0, maxPoints: 2, icon: "inv_herbalism_70_yserallineseed", id: 359793, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your empower spells' maximum level is increased by 1. */
    "Font of Magic": {points: 0, maxPoints: 1, icon: "ability_evoker_fontofmagic", id: 375783, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reversion instantly heals the target for X% of damage taken in the last Y sec. */
    "Golden Hour": {points: 0, maxPoints: 1, icon: "inv_belt_armor_waistoftime_d_01", id: 378196, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Empower spells increase your Essence regeneration rate by $370840s1% for $370840d. */
    "Empath": {points: 0, maxPoints: 1, icon: "ability_evoker_powernexus2", id: 376138, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Dream Breath's cooldown is reduced by ${X/-1000} sec. */
    "Spiritual Clarity": {points: 0, maxPoints: 1, icon: "ability_evoker_spiritbloom", id: 376150, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Each time you gain Essence Burst, your critical heals are ${X+200}% effective instead of the usual 200% for $377102d. */
    "Exhilarating Burst": {points: 0, maxPoints: 2, icon: "ability_evoker_essenceburst3", id: 377100, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Every other Emerald Blossom has a X% chance for one of your Fluttering Seedlings to grow into a new Emerald Blossom. */
    "Field of Dreams": {points: 0, maxPoints: 1, icon: "inv_misc_herb_chamlotus", id: 370062, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Increases your maximum Essence to $<max>. */
    "Power Nexus": {points: 0, maxPoints: 1, icon: "ability_evoker_powernexus", id: 369908, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Echo replicates X% more healing. */
    "Time Lord": {points: 0, maxPoints: 2, icon: "ability_evoker_innatemagic4", id: 372527, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Empower spells cause time to flow X% faster for you, increasing movement speed, cooldown recharge rate, and cast speed. Lasts $390148d. */
    "Flow State": {points: 0, maxPoints: 2, icon: "ability_evoker_timespiral", id: 385696, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Temporal Anomaly applies Echo at X% effectiveness to the first Y allies it passes through. */
    "Resonating Sphere": {points: 0, maxPoints: 1, icon: "ability_evoker_bronze_01", id: 376236, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Temporal Anomaly reduces the cooldowns of your empower spells by X sec. */
    "Nozdormu's Teachings": {points: 0, maxPoints: 1, icon: "inv_misc_head_dragon_bronze", id: 376237, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Dream Breath healing increased by X%, and Living Flame healing increased by Y%. */
    "Call of Ysera": {points: 0, maxPoints: 1, icon: "inv_drakemountemerald", id: 373834, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your healing is increased by X% on targets with your Reversion. */
    "Grace Period": {points: 0, maxPoints: 1, icon: "ability_evoker_reversion_green", id: 376239, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Consuming a full Temporal Compression grants you Essence Burst. */
    "Spark of Insight": {points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst5", id: 377099, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Casting Echo grants one stack of Ouroboros, increasing the healing of your next Emerald Blossom by $387350s1%, stacking up to $387350u times. */
    "Ouroboros": {points: 0, maxPoints: 1, icon: "ability_evoker_ouroboros", id: 381921, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath heals Z nearby injured allies for X% of damage done to up to Y targets, split evenly among them. */
    "Life-Giver's Flame": {points: 0, maxPoints: 1, icon: "item_sparkofragnoros", id: 371426, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* For $?s359816[Y sec after casting Dream Flight][Z sec after casting Stasis], your healing over time is increased by $1242747s1% and your chance to cause Essence Burst is increased by $1242747s2%. */
    "Inner Flame": {points: 0, maxPoints: 1, icon: "ability_evoker_infernosblessing", id: 1242745, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Rewind's cooldown is reduced by ${X/-1000} sec. */
    "Temporal Artificer": {points: 0, maxPoints: 1, icon: "ability_evoker_rewind", id: 381922, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Disintegrate deals Y% more damage and generates ${$372234s1*4} mana over its duration. */
    "Energy Loop": {points: 0, maxPoints: 1, icon: "inv_elemental_mote_mana", id: 372233, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* When you or an ally fall below X% health, a version of yourself enters your timeline and heals them for $361195s1. Your alternate self continues healing for $368415d before returning to their timeline.    May only occur once every Y sec. */
    "Time of Need": {points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder_bronze", id: 368412, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Dream Breath healing is increased by X%. */
    "Renewing Breath": {points: 0, maxPoints: 2, icon: "ability_evoker_dreambreath", id: 371257, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Living Flame and Fire Breath deal additional damage and healing equal to ${X}.1% of your maximum health. */
    "Lifeforce Mender": {points: 0, maxPoints: 2, icon: "ability_evoker_dragonrage2", id: 376179, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reversion, Time Dilation, Echo, and Temporal Anomaly last X% longer and cost Y% less mana. */
    "Timeless Magic": {points: 0, maxPoints: 2, icon: "inv_artifact_xp05", id: 376240, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Essence Burst increases the effectiveness of your next Essence ability by X%. */
    "Titan's Gift": {points: 0, maxPoints: 1, icon: "spell_fireresistancetotem_01", id: 443264, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reversion healing has a chance to cause your next Living Flame to cast instantly and deal Y% increased healing or damage. Stacks up to $394552u charges. */
    "Lifespark": {points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder_red", id: 443177, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Casting Emerald Blossom causes your next Echo to cast on an additional ally within X yards at Y% effectiveness. */
    "Twin Echoes": {points: 0, maxPoints: 1, icon: "inv_ability_evoker_greaterecho", id: 1242031, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Bronze healing and absorption increased by X%. */
    "Tempo Charged": {points: 0, maxPoints: 1, icon: "classicon_evoker_preservation", id: 1237978, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Reversion protects allies, reversing X% of all damage taken and healing them instead. */
    "Merithra's Blessing": {points: 0, maxPoints: 2, icon: "ability_evoker_reversion_green", id: 1256682, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Essence abilities have a chance to infuse your next Reversion with the power of the Green Dragonflight, upgrading it to Merithra's Blessing:    $@spellicon1256581 $@spellname1256581  $@spelldesc1256581 */
    "Merithra's Blessing II": {points: 0, maxPoints: 1, icon: "achievement_boss_valithradreamwalker", id: 1256577, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Dream Breath's instant healing is increased by X% and Dream Breath has a Y% chance to grant Merithra's Blessing. */
    "Merithra's Blessing III": {points: 0, maxPoints: 1, icon: "ability_evoker_giftoftheaspects", id: 1256689, select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},
}

const classTalents: TalentTree = {
    /* Disintegrate channels X% faster$?c3[ and Eruption's cast time is reduced by Z%][]. */
    "Natural Convergence": {points: 0, maxPoints: 1, icon: "spell_frost_frostblast", id: 369913, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Essence regenerates X% faster. */
    "Innate Magic": {points: 0, maxPoints: 2, icon: "ability_evoker_innatemagic4", id: 375520, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Living Flame deals X% more damage and healing. */
    "Enkindled": {points: 0, maxPoints: 2, icon: "ability_evoker_livingflame", id: 375554, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Store X% of your effective healing, up to $<cap>. Your next damaging Living Flame consumes all stored healing to increase its damage dealt. */
    "Scarlet Adaptation": {points: 0, maxPoints: 1, icon: "inv_bijou_red", id: 372469, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Living Flame and Emerald Blossom are X% more effective on yourself. */
    "Inner Radiance": {points: 0, maxPoints: 1, icon: "spell_holy_spellwarding", id: 386405, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Tail Swipe's cooldown is reduced by ${X/-60000} min. */
    "Clobbering Sweep": {points: 0, maxPoints: 1, icon: "ability_racial_tailswipe", id: 375443, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Casting Emerald Blossom or Verdant Embrace reduces the cast time of your next Living Flame by $375583s1%. */
    "Ancient Flame": {points: 0, maxPoints: 1, icon: "inv_elemental_mote_fire01", id: 369990, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Magic damage done is increased by X%. */
    "Instinctive Arcana": {points: 0, maxPoints: 2, icon: "spell_arcane_studentofmagic", id: 376164, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your healing done and healing received are increased by X%. */
    "Attuned to the Dream": {points: 0, maxPoints: 2, icon: "ability_rogue_imrovedrecuperate", id: 376930, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Azure Strike damages X additional $Lenemy:enemies;. */
    "Protracted Talons": {points: 0, maxPoints: 1, icon: "ability_evoker_azurestrike", id: 369909, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Stamina is increased by X%. */
    "Draconic Legacy": {points: 0, maxPoints: 1, icon: "inv_helm_mail_dracthyrquest_b_02", id: 376166, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Emerald Blossom heals X additional allies. */
    "Bountiful Bloom": {points: 0, maxPoints: 1, icon: "ability_evoker_emeraldblossom", id: 370886, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your Leech is increased by X%. */
    "Regenerative Magic": {points: 0, maxPoints: 1, icon: "spell_frost_manarecharge", id: 387787, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath's damage over time lasts X sec longer. */
    "Blast Furnace": {points: 0, maxPoints: 1, icon: "ability_evoker_firebreath", id: 375510, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Obsidian Scales surrounds you with a Renewing Blaze, causing X% of the damage it reduced to be healed back over $374349d. */
    "Renewing Blaze": {points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder_red", id: 374348, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Emerald Blossom and Verdant Embrace instantly heal you for $387763s1 when cast. */
    "Panacea": {points: 0, maxPoints: 1, icon: "ability_druid_protectionofthegrove", id: 387761, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Renewing Blaze restores you more quickly, causing damage you take to be healed back over $<newDur> sec. */
    "Foci of Life": {points: 0, maxPoints: 1, icon: "spell_fire_incinerate", id: 375574, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Green spells restore X% more health. */
    "Lush Growth": {points: 0, maxPoints: 2, icon: "inv_staff_2h_bloodelf_c_01", id: 375561, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath causes your next Living Flame to strike 1 additional target per empower level. */
    "Leaping Flames": {points: 0, maxPoints: 1, icon: "ability_evoker_pupilofalexstraza", id: 369939, select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},
}

const heroTalents: TalentTree = {
    // Flameshaper
    /* $?c1[Fire Breath gains][Dream Breath and Fire Breath gain] an additional charge. */
    "Legacy of the Lifebinder": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_dragonrage2", id: 1264269, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c1[Hover and Deep Breath][Hover, Deep Breath, and Dream Flight] travel X% faster, and Hover travels X% further. */
    "Trailblazer": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_deathwing_fierygrip", id: 444849, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Tail Swipe and Wing Buffet scorch enemies and blind them with ash, causing their next attack within $445134d to miss. */
    "Shape of Flame": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_mage_flamecannon", id: 445074, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath's cooldown is reduced by ${X/-1000} sec. */
    "Ashes in Motion": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_ability_flameshaperevoker_engulf", id: 1264365, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Essence abilities are enhanced with Flame, dealing X% of healing or damage done as Fire over 8 sec. */
    "Enkindle": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_10_elementalcombinedfoozles_purifiedshadowflame", id: 444016, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath's damage over time is increased by X%. Dream Breath's heal over time is increased by X%. */
    "Expanded Lungs": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_fyrakk_dragonbreath", id: 444845, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) 
    {

    }},

    /* $?c1[Fire Breath has][Dream Breath and Fire Breath have] a X% chance to generate Essence Burst. */
    "Essence Well": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst4", id: 1265993, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Critical strike chance against targets above Y% health increased by X%. */
    "Conduit of Flame": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_innatemagic5", id: 444843, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath $?c1[reaches its][and Dream Breath reach their] maximum empower level X% faster. */
    "Burning Adrenaline": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_gauntlets_03", id: 444020, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c1[Fire Breath deals its damage][Fire Breath and Dream Breath deal their damage and healing] X% more often. */
    "Fulminous Roar": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_oppressingroar2", id: 1218447, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: 
    number) {

    }},

    /* Consuming Essence Burst fires a twin flame, $?c1[striking your target for $1265980s1 Fire damage][healing your target for $1265991s1]. */
    "Twin Flame": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_infernosblessing", id: 1265979, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Living Flame $?c1[and Azure Strike have X extra chance to trigger Essence Burst when they critically strike.][has X extra chance to trigger Essence Burst when it critically strikes.] */
    "Titanic Precision": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_10_misc_titansspark_shadowflame", id: 445625, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Fire Breath's damage over time lasts X sec longer.$?c2[    Dream Breath's heal over time lasts ${Y/1000} sec longer.][] */
    "Deep Exhalation": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_firebreath", id: 1264321, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Renewing Blaze also applies to your target or X nearby injured $Lally:allies; at Y% value. */
    "Lifecinders": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_misc_herb_cinderbloom_petal", id: 444322, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Your wounds have a small chance to cauterize, healing you for X% of damage taken. Occurs more often from attacks that deal high damage. */
    "Draconic Instincts": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_misc_scales_basilliskorange", id: 445958, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Twin Flame bounces to up to X additional targets. */
    "Fire Torrent": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "spell_shaman_stormearthfire", id: 1265992, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Verdant Embrace healing consumes 4 sec of Dream Breath from allies it heals, detonating it and healing them for 200% of the amount consumed. Verdant Embrace healing consumes 4 sec of Dream Breath from allies it heals, detonating it and healing them for 200% of the amount consumed. Emerald Blossom healing consumes 2 sec of Dream Breath from allies it heals, detonating it and healing them for 200% of the amount consumed. */
    "Consume Flame": {heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_shadowflames_wave", id: 444088, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    // == Chronowarden ==

    /* Living Flame is enhanced with Bronze magic, repeating $?c2[X%][Z%] of the damage or healing you dealt to the target in the last Y sec as Arcane, up to $?s1260647[$<cap2>][$<cap>]. */
    "Chrono Flame": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "inv_ability_chronowardenevoker_chronoflame", id: 431442, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Tip the Scales overloads you with temporal energy, increasing your haste, movement speed, and cooldown recovery rate by ${$431698u*$431698s1}%, decreasing over $431698d. */
    "Temporal Burst": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst5", id: 431695, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Tip the Scales' cooldown is reduced by ${X/-1000} sec. */
    "Chronoboon": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_tipthescales", id: 1260484, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c2[Verdant Embrace heals for an additional X% over $409895d.][Upheaval deals Y% additional damage over $431620d.] */
    "Reverberations": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_giftoftheaspects", id: 431615, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c2[Temporal Anomaly mana cost reduced by X% and cooldown reduced by ${Y/-1000} sec.][Prescience cooldown reduced by ${Z/-1000} sec and it grants $s4% additional critical strike chance.] */
    "Nozdormu Adept": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_aspectsfavorbronze", id: 431715, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Temporal Burst grants Essence Burst every X sec. */
    "Energy Cycles": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_innatemagic4", id: 1260568, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* For each $?c2[healing over time effect from Verdant Embrace][damage over time effect from Upheaval], gain X% haste, up to Y%. */
    "Primacy": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "inv_misc_pocketwatch_01", id: 431657, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c2[When Dream Breath or Fire Breath critically strike, their duration is extended by X sec, up to a maximum of ${X*6} sec.][Ebon Might and Prescience gain a chance equal to your critical strike chance to grant Y% additional stats.] */
    "Double-time": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "spell_holy_borrowedtime", id: 431874, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Non-defensive abilities with a X second or longer cooldown grant $431991s1% Intellect for $431991d.    Essence spells extend the duration by Y sec. */
    "Time Convergence": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_plotthefuture", id: 431984, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: 
    number) {

    }},

    /* Each time you cast an empower spell, unstable time magic reduces its cooldown by up to X sec. */
    "Instability Matrix": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_dragonriding_bronzerewind01", id: 431484, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Chrono Flames' maximum damage or healing is increased by X%, up to $<cap> Arcane. */
    "Overclock": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "spell_holy_borrowedtime", id: 1260647, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* $?c2[Echo is X% more effective.][Prescience lasts Y% longer.] */
    "Golden Opportunity": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "achievement_faction_goldenlotus", id: 432004, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) {

    }},

    /* Empower spells send up to X Chrono Flames to your targets. */
    "Afterimage": {heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_livingflame", id: 431875, select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, points: number) 
    {

    }},

    
}

export const evokerTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};