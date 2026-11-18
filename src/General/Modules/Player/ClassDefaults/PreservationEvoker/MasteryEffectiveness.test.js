import { scoreEvokerSet } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PreservationEvokerProfile";

/*
  Mastery effectiveness was hardcoded inside scoreEvokerSet. Preservation mastery scales with how injured the
  target is, so its real effectiveness varies by content - Resto Shaman already exposed this as a setting.
  The settings panel writes number inputs back as strings, which is what the string test below guards.
*/

describe("Evoker mastery effectiveness is configurable", () => {
  const stats = { intellect: 60000, haste: 900, crit: 900, mastery: 1300, versatility: 200, leech: 0 };
  const run = (pct) => {
    const s = pct === null ? {} : { masteryEffectivenessEvoker: { value: pct, options: [], category: "specSpecific", type: "Entry", gameType: "Retail" } };
    return scoreEvokerSet(stats, { spec: "Preservation Evoker", heroTree: "Chronowarden", settings: s, stats, tierSets: [], effectList: [] }, s).healing;
  };

  test("the setting changes modelled throughput", () => {
    expect(run(100)).toBeGreaterThan(run(70));
  });

  test("higher effectiveness is monotonically better", () => {
    const values = [70, 80, 90, 100].map(run);
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  test("an absent setting keeps the previous hardcoded 0.9", () => {
    expect(Math.round(run(null))).toEqual(Math.round(run(90)));
  });

  test("a STRING value works - the settings panel writes numbers back as strings", () => {
    // Regression: a strict typeof === "number" check here meant editing the box silently did nothing.
    const asString = (v) => ({ masteryEffectivenessEvoker: { value: v, options: [], category: "specSpecific", type: "Entry", gameType: "Retail" } });
    const runStr = (v) => scoreEvokerSet(stats, { spec: "Preservation Evoker", heroTree: "Chronowarden", settings: asString(v), stats, tierSets: [], effectList: [] }, asString(v)).healing;

    expect(Math.round(runStr("100"))).toEqual(Math.round(run(100)));
    expect(Math.round(runStr("70"))).toEqual(Math.round(run(70)));
    expect(runStr("100")).toBeGreaterThan(runStr("70"));
  });

  test("a malformed setting falls back rather than zeroing mastery", () => {
    const s = { masteryEffectivenessEvoker: { value: "nonsense", options: [], category: "specSpecific", type: "Entry", gameType: "Retail" } };
    const result = scoreEvokerSet(stats, { spec: "Preservation Evoker", heroTree: "Chronowarden", settings: s, stats, tierSets: [], effectList: [] }, s).healing;
    expect(Math.round(result)).toEqual(Math.round(run(90)));
  });
});
