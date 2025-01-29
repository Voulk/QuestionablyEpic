
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents  } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPriestSpellDB";
import { getTalentedSpellDB } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";


const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

export function scoreDiscSet(baseline, statProfile, player, userSettings, tierSets = []) { 
  let score = 0;
  const healingBreakdown = {};
  const fightLength = 6;
  const hasteSetting = getSetting(userSettings, "hasteBuff");
  const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1) * (hasteSetting.includes("Dark Intent") ? 1.03 : 1)

  const spellpower = /*statProfile.intellect + */ statProfile.spellpower + 532; // Inner Fire
  const critPercentage = getCritPercentage(statProfile, "Discipline Priest"); // +4% crit
  // Evaluate Stats
  // Spellpower

  // Take care of any extras.
  if (tierSets.includes("Priest T11-4")) {
    statProfile.spirit += 540;
  }
  if (tierSets.includes("Priest T12-2")) { 
    // You regenerate 2% of your base mana every 5 seconds, basically in perpetuity by casting any helpful healing spell.
    statProfile.mp5 = (statProfile.mp5 || 0) + 0.02 * 20590;
  }
  if (tierSets.includes("Priest T12-4")) {
    // 5s ticking heal on a 45s cooldown.
    const tierDuration = 5
    const expectedOverheal = 0.2;
    statProfile.hps = (statProfile.hps || 0) + (9250 + 10750) / 2 * tierDuration * (1 - expectedOverheal) / 55;
  }

  // Calculate filler CPM
  const manaPool = getManaPool(statProfile, "Discipline Priest");
  const regen = (getManaRegen(statProfile, "Discipline Priest") + 
                getAdditionalManaEffects(statProfile, "Discipline Priest").additionalMP5 +
                (statProfile.mp5 || 0)) * 12 * fightLength;
  const totalManaPool = manaPool + regen;

  // Build filler
  //const fillerCost = baseline.castProfile.filter(spell => spell.spell === "Prayer of Healing")[0]['cost']  // This could be more efficient;
  let fillerCost = 0;
  baseline.castProfile.filter(spell => spell.fillerSpell).forEach(spell => {
    fillerCost += spell.cost * spell.fillerRatio
  });

  const baseHastePerc = (statProfile.haste / 128 / 100 + 1) * 1.05 * 1.02; // Haste buff, +2% haste. Consider: haste buff on PW:S
  const fillerCPM = ((totalManaPool / fightLength) - baseline.costPerMinute) / fillerCost;

  baseline.castProfile.forEach(spellProfile => {
      const fullSpell = baseline.spellDB[spellProfile.spell];
      const spellName = spellProfile.spell;

      fullSpell.forEach(spell => {
        let genericMult = 1.06 * (spellProfile.bonus ? spellProfile.bonus : 1);
        
        if (tierSets.includes("Priest T11-2") && spellProfile.spell === "Heal") critBonus += 0.05;

        // Handle Crit
        let spellCritPercentage = critPercentage + ((spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0);
        const critEffect = ('statMods' in spell && spell.statMods.critEffect) ? spell.statMods.critEffect : 2;
        const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (spellCritPercentage * critEffect + (1 - critPercentage)) : 1;
        
        const additiveScaling = (spell.additiveScaling || 0) + 1;
        const cpm = (spellProfile.cpm + ( spellProfile.fillerSpell ? (fillerCPM * spellProfile.fillerRatio) : 0)) * (spellProfile.hastedCPM ? baseHastePerc : 1);
        // Regular mastery scaling (PW:S)
        const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? getMastery(statProfile, "Discipline Priest") : 1;
        const targetCount = spell.targets ? spell.targets : 1;

        if ((spell.type === "heal" || spell.buffType === "heal")) genericMult *= (0.15 * 18 / 30 + 1); // Archangel
        if (spellName === "Smite" || spellName === "Holy Fire") genericMult *= (1 + 0.02 * 5 / 2);

        let spellThroughput = (spell.flat + spell.coeff * spellpower) *
                            (critMult) *
                            (masteryMult) *
                            targetCount * 
                            genericMult *
                            ((1 - spell.expectedOverheal) || 1);

        // Handle HoT
        if (spell.type === "classic periodic") {
            const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (getHaste(statProfile, "Classic") * hasteBuff);
            const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
            
            const tickCount = Math.round(spell.buffDuration / (adjTickRate));

            spellThroughput = spellThroughput * tickCount;
        }

        if (spell.type === "heal" || spell.buffType === "heal") {
          const masteryMultiplier = ((spellName === "Prayer of Healing" && spell.type === "heal")) ? 1 : 
                                      (spell.secondaries.includes("crit") && !spell.ignoreEffects) ? spellCritPercentage : 0; // TODO: Crit heals
          
          const absorbVal = spellThroughput /*/ (1 - spell.expectedOverheal) */* (getMastery(statProfile, "Discipline Priest")) * masteryMultiplier * 0.3;
          if (spellName === "Prayer of Healing") console.log("Throughput: " + spellThroughput + " DA: " + absorbVal);
          healingBreakdown["Divine Aegis"] = (healingBreakdown["Divine Aegis"] || 0) + (absorbVal * cpm);

          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellThroughput * cpm);
          score += ((spellThroughput + absorbVal) * cpm);
        } 
        else if (spell.type === "damage" || spell.buffType === "damage") {
          if (spell.damageToHeal) {
            // Atonement
            const atonementHealing = (spellThroughput * cpm * baseHastePerc)
            healingBreakdown["Atonement"] = (healingBreakdown["Atonement"] || 0) + atonementHealing;
            score += atonementHealing; // Can we just add up score at the end from healing breakdown?

            const masteryMultiplier = spellCritPercentage;

            const absorbVal = atonementHealing /*/ (1 - spell.expectedOverheal) */* (getMastery(statProfile, "Discipline Priest")) * masteryMultiplier * 0.3;
            healingBreakdown["Divine Aegis"] = (healingBreakdown["Divine Aegis"] || 0) + (absorbVal * cpm);
            score += absorbVal; // Can we just add up score at the end from healing breakdown?
            // TODO: Add damageBreakdown.
          }
        }
        
        //if (isNaN(spellHealing)) console.log(JSON.stringify(spell));


      //console.log("Spell: " + spellProfile.spell + " Healing: " + spellHealing + " (C: " + critMult + ". M: " + masteryMult + ". AS: " + additiveScaling + ")");
      })

      // Filler mana
      
      
  })

    // Handle HPS
    score += (60 * statProfile.hps || 0)

    Object.keys(healingBreakdown).forEach(spell => {
      healingBreakdown[spell] = Math.round(healingBreakdown[spell]) + " (" + Math.round(healingBreakdown[spell] / score * 10000)/100 + "%)";
    })

  return score;
}

export function initializeDiscSet() {
  const testSettings = {spec: "Discipline Priest Classic", masteryEfficiency: 1, includeOverheal: "Yes", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};

  const activeStats = {
    intellect: 100,
    spirit: 1,
    spellpower: 100,
    haste: 1,
    crit: 1,
    mastery: 1,
    stamina: 5000,
    critMult: 2,
}
  const discCastProfile = [
    {spell: "Power Word: Shield", cpm: 4, hastedCPM: true, fillerSpell: true, fillerRatio: 0.34},
    {spell: "Prayer of Healing", cpm: 6, hastedCPM: true, fillerSpell: true, fillerRatio: 0.66},
    {spell: "Penance D", cpm: 7},
    {spell: "Smite", cpm: 10, hastedCPM: true},
    {spell: "Holy Fire", cpm: 5, hastedCPM: false},
    {spell: "Divine Hymn", cpm: 1/6},
    {spell: "Prayer of Mending", cpm: 2},
  ]

  const adjSpells = getTalentedSpellDB("Discipline Priest", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: discTalents, spec: "Discipline Priest", genericBonus: {damage: 1, healing: 1}});

  discCastProfile.forEach(spell => {
    spell.castTime = discSpells[spell.spell][0].castTime;
    spell.hpc = 0;
    spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
    spell.healing = 0;
  })
  const costPerMinute = discCastProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);
  const playerData = { spec: "Discipline Priest", spells: discSpells, settings: testSettings, talents: {...discTalents}, stats: activeStats }
  //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");

  //console.log(JSON.stringify(adjSpells));
  return { castProfile: discCastProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
}

// --------------- Druid --------------
export function initializeDruidSet() {
    const testSettings = {spec: "Restoration Druid Classic", masteryEfficiency: 1, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};
  
    const activeStats = {
      intellect: 100,
      spirit: 1,
      spellpower: 100,
      haste: 1,
      crit: 1,
      mastery: 1,
      stamina: 5000,
      critMult: 2,
  }
    const druidCastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Swiftmend", cpm: 3.5},
      {spell: "Wild Growth", cpm: 3.7 * (144 / 180)},
      {spell: "Rejuvenation", cpm: 12 * (144 / 180), fillerSpell: true, castOverride: 1.0},
      {spell: "Nourish", cpm: 5},
      {spell: "Regrowth", cpm: 0.8}, // Paid Regrowth casts
      {spell: "Regrowth", cpm: 2.4, freeCast: true}, // OOC regrowth casts
      {spell: "Rolling Lifebloom", cpm: 6, freeCast: true, castOverride: 0}, // Our rolling lifebloom. Kept active by Nourish.
  
      // Tree of Life casts
      {spell: "Lifebloom", cpm: 13 * (36 / 180), bonus: 1.15}, // Tree of Life - Single stacks
      {spell: "Regrowth", cpm: (6.5 * 36 / 180), freeCast: true, bonus: 1.15}, // Tree of Life OOC Regrowths
      {spell: "Wild Growth", cpm: 3.7 * (36 / 180), bonus: (1.15 * (8/6))}, // Tree of Life Wild Growth
    ]

    const adjSpells = getTalentedSpellDB("Restoration Druid", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: druidTalents, spec: "Restoration Druid"});
  
    druidCastProfile.forEach(spell => {
      spell.castTime = druidSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
      spell.healing = 0;
    })
    const costPerMinute = druidCastProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);
    const playerData = { spec: "Restoration Druid", spells: druidSpells, settings: testSettings, talents: {...druidTalents}, stats: activeStats }
    //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");

    //console.log(JSON.stringify(adjSpells));
    return { castProfile: druidCastProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDruidSet(druidBaseline, statProfile, player, userSettings, tierSets = [], shardOfWoe) {
    let score = 0;
    const healingBreakdown = {};
    const fightLength = 6;

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1) * (hasteSetting.includes("Dark Intent") ? 1.03 : 1)

    const spellpower = statProfile.intellect + statProfile.spellpower;
    const critPercentage = 1.04 + getCritPercentage(statProfile, "Restoration Druid"); // +4% crit
    // Evaluate Stats
    // Spellpower

    // Take care of any extras.
    if (tierSets.includes("Druid T11-4")) {
      statProfile.spirit += 540;
    }
    if (tierSets.includes("Druid T12-2")) {
      // 40% chance on Lifebloom tick to restore 184 mana.
      // Ignoring ToL for now. We know it has some form of reduced proc rate but not how much.
      statProfile.mp5 = (statProfile.mp5 || 0) + (60 * getHaste(statProfile, "Classic") * hasteBuff * 0.4 * 184) / 12;
    }
    if (tierSets.includes("Druid T13-2")) {
      // TODO. 5% discount on Rejuv / Healing Touch.
    }

    // Calculate filler CPM
    const manaPool = getManaPool(statProfile, "Restoration Druid");
    const regen = (getManaRegen(statProfile, "Restoration Druid") + 
                  getAdditionalManaEffects(statProfile, "Restoration Druid").additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;

    const totalManaPool = manaPool + regen;
    const fillerCost = druidBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost'] // This could be more efficient;
    //console.log(totalManaPool);
    //console.log("Rejuv cost: " + fillerCost);
    //console.log("Rejuvs Per Min: " + ((totalManaPool / fightLength) - druidBaseline.costPerMinute) / fillerCost);
    const fillerCPM = ((totalManaPool / fightLength) - druidBaseline.costPerMinute) / fillerCost;

    druidBaseline.castProfile.forEach(spellProfile => {
        const fullSpell = druidBaseline.spellDB[spellProfile.spell];

        fullSpell.forEach(spell => {
          const genericMult = 1.04 * (spellProfile.bonus ? spellProfile.bonus : 1);
          let critBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0;
          if (tierSets.includes("Druid T11-2") && spellProfile.spell === "Lifebloom") critBonus += 0.05;
          const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (critPercentage + critBonus) : 1;
          const additiveScaling = (spell.additiveScaling || 0) + 1
          const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling : 1;
          let spellHealing = (spell.flat + spell.coeff * spellpower) *
                              (critMult) * // Add base crit
                              (masteryMult) *
                              genericMult;
          
          // Handle HoT
          if (spell.type === "classic periodic") {
              const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (getHaste(statProfile, "Classic") * hasteBuff);
              const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
              
              const targetCount = spell.targets ? spell.targets : 1;
              const tickCount = Math.round(spell.buffDuration / (adjTickRate));
              if (spellProfile.spell === "Rolling Lifebloom") spellHealing = spellHealing * (spell.buffDuration / spell.tickData.tickRate * haste);
              else spellHealing = spellHealing * tickCount * targetCount;
          }


          // These are functional on the high end, but may run into issues for players with sub 2k haste. This isn't impactful since the trinket is much worse there.
          if (spellProfile.spell === "Rejuvenation" && shardOfWoe && statProfile.haste >= 2032) {
            spellHealing *= (1.2 * 1 / 6 + 5 / 6); // 20% more healing 1/6th of the time.
          }
          if ((spellProfile.spell === "Wild Growth" || spellProfile.spell === "Efflorescence") && statProfile.haste >= 2005) {
            spellHealing *= (1.11 * 1 / 6 + 5 / 6) // 11% more healing 1/6th of the time.
          }

          if (tierSets.includes("Druid T12-4") && spellProfile.spell === "Swiftmend" && spell.type === "Heal") {
            // Heal for a portion of the Swiftmend only. No Efflo, effective healing only.
            healingBreakdown["T12-4"] = spellHealing * spellProfile.cpm * (1 - spell.expectedOverheal);
          }
          
          //if (isNaN(spellHealing)) console.log(JSON.stringify(spell));
          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellHealing * spellProfile.cpm);
          score += spellProfile.fillerSpell ? (spellHealing * fillerCPM) : (spellHealing * spellProfile.cpm);

        //console.log("Spell: " + spellProfile.spell + " Healing: " + spellHealing + " (C: " + critMult + ". M: " + masteryMult + ". AS: " + additiveScaling + ")");
        })

        // Filler mana

        
    })
    
    /*Object.keys(healingBreakdown).forEach(spell => {
      healingBreakdown[spell] = Math.round(healingBreakdown[spell]) + " (" + Math.round(healingBreakdown[spell] / score * 10000)/100 + "%)";
    })
    console.log(healingBreakdown); */

    // Handle HPS
    score += (60 * statProfile.hps || 0)

    return score;
}


export function initializePaladinSet() {
  console.log("Initializing Paladin Set")
  const testSettings = {spec: "Holy Paladin Classic", masteryEfficiency: 1, includeOverheal: "No", reporting: false, t31_2: false, seqLength: 100, alwaysMastery: true};

  const activeStats = {
    intellect: 100,
    spirit: 1,
    spellpower: 100,
    haste: 1,
    crit: 1,
    mastery: 1,
    stamina: 5000,
    critMult: 2,
}
  const castProfile = [
    //{spell: "Judgement", cpm: 1, hpc: 0},
    {spell: "Divine Light", cpm: 3.4, hastedCPM: true},
    {spell: "Holy Light", cpm: 4.6, fillerSpell: true, hastedCPM: true},
    {spell: "Flash of Light", cpm: 1.2, hastedCPM: true},
    {spell: "Holy Shock", cpm: 8.5, hastedCPM: true},
    {spell: "Holy Radiance", cpm: 5.8, fillerSpell: true, hastedCPM: true},
    {spell: "Light of Dawn", cpm: (8.5 + 4 + 4)/3, hastedCPM: true},
    {spell: "Seal of Insight", cpm: 0, hastedCPM: true},
    {spell: "Crusader Strike", cpm: 4, hastedCPM: false},

    //{spell: "Divine Plea", cpm: 0.5, freeCast: true},

    // Test

    // Divine Favor
    // Divine Favor has an ~1/6 uptime and increases crit chance and casting speed. We will average its benefit but it can be simulated too.
  ]

  castProfile.forEach(spell => {
    spell.castTime = paladinSpells[spell.spell][0].castTime;
    spell.hpc = 0;
    spell.cost = spell.freeCast ? 0 : paladinSpells[spell.spell][0].cost * 18635 / 100;
    spell.healing = 0;
  })
  const costPerMinute = castProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);
  const playerData = { spec: "Holy Paladin", spells: paladinSpells, settings: testSettings, talents: {...paladinTalents}, stats: activeStats }
  //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");
  const adjSpells = getTalentedSpellDB("Holy Paladin", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: paladinTalents, spec: "Holy Paladin"});
  //console.log(JSON.stringify(adjSpells));
  console.log("Initialized Paladin Set")
  return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
}


export function scorePaladinSet(baseline, statProfile, player, userSettings, tierSets = []) {
  let score = 0;
  const healingBreakdown = {};
  const fightLength = 6;
  const state = {t: 0, holyPower: 3, spec: "Holy Paladin", currentStats: statProfile, healingDone: {}, activeBuffs: [],  healingAura: 1, settings: {reporting: false}};
  const spellpower = statProfile.intellect + statProfile.spellpower;
  const critPercentage = statProfile.crit / 179 / 100 + 1;
  const baseHastePercentage = (statProfile.haste / 128 / 100 + 1) * 1.05 * 1.09 * 1.03; // Haste buff, JotP, SoL
  let fillerHPM = 0;

  // Take care of any extras.
  if (tierSets.includes("Paladin T11-4")) {
    statProfile.spirit += 540;
  }
  if (tierSets.includes("Paladin T12-2")) {
    // 40% chance on Holy Shock cast to restore 184 mana.
    statProfile.mp5 = (statProfile.mp5 || 0) + (baseline.castProfile.filter(spell => spell.spell === "Holy Shock")[0].cpm * baseHastePercentage * 1405 * 0.4) / 12;
  }

  // Calculate filler CPM
  const manaPool = getManaPool(statProfile, "Holy Paladin");
  const regen = (getManaRegen(statProfile, "Holy Paladin") + 
                getAdditionalManaEffects(statProfile, "Holy Paladin").additionalMP5 +
                (statProfile.mp5 || 0)) * 12 * fightLength;
  const totalManaPool = manaPool + regen;
  const fillerCost = baseline.castProfile.filter(spell => spell.spell === "Holy Light")[0]['cost'] +
                      baseline.castProfile.filter(spell => spell.spell === "Holy Radiance")[0]['cost']// This could be more efficient;
  //console.log(totalManaPool);
  //console.log("Rejuv cost: " + fillerCost);
  //console.log("Rejuvs Per Min: " + ((totalManaPool / fightLength) - druidBaseline.costPerMinute) / fillerCost);
  const fillerCPM = ((totalManaPool / fightLength) - baseline.costPerMinute) / fillerCost;
  console.log("Filler CPM: " + fillerCPM + " (Cost: " + fillerCost + ")" + " (Total Mana: " + totalManaPool + ")" + "Cost per min" + baseline.costPerMinute);
  // Evaluate Stats
  // Spellpower

  baseline.castProfile.forEach(spellProfile => {
      const spellName = spellProfile.spell;
      const fullSpell = baseline.spellDB[spellName];
      let spellTotalHealing = 0;
      fullSpell.forEach(spell => {
        if (spell.type === "heal" || spell.type === "classic periodic") {
          const genericMult = 1.05 * 1.06 * 1.09 * (spellProfile.bonus ? spellProfile.bonus : 1); // Seal of Insight, Divinity, Conviction
          const cpm = (spellProfile.fillerSpell ? (fillerCPM + spellProfile.cpm) : (spellProfile.cpm)) * baseHastePercentage;
          const targetCount = spell.targets ? spell.targets : 1;
          let critBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0;
          if (tierSets.includes("Paladin T11-2") && spellName === "Holy Light") critBonus += 0.05;

          const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (critPercentage + critBonus) : 1;
          const additiveScaling = (spell.additiveScaling || 0) + 1
          //const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling : 1;

          let spellHealing = (spell.flat + spell.coeff * spellpower) *
                              (critMult) * // Add base crit
                              additiveScaling *
                              genericMult * 
                              targetCount;
          if (spellName === "Light of Dawn" || spellName === "Word of Glory") spellHealing *= 3; // Holy Power.
          //console.log(spellName, spell.flat, spell.coeff, spellpower, critMult, genericMult, spellHealing);
          // Handle HoT
          if (spell.type === "classic periodic") {
              const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : baseHastePercentage;
              const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
              
              const tickCount = Math.round(spell.buffDuration / (adjTickRate));
              spellHealing = spellHealing * tickCount// * targetCount;
          }

          spellHealing = spellHealing * cpm;

          // Tier Set
          if (tierSets.includes("Paladin T12-4")) {
            // Divine Light, Flash of Light and Holy Light also heal a nearby ally for 10% of the value.
            if (["Divine Light", "Holy Light", "Flash of Light"].includes(spellName)) spellHealing *= 1.1;
          }

          // Mastery
          if (spell.secondaries.includes("mastery")) {
            const absorbVal = spellHealing /*/ (1 - spell.expectedOverheal) */* (getMastery(statProfile, "Holy Paladin") - 1);
            //console.log("Mastery value of " + absorbVal + " on healing of " + spellHealing);
            healingBreakdown["Illuminated Healing"] = (healingBreakdown["Illuminated Healing"] || 0) + absorbVal;
            spellTotalHealing += absorbVal;
            score += absorbVal;
          }



          // Beacon Healing
          let beaconHealing = 0;
          let beaconMult = 0;
          if (spellName === "Holy Light") beaconMult = 1;
          else if (["Flash of Light", "Divine Light", "Light of Dawn", "Holy Shock", "Word of Glory"].includes(spellName)) beaconMult = 0.5;
          else beaconMult = 0;
  
          beaconHealing = spellHealing * (1 - 0.25) * beaconMult; // Beacon OH
  
          healingBreakdown["Beacon of Light"] = (healingBreakdown["Beacon of Light"] || 0) + beaconHealing;
          spellTotalHealing += beaconHealing;
          score += beaconHealing;

          //if (isNaN(spellHealing)) console.log(JSON.stringify(spell));
          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellHealing);
          spellTotalHealing += spellHealing;
          score += spellHealing;
  
        }



      })

      // Filler mana
      if (spellProfile.fillerSpell) {
        fillerHPM = spellTotalHealing / (spellProfile.cost) / spellProfile.cpm;
      }
      
  })

  
    Object.keys(healingBreakdown).forEach(spell => {
      const filteredSpells = baseline.castProfile.filter(spellName => spellName.spell === spell);
      const cpm = filteredSpells.length > 0 ? filteredSpells[0].cpm : 0;
      healingBreakdown[spell] = Math.round(healingBreakdown[spell]) + " (" + Math.round(healingBreakdown[spell] / score * 10000)/100 + "%) - " + Math.round(healingBreakdown[spell] / 60) + " HPS - " + cpm + " CPM";
    })
    //console.log(JSON.stringify(healingBreakdown)); 
  
    // Mana
    //console.log("Filler HPM: " + fillerHPM);
    //const spiritRegen = getManaRegen({...playerData.stats, 'spirit': statProfile.spirit}, playerData.spec) * 12 * 7;
    //score += spiritRegen

    // Handle HPS
    score += (60 * statProfile.hps || 0)

    console.log("Score: " + score / 60);


  return score;
}