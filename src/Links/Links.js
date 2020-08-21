/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Links() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc56_jtmRu9YolkZNH48jQCv-dn8R_HAuAcbwmM6VCtzxdETQ/viewform">Bugs/Feedback</Link>
      <Link href="https://trello.com/b/iWirX7lE/holydiver">Trello</Link>
      <Link href="https://www.warcraftlogs.com/">Warcraft Logs</Link>
    </Typography>
  );
}