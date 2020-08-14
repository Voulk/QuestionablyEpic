import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#6d6d6d'
},
'& .MuiInputBase-root': { color: '#fff'
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
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      color: '#fff'
    },
  },
}));
export default function userInput(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <CssTextField 
        id="filled-basic" 
        label='Paste WarcraftLog Link Here'
        variant="filled"
        onChange={props.changed}
        value={props.loglink}
        size="small"
      />
    </form>
  );
}