import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Dialog, DialogContent, Typography, Grid, Divider, Paper, Link } from "@material-ui/core";
import { dbGetHallOfFame } from "General/Modules/SetupAndMenus/ConnectionUtilities";

export default function HallOfFame() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [names, setNames] = React.useState([]);

  /* ---------------------------------------------------------------------------------------------- */
  /*                               Get Patron Names on Component load                               */
  /* ---------------------------------------------------------------------------------------------- */
  useEffect(() => {
    dbGetHallOfFame(setNames);
  }, []);

  /* ---------------------------------------------------------------------------------------------- */
  /*                             Open / Close handlers for dialog popup                             */
  /* ---------------------------------------------------------------------------------------------- */
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Styles                                             */
  /* ---------------------------------------------------------------------------------------------- */
  const appBarStyle = { backgroundColor: "#191c2391", borderRadius: "4px 4px 0px 0px", borderBottom: "1px solid rgba(255, 255, 255, 0.22)" };
  const nameContainerStyle = { paddingTop: 4, paddingBottom: 8 };
  const paperStyle = { backgroundColor: "#2a2c30", border: "1px solid rgba(255, 255, 255, 0.22)" };

  return (
    <div>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                      Button to open dialog                                     */
      /* ----------------------------------------------------------------------------------------------  */}
      <Link component="button" variant="subtitle2" color="primary" onClick={handleClickOpen} underline="none">
        {t("HallOfFame.buttonLabel")}
      </Link>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true} scroll="body">
        {/* ---------------------------------------------------------------------------------------------- */
        /*                                          Dialog Title                                          */
        /* ----------------------------------------------------------------------------------------------  */}
        <Typography align="center" color="primary" variant="h3" style={{ marginTop: 10 }}>
          {t("HallOfFame.title")}
        </Typography>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                     Dialog Intro / Message                                     */
        /* ----------------------------------------------------------------------------------------------  */}
        <Typography align="center" style={{ color: "goldenrod" }} variant="h6">
          {t("HallOfFame.introduction")}
        </Typography>

        <Divider />

        {/* ---------------------------------------------------------------------------------------------- */
        /*               Dialog Content containing the grid components for each patron tier               */
        /* ----------------------------------------------------------------------------------------------  */}
        <DialogContent style={{ minHeight: 400 }}>
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
            {/* ---------------------------------------------------------------------------------------------- */
            /*                                           Rolls Royce                                          */
            /* ----------------------------------------------------------------------------------------------  */}
            <Grid item xs={12}>
              <Paper elevation={0} style={paperStyle}>
                <AppBar elevation={0} position="static" style={appBarStyle}>
                  <Typography style={{ color: "#04E07C" }} variant="h5" align="center">
                    {t("PatreonTiers.RollsRoyce")}
                  </Typography>
                </AppBar>

                {/* ---------------------------------------- Patron Names ---------------------------------------- */}
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" style={nameContainerStyle}>
                  {names
                    .filter((key) => key.tier === "Rolls Royce")
                    .map((key, i) => (
                      <Grid item xs={4} key={"RR" + i}>
                        <Typography
                          color="primary"
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
                </Grid>
              </Paper>
            </Grid>

            {/* ---------------------------------------------------------------------------------------------- */
            /*                                             Diamond                                            */
            /* ----------------------------------------------------------------------------------------------  */}
            <Grid item xs={12}>
              <Paper elevation={0} style={paperStyle}>
                <AppBar elevation={0} position="static" style={appBarStyle}>
                  <Typography style={{ color: "#FFB6C1" }} variant="h5" align="center">
                    {t("PatreonTiers.Diamond")}
                  </Typography>
                </AppBar>

                {/* ---------------------------------------- Patron Names ---------------------------------------- */}
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" style={nameContainerStyle}>
                  {names
                    .filter((key) => key.tier === "Diamond")
                    .map((key, i) => (
                      <Grid item xs={4} key={"D" + i}>
                        <Typography
                          color="primary"
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
                </Grid>
              </Paper>
            </Grid>

            {/* ---------------------------------------------------------------------------------------------- */
            /*                                              Gold                                              */
            /* ----------------------------------------------------------------------------------------------  */}
            <Grid item xs={12}>
              <Paper elevation={0} style={paperStyle}>
                <AppBar elevation={0} position="static" style={appBarStyle}>
                  <Typography style={{ color: "#DAA520" }} variant="h5" align="center">
                    {t("PatreonTiers.Gold")}
                  </Typography>
                </AppBar>

                {/* ---------------------------------------- Patron Names ---------------------------------------- */}
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" style={nameContainerStyle}>
                  {names
                    .filter((key) => key.tier === "Gold")
                    .map((key) => (
                      <Grid item xs={4} key={"G" + i}>
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
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
