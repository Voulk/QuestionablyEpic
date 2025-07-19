import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SequenceDataTable from "General/Modules/SequenceGenerator/SequenceDataTable";
import ErrorBoundary from "General/SystemTools/ErrorLogging/ErrorBoundary";

interface SpellDataAccordionProps {
  spec: string;
  statList: any; 
  data?: string;
  talents?: any;
  title?: string;
  description?: string;
  defaultExpanded?: boolean;
}


// The spell data component

const SpellDataAccordion: React.FC<SpellDataAccordionProps> = ({
  spec,
  statList,
  talents = null,
  title = "Spell Data",
  description = "This is an advanced panel that shows you spell information based on what gear your top set above is wearing. You can use it to make determinations on which spells to cast.",
  defaultExpanded = true,
}) => {
  return (
    <Grid item xs={12} style={{ paddingBottom: "10px" }}>
      <Accordion 
        defaultExpanded={defaultExpanded}
        sx={{
        backgroundColor: "#9B3B3B", // soft beige background
        border: "1px solid #DB6D6D",
        boxShadow: "none", // remove default shadow
  }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sequence-panel-content"
          id="sequence-panel-header"
          sx={{
             minHeight: 56,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ paddingTop: "20px" }}>{title}</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <ErrorBoundary>
            <SequenceDataTable
              spec={spec}
              stats={statList}
              talents={talents}
            />
          </ErrorBoundary>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SpellDataAccordion;