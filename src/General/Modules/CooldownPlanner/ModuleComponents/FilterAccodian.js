import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterCheckbox from "./FilterSwitch";
import { Paper, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "react-i18next";
import { classColoursJS } from "../Functions/ClassColourFunctions";

export default function FilterAccordian(props) {
  const { classList, abilityFilter } = props;
  const { t } = useTranslation();
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {classList.map((logClasses) => (
              <Grid item>
                <Paper sx={{ backgroundColor: "#111111" }}>
                  <div style={{ color: classColoursJS(logClasses) }}>{t("CooldownPlanner.Classes." + logClasses)}</div>
                  {Object.keys(abilityFilter[logClasses]).map((key) => (
                    <FilterCheckbox label={key} />
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
