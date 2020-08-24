import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#d3bc47' },
    secondary: { main: '#e0e0e0' }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    }
  }
}));
export default function userInput(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={classes.root}
        id='filled-basic'
        label='Paste WarcraftLog Link Here'
        variant='outlined'
        onChange={props.changed}
        value={props.loglink}
        size='small'
        style={{ width: '100%'}}
      />
    </ThemeProvider>
  );
}
