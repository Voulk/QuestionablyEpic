import React from 'react';

import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { classicGemDB } from 'Databases/ClassicGemDB';
import { getGemIcon } from 'General/Engine/ItemUtilities';
import { check } from 'prettier';


function countOccurrences<T extends number>(arr: T[]): Record<T, number> {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

function getGemStats(gemId: number) {
  const gem = classicGemDB.find(gem => gem.id === gemId);
  if (gem) return Object.keys(gem.stats).map(statKey => `${statKey}`).join(' / ');
}

function checkGemExists(gemId: number) {
  return classicGemDB.some(gem => gem.id === gemId);
}

const TopGearGemList = ({ gemData }) => {

  let gemList: number[] = []
  Object.keys(gemData).forEach(key => {
    gemList = gemList.concat(gemData[key])
  });


  const gemOccurrences = countOccurrences(gemList);

  return (
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: "#E900FF", backgroundColor: "#612B78"}}>
      <div>
        <Typography variant="h5">Socketed Gems</Typography>
        <Typography variant="body2" sx={{paddingBottom: "4px"}}>This is a list of gems included in the above set. There's a setting to instead keep your equipped gems during Item Select if you'd prefer that.</Typography>
        <List dense>
          {Object.keys(gemOccurrences).map((gem, index) => (
            checkGemExists(Number(gem)) && (
              <ListItem key={index} disablePadding>
                <img src={getGemIcon(Number(gem), "Classic")} width={15} height={15} style={{ verticalAlign: "middle" }} alt="Socket" />
                <ListItemText style={{paddingLeft: '3px'}} primary={` ${classicGemDB.filter(g => g.id === Number(gem))?.[0]?.name || "Unknown Gem"} (${gemOccurrences[Number(gem)]}x - ${getGemStats(Number(gem))})`} />
              </ListItem>
            )
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default TopGearGemList;
