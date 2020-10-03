import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
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
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              name="checkedA"
              size="small"
            />
          }
          label={props.label}
        />
      </FormGroup>
    </ThemeProvider>
  );
}