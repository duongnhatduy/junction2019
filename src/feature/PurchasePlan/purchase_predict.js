import { seriesData } from '../../mock/seriesData';
import { sum } from '../../utils';
import produce from 'immer';

const currentMonthIndex = 4;

export const purchasePredict = (item, fixCost, variableCost) => {
  return produce(seriesData, draft => {
    draft.map((seri, i) => {
      if (i === currentMonthIndex + 1) {
        seri.variableCost.extraCost = parseFloat(variableCost.down_payment);
      }
      if (i > currentMonthIndex) {
        seri.fixCost.extraCost = sum(Object.values(fixCost));
      }
      return seri;
    });
  });
};
