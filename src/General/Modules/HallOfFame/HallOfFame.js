import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Grid, Divider, Paper } from "@material-ui/core";
import { dbGetHallOfFame } from "General/Modules/SetupAndMenus/ConnectionUtilities";

export default function HallOfFame(props) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [names, setNames] = React.useState([]);
  useEffect(() => {
    dbGetHallOfFame(setNames);
  }, []);
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
    <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 5, marginTop: 20, textAlign: "center" }}>
      <Button color="primary" variant="outlined" style={{ whiteSpace: "nowrap" }} onClick={handleClickOpen}>
        {t("HallOfFame.buttonLabel")}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true} scroll="body">
        <AppBar position="static" elevation={1} style={{ padding: "8px 0px" }}>
          <Typography align="center" color="secondary" variant="h4">
            {t("HallOfFame.title")}
          </Typography>
        </AppBar>
        <Typography align="center" style={{ color: "limegreen", marginTop: 8, marginBottom: 8 }} variant="h6">
          {t("HallOfFame.introduction")}
        </Typography>
        <DialogContent style={{ minHeight: 400 }}>
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={12}>
              <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                  <Paper elevation={0} style={{ backgroundColor: "#525252" }}>
                    <AppBar
                      elevation={0}
                      position="static"
                      style={{
                        backgroundColor: "#04E07C",
                        borderRadius: "4px 4px 0px 0px",
                      }}
                    >
                      <Typography variant="h6" align="center">
                        {t("PatreonTiers.RollsRoyce")}
                      </Typography>
                    </AppBar>

                    <Grid item xs={12} style={{ marginTop: 8, paddingBottom: 8 }}>
                      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
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
                              <Divider variant="middle" />
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                  <Paper elevation={0} style={{ backgroundColor: "#525252" }}>
                    <AppBar
                      elevation={0}
                      position="static"
                      style={{
                        backgroundColor: "#FFB6C1",
                        borderRadius: "4px 4px 0px 0px",
                      }}
                    >
                      <Typography variant="h6" align="center">
                        {t("PatreonTiers.Diamond")}
                      </Typography>
                    </AppBar>

                    <Grid item xs={12} style={{ marginTop: 8, paddingBottom: 8 }}>
                      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
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
                              <Divider variant="middle" />
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                  <Paper elevation={0} style={{ backgroundColor: "#525252" }}>
                    <AppBar
                      elevation={0}
                      position="static"
                      style={{
                        backgroundColor: "#DAA520",
                        borderRadius: "4px 4px 0px 0px",
                      }}
                    >
                      <Typography variant="h6" align="center">
                        {t("PatreonTiers.Gold")}
                      </Typography>
                    </AppBar>

                    <Grid item xs={12} style={{ marginTop: 8, paddingBottom: 8 }}>
                      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
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
                              <Divider variant="middle" />
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions />
      </Dialog>
    </div>
  );
}
