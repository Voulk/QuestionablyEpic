import { TalentEffectFunction } from "globalTypes";
import { adjBuffDurationFlat, buffSpellPerc, getAllSpellRanks } from "../../Generic/TalentBaseForever";



export const applyForeverDruidTalents = (spellDB, talentTree, statBonuses) => {
    talentTree.forEach(talent => {
        console.log("Talent ", talent.id, " ",talent.points)
        if (druidTalentRegistry[talent.id] && talent.points > 0) {
            
            druidTalentRegistry[talent.id]({ points: talent.points, state: talent.state, spellDB, talentValues: talent.talentValues });
        }
        
    })
}

const druidTalentRegistry: Record<number, TalentEffectFunction> = {

    // Full Resto Tree
  17063: ({ state, spellDB, talentValues, points }) => {

  },
  17056: ({ state, spellDB, talentValues, points }) => {
  }, // Furor
  17118: ({ state, spellDB, talentValues, points }) => {
  }, // Subtlety
  17069: ({ state, spellDB, talentValues, points }) => {}, // Naturalist
  16833: ({ state, spellDB, talentValues, points }) => {}, // Natural Shapeshifter
  17104: ({ state, spellDB, talentValues, points }) => {}, // Gift of Nature
  17106: ({ state, spellDB, talentValues, points }) => {}, // Reflection
  414673: ({ state, spellDB, talentValues, points }) => {}, // Gift of the Earthmother
  18562: ({ state, spellDB, talentValues, points }) => {}, // Swiftmend
  17111: ({ state, spellDB, talentValues, points }) => {
    buffSpellPerc(getAllSpellRanks(spellDB, "Rejuvenation"), talentValues[0] || 0.03 * points)
  }, // Improved Rejuvenation
  24968: ({ state, spellDB, talentValues, points }) => {}, // Tranquil Spirit
  17123: ({ state, spellDB, talentValues, points }) => {}, // Improved Tranquility
  1309631: ({ state, spellDB, talentValues, points }) => {}, // Living Spirit
  17116: ({ state, spellDB, talentValues, points }) => {}, // Nature's Swiftness
  17074: ({ state, spellDB, talentValues, points }) => {}, // Improved Regrowth
  408120: ({ state, spellDB, talentValues, points }) => {}, // Wild Growth

  // ── Early Balance Tree
  16814: ({ state, spellDB, talentValues, points }) => {}, // Improved Wrath
  1223081: ({ state, spellDB, talentValues, points }) => {
    //const validSpells = Object.values(spellDB).filter(spells => slices.some(slice => slice.displayInfo.spellName === spellName));
    //buffSpellPerc(validSpells, talentValues[0] || 0.03 * points)
  }, // Genesis
  16845: ({ state, spellDB, talentValues, points }) => {}, // Moonglow
  16918: ({ state, spellDB, talentValues, points }) => {}, // Improved Entangling Roots
  1223082: ({ state, spellDB, talentValues, points }) => {}, // Nature's Majesty
  1223083: ({ state, spellDB, talentValues, points }) => {
    adjBuffDurationFlat(getAllSpellRanks(spellDB, "Rejuvenation"), talentValues[0] || 3000)

  }, // Nature's Splendor
  16819: ({ state, spellDB, talentValues, points }) => {}, // Nature's Reach
  5570: ({ state, spellDB, talentValues, points }) => {}, // Insect Swarm
  16821: ({ state, spellDB, talentValues, points }) => {}, // Improved Moonfire
  16909: ({ state, spellDB, talentValues, points }) => {}, // Vengeance
  16850: ({ state, spellDB, talentValues, points }) => {}, // Improved Starfire

  // ── Feral Combat (treeID 1, rows 0-3) ──
  16934: ({ state, spellDB, talentValues, points }) => {}, // Ferocity
  17003: ({ state, spellDB, talentValues, points }) => {}, // Heart of the Wild
  16947: ({ state, spellDB, talentValues, points }) => {}, // Feral Instinct
  16940: ({ state, spellDB, talentValues, points }) => {}, // Brutal Impact
  16929: ({ state, spellDB, talentValues, points }) => {}, // Thick Hide
  17002: ({ state, spellDB, talentValues, points }) => {}, // Feral Swiftness
  1238122: ({ state, spellDB, talentValues, points }) => {}, // Feral Charge
  16966: ({ state, spellDB, talentValues, points }) => {}, // Shredding Attacks
  16942: ({ state, spellDB, talentValues, points }) => {}, // Sharpened Claws
  16958: ({ state, spellDB, talentValues, points }) => {}, // Blood Frenzy
  16998: ({ state, spellDB, talentValues, points }) => {}, // Savage Fury
  407995: ({ state, spellDB, talentValues, points }) => {}, // Primal Bite
  1322605: ({ state, spellDB, talentValues, points }) => {}, // Shifting Power
  16972: ({ state, spellDB, talentValues, points }) => {}, // Predatory Strikes



}
