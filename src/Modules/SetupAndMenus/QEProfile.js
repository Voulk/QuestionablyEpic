import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Paper,
  Divider,
} from "@material-ui/core";
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
    if (
      RegExp(
        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm
      ).test(emailTemp) ||
      emailTemp === ""
    ) {
      props.setEmail(event);
      setEmail(event);
      props.emailSnack();
    } else {
      props.emailSnackError();
    }
  };

  let patronStatus =
    props.patronStatus !== ""
      ? props.patronStatus + " Edition"
      : "Standard Edition";

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
          <Paper elevation={0} style={{ padding: 10 }}>
            <Typography variant="h6" color="primary" align="center">
              Profile Information
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <Typography
              variant="body1"
              gutterBottom
              color="primary"
              align="left"
              style={{ display: "flex" }}
            >
              Battletag:
              <div style={{ paddingLeft: 10, color: "#fff" }}>
                {props.playerTag || "No Battlenet Account Linked"}
              </div>
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              color="primary"
              align="left"
              style={{ display: "flex" }}
            >
              Email:
              <div style={{ paddingLeft: 10, color: "#fff" }}>
                {email || "No Email Entered"}
              </div>
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              color="primary"
              align="left"
              wrap="nowrap"
              style={{ display: "inline-flex" }}
            >
              QELive Tier:
              <div style={{ paddingLeft: 10, color: color[patronStatus] }}>
                {patronStatus}
              </div>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Enter/Update your Email to link to Patreon
            </Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => emailHandler(emailTemp)}
                >
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
