import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import LogImport from '../LogImport/LogImport';
import './buttonnew.css';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120 ,
     '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'red',
     }

  },
  root: {
       color: 'white'
  }
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [boss, setBoss] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small">
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
  );
}