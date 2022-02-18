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
    const activeStats = { // NF Stats
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
    
    const activeStats3 = { // NL/Venth stats
        intellect: 2370,
        haste: 750,
        crit: 750,
        mastery: 85,
        versatility: 750,
        stamina: 1000,
        manaMod: 1,
    }
    
    const pretierStats = { // Pretier/leg stats
        intellect: 2370,
        haste: 300,
        crit: 1100,
        mastery: 85,
        versatility: 750,
        stamina: 1000,
        manaMod: 1,
    }

    let covenants = {"Base": [], "NL": [], "Night Fae": [], "Venth": [], "VenthPre": [], "NFPre": [], "NLPre": []} 

    //const NFsequenceOld = ["Faeline Stomp", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Faeline Stomp", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const NLsequenceOld = ["Tiger Palm", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Bonedust Brew", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const baseSequenceOld = ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
  
    // NF gets an extra RSK with enough haste, others could with reset?
    // Need to EF within 10s of using RSK within 4pc, second EF just at end of 4pc
    // FLS pre-4pc are good, past 4pc good with buff
    // ReM just before 4pc extend into second 4pc window
    // 47% chance to have FLS off CD at mentioned cast points.
    const NFsequence = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Faeline Stomp", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Faeline Stomp", "Blackout Kick", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Faeline Stomp", "Blackout Kick", "Refreshing Jade Wind", "Renewing Mist", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Tiger Palm", "Blackout Kick"];
    // 0.8 HPM lost with no reset just before 4pc, not much
    const NFsequenceNoFLSReset = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Faeline Stomp", "Rising Sun Kick", "Blackout Kick", "Chi Burst", "Blackout Kick", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Refreshing Jade Wind", "Faeline Stomp", "Renewing Mist", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick"];
    
    const NLsequence = ["Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Bonedust Brew", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Refreshing Jade Wind", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind"];
    const baseSequence =  ["Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Thunder Focus Tea", "Refreshing Jade Wind", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Refreshing Jade Wind", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind"];
    
    // Found that using throughput boost after 2 envm is more healing for both cov
    //const YulonNF = ["Essence Font", "Faeline Stomp", "Invoke Yulon", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Thunder Focus Tea", "Rising Sun Kick", "Faeline Stomp", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonNF = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Faeline Stomp", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Faeline Stomp", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonNFPre2leg = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Faeline Stomp", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonNL = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Bonedust Brew", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonVenth = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];

    // Revival basic test
    // In theory NF should have more EF hots due to FLS but BDB is EF but better
    const RevivalNL = ["Bonedust Brew", "Essence Font", "Revival"]
    const RevivalNF = ["Faeline Stomp", "Essence Font", "Revival"]
    const RevivalVenth = ["Essence Font", "Revival"]

    test("Legendaries & Soulbinds", () => {
        
        //covenants["Base"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        //covenants["Base"].push(runCastSequence(revivaltest, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        //console.log("Base: " + covenants["Base"][0].totalHealing + " (HPM: " + covenants["Base"][0].hpm + "). 4PC Window: " + covenants["Base"][0].total4pcWindow + " (" + Math.round(covenants["Base"][0].total4pcWindow/covenants["Base"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Base"][0].totalDamage);

        // 0 tier - sequence won't be optimized but gives rough idea
        // Venth
        covenants["VenthPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(YulonVenth, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(RevivalVenth, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        console.log("PreTier Venth: " + covenants["VenthPre"][0].totalHealing + " (HPM: " + covenants["VenthPre"][0].hpm + "). Damage: " + covenants["VenthPre"][0].totalDamage+ "\n" +
        "Venth Yulon: " + covenants["VenthPre"][1].totalHealing + " (HPM: " + covenants["VenthPre"][1].hpm + "). Damage: " + covenants["VenthPre"][1].totalDamage + "\n" +
        "Venth Revival: " + covenants["VenthPre"][2].totalHealing + "\n" +
        "HPS over 8m fight: " + Math.round((covenants["VenthPre"][0].totalHealing/30*14 + covenants["VenthPre"][1].totalHealing/16*2 + covenants["VenthPre"][2].totalHealing/3*3)/19*100)/100 + " - assuming 2 yulon, 3 revival (not including FO)");
        // Sequences work at balanced stats

        // NF - Manually removed FLH extra heal.
        covenants["NFPre"].push(runCastSequence(NFsequenceNoFLSReset, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NFPre"].push(runCastSequence(YulonNFPre2leg, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NFPre"].push(runCastSequence(RevivalNF, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        console.log("PreTier NF: " + covenants["NFPre"][0].totalHealing*0.98 + " (HPM: " + covenants["NFPre"][0].hpm*0.98 + "). Damage: " + covenants["NFPre"][0].totalDamage*0.92 + "\n" +
        "NF Yulon: " + covenants["NFPre"][1].totalHealing*0.98 + " (HPM: " + covenants["NFPre"][1].hpm*0.98 + "). Damage: " + covenants["NFPre"][1].totalDamage*0.92 + "\n" +
        "NF Revival: " + covenants["NFPre"][2].totalHealing*0.98 + "\n" +
        "HPS over 8m fight: " + Math.round((covenants["NFPre"][0].totalHealing/30*14 + covenants["NFPre"][1].totalHealing/14*2 + covenants["NFPre"][2].totalHealing/3*3)/19*0.98*100)/100 + " - assuming 2 yulon, 3 revival");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        // NL
        // Multiplied by 1.15 to simulate 2nd legendary
        covenants["NLPre"].push(runCastSequence(NLsequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(NLsequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(NLsequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(YulonNL, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(RevivalNL, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        console.log("PreTier NL Crit/Vers: " + (covenants["NLPre"][0].totalHealing + Math.round(covenants["NLPre"][1].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NLPre"][0].hpm + covenants["NLPre"][1].hpm)/2*100)/100 + ") Damage: " + (covenants["NLPre"][0].totalDamage+Math.round(covenants["NLPre"][1].totalDamage))/2 + "\n" +
        "NL Crit/Haste: " + (covenants["NLPre"][2].totalHealing + Math.round(covenants["NLPre"][3].totalHealing))/2 + " (HPM: " + Math.round((covenants["NLPre"][2].hpm + covenants["NLPre"][3].hpm)/2*100)/100 + "). Damage: " + (covenants["NLPre"][2].totalDamage+Math.round(covenants["NLPre"][3].totalDamage))/2 + "\n\n Balanced seems best stats: \n" +
        "NL Balanced: " + (covenants["NLPre"][4].totalHealing + Math.round(covenants["NLPre"][5].totalHealing))/2 + " (HPM: " + Math.round((covenants["NLPre"][4].hpm + covenants["NLPre"][5].hpm)/2*100)/100 + "). Damage: " + (covenants["NLPre"][4].totalDamage+Math.round(covenants["NLPre"][5].totalDamage))/2 + "\n" +
        "NL Yulon: " + covenants["NLPre"][6].totalHealing + " (HPM: " + covenants["NLPre"][6].hpm + "). Damage: " + covenants["NLPre"][6].totalDamage + "\n" +
        "NL Revival: " + covenants["NLPre"][7].totalHealing + "\n" +
        "HPS over 8m fight: " + Math.round((covenants["NLPre"][4].totalHealing/30*5 + covenants["NLPre"][5].totalHealing/30*9 + covenants["NLPre"][6].totalHealing/13*2 + covenants["NLPre"][7].totalHealing/3*3)/19*100)/100 + " - assuming 2 yulon, 3 revival (using bdb for yulon + revival)");
        // Lowered number of guarenteed BDB 4pc to factor that that would be used on yulon
    
        // 4pc, 2 legendary
        // Venth
        covenants["Venth"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth"].push(runCastSequence(YulonVenth, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth"].push(runCastSequence(RevivalVenth, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        console.log("4pc Venth: " + covenants["Venth"][0].totalHealing + " (HPM: " + covenants["Venth"][0].hpm + "). 4PC Window: " + covenants["Venth"][0].total4pcWindow + " (" + Math.round(covenants["Venth"][0].total4pcWindow/covenants["Venth"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][0].totalDamage+ "\n" +
        "Venth Yulon: " + covenants["Venth"][1].totalHealing + " (HPM: " + covenants["Venth"][1].hpm + "). 4PC Window: " + covenants["Venth"][1].total4pcWindow + " (" + Math.round(covenants["Venth"][1].total4pcWindow/covenants["Venth"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][1].totalDamage + "\n" +
        "Venth Revival: " + covenants["Venth"][2].totalHealing + "\n" +
        "HPS over 8m fight: " + Math.round((covenants["Venth"][0].totalHealing/30*14 + covenants["Venth"][1].totalHealing/16*2 + covenants["Venth"][2].totalHealing/3*3)/19*100)/100 + " - assuming 2 yulon, 3 revival (not including FO)");
        // Sequences work at balanced stats

        // NF
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["Night Fae"].push(runCastSequence(YulonNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["Night Fae"].push(runCastSequence(RevivalNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        console.log("4pc NF: " + covenants["Night Fae"][0].totalHealing + " (HPM: " + covenants["Night Fae"][0].hpm + "). 4PC Window: " + covenants["Night Fae"][0].total4pcWindow + " (" + Math.round(covenants["Night Fae"][0].total4pcWindow/covenants["Night Fae"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][0].totalDamage + "\n" +
        "NF Yulon: " + covenants["Night Fae"][1].totalHealing + " (HPM: " + covenants["Night Fae"][1].hpm + "). 4PC Window: " + covenants["Night Fae"][1].total4pcWindow + " (" + Math.round(covenants["Night Fae"][1].total4pcWindow/covenants["Night Fae"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][1].totalDamage + "\n" +
        "NF Revival: " + covenants["Night Fae"][2].totalHealing + "\n" +
        "HPS over 8m fight: " + Math.round((covenants["Night Fae"][0].totalHealing/30*14 + covenants["Night Fae"][1].totalHealing/14*2 + covenants["Night Fae"][2].totalHealing/3*3)/19*100)/100 + " - assuming 2 yulon, 3 revival");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        // NL
        // Multiplied by 1.15 to simulate 2nd legendary
        covenants["NL"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        console.log("4pc NL Crit/Vers: " + (covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NL"][0].hpm + covenants["NL"][1].hpm*1.15)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow*1.15))/2)/((covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][0].totalDamage+Math.round(covenants["NL"][1].totalDamage*1.15))/2 + "\n" +
        "NL Crit/Haste: " + (covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NL"][2].hpm + covenants["NL"][3].hpm*1.15)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow*1.15))/2)/((covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][2].totalDamage+Math.round(covenants["NL"][3].totalDamage*1.15))/2 + "\n\nBalanced seems best stats: \n" +
        "NL Balanced: " + (covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NL"][4].hpm + covenants["NL"][5].hpm*1.15)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow*1.15))/2)/((covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][4].totalDamage+Math.round(covenants["NL"][5].totalDamage*1.15))/2 + "\n" +
        "NL Yulon: " + covenants["NL"][6].totalHealing + " (HPM: " + covenants["NL"][6].hpm + "). 4PC Window: " + covenants["NL"][6].total4pcWindow + " (" + Math.round(covenants["NL"][6].total4pcWindow/covenants["NL"][6].totalHealing*1000)/10 + ")%. Damage: " + covenants["NL"][6].totalDamage + "\n" +
        "NL Revival: " + covenants["NL"][7].totalHealing + "\n" +
        "HPS over 8m fight: " + Math.round((covenants["NL"][4].totalHealing/30*5 + covenants["NL"][5].totalHealing*1.15/30*9 + covenants["NL"][6].totalHealing/13*2 + covenants["NL"][7].totalHealing/3*3)/19*100)/100 + " - assuming 2 yulon, 3 revival (using bdb for yulon + revival)");
        // Lowered number of guarenteed BDB 4pc to factor that that would be used on yulon
        
    })

})