import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { Theme } from "@mui/material/styles";
import { changeLog } from "./Log";

interface ChangeLog {
  version: string;
  update: string;
  date: string;
  changes: string[];
}

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: (theme as Theme).typography.pxToRem(15),
  fontWeight: (theme as Theme).typography.fontWeightRegular,
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  [(theme as Theme).breakpoints.down("md")]: {
    fontSize: (theme as Theme).typography.pxToRem(14),
    maxWidth: 300,
  },
  [(theme as Theme).breakpoints.up("xs")]: {
    fontSize: (theme as Theme).typography.pxToRem(14),
  },
}));

const Changelog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<"paper" | "body">("paper");
  const { t } = useTranslation();

  const handleClickOpen = (scrollType: "paper" | "body") => () => {
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
        <DialogTitle align="center" id="scroll-dialog-title">
          <Typography color="primary" variant="h4">
            {t("Changelog.Header")}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {changeLog.slice(0, 5).map((key, i) => (
            <Accordion elevation={0} style={{ backgroundColor: "rgb(82, 82, 82)" }} key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Heading>
                  {t("Changelog.Version")}: {key.version} - {t("Changelog.Update")}: {key.update} - {t("Changelog.Date")}: {key.date}
                </Heading>
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
          <ButtonStyle onClick={handleClose} color="primary">
            {t("Cancel")}
          </ButtonStyle>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Changelog;
