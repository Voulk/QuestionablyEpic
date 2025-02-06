import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents  } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents, compiledHolyTalents as holyPriestTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

export function scoreHPriestSet(baseline, statProfile, player, userSettings, tierSets = []) { 
  let score = 0;
  const healingBreakdown = {};
  const fightLength = 6;
  const hasteSetting = getSetting(userSettings, "hasteBuff");
  const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1) * (hasteSetting.includes("Dark Intent") ? 1.03 : 1)

  const spellpower = /*statProfile.intellect + */ statProfile.spellpower + 532; // Inner Fire
  const critPercentage = getCritPercentage(statProfile, "Holy Priest"); // +4% crit

  const chakraBreakdown = {
    "serenity": 0.1,
    "sanctuary": 0.9,
    "chastise": 0
  }
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
  const manaPool = getManaPool(statProfile, "Holy Priest");
  const regen = (getManaRegen(statProfile, "Holy Priest") + 
                getAdditionalManaEffects(statProfile, "Holy Priest").additionalMP5 +
                (statProfile.mp5 || 0)) * 12 * fightLength;
  const totalManaPool = manaPool + regen;

  // Build filler
  //const fillerCost = baseline.castProfile.filter(spell => spell.spell === "Prayer of Healing")[0]['cost']  // This could be more efficient;
  let fillerCost = 0;
  baseline.castProfile.filter(spell => spell.fillerSpell).forEach(spell => {
    fillerCost += spell.cost * spell.fillerRatio
  });

  const baseHastePerc = (statProfile.haste / 128 / 100 + 1) * 1.05 * 1.02; // Haste buff, +2% haste
  const fillerCPM = ((totalManaPool / fightLength) - baseline.costPerMinute) / fillerCost;

  baseline.castProfile.forEach(spellProfile => {
      const fullSpell = baseline.spellDB[spellProfile.spell];
      const spellName = spellProfile.spell;

      fullSpell.forEach(spell => {
        let genericMult = 1 * (spellProfile.bonus ? spellProfile.bonus : 1);

        // Handle Crit
        let spellCritPercentage = critPercentage + ((spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0);
        const critEffect = ('statMods' in spell && spell.statMods.critEffect) ? spell.statMods.critEffect : 2;
        const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? (spellCritPercentage * critEffect + (1 - critPercentage)) : 1;
        
        const additiveScaling = (spell.additiveScaling || 0) + 1;
        const cpm = (spellProfile.cpm + ( spellProfile.fillerSpell ? (fillerCPM * spellProfile.fillerRatio) : 0)) * (spellProfile.hastedCPM ? baseHastePerc : 1);
        // Regular mastery scaling (PW:S)
        const targetCount = spell.targets ? spell.targets : 1;

        if ((spell.type === "heal" || spell.buffType === "heal")) genericMult *= (0.15 * 18 / 30 + 1); // Archangel
        if (spellName === "Smite" || spellName === "Holy Fire") genericMult *= (1 + 0.02 * 5 / 2);

        let spellThroughput = (spell.flat + spell.coeff * spellpower) *
                            (critMult) *
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
          // Check if direct heal
          if (spell.healType === "direct") {
            // Echo of Light
            const echoValue = (spellThroughput * (getMastery(statProfile, "Holy Priest")-1) * cpm)
            logHeal(healingBreakdown, "Echo of Light", echoValue);
            //healingBreakdown["Echo of Light"] = (healingBreakdown["Echo of Light"] || 0) + echoValue;
            score += echoValue;
          }
          
          //healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellThroughput * cpm);
          logHeal(healingBreakdown, spellProfile.spell, (spellThroughput * cpm), spell);
          score += (spellThroughput * cpm);
        } 
        else if (spell.type === "damage" || spell.buffType === "damage") {
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

    console.log(healingBreakdown);

  return score;
}

export function initializeHPriestSet() {
  const testSettings = {spec: "Holy Priest Classic", masteryEfficiency: 1, includeOverheal: "Yes", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};

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
    {spell: "Power Word: Shield", cpm: 3.5, hastedCPM: true, fillerSpell: true, fillerRatio: 0.1},
    {spell: "Renew", cpm: 4, hastedCPM: true, fillerSpell: true, fillerRatio: 0.3},
    {spell: "Prayer of Healing", cpm: 6, hastedCPM: true, fillerSpell: true, fillerRatio: 0.6},
    {spell: "Circle of Healing", cpm: 4.5},
    {spell: "Holy Word: Sanctuary", cpm: 3, hastedCPM: false},
    {spell: "Holy Word: Serenity", cpm: 1, hastedCPM: false},
    {spell: "Divine Hymn", cpm: 1/3},
    {spell: "Prayer of Mending", cpm: 3.5},
  ]

  const adjSpells = getTalentedSpellDB("Holy Priest", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: holyPriestTalents, spec: "Holy Priest", genericBonus: {damage: 1, healing: 1}});

  castProfile.forEach(spell => {
    spell.castTime = adjSpells[spell.spell][0].castTime;
    spell.hpc = 0;
    spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
    spell.healing = 0;
  })
  const costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);
  //const playerData = { spec: "Holy Priest", spells: discSpells, settings: testSettings, talents: {...discTalents}, stats: activeStats }
  //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");

  //console.log(JSON.stringify(adjSpells));
  return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
}