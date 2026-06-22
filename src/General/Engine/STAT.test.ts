import { getMasteryPercentage, STATCONVERSION } from "./STAT";

describe("getMasteryPercentage", () => {
  test("returns 0 when stat quantity is 0", () => {
    expect(getMasteryPercentage(0, "Restoration Druid")).toBe(0);
  });

  test("Restoration Druid", () => {
    // 460 / 46 * 1.42 = 14.2
    expect(getMasteryPercentage(460, "Restoration Druid")).toBeCloseTo(14.2, 5);
  });

  test("Holy Paladin", () => {
    // 460 / 46 * 1.5 = 15
    expect(getMasteryPercentage(460, "Holy Paladin")).toBeCloseTo(15, 5);
  });

  test("Holy Priest", () => {
    // 460 / 46 * 0.908437 ≈ 9.08437
    expect(getMasteryPercentage(460, "Holy Priest")).toBeCloseTo(9.08437, 3);
  });

  test("Mistweaver Monk has highest mastery multiplier", () => {
    // 460 / 46 * 13.86 = 138.6
    expect(getMasteryPercentage(460, "Mistweaver Monk")).toBeCloseTo(138.6, 3);
  });

  test("Restoration Shaman", () => {
    // 460 / 46 * 3 = 30
    expect(getMasteryPercentage(460, "Restoration Shaman")).toBeCloseTo(30, 5);
  });

  test("doubles linearly with doubled stat quantity", () => {
    const single = getMasteryPercentage(460, "Restoration Druid");
    const doubled = getMasteryPercentage(920, "Restoration Druid");
    expect(doubled).toBeCloseTo(single * 2, 5);
  });

  test("uses MASTERY conversion constant of 46", () => {
    expect(STATCONVERSION.MASTERY).toBe(46);
  });
});
