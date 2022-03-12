/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} spells Our spell database
 * @param {*} soulbind Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {object} state The state for tracking information, includes the spec
 * @returns An updated spell database with any of the above changes made.
 */
export const applySoulbind = (spells, soulbind, state) => {
    switch(soulbind) {
        case ("Dreamweaver"):
            // Field of Blossoms
            switch(state.spec) {
                case ("Mistweaver Monk"):
                    spells['Faeline Stomp'].push({
                        type: "buff",
                        buffType: "statsMult",
                        stat: 'haste',
                        value: 1.15,
                        buffDuration: 6,
                    });
                break;
            }

            state.activeBuffs.push({name: "Empowered Chrysalis", expiration: 999, buffType: "special", value: 0.1});
            state.activeBuffs.push({name: "Dream Delver", expiration: 999, buffType: "special", value: 1.03});
            break;
        case ("Restoration Druid"):
            break;
        case ("Restoration Shaman"):
            break;
        case ("Mistweaver Monk"):
            spellDB = MONKSPELLS;
            break;
        case ("Discipline Priest"):
            break;
        case ("Holy Priest"):
            break;
        default: 
            // Return an error.
    }
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
 const getGlobalHealingMult = (state, spellName, conduits) => {

 }

 /** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getGlobalDamMult = (buffs, activeAtones, t, spellName, boonStacks, conduits) => {
    let mult = 1

    if (MONKSPELLS[spellName].damageType === "Physical")
    {
        mult *= 1.05 // Mystic Touch.
    }

    const multiplierBuffList = ["Dream Delver", "Tea Time"];
    multiplierBuffList.forEach(buffName => {
        if (checkBuffActive(buffs, buffName)) 
    {
        mult *= buffs.filter(function (buff) {return buff.name === buffName})[0].value;
    }
    });

    if (checkBuffActive(buffs, "Faeline Harmony Inc")) mult *= 1.08;

    return mult; 
}