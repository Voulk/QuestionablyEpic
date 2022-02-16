const { runCastSequence } = require("Retail/Engine/EffectFormulas/Monk/MonkSpellSequence.js");

describe("Test Sequences", () => {
    //const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    /*player.activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 445,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    } */
    const activeStats = {
        intellect: 2370,
        haste: 410,
        crit: 1100,
        mastery: 85,
        versatility: 700,
        stamina: 1000,
        manaMod: 1,
    }

    let covenants = {"Base": [], "NL": [], "Night Fae": []} 

    //const NFsequenceOld = ["Faeline Stomp", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Faeline Stomp", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const NLsequenceOld = ["Tiger Palm", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Bonedust Brew", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const baseSequenceOld = ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
  
    // NF gets an extra RSK with enough haste, NL could with reset?
    // Need to EF within 10s of using RSK within 4pc, second EF just at end of 4pc
    // FLS pre-4pc are good, past 4pc good with buff
    // ReM just before 4pc extend into second 4pc window
    // 47% chance to have FLS off CD at mentioned cast points.
    const NFsequence = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Faeline Stomp", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Faeline Stomp", "Blackout Kick", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Refreshing Jade Wind", "Renewing Mist", "Rising Sun Kick"];
    const NLsequence = ["Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Bonedust Brew", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Refreshing Jade Wind", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind"];
    const baseSequence =  ["Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Refreshing Jade Wind", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind"];
    
    test("Legendaries & Soulbinds", () => {
        
        covenants["Base"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        console.log("Base: " + covenants["Base"][0].totalHealing + " (HPM: " + covenants["Base"][0].hpm + "). Damage: " + covenants["Base"][0].totalDamage);

        /*
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        console.log("Night Fae: " + covenants["Night Fae"][0].totalHealing*1.02 + " (HPM: " + covenants["Night Fae"][0].hpm*1.02 + "). Damage: " + covenants["Night Fae"][0].totalDamage*1.08);
        
        // Multiplied by 1.15 to simulate 2nd legendary
        covenants["NL"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        console.log("NL: " + (covenants["NL"][0].totalHealing + covenants["NL"][1].totalHealing*1.15)/2 + " (HPM: " + (covenants["NL"][0].hpm + covenants["NL"][1].hpm*1.15)/2 + "). Damage: " + (covenants["NL"][0].totalDamage+covenants["NL"][1].totalDamage*1.15)/2);
        */
        
    })

})