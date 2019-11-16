import { sum } from '../../utils';

const currentMonthIndex = 11;

export const purchasePredict = (fixCost, variableCost) => {
  const seriData = {
    month: 0,
    income: 2650,
    fixCost: {
      rent: 508,
      carBill: 250,
      gas: 80,
      electric: 50,
      phoneBill: 20
    },
    variableCost: {},
  };
  const seriesData = []
  let i = 0;
  while (i < 12) {
    const seri = JSON.parse(JSON.stringify(seriData))
    seri.month = (i + 11) % 12
    if (i === 0) {
      seri.variableCost.extraCost = parseFloat(variableCost.down_payment);
    }
    seri.fixCost.extraCost = sum(Object.values(fixCost));
    seriesData.push(seri)
    i++
  }
  return seriesData;
};
