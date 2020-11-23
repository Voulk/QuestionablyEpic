import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField, Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
  const [email, setEmail] = React.useState("");
  const emailHandler = (event) => {
    setEmail(event);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Enter your Email to link to Patreon
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
              value={email}
              type="email"
              fullWidth
              size="small"
              onChange={(e) => emailHandler(e.target.value)}
            />
          </Grid>
          <Grid item xs="auto">
            <Button variant="contained" color="primary">
              {t("Save")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
