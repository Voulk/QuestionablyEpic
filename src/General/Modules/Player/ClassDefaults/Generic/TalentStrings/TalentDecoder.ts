import talentData from "./RaidbotsTalentData.json";

/** 
 * Mapping for Blizzard's specific Base64 alphabet 
 */
const BASE64_CHAR: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_CHAR_VALUE: Record<string, number> = Object.fromEntries(
  [...BASE64_CHAR].map((char, i) => [char, i])
);

/** 
 * Blizzard Talent Bit Constants 
 */
const BYTE_SIZE = 6;
const VERSION_BITS = 8;
const SPEC_BITS = 16;
const TREE_BITS = 128;
const RANK_BITS = 6;
const CHOICE_BITS = 2;

/**
 * Data Interfaces
 */
interface TalentEntry {
  id: number;
  name: string;
}

interface TalentNode {
  id: number;
  name: string;
  maxRanks: number;
  type: 'tiered' | 'choice' | 'subtree' | 'standard';
  entries: TalentEntry[];
}

interface DecodedTalent {
  nodeId: number;
  nodeName: string;
  rank: number;
  entryName?: string;
  entryId?: number;
}

interface DecodingResult {
  version: number;
  specId: number;
  selectedTalents: DecodedTalent[];
}

export function getSpecTalentData(specId: number): any {
  // This function should return the talent data for the given specId.
  const specRaw = talentData.find(node => node.specId === specId);
  if (!specRaw) {
    throw new Error(`Spec ID ${specId} not found in talent data.`);
  }

  const nodeData = specRaw.classNodes.concat(specRaw.specNodes).concat(specRaw.heroNodes);

  return {nodeOrder: specRaw.fullNodeOrder, nodes: nodeData};
}

const getNodeById = (data: TalentNode[], nodeId: number): TalentNode | undefined => {
      return data.find((node: TalentNode) => node.id === nodeId);
}

/**
 * Decodes a Blizzard talent string into a structured list of selected talents.
 */
export function decodeBlizzardString(
  talentString: string,
  spec: number,
): DecodingResult | null {
  if (!talentString) return null;

  let head = 0;
  const specData = getSpecTalentData(spec);
  const fullNodeOrder: number[] = specData.nodeOrder;
  const specNodes: TalentNode[] = specData.nodes;

  // Helper function to extract N bits from the Base64 stream
  const getBits = (bits: number): number => {
    let value = 0;
    for (let i = 0; i < bits; i++) {
      const pos = Math.floor(head / BYTE_SIZE);
      const char = talentString[pos];
      
      if (!char) return 0; // End of string safety

      const byte = BASE64_CHAR_VALUE[char];
      const bit = head % BYTE_SIZE;

      // Extract the bit at current position and shift it into the result
      value += ((byte >> bit) & 0b1) << i;
      head++;
    }
    return value;
  };

  // 1. Parse Metadata Header
  const version = getBits(VERSION_BITS);
  const specId = getBits(SPEC_BITS);
  const _treeHash = getBits(TREE_BITS); // Read and discard hash

  const selectedTalents: DecodedTalent[] = [];

  // 2. Iterate through nodes in the exact order defined by the game data
  for (const nodeId of fullNodeOrder) {
    const node = getNodeById(specNodes, nodeId);

    
    // Bit: Is the node active?
    const isSelected = getBits(1) === 1;

    if (isSelected) {
      // Bit: Is the node purchased (point spent)?
      const isPurchased = getBits(1) === 1;

      if (isPurchased) {
        let rank = node?.maxRanks || 1;
        let choiceEntryIndex = 0;

        // Bit: Is this a partial rank? (e.g. 1/2 points)
        const isRanked = getBits(1) === 1;
        if (isRanked) {
          rank = getBits(RANK_BITS);
        } else if (node?.type === 'tiered') {
          rank = node.maxRanks;
        }

        // Bit: Is this a choice node or subtree?
        const isChoice = getBits(1) === 1;
        if (isChoice) {
          choiceEntryIndex = getBits(CHOICE_BITS);
        }

        const entry = node?.entries?.[choiceEntryIndex];

        selectedTalents.push({
          nodeId,
          nodeName: node?.name || "Unknown Node",
          rank,
          entryName: entry?.name,
          entryId: entry?.id
        });
      }
    }
  }

  return {
    version,
    specId,
    selectedTalents
  };
}