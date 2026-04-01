import { sourceHandler, getHighestTrinketScore } from "./TrinketChart";

const raid = (instanceId) => ({ sources: [{ instanceId }] });
const dungeon = () => ({ sources: [{ instanceId: -1 }] });
const delve = () => ({ sources: [{ instanceId: -69 }] });
const timewalking = () => ({ sources: [{ instanceId: -12 }] });
const other = () => ({ sources: [{ instanceId: 1192 }] });
const noSource = () => ({});

const ALL_SOURCES = ["The Rest", "Raids", "Dungeons", "Delves", "Timewalking"];

describe("sourceHandler — source filtering", () => {
  const items = [
    raid(1314),       // Dreamrift raid
    raid(1308),       // March raid
    dungeon(),
    delve(),
    timewalking(),
    other(),          // otherSources → "The Rest"
    noSource(),       // no sources → "The Rest"
  ];

  test("all sources selected returns everything", () => {
    expect(sourceHandler(items, ALL_SOURCES, "Holy Priest")).toHaveLength(items.length);
  });

  test("Raids only returns only raid items", () => {
    const result = sourceHandler(items, ["Raids"], "Holy Priest");
    expect(result).toHaveLength(2);
    expect(result.every((i) => [1314, 1308, 1307].includes(i.sources[0].instanceId))).toBe(true);
  });

  test("Dungeons only returns only dungeon items", () => {
    const result = sourceHandler(items, ["Dungeons"], "Holy Priest");
    expect(result).toHaveLength(1);
    expect(result[0].sources[0].instanceId).toBe(-1);
  });

  test("Delves only returns only delve items", () => {
    const result = sourceHandler(items, ["Delves"], "Holy Priest");
    expect(result).toHaveLength(1);
    expect(result[0].sources[0].instanceId).toBe(-69);
  });

  test("Timewalking only returns only timewalking items", () => {
    const result = sourceHandler(items, ["Timewalking"], "Holy Priest");
    expect(result).toHaveLength(1);
    expect(result[0].sources[0].instanceId).toBe(-12);
  });

  test("The Rest returns items with no sources and other-category sources", () => {
    const result = sourceHandler(items, ["The Rest"], "Holy Priest");
    expect(result).toHaveLength(2); // other() + noSource()
  });

  test("multiple sources combine correctly", () => {
    const result = sourceHandler(items, ["Raids", "Dungeons"], "Holy Priest");
    expect(result).toHaveLength(3);
  });

  test("empty sources array returns nothing", () => {
    expect(sourceHandler(items, [], "Holy Priest")).toHaveLength(0);
  });
});

describe("sourceHandler — class restriction filtering", () => {
  const items = [
    { ...raid(1314), classRestriction: ["Holy Priest", "Discipline Priest"] },
    { ...raid(1308), classRestriction: ["Holy Paladin"] },
    raid(1307), // no restriction
  ];

  test("includes items matching the player spec", () => {
    const result = sourceHandler(items, ALL_SOURCES, "Holy Priest");
    expect(result).toHaveLength(2); // restricted to Holy Priest + unrestricted
  });

  test("excludes items restricted to other specs", () => {
    const result = sourceHandler(items, ALL_SOURCES, "Restoration Druid");
    expect(result).toHaveLength(1); // only the unrestricted item
  });

  test("items with no classRestriction are always included", () => {
    const result = sourceHandler([raid(1307)], ALL_SOURCES, "Mistweaver Monk");
    expect(result).toHaveLength(1);
  });
});

describe("getHighestTrinketScore", () => {
  const db = [{ id: 1 }, { id: 2 }];

  const trinket = {
    id: 1,
    highestLevel: 289,
    i276: 1000,
    i289: 1500,
  };

  test("returns score at highest level when below maxLevel", () => {
    expect(getHighestTrinketScore(db, trinket, 289)).toBe(1500);
  });

  test("clamps to maxLevel when trinket highestLevel exceeds it", () => {
    expect(getHighestTrinketScore(db, trinket, 276)).toBe(1000);
  });

  test("returns undefined when the clamped level has no score", () => {
    expect(getHighestTrinketScore(db, trinket, 250)).toBeUndefined();
  });
});
