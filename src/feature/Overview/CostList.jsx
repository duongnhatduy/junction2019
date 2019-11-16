import React from 'react';
import {
  Box,
  Container,
  Card,
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';

export const CostList = ({ series, totalExpense }) => {
  console.log(totalExpense);
  const { fixCost, variableCost } = aggregateTotalCost(series);
  return (
    <Card>
      <GroupedList
        header="Fix Cost"
        costMap={fixCost}
        totalExpense={totalExpense}
      />
      <GroupedList
        header="Variable Cost"
        costMap={variableCost}
        totalExpense={totalExpense}
      />
    </Card>
  );
};

const GroupedList = ({ header, costMap, totalExpense }) => (
  <Container>
    <Box p={1}>
      <Typography variant="h5" component="h5">
        {header}
      </Typography>
      {Object.entries(costMap).map(([key, value]) => {
        const percentage = (value / totalExpense) * 100;
        return (
          <Box p={1} my={2}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              key={key}
            >
              <Grid item xs={9}>
                {key}
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
                item
                xs={3}
              >
                <Typography display="inline" color="textSecondary">
                  {`${percentage.toFixed(0)}%`}
                </Typography>
                <Typography display="inline" color="primary">
                  {`${value}`}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box mt={1}>
                  <LinearProgress variant="determinate" value={percentage} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  </Container>
);

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
