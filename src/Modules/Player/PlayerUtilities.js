/*

This file contains utility functions that center around the player or players class / spec. 


*/

// This function converts raw log output to a form that's easier to use around the app. 
// If you need an extra field that you can easily add it here.
export function convertLogSpellOutput(player, logOutput, fightLength) {

    let data = {};
    let totalHealing = 0;
    let totalOverhealing = 0;

    let duration = Math.round(100 * fightLength / 1000) / 100;
    let fightInfo = {
        hps: 0,
        rawhps: 0,
        fightLength: duration,
    };

    for (let i = 0; i < logOutput.length; i++) {
        let spell = logOutput[i];
        let spellName = spell.name
        let casts = 'uses' in spell ? spell.uses : 0;
        let spellHPS = Math.round(spell.total / duration * 100) / 100;
        let overHealingPerc = 'overheal' in spell ? (Math.round(100 * spell.overheal / (spell.overheal + spell.total)) / 100) : 0;

        data[spellName] = [casts, spell.total, 0, spellHPS, overHealingPerc];

        totalHealing += logOutput[i].total;
        totalOverhealing += 'overheal' in spell ? spell.overheal : 0;
        
    }

    fightInfo.hps = Math.round(totalHealing / duration);
    fightInfo.rawhps = Math.round((totalHealing + totalOverhealing) / duration);

    player.setSpellPattern("Raid", data);
    player.setFightInfo(fightInfo);

    //console.log(JSON.stringify(data));
    //console.log(JSON.stringify(player));
}

// We could also extract talent information if it was desired. 
export function convertLogStatOutput(player, logOutput, id) {

    
    let data = {}

    let output = logOutput.filter(entry => entry.id === id);

    if (output.length > 0) {
        let info = output[0].combatantInfo.stats;

        data.intellect = info.Intellect.min;
        data.stamina = info.Stamina.min;

        data.crit = info.Crit.min;
        data.haste = info.Haste.min;
        data.mastery = info.Mastery.min;
        data.versatility = info.Versatility.min;

        data.leech = info.Leech.min;
        
    }

    player.setActiveStats(data);
    //console.log(JSON.stringify(player));
    /*

                    intellect: 1500,
                haste: 400,
                crit: 350,
                mastery: 0,
                versatility: 200,
                stamina: 1490,
                hps: 6000,
                rawhps: 9420,
                fightLength: 180,

    */

}