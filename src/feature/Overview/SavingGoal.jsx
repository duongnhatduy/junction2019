import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const SavingGoal = ({ currentBalance, goal, income, expense }) => {
  const progress = (currentBalance / goal) * 100;
  return (
    <CircularProgressbar value={progress} text={`${progress.toFixed(0)}%`} />
  );
};
