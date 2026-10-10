import { getItemEffectOptions, hasUnallocatedStats, getItemAllocations } from "./ItemUtilities";
import { getApplicableEmbellishments, getEmbellishmentByEffectName, getEmbellishmentForItem, embellishmentDB } from "Databases/EmbellishmentDB";
import { embellishmentData } from "Retail/Engine/EffectFormulas/Generic/Embellishments/EmbellishmentData";
import Item from "General/Items/Item";
import ItemSet from "General/Modules/TopGear/ItemSet";
import Player from "General/Modules/Player/Player";
import { getEffectValue } from "Retail/Engine/EffectFormulas/EffectEngine";

const effectSettings = {
  calculateEmbellishments: { value: true, options: [true, false], category: "embellishments", type: "selector" },
  darkmoonHuntStat: { value: "Mastery", options: ["Mastery", "Versatility", "Crit", "Haste"], category: "embellishments", type: "selector" },
};

/*
  Crafted gear and embellishments for Preservation Evoker (mail).

  These cover the paths that previously dropped embellishments silently: the Add Item dropdown, the crafted stat
  picker, embellishments baked into specific crafted items, and multi-piece embellishment sets.
*/

// Mail crafted gear an Evoker can actually wear.
const WORLD_TENDERS_CHEST = 244609; // Root Warden's Regalia (Set) carrier
const WORLD_TENDERS_FEET = 244610;
const WORLD_TENDERS_WAIST = 244611;
const AXE_FLINGIN_BANDS = 244605; // 1 piece mail embellishment
const FARSTRIDERS_CHEST = 244578; // plain crafted mail, takes an applied embellishment
const MAGISTERS_RITUAL_KNIFE = 237838; // crafted intellect dagger
const CONSECRATED_CLOAK = 271460; // newer crafted piece with fixed secondaries

describe("Embellishment DB is consistent with the formulas that score it", () => {
  const hasFormula = (embel) => embellishmentData.some((data) => data.name.trim() === embel.effect.name.trim());

  test("every embellishment either has a formula or is flagged unmodelled", () => {
    const silentlyBroken = embellishmentDB.filter((embel) => !hasFormula(embel) && !embel.unmodelled).map((embel) => embel.effect.name);

    expect(silentlyBroken).toEqual([]);
  });

  test("nothing is flagged unmodelled once a formula exists for it", () => {
    const staleFlags = embellishmentDB.filter((embel) => embel.unmodelled && hasFormula(embel)).map((embel) => embel.effect.name);

    expect(staleFlags).toEqual([]);
  });

  test("unmodelled embellishments are never offered as a choice", () => {
    const unmodelled = embellishmentDB.filter((embel) => embel.unmodelled).map((embel) => embel.effect.name);
    expect(unmodelled.length).toBeGreaterThan(0); // Guard against this test quietly becoming vacuous.

    const offered = ["Chest", "Wrist", "Waist", "Feet", "Head", "Legs", "Hands", "Back", "Shoulder", "1H Weapon", "2H Weapon", "Offhand"]
      .reduce((acc, slot) => acc.concat(getApplicableEmbellishments(slot).map((embel) => embel.effect.name)), []);

    unmodelled.forEach((name) => expect(offered).not.toContain(name));
  });

  test("lookup by effect name tolerates stray whitespace in either DB", () => {
    expect(getEmbellishmentByEffectName("Sunfire Silk Lining")).toBeTruthy();
    expect(getEmbellishmentByEffectName("  Sunfire Silk Lining  ")).toBeTruthy();
    expect(getEmbellishmentByEffectName("Not A Real Embellishment")).toBeUndefined();
  });
});

describe("Add Item offers the embellishments that exist rather than a hardcoded subset", () => {
  test("a crafted mail chest offers every applicable armor embellishment", () => {
    const options = getItemEffectOptions(FARSTRIDERS_CHEST).map((opt) => opt.effectName);

    // These four were the entire hardcoded list before, and must still be present.
    expect(options).toEqual(expect.arrayContaining(["Arcanoweave Lining", "Primal Spore Binding", "Blessed Pango Charm", "Adorned Fang"]));
    // This was in the DB with a working formula but was never offered.
    expect(options).toContain("Sunfire Silk Lining");
  });

  test("a crafted weapon offers the weapon reagents, including Darkmoon Sigil: Blood", () => {
    const options = getItemEffectOptions(MAGISTERS_RITUAL_KNIFE).map((opt) => opt.effectName);

    expect(options).toEqual(expect.arrayContaining(["Darkmoon Sigil: Hunt", "Darkmoon Sigil: Void", "Hunter's Ritual Stone"]));
    expect(options).toContain("Darkmoon Sigil: Blood");
  });

  test("armor embellishments are not offered on weapons and weapon reagents are not offered on armor", () => {
    const weaponOptions = getItemEffectOptions(MAGISTERS_RITUAL_KNIFE).map((opt) => opt.effectName);
    const armorOptions = getItemEffectOptions(FARSTRIDERS_CHEST).map((opt) => opt.effectName);

    expect(weaponOptions).not.toContain("Arcanoweave Lining");
    expect(armorOptions).not.toContain("Darkmoon Sigil: Hunt");
  });

  test("embellishments baked into a specific item are never offered as a choice", () => {
    const allOffered = getApplicableEmbellishments("Chest").concat(getApplicableEmbellishments("Wrist")).map((embel) => embel.effect.name);

    expect(allOffered).not.toContain("Axe-Flingin' Bands");
    expect(allOffered).not.toContain("Root Warden's Regalia");
  });

  test("non-crafted items offer nothing", () => {
    expect(getItemEffectOptions(0)).toEqual([]);
  });
});

describe("Crafted stat picker only appears when there is budget to assign", () => {
  test("older crafted gear with unallocated stats can have its secondaries chosen", () => {
    expect(hasUnallocatedStats(FARSTRIDERS_CHEST)).toBe(true);

    const haste = getItemAllocations(FARSTRIDERS_CHEST, ["haste", "mastery"]);
    const crit = getItemAllocations(FARSTRIDERS_CHEST, ["crit", "versatility"]);

    expect(haste.haste).toBeGreaterThan(0);
    expect(crit.crit).toBeGreaterThan(0);
    expect(haste.crit || 0).toEqual(0);
  });

  test("crafted gear with fixed secondaries reports no assignable budget", () => {
    // This item ships with its secondaries already baked in, so offering a stat picker would do nothing.
    expect(hasUnallocatedStats(CONSECRATED_CLOAK)).toBe(false);

    const asHaste = getItemAllocations(CONSECRATED_CLOAK, ["haste", "mastery"]);
    const asCrit = getItemAllocations(CONSECRATED_CLOAK, ["crit", "versatility"]);
    expect(asHaste).toEqual(asCrit);
  });
});

describe("Embellishments baked into crafted items attach automatically", () => {
  test("EmbellishmentDB knows which items carry which embellishment", () => {
    expect(getEmbellishmentForItem(AXE_FLINGIN_BANDS).effect.name).toEqual("Axe-Flingin' Bands");
    expect(getEmbellishmentForItem(WORLD_TENDERS_CHEST).effect.name).toEqual("Root Warden's Regalia");
    expect(getEmbellishmentForItem(FARSTRIDERS_CHEST)).toBeUndefined();
  });

  test("a mail set piece with no effect in ItemDB still builds with its embellishment", () => {
    // ItemDB has no effect block on the World Tender's pieces, which meant they simmed as plain stat sticks.
    const item = new Item(WORLD_TENDERS_CHEST, "World Tender's Trunkplate", "Chest", 0, "", 0, 330, "");

    expect(item.effect).toBeTruthy();
    expect(item.effect.name).toEqual("Root Warden's Regalia");
    expect(item.effect.type).toEqual("embellishment");
  });

  test("an item that already has an effect in ItemDB keeps it", () => {
    const item = new Item(AXE_FLINGIN_BANDS, "Axe-Flingin' Bands", "Wrist", 0, "", 0, 330, "");
    expect(item.effect.name).toEqual("Axe-Flingin' Bands");
  });
});

describe("Multi-piece embellishment sets are counted once, and only when complete", () => {
  const buildSet = (itemIDs) => {
    const items = itemIDs.map((entry) => new Item(entry.id, "", entry.slot, 0, "", 0, 330, ""));
    return new ItemSet(1, items, 0, "Preservation Evoker").compileStats("Retail", {});
  };

  const countEffect = (set, name) => set.effectList.filter((effect) => effect.name === name).length;

  test("one piece of a two piece set grants nothing", () => {
    const set = buildSet([{ id: WORLD_TENDERS_CHEST, slot: "Chest" }]);
    expect(countEffect(set, "Root Warden's Regalia")).toEqual(0);
  });

  test("two pieces grant the set bonus exactly once", () => {
    const set = buildSet([
      { id: WORLD_TENDERS_CHEST, slot: "Chest" },
      { id: WORLD_TENDERS_FEET, slot: "Feet" },
    ]);
    expect(countEffect(set, "Root Warden's Regalia")).toEqual(1);
  });

  test("three pieces still only grant it once", () => {
    const set = buildSet([
      { id: WORLD_TENDERS_CHEST, slot: "Chest" },
      { id: WORLD_TENDERS_FEET, slot: "Feet" },
      { id: WORLD_TENDERS_WAIST, slot: "Waist" },
    ]);
    expect(countEffect(set, "Root Warden's Regalia")).toEqual(1);
  });

  test("each worn set piece consumes an embellishment slot", () => {
    const set = buildSet([
      { id: WORLD_TENDERS_CHEST, slot: "Chest" },
      { id: WORLD_TENDERS_FEET, slot: "Feet" },
    ]);
    expect(set.uniques["embellishment"]).toEqual(2);
  });

  test("a single piece embellishment is unaffected", () => {
    const set = buildSet([{ id: AXE_FLINGIN_BANDS, slot: "Wrist" }]);
    expect(countEffect(set, "Axe-Flingin' Bands")).toEqual(1);
  });

  test("the resolved set bonus actually scores, rather than resolving to an empty effect", () => {
    // Attaching the effect is only half the job - it also has to route through EffectEngine to a formula that
    // returns stats. A name mismatch anywhere in that chain comes back as {} and silently scores zero.
    const set = buildSet([
      { id: WORLD_TENDERS_CHEST, slot: "Chest" },
      { id: WORLD_TENDERS_FEET, slot: "Feet" },
    ]);
    const effect = set.effectList.find((entry) => entry.name === "Root Warden's Regalia");

    const player = new Player("Tester", "Preservation Evoker", 1, "US", "Stonemaul", "Dracthyr", "default", "Retail");
    const bonusStats = getEffectValue(effect, player, player.getActiveModel("Raid"), "Raid", effect.level, effectSettings, "Retail", {}, {});

    expect(Object.keys(bonusStats).length).toBeGreaterThan(0);
    const total = Object.values(bonusStats).reduce((sum, value) => sum + (value || 0), 0);
    expect(total).toBeGreaterThan(0);
  });
});
