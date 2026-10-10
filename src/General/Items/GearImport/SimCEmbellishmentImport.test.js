import Player from "General/Modules/Player/Player";
import { processItem } from "General/Items/GearImport/SimCImportEngine";
import { embellishmentDB } from "Databases/EmbellishmentDB";

/*
  The SimC importer used to check the incoming spell name against a hardcoded list of eight embellishments.
  Anything outside that list was parsed and then silently discarded, so the item imported as a plain stat stick
  and Top Gear scored it as one. These cover the embellishments an Evoker can realistically import.
*/

const player = new Player("Tester", "Preservation Evoker", 1, "US", "Stonemaul", "Dracthyr", "default", "Retail");
const settings = {};

// Bonus IDs that carry each embellishment's spell, taken from BonusIDs.ts.
const EMBELLISHMENT_BONUS_IDS = {
  "Adorned Fang": 13767,
  "Sunfire Silk Lining": 12385,
  "Arcanoweave Lining": 12384,
  "Hunter's Ritual Stone": 13771,
  "Blessed Pango Charm": 12686,
  "Primal Spore Binding": 12687,
  "Darkmoon Sigil: Hunt": 12693,
  "Darkmoon Sigil: Void": 13640,
  "Darkmoon Sigil: Blood": 12705,
};

// A crafted mail chest and a crafted dagger, both usable by a Preservation Evoker.
const CRAFTED_MAIL_CHEST = 244578;
const CRAFTED_DAGGER = 237838;

const importItem = (itemID, slotName, bonusID) => {
  const line = `${slotName}=,id=${itemID},bonus_id=12052/${bonusID},crafted_stats=36/49,crafting_quality=5`;
  return processItem(line, player, "Raid", "", settings, false, false);
};

describe("SimC import keeps embellishments instead of dropping them", () => {
  test("an embellishment that was already on the old allowlist still imports", () => {
    const item = importItem(CRAFTED_MAIL_CHEST, "chest", EMBELLISHMENT_BONUS_IDS["Arcanoweave Lining"]);

    expect(item).toBeTruthy();
    expect(item.effect).toBeTruthy();
    expect(item.effect.type).toEqual("embellishment");
    expect(item.effect.name).toEqual("Arcanoweave Lining");
  });

  test("Adorned Fang imports - it was offered in the UI but dropped on import", () => {
    const item = importItem(CRAFTED_MAIL_CHEST, "chest", EMBELLISHMENT_BONUS_IDS["Adorned Fang"]);

    expect(item.effect).toBeTruthy();
    expect(item.effect.name).toEqual("Adorned Fang");
  });

  test("Hunter's Ritual Stone imports onto a weapon", () => {
    const item = importItem(CRAFTED_DAGGER, "main_hand", EMBELLISHMENT_BONUS_IDS["Hunter's Ritual Stone"]);

    expect(item.effect).toBeTruthy();
    expect(item.effect.name).toEqual("Hunter's Ritual Stone");
  });

  test("Darkmoon Sigils resolve from their bare spell name to the full embellishment name", () => {
    ["Darkmoon Sigil: Hunt", "Darkmoon Sigil: Void", "Darkmoon Sigil: Blood"].forEach((name) => {
      const item = importItem(CRAFTED_DAGGER, "main_hand", EMBELLISHMENT_BONUS_IDS[name]);

      expect(item.effect).toBeTruthy();
      expect(item.effect.name).toEqual(name);
    });
  });

  test("every imported embellishment name matches an entry in EmbellishmentDB", () => {
    // A name that doesn't match the DB scores as a flat zero, which is the failure mode this guards against.
    Object.entries(EMBELLISHMENT_BONUS_IDS).forEach(([name, bonusID]) => {
      const slot = name.includes("Sigil") || name.includes("Ritual Stone") ? "main_hand" : "chest";
      const itemID = slot === "main_hand" ? CRAFTED_DAGGER : CRAFTED_MAIL_CHEST;
      const item = importItem(itemID, slot, bonusID);

      expect(item.effect).toBeTruthy();
      expect(embellishmentDB.some((embel) => embel.effect.name === item.effect.name)).toBe(true);
    });
  });

  test("a crafted item with no embellishment bonus ID imports without an effect", () => {
    const line = `chest=,id=${CRAFTED_MAIL_CHEST},bonus_id=12052,crafted_stats=36/49,crafting_quality=5`;
    const item = processItem(line, player, "Raid", "", settings, false, false);

    expect(item).toBeTruthy();
    expect(item.effect).toBeFalsy();
  });
});
