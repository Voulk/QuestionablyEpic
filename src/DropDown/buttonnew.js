import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LogImport from '../LogImport/LogImport';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120 ,
     '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'red',
     },
    '& .MuiFilledInput-root': {
      backgroundColor: '#6d6d6d'
    },
'& .MuiFilledInput-underline:after': {
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#d3bc47'
},
    '& label.Mui-focused': {
      color: '#ffffff',
    },
    '& .MuiFormLabel-root': {
      color:'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
  },
  
  root: {
       color: 'white'
  }
}));

const theme = createMuiTheme({
  overrides: {
    // Style sheet name :atom:
    MuiTableCell: {
      root: {
        fontSize: '0.875rem',
      },
      body: {
        fontSize: '0.875rem',
      }, 
    },
    MuiSelect:{
      root: {
        color: '#fff'
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '64px'
      }
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#d3bc47',
    },
    secondary: {
      main: '#ff9100',
    },
  },
});

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [boss, setBoss] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    setAge(event.target.value);
  };

  const handleClose = (event) => {
    setOpen(false)
    // setBoss(event.target.value)
    // console.log(event.target.value)
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="filled" className={classes.formControl} size="small">
        <InputLabel id="demo-controlled-open-select-label" label="Outlined" className={classes.root}> 
        Fight
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          label={boss}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          onClick={handleClose}       
        >
          {<LogImport 
            reportid={props.reportid}
            clicker={props.clicky}
            update={props.update}
          />}
         }
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}