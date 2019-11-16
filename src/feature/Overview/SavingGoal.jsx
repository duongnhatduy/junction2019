import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from 'react-apexcharts';

import { sum } from '../../utils';

const accumulateCost = costObj => {
  return Object.values(costObj).reduce((acumm, current) => {
    return (acumm += current);
  }, 0);
};

export const SavingGoal = ({ goal, series }) => {
  const months = series.map(transaction => transaction.month + 1);
  const incomes = series.map(transaction => transaction.income);
  const expenses = series.map(transaction => {
    const fixedCost = accumulateCost(transaction.fixCost);
    const variableCost = accumulateCost(transaction.variableCost);

    return fixedCost + variableCost;
  });

  const totalIncome = sum(incomes);
  const totalExpense = sum(expenses);
  const balance = totalIncome - totalExpense;
  const progress = (balance / goal) * 100;

  const savings = incomes.map((income, index) => income - expenses[index]);

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
      data: savings,
    },
  ];

  return (
    <>
      <div style={{ padding: 10 }}>
        <CircularProgressbar strokeWidth={15} value={progress} text={`${progress.toFixed(0)}%`} />
      </div>
      <Chart options={option} series={data} type="bar" height="350" />
    </>
  );
};
