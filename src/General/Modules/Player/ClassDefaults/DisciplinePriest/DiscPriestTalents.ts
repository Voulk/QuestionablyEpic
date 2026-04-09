
const classTalents: TalentTree = {
    /* Increases healing done by Flash Heal by X%. */
    "Improved Flash Heal": {id: 393870, values: [15.0],  points: 0, maxPoints: 1, icon: "spell_holy_heal", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases your Intellect by X%. */
    "Spiritual Guidance": {id: 1250818, values: [3.0],  points: 0, maxPoints: 1, icon: "spell_holy_spiritualguidence", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the damage of Holy Nova by X%, its healing by Y%, and its cooldown by ${Z/1000} sec. */
    "Lightburst": {id: 1246549, values: [400.0, 500.0, 30000.0],  points: 0, maxPoints: 1, icon: "inv_ability_holyfire_nova", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* Increases the damage of $?a137031&?s14914[Holy Fire]?a137031&!s14914[Holy Fire and Shadow Word: Pain][Shadow Word: Pain] by X%. */
    "Painful Invocation": {id: 1251030, values: [10.0, 10.0],  points: 0, maxPoints: 1, icon: "spell_holy_mindsooth", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the amount of damage required to break your Psychic Scream by X%. */
    "Sheer Terror": {id: 390919, values: [25.0],  points: 0, maxPoints: 1, icon: "spell_nzinsanity_fearofdeath", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your healing spells and Smite have a X% chance to make your next Flash Heal$?a1247178[ or Prayer of Healing][] instant and cost $?a137030[$114255s4]?a137031[$114255s2][$114255s3]% less mana. Stacks to $114255u. */
    "Surge of Light": {id: 109186, values: [8.0],  points: 0, maxPoints: 1, icon: "spell_holy_surgeoflight", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* Increases your Stamina by X%. */
    "Strength of Soul": {id: 1250820, values: [6.0],  points: 0, maxPoints: 1, icon: "spell_holy_ashestoashes", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Surge of Light occurs up to X% more often based on your missing mana. */
    "Everlasting Light": {id: 1249233, values: [50.0],  points: 0, maxPoints: 1, icon: "spell_holy_greaterheal", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the damage and healing of your Holy and Shadow spells by X%. */
    "Twin Disciplines": {id: 1251077, values: [2.0, 2.0, 2.0],  points: 0, maxPoints: 1, icon: "ability_priest_innerlightandshadow", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases your haste by X%. */
    "Dark Enlightenment": {id: 1250835, values: [3.0],  points: 0, maxPoints: 1, icon: "ability_priest_darkness", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* X% of Flash Heal healing on other targets also heals you. */
    "Binding Heals": {id: 368275, values: [20.0],  points: 0, maxPoints: 1, icon: "spell_holy_blindingheal", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* Increases your Leech by X%. */
    "Sanguine Teachings": {id: 373218, values: [2.0],  points: 0, maxPoints: 1, icon: "inv_archaeology_80_zandalari_sanguinetotem", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* After damaging or healing a target below Z% health, gain X% increased damage and healing for $390978d. */
    "Twist of Fate": {id: 390972, values: [5.0, 5.0, 35.0, 35.0],  points: 0, maxPoints: 2, icon: "spell_shadow_mindtwisting", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reduces the cooldown of Desperate Prayer by ${X/-1000} sec. */
    "Angel's Mercy": {id: 238100, values: [-20000.0],  points: 0, maxPoints: 1, icon: "spell_holy_testoffaith", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* Increases the damage of [Smite] by X%. */
    "Mindpierce": {id: 1251029, values: [15.0, 15.0],  points: 0, maxPoints: 1, icon: "spell_shadow_mindshear", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* Reduces the cooldown of Fade by ${X/-1000)} sec. */
    "Improved Fade": {id: 390670, values: [-5000.0],  points: 0, maxPoints: 2, icon: "spell_magic_lesserinvisibilty", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the maximum health gained from Desperate Prayer by X%. */
    "Light's Inspiration": {id: 373450, values: [10.0, 10.0],  points: 0, maxPoints: 1, icon: "spell_holy_restoration", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While above Y% health, the cast time of your $?a137033[Flash Heal is]?a137032[Flash Heal and Smite are][Flash Heal, Prayer of Healing, and Smite are] reduced by X%. */
    "Unwavering Will": {id: 373456, values: [-5.0, 75.0, -5.0],  points: 0, maxPoints: 2, icon: "ability_warrior_unrelentingassault", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Reduces all magic damage taken by X%. */
    "Spell Warding": {id: 390667, values: [-3.0],  points: 0, maxPoints: 2, icon: "spell_holy_spellwarding", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* When an attack brings you below X% health, you gain an absorption shield equal to Y% of your maximum health for $114214d. Cannot occur more than once every Z sec. */
    "Angelic Bulwark": {id: 108945, values: [30.0, 25.0, 90.0],  points: 0, maxPoints: 1, icon: "ability_priest_angelicbulwark", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the healing of your spells by X%. */
    "Benevolence": {id: 415416, values: [3.0, 3.0, 3.0],  points: 0, maxPoints: 1, icon: "ability_priest_spiritoftheredeemer", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the damage of your spells by X%. */
    "Focused Power": {id: 1249230, values: [3.0, 3.0],  points: 0, maxPoints: 1, icon: "ability_priest_focusedwill", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Fade reduces damage you take by $373447s1%. */
    "Translucent Image": {id: 373446, values: [-5.0],  points: 0, maxPoints: 1, icon: "spell_shadow_twistedfaith", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

}

const specTalents: TalentTree = {
    /* Power Word: Shield, Flash Heal, Plea, Penance, and Power Word: Radiance apply Atonement to your target for $194384d.    Your spell damage heals all targets affected by Atonement for X% of the damage 
    done. Healing is reduced when healing more than Y targets. */
    "Atonement": {id: 81749, values: [35.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_priest_atonement", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow Word: Pain has a chance to empower your next Penance with Shadow, increasing its effectiveness by $198069s1%. */
    "Power of the Dark Side": {id: 198068, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_artifact_powerofthedarkside", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Power Word: Radiance gains an additional charge. */
    "Light's Promise": {id: 322115, values: [1.0],  points: 0, maxPoints: 1, icon: "spell_priest_power_word", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Smite prevents the next $<shield> damage dealt by the enemy. */
    "Sanctuary": {id: 231682, values: [180.0],  points: 0, maxPoints: 1, icon: "spell_holy_holysmite", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Pain Suppression also heals your target for $372994s1% of their maximum health and applies Atonement. */
    "Pain Transformation": {id: 372991, values: [15.0],  points: 0, maxPoints: 1, icon: "spell_holy_blessedrecovery", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Pain Suppression gains an additional charge.    Power Word: Shield reduces the cooldown of Pain Suppression by ${$abs(Y/1000)} sec. */
    "Protector of the Frail": {id: 373035, values: [0.0, -3000.0, 1.0],  points: 0, maxPoints: 1, icon: "ability_racial_forceshield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Mind Blast has a X% chance to grant Power of the Dark Side and deals Y% additional damage. */
    "Dark Indulgence": {id: 372972, values: [100.0, 20.0],  points: 0, maxPoints: 1, icon: "spell_shadow_unholyfrenzy", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow Word: Pain Spreads to $?s373003[${1+$373003s2} nearby enemies][a nearby enemy] when you cast Penance on the target. */
    "Encroaching Shadows": {id: 472568, values: [1.0],  points: 0, maxPoints: 1, icon: "spell_shadow_painspike", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reduces the cooldown of Power Word: Radiance by ${X/-1000} sec. */
    "Bright Pupil": {id: 390684, values: [-3000.0],  points: 0, maxPoints: 1, icon: "spell_holy_surgeoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reduces the cast time of Power Word: Radiance by Y% and causes it to apply Atonement at an additional X% of its normal duration. */
    "Enduring Luminescence": {id: 390685, values: [10.0, -30.0],  points: 0, maxPoints: 1, icon: "ability_priest_holybolts01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When your Power Word: Shield is completely absorbed, you restore $<mana>% of your maximum mana. */
    "Shield Discipline": {id: 197045, values: [1.0],  points: 0, maxPoints: 1, icon: "spell_holy_divineprotection", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Each Penance bolt extends the duration of Shadow Word: Pain on enemies hit by ${X/1000}.1 sec. */
    "Painful Punishment": {id: 390686, values: [1500.0],  points: 0, maxPoints: 1, icon: "ability_priest_clarityofpower", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Shadow Word: Pain deals X% additional damage and spreads to Y additional $Ltarget:targets; when you cast Penance to its target. */
    "Revel in Darkness": {id: 373003, values: [5.0, 1.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_rogue_envelopingshadows", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Each successive Penance bolt during a channel deals X% increased damage and healing. */
    "Holy Ray": {id: 372969, values: [5.0],  points: 0, maxPoints: 1, icon: "ability_paladin_infusionoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Atonement reduces damage taken by X%. */
    "Lenience": {id: 238063, values: [-2.0],  points: 0, maxPoints: 1, icon: "ability_priest_atonement", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Mind Blast deals Y% increased damage, but costs X% more mana. */
    "Shadow Tap": {id: 1235211, values: [40.0, 150.0],  points: 0, maxPoints: 1, icon: "ability_creature_disease_05", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy damage increased by X%. */
    "Purge the Wicked": {id: 1250218, values: [10.0],  points: 0, maxPoints: 1, icon: "ability_mage_firestarter", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Penance fires one additional bolt of holy light over its duration. */
    "Castigation": {id: 193134, values: [-34.0],  points: 0, maxPoints: 1, icon: "spell_holy_searinglightpriest", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Atonements granted by Power Word: Shield last an additional X sec. */
    "Indemnity": {id: 373049, values: [4.0],  points: 0, maxPoints: 1, icon: "ability_priest_clarityofwill", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* Increases the damage of Shadow Word: Pain by X% and increases its duration by ${Z/1000} sec. */
    "Pain and Suffering": {id: 390689, values: [8.0, 8.0, 2000.0],  points: 0, maxPoints: 2, icon: "spell_shadow_shadowwordpain", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow damage and healing done increased by X%. */
    "Occultist": {id: 1250293, values: [15.0, 15.0],  points: 0, maxPoints: 1, icon: "ability_priest_touchofdecay", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Power Word: Radiance causes your next Penance to fire Y additional $Lbolt:bolts;, stacking up to $373183u charges. */
    "Harsh Discipline": {id: 373180, values: [30.0, 3.0],  points: 0, maxPoints: 2, icon: "ability_paladin_handoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Atonement heals for X% more when activated by Shadow spells. */
    "Abyssal Reverie": {id: 373054, values: [10.0],  points: 0, maxPoints: 2, icon: "ability_priest_surgeofdarkness", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Smite extends the duration of an active Atonement by ${X/1000}.1 sec. */
    "Divine Procession": {id: 472361, values: [2000.0],  points: 0, maxPoints: 1, icon: "ability_priest_evangelism", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Flash Heal, Power Word: Shield, Penance, and Power Word: Radiance have a X% increased chance to critically heal. */
    "Inner Focus": {id: 390693, values: [20.0],  points: 0, maxPoints: 1, icon: "spell_frost_windwalkon", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Evangelism increases your healing and absorption effects by $81700s1% for $81700d. */
    "Archangel": {id: 197862, values: [15.0],  points: 0, maxPoints: 1, icon: "ability_priest_archangel", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Evangelism summons a Mindbender to attack a nearby target for $123040d.    |cFFFFFFFFGenerates ${$123051m1/100}.1% Mana each time the Mindbender attacks.|r */
    "Mindbender": {id: 1280137, values: [30.0],  points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_3", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow Word: Pain damage has a chance to upgrade your next $@spellname2061 to $@spellname186263.    $@spellicon186263 $@spellname186263:  $@spelldesc186263 */
    "Shadow Mend": {id: 1252215, values: [0.0],  points: 0, maxPoints: 1, icon: "spell_shadow_shadowmend", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow Word: Death has a Z% chance to summon a Shadowfiend for X sec when damaging targets below Y% health.    $@spellicon1280172 $@spellname1280172  Summons a Shadowfiend to attack your target for $1280172d.$?c3[    |cFFFFFFFFGenerates ${$200010s1/100} Insanity each time the Shadowfiend attacks.|r][    |cFFFFFFFFGenerates ${$343727m1/100}.1% mana each time the Shadowfiend attacks.|r] */
    "Shadowfiend": {id: 34433, values: [5.0, 20.0, 40.0],  points: 0, maxPoints: 1, icon: "spell_shadow_shadowfiend", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting Smite increases the damage of Smite by X%, stacking $1253725u times. Lasts $1253725d. */
    "Greater Smite": {id: 1253724, values: [15.0, 0.0, 0.0],  points: 0, maxPoints: 2, icon: "spell_paladin_inquisition", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Direct critical heals create a protective shield on the target, absorbing X% of the amount healed. Lasts $47753d. */
    "Divine Aegis": {id: 47515, values: [30.0],  points: 0, maxPoints: 1, icon: "spell_holy_devineaegis", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting Power Word: Shield increases your Haste by Y% for $390692d. */
    "Borrowed Time": {id: 390691, values: [0.0, 5.0],  points: 0, maxPoints: 2, icon: "spell_holy_borrowedtime", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The damage of Smite and Penance is increased by $m1%, and Penance increases or decreases your target's movement speed by Y% for $355851d. */
    "Blaze of Light": {id: 215768, values: [8.0, 25.0],  points: 0, maxPoints: 2, icon: "spell_holy_searinglight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow Word: Death deals damage X additional $Ltime:times; at Y% effectiveness. */
    "Death's Torment": {id: 1240364, values: [2.0, 15.0],  points: 0, maxPoints: 1, icon: "spell_shadow_deathsembrace", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137032[Penance, ][]Mind Blast and Shadow Word: Death cause your Shadowfiend, Mindbender, and Voidwraith to teleport behind your target, slashing up to X nearby enemies for $<value> Shadow damage and extending their durations by ${Y/1000}.1 sec. */
    "Inescapable Torment": {id: 373427, values: [5.0, 700.0, 0.0, 0.0],  points: 0, maxPoints: 1, icon: "spell_shadow_chilltouch", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Power Word: Shield absorbs X% additional damage and lasts ${Y/1000} sec longer. */
    "Eternal Barrier": {id: 238135, values: [20.0, 5000.0],  points: 0, maxPoints: 1, icon: "spell_holy_powerwordshield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Your Penance bolts increase the absorb of your next Power Word: Shield by $390787s2%.    Stacks up to $390787U times. */
    "Weal and Woe": {id: 390786, values: [0.0],  points: 0, maxPoints: 1, icon: "spell_priest_burningwill", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Penance bolts sear the enemy, dealing X% of its damage over 8 sec. */
    "Searing Light": {id: 1280131, values: [20.0],  points: 0, maxPoints: 1, icon: "spell_holy_penance", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Mind Blast and Shadow Word: Death consume X sec of Shadow Word: Pain, dealing damage equal to Y% of the amount consumed. */
    "Expiation": {id: 390832, values: [1.0, 300.0],  points: 0, maxPoints: 2, icon: "spell_shadow_shadowpower", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Penance has a high chance to upgrade Power Word: Shield into $@spellname1253593.    $@spellicon1253593 $@spellname1253593:  $@spelldesc1253593     */
    "Master the Darkness1": {id: 1253590, values: [],  points: 0, maxPoints: 4, icon: "inv12_apextalent_priest_voidshield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shadow damage and Atonement healing increased by X%. */
    "Master the Darkness2": {id: 1253845, values: [],  points: 0, maxPoints: 4, icon: "inv12_apextalent_priest_voidshield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Void Shield reflects X% of damage taken to enemies, causing Atonement healing. */
    "Master the Darkness3": {id: 1253827, values: [],  points: 0, maxPoints: 4, icon: "inv12_apextalent_priest_voidshield", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},



}

const heroTalents: TalentTree = {
/* $?a137032[Penance][Prayer of Mending] gains an additional charge.   */
"Guiding Light": {id: 1248423, values: [1.0, 1.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "ability_priest_holywordlife", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137032[Power Word: Shield absorbs Y% additional damage.    All damage dealt by Penance, Smite and Holy Nova increased by Z%.][Increases the healing done by Prayer of Mending by X%.    All damage dealt by Smite, Holy Fire and Holy Nova increased by $s4%.]   */
"Preventive Measures": {id: 440662, values: [15.0, 30.0, 15.0, 40.0, 40.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_powerwordshield", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137032[Increases the duration of Atonement by ${X/1000} sec.][Increases the duration of your Renew by Y%.]   */
"Preemptive Care": {id: 440671, values: [4000.0, 40.0, 25.0, 25.0, 25.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_renew", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Reduces the cooldown of $?a137032[Power Word: Shield by ${Y/-1000}.1 sec.][Prayer of Mending by ${X/-1000}.1 sec.] */
"Waste No Time": {id: 440681, values: [-1500.0, -1500.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_nature_timestop", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137031&?a1246517[Holy Word: Serenity healing increased by X%.]?c2[Holy Word: Serenity and Holy Word: Sanctify healing increased by X%.][Flash Heal, Plea, and Power Word: Radiance healing increased by Y%.]   */
"Words of the Wise": {id: 1272352, values: [10.0, 15.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_priest_power_word", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137032[Power Word: Shield casts apply X $Lstack:stacks; of Prayer of Mending to your target.    $@spellicon33076 $@spellname33076  $@spelldesc33076][Casting Prayer of Mending applies Power Word: Shield to your target.    $@spellicon1246768 $@spellname1246768  $@spelldesc1246768] */
"Assured Safety": {id: 440766, values: [4.0, 100.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_prayerofmendingtga", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Your Angelic Feathers increase movement speed by an additional Y%.    When an ally walks through your Angelic Feather, you are also granted X% of its effect.   */
"Divine Feathers": {id: 440670, values: [100.0, 10.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "ability_priest_angelicfeather", select: true, tier: 2, runFunc: function (state: any, spellDB: 
SpellDB, talentData: any, points: number) {

}},

/* For $458650d after casting Leap of Faith you may cast it a second time for free, ignoring its cooldown. */
"Save the Day": {id: 440669, values: [0.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "priest_spell_leapoffaith_a", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137032[Pain Suppression reduces damage taken by an additional X%.][Guardian Spirit lasts an additional ${Y/1000} sec.] */
"Foreseen Circumstances": {id: 440738, values: [-10.0, 2000.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_painsupression", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c2[Reduces the cooldown of your Holy Words by ${X/-1000} sec.][Atonement healing from Holy spells is increased by $s4%.]   */
"Prophet's Insight": {id: 1272359, values: [-5000.0, -5000.0, -5000.0, 15.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_priest_pontifex", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137032[Your Flash Heal and Power Word: Shield are X%][Your Flash Heal and Holy Word: Serenity are X%] more effective when cast on yourself. */
"Prophet's Will": {id: 433905, values: [30.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "ability_priest_clarityofpurpose", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Desperate Prayer lasts an additional ${X/1000} sec.    Angelic Bulwark's absorption effect is increased by Y% of your maximum health. */
"Desperate Measures": {id: 458718, values: [10000.0, 15.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_testoffaith", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137032[The first bolt of each Penance cast damages or heals for X% more.][$@spelldesc1246798] */
"Prompt Prognosis": {id: 1246799, values: [125.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_blessedlife", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* X% of overhealing done is redistributed to up to Y nearby injured allies. */
"Piety": {id: 1246802, values: [20.0, 4.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "inv_ability_oraclepriest_premonitionpiety", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c2[When Prayer of Mending expires without healing, it jumps to a nearby injured ally and loses X $Lstack:stacks; instead.][  When Power Word: Shield or Void Shield expires with absorption remaining, it jumps to a nearby injured ally and loses Y% of its maximum absorb instead.]   */
"Unfolding Vision": {id: 1272363, values: [2.0, 40.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "spell_holy_mindvision", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?a137031[An additional X stacks of Prayer of Mending is placed on a second ally within $A2 yards when casting Prayer of Mending.][Z additional Penance bolts are fired at an enemy within $A2 yards when healing an ally with Penance, or fired at an ally within $A2 yards when damaging an enemy with Penance.] */
"Twinsight": {id: 440742, values: [4.0, 0.0, 3.0], heroTree: "Oracle", points: 0, maxPoints: 1, icon: "inv_ability_oraclepriest_clairvoyance", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c3[Tear open a rift][Mind Blast tears open an Entropic Rift] that follows the enemy for $450193d. Enemies caught in its path suffer $447448s1 Shadow damage every $459314t1 sec while within its reach. */
"Entropic Rift": {id: 447444, values: [30.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_ability_voidweaverpriest_entropicrift", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Entropic Rift slows enemies by up to X%, increased the closer they are to its center. */
"No Escape": {id: 451204, values: [70.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "spell_fire_twilighthellfire", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c3[Void Torrent can be used while moving. ][]While Entropic Rift is active, you move X% faster. */
"Dark Energy": {id: 451018, values: [20.0, 20.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "achievement_boss_triumvirate_darknaaru", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c3[Vampiric Touch and Shadow Word: Pain deal X% additional damage.][Power Word: Shield absorbs Y% additional damage.] */
"Inner Quietus": {id: 448278, values: [20.0, 20.0, 20.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_cosmicvoid_buff", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* While Entropic Rift is active, your $?c3[Shadow damage is increased by X%] [Atonement healing is increased by Y%]. */
"Voidheart": {id: 449880, values: [5.0, 20.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_cosmicvoid_orb", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Shadow Word: Death consumes absorb shields from your target, dealing $32379s1 extra damage to them and granting you $?c3[Z Insanity][Y% mana] if a shield was present. */
"Devour Matter": {id: 451840, values: [300.0, 1.0, 5.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "spell_holy_consumemagic", select: true, tier: 2, runFunc: function (state: any, spellDB: 
SpellDB, talentData: any, points: number) {

}},

/* Summoning an Entropic Rift $?c1[extends the duration of your $s4 shortest Atonements by X sec][grants you Shadowy Insight]. */
"Void Empowerment": {id: 450138, values: [1.0, 50.0, 1.0, 5.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_cosmicvoid_nova", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Void Blast increases the duration of Entropic Rift by $?c1[${X}.1][${Z}.1] sec, up to a maximum of Y sec. */
"Darkening Horizon": {id: 449912, values: [1.0, 3.0, 1.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_misc_83_voidfocus", select: true, tier: 2, runFunc: function (state: any, spellDB: 
SpellDB, talentData: any, points: number) {

}},

/* When Entropic Rift ends, a Voidwraith is summoned from the collapsed rift for $451235d.    $@spellicon451235$@spellname451235  $@spelldesc451235 */
"Voidwraith": {id: 451234, values: [0.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "warlock_curse_shadow", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Voidheart now persists for X sec after Entropic Rift ends. */
"Touch of the Void": {id: 1266856, values: [8.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_112_raidtrinkets_blobofswirlingvoid_purple", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Shadow Word: Pain and Entropic Rift deal damage ${100*(1/(1+$m1/100)-1)}% more often. */
"Quickened Pulse": {id: 1266845, values: [-20.0, -20.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "ability_rogue_sanguinaryvein", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c1[While Entropic Rift is active, Atonement healing with Void Blast and Penance is Y% more effective.][Void Blast generates ${X/100} additional Insanity.] */
"Void Infusion": {id: 450612, values: [200.0, 50.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_misc_volatileshadow", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Every $t1 sec siphon an amount equal to X% of your health from an ally within Z yds if they are higher health than you. */
"Void Leech": {id: 451311, values: [4.0, 25.0, 40.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "spell_shadow_soulleech_2", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* You absorb Z% of all magic damage taken. Absorbing Shadow damage heals you for Y% of the amount absorbed. */
"Embrace the Shadow": {id: 451569, values: [0.0, 100.0, 3.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "spell_shadow_shadesofdarkness", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?c3[Void Torrent deals X% increased damage.][Mind Blast deals Y% increased damage.] */
"Overwhelming Shadows": {id: 1266883, values: [30.0, 100.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_shadowelementalmount", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Each time $?c3[you cast Shadow Word: Madness][Penance damages or heals], Entropic Rift is empowered, increasing its damage and size by $?c1[$s4][Z]%.    After Entropic Rift ends it collapses, dealing $448405s1 Shadow damage split amongst enemy targets within $448405a1 yds. */
"Collapsing Void": {id: 448403, values: [1.0, 8.0, 20.0, 10.0], heroTree: "Voidweaver", points: 0, maxPoints: 1, icon: "inv_cosmicvoid_groundsate", select: true, tier: 2, runFunc: function (state: any, 
spellDB: SpellDB, talentData: any, points: number) {

}},

}

export const discPriestTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};