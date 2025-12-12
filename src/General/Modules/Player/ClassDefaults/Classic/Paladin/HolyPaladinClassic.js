import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents  } from "General/Modules/Player/ClassDefaults/Classic/Paladin/ClassicPaladinSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getTimeUsed, convertStatPercentages, buildCPM } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";



export const holyPaladinDefaults = {
    spec: "Holy Paladin Classic",
    name: "Holy Paladin Classic",
    scoreSet: scorePaladinSet,
    initializeSet: initializePaladinSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.
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
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        spellpower: 1,
        intellect: 1.107,
        crit: 0.442,
        mastery: 0.6,
        haste: 0.31,
        spirit: 0.57,
        mp5: 0.82,
        hps: 0.34,
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["mastery", "spirit", "crit", 'haste', 'hit'],
}


export function initializePaladinSet(talents = paladinTalents, ignoreOverhealing = false) {
    console.log("Initializing Paladin Set")
    const testSettings = {spec: "Holy Paladin Classic", masteryEfficiency: 1, includeOverheal: ignoreOverhealing ? "No" : "Yes", reporting: false, t31_2: false, seqLength: 100, alwaysMastery: true};
  
    const castProfile = [
      //{spell: "Judgement", cpm: 1, hpc: 0},
      /*{spell: "Divine Light", cpm: 3.4, hastedCPM: true},
      {spell: "Holy Light", cpm: 4.6, fillerSpell: true, hastedCPM: true},
      {spell: "Flash of Light", cpm: 1.2, hastedCPM: true},
      {spell: "Holy Shock", cpm: 8.4, hastedCPM: false},
      {spell: "Holy Radiance", cpm: 5.6, fillerSpell: true, hastedCPM: true},
      {spell: "Light of Dawn", cpm: (8.4 + 4 + 4)/3, hastedCPM: true, spenderRatio: 0.8},
      {spell: "Seal of Insight", cpm: 0, hastedCPM: true},
      {spell: "Crusader Strike", cpm: 4, hastedCPM: false},
      {spell: "Word of Glory", cpm: 0, hastedCPM: true, spenderRatio: 0.2},

      {spell: "Holy Radiance", cpm: 5.6, fillerSpell: true, hastedCPM: true}, */
      
      {spell: "Judgment", efficiency: 0.8},
      {spell: "Holy Shock", efficiency: 0.85},
      {spell: "Light of Dawn", cpm: 0},
      {spell: "Crusader Strike", efficiency: 0.5},
      {spell: "Holy Radiance", cpm: 0, fillerSpell: true},
      {spell: "Light's Hammer", efficiency: 0.8},
    ]
  
    const adjSpells = getTalentedSpellDB("Holy Paladin", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: paladinTalents, spec: "Holy Paladin"});
    

    castProfile.forEach(spell => {
      if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
      spell.castTime = paladinSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : paladinSpells[spell.spell][0].cost * 60000 / 100;
      spell.healing = 0;
      spell.hopoGenerated = adjSpells[spell.spell][0].holyPower ? Math.max(0, adjSpells[spell.spell][0].holyPower) : 0;
    })
    const costPerMinute = castProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);


    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
  // We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
  // We want to run a CastProfile for each spell but we can optimize that slightly.
  // Instead we'll run a simulated CastProfile baseline.
  
  // Paladin cooldowns:
  export function scorePaladinSet(specBaseline, statProfile, userSettings, tierSets = []) {
    console.log("Scoring Paladin Set");
    let castProfile = JSON.parse(JSON.stringify(specBaseline.castProfile));
    const reporting = userSettings.reporting || false;
    const spec = "Holy Paladin";
    const cooldownStrat = "Sustained" // Sustained vs Burst. Selecting a burst profile will ramp up the value of haste and down the value of spirit. 
    let totalHealing = 0;
    let totalDamage = 0;
    const reportingData = {}
    const healingBreakdown = {};
    const damageBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;
    const talents = specBaseline.talents || paladinTalents;
    const specSettings = {} // We'll eventually put atonement overhealing etc in here.
    let hopoGenerated = 0;
  
    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)
  
    const statPercentages = convertStatPercentages(statProfile, hasteBuff, spec);
  
    reportingData.statPercentages = statPercentages;
  
    // Calculate filler CPM
    const manaPool = getManaPool(statProfile, spec);
    const regen = (getManaRegen(statProfile, spec) + 
                  getAdditionalManaEffects(statProfile, spec).additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;
    let additionalManaPerMinute = 0;
    const totalManaPool = manaPool + regen;
    // Hymn of Hope
    reportingData.additionalMana = getAdditionalManaEffects(statProfile, spec).additionalMP5

    // Seal Mana

    // Divine Plea
    /*const divinePleaMana = 1.35 * statPercentages.spirit * 3 * 0.5; // We get 0.5 Divine Plea casts per minute.
    reportingData.divinePleaMana = divinePleaMana;
    additionalManaPerMinute += divinePleaMana;*/
  
    if (!userSettings.strictSeq) {

      if (tierSets.includes("Paladin T31-4")) { 
        // 1s off Holy Shock
        updateSpellCPM(getSpellEntry(castProfile, "Holy Shock"), 7)
      }

      // Apply haste scaling to our cast profile.
      ["Judgment", "Crusader Strike", "Holy Shock"].forEach(spellName => {
        const spellEntry = getSpellEntry(castProfile, spellName);
        spellEntry.cpm = spellEntry.cpm * statPercentages.haste;
      })

      // Handle our filler casts. 
      // We'll probably rework this to be a package.
      let fillerCost = getSpellEntry(castProfile, "Holy Radiance").cost //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
      if (tierSets.includes("Paladin T14-2")) fillerCost *= 0.9;
      const fillerWastage = 0.9;

      // Update Cost Per Minute with our more frequent hasted casts.
      let costPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

      // Selfless Healer: Mana
      // We can model Selfless Healer as a flat mana reduction attached to Judgment. 
      // The only time this isn't effective is if we are overcapping but this is poor play and the model will avoid it.
      const shManaSaved = getSpellEntry(castProfile, "Judgment").cpm * getSpellEntry(castProfile, "Holy Radiance").cost * 0.35;
      reportingData.shManaSaved = shManaSaved;
      additionalManaPerMinute += shManaSaved; 
    
      let timeAvailable = 60 - getTimeUsed(castProfile, specBaseline.spellDB, statPercentages.haste);

      // Standard package
      const fillerCPMMana = ((totalManaPool / fightLength + additionalManaPerMinute) - costPerMinute) / fillerCost * fillerWastage;
      const fillerCPMTime = timeAvailable / (1.5 / (statPercentages.haste * 1.1)) * fillerWastage;
      const fillerCPM = Math.min(fillerCPMMana, fillerCPMTime); //
      timeAvailable -= fillerCPM * (2.5 / statPercentages.haste); // 

      reportingData.fillerCPMMana = fillerCPMMana;
      reportingData.fillerCPMTime = fillerCPMTime;
    
      //reportingData.costPerMinute = castProfile;
      let manaRemaining = (totalManaPool - (costPerMinute * fightLength)) / fightLength; // How much mana we have left after our casts to spend per minute.
      reportingData.manaRemaining = manaRemaining;
      reportingData.manaPool = totalManaPool;

      // Calculate HoPo
      const hopoGenerated = castProfile.reduce((acc, spell) => acc + (spell.hopoGenerated ? spell.hopoGenerated * spell.cpm : 0), 0);
      reportingData.hopoGenerated = hopoGenerated;

      getSpellEntry(castProfile, "Light of Dawn").cpm += hopoGenerated / 3;

      // Selfless Healer
      const shAvgStacks = getSpellEntry(castProfile, "Judgment").cpm  / fillerCPM;
      getSpellEntry(castProfile, "Holy Radiance").bonus = 1 + 0.2 * shAvgStacks;

      // Daybreak
      const daybreakCastEfficiency = Math.min(2, fillerCPM / (getSpellEntry(castProfile, "Holy Shock").cpm));
      let daybreakBonus = tierSets.includes("Paladin T15-2") ? 1.5 : 1;
      getSpellEntry(castProfile, "Holy Shock").bonus = (getSpellEntry(castProfile, "Holy Shock").bonus || 1) * (1 + 0.75 * daybreakCastEfficiency * daybreakBonus);
      reportingData.daybreakCastEfficiencyFull = (1 + 0.75 * daybreakCastEfficiency);

      reportingData.fillerCPM = fillerCPM;

      // Simulate Holy Avenger window
      // Combine HA, Wings, Guardian, Divine Favor
      // We can play with separating these or even averaging them too via settings.
      // Avenging Wrath: 20% healing. 20s duration.
      // Holy Avenger: triple HoPo gen, generators +30% while active. 18s duration. 2 minute CD.
      // Guardian of Ancient Kings: 10% haste + 100% heal replication. 15s duration.
      // Divine Favor: 20% spell casting haste + 20% crit chance. 20s duration.
      const cdUptime = 18 / 180;
      const cdWastage = 0.2;
      const availableCDCasts = 18 / 1.5 * statPercentages.haste * 1.1 * 1.2 * (1 - cdWastage);
      const lodCasts = availableCDCasts / 2;
      const fillerCasts = availableCDCasts / 2;



      if (cooldownStrat === "Burst") {
        castProfile = castProfile.concat([
          {spell: "Light of Dawn", cpm: lodCasts / 3, isCooldowns: true, bonus: 1.2, critBonus: 0.2}, 
          {spell: "Holy Shock", cpm: fillerCasts / 3 / 3, isCooldowns: true, bonus: 1.3 * 1.2, critBonus: 0.2}, 
          {spell: "Judgment", cpm: fillerCasts / 3 / 3, isCooldowns: true, bonus: 1.3 * 1.2, critBonus: 0.2}, 
          {spell: "Holy Radiance", cpm: fillerCasts  / 3 / 3, isCooldowns: true, bonus: 1.3 * 1.2 * getSpellEntry(castProfile, "Holy Radiance").bonus || 1, critBonus: 0.2}, 
        ])

        castProfile.forEach(spellProfile => {
          spellProfile.cpm *= (1 - cdUptime)
        })
      }
      else {
        castProfile = castProfile.concat([
          {spell: "Light of Dawn", cpm: lodCasts / 3, isCooldowns: true}, 
          {spell: "Holy Shock", cpm: fillerCasts / 3 / 3, isCooldowns: true, bonus: getSpellEntry(castProfile, "Holy Shock").bonus || 1}, 
          {spell: "Judgment", cpm: fillerCasts / 3 / 3, isCooldowns: true}, 
          {spell: "Holy Radiance", cpm: fillerCasts  / 3 / 3, isCooldowns: true, bonus: getSpellEntry(castProfile, "Holy Radiance").bonus || 1}, 
        ])

        castProfile.forEach(spellProfile => {
          spellProfile.cpm *= (1 - cdUptime)
          spellProfile.bonus = (spellProfile.bonus || 1) * (0.2 * cdUptime + 1)
          spellProfile.critBonus = (spellProfile.critBonus || 0) + (0.2 * cdUptime);
          if (["Holy Shock", "Judgment", "Crusader Strike", "Holy Radiance"].includes(spellProfile.spell)) {
            spellProfile.bonus *= (0.3 * cdUptime + 1); // Divine Favor
          }
          
        })


      }

        castProfile.forEach(spellProfile => {
            const fullSpell = specBaseline.spellDB[spellProfile.spell];
            const spellName = spellProfile.spell;
    
            fullSpell.forEach(spell => {
      
              // Exception Cases
              
              // Regular cases
              if (spell.type === "buff" && spell.buffType === "special") return; 
              let spellOutput = 0;
              if (spellProfile.critBonus || spell.statMods?.crit) {
                const updatedCritMod = {crit: (spellProfile.critBonus || 0) + (spell.statMods?.crit || 0)};
                spellOutput = runClassicSpell(spellName, {...spell, statMods: updatedCritMod}, statPercentages, spec, userSettings);
              }
              else {
                spellOutput = runClassicSpell(spellName, spell, statPercentages, spec, userSettings);
              }
              
              let rawHeal = 0;
      
              if (spellProfile.bonus) {
                //console.log("BONUS " + spellName + " = " + spellProfile.bonus);
                spellOutput *= spellProfile.bonus; // Any bonuses we've ascribed in our profile.
              }
      
              const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;
      
              castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
              if (spell.type === "damage" || spell.buffType === "damage") {
                damageBreakdown[spellProfile.spell] = (damageBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
                totalDamage += (spellOutput * effectiveCPM); // 
      
              }
              else {
                healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
                totalHealing += (spellOutput * effectiveCPM);
                rawHeal = spellOutput * effectiveCPM / (1 - spell.expectedOverheal); 
              }

              // Beacon

      

              if (rawHeal > 0) {

                // Beacon
                // Beacon healing does NOT proc Mastery
                const beaconSpecialMods = {
                  "Holy Light": 1,
                  "Holy Radiance": 0.15,
                  "Light of Dawn": 0.15,
                  "Light's Hammer": 0.15,
                  "Holy Prism": 0.15,
                }
                const beaconMod = (spellName in beaconSpecialMods) ? beaconSpecialMods[spellName] : 0.5;
                const beaconHealing = rawHeal * beaconMod * (1 - 0.15) * (tierSets.includes("Paladin T15-4") ? 1.2 : 1); // 15% Beacon Overheal
                healingBreakdown["Beacon of Light"] = (healingBreakdown["Beacon of Light"] || 0) + beaconHealing;
                totalHealing += beaconHealing;

                // Illuminated Healing
                const illuminatedHealing = rawHeal * (statPercentages.mastery);
                healingBreakdown["Illuminated Healing"] = (healingBreakdown["Illuminated Healing"] || 0) + illuminatedHealing;
                totalHealing += illuminatedHealing;

                // Guardian of Ancient Kings
                // 100% healing replication. Does not proc mastery.
                if (cooldownStrat === "Sustained") {
                  const guardianMod = 15 / 180;
                  const guardianOverheal = 0.5;
                  const guardianHealing = rawHeal * guardianMod * (1 - guardianOverheal); //
                  healingBreakdown["Guardian of Ancient Kings"] = (healingBreakdown["Guardian of Ancient Kings"] || 0) + guardianHealing;
                  totalHealing += guardianHealing;
                }
                // In our burst profile, we'll split out our cooldown spells and only buff them, but by the full value.
                else if (spellProfile.isCooldowns) {
                  const guardianMod = 1;
                  const guardianOverheal = 0.5;
                  const guardianHealing = rawHeal * guardianMod * (1 - guardianOverheal); //
                  healingBreakdown["Guardian of Ancient Kings"] = (healingBreakdown["Guardian of Ancient Kings"] || 0) + guardianHealing;
                  totalHealing += guardianHealing;
                }

                  
              }
      
            
              })
    
            // Filler mana
    
        })
    }
  
      // Add any natural HPS we have on the set.
      totalHealing += (60 * statProfile.hps || 0)
  
      // Print stuff.
      if (reporting) {
        printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);
        printHealingBreakdownWithCPM(damageBreakdown, totalDamage, castProfile);
        console.log("DPS: " + totalDamage / 60);
        //reportingData.timeAvailable = timeAvailable;
        console.log(reportingData);
      }
  
      //
      //console.log(castProfile);
  
      return {damage: totalDamage, healing: totalHealing};
  }
  