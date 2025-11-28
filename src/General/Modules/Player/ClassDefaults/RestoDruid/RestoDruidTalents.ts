

const classTalents: TalentTree = {

}

const specTalents: TalentTree = {
    improvedWildGrowth: {points: 1, maxPoints: 1, icon: "spell_nature_starfall", id: 449185, select: true, tier: 4, runFunc: function (state: any, spellDB: SpellDB, points: number) {
        spellDB["Wild Growth"][0].targets! += 1;
    }}, 
}

const heroTalents: TalentTree = {
    // Wildstalker

    // Keeper of the Grove
}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
    ...heroTalents,
};