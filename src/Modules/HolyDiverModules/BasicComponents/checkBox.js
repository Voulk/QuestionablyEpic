import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './checkBox.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#d3bc47' },
    secondary: { main: '#e0e0e0' }
  }
});

export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.check(event.target.checked)
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormControlLabel
          style={{ color: 'white' }}
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              size="small"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />}
          label={props.label}
        />
      </ThemeProvider>
    </div>
  );
}