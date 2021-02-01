import React from "react";
//prettier-ignore
import { Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Typography } from "@material-ui/core";
import { changeLog } from "./Log";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Changelog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ color: "Whitesmoke", width: "350px", marginLeft: "auto", marginRight: "auto", marginBottom: 5, marginTop: 50 }}>
      <Button style={{ fontSize: 12 }} onClick={handleClickOpen("paper")}>
        {/* ----------------- This uses the first object in the array ----------------  */}
        QE Live {changeLog[0].version} {t("Changelog.Update")} {changeLog[0].update}. {t("Changelog.LastUpdated")} {changeLog[0].date}.
      </Button>
      <Dialog open={open} onClose={handleClose} scroll={scroll} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="md" fullWidth>
        <DialogTitle disableTypography align="center" id="scroll-dialog-title">
          <Typography color="primary" variant="h4">
            {t("Changelog.Header")}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {changeLog.map((key) => (
            <Accordion elevation={0} style={{ backgroundColor: "rgb(82, 82, 82)" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>
                  {t("Changelog.Version")}: {key.version} - {t("Changelog.Update")}: {key.update} - {t("Changelog.Date")}: {key.date}
                </Typography>
              </AccordionSummary>
              <Divider variant="middle" />
              <AccordionDetails>
                <Grid container spacing={1}>
                  {key.changes.map((changes) => (
                    <Grid item xs={12}>
                      <Typography> • {changes}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
