
/**
 * A list of talents to turn on
 */
export const defaultTalents = (talents: TalentTree, loadoutName: string, heroTree: string = "Flameshaper") => {
    let talentsEnabled: string[] = []
    let halfTalents: string[] = []

    if (loadoutName === "default") talentsEnabled = [

    ]

    // Apply talents
    Object.keys(talents).forEach(talentName => {
        if (talentsEnabled.includes(talentName) || talents[talentName].heroTree === heroTree) {
            talents[talentName].points = talents[talentName].maxPoints;
            //console.log(`Enabling talent: ${talentName}`);
        }
    })
}

const classTalents: TalentTree = {


/* Rising Sun Kick deals X% increased damage. Spinning Crane Kick deals Y% additional damage.   */
"Fast Feet": {id: 388809, values: [70.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_monk_risingsunkick", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Increases all healing taken by X%. */
"Grace of the Crane": {id: 388811, values: [6.0],  points: 0, maxPoints: 1, icon: "monk_ability_cherrymanatea", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* After casting $?a137023[Keg Smash][Rising Sun Kick], your next $?s399491[Sheilun's Gift][Vivify] becomes instant cast.$?c1[    This effect also reduces the energy cost of Vivify by $392883s3%.]?c3[  
  This effect also reduces the energy cost of Vivify by $392883s3%.][]   */
"Vivacious Vivification": {id: 388812, values: [15.0],  points: 0, maxPoints: 1, icon: "ability_monk_vivify", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* After casting Enveloping Mist, your next $?s399491[Sheilun's Gift][Vivify] becomes instant cast.   */
"Serene Surge": {id: 1266734, values: [15.0],  points: 0, maxPoints: 1, icon: "ability_monk_surgingmist", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* While no enemies are within X yds, you heal for $1266720s1 every $t1 sec. */
"Silent Sanctuary": {id: 1266719, values: [15.0],  points: 0, maxPoints: 1, icon: "spell_monk_zenpilgrimage", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* You heal for X% of all magical damage taken. */
"Chi Warding": {id: 1277444, values: [3.0],  points: 0, maxPoints: 1, icon: "inv_belt__inv_leather_raidmonkmythic_s_01", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* Every $t1 sec, your next $?a137023[Keg Smash][Rising Sun Kick] or $?s399491[Sheilun's Gift][Vivify] releases a wave of Chi energy that flows through friends and foes, dealing $132467s1 Nature damage 
or $132463s1 healing. Bounces up to $115098s1 times to targets within $132466a2 yards. */
"Chi Wave": {id: 450391, values: [0.0, -50.0],  points: 0, maxPoints: 1, icon: "ability_monk_chiwave", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* Increases all damage dealt by X%. */
"Ferocity of Xuen": {id: 388674, values: [2.0, 2.0, 2.0],  points: 0, maxPoints: 2, icon: "ability_mount_pinktiger", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* Touch of Death can now be used on targets with less than X% health remaining, dealing Y% of your maximum health in damage. */
"Improved Touch of Death": {id: 322113, values: [15.0, 35.0],  points: 0, maxPoints: 1, icon: "ability_monk_touchofdeath", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Vivify and Sheilun's Gift trigger a Gust of Mist on yourself. */
"Mist Caller": {id: 1266811, values: [0.0],  points: 0, maxPoints: 1, icon: "ability_monk_serenity", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Find resilience in the flow of chi in battle, gaining a magic absorb shield for ${X/10}.1% of your max health every $t sec in combat, stacking up to Y%. */
"Yu'lon's Grace": {id: 414131, values: [10.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_monk_dragonkick", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Reduces the cooldown of Ring of Peace by ${X/-1000} sec and Song of Chi-Ji's cast time is reduced by ${Y/-1000}.1 sec. */
"Peace and Prosperity": {id: 450448, values: [-5000.0, -500.0],  points: 0, maxPoints: 1, icon: "inv_inscription_deck_redcrane", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* Your healing is increased by up to X%, based on the current health of your target. Lower health targets are healed for more. */
"Save Them All": {id: 389579, values: [10.0],  points: 0, maxPoints: 1, icon: "inv_weapon_hand_22", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* Vivify and Sheilun's Gift critical strike chances are increased by X% on yourself. */
"Vital Clarity": {id: 1266748, values: [15.0],  points: 0, maxPoints: 1, icon: "ability_monk_souldance", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
number) {

}},

/* Thunder Focus Tea summons a Jade Serpent Statue at your location. When you channel Soothing Mist, the statue will also begin to channel Soothing Mist on your target, healing for $198533o1 over $198533d. */
"Jade Infusion": {id: 1242910, values: [1.0],  points: 0, maxPoints: 1, icon: "ability_monk_summonserpentstatue", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Increases your maximum health by an additional X% and your damage taken is reduced by an additional Y% while Fortifying Brew is active. */
"Ironshell Brew": {id: 388814, values: [10.0, -10.0, -10.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_monk_fortifyingale_new", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Fortifying Brew cooldown reduced by ${X/-1000} sec. */
"Expeditious Fortification": {id: 388813, values: [-30000.0],  points: 0, maxPoints: 1, icon: "ability_monk_fortifyingale_new", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* While your Celestial is active, you cannot be slowed below Y% normal movement speed. */
"Celestial Determination": {id: 450638, values: [0.0, 90.0],  points: 0, maxPoints: 1, icon: "ability_monk_essencefont", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Magical damage done increased by X% and healing done increased by Y%. */
"Chi Proficiency": {id: 450426, values: [5.0, 5.0, 5.0],  points: 0, maxPoints: 2, icon: "ability_monk_chiswirl", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},


/* Touch of Death now heals you for X% of its damage done. */
"Chi Transfer": {id: 1272452, values: [50.0],  points: 0, maxPoints: 1, icon: "ability_monk_zenmeditation", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Increases your Physical damage done by X% and Avoidance increased by Y%. */
"Martial Instincts": {id: 450427, values: [5.0, -2.0, 5.0, 2.0],  points: 0, maxPoints: 2, icon: "ability_monk_palmstrike", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Touch of Death's cooldown is reduced by ${X/-1000} sec. */
"Fatal Touch": {id: 394123, values: [-90000.0],  points: 0, maxPoints: 1, icon: "ability_monk_touchofdeath", select: true, tier: 0, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

};

const specTalents: TalentTree = {
/* Renewing Mist healing is increased by up to X% in proportion to its coverage on yourself and your allies. */
"Misty Coalescence": {id: 1268817, values: [300.0, 20.0],  points: 0, maxPoints: 1, icon: "inv_ability_monk_renewingmists_active", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Vivify heals all allies with your Renewing Mist active for $425804s1.    Sheilun's Gift's healing is increased by Y% on its primary target. */
"Invigorating Mists": {id: 274586, values: [5.0, 500.0],  points: 0, maxPoints: 1, icon: "ability_monk_vivify", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Rising Sun Kick now kicks up a Gust of Mist to heal X $Lally:allies; within $446264A2 yds for $191894s1.     Spinning Crane Kick and Blackout Kick have a chance to kick up a Gust of Mist to heal Y $Lally:allies; within $446264A2 yds for $191894s1.  */
"Crane Style": {id: 446260, values: [2.0, 1.0],  points: 0, maxPoints: 1, icon: "ability_monk_mightyoxkick", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* You consume a healing elixir when you drop below X% health or generate excess healing elixirs, instantly healing you for $428439s1% of your maximum health.    You generate Y healing elixir every $t2 
sec, stacking up to Z times. */
"Healing Elixir": {id: 122280, values: [40.0, 1.0, 2.0],  points: 0, maxPoints: 1, icon: "ability_monk_jasmineforcetea", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* The absorb amount of Life Cocoon is increased by X%. */
"Calming Coalescence": {id: 388218, values: [80.0],  points: 0, maxPoints: 1, icon: "ability_monk_healthsphere", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
points: number) {

}},

/* Life Cocoon grants up to X stacks of Mana Tea and applies Y stacks of Healing Elixir to its target. */
"Refreshment": {id: 467270, values: [5.0, 2.0],  points: 0, maxPoints: 1, icon: "inv_misc_gem_pearl_06", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
number) {

}},

/* The cooldown of $?s388615[Restoral][Revival] is reduced by ${Y/-1000} sec and $?s388615[Restoral][Revival] healing increased by X%. */
"Uplifted Spirits": {id: 388551, values: [15.0, -30000.0],  points: 0, maxPoints: 1, icon: "inv_helm_leather_raidmonkgoblin_d_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Soothing Mist and Crackling Jade Lightning may be channeled while moving, but movement speed is reduced by $1268958s1% while channeling.    $?s399491[Sheilun's Gift][Vivify] healing increased by X% and Renewing Mist's healing is increased by Y%. */
"Way of the Serpent": {id: 1243155, values: [15.0, 30.0, 0.0],  points: 0, maxPoints: 1, icon: "monk_stance_wiseserpent", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Tiger Palms strike twice, Blackout Kicks strike an additional $s5 targets at $s6% effectiveness, and Spinning Crane Kick heals $s4 nearby allies for X% of the damage done. */
"Way of the Crane": {id: 388779, values: [340.0, 100.0, 2.0, 1.0, 2.0, 20.0],  points: 0, maxPoints: 1, icon: "monk_stance_redcrane", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Mana Tea now channels X% faster and generates Y% more Mana. */
"Energizing Brew": {id: 422031, values: [-50.0, 20.0, -50.0],  points: 0, maxPoints: 1, icon: "ui_profession_herbalism", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* $?s399491[Sheilun's Gift][Vivify] has a Y% chance to cause your next Rising Sun Kick or Enveloping Mist to generate X stack of Mana Tea.    Enveloping Mist and Rising Sun Kick have a Z% chance to cause your next $?s399491[Sheilun's Gift][Vivify] to generate X stack of Mana Tea. */
"Lifecycles": {id: 197915, values: [1.0, 20.0, 20.0],  points: 0, maxPoints: 1, icon: "ability_monk_souldance", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Renewing Mist's heal over time has a chance to cause your next $?s399491[Sheilun's Gift][Vivify] to also trigger a Zen Pulse on its target and all allies with Renewing Mist, healing them for $198487s1 increased by X% per Renewing Mist active, up to Y%. */
"Zen Pulse": {id: 446326, values: [6.0, 30.0],  points: 0, maxPoints: 1, icon: "ability_monk_forcesphere", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Life Cocoon applies Renewing Mist and Enveloping Mist to the target.  */
"Mists of Life": {id: 388548, values: [1.0],  points: 0, maxPoints: 1, icon: "inv_shoulder__inv_leather_raidmonkmythic_s_01", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Your Enveloping Mists heal the target for ${$388514s1*X} each time they take direct damage. */
"Overflowing Mists": {id: 388511, values: [2.0],  points: 0, maxPoints: 1, icon: "inv_legion_faction_dreamweavers", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* After you fully consume Thunder Focus Tea, your next Vivify triggers Zen Pulse. */
"Deep Clarity": {id: 446345, values: [2.0],  points: 0, maxPoints: 1, icon: "ability_monk_zenmeditation", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Rising Sun Kick and Enveloping Mist apply Renewing Mist for X seconds to an ally within $r yds. */
"Rapid Diffusion": {id: 388847, values: [6.0],  points: 0, maxPoints: 2, icon: "ability_monk_chiswirl", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Reduces the cooldown of Life Cocoon by ${$m1/-1000} sec. */
"Chrysalis": {id: 202424, values: [-45000.0],  points: 0, maxPoints: 1, icon: "ability_monk_domeofmist", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
number) {

}},

/* When Life Cocoon expires, it releases a burst of mist that restores $399230s2 health to Z nearby allies. */
"Burst of Life": {id: 399226, values: [3.0],  points: 0, maxPoints: 1, icon: "ability_rogue_imrovedrecuperate", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* While channeling Mana Tea you exhale the breath of Yu'lon, healing up to X allies within $388044a1 yards for $388044s1 every ${$388040t1}.1 sec. */
"Yu'lon's Whisper": {id: 388038, values: [5.0],  points: 0, maxPoints: 1, icon: "ability_monk_chiexplosion", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Increases Enveloping Mist's duration by ${$m2/1000} sec and its healing bonus by X%. */
"Mist Wrap": {id: 197900, values: [10.0, 1000.0],  points: 0, maxPoints: 1, icon: "ability_monk_pathofmists", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* When activated, Yu'lon and Chi-Ji apply Chi Cocoons to $406139s3 targets within $406139r yds, absorbing $<newshield> damage for $406139d.    Chi-Ji grants $s4 stacks of Teachings of the Monastery when invoked.    Yu'lon reduces the cast speed of Enveloping Mist by $322118s6%. */
"Celestial Harmony": {id: 343655, values: [4.0, 10.0, 5.0, 4.0],  points: 0, maxPoints: 1, icon: "ability_monk_jadeserpentbreath", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Renewing Mist has a X% chance to immediately spread to an additional target when initially cast or when traveling to a new target. */
"Dancing Mists": {id: 388701, values: [8.0],  points: 0, maxPoints: 1, icon: "ability_monk_serenity", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Allies with Renewing Mist receive X% more healing from you and Renewing Mist's duration is increased by ${Y/1000} sec. */
"Lotus Infusion": {id: 458431, values: [6.0, 2000.0],  points: 0, maxPoints: 1, icon: "inv_misc_herb_chamlotus", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
points: number) {

}},

/* The healing of Gusts of Mist caused by Renewing Mist is increased by X%.  */
"Amplified Rush": {id: 1271431, values: [100.0],  points: 0, maxPoints: 1, icon: "ability_monk_rushingjadewind", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
points: number) {

}},

/* Renewing Mist now has ${$s5+$m1} charges and reduces the remaining cooldown of Rising Sun Kick by ${Z/1000}.1 sec.    Rising Sun Kick now reduces the remaining cooldown of Renewing Mist by ${$s4/1000}.1 sec. */
"Pool of Mists": {id: 173841, values: [1.0, 1.0, 1000.0, 1000.0, 2.0, 1.0],  points: 0, maxPoints: 1, icon: "achievement_zone_sholazar_10", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Chi Cocoons now apply Enveloping Mist for ${Y/1000} sec when they expire or are consumed, and Chi-Ji's Gusts of Mists healing is increased by X% and Yu'lon's Soothing Breath healing is increased by Z%. */
"Jade Bond": {id: 388031, values: [20.0, 4000.0, 500.0],  points: 0, maxPoints: 1, icon: "inv_inscription_deck_jadeserpent", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Reduces the cooldown of $?s325197[Invoke Chi-Ji, the Red Crane][Invoke Yul'on, the Jade Serpent] by ${X/-60000} min, but decreases its duration to ${($s4+Y)/1000} sec.  */
"Gift of the Celestials": {id: 388212, values: [-60000.0, -13000.0, 7000.0, 25000.0, -12.0],  points: 0, maxPoints: 1, icon: "inv_pet_jadeserpentpet", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Crackling Jade Lightning's damage is increased by Y% and now chains to X additional enemies at $s4% effectiveness. */
"Jade Empowerment": {id: 467316, values: [4.0, 300.0, 5.0, 25.0],  points: 0, maxPoints: 1, icon: "ability_monk_cracklingjadelightning", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Rising Sun Kick's damage is increased by your Mastery rating and Thunder Focus Tea resets its cooldown. */
"Morning Breeze": {id: 1277302, values: [20.0],  points: 0, maxPoints: 1, icon: "expansionicon_mistsofpandaria", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, 
points: number) {

}},

/* Thunder Focus Tea now empowers your next ${$m1+1} spells. */
"Focused Thunder": {id: 197895, values: [1.0, 1.0],  points: 0, maxPoints: 1, icon: "spell_monk_nimblebrew", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Ancient Teachings transfers an additional $388026s2% damage to healing.    Your Stamina is increased by Y%. */
"Jadefire Teachings": {id: 467293, values: [270.0, 8.0],  points: 0, maxPoints: 1, icon: "inv_misc_book_07", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Gust of Mists has a Y% chance to do X% more healing. */
"Resplendent Mist": {id: 388020, values: [100.0, 30.0],  points: 0, maxPoints: 2, icon: "spell_nature_abolishmagic", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* After using Thunder Focus Tea, your next spell gives X% of a stat. Only one stat increase may be active at once:  $@spellname124682: Critical strike  $@spellname115151: Haste  $@spellname107428: Versatility */
"Secret Infusion": {id: 388491, values: [4.0, 1.25],  points: 0, maxPoints: 2, icon: "ability_monk_chibrew", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Renewing Mist's heal over time effect has a ${Z}.1% chance to apply Enveloping Mist for Y sec. */
"Misty Peaks": {id: 388682, values: [0.00067500002, 2.0, 5.0],  points: 0, maxPoints: 2, icon: "achievement_zone_stormpeaks_10", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Allies targeted by Soothing Mist receive X% more healing from your Enveloping Mist and Renewing Mist effects. */
"Peaceful Mending": {id: 388593, values: [40.0],  points: 0, maxPoints: 1, icon: "pandarenracial_innerpeace", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Increases Sheilun's Gift cloud of mist generation to every ${-X/1000} sec.  */
"Veil of Pride": {id: 400053, values: [-4000.0, 4.0, 10.0],  points: 0, maxPoints: 1, icon: "ability_monk_vivify", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Consuming Mana Tea generates X $Lcloud of mist:clouds of mist;. */
"Tranquil Tea": {id: 1270621, values: [1.0],  points: 0, maxPoints: 1, icon: "inv_misc_pearlmilktea", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Thunder Focus Tea now empowers Enveloping Mist and Rising Sun Kick further.    $@spellicon124682 $@spellname124682:  Begins a channel of Soothing Mist that may be cast while moving onto your target. 
   $@spellicon107428 $@spellname107428:  Releases a Jadefire Stomp infront of you.    $@spellicon1248812 $@spellname1248812:  $@spelldesc1248812   */
"Emperor's Elixir": {id: 1268807, values: [0.0],  points: 0, maxPoints: 1, icon: "inv_drink_25_honeytea", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Your spells and abilities have a chance to make your next Spinning Crane Kick deal an additional X% damage. */
"Dance of Chi-Ji": {id: 438439, values: [400.0],  points: 0, maxPoints: 1, icon: "ability_monk_cranekick_new", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Renewing Mist's healing is increased by X% on your lowest health ally with its effect. */
"Mistline": {id: 1280297, values: [500.0],  points: 0, maxPoints: 1, icon: "ability_monk_surgingmist", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Your $?s399491[Sheilun's Gift][Invigorating Mist] healing is increased by $?s399491[Z%][X%] and your Enveloping Mist also heals allies with Renewing Mist for Y% of its healing.    The duration of Enveloping Mist is increased by ${$322118s5/1000} sec while you have a celestial summoned. */
"Tear of Morning": {id: 387991, values: [20.0, 8.0, 20.0],  points: 0, maxPoints: 1, icon: "ability_monk_uplift", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Rising Sun Kick extends your Renewing Mist and Enveloping Mist effects by X sec, up to Y% of their original duration. */
"Rising Mist": {id: 274909, values: [4.0, 100.0],  points: 0, maxPoints: 1, icon: "ability_monk_effuse", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: 
number) {

}},

/* Sheilun's Gift heals X additional allies and its cast time is reduced by ${Y/-1000}.1 sec. */
"Legacy of Wisdom": {id: 404408, values: [2.0, -500.0],  points: 0, maxPoints: 1, icon: "misc_legionfall_monk", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

}},

/* Sheilun's Gift's healing is increased by Z% and its cast time is reduced by Y%, but it now only heals a single ally. */
"Emperor's Favor": {id: 471761, values: [-2.0, -100.0, 20.0],  points: 0, maxPoints: 1, icon: "inv_leather_raidmonkt2_d_01_helm", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, 
talentData: any, points: number) {

}},

/* Rising Sun Kick and Vivify have a chance to activate Spiritfont, causing your next Enveloping Mist to channel Soothing Mist from you onto up to Y allies at X% effectiveness for $1260670d.    If Spiritfont's Soothing Mists heal a full health target, they will jump to another injured ally or split its healing into your remaining Soothing Mists. */
"Spiritfont1": {id: 1260511, values: [],  points: 0, maxPoints: 4, icon: "inv12_apextalent_monk_spiritfont", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
}},

/* Rising Sun Kick damage increased by Y% and Enveloping Mist healing increased by X%. These bonuses are increased by Z% while Spiritfont is active. */
"Spiritfont2": {id: 1260677,  values: [], points: 0, maxPoints: 4, icon: "inv12_apextalent_monk_spiritfont", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
}},

/* Thunder Focus Tea activates Spiritfont and Spiritfont applies Chi Cocoons at X% effectiveness to allies targeted. */
"Spiritfont3": {id: 1260680,  values: [], points: 0, maxPoints: 4, icon: "inv12_apextalent_monk_spiritfont", select: true, tier: 1, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {
}},



};

const heroTalents: TalentTree = {
    /* $?c2[The healing of Enveloping Mist, Vivify, and Sheilun's Gift is increased by X%.]?c3[Fists of Fury and Spinning Crane Kick deal Y% more damage.][] */
    "Temple Training": {id: 442743, values: [6.0, 10.0, 6.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_provoke", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Teachings of the Monastery has a X% chance to refund a charge when consumed.     The damage of Tiger Palm is increased by Y%. */
    "Xuen's Guidance": {id: 442687, values: [15.0, 10.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_dpsstance", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Tiger Palm, Vivify, and Sheilun's Gift have a chance to cause Xuen to claw a nearby enemy for $457917s1 Physical damage, healing a nearby ally for Y% of the damage done.]?c3[Tiger Palm has a chance to cause Xuen to claw your target for $457917s1 Physical damage, healing a nearby ally for Y% of the damage done.][Xuen claws your target for $457917s1 Physical damage, healing a nearby ally for Y% 
    of the damage done.]    $?c2[Invoke Yu'lon, the Jade Serpent or Invoke Chi-Ji, the Red Crane]?c3[Invoke Xuen, the White Tiger][Invoking a celestial] guarantees your next cast activates this effect. */  
    "Courage of the White Tiger": {id: 443087, values: [15.0, 100.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_summontigerstatue", select: true, tier: 2, runFunc: 
    function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Healing increased by $322118s8% while Chi-Ji, the Red Crane or Yu'lon, the Jade Serpent is active.]?c3[Damage increased by $123904s4% while Xuen, the White Tiger is active.][] */
    "Restore Balance": {id: 442719, values: [0.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_chiexplosion", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Rising Sun Kick damage increased by X%. */
    "Yu'lon's Knowledge": {id: 443625, values: [15.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "inv_jewelcrafting_jadeserpent", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[Thunder Focus Tea calls]?c3[Strike of the Windlord and Whirling Dragon Punch call][] upon Yu'lon to increase the cooldown recovery rate of $?c2[Renewing Mist, Rising Sun Kick, Life Cocoon, and Thunder Focus Tea]?c3[Fists of Fury, Strike of the Windlord, Rising Sun Kick, and Whirling Dragon Punch][] by $443421s2% for $?c2[${X/1000} sec]?c3[$443421d][].$?c3[     The channel time of Fists of Fury is reduced by $443421s5% while Yu'lon is active.][] */
    "Heart of the Jade Serpent": {id: 443294, values: [8000.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_dragonkick", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Your movement speed is increased by X% during Celestial Conduit and by $443569s1% for $443569d after being assisted by any Celestial.   */
    "Chi-Ji's Swiftness": {id: 443566, values: [75.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "inv_shoulder_leather_raidmonkemerald_d_01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c2[After Xuen assists you, your next Enveloping Mist's cast time is reduced by $443112s1% and causes Niuzao to grant an absorb shield to $443113s3 nearby allies for $443113s1.]?c3[After Xuen assists you, your next Blackout Kick refunds Z stacks of Teachings of the Monastery and causes Niuzao to stomp at your target's location, dealing $443127s1 damage to nearby enemies, reduced beyond Y targets.][] */
    "Strength of the Black Ox": {id: 443110, values: [5.0, 5.0, 2.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_chargingoxwave", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Celestial Conduit's healing and damage is increased by X% when striking a single target.    Each addtional target reduces this bonus by Y%. */
    "Path of the Falling Star": {id: 1273154, values: [100.0, 20.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_chiswirl", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c3[Heart of the Jade Serpent additionally triggers for ${X/1000} sec at Y% effectiveness after you cast Zenith][Vivify and Sheilun's Gift have a chance to trigger Heart of the Jade Serpent for ${X/1000} sec at Y% effectiveness]. */
    "Yu'lon's Avatar": {id: 1262667, values: [4000.0, 100.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "inv_celestialserpentmount_jade", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Fortifying Brew grants you an absorb shield for $442749s2% of your maximum health. */
    "Niuzao's Protection": {id: 442747, values: [0.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_chargingoxwave", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You heal for Y% of your maximum health instantly when you activate Celestial Conduit and receive X% less damage for its duration.     This effect lingers for an additional $448508d after Celestial Conduit ends. */
    "Jade Sanctuary": {id: 443059, values: [-15.0, 10.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_jadeserpentbreath", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Strength of the Black Ox's effect is $?c3[X][Y]% more effective on your primary target. */
    "Stampede of the Ancients": {id: 1262756, values: [300.0, 400.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "monk_ability_summonoxstatue", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* You switch between alignments after an August Celestial assists you, increasing a corresponding secondary stat by $443572s1%.    |cFFFFFFFFCrane Stance|r:  Haste    |cFFFFFFFFTiger Stance|r:  Critical Strike    |cFFFFFFFFOx Stance|r:  Versatility    |cFFFFFFFFSerpent Stance|r:   Mastery */
    "Inner Compass": {id: 443571, values: [2.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "inv_10_dungeonjewelry_explorer_trinket_1compass_color2", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Heart of the Jade Serpent increases your haste by $443421s8% while active. */
    "Flowing Wisdom": {id: 1262672, values: [10.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_flyingdragonkick", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Celestial Conduit can be recast once during its duration to call upon all of the August Celestials to assist you at X% effectiveness.    Unity Within is automatically cast when Celestial Conduit ends if not used before expiration. */
    "Unity Within": {id: 443589, values: [200.0], heroTree: "Conduit of the Celestials", points: 0, maxPoints: 1, icon: "ability_monk_prideofthetiger", select: true, tier: 2, runFunc: function (state: any, 
    spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Store vitality from $?a137023[X%][Y%] of your damage dealt and $?a137023[Z%][$s4%] of your $?a137023[effective ][]healing.$?a137024[ Vitality stored from overhealing is reduced.][]    For $450711d after casting $?a137023[Celestial Brew][Thunder Focus Tea] your spells and abilities draw upon the stored vitality to deal $s6% additional $?a137023[damage over $450763d][healing over $450769d]. */       
    "Aspect of Harmony": {id: 450508, values: [12.0, 10.0, 6.0, 30.0, 0.0, 40.0, 100.0, 8.0, 20.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "inv_ability_masterofharmonymonk_aspectofharmony", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?c1[Chi Burst and Chi Wave deal][Chi Wave deals] X% increased damage and healing. */
    "Manifestation": {id: 450875, values: [50.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "inv_shoulder_inv_leather_raidmonk_s_01", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Aspect of Harmony ends, any remaining vitality is expelled as $?a137023[damage over $450820d][healing over $450805d], split among nearby targets. */
    "Purified Spirit": {id: 450867, values: [0.0, 4.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_monk_explodingjadeblossom", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* During Aspect of Harmony, Rising Sun Kick, Blackout Kick, and Tiger Palm also withdraw vitality to damage enemies for an additional 20% over 8 sec. */
    "Harmonic Gambit": {id: 450870, values: [40.0, 20.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "passive_monk_teachingsofmonastery", select: true, tier: 2, runFunc: function (state: 
    any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting a Physical spell or ability increases the damage and healing of your next Fire or Nature spell or ability by $451508s1%, and vice versa. Stacks up to $451508U. */
    "Balanced Stratagem": {id: 450889, values: [0.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_monk_sphereharmonydiscord", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting $?s322507[Celestial Brew]?s1241059[Celestial Infusion][Thunder Focus Tea] guarantees that your next $?c1[$s5][$s6] $Lcast:casts; of Tiger Palm or Vivify will trigger a Harmonic Surge, dealing $?c1[${X*$1239442s1/100}][${Y*$1239442s1/100}] Nature damage split between your target and other nearby enemies, and $?c1[${Z*$1239443s1/100}][${$s4*$1239443s1/100}] healing to up to $1239443s2 injured allies. */
    "Harmonic Surge": {id: 1270958, values: [55.0, 10.0, 10.0, 40.0, 2.0, 2.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_socererking_forcenova", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting Tiger's Lust reduces the remaining cooldown on Roll by ${X/1000} sec. */
    "Tiger's Vigor": {id: 451041, values: [5000.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "monk_stance_whitetiger", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Tiger's Lust grants $452701s1% movement speed to up to $452701i allies near its target. */
    "Roar from the Heavens": {id: 451043, values: [0.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "inv_celestialserpentmount", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137023[Celestial Brew][Thunder Focus Tea] has X additional charge. */
    "Endless Draught": {id: 450892, values: [1.0, 1.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "inv_drink_25_honeytea", select: true, tier: 2, runFunc: function (state: any, spellDB: 
    SpellDB, talentData: any, points: number) {

    }},

    /* When cast on yourself, your single-target healing spells heal for X% more and restore an additional (Y% of Spell Power) health over 6 sec. */
    "Mantra of Purity": {id: 451036, values: [10.0, 10.0, 100.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_monk_domeofmist", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137023[Fortifying Brew applies a Chi Cocoon, absorbing $<value> damage][Fortifying Brew grants X% Stagger]. */
    "Mantra of Tenacity": {id: 451029, values: [20.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "spell_monk_brewmastertraining", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting $?c1[Keg Smash][Rising Sun Kick or Rushing Wind Kick] guarantees that your next cast of Tiger Palm or Vivify will cause a Harmonic Surge. */
    "Potential Energy": {id: 1271048, values: [0.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "spell_magic_managain", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137023[][Rising Sun Kick, ]Blackout Kick and Tiger Palm deal X% additional damage to enemies in a line in front of you. Damage reduced above Y targets. */
    "Overwhelming Force": {id: 451024, values: [15.0, 5.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_titankeeper_piercingcorruption", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a450391[Chi Wave][Chi Burst] increases vitality stored by $451084s1% for $451084d. */
    "Path of Resurgence": {id: 450912, values: [0.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_monk_pathofmists", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* $?a137023[][Rising Sun Kick, ]Blackout Kick and Tiger Palm contribute X% additional vitality. */
    "Way of a Thousand Strikes": {id: 450965, values: [30.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_monk_mightyoxkick", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Casting $?a137023[Purifying Brew][Enveloping Mist] stores $<value> additional vitality. */
    "Clarity of Purpose": {id: 451017, values: [300.0, 100.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_titankeeper_cleanse", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* Ancient Teachings transfers an additional X% damage to healing. */
    "Meditative Focus": {id: 1271105, values: [50.0, 50.0, 1000.0, 100.0, 250.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "inv_misc_herb_mountainsilversage", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

    /* When Aspect of Harmony heals, it has a chance to spread to a nearby ally. When you directly heal an affected target, it has a chance to intensify, withdrawing additional vitality to increase its effect by up to 20%. Vivify no longer contributes vitality, instead drawing on available vitality to increase healing done by up to 100%. Vitality stored by other abilities is increased by 50%. */
    "Coalescence": {id: 450529, values: [0.0, 100.0, 50.0], heroTree: "Master of Harmony", points: 0, maxPoints: 1, icon: "ability_monk_effuse", select: true, tier: 2, runFunc: function (state: any, spellDB: SpellDB, talentData: any, points: number) {

    }},

};

export const monkTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};