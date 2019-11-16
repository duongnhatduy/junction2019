import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { getOverview, getSeries } from '../../api';

import { SavingGoal } from './SavingGoal';

export const Overview = () => {
  const [groupBy, setGroupBy] = useState('1month');

  const [overview, setOverview] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    async function fetch() {
      const overviewData = await getOverview(groupBy);
      const seriesData = await getSeries(groupBy);
      setOverview(overviewData);
      setSeries(seriesData);
    }
    fetch();
  }, [groupBy]);

  return (
    <>
      <InputLabel id="label">Time range</InputLabel>
      <Select labelId="label" id="select" value={groupBy} onChange={({ target: { value } }) => setGroupBy(value)}>
        <MenuItem value="1month">1 Month</MenuItem>
        <MenuItem value="3month">3 Months</MenuItem>
        <MenuItem value="1year">1 Year</MenuItem>
      </Select>

      <SavingGoal currentBalance={400} goal={750} income={3000} expense={1500} />
    </>
  );
};
