
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents} from "General/Modules/Player/ClassDefaults/Classic/Priest/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { runClassicSpell, printHealingBreakdownWithCPM, getSpellEntry, getTimeUsed, convertStatPercentages, buildCPM, checkHasTalent } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";


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
    autoReforgeOrder: ["crit", "mastery", "spirit", "haste", "hit"],

}


// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDiscSet(specBaseline, statProfile, userSettings, tierSets = []) {
  console.log("Scoring Disc Set");
  const castProfile = JSON.parse(JSON.stringify(specBaseline.castProfile));
  const reporting = userSettings.reporting || false;
  const spec = "Discipline Priest";
  let totalHealing = 0;
  let totalDamage = 0;
  const reportingData = {}
  const healingBreakdown = {};
  const damageBreakdown = {};
  const castBreakdown = {};
  const fightLength = 6;
  const talents = specBaseline.talents || discTalents;
  const specSettings = {} // We'll eventually put atonement overhealing etc in here.
  const atonementOverheal = 0.12; // This is smart healing so you tend to get good value.
  const averageEvangStacks = 4;
  const twistOfFateUptime = 0.4;

  // Apply Evangelism mana cost reduction.
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

    // Handle our filler casts. 
    // They'll mostly be Smite for us.
    let fillerCost = getSpellEntry(castProfile, "Smite").cost //specBaseline.castProfile.filter(spell => spell.spell === "Rejuvenation")[0]['cost']; // This could be more efficient;
    const fillerWastage = 0.85;


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
  return { castProfile: discCastProfile, spellDB: adjSpells, costPerMinute: costPerMinute, talents: talents };
}