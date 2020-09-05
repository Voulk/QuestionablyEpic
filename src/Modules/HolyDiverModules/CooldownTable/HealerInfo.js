import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classicons from "../CooldownTable/ClassIcons";
import talentIcons from "../CooldownTable/TalentIcons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.heals.map((key, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel" + index + "a-content"}
            id={"panel" + index + "a-header"}
          >
            <Typography className={classes.heading}>
              {classicons(key.icon, 14)}
              {key.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {key.talents.map((talent) => talentIcons(talent.guid))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}