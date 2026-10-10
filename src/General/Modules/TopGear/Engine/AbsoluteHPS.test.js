import Player from "General/Modules/Player/Player";
import { processAllLines } from "General/Items/GearImport/SimCImportEngine";
import { buildNewWepCombos } from "General/Engine/ItemUtilities";
import Item from "General/Items/Item";
import { runTopGear } from "./TopGearEngine";
import { MODEL_TYPES } from "General/Engine/CONSTANTS";

// TopGearEngineShared contains the worker factory, which uses import.meta.url and can only be parsed by the
// webpack build. The engine imports exactly one function from it, so stub that rather than pulling the module in.
jest.mock("General/Modules/TopGear/Engine/TopGearEngineShared", () => ({
  generateReportCode: () => "testreportcode",
}));


/*
  Top Gear ranks sets on hardScore, which is an intellect-equivalent number rather than throughput. Where a spec is
  evaluated through a cast model we do have a real HPS figure, and these cover it surviving from the engine out to
  the report for both the best set and every alternative. They also pin the deliberate gap: the stat weight path
  must report no HPS at all rather than a made up one.
*/

const settings = {
  includeGroupBenefits: { value: true, options: [true, false], category: "trinkets", type: "selector" },
  incarnateAllies: { value: "DPS", options: ["Solo", "DPS", "Tank", "Tank + DPS"], category: "trinkets", type: "selector" },
  idolGems: { value: 2, options: [1, 2, 3, 4, 5, 6, 7, 8], category: "trinkets", type: "input" },
  rubyWhelpShell: { value: "Untrained", options: ["Untrained", "AoE Heal", "ST Heal", "Crit Buff", "Haste Buff"], category: "trinkets", type: "selector" },
  alchStonePotions: { value: 1, options: [0, 1, 2], category: "trinkets", type: "selector" },
  enchantItems: { value: true, options: [true, false], category: "topGear", type: "selector" },
  catalystLimit: { value: 1, options: [1, 2, 3], category: "topGear", type: "selector" },
  upgradeFinderMetric: { value: "Show % Upgrade", options: ["Show % Upgrade", "Show HPS"], category: "upgradeFinder", type: "selector" },
  topGearAutoGem: { value: false, options: [true, false], category: "topGear", type: "selector" },
  healingDartsOverheal: { value: 55, options: [], category: "embellishments", type: "Entry" },
  lariatGems: { value: 3, options: [], category: "embellishments", type: "Entry" },
  darkmoonHuntStat: { value: "Mastery", options: ["Mastery", "Versatility", "Crit", "Haste"], category: "embellishments", type: "selector" },
  flaskChoice: { value: "Automatic", options: ["Automatic", "Haste", "Crit", "Mastery", "Versatility"], category: "topGear", type: "selector" },
  calculateEmbellishments: { value: true, options: [true, false], category: "embellishments", type: "selector" },
  groupBuffValuation: { value: 75, options: [], category: "trinkets", type: "entry" },
  averageRaidHealth: { value: 85, options: [], category: "trinkets", type: "Entry" },
  masteryEffectivenessShaman: { value: 90, options: [], category: "trinkets", type: "Entry" },
};

const evokerSet = `
evoker="Evoulker"
level=80
race=dracthyr
region=us
server=stonemaul
role=spell
spec=preservation

head=,id=202488,bonus_id=6652/9414/9229/9409/9334/1498/8767
neck=,id=204397,bonus_id=6652/9409/9334/1492/8767/9477/8782
shoulder=,id=202486,bonus_id=6652/9227/9409/9334/1498/8767
back=,id=205025,bonus_id=8836/8840/8902/8960/9405/9366/9376,crafting_quality=5
chest=,id=204420,bonus_id=9410/9380/6652/9224/9221/1498/8767
wrist=,id=204704,bonus_id=8836/8840/8902/8960/9405/9376/9366/9414,crafting_quality=5
hands=,id=202489,bonus_id=6652/9230/9410/9381/1495/8767
waist=,id=202605,bonus_id=7979/6652/9413/9222/9219/9329/1494/8767
legs=,id=202487,bonus_id=6652/9228/9382/1504/8767
feet=,id=202588,bonus_id=9409/6652/9226/9219/9334/1495/8767
finger1=,id=158314,bonus_id=6652/9414/9144/9334/3311/8767
finger2=,id=195480,bonus_id=6652/7936/7981/1498/8767
trinket1=,id=203729,bonus_id=9410/9381/6652/1498/8767
trinket2=,id=193773,bonus_id=6652/9144/9334/1663/8767
main_hand=,id=190511,bonus_id=8836/8840/8902/9405/9376/8791/9237/9366,crafted_stats=40/36,crafting_quality=5
off_hand=,id=193745,bonus_id=9381/6652/9144/1666/8767
`;

// The SimC string fills each slot exactly once, which leaves Top Gear with a single possible set and therefore no
// alternatives to report. Adding the same rings and trinkets at other item levels gives it real choices to rank.
const addAlternatives = (player) => {
  [
    { id: 195480, slot: "Finger", levels: [447, 450] },
    { id: 158314, slot: "Finger", levels: [447] },
    { id: 203729, slot: "Trinket", levels: [441, 447] },
    { id: 193773, slot: "Trinket", levels: [441] },
  ].forEach(({ id, slot, levels }) => {
    levels.forEach((level) => player.activeItems.push(new Item(id, "", slot, 0, "", 0, level, "")));
  });
};

const runFor = (contentType) => {
  const player = new Player("Evoulker", "Preservation Evoker", 99, "US", "Stonemaul", "Dracthyr", "default", "Retail");
  processAllLines(player, contentType, evokerSet.split("\n"), -1, -1, settings);
  addAlternatives(player);
  player.activateAll();

  const wepCombos = buildNewWepCombos(player, true);
  const castModel = player.getActiveModel(contentType);

  return {
    castModel,
    result: runTopGear(player.activeItems, wepCombos, player, contentType, player.getHPS(contentType), settings, castModel),
  };
};

describe("Preservation Evoker reports absolute HPS in Raid", () => {
  const { result, castModel } = runFor("Raid");

  test("the spec really is on the cast model path, so this suite is testing something", () => {
    expect(castModel.modelType["Raid"]).toEqual(MODEL_TYPES.CAST_MODEL);
  });

  test("Top Gear produced a set", () => {
    expect(result).toBeTruthy();
    expect(result.itemSet).toBeTruthy();
  });

  test("the best set carries an absolute HPS figure", () => {
    expect(result.itemSet.setHPS).toBeGreaterThan(0);
  });

  test("the HPS figure is throughput and not the ranking score", () => {
    // setHPS must come from the cast model, not from hardScore, which is an intellect-equivalent ranking number.
    expect(result.itemSet.setHPS).not.toEqual(result.itemSet.hardScore);
    expect(result.itemSet.setHPS).toBeGreaterThan(1000);
    expect(result.itemSet.setHPS).toBeLessThan(100000000);
    expect(Number.isFinite(result.itemSet.setHPS)).toBe(true);
  });

  test("the HPS figure matches the modelled throughput on the set's stats", () => {
    expect(result.itemSet.setHPS).toEqual(Math.round(result.itemSet.setStats.hps));
  });

  test("every alternative reports its own absolute HPS", () => {
    expect(result.differentials.length).toBeGreaterThan(0);

    result.differentials.forEach((differential) => {
      expect(differential.hps).toBeGreaterThan(0);
    });
  });

  test("no alternative out-heals the set Top Gear picked", () => {
    result.differentials.forEach((differential) => {
      expect(differential.hps).toBeLessThanOrEqual(result.itemSet.setHPS);
      expect(differential.hpsDifference).toBeLessThanOrEqual(0);
    });
  });

  test("hpsDifference is the gap between the alternative and the best set", () => {
    result.differentials.forEach((differential) => {
      expect(differential.hpsDifference).toEqual(Math.round(differential.hps - result.itemSet.setHPS));
    });
  });

  test("alternatives are ordered from strongest to weakest", () => {
    const gaps = result.differentials.map((differential) => differential.hpsDifference);
    const sorted = [...gaps].sort((a, b) => b - a);

    expect(gaps).toEqual(sorted);
  });

  test("a percentage can be derived from the HPS figures alone", () => {
    // The report shows both the raw healing given up and that as a percentage of the best set. Both come from the
    // same two numbers, so they can never disagree the way hardScore and HPS could.
    result.differentials.forEach((differential) => {
      const primeHPS = differential.hps - differential.hpsDifference;
      expect(primeHPS).toEqual(result.itemSet.setHPS);

      const percent = (differential.hpsDifference / primeHPS) * 100;
      expect(Number.isFinite(percent)).toBe(true);
      expect(percent).toBeLessThanOrEqual(0);
      expect(percent).toBeGreaterThan(-100);
    });
  });

  test("the equipped set is evaluated for the upgrade percentage", () => {
    // Every item in the fixture came from a SimC string, so all of them are flagged equipped.
    expect(result.equippedHPS).toBeGreaterThan(0);
  });

  test("the best set is at least as good as what the player is wearing", () => {
    expect(result.itemSet.setHPS).toBeGreaterThanOrEqual(result.equippedHPS);
  });

  test("the upgrade percentage is a sane number", () => {
    const upgrade = ((result.itemSet.setHPS - result.equippedHPS) / result.equippedHPS) * 100;

    expect(Number.isFinite(upgrade)).toBe(true);
    expect(upgrade).toBeGreaterThanOrEqual(0);
    expect(upgrade).toBeLessThan(1000);
  });
});

describe("The stat weight path reports no HPS rather than a fabricated one", () => {
  const { result, castModel } = runFor("Dungeon");

  test("Dungeon is scored on stat weights for this spec", () => {
    expect(castModel.modelType["Dungeon"]).toEqual(MODEL_TYPES.DEFAULT);
  });

  test("no absolute HPS is claimed for the best set", () => {
    expect(result.itemSet.setHPS).toEqual(0);
  });

  test("no absolute HPS is claimed for alternatives", () => {
    result.differentials.forEach((differential) => {
      expect(differential.hps).toEqual(0);
    });
  });
});
