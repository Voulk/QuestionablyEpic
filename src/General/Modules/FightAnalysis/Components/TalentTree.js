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
const Talent = ({ talent }) => {
  const talentSpellID = talent.spellId;
  const abilityActive = activeAbilitys.some((ability) => ability.spellID === talentSpellID);
  const activeTalent = activeAbilitys.find((ability) => ability.spellID === talentSpellID);

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

// TalentTree component
const TalentTree = ({ talents }) => {
  const getXPosition = (pos) => {
    let x = 0;
    switch (pos) {
      case 2100:
        x = 0;
        break; // 1
      case 2700:
        x = 1;
        break; // 2
      case 3300:
        x = 2;
        break; // 3
      case 3900:
        x = 3;
        break; // 4
      case 4500:
        x = 4;
        break; // 5
      case 5100:
        x = 5;
        break; // 6
      case 5700:
        x = 6;
        break; // 7

      case 9900:
        x = 0;
        break; // 1
      case 10500:
        x = 1;
        break; // 2
      case 11100:
        x = 2;
        break; // 3
      case 11700:
        x = 3;
        break; // 4
      case 12300:
        x = 4;
        break; // 5
      case 12900:
        x = 5;
        break; // 6
      case 13500:
        x = 6;
        break; // 7

      default:
        x = 0;
        break;
    }
    return x;
  };
  const getYPosition = (row) => {
    let y = 0;
    switch (row) {
      case 1500:
        y = 0;
        break; // 1
      case 2100:
        y = 1;
        break; // 2
      case 2700:
        y = 2;
        break; // 3
      case 3300:
        y = 3;
        break; // 4
      case 3900:
        y = 4;
        break; // 5
      case 4500:
        y = 5;
        break; // 6
      case 5100:
        y = 6;
        break; // 7
      case 5700:
        y = 7;
        break; // 8
      case 6300:
        y = 8;
        break; // 9
      case 6900:
        y = 9;
        break; // 10
      default:
        y = 0;
        break;
    }
    return y;
  };
  const rows = Array.from({ length: 10 }, () => Array(7).fill(null));
  let newTalentArray = [];
  talents.map((talent) =>
    talent.entries.forEach((entry) => {
      const posX = getXPosition(talent.posX);
      const posY = getYPosition(talent.posY);
      newTalentArray.push({ ...entry, row: posY, pos: posX, next: talent.next, nodeID: talent.id });
    }),
  );

  newTalentArray.forEach((talent) => {
    rows[talent.row][talent.pos] = talent;
  });

  const talentMap = newTalentArray.reduce((map, talent) => {
    map[talent.nodeID] = talent;
    return map;
  }, {});
  const Gap = 1;

  const positionCalc = () => {
    const defaultWidth = 200 * Gap;
    const defaultAddition = 0.5 * Gap;

    return { width: defaultWidth, addition: defaultAddition };
  };

  return (
    <Box position="relative" display="grid" gridTemplateColumns="repeat(7, 1fr)" gridTemplateRows="repeat(10, 1fr)" gap={Gap} style={{ width: positionCalc().width }}>
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {newTalentArray.map((talent, index) =>
          talent.next.map((nextGuid) => {
            const next = talentMap[nextGuid];
            if (!next) return null;

            return (
              <line
                key={`${talent.nodeID}-${next.nodeID}-${index}`}
                x1={`${((talent.pos + positionCalc().addition) * 100) / 7}%`}
                y1={`${((talent.row + positionCalc().addition) * 100) / 10}%`}
                x2={`${((next.pos + positionCalc().addition) * 100) / 7}%`}
                y2={`${((next.row + positionCalc().addition) * 100) / 10}%`}
                stroke={activeAbilitys.some((ability) => ability.nodeID === next.nodeID) && activeAbilitys.some((ability) => ability.spellID === talent.spellId) ? "yellow" : "black"}
              />
            );
          }),
        )}
      </svg>

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

// TalentTree Export
const TalentTreeApp = () => {
  const talents = talentTreeDB.find((talents) => talents.classId === 13 && talents.specId === 1468);
  const classNodes = talents.classNodes;
  const specNodes = talents.specNodes;
  return (
    <div style={{width: 500}}>
    <Grid container>
      <Grid item xs={6}>
        <div
          style={{
            padding: 10,
            border: "1px solid d4d4d4",
            width: 200,
            backgroundColor: "#424242",
          }}
        >
          {" "}
          <TalentTree talents={classNodes} />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div
          style={{
            padding: 10,
            border: "1px solid d4d4d4",
            width: 200,
            backgroundColor: "#424242",
          }}
        >
          {" "}
          <TalentTree talents={specNodes} />
        </div>
      </Grid>
    </Grid>
    </div>
  );
};

export default TalentTreeApp;
