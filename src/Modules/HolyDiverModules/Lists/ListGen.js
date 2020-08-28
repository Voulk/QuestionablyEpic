import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import classicons from "../CooldownTable/ClassIcons";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 752,
  },
  demo: {
    // backgroundColor: 'theme.palette.background.paper',
    "& .MuiListItem-root": {
      borderColor: "red",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
      lineHeight: 0.5,
      color: "white",
    },
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function InteractiveList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  let listheal = props.heals.map((key) => (
    <ListItem>
      {classicons(key.icon, 14)}
      <ListItemText
        primary={key.name}
        secondary={secondary ? "Secondary text" : null}
      />
    </ListItem>
  ));

  return (
    <div className={classes.demo}>
      <List dense={dense}>{listheal}</List>
    </div>
  );
}