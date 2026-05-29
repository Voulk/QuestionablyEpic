import React from "react";
import { Typography } from "@mui/material";
import SequenceDataTable from "General/Modules/SequenceGenerator/SequenceDataTable";
import ErrorBoundary from "General/SystemTools/ErrorLogging/ErrorBoundary";

interface SpellDataAccordionProps {
  spec: string;
  statList: any;
  data?: string;
  talents?: any;
  title?: string;
  description?: string;
}

const SpellDataAccordion: React.FC<SpellDataAccordionProps> = ({
  spec,
  statList,
  talents = null,
  title = "Spell Data",
  description = "This is an advanced panel that shows you spell information based on what gear your top set above is wearing. You can use it to make determinations on which spells to cast.",
}) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" sx={{ paddingBottom: "4px" }} gutterBottom>
        {description}
      </Typography>
      <ErrorBoundary>
        <SequenceDataTable spec={spec} stats={statList} talents={talents} />
      </ErrorBoundary>
    </div>
  );
};

export default SpellDataAccordion;
