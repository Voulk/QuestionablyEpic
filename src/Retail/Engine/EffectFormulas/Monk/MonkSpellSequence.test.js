const { runCastSequence } = require("Retail/Engine/EffectFormulas/Monk/MonkSpellSequence.js");
import Player from "General/Modules/Player/Player";


describe("Test Sequences", () => {
    
    //const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    /*player.activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 445,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    } 

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

    const activeStatsPalegosTest = { // Palegos test stats
        intellect: 2370,
        haste: 750,
        crit: 750,
        mastery: 750,
        versatility: 85,
        stamina: 1000,
        manaMod: 1,
    }
    
    const pretierStats = { // Pretier/leg stats
        intellect: 2070,
        haste: 300,
        crit: 1100,
        mastery: 85,
        versatility: 750,
        stamina: 1000,
        manaMod: 1,
    }

    const player = new Player("Mock", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf");
    player.activeStats = pretierStats;
    const player4pc = new Player("Mock", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf");
    player4pc.activeStats = activeStats3;


    let covenants = {"Base": [], "NL": [], "NL40": [], "NL60": [], "NL90": [], "2NL40": [], "2NL60": [], "2NL90": [], "Night Fae": [], "Venth": [], "VenthPre": [], "NFPre": [], "NLPre": [], "KyrianPre": [], "Kyrian": [], "NF1L": [], "NL1L": [], "Venth1L": [], "Kyrian1L": []} 

    //const NFsequenceOld = ["Faeline Stomp", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Faeline Stomp", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const NLsequenceOld = ["Tiger Palm", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Bonedust Brew", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
    //const baseSequenceOld = ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Thunder Focus Tea", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick", "Chi Burst", "Faeline Stomp"];
  
    // NF gets an extra RSK with enough haste, others could with reset?
    // Need to EF within 10s of using RSK within 4pc, second EF just at end of 4pc
    // FLS pre-4pc are good, past 4pc use to get haste buff
    // ReM just before 4pc extend into second 4pc window
    // 47% chance to have FLS off CD at mentioned cast points.
    //const NFsequence = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Faeline Stomp", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Faeline Stomp", "Refreshing Jade Wind", "Essence Font", "Blackout Kick", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Refreshing Jade Wind", "Tiger Palm", "Faeline Stomp", "Blackout Kick", "Renewing Mist", "Rising Sun Kick", "Refreshing Jade Wind", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Tiger Palm", "Blackout Kick"];
    // 0.8 HPM lost with no reset just before 4pc, not much


    // NF 12.42% haste, others 22.7% haste
    // WoO sequence quickly done
    const NFsequence = ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Faeline Stomp", "Essence Font", "Chi Burst", "Faeline Stomp", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Faeline Stomp", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Blackout Kick", "Faeline Stomp", "Refreshing Jade Wind", "Renewing Mist", "Rising Sun Kick"];
    const NFsequencePreFLH = ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Essence Font", "Faeline Stomp", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Faeline Stomp", "Blackout Kick", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Refreshing Jade Wind", "Rising Sun Kick"];
    const NLsequence = ["Tiger Palm", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Bonedust Brew", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Refreshing Jade Wind", "Essence Font", "Blackout Kick", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Refreshing Jade Wind", "Tiger Palm", "Blackout Kick", "Rising Sun Kick"];
    const baseSequence =  ["Tiger Palm", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Blackout Kick", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick"];
    const kyrianWoOSequence =  ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Weapons of Order", "Essence Font", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Refreshing Jade Wind", "Blackout Kick", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick"];
    
    // Chiji testing
    const kyrianchijibaseSequence =  ["Tiger Palm", "Tiger Palm", "Essence Font", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Blackout Kick", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Blackout Kick"];
    const kyrianChijiSequence =  ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Essence Font", "Invoke Chiji", "Weapons of Order", "Blackout Kick", "Rising Sun Kick", "Blackout Kick", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Essence Font", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Tiger Palm", "Blackout Kick", "Tiger Palm", "Blackout Kick"]
    
    // Found that using throughput boost after 2 envm is more healing for both cov
    //const YulonNF = ["Essence Font", "Faeline Stomp", "Invoke Yulon", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Thunder Focus Tea", "Rising Sun Kick", "Faeline Stomp", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonNF = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Faeline Stomp", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Faeline Stomp", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonNFPre2leg = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Faeline Stomp", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];
    const YulonNL = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Bonedust Brew", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist",  "Chi Burst" ];
    const YulonBase = ["Essence Font", "Invoke Yulon", "Mana Tea", "Enveloping Mist", "Enveloping Mist", "Thunder Focus Tea", "Rising Sun Kick", "Enveloping Mist", "Rising Sun Kick", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Enveloping Mist", "Chi Burst" ];

    // Revival basic test
    // In theory NF should have more EF hots due to FLS but BDB is EF but better
    const RevivalNL = ["Bonedust Brew", "Essence Font", "Revival"]
    const RevivalNF = ["Faeline Stomp", "Essence Font", "Revival"]
    const RevivalKyrian = ["Essence Font", "Weapons of Order", "Revival"]
    const RevivalBase = ["Essence Font", "Revival"]

    // Venth 4pc bonuses
    // Base heal * overheal * clones active avg * env heal count * soom heal count * conduit * vers * crit
    // This is still accurate if you use TFT at start of 4pc window
    const venth4pcfobonuspercast = 450 * 0.5 * 2.33 * ((8 / (1 / 1.21)) + (8 / (1 / 1.21))) * 1.797 * player.getStatMultiplier("CRITVERS", player4pc.activeStats); 
    const venth4pcfobonuspercastatotm = 450 * 0.5 * 1.33 * ((8 / (1 / 1.21)) + (8 / (1 / 1.21))) * 1.797 * player.getStatMultiplier("CRITVERS", player4pc.activeStats); 
    const fallenOrderhpm = (getFOHealing(player) + getLongCloneHealing(player))/1000;
    const fallenOrderhpmShort = getFOHealing(player) / 1000
    const fallenOrderhpm4pc = (getFOHealing(player4pc) + getLongCloneHealing(player4pc) + venth4pcfobonuspercast)/1000;
    const fallenOrderhpmShort4pc = (getFOHealing(player4pc) + venth4pcfobonuspercastatotm) / 1000
*/

    test("Legendaries & Soulbinds", () => {
        expect(true).toEqual(true);
    });
    /*
    test("Legendaries & Soulbinds", () => {
        
        //covenants["Base"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        //covenants["Base"].push(runCastSequence(revivaltest, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        //console.log("Base: " + covenants["Base"][0].totalHealing + " (HPM: " + covenants["Base"][0].hpm + "). 4PC Window: " + covenants["Base"][0].total4pcWindow + " (" + Math.round(covenants["Base"][0].total4pcWindow/covenants["Base"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Base"][0].totalDamage);

        // Kyrian Chiji Test
        covenants["KyrianPre"].push(runCastSequence(kyrianchijibaseSequence, activeStatsPalegosTest, {"DefaultLoadout": false, "soulbind": "Pelagos", "covenant": "Kyrian", "legendaries": ["Invoker's Delight"], "misc": ["2T28", "4T28", "CTA", "Chiji"]}, {}, 12))
        covenants["KyrianPre"].push(runCastSequence(kyrianChijiSequence, activeStatsPalegosTest, {"DefaultLoadout": false, "soulbind": "Pelagos", "covenant": "Kyrian", "legendaries": ["Invoker's Delight"], "misc": ["2T28", "4T28", "CTA", "Chiji"]}, {}))
        covenants["KyrianPre"].push(runCastSequence(RevivalBase, activeStatsPalegosTest, {"DefaultLoadout": false, "soulbind": "Pelagos", "covenant": "Kyrian", "legendaries": ["Invoker's Delight"], "misc": ["2T28", "4T28", "CTA", "Chiji"]}, {}))
        const kyrianprehpm = Math.round((covenants["KyrianPre"][0].hpm*12 + covenants["KyrianPre"][1].hpm*4 + covenants["KyrianPre"][2].hpm*3)/19*100)/100
        const kyrianprehps = Math.round((covenants["KyrianPre"][0].hps*12 + covenants["KyrianPre"][1].hps*4 + covenants["KyrianPre"][2].hps*3)/19*100)/100
        const kyrianpredps = Math.round((covenants["KyrianPre"][0].dps*12 + covenants["KyrianPre"][1].dps*4 + covenants["KyrianPre"][2].dps*3)/19*100)/100
        console.log("Kyrian Chiji Secret Tech: " + covenants["KyrianPre"][0].totalHealing + " (HPM: " + covenants["KyrianPre"][0].hpm + " | HPS: " + covenants["KyrianPre"][0].hps + "). Damage: " + covenants["KyrianPre"][0].totalDamage + " (DPS: " + covenants["KyrianPre"][0].dps + ") \n" +
        "Kyrian Chiji (2m): " + covenants["KyrianPre"][1].totalHealing + " (HPM: " + covenants["KyrianPre"][1].hpm + " | HPS: " + covenants["KyrianPre"][1].hps + "). Damage: " + covenants["KyrianPre"][1].totalDamage + " (DPS: " + covenants["KyrianPre"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["KyrianPre"][2].totalHealing + "\n" +
        "Kyrian - HPS: " + kyrianprehps + " HPM: " + kyrianprehpm + " DPS: " + kyrianpredps + " (4 chiji (Woo pair), 3 revival)" + "\n" +
        "Sequence lengths - base " + covenants["KyrianPre"][0].sequenceLength + " | chiji: " + covenants["KyrianPre"][1].sequenceLength);

        // Yulon's Whisper test
        covenants["Kyrian"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "CTA"]}, {}, 10))
        covenants["Kyrian"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "CTA"]}, {}))
        covenants["Kyrian"].push(runCastSequence(RevivalKyrian, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "CTA"]}, {}))
        covenants["Kyrian"].push(runCastSequence(kyrianWoOSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "CTA"]}, {}))
        const kyrianhpm = Math.round((covenants["Kyrian"][0].hpm*10 + covenants["Kyrian"][1].hpm*2 + covenants["Kyrian"][2].hpm*3 + covenants["Kyrian"][3].hpm*4)/19*100)/100
        const kyrianhps = Math.round((covenants["Kyrian"][0].hps*10 + covenants["Kyrian"][1].hps*2 + covenants["Kyrian"][2].hps*3 + covenants["Kyrian"][3].hps*4)/19*100)/100
        const kyriandps = Math.round((covenants["Kyrian"][0].dps*10 + covenants["Kyrian"][1].dps*2 + covenants["Kyrian"][2].dps*3 + covenants["Kyrian"][3].dps*4)/19*100)/100
        console.log("4pc2leg Yulon's Whisper Kyrian: " + covenants["Kyrian"][0].totalHealing + " (HPM: " + covenants["Kyrian"][0].hpm + " | HPS: " + covenants["Kyrian"][0].hps + "). Damage: " + covenants["Kyrian"][0].totalDamage + " (DPS: " + covenants["Kyrian"][0].dps + ") \n" +
        "Kyrian Yulon: " + covenants["Kyrian"][1].totalHealing + " (HPM: " + covenants["Kyrian"][1].hpm + " | HPS: " + covenants["Kyrian"][1].hps + "). Damage: " + covenants["Kyrian"][1].totalDamage + " (DPS: " + covenants["Kyrian"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["Kyrian"][2].totalHealing + "\n" +
        "Kyrian WoO: " + covenants["Kyrian"][3].totalHealing + " (HPM: " + covenants["Kyrian"][3].hpm + " | HPS: " + covenants["Kyrian"][3].hps + "). Damage: " + covenants["Kyrian"][3].totalDamage + " (DPS: " + covenants["Kyrian"][3].dps + ")\n" +
        "Kyrian - HPS: " + kyrianhps + " HPM: " + kyrianhpm + " DPS: " + kyriandps + " (2 yulon, 3 revival, 4 WoO)");

        // Venth
        covenants["Venth"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28"]}, {}, 14))
        covenants["Venth"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth"].push(runCastSequence(RevivalBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28"]}, {}))
        const venthhpm = Math.round((covenants["Venth"][0].hpm*14 + covenants["Venth"][1].hpm*2 + covenants["Venth"][2].hpm*3 + fallenOrderhpm4pc*4)/22*100)/100
        const venthhps = Math.round(((covenants["Venth"][0].hps*14 + covenants["Venth"][1].hps*2 + covenants["Venth"][2].hps*3)/19 + (venth4pcfobonuspercast + getFOHealing(player4pc) + getLongCloneHealing(player4pc))*4/480)*100)/100
        const venthdps = Math.round((covenants["Venth"][0].dps*14 + covenants["Venth"][1].dps*2 + covenants["Venth"][2].dps*3)/19*100)/100
        console.log("4pc2leg Venth: " + covenants["Venth"][0].totalHealing + " (HPM: " + covenants["Venth"][0].hpm + " | HPS: " + covenants["Venth"][0].hps + "). 4PC Window: " + covenants["Venth"][0].total4pcWindow + " (" + Math.round(covenants["Venth"][0].total4pcWindow/covenants["Venth"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][0].totalDamage + " (DPS: " + covenants["Venth"][0].dps + ")\n" +
        "Venth Yulon: " +covenants["Venth"][1].totalHealing + " (HPM: " + covenants["Venth"][1].hpm + " | HPS: " + covenants["Venth"][1].hps + "). 4PC Window: " + covenants["Venth"][1].total4pcWindow + " (" + Math.round(covenants["Venth"][1].total4pcWindow/covenants["Venth"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][1].totalDamage + " (DPS: " + covenants["Venth"][1].dps + ")\n" +
        "Venth Revival: " + covenants["Venth"][2].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round((getFOHealing(player4pc) + getLongCloneHealing(player4pc) + venth4pcfobonuspercast)*100)/100 + " (+HPS: " + Math.round((venth4pcfobonuspercast + getFOHealing(player4pc) + getLongCloneHealing(player4pc))/24*100)/100 + ")\n" +
        "Venth - HPS: " + venthhps + " HPM: " + venthhpm + " DPS: " + venthdps + " (2 yulon, 3 revival, 4 FO)");

        // NF
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "FLH"]}, {}, 14));
        covenants["Night Fae"].push(runCastSequence(YulonNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        covenants["Night Fae"].push(runCastSequence(RevivalNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        const nfhpm = Math.round((covenants["Night Fae"][0].hpm*14 + covenants["Night Fae"][1].hpm*2 + covenants["Night Fae"][2].hpm*3)/19*100)/100
        const nfhps = Math.round((covenants["Night Fae"][0].hps*14 + covenants["Night Fae"][1].hps*2 + covenants["Night Fae"][2].hps*3)/19*100)/100
        const nfdps = Math.round((covenants["Night Fae"][0].dps*14 + covenants["Night Fae"][1].dps*2 + covenants["Night Fae"][2].dps*3)/19*100)/100
        console.log("4pc2leg Yulon's Whisper Night Fae Crit/vers: " + covenants["Night Fae"][0].totalHealing + " (HPM: " + covenants["Night Fae"][0].hpm + " | HPS: " + covenants["Night Fae"][0].hps + "). 4PC Window: " + covenants["Night Fae"][0].total4pcWindow + " (" + Math.round(covenants["Night Fae"][0].total4pcWindow/covenants["Night Fae"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][0].totalDamage + " (DPS: " + covenants["Night Fae"][0].dps + ")\n" +
        "Night Fae Yulon: " + covenants["Night Fae"][1].totalHealing + " (HPM: " + covenants["Night Fae"][1].hpm + " | HPS: " + covenants["Night Fae"][1].hps + "). 4PC Window: " + covenants["Night Fae"][1].total4pcWindow + " (" + Math.round(covenants["Night Fae"][1].total4pcWindow/covenants["Night Fae"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][1].totalDamage + " (DPS: " + covenants["Night Fae"][1].dps + ")\n" +
        "Night Fae Revival: " + covenants["Night Fae"][2].totalHealing + "\n" +
        "Night Fae - HPS: " + nfhps + " HPM: " + nfhpm + " DPS: " + nfdps + " (2 yulon, 3 revival)");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "FLH"]}, {}, 14));
        covenants["Night Fae"].push(runCastSequence(YulonNF, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        covenants["Night Fae"].push(runCastSequence(RevivalNF, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        const nfhpm2 = Math.round((covenants["Night Fae"][3].hpm*14 + covenants["Night Fae"][4].hpm*2 + covenants["Night Fae"][5].hpm*3)/19*100)/100
        const nfhps2 = Math.round((covenants["Night Fae"][3].hps*14 + covenants["Night Fae"][4].hps*2 + covenants["Night Fae"][5].hps*3)/19*100)/100
        const nfdps2 = Math.round((covenants["Night Fae"][3].dps*14 + covenants["Night Fae"][4].dps*2 + covenants["Night Fae"][5].dps*3)/19*100)/100
        console.log("4pc2leg Yulon's Whisper Night Fae Balanced: " + covenants["Night Fae"][3].totalHealing + " (HPM: " + covenants["Night Fae"][3].hpm + " | HPS: " + covenants["Night Fae"][3].hps + "). 4PC Window: " + covenants["Night Fae"][3].total4pcWindow + " (" + Math.round(covenants["Night Fae"][3].total4pcWindow/covenants["Night Fae"][3].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][3].totalDamage + " (DPS: " + covenants["Night Fae"][3].dps + ")\n" +
        "Night Fae Yulon: " + covenants["Night Fae"][4].totalHealing + " (HPM: " + covenants["Night Fae"][4].hpm + " | HPS: " + covenants["Night Fae"][4].hps + "). 4PC Window: " + covenants["Night Fae"][4].total4pcWindow + " (" + Math.round(covenants["Night Fae"][4].total4pcWindow/covenants["Night Fae"][4].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][4].totalDamage + " (DPS: " + covenants["Night Fae"][4].dps + ")\n" +
        "Night Fae Revival: " + covenants["Night Fae"][5].totalHealing + "\n" +
        "Night Fae - HPS: " + nfhps2 + " HPM: " + nfhpm2 + " DPS: " + nfdps2 + " (2 yulon, 3 revival)");

        // NL   
        // Lowered number of guarenteed BDB casts to factor that that would be used on yulon
        covenants["NL"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}, 9));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}, 9));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}, 9));
        covenants["NL"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}));
        covenants["NL"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BB"]}, {}));
        const nlhpm = Math.round((covenants["NL"][4].hpm*5  + covenants["NL"][5].hpm*9  + covenants["NL"][6].hpm*2  + covenants["NL"][7].hpm*3)/19*100)/100
        const nlhps = Math.round((covenants["NL"][4].hps*5 + covenants["NL"][5].hps*9  + covenants["NL"][6].hps*2  + covenants["NL"][7].hps*3)/19*100)/100
        const nldps = Math.round((covenants["NL"][4].dps*5 + covenants["NL"][5].dps*9  + covenants["NL"][6].dps*2  + covenants["NL"][7].dps*3)/19*100)/100
        
        // Stack % hit - single legendary
        covenants["NL40"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40"]}, {}, 5));
        covenants["NL40"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40"]}, {}, 9));
        covenants["NL40"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40"]}, {}));
        covenants["NL40"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40"]}, {}));
        const nl40hpm = Math.round((covenants["NL40"][0].hpm*5  + covenants["NL40"][1].hpm*9  + covenants["NL40"][2].hpm*2  + covenants["NL40"][3].hpm*3)/19*100)/100
        const nl40hps = Math.round((covenants["NL40"][0].hps*5 + covenants["NL40"][1].hps*9  + covenants["NL40"][2].hps*2  + covenants["NL40"][3].hps*3)/19*100)/100
        const nl40dps = Math.round((covenants["NL40"][0].dps*5 + covenants["NL40"][1].dps*9  + covenants["NL40"][2].dps*2  + covenants["NL40"][3].dps*3)/19*100)/100

        covenants["NL60"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60"]}, {}, 5));
        covenants["NL60"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60"]}, {}, 9));
        covenants["NL60"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60"]}, {}));
        covenants["NL60"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60"]}, {}));
        const NL60hpm = Math.round((covenants["NL60"][0].hpm*5  + covenants["NL60"][1].hpm*9  + covenants["NL60"][2].hpm*2  + covenants["NL60"][3].hpm*3)/19*100)/100
        const NL60hps = Math.round((covenants["NL60"][0].hps*5 + covenants["NL60"][1].hps*9  + covenants["NL60"][2].hps*2  + covenants["NL60"][3].hps*3)/19*100)/100
        const NL60dps = Math.round((covenants["NL60"][0].dps*5 + covenants["NL60"][1].dps*9  + covenants["NL60"][2].dps*2  + covenants["NL60"][3].dps*3)/19*100)/100

        covenants["NL90"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90"]}, {}, 5));
        covenants["NL90"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90"]}, {}, 9));
        covenants["NL90"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90"]}, {}));
        covenants["NL90"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90"]}, {}));
        const NL90hpm = Math.round((covenants["NL90"][0].hpm*5  + covenants["NL90"][1].hpm*9  + covenants["NL90"][2].hpm*2  + covenants["NL90"][3].hpm*3)/19*100)/100
        const NL90hps = Math.round((covenants["NL90"][0].hps*5 + covenants["NL90"][1].hps*9  + covenants["NL90"][2].hps*2  + covenants["NL90"][3].hps*3)/19*100)/100
        const NL90dps = Math.round((covenants["NL90"][0].dps*5 + covenants["NL90"][1].dps*9  + covenants["NL90"][2].dps*2  + covenants["NL90"][3].dps*3)/19*100)/100
        
        // Stack % hit - double legendary
        covenants["2NL40"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}, 5));
        covenants["2NL40"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}, 9));
        covenants["2NL40"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}));
        covenants["2NL40"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}));
        const nl240hpm = Math.round((covenants["2NL40"][0].hpm*5  + covenants["2NL40"][1].hpm*9  + covenants["2NL40"][2].hpm*2  + covenants["2NL40"][3].hpm*3)/19*100)/100
        const nl240hps = Math.round((covenants["2NL40"][0].hps*5 + covenants["2NL40"][1].hps*9  + covenants["2NL40"][2].hps*2  + covenants["2NL40"][3].hps*3)/19*100)/100
        const nl240dps = Math.round((covenants["2NL40"][0].dps*5 + covenants["2NL40"][1].dps*9  + covenants["2NL40"][2].dps*2  + covenants["2NL40"][3].dps*3)/19*100)/100

        covenants["2NL60"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}, 5));
        covenants["2NL60"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}, 9));
        covenants["2NL60"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}));
        covenants["2NL60"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}));
        const NL260hpm = Math.round((covenants["2NL60"][0].hpm*5  + covenants["2NL60"][1].hpm*9  + covenants["2NL60"][2].hpm*2  + covenants["2NL60"][3].hpm*3)/19*100)/100
        const NL260hps = Math.round((covenants["2NL60"][0].hps*5 + covenants["2NL60"][1].hps*9  + covenants["2NL60"][2].hps*2  + covenants["2NL60"][3].hps*3)/19*100)/100
        const NL260dps = Math.round((covenants["2NL60"][0].dps*5 + covenants["2NL60"][1].dps*9  + covenants["2NL60"][2].dps*2  + covenants["2NL60"][3].dps*3)/19*100)/100

        covenants["2NL90"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}, 5));
        covenants["2NL90"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}, 9));
        covenants["2NL90"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}));
        covenants["2NL90"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Yulon's Whisper"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}));
        const NL290hpm = Math.round((covenants["2NL90"][0].hpm*5  + covenants["2NL90"][1].hpm*9  + covenants["2NL90"][2].hpm*2  + covenants["2NL90"][3].hpm*3)/19*100)/100
        const NL290hps = Math.round((covenants["2NL90"][0].hps*5 + covenants["2NL90"][1].hps*9  + covenants["2NL90"][2].hps*2  + covenants["2NL90"][3].hps*3)/19*100)/100
        const NL290dps = Math.round((covenants["2NL90"][0].dps*5 + covenants["2NL90"][1].dps*9  + covenants["2NL90"][2].dps*2  + covenants["2NL90"][3].dps*3)/19*100)/100
        
        // NL output
        // Note burst = 1m CD guarenteed
        console.log("4pc2leg Yulon's Whisper NL Crit/Vers: " + Math.round((covenants["NL"][0].totalHealing + covenants["NL"][1].totalHealing)) + " (HPM: " + Math.round((covenants["NL"][0].hpm + covenants["NL"][1].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][0].hps + covenants["NL"][1].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow))  + " (" + Math.round(((covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow)))/((covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing)))*1000)/10 + ")%. Damage: " + (covenants["NL"][0].totalDamage*1.1+Math.round(covenants["NL"][1].totalDamage)) + " (DPS: " + Math.round((covenants["NL"][0].dps + covenants["NL"][1].dps)/2*100)/100 + ")\n" +
        "4pc2leg NL Crit/Haste: " + Math.round((covenants["NL"][2].totalHealing + covenants["NL"][3].totalHealing)) + " (HPM: " + Math.round((covenants["NL"][2].hpm + covenants["NL"][3].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][2].hps + covenants["NL"][3].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow))  + " (" + Math.round(((covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow))/2)/((covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][2].totalDamage*1.1+Math.round(covenants["NL"][3].totalDamage)) + " (DPS: " + Math.round((covenants["NL"][2].dps + covenants["NL"][3].dps)/2*100)/100 + ")\n\nBalanced seems best stats: \n" +
        "4pc2leg NL Balanced: " + Math.round((covenants["NL"][4].totalHealing + covenants["NL"][5].totalHealing)) + " (HPM: " + Math.round((covenants["NL"][4].hpm + covenants["NL"][5].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][4].hps + covenants["NL"][5].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow))  + " (" + Math.round(((covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow))/2)/((covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][4].totalDamage*1.1+Math.round(covenants["NL"][5].totalDamage)) + " (DPS: " + Math.round((covenants["NL"][4].dps + covenants["NL"][5].dps)/2*100)/100 + ")\n" +
        "NL Yulon: " + covenants["NL"][6].totalHealing + " (HPM: " + covenants["NL"][6].hpm + "). 4PC Window: " + covenants["NL"][6].total4pcWindow + " (" + Math.round(covenants["NL"][6].total4pcWindow/covenants["NL"][6].totalHealing*1000)/10 + ")%. Damage: " + covenants["NL"][6].totalDamage + " (DPS: " + covenants["NL"][6].dps + ")\n" +
        "NL Revival: " + covenants["NL"][7].totalHealing + "\n" +
        "NL - HPS: " + nlhps + " HPM: " + nlhpm + " DPS: " + nldps + " (2 yulon, 3 revival, balanced stats)" + "\n\n" + 
        "NL40 burst vs Venth 4pc: (" + Math.round((covenants["NL40"][0].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL40"][0].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n" +
        "NL60 burst vs Venth 4pc: (" + Math.round((covenants["NL60"][0].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL60"][0].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n" +
        "NL75 burst vs Venth 4pc: (" + Math.round((covenants["NL"][4].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL"][4].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n" +
        "NL90 burst vs Venth 4pc: (" + Math.round((covenants["NL90"][0].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL90"][0].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n\n" +
        "NL40 burst vs Night Fae 4pc: (" + Math.round((covenants["NL40"][0].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL40"][0].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n" +
        "NL60 burst vs Night Fae 4pc: (" + Math.round((covenants["NL60"][0].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL60"][0].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n" +
        "NL75 burst vs Night Fae 4pc: (" + Math.round((covenants["NL"][4].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL"][4].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n" +
        "NL90 burst vs Night Fae 4pc: (" + Math.round((covenants["NL90"][0].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL90"][0].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n\n" +
        "Stack scaling: \n Single legendary: NL40 - HPS: " + nl40hps + " HPM: " + nl40hpm + " DPS: " + nl40dps + "\n" +
        "NL60 - HPS: " + NL60hps + " HPM: " + NL60hpm + " DPS: " + NL60dps + "\n" +
        "NL90 - HPS: " + NL90hps + " HPM: " + NL90hpm + " DPS: " + NL90dps + "\n" +
        "Double legendary: NL40 - HPS: " + nl240hps + " HPM: " + nl240hpm + " DPS: " + nl240dps + "\n" +
        "NL60 - HPS: " + NL260hps + " HPM: " + NL260hpm + " DPS: " + NL260dps + "\n" +
        "NL90 - HPS: " + NL290hps + " HPM: " + NL290hpm + " DPS: " + NL290dps);
/*
        // 0 tier - sequence won't be optimized but gives rough idea
        console.log("==pretier==");
        // Kyrian 
        covenants["KyrianPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 10))
        covenants["KyrianPre"].push(runCastSequence(YulonBase, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["KyrianPre"].push(runCastSequence(RevivalBase, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["KyrianPre"].push(runCastSequence(kyrianWoOSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        const kyrianprehpm = Math.round((covenants["KyrianPre"][0].hpm*10 + covenants["KyrianPre"][1].hpm*2 + covenants["KyrianPre"][2].hpm*3 + covenants["KyrianPre"][3].hpm*4)/19*100)/100
        const kyrianprehps = Math.round((covenants["KyrianPre"][0].hps*10 + covenants["KyrianPre"][1].hps*2 + covenants["KyrianPre"][2].hps*3 + covenants["KyrianPre"][3].hps*4)/19*100)/100
        const kyrianpredps = Math.round((covenants["KyrianPre"][0].dps*10 + covenants["KyrianPre"][1].dps*2 + covenants["KyrianPre"][2].dps*3 + covenants["KyrianPre"][3].dps*4)/19*100)/100
        console.log("PreTier Kyrian: " + covenants["KyrianPre"][0].totalHealing + " (HPM: " + covenants["KyrianPre"][0].hpm + " | HPS: " + covenants["KyrianPre"][0].hps + "). Damage: " + covenants["KyrianPre"][0].totalDamage + " (DPS: " + covenants["KyrianPre"][0].dps + ") \n" +
        "Kyrian Yulon: " + covenants["KyrianPre"][1].totalHealing + " (HPM: " + covenants["KyrianPre"][1].hpm + " | HPS: " + covenants["KyrianPre"][1].hps + "). Damage: " + covenants["KyrianPre"][1].totalDamage + " (DPS: " + covenants["KyrianPre"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["KyrianPre"][2].totalHealing + "\n" +
        "Kyrian WoO: " + covenants["KyrianPre"][3].totalHealing + " (HPM: " + covenants["KyrianPre"][3].hpm + " | HPS: " + covenants["KyrianPre"][3].hps + "). Damage: " + covenants["KyrianPre"][3].totalDamage + " (DPS: " + covenants["KyrianPre"][3].dps + ")" + "\n" +
        "Kyrian - HPS: " + kyrianprehps + " HPM: " + kyrianprehpm + " DPS: " + kyrianpredps + " (2 yulon, 3 revival, 4 WoO)");

        // Venth - SiT and AtotM
        covenants["VenthPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": []}, {}, 14))
        covenants["VenthPre"].push(runCastSequence(YulonBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(RevivalBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 14))
        covenants["VenthPre"].push(runCastSequence(YulonBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(RevivalBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        
        
        const venthprehpm = Math.round((covenants["VenthPre"][0].hpm*14 + covenants["VenthPre"][1].hpm*2 + covenants["VenthPre"][2].hpm*3 + fallenOrderhpm * 4)/23*100)/100
        const venthprehps = Math.round(((covenants["VenthPre"][0].hps*14 + covenants["VenthPre"][1].hps*2 + covenants["VenthPre"][2].hps*3)/19 + (getFOHealing(player) + getLongCloneHealing(player))/24*4/480)*100)/100
        const venthpredps = Math.round((covenants["VenthPre"][0].dps*14 + covenants["VenthPre"][1].dps*2 + covenants["VenthPre"][2].dps*3)/19*100)/100
        
        const venthpreatotmhpm = Math.round((covenants["VenthPre"][3].hpm*14 + covenants["VenthPre"][4].hpm*2 + covenants["VenthPre"][5].hpm*3 + fallenOrderhpmShort * 3)/22*100)/100
        const venthpreatotmhps = Math.round(((covenants["VenthPre"][3].hps*14 + covenants["VenthPre"][4].hps*2 + covenants["VenthPre"][5].hps*3)/19 + (getFOHealing(player))/24*3/480)*100)/100
        const venthpreatotmdps = Math.round((covenants["VenthPre"][3].dps*14 + covenants["VenthPre"][4].dps*2 + covenants["VenthPre"][5].dps*3)/19*100)/100
        console.log("PreTier Venth (SiT): " + covenants["VenthPre"][0].totalHealing + " (HPM : " + covenants["VenthPre"][0].hpm + " | HPS: " + covenants["VenthPre"][0].hps + "). Damage: " + covenants["VenthPre"][0].totalDamage + " (DPS: " + covenants["VenthPre"][0].dps + ")\n" +
        "Venth Per-Yulon: " + covenants["VenthPre"][1].totalHealing + " (HPM: " + covenants["VenthPre"][1].hpm + ")\n" +
        "Venth Per-Revival: " + covenants["VenthPre"][2].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round(getFOHealing(player) + getLongCloneHealing(player)) + " (+HPS: " + Math.round((getFOHealing(player) + getLongCloneHealing(player))/24*100)/100 + ")\n\n" +
        "PreTier Venth (AtotM): " + covenants["VenthPre"][3].totalHealing + " (HPM: " + covenants["VenthPre"][3].hpm + " | HPS: " + covenants["VenthPre"][3].hps + "). Damage: " + covenants["VenthPre"][3].totalDamage + " (DPS: " + covenants["VenthPre"][3].dps + ")\n" +
        "Venth Per-Yulon: " + covenants["VenthPre"][4].totalHealing + " (HPM: " + covenants["VenthPre"][4].hpm + ")\n" +
        "Venth Per-Revival: " + covenants["VenthPre"][5].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round(getFOHealing(player)) + " (+HPS: " + Math.round(getFOHealing(player)/24*100)/100 + ")\n\n" +
        "Venth SiT - HPS: " + venthprehps + " HPM: " + venthprehpm + " DPS: " + venthpredps + " (2 yulon, 3 revival, 4 FO)\n" +
        "Venth AtotM - HPS: " + venthpreatotmhps + " HPM: " + venthpreatotmhpm + " DPS: " + venthpreatotmdps + " (2 yulon, 3 revival, 3 FO)");

        // NF
        covenants["NFPre"].push(runCastSequence(NFsequencePreFLH, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 14));
        covenants["NFPre"].push(runCastSequence(YulonNFPre2leg, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NFPre"].push(runCastSequence(RevivalNF, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        const nfprehpm = Math.round((covenants["NFPre"][0].hpm*14 + covenants["NFPre"][1].hpm*2 + covenants["NFPre"][2].hpm*3)/19*100)/100
        const nfprehps = Math.round((covenants["NFPre"][0].hps*14 + covenants["NFPre"][1].hps*2 + covenants["NFPre"][2].hps*3)/19*100)/100
        const nfpredps = Math.round((covenants["NFPre"][0].dps*14 + covenants["NFPre"][1].dps*2 + covenants["NFPre"][2].dps*3)/19*100)/100
        console.log("PreTier NF: " + covenants["NFPre"][0].totalHealing + " (HPM: " + covenants["NFPre"][0].hpm + " | HPS: " + covenants["NFPre"][0].hps + "). Damage: " + covenants["NFPre"][0].totalDamage + " (DPS: " + covenants["NFPre"][0].dps + ") \n" +
        "NF Yulon: " + covenants["NFPre"][1].totalHealing + " (HPM: " + covenants["NFPre"][1].hpm + " | HPS: " + covenants["NFPre"][1].hps + "). Damage: " + covenants["NFPre"][1].totalDamage + " (DPS: " + covenants["NFPre"][1].dps + ") \n" +
        "NF Revival: " + covenants["NFPre"][2].totalHealing + "\n" +
        "NF - HPS: " + nfprehps + " HPM: " + nfprehpm + " DPS: " + nfpredps + " (2 yulon, 3 revival)");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        // NL
        covenants["NLPre"].push(runCastSequence(NLsequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 5));
        covenants["NLPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 9));
        covenants["NLPre"].push(runCastSequence(YulonNL, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(RevivalNL, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        const nlprehpm = Math.round((covenants["NLPre"][0].hpm*5 + covenants["NLPre"][1].hpm*9 + covenants["NLPre"][2].hpm*2 + covenants["NLPre"][3].hpm*3)/19*100)/100
        const nlprehps = Math.round((covenants["NLPre"][0].hps*5 + covenants["NLPre"][1].hps*9 + covenants["NLPre"][2].hps*2 + covenants["NLPre"][3].hps*3)/19*100)/100
        const nlpredps = Math.round((covenants["NLPre"][0].dps*5 + covenants["NLPre"][1].dps*9 + covenants["NLPre"][2].dps*2 + covenants["NLPre"][3].dps*3)/19*100)/100
        console.log("PreTier NL: " + Math.round((covenants["NLPre"][0].totalHealing + covenants["NLPre"][1].totalHealing)/2) + " (HPM: " + Math.round((covenants["NLPre"][0].hpm + covenants["NLPre"][1].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NLPre"][0].hps + covenants["NLPre"][1].hps)/2*100)/100 + "). Damage: " + Math.round((covenants["NLPre"][0].totalDamage + covenants["NLPre"][1].totalDamage)/2*100)/100 + " (DPS: " + Math.round((covenants["NLPre"][0].dps + covenants["NLPre"][1].dps)/2*100)/100 + ")\n" +
        "NL Yulon: " + covenants["NLPre"][2].totalHealing + " (HPM: " + covenants["NLPre"][2].hpm + " | HPS: " + covenants["NLPre"][2].hps + "). Damage: " + covenants["NLPre"][2].totalDamage + " (DPS: " + covenants["NLPre"][2].dps + ")\n" +
        "NL Revival: " + covenants["NLPre"][3].totalHealing + "\n" +
        "NL - HPS: " + nlprehps + " HPM: " + nlprehpm + " DPS: " + nlpredps + " (2 yulon, 3 revival, balanced stats)");
    
        // 4pc, 1 legendary
        console.log("==4pc single legendary==");
        // Kyrian
        covenants["Kyrian1L"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 10))
        covenants["Kyrian1L"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Kyrian1L"].push(runCastSequence(RevivalKyrian, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Kyrian1L"].push(runCastSequence(kyrianWoOSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        const kyrian1lhpm = Math.round((covenants["Kyrian1L"][0].hpm*10 + covenants["Kyrian1L"][1].hpm*2 + covenants["Kyrian1L"][2].hpm*3 + covenants["Kyrian1L"][3].hpm*4)/19*100)/100
        const kyrian1lhps = Math.round((covenants["Kyrian1L"][0].hps*10 + covenants["Kyrian1L"][1].hps*2 + covenants["Kyrian1L"][2].hps*3 + covenants["Kyrian1L"][3].hps*4)/19*100)/100
        const kyrian1ldps = Math.round((covenants["Kyrian1L"][0].dps*10 + covenants["Kyrian1L"][1].dps*2 + covenants["Kyrian1L"][2].dps*3 + covenants["Kyrian1L"][3].dps*4)/19*100)/100
        console.log("4pc Kyrian: " + covenants["Kyrian1L"][0].totalHealing + " (HPM: " + covenants["Kyrian1L"][0].hpm + " | HPS: " + covenants["Kyrian1L"][0].hps + "). Damage: " + covenants["Kyrian1L"][0].totalDamage + " (DPS: " + covenants["Kyrian1L"][0].dps + ") \n" +
        "Kyrian Yulon: " + covenants["Kyrian1L"][1].totalHealing + " (HPM: " + covenants["Kyrian1L"][1].hpm + " | HPS: " + covenants["Kyrian1L"][1].hps + "). Damage: " + covenants["Kyrian1L"][1].totalDamage + " (DPS: " + covenants["Kyrian1L"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["Kyrian1L"][2].totalHealing + "\n" +
        "Kyrian WoO: " + covenants["Kyrian1L"][3].totalHealing + " (HPM: " + covenants["Kyrian1L"][3].hpm + " | HPS: " + covenants["Kyrian1L"][3].hps + "). Damage: " + covenants["Kyrian1L"][3].totalDamage + " (DPS: " + covenants["Kyrian1L"][3].dps + ")\n" +
        "Kyrian - HPS: " + kyrian1lhps + " HPM: " + kyrian1lhpm + " DPS: " + kyrian1ldps + " (2 yulon, 3 revival, 4 WoO)");

        // Venth
        covenants["Venth1L"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": ["2T28", "4T28"]}, {}, 14))
        covenants["Venth1L"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth1L"].push(runCastSequence(RevivalBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth1L"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 14))
        covenants["Venth1L"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth1L"].push(runCastSequence(RevivalBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        const venth1lhpm = Math.round((covenants["Venth1L"][0].hpm*14 + covenants["Venth1L"][1].hpm*2 + covenants["Venth1L"][2].hpm*3 + fallenOrderhpm4pc*4)/22*100)/100
        const venth1lhps = Math.round(((covenants["Venth1L"][0].hps*14 + covenants["Venth1L"][1].hps*2 + covenants["Venth1L"][2].hps*3)/19 + (venth4pcfobonuspercast + getFOHealing(player4pc) + getLongCloneHealing(player4pc))*4/480)*100)/100
        const venth1ldps = Math.round((covenants["Venth1L"][0].dps*14 + covenants["Venth1L"][1].dps*2 + covenants["Venth1L"][2].dps*3)/19*100)/100
        const venth1latotmhpm = Math.round((covenants["Venth1L"][3].hpm*14 + covenants["Venth1L"][4].hpm*2 + covenants["Venth1L"][5].hpm*3 + fallenOrderhpmShort4pc*3)/22*100)/100
        const venth1latotmhps = Math.round(((covenants["Venth1L"][3].hps*14 + covenants["Venth1L"][4].hps*2 + covenants["Venth1L"][5].hps*3)/19 + (venth4pcfobonuspercastatotm + getFOHealing(player4pc))/24*3/480)*100)/100
        const venth1latotmdps = Math.round((covenants["Venth1L"][3].dps*14 + covenants["Venth1L"][4].dps*2 + covenants["Venth1L"][5].dps*3)/19*100)/100
        console.log("4pc Venth (SiT): " + covenants["Venth1L"][0].totalHealing + " (HPM: " + covenants["Venth1L"][0].hpm + " | HPS: " + covenants["Venth1L"][0].hps + "). 4PC Window: " + covenants["Venth1L"][0].total4pcWindow + " (" + Math.round(covenants["Venth1L"][0].total4pcWindow/covenants["Venth1L"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth1L"][0].totalDamage + " (DPS: " + covenants["Venth1L"][0].dps + ")\n" +
        "Venth Yulon: " + covenants["Venth1L"][1].totalHealing + " (HPM: " + covenants["Venth1L"][1].hpm + " | HPS: " + covenants["Venth1L"][1].hps + "). 4PC Window: " + covenants["Venth1L"][1].total4pcWindow + " (" + Math.round(covenants["Venth1L"][1].total4pcWindow/covenants["Venth1L"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth1L"][1].totalDamage + " (DPS: " + covenants["Venth1L"][1].dps + ")\n" +
        "Venth Revival: " + covenants["Venth1L"][2].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round((getFOHealing(player4pc) + venth4pcfobonuspercast)*100)/100 + " (+HPS: " + Math.round((venth4pcfobonuspercast + getFOHealing(player4pc) + getLongCloneHealing(player4pc))/24*100)/100 + ")\n" +
        "4pc Venth (AtotM): " + covenants["Venth1L"][3].totalHealing + " (HPM: " + covenants["Venth1L"][3].hpm + " | HPS: " + covenants["Venth1L"][3].hps + "). 4PC Window: " + covenants["Venth1L"][3].total4pcWindow + " (" + Math.round(covenants["Venth1L"][3].total4pcWindow/covenants["Venth1L"][3].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth1L"][3].totalDamage + " (DPS: " + covenants["Venth1L"][3].dps + ")\n" +
        "Venth Yulon: " + covenants["Venth1L"][4].totalHealing + " (HPM: " + covenants["Venth1L"][4].hpm + " | HPS: " + covenants["Venth1L"][4].hps + "). 4PC Window: " + covenants["Venth1L"][4].total4pcWindow + " (" + Math.round(covenants["Venth1L"][4].total4pcWindow/covenants["Venth1L"][4].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth1L"][4].totalDamage + " (DPS: " + covenants["Venth1L"][4].dps + ")\n" +
        "Venth Revival: " + covenants["Venth1L"][5].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round((getFOHealing(player4pc) + venth4pcfobonuspercastatotm)*100)/100 + " (+HPS: " + Math.round((venth4pcfobonuspercastatotm + getFOHealing(player4pc))/24*100)/100 + ")\n" +
        "Venth SiT - HPS: " + venth1lhps + " HPM: " + venth1lhpm + " DPS: " + venth1ldps + " (2 yulon, 3 revival, 4 FO) \n" +
        "Venth AtoTM - HPS: " + venth1latotmhps + " HPM: " + venth1latotmhpm + " DPS: " + venth1latotmdps + " (2 yulon, 3 revival, 3 FO)");

        // NF
        covenants["NF1L"].push(runCastSequence(NFsequencePreFLH, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 14));
        covenants["NF1L"].push(runCastSequence(YulonNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NF1L"].push(runCastSequence(RevivalNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        const nf1lhpm = Math.round((covenants["NF1L"][0].hpm*14 + covenants["NF1L"][1].hpm*2 + covenants["NF1L"][2].hpm*3)/19*100)/100
        const nf1lhps = Math.round((covenants["NF1L"][0].hps*14 + covenants["NF1L"][1].hps*2 + covenants["NF1L"][2].hps*3)/19*100)/100
        const nf1ldps = Math.round((covenants["NF1L"][0].dps*14 + covenants["NF1L"][1].dps*2 + covenants["NF1L"][2].dps*3)/19*100)/100
        console.log("4pc Night Fae Crit/vers: " + covenants["NF1L"][0].totalHealing + " (HPM: " + covenants["NF1L"][0].hpm + " | HPS: " + covenants["NF1L"][0].hps + "). 4PC Window: " + covenants["NF1L"][0].total4pcWindow + " (" + Math.round(covenants["NF1L"][0].total4pcWindow/covenants["NF1L"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["NF1L"][0].totalDamage + " (DPS: " + covenants["NF1L"][0].dps + ")\n" +
        "Night Fae Yulon: " +covenants["NF1L"][1].totalHealing + " (HPM: " + covenants["NF1L"][1].hpm + " | HPS: " + covenants["NF1L"][1].hps + "). 4PC Window: " + covenants["NF1L"][1].total4pcWindow + " (" + Math.round(covenants["NF1L"][1].total4pcWindow/covenants["NF1L"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["NF1L"][1].totalDamage + " (DPS: " + covenants["NF1L"][1].dps + ")\n" +
        "Night Fae Revival: " + covenants["NF1L"][2].totalHealing + "\n" +
        "Night Fae - HPS: " + nf1lhps + " HPM: " + nf1lhpm + " DPS: " + nf1ldps + " (2 yulon, 3 revival)");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        covenants["NF1L"].push(runCastSequence(NFsequencePreFLH, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 14));
        covenants["NF1L"].push(runCastSequence(YulonNF, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NF1L"].push(runCastSequence(RevivalNF, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        const nf1lhpm2 = Math.round((covenants["NF1L"][3].hpm*14 + covenants["NF1L"][4].hpm*2 + covenants["NF1L"][5].hpm*3)/19*100)/100
        const nf1lhps2 = Math.round((covenants["NF1L"][3].hps*14 + covenants["NF1L"][4].hps*2 + covenants["NF1L"][5].hps*3)/19*100)/100
        const nf1ldps2 = Math.round((covenants["NF1L"][3].dps*14 + covenants["NF1L"][4].dps*2 + covenants["NF1L"][5].dps*3)/19*100)/100
        console.log("4pc Night Fae Balanced: " + covenants["NF1L"][3].totalHealing + " (HPM: " + covenants["NF1L"][3].hpm + " | HPS: " + covenants["NF1L"][3].hps + "). 4PC Window: " + covenants["NF1L"][3].total4pcWindow + " (" + Math.round(covenants["NF1L"][3].total4pcWindow/covenants["NF1L"][3].totalHealing*1000)/10 + ")%. Damage: " + covenants["NF1L"][3].totalDamage + " (DPS: " + covenants["NF1L"][3].dps + ")\n" +
        "Night Fae Yulon: " +covenants["NF1L"][4].totalHealing + " (HPM: " + covenants["NF1L"][4].hpm + " | HPS: " + covenants["NF1L"][4].hps + "). 4PC Window: " + covenants["NF1L"][4].total4pcWindow + " (" + Math.round(covenants["NF1L"][4].total4pcWindow/covenants["NF1L"][4].totalHealing*1000)/10 + ")%. Damage: " + covenants["NF1L"][4].totalDamage + " (DPS: " + covenants["NF1L"][4].dps + ")\n" +
        "Night Fae Revival: " + covenants["NF1L"][5].totalHealing + "\n" +
        "Night Fae - HPS: " + nf1lhps2 + " HPM: " + nf1lhpm2 + " DPS: " + nf1ldps2 + " (2 yulon, 3 revival)");

        // NL   
        // Lowered number of guarenteed BDB casts to factor that that would be used on yulon
        covenants["NL1L"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 5));
        covenants["NL1L"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 9));
        covenants["NL1L"].push(runCastSequence(NLsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 5));
        covenants["NL1L"].push(runCastSequence(baseSequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 9));
        covenants["NL1L"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 5));
        covenants["NL1L"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 9));
        covenants["NL1L"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL1L"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        const nl1lhpm = Math.round((covenants["NL1L"][4].hpm*5 + covenants["NL1L"][5].hpm*9 + covenants["NL1L"][6].hpm*2 + covenants["NL1L"][7].hpm*3)/19*100)/100
        const nl1lhps = Math.round((covenants["NL1L"][4].hps*5 + covenants["NL1L"][5].hps*9 + covenants["NL1L"][6].hps*2 + covenants["NL1L"][7].hps*3)/19*100)/100
        const nl1ldps = Math.round((covenants["NL1L"][4].dps*5 + covenants["NL1L"][5].dps*9 + covenants["NL1L"][6].dps*2 + covenants["NL1L"][7].dps*3)/19*100)/100
        console.log("4pc NL Crit/Vers: " + Math.round((covenants["NL1L"][0].totalHealing + covenants["NL1L"][1].totalHealing))/2 + " (HPM: " + Math.round((covenants["NL1L"][0].hpm + covenants["NL1L"][1].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL1L"][0].hps + covenants["NL1L"][1].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL1L"][0].total4pcWindow+Math.round(covenants["NL1L"][1].total4pcWindow))/2  + " (" + Math.round(((covenants["NL1L"][0].total4pcWindow+Math.round(covenants["NL1L"][1].total4pcWindow))/2)/((covenants["NL1L"][0].totalHealing + Math.round(covenants["NL1L"][1].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL1L"][0].totalDamage*1.1+Math.round(covenants["NL1L"][1].totalDamage))/2 + " (DPS: " + Math.round((covenants["NL1L"][0].dps + covenants["NL1L"][1].dps)/2*100)/100 + ")\n" +
        "NL Crit/Haste: " + Math.round((covenants["NL1L"][2].totalHealing + covenants["NL1L"][3].totalHealing))/2 + " (HPM: " + Math.round((covenants["NL1L"][2].hpm + covenants["NL1L"][3].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL1L"][2].hps + covenants["NL1L"][3].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL1L"][2].total4pcWindow+Math.round(covenants["NL1L"][3].total4pcWindow))/2  + " (" + Math.round(((covenants["NL1L"][2].total4pcWindow+Math.round(covenants["NL1L"][3].total4pcWindow))/2)/((covenants["NL1L"][2].totalHealing + Math.round(covenants["NL1L"][3].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL1L"][2].totalDamage*1.1+Math.round(covenants["NL1L"][3].totalDamage))/2 + " (DPS: " + Math.round((covenants["NL1L"][2].dps + covenants["NL1L"][3].dps)/2*100)/100 + ")\n\nBalanced seems best stats: \n" +
        "NL Balanced: " + Math.round((covenants["NL1L"][4].totalHealing + covenants["NL1L"][5].totalHealing))/2 + " (HPM: " + Math.round((covenants["NL1L"][4].hpm + covenants["NL1L"][5].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL1L"][4].hps + covenants["NL1L"][5].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL1L"][4].total4pcWindow+Math.round(covenants["NL1L"][5].total4pcWindow))/2  + " (" + Math.round(((covenants["NL1L"][4].total4pcWindow+Math.round(covenants["NL1L"][5].total4pcWindow))/2)/((covenants["NL1L"][4].totalHealing + Math.round(covenants["NL1L"][5].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL1L"][4].totalDamage*1.1+Math.round(covenants["NL1L"][5].totalDamage))/2 + " (DPS: " + Math.round((covenants["NL1L"][4].dps + covenants["NL1L"][5].dps)/2*100)/100 + ")\n" +
        "NL Yulon: " + covenants["NL1L"][6].totalHealing + " (HPM: " + covenants["NL1L"][6].hpm + "). 4PC Window: " + covenants["NL1L"][6].total4pcWindow + " (" + Math.round(covenants["NL1L"][6].total4pcWindow/covenants["NL1L"][6].totalHealing*1000)/10 + ")%. Damage: " + covenants["NL1L"][6].totalDamage + " (DPS: " + covenants["NL1L"][6].dps + ")\n" +
        "NL Revival: " + covenants["NL1L"][7].totalHealing + "\n" +
        "NL - HPS: " + nl1lhps + " HPM: " + nl1lhpm + " DPS: " + nl1ldps + " (2 yulon, 3 revival, balanced stats)");

        // 4pc, 2 legendary
        console.log("==4pc double legendary==");
        // Kyrian
        covenants["Kyrian"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "CTA"]}, {}, 10))
        covenants["Kyrian"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "CTA"]}, {}))
        covenants["Kyrian"].push(runCastSequence(RevivalKyrian, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "CTA"]}, {}))
        covenants["Kyrian"].push(runCastSequence(kyrianWoOSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "CTA"]}, {}))
        const kyrianhpm = Math.round((covenants["Kyrian"][0].hpm*10 + covenants["Kyrian"][1].hpm*2 + covenants["Kyrian"][2].hpm*3 + covenants["Kyrian"][3].hpm*4)/19*100)/100
        const kyrianhps = Math.round((covenants["Kyrian"][0].hps*10 + covenants["Kyrian"][1].hps*2 + covenants["Kyrian"][2].hps*3 + covenants["Kyrian"][3].hps*4)/19*100)/100
        const kyriandps = Math.round((covenants["Kyrian"][0].dps*10 + covenants["Kyrian"][1].dps*2 + covenants["Kyrian"][2].dps*3 + covenants["Kyrian"][3].dps*4)/19*100)/100
        console.log("4pc2leg Kyrian: " + covenants["Kyrian"][0].totalHealing + " (HPM: " + covenants["Kyrian"][0].hpm + " | HPS: " + covenants["Kyrian"][0].hps + "). Damage: " + covenants["Kyrian"][0].totalDamage + " (DPS: " + covenants["Kyrian"][0].dps + ") \n" +
        "Kyrian Yulon: " + covenants["Kyrian"][1].totalHealing + " (HPM: " + covenants["Kyrian"][1].hpm + " | HPS: " + covenants["Kyrian"][1].hps + "). Damage: " + covenants["Kyrian"][1].totalDamage + " (DPS: " + covenants["Kyrian"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["Kyrian"][2].totalHealing + "\n" +
        "Kyrian WoO: " + covenants["Kyrian"][3].totalHealing + " (HPM: " + covenants["Kyrian"][3].hpm + " | HPS: " + covenants["Kyrian"][3].hps + "). Damage: " + covenants["Kyrian"][3].totalDamage + " (DPS: " + covenants["Kyrian"][3].dps + ")\n" +
        "Kyrian - HPS: " + kyrianhps + " HPM: " + kyrianhpm + " DPS: " + kyriandps + " (2 yulon, 3 revival, 4 WoO)");

        // Venth
        covenants["Venth"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 14))
        covenants["Venth"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth"].push(runCastSequence(RevivalBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        const venthhpm = Math.round((covenants["Venth"][0].hpm*14 + covenants["Venth"][1].hpm*2 + covenants["Venth"][2].hpm*3 + fallenOrderhpm4pc*4)/22*100)/100
        const venthhps = Math.round(((covenants["Venth"][0].hps*14 + covenants["Venth"][1].hps*2 + covenants["Venth"][2].hps*3)/19 + (venth4pcfobonuspercast + getFOHealing(player4pc) + getLongCloneHealing(player4pc))*4/480)*100)/100
        const venthdps = Math.round((covenants["Venth"][0].dps*14 + covenants["Venth"][1].dps*2 + covenants["Venth"][2].dps*3)/19*100)/100
        console.log("4pc2leg Venth: " + covenants["Venth"][0].totalHealing + " (HPM: " + covenants["Venth"][0].hpm + " | HPS: " + covenants["Venth"][0].hps + "). 4PC Window: " + covenants["Venth"][0].total4pcWindow + " (" + Math.round(covenants["Venth"][0].total4pcWindow/covenants["Venth"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][0].totalDamage + " (DPS: " + covenants["Venth"][0].dps + ")\n" +
        "Venth Yulon: " +covenants["Venth"][1].totalHealing + " (HPM: " + covenants["Venth"][1].hpm + " | HPS: " + covenants["Venth"][1].hps + "). 4PC Window: " + covenants["Venth"][1].total4pcWindow + " (" + Math.round(covenants["Venth"][1].total4pcWindow/covenants["Venth"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][1].totalDamage + " (DPS: " + covenants["Venth"][1].dps + ")\n" +
        "Venth Revival: " + covenants["Venth"][2].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round((getFOHealing(player4pc) + getLongCloneHealing(player4pc) + venth4pcfobonuspercast)*100)/100 + " (+HPS: " + Math.round((venth4pcfobonuspercast + getFOHealing(player4pc) + getLongCloneHealing(player4pc))/24*100)/100 + ")\n" +
        "Venth - HPS: " + venthhps + " HPM: " + venthhpm + " DPS: " + venthdps + " (2 yulon, 3 revival, 4 FO)");

        // NF
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "FLH"]}, {}, 14));
        covenants["Night Fae"].push(runCastSequence(YulonNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        covenants["Night Fae"].push(runCastSequence(RevivalNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        const nfhpm = Math.round((covenants["Night Fae"][0].hpm*14 + covenants["Night Fae"][1].hpm*2 + covenants["Night Fae"][2].hpm*3)/19*100)/100
        const nfhps = Math.round((covenants["Night Fae"][0].hps*14 + covenants["Night Fae"][1].hps*2 + covenants["Night Fae"][2].hps*3)/19*100)/100
        const nfdps = Math.round((covenants["Night Fae"][0].dps*14 + covenants["Night Fae"][1].dps*2 + covenants["Night Fae"][2].dps*3)/19*100)/100
        console.log("4pc2leg Night Fae Crit/vers: " + covenants["Night Fae"][0].totalHealing + " (HPM: " + covenants["Night Fae"][0].hpm + " | HPS: " + covenants["Night Fae"][0].hps + "). 4PC Window: " + covenants["Night Fae"][0].total4pcWindow + " (" + Math.round(covenants["Night Fae"][0].total4pcWindow/covenants["Night Fae"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][0].totalDamage + " (DPS: " + covenants["Night Fae"][0].dps + ")\n" +
        "Night Fae Yulon: " + covenants["Night Fae"][1].totalHealing + " (HPM: " + covenants["Night Fae"][1].hpm + " | HPS: " + covenants["Night Fae"][1].hps + "). 4PC Window: " + covenants["Night Fae"][1].total4pcWindow + " (" + Math.round(covenants["Night Fae"][1].total4pcWindow/covenants["Night Fae"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][1].totalDamage + " (DPS: " + covenants["Night Fae"][1].dps + ")\n" +
        "Night Fae Revival: " + covenants["Night Fae"][2].totalHealing + "\n" +
        "Night Fae - HPS: " + nfhps + " HPM: " + nfhpm + " DPS: " + nfdps + " (2 yulon, 3 revival)");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "FLH"]}, {}, 14));
        covenants["Night Fae"].push(runCastSequence(YulonNF, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        covenants["Night Fae"].push(runCastSequence(RevivalNF, activeStats3, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "FLH"]}, {}));
        const nfhpm2 = Math.round((covenants["Night Fae"][3].hpm*14 + covenants["Night Fae"][4].hpm*2 + covenants["Night Fae"][5].hpm*3)/19*100)/100
        const nfhps2 = Math.round((covenants["Night Fae"][3].hps*14 + covenants["Night Fae"][4].hps*2 + covenants["Night Fae"][5].hps*3)/19*100)/100
        const nfdps2 = Math.round((covenants["Night Fae"][3].dps*14 + covenants["Night Fae"][4].dps*2 + covenants["Night Fae"][5].dps*3)/19*100)/100
        console.log("4pc2leg Night Fae Balanced: " + covenants["Night Fae"][3].totalHealing + " (HPM: " + covenants["Night Fae"][3].hpm + " | HPS: " + covenants["Night Fae"][3].hps + "). 4PC Window: " + covenants["Night Fae"][3].total4pcWindow + " (" + Math.round(covenants["Night Fae"][3].total4pcWindow/covenants["Night Fae"][3].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][3].totalDamage + " (DPS: " + covenants["Night Fae"][3].dps + ")\n" +
        "Night Fae Yulon: " + covenants["Night Fae"][4].totalHealing + " (HPM: " + covenants["Night Fae"][4].hpm + " | HPS: " + covenants["Night Fae"][4].hps + "). 4PC Window: " + covenants["Night Fae"][4].total4pcWindow + " (" + Math.round(covenants["Night Fae"][4].total4pcWindow/covenants["Night Fae"][4].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][4].totalDamage + " (DPS: " + covenants["Night Fae"][4].dps + ")\n" +
        "Night Fae Revival: " + covenants["Night Fae"][5].totalHealing + "\n" +
        "Night Fae - HPS: " + nfhps2 + " HPM: " + nfhpm2 + " DPS: " + nfdps2 + " (2 yulon, 3 revival)");

        // NL   
        // Lowered number of guarenteed BDB casts to factor that that would be used on yulon
        covenants["NL"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}, 9));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}, 9));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}, 9));
        covenants["NL"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}));
        covenants["NL"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BB"]}, {}));
        const nlhpm = Math.round((covenants["NL"][4].hpm*5  + covenants["NL"][5].hpm*9  + covenants["NL"][6].hpm*2  + covenants["NL"][7].hpm*3)/19*100)/100
        const nlhps = Math.round((covenants["NL"][4].hps*5 + covenants["NL"][5].hps*9  + covenants["NL"][6].hps*2  + covenants["NL"][7].hps*3)/19*100)/100
        const nldps = Math.round((covenants["NL"][4].dps*5 + covenants["NL"][5].dps*9  + covenants["NL"][6].dps*2  + covenants["NL"][7].dps*3)/19*100)/100
        
        // Stack % hit - single legendary
        covenants["NL40"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40"]}, {}, 5));
        covenants["NL40"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40"]}, {}, 9));
        covenants["NL40"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40"]}, {}));
        covenants["NL40"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40"]}, {}));
        const nl40hpm = Math.round((covenants["NL40"][0].hpm*5  + covenants["NL40"][1].hpm*9  + covenants["NL40"][2].hpm*2  + covenants["NL40"][3].hpm*3)/19*100)/100
        const nl40hps = Math.round((covenants["NL40"][0].hps*5 + covenants["NL40"][1].hps*9  + covenants["NL40"][2].hps*2  + covenants["NL40"][3].hps*3)/19*100)/100
        const nl40dps = Math.round((covenants["NL40"][0].dps*5 + covenants["NL40"][1].dps*9  + covenants["NL40"][2].dps*2  + covenants["NL40"][3].dps*3)/19*100)/100

        covenants["NL60"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60"]}, {}, 5));
        covenants["NL60"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60"]}, {}, 9));
        covenants["NL60"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60"]}, {}));
        covenants["NL60"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60"]}, {}));
        const NL60hpm = Math.round((covenants["NL60"][0].hpm*5  + covenants["NL60"][1].hpm*9  + covenants["NL60"][2].hpm*2  + covenants["NL60"][3].hpm*3)/19*100)/100
        const NL60hps = Math.round((covenants["NL60"][0].hps*5 + covenants["NL60"][1].hps*9  + covenants["NL60"][2].hps*2  + covenants["NL60"][3].hps*3)/19*100)/100
        const NL60dps = Math.round((covenants["NL60"][0].dps*5 + covenants["NL60"][1].dps*9  + covenants["NL60"][2].dps*2  + covenants["NL60"][3].dps*3)/19*100)/100

        covenants["NL90"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90"]}, {}, 5));
        covenants["NL90"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90"]}, {}, 9));
        covenants["NL90"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90"]}, {}));
        covenants["NL90"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90"]}, {}));
        const NL90hpm = Math.round((covenants["NL90"][0].hpm*5  + covenants["NL90"][1].hpm*9  + covenants["NL90"][2].hpm*2  + covenants["NL90"][3].hpm*3)/19*100)/100
        const NL90hps = Math.round((covenants["NL90"][0].hps*5 + covenants["NL90"][1].hps*9  + covenants["NL90"][2].hps*2  + covenants["NL90"][3].hps*3)/19*100)/100
        const NL90dps = Math.round((covenants["NL90"][0].dps*5 + covenants["NL90"][1].dps*9  + covenants["NL90"][2].dps*2  + covenants["NL90"][3].dps*3)/19*100)/100
        
        // Stack % hit - double legendary
        covenants["2NL40"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}, 5));
        covenants["2NL40"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}, 9));
        covenants["2NL40"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}));
        covenants["2NL40"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB40", "BB"]}, {}));
        const nl240hpm = Math.round((covenants["2NL40"][0].hpm*5  + covenants["2NL40"][1].hpm*9  + covenants["2NL40"][2].hpm*2  + covenants["2NL40"][3].hpm*3)/19*100)/100
        const nl240hps = Math.round((covenants["2NL40"][0].hps*5 + covenants["2NL40"][1].hps*9  + covenants["2NL40"][2].hps*2  + covenants["2NL40"][3].hps*3)/19*100)/100
        const nl240dps = Math.round((covenants["2NL40"][0].dps*5 + covenants["2NL40"][1].dps*9  + covenants["2NL40"][2].dps*2  + covenants["2NL40"][3].dps*3)/19*100)/100

        covenants["2NL60"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}, 5));
        covenants["2NL60"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}, 9));
        covenants["2NL60"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}));
        covenants["2NL60"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB60", "BB"]}, {}));
        const NL260hpm = Math.round((covenants["2NL60"][0].hpm*5  + covenants["2NL60"][1].hpm*9  + covenants["2NL60"][2].hpm*2  + covenants["2NL60"][3].hpm*3)/19*100)/100
        const NL260hps = Math.round((covenants["2NL60"][0].hps*5 + covenants["2NL60"][1].hps*9  + covenants["2NL60"][2].hps*2  + covenants["2NL60"][3].hps*3)/19*100)/100
        const NL260dps = Math.round((covenants["2NL60"][0].dps*5 + covenants["2NL60"][1].dps*9  + covenants["2NL60"][2].dps*2  + covenants["2NL60"][3].dps*3)/19*100)/100

        covenants["2NL90"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}, 5));
        covenants["2NL90"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}, 9));
        covenants["2NL90"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}));
        covenants["2NL90"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28", "BDB90", "BB"]}, {}));
        const NL290hpm = Math.round((covenants["2NL90"][0].hpm*5  + covenants["2NL90"][1].hpm*9  + covenants["2NL90"][2].hpm*2  + covenants["2NL90"][3].hpm*3)/19*100)/100
        const NL290hps = Math.round((covenants["2NL90"][0].hps*5 + covenants["2NL90"][1].hps*9  + covenants["2NL90"][2].hps*2  + covenants["2NL90"][3].hps*3)/19*100)/100
        const NL290dps = Math.round((covenants["2NL90"][0].dps*5 + covenants["2NL90"][1].dps*9  + covenants["2NL90"][2].dps*2  + covenants["2NL90"][3].dps*3)/19*100)/100
        

        // NL output
        // Note burst = 1m CD guarenteed
        console.log("4pc2leg NL Crit/Vers: " + Math.round((covenants["NL"][0].totalHealing + covenants["NL"][1].totalHealing)) + " (HPM: " + Math.round((covenants["NL"][0].hpm + covenants["NL"][1].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][0].hps + covenants["NL"][1].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow))  + " (" + Math.round(((covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow)))/((covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing)))*1000)/10 + ")%. Damage: " + (covenants["NL"][0].totalDamage*1.1+Math.round(covenants["NL"][1].totalDamage)) + " (DPS: " + Math.round((covenants["NL"][0].dps + covenants["NL"][1].dps)/2*100)/100 + ")\n" +
        "4pc2leg NL Crit/Haste: " + Math.round((covenants["NL"][2].totalHealing + covenants["NL"][3].totalHealing)) + " (HPM: " + Math.round((covenants["NL"][2].hpm + covenants["NL"][3].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][2].hps + covenants["NL"][3].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow))  + " (" + Math.round(((covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow))/2)/((covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][2].totalDamage*1.1+Math.round(covenants["NL"][3].totalDamage)) + " (DPS: " + Math.round((covenants["NL"][2].dps + covenants["NL"][3].dps)/2*100)/100 + ")\n\nBalanced seems best stats: \n" +
        "4pc2leg NL Balanced: " + Math.round((covenants["NL"][4].totalHealing + covenants["NL"][5].totalHealing)) + " (HPM: " + Math.round((covenants["NL"][4].hpm + covenants["NL"][5].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][4].hps + covenants["NL"][5].hps)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow))  + " (" + Math.round(((covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow))/2)/((covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][4].totalDamage*1.1+Math.round(covenants["NL"][5].totalDamage)) + " (DPS: " + Math.round((covenants["NL"][4].dps + covenants["NL"][5].dps)/2*100)/100 + ")\n" +
        "NL Yulon: " + covenants["NL"][6].totalHealing + " (HPM: " + covenants["NL"][6].hpm + "). 4PC Window: " + covenants["NL"][6].total4pcWindow + " (" + Math.round(covenants["NL"][6].total4pcWindow/covenants["NL"][6].totalHealing*1000)/10 + ")%. Damage: " + covenants["NL"][6].totalDamage + " (DPS: " + covenants["NL"][6].dps + ")\n" +
        "NL Revival: " + covenants["NL"][7].totalHealing + "\n" +
        "NL - HPS: " + nlhps + " HPM: " + nlhpm + " DPS: " + nldps + " (2 yulon, 3 revival, balanced stats)" + "\n\n" + 
        "NL40 burst vs Venth 4pc: (" + Math.round((covenants["NL40"][0].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL40"][0].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n" +
        "NL60 burst vs Venth 4pc: (" + Math.round((covenants["NL60"][0].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL60"][0].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n" +
        "NL75 burst vs Venth 4pc: (" + Math.round((covenants["NL"][4].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL"][4].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n" +
        "NL90 burst vs Venth 4pc: (" + Math.round((covenants["NL90"][0].total4pcWindow/5)/(covenants["Venth"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL90"][0].total4pcWindow/5 + " vs " + covenants["Venth"][0].total4pcWindow/14 + "\n\n" +
        "NL40 burst vs Night Fae 4pc: (" + Math.round((covenants["NL40"][0].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL40"][0].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n" +
        "NL60 burst vs Night Fae 4pc: (" + Math.round((covenants["NL60"][0].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL60"][0].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n" +
        "NL75 burst vs Night Fae 4pc: (" + Math.round((covenants["NL"][4].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL"][4].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n" +
        "NL90 burst vs Night Fae 4pc: (" + Math.round((covenants["NL90"][0].total4pcWindow/5)/(covenants["Night Fae"][0].total4pcWindow/14)*1000)/100 + "%) " + covenants["NL90"][0].total4pcWindow/5 + " vs " + covenants["Night Fae"][0].total4pcWindow/14 + "\n\n" +
        "Stack scaling: \n Single legendary: NL40 - HPS: " + nl40hps + " HPM: " + nl40hpm + " DPS: " + nl40dps + "\n" +
        "NL60 - HPS: " + NL60hps + " HPM: " + NL60hpm + " DPS: " + NL60dps + "\n" +
        "NL90 - HPS: " + NL90hps + " HPM: " + NL90hpm + " DPS: " + NL90dps + "\n" +
        "Double legendary: NL40 - HPS: " + nl240hps + " HPM: " + nl240hpm + " DPS: " + nl240dps + "\n" +
        "NL60 - HPS: " + NL260hps + " HPM: " + NL260hpm + " DPS: " + NL260dps + "\n" +
        "NL90 - HPS: " + NL290hps + " HPM: " + NL290hpm + " DPS: " + NL290dps);

        console.log("Sequence lengths: " + "\n" + 
        "KyrianPre: " +  covenants["KyrianPre"][0].sequenceLength + "\n" +
        "VenthPre: " +  covenants["VenthPre"][0].sequenceLength + "\n" +
        "NFPre: " +  covenants["NFPre"][0].sequenceLength + "\n" +
        "NLPre: " +  covenants["NLPre"][0].sequenceLength + "\n" +
        "NF1L: " +  covenants["NF1L"][0].sequenceLength + "\n" +
        "Kyrian: " +  covenants["Kyrian"][0].sequenceLength + "\n" +
        "Venth: " +  covenants["Venth"][0].sequenceLength + "\n" +
        "NF: " +  covenants["Night Fae"][0].sequenceLength + "\n" +
        "NL: " +  covenants["NL"][4].sequenceLength + "\n" +
        "Non-BDB: " + covenants["NL"][5].sequenceLength + "\n" +
        "Kyrian Yulon: " +  covenants["Kyrian"][1].sequenceLength + "\n" +
        "Kyrian WoO: " +  covenants["Kyrian"][3].sequenceLength + "\n" +
        "Venth Yulon: " +  covenants["Venth"][1].sequenceLength + "\n" +
        "NF Yulon: " +  covenants["Night Fae"][1].sequenceLength);
        
    }) */

})