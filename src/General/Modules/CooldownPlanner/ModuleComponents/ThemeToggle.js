import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleCooldownPlannerThemeStatus } from "../../../../Redux/Actions";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function CooldownPlannerThemeCheckbox() {
  const dispatch = useDispatch();

  const handleChange = (event, content) => {
    dispatch(toggleCooldownPlannerThemeStatus(content));
  };
  const checked = useSelector((state) => state.cooldownPlannerTheme);

  return <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />} label="Toggle Theme" />;
}
