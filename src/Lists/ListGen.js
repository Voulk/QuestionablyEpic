import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    // backgroundColor: 'theme.palette.background.paper',
    '& .MuiListItem-root': {
      borderColor: 'red',
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    '& .MuiTypography-body1': {
      fontSize: '0.8rem',
      lineHeight: 0.5,
      color: 'white'
    }
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function InteractiveList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  let listheal = props.heals.map(key =>
    (<ListItem>
      <ListItemText
        primary={key}
        secondary={secondary ? 'Secondary text' : null}
      />
    </ListItem>))

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <List dense={dense}>
          {listheal}
        </List>
      </div>
    </div>
  );
}