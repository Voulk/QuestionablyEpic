import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import LogLinkInput from "../CooldownPlanner/ModuleComponents/LogFightSelection/LogLinkInput";
import {
  warcraftLogReportID,
  logDifficulty,
  importSummaryData,
  importDamageLogData,
} from "../CooldownPlanner/Functions/Functions";
import FightSelectorButton from "../CooldownPlanner/ModuleComponents/LogFightSelection/FightSelectorButton";
import bossIcons from "../CooldownPlanner/Functions/IconFunctions/BossIcons";
import {
  convertLogSpellOutput,
  convertLogStatOutput,
} from "../Player/PlayerUtilities";

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
  const characterCount = props.allChars.getAllChar().length || 0;
  const [selectValue, setSelectValue] = React.useState("");

  // This is passed down to the Fight Selection button and returns the data here.
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

  // Returns data from the selected log based on the current characters specialization.
  const importHealerNamesFromLogsQE = async (starttime, endtime, reportid) => {
    let classSpec = "";
    let classIcon = "";
    let healerNames = [];
    const APIHEALING =
      "https://www.warcraftlogs.com:443/v1/report/tables/healing/";
    const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
    const START = "?start=";
    const END = "&end=";
    const spec = props.player.getSpec();
    if (spec === "Restoration Druid") {
      classSpec = "&sourceclass=Druid";
      classIcon = "Druid-Restoration";
    }
    if (spec === "Mistweaver Monk") {
      classSpec = "&sourceclass=Monk";
      classIcon = "Monk-Mistweaver";
    }
    if (spec === "Restoration Shaman") {
      classSpec = "&sourceclass=Shaman";
      classIcon = "Shaman-Restoration";
    }
    if (spec === "Holy Paladin") {
      classSpec = "&sourceclass=Paladin";
      classIcon = "Paladin-Holy";
    }
    if (spec === "Holy Priest") {
      classSpec = "&sourceclass=Priest";
      classIcon = "Priest-Holy";
    }
    if (spec === "Discipline Priest") {
      classSpec = "&sourceclass=Priest";
      classIcon = "Priest-Discipline";
    }
    await axios
      .get(
        APIHEALING +
          reportid +
          START +
          starttime +
          END +
          endtime +
          classSpec +
          API2
      )
      .then((result) => {
        healerNames = Object.keys(result.data.entries)
          .filter((key) => result.data.entries[key].icon === classIcon)
          .map((key) => result.data.entries[key]);
      })
      .catch(function (error) {
        console.log(error);
      });
    return healerNames;
  };

  // Returns detailed data on the player specified from the dropdown
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
    console.log(healers);
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
    let nextPageCasts = 0;
    let casts = [];

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
        casts = Object.keys(result.data.events).map(
          (key) => result.data.events[key]
        );
        nextPageCasts = result.data.nextPageTimestamp;
      })
      .catch(function (error) {
        console.log(error);
      });
    // Loop of the import updating the next page until the next page is undefined (no next page from json return)
    let i = 0;
    if (nextPageCasts !== undefined || null) {
      do {
        await axios
          .get(
            APICast +
              reportid +
              START +
              nextPageCasts +
              END +
              endtime +
              HOSTILITY +
              API2
          )
          .then((result) => {
            casts = casts.concat(
              Object.keys(result.data.events).map(
                (key) => result.data.events[key]
              )
            );
            nextPageCasts = result.data.nextPageTimestamp;
          })
          .catch(function (error) {
            console.log(error);
          });
        i = i + 1;
      } while (nextPageCasts !== undefined || null);
    }
    return casts;
  };

  const importLogDataQE = async (starttime, endtime, reportID) => {
    console.log("Importing Log Data");
    // Map the Healer Table for the currently selected characters specialization
    const healers = await importHealerNamesFromLogsQE(
      starttime,
      endtime,
      reportID
    );
    // set the returned names now so that the drop down populates asap.
    setHealerData(healers);
    // Import summary Info from the Logs Summary table.This contains our data for Gear, Stats, Conduits, Soulbinds etc.
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
    // Set all the returned data to state
    setSummaryData(summary);
    setDamageData(damage);
    setCastData(casts);
    // Stuff
    console.log(healerDataDetailed);
    convertLogSpellOutput(props.player, healerDataDetailed, timeend - time);
    convertLogStatOutput(props.player, summaryData, currentPlayerID);
  };



  // Handler to set PLayer ID when player selected from dropdown
  const playerSelectedHandler = (e) => {
    setSelectValue(e);
    setCurrentPlayerID(
      healerData
        .filter((obj) => {
          return obj.name === e;
        })
        .map((obj) => obj.id)
    );
  };

  // Opens Dialogue on Button CLick
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handler when the dialogue closes, i.e cancel, clickaway or when called. Resets the log state variables.
  const handleClose = () => {
    setOpen(false);
    setCurrentBossID("");
    setBossName("");
    setCurrentDifficulty("");
    setCurrentFighttime("");
    setKillWipe("");
    setShowSelectedFight(false);
  };

  // On submit button click returns detailed data on the player, closes the dialogue and Activates the Confirmation Snackbar
  const handleSubmit = () => {
    importHealerDetailedLogDataQE(time, timeend, reportId, currentPlayerID);
    convertLogSpellOutput(props.player, healerDataDetailed, timeend - time);
    handleClose();
    props.logImportSnack();
    setReportId("");
    setCurrentBossID("");
    setSelectValue("");
  };

  // Handler for setting the report id pasted into the textfield.
  const reportidHandler = (event) => {
    setReportId(warcraftLogReportID(event.target.value));
  };

  return (
    <div>
      <Button
        style={{ whiteSpace: "nowrap" }}
        onClick={handleClickOpen}
        //disabled={characterCount === 0}
        disabled={true}
      >
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
          {t("InsertLog.InsertLogHeader")}
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
                disabled={reportId === "" ? true : false}
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
                  : t("InsertLog.PlsSelectFight")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                disabled={currentBossID === "" ? true : false}
              >
                <InputLabel id="HealerSelector">{t("Name")}</InputLabel>
                <Select
                  value={selectValue}
                  label={t("Name")}
                  labelId="HealerSelector"
                  onChange={(e) => playerSelectedHandler(e.target.value)}
                  MenuProps={menuStyle}
                >
                  {healerData.map((key, i) => (
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
          <Button onClick={handleClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button
            disabled={selectValue === "" ? true : false}
            onClick={handleSubmit}
            color="primary"
          >
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
