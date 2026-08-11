import { CONSTANTS } from "General/Engine/CONSTANTS";

const specToSlug = (spec) => spec.toLowerCase().replace(/ /g, "");
const slugToSpec = (slug) =>
  [...CONSTANTS.specs, ...CONSTANTS.classicSpecs].find(
    (s) => s.toLowerCase().replace(/\s+/g, "") === slug.toLowerCase()
  );

describe("spec slug mapping", () => {
  test("full-form slugs resolve to correct spec names", () => {
    expect(slugToSpec("holypriest")).toBe("Holy Priest");
    expect(slugToSpec("disciplinepriest")).toBe("Discipline Priest");
    expect(slugToSpec("restorationshaman")).toBe("Restoration Shaman");
    expect(slugToSpec("restorationdruid")).toBe("Restoration Druid");
    expect(slugToSpec("preservationevoker")).toBe("Preservation Evoker");
    expect(slugToSpec("mistweavermonk")).toBe("Mistweaver Monk");
    expect(slugToSpec("holypaladin")).toBe("Holy Paladin");
  });

  test("classic specs resolve correctly", () => {
    expect(slugToSpec("holypriestclassic")).toBe("Holy Priest Classic");
    expect(slugToSpec("disciplinepriestclassic")).toBe("Discipline Priest Classic");
    expect(slugToSpec("restorationshamanclassic")).toBe("Restoration Shaman Classic");
    expect(slugToSpec("restorationdruidclassic")).toBe("Restoration Druid Classic");
    expect(slugToSpec("mistweavermonkclassic")).toBe("Mistweaver Monk Classic");
    expect(slugToSpec("holypaladinclassic")).toBe("Holy Paladin Classic");
  });

  test("unknown slug returns undefined", () => {
    expect(slugToSpec("shadowpriest")).toBeUndefined();
    expect(slugToSpec("warrior")).toBeUndefined();
    expect(slugToSpec("")).toBeUndefined();
  });

  test("slug round-trips back to the correct spec", () => {
    [...CONSTANTS.specs, ...CONSTANTS.classicSpecs].forEach((spec) => {
      const slug = specToSlug(spec);
      expect(slugToSpec(slug)).toBe(spec);
    });
  });
});
