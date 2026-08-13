import { scoreMonkYulonSet, scoreMonkChijiSet } from "./MistweaverCastProfile";
import { TftEmpowerTarget } from "./MistweaverThunderFocusTea";
import { MONK_HERO_TREES } from "./MonkDefaults";

const EMPOWER_TARGETS: TftEmpowerTarget[] = ["Renewing Mist", "Enveloping Mist", "Kick"];

const stats: any = { intellect: 3400, crit: 900, haste: 1800, mastery: 0, versatility: 300 };

const playerData = {
    heroTree: MONK_HERO_TREES.CONDUIT,
    tierSets: [],
    effects: [],
};

const TIER_SETS = ["Mistweaver Monk S2-2", "Mistweaver Monk S2-4"];

const empowerVariants = (): TftEmpowerTarget[][] =>
    EMPOWER_TARGETS.flatMap(first => EMPOWER_TARGETS.map(second => [first, second]));

const compareEmpowers = (runCastModel: (stats: any, playerData: any) => { healing: number }, tierSets: string[] = []) => {
    const results = empowerVariants().map(tftEmpowers => ({
        label: tftEmpowers.join(" -> "),
        healing: runCastModel(stats, { ...playerData, tierSets, tftEmpowers }).healing,
    }));

    results.sort((a, b) => b.healing - a.healing);
    return results;
}

const printResults = (title: string, results: { label: string; healing: number }[]) => {
    const lines = results.map(r => `  ${r.healing.toFixed(0)}  ${r.label}`);
    console.log(`${title}\n${lines.join("\n")}`);
}

describe("Thunder Focus Tea empower comparison", () => {
    test("Yu'lon", () => {
        const noTier = compareEmpowers(scoreMonkYulonSet);
        const tier = compareEmpowers(scoreMonkYulonSet, TIER_SETS);
        printResults("Yu'lon empower spends, best to worst:", noTier);
        printResults("Yu'lon empower spends with tier, best to worst:", tier);

        expect(noTier[0].healing).toBeGreaterThan(0);
    });

    test("Chi-Ji", () => {
        const noTier = compareEmpowers(scoreMonkChijiSet);
        const tier = compareEmpowers(scoreMonkChijiSet, TIER_SETS);
        printResults("Chi-Ji empower spends, best to worst:", noTier);
        printResults("Chi-Ji empower spends with tier, best to worst:", tier);

        expect(noTier[0].healing).toBeGreaterThan(0);
    });

    test("spends are not all identical", () => {
        const results = compareEmpowers(scoreMonkYulonSet);

        expect(results[0].healing).toBeGreaterThan(results[results.length - 1].healing);
    });
});
