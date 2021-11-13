import React from "react";
import { FormGroup, FormControlLabel, Switch, adaptV4Theme } from "@mui/material";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

const theme = createTheme(adaptV4Theme({
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: "0.7rem",
      },
    },
  },
  palette: {
    mode: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
}));

export default function SwitchLabels(props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.check(event.target.checked);
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <FormGroup row>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} name="checkedA" size="small" disabled={props.disabled} />}
            label={props.label}
            labelPlacement="top"
          />
        </FormGroup>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
