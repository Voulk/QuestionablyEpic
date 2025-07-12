
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents} from "General/Modules/Player/ClassDefaults/Classic/Priest/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getTimeUsed, convertStatPercentages, buildCPM, checkHasTalent } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { check } from "prettier";

export const discPriestDefaults = {
    spec: "Discipline Priest Classic",
    name: "Discipline Priest Classic",
    scoreSet: scoreDiscSet,
    initializeSet: initializeDiscSet,
    defaultStatProfile: { 
      intellect: 21000,
      spirit: 8000,
      spellpower: 7907,
      averageDamage: 5585,
      weaponSwingSpeed: 3.4,
      haste: 2500,
      crit: 9000,
      mastery: 9000,
      stamina: 5000,
      mp5: 0,
      critMult: 2,
      hps: 0,
    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear. TODO
        spellpower: 1,
        intellect: 1.11,
        crit: 0.43,
        mastery: 0.347,
        haste: 0.25,
        mp5: 0.614,
        spirit: 0.402,
        hit: 0,
        hps: 0.458, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["Crit", "Spirit", "Mastery", "Haste", "Hit"],

}

export function scoreDiscSetOld(baseline, statProfile, userSettings, tierSets = []) { 
  console.log("Scoring Disc Set");
  let score = 0;
  const healingBreakdown = {};
  const damageBreakdown = {};
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
  reportingData.fillerCPM = fillerCPM;

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

  return {damage: 0, healing: score};
}

// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDiscSet(specBaseline, statProfile, userSettings, tierSets = []) {
  console.log("Scoring Disc Set");
  const castProfile = JSON.parse(JSON.stringify(specBaseline.castProfile));
  const reporting = true;
  const spec = "Discipline Priest";
  let totalHealing = 0;
  let totalDamage = 0;
  const reportingData = {}
  const healingBreakdown = {};
  const damageBreakdown = {};
  const castBreakdown = {};
  const fightLength = 6;
  const talents = specBaseline.talents || discTalents;
  const atonementOverheal = 0.12; // This is smart healing so you tend to get good value.
  const averageEvangStacks = 4;
  const twistOfFateUptime = 0.4;

  ["Smite", "Holy Fire", "Penance"].forEach(spell => {
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

    // Set up Spirit Shell
    // We can have a 25% spirit shell uptime but realistically it'll be closer to ~15-20% since it isn't an HPS gain while active.
    // During this time we'll spam Prayer of Healing and stop casting other spells.
    // It's also possible to do a single target Spirit Shell. That isn't modelled for now but could be.
    const spiritShellUptime = 0.2;
    castProfile.forEach(spell => {
      // Lower non-Spirit shell casts if we'll pause them during the cast
    })

    let fillerCost = getSpellEntry(castProfile, "Smite").cost //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    const fillerWastage = 0.9;

    // Our profile defined our base casts, now we'll use our actual stat line to determine how to spend our filler. This is quite a significant amount of time as MW.
    let timeAvailable = 60 - getTimeUsed(castProfile, specBaseline.spellDB, statPercentages.haste);
    
    const fillerCPMMana = ((totalManaPool / fightLength) - costPerMinute) / fillerCost * fillerWastage;
    const fillerCPMTime = timeAvailable / (1.5 / statPercentages.haste);
    const fillerCPM = Math.min(fillerCPMMana, fillerCPMTime); //
    reportingData.fillerCPM = fillerCPM;
    reportingData.fillerCost = fillerCost;
    reportingData.costPerMinute = costPerMinute;
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
            let heal = spellOutput * spell.damageToHeal * effectiveCPM * (1 - atonementOverheal) * (1 + masteryHeal);
            if (checkHasTalent(talents, "twistOfFate")) heal *= (1 + 0.15 * twistOfFateUptime); // This is a double dip since it increases damage too.
            healingBreakdown["Atonement_" + spellName] = (healingBreakdown["Atonement_" + spellName] || 0) + heal;
            totalHealing += heal;
            rawHeal = heal;
          }
        }
        else {
          // Archangel
          // Healing Only
          spellOutput *= (0.25 * 18 / 40 + 1); // Archangel

          healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
          totalHealing += (spellOutput * effectiveCPM);
          rawHeal = spellOutput * effectiveCPM / (1 - spell.expectedOverheal); 
        }


        if (spellProfile.spiritShell) {
          // During Spirit Shell we need to handle crit differently again.
          // Our healing is equal to (Y x AbsorbMastery x critChance) + (Y x (1 - critChance)). 

        }
        else if (rawHeal > 0) {
            // Divine Aegis
            // Divine Aegis crits are 90% of our heal value (including any HealMast scaling it might have had) x the absorb value of our mastery.
            const divineAegis = rawHeal * (1 + masteryAbsorb) * 0.9 * (statPercentages.crit - 1); // 90% of our heal value x our mastery absorb value.
            healingBreakdown["Divine Aegis"] = (healingBreakdown["Divine Aegis"] || 0) + divineAegis;
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

export function initializeDiscSet(talents = discTalents, ignoreOverhealing = false) {
  const testSettings = {spec: "Discipline Priest Classic", masteryEfficiency: 1, includeOverheal: ignoreOverhealing ? "No" : "Yes", testMode: "No", reporting: true, alwaysMastery: true, fightTimer: 300};
  const discCastProfile = [
    {spell: "Power Word: Shield", cpm: 4.8, freeCast: true}, // Rapture
    {spell: "Prayer of Healing", cpm: 3}, // TODO
    {spell: "Penance", efficiency: 0.85},
    {spell: "Smite", cpm: 3, fillerSpell: true},
    {spell: "Holy Fire", efficiency: 0.85},
    {spell: "Flash Heal", cpm: 1},
    {spell: "Prayer of Mending", efficiency: 0.6},
  ]

  // 
  if (checkHasTalent(talents, "mindbender")) {
    discCastProfile.push({spell: "Mindbender", efficiency: 0.95});
  }
  else {
    discCastProfile.push({spell: "Shadowfiend", efficiency: 0.95});
  }
  if (checkHasTalent(talents, "divineStar")) {
    discCastProfile.push({spell: "Divine Star", efficiency: 0.8});
  }

  const adjSpells = getTalentedSpellDB("Discipline Priest", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: talents, spec: "Discipline Priest", genericBonus: {damage: 1, healing: 1}});


  discCastProfile.forEach(spell => {
    if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
    spell.castTime = discSpells[spell.spell][0].castTime;
    spell.hpc = 0;
    spell.cost = spell.freeCast ? 0 : adjSpells[spell.spell][0].cost/* * 18635 / 100*/;
    spell.healing = 0;
  })
  const costPerMinute = discCastProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);
  const playerData = { spec: "Discipline Priest", spells: discSpells, settings: testSettings, talents: {...discTalents} }
  //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");

  //console.log(JSON.stringify(adjSpells));
  return { castProfile: discCastProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
}