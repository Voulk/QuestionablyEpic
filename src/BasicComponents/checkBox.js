import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const FormControlLabel1 = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiTypography-body1 ': {
      fontSize: '0.8rem',
    },
    '@media': {
      '.MuiToolbar-regular ': {
        minHeight: '64px'
      },
    },
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

export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.check(event.target.checked)
  };

  return (
    <div>
      <FormControlLabel1 
        style={{ color: 'white' }}
        control={
          <GreenCheckbox
            checked={checked}
            onChange={handleChange}
            size="small"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />}
        label={props.label}
      />
    </div>
  );
}