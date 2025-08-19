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
        intellect: 1.645,
        crit: 0.785,
        mastery: 0.398,
        haste: 1.083,
        spirit: 1.123,
        mp5: 1.199,
        hps: 0.7, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["Mastery", "Crit", "Spirit", 'Haste', 'Hit'],
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

      // Apply haste scaling to our cast profile.
      ["Judgment", "Crusader Strike", "Holy Shock"].forEach(spellName => {
        const spellEntry = getSpellEntry(castProfile, spellName);
        spellEntry.cpm = spellEntry.cpm * statPercentages.haste;
      })

      // Handle our filler casts. 
      // We'll probably rework this to be a package.
      let fillerCost = getSpellEntry(castProfile, "Holy Radiance").cost //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
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

      castProfile.forEach(spellProfile => {
        spellProfile.cpm *= (1 - cdUptime)
      })

      castProfile = castProfile.concat([
        {spell: "Light of Dawn", cpm: lodCasts / 3, isCooldowns: true, bonus: 1.2, critBonus: 0.2}, 
        {spell: "Holy Shock", cpm: fillerCasts / 3 / 3, isCooldowns: true, bonus: 1.3 * 1.2, critBonus: 0.2}, 
        {spell: "Judgment", cpm: fillerCasts / 3 / 3, isCooldowns: true, bonus: 1.3 * 1.2, critBonus: 0.2}, 
        {spell: "Holy Radiance", cpm: fillerCasts  / 3 / 3, isCooldowns: true, bonus: 1.3 * 1.2 * getSpellEntry(castProfile, "Holy Radiance").bonus || 1, critBonus: 0.2}, 
      ])

        castProfile.forEach(spellProfile => {
            const fullSpell = specBaseline.spellDB[spellProfile.spell];
            const spellName = spellProfile.spell;
    
            fullSpell.forEach(spell => {
      
              // Exception Cases
              
              // Regular cases
              if (spell.type === "buff" && spell.buffType === "special") return; 
              let spellOutput = 0;
              if (spellProfile.critBonus) {
                const updatedCritMod = {crit: 0.2}
                spellOutput = runClassicSpell(spellName, {...spell, statMods: updatedCritMod}, statPercentages, spec, userSettings);
              }
              else {
                spellOutput = runClassicSpell(spellName, spell, statPercentages, spec, userSettings);
              }
              
              let rawHeal = 0;
      
              if (spellProfile.bonus) {
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
                const beaconHealing = rawHeal * beaconMod * (1 - 0.15); // 15% Beacon Overheal
                healingBreakdown["Beacon of Light"] = (healingBreakdown["Beacon of Light"] || 0) + beaconHealing;
                totalHealing += beaconHealing;

                // Illuminated Healing
                const illuminatedHealing = rawHeal * (statPercentages.mastery);
                healingBreakdown["Illuminated Healing"] = (healingBreakdown["Illuminated Healing"] || 0) + illuminatedHealing;
                totalHealing += illuminatedHealing;

                // Guardian of Ancient Kings
                // 100% healing replication. Does not proc mastery.
                if (spellProfile.isCooldowns) {
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
  
  export function scorePaladinSetOld(baseline, statProfile, player, userSettings, tierSets = []) {
    let score = 0;
    const healingBreakdown = {};
    const fightLength = 6;
    const state = {t: 0, holyPower: 3, spec: "Holy Paladin", currentStats: statProfile, healingDone: {}, activeBuffs: [],  healingAura: 1, settings: {reporting: false}};
    const spellpower = statProfile.intellect + statProfile.spellpower;
    const critPercentage = statProfile.crit / 179 / 100 + 1;
    const baseHastePercentage = (statProfile.haste / 128 / 100 + 1) * 1.05 * 1.09 * 1.03; // Haste buff, JotP, SoL
    let fillerHPM = 0;
    const beaconOverheal = 0.15;
  
    // Take care of any extras.
    if (tierSets.includes("Paladin T11-4")) {
      statProfile.spirit += 540;
    }
    if (tierSets.includes("Paladin T12-2")) {
      // 40% chance on Holy Shock cast to restore 184 mana.
      statProfile.mp5 = (statProfile.mp5 || 0) + (baseline.castProfile.filter(spell => spell.spell === "Holy Shock")[0].cpm * baseHastePercentage * 1405 * 0.4) / 12;
    }
    if (tierSets.includes("Paladin T13-2")) {
      // 25% cost reduction for 15s after pressing Innervate
      const spellsCast = {
          "Holy Shock": 2,
          "Holy Light": 1,
          "Holy Radiance": Math.floor(15-(2.5*1+2*1.5)/getHaste(statProfile, "Classic"))/2.5,
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
    const manaPool = getManaPool(statProfile, "Holy Paladin");
    const regen = (getManaRegen(statProfile, "Holy Paladin") + 
                  getAdditionalManaEffects(statProfile, "Holy Paladin").additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;
    const totalManaPool = manaPool + regen;
    const fillerCost = baseline.castProfile.filter(spell => spell.spell === "Holy Light")[0]['cost'] +
                        baseline.castProfile.filter(spell => spell.spell === "Holy Radiance")[0]['cost']// This could be more efficient;
    const fillerWastage = 0.85;
    //console.log(totalManaPool);
    //console.log("Rejuv cost: " + fillerCost);
    //console.log("Rejuvs Per Min: " + ((totalManaPool / fightLength) - druidBaseline.costPerMinute) / fillerCost);
    const fillerCPM = ((totalManaPool / fightLength) - baseline.costPerMinute) / fillerCost * fillerWastage;
    console.log("Filler CPM: " + fillerCPM + " (Cost: " + fillerCost + ")" + " (Total Mana: " + totalManaPool + ")" + "Cost per min" + baseline.costPerMinute);
    reportingData.fillerCPM = fillerCPM;
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
            if (tierSets.includes("Paladin T13-4") && spellName === "Holy Radiance") spellHealing *= 1.05;
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
    
            beaconHealing = spellHealing * (1 - beaconOverheal) * beaconMult; // Beacon OH
    
            healingBreakdown["Beacon of Light"] = (healingBreakdown["Beacon of Light"] || 0) + beaconHealing;
            spellTotalHealing += beaconHealing;
            score += beaconHealing;
  
            //if (isNaN(spellHealing)) console.log(JSON.stringify(spell));
            spellHealing *= ((1 - spell.expectedOverheal) || 1)

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
      console.log(healingBreakdown)
      console.log("Score: " + score / 60);
  
  
    return {damage: 0, healing: score};
  }