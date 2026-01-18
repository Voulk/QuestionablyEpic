

const classTalents: TalentTree = {
    /* Rake, Rip, and Thrash damage increased by Y%. */
    "Grievous Wounds": {id: 474526, values: [10.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_xavius_tormentingswipe", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Stamina increased by X%.    Stamina in Bear Form is increased by an additional Y%. */
    "Ursoc's Spirit": {id: 449182, values: [4.0, 5.0],  points: 0, maxPoints: 1, icon: "spell_nature_spiritarmor", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Frenzied Regeneration and Barkskin increase all healing received by X%. */
    "Verdant Heart": {id: 301768, values: [20.0, 20.0],  points: 0, maxPoints: 1, icon: "ability_bullrush", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Nature's Cure additionally removes all Curse and Poison effects. */
    "Improved Nature's Cure": {id: 392378, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_shaman_cleansespirit", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Physical damage and Armor increased by X%. */
    "Killer Instinct": {id: 108299, values: [6.0, 6.0, 6.0, 6.0],  points: 0, maxPoints: 2, icon: "ability_druid_predatoryinstincts", select: true, tier: 0, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* Barkskin's duration is increased by ${X/1000} sec. */
    "Improved Barkskin": {id: 327993, values: [4000.0],  points: 0, maxPoints: 1, icon: "spell_nature_stoneclawtotem", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Magical damage and healing increased by X%. */
    "Nurturing Instinct": {id: 33873, values: [6.0, 6.0],  points: 0, maxPoints: 2, icon: "ability_druid_healinginstincts", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While in Cat Form, when you critically strike with an attack that generates a combo point, you gain an additional combo point. Damage over time cannot trigger this effect.    Mangle critical strike damage increased by Y%. */
    "Primal Fury": {id: 159286, values: [0.0, 20.0],  points: 0, maxPoints: 1, icon: "ability_racial_cannibalize", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reduces all damage taken by X%. */
    "Thick Hide": {id: 16931, values: [-4.0],  points: 0, maxPoints: 1, icon: "inv_misc_pelt_bear_03", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Healing you receive is increased by X%. */
    "Natural Recovery": {id: 377796, values: [4.0],  points: 0, maxPoints: 1, icon: "ability_druid_naturalperfection", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases the range of all of your spells by X yards. */
    "Astral Influence": {id: 197524, values: [5.0, 0.0, 5.0, 5.0, 5.0, 0.0, 0.0, 0.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_skyreach_lens_flare", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When a hit deals more than Y% of your maximum health, instantly heal for $474683s1% of your health.    This effect cannot occur more than once every Z seconds. */
    "Aessina's Renewal": {id: 474678, values: [0.0, 12.0, 30.0],  points: 0, maxPoints: 1, icon: "spell_nature_healingtouch", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Wrath, Starsurge, and Starfire damage increased by X%. $?!a137013[    Starsurge's cooldown is reduced by ${-Y/1000} sec and its mana cost is reduced by Z%.][] */
    "Starlight Conduit": {id: 451211, values: [5.0, -4000.0, -50.0],  points: 0, maxPoints: 1, icon: "spell_arcane_arcane01", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases your movement speed by X%. */
    "Feline Swiftness": {id: 131768, values: [15.0],  points: 0, maxPoints: 1, icon: "ability_druid_dash", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When you fall below Y% health, you cast Frenzied Regeneration, up to once every X sec. */
    "Well-Honed Instincts": {id: 377847, values: [120.0, 40.0],  points: 0, maxPoints: 1, icon: "ability_druid_tigersroar", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When you use Barkskin or Survival Instincts, absorb $<shield> damage for $280165d. */
    "Matted Fur": {id: 385786, values: [600.0],  points: 0, maxPoints: 2, icon: "inv_misc_pelt_15", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* Rejuvenation's duration is increased by ${X/1000} sec.    Regrowth's duration is increased by ${Y/1000} sec when cast on yourself. */
    "Lingering Healing": {id: 231040, values: [3000.0, 3000.0],  points: 0, maxPoints: 1, icon: "spell_nature_rejuvenation", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Survival Instincts and Barkskin reduce damage taken by an additional X%. */
    "Oakskin": {id: 449191, values: [-10.0],  points: 0, maxPoints: 1, icon: "spell_nature_stoneclawtotem", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Well-Honed Instincts can trigger up to once every ${$382912d+X} sec. */
    "Perfectly-Honed Instincts": {id: 1213597, values: [-30.0],  points: 0, maxPoints: 1, icon: "ability_druid_tigersroar", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Ferocious Bite and Maul damage increased by X%. */
    "Instincts of the Claw": {id: 449184, values: [8.0],  points: 0, maxPoints: 1, icon: "spell_shadow_vampiricaura", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You gain X% of a stat while in each form:    No Form: Haste  Cat Form: Critical Strike  Bear Form: Versatility  Moonkin Form: Mastery */
    "Lycara's Teachings": {id: 378988, values: [3.0],  points: 0, maxPoints: 2, icon: "inv_trinket_ardenweald_02_green", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Moonfire and Sunfire damage increased by X%. */
    "Lore of the Grove": {id: 449185, values: [10.0, 10.0],  points: 0, maxPoints: 1, icon: "spell_nature_starfall", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases Typhoon's radius by X% and its range by Y yds. */
    "Gale Winds": {id: 400142, values: [20.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_druid_galewinds", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reduces the cooldown of Typhoon by ${$m1/-1000} sec. */
    "Incessant Tempest": {id: 400140, values: [-5000.0],  points: 0, maxPoints: 1, icon: "ability_skyreach_wind", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Mark of the Wild is X% more effective on yourself. */
    "Gift of the Wild": {id: 1262034, values: [100.0],  points: 0, maxPoints: 1, icon: "spell_nature_giftofthewild", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* For $340541d after shifting into Bear Form, your health and armor are increased by X%. */
    "Ursine Vigor": {id: 377842, values: [15.0],  points: 0, maxPoints: 1, icon: "ability_druid_markofursol", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Cooldown reduced by ${$m1/-1000} sec. */
    "Improved Stampeding Roar": {id: 288826, values: [-60000.0],  points: 0, maxPoints: 1, icon: "spell_druid_stamedingroar", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Physical damage dealt by your abilities increased by $?a137012[Z][X]%. */
    "Circle of the Wild": {id: 474530, values: [5.0, 5.0, 25.0, 25.0],  points: 0, maxPoints: 1, icon: "ability_druid_disembowel", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Magical damage dealt by your spells increased by $?a137012[Z][X]%. */
    "Circle of the Heavens": {id: 474541, values: [5.0, 5.0, 25.0, 25.0],  points: 0, maxPoints: 1, icon: "spell_druid_equinox", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You gain a bonus while in each form inspired by the breadth of your Druidic knowledge:    No Form: $378989s2% Magic Damage  Cat Form: $378990s2% Stamina  Bear Form: $378991s2% Movement Speed  Moonkin Form: $378992s2% Area damage taken reduction */
    "Lycara's Inspiration": {id: 1232897, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_trinket_ardenweald_02_yellow", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Casting Regrowth increases your movement speed and healing received by X% for $400126d. */
    "Forestwalk": {id: 400129, values: [8.0],  points: 0, maxPoints: 2, icon: "spell_lifegivingspeed", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Shred, Rake, and Skull Bash can be used in any form and shift you into Cat Form, if necessary.     Mangle can be used in any form and shifts you into Bear Form.     Wrath and Starfire shift 
    you into Moonkin Form, if known. */
    "Fluid Form": {id: 449193, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_druid_mastershapeshifter", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
}

const specTalents: TalentTree = {
    /* Your healing over time from Lifebloom has a X% chance to cause a Clearcasting state, making your next $?a155577[${$155577m1+1} Regrowths][Regrowth] cost no mana. */
    "Omen of Clarity": {id: 113043, values: [4.0],  points: 0, maxPoints: 1, icon: "spell_nature_crystalball", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Swiftmend no longer consumes a heal over time effect, and extends the duration of your heal over time effects on the target by X sec. */
    "Verdant Infusion": {id: 392410, values: [8.0],  points: 0, maxPoints: 1, icon: "inv_relics_totemoflife", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Swiftmend now has ${$m1+1} charges. */
    "Prosperity": {id: 200383, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_druid_giftoftheearthmother", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The healing bonus to Regrowth from Nature's Swiftness is increased by X%. */
    "Nature's Splendor": {id: 392288, values: [35.0],  points: 0, maxPoints: 1, icon: "spell_nature_spiritarmor", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Nature's Swiftness's cooldown is reduced by ${X/-1000} sec. */
    "Passing Seasons": {id: 382550, values: [-12000.0],  points: 0, maxPoints: 1, icon: "spell_nature_ravenform", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Regrowth's initial heal has a X% increased chance for a critical effect if the target is already affected by Regrowth. */
    "Improved Regrowth": {id: 231032, values: [40.0],  points: 0, maxPoints: 1, icon: "spell_nature_resistnature", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Swiftmend increases the healing of your next Regrowth or Rejuvenation by $114108s1%$?s392302[, and they apply to $392302s1 additional targets within $392302s2 yards.][.] */
    "Soul of the Forest": {id: 158478, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_druid_manatree", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases Omen of Clarity's chance to activate Clearcasting to Z% and Clearcasting can stack X additional time. */
    "Tranquil Mind": {id: 403521, values: [1.0, 1.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_druid_serenefocus", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Lifebloom blooms, up to X targets within your Efflorescence are healed for $392329s1. */
    "Verdancy": {id: 392325, values: [3.0],  points: 0, maxPoints: 1, icon: "inv_10_herb_seed_magiccolor5", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Efflorescence healing increased by X%, and it now automatically grows beneath your Lifebloom target's feet. */
    "Lifetreading": {id: 1217941, values: [25.0],  points: 0, maxPoints: 1, icon: "inv12_ability_druid_lifetreading", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting Swiftmend or Wild Growth summons a Treant that casts Nourish on that target or a nearby ally periodically, healing for ${$422090m1}. Lasts $102693d. */
    "Grove Guardians": {id: 1226140, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_druid_forceofnature", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Reduces the cooldown of Tranquility by ${$m1/-1000} sec.    While channeling Tranquility, you take $740s5% reduced damage and are immune to knockbacks. */
    "Inner Peace": {id: 197073, values: [-30000.0],  points: 0, maxPoints: 1, icon: "ability_druid_dreamstate", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Tranquility extends the duration of all of your heal over time effects by X sec every $740t1 sec. */
    "Flourish": {id: 197721, values: [2.0],  points: 0, maxPoints: 1, icon: "spell_druid_wildburst", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Rejuvenation heals a target below X% health, they are instantly healed for $200389s1. */
    "Cultivation": {id: 200390, values: [60.0],  points: 0, maxPoints: 1, icon: "spell_nature_healingtouch", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Wild Growth heals X additional $ltarget:targets;. */
    "Improved Wild Growth": {id: 328025, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_druid_flourish", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Ironbark increases healing from your heal over time effects by X%. */
    "Stonebark": {id: 197061, values: [20.0],  points: 0, maxPoints: 1, icon: "archaeology_5_0_crackedmogurunestone", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Ironbark's cooldown is reduced by ${X/-1000} sec. */
    "Improved Ironbark": {id: 382552, values: [-20000.0],  points: 0, maxPoints: 1, icon: "spell_druid_ironbark", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Swiftmend cooldown is reduced by X%, increasing up to Y% on lower health targets. */
    "Renewing Surge": {id: 470562, values: [15.0, 30.0],  points: 0, maxPoints: 1, icon: "inv_relics_idolofhealth", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Regrowth's healing over time is increased by X%, and it also applies to the target of your Lifebloom. */
    "Rampant Growth": {id: 404521, values: [100.0],  points: 0, maxPoints: 1, icon: "spell_nature_resistnature", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Rejuvenation healing is increased by up to X%, and Tranquility healing is increased by up to Y%, healing for more on low-health targets. */
    "Regenesis": {id: 383191, values: [10.0, 20.0],  points: 0, maxPoints: 2, icon: "inv_misc_herb_liferoot_stem", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Grove Guardians, Efflorescence, and your other summons heal for X% more. */
    "Wild Synthesis": {id: 400533, values: [30.0, 30.0, 30.0],  points: 0, maxPoints: 1, icon: "spell_nature_protectionformnature", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Soul of the Forest now causes your next Rejuvenation or Regrowth to apply to X additional $Lally:allies; within $189877s1 yards of the target. */
    "Power of the Archdruid": {id: 392302, values: [2.0, 20.0],  points: 0, maxPoints: 1, icon: "spell_druid_rampantgrowth", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Wild Growth's healing falls off X% less over time. */
    "Unstoppable Growth": {id: 382559, values: [40.0],  points: 0, maxPoints: 2, icon: "ability_druid_flourish", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Swiftmend healing increased by X%. */
    "Improved Swiftmend": {id: 470549, values: [30.0],  points: 0, maxPoints: 1, icon: "ability_druid_empoweredtouch", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Allies protected by your Ironbark also receive X% of the healing from each of your active Rejuvenations and Ironbark's duration is increased by ${Y/1000} sec. */
    "Regenerative Heartwood": {id: 392116, values: [75.0, 4000.0],  points: 0, maxPoints: 1, icon: "spell_nature_naturetouchgrow", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Heals you for X% of your maximum health every $t1 sec. If you are at full health, an injured party or raid member will be healed instead.$?a392221[    Healing is increased by $392221s1% for 
    each of your active Rejuvenations.][] */
    "Ysera's Gift": {id: 145108, values: [3.0],  points: 0, maxPoints: 1, icon: "inv_misc_head_dragon_green", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When you cast Starsurge, Rake, Shred, or Frenzied Regeneration you gain Call of the Elder Druid for Y sec, once every $338643d.    $@spellicon319454 $@spellname319454  $@spelldesc319454 */
    "Call of the Elder Druid": {id: 426784, values: [15.0],  points: 0, maxPoints: 1, icon: "spell_unused2", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Regrowth critically heals, it is ${X+200}% effective instead of the usual 200%. */
    "Intensity": {id: 1264649, values: [75.0],  points: 0, maxPoints: 1, icon: "spell_frost_windwalkon", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your damage over time effects deal their damage X% faster, and your healing over time effects heal Y% faster. */
    "Liveliness": {id: 426702, values: [-25.0, -5.0, -25.0],  points: 0, maxPoints: 1, icon: "spell_druid_symbiosis", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your abilities are amplified based on your current shapeshift form, granting an additional effect.    Wrath, Starfire, and Starsurge deal Y% additional damage and generate $411146s1 Mana.   
    $@spellicon197491|CFFFFFFFFBear Form|R  Ironfur grants X% additional armor and generates $411144s1 Mana.    $@spellicon202155 |CFFFFFFFFCat Form|R  Rip, Ferocious Bite, and Maim deal Z% additional damage and generate $411143s1 Mana when cast with $s4 combo points. */
    "Master Shapeshifter": {id: 289237, values: [30.0, 30.0, 60.0, 5.0, 0.0, 60.0],  points: 0, maxPoints: 1, icon: "ability_druid_mastershapeshifter", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Ysera's Gift now heals every ${Y/1000} sec and its healing is increased by X% for each of your active Rejuvenations. */
    "Waking Dream": {id: 392221, values: [8.0, 4000.0],  points: 0, maxPoints: 1, icon: "inv_misc_head_dragon_green", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Wild Growth momentarily shifts your mind into the Emerald Dream, instantly healing all allies affected by your Rejuvenation or Regrowth for $392147s1. */
    "Embrace of the Dream": {id: 392124, values: [5.0, 100.0, 100.0],  points: 0, maxPoints: 1, icon: "ability_druid_healinginstincts", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $@spellicon33891 $@spellname5420  During Incarnation: Tree of Life, you summon a Grove Guardian every $393418t sec. The cooldown of Incarnation: Tree of Life is reduced by ${$393381s1/-1000}.1 sec when Grove Guardians fade.    $@spellicon391528 $@spellname391528  Convoke the Spirits' cooldown is reduced by ${($abs($393374s4)/120000)*100}% and its duration and number of spells cast is reduced by $393374s1%. Convoke the Spirits has an increased chance to use an exceptional spell or ability. */
    "Cenarius' Guidance": {id: 393371, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_druid_treeoflife", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Regrowth heals all other allies with Regrowth for X% of its healing. */
    "Nature's Bounty": {id: 1263879, values: [20.0],  points: 0, maxPoints: 1, icon: "talentspec_druid_restoration", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Wrath and Shred transfer X% of their damage and Starfire and Swipe transfer Y% of their damage into healing onto a nearby ally.     This effect is increased by Z% while Call of the Elder Druid is active. */
    "Dream of Cenarius": {id: 158504, values: [100.0, 50.0, 200.0],  points: 0, maxPoints: 1, icon: "ability_druid_dreamstate", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Rejuvenation instantly heals your target for X% of its total periodic effect and Regrowth's duration is increased by ${Y/1000} sec. */
    "Thriving Vegetation": {id: 447131, values: [20.0, 3000.0],  points: 0, maxPoints: 2, icon: "spell_nature_rejuvenation", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* For each Rejuvenation you have active, Regrowth's cost is reduced by $207640s1% and critical effect chance is increased by $207640s2%, up to a maximum of ${$207640s2*$207640u}%. */
    "Abundance": {id: 207383, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When your Rejuvenation heals a full health target, its duration is increased by X sec, up to a maximum total increase of Y sec per cast. */
    "Nurturing Dormancy": {id: 392099, values: [2.0, 4.0],  points: 0, maxPoints: 1, icon: "ability_druid_replenish", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your periodic heals on targets with Lifebloom have a Y% chance to cause it to bloom. */
    "Photosynthesis": {id: 274902, values: [0.0, 8.0],  points: 0, maxPoints: 1, icon: "spell_lifegivingseed", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Lifebloom counts for ${X+1} stacks of Mastery: Harmony. */
    "Harmonious Blooming": {id: 392256, values: [2.0],  points: 0, maxPoints: 1, icon: "inv_misc_herb_felblossom", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Every X casts of Swiftmend grants you Incarnation: Tree of Life for Y sec. */
    "Reforestation": {id: 392356, values: [4.0, 10.0],  points: 0, maxPoints: 1, icon: "inv_herbalism_70_yserallineseed", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You can apply Rejuvenation twice to the same target. Rejuvenation's duration is increased by ${X/1000} sec. */
    "Germination": {id: 155675, values: [2000.0],  points: 0, maxPoints: 1, icon: "spell_druid_germination", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Lifebloom stacks every X sec, stacking up to ${Y+1} times. */
    "Everbloom1": {id: 392167, values: [5.0, 2.0], points: 0, maxPoints: 4, icon: "inv12_apextalent_druid_everbloom", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Y% of Lifebloom's healing splashes to X allies within $1244341a1 yds. */
    "Everbloom2": {id: 1244331, values: [2.0, 15.0], points: 0, maxPoints: 4, icon: "inv12_apextalent_druid_everbloom", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Lifebloom bursts into a Blooming Frenzy when you consume Soul of the Forest, causing it to bloom X times in rapid succession. */
    "Everbloom3": {id: 1244470, values: [5.0], points: 0, maxPoints: 4, icon: "inv12_apextalent_druid_everbloom", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
}

const heroTalents: TalentTree = {
    // Wildstalker
    /* Rip and Rake damage has a chance to cause Bloodseeker Vines to grow on the victim, dealing $439531o1 Bleed damage over $439531d.    $?a137011[Wild Growth and Regrowth][Wild Growth, Regrowth, and Efflorescence] healing has a chance to cause Symbiotic Blooms to grow on the target, healing for $439530o1 over $439530d.    Multiple instances of these can overlap. */
    "Thriving Growth": {id: 439528, values: [100.0, 135.0, 85.0, 85.0, 155.0, 62.0, 75.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_ability_wildstalkerdruid_thrivinggrowth", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Damage and healing while in Cat Form increased by X%.    Moonfire and Sunfire damage increased by $s4%. */
    "Hunt Beneath the Open Skies": {id: 439868, values: [3.0, 3.0, 3.0, 10.0, 10.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "spell_druid_lunarinspiration", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137011[Tiger's Fury and attacking from Prowl increase][Attacking from Prowl increases] the chance for Shred, Rake, and $?s202028[Brutal Slash][Swipe] to critically strike by $439891s1% for $439891d.    Your periodic heals have a X% increased chance to critically heal. */
    "Strategic Infusion": {id: 439890, values: [4.0, 4.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "ability_druid_supriseattack", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Rip and Ferocious Bite damage increased by X%.    Rejuvenation$?a137012[, Efflorescence, and Lifebloom][] healing increased by Z%. */
    "Wildstalker's Power": {id: 439926, values: [5.0, 5.0, 10.0, 10.0, 10.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "ability_druid_skinteeth", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The rate at which $?c2[Bloodseeker Vines][Symbiotic Blooms] grow is increased by $?c2[X][Y]%. */
    "Green Thumb": {id: 1270565, values: [20.0, 20.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "spell_lifegivingseed", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When you remove an effect with Soothe or $?s88423[Nature's Cure][Remove Corruption], gain a combo point and heal for X% of your maximum health. If you are at full health an injured party or 
    raid member will be healed instead. */
    "Lethal Preservation": {id: 455461, values: [4.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "spell_nature_healingtouch", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Enemies pulled into Ursol's Vortex are rooted in place for ${X/1000} sec. Damage may cancel the effect. */
    "Entangling Vortex": {id: 439895, values: [3000.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "spell_druid_ursolsvortex", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* During Barkskin your movement speed is increased by X% and every second flowers grow beneath your feet that heal up to $439902s2 nearby injured allies for $439902s1. */
    "Flower Walk": {id: 439901, values: [10.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_misc_trailofflowers", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Healing you receive is increased by X%. */
    "Bond with Nature": {id: 439929, values: [4.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_misc_marrigolds_01", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* Your Regrowth's healing to yourself is increased by X%. */
    "Harmonious Constitution": {id: 440116, values: [35.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "talentspec_druid_restoration", select: true, tier: 2, runFunc: function (state: 
    any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Bloodseeker Vines expire or you use Ferocious Bite on their target they explode in thorns, dealing $440122s1 physical damage to nearby enemies. Damage reduced above 5 targets.    When Symbiotic Blooms expire or you cast Rejuvenation on their target flowers grow around their target, healing them and up to $440121s2 nearby allies for $440121s1. */
    "Bursting Growth": {id: 440120, values: [0.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_collections_armor_flowerbracelet_b_01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Bloodseeker Vines and Symbiotic Blooms last ${X/1000} additional sec.    When a target afflicted by Bloodseeker Vines dies, the vines jump to a valid nearby target for their remaining duration. */
    "Resilient Flourishing": {id: 439880, values: [2000.0, 2000.0, 2000.0, 2000.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_misc_herb_16", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Each active Bloodseeker Vine increases the damage your abilities deal by 2%.    Each active Symbiotic Bloom increases the healing of your spells by 2%. */
    "Root Network": {id: 439882, values: [0.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "ability_creature_poison_04", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* Your $?c2[Bleeds and other damage over time][heal over time] effects are $?c2[X][Z]% more effective. */
    "Patient Custodian": {id: 1270592, values: [6.0, 6.0, 6.0, 6.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_helm_misc_rose_a_01_red", select: true, tier: 2, runFunc: function 
    (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Bloodseeker Vines or Symbiotic Blooms grow, they have a X% chance to cause another growth of the same type to immediately grow on a valid nearby target. */
    "Twin Sprouts": {id: 440117, values: [30.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_misc_herb_evergreenmoss", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137011[When you gain or lose Tiger's Fury, your next single-target melee ability causes a Bloodseeker Vine to grow on the target for ${X/1000} sec.][Casting Swiftmend or Wild Growth causes a Symbiotic Bloom to grow on a target for ${Y/1000} sec.] */
    "Implant": {id: 440118, values: [4000.0, 6000.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "ability_creature_poison_03", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Bloodseeker Vines][Symbiotic Blooms] have a $?c2[X][Y]% chance to trigger Bursting Growth every 2 sec at $?c2[Z][$s4]% effectiveness.   */
    "Rampancy": {id: 1270586, values: [20.0, 20.0, 100.0, 100.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "inv_misc_thornnecklace", select: true, tier: 2, runFunc: function (state: 
    any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Bloodseeker Vines increase the damage your abilities deal to affected enemies by X%.    Symbiotic Blooms increase the healing your spells do to affected targets by Y%. */
    "Vigorous Creepers": {id: 440119, values: [4.0, 20.0], heroTree: "Wildstalker", points: 0, maxPoints: 1, icon: "spell_druid_massentanglement", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Force of Nature grants X charges of Dream Burst, causing your next Wrath or Starfire to explode on the target, dealing ${$433850s1*(1+$393014s3/100)} Nature damage to nearby enemies. Damage reduced above $433850s2 targets.][When Grove Guardians are summoned, they grow Dream Petals on your target, healing up to Y nearby allies for $434141s1.] */
    "Dream Surge": {id: 433831, values: [3.0, 3.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "inv_ability_keeperofthegrovedruid_dreamsurge_fiendly", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your $?a137013[Force of Nature treants][Grove Guardians] cast Moonfire on nearby targets about once every X sec. */
    "Treants of the Moon": {id: 428544, values: [6.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "spell_nature_starfall", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your maximum mana is increased by Y%$?a137013[ and your maximum Astral Power is increased by ${X/10}][]. */
    "Expansiveness": {id: 429399, values: [200.0, 5.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "spell_nature_abolishmagic", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Regrowth protects you, reducing damage you take by X% while your Regrowth is on you. */
    "Protective Growth": {id: 433748, values: [8.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "spell_nature_resistnature", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Entering an Eclipse summons a Dryad to assist you for $1264618d, casting Starsurge dealing $1264677s1 astral damage and Starfall at Y% effectiveness.][Your periodic heals have a chance 
    to empower your next Swiftmend to summon a Dryad to assist you, casting Tranquility at X% effectiveness and Regrowth to heal $1264664s1 damage onto your lowest health ally.] */
    "Sylvan Beckoning": {id: 1264614, values: [10.0, 200.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ui_darkshore_warfront_alliance_dryad", select: true, tier: 2, runFunc: 
    function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Your Force of Nature treants no longer taunt and deal $449001s1% increased melee damage.][Your Grove Guardians increase the healing of your Rejuvenation, Efflorescence, and Lifebloom by $428866s1% while active.] */
    "Power of Nature": {id: 428859, values: [0.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "spell_nature_naturesblessing", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Your Force of Nature treants have 50% increased health.][Grove Guardians last Y% longer.] */
    "Durability of Nature": {id: 429227, values: [100.0, 20.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ability_druid_manatree", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Entering Eclipse increases your haste by $455801s1% for $455801d][Swiftmend healing is increased by Y%]. */
    "Cenarius' Might": {id: 455797, values: [0.0, 20.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "achievement_reputation_guardiansofcenarius", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Wrath and Starfire damage increased by X%.     Regrowth$?a137013[ and Wild Growth][, Wild Growth, and Swiftmend] healing increased by Y%. */
    "Grove's Inspiration": {id: 429402, values: [10.0, 9.0, 9.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ability_druid_protectionofthegrove", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Orbital Strike damage increased by Z%, and damage of Stellar Flares it applies increased by Y%.    Whirling Stars increases the haste you gain during ][]$?c1&s394013[Incarnation: Chosen of Elune]?c1[Celestial Alignment][]$?c1[ by an additional $s4%.][Reforestation grants Tree of Life for $s5 additional sec.] */
    "Potent Enchantments": {id: 429420, values: [30.0, 30.0, 30.0, 10.0, 3.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ability_druid_serenefocus", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c4[Dryads cause Swiftmend to cool down $1264618s3% faster.][Dryads cause most of your Astral power generation to be increased by $1264618s4%.] */
    "Dryad's Dance": {id: 1264776, values: [25.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "inv_stave_2h_druid_a_01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Force of Nature summons 4 Treants.][Your Grove Guardians' healing is increased by X%.] */
    "Bounteous Bloom": {id: 429215, values: [30.0, 1.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "inv_herbalism_70_dreamleaf", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Force of Nature cooldown reduced by ${X/-1000} sec.][Swiftmend and Wild Growth cooldowns reduced by ${Y/-1000} sec.] */
    "Early Spring": {id: 428937, values: [-15000.0, -1000.0, -1000.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "inv_misc_trailofflowers", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Force of Nature grants an additional stack of Dream Burst.][Dream Surge heals Y additional $Lally:allies;.] */
    "Power of the Dream": {id: 434220, values: [1.0, 1.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ability_xavius_dreamsimulacrum", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Time elapsed while your major abilities are available to be used or at maximum charges is subtracted from that ability's cooldown after the next time you use it, up to X seconds.    Affects 
    $?a137012[Nature's Swiftness, Incarnation: Tree of Life,][Force of Nature,] $?a137012[]?a394013[Incarnation: Chosen of Elune, ][Celestial Alignment, ]and Convoke the Spirits. */
    "Control of the Dream": {id: 434249, values: [15.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "inv_cloth_outdooremeralddream_d_01_buckle", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Every X Regrowths you cast makes your next Wrath, Starfire, or Entangling Roots instant and increases damage it deals by $429474s2%.    Every X Starsurges $?a137013[or Starfalls ][]you cast 
    makes your next Regrowth or Entangling roots instant. */
    "Blooming Infusion": {id: 429433, values: [5.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "spell_nature_thorns", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c4[Ironbark summons a Dryad to channel a beam of pure nature onto your target, healing them for $1264905o1 over $1264905d.][Your Starfall damage is increased by X% and your Starsurge damage is increased by Y%.] */
    "Spirit of the Thicket": {id: 1264899, values: [8.0, 8.0, 0.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ability_druid_naturalperfection", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137013[Each of your Force of Nature treants increases damage your spells deal by $428735s1% while active.][Each of your Grove Guardians increases your healing done by $428737s1% while active.] */
    "Harmony of the Grove": {id: 428731, values: [0.0], heroTree: "Keeper of the Grove", points: 0, maxPoints: 1, icon: "ability_druid_forceofnature", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    // Keeper of the Grove
}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};