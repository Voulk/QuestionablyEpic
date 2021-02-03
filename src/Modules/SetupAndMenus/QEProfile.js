import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField, Paper, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import ls from "local-storage";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "45%",
      justifyContent: "center",
    },
  },
}));

export default function QEProfile(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = React.useState(ls.get("email") || "");
  const [emailTemp, setEmailTemp] = React.useState("");
  const emailHandler = (event) => {
    if (emailTemp.length > 3 && emailTemp.length < 92) {
      props.setEmail(event);
      setEmail(event);
      props.emailSnack();
    } else {
      props.emailSnackError();
    }
  };

  let patronStatus = props.patronStatus !== "" ? props.patronStatus + " " + t("QeProfile.EditionAffix") : t("QeProfile.StandardEdition");

  let color = {
    "Rolls Royce Edition": "#04E07C",
    "Diamond Edition": "#FFB6C1",
    "Gold Edition": "#DAA520",
    "Standard Edition": "#FFFFFF",
    "Basic Edition": "#FFFFFF",
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" align="center" style={{ padding: "10px 10px 5px 10px" }}>
            {t("QeProfile.ProfileHeader")}
          </Typography>
          <Paper elevation={0} style={{ padding: 10 }}>
            <div style={{ display: "flex" }}>
              <Typography variant="body1" gutterBottom color="primary" align="left" style={{ display: "flex" }}>
                {t("Battletag")}:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" style={{ paddingLeft: 10, color: "#fff" }}>
                {props.playerTag || t("QeProfile.NoBattleTag")}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography variant="body1" gutterBottom color="primary" align="left" style={{ display: "flex" }}>
                {t("Email")}:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" style={{ paddingLeft: 10, color: "#fff" }}>
                {email || t("QeProfile.NoEmail")}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography variant="body1" gutterBottom color="primary" align="left" style={{ display: "flex" }}>
                {t("QeProfile.QeTier")}:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" style={{ paddingLeft: 10, color: color[patronStatus] }}>
                {patronStatus}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom color="primary">
              {t("QeProfile.EmailMsg")}
            </Typography>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} wrap="nowrap">
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={emailTemp}
                  type="email"
                  fullWidth
                  size="small"
                  onChange={(e) => setEmailTemp(e.target.value)}
                />
              </Grid>
              <Grid item xs="auto">
                <Button variant="contained" color="primary" onClick={(e) => emailHandler(emailTemp)}>
                  {t("Save")}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
