import { URL_TO_SPEC } from "./SpecTrinketsPage";

const specToSlug = (spec) => spec.toLowerCase().replace(/ /g, "");

describe("URL_TO_SPEC slug mapping", () => {
  test("primary slugs resolve to correct spec names", () => {
    expect(URL_TO_SPEC["holypriest"]).toBe("Holy Priest");
    expect(URL_TO_SPEC["disciplinepriest"]).toBe("Discipline Priest");
    expect(URL_TO_SPEC["restoshaman"]).toBe("Restoration Shaman");
    expect(URL_TO_SPEC["restodruid"]).toBe("Restoration Druid");
    expect(URL_TO_SPEC["presevoker"]).toBe("Preservation Evoker");
    expect(URL_TO_SPEC["mwmonk"]).toBe("Mistweaver Monk");
    expect(URL_TO_SPEC["holypaladin"]).toBe("Holy Paladin");
  });

  test("long-form aliases resolve to the same spec as their short-form", () => {
    expect(URL_TO_SPEC["restorationshaman"]).toBe(URL_TO_SPEC["restoshaman"]);
    expect(URL_TO_SPEC["restorationdruid"]).toBe(URL_TO_SPEC["restodruid"]);
    expect(URL_TO_SPEC["preservationevoker"]).toBe(URL_TO_SPEC["presevoker"]);
    expect(URL_TO_SPEC["mistweavermonk"]).toBe(URL_TO_SPEC["mwmonk"]);
  });

  test("classic specs resolve correctly", () => {
    expect(URL_TO_SPEC["holypriestclassic"]).toBe("Holy Priest Classic");
    expect(URL_TO_SPEC["disciplinepriestclassic"]).toBe("Discipline Priest Classic");
    expect(URL_TO_SPEC["restoshamanclassic"]).toBe("Restoration Shaman Classic");
    expect(URL_TO_SPEC["restodruidclassic"]).toBe("Restoration Druid Classic");
    expect(URL_TO_SPEC["mwmonkclassic"]).toBe("Mistweaver Monk Classic");
    expect(URL_TO_SPEC["holypaladinclassic"]).toBe("Holy Paladin Classic");
  });

  test("unknown slug returns undefined", () => {
    expect(URL_TO_SPEC["shadowpriest"]).toBeUndefined();
    expect(URL_TO_SPEC["warrior"]).toBeUndefined();
    expect(URL_TO_SPEC[""]).toBeUndefined();
  });
});

describe("spec name to URL slug (reverse direction)", () => {
  test("spec names convert to the expected slug", () => {
    expect(specToSlug("Holy Priest")).toBe("holypriest");
    expect(specToSlug("Restoration Shaman")).toBe("restorationshaman");
    expect(specToSlug("Preservation Evoker")).toBe("preservationevoker");
    expect(specToSlug("Mistweaver Monk")).toBe("mistweavermonk");
  });

  test("slug round-trips back to the correct spec via URL_TO_SPEC", () => {
    const specs = [
      "Holy Priest",
      "Discipline Priest",
      "Restoration Shaman",
      "Restoration Druid",
      "Preservation Evoker",
      "Mistweaver Monk",
      "Holy Paladin",
    ];
    specs.forEach((spec) => {
      const slug = specToSlug(spec);
      expect(URL_TO_SPEC[slug]).toBe(spec);
    });
  });
});
