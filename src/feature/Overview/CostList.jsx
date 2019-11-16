import React from 'react';
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { aggregateTotalCost } from '../../utils';

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
