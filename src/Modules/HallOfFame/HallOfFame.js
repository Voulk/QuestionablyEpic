import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { runSimC } from "../Engine/SimCImport/SimCImportEngine";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

export default function HallOfFame(props) {
  const names = [
    { tier: "Rolls Royce", name: "Bill Murray" },
    { tier: "Rolls Royce", name: "Jennifer Phillips" },
    { tier: "Rolls Royce", name: "Ptolemy" },
    { tier: "Diamond", name: "SmokinJoe" },
    { tier: "Diamond", name: "Diamond Steve" },
    { tier: "Gold", name: "Bruce" },
  ];
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let color = {
    "Rolls Royce Edition": "#04E07C",
    "Diamond Edition": "#FFB6C1",
    "Gold Edition": "#DAA520",
    "Standard Edition": "#FFFFFF",
    "Basic Edition": "#FFFFFF",
  };

  let patronStatus = "Rolls Royce Edition";

  return (
    <div>
      <Button
        color="primary"
        style={{ whiteSpace: "nowrap" }}
        onClick={handleClickOpen}
      >
        {t("HallOfFame.buttonLabel")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
        scroll="body"
      >
        <DialogTitle
          disableTypography
          color="primary"
          variant="h6"
          align="center"
          id="form-dialog-title"
        >
          <Typography color="primary" variant="h3">
            {t("HallOfFame.title")}
          </Typography>
          <Divider variant="middle" />
          <Typography style={{ color: "limegreen" }} variant="h6">
            Below are the mighty patrons of Questionably Epic, without their
            contributions this site could not continue. As thanks we name them
            for their contributions
          </Typography>
        </DialogTitle>

        <DialogContent style={{ height: 400 }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{
                  color: "#04E07C",
                  border: "1px solid #04E07C",
                  borderRadius: 4,
                }}
                align="center"
              >
                Rolls Royce Patrons
              </Typography>
            </Grid>
            {names
              .filter((key) => key.tier === "Rolls Royce")
              .map((key) => (
                <Grid item xs={4}>
                  <Typography
                    style={{
                      borderRadius: 4,
                      color: "#04E07C",
                    }}
                    align="center"
                  >
                    {key.name}
                  </Typography>
                </Grid>
              ))}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{
                  color: "#FFB6C1",
                  border: "1px solid #FFB6C1",
                  borderRadius: 4,
                }}
                align="center"
              >
                Diamond Patrons
              </Typography>
            </Grid>
            {names
              .filter((key) => key.tier === "Diamond")
              .map((key) => (
                <Grid item xs={4}>
                  <Typography
                    style={{
                      borderRadius: 4,
                      color: "#FFB6C1",
                    }}
                    align="center"
                  >
                    {key.name}
                  </Typography>
                </Grid>
              ))}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{
                  color: "#DAA520",
                  border: "1px solid #DAA520",
                  borderRadius: 4,
                }}
                align="center"
              >
                Gold Patrons
              </Typography>
            </Grid>
            {names
              .filter((key) => key.tier === "Gold")
              .map((key) => (
                <Grid item xs={4}>
                  <Typography
                    style={{
                      borderRadius: 4,
                      color: "#DAA520",
                    }}
                    align="center"
                  >
                    {key.name}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </DialogContent>

        <DialogActions />
      </Dialog>
    </div>
  );
}
