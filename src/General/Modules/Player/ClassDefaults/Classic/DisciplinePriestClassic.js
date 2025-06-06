
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents} from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

export const discPriestDefaults = {
    spec: "Discipline Priest Classic",
    name: "Discipline Priest Classic",
    scoreSet: scoreDiscSet,
    initializeSet: initializeDiscSet,
    defaultStatProfile: { 
        // The default stat profile is used to compare specs. Each spec should have the same rough gear level.

    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        spellpower: 1,
        intellect: 2.668,
        crit: 0.545,
        mastery: 0.461,
        haste: 0.914,
        spirit: 0.711,
        mp5: 1.028,
        hps: 0.7, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: [],

}

export function scoreDiscSet(baseline, statProfile, player, userSettings, tierSets = []) { 
  let score = 0;
  const healingBreakdown = {};
  const fightLength = 6;
  const hasteSetting = getSetting(userSettings, "hasteBuff");
  const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1) * (hasteSetting.includes("Dark Intent") ? 1.03 : 1)

  const spellpower = statProfile.intellect +  statProfile.spellpower + 532; // Inner Fire
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

  if (tierSets.includes("Priest T13-2")) {
    // 25% cost reduction for 23s after pressing PI or DH.
    // Ultimately you often use PI on a DPS which means you can't save it as well for high healing phases. 
    const spellsCast = {
        "Holy Fire": 2,
        "Prayer of Healing": 4,
        "Power Word: Shield": 3,
        "Smite": Math.floor(23-(2*2+4*2.5+3*1.5)/getHaste(statProfile, "Classic")) * 0.9,
    }

    const manaSaved = Object.keys(spellsCast).reduce((total, spellName) => {
        const spell = baseline.castProfile.find(spell => spell.spell === spellName);
        
        if (!spell) return total; // Spell can't be found, ignore.

        const spellCost = spell.cost;
        const manaSavedForSpell = spellCost * spellsCast[spellName] * 0.25;


        return total + manaSavedForSpell;
    }, 0); // Start accumulating from 0
    statProfile.mp5 = (statProfile.mp5 || 0) + (manaSaved / 120 * 5);
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
        if (spellName === "Power Word: Shield" && tierSets.includes("Priest T13-4")) genericMult *= 1.1;

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
    {spell: "Power Word: Shield", cpm: 4, hastedCPM: true, fillerSpell: true, fillerRatio: 0.3},
    {spell: "Prayer of Healing", cpm: 6, hastedCPM: true, fillerSpell: true, fillerRatio: 0.7},
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