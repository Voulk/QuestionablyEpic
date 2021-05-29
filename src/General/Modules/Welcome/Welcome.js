import React from "react";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import logo from "Images/QeAssets/QELogo.png";
import { Button, Box, Dialog, DialogActions, DialogContent, Typography, Grid } from "@material-ui/core";
import ls from "local-storage";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../SetupAndMenus/Header/LanguageButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WelcomeDialog(props) {
  const [open, setOpen] = React.useState(ls.get("welcomeMessage") === true ? false : true);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClickOpen();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Test Welcome Message
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" variant="h3">
                {t("Welcome.WelcomeTo")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img style={{ height: "100%", width: "100%" }} src={logo} alt="QE Live" />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                {t("Welcome.ContinueMessage")}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <LanguageSelector />
            <Button onClick={handleClose} color="primary">
              {t("Welcome.CreateCharacter")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
