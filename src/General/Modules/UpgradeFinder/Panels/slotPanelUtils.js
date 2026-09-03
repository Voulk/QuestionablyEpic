export const RETAIL_SLOT_SOURCES = ["Raid", "Dungeon", "Crafted", "Delves"];
export const CLASSIC_SLOT_SOURCES = ["Raid", "Dungeon"];
export const DEFAULT_ITEM_TYPES = ["Drop", "Upgraded", "Bonus Roll"];

const ITEM_TYPE_TO_DROP_TYPE = {
  Drop: "drop",
  "Bonus Roll": "bonus",
  Upgraded: "max",
};

export function getSlotSourceOptions(gameType) {
  return gameType === "Classic" ? CLASSIC_SLOT_SOURCES : RETAIL_SLOT_SOURCES;
}

export function filterItemListBySlot(itemList, slot, itemTypesEnabled = DEFAULT_ITEM_TYPES) {
  const excludedInstance = [748, 749, 750, 751, 321, 752];
  const enabledDropTypes = new Set(
    (itemTypesEnabled || DEFAULT_ITEM_TYPES).map((itemType) => ITEM_TYPE_TO_DROP_TYPE[itemType]).filter(Boolean)
  );

  return itemList.filter((item) => {
    if (item.dropType && !enabledDropTypes.has(item.dropType)) {
      return false;
    }

    if (!("source" in item) || excludedInstance.includes(item.source.instanceId) || item.source.encounterId === 249) {
      return false;
    }

    if (slot === "AllMainhands") {
      return item.slot === "1H Weapon" || item.slot === "2H Weapon";
    }
    if (slot === "Offhands") {
      return item.slot === "Holdable" || item.slot === "Offhand" || item.slot === "Shield";
    }
    return item.slot === slot;
  });
}

export function filterItemsBySource(itemList, sourcesEnabled) {
  if (!sourcesEnabled || sourcesEnabled.length === 0) {
    return [];
  }

  const enabled = new Set(sourcesEnabled);
  return itemList.filter((item) => !item.dropLoc || enabled.has(item.dropLoc));
}

export function getSlotItems(itemList, slot, itemTypesEnabled, sourcesEnabled) {
  const bySlot = filterItemListBySlot(itemList, slot, itemTypesEnabled);
  return filterItemsBySource(bySlot, sourcesEnabled).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.level || 0) - (a.level || 0);
  });
}
