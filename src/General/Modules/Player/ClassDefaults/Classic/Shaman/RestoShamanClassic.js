import { CLASSICSHAMANSPELLDB as shamanSpells, shamanTalents  } from "General/Modules/Player/ClassDefaults/Classic/Shaman/ClassicShamanSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getHasteClassic, getSpellAttribute, getTimeUsed, updateSpellCPM, splitSpellCPM, buildCPM  } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT";

export const restoShamanDefaults = {
    spec: "Restoration Shaman Classic",
    name: "Restoration Shaman Classic",
    scoreSet: scoreShamanSet,
    initializeSet: initializeShamanSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.
      intellect: 21000,
      spirit: 9000,
      spellpower: 7907,
      averageDamage: 5585,
      weaponSwingSpeed: 3.4,
      haste: 5000,
      crit: 8000,
      mastery: 3000,
      stamina: 5000,
      mp5: 0,
      critMult: 2,
      hps: 0,
    },
    defaultStatWeights: {
        // Used in the trinket chart and for Quick Compare. Not used in Top Gear.
        spellpower: 1,
        intellect: 1.11,
        crit: 0.55,
        mastery: 0.4,
        haste: 0.541,
        spirit: 0.4,
        mp5: 0.473,
        hps: 0.3, // 
    },
    specialQueries: {
        // Any special information we need to pull.
    },
    autoReforgeOrder: ["crit", "haste", "spirit", "mastery", "hit"],
}


export function initializeShamanSet() {
    console.log("Initializing Shaman Set")
    const testSettings = {spec: "Restoration Shaman Classic", masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, t31_2: false, seqLength: 100, alwaysMastery: true};
  
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
      //{spell: "Rest", cpm: 3.4, hastedCPM: true},
      {spell: "Healing Rain", efficiency: 0.95 },
      {spell: "Healing Tide Totem", efficiency: 0.95 },
      {spell: "Riptide", efficiency: 0.7 },
      {spell: "Healing Stream Totem", efficiency: 0.90 },
      {spell: "Unleash Life", efficiency: 0.90 },


      // Dynamic filler spells. We'll write these for each individual set.
      {spell: "Lightning Bolt", cpm: 0 },
      {spell: "Chain Heal", cpm: 0 },
      {spell: "Greater Healing Wave", cpm: 0 },
  
    ]
  

    const playerData = { spec: "Restoration Shaman", spells: shamanSpells, settings: testSettings, talents: {...shamanTalents}, stats: activeStats }

    const adjSpells = getTalentedSpellDB("Restoration Shaman", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: shamanTalents, spec: "Restoration Shaman"});
    //console.log(JSON.stringify(adjSpells));
    castProfile.forEach(spell => {
      if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
      spell.castTime = shamanSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : shamanSpells[spell.spell][0].cost * 60000 / 100;
      spell.healing = 0;
    })
    const costPerMinute = castProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);

    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
  
  export function scoreShamanSet(baseline, statProfile, userSettings, tierSets = []) {
    let score = 1;
    const masteryEffectiveness = 0.3; // Can easily be converted to a setting.
    const healingBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;
    const talents = baseline.talents || shamanTalents;
    const castProfile = JSON.parse(JSON.stringify(baseline.castProfile));
    const reportingData = {}
    const spellDB = baseline.spellDB;
    const resurgenceReturn = {
      "Chain Heal": 2947,
      "Greater Healing Wave": 8849,
      "Healing Surge": 5309,
      "Healing Wave": 8849,
      "Unleash Life": 5309,
      "Riptide": 5309,
    }


    // Conductivity Extensions. Advantages and disadvantages to doing this dynamically. Ultimately the fight is more likely to dictate
    // moving Healing Rain than your extensions alone.
    const conductivityExtensions = 2.5; 

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    const statPercentages = {
      spellpower: statProfile.intellect + statProfile.spellpower + 2873 * 1.1, // 
      crit: 1 + getCritPercentage(statProfile, "Restoration Shaman"),
      haste: getHasteClassic(statProfile, hasteBuff),
      mastery: (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 3 * masteryEffectiveness, // We'll +1 this when calculating spells.
    }

    getSpellEntry(castProfile, "Healing Tide Totem").hasteBonus = 0.3;

    if (tierSets.includes("Shaman T14-2")) {
      getSpellEntry(castProfile, "Greater Healing Wave").cost *= 0.9; // T14-2 - GHW cost reduction
    }
    if (tierSets.includes("Shaman T15-2")) {
      getSpellEntry(castProfile, "Healing Stream Totem").bonus = 1.25; // T15-2 - HST bonus
    }

       // Calculate filler CPM
    const manaPool = getManaPool(statProfile, "Restoration Shaman");
    const regen = (getManaRegen(statProfile, "Restoration Shaman") + 
                  getAdditionalManaEffects(statProfile, "Restoration Shaman").additionalMP5 +
                  (statProfile.mp5 || 0)) * 12 * fightLength;

    const totalManaPool = manaPool + regen;
    reportingData.totalManaPool = totalManaPool; // Doesn't include crit regen.

    reportingData.prc = statPercentages;



    // Mod Mana Costs (Resurgence)
    Object.keys(resurgenceReturn).forEach(spellName => {
      const spell = getSpellEntry(castProfile, spellName);
      if (spell) {
        let reduction = (statPercentages.crit - 1) * resurgenceReturn[spellName];
        if (spellName === "Chain Heal") reduction *= 3; 
        spell.cost -= reduction;
        //console.log(spellName + " cost reduced by " + reduction + " to " + spell.cost + " (original price: " + (spell.cost + reduction) + ")");
      }
    })

    const effectiveHealingRainCPM = getSpellEntry(castProfile, "Healing Rain").cpm / 2;
    const unleashCPM = getSpellEntry(castProfile, "Unleash Life").cpm;

    getSpellEntry(castProfile, "Healing Rain").cpm = effectiveHealingRainCPM;
    spellDB["Healing Rain"][0].buffDuration = 10 + conductivityExtensions * 4; // Extend the duration of healing rain.

    const unleashBreakdown = {"Healing Rain": 1}
    reportingData.unleashBreakdown = unleashBreakdown;

    // Calculate how much time we have left after our core spells above.
    // We'll then spend that time casting a combo of Lightning Bolt for regen and Chain Heal / Greater Healing Wave etc with our filler.
    // More haste = more time for packages. More spirit = a better ratio of healing to damage spells.
    const timeSpent =  60 - getTimeUsed(castProfile, baseline.spellDB, statPercentages.haste);
    reportingData.timeSpent = timeSpent;

    const lbManaRegen = 6000 - getSpellEntry(castProfile, "Lightning Bolt").cost
    reportingData.lbManaRegen = lbManaRegen;

    const costPerMinute = castProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);
    let manaRemaining = (totalManaPool - (costPerMinute * fightLength)) / fightLength; // How much mana we have left after our casts to spend per minute.

    // First, spend any excess mana.
    const fillerRatio = {
      "Chain Heal": 0.75,
      "Greater Healing Wave": 0.25
    }
    const packageCost = (getSpellEntry(castProfile, "Chain Heal").cost * fillerRatio["Chain Heal"] + getSpellEntry(castProfile, "Greater Healing Wave").cost * fillerRatio["Greater Healing Wave"])
    const pureHealingPackages = manaRemaining / packageCost;
    // Next, spend the rest of the fights time available on a net 0 package that combines lightning bolt with Chain Heal / GHW.

    // Resurgence

    getSpellEntry(castProfile, "Chain Heal").cpm += pureHealingPackages * fillerRatio["Chain Heal"];
    getSpellEntry(castProfile, "Greater Healing Wave").cpm = pureHealingPackages * fillerRatio["Greater Healing Wave"];
    const timeRemaining = 60 - getTimeUsed(castProfile, spellDB, statPercentages.haste);
    reportingData.timeRemaining = timeRemaining;

    reportingData.chainHealCost = getSpellEntry(castProfile, "Chain Heal").cost;
    const lightningBoltsPerChainHeal = getSpellEntry(castProfile, "Chain Heal").cost / lbManaRegen;
    const dpsPackageLength = (lightningBoltsPerChainHeal * getSpellAttribute(spellDB["Lightning Bolt"], "castTime") + getSpellAttribute(spellDB["Chain Heal"], "castTime")) / statPercentages.haste;

    getSpellEntry(castProfile, "Chain Heal").cpm += timeRemaining / dpsPackageLength;
    getSpellEntry(castProfile, "Lightning Bolt").cpm += timeRemaining / dpsPackageLength * lightningBoltsPerChainHeal;

    reportingData.dpsPackageLength = dpsPackageLength;
    reportingData.lightningBoltsPerChainHeal = lightningBoltsPerChainHeal;
    reportingData.costPerMinute = costPerMinute;
    reportingData.manaRemaining = manaRemaining;

    const packageCount = Math.floor(manaRemaining / packageCost);
    reportingData.packageCount = packageCount;

    let healingEvents = 0;
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;

        fullSpell.forEach(spell => {

        // Exception Cases
        
        // Regular cases
        let spellOutput = 0;
        if (spellProfile.hasteBonus) {
          spellOutput = runClassicSpell(spellName, spell, {...statPercentages, haste: statPercentages.haste * (1 + spellProfile.hasteBonus)}, "Restoration Shaman", userSettings);
          //console.log("Haste baseline: " + statPercentages.haste + " with bonus " + " = " + (statPercentages.haste * (1 + spellProfile.hasteBonus)));
        }
        else {
          spellOutput = runClassicSpell(spellName, spell, statPercentages, "Restoration Shaman", userSettings);
        }

        let bonusMult = 1;
        
        if (unleashBreakdown[spellName]) bonusMult *= 1+ (0.3 * unleashBreakdown[spellName]); // Unleash Life bonus
        if (spellProfile.bonus) bonusMult *= spellProfile.bonus;
        spellOutput *= bonusMult; // Any bonuses we've ascribed in our profile.
        if (bonusMult > 1) reportingData[spellName + " Bonus Mult"] = bonusMult;

        const effectiveCPM = spellProfile.cpm// spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;


        castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
        healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
        score += (spellOutput * effectiveCPM);

        // Ascendance
        // Here we're using a flat Ascendance model. It's fairly likely you'd actually combine with Elemental Mastery.
        const ascendanceUptime = 15 / 180; 
        const ascendanceOverheal = 0.2;
        const ascendanceHealing = spellOutput * ascendanceUptime * effectiveCPM * (1 - ascendanceOverheal);
        healingBreakdown["Ascendance"] = (healingBreakdown["Ascendance"] || 0) + (ascendanceHealing);
        score += ascendanceHealing;

        // Earthliving
        if (spell.type === "classic periodic" && spell.buffType === "heal") {
            const adjTickRate = Math.ceil((spell.tickData.tickRate / statPercentages.haste - 0.0005) * 1000)/1000;
            let tickCount = Math.round(spell.buffDuration / (adjTickRate));
            const viableHealingEvents = (spell.targets || 1) * tickCount * effectiveCPM * (spell.specialCoeff || 0)
            healingEvents += viableHealingEvents;
            reportingData["Event Count_" + spellName] = viableHealingEvents;

        }
        else if (spell.type === "heal") healingEvents += (spell.targets || 1) * effectiveCPM * (spell.specialCoeff || 0);



        })

        // Filler mana

        
    })

    const singleEarthliving = runClassicSpell("Earthliving Weapon", spellDB["Earthliving Weapon"][0], statPercentages, "Restoration Shaman", userSettings);
    healingBreakdown["Earthliving"] = singleEarthliving * healingEvents * 0.2;
    reportingData.healingEvents = healingEvents;
    score += (singleEarthliving * healingEvents * 0.2);

    score += (60 * statProfile.hps || 0)
    //printHealingBreakdownWithCPM(healingBreakdown, score, castProfile);
    //console.log(reportingData);
    return {damage: 0, healing: score};
  }