import * as React from "react";
import { Grid, ToggleButtonGroup, ToggleButton, TextField, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getTranslatedStats } from "locale/statsLocale.js";
import { alpha, styled } from "@mui/material/styles";

const QETextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#424242",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function OneShotStats(props) {
  const { setVersatility, setAvoidance, setStamina, setArmor, setAbsorb, versatility, avoidance, stamina, armor, absorb } = props;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const inputProps = {
    step: 1,
    style: { fontSize: "1.2rem", textAlignLast: "center" },
    min: 0,
    // max: 10,
  };
  const InputProps = {
    style: { fontSize: "1.2rem", textAlignLast: "center" },
    inputmode: "numeric",
    pattern: "[0-9]*",
    disableUnderline: true,
  };

  /* -------------------------------------------------------------------------- */
  /*              Stat Handlers (Sets the relevant stat on change)              */
  /* -------------------------------------------------------------------------- */

  const handleVers = (event) => {
    setVersatility(parseInt(parseFloat(event.target.value).toFixed(1)));
  };
  const handleStamina = (event) => {
    setStamina(parseInt(parseFloat(event.target.value).toFixed(1)));
  };
  const handleArmor = (event) => {
    setArmor(parseInt(parseFloat(event.target.value).toFixed(1)));
  };
  const handleAvoidance = (event) => {
    setAvoidance(parseInt(parseFloat(event.target.value).toFixed(1)));
  };
  const handleAbsorb = (event) => {
    setAbsorb(parseInt(parseFloat(event.target.value).toFixed(1)));
  };

  return (
    <Grid item xs={12}>
      <Paper
        style={{
          border: "1px solid rgba(255, 255, 255, 0.24)",
          //   backgroundColor: "#2c2c2c",

          padding: "0px 8px 8px 8px",
        }}
        elevation={0}
      >
        <Grid container direction="row" justifyContent="start" alignItems="start" spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {"Stats"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1}>
              {/* -------------------------------- Stamina -------------------------------  */}
              <Grid item xs={2}>
                <QETextField
                  id="StaminaInput"
                  type="number"
                  fullWidth
                  label={getTranslatedStats("Stamina", currentLanguage)}
                  style={{ textAlignLast: "center" }}
                  inputProps={inputProps}
                  InputProps={InputProps}
                  value={stamina}
                  onChange={handleStamina}
                  variant="filled"
                  size="small"
                  disabled={false}
                />
              </Grid>

              {/* ----------------------------- Avoidance ----------------------------  */}
              <Grid item xs={2}>
                <QETextField
                  id="AvoidanceInput"
                  label={getTranslatedStats("Avoidance", currentLanguage)}
                  style={{ textAlignLast: "center" }}
                  inputProps={inputProps}
                  InputProps={InputProps}
                  type="number"
                  fullWidth
                  value={avoidance}
                  onChange={handleAvoidance}
                  variant="filled"
                  size="small"
                />
              </Grid>

              {/* ---------------------------------- Armor ---------------------------------  */}
              <Grid item xs={2}>
                <QETextField
                  id="HasteInput"
                  label={getTranslatedStats("Armor", currentLanguage)}
                  style={{ textAlignLast: "center" }}
                  inputProps={inputProps}
                  InputProps={InputProps}
                  type="number"
                  value={armor}
                  onChange={handleArmor}
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* --------------------------------- Absorb --------------------------------  */}
              <Grid item xs={2}>
                <QETextField
                  id="AbsorbInput"
                  label={getTranslatedStats("Absorb", currentLanguage)}
                  style={{ textAlignLast: "center" }}
                  inputProps={inputProps}
                  InputProps={InputProps}
                  type="number"
                  value={absorb}
                  onChange={handleAbsorb}
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* ------------------------------- Versatility ------------------------------  */}
              <Grid item xs={2}>
                <QETextField
                  id="VersatilityInput"
                  label={getTranslatedStats("Versatility", currentLanguage)}
                  style={{ textAlignLast: "center" }}
                  inputProps={inputProps}
                  InputProps={InputProps}
                  type="number"
                  value={versatility}
                  onChange={handleVers}
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
