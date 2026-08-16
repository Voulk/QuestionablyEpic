/**
 * Mythic+ key → loot outcomes for Upgrade Finder (Midnight Season 2 spreadsheet).
 * Vault and Nebulous Voidcore bonus rolls share the same track/ilvl per key.
 *
 * Tracks: Champion →308 · Hero →321 · Myth →334 (6/6); some raid bosses drop above 334
 */

export type UpgradeTrack = "Champion" | "Hero" | "Myth";

export const TRACK_CAPS: Record<UpgradeTrack, number> = {
  Champion: 308,
  Hero: 321,
  Myth: 334, // 6/6 Myth; some raid bosses drop above this
};

export type MPlusKeyReward = {
  index: number;
  label: string;
  endIlvl: number;
  endTrack: UpgradeTrack;
  vaultIlvl: number;
  vaultTrack: UpgradeTrack;
};

export const MPLUS_KEY_REWARDS: MPlusKeyReward[] = [
  { index: 0, label: "M0", endIlvl: 292, endTrack: "Champion", vaultIlvl: 302, vaultTrack: "Champion" },
  { index: 1, label: "+2/3", endIlvl: 295, endTrack: "Champion", vaultIlvl: 305, vaultTrack: "Hero" },
  { index: 2, label: "+4", endIlvl: 298, endTrack: "Champion", vaultIlvl: 308, vaultTrack: "Hero" },
  { index: 3, label: "+5", endIlvl: 302, endTrack: "Champion", vaultIlvl: 308, vaultTrack: "Hero" },
  { index: 4, label: "+6", endIlvl: 305, endTrack: "Hero", vaultIlvl: 311, vaultTrack: "Hero" },
  { index: 5, label: "+7", endIlvl: 305, endTrack: "Hero", vaultIlvl: 315, vaultTrack: "Hero" },
  { index: 6, label: "+8/9", endIlvl: 308, endTrack: "Hero", vaultIlvl: 315, vaultTrack: "Hero" },
  { index: 7, label: "+10", endIlvl: 311, endTrack: "Hero", vaultIlvl: 318, vaultTrack: "Myth" },
];

export const DEFAULT_MPLUS_KEY_INDEX = 7; // +10

/** Map legacy slider indices (which mixed vault ilvls onto the same axis) onto key-only indices. */
export const UF_DUNGEON_DIFFICULTY_VERSION = 2;

export function migrateUfDungeonDifficulty(stored: number): number {
  const oldToNew = [0, 1, 2, 3, 4, 6, 7];
  if (Number.isInteger(stored) && stored >= 0 && stored < oldToNew.length) {
    return oldToNew[stored];
  }
  if (Number.isInteger(stored) && stored >= 0 && stored < MPLUS_KEY_REWARDS.length) {
    return stored;
  }
  return DEFAULT_MPLUS_KEY_INDEX;
}

/** One-time migrate from the old slider index space; safe to call every mount after version is stamped. */
export function loadUfDungeonDifficulty(): number {
  const versionRaw = sessionStorage.getItem("ufDungeonDifficultyVersion");
  const version = versionRaw ? JSON.parse(versionRaw) : 1;
  const stored = (() => {
    const raw = sessionStorage.getItem("ufDungeonDifficulty");
    if (!raw) return DEFAULT_MPLUS_KEY_INDEX;
    return JSON.parse(raw);
  })();

  if (version < UF_DUNGEON_DIFFICULTY_VERSION) {
    const migrated = migrateUfDungeonDifficulty(stored);
    sessionStorage.setItem("ufDungeonDifficultyVersion", JSON.stringify(UF_DUNGEON_DIFFICULTY_VERSION));
    sessionStorage.setItem("ufDungeonDifficulty", JSON.stringify(migrated));
    return migrated;
  }

  if (Number.isInteger(stored) && stored >= 0 && stored < MPLUS_KEY_REWARDS.length) {
    return stored;
  }
  return DEFAULT_MPLUS_KEY_INDEX;
}

export function getMPlusKeyReward(keyIndex: number): MPlusKeyReward {
  return MPLUS_KEY_REWARDS[keyIndex] ?? MPLUS_KEY_REWARDS[DEFAULT_MPLUS_KEY_INDEX];
}

/** drop = end-of-run; max = end track cap; bonus = vault/bonus-roll track cap */
export function getMPlusItemLevel(keyIndex: number, difficultyType: string = "drop"): number {
  const key = getMPlusKeyReward(keyIndex);
  if (difficultyType === "max") return TRACK_CAPS[key.endTrack];
  if (difficultyType === "bonus") return TRACK_CAPS[key.vaultTrack];
  return key.endIlvl;
}

export function mplusEndAndVaultSameTrack(keyIndex: number): boolean {
  const key = getMPlusKeyReward(keyIndex);
  return key.endTrack === key.vaultTrack;
}
