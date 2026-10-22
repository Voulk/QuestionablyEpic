


export const applyForeverDruidTalents = (spellDB, talentTree, statBonuses) => {
    talentTree.forEach(talent => {
        console.log("Talent ", talent.id, " ",talent.points)
        if (druidTalentRegistry[talent.id] && talent.points > 0) {
            
            druidTalentRegistry[talent.id]({ points: talent.points, state: talent.state, spellDB, talentValues: talent.talentValues });
        }
        
    })
}

const druidTalentRegistry: Record<number, any> = {
  // 
  17063: ({ state, spellDB, talentValues, points }) => {
    spellDB["Rejuvenation Rank 11"][0].coeff *= 1.8;
    console.log("BUFFING REJUV");
    // player.addDamageMultiplier('Wrath', damageMultiplierBonus);
  },

  // Moonkin Form (id: 24858)
  24858: ({ state, spellDB, talentValues, points }) => {
    console.log("Talent is activated");
  },


}
