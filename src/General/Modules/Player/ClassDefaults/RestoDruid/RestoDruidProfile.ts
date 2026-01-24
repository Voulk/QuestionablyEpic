
import specSpellDB from "./RestoDruidSpellDB.json";
import { druidTalents } from "./RestoDruidTalents";
import { printHealingBreakdownWithCPM, getSpellEntry, updateSpellCPM, buildCPM, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";

// Mixed Profile
// Convoke Ramp every 1 minute
// Mini-ramps 
// Swiftmend + Wild Growth on CD


// Thoughts on a profile ramp:
// -- Rejuv --
// Get rejuv count. 
// Healing is rejuv x (rejuv mastery stack + % of duration wild growth might be active / wild growth coverage)
// If Reforestation is active, consider that

// -- Wild Growth -- 
// Can just check mastery stacks by rejuv coverage. Consider any that might fall off.

// -- Regrowth --
// Think about whether they should be on Rejuv targets or not.



// Time Spent
// Wild Growth on CD - 17% of the time baseline. 9500 mana per cast, 47.5k per minute @ 5 cpm
// Swiftmend on CD - 12.5% of the time baseline. 3500 mana per cast, 15.7k per minute @ 4.5 cpm
// Convoke on CD - 4 / 60 = 6.6% of the time baseline.
// Maintain Lifebloom. If no swiftmend then cpm = 4. If Swiftmend then cpm = ~1.4. 3% of the time baseline.
// Leaves ~70% of the time for rejuv / regrowth and mana.

// Full ramp takes 2 Swiftmends + 8 rejuv casts. 15s - haste. Rejuv 5250 mana per cast, 42000 per ramp.
// Buys time for 4-5 regrowths. Low cost.
// Total time cost: 22.5 / haste (37.5%)

// Mana regen per minute = 120,000. If one ramp per minute = 105k. If two ramps per minute = 147k

// Wrath regen = 1687 effective mana per cast.

export const scoreDruidSet = (stats: Stats, settings: PlayerSettings = {}) => {

    const spellDB = JSON.parse(JSON.stringify(specSpellDB));
    const spec = "Resto Druid"
    const statPercentages = {intellect: 2000, haste: 1.3, crit: 1.2, mastery: 1.2, versatility: 1.04};
    const healingBreakdown: Record<string, number> = {};
    const castBreakdown: Record<string, number> = {};
    const fightLength = 6;
    const talents = {} //druidBaseline.talents || druidTalents;

    // Apply Talents


    // Cast Profile
    let castProfile = [
      //{spell: "Tranquility", cpm: 0.3},
      {spell: "Swiftmend", efficiency: 0.9 },
      {spell: "Wild Growth", efficiency: 0.8 },

      {spell: "Rejuvenation", efficiency: 0 },
      {spell: "Regrowth", efficiency: 0 },
      {spell: "Lifebloom", efficiency: 0 },
    ]

    castProfile.forEach(spell => {
        if (spell.efficiency) spell.cpm = buildCPM(spellDB, spell.spell, spell.efficiency)
        spell.castTime = spellDB[spell.spell][0].castTime;
        spell.cost = spell.freeCast ? 0 : spellDB[spell.spell][0].cost/* * 18635 / 100*/;
    });

    const baselineCostPerMinute = castProfile.reduce((acc, spell) => acc + (spell.fillerSpell ? 0 : (spell.cost * spell.cpm)), 0);

    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        fullSpell.forEach((slice: SpellData) => {
            let spellOutput = 0;

            spellOutput = getSpellThroughput(slice, statPercentages, spec, settings, spellFlags)


            const effectiveCPM = spellProfile.fillerSpell ? fillerCPM : spellProfile.cpm;

            const totalOutput = (spellOutput * effectiveCPM);
            if (totalOutput > 0) {
                castBreakdown[spellName] = (castBreakdown[spellName] ?? 0) + (effectiveCPM);
                healingBreakdown[spellName] = (healingBreakdown[spellName] ?? 0) + (totalOutput);
            }

        })

    })
    const totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    //console.log(healingBreakdown);
    printHealingBreakdownWithCPM(healingBreakdown, totalHealing, castProfile);

    return { damage: 0 / 60, healing: totalHealing / 60 }
}