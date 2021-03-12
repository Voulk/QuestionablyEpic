import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// Severity Options
//"error", "warning", "info", "success"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function QESnackbar(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={2000} onClose={props.onClose} anchorOrigin={props.anchorOrigin}>
        <Alert onClose={props.onClose} severity={props.severity}>
          {t(props.message)}
        </Alert>
      </Snackbar>
    </div>
  );
}
