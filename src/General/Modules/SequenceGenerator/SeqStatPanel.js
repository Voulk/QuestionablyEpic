import React, { useState } from 'react';
import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";

const StatPanel = (props) => {
  // State for storing the values of the textboxes
  /*const [stats, setStats] = useState({
    intellect: 15000,
    haste: 1800,
    crit: 5400,
    mastery: 7900,
    versatility: 2400,
  });*/

  const [stats, setStats] = useState(props.stats);

  // Event handler for updating the state when a textbox value changes
  const handleStatChange = (statName) => (event) => {
    const updatedStat = parseInt(event.target.value) || ''; // If parsing fails, set it to an empty string
    setStats({ ...stats, [statName]: updatedStat });
  };

  // Event handler for the Save button (you can replace the console.log with your save function)
  const handleSave = () => {
    props.setActiveStats(stats);
    // Add your save logic here
  };

  return (
    <div>
    <Paper style={{ backgroundColor: "#525252", padding: 16 }} elevation={0}>
      <Grid container spacing={2} alignItems="center">
        {Object.keys(stats).map((stat, index) => (
          <Grid item key={index}> 
            <TextField
              label={stat.charAt(0).toUpperCase() + stat.slice(1)}
              variant="outlined"
              value={stats[stat]}
              type="number"
              onChange={handleStatChange(stat)}
            />
          </Grid>
        ))}
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
