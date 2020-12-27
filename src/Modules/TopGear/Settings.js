import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  Grid,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  TextField,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function TopGearSettingsdAccordion() {
  const classes = useStyles();
  // Hymnal State
  const [value, setValue] = useState(5);
  // Free State
  const [value1, setValue1] = useState(5);
  // Free State
  const [value2, setValue2] = useState(5);
  // Free State
  const [value3, setValue3] = useState(5);
  // Free State
  const [value4, setValue4] = useState(5);

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={false} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Settings</Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1} direction="row" wrap="nowrap">
            {/* Cabalist's Hymnal Item */}
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title="The equip effect of 'Cabalist's Hymnal' is increased by 5% per Ally"
                    placement="top-start"
                  >
                    <Typography color="primary">Allies With Hymnal</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value}
                    style={{ maxWidth: 70 }}
                    onChange={(e) => setValue(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title="The equip effect of 'Cabalist's Hymnal' is increased by 5% per Ally"
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {" "}
                      Allies With Hymnal{" "}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value1}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue1(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title="The equip effect of 'Cabalist's Hymnal' is increased by 5% per Ally"
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {" "}
                      Allies With Hymnal{" "}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value2}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue2(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title="The equip effect of 'Cabalist's Hymnal' is increased by 5% per Ally"
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {" "}
                      Allies With Hymnal{" "}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value3}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue3(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title="The equip effect of 'Cabalist's Hymnal' is increased by 5% per Ally"
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {" "}
                      Allies With Hymnal{" "}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value4}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue4(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title="The equip effect of 'Cabalist's Hymnal' is increased by 5% per Ally"
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {" "}
                      Allies With Hymnal{" "}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value5}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue5(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
