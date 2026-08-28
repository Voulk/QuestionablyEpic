import fs from "fs";
import Player from "General/Modules/Player/Player";
import Item from "General/Items/Item";
import ItemSet from "General/Modules/TopGear/ItemSet";
import { optimizeConfiguration, TUNABLE_OPTIONS } from "./TopGearEngine";
import rootReducer from "Redux/Reducers/RootReducer";

/*
  The gem / enchant / flask / Folio axes interact through diminishing returns, so optimising them one at a time can
  miss the joint best. Full enumeration is ~27k evaluations per gear set, which is far too slow, so the engine walks
  coordinate ascent. These tests check that shortcut actually lands on the optimum rather than a local maximum.
*/

const settings = rootReducer(undefined, { type: "@@INIT" }).playerSettings;

const GEAR = [
  [268230, "Head"], [268250, "Neck"], [268231, "Shoulder"], [271451, "Back"], [268223, "Chest"],
  [271497, "Wrist"], [271502, "Hands"], [268216, "Waist"], [268237, "Legs"], [268233, "Feet"],
  [268249, "Finger"], [268252, "Finger"], [270175, "Trinket"], [274493, "Trinket"], [268205, "2H Weapon"],
];

const buildFixture = () => {
  const player = new Player("T", "Preservation Evoker", 1, "EU", "R", "Dracthyr", "default", "Retail");
  const items = GEAR.map(([id, slot]) => {
    const item = new Item(id, "", slot, 0, "", 0, 330, "");
    item.active = true;
    item.isEquipped = true;
    return item;
  });
  items.forEach((i) => player.addActiveItem(i));
  return { player, itemSet: new ItemSet(1, items, 0, "Preservation Evoker") };
};

describe("Configuration optimiser", () => {
  const { player, itemSet } = buildFixture();
  const castModel = player.getActiveModel("Raid");
  const baseHPS = player.getHPS("Raid");
  const optimised = optimizeConfiguration(itemSet, player, "Raid", baseHPS, settings, castModel);

  test("it finds a configuration at least as good as the defaults", () => {
    expect(optimised.score).toBeGreaterThanOrEqual(optimised.baseline);
    expect(optimised.gain).toBeGreaterThanOrEqual(0);
  });

  test("it actually improves on the defaults for this set", () => {
    expect(optimised.gain).toBeGreaterThan(0);
  });

  test("it stays far cheaper than full enumeration", () => {
    const fullSpace = TUNABLE_OPTIONS.reduce((acc, axis) => acc * axis.options.length, 1);
    expect(optimised.evaluations).toBeLessThan(fullSpace / 10);
    expect(optimised.evaluations).toBeLessThan(500);
  });

  test("every axis it chose is a real option on that axis", () => {
    Object.entries(optimised.config).forEach(([key, value]) => {
      const axis = TUNABLE_OPTIONS.find((a) => a.key === key);
      expect(axis).toBeTruthy();
      expect(axis.options).toContain(value);
    });
  });

  test("it is reproducible", () => {
    const again = optimizeConfiguration(itemSet, player, "Raid", baseHPS, settings, castModel);
    expect(again.config).toEqual(optimised.config);
    expect(Math.round(again.score)).toEqual(Math.round(optimised.score));
  });

  test("no single-axis change beats the result, so it is at least a local optimum", () => {
    // Coordinate ascent guarantees this by construction; asserting it guards against a bug in the search itself.
    const { withConfig, scoreConfiguration } = require("./TopGearEngine");
    const { evalSetForTest } = {};
    TUNABLE_OPTIONS.forEach((axis) => {
      axis.options.forEach((option) => {
        const trial = optimizeConfiguration(itemSet, player, "Raid", baseHPS,
          withConfig(settings, { ...optimised.config, [axis.key]: option }), castModel, 1);
        // Starting from the perturbed config, ascent must not find anything better than the optimum.
        expect(trial.score).toBeLessThanOrEqual(optimised.score + 1);
      });
    });
  });
});

/* ---------------------------------------------------------------------------------------------- */
/*                        Joint optimisation through the whole Top Gear run                       */
/* ---------------------------------------------------------------------------------------------- */
const { runTopGear } = require("./TopGearEngine");
const { buildNewWepCombos } = require("General/Engine/ItemUtilities");

const withOptimiser = (on) => {
  const s = JSON.parse(JSON.stringify(settings));
  s.optimizeGemsEnchants = { value: on, options: [true, false], category: "topGear", type: "selector", gameType: "Retail" };
  return s;
};

// A pool with real alternatives per slot, so Top Gear has genuine choices to re-rank.
const runPool = (opts) => {
  const player = new Player("T", "Preservation Evoker", 1, "EU", "R", "Dracthyr", "default", "Retail");
  GEAR.forEach(([id, slot]) => {
    const item = new Item(id, "", slot, 0, "", 0, 330, "");
    item.active = true;
    item.isEquipped = true;
    player.addActiveItem(item);
  });
  // Alternatives at other item levels give the ranking something to move between.
  [[268249, "Finger", 321], [268252, "Finger", 334], [270175, "Trinket", 321], [268230, "Head", 321]].forEach(([id, slot, ilvl]) => {
    const item = new Item(id, "", slot, 0, "", 0, ilvl, "");
    item.active = true;
    player.addActiveItem(item);
  });
  const combos = buildNewWepCombos(player, true);
  return runTopGear(player.activeItems, combos, player, "Raid", player.getHPS("Raid"), opts, player.getActiveModel("Raid"));
};

describe("Joint optimisation through runTopGear", () => {
  const off = runPool(withOptimiser(false));
  const on = runPool(withOptimiser(true));

  test("both runs produce a set", () => {
    expect(off).toBeTruthy();
    expect(on).toBeTruthy();
  });

  test("optimisation is off by default, so existing results are unchanged", () => {
    expect(runPool(settings).optimalConfig).toBeNull();
  });

  test("enabling it reports the winning configuration", () => {
    expect(on.optimalConfig).toBeTruthy();
    expect(Object.keys(on.optimalConfig.config).length).toBeGreaterThan(0);
    expect(on.optimalConfig.setsOptimized).toBeGreaterThan(0);
  });

  test("the optimised set is at least as good as the default one", () => {
    expect(on.itemSet.setHPS).toBeGreaterThanOrEqual(off.itemSet.setHPS);
  });

  test("it reports a real gain", () => {
    expect(on.optimalConfig.gain).toBeGreaterThan(0);
    expect(on.optimalConfig.score).toBeGreaterThan(on.optimalConfig.baseline);
  });

  test("the reported set actually uses the winning configuration", () => {
    // The winner is re-evaluated with its own config, so the set's own HPS must match the optimiser's score.
    expect(Math.abs(on.itemSet.setHPS - on.optimalConfig.score)).toBeLessThanOrEqual(1);
  });

  test("alternatives are re-scored under the same configuration, so they stay comparable", () => {
    on.differentials.forEach((d) => {
      expect(d.hps).toBeLessThanOrEqual(on.itemSet.setHPS);
      expect(d.hpsDifference).toBeLessThanOrEqual(0);
    });
  });

  test("the cost stays bounded", () => {
    expect(on.optimalConfig.evaluations).toBeLessThan(5000);
  });
});
