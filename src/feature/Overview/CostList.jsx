import React from 'react';
import { Box, Container, Card, Grid, Typography } from '@material-ui/core';

import { aggregateTotalCost } from '../../utils';

export const CostList = ({ series }) => {
  const { fixCost, variableCost } = aggregateTotalCost(series);
  return (
    <Card>
      <GroupedList header="Fix Cost" costMap={fixCost} />
      <GroupedList header="Variable Cost" costMap={variableCost} />
    </Card>
  );
};

const GroupedList = ({ header, costMap }) => (
  <Container>
    <Box p={1}>
      <Typography variant="h5" component="h5">
        {header}
      </Typography>
      {Object.entries(costMap).map(([key, value]) => (
        <Grid container direction="row" justify="space-between" alignItems="center" key={key}>
          <Grid item xs={9}>
            {key}
          </Grid>
          <Grid item xs={3}>
            {value}
          </Grid>
        </Grid>
      ))}
    </Box>
  </Container>
);
