import React from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from 'react-apexcharts';

import { sum } from '../../utils';

const accumulateCost = costObj => {
  return Object.values(costObj).reduce((acumm, current) => {
    return (acumm += current);
  }, 0);
};

export const ProjectedSavingGoal = ({ goal, series }) => {
  const months = series.map(transaction => transaction.month + 1);
  const incomes = series.map(transaction => transaction.income);

  // without extra cost
  const expenses = series.map(transaction => {
    const _fixCost = { ...transaction.fixCost };
    delete _fixCost.extraCost;
    const fixedCost = accumulateCost(_fixCost);

    const _variableCost = { ...transaction.variableCost };
    delete _variableCost.extraCost;
    const variableCost = accumulateCost(_variableCost);

    return fixedCost + variableCost;
  });

  const extraCosts = series.map(transaction => {
    const fixedExtra = transaction.fixCost.extraCost || 0;
    const variableExtra = transaction.variableCost.extraCost || 0;
    return fixedExtra + variableExtra;
  });

  const totalExtraCost = sum(extraCosts);
  const totalIncome = sum(incomes);
  const totalExpense = sum(expenses);

  const balance_withoutExtraCost = totalIncome - totalExpense;
  const progress_withoutExtraCost = (balance_withoutExtraCost / goal) * 100;

  const balance_withExtraCost = totalIncome - totalExpense - totalExtraCost;
  const progress_withExtraCost = (balance_withExtraCost / goal) * 100;

  // const savings = incomes.map((income, index) => income - expenses[index]);
  const savings_withoutExtraCost = incomes.map((income, index) => income - expenses[index] - extraCosts[index]);

  const option = {
    chart: {
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    colors: ['#008ffb', '#00e396', '#f00'],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: 'category',
      categories: months,
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  const data = [
    {
      name: 'Expense',
      data: expenses,
    },
    {
      name: 'Saving',
      data: savings_withoutExtraCost,
    },
    {
      name: 'Extra cost',
      data: extraCosts,
    },
  ];

  return (
    <>
      <div style={{ padding: 10 }}>
        <CircularProgressbarWithChildren
          value={progress_withoutExtraCost}
          text={`-${totalExtraCost}€`}
          styles={buildStyles({
            pathColor: '#f00',
            trailColor: '#eee',
            strokeLinecap: 'butt',
            textColor: '#f00',
          })}
        >
          {/* Foreground path */}
          <CircularProgressbar
            value={progress_withExtraCost}
            styles={buildStyles({
              trailColor: 'transparent',
              strokeLinecap: 'butt',
            })}
          />
        </CircularProgressbarWithChildren>
        <div>{`Goal: ${goal}€`}</div>

        {/* <CircularProgressbar strokeWidth={15} value={progress_withExtraCost} text={`${balance_withExtraCost}€`} /> */}
      </div>
      <Chart options={option} series={data} type="bar" height="350" />
    </>
  );
};
