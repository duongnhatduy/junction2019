import React from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

export const CostList = ({ series }) => {
  const { fixCost, variableCost } = aggregateTotalCost(series);
  return (
    <List subheader={<ListSubheader>Settings</ListSubheader>}>
      {Object.entries(fixCost).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemText id={key} primary={key} />
          <ListItemIcon>{value}</ListItemIcon>
        </ListItem>
      ))}
      {Object.entries(variableCost).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemText id={key} primary={key} />
          <ListItemIcon>{value}</ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

function aggregateTotalCost(series) {
  return series.reduce(
    ({ fixCost, variableCost }, month) => {
      // each fixCost item of month
      Object.keys(month.fixCost).map(type => {
        if (!fixCost[type]) {
          fixCost[type] = 0;
        }
        return (fixCost[type] += month.fixCost[type]);
      });
      Object.keys(month.variableCost).map(type => {
        if (!variableCost[type]) {
          variableCost[type] = 0;
        }
        return (variableCost[type] += month.variableCost[type]);
      });

      return { fixCost, variableCost };
    },
    { fixCost: {}, variableCost: {} }
  );
}
