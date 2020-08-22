import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import './checkBox.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const FormControlLabel1 = withStyles({
  '.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1': {
    fontSize: '0.8rem',
  },
})((props) => <FormControlLabel color="default" {...props} />);

const GreenCheckbox = withStyles({
    root: {
    color: '#ffee58',
    '&$checked': {
      color: '#ffee58',
    },
  },
    label: {
      color: 'white',
      fontSize: '0.7 rem'
    },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#d3bc47' },
    secondary: { main: '#ff9100' }
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
        <FormControlLabel1 
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