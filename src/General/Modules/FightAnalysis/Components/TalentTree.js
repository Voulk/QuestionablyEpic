import { Box } from "@mui/material";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips";
import { getIconURL } from "General/Modules/CooldownPlanner/Functions/IconFunctions/getIconURL";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  imgActive: {
    borderRadius: 4,
    border: "2px solid",
    zIndex: 200,
  },
  imgPassive: {
    borderRadius: 10,
    border: "1px solid",
    zIndex: 1,
  },
  imgChoiceOuter: {
    position: "relative",
    width: "24px",
    height: "24px",
    background: "grey",
    clipPath: "polygon(35% 0%, 65% 0%, 100% 35%, 100% 65%, 65% 100%, 35% 100%, 0% 65%, 0% 35%)",
    filter: "grayscale(100%)",
    opacity: 0.5,
  },
  imgChoiceInner: {
    top: "2px",
    position: "relative",
    width: "20",
    height: "20px",
    overflow: "hidden",
    background: "#1a1a1a",
    clipPath: "polygon(35% 0%, 65% 0%, 100% 35%, 100% 65%, 65% 100%, 35% 100%, 0% 65%, 0% 35%)",
    margin: "2px",
    filter: "grayscale(100%)",
    opacity: 0.5,
  },
  imgChoiceOuterActive: {
    position: "relative",
    width: "24px",
    height: "24px",
    background: "gold",
    clipPath: "polygon(35% 0%, 65% 0%, 100% 35%, 100% 65%, 65% 100%, 35% 100%, 0% 65%, 0% 35%)",
    // filter: grayscale("100%"),
  },
  imgChoiceInnerActive: {
    top: "2px",
    position: "relative",
    width: "20",
    height: "20px",
    overflow: "hidden",
    background: "#1a1a1a",
    clipPath: "polygon(35% 0%, 65% 0%, 100% 35%, 100% 65%, 65% 100%, 35% 100%, 0% 65%, 0% 35%)",
    margin: "2px",
    // filter: grayscale("100%"),
  },
});

// Talent component
// This component represents a single talent in the talent tree.
// It receives a talent object as a prop and displays an image for the talent.
// If the talent is active and its rank is greater than 1, it displays a number indicating the rank of the talent.
const Talent = ({ talent, combatantInfo }) => {
  const classes = useStyles();
  // Extract the spell ID of the talent
  const activeTalents = combatantInfo.talentTree.map((ability) => ability);
  const talentSpellID = talent.spellId;
  // Check if the talent is active
  const abilityActive = activeTalents.some((ability) => ability.spellID === talentSpellID);
  // Find the active talent
  const activeTalent = activeTalents.find((ability) => ability.spellID === talentSpellID);
  // Render the talent
  return (
    <div style={{ position: "relative" }}>
      <WowheadTooltip id={talent.spellId} type="spell" rank={talent.rank}>
        {talent.nodeType === "choice" ? (
          <div className={abilityActive ? classes.imgChoiceOuterActive : classes.imgChoiceOuter}>
            <div className={abilityActive ? classes.imgChoiceInnerActive : classes.imgChoiceInner}>
              <img src={getIconURL(talent.icon)} alt={talent.name} width={20} height={20} style={{ zIndex: abilityActive ? 302 : 1 }} />
            </div>
          </div>
        ) : (
          <img
            src={getIconURL(talent.icon) || ""}
            alt={talent.name}
            width={20}
            height={20}
            style={{
              borderRadius: talent.type === "active" ? 4 : 10,
              border: talent.type === "active" ? "2px solid" : "1px solid",
              borderColor: abilityActive ? "gold" : "grey",
              opacity: abilityActive ? 1 : 0.5,
              filter: abilityActive ? "" : "grayscale(100%)",
              zIndex: abilityActive ? 200 : 1,
            }}
          />
        )}

        {abilityActive
          ? activeTalent.rank > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: -5,
                  background: "blue",
                  color: "white",
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                }}
              >
                2
              </div>
            )
          : null}
      </WowheadTooltip>
    </div>
  );
};

// Function to find the index of a value in an array
const findIndex = (value, replacementArray) => {
  return replacementArray.indexOf(value);
};

// TalentTree component
// This component represents a talent tree.
// It receives an array of talents and a tree structure as props, and displays the talents in a grid according to the tree structure.
const TalentTree = ({ talents, treeStructure, combatantInfo }) => {
  const activeTalents = combatantInfo.talentTree;
  // This line creates a 2D array called 'rows' with dimensions based on the tree structure.
  // The number of rows is determined by the length of the posY array in the tree structure,
  // and the number of columns is determined by the length of the posX array.
  // Initialize the rows array with empty arrays instead of null
  const rows = Array.from({ length: treeStructure.posY.length }, () => Array(treeStructure.posX.length).fill([]));

  // This line initializes an empty array called 'newTalentArray'.
  // This array will be used to store the talents after processing them.
  let newTalentArray = [];

  // This loop goes through each talent in the 'talents' array.
  // For each talent, it goes through each entry in the talent's 'entries' array.
  // It finds the indices of the talent's posX and posY values in the tree structure's posX and posY arrays, respectively.
  // These indices are used as the row and column indices for the talent in the grid.
  // It then creates a new object with the properties of the entry, the calculated row and column indices, and the talent's 'next' array and 'id'.
  // This new object is then added to the 'newTalentArray'.
  talents.map((talent) =>
    talent.entries.forEach((entry) => {
      const posX = findIndex(talent.posX, treeStructure.posX);
      const posY = findIndex(talent.posY, treeStructure.posY);
      newTalentArray.push({ ...entry, row: posY, pos: posX, next: talent.next, nodeID: talent.id, nodeType: talent.type });
    }),
  );

  // This loop goes through each talent in the newTalentArray.
  // For each talent, it assigns the talent object to the corresponding cell in the rows array.
  // The row and column indices for the cell are determined by the talent's row and pos properties, respectively.
  // This effectively places each talent in its correct position in the grid represented by the rows array.
  // When assigning talents to cells, push the talent to the array instead of overwriting it
  newTalentArray.forEach((talent) => {
    rows[talent.row][talent.pos] = [...rows[talent.row][talent.pos], talent];
  });

  // This line creates a new object called 'talentMap' from the 'newTalentArray'.
  // It uses the 'reduce' method to transform the array into an object.
  // For each talent in the array, it adds a new property to the object.
  // The key for the property is the talent's 'nodeID', and the value is the talent object itself.
  // This creates a mapping from node IDs to talent objects, which allows for quick lookup of talents by their node ID.
  const talentMap = newTalentArray.reduce((map, talent) => {
    map[talent.nodeID] = talent;
    return map;
  }, {});

  const Gap = 1;

  const positionCalc = () => {
    const defaultWidth = 29 * treeStructure.posX.length * Gap;
    const defaultAddition = 0.5 * Gap;
    return { width: defaultWidth, addition: defaultAddition };
  };

  // Render the talent tree
  return (
    // This Box component represents the grid for the talent tree.
    // It has a relative position, which allows its children to be positioned relative to it.
    // It uses CSS grid layout to arrange its children in a grid.
    // The number of columns and rows in the grid are determined by the length of the posX and posY arrays in the tree structure, respectively.
    // The gap between grid items is determined by the Gap variable.
    // The width of the Box is determined by the positionCalc function.
    <Box
      position="relative"
      display="grid"
      gridTemplateColumns={`repeat(${treeStructure.posX.length}, 1fr)`}
      gridTemplateRows={`repeat(${treeStructure.posY.length}, 1fr)`}
      gap={Gap}
      style={{ width: positionCalc().width }}
    >
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {/* This SVG element is used to draw lines between talents in the talent tree. */}
        {/* It has an absolute position, which means it's positioned relative to the nearest positioned ancestor (in this case, the Box). */}
        {/* It takes up the full width and height of its parent, and it's positioned behind its siblings (due to zIndex: 1). */}
        {newTalentArray
          .sort((a, b) => {
            const aIsActive = activeTalents.some((ability) => ability.spellID === a.spellId);
            const bIsActive = activeTalents.some((ability) => ability.spellID === b.spellId);

            if (aIsActive && !bIsActive) {
              return 1; // a is active and b is not, so a should come after b
            }

            if (!aIsActive && bIsActive) {
              return -1; // a is not active and b is, so a should come before b
            }

            return 0; // both a and b are either active or not active, so their order doesn't matter
          })
          .map((talent, index) =>
            talent.next.map((nextGuid) => {
              const next = talentMap[nextGuid];
              if (!next) return null;
              return (
                <line
                  key={`${talent.nodeID}-${next.nodeID}-${index}`}
                  x1={`${((talent.pos + positionCalc().addition) * 100) / treeStructure.posX.length}%`}
                  y1={`${((talent.row + positionCalc().addition) * 100) / treeStructure.posY.length}%`}
                  x2={`${((next.pos + positionCalc().addition) * 100) / treeStructure.posX.length}%`}
                  y2={`${((next.row + positionCalc().addition) * 100) / treeStructure.posY.length}%`}
                  stroke={activeTalents.some((ability) => ability.nodeID === next.nodeID) && activeTalents.some((ability) => ability.spellID === talent.spellId) ? "gold" : "grey"}
                  style={{
                    zIndex: activeTalents.some((ability) => ability.nodeID === next.nodeID) && activeTalents.some((ability) => ability.spellID === talent.spellId) ? 200 : 1,
                    opacity: activeTalents.some((ability) => ability.nodeID === next.nodeID) && activeTalents.some((ability) => ability.spellID === talent.spellId) ? 1 : 0.5,
                  }}
                />
              );
            }),
          )}
      </svg>
      {/* This loop goes through each row in the rows array. */}
      {/* For each row, it goes through each cell in the row.  */}
      {/* If the cell contains a talent, it renders a Box with the Talent component inside it.  */}
      {/* The Box has a zIndex of 2, which means it's positioned in front of the SVG element.  */}
      {rows.map((row, rowIndex) =>
        row.map((talents, columnIndex) => (
          <Box key={`${rowIndex}-${columnIndex}`} style={{ zIndex: 2, width: 20, height: 20, position: "relative" }}>
            {talents.map((talent, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: activeTalents.some((ability) => ability.nodeID === talent.nodeID) && activeTalents.some((ability) => ability.spellID === talent.spellId) ? 200 : 1,
                }}
              >
                <Talent talent={talent} combatantInfo={combatantInfo} />
              </div>
            ))}
          </Box>
        )),
      )}
    </Box>
  );
};

const classIdentifier = (classId) => {
  const id = classId.toLowerCase() || "";
  let identity = "";
  switch (id) {
    case "shaman-restoration":
      identity = { classId: 7, specId: 264 };
      break;
    case "evoker-preservation":
      identity = { classId: 13, specId: 1468 };
      break;
    case "druid-restoration":
      identity = { classId: 11, specId: 105 };
      break;
    case "paladin-holy":
      identity = { classId: 2, specId: 65 };
      break;
    case "priest-holy":
      identity = { classId: 5, specId: 257 };
      break;
    case "priest-discipline":
      identity = { classId: 5, specId: 256 };
      break;
    case "monk-mistweaver":
      identity = { classId: 10, specId: 270 };
      break;
    default:
      identity = { classId: 7, specId: 264 };
      break;
  }
  return identity;
};

// TalentTreeApp component
// This component represents the entire app.
// It fetches the talent tree data, processes it, and passes it to the TalentTree components.
const TalentTreeApp = ({ classIcon, combatantInfo }) => {
  const classIdentity = classIdentifier(classIcon);
  // This line initializes an empty array called 'treeStructures'.
  // This array will be used to store the tree structures for each class in the talent tree database.
  let treeStructures = [];

  // This loop goes through each class object in the talent tree database.
  // For each class object, it creates two sets for the posX and posY values of the class nodes and spec nodes.
  // It then goes through each node in the class's 'classNodes' & 'specNodes' array and adds the node's posX and posY values to the corresponding sets.
  // This effectively collects all unique posX and posY values for the class nodes and spec nodes.
  // It then creates a new object with the class's properties and the collected posX and posY values, and adds this object to the 'treeStructures' array.
  [].forEach((classObj) => {
    let classNodesPosXSet = new Set();
    let classNodesPosYSet = new Set();

    classObj.classNodes.forEach((node) => {
      classNodesPosXSet.add(node.posX);
      classNodesPosYSet.add(node.posY);
    });

    let specNodesPosXSet = new Set();
    let specNodesPosYSet = new Set();

    classObj.specNodes.forEach((node) => {
      specNodesPosXSet.add(node.posX);
      specNodesPosYSet.add(node.posY);
    });

    treeStructures.push({
      TreeId: classObj.TreeId,
      className: classObj.className,
      classId: classObj.classId,
      specName: classObj.specName,
      specId: classObj.specId,
      classNodes: {
        posX: Array.from(classNodesPosXSet).sort((a, b) => a - b),
        posY: Array.from(classNodesPosYSet).sort((a, b) => a - b),
      },
      specNodes: {
        posX: Array.from(specNodesPosXSet).sort((a, b) => a - b),
        posY: Array.from(specNodesPosYSet).sort((a, b) => a - b),
      },
    });
  });

  const talents = [];
  const treeStructure = treeStructures.find((classAndSpec) => classAndSpec.classId === classIdentity.classId && classAndSpec.specId === classIdentity.specId);
  const classNodes = talents.classNodes;
  const specNodes = talents.specNodes;

  // Render the app
  return (
    <div style={{ width: "100%" }}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid item>
          <div
            style={{
              padding: 10,
              border: "1px solid d4d4d4",
              // width: 250,
              backgroundColor: "#424242",
            }}
          >
            {" "}
            <TalentTree talents={classNodes} treeStructure={treeStructure.classNodes} combatantInfo={combatantInfo} />
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              padding: 10,
              border: "1px solid d4d4d4",
              // width: 200,
              backgroundColor: "#424242",
            }}
          >
            <TalentTree talents={specNodes} treeStructure={treeStructure.specNodes} combatantInfo={combatantInfo} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TalentTreeApp;
