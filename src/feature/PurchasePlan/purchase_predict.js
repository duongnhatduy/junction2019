import { seriesData } from '../../mock/seriesData'

const currentMonthIndex = 4
const CAR = 'CAR'
const HOUSE = 'HOUSE'

const carExtraCost = {
    fixCost: 200,
    variableCost: 50,
}

const houseExtraCost = {
    fixCost: 200,
    variableCost: 100,
}

const petExtraCost = {
    fixCost: 50,
    variableCost: 25,
}

export const purchasePredict = (item, amount, length) => {
    const itemExtraCost = item === CAR ? carExtraCost : item === HOUSE ? houseExtraCost : petExtraCost
    seriesData.map((seri, i) => {
        if (i > currentMonthIndex) {
            seri.fixCost.extraCost = itemExtraCost.fixCost + amount/length
            seri.variableCost.extraCost = itemExtraCost.variableCost
        }
        return seri
    })
    return seriesData
}