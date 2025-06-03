
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
    //console.log(possibleSettings);
  

  
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
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <Tooltip title={""}>
                            <TextField
                                fullWidth
                                select
                                label={possibleSettings[key].title}
                                value={possibleSettings[key].value}
                                onChange={(e) => props.editSettings(key, e.target.value)}
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
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }