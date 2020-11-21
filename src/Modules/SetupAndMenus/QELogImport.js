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
  importHealerLogData,
  importSummaryData,
  importDamageLogData,
  importCastsLogData,
} from "../CooldownPlanner/Functions/Functions";
import FightSelectorButton from "../CooldownPlanner/ModuleComponents/LogFightSelection/FightSelectorButton";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import bossIcons from "../CooldownPlanner/Functions/IconFunctions/BossIcons";

// const useStyles = makeStyles((theme) => ({
//   root: { height: 500 },
// }));

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export default function QELogImport(props) {
  // const classes = useStyles;

  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [reportId, setReportId] = React.useState("");

  const [time, setTime] = React.useState("");
  const [timeend, setTimeend] = React.useState("");
  const [nextpage, setNextpage] = React.useState("");
  const [currentFighttime, setCurrentFighttime] = React.useState("");
  const [bossName, setBossName] = React.useState("");
  const [killWipe, setKillWipe] = React.useState("");
  const [currentBossID, setCurrentBossID] = React.useState("");
  const [healers, setHealers] = React.useState([]);
  const [currentDifficulty, setCurrentDifficulty] = React.useState("");
  const [showSelectedFight, setShowSelectedFight] = React.useState(false);

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
      setCurrentDifficulty(logDifficulty(info[6])),
      setCurrentFighttime(info[3]),
      setKillWipe(info[4]),
      setCurrentBossID(info[5]);
    setShowSelectedFight(true);
  };

  const importLogDataQE = async (starttime, endtime, reportID) => {
    //  Set the Loading State of the loading spinner so that the user knows data is being loaded.
    // Fight Length of the selected report is calculated and coverted to seconds as a string
    const fightLength = moment
      .duration(fightDurationCalculator(endtime, starttime))
      .asSeconds()
      .toString();

    // Import Healer Info from the Logs healing table for each healing class.
    // See: "importHealerLogData" in the functions file for more info.
    const healers = await importHealerLogData(starttime, endtime, reportID);

    // Import summary Info from the Logs Summary table.
    // This contains our data for Gear, Stats, Conduits, Soulbinds etc etc.
    // See: "importSummaryData" in the functions file for more info.
    const summary = await importSummaryData(starttime, endtime, reportID);

    // Import all the damage-taken from the log for friendly targets.
    // See: "importDamageLogData" in the functions file for more info.
    const damage = await importDamageLogData(starttime, endtime, reportID);

    // Map Healer Data for ID, Name and Class.
    const healerIDName = healers.map((key) => ({
      id: key.id,
      name: key.name,
      class: key.type,
    }));

    // Import the log data for Casts for each healer in the log.
    // See: "importCastsLogData" fpr mpre info.
    const cooldowns = await importCastsLogData(
      starttime,
      endtime,
      reportID,
      healers.map((key) => key.id)
    );

    setHealers(healerIDName);
  };
  console.log(healers);
  return (
    <div>
      <Button style={{ color: "white" }} onClick={handleClickOpen}>
        {t("QeHeader.InsertLogLabel")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          Paste Your Warcraft Logs Report Here
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <LogLinkInput
                changed={reportidHandler}
                reportid={reportId}
                styleProps={{ fullWidth: true }}
              />
            </Grid>
            <Grid item xs={3}>
              <FightSelectorButton
                reportid={reportId}
                clicky={handler}
                update={importLogDataQE}
                customStyle={{ height: 400 }}
              />
            </Grid>
            <Grid item xs={9} style={{ alignSelf: "center" }}>
              <Typography
                style={{
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  whiteSpace: "nowrap",
                }}
                align="center"
                color="primary"
              >
                {bossIcons(currentBossID)}
                {showSelectedFight
                  ? bossName +
                    " - " +
                    currentDifficulty +
                    " - " +
                    currentFighttime +
                    " - " +
                    killWipe
                  : "Please Select a Fight"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                //   className={classes.formControl}
                variant="outlined"
                size="small"
                fullWidth
              >
                <InputLabel id="HealerSelector">{t("Name")}</InputLabel>
                <Select
                  value={props.value}
                  label={t("Name")}
                  labelId="HealerSelector"
                  onChange={(e) => {}}
                  MenuProps={menuStyle}
                >
                  {healers.map((key, i) => (
                    <MenuItem key={i} value={key.name}>
                      {key.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
