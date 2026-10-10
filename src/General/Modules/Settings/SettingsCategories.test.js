import { SETTINGS_CATEGORIES } from "./SettingsComponent";
import rootReducer from "Redux/Reducers/RootReducer";
import translations from "locale/en/translate.json";

/*
  Settings are grouped by a `category` field, but the panel renders a hardcoded list of categories. A setting whose
  category is missing from that list is stored in Redux, is fully wired to the engine, and never appears in the UI -
  with no error anywhere. That's exactly how the Omnium Folio dropdowns shipped invisible.
*/

const playerSettings = rootReducer(undefined, { type: "@@INIT" }).playerSettings;
const settingsFor = (gameType) => Object.entries(playerSettings).filter(([, v]) => v.gameType === gameType);

describe("Every setting is reachable in the UI", () => {
  ["Retail", "Classic"].forEach((gameType) => {
    test(`${gameType}: every category that has settings is rendered`, () => {
      const used = [...new Set(settingsFor(gameType).map(([, v]) => v.category))];
      const rendered = SETTINGS_CATEGORIES[gameType];

      const orphaned = used.filter((c) => !rendered.includes(c));
      expect(orphaned).toEqual([]);
    });

    test(`${gameType}: no rendered category is empty`, () => {
      const used = new Set(settingsFor(gameType).map(([, v]) => v.category));
      // A listed category with nothing in it would draw a bare heading.
      const empty = SETTINGS_CATEGORIES[gameType].filter((c) => !used.has(c));
      expect(empty).toEqual([]);
    });
  });

  test("every setting declares a category and a gameType", () => {
    const malformed = Object.entries(playerSettings)
      .filter(([, v]) => !v.category || !v.gameType)
      .map(([k]) => k);
    expect(malformed).toEqual([]);
  });
});

describe("Every setting is labelled", () => {
  const retailStrings = translations.translations.Settings.Retail;

  test("each category has a heading string", () => {
    const missing = SETTINGS_CATEGORIES.Retail.filter((c) => !retailStrings[c]);
    expect(missing).toEqual([]);
  });

  test("each Retail setting has a title and tooltip", () => {
    const missing = settingsFor("Retail")
      .map(([k]) => k)
      .filter((k) => !retailStrings[k] || !retailStrings[k].title || !retailStrings[k].tooltip);
    expect(missing).toEqual([]);
  });
});
