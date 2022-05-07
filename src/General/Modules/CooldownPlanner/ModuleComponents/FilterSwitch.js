import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import abilityIcons from "../Functions/IconFunctions/AbilityIcons";

export default function FilterCheckbox(props) {
  const { label } = props;
  return <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={abilityIcons(parseInt(label), { height: 20, width: 20 })} />;
}
