import Item from "General/Items/Item";
import ItemSet from "General/Modules/TopGear/ItemSet";
import { isEmbellished, getForcedEmbellishmentCount, MAX_EMBELLISHMENTS } from "General/Engine/ItemUtilities";

/*
  Only two embellishments can be worn at once, and ItemSet.verifySet throws out any set that exceeds it. That's
  correct, but it used to happen invisibly: a player already wearing two embellishments who added a third
  embellished item (typically a crafted weapon) had it silently dropped from every set. If the new item was their
  only option in its slot, every set failed verification and Top Gear returned an empty report with no explanation.
*/

const CRAFTED_MAIL_CHEST = 244578;
const CRAFTED_2H = 245770; // Aln'hara Cane
const CRAFTED_OFFHAND = 245769; // Aln'hara Lantern
const PLAIN_2H = 268205; // Venomancer's Winged Channeler, raid drop with no embellishment

const embellished = (id, slot, level = 330) => {
  const item = new Item(id, "", slot, 0, "", 0, level, "");
  item.effect = { type: "embellishment", name: "Arcanoweave Lining", level: level };
  item.uniqueEquip = "embellishment"; // what ItemBar sets when an embellishment is chosen
  return item;
};

const plain = (id, slot, level = 330) => new Item(id, "", slot, 0, "", 0, level, "");

describe("isEmbellished", () => {
  test("detects an embellishment applied through the item bar", () => {
    expect(isEmbellished(embellished(CRAFTED_MAIL_CHEST, "Chest"))).toBe(true);
  });

  test("detects an embellishment baked into the item", () => {
    // Axe-Flingin' Bands carries its embellishment inherently rather than having one applied.
    expect(isEmbellished(new Item(244605, "", "Wrist", 0, "", 0, 330, ""))).toBe(true);
  });

  test("a plain item is not embellished", () => {
    expect(isEmbellished(plain(PLAIN_2H, "2H Weapon"))).toBe(false);
    expect(isEmbellished(null)).toBe(false);
  });
});

describe("A set over the embellishment cap is rejected", () => {
  const buildSet = (items) => new ItemSet(1, items, 0, "Preservation Evoker").compileStats("Retail", {});

  test("two embellishments is fine", () => {
    const set = buildSet([embellished(CRAFTED_MAIL_CHEST, "Chest"), embellished(244584, "Wrist")]);

    expect(set.uniques["embellishment"]).toEqual(MAX_EMBELLISHMENTS);
    expect(set.verifySet({})).toBe(true);
  });

  test("three embellishments is rejected, which is what hides the third item", () => {
    const set = buildSet([
      embellished(CRAFTED_MAIL_CHEST, "Chest"),
      embellished(244584, "Wrist"),
      embellished(CRAFTED_2H, "2H Weapon", 331),
    ]);

    expect(set.uniques["embellishment"]).toEqual(3);
    expect(set.verifySet({})).toBe(false);
  });
});

describe("getForcedEmbellishmentCount spots the unwinnable case up front", () => {
  test("counts slots where every selected option is embellished", () => {
    const items = [
      embellished(CRAFTED_MAIL_CHEST, "Chest"), // only chest, embellished -> forced
      embellished(244584, "Wrist"), // only wrist, embellished -> forced
      embellished(CRAFTED_2H, "2H Weapon", 331), // only weapon, embellished -> forced
    ];

    expect(getForcedEmbellishmentCount(items)).toEqual(3);
    expect(getForcedEmbellishmentCount(items)).toBeGreaterThan(MAX_EMBELLISHMENTS);
  });

  test("a slot with a non-embellished alternative is not forced", () => {
    const items = [
      embellished(CRAFTED_MAIL_CHEST, "Chest"),
      embellished(244584, "Wrist"),
      embellished(CRAFTED_2H, "2H Weapon", 331),
      plain(PLAIN_2H, "2H Weapon"), // gives the weapon slot a way out
    ];

    expect(getForcedEmbellishmentCount(items)).toEqual(2);
    expect(getForcedEmbellishmentCount(items)).toBeLessThanOrEqual(MAX_EMBELLISHMENTS);
  });

  test("weapons and offhands count as a single slot, since a set only takes one combination", () => {
    const items = [
      embellished(CRAFTED_2H, "2H Weapon", 331),
      embellished(CRAFTED_OFFHAND, "Offhand", 331),
    ];

    // Two embellished weapon-side items are one forced slot, not two.
    expect(getForcedEmbellishmentCount(items)).toEqual(1);
  });

  test("a fully plain set forces nothing", () => {
    expect(getForcedEmbellishmentCount([plain(PLAIN_2H, "2H Weapon"), plain(244578, "Chest")])).toEqual(0);
  });

  test("an empty selection forces nothing", () => {
    expect(getForcedEmbellishmentCount([])).toEqual(0);
  });
});
