import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classicons from "../CooldownTable/ClassIcons";
import talentIcons from "../CooldownTable/TalentIcons";
import { classColoursJS } from "../CooldownTable/ClassColourFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordionSummary-root": {
      minHeight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
    "& .MuiIconButton-root": {
      padding: 0,
    },
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {console.log(props.heals)}
      {props.heals.map((key, index) => (
        <Accordion>
          <AccordionSummary
            className={classes.content}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel" + index + "a-content"}
            id={"panel" + index + "a-header"}
          >
            <Typography style={{color: classColoursJS(key.type) }} className={classes.heading}>
              {classicons(key.icon, 16)}
              {key.name}
            </Typography>
          </AccordionSummary>
          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>Talents</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {key.talents.map((talent) => talentIcons(talent.guid))}
          </AccordionDetails>
          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>Covenant Abiilities</Typography>
          </AccordionSummary>
          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>Legendaries</Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </div>
  );
}