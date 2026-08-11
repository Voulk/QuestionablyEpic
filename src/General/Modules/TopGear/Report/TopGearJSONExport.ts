import { downloadJson } from "General/Modules/TrinketAnalysis/TrinketJSONDownload";
import Item from "General/Items/Item";

const SCHEMA = "qe-live-droptimizer";
const VERSION = 1;

const parseBonusIDs = (bonusIDS: string | undefined): number[] => {
  if (!bonusIDS) return [];
  return bonusIDS
    .split(":")
    .map((s) => parseInt(s, 10))
    .filter((n) => !Number.isNaN(n));
};

const serializeItem = (item: Item, enchants: { [key: string]: any }) => {
  const enchant = enchants && item.slot in enchants ? enchants[item.slot] : "";
  return {
    slot: item.slot,
    id: item.id,
    level: item.level,
    bonusIDs: parseBonusIDs(item.bonusIDS),
    gems: item.socketedGems || [],
    enchant: typeof enchant === "string" ? enchant : "",
    tertiary: item.tertiary || "",
    setId: item.setID || 0,
    isVault: !!item.vaultItem,
    isExclusive: !!item.exclusiveItem,
    source: item.source || {},
  };
};

export const exportTopGearJSON = (result: any, player: any): string => {
  const topSet = result.itemSet;
  const enchants = topSet.enchantBreakdown || {};

  const fullItemList: Item[] = topSet.itemList || [];
  const chosenItems = fullItemList.filter((i) => (i as any).isChosen);
  const topItems = chosenItems.length > 0 ? chosenItems : fullItemList;

  // A differential is { items: Item[] (items in the alt set that differ from prime, by slot index),
  //                     gems: number[] (differing gem IDs),
  //                     scoreDifference: number (% — positive means alt is worse),
  //                     rawDifference: number (HPS — negative means alt is worse) }
  const differentials = (result.differentials || []).map((diff: any) => ({
    scorePercent: diff.scoreDifference ?? 0,
    hpsDifference: diff.rawDifference ?? 0,
    items: (diff.items || []).map((it: Item) => serializeItem(it, enchants)),
    gems: diff.gems || [],
  }));

  const payload = {
    schema: SCHEMA,
    version: VERSION,
    exportedAt: new Date().toISOString(),
    player: {
      name: player?.name || "",
      realm: player?.realm || "",
      region: player?.region || "",
      spec: player?.spec || "",
      gameType: player?.spec?.includes("Classic") ? "Classic" : "Retail",
    },
    contentType: result.contentType || "",
    reportId: result.id || "",
    topSet: {
      score: topSet.hardScore || 0,
      stats: topSet.setStats || {},
      items: topItems.map((it) => serializeItem(it, enchants)),
    },
    differentials,
  };

  return JSON.stringify(payload, null, 2);
};

export const downloadTopGearJSON = (result: any, player: any) => {
  const json = exportTopGearJSON(result, player);
  const safeName = (player?.name || "character").replace(/[^a-zA-Z0-9_-]/g, "");
  const filename = `qe-droptimizer-${safeName}-${result.id || "export"}.json`;
  downloadJson(json, filename);
};
