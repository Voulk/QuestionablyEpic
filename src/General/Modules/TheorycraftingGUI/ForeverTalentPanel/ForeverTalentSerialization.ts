import { TalentNodeData, TalentTreeState } from './ForeverTalentTypes';

import { ForeverDruidTalentData } from "General/Modules/Player/ClassDefaults/Forever/Druid/ForeverDruidTalentData.json"

export const TOTAL_TALENT_POINTS = 51;
export const POINTS_PER_ROW = 5;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// The talent data feed's own order is the serialization order (same idea as retail), so the
// calculator's layout never matters. Reordering or editing the data changes the signature below.
const orderedNodes = (talentData: TalentNodeData[], treeID: number) => talentData.filter((n) => n.treeID === treeID);

const allNodesOrdered = (talentData: TalentNodeData[]) => talentData;

// 2-char signature of the tree layout (talent ids + max points). Different classes, or edited talent
// data, produce a different signature so mismatched strings are rejected instead of misdecoded.
const layoutSignature = (talentData: TalentNodeData[]): string => {
  let hash = 2166136261;
  for (const n of allNodesOrdered(talentData)) {
    for (const ch of `${n.id}:${n.maxPoints};`) {
      hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619) >>> 0;
    }
  }
  return ALPHABET[hash % 64] + ALPHABET[(hash >>> 6) % 64];
};

/**
 * Export: a 2-char layout signature followed by the build. Every node is a digit in a mixed-radix number (radix = maxPoints + 1), first node least
 * significant so unspent trailing nodes vanish, then written in base 64. Typically ~15-20 characters.
 */
export const exportTalents = (talentData: TalentNodeData[], points: TalentTreeState): string => {
  let value = BigInt(0);
  let multiplier = BigInt(1);
  for (const node of allNodesOrdered(talentData)) {
    const radix = BigInt(node.maxPoints + 1);
    value += BigInt(Math.min(points[node.id] || 0, node.maxPoints)) * multiplier;
    multiplier *= radix;
  }

  const base = BigInt(64);
  let out = '';
  while (value > BigInt(0)) {
    out = ALPHABET[Number(value % base)] + out;
    value /= base;
  }
  return layoutSignature(talentData) + (out || 'A');
};

/**
 * Import: returns the talent data as-is with only `points` replaced by the imported values, or null if
 * the string is malformed or illegal (too many points, or a row's point requirement isn't met).
 */
export const importTalents = (talentData: TalentNodeData[], str: string): TalentNodeData[] | null => {
  if (str.length === 0) return talentData;
  const trimmed = str.trim();
  if (trimmed.length < 3 || !/^[A-Za-z0-9_-]+$/.test(trimmed)) return null;
  if (trimmed.slice(0, 2) !== layoutSignature(talentData)) return null;
  const text = trimmed.slice(2);

  const base = BigInt(64);
  let value = BigInt(0);
  for (const ch of text) value = value * base + BigInt(ALPHABET.indexOf(ch));

  const result: TalentTreeState = {};
  let total = 0;
  for (const node of allNodesOrdered(talentData)) {
    const radix = BigInt(node.maxPoints + 1);
    const pts = Number(value % radix);
    value /= radix;
    result[node.id] = pts;
    total += pts;
  }
  if (value > BigInt(0) || total > TOTAL_TALENT_POINTS) return null;

  for (let treeID = 0; treeID < 3; treeID++) {
    const rowPoints: Record<number, number> = {};
    const nodes = orderedNodes(talentData, treeID);
    nodes.forEach((n) => (rowPoints[n.y] = (rowPoints[n.y] || 0) + result[n.id]));

    for (const node of nodes) {
      if (!result[node.id]) continue;
      let before = 0;
      for (let r = 0; r < node.y; r++) before += rowPoints[r] || 0;
      if (before < node.y * POINTS_PER_ROW) return null;
    }
  }

  return talentData.map((n) => ({ ...n, points: result[n.id] }));
};
