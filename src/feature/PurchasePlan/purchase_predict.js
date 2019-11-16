import { seriesData } from '../../mock/seriesData'
import { sum } from '../../utils';

const currentMonthIndex = 4

export const purchasePredict = (item, fixCost, variableCost) => {
    seriesData.map((seri, i) => {
        if (i === currentMonthIndex + 1) {
            seri.variableCost.extraCost = variableCost.down_payment
        }
        if (i > currentMonthIndex) {
            seri.fixCost.extraCost = sum(Object.values(fixCost))
        }
        return seri
    })
    return seriesData
}