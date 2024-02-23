import React, { useState } from 'react';
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";

const StatPanel = (props) => {
  // State for storing the values of the textboxes
  const [stats, setStats] = useState({
    intellect: 15000,
    haste: 1800,
    crit: 5400,
    mastery: 7900,
    versatility: 2400,
  });

  // Event handler for updating the state when a textbox value changes
  const handleStatChange = (statName) => (event) => {
    const updatedStat = parseInt(event.target.value) || ''; // If parsing fails, set it to an empty string
    setStats({ ...stats, [statName]: updatedStat });
  };

  // Event handler for the Save button (you can replace the console.log with your save function)
  const handleSave = () => {
    console.log('Saving stats:', stats);
    props.setActiveStats(stats);
    // Add your save logic here
  };

  return (
    <div>
    <Paper style={{ backgroundColor: "#525252", padding: 16 }} elevation={0}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Intellect"
            variant="outlined"
            value={stats.intellect}
            type="number"
            onChange={handleStatChange('intellect')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Haste"
            variant="outlined"
            value={stats.haste}
            type="number"
            onChange={handleStatChange('haste')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Crit"
            variant="outlined"
            value={stats.crit}
            type="number"
            onChange={handleStatChange('crit')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Mastery"
            variant="outlined"
            value={stats.mastery}
            type="number"
            onChange={handleStatChange('mastery')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Versatility"
            variant="outlined"
            value={stats.versatility}
            type="number"
            onChange={handleStatChange('versatility')}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
      </Paper>
    </div>
  );
};

export default StatPanel;
