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
  const names = ["bob", "jim", "fred", "xxnoscoperxx"];
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
      >
        <DialogTitle
          disableTypography
          color="primary"
          variant="h6"
          align="center"
          id="form-dialog-title"
          style={{ color: "#F2BF59" }}
        >
          <Typography variant="h3">{t("HallOfFame.title")}</Typography>
          <Divider />
        </DialogTitle>

        <DialogContent style={{ height: 400 }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{
                  color: "#04E07C",
                }}
                align="center"
              >
                Rolls Royce Patrons
              </Typography>
            </Grid>
            {names.map((key) => (
              <Grid item xs={2}>
                <Typography
                  style={{
                    border: "1px solid #04E07C",
                    borderRadius: 4,
                    color: color[patronStatus],
                  }}
                  align="center"
                >
                  {key}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{
                  color: "#FFB6C1",
                }}
                align="center"
              >
                Diamond Patrons
              </Typography>
            </Grid>
            {names.map((key) => (
              <Grid item xs={2}>
                <Typography
                  style={{
                    border: "1px solid #FFB6C1",
                    borderRadius: 4,
                    color: "#FFB6C1",
                  }}
                  align="center"
                >
                  {key}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{
                  color: "#DAA520",
                }}
                align="center"
              >
                Gold Patrons
              </Typography>
            </Grid>
            {names.map((key) => (
              <Grid item xs={2}>
                <Typography
                  style={{
                    border: "1px solid #DAA520",
                    borderRadius: 4,
                    color: "#DAA520",
                  }}
                  align="center"
                >
                  {key}
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
