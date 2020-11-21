/*

This file contains utility functions that center around the player or players class / spec. 


*/

// This function converts raw log output to a form that's easier to use around the app. 
// If you need an extra field that you can easily add it here.
export function convertLogOutput(player, logOutput, fightLength) {

    let data = {};
    let totalHealing = 0;
    let duration = fightLength / 1000;

    for (let i = 0; i < logOutput.length; i++) {
        let spell = logOutput[i];
        let spellName = spell.name
        let casts = 'uses' in spell ? spell.uses : 0;
        let spellHPS = Math.round(spell.total / duration * 100) / 100;
        let overHealing = 'overheal' in spell ? (Math.round(100 * spell.overheal / (spell.overheal + spell.total)) / 100) : 0;
        //console.log(logOutput[i].name);

        data[spellName] = [casts, spell.total, 0, spellHPS, overHealing];

        totalHealing += logOutput[i].total;
        
    }

    player.setSpellPattern("Raid", data);

    //console.log(JSON.stringify(data));
    //console.log(JSON.stringify(player));


}