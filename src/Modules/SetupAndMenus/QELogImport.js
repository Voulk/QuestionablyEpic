import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import LogLinkInput from "../CooldownPlanner/ModuleComponents/LogFightSelection/LogLinkInput";
import {
  warcraftLogReportID,
  logDifficulty,
  importHealerLogData,
  importSummaryData,
  importDamageLogData,
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
import axios from "axios";
import {convertLogOutput} from '../Player/PlayerUtilities';

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
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [reportId, setReportId] = React.useState("");
  const [time, setTime] = React.useState("");
  const [timeend, setTimeend] = React.useState("");
  const [nextpage, setNextpage] = React.useState("");
  const [currentFighttime, setCurrentFighttime] = React.useState("");
  const [bossName, setBossName] = React.useState("");
  const [killWipe, setKillWipe] = React.useState("");
  const [currentBossID, setCurrentBossID] = React.useState("");
  const [currentDifficulty, setCurrentDifficulty] = React.useState("");
  const [showSelectedFight, setShowSelectedFight] = React.useState(false);

  const [healerData, setHealerData] = React.useState([]);
  const [healerDataDetailed, setHealerDataDetailed] = React.useState([]);
  const [summaryData, setSummaryData] = React.useState([]);
  const [damageData, setDamageData] = React.useState([]);
  const [castData, setCastData] = React.useState([]);
  const [currentPlayerID, setCurrentPlayerID] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    importHealerDetailedLogDataQE(time, timeend, reportId, currentPlayerID);
    setOpen(false);
    props.logImportSnack();
  };

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

  const importHealerDetailedLogDataQE = async (
    starttime,
    endtime,
    reportid,
    playerID
  ) => {
    const APIHEALING =
      "https://www.warcraftlogs.com:443/v1/report/tables/healing/";
    const APISOURCEID = "&sourceid=";
    const APICODE = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
    const START = "?start=";
    const END = "&end=";
    let healers = [];
    // Class Casts Import

    await axios
      .get(
        APIHEALING +
          reportid +
          START +
          starttime +
          END +
          endtime +
          APISOURCEID +
          playerID +
          APICODE
      )
      .then((result) => {
        healers = Object.keys(result.data.entries).map(
          (key) => result.data.entries[key]
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    setHealerDataDetailed(healers);
  };

  const importCastsLogDataQE = async (
    starttime,
    endtime,
    reportid,
    healerID
  ) => {
    const APICast = "https://www.warcraftlogs.com:443/v1/report/events/casts/";
    const START = "?start=";
    const END = "&end=";
    const HOSTILITY = "&hostility=0";
    const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
    let nextpage = 0;
    let cooldowns = [];

    await axios
      .get(
        APICast +
          reportid +
          START +
          starttime +
          END +
          endtime +
          HOSTILITY +
          API2
      )
      .then((result) => {
        cooldowns = Object.keys(result.data.events).map(
          (key) => result.data.events[key]
        );
        nextpage = result.data.nextPageTimestamp;
      })
      .catch(function (error) {
        console.log(error);
      });
    // Loop of the import updating the next page until the next page is undefined (no next page from json return)
    let i = 0;
    if (nextpage !== undefined || null) {
      do {
        await axios
          .get(
            APICast +
              reportid +
              START +
              nextpage +
              END +
              endtime +
              HOSTILITY +
              API2
          )
          .then((result) => {
            cooldowns = cooldowns.concat(
              Object.keys(result.data.events).map(
                (key) => result.data.events[key]
              )
            );
            nextpage = result.data.nextPageTimestamp;
          })
          .catch(function (error) {
            console.log(error);
          });
        i = i + 1;
      } while (nextpage !== undefined || null);
    }
    return cooldowns;
  };

  const importLogDataQE = async (starttime, endtime, reportID) => {
    // Map the Healer Table for Each Spec to get the healer names.
    const healers = await importHealerLogData(starttime, endtime, reportID);

    // Import summary Info from the Logs Summary table.
    // This contains our data for Gear, Stats, Conduits, Soulbinds etc etc.
    const summary = await importSummaryData(starttime, endtime, reportID);

    // Import all the damage-taken from the log for friendly targets.
    const damage = await importDamageLogData(starttime, endtime, reportID);

    // Import the log data for Casts for each healer in the log.
    const casts = await importCastsLogDataQE(
      starttime,
      endtime,
      reportID,
      healers.map((key) => key.id)
    );

    setHealerData(healers);
    setSummaryData(summary);
    setDamageData(damage);
    setCastData(casts);
    
  };

  const playerSelectedHandler = (e) => {
    setCurrentPlayerID(e);
  };

  console.log(healerData);
  console.log(summaryData);
  console.log(damageData);
  console.log(castData);
  console.log(healerDataDetailed);
  convertLogOutput(props.player, healerDataDetailed, timeend - time);

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
                  onChange={(e) => playerSelectedHandler(e.target.value)}
                  MenuProps={menuStyle}
                >
                  {healerData.map((key, i) => (
                    <MenuItem key={i} value={key.id}>
                      {key.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
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
