import React, { useState, useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import OneShotClassToggle from "./OneShotClassToggle";
import { encounterDB } from "Databases/InstanceDB";
import OneShotDataTable from "./OneShotDataTable";
import OneShotDungeonToggle from "./OneShotDungeonToggle";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "100%",
      justifyContent: "center",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "44%",
      justifyContent: "center",
      display: "block",
    },
  },
}));

const getTalentDB = (dungeon) => {};

export default function OneShot(props) {
  const classes = useStyles();
  const dungeonList = encounterDB["-1"]["bossOrderMythicPlus"];

  const [selectedClass, setSelectedClass] = React.useState("Evoker");
  const [selectedDungeon, setSelectedDungeon] = React.useState(dungeonList[0]);

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              padding={0}
              elevation={0}
              style={{
                padding: "10px 5px 10px 10px",
                opacity: 100,
                //backgroundColor: "transparent"
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Classes"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1}>
                    <OneShotClassToggle setSelectedClass={setSelectedClass} selectedClass={selectedClass} />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                    {"Dungeons"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1}>
                    <OneShotDungeonToggle selectedDungeon={selectedDungeon} setSelectedDungeon={setSelectedDungeon} dungeonList={dungeonList} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Defensives"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Externals"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Talents"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                            {"Stats"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                      <OneShotDataTable />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
