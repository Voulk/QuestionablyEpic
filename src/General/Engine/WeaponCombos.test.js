import Player from "General/Modules/Player/Player";
import Item from "General/Items/Item";
import { buildNewWepCombos, getValidWeaponTypesBySpec, getItemProp } from "General/Engine/ItemUtilities";

/*
  Weapon combinations for Top Gear.

  Top Gear doesn't take weapons from the per-slot item lists - they arrive as pre-built combos, and the set builder
  loops `weapon < wepCombos.length`. That means a weapon missing from this list isn't just excluded from the
  comparison: if it was the only weapon selected there are zero combos, the loop body never runs, and Top Gear
  produces no sets at all. A one handed weapon used to be dropped whenever the player hadn't also selected an
  offhand, so adding a single one hander returned an empty report.
*/

const ONE_HANDER = 271092; // Jan'thrazet, the Soul Fang - dagger, current raid
const TWO_HANDER = 245770; // Aln'hara Cane - crafted staff
const OFFHAND = 245769; // Aln'hara Lantern - crafted offhand

const makePlayer = () => new Player("Tester", "Preservation Evoker", 1, "US", "Stonemaul", "Dracthyr", "default", "Retail");

const withWeapons = (weapons) => {
  const player = makePlayer();
  weapons.forEach(([id, slot, level]) => player.activeItems.push(new Item(id, "", slot, 0, "", 0, level, "")));
  player.activateAll();
  return buildNewWepCombos(player, true);
};

const slotsOf = (combos) => combos.map((combo) => combo.map((item) => item.slot));

describe("Preservation Evoker can use these weapons at all", () => {
  test("the test weapons are the shapes this suite assumes", () => {
    expect(getItemProp(ONE_HANDER, "slot")).toEqual("1H Weapon");
    expect(getItemProp(TWO_HANDER, "slot")).toEqual("2H Weapon");
    expect(getItemProp(OFFHAND, "slot")).toEqual("Offhand");
  });

  test("their subclasses are all usable by the spec", () => {
    const usable = getValidWeaponTypesBySpec("Preservation Evoker");

    expect(usable).toContain(getItemProp(ONE_HANDER, "itemSubClass")); // daggers
    expect(usable).toContain(getItemProp(TWO_HANDER, "itemSubClass")); // staves
  });
});

describe("Every selected weapon reaches Top Gear", () => {
  test("a two hander on its own is offered", () => {
    const combos = withWeapons([[TWO_HANDER, "2H Weapon", 331]]);

    expect(combos.length).toEqual(1);
    expect(slotsOf(combos)).toEqual([["2H Weapon"]]);
  });

  test("a one hander on its own is offered, with an empty offhand", () => {
    const combos = withWeapons([[ONE_HANDER, "1H Weapon", 334]]);

    // Regression: this used to be 0, which produced no sets and therefore a completely empty report.
    expect(combos.length).toEqual(1);
    expect(slotsOf(combos)).toEqual([["1H Weapon"]]);
  });

  test("a one hander pairs with an offhand when one is selected", () => {
    const combos = withWeapons([
      [ONE_HANDER, "1H Weapon", 334],
      [OFFHAND, "Offhand", 331],
    ]);

    expect(combos.length).toEqual(1);
    expect(slotsOf(combos)).toEqual([["1H Weapon", "Offhand"]]);
  });

  test("an unpaired one hander is not dropped just because a two hander exists", () => {
    const combos = withWeapons([
      [ONE_HANDER, "1H Weapon", 334],
      [TWO_HANDER, "2H Weapon", 331],
    ]);

    // Regression: this used to return only the two hander, so the one hander was never compared.
    expect(combos.length).toEqual(2);
    expect(slotsOf(combos)).toEqual(expect.arrayContaining([["1H Weapon"], ["2H Weapon"]]));
  });

  test("a one hander is paired rather than offered bare when both are available", () => {
    const combos = withWeapons([
      [ONE_HANDER, "1H Weapon", 334],
      [OFFHAND, "Offhand", 331],
      [TWO_HANDER, "2H Weapon", 331],
    ]);

    expect(combos.length).toEqual(2);
    expect(slotsOf(combos)).toEqual(expect.arrayContaining([["1H Weapon", "Offhand"], ["2H Weapon"]]));
    // The bare fallback must not fire when a real pairing exists.
    expect(slotsOf(combos)).not.toContainEqual(["1H Weapon"]);
  });

  test("every selected weapon appears somewhere in the combo list", () => {
    const combos = withWeapons([
      [ONE_HANDER, "1H Weapon", 334],
      [TWO_HANDER, "2H Weapon", 331],
      [OFFHAND, "Offhand", 331],
    ]);
    const ids = combos.reduce((acc, combo) => acc.concat(combo.map((item) => item.id)), []);

    [ONE_HANDER, TWO_HANDER, OFFHAND].forEach((id) => expect(ids).toContain(id));
  });

  test("no weapons selected still means no combos", () => {
    expect(withWeapons([]).length).toEqual(0);
  });
});
