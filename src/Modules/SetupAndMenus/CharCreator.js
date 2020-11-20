import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useTranslation } from "react-i18next";
import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import raceIcons from "../CooldownPlanner/Functions/IconFunctions/RaceIcons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { serverList, classRaceList } from "../CooldownPlanner/Data/Data";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(0.5),
    whiteSpace: "nowrap",
    width: "100%",
    minWidth: 150,
  },
  formRegion: {
    whiteSpace: "nowrap",
    width: "100%",
    marginRight: 1,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textInput: {
    width: "100%",
  },
  root: {
    display: "inline-flex",
    // maxWidth: "260px",
    width: "100%",
    maxHeight: "80px",
    borderColor: "Gold",
    padding: "0px",
    marginRight: "0px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding: "5px",
  },
  large: {
    width: "80px",
    height: "80px",
  },
}));

export default function AddNewChar(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [healClass, setHealClass] = React.useState("");
  const [charName, setCharName] = React.useState("");
  const [regions, setRegions] = React.useState("");
  const [selectedRace, setSelectedRace] = React.useState("");
  const [server, setServer] = React.useState("");
  const region = ["CN", "US", "TW", "EU"];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = (name, spec, allChars, updateChar, region, realm, race) => {
    setOpen(false);
    allChars.addChar(name, spec, region, realm, race);
    updateChar(allChars);
    props.charAddedSnack();
    setSelectedRace("");
    setHealClass("");
    setServer("");
    // setRegions(null);
    setCharName("");
  };
  const handleChangeSpec = (event) => {
    setHealClass(event.target.value);
  };
  const handleChangeRace = (event) => {
    setSelectedRace(event.target.value);
  };
  const handleChangeName = (event) => {
    setCharName(event.target.value);
  };
  const handleChangeRegion = (event) => {
    setRegions(event.target.value);
  };

  const handleChangeServer = (serverName) => {
    setServer(serverName);
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <CardActionArea onClick={handleClickOpen}>
        <Card className={classes.root} variant="outlined" raised={true}>
          <Avatar variant="square" alt="" className={classes.large} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6" component="h4">
                Add Character
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>

      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Character</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12}>
              <TextField
                className={classes.textInput}
                id="standard-basic"
                label="Character Name"
                onChange={handleChangeName}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid container spacing={1} item>
              <Grid item xs={4}>
                <FormControl
                  className={classes.formRegion}
                  variant="outlined"
                  size="small"
                  disabled={charName === "" ? true : false}
                  label={t("Region")}
                >
                  <InputLabel id="NewClassSelector">{t("Region")}</InputLabel>
                  <Select value={regions} onChange={handleChangeRegion}>
                    {Object.values(region).map((key, i) => (
                      <MenuItem key={i} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  size="small"
                  disabled={regions === "" ? true : false}
                  id="server-select"
                  options={serverList[regions]}
                  getOptionLabel={(option) => option}
                  style={{ width: "100%" }}
                  onChange={(e, newValue) => {
                    handleChangeServer(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Server Name"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                size="small"
                disabled={regions === "" ? true : false}
                label={t("Select Class")}
              >
                <InputLabel id="NewClassSelector">
                  {t("Select Class")}
                </InputLabel>
                <Select value={healClass} onChange={handleChangeSpec}>
                  {Object.getOwnPropertyNames(classRaceList).map((key, i) => (
                    <MenuItem key={i} value={key}>
                      {classIcons(key, 20)}
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                disabled={healClass === "" ? true : false}
                className={classes.formControl}
                variant="outlined"
                size="small"
                label={t("Select Race")}
              >
                <InputLabel id="NewRaceSelector">{t("Select Race")}</InputLabel>
                <Select value={selectedRace} onChange={handleChangeRace}>
                  {healClass === ""
                    ? ""
                    : classRaceList[healClass.toString()].races.map(
                        (key, i) => (
                          <MenuItem key={i} value={key}>
                            <div style={{ display: "inline-flex" }}>
                              {raceIcons(key)}
                              {t(key)}
                            </div>
                          </MenuItem>
                        )
                      )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleAdd(
                charName,
                healClass,
                props.allChars,
                props.charUpdate,
                regions,
                server,
                selectedRace
              )
            }
            color="primary"
            disabled={selectedRace === "" ? true : false}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
