import React from 'react';
import {
  Box,
  Container,
  Card,
  Grid,
  Typography,
  LinearProgress,
  makeStyles
} from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';

const useStyles = makeStyles(theme => ({
  costName: {
    textTransform: 'capitalize'
  }
}));

const NAME_MAP = {
  carBill: 'car bill',
  eatingOut: 'eat out',
  phoneBill: 'phone bill'
};

const ICON_MAP = {
  rent: <HomeOutlinedIcon />,
  carBill: <DriveEtaOutlinedIcon />,
  gas: <LocalGasStationOutlinedIcon />,
  electric: <EvStationOutlinedIcon />,
  eatingOut: <FastfoodOutlinedIcon />,
  groceries: <LocalGroceryStoreOutlinedIcon />,
  entertainment: <TheatersOutlinedIcon />,
  phoneBill: <PhoneOutlinedIcon />,
  utilities: <WbIncandescentOutlinedIcon />
};

export const CostList = ({ series, totalExpense }) => {
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

const CategoryName = ({ name }) => (NAME_MAP[name] ? NAME_MAP[name] : name);
const Icon = ({ name }) => (ICON_MAP[name] ? ICON_MAP[name] : null);
const Category = ({ name }) => (
  <Grid container direction="row" justify="flex-start" alignItems="center">
    <Icon name={name} />
    <CategoryName name={name} />
  </Grid>
);

const GroupedList = ({ header, costMap, totalExpense }) => {
  const classes = useStyles();
  return (
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
                <Grid item xs={9} className={classes.costName}>
                  <Category name={key} />
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
                  <Typography display="inline" color="textPrimary">
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
