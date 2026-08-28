import { getFolioGems, getFolioOptions, omniumFolioData } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/OmniumFolioData";

/*
  Folio runes, enchants and consumables used to be hardcoded in the engine. They're now driven by settings, and the
  contract that matters is that "Automatic" reproduces the old hardcoded behaviour exactly - otherwise every existing
  user's results would silently shift the moment these settings shipped.
*/

// The runes the engine hardcoded before any of this was configurable.
const LEGACY_SLOT_1 = 1279599; // Rune of Unleashed Fire
const LEGACY_SLOT_2 = 1279603; // Rune of Self-Mending
const LEGACY_SLOT_3 = 1287555; // Rune of Lingering
const LEGACY_SLOT_5 = 1279614; // Rune of Overload
const LEGACY_STAT = { haste: 1287774, crit: 1279609, mastery: 1287771, versatility: 1279613 };

const setting = (value) => ({ value, options: [], category: "omniumFolio", type: "selector", gameType: "Retail" });

describe("Omnium Folio defaults match the old hardcoded behaviour", () => {
  test("an empty settings object reproduces the legacy runes", () => {
    ["haste", "crit", "mastery", "versatility"].forEach((stat) => {
      expect(getFolioGems({}, stat)).toEqual([LEGACY_SLOT_1, LEGACY_SLOT_2, LEGACY_SLOT_3, LEGACY_STAT[stat], LEGACY_SLOT_5]);
    });
  });

  test("all slots on Automatic reproduces the legacy runes", () => {
    const settings = { folioSlot1: setting("Automatic"), folioSlot4: setting("Automatic"), folioSlot5: setting("Automatic") };
    expect(getFolioGems(settings, "mastery")).toEqual([LEGACY_SLOT_1, LEGACY_SLOT_2, LEGACY_SLOT_3, LEGACY_STAT.mastery, LEGACY_SLOT_5]);
  });

  test("an unknown stat still fills slot 4 rather than dropping it", () => {
    const gems = getFolioGems({}, "notastat");
    expect(gems.length).toEqual(5);
    expect(gems.every((id) => typeof id === "number")).toBe(true);
  });
});

describe("Omnium Folio slots are editable", () => {
  test("slot 1 can be overridden", () => {
    const settings = { folioSlot1: setting("Void-Touched") };
    expect(getFolioGems(settings, "haste")[0]).toEqual(1279596);
  });

  test("slot 4 can be overridden away from the best stat", () => {
    const settings = { folioSlot4: setting("Vers") };
    // Best stat is haste, but the player asked for versatility.
    expect(getFolioGems(settings, "haste")[3]).toEqual(LEGACY_STAT.versatility);
  });

  test("slot 5 can be overridden", () => {
    expect(getFolioGems({ folioSlot5: setting("Echoes") }, "haste")[4]).toEqual(1279616);
    expect(getFolioGems({ folioSlot5: setting("Residual Energy") }, "haste")[4]).toEqual(1279615);
  });

  test("slots can be set independently", () => {
    const settings = { folioSlot1: setting("Void-Touched"), folioSlot4: setting("Crit"), folioSlot5: setting("Echoes") };
    expect(getFolioGems(settings, "haste")).toEqual([1279596, LEGACY_SLOT_2, LEGACY_SLOT_3, LEGACY_STAT.crit, 1279616]);
  });

  test("always returns exactly five runes", () => {
    [{}, { folioSlot1: setting("Void-Touched") }, { folioSlot5: setting("Echoes") }].forEach((s) => {
      expect(getFolioGems(s, "mastery").length).toEqual(5);
    });
  });

  test("a stale or renamed choice falls back to Automatic instead of losing the slot", () => {
    const gems = getFolioGems({ folioSlot1: setting("Rune That No Longer Exists") }, "haste");
    expect(gems.length).toEqual(5);
    expect(gems[0]).toEqual(LEGACY_SLOT_1);
  });

  test("every offered option resolves to a real rune in that slot", () => {
    [[1, "folioSlot1"], [4, "folioSlot4"], [5, "folioSlot5"]].forEach(([slot, key]) => {
      const options = getFolioOptions(slot);
      expect(options.length).toBeGreaterThan(0);
      options.forEach((shortName) => {
        const gems = getFolioGems({ [key]: setting(shortName) }, "haste");
        const match = omniumFolioData.find((g) => g.shortName === shortName && g.slot === slot);
        expect(gems).toContain(match.id);
      });
    });
  });
});

/* ---------------------------------------------------------------------------------------------- */
/*                          Enchants and consumables, through the engine                          */
/* ---------------------------------------------------------------------------------------------- */
const Player = require("General/Modules/Player/Player").default;
const Item = require("General/Items/Item").default;
const { buildNewWepCombos } = require("General/Engine/ItemUtilities");
const { runTopGear } = require("./TopGearEngine");

const sel = (value, category) => ({ value, options: [], category, type: "selector", gameType: "Retail" });

const baseSettings = (overrides = {}) => ({
  enchantItems: sel(true, "topGear"),
  catalystLimit: sel(4, "topGear"),
  topGearAutoGem: sel(false, "topGear"),
  darkmoonHuntStat: sel("Mastery", "embellishments"),
  flaskChoice: sel("Automatic", "topGear"),
  calculateEmbellishments: sel(true, "embellishments"),
  groupBuffValuation: sel(75, "trinkets"),
  averageRaidHealth: sel(85, "trinkets"),
  crucibleUpgrades: sel("Fully Upgraded", "trinkets"),
  delayOnUseTrinkets: sel(true, "trinkets"),
  dpsFlag: sel(false, "trinkets"),
  ...overrides,
});

// One real item per slot so Top Gear can actually build a set.
const GEAR = [
  [268230, "Head"], [268250, "Neck"], [268231, "Shoulder"], [271451, "Back"], [268223, "Chest"],
  [271497, "Wrist"], [271502, "Hands"], [268216, "Waist"], [268237, "Legs"], [268233, "Feet"],
  [268249, "Finger"], [268252, "Finger"], [270175, "Trinket"], [274493, "Trinket"], [268205, "2H Weapon"],
];

const runWith = (settings, spec = "Preservation Evoker") => {
  const player = new Player("T", spec, 1, "US", "S", "Dracthyr", "default", "Retail");
  GEAR.forEach(([id, slot]) => {
    const item = new Item(id, "", slot, 0, "", 0, 330, "");
    item.active = true;
    player.addActiveItem(item);
  });
  const combos = buildNewWepCombos(player, true);
  return runTopGear(player.activeItems, combos, player, "Raid", player.getHPS("Raid"), settings, player.getActiveModel("Raid"));
};

describe("Enchants are selectable", () => {
  test("ring enchant follows the setting rather than the best stat", () => {
    const auto = runWith(baseSettings());
    const forced = runWith(baseSettings({ ringEnchant: sel("Versatility", "enchants") }));

    expect(auto).toBeTruthy();
    expect(forced.itemSet.enchantBreakdown["Finger"]).toEqual("Silvermoon's Tenacity");
  });

  test("weapon enchant follows the setting rather than the spec default", () => {
    // Preservation Evoker defaults to Arcane Mastery.
    expect(runWith(baseSettings()).itemSet.enchantBreakdown["2H Weapon"]).toEqual("Arcane Mastery");
    expect(runWith(baseSettings({ weaponEnchant: sel("Haste", "enchants") })).itemSet.enchantBreakdown["2H Weapon"]).toEqual("Berserker's Rage");
    expect(runWith(baseSettings({ weaponEnchant: sel("Intellect", "enchants") })).itemSet.enchantBreakdown["2H Weapon"]).toEqual("Acuity of the Ren'dorei");
  });

  test("a missing enchant setting behaves as Automatic", () => {
    const withSetting = runWith(baseSettings({ ringEnchant: sel("Automatic", "enchants") }));
    const without = runWith(baseSettings());
    expect(withSetting.itemSet.enchantBreakdown["Finger"]).toEqual(without.itemSet.enchantBreakdown["Finger"]);
  });
});

describe("Consumables are toggleable", () => {
  test("turning the Vantus Rune off lowers throughput", () => {
    const on = runWith(baseSettings({ vantusRune: sel(true, "consumables") }));
    const off = runWith(baseSettings({ vantusRune: sel(false, "consumables") }));

    expect(on.itemSet.setHPS).toBeGreaterThan(off.itemSet.setHPS);
  });

  test("turning food off lowers throughput", () => {
    const on = runWith(baseSettings({ foodBuff: sel("Intellect Food", "consumables") }));
    const off = runWith(baseSettings({ foodBuff: sel("None", "consumables") }));

    expect(on.itemSet.setHPS).toBeGreaterThan(off.itemSet.setHPS);
  });

  test("turning weapon oil off lowers throughput", () => {
    const on = runWith(baseSettings({ weaponOil: sel(true, "consumables") }));
    const off = runWith(baseSettings({ weaponOil: sel(false, "consumables") }));

    expect(on.itemSet.setHPS).toBeGreaterThan(off.itemSet.setHPS);
  });

  test("omitting the consumable settings entirely keeps them all on", () => {
    // Existing users have no such keys in local storage, so the defaults must not silently drop their buffs.
    const omitted = runWith(baseSettings());
    const explicit = runWith(baseSettings({
      vantusRune: sel(true, "consumables"), foodBuff: sel("Intellect Food", "consumables"), weaponOil: sel(true, "consumables"),
    }));

    expect(omitted.itemSet.setHPS).toEqual(explicit.itemSet.setHPS);
  });

  test("flask choice changes the reported flask", () => {
    expect(runWith(baseSettings({ flaskChoice: sel("Mastery", "topGear") })).itemSet.enchantBreakdown.flask).toEqual("Flask of the Magisters");
    expect(runWith(baseSettings({ flaskChoice: sel("Crit", "topGear") })).itemSet.enchantBreakdown.flask).toEqual("Flask of the Shattered Sun");
  });
});

/* ---------------------------------------------------------------------------------------------- */
/*                                             Gems                                               */
/* ---------------------------------------------------------------------------------------------- */
const { META_GEM_OPTIONS, GEM_COMBO_OPTIONS, findGemByStats, gemDB } = require("Databases/GemDB");

describe("Gem options resolve to real gems", () => {
  test("every offered stat combination exists in the gem DB", () => {
    const missing = Object.entries(GEM_COMBO_OPTIONS)
      .filter(([, [major, minor]]) => findGemByStats(major, minor) === 0)
      .map(([label]) => label);
    expect(missing).toEqual([]);
  });

  test("every offered meta gem exists in the gem DB", () => {
    Object.values(META_GEM_OPTIONS).forEach((id) => {
      expect(gemDB.some((gem) => gem.id === id)).toBe(true);
    });
  });

  test("a combination resolves to a gem with the right major and minor stats", () => {
    Object.entries(GEM_COMBO_OPTIONS).forEach(([, [major, minor]]) => {
      const gem = gemDB.find((g) => g.id === findGemByStats(major, minor));
      expect(gem.stats[major]).toEqual(12);
      expect(gem.stats[minor]).toEqual(5);
    });
  });
});

describe("Gems are selectable", () => {
  const gemsOf = (result) => result.itemSet.enchantBreakdown["Gems"];

  test("defaults are unchanged when nothing is set", () => {
    const auto = gemsOf(runWith(baseSettings()));
    const explicit = gemsOf(runWith(baseSettings({ metaGem: sel("Automatic", "gems"), gemCombo: sel("Automatic", "gems") })));
    expect(explicit).toEqual(auto);
  });

  test("the meta gem can be overridden without touching the stat gems", () => {
    const auto = gemsOf(runWith(baseSettings()));
    const forced = gemsOf(runWith(baseSettings({ metaGem: sel("Telluric (Mana)", "gems") })));

    expect(forced[0]).toEqual(META_GEM_OPTIONS["Telluric (Mana)"]);
    expect(forced.slice(1)).toEqual(auto.slice(1));
  });

  test("the stat gems can be overridden without touching the meta", () => {
    const auto = gemsOf(runWith(baseSettings()));
    const forced = gemsOf(runWith(baseSettings({ gemCombo: sel("Vers / Haste", "gems") })));

    expect(forced[0]).toEqual(auto[0]);
    forced.slice(1).forEach((id) => expect(id).toEqual(findGemByStats("versatility", "haste")));
  });

  test("meta and stat gems can be set together", () => {
    const forced = gemsOf(runWith(baseSettings({
      metaGem: sel("Telluric (Mana)", "gems"), gemCombo: sel("Crit / Mastery", "gems"),
    })));

    expect(forced[0]).toEqual(META_GEM_OPTIONS["Telluric (Mana)"]);
    forced.slice(1).forEach((id) => expect(id).toEqual(findGemByStats("crit", "mastery")));
  });

  test("choosing a worse gem combination lowers throughput", () => {
    // Evoker defaults to mastery, so forcing a stat it doesn't want should measurably cost HPS.
    const auto = runWith(baseSettings());
    const forced = runWith(baseSettings({ gemCombo: sel("Vers / Haste", "gems") }));
    expect(forced.itemSet.setHPS).toBeLessThan(auto.itemSet.setHPS);
  });

  test("an unrecognised choice falls back to the automatic picks", () => {
    const auto = gemsOf(runWith(baseSettings()));
    const stale = gemsOf(runWith(baseSettings({ gemCombo: sel("Haste / Nonsense", "gems") })));
    expect(stale).toEqual(auto);
  });
});

/* ---------------------------------------------------------------------------------------------- */
/*                              Fine tuning against equipped gear                                 */
/* ---------------------------------------------------------------------------------------------- */
const runEquipped = (settings, spec = "Preservation Evoker") => {
  const player = new Player("T", spec, 1, "US", "S", "Dracthyr", "default", "Retail");
  GEAR.forEach(([id, slot]) => {
    const item = new Item(id, "", slot, 0, "", 0, 330, "");
    item.active = true;
    item.isEquipped = true; // the comparison table prices options against equipped gear
    player.addActiveItem(item);
  });
  const combos = buildNewWepCombos(player, true);
  return runTopGear(player.activeItems, combos, player, "Raid", player.getHPS("Raid"), settings, player.getActiveModel("Raid"));
};

describe("Option comparisons against equipped gear", () => {
  const result = runEquipped(baseSettings());
  const comparisons = result.optionComparisons;

  test("a comparison table is produced when gear is equipped", () => {
    expect(comparisons).toBeTruthy();
  });

  test("it covers gems, enchants, flask and every Folio slot", () => {
    ["gemCombo", "metaGem", "ringEnchant", "weaponEnchant", "flaskChoice", "folioSlot1", "folioSlot4", "folioSlot5"]
      .forEach((key) => expect(Object.keys(comparisons)).toContain(key));
  });

  test("every option is priced", () => {
    Object.values(comparisons).forEach((entry) => {
      expect(entry.rows.length).toBeGreaterThan(0);
      entry.rows.forEach((row) => {
        expect(typeof row.option).toEqual("string");
        expect(Number.isFinite(row.hps)).toBe(true);
        expect(Number.isFinite(row.hpsDelta)).toBe(true);
        expect(Number.isFinite(row.scoreDelta)).toBe(true);
      });
    });
  });

  test("every gem combination offered in settings appears in the table", () => {
    const priced = comparisons.gemCombo.rows.map((r) => r.option);
    Object.keys(GEM_COMBO_OPTIONS).forEach((label) => expect(priced).toContain(label));
  });

  test("rows are ordered best first", () => {
    Object.values(comparisons).forEach((entry) => {
      const deltas = entry.rows.map((r) => r.hpsDelta);
      expect(deltas).toEqual([...deltas].sort((a, b) => b - a));
    });
  });

  test("the options genuinely differ, so the table is informative", () => {
    // If every option priced identically the substitution wouldn't be reaching the sim.
    const gemDeltas = new Set(comparisons.gemCombo.rows.map((r) => r.hpsDelta));
    expect(gemDeltas.size).toBeGreaterThan(1);
  });

  test("deltas are measured against the equipped set's own throughput", () => {
    Object.values(comparisons).forEach((entry) => {
      entry.rows.forEach((row) => {
        expect(row.hpsDelta).toEqual(row.hps - result.equippedHPS);
      });
    });
  });

  test("no table is produced when nothing is flagged as equipped", () => {
    // runWith builds items without isEquipped, which is the manual-add case.
    expect(runWith(baseSettings()).optionComparisons).toBeNull();
  });
});
