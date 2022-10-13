import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Tooltip, TextField, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      marginRight: 4,
    },
    details: {
      alignItems: "center",
      padding: 0,
      marginTop: 8,
      marginBottom: 8,
    },
    column: {
      // flexBasis: "33.33%",
      display: "inline-flex",
    },
  }));


export default function SequenceSettings(props) {
    const classes = useStyles();
    const { t } = useTranslation();
  
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Settings Shown                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* ---------------- True or False determines what settings are shown to the user. --------------- */
    /* ---- We can add checks for player specialisations here to only show for certain specs etc ---- */
  
    /* ------------------------------------ Retail Settings Shown ----------------------------------- */
    const possibleSettings = props.possibleSettings;
    const settingKeys = Object.keys(possibleSettings);
    console.log(possibleSettings);
  

  
    return (
      <div className={classes.root}>
        <Accordion defaultExpanded={false} disabled={false} elevation={0}>
          <AccordionSummary style={{ padding: 0 }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
            <div className={classes.column}>
              <SettingsIcon style={{ marginRight: 4, width: 22, height: 22 }} />
              <Typography className={classes.heading}>{t("Settings.SettingsTitle")}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
        <Grid container spacing={2} direction="row">

            {settingKeys.map((key) => {

                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Tooltip title={t(`Settings.Retail.Setting5Tooltip`)}>
                            <TextField
                                fullWidth
                                select
                                label={t(`Settings.Retail.Setting5Title`)}
                                value={possibleSettings[key].value}
                                onChange={(e) => props.setPossibleSettings({ ...possibleSettings, [key]: e.target.value })}
                            >
                                {possibleSettings[key].options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Tooltip>
                    </Grid>
                );
            })}

        </Grid>

            {/*}
            <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
            <Tooltip
            title={
                <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting5Tooltip")}
                </Typography>
            }
            placement="top-start"
            >
            <TextField
                className={classes.select}
                InputProps={{ variant: "outlined" }}
                select
                variant="outlined"
                size="small"
                fullWidth
                value={"Hello There"}
                onChange={null}
                label={t("Settings.Retail.Setting5Title")}
                style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={0} style={{ justifyContent: "center" }}>
                {'Hello There'}
              </MenuItem>
              <MenuItem divider value={1} style={{ justifyContent: "center" }}>
                {'Goodbye There'}
              </MenuItem>
            </TextField>
            </Tooltip>
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
            <Tooltip
            title={
                <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting5Tooltip")}
                </Typography>
            }
            placement="top-start"
            >
            <TextField
                className={classes.select}
                InputProps={{ variant: "outlined" }}
                select
                variant="outlined"
                size="small"
                fullWidth
                value={"Hello There"}
                onChange={null}
                label={t("Settings.Retail.Setting5Title")}
                style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={0} style={{ justifyContent: "center" }}>
                {'Hello There?'}
              </MenuItem>
              <MenuItem divider value={1} style={{ justifyContent: "center" }}>
                {'Goodbye There!'}
              </MenuItem>
            </TextField>
            </Tooltip>
        </Grid>

        </Grid> */}


          </AccordionDetails>
        </Accordion>
      </div>
    );
  }