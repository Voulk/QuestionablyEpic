import { evokerBaseTalents } from "General/Modules/FightAnalysis/Components/Talents/EvokerBaseTalents";
import { Box, Badge } from "@mui/material";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips";
import { talentTreeDB } from "Databases/talentTreeDB";
import { getIconURL } from "General/Modules/CooldownPlanner/Functions/IconFunctions/getIconURL";
import { Grid } from "@mui/material";

const activeAbilitys = [
  {
    id: 87588,
    rank: 1,
    spellID: 370886,
    icon: "ability_evoker_emeraldblossom.jpg",
    nodeID: 68572,
    spellType: 1,
  },
  {
    id: 87593,
    rank: 1,
    spellID: 377082,
    icon: "ability_hunter_onewithnature.jpg",
    nodeID: 68576,
    spellType: 1,
  },
  {
    id: 87594,
    rank: 1,
    spellID: 370960,
    icon: "ability_evoker_green_01.jpg",
    nodeID: 68577,
    spellType: 8,
  },
  {
    id: 87595,
    rank: 1,
    spellID: 377100,
    icon: "ability_evoker_essenceburst3.jpg",
    nodeID: 68578,
    spellType: 1,
  },
  {
    id: 87597,
    rank: 1,
    spellID: 359816,
    icon: "ability_evoker_dreamflight.jpg",
    nodeID: 68580,
    spellType: 8,
  },
  {
    id: 87599,
    rank: 2,
    spellID: 371257,
    icon: "ability_evoker_dreambreath.jpg",
    nodeID: 68582,
    spellType: 1,
  },
  {
    id: 87603,
    rank: 1,
    spellID: 370537,
    icon: "ability_evoker_stasis.jpg",
    nodeID: 68585,
    spellType: 64,
  },
  {
    id: 87605,
    rank: 2,
    spellID: 376240,
    icon: "inv_artifact_xp05.jpg",
    nodeID: 68587,
    spellType: 1,
  },
  {
    id: 87606,
    rank: 1,
    spellID: 372233,
    icon: "inv_elemental_mote_mana.jpg",
    nodeID: 68588,
    spellType: 1,
  },
  {
    id: 87607,
    rank: 1,
    spellID: 371270,
    icon: "inv_offhand_1h_ulduarraid_d_01.jpg",
    nodeID: 68589,
    spellType: 1,
  },
  {
    id: 87609,
    rank: 1,
    spellID: 376236,
    icon: "ability_evoker_bronze_01.jpg",
    nodeID: 68590,
    spellType: 1,
  },
  {
    id: 87611,
    rank: 1,
    spellID: 373861,
    icon: "ability_evoker_temporalanomaly.jpg",
    nodeID: 68592,
    spellType: 64,
  },
  {
    id: 87612,
    rank: 1,
    spellID: 363534,
    icon: "ability_evoker_rewind.jpg",
    nodeID: 68593,
    spellType: 64,
  },
  {
    id: 87613,
    rank: 1,
    spellID: 357170,
    icon: "ability_evoker_timedilation.jpg",
    nodeID: 68594,
    spellType: 64,
  },
  {
    id: 87614,
    rank: 1,
    spellID: 378196,
    icon: "inv_belt_armor_waistoftime_d_01.jpg",
    nodeID: 68595,
    spellType: 1,
  },
  {
    id: 87615,
    rank: 2,
    spellID: 372527,
    icon: "ability_evoker_innatemagic4.jpg",
    nodeID: 68596,
    spellType: 1,
  },
  {
    id: 87618,
    rank: 1,
    spellID: 373834,
    icon: "4096390.jpg",
    nodeID: 68599,
    spellType: 1,
  },
  {
    id: 87619,
    rank: 1,
    spellID: 381922,
    icon: "ability_evoker_rewind.jpg",
    nodeID: 68600,
    spellType: 1,
  },
  {
    id: 87621,
    rank: 1,
    spellID: 376239,
    icon: "ability_evoker_reversion_green.jpg",
    nodeID: 68601,
    spellType: 1,
  },
  {
    id: 87625,
    rank: 1,
    spellID: 367226,
    icon: "ability_evoker_spiritbloom2.jpg",
    nodeID: 68604,
    spellType: 8,
  },
  {
    id: 87626,
    rank: 1,
    spellID: 362874,
    icon: "ability_evoker_rewind2.jpg",
    nodeID: 68605,
    spellType: 1,
  },
  {
    id: 87627,
    rank: 1,
    spellID: 355936,
    icon: "ability_evoker_dreambreath.jpg",
    nodeID: 68606,
    spellType: 8,
  },
  {
    id: 87628,
    rank: 1,
    spellID: 364343,
    icon: "ability_evoker_echo.jpg",
    nodeID: 68607,
    spellType: 64,
  },
  {
    id: 87629,
    rank: 1,
    spellID: 366155,
    icon: "ability_evoker_reversion.jpg",
    nodeID: 68608,
    spellType: 64,
  },
  {
    id: 87630,
    rank: 1,
    spellID: 369297,
    icon: "ability_evoker_essenceburst.jpg",
    nodeID: 68609,
    spellType: 1,
  },
  {
    id: 87631,
    rank: 1,
    spellID: 375722,
    icon: "ability_evoker_essenceburststacks.jpg",
    nodeID: 68610,
    spellType: 1,
  },
  {
    id: 87634,
    rank: 1,
    spellID: 373270,
    icon: "ability_evoker_hoverred.jpg",
    nodeID: 68613,
    spellType: 1,
  },
  {
    id: 87635,
    rank: 1,
    spellID: 377099,
    icon: "ability_evoker_essenceburst5.jpg",
    nodeID: 68614,
    spellType: 1,
  },
  {
    id: 87678,
    rank: 2,
    spellID: 375561,
    icon: "inv_staff_2h_bloodelf_c_01.jpg",
    nodeID: 68652,
    spellType: 1,
  },
  {
    id: 87679,
    rank: 1,
    spellID: 374348,
    icon: "ability_evoker_masterylifebinder_red.jpg",
    nodeID: 68653,
    spellType: 4,
  },
  {
    id: 87680,
    rank: 1,
    spellID: 375577,
    icon: "item_sparkofragnoros.jpg",
    nodeID: 68654,
    spellType: 1,
  },
  {
    id: 87682,
    rank: 1,
    spellID: 374227,
    icon: "ability_evoker_hoverblack.jpg",
    nodeID: 68655,
    spellType: 1,
  },
  {
    id: 87685,
    rank: 1,
    spellID: 370665,
    icon: "ability_evoker_flywithme.jpg",
    nodeID: 68658,
    spellType: 1,
  },
  {
    id: 87686,
    rank: 1,
    spellID: 365933,
    icon: "ability_evoker_aerialmastery.jpg",
    nodeID: 68659,
    spellType: 1,
  },
  {
    id: 87688,
    rank: 1,
    spellID: 369909,
    icon: "ability_evoker_azurestrike.jpg",
    nodeID: 68661,
    spellType: 1,
  },
  {
    id: 87689,
    rank: 1,
    spellID: 369939,
    icon: "spell_fire_flare.jpg",
    nodeID: 68662,
    spellType: 1,
  },
  {
    id: 87692,
    rank: 1,
    spellID: 351338,
    icon: "ability_evoker_quell.jpg",
    nodeID: 68665,
    spellType: 1,
  },
  {
    id: 87694,
    rank: 2,
    spellID: 375510,
    icon: "ability_evoker_firebreath.jpg",
    nodeID: 68667,
    spellType: 1,
  },
  {
    id: 87697,
    rank: 2,
    spellID: 375544,
    icon: "inv_misc_rubysanctum1.jpg",
    nodeID: 68670,
    spellType: 1,
  },
  {
    id: 87699,
    rank: 2,
    spellID: 376930,
    icon: "ability_rogue_imrovedrecuperate.jpg",
    nodeID: 68672,
    spellType: 1,
  },
  {
    id: 87700,
    rank: 1,
    spellID: 374251,
    icon: "ability_evoker_fontofmagic_red.jpg",
    nodeID: 68673,
    spellType: 4,
  },
  {
    id: 87701,
    rank: 1,
    spellID: 375406,
    icon: "inv_shield_1h_revenantfire_d_01.jpg",
    nodeID: 68674,
    spellType: 1,
  },
  {
    id: 87702,
    rank: 1,
    spellID: 363916,
    icon: "inv_artifact_dragonscales.jpg",
    nodeID: 68675,
    spellType: 12,
  },
  {
    id: 87703,
    rank: 1,
    spellID: 370897,
    icon: "spell_frost_coldhearted.jpg",
    nodeID: 68676,
    spellType: 1,
  },
  {
    id: 87704,
    rank: 2,
    spellID: 375554,
    icon: "ability_evoker_livingflame.jpg",
    nodeID: 68677,
    spellType: 1,
  },
  {
    id: 87707,
    rank: 1,
    spellID: 387761,
    icon: "ability_druid_protectionofthegrove.jpg",
    nodeID: 68680,
    spellType: 1,
  },
  {
    id: 87710,
    rank: 2,
    spellID: 375520,
    icon: "ability_evoker_innatemagic4.jpg",
    nodeID: 68683,
    spellType: 1,
  },
  {
    id: 87712,
    rank: 2,
    spellID: 376166,
    icon: "inv_helm_mail_dracthyrquest_b_02.jpg",
    nodeID: 68685,
    spellType: 1,
  },
  {
    id: 87713,
    rank: 1,
    spellID: 370553,
    icon: "ability_evoker_tipthescales.jpg",
    nodeID: 68686,
    spellType: 64,
  },
  {
    id: 87714,
    rank: 1,
    spellID: 372469,
    icon: "inv_bijou_red.jpg",
    nodeID: 68687,
    spellType: 1,
  },
  {
    id: 87715,
    rank: 1,
    spellID: 360995,
    icon: "ability_evoker_rescue.jpg",
    nodeID: 68688,
    spellType: 8,
  },
  {
    id: 87716,
    rank: 1,
    spellID: 365585,
    icon: "ability_evoker_fontofmagic_green.jpg",
    nodeID: 68689,
    spellType: 8,
  },
];

// Talent component
// This component represents a single talent in the talent tree.
// It receives a talent object as a prop and displays an image for the talent.
// If the talent is active and its rank is greater than 1, it displays a number indicating the rank of the talent.
const Talent = ({ talent }) => {
  // Extract the spell ID of the talent
  const talentSpellID = talent.spellId;
  // Check if the talent is active
  const abilityActive = activeAbilitys.some((ability) => ability.spellID === talentSpellID);
  // Find the active talent
  const activeTalent = activeAbilitys.find((ability) => ability.spellID === talentSpellID);
  // Render the talent
  return (
    <div style={{ position: "relative" }}>
      <WowheadTooltip id={talent.spellId} type="spell" rank={talent.rank}>
        <img
          src={getIconURL(talent.icon)}
          alt={talent.name}
          width={20}
          height={20}
          style={{
            borderRadius: talent.type === "active" ? 4 : 10,
            border: talent.type === "active" ? "2px solid" : "1px solid",
            borderColor: abilityActive ? "yellow" : "grey",
            filter: abilityActive ? "" : "grayscale(100%)",
          }}
        />

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
const TalentTree = ({ talents, treeStructure }) => {
  // This line creates a 2D array called 'rows' with dimensions based on the tree structure.
  // The number of rows is determined by the length of the posY array in the tree structure,
  // and the number of columns is determined by the length of the posX array.
  // Initially, all cells in the array are filled with null.
  const rows = Array.from({ length: treeStructure.posY.length }, () => Array(treeStructure.posX.length).fill(null));

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
      newTalentArray.push({ ...entry, row: posY, pos: posX, next: talent.next, nodeID: talent.id });
    }),
  );

  // This loop goes through each talent in the newTalentArray.
  // For each talent, it assigns the talent object to the corresponding cell in the rows array.
  // The row and column indices for the cell are determined by the talent's row and pos properties, respectively.
  // This effectively places each talent in its correct position in the grid represented by the rows array.
  newTalentArray.forEach((talent) => {
    rows[talent.row][talent.pos] = talent;
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
        {newTalentArray.map((talent, index) =>
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
                stroke={activeAbilitys.some((ability) => ability.nodeID === next.nodeID) && activeAbilitys.some((ability) => ability.spellID === talent.spellId) ? "yellow" : "black"}
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
        row.map((talent, columnIndex) => (
          <Box key={`${rowIndex}-${columnIndex}`} style={{ zIndex: 2, width: 20, height: 20 }}>
            {talent && <Talent talent={talent} />}
          </Box>
        )),
      )}
    </Box>
  );
};

// TalentTreeApp component
// This component represents the entire app.
// It fetches the talent tree data, processes it, and passes it to the TalentTree components.
const TalentTreeApp = () => {
  // This line initializes an empty array called 'treeStructures'.
  // This array will be used to store the tree structures for each class in the talent tree database.
  let treeStructures = [];

  // This loop goes through each class object in the talent tree database.
  // For each class object, it creates two sets for the posX and posY values of the class nodes and spec nodes.
  // It then goes through each node in the class's 'classNodes' & 'specNodes' array and adds the node's posX and posY values to the corresponding sets.
  // This effectively collects all unique posX and posY values for the class nodes and spec nodes.
  // It then creates a new object with the class's properties and the collected posX and posY values, and adds this object to the 'treeStructures' array.
  talentTreeDB.forEach((classObj) => {
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

  const talents = talentTreeDB.find((talents) => talents.classId === 7 && talents.specId === 264);
  const treeStructure = treeStructures.find((classAndSpec) => classAndSpec.classId === 7 && classAndSpec.specId === 264);
  const classNodes = talents.classNodes;
  const specNodes = talents.specNodes;

  // Render the app
  return (
    <div
    // style={{ width: 500 }}
    >
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{
              padding: 10,
              border: "1px solid d4d4d4",
              // width: 250,
              backgroundColor: "#424242",
            }}
          >
            {" "}
            <TalentTree talents={classNodes} treeStructure={treeStructure.classNodes} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              padding: 10,
              border: "1px solid d4d4d4",
              // width: 200,
              backgroundColor: "#424242",
            }}
          >
            <TalentTree talents={specNodes} treeStructure={treeStructure.specNodes} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TalentTreeApp;
