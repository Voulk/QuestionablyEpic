import { Button, Paper, Typography  } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: { 
        width: "60%",
        //borderColor: "limegreen",
        //borderWidth: "1px",
        //borderStyle: "Solid",
        //borderRadius: "5px",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Aligns items horizontally in the center
        margin: "auto",
    },
    buttonGroupContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginTop: theme.spacing(1),
      },
      buttonGroup: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(1),
      },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
    text: {
        marginRight: theme.spacing(2),
        alignSelf: 'flex-start',
      },
  }));

const ReforgePanel = () => {
    const classes = useStyles();
  
    return (
        <Paper className={classes.root} elevation={3}>
        <Typography variant="h6" gutterBottom>Reforger</Typography>
        <Typography variant="body2" gutterBottom>To keep iteration count from exploding, pick 1-2 stats to reforge from and 1-2 stats to reforge to.</Typography>
        <div className={classes.buttonGroupContainer}>
        <Typography variant="body1" className={classes.text}>From</Typography>
          <div className={classes.buttonGroup}>
            <Button variant="contained" color="primary">Haste</Button>
            <Button variant="contained" color="primary">Spirit</Button>
            <Button variant="contained" color="primary">Crit</Button>
            <Button variant="contained" color="primary">Mastery</Button>
          </div>
        </div>

        <div className={classes.buttonGroupContainer}>
        <Typography variant="body1" className={classes.text}>To</Typography>
          <div className={classes.buttonGroup}>
            <Button variant="contained" color="primary">Haste</Button>
            <Button variant="contained" color="primary">Spirit</Button>
            <Button variant="contained" color="primary">Crit</Button>
            <Button variant="contained" color="primary">Mastery</Button>
          </div>
        </div>
      </Paper>
    );
  };
  
  export default ReforgePanel;