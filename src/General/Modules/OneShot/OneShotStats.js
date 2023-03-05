import * as React from "react";
import { Grid, ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getTranslatedStats } from "locale/statsLocale.js";

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
    <Grid item xs={12} container direction="row" justifyContent="center" alignItems="center" spacing={1}>
      {/* -------------------------------- Stamina -------------------------------  */}
      <Grid item xs={12}>
        <TextField
          id="StaminaInput"
          type="number"
          label={getTranslatedStats("Stamina", currentLanguage)}
          style={{ textAlignLast: "center" }}
          inputProps={inputProps}
          InputProps={InputProps}
          value={stamina}
          onChange={handleStamina}
          variant="outlined"
          size="small"
          disabled={false}
        />
      </Grid>

      {/* ----------------------------- Avoidance ----------------------------  */}
      <Grid item xs={12}>
        <TextField
          id="AvoidanceInput"
          label={getTranslatedStats("Avoidance", currentLanguage)}
          style={{ textAlignLast: "center" }}
          inputProps={inputProps}
          InputProps={InputProps}
          type="number"
          value={avoidance}
          onChange={handleAvoidance}
          variant="outlined"
          size="small"
        />
      </Grid>

      {/* ---------------------------------- Armor ---------------------------------  */}
      <Grid item xs={12}>
        <TextField
          id="HasteInput"
          label={getTranslatedStats("Armor", currentLanguage)}
          style={{ textAlignLast: "center" }}
          inputProps={inputProps}
          InputProps={InputProps}
          type="number"
          value={armor}
          onChange={handleArmor}
          variant="outlined"
          size="small"
        />
      </Grid>

      {/* --------------------------------- Absorb --------------------------------  */}
      <Grid item xs={12}>
        <TextField
          id="AbsorbInput"
          label={getTranslatedStats("Absorb", currentLanguage)}
          style={{ textAlignLast: "center" }}
          inputProps={inputProps}
          InputProps={InputProps}
          type="number"
          value={absorb}
          onChange={handleAbsorb}
          variant="outlined"
          size="small"
        />
      </Grid>

      {/* ------------------------------- Versatility ------------------------------  */}
      <Grid item xs={12}>
        <TextField
          id="VersatilityInput"
          label={getTranslatedStats("Versatility", currentLanguage)}
          style={{ textAlignLast: "center" }}
          inputProps={inputProps}
          InputProps={InputProps}
          type="number"
          value={versatility}
          onChange={handleVers}
          variant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  );
}
