import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material/Checkbox";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(adaptV4Theme({
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: "0.8rem",
      },
    },
  },
  palette: {
    mode: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
}));

export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.check(event.target.checked);
  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <FormControlLabel
            style={{ color: "white" }}
            control={<Checkbox checked={checked} onChange={handleChange} size="small" style={{ padding: "4px" }} inputProps={{ "aria-label": "checkbox" }} />}
            label={props.label}
          />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}
