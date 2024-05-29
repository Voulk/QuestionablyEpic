import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const ManaSourcesComponent = ({ manaSources }) => {
  const { pool, regen, additional, totalMana } = manaSources;
  return (
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: "#00FFFF", backgroundColor: "#304478"}}>
    <div>
      <Typography variant="h5">Mana</Typography>
      <Typography variant="body2" sx={{paddingBottom: "4px"}}>This is the mana you're able to spend over a six minute fight and a breakdown of where it comes from. </Typography>
      <Typography variant="body1">Total Mana Available: {totalMana.toLocaleString()}</Typography>
      <Typography variant="body1">Spirit Regen: {regen.toLocaleString()}</Typography>
      <Typography variant="subtitle1">Additional Sources:</Typography>
      <List dense>
        {Object.keys(additional).filter(source => source !== "additionalMP5").map((source, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText style={{ paddingLeft: "20px" }} primary={"-> " + source + ": " + Math.round(additional[source] * 12 * 7).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </div>
    </Paper>
  );
};

export default ManaSourcesComponent;