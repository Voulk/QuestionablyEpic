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
          color="primary"
          variant="h6"
          align="center"
          id="form-dialog-title"
          style={{ color: "#F2BF59" }}
        >
          {t("HallOfFame.title")}
        </DialogTitle>

        <DialogContent style={{ height: 400 }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {names.map((key) => (
              <Grid item xs={2}>
                <Typography
                  style={{ border: "1px solid #F2BF59", borderRadius: 4 }}
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
