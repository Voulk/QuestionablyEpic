import { CLASSICSHAMANSPELLDB as shamanSpells, shamanTalents  } from "General/Modules/Player/ClassDefaults/Classic/Shaman/ClassicShamanSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";


export const restoShamanDefaults = {
    spec: "Restoration Shaman Classic",
    name: "Restoration Shaman Classic",
    scoreSet: scoreShamanSet,
    initializeSet: initializeShamanSet,
    defaultStatProfile: { 
        // The default stat profile is used to generate default stat weights, and to compare specs. Each spec should have the same rough gear level.

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
      {spell: "Rest", cpm: 3.4, hastedCPM: true},
  
      //{spell: "Divine Plea", cpm: 0.5, freeCast: true},
  
      // Test
  
      // Divine Favor
      // Divine Favor has an ~1/6 uptime and increases crit chance and casting speed. We will average its benefit but it can be simulated too.
    ]
  
    castProfile.forEach(spell => {
      spell.castTime = shamanSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : shamanSpells[spell.spell][0].cost * 18635 / 100;
      spell.healing = 0;
    })
    const costPerMinute = castProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);
    const playerData = { spec: "Restoration Shaman", spells: shamanSpells, settings: testSettings, talents: {...shamanTalents}, stats: activeStats }

    const adjSpells = getTalentedSpellDB("Restoration Shaman", {activeBuffs: [], currentStats: {}, settings: testSettings, reporting: false, talents: shamanTalents, spec: "Restoration Shaman"});
    //console.log(JSON.stringify(adjSpells));

    return { castProfile: castProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
  
  export function scoreShamanSet(baseline, statProfile, player, userSettings, tierSets = []) {
    let score = 0;

    return {damage: 0, healing: score};
  }