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
    
    const activeStats2 = {
        intellect: 2370,
        haste: 700,
        crit: 1100,
        mastery: 85,
        versatility: 410,
        stamina: 1000,
        manaMod: 1,
    }
    
    const activeStats3 = {
        intellect: 2370,
        haste: 750,
        crit: 750,
        mastery: 85,
        versatility: 750,
        stamina: 1000,
        manaMod: 1,
    }

    let covenants = {"Base": [], "NL": [], "Night Fae": []} 
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

    //const NFsequenceOld = ["Faeline Stomp", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Faeline Stomp", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const NLsequenceOld = ["Tiger Palm", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Bonedust Brew", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const baseSequenceOld = ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
  
    // NF gets an extra RSK with enough haste, NL could with reset?
    // Need to EF within 10s of using RSK within 4pc, second EF just at end of 4pc
    // FLS pre-4pc are good, past 4pc good with buff
    // ReM just before 4pc extend into second 4pc window
    // 47% chance to have FLS off CD at mentioned cast points.
    const NFsequence = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Faeline Stomp", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Faeline Stomp", "Blackout Kick", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Refreshing Jade Wind", "Renewing Mist", "Rising Sun Kick"];
    // 0.8 HPM lost with no reset just before 4pc, not much
    //const NFsequenceNoFLSReset = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Faeline Stomp", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Faeline Stomp", "Rising Sun Kick", "Chi Burst", "Tiger Palm", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Blackout Kick", "Rising Sun Kick", "Renewing Mist", "Refreshing Jade Wind", "Tiger Palm", "Tiger Palm"];
    const NLsequence = ["Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Bonedust Brew", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Refreshing Jade Wind", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind"];
    const baseSequence =  ["Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Refreshing Jade Wind", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind"];
    
    test("Legendaries & Soulbinds", () => {
        
        covenants["Base"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        console.log("Base Balanced Stats: " + covenants["Base"][0].totalHealing + " (HPM: " + covenants["Base"][0].hpm + "). 4PC Window: " + covenants["Base"][0].total4pcWindow + " (" + Math.round(covenants["Base"][0].total4pcWindow/covenants["Base"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Base"][0].totalDamage);

        // NF 
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        console.log("NF Crit/Vers: " + covenants["Night Fae"][0].totalHealing + " (HPM: " + covenants["Night Fae"][0].hpm + "). 4PC Window: " + covenants["Night Fae"][0].total4pcWindow + " (" + Math.round(covenants["Night Fae"][0].total4pcWindow/covenants["Night Fae"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][0].totalDamage);
        console.log("NF Crit/Haste: " + covenants["Night Fae"][1].totalHealing + " (HPM: " + covenants["Night Fae"][1].hpm + "). 4PC Window: " + covenants["Night Fae"][1].total4pcWindow + " (" + Math.round(covenants["Night Fae"][1].total4pcWindow/covenants["Night Fae"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][1].totalDamage);
        console.log("NF Balanced: " + covenants["Night Fae"][2].totalHealing + " (HPM: " + covenants["Night Fae"][2].hpm + "). 4PC Window: " + covenants["Night Fae"][2].total4pcWindow + " (" + Math.round(covenants["Night Fae"][2].total4pcWindow/covenants["Night Fae"][2].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][2].totalDamage);
        
        // Multiplied by 1.15 to simulate 2nd legendary
        covenants["NL"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        console.log("NL Crit/Vers: " + (covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing*1.15))/2 + " (HPM: " + (covenants["NL"][0].hpm + Math.round(covenants["NL"][1].hpm*1.15*100)/100)/2 + "). 4PC Window: " + (covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow*1.15))/2)/((covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][0].totalDamage+Math.round(covenants["NL"][1].totalDamage*1.15))/2);
        console.log("NL Crit/Haste: " + (covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing*1.15))/2 + " (HPM: " + (covenants["NL"][2].hpm + Math.round(covenants["NL"][3].hpm*1.15*100)/100)/2 + "). 4PC Window: " + (covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow*1.15))/2)/((covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][2].totalDamage+Math.round(covenants["NL"][3].totalDamage*1.15))/2);
        console.log("NL Balanced: " + (covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing*1.15))/2 + " (HPM: " + (covenants["NL"][4].hpm + Math.round(covenants["NL"][5].hpm*1.15*100)/100)/2 + "). 4PC Window: " + (covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow*1.15))/2)/((covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][4].totalDamage+Math.round(covenants["NL"][5].totalDamage*1.15))/2);
        
    })

})