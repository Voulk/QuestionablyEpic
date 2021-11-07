import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography, Link } from "@material-ui/core";
import { changeLog } from "./Log";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  buttonStyle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      maxWidth: 300,
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: 12,
      textTransform: "none",
    },
  },
}));

export default function Changelog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link component="button" variant="subtitle2" style={{ color: "white" }} onClick={handleClickOpen("paper")} underline="none">
        {t("Changelog.Header")}
      </Link>
      <Dialog open={open} onClose={handleClose} scroll={scroll} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="md" fullWidth>
        <DialogTitle disableTypography align="center" id="scroll-dialog-title">
          <Typography color="primary" variant="h4">
            {t("Changelog.Header")}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {changeLog.slice(0, 5).map((key, i) => (
            <Accordion elevation={0} style={{ backgroundColor: "rgb(82, 82, 82)" }} key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>
                  {t("Changelog.Version")}: {key.version} - {t("Changelog.Update")}: {key.update} - {t("Changelog.Date")}: {key.date}
                </Typography>
              </AccordionSummary>
              <Divider variant="middle" />
              <AccordionDetails>
                <Grid container spacing={1}>
                  {key.changes.map((changes, i) => (
                    <Grid item xs={12} key={i}>
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
