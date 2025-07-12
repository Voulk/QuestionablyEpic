import { compiledHolyTalents as holyTalents } from "General/Modules/Player/ClassDefaults/Classic/Priest/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getTimeUsed, convertStatPercentages, buildCPM, checkHasTalent } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";


export const holyPriestDefaults = {
    spec: "Holy Priest Classic",
    name: "Holy Priest Classic",
    scoreSet: scoreHPriestSet,
    initializeSet: initializeHPriestSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.

    },
    defaultStatWeights: {
      // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
      spellpower: 1,
      intellect: 2.062,
      crit: 0.656,
      mastery: 0.634,
      haste: 0.588,
      spirit: 1.481,
      mp5: 1.296,
      hps: 1.027
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["spirit", "crit", "mastery", "haste", "hit"],
}

export function initializeHPriestSet(talents = holyTalents) {
  const testSettings = {spec: "Holy Priest Classic", masteryEfficiency: 1, includeOverheal: "Yes", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};

  const castProfile = [
    // Cooldowns
    {spell: "Circle of Healing", efficiency: 0.95},
    {spell: "Holy Word: Sanctuary", efficiency: 0.95},
    {spell: "Holy Word: Serenity", efficiency: 0.95},
    {spell: "Divine Hymn", efficiency: 0.8},
    {spell: "Prayer of Mending", cpm: 0.9},
    //{spell: "Sequence", sequence: ["Spirit Shell", "Prayer of Healing", "Prayer of Healing", "Prayer of Healing"], cooldown: 60},
    
    // Filler Spells
    {spell: "Power Word: Shield", cpm: 3.5, fillerSpell: true, fillerRatio: 0.1},
    {spell: "Renew", cpm: 4, fillerSpell: true, fillerRatio: 0.3},
    {spell: "Prayer of Healing", cpm: 6, fillerSpell: true, fillerRatio: 0.6},

    // DPS spells
    {spell: "Smite", cpm: 0.1},
    {spell: "Holy Fire", cpm: 0.1},
    
  ]

  if (checkHasTalent(talents, "mindbender")) {
    castProfile.push({spell: "Mindbender", efficiency: 0.95});
  }
  else {
    castProfile.push({spell: "Shadowfiend", efficiency: 0.95});
  }
  if (checkHasTalent(talents, "divineStar")) {
    castProfile.push({spell: "Divine Star", efficiency: 0.8});
  }

  const adjSpells = getTalentedSpellDB("Holy Priest", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: holyTalents, spec: "Holy Priest", genericBonus: {damage: 1, healing: 1}});


  castProfile.forEach(spell => {
    if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
    spell.castTime = adjSpells[spell.spell][0].castTime;
    spell.hpc = 0;
    spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
    spell.healing = 0;
  })
  const costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

  return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
}

// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreHPriestSet(specBaseline, statProfile, userSettings, tierSets = []) {
  console.log("Scoring Holy Priest Set");
  const castProfile = JSON.parse(JSON.stringify(specBaseline.castProfile));
  const reporting = userSettings.reporting || false;
  const spec = "Holy Priest";
  let totalHealing = 0;
  let totalDamage = 0;
  const reportingData = {}
  const healingBreakdown = {};
  const damageBreakdown = {};
  const castBreakdown = {};
  const fightLength = 6;
  const talents = specBaseline.talents || holyTalents;
  const specSettings = {} // We'll eventually put atonement overhealing etc in here.
  const chakraUptime = {'yellow': 1, 'blue': 1, 'red': 1}; // Yellow = ST, blue = AoE, red = DPS.
  const averageEvangStacks = 4;
  const twistOfFateUptime = 0.35;

  // Apply Evangelism mana cost reduction.
  ["Smite", "Holy Fire"].forEach(spell => {
    getSpellEntry(castProfile, spell)['cost'] *= (1 - averageEvangStacks * 0.06);
  });
  const costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

  const hasteSetting = getSetting(userSettings, "hasteBuff");
  const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

  const statPercentages = convertStatPercentages(statProfile, hasteBuff, spec);
  statPercentages.spellpower *= 1.1; // Inner Fire
  const masteryAbsorb = (statPercentages.mastery)*2;
  const masteryHeal = statPercentages.mastery;

  reportingData.statPercentages = statPercentages;

  // Calculate filler CPM
  const manaPool = getManaPool(statProfile, spec);
  const regen = (getManaRegen(statProfile, spec) + 
                getAdditionalManaEffects(statProfile, spec).additionalMP5 +
                (statProfile.mp5 || 0)) * 12 * fightLength;
  let petRegen = 0;
  // Pet Regeneration
  // Note we are not interested in *damage* here - only mana. We'll handle damage later.
  if (checkHasTalent(talents, "mindbender")) {
    // Mindbender has a baseline 10 + 1 attacks per cast. The 1 is from its on-cast hit.
    const avgAttacks = 1 + Math.floor(10 * (statPercentages.haste)); // 9 is the average number of attacks per minute.
    const manaPerAttack = 0.0175 * 300000;
    petRegen = avgAttacks * manaPerAttack * getSpellEntry(castProfile, "Mindbender").cpm * fightLength;
  }
  else {
    // Shadowfiend has a baseline 8 + 1 attacks. The 1 is from its on-cast hit.
    const avgAttacks = 1 + Math.floor(8 * (statPercentages.haste)); // 8 is the average number of attacks per minute.
    const manaPerAttack = 0.03 * 300000;
    petRegen = avgAttacks * manaPerAttack * getSpellEntry(castProfile, "Shadowfiend").cpm * fightLength;
  }
  reportingData.petRegen = petRegen;

  // Hymn of Hope


  const totalManaPool = manaPool + regen + petRegen;


    // Handle our filler casts. 
    // They'll mostly be Smite for us.
    let fillerCost = getSpellEntry(castProfile, "Prayer of Healing").cost //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    const fillerWastage = 0.8;

    let timeAvailable = 60 - getTimeUsed(castProfile, specBaseline.spellDB, statPercentages.haste);
    
    const fillerCPMMana = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;
    const fillerCPMTime = timeAvailable / (1.5 / statPercentages.haste) * fillerWastage;
    const fillerCPM = Math.min(fillerCPMMana, fillerCPMTime); //
    timeAvailable -= fillerCPM * (1.5 / statPercentages.haste); // 


    let manaRemaining = (totalManaPool - (costPerMinute * fightLength)) / fightLength; // How much mana we have left after our casts to spend per minute.
    reportingData.manaRemaining = manaRemaining;
    reportingData.manaPool = totalManaPool;


    castProfile.forEach(spellProfile => {
        const fullSpell = specBaseline.spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {

        // Exception Cases
        
        // Regular cases
        if (spell.type === "buff" && spell.buffType === "special") return; 
        let spellOutput = runClassicSpell(spellName, spell, statPercentages, spec, userSettings);
        let rawHeal = 0;

        if (spellProfile.bonus) {
          spellOutput *= spellProfile.bonus; // Any bonuses we've ascribed in our profile.
        }
        
        if (["Smite", "Holy Fire", "Penance"].includes(spellName)) {
          // Evangelism. 
          // This can probably be modelled with some extra depth.
          
          spellOutput *= (1 + 0.04 * averageEvangStacks);
        }
        if (checkHasTalent(talents, "twistOfFate")) spellOutput *= (1 + 0.15 * twistOfFateUptime);

        const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;

        castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
        if (spell.type === "damage" || spell.buffType === "damage") {
          damageBreakdown[spellProfile.spell] = (damageBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
          totalDamage += (spellOutput * effectiveCPM); // Check how Atonement crits work.

          if (spell.damageToHeal) {
            // Needs to be adapted to Solace
            let heal = spellOutput * spell.damageToHeal * effectiveCPM * (1 - atonementOverheal) * (1 + masteryHeal);
            healingBreakdown["Atonement_" + spellName] = (healingBreakdown["Atonement_" + spellName] || 0) + heal;
            totalHealing += heal;
            rawHeal = heal;
          }
        }
        else {
          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
          totalHealing += (spellOutput * effectiveCPM);
          rawHeal = spellOutput * effectiveCPM / (1 - spell.expectedOverheal); 
        }


        if (spellProfile.spiritShell) {
          // During Spirit Shell we need to handle crit differently again.
          // Our healing is equal to (Y x AbsorbMastery x critChance) + (Y x (1 - critChance)). 

        }
        else if (rawHeal > 0 && (spell.healType === "direct" || spellName === "Power Word: Solace")) {
            const echoValue = (rawHeal * (getMastery(statProfile, "Holy Priest")-1) * cpm)
            logHeal(healingBreakdown, "Echo of Light", echoValue);
            score += echoValue;

            // Divine Aegis
            // Divine Aegis crits are 90% of our heal value (including any HealMast scaling it might have had) x the absorb value of our mastery.
            const divineAegis = rawHeal * (1 + masteryAbsorb) * 0.9 * (statPercentages.crit - 1); // 90% of our heal value x our mastery absorb value.
            healingBreakdown["Echo of Light"] = (healingBreakdown["Divine Aegis"] || 0) + divineAegis;
            totalHealing += divineAegis;
        }

        // Power Word: Shield on the other hand just has a straightforward crit multipler and can be handled like normal.


        })

        // Filler mana

    })

    // Add any natural HPS we have on the set.
    totalHealing += (60 * statProfile.hps || 0)

    // Print stuff.
    if (reporting) {
      printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);
      printHealingBreakdownWithCPM(damageBreakdown, totalDamage, castProfile);
      console.log("DPS: " + totalDamage / 60);
      reportingData.timeAvailable = timeAvailable;
      console.log(reportingData);
    }

    //
    //console.log(castProfile);

    return {damage: totalDamage, healing: totalHealing};
}

export function scoreHPriestSetOld(baseline, statProfile, userSettings, tierSets = []) { 
  let score = 0;
  const healingBreakdown = {};
  const fightLength = 6;
  const hasteSetting = getSetting(userSettings, "hasteBuff");
  const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1) * (hasteSetting.includes("Dark Intent") ? 1.03 : 1)

  statProfile.spellpower *= 1.1; // Inner Fire
  const critPercentage = getCritPercentage(statProfile, "Holy Priest"); // +4% crit

  const chakraBreakdown = {
    "serenity": 0.1,
    "sanctuary": 0.9,
    "chastise": 0
  }

  // Take care of any extras.
  if (tierSets.includes("Priest T11-4")) {
    statProfile.spirit += 540;
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

  const baseHastePerc = (statProfile.haste / 128 / 100 + 1) * 1.05; // Haste buff, +2% haste
  const fillerCPM = ((totalManaPool / fightLength) - baseline.costPerMinute) / fillerCost;

  baseline.castProfile.forEach(spellProfile => {
      const fullSpell = baseline.spellDB[spellProfile.spell];
      const spellName = spellProfile.spell;

      fullSpell.forEach(spell => {
        const specialMult = 1;
        const cpm = (spellProfile.cpm + ( spellProfile.fillerSpell ? (fillerCPM * spellProfile.fillerRatio) : 0)) * (spellProfile.hastedCPM ? baseHastePerc : 1);
        let spellThroughput = getSpellThroughput(spell, spellProfile, statProfile, fillerCPM, baseHastePerc, specialMult)

        // Handle HoT
        if (spell.type === "classic periodic") {
            const tickCount = getTickCount(spell, getHaste(statProfile, "Classic") * hasteBuff);

            spellThroughput = spellThroughput * tickCount;
        }

        if (spell.type === "heal" || spell.buffType === "heal") {
          if (spell.healType === "direct") {
            // Echo of Light
            const echoValue = (spellThroughput * (getMastery(statProfile, "Holy Priest")-1) * cpm)
            logHeal(healingBreakdown, "Echo of Light", echoValue);
            score += echoValue;
          }
          

          logHeal(healingBreakdown, spellName, (spellThroughput * cpm), spell);
          score += (spellThroughput * cpm);
        } 
        else if (spell.type === "damage" || spell.buffType === "damage") {
        }
      })
      // Filler mana
  })

    // Handle HPS
    score += (60 * statProfile.hps || 0)

    Object.keys(healingBreakdown).forEach(spell => {
      healingBreakdown[spell] = Math.round(healingBreakdown[spell]) + " (" + Math.round(healingBreakdown[spell] / score * 10000)/100 + "%)";
    })

    console.log(healingBreakdown);

  return {damage: 0, healing: score};
}

