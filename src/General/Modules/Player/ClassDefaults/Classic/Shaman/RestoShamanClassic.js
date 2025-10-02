import { CLASSICSHAMANSPELLDB as shamanSpells, shamanTalents  } from "General/Modules/Player/ClassDefaults/Classic/Shaman/ClassicShamanSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getHasteClassic,  updateSpellCPM, splitSpellCPM, buildCPM  } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
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
      haste: 3043,
      crit: 8000,
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
    autoReforgeOrder: [],
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
  
    ]
  

    const playerData = { spec: "Restoration Shaman", spells: shamanSpells, settings: testSettings, talents: {...shamanTalents}, stats: activeStats }

    const adjSpells = getTalentedSpellDB("Restoration Shaman", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: shamanTalents, spec: "Restoration Shaman"});
    //console.log(JSON.stringify(adjSpells));
    castProfile.forEach(spell => {
      if (spell.efficiency) spell.cpm = buildCPM(adjSpells, spell.spell, spell.efficiency)
      spell.castTime = shamanSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : shamanSpells[spell.spell][0].cost * 18635 / 100;
      spell.healing = 0;
    })
    const costPerMinute = castProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);

    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
  
  export function scoreShamanSet(baseline, statProfile, userSettings, tierSets = []) {
    let score = 1;
    const masteryEffectiveness = 0.4; // Can easily be converted to a setting.
    const healingBreakdown = {};
    const castBreakdown = {};
    const fightLength = 6;
    const talents = baseline.talents || shamanTalents;
    const castProfile = JSON.parse(JSON.stringify(baseline.castProfile));

    const hasteSetting = getSetting(userSettings, "hasteBuff");
    const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    const statPercentages = {
      spellpower: statProfile.intellect + statProfile.spellpower,
      crit: 1 + getCritPercentage(statProfile, "Restoration Shaman"),
      haste: getHasteClassic(statProfile, hasteBuff),
      mastery: (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 3 * masteryEffectiveness, // We'll +1 this when calculating spells.
    }

    console.log(castProfile);

    castProfile.forEach(spellProfile => {
        const fullSpell = baseline.spellDB[spellProfile.spell];
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
        


        if (spellProfile.bonus) {
          spellOutput *= spellProfile.bonus; // Any bonuses we've ascribed in our profile.
        }
        
        const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;


        castBreakdown[spellProfile.spell] = (castBreakdown[spellProfile.spell] || 0) + (effectiveCPM);
        healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + (spellOutput * effectiveCPM);
        score += (spellOutput * effectiveCPM);

        })

        // Filler mana

        
    })

    score += (60 * statProfile.hps || 0)

    return {damage: 0, healing: score};
  }