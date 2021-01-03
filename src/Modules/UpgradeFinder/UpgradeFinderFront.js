import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
    maxWidth: "55%",
  },
}));

export default function UpgradeFinderFront(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        style={{ padding: "10px 10px 5px 10px" }}
      >
        {t("UpgradeFinderFront.Header")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item container spacing={1}>
          <Paper elevation={0}>
            <Grid item xs={12}>
              <Typography
                color="primary"
                align="center"
                style={{ padding: "10px 10px 5px 10px" }}
              >
                {t("UpgradeFinderFront.RaidHeaderSettings")}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Raid Finder"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Normal"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Heroic"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Mythic"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item container spacing={1}>
          <Paper elevation={0}>
            <Grid item xs={12}>
              <Typography
                color="primary"
                align="center"
                style={{ padding: "10px 10px 5px 10px" }}
              >
                {t("UpgradeFinderFront.RaidHeaderSettings")}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Raid Finder"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Normal"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Heroic"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Mythic"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item container spacing={1}>
          <Paper elevation={0}>
            <Grid item xs={12}>
              <Typography
                color="primary"
                align="center"
                style={{ padding: "10px 10px 5px 10px" }}
              >
                {t("UpgradeFinderFront.RaidHeaderSettings")}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Raid Finder"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Normal"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Heroic"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Mythic"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item container spacing={1}>
          <Paper elevation={0}>
            <Grid item xs={12}>
              <Typography
                color="primary"
                align="center"
                style={{ padding: "10px 10px 5px 10px" }}
              >
                {t("UpgradeFinderFront.RaidHeaderSettings")}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Raid Finder"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Normal"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Heroic"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      //   checked={state.checkedB}
                      //   onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Mythic"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
