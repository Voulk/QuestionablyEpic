import { checkBuffActive } from "./RampBase";

// Checks if a spell is a valid cast.
// The following checks are made:
// Is the spell on cooldown? Do they have an available charge?
// If the spell uses a secondary resource, do they have enough available? 
// Are the APL conditions met? 
// In general, spec specific checks are acceptable, but attempt to genericize it if possible and only use something spec specific if required. 
// Additional APL conditions are welcome if you need them.

// Current APL conditions:
// - Has a talent been taken?
// - If a buff active? Or is it missing?
// - Are we a certain amount of time into a fight?
// - Do we have a certain amount of a resource? (Useful for not overcapping on something).
// APL conditions are an array and we can have more than one. If any fail then the function returns false. 
// If you're looking for an OR condition, add multiple entries. If these are used a lot then we could add a more natural way to do it. 
const canCastSpell = (state, spellDB, spellName, conditions = {}) => {
    
    const spell = spellDB[spellName][0];

    let aplReq = true;
    let miscReq = true;
    let cooldownReq = true;
    const secondaryResourceReq = (spell.holyPower + state.holyPower >= 0 ) || !spell.holyPower || checkBuffActive(state.activeBuffs, "Divine Purpose");

    // Added workaround CDR/Stacks pending rework
    //const cooldownReq = (state.t >= spell.activeCooldown) || !spell.cooldown;
    if (spell.cooldownData) {
        cooldownReq = (state.t >= spell.cooldownData.activeCooldown - ((spell.charges > 1 ? (spell.cooldownData.cooldown / (spell.cooldownData.hasted ? getHaste(state.currentStats) : 1)) * (spell.charges - 1) : 0))) || !spell.cooldownData.cooldown;
    }
    
    if (conditions) {
        conditions.forEach(condition => {
            if (condition.type === "talent" && state.talents[conditions.talentName].points === 0) aplReq = false;
            else if (condition.type === "talentMissing") {
                if (typeof state.talents[condition.talentNot] == "undefined") aplReq = false;
                else if (state.talents[condition.talentNot].points > 0) aplReq = false;
            }
            else if (condition.type === "resource" && condition.resourceName === "Holy Power") aplReq = state.holyPower >= condition.holyPower;
            else if (condition.type === "resource" && condition.resourceName === "Essence") aplReq = state.essence >= condition.resourceCost;
            else if (condition.type ==="buff") aplReq = checkBuffActive(state.activeBuffs, condition.buffName);
            else if (condition.type ==="buffMissing") aplReq = !checkBuffActive(state.activeBuffs, condition.buffName);
            else if (condition.type === "buffStacks") aplReq = getBuffStacks(state.activeBuffs, condition.buffName) >= condition.stacks;
            else if (condition.type === "afterTime") aplReq = state.t >= condition.timer;
            else if (condition.type === "beforeTime") aplReq = state.t <= condition.timer;
        })
    } 

    return cooldownReq && secondaryResourceReq && miscReq && aplReq;
}

export const genSpell = (state, spells, apl) => {

    const usableSpells = [...apl].filter(spell => canCastSpell(state, spells, spell.s, spell.conditions || ""));

    /*
    if (state.holyPower >= 3) {
        spellName = "Light of Dawn";
    }
    else {
        let possibleCasts = [{name: "Holy Shock", score: 0}, {name: "Flash of Light", score: 0}]

        possibleCasts.forEach(spellData => {
            if (canCastSpell(state, spells, spellData['name'])) {
                spellData.score = getSpellHPM(state, spells, spellData['name'])
            }
            else {
                spellData.score = -1;
            }
        });
        possibleCasts.sort((a, b) => (a.score < b.score ? 1 : -1));
        console.log(possibleCasts);
        spellName = possibleCasts[0].name;
    }
    console.log("Gen: " + spellName + "|");
    */
    if (usableSpells.length > 0) return usableSpells[0].s;
    else return "Rest";

}