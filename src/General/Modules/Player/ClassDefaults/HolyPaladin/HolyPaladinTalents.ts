const classTalents: TalentTree = {
    /* After you spend Z Holy Power, your next Word of Glory echoes onto a nearby ally at X% effectiveness. */
    "Afterimage": {id: 385414, values: [30.0, 1.0, 20.0],  points: 0, maxPoints: 1, icon: "spell_holy_aspiration", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When your health is brought below X%, you instantly cast a free Word of Glory at Y% effectiveness on yourself.    Cannot occur more than once every $proccooldown sec. */
    "Guided Prayer": {id: 404357, values: [25.0, 60.0],  points: 0, maxPoints: 1, icon: "ability_crown_of_the_heavens_icon", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Judgment deems the target unworthy, preventing the next $<shield> damage dealt by the target.   */
    "Greater Judgment": {id: 231644, values: [138.0],  points: 0, maxPoints: 1, icon: "spell_holy_righteousfury", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While holding a shield, you have a Y% chance to block incoming spells, reducing their damage by Z%.     Without a shield, you have a $s4% chance to parry incoming melee attacks, reducing their damage by $s5%. */
    "Armory of Light": {id: 1277443, values: [0.0, 15.0, 20.0, 15.0, 20.0],  points: 0, maxPoints: 1, icon: "inv12_ability_paladin_sentinel", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Armor increased by Z%, Stamina increased by X% and damage taken from area of effect attacks reduced by Y%. */
    "Sanctified Plates": {id: 402964, values: [5.0, -3.0, 10.0],  points: 0, maxPoints: 2, icon: "inv_chest_plate_raidpaladin_s_01", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $@spelldesc386732 */
    "Divine Resonance": {id: 386738, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_mount_goatmountwhite", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Divine Toll's, Holy Armament's, and Holy Prism's][Divine Toll's] cooldown is reduced by ${-X/1000} sec. */
    "Quickened Invocation": {id: 379391, values: [-15000.0, -15000.0],  points: 0, maxPoints: 1, icon: "spell_holy_pureofheart", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* Armor and critical strike chance increased by Y%. */
    "Holy Aegis": {id: 385515, values: [4.0, 4.0, 0.0],  points: 0, maxPoints: 1, icon: "ability_paladin_touchedbylight", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* After your Blessing of Sacrifice ends, X% of the total damage it diverted is added to your next Judgment as bonus damage, or your next Word of Glory as bonus healing.    This effect's bonus 
    damage cannot exceed Z% of your maximum health and its bonus healing cannot exceed $s4% of your maximum health. */
    "Recompense": {id: 384914, values: [50.0, 25.0, 30.0, 100.0],  points: 0, maxPoints: 1, icon: "ability_racial_foregedinflames", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Power spending abilities have X% increased damage and healing. */
    "Sacred Strength": {id: 469337, values: [2.0],  points: 0, maxPoints: 1, icon: "spell_holy_righteousnessaura", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Power spending abilities have a X% chance to make your next Holy Power spending ability free and deal $223819s2% increased damage and healing. */
    "Divine Purpose": {id: 223817, values: [15.0],  points: 0, maxPoints: 1, icon: "spell_holy_divinepurpose", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?s2812[Denounce][Shield of the Righteous] heals you and up to Z nearby allies for $403460s1. */
    "Lightforged Blessing": {id: 406468, values: [0.0, 2.0, 2.0],  points: 0, maxPoints: 1, icon: "spell_holy_circleofrenewal", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},


    /* $@spelldesc379017 */
    "Faith's Armor": {id: 406101, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_shield_1h_newplayer_a_01", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Mastery increased by Y% and $?c1[Intellect][Strength] increased by X%. */
    "Seal of Might": {id: 385450, values: [2.0, 2.0],  points: 0, maxPoints: 2, icon: "spell_holy_sealofwrath", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Hammer of Wrath deals up to X% additional damage based on its target's health. Lower health targets receive more damage. */
    "Vengeful Wrath": {id: 1241958, values: [50.0],  points: 0, maxPoints: 2, icon: "spell_paladin_hammerofwrath", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Consecration heals you and Y allies within it for $<points> every $26573t1 sec. */
    "Golden Path": {id: 377128, values: [0.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_priest_cascade", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Flash of Light $?c1[and Holy Light are][is] X% more effective on your allies and Y% of the healing done also heals you. */
    "Selfless Healer": {id: 469434, values: [30.0, 40.0],  points: 0, maxPoints: 1, icon: "ability_paladin_gaurdedbythelight", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While you are above Z% health, X% of all damage taken by allies within $210372a1 yds is redirected to you, up to a maximum of $<maxAbsorb> every X sec. */
    "Blessing of Dawn": {id: 183416, values: [5.0, 10.0, 85.0, 30.0, 75.0, 0.0, 5.0],  points: 0, maxPoints: 1, icon: "achievement_zone_valeofeternalblossoms", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* X% of all healing done to you from other sources heals up to Y nearby allies, divided evenly among them. */
    "Lightbearer": {id: 469416, values: [10.0, 4.0],  points: 0, maxPoints: 1, icon: "spell_paladin_clarityofpurpose", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Damage taken reduced by up to X%, increasing as your health decreases. */
    "Blessing of Dusk": {id: 1241945, values: [10.0, 0.0],  points: 0, maxPoints: 1, icon: "achievement_zone_newshadowmoonvalley", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

}

const specTalents: TalentTree = {
    /* Your Holy Shocks have a X% chance to empower your next spell cast:    $@spellname19750: healing increased by $54149s1% and becomes instant cast.  $@spellname275773: Greater Judgment prevents an additional ${$54149s4-100}% damage dealt by the target and generates $54149s6 additional Holy Power. */
    "Infusion of Light": {id: 53576, values: [10.0],  points: 0, maxPoints: 1, icon: "ability_paladin_infusionoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Shock now has ${X+1} charges and it refunds Y% of its mana cost when cast on an enemy. */
    "Light's Conviction": {id: 414073, values: [1.0, 50.0],  points: 0, maxPoints: 1, icon: "paladin_holy", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Mastery: Lightbringer now increases your healing based on the target's proximity to either you or your Beacon of Light, whichever is closer. */
    "Beacon of the Lightbringer": {id: 197446, values: [30.0],  points: 0, maxPoints: 1, icon: "spell_paladin_clarityofpurpose", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Word of Glory and Light of Dawn gain up to X% additional chance to critically strike, based on their target's current health. Lower health targets are more likely to be critically struck. */
    "Extrication": {id: 461278, values: [30.0],  points: 0, maxPoints: 1, icon: "spell_holy_spiritualguidence", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Activating Aura Mastery also casts a Divine Toll at X% effectiveness. */
    "Ringing of the Heavens": {id: 1241542, values: [100.0],  points: 0, maxPoints: 1, icon: "paladin_protection", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Light of Dawn receives X% increased benefit from Mastery: Lightbringer. */
    "Unending Light": {id: 1271221, values: [20.0],  points: 0, maxPoints: 1, icon: "spell_holy_holybolt", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Shock, Holy Light, and Flash of Light critical healing increased by X%. */
    "Awestruck": {id: 417855, values: [20.0],  points: 0, maxPoints: 1, icon: "ability_paladin_blindinglight2", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Flash of Light heals for an additional X% when cast on a target affected by your Beacon of Light. */
    "Moment of Compassion": {id: 387786, values: [50.0],  points: 0, maxPoints: 1, icon: "spell_holy_flashheal", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: 
    any, points: number) {

    }},

    /* Holy Light heals up to Y targets within $392903a1 yds for X% of its healing. */
    "Resplendent Light": {id: 392902, values: [8.0, 5.0, 5.0],  points: 0, maxPoints: 1, icon: "ability_priest_voidshift", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The mana cost of Holy Light is reduced by X% and its cast time is reduced by Y%. */
    "Divine Favor": {id: 1270916, values: [-10.0, -15.0],  points: 0, maxPoints: 1, icon: "spell_holy_heal", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The cooldown of Aura Mastery is reduced by ${X/-1000} sec. */
    "Unwavering Spirit": {id: 392911, values: [-30000.0],  points: 0, maxPoints: 1, icon: "spell_holy_fanaticism", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Aura Mastery also increases all healing received by party or raid members within $211210A1 yards by X%. */
    "Protection of Tyr": {id: 200430, values: [10.0],  points: 0, maxPoints: 1, icon: "spell_holy_auramastery", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Consuming Infusion of Light reduces the cooldown of Holy Shock by ${X/-1000}.1 sec. */
    "Imbued Infusions": {id: 392961, values: [-1000.0],  points: 0, maxPoints: 1, icon: "ability_priest_flashoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While above X% health, Holy Shock's healing is increased $447988s1%, but creates a heal absorb on you for Y% of the amount healed that prevents Beacon of Light from healing you until it has 
    dissipated. */
    "Light of the Martyr": {id: 447985, values: [80.0, 30.0],  points: 0, maxPoints: 1, icon: "ability_paladin_lightofthemartyr", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Judgment has a X% chance to cast Consecration at the target's location.    The limit on Consecration does not apply to this effect. */
    "Righteous Judgment": {id: 414113, values: [100.0],  points: 0, maxPoints: 1, icon: "ability_priest_holybolts01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When an ally with your Beacon of Light is damaged, they absorb the next $157128s1 damage, increasing by up to Z% based on their current health. Lower health allies are shielded for more. */
    "Saved by the Light": {id: 157047, values: [300.0, 9.0],  points: 0, maxPoints: 1, icon: "ability_paladin_savedbythelight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Allies with Beacon of Light receive X% less damage. */
    "Light's Protection": {id: 461243, values: [5.0],  points: 0, maxPoints: 1, icon: "spell_holy_absolution", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* X% of Holy Shock's overhealing is converted into an absorb shield. The shield amount cannot exceed Y% of your max health. */
    "Overflowing Light": {id: 461244, values: [30.0, 10.0],  points: 0, maxPoints: 1, icon: "spell_holy_holyguidance", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?s2812[Denounce][Shield of the Righteous] deals $414448s1 damage to its first target struck.    $?s2812[Denounce][Shield of the Righteous] now has a X% chance to activate Divine Purpose if 
    talented. */
    "Shining Righteousness": {id: 414443, values: [35.0, 0.0],  points: 0, maxPoints: 1, icon: "spell_holy_holynova", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* X% of Word of Glory and Light of Dawn's healing is converted into Holy damage that strikes a nearby enemy. */
    "Liberation": {id: 461287, values: [20.0],  points: 0, maxPoints: 1, icon: "ability_paladin_toweroflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Shock reduces the cooldown of Judgment by ${$m1/-1000}.1 sec and Crusader Strike reduces the cooldown of Judgment by ${$m2/-1000}.1 sec. */
    "Crusader's Might": {id: 196926, values: [-1500.0, -1500.0],  points: 0, maxPoints: 1, icon: "ability_paladin_swiftretribution", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Lay on Hands' cooldown is reduced by X% and restores $415299s1% of your Mana. */
    "Tirion's Devotion": {id: 414720, values: [-30.0],  points: 0, maxPoints: 1, icon: "spell_holy_revivechampion", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Beacon of Light transfers an additional X% of the amount healed. */
    "Commanding Light": {id: 387781, values: [5.0],  points: 0, maxPoints: 1, icon: "ability_paladin_beaconoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While at maximum health, targets with Beacon of Light generate an absorb shield equal to X% of their health every $53563t6 sec, up to a maximum of Y%. */
    "Glistening Radiance": {id: 1241805, values: [1.0, 5.0],  points: 0, maxPoints: 1, icon: "spell_paladin_divinecircle", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Increases Light of Dawn's healing by X%. */
    "Breaking Dawn": {id: 387879, values: [5.0],  points: 0, maxPoints: 2, icon: "spell_holy_rune", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
    number) {

    }},

    /* While empowered by Infusion of Light, Flash of Light heals for an additional Y% and Judgment refunds ${X/1000}.1% of your maximum mana. */
    "Divine Revelations": {id: 387808, values: [500.0, 20.0],  points: 0, maxPoints: 1, icon: "ability_paladin_infusionoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Shock and Judgment have a X% increased critical strike chance. */
    "Divine Glimpse": {id: 387805, values: [8.0],  points: 0, maxPoints: 1, icon: "spell_holy_healingaura", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
    points: number) {

    }},

    /* Light of the Martyr's health threshold is reduced to ${$s4+X}% and increases Holy Shock's healing by an additional $448087s1% for every $t2 sec Light of the Martyr is active, stacking up to 
    $448087u times.    While below ${$s4+X}% health, the light urgently heals you for $448086s1 every $448086t1 sec. */
    "Bestow Light": {id: 448040, values: [-10.0, 70.0, 70.0, 80.0, 69.0],  points: 0, maxPoints: 1, icon: "ability_paladin_sheathoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Judgment critical strikes empower your next Word of Glory to automatically activate Light of Dawn at Y% effectiveness. */
    "Empyrean Legacy": {id: 1241358, values: [0.0, 125.0],  points: 0, maxPoints: 1, icon: "item_holyspark", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Judgment grants an absorb shield on up to Y injured allies for $414411s2% of the damage done, split evenly among them.    Flash of Light and Holy Light critical strikes reset the cooldown of Judgment. */
    "Veneration": {id: 392938, values: [0.0, 5.0, 0.0],  points: 0, maxPoints: 1, icon: "ability_crown_of_the_heavens_icon", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Holy Shock refunds up to X% of its Mana cost and deals up to Y% more healing or damage, based on the target's missing health. */
    "Reclamation": {id: 415364, values: [10.0, 50.0],  points: 0, maxPoints: 1, icon: "ability_paladin_longarmofthelaw", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $@spellicon156910 $@spellname156910:  Allies with Beacon of Light or Beacon of Faith are healed for $53563s5 every $53563t5 sec.    $@spellicon200025 $@spellname200025:  Beacon of Virtue instantly heals allies for $1232617s1. */
    "Pillars of Light": {id: 1232616, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_helm_plate_raidpaladindragon_d_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While Avenging Wrath is not active, you gain X% Mastery.    While Avenging Wrath is active, you gain Y% movement speed. */
    "Seek Deliverance": {id: 1271016, values: [5.0, 30.0, 5.0],  points: 0, maxPoints: 1, icon: "spell_holy_blessedresillience", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?(c1|c2|c3)[][The duration of Avenging Wrath is increased by X%.]$?c1[Avenging Wrath and Avenging Crusader have X% increased duration.]?c2[Avenging Wrath and Sentinel cause Judgment to generate Z additional Holy Power,]?c3[Avenging Wrath and Crusade cause each Holy Power spent to explode with Holy light for $326731s1 damage to nearby enemies,][]$?(c2|c3)[ and have X% increased duration.][] */
    "Sanctified Wrath": {id: 53376, values: [25.0, 0.0, 1.0],  points: 0, maxPoints: 1, icon: "ability_paladin_judgementsofthejust", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While in combat, your Holy Power spenders have a X% chance to cause your next Judgment to deal $414193s1% increased damage and critically strike.    Activating Avenging Wrath activates Awakening. */
    "Awakening": {id: 414195, values: [10.0, 12.0, 1.0, 4.0],  points: 0, maxPoints: 1, icon: "inv_helm_plate_raidpaladin_n_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Avenging Wrath's cooldown is reduced by ${X/-1000} sec, but its duration is reduced by ${Y/-1000}.1 sec.    Avenging Crusader's cooldown is reduced by ${Z/-1000}.1 sec, but its duration is reduced by ${$s4/-1000}.1 sec. */
    "Call of the Righteous": {id: 1241511, values: [-30000.0, -5000.0, -30000.0, -3000.0],  points: 0, maxPoints: 2, icon: "ability_paladin_gaurdedbythelight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Judgment heals you for $461546s1 and its mana cost is reduced by X%. Y% of overhealing from this effect is transferred onto Z allies within $461529a1 yds. */
    "Truth Prevails": {id: 461273, values: [-30.0, 50.0, 2.0],  points: 0, maxPoints: 1, icon: "ability_paladin_artofwar", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Light's healing is increased by X%, but its mana cost is increased by Y%. */
    "Divine Overload": {id: 1271077, values: [30.0, 20.0],  points: 0, maxPoints: 1, icon: "spell_holy_surgeoflight", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your healing is increased by up to Y%, based on the average health percentage of allies with your Beacon of Light. */
    "Rising Sunlight": {id: 1277651, values: [0.0, 10.0, 0.0],  points: 0, maxPoints: 1, icon: "spell_priest_divinestar_holy", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Holy Shock has a X% chance to refund a charge when cast and its healing is increased by Y%. */
    "Glorious Dawn": {id: 461246, values: [12.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_paladin_holyavenger", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Word of Glory and Light of Dawn now convert Y% of their healing into an absorb shield instead. */
    "Seraphic Barrier": {id: 1241714, values: [18.0, -15.0],  points: 0, maxPoints: 1, icon: "ability_paladin_protectoroftheinnocent", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Activating Avenging Wrath releases the Light within yourself, healing $200652s2 injured allies instantly and an injured ally every $200652t1 sec within $200653A1 yds for $200654s1.    Allies healed also receive $200654s2% increased healing from your Holy Light, Flash of Light, and Holy Shock spells for $200654d.  */
    "Tyr's Deliverance": {id: 1241275, values: [1.0],  points: 0, maxPoints: 1, icon: "inv_mace_2h_artifactsilverhand_d_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, 
    talentData: any, points: number) {

    }},

    /* Activating Avenging Wrath calls upon the Light to empower you, causing your next $?s216331[Holy Light][X Holy Lights] to be instant cast and cost $414273s2% less mana. */
    "Hand of Divinity": {id: 1242008, values: [2.0, 1.0],  points: 0, maxPoints: 1, icon: "spell_holy_vindication", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Infusion of Light has X additional charge. */
    "Inflorescence of the Sunwell": {id: 392907, values: [1.0],  points: 0, maxPoints: 1, icon: "spell_lfieblood", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* While in combat, apply a Beacon of the Savior to the lowest health ally within X yds that causes your direct healing on others to also heal that ally for Y% of the amount healed.    Beacon of the Savior transfers to the lowest health ally within X yds if it heals a target past maximum health or if an ally drops below $1270083s4% health. */
    "Beacon of the Savior1": {id: 1244878, values: [30.0, 10.0, 0.0, 0.0],  points: 0, maxPoints: 4, icon: "inv12_apextalent_paladin_beaconofthesavior", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Beacon of the Savior transfers an additional X% of the amount healed and allies with Beacon of the Savior receive Y% more healing from you. */
    "Beacon of the Savior2": {id: 1245367,  values: [10.0, 10.0], points: 0, maxPoints: 4, icon: "inv12_apextalent_paladin_beaconofthesavior", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Every $t1 sec or when Beacon of the Savior transfers to a new injured target, they are granted an absorb shield that prevents the next $1245369s1 damage and reduces damage taken by $1245369s2% for $1245369d. */
    "Beacon of the Savior3": {id: 1245368,  values: [0.0], points: 0, maxPoints: 4, icon: "inv12_apextalent_paladin_beaconofthesavior", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
}

const heroTalents: TalentTree = {
    /* Casting $?c1[Holy Prism or Divine Toll]?c3[Wake of Ashes][] causes your next X Holy Power spending abilities to apply Dawnlight on your target, dealing $431380o1 Radiant damage or $431381o1 
    healing over $431380d.    $431581s1% of Dawnlight's damage and healing radiates to nearby allies or enemies, reduced beyond $431581s2 targets.$?c1[    Dawnlight's healing does not transfer to Beacon of Light.][] */
    "Dawnlight": {id: 431377, values: [2.0, 8000.0, 20.0, 3.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "inv_ability_heraldofthesunpaladin_dawnlight", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Every ${$t1}.1 sec, your next Dawnlight's damage or healing is increased by $431539s1%, stacking up to $431539u times.    Morning Star stacks twice as fast while out of combat. */
    "Morning Star": {id: 431482, values: [20.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_holy_persecution", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your Holy Power spenders deal X% additional damage and healing. */
    "Gleaming Rays": {id: 431480, values: [3.0, 3.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_priest_power_word", select: true, tier: 2, runFunc: function (state: any, 
    spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Critical Strike chance of Holy Shock and Light of Dawn increased by X%.]?c3[Critical Strike chance of Hammer of Wrath and Divine Storm increased by Y%.][] */
    "Luminosity": {id: 431402, values: [5.0, 10.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "inv_qirajidol_sun", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Dawnlight's duration is increased by ${X/1000}.1 sec when it heals an ally with full health.][Dawnlight's duration is increased by ${Y/1000}.1 sec whenever struck by Divine Storm or Templar's Verdict.    When 2 Dawnlights are struck by Divine Storm, their durations are extended by an additional ${Z/1000}.1 sec.] */
    "Endless Gleam": {id: 1263787, values: [500.0, 300.0, 300.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_paladin_inquisition", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dawnlight reduces the movement speed of enemies by $431380s3% and increases the movement speed of allies by $431381s3%. */
    "Illumine": {id: 431423, values: [0.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_holy_divineillumination", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Movement speed increased by $431462s1% while above X% health.    When your health is brought below Z%, your movement speed is increased by $431752s1% for $431752d. Cannot occur more than once every $456779d. */
    "Will of the Dawn": {id: 431406, values: [80.0, 80.0, 35.0, 35.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_holy_divineprovidence", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[The healing and damage of Holy Shock is increased by X%.]?c3[Your damage and healing over time effects have a chance to increase the damage of your next Judgment by $445206s1%.][] */
    "Blessing of An'she": {id: 445200, values: [15.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "inv_ability_holyfire_orb", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dawnlight leaves an Eternal Flame for ${X/1000} sec on allies or a Greater Judgment on enemies when it expires or is extended. */
    "Lingering Radiance": {id: 431407, values: [6000.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_holy_mindvision", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Holy Shock and Light of Dawn critical strikes cause the target to be healed for an additional $431415o1 over $431415d.]?c3[Hammer of Wrath and Divine Storm critical strikes cause the target to burn for an additional $431414o1 Radiant damage over $431414d.][] */
    "Sun Sear": {id: 431413, values: [0.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_priest_burningwill", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* Haste is increased by X%. */
    "Solar Grace": {id: 431404, values: [5.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "ability_malkorok_blightofyshaarj_yellow", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* After you cast $?c1[Holy Prism or Divine Toll]?c3[Wake of Ashes][], gain Divine Purpose.    $?c1[$@spellicon223819 $@spellname223819  $@spellaura223819]?c3[$@spellicon408458 $@spellname408458  $@spellaura408458][] */
    "Aurora": {id: 439760, values: [0.0, 1.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_holy_rune", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You have a X% chance to $?c3[gain Blessing of An'she and ][]generate Y Holy Power after casting Avenging Wrath.$?c3[    During Avenging Wrath, Hammer of Wrath casts Blade of Justice at Z% effectiveness.][] */
    "Walk Into Light": {id: 1263782, values: [100.0, 2.0, 100.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "ability_paladin_sheathoflight", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Light of Dawn and Holy Shock have a X% chance to cast again at Y% effectiveness.]?c3[Divine Storm and Hammer of Wrath have a X% chance to cast again at Y% effectiveness.][] */
    "Second Sunrise": {id: 431474, values: [15.0, 30.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "ability_priest_halo", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Dawnlight's critical strike chance is increased by $1264050s1% during Avenging Wrath. */
    "Born in Sunlight": {id: 1263920, values: [0.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "spell_paladin_lightofdawn", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You link to your Dawnlights within $s8 yds, causing $431911s1 Radiant damage to enemies or $431939s1 healing to allies that pass through the beams, reduced beyond $?c3[$s9][$s6] targets. */
    "Sun's Avatar": {id: 431425, values: [0.0, 0.0, 4.0, 2.0, 20.0, 5.0, 1.0, 30.0, 8.0], heroTree: "Herald of the Sun", points: 0, maxPoints: 1, icon: "ability_paladin_holyavenger", select: true, 
    tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* If you bestow an Armament upon an ally, you also gain its benefits.    If you bestow an Armament upon yourself, a nearby ally also gains its benefits. */
    "Solidarity": {id: 432802, values: [0.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "spell_holy_heroism", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* For each Holy Power ability cast, your next Consecration deals $?a137029[$<holy>][$<prot>] damage or healing immediately, split across all enemies and allies. */
    "Divine Guidance": {id: 433106, values: [30.0, 50.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "spell_holy_lightsgrace", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting a Holy Power ability increases the damage and healing of your next $?s204019[Blessed Hammer]?s53595[Hammer of the Righteous]?s137029[Holy Shock][Crusader Strike] by $433019s1%. */
    "Blessed Assurance": {id: 433015, values: [0.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "spell_holy_blessedlife", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* After casting a Holy Armament, your next X $Lability:abilities; $Lcasts:cast; a Lesser Armament of the same kind on a nearby ally. */
    "Masterwork": {id: 1271387, values: [3.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_mace_1h_blacksmithing_b_01_black", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your spells and abilities have a chance to manifest a Holy Armament for a nearby ally. */
    "Divine Inspiration": {id: 432964, values: [0.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "ability_priest_flashoflight", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The cooldown of Holy Armaments is reduced by X%. */
    "Forewarning": {id: 432804, values: [-20.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "ability_paladin_gaurdedbythelight", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Successfully $?c1[dispelling a harmful effect][interrupting an enemy spellcast] reduces $?c1[Cleanse's cooldown by ${Z/1000}.1 sec][Rebuke's cooldown by ${X/1000}.1 sec]. Effect increased by Y% while wielding a Holy Armament. */
    "Authoritative Rebuke": {id: 469886, values: [1000.0, 100.0, 1000.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_misc_symbolofkings_01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When you or an ally wielding a Holy Bulwark are healed above maximum health, transfer X% of the overhealing to your ally.    When you or an ally wielding a Sacred Weapon drop below $432502s4% health, redistribute your health immediately and every $469703t sec for $469703d. May only occur once per cast. */
    "Tempered in Battle": {id: 469701, values: [100.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_everburningforge_yellow", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When an Armament fades from you, the cooldown of Lay on Hands is reduced by ${X/1000}.1 sec and you gain $?a137028[Shining Light][Infusion of Light]. */
    "Laying Down Arms": {id: 432866, values: [15000.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "ability_paladin_handoflight", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Judgment critical strikes cause a shockwave around the target, $?c1[healing to up to Z injuried allies for $433722s1][dealing $433717s1 damage to enemies within $433717a1 yards. Damage reduced above $s4 targets]. */
    "Hammer and Anvil": {id: 433718, values: [100.0, 100.0, 5.0, 5.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_10_blacksmithing_consumable_repairhammer_color1", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Consuming $?a137028[Shining Light][Infusion of Light] reduces the cooldown of Holy Armaments by ${X/1000}.1 sec. */
    "Valiance": {id: 432919, values: [3000.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_mace_47", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* The effect of your active Aura is increased by $432496s1% on targets with your Armaments. */
    "Shared Resolve": {id: 432821, values: [0.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "spell_holy_devotionaura", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When your Holy Bulwark absorbs damage or your Sacred Weapon deals damage or healing, you have a chance to gain $?c2[Grand Crusader][Awakening]. */
    "Reflection of Radiance": {id: 1271466, values: [3.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_enchanting_70_pet_torch", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Holy Armaments activate][Divine Toll activates] Hammer and Anvil at X% effectiveness. */
    "Resounding Strike": {id: 1271553, values: [100.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_11_0_arathordungeon_bell_color1", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Avenging Wrath summons an additional Sacred Weapon, and during Avenging Wrath your Sacred Weapon casts spells on your target and echoes the effects of your Holy Power abilities. */
    "Blessing of the Forge": {id: 433011, values: [0.0], heroTree: "Lightsmith", points: 0, maxPoints: 1, icon: "inv_ability_lightsmithpaladin_sacredweapon", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},
}

export const paladinTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};