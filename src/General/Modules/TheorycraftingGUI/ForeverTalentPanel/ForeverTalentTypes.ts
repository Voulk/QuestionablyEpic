export interface TalentNodeData {
  id: number;
  spellName: string;
  treeID: number; // 0: Balance, 1: Feral, 2: Restoration
  x: number; // Column index (0 to 3)
  y: number; // Row index (0 to 6)
  maxPoints: number;
  points: number;
  talentValues?: number[];
  iconName: string;
}

export interface ForeverTalent {
  id: number;
  points: number;
  talentValues: number[];
}

export type TalentTreeState = Record<number, number>; // Maps node `id` to current allocated points