import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import LogLinkInput from "../CooldownPlanner/ModuleComponents/LogFightSelection/LogLinkInput";
import {
  fightDurationCalculator,
  warcraftLogReportID,
  logDifficulty,
  importLogDataQE,
} from "../CooldownPlanner/Functions/Functions";
import FightSelectorButton from "../CooldownPlanner/ModuleComponents/LogFightSelection/FightSelectorButton";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

// const useStyles = makeStyles((theme) => ({
//   root: { height: 500 },
// }));

export default function QELogImport(props) {
  // const classes = useStyles;

  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [reportId, setReportId] = React.useState("");

  const [time, setTime] = React.useState(false);
  const [timeend, setTimeend] = React.useState(false);
  const [nextpage, setNextpage] = React.useState(false);
  const [currentFighttime, setCurrentFighttime] = React.useState(false);
  const [bossName, setBossName] = React.useState(false);
  const [killWipe, setKillWipe] = React.useState(false);
  const [currentBossID, setCurrentBossID] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {};

  const reportidHandler = (event) => {
    setReportId(warcraftLogReportID(event.target.value));
  };

  const handler = (info) => {
    setTime(info[0]),
      setTimeend(info[1]),
      setNextpage(info[0]),
      setBossName(info[2]),
      setCurrentFighttime(info[3]),
      setKillWipe(info[4]),
      setCurrentBossID(info[5]);
  };

  console.log(
    time,
    timeend,
    nextpage,
    currentFighttime,
    bossName,
    killWipe,
    currentBossID
  );
  //   const handlerNew = handler.bind(this);

  return (
    <div>
      <Button style={{ color: "white" }} onClick={handleClickOpen}>
        {t("QeHeader.InsertLogLabel")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Paste Your SimC String</DialogTitle>
        <DialogContent style={{ height: 400 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <LogLinkInput changed={reportidHandler} reportid={reportId} />
            </Grid>
            <Grid item xs={6}>
              <FightSelectorButton
                reportid={reportId}
                clicky={handler}
                update={importLogDataQE}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <p id="SimCError">{errorMessage}</p>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
