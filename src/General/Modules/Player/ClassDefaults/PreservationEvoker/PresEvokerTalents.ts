import { buffSpellPerc, cooldownAdjFlat } from "../Generic/TalentBase"

/**
 * A list of talents to turn on
 */
export const defaultTalents = (talents: TalentTree, loadoutName: string, heroTree: string = "Flameshaper") => {
    let talentsEnabled: string[] = []
    let halfTalents: string[] = []

    if (loadoutName === "default") talentsEnabled = [
        "Natural Convergence", "Attuned to the Dream", "Bountiful Bloom", "Panacea", "Leaping Flames", "Lush Growth",

        "Unshakable", "Golden Hour", "Time Lord", "Spiritual Clarity", "Call of Ysera", "Grace Period", "Ouroboros", "Temporal Artificer", "Energy Loop",
        "Renewing Breath", "Timeless Magic", "Twin Echoes", "Tempo Charged", "Merithra's Blessing1", "Merithra's Blessing2", "Merithra's Blessing3", "Dream Simulacrum"
    ]

    // Apply talents
    Object.keys(talents).forEach(talentName => {
        if (talentsEnabled.includes(talentName) || talents[talentName].heroTree === heroTree) {
            talents[talentName].points = talents[talentName].maxPoints;
            //console.log(`Enabling talent: ${talentName}`);
        }
    })
}

const specTalents: TalentTree = {
    /* Each cast of a Bronze spell causes your next empower spell to reach maximum level in X% less time, stacking up to $362877u times. */
    "Temporal Compression": {id: 362874, values: [10.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_evoker_rewind2", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Living Flame has a X% chance, and Reversion has a Y% chance to make your next Essence ability free.$?s375722[ Stacks $359618u times.][] */
    "Essence Burst": {id: 369297, values: [20.0, 15.0],  points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Verdant Embrace temporarily bonds your life with an ally, causing your healing on either partner to heal the other for X% of the amount. Lasts $373267d. */
    "Lifebind": {id: 373270, values: [60.0],  points: 0, maxPoints: 1, icon: "ability_evoker_hoverred", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Essence Burst stacks ${X+1} times. */
    "Essence Attunement": {id: 375722, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_evoker_essenceburststacks", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your empower spells are X% more effective. While charging a healing empower spell, you cannot be knocked back. */
    "Unshakable": {id: 1239581, values: [10.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_evoker_masterygiantkiller", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
        buffSpellPerc(spellDB["Dream Breath"], talentData[0])
    }},

    /* Emerald Blossom sends out flying seedlings when it bursts, healing X $Lally:allies; up to Y yds away for $361361s1. */
    "Fluttering Seedlings": {id: 359793, values: [2.0, 40.0],  points: 0, maxPoints: 2, icon: "inv_herbalism_70_yserallineseed", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your empower spells' maximum level is increased by 1. */
    "Font of Magic": {id: 375783, values: [382266.0, 382614.0, 382731.0],  points: 0, maxPoints: 1, icon: "ability_evoker_fontofmagic", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reversion instantly heals the target for X% of damage taken in the last Y sec. */
    "Golden Hour": {id: 378196, values: [15.0, 5.0],  points: 0, maxPoints: 1, icon: "inv_belt_armor_waistoftime_d_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Empower spells increase your Essence regeneration rate by $370840s1% for $370840d. */
    "Empath": {id: 376138, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_evoker_powernexus2", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dream Breath's cooldown is reduced by ${X/-1000} sec. */
    "Spiritual Clarity": {id: 376150, values: [-10000.0],  points: 0, maxPoints: 1, icon: "ability_evoker_spiritbloom", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
        cooldownAdjFlat(spellDB["Dream Breath"], talentData[0])
    }},

    /* Each time you gain Essence Burst, your critical heals are ${X+200}% effective instead of the usual 200% for $377102d. */
    "Exhilarating Burst": {id: 377100, values: [30.0],  points: 0, maxPoints: 2, icon: "ability_evoker_essenceburst3", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Every other Emerald Blossom has a X% chance for one of your Fluttering Seedlings to grow into a new Emerald Blossom. */
    "Field of Dreams": {id: 370062, values: [100.0],  points: 0, maxPoints: 1, icon: "inv_misc_herb_chamlotus", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases your maximum Essence to $<max>. */
    "Power Nexus": {id: 369908, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_evoker_powernexus", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Echo replicates X% more healing. */
    "Time Lord": {id: 372527, values: [50.0],  points: 0, maxPoints: 2, icon: "ability_evoker_innatemagic4", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {
        // Handled in profile for now.
    }},

    /* Empower spells cause time to flow X% faster for you, increasing movement speed, cooldown recharge rate, and cast speed. Lasts $390148d. */
    "Flow State": {id: 385696, values: [10.0],  points: 0, maxPoints: 2, icon: "ability_evoker_timespiral", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Temporal Anomaly applies Echo at X% effectiveness to the first Y allies it passes through. */
    "Resonating Sphere": {id: 376236, values: [30.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_evoker_bronze_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
        // Handled in profile.
    }},

    /* Temporal Anomaly reduces the cooldowns of your empower spells by X sec. */
    "Nozdormu's Teachings": {id: 376237, values: [5.0],  points: 0, maxPoints: 1, icon: "inv_misc_head_dragon_bronze", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dream Breath healing increased by X%, and Living Flame healing increased by Y%. */
    "Call of Ysera": {id: 373834, values: [20.0, 30.0, 20.0],  points: 0, maxPoints: 1, icon: "inv_drakemountemerald", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
        buffSpellPerc(spellDB["Dream Breath"], talentData[0]);
        buffSpellPerc(spellDB["Living Flame"], talentData[1]);
    }},

    /* Your healing is increased by X% on targets with your Reversion. */
    "Grace Period": {id: 376239, values: [10.0],  points: 0, maxPoints: 1, icon: "ability_evoker_reversion_green", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Consuming a full Temporal Compression grants you Essence Burst. */
    "Spark of Insight": {id: 377099, values: [30.0],  points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst5", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Casting Echo grants one stack of Ouroboros, increasing the healing of your next Emerald Blossom by $387350s1%, stacking up to $387350u times. */
    "Ouroboros": {id: 381921, values: [-10.0],  points: 0, maxPoints: 1, icon: "ability_evoker_ouroboros", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath heals Z nearby injured allies for X% of damage done to up to Y targets, split evenly among them. */
    "Life-Giver's Flame": {id: 371426, values: [80.0, 5.0, 5.0],  points: 0, maxPoints: 1, icon: "item_sparkofragnoros", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting Dream Flight or Stasis increases your healing over time by $1242747s1% and causes Living Flame and Reversion to have a $1242747s2% increased chance to grant Essence Burst. Lasts $?s359816[Y][Z] sec.   */
    "Inner Flame": {id: 1242745, values: [0.0, 20.0, 15.0],  points: 0, maxPoints: 1, icon: "ability_evoker_infernosblessing", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Rewind's cooldown is reduced by ${X/-1000} sec. */
    "Temporal Artificer": {id: 381922, values: [-120000.0],  points: 0, maxPoints: 1, icon: "ability_evoker_rewind", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Disintegrate deals Y% more damage and generates ${$372234s1*4} mana over its duration. */
    "Energy Loop": {id: 372233, values: [0.0, 35.0],  points: 0, maxPoints: 1, icon: "inv_elemental_mote_mana", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When you or an ally fall below X% health, a version of yourself enters your timeline and heals them for $361195s1. Your alternate self continues healing for $368415d before returning to their timeline.    May only occur once every Y sec. */
    "Time of Need": {id: 368412, values: [30.0, 60.0],  points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder_bronze", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dream Breath healing is increased by X%. */
    "Renewing Breath": {id: 371257, values: [15.0, 15.0],  points: 0, maxPoints: 2, icon: "ability_evoker_dreambreath", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Red spells deal X% additional damage and healing. */
    "Lifeforce Mender": {id: 376179, values: [20.0, 20.0],  points: 0, maxPoints: 2, icon: "ability_evoker_dragonrage2", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reversion, Time Dilation, Echo, and Temporal Anomaly last X% longer and cost Y% less mana. */
    "Timeless Magic": {id: 376240, values: [15.0, -15.0, -15.0],  points: 0, maxPoints: 2, icon: "inv_artifact_xp05", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Verdant Embrace healing is increased by X%. In addition, it no longer causes you to leap to your target, instead sending forth a Dream Simulacrum. */
    "Dream Simulacrum": {id: 1241669, values: [30.0, 100.0],  points: 0, maxPoints: 1, icon: "ability_evoker_dragonrage2_green", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Verdant Embrace gains an additional charge. */
    "Wings of Liberty": {id: 1241704, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Essence Burst increases the effectiveness of your next Essence ability by X%. */
    "Titan's Gift": {id: 443264, values: [35.0, 35.0],  points: 0, maxPoints: 1, icon: "spell_fireresistancetotem_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reversion healing has a chance to cause your next Living Flame to cast instantly and deal Y% increased healing or damage. Stacks up to $394552u charges. */
    "Lifespark": {id: 443177, values: [100.0, 50.0],  points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder_red", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting Emerald Blossom causes your next Echo to cast on an additional ally within X yards at Y% effectiveness. */
    "Twin Echoes": {id: 1242031, values: [25.0, 100.0],  points: 0, maxPoints: 1, icon: "inv_ability_evoker_greaterecho", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Bronze healing and absorption increased by X%. */
    "Tempo Charged": {id: 1237978, values: [15.0, 15.0, 15.0],  points: 0, maxPoints: 1, icon: "classicon_evoker_preservation", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Essence abilities have a chance to infuse your next Reversion with the power of the Green Dragonflight, upgrading it to Merithra's Blessing:    $@spellicon1256581 $@spellname1256581  $@spelldesc1256581 */
    "Merithra's Blessing1": {id: 1256577, values: [], points: 0, maxPoints: 1, icon: "inv12_apextalent_evoker_merithrasblessing", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reversion protects allies, reversing ${X/10}.1% of all damage taken and healing them instead. */
    "Merithra's Blessing2": {id: 1256682, values: [], points: 0, maxPoints: 2, icon: "ability_evoker_reversion_green", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dream Breath's instant healing is increased by X% and Dream Breath has a Y% chance to grant Merithra's Blessing. */
    "Merithra's Blessing3": {id: 1256689, values: [], points: 0, maxPoints: 1, icon: "ability_evoker_giftoftheaspects", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
}

const classTalents: TalentTree = {
    /* Disintegrate channels X% faster. */
    "Natural Convergence": {id: 369913, values: [-20.0, -20.0, -20.0],  points: 0, maxPoints: 1, icon: "spell_frost_frostblast", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Essence regenerates X% faster. */
    "Innate Magic": {id: 375520, values: [5.0],  points: 0, maxPoints: 2, icon: "ability_evoker_innatemagic4", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Living Flame deals X% more damage and healing. */
    "Enkindled": {id: 375554, values: [3.0, 3.0],  points: 0, maxPoints: 2, icon: "ability_evoker_livingflame", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Store X% of your effective healing, up to $<cap>. Your next damaging Living Flame consumes all stored healing to increase its damage dealt. */
    "Scarlet Adaptation": {id: 372469, values: [20.0],  points: 0, maxPoints: 1, icon: "inv_bijou_red", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Living Flame and Emerald Blossom are X% more effective on yourself. */
    "Inner Radiance": {id: 386405, values: [30.0],  points: 0, maxPoints: 1, icon: "spell_holy_spellwarding", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* Casting Emerald Blossom or Verdant Embrace reduces the cast time of your next Living Flame by $375583s1%. */
    "Ancient Flame": {id: 369990, values: [1.0],  points: 0, maxPoints: 1, icon: "inv_elemental_mote_fire01", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Magic damage done is increased by X%. */
    "Instinctive Arcana": {id: 376164, values: [2.0],  points: 0, maxPoints: 2, icon: "spell_arcane_studentofmagic", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Your healing done and healing received are increased by X%. */
    "Attuned to the Dream": {id: 376930, values: [2.0, 2.0, 2.0],  points: 0, maxPoints: 2, icon: "ability_rogue_imrovedrecuperate", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Azure Strike damages X additional $Lenemy:enemies;. */
    "Protracted Talons": {id: 369909, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_evoker_azurestrike", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Stamina is increased by X%. */
    "Draconic Legacy": {id: 376166, values: [6.0],  points: 0, maxPoints: 1, icon: "inv_helm_mail_dracthyrquest_b_02", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Emerald Blossom heals X additional allies. */
    "Bountiful Bloom": {id: 370886, values: [2.0],  points: 0, maxPoints: 1, icon: "ability_evoker_emeraldblossom", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Leech is increased by X%. */
    "Regenerative Magic": {id: 387787, values: [2.0],  points: 0, maxPoints: 1, icon: "spell_frost_manarecharge", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath's damage over time lasts X sec longer. */
    "Blast Furnace": {id: 375510, values: [4.0],  points: 0, maxPoints: 1, icon: "ability_evoker_firebreath", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Obsidian Scales surrounds you with a Renewing Blaze, causing X% of the damage it reduced to be healed back over $374349d. */
    "Renewing Blaze": {id: 374348, values: [100.0],  points: 0, maxPoints: 1, icon: "ability_evoker_masterylifebinder_red", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Emerald Blossom and Verdant Embrace instantly heal you for $387763s1 when cast. */
    "Panacea": {id: 387761, values: [2.0],  points: 0, maxPoints: 1, icon: "ability_druid_protectionofthegrove", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Renewing Blaze restores you more quickly, causing damage you take to be healed back over $<newDur> sec. */
    "Foci of Life": {id: 375574, values: [-4000.0],  points: 0, maxPoints: 1, icon: "spell_fire_incinerate", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* Green spells restore X% more health. */
    "Lush Growth": {id: 375561, values: [5.0, 5.0],  points: 0, maxPoints: 2, icon: "inv_staff_2h_bloodelf_c_01", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath causes your next Living Flame to strike 1 additional target per empower level. */
    "Leaping Flames": {id: 369939, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_evoker_pupilofalexstraza", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
}

const heroTalents: TalentTree = {
    /* $?c1[Fire Breath gains][Dream Breath and Fire Breath gain] an additional charge. */
    "Legacy of the Lifebinder": {id: 1264269, values: [1.0, 1.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_dragonrage2", select: true, tier: 2, runFunc: function (state: any, 
    spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Tail Swipe and Wing Buffet scorch enemies and blind them with ash, causing their next attack within $445134d to miss. */
    "Shape of Flame": {id: 445074, values: [1.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_mage_flamecannon", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Fire Breath's cooldown is reduced by ${X/-1000} sec. */
    "Ashes in Motion": {id: 1264365, values: [-5000.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_ability_flameshaperevoker_engulf", select: true, tier: 2, runFunc: function (state: any, 
    spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Essence abilities are enhanced with Flame, dealing X% of healing or damage done as Fire over 8 sec. */
    "Enkindle": {id: 444016, values: [20.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_10_elementalcombinedfoozles_purifiedshadowflame", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath's damage over time is increased by X%. Dream Breath's heal over time is increased by X%. */
    "Expanded Lungs": {id: 444845, values: [30.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_fyrakk_dragonbreath", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* $?c1[Fire Breath has][Dream Breath and Fire Breath have] a X% chance to generate Essence Burst. */
    "Essence Well": {id: 1265993, values: [50.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst4", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Critical strike chance against targets above Y% health increased by X%. */
    "Conduit of Flame": {id: 444843, values: [15.0, 50.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_innatemagic5", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath $?c1[reaches its][and Dream Breath reach their] maximum empower level X% faster. */
    "Burning Adrenaline": {id: 444020, values: [-20.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_gauntlets_03", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath and Dream Breath deal their damage and healing X% more often. */
    "Fulminous Roar": {id: 1218447, values: [-20.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_oppressingroar2", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* Consuming Essence Burst fires a twin flame, healing your target for $1265991s1. */
    "Twin Flame": {id: 1265979, values: [0.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_infernosblessing", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Living Flame has X extra chance to trigger Essence Burst when it critically strikes. */
    "Titanic Precision": {id: 445625, values: [1.0, 50.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_10_misc_titansspark_shadowflame", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fire Breath's damage over time lasts X sec longer.$?c2[    Dream Breath's heal over time lasts ${Y/1000} sec longer.][] */
    "Deep Exhalation": {id: 1264321, values: [4.0, 6000.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "ability_evoker_firebreath", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Obsidian Scales also applies to your target or X nearby injured $Lally:allies; at Y% value. */
    "Lifecinders": {id: 444322, values: [1.0, 50.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_misc_herb_cinderbloom_petal", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your wounds have a small chance to cauterize, healing you for X% of damage taken. Occurs more often from attacks that deal high damage. */
    "Draconic Instincts": {id: 445958, values: [30.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_misc_scales_basilliskorange", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Twin Flame bounces to up to X additional targets. */
    "Fire Torrent": {id: 1265992, values: [2.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "spell_shaman_stormearthfire", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Verdant Embrace healing consumes 4 sec of Dream Breath from allies it heals, detonating it and healing them for 200% of the amount consumed. Verdant Embrace healing consumes 4 sec of Dream Breath from allies it heals, detonating it and healing them for 200% of the amount consumed. Emerald Blossom healing consumes 2 sec of Dream Breath from allies it heals, detonating it and healing them for 200% of the amount consumed. */
    "Consume Flame": {id: 444088, values: [2000.0, 1500.0, 8000.0, 125.0, 4000.0, 200.0], heroTree: "Flameshaper", points: 0, maxPoints: 1, icon: "inv_shadowflames_wave", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Living Flame is enhanced with Bronze magic, repeating $?c2[X%][Z%] of the damage or healing you dealt to the target in the last Y sec as Arcane, up to $?s1260647[$<cap2>][$<cap>]. */
    "Chrono Flame": {id: 431442, values: [15.0, 5.0, 25.0, 431443.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "inv_ability_chronowardenevoker_chronoflame", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Tip the Scales overloads you with temporal energy, increasing your haste, movement speed, and cooldown recovery rate by ${$431698u*$431698s1}%, decreasing over $431698d. */
    "Temporal Burst": {id: 431695, values: [1.0, 20.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_essenceburst5", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Tip the Scales' cooldown is reduced by ${X/-1000} sec. */
    "Chronoboon": {id: 1260484, values: [-30000.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_tipthescales", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Verdant Embrace heals for an additional X% over $409895d.][Upheaval deals Y% additional damage over $431620d.] */
    "Reverberations": {id: 431615, values: [60.0, 50.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_giftoftheaspects", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Temporal Anomaly mana cost reduced by X% and cooldown reduced by ${Y/-1000} sec.][Prescience cooldown reduced by ${Z/-1000} sec and it grants $s4% additional critical strike chance.] */
    "Nozdormu Adept": {id: 431715, values: [-15.0, -4000.0, -2000.0, 1.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_aspectsfavorbronze", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Temporal Burst grants Essence Burst every X sec. */
    "Energy Cycles": {id: 1260568, values: [6.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_innatemagic4", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* For each $?c2[healing over time effect from Verdant Embrace][damage over time effect from Upheaval], gain X% haste, up to Y%. */
    "Primacy": {id: 431657, values: [3.0, 9.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "inv_misc_pocketwatch_01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[When Dream Breath or Fire Breath critically strike, their duration is extended by X sec, up to a maximum of ${X*6} sec.][Ebon Might and Prescience gain a chance equal to your critical strike chance to grant Y% additional stats.] */
    "Double-time": {id: 431874, values: [2.0, 50.0, 10.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "spell_holy_borrowedtime", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* Non-defensive abilities with a X second or longer cooldown grant $431991s1% Intellect for $431991d.    Essence spells extend the duration by Y sec. */
    "Time Convergence": {id: 431984, values: [45.0, 1.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_plotthefuture", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Each time you cast an empower spell, unstable time magic reduces its cooldown by up to X sec. */
    "Instability Matrix": {id: 431484, values: [6.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_dragonriding_bronzerewind01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Chrono Flames' maximum damage or healing is increased by X%, up to $<cap> Arcane. */
    "Overclock": {id: 1260647, values: [40.0, 0.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "spell_holy_borrowedtime", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Echo is X% more effective.][Prescience lasts Y% longer.] */
    "Golden Opportunity": {id: 432004, values: [10.0, 15.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "achievement_faction_goldenlotus", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Empower spells send up to X Chrono Flames to your targets. */
    "Afterimage": {id: 431875, values: [3.0], heroTree: "Chronowarden", points: 0, maxPoints: 1, icon: "ability_evoker_livingflame", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
    
}

export const evokerTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};