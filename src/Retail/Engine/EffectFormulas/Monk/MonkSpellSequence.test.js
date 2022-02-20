const { runCastSequence } = require("Retail/Engine/EffectFormulas/Monk/MonkSpellSequence.js");
import { getSiTHPS, applyConduit, getFOHealing, getLongCloneHealing } from "./FallenOrderFormulas";
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


    let covenants = {"Base": [], "NL": [], "Night Fae": [], "Venth": [], "VenthPre": [], "NFPre": [], "NLPre": [], "KyrianPre": [], "Kyrian": []} 

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
    const NFsequencePreTier = ["Essence Font", "Rising Sun Kick", "Faeline Stomp", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Faeline Stomp", "Rising Sun Kick", "Blackout Kick", "Chi Burst", "Refreshing Jade Wind", "Blackout Kick", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Tiger Palm", "Blackout Kick", "Refreshing Jade Wind"];
    const NLsequence = ["Tiger Palm", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Bonedust Brew", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Refreshing Jade Wind", "Essence Font", "Blackout Kick", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Refreshing Jade Wind", "Tiger Palm", "Blackout Kick", "Rising Sun Kick"];
    const baseSequence =  ["Tiger Palm", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Tiger Palm", "Renewing Mist", "Renewing Mist", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Refreshing Jade Wind", "Essence Font", "Blackout Kick", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick"];
    const kyrianWoOSequence =  ["Tiger Palm", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Essence Font", "Weapons of Order", "Essence Font", "Refreshing Jade Wind", "Thunder Focus Tea", "Rising Sun Kick", "Chi Burst", "Rising Sun Kick", "Blackout Kick", "Tiger Palm", "Refreshing Jade Wind", "Blackout Kick", "Essence Font", "Rising Sun Kick", "Tiger Palm", "Tiger Palm", "Renewing Mist", "Refreshing Jade Wind", "Blackout Kick", "Rising Sun Kick"];
    
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

    test("Legendaries & Soulbinds", () => {
        
        //covenants["Base"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        //covenants["Base"].push(runCastSequence(revivaltest, activeStats3, {"DefaultLoadout": true, "covenant": "None", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        //console.log("Base: " + covenants["Base"][0].totalHealing + " (HPM: " + covenants["Base"][0].hpm + "). 4PC Window: " + covenants["Base"][0].total4pcWindow + " (" + Math.round(covenants["Base"][0].total4pcWindow/covenants["Base"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Base"][0].totalDamage);

        // 0 tier - sequence won't be optimized but gives rough idea
        // Kyrian 
        covenants["KyrianPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 14))
        covenants["KyrianPre"].push(runCastSequence(YulonBase, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["KyrianPre"].push(runCastSequence(RevivalBase, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["KyrianPre"].push(runCastSequence(kyrianWoOSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        console.log("PreTier Kyrian: " + covenants["KyrianPre"][0].totalHealing + " (HPM: " + covenants["KyrianPre"][0].hpm + " | HPS: " + covenants["KyrianPre"][0].hps + "). Damage: " + covenants["KyrianPre"][0].totalDamage + " (DPS: " + covenants["KyrianPre"][0].dps + ") \n" +
        "Kyrian Yulon: " + covenants["KyrianPre"][1].totalHealing + " (HPM: " + covenants["KyrianPre"][1].hpm + " | HPS: " + covenants["KyrianPre"][1].hps + "). Damage: " + covenants["KyrianPre"][1].totalDamage + " (DPS: " + covenants["KyrianPre"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["KyrianPre"][2].totalHealing + "\n" +
        "Kyrian WoO: " + covenants["KyrianPre"][3].totalHealing + " (HPM: " + covenants["KyrianPre"][3].hpm + " | HPS: " + covenants["KyrianPre"][3].hps + "). Damage: " + covenants["KyrianPre"][3].totalDamage + " (DPS: " + covenants["KyrianPre"][3].dps + ")");

        // Venth - SiT and AtotM
        covenants["VenthPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": []}, {}, 14))
        covenants["VenthPre"].push(runCastSequence(YulonBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(RevivalBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Sinister Teachings"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 14))
        covenants["VenthPre"].push(runCastSequence(YulonBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["VenthPre"].push(runCastSequence(RevivalBase, pretierStats, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        console.log("PreTier Venth (SiT): " + covenants["VenthPre"][0].totalHealing + " (HPM : " + covenants["VenthPre"][0].hpm + " | HPS: " + covenants["VenthPre"][0].hps + "). Damage: " + covenants["VenthPre"][0].totalDamage + " (DPS: " + covenants["VenthPre"][0].dps + ")\n" +
        "Venth Per-Yulon: " + covenants["VenthPre"][1].totalHealing + " (HPM: " + covenants["VenthPre"][1].hpm + ")\n" +
        "Venth Per-Revival: " + covenants["VenthPre"][2].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round(getFOHealing(player) + getLongCloneHealing(player)) + " (+HPS: " + Math.round((getFOHealing(player) + getLongCloneHealing(player))/24*100)/100 + ")\n\n" +
        "PreTier Venth (AtotM): " + covenants["VenthPre"][3].totalHealing + " (HPM: " + covenants["VenthPre"][3].hpm + " | HPS: " + covenants["VenthPre"][3].hps + "). Damage: " + covenants["VenthPre"][3].totalDamage + " (DPS: " + covenants["VenthPre"][3].dps + ")\n" +
        "Venth Per-Yulon: " + covenants["VenthPre"][4].totalHealing + " (HPM: " + covenants["VenthPre"][4].hpm + ")\n" +
        "Venth Per-Revival: " + covenants["VenthPre"][5].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round(getFOHealing(player)) + " (+HPS: " + Math.round(getFOHealing(player)/24*100)/100 + ")");

        // NF
        covenants["NFPre"].push(runCastSequence(NFsequencePreTier, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 14));
        covenants["NFPre"].push(runCastSequence(YulonNFPre2leg, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NFPre"].push(runCastSequence(RevivalNF, pretierStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        console.log("PreTier NF: " + covenants["NFPre"][0].totalHealing + " (HPM: " + covenants["NFPre"][0].hpm + " | HPS: " + covenants["NFPre"][0].hps + "). Damage: " + covenants["NFPre"][0].totalDamage + " (DPS: " + covenants["NFPre"][0].dps + ") \n" +
        "NF Yulon: " + covenants["NFPre"][1].totalHealing + " (HPM: " + covenants["NFPre"][1].hpm + " | HPS: " + covenants["NFPre"][1].hps + "). Damage: " + covenants["NFPre"][1].totalDamage + " (DPS: " + covenants["NFPre"][1].dps + ") \n" +
        "NF Revival: " + covenants["NFPre"][2].totalHealing);
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        // NL
        covenants["NLPre"].push(runCastSequence(NLsequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 14));
        covenants["NLPre"].push(runCastSequence(baseSequence, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(YulonNL, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        covenants["NLPre"].push(runCastSequence(RevivalNL, pretierStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}));
        console.log("PreTier NL: " + Math.round((covenants["NLPre"][0].totalHealing + covenants["NLPre"][1].totalHealing)/2) + " (HPM: " + Math.round((covenants["NLPre"][0].hpm + covenants["NLPre"][1].hpm)/2*100)/100 + " | HPS: " + Math.round((covenants["NLPre"][0].hps + covenants["NLPre"][1].hps)/2*100)/100 + "). Damage: " + Math.round((covenants["NLPre"][0].totalDamage + covenants["NLPre"][1].totalDamage)/2*100)/100 + " (DPS: " + Math.round((covenants["NLPre"][0].dps + covenants["NLPre"][1].dps)/2*100)/100 + ")\n" +
        "NL Yulon: " + covenants["NLPre"][2].totalHealing + " (HPM: " + covenants["NLPre"][2].hpm + " | HPS: " + covenants["NLPre"][2].hps + "). Damage: " + covenants["NLPre"][2].totalDamage + " (DPS: " + covenants["NLPre"][2].dps + ")\n" +
        "NL Revival: " + covenants["NLPre"][3].totalHealing);
    
        // 4pc, 2 legendary
        // Kyrian
        covenants["Kyrian"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}, 10))
        covenants["Kyrian"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["Kyrian"].push(runCastSequence(RevivalKyrian, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        covenants["Kyrian"].push(runCastSequence(kyrianWoOSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Kyrian", "legendaries": ["Ancient Teachings of the Monastery"], "misc": []}, {}))
        const kyrianhpm = Math.round((covenants["Kyrian"][0].hpm + covenants["Kyrian"][1].hpm*2/14 + covenants["Kyrian"][2].hpm*3/14 + covenants["Kyrian"][3].hpm*4/14)*100)/100
        const kyrianhps = Math.round((covenants["Kyrian"][0].hps + covenants["Kyrian"][1].hps*2/14 + covenants["Kyrian"][2].hps*3/14 + covenants["Kyrian"][3].hps*4/14)*100)/100
        const kyriandps = Math.round((covenants["Kyrian"][0].dps + covenants["Kyrian"][1].dps*2/14 + covenants["Kyrian"][2].dps*3/14 + covenants["Kyrian"][3].dps*4/14)*100)/100
        console.log("4pc Kyrian: " + covenants["Kyrian"][0].totalHealing + " (HPM: " + covenants["Kyrian"][0].hpm + " | HPS: " + covenants["Kyrian"][0].hps + "). Damage: " + covenants["Kyrian"][0].totalDamage + " (DPS: " + covenants["Kyrian"][0].dps + ") \n" +
        "Kyrian Yulon: " + covenants["Kyrian"][1].totalHealing + " (HPM: " + covenants["Kyrian"][1].hpm + " | HPS: " + covenants["Kyrian"][1].hps + "). Damage: " + covenants["Kyrian"][1].totalDamage + " (DPS: " + covenants["Kyrian"][1].dps + ") \n" +
        "Kyrian Revival: " + covenants["Kyrian"][2].totalHealing + "\n" +
        "Kyrian WoO: " + covenants["Kyrian"][3].totalHealing + " (HPM: " + covenants["Kyrian"][3].hpm + " | HPS: " + covenants["Kyrian"][3].hps + "). Damage: " + covenants["Kyrian"][3].totalDamage + " (DPS: " + covenants["Kyrian"][3].dps + ")\n" +
        "Kyrian HPS: " + kyrianhps + " HPM: " + kyrianhpm + " DPS: " + kyriandps + " (2 yulon, 3 revival, 4 WoO)");

        // Venth
        // Very rough calc, 4 uses for FO
        // Base heal * overheal * clones active avg * env heal count * soom heal count
        const venth4pcfobonuspercast = 450 * 0.5 * 2.33 * ((8 / (2 / (1 / 1.21))) + (8 / (1 / 1.21))); 
        covenants["Venth"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 14))
        covenants["Venth"].push(runCastSequence(YulonBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        covenants["Venth"].push(runCastSequence(RevivalBase, activeStats3, {"DefaultLoadout": true, "covenant": "Venthyr", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}))
        const venthhpm = Math.round((covenants["Venth"][0].hpm + covenants["Venth"][1].hpm*2/14 + covenants["Venth"][2].hpm*3/14 + (getFOHealing(player) + getLongCloneHealing(player) + venth4pcfobonuspercast)/2000*4/14)*100)/100
        const venthhps = Math.round((covenants["Venth"][0].hps + covenants["Venth"][1].hps*2/14 + covenants["Venth"][2].hps*3/14 + (venth4pcfobonuspercast + getFOHealing(player) + getLongCloneHealing(player))/24*4/480)*100)/100
        const venthdps = Math.round((covenants["Venth"][0].dps + covenants["Venth"][1].dps*2/14 + covenants["Venth"][2].dps*3/14)*100)/100
        console.log("4pc Venth: " + covenants["Venth"][0].totalHealing + " (HPM: " + covenants["Venth"][0].hpm + " | HPS: " + covenants["Venth"][0].hps + "). 4PC Window: " + covenants["Venth"][0].total4pcWindow + " (" + Math.round(covenants["Venth"][0].total4pcWindow/covenants["Venth"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][0].totalDamage + " (DPS: " + covenants["Venth"][0].dps + ")\n" +
        "Venth Yulon: " +covenants["Venth"][1].totalHealing + " (HPM: " + covenants["Venth"][1].hpm + " | HPS: " + covenants["Venth"][1].hps + "). 4PC Window: " + covenants["Venth"][1].total4pcWindow + " (" + Math.round(covenants["Venth"][1].total4pcWindow/covenants["Venth"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Venth"][1].totalDamage + " (DPS: " + covenants["Venth"][1].dps + ")\n" +
        "Venth Revival: " + covenants["Venth"][2].totalHealing + "\n" +
        "Venth Per-FO: " + Math.round((getFOHealing(player) + getLongCloneHealing(player) + venth4pcfobonuspercast)*100)/100 + " (+HPS: " + Math.round((venth4pcfobonuspercast + getFOHealing(player) + getLongCloneHealing(player))/24*100)/100 + ")\n" +
        "Venth HPS: " + venthhps + " HPM: " + venthhpm + " DPS: " + venthdps + " (2 yulon, 3 revival, 4 FO)");

        // NF
        covenants["Night Fae"].push(runCastSequence(NFsequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 14));
        covenants["Night Fae"].push(runCastSequence(YulonNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["Night Fae"].push(runCastSequence(RevivalNF, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        const nfhpm = Math.round((covenants["Night Fae"][0].hpm + covenants["Night Fae"][1].hpm*2/14 + covenants["Night Fae"][2].hpm*3/14)*100)/100
        const nfhps = Math.round((covenants["Night Fae"][0].hps + covenants["Night Fae"][1].hps*2/14 + covenants["Night Fae"][2].hps*3/14)*100)/100
        const nfdps = Math.round((covenants["Night Fae"][0].dps + covenants["Night Fae"][1].dps*2/14 + covenants["Night Fae"][2].dps*3/14)*100)/100
        console.log("4pc Night Fae: " + covenants["Night Fae"][0].totalHealing + " (HPM: " + covenants["Night Fae"][0].hpm + " | HPS: " + covenants["Night Fae"][0].hps + "). 4PC Window: " + covenants["Night Fae"][0].total4pcWindow + " (" + Math.round(covenants["Night Fae"][0].total4pcWindow/covenants["Night Fae"][0].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][0].totalDamage + " (DPS: " + covenants["Night Fae"][0].dps + ")\n" +
        "Night Fae Yulon: " +covenants["Night Fae"][1].totalHealing + " (HPM: " + covenants["Night Fae"][1].hpm + " | HPS: " + covenants["Night Fae"][1].hps + "). 4PC Window: " + covenants["Night Fae"][1].total4pcWindow + " (" + Math.round(covenants["Night Fae"][1].total4pcWindow/covenants["Night Fae"][1].totalHealing*1000)/10 + ")%. Damage: " + covenants["Night Fae"][1].totalDamage + " (DPS: " + covenants["Night Fae"][1].dps + ")\n" +
        "Night Fae Revival: " + covenants["Night Fae"][2].totalHealing + "\n" +
        "Night Fae HPS: " + nfhps + " HPM: " + nfhpm + " DPS: " + nfdps + " (2 yulon, 3 revival)");
        // Haste bonus affects NF the most, sequence is much quicker - needed to make a longer sequence to accurately collect HPM

        // NL
        // Multiplied by 1.15 to simulate 2nd legendary        
        // Lowered number of guarenteed BDB 4pc to factor that that would be used on yulon
        covenants["NL"].push(runCastSequence(NLsequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 9));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats2, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 9));
        covenants["NL"].push(runCastSequence(NLsequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 5));
        covenants["NL"].push(runCastSequence(baseSequence, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}, 9));
        covenants["NL"].push(runCastSequence(YulonNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        covenants["NL"].push(runCastSequence(RevivalNL, activeStats3, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {}));
        const nlhpm = Math.round(((covenants["NL"][4].hpm + covenants["NL"][5].hpm*1.15)/2 + covenants["NL"][6].hpm*2/14 + covenants["NL"][7].hpm*3/14)*100)/100
        const nlhps = Math.round(((covenants["NL"][4].hps + covenants["NL"][5].hps*1.15)/2 + covenants["NL"][6].hps*2/14 + covenants["NL"][7].hps*3/14)*100)/100
        const nldps = Math.round(((covenants["NL"][4].dps + covenants["NL"][5].dps*1.15)/2 + covenants["NL"][6].dps*2/14 + covenants["NL"][7].dps*3/14)*100)/100
        console.log("4pc NL Crit/Vers: " + (covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NL"][0].hpm + covenants["NL"][1].hpm*1.15)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][0].hps + covenants["NL"][1].hps*1.15)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][0].total4pcWindow+Math.round(covenants["NL"][1].total4pcWindow*1.15))/2)/((covenants["NL"][0].totalHealing + Math.round(covenants["NL"][1].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][0].totalDamage+Math.round(covenants["NL"][1].totalDamage*1.15))/2 + " (DPS: " + Math.round((covenants["NL"][0].dps + covenants["NL"][1].dps*1.15)/2*100)/100 + ")\n" +
        "NL Crit/Haste: " + (covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NL"][2].hpm + covenants["NL"][3].hpm*1.15)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][2].hps + covenants["NL"][3].hps*1.15)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][2].total4pcWindow+Math.round(covenants["NL"][3].total4pcWindow*1.15))/2)/((covenants["NL"][2].totalHealing + Math.round(covenants["NL"][3].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][2].totalDamage+Math.round(covenants["NL"][3].totalDamage*1.15))/2 + " (DPS: " + Math.round((covenants["NL"][2].dps + covenants["NL"][3].dps*1.15)/2*100)/100 + ")\n\nBalanced seems best stats: \n" +
        "NL Balanced: " + (covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing*1.15))/2 + " (HPM: " + Math.round((covenants["NL"][4].hpm + covenants["NL"][5].hpm*1.15)/2*100)/100 + " | HPS: " + Math.round((covenants["NL"][4].hps + covenants["NL"][5].hps*1.15)/2*100)/100 + "). 4PC Window: " + (covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow*1.15))/2  + " (" + Math.round(((covenants["NL"][4].total4pcWindow+Math.round(covenants["NL"][5].total4pcWindow*1.15))/2)/((covenants["NL"][4].totalHealing + Math.round(covenants["NL"][5].totalHealing*1.15))/2)*1000)/10 + ")%. Damage: " + (covenants["NL"][4].totalDamage+Math.round(covenants["NL"][5].totalDamage*1.15))/2 + " (DPS: " + Math.round((covenants["NL"][4].dps + covenants["NL"][5].dps*1.15)/2*100)/100 + ")\n" +
        "NL Yulon: " + covenants["NL"][6].totalHealing + " (HPM: " + covenants["NL"][6].hpm + "). 4PC Window: " + covenants["NL"][6].total4pcWindow + " (" + Math.round(covenants["NL"][6].total4pcWindow/covenants["NL"][6].totalHealing*1000)/10 + ")%. Damage: " + covenants["NL"][6].totalDamage + " (DPS: " + covenants["NL"][6].dps + ")\n" +
        "NL Revival: " + covenants["NL"][7].totalHealing + "\n" +
        "NL HPS: " + nlhps + " HPM: " + nlhpm + " DPS: " + nldps + " (2 yulon, 3 revival, balanced stats)");
        
        console.log("Sequence lengths: " + "\n" + 
        "KyrianPre: " +  covenants["KyrianPre"][0].sequenceLength + "\n" +
        "VenthPre: " +  covenants["VenthPre"][0].sequenceLength + "\n" +
        "NFPre: " +  covenants["NFPre"][0].sequenceLength + "\n" +
        "NLPre: " +  covenants["NLPre"][0].sequenceLength + "\n" +
        "Kyrian: " +  covenants["Kyrian"][0].sequenceLength + "\n" +
        "Venth: " +  covenants["Venth"][0].sequenceLength + "\n" +
        "NF: " +  covenants["Night Fae"][0].sequenceLength + "\n" +
        "NL: " +  covenants["NL"][4].sequenceLength + "\n" +
        "Non-BDB: " + covenants["NL"][5].sequenceLength
        );
    })

})