import React, { useMemo, useState } from 'react';
import { TalentNodeData, TalentTreeState } from './ForeverTalentTypes';
import WowheadTooltip from 'General/Modules/GeneralComponents/WowheadTooltip';

import { TOTAL_TALENT_POINTS, POINTS_PER_ROW, exportTalents, importTalents } from './ForeverTalentSerialization';

const NUM_COLUMNS = 4;
const NUM_ROWS = 7;

const TREE_NAMES: Record<string, string[]> = {
  Druid: ['Balance', 'Feral Combat', 'Restoration'],
};

export const getTreeNames = (className: string): Record<number, string> => {
  const names = TREE_NAMES[className] ?? [];
  return { 0: names[0] ?? 'Tree 1', 1: names[1] ?? 'Tree 2', 2: names[2] ?? 'Tree 3' };
};

interface TalentCalculatorProps {
  talents: TalentNodeData[]; // Full talent data; each node's `points` is the current selection
  className: string;
  onTalentsChange: (talents: TalentNodeData[]) => void;
  defaultTalentString?: string; // Spec-supplied build, same format as export
}

export const TalentCalculator: React.FC<TalentCalculatorProps> = ({ talents: talentData, className, onTalentsChange, defaultTalentString }) => {
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState('');
  // Internally the panel works on an id -> points map.
  const pointsAllocated: TalentTreeState = useMemo(() => {
    const map: TalentTreeState = {};
    talentData.forEach((t) => (map[t.id] = t.points || 0));
    return map;
  }, [talentData]);

  const setPointsAllocated = (map: TalentTreeState) => {
    onTalentsChange(talentData.map((node) => ({ ...node, points: map[node.id] || 0 })));
  };

  // Calculate total spent points across all subtrees
  const totalSpentPoints = useMemo(() => {
    return Object.values(pointsAllocated).reduce((sum, p) => sum + p, 0);
  }, [pointsAllocated]);

  // Calculate spent points per subtree and per row within each subtree
  const { pointsPerTree, pointsPerRow } = useMemo(() => {
    const treeMap: Record<number, number> = { 0: 0, 1: 0, 2: 0 };
    const rowMap: Record<string, number> = {};

    talentData.forEach((node) => {
      const currentPoints = pointsAllocated[node.id] || 0;
      treeMap[node.treeID] = (treeMap[node.treeID] || 0) + currentPoints;

      const key = `${node.treeID}-${node.y}`;
      rowMap[key] = (rowMap[key] || 0) + currentPoints;
    });

    return { pointsPerTree: treeMap, pointsPerRow: rowMap };
  }, [pointsAllocated]);

  /**
   * Helper: Get total points spent in a subtree prior to a given row `targetRow`
   */
  const getSubtreePointsBeforeRow = (treeID: number, targetRow: number): number => {
    let sum = 0;
    for (let row = 0; row < targetRow; row++) {
      sum += pointsPerRow[`${treeID}-${row}`] || 0;
    }
    return sum;
  };

  /**
   * Checks if a node is unlocked and able to receive points.
   * Requirement: Row `y` requires `y * 5` total points allocated in lower rows of the same subtree.
   */
  const isNodeUnlocked = (node: TalentNodeData): boolean => {
    if (node.y === 0) return true;
    const requiredPoints = node.y * POINTS_PER_ROW;
    const pointsAvailableBefore = getSubtreePointsBeforeRow(node.treeID, node.y);
    return pointsAvailableBefore >= requiredPoints;
  };

  /**
   * Add a point to a talent node (left-click)
   */
  const handleAddPoint = (node: TalentNodeData) => {
    const currentPoints = pointsAllocated[node.id] || 0;

    if (totalSpentPoints >= TOTAL_TALENT_POINTS) return;
    if (currentPoints >= node.maxPoints) return;
    if (!isNodeUnlocked(node)) return;

    setPointsAllocated({
      ...pointsAllocated,
      [node.id]: (pointsAllocated[node.id] || 0) + 1,
    });
  };

  /**
   * Remove a point from a talent node (right-click)
   * Ensures removing a point doesn't invalidate row threshold requirements for higher tiers.
   */
  const handleRemovePoint = (node: TalentNodeData) => {
    const currentPoints = pointsAllocated[node.id] || 0;
    if (currentPoints <= 0) return;

    // Validate that removing this point won't break requirements for higher rows in this tree
    const hypotheticalAllocated = {
      ...pointsAllocated,
      [node.id]: currentPoints - 1,
    };

    // Calculate points per row under hypothetical allocation
    const hypotheticalRowPoints: Record<string, number> = {};
    talentData.forEach((n) => {
      const pts = hypotheticalAllocated[n.id] || 0;
      const key = `${n.treeID}-${n.y}`;
      hypotheticalRowPoints[key] = (hypotheticalRowPoints[key] || 0) + pts;
    });

    const getHypotheticalPointsBefore = (treeID: number, targetRow: number) => {
      let sum = 0;
      for (let r = 0; r < targetRow; r++) {
        sum += hypotheticalRowPoints[`${treeID}-${r}`] || 0;
      }
      return sum;
    };

    // Check every row > current row to make sure any active nodes in higher rows remain valid
    for (let r = node.y + 1; r < NUM_ROWS; r++) {
      const activeNodesInHigherRow = talentData.some(
        (n) => n.treeID === node.treeID && n.y === r && (hypotheticalAllocated[n.id] || 0) > 0
      );

      if (activeNodesInHigherRow) {
        const req = r * POINTS_PER_ROW;
        const ptsBefore = getHypotheticalPointsBefore(node.treeID, r);
        if (ptsBefore < req) {
          return; // Point removal blocked: Higher tier dependencies require this point
        }
      }
    }

    setPointsAllocated(hypotheticalAllocated);
  };

  /**
   * Reset all talents
   */
  const handleReset = () => {
    const resetState: TalentTreeState = {};
    talentData.forEach((n) => (resetState[n.id] = 0));
    setPointsAllocated(resetState);
  };

  const applyImport = (str: string): boolean => {
    const imported = importTalents(talentData, str);
    if (!imported) {
      setMessage('Invalid talent string.');
      return false;
    }
    onTalentsChange(imported);
    return true;
  };

  const handleImport = () => {
    if (applyImport(importText)) {
      setMessage('Talents imported.');
      setImportText('');
    }
  };

  const handleExport = () => {
    const str = exportTalents(talentData, pointsAllocated);
    setImportText(str);
    navigator.clipboard?.writeText(str).catch(() => {});
    setMessage('Exported (copied to clipboard).');
  };

  const handleDefault = () => {
    if (defaultTalentString && applyImport(defaultTalentString)) setMessage('Default talents loaded.');
  };

  const treeNames = getTreeNames(className);

  return (
    <div style={styles.calculatorContainer}>
      {/* Header Bar */}
      <div style={styles.header}>
        <h2>{className} Talent Calculator</h2>
        <div style={styles.pointsCounter}>
          Points Remaining: <strong>{TOTAL_TALENT_POINTS - totalSpentPoints}</strong> / {TOTAL_TALENT_POINTS}
        </div>
        <button style={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>

      <div style={styles.importExportBar}>
        <input
          style={styles.importInput}
          value={importText}
          placeholder="Paste talent string"
          onChange={(e) => setImportText(e.target.value)}
        />
        <button style={styles.actionButton} onClick={handleImport} disabled={!importText.trim()}>
          Import
        </button>
        <button style={styles.actionButton} onClick={handleExport}>
          Export
        </button>
        {defaultTalentString && (
          <button style={styles.actionButton} onClick={handleDefault}>
            Default
          </button>
        )}
        {message && <span style={{ color: '#999' }}>{message}</span>}
      </div>

      {/* Horizontal Subtrees Container */}
      <div style={styles.treesFlexContainer}>
        {[0, 1, 2].map((treeID) => (
          <SubtreePanel
            key={treeID}
            treeID={treeID}
            treeName={treeNames[treeID]}
            nodes={talentData.filter((n) => n.treeID === treeID)}
            pointsAllocated={pointsAllocated}
            treeTotalPoints={pointsPerTree[treeID] || 0}
            isNodeUnlocked={isNodeUnlocked}
            onAddPoint={handleAddPoint}
            onRemovePoint={handleRemovePoint}
          />
        ))}
      </div>
    </div>
  );
};

// --- Subtree Panel Component ---
interface SubtreePanelProps {
  treeID: number;
  treeName: string;
  nodes: TalentNodeData[];
  pointsAllocated: TalentTreeState;
  treeTotalPoints: number;
  isNodeUnlocked: (node: TalentNodeData) => boolean;
  onAddPoint: (node: TalentNodeData) => void;
  onRemovePoint: (node: TalentNodeData) => void;
}

const SubtreePanel: React.FC<SubtreePanelProps> = ({
  treeName,
  nodes,
  pointsAllocated,
  treeTotalPoints,
  isNodeUnlocked,
  onAddPoint,
  onRemovePoint,
}) => {
  // Construct a 7-row x 4-column grid matrix
  const grid: (TalentNodeData | null)[][] = Array.from({ length: NUM_ROWS }, () =>
    Array(NUM_COLUMNS).fill(null)
  );

  nodes.forEach((node) => {
    if (node.y >= 0 && node.y < NUM_ROWS && node.x >= 0 && node.x < NUM_COLUMNS) {
      grid[node.y][node.x] = node;
    }
  });

  return (
    <div style={styles.subtreeContainer}>
      <div style={styles.subtreeHeader}>
        <h3>
          {treeName} ({treeTotalPoints})
        </h3>
      </div>

      {/* Background container ready for future artwork */}
      <div style={styles.gridBackground}>
        <div style={styles.grid}>
          {grid.map((row, rowIndex) =>
            row.map((node, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} style={styles.cell}>
                {node && (
                  <TalentNode
                    node={node}
                    currentPoints={pointsAllocated[node.id] || 0}
                    unlocked={isNodeUnlocked(node)}
                    onAddPoint={() => onAddPoint(node)}
                    onRemovePoint={() => onRemovePoint(node)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- Single Talent Node Component ---
interface TalentNodeProps {
  node: TalentNodeData;
  currentPoints: number;
  unlocked: boolean;
  onAddPoint: () => void;
  onRemovePoint: () => void;
}

const TalentNode: React.FC<TalentNodeProps> = ({
  node,
  currentPoints,
  unlocked,
  onAddPoint,
  onRemovePoint,
}) => {
  const isMaxed = currentPoints === node.maxPoints;
  const isActive = currentPoints > 0;

  // Icon image URL (using standard WoW icon CDN)
  const iconUrl = `https://wow.zamimg.com/images/wow/icons/large/${node.iconName.toLowerCase()}.jpg`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddPoint();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRemovePoint();
  };

  // Node border state styling: Green (Maxed), Yellow (Active), Gray/Disabled (Locked)
  let borderColor = '#333';
  if (unlocked) {
    if (isMaxed) borderColor = '#ffd100'; // WoW Gold
    else if (isActive) borderColor = '#00ff00'; // Green
    else borderColor = '#888';
  }

  return (
    <div
      style={{
        ...styles.nodeWrapper,
        borderColor: borderColor,
        opacity: unlocked ? 1 : 0.4,
        cursor: unlocked ? 'pointer' : 'not-allowed',
        filter: unlocked ? 'none' : 'grayscale(100%)',
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      title={`${node.spellName} (${currentPoints}/${node.maxPoints})\nLeft-click to add point, Right-click to remove point`}
    >
    <WowheadTooltip type="spell" id={node.id} gameType="Forever">
      <img src={iconUrl} alt={node.spellName} style={styles.iconImage} />
      
      <div
        style={{
          ...styles.pointCounterBadge,
          color: isMaxed ? '#ffd100' : '#ffffff',
          borderColor: isMaxed ? '#ffd100' : '#555555',
        }}
      >
        {currentPoints}/{node.maxPoints}
      </div>
      </WowheadTooltip>
    </div>
  );
};

// --- Stylesheet ---
const styles: { [key: string]: React.CSSProperties } = {
  calculatorContainer: {
    backgroundColor: '#0d0d0d',
    color: '#f0f0f0',
    padding: '20px',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
  },
  pointsCounter: {
    fontSize: '1.2rem',
  },
  resetButton: {
    backgroundColor: '#aa2222',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  importExportBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  importInput: {
    width: '260px',
    padding: '6px 8px',
    backgroundColor: '#181818',
    color: '#f0f0f0',
    border: '1px solid #333',
    borderRadius: '4px',
    fontFamily: 'monospace',
  },
  actionButton: {
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  treesFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
    justifyContent: 'center',
    overflowX: 'auto',
  },
  subtreeContainer: {
    backgroundColor: '#181818',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #333',
    minWidth: '280px',
  },
  subtreeHeader: {
    textAlign: 'center',
    marginBottom: '12px',
    color: '#ffd100',
  },
  gridBackground: {
    // Placeholder for tree background image (e.g., backgroundUrl)
    backgroundColor: '#111111',
    borderRadius: '6px',
    padding: '12px',
    border: '1px solid #222',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 52px)',
    gridTemplateRows: 'repeat(7, 52px)',
    gap: '12px',
    justifyContent: 'center',
  },
  cell: {
    width: '52px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeWrapper: {
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    border: '2px solid #555',
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    borderRadius: '2px',
    display: 'block',
  },
  pointCounterBadge: {
    position: 'absolute',
    bottom: '-6px',
    right: '-6px',
    backgroundColor: '#000000e6',
    border: '1px solid #555',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '1px 3px',
    borderRadius: '3px',
    pointerEvents: 'none',
  },
};