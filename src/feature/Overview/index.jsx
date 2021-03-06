import React, { useState, useEffect } from 'react';
import { SavingGoal } from './SavingGoal';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { getOverview, getSeries } from '../../api';
import { CostList } from './CostList';

export const Overview = () => {
  const [groupBy, setGroupBy] = useState('3month');

  const [overview, setOverview] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    async function fetch() {
      const overviewData = await getOverview({ groupBy });
      const seriesData = await getSeries({ groupBy });
      setOverview(overviewData);
      setSeries(seriesData);
    }
    fetch();
  }, [groupBy]);
  return (
    <>
      <InputLabel id="label">Time range</InputLabel>
      <Select
        labelId="label"
        id="select"
        value={groupBy}
        onChange={({ target: { value } }) => setGroupBy(value)}
      >
        <MenuItem value="1month">This Month</MenuItem>
        <MenuItem value="3month">This Quarter</MenuItem>
        <MenuItem value="1year">This Year</MenuItem>
      </Select>
      {!!series && !!overview ? (
        <OverviewDumb overview={overview} series={series} />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export const OverviewDumb = ({ overview, series }) => (
  <>
    <SavingGoal {...overview} series={series} /> <CostList series={series} />
  </>
);
