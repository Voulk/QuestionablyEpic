import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Popover, Typography, Grid, Divider } from "@material-ui/core/";
import classIcons from "../../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../../CooldownPlanner/Functions/ClassColourFunctions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function createData(content, intellect, critical, haste, mastery, versatility, leech) {
  return { content, intellect, critical, haste, mastery, versatility, leech };
}

export default function CharacterHeaderButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const currentCharacter = props.allChars.allChar[props.allChars.activeChar];

  const rows = [
    createData(
      "Raid",
      currentCharacter.statWeights["Raid"].intellect,
      currentCharacter.statWeights["Raid"].crit,
      currentCharacter.statWeights["Raid"].haste,
      currentCharacter.statWeights["Raid"].mastery,
      currentCharacter.statWeights["Raid"].versatility,
      currentCharacter.statWeights["Raid"].leech,
    ),
    createData(
      "Dungeon",
      currentCharacter.statWeights["Dungeon"].intellect,
      currentCharacter.statWeights["Dungeon"].crit,
      currentCharacter.statWeights["Dungeon"].haste,
      currentCharacter.statWeights["Dungeon"].mastery,
      currentCharacter.statWeights["Dungeon"].versatility,
      currentCharacter.statWeights["Dungeon"].leech,
    ),
  ];
  console.log(currentCharacter);
  return (
    <div>
      <Button aria-describedby={id} style={{ color: classColoursJS(currentCharacter.spec) }} onClick={handleClick}>
        {props.allChars.getAllChar().length > 0 ? (
          // TODO: Change classIcons to accept a styles prop to remove the padding on the right for this component only
          <div style={{display: "inline-flex"}}>
            {currentCharacter.charName}
            {classIcons(currentCharacter.spec, { height: 18, width: 18, padding: "2px 0px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
          </div>
        ) : (
          ""
        )}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <Grid container spacing={1} direction="row">
            <Grid item xs={12}>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell size="small" style={{ width: 10, padding: "6px 4px" }}>
                        Content
                      </TableCell>
                      <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                        I
                      </TableCell>
                      <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                        C
                      </TableCell>
                      <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                        H
                      </TableCell>
                      <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                        M
                      </TableCell>
                      <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                        V
                      </TableCell>
                      <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                        L
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row" size="small" style={{ width: 10, padding: "6px 4px" }}>
                          {row.content}
                        </TableCell>
                        <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                          {row.intellect}
                        </TableCell>
                        <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                          {row.critical}
                        </TableCell>
                        <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                          {row.haste}
                        </TableCell>
                        <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                          {row.mastery}
                        </TableCell>
                        <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                          {row.versatility}
                        </TableCell>
                        <TableCell size="small" align="right" style={{ width: 10, padding: "6px 4px" }}>
                          {row.leech}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* -------------------------------------------------------------------------- */
            /*                          Container for Characters                          */
            /* -------------------------------------------------------------------------- */}
            <Grid item xs={6} container direction="column">
              <Grid item xs={12}>
                Test
              </Grid>
            </Grid>

            {/* -------------------------------------------------------------------------- */
            /*                             Container for Logs                             */
            /* -------------------------------------------------------------------------- */}
            <Grid item xs={6} container direction="column">
              <Grid item xs={12}>
                Test
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </Popover>
    </div>
  );
}
