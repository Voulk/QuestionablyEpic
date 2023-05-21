import { evokerTreeTalents } from "Databases/TalentDBNew";
import { Box } from "@mui/material";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips";

// Talent component
const Talent = ({ talent }) => (
  <div>
    <WowheadTooltip type="spell" id={talent.guid}>
      <img src={talent.icon} alt={talent.name} width={20} height={20} style={{ borderRadius: talent.type === "Ability" ? 4 : 10, border: "1px solid grey" }} />
    </WowheadTooltip>
  </div>
);

// TalentTree component
const TalentTree = ({ talents }) => {
  const rows = Array.from({ length: 10 }, () => Array(7).fill(null));

  talents.forEach((talent) => {
    rows[talent.row][talent.pos] = talent;
  });

  return (
    <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gridTemplateRows="repeat(10, 1fr)" gap={1} sx={{ width: 200 }}>
      {rows.map((row, rowIndex) => row.map((talent, columnIndex) => <Box key={`${rowIndex}-${columnIndex}`}>{talent && <Talent talent={talent} />}</Box>))}
    </Box>
  );
};

// TalentTree Export
const TalentTreeApp = () => {
  const talents = evokerTreeTalents;

  return <TalentTree talents={talents} />;
};

export default TalentTreeApp;
