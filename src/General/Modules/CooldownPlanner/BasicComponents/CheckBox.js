import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core/Checkbox";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: "0.8rem",
      },
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.check(event.target.checked);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormControlLabel
          style={{ color: "white" }}
          control={<Checkbox checked={checked} onChange={handleChange} size="small" style={{ padding: "4px" }} inputProps={{ "aria-label": "checkbox" }} />}
          label={props.label}
        />
      </ThemeProvider>
    </div>
  );
}
