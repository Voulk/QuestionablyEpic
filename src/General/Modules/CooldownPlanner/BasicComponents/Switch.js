import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: "0.7rem",
      },
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

export default function SwitchLabels(props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.check(event.target.checked);
  };
  return (
    <ThemeProvider theme={theme}>
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} name="checkedA" size="small" disabled={props.disabled} />}
          label={props.label}
          labelPlacement="top"
        />
      </FormGroup>
    </ThemeProvider>
  );
}
