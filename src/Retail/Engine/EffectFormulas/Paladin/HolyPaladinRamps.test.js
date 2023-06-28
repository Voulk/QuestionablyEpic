import { allRamps, allRampsHealing } from "./HolyPaladinRampUtilities";
import { getSpellRaw, runCastSequence } from "./HolyPaladinRamps2";
import { genStatWeights } from './HolyPaladinUtilities';
import { buildRamp } from "./HolyPaladinRampGen";
import { PALADINSPELLDB, baseTalents } from "./HolyPaladinSpellDB";


// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.

/*
describe("Test Base Spells", () => {
    const errorMargin = 1.1; // There's often some blizzard rounding hijinx in spells. If our formulas are within 1 (a fraction of a percent) then we are likely calculating it correctly.
    const activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 1000,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    }
    const critMult = 1.05 + activeStats.crit / 35 / 100; 
    test("Smite", () => {
        const spell = DISCSPELLS['Smite'][0];

        const damage = getSpellRaw(spell, activeStats);

        //expect(Math.round(damage)).toEqual(Math.round(1110*critMult));
    });
    test("Mind Blast", () => {
        const spell = DISCSPELLS['Mind Blast'][0];
        expect(Math.abs(getSpellRaw(spell, activeStats) - 1666*critMult)).toBeLessThan(3);
    });
    test("Solace", () => {
        const spell = DISCSPELLS['Power Word: Solace'][0];

        const damage = getSpellRaw(spell, activeStats);

        expect(Math.abs(damage - 1680*critMult)).toBeLessThan(errorMargin);
    });
    test("Schism", () => {
        const spell = DISCSPELLS['Schism'][0];

        const damage = getSpellRaw(spell, activeStats);

        expect(Math.abs(damage - 3150*critMult)).toBeLessThan(errorMargin);
    });
    test("Power Word: Radiance", () => {
        const spell = DISCSPELLS['Power Word: Radiance'][0];

        const healing = getSpellRaw(spell, activeStats);

        expect(Math.abs(healing - 2347*critMult)).toBeLessThan(errorMargin);
    });
    test("Power Word: Shield", () => {
        const spell = DISCSPELLS['Power Word: Shield'][0];

        const healing = getSpellRaw(spell, activeStats);

        expect(Math.abs(healing - 3687*critMult)).toBeLessThan(errorMargin);
    });

    // TODO: test more spells.
});
*/
describe("Evang Cast Sequence", () => {
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
        intellect: 10000,
        haste: 5500,
        crit: 3200,
        mastery: 2500,
        versatility: 1200,
        stamina: 0,
}
    
    // Old Sequences
    const talents = baseTalents;

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    }

    const printReport = (report) => {
        const healing = report.healingDone;
        let healingOrd = []
        const sorted = Object.entries(healing)
            .sort((a, b) => a[1] - b[1])
            .reverse()
            .reduce((a, c) => (a[c[0]] = c[1], a), {})

        Object.keys(sorted).forEach(key => {
            healingOrd.push(key + ": " + Math.round(sorted[key]) + " (" + Math.round(sorted[key] / report.totalHealing * 10000) / 100 + "%)") ;
        });
        console.log("Healing");
        console.log(healingOrd);
        console.log("HPS: " + Math.round(report.hps) + ". HPM: " + Math.round(100 * report.hpm) / 100);
        console.log(report);
    }

    const seq = ["Light of Dawn", "Holy Shock", "Rest"] 

    const evalTalent = (talents, talentName, incStats, settings) => {
        let healing = 0;
        const prevPoints = talents[talentName].points;
        talents[talentName].points = 0;
        const iterations = 800;
        for (let i = 0; i < iterations; i++) {
            const stats = JSON.parse(JSON.stringify(incStats));
            const newBaseline = runCastSequence(seq, stats, settings, talents);
            healing += newBaseline.hps;
        }
        talents[talentName].points = prevPoints;
        //console.log(healing);
        return healing / iterations;

    }

    const evalAllTalents = (baselineScore, talents, stats, settings) => {
        const talentScores = {};
        Object.keys(talents).forEach(talentName => {
            const newTalent = evalTalent(talents, talentName, stats, settings);
            talentScores[talentName] = Math.round((baselineScore - newTalent) / baselineScore * 10000) / 100;
        })

        //console.log(talentScores);
        const sorted = Object.entries(talentScores)
        .sort((a, b) => a[1] - b[1])
        .reverse()
        .reduce((a, c) => (a[c[0]] = c[1], a), {})

        console.log(sorted);
    }

    test("Test Stuff", () => {

        //const baseline = allRamps(evangSeq, fiendSeq, activeStats, {"playstyle": "Venthyr Evangelism", "Power of the Dark Side": true, true);


        //console.log(seq);
        const iterations = 1;
        const settings = {reporting: true, 'DefaultLoadout': false}
        let sumHealing = 0;
        let baselineHealing = 0;

        for (let i = 0; i < iterations; i++) {
            const stats = JSON.parse(JSON.stringify(activeStats));
            const baseline = runCastSequence(seq, stats, settings, talents)
            //const baseline = allRamps(runCastSequence(seq, activeStats, settings, talents).totalHealing)
            sumHealing = sumHealing + baseline.hps;
            baselineHealing += baseline.hps;
            //if (iterations === 1 || i === iterations - 1) printReport(baseline);
        }

        
        //const baseline = runCastSequence(seq, activeStats, settings, talents)
        //const baseline = allRamps(runCastSequence(seq, activeStats, settings, talents).totalHealing)
        console.log("Avg Healing: " + Math.round((sumHealing / iterations)));
        //console.log("Total Healing: " + baseline.totalHealing);
        //console.log(baseline.report);
        
        
        //evalAllTalents(baselineHealing / iterations, {...talents}, JSON.parse(JSON.stringify(activeStats)), settings);
        

    });

    
    /*test("Stat Weights", () => {


        const activeStats = {
            intellect: 10500,
            haste: 4500,
            crit: 1200,
            mastery: 2500,
            versatility: 1200,
            stamina: 0,
        }
        const settings = {reporting: true}
        const talents = baseTalents;
        const iterations = 1500;
        const metric = 'totalHealing';
        // Weights

        const stats = ['intellect','versatility', 'crit', 'mastery', 'haste'];
        const baseline = runCastSequence(seq, activeStats, settings, talents)[metric]
        const results = {};
        stats.forEach(stat => {

            for (var i = 0; i < iterations; i++) {
                let adjustedStats = JSON.parse(JSON.stringify(activeStats));
                adjustedStats[stat] = adjustedStats[stat] + 800;

                const result = runCastSequence(seq, adjustedStats, settings, talents)

               
                results[stat] = (results[stat] || 0) + result[metric];
            }

            results[stat] = results[stat] / iterations;

        });
        const weights = {}

        stats.forEach(stat => {
            //console.log("Stat: " + stat + ". " + results[stat]);
            weights[stat] = (results[stat] - baseline) / (results['intellect'] - baseline);
        });

        console.log(weights); 
    }); */
}); 
