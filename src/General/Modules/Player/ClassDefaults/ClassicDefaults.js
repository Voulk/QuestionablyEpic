
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents as druidTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicDruidSpellDB";
import { getTalentedSpellDB } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";

export function initializeDruidSet() {
    const testSettings = {spec: "Restoration Druid Classic", masteryEfficiency: 1, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 100, alwaysMastery: true};
  
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
    const druidCastProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Swiftmend", cpm: 3.4},
      {spell: "Wild Growth", cpm: 3.5},
      {spell: "Rejuvenation", cpm: 12 * (144 / 180), fillerSpell: true, castOverride: 1.0},
      {spell: "Nourish", cpm: 8.5},
      {spell: "Regrowth", cpm: 0.8}, // Paid Regrowth casts
      {spell: "Regrowth", cpm: 2.4, freeCast: true}, // OOC regrowth casts
      {spell: "Rolling Lifebloom", cpm: 6, freeCast: true, castOverride: 0}, // Our rolling lifebloom. Kept active by Nourish.
  
      // Tree of Life casts
      {spell: "Lifebloom", cpm: 13 * (36 / 180), bonus: 1.15}, // Tree of Life - Single stacks
      {spell: "Regrowth", cpm: (6.5 * 36 / 180), freeCast: true, bonus: 1.15} // Tree of Life OOC Regrowths
    ]
  
    druidCastProfile.forEach(spell => {
      spell.castTime = druidSpells[spell.spell][0].castTime;
      spell.hpc = 0;
      spell.cost = spell.freeCast ? 0 : druidSpells[spell.spell][0].cost * 18635 / 100;
      spell.healing = 0;
    })
    const costPerMinute = druidCastProfile.reduce((acc, spell) => acc + spell.cost * spell.cpm, 0);
    console.log("Cost per minute: " + costPerMinute);
    const playerData = { spec: "Restoration Druid", spells: druidSpells, settings: testSettings, talents: {...druidTalents}, stats: activeStats }
    //const suite = runClassicStatSuite(playerData, druidCastProfile, runCastSequence, "CastProfile");
    const adjSpells = getTalentedSpellDB("Restoration Druid");
    //console.log(JSON.stringify(adjSpells));
    return { castProfile: druidCastProfile, spellDB: adjSpells, costPerMinute: costPerMinute };
  }
  
// We want our scoring function to be fairly fast to run. Stat weights are fastest but they're a little messy too.
// We want to run a CastProfile for each spell but we can optimize that slightly.
// Instead we'll run a simulated CastProfile baseline.
// Rejuv is our baseline spell
export function scoreDruidSet(druidBaseline, statProfile, player, userSettings) {
    let score = 0;
    const healingBreakdown = {};

    const spellpower = statProfile.intellect + statProfile.spellpower;
    const critPercentage = statProfile.crit / 179 / 100 + 1;
    // Evaluate Stats
    // Spellpower
    /*score = (totalHealing + statProfile.spellPower * druidBaseline.weights.spellPower) * 
                (statProfile.crit / 178 / 100 + 1) *
                (1.25 * statProfile.mastery / 178 / 100 + 1);
    */

    druidBaseline.castProfile.forEach(spellProfile => {
        const fullSpell = druidBaseline.spellDB[spellProfile.spell];

        fullSpell.forEach(spell => {
        const genericMult = 1.04 * (spellProfile.bonus ? spellProfile.bonus : 1);
        const critMult = (spell.secondaries && spell.secondaries.includes("crit")) ? critPercentage : 1;
        const additiveScaling = (spell.additiveScaling || 0) + 1
        const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / 179 / 100 + 0.08) * 1.25) / additiveScaling : 1;
        let spellHealing = (spell.flat + spell.coeff * spellpower) * // TODO: Swap to a spell specificl spellpower weight.
                            (critMult) * // Add base crit
                            (masteryMult) *
                            genericMult;
        
        // Handle HoT
        if (spell.type === "classic periodic") {
            const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : getHaste(statProfile, "Classic");
            const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
            
            const tickCount = Math.round(spell.buffDuration / (adjTickRate));
            spellHealing = spellHealing * tickCount;
        }
        
        //if (isNaN(spellHealing)) console.log(JSON.stringify(spell));
        healingBreakdown[spellProfile.spell] = (healingBreakdown[spellProfile.spell] || 0) + spellHealing;
        score += (spellHealing * spellProfile.cpm);

        //console.log("Spell: " + spellProfile.spell + " Healing: " + spellHealing + " (C: " + critMult + ". M: " + masteryMult + ". AS: " + additiveScaling + ")");
        })

        // Filler mana
        
    })


    //console.log(score);
    // Deal with mana
    //console.log(JSON.stringify(healingBreakdown));
    //console.log("HPS SCORE: " + score/60)
    return score;
}