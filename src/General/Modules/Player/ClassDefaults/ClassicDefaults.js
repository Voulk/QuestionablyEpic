
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents  } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPaladinSpellDB";
import { getTalentedSpellDB } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";



const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);


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
      {spell: "Swiftmend", cpm: 3.4},
      {spell: "Wild Growth", cpm: 3.5 * (144 / 180)},
      {spell: "Rejuvenation", cpm: 12 * (144 / 180), fillerSpell: true, castOverride: 1.0},
      {spell: "Nourish", cpm: 5.5},
      {spell: "Regrowth", cpm: 0.8}, // Paid Regrowth casts
      {spell: "Regrowth", cpm: 2.4, freeCast: true}, // OOC regrowth casts
      {spell: "Rolling Lifebloom", cpm: 6, freeCast: true, castOverride: 0}, // Our rolling lifebloom. Kept active by Nourish.
  
      // Tree of Life casts
      {spell: "Lifebloom", cpm: 13 * (36 / 180), bonus: 1.15}, // Tree of Life - Single stacks
      {spell: "Regrowth", cpm: (6.5 * 36 / 180), freeCast: true, bonus: 1.15}, // Tree of Life OOC Regrowths
      {spell: "Wild Growth", cpm: 3.5 * (36 / 180), bonus: (1.15 * (8/6))}, // Tree of Life Wild Growth
    ]

    const adjSpells = getTalentedSpellDB("Restoration Druid", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: druidTalents, spec: "Restoration Druid"});
  
    druidCastProfile.forEach(spell => {
      console.log("Spell cost: " + spell.spell + " "  + adjSpells[spell.spell][0].cost)
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
export function scoreDruidSet(druidBaseline, statProfile, player, userSettings) {
    let score = 0;
    const healingBreakdown = {};
    const fightLength = 6;

    const spellpower = statProfile.intellect + statProfile.spellpower;
    const critPercentage = 1.04 + getCritPercentage(statProfile, "Restoration Druid"); // +4% crit
    // Evaluate Stats
    // Spellpower
    /*score = (totalHealing + statProfile.spellPower * druidBaseline.weights.spellPower) * 
                (statProfile.crit / 178 / 100 + 1) *
                (1.25 * statProfile.mastery / 178 / 100 + 1);
    */

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
          const critBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0;
          const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (critPercentage + critBonus) : 1;
          const additiveScaling = (spell.additiveScaling || 0) + 1
          const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling : 1;
          let spellHealing = (spell.flat + spell.coeff * spellpower) *
                              (critMult) * // Add base crit
                              (masteryMult) *
                              genericMult;
          
          // Handle HoT
          if (spell.type === "classic periodic") {
              const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : getHaste(statProfile, "Classic");
              const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
              const targetCount = spell.targets ? spell.targets : 1;
              const tickCount = Math.round(spell.buffDuration / (adjTickRate));
              spellHealing = spellHealing * tickCount * targetCount;
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
    {spell: "Holy Light", cpm: 14, fillerSpell: true},
    {spell: "Flash of Light", cpm: 2.2},
    {spell: "Holy Shock", cpm: 9.5},
    {spell: "Holy Radiance", cpm: 4.5},
    {spell: "Light of Dawn", cpm: (9.5 + 4.5)/3},
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
  console.log({ castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute })
  return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
}


export function scorePaladinSet(baseline, statProfile, player, userSettings) {
  let score = 0;
  const healingBreakdown = {};
  console.log("Trying to score Paladin Set")
  console.log(statProfile);
  const state = {t: 0, holyPower: 3, spec: "Holy Paladin", currentStats: statProfile, healingDone: {}, activeBuffs: [],  healingAura: 1, settings: {reporting: false}};
  const spellpower = statProfile.intellect + statProfile.spellpower;
  const critPercentage = statProfile.crit / 179 / 100 + 1;
  // Evaluate Stats
  // Spellpower

  baseline.castProfile.forEach(spellProfile => {
      const fullSpell = baseline.spellDB[spellProfile.spell];

      fullSpell.forEach(spell => {
        if (spell.type === "heal") runHeal(state, spell, spellProfile.spell)
        

        //const genericMult = 1.09 * (spellProfile.bonus ? spellProfile.bonus : 1); // Conviction
        //const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? critPercentage : 1;
        //const additiveScaling = (spell.additiveScaling || 0) + 1
        //const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling : 1;
        /*let spellHealing = (spell.flat + spell.coeff * spellpower) * // TODO: Swap to a spell specificl spellpower weight.
                            (critMult) * // Add base crit
                            (masteryMult) *
                            genericMult;
        
        // Handle HoT
        if (spell.type === "classic periodic") {
            const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : getHaste(statProfile, "Classic");
            const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
            
            const tickCount = Math.round(spell.buffDuration / (adjTickRate));
            spellHealing = spellHealing * tickCount;
        } */

        //healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + spellHealing;
        
        const spellHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
        console.log(state.healingDone);
        score += (spellHealing * spellProfile.cpm);
        state.healingDone = {};


      })

      // Filler mana
      
  })

  return score;
}