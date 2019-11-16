import { seriesData } from '../../mock/seriesData';
import { sum } from '../../utils';
import produce from 'immer';

// const currentMonthIndex = 4;

export const purchasePredict = (fixCost, variableCost) => {
  return produce(seriesData, draft => {
    draft.map((seri, i) => {
      if (i === 0) {
        seri.variableCost.extraCost = parseFloat(variableCost.down_payment);
      }
      if (i >= 0) {
        seri.fixCost.extraCost = sum(Object.values(fixCost));
      }
      seri.month = (seri.month + 11) % 12
      return seri;
    });
  });
};
