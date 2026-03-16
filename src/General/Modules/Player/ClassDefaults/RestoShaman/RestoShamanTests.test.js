import { shamanTalents } from "./RestoShamanTalents"
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, runTimeSuite, runSuite, runCastProfileSuites, buildStatWeights } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { restoShamanProfile, scoreShamanSet } from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanProfile"


describe("Generic Profile Testing Environment", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        const activeStats = restoShamanProfile.defaultStatProfile;

        // PlayerData will be hooked into the ecosystem in more detail soon.
        // Right now some of these are reiterated in scoreShamanSet but that can be cleaned up later.
        // Settings needs to be expanded and will include metrics like mastery efficiency that a player can edit.
        // Mastery will probably look very OP before that's added.
        const settings = {averageRaidHealth: 0.8}
        const testProfiles = {
            //"Totemic HTT Downpour": "Totemic",
            //"Totemic Ascendance DRE": "Totemic",
            "Farseer DRE Rain": "Farseer",
            //"Farseer DRE No Rain": "Farseer"
        }
        let results = []
        
        Object.keys(testProfiles).forEach(profile => {

            const params = {
                filler: {
                    hw: 0,
                    ch: 1
                },
                asc: {
                    hw: 0,
                    ch: 1
                },
                downtime: 0
            }
            const playerData = { spec: "Restoration Shaman", heroTree: testProfiles[profile], profileName: profile, stats: activeStats,
                                    masteryEffectiveness: 0.3, tierSets: ["Restoration Shaman S1-2", "Restoration Shaman S1-4"], params: params }
            const data = restoShamanProfile.scoreSet(activeStats, playerData);
            buildStatWeights(playerData, scoreShamanSet, {});
            results[profile] = data.healing
        })

        console.log(results)
        /*

        results = []
        function formatNumber(num){ return Math.round(num*10) / 10}
        let best = {}
        for (let i = 0; i <= 10; i++){
            for (let j = 0; j <= 10; j++){
                for (let k = 0; k <= 5; k++){

                    const params = {
                        filler: {
                            hw: formatNumber(i / 10),
                            ch: formatNumber(1 - (i / 10))
                        },
                        asc: {
                            hw: formatNumber(j / 10),
                            ch: formatNumber(1 - (j / 10))
                        },
                        downtime: formatNumber(k / 10)
                    }

                    const label = 'F=HW:' + params.filler.hw + '/CH:' + params.filler.ch + '-A=HW:' + params.asc.hw + '/CH:' + params.asc.ch
                    const playerData = { spec: "Restoration Shaman", heroTree: "Farseer", profileName: "Farseer DRE Rain", stats: activeStats,
                                    masteryEffectiveness: 0.3, tierSets: ["Restoration Shaman S1-2", "Restoration Shaman S1-4"], params: params }
                    const data = restoShamanProfile.scoreSet(activeStats, playerData);

                    if (!results[params.downtime]) results[params.downtime] = {}
                    if (!best[params.downtime]) best[params.downtime] = { label: '', result: 0}

                    if (data.healing > best[params.downtime].result){
                        best[params.downtime].result = data.healing
                        best[params.downtime].label = label
                    }
                    results[params.downtime][label] = Math.round(data.healing)

                }
            }
        }
        //console.log(results.sort(function(a, b){ return b - a }))
        console.log(best)

        /*
        const statProfiles = [
            { haste: 1000, crit: 50, mastery: 550, versatility: 600 },
            { haste: 150, crit: 850, mastery: 350, versatility: 850 },
            { haste: 600, crit: 600, mastery: 400, versatility: 600 },
            { haste: 450, crit: 450, mastery: 100, versatility: 1200 },
            { haste: 100, crit: 1300, mastery: 100, versatility: 700 },
            { haste: 550, crit: 550, mastery: 550, versatility: 550 },
        ]

        const statResults = {}
        statProfiles.forEach(profile => {
            let baseStats = restoShamanProfile.defaultStatProfile;
            baseStats.crit = profile.crit; baseStats.haste = profile.haste; baseStats.mastery = profile.mastery; baseStats.versatility = profile.versatility;
            const playerData = { spec: "Restoration Shaman", heroTree: "Farseer", profileName: "Farseer DRE Rain", stats: baseStats,
                                masteryEffectiveness: 0.3, tierSets: ["Restoration Shaman S1-2", "Restoration Shaman S1-4"] }
            const data = restoShamanProfile.scoreSet(baseStats, playerData);
            const label = "H:" + profile.haste + "/C:" + profile.crit + "/M:" + profile.mastery + "/V:" + profile.versatility
            statResults[label] = data.healing
        })
        console.log(statResults)
        */



        expect(true).toEqual(true);
    })


});