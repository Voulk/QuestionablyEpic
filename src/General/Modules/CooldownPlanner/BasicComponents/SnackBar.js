import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import makeStyles from '@mui/styles/makeStyles';
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
